/**
 * Nuages liquides « lava-lamp » réactifs à la souris.
 *
 * Metaballs gooey (feGaussianBlur + feColorMatrix), gouttes qui montent/descendent,
 * le nuage se penche vers le curseur et étire un pseudopode liquide.
 *
 * Optimisations vs prototype :
 *  • pointeur lu via le `PointerTracker` partagé (CTM caché) — plus de
 *    `getScreenCTM()` par module ;
 *  • le **bob ambiant** (autrefois animation CSS `.cloud`) est porté ICI en JS,
 *    pour publier dans `ctx.cloudAnchors` la position EXACTE du nuage que les
 *    câbles suivent sans lecture de layout ;
 *  • throttle à 30 fps quand le curseur est loin (lave lente → invisible),
 *    60 fps en approche → moitié moins de rastérisations du filtre goo.
 */

import { blobPath } from "../lib/geometry";
import { svgEl } from "../lib/iso";
import { createRafLoop } from "../lib/raf-loop";
import type { CloudKey, MountContext } from "../types";

const DEFS = `
  <radialGradient id="cg-ia" cx="38%" cy="30%" r="78%">
    <stop offset="0%"  stop-color="#ddd6fe"/>
    <stop offset="42%" stop-color="#a78bfa"/>
    <stop offset="80%" stop-color="#7c3aed"/>
    <stop offset="100%" stop-color="#6d28d9"/>
  </radialGradient>
  <radialGradient id="cg-cli" cx="38%" cy="30%" r="78%">
    <stop offset="0%"  stop-color="#fef3c7"/>
    <stop offset="42%" stop-color="#fbbf24"/>
    <stop offset="80%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#d97706"/>
  </radialGradient>
  <radialGradient id="cl-sheen" cx="50%" cy="34%" r="62%">
    <stop offset="0%"   stop-color="#fff" stop-opacity="0.9"/>
    <stop offset="55%"  stop-color="#fff" stop-opacity="0.14"/>
    <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <filter id="cloud-goo" x="-60%" y="-60%" width="220%" height="220%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="3.4" result="b"/>
    <feColorMatrix in="b" type="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/>
  </filter>
  <filter id="cloud-glow" x="-90%" y="-90%" width="280%" height="280%">
    <feGaussianBlur stdDeviation="7"/>
  </filter>`;

type CloudConf = {
  grad: string;
  solid: string;
  glyph: "dots" | "people";
  labelDY: number;
};

const CONF: Record<CloudKey, CloudConf> = {
  IA: { grad: "url(#cg-ia)", solid: "#8b5cf6", glyph: "dots", labelDY: -31 },
  Cli: { grad: "url(#cg-cli)", solid: "#f5a31b", glyph: "people", labelDY: -31 },
};

type Drop = { x: number; r: number; sp: number; ph: number; amp: number; el: SVGPathElement };
type Cloud = {
  key: CloudKey;
  react: SVGGElement;
  glow: SVGEllipseElement;
  base: SVGPathElement;
  reach: SVGPathElement;
  drops: Drop[];
  pos: [number, number];
  near: number;
  seed: number;
  bobPeriod: number;
  bobDelay: number;
};

function buildCloud(host: SVGGElement, kind: CloudKey): Cloud {
  const conf = CONF[kind];
  const inner = (host.querySelector<SVGGElement>('g[transform^="translate"]') ||
    host.firstElementChild) as SVGGElement;
  const oldLabel = inner.querySelector(".cloud-label");
  const labelTxt = oldLabel?.textContent ?? "";
  inner.innerHTML = "";

  const react = svgEl("g", { class: "cl-react" });
  const glow = svgEl("ellipse", {
    class: "cl-glow",
    cx: 0,
    cy: 1,
    rx: 34,
    ry: 21,
    fill: conf.grad,
    opacity: 0.3,
    filter: "url(#cloud-glow)",
  });

  // masse liquide gooey (remplissage UNI : le goo fusionne proprement)
  const goo = svgEl("g", { filter: "url(#cloud-goo)" });
  const base = svgEl("path", { fill: conf.solid });
  const reach = svgEl("path", { fill: conf.solid, opacity: 0 }); // pseudopode
  const drops: Drop[] = [
    { x: -13, r: 7.5, sp: 0.85, ph: 0.0, amp: 8 },
    { x: 4, r: 6.5, sp: 1.05, ph: 2.3, amp: 9.5 },
    { x: 16, r: 5.5, sp: 1.25, ph: 4.4, amp: 7 },
  ].map((d) => ({ ...d, el: svgEl("path", { fill: conf.solid }) }));
  goo.appendChild(base);
  drops.forEach((d) => goo.appendChild(d.el));
  goo.appendChild(reach);

  // vernis liquide + reflet spéculaire
  const gloss = svgEl("ellipse", { cx: -2, cy: -6, rx: 25, ry: 13, fill: "url(#cl-sheen)" });
  const spec = svgEl("ellipse", { cx: -11, cy: -9, rx: 6, ry: 2.8, fill: "#fff", opacity: 0.55 });

  // glyphe sémantique (net, hors goo)
  const glyph = svgEl("g", { class: "cl-glyph-grp" });
  if (conf.glyph === "dots") {
    [-9, 0, 9].forEach((gx, i) => {
      const dot = svgEl("circle", { class: "cl-dotw", cx: gx, cy: 3, r: 2.5 });
      dot.style.animationDelay = `${(i * 0.32).toFixed(2)}s`;
      glyph.appendChild(dot);
    });
  } else {
    glyph.appendChild(svgEl("circle", { class: "cl-glyph", cx: -11, cy: -2, r: 3.6 }));
    glyph.appendChild(svgEl("path", { class: "cl-glyph", d: "M-11,2.4 q-5,1 -5,7 M-11,2.4 q5,1 5,7" }));
    glyph.appendChild(svgEl("rect", { class: "cl-glyph", x: 6, y: -3.5, width: 11, height: 8, rx: 1.4 }));
    glyph.appendChild(svgEl("path", { class: "cl-glyph", d: "M6,-0.5 h11" }));
  }

  const label = svgEl("text", { class: "cloud-label", y: conf.labelDY });
  label.textContent = labelTxt;

  react.append(glow, goo, gloss, spec, glyph, label);
  inner.appendChild(react);

  const m = (inner.getAttribute("transform") || "").match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/);
  const pos: [number, number] = m ? [parseFloat(m[1]), parseFloat(m[2])] : [0, 0];

  return {
    key: kind,
    react,
    glow,
    base,
    reach,
    drops,
    pos,
    near: 0,
    seed: kind === "IA" ? 0 : 3.3,
    bobPeriod: kind === "IA" ? 6 : 7.2,
    bobDelay: kind === "IA" ? 0 : 0.6,
  };
}

export function mountClouds(ctx: MountContext): () => void {
  const { svg, pointer, reduced, cloudAnchors } = ctx;

  let defs = svg.querySelector("defs");
  if (!defs) {
    defs = svgEl("defs");
    svg.insertBefore(defs, svg.firstChild);
  }
  defs.insertAdjacentHTML("beforeend", DEFS);

  const clouds: Cloud[] = [];
  const ia = svg.querySelector<SVGGElement>(".cloudIA");
  const cli = svg.querySelector<SVGGElement>(".cloudCli");
  if (ia) clouds.push(buildCloud(ia, "IA"));
  if (cli) clouds.push(buildCloud(cli, "Cli"));
  if (!clouds.length) return () => {};

  // ancres initiales (lues immédiatement par les câbles, montés juste après)
  clouds.forEach((c) => {
    cloudAnchors[c.key] = { x: c.pos[0], y: c.pos[1] };
  });

  if (reduced) {
    clouds.forEach((c) => {
      c.base.setAttribute("d", blobPath(0, 0, 20, 11, c.seed, 0.13, 1.68));
      c.drops.forEach((d, i) => d.el.setAttribute("d", blobPath(d.x, 0, d.r, 9, i * 2 + c.seed, 0.12)));
      c.glow.setAttribute("opacity", "0.32");
    });
    return () => {};
  }

  const start = performance.now();
  const loop = createRafLoop((now) => {
    const t = (now - start) / 1000;
    const active = pointer.active;
    const mx = pointer.local.x,
      my = pointer.local.y;
    let maxNear = 0;

    for (const c of clouds) {
      let near = 0,
        dirx = 0,
        diry = 0;
      if (active) {
        const dx = mx - c.pos[0],
          dy = my - c.pos[1];
        const dist = Math.hypot(dx, dy);
        near = Math.exp(-dist / 145);
        if (dist > 0.01) {
          dirx = dx / dist;
          diry = dy / dist;
        }
      }
      c.near += (near - c.near) * 0.09; // lissage
      const n = c.near;
      maxNear = Math.max(maxNear, n);
      const ts = t * (1 + n * 1.15); // morph accéléré en approche
      const bobY = -3 + 3 * Math.cos((2 * Math.PI * (t - c.bobDelay)) / c.bobPeriod);
      const pullX = dirx * n * 7,
        pullY = diry * n * 7;

      c.react.setAttribute(
        "transform",
        `translate(${pullX.toFixed(2)} ${(pullY + bobY).toFixed(2)}) scale(${(1 + n * 0.05).toFixed(3)})`,
      );
      // publie l'origine viewBox du nuage (base + bob + pull) pour les câbles
      cloudAnchors[c.key] = { x: c.pos[0] + pullX, y: c.pos[1] + pullY + bobY };

      c.base.setAttribute("d", blobPath(0, 0, 20, 11, ts * 0.5 + c.seed, 0.13, 1.68));
      c.drops.forEach((d, i) => {
        const amp = d.amp * (1 + n * 0.25);
        const y = Math.sin(ts * d.sp + d.ph) * amp;
        const x = d.x + Math.cos(ts * d.sp * 0.6 + d.ph) * 2.2;
        d.el.setAttribute("d", blobPath(x, y, d.r, 9, ts * 0.7 + i * 2 + c.seed, 0.12));
      });

      const rx = dirx * (22 + n * 8) * n;
      const ry = diry * (15 + n * 6) * n;
      c.reach.setAttribute("d", blobPath(rx, ry, 5.5 + n * 6, 9, ts + c.seed, 0.16));
      c.reach.setAttribute("opacity", (n * 0.96).toFixed(3));
      c.glow.setAttribute("opacity", (0.26 + n * 0.5).toFixed(3));
    }

    return { fps: maxNear < 0.15 ? 30 : 60 };
  });

  return () => loop.dispose();
}
