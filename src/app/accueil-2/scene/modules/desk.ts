/**
 * Vie interactive sur le bureau :
 *  • écran PC en « lava flow » réactif (blobs lumineux qui dérivent et se
 *    déforment vers le curseur, clippés à la forme iso du moniteur, scanlines +
 *    balayage) ;
 *  • clavier dont les touches s'illuminent en vague sous le curseur, avec une
 *    touche B d'où part une onde quand on tape « B » (événement `hero:bpulse`).
 *
 * Optimisations vs prototype : pointeur via le `PointerTracker` partagé (CTM
 * caché), et throttle à 30 fps quand le curseur est loin du bureau (moitié moins
 * de rastérisations du filtre flou de l'écran), 60 fps en approche ou pendant
 * l'onde B.
 */

import { project, pointsAttr, svgEl } from "../lib/iso";
import { createRafLoop, type RafLoop } from "../lib/raf-loop";
import type { MountContext } from "../types";

const DEFS = `
  <clipPath id="scr-clip"><polygon id="scr-clip-poly" points=""/></clipPath>
  <radialGradient id="scr-b1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#c4b5fd" stop-opacity="0.95"/><stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>
  <radialGradient id="scr-b2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#e9d5ff" stop-opacity="0.9"/><stop offset="100%" stop-color="#c084fc" stop-opacity="0"/></radialGradient>
  <radialGradient id="scr-b3" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fde68a" stop-opacity="0.85"/><stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/></radialGradient>
  <filter id="scr-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4.5"/></filter>`;

type ScreenBlob = { g: string; r: number; ax: number; ay: number; sx: number; sy: number; ph: number; el: SVGCircleElement };
type ScreenSim = {
  cx0: number;
  cy0: number;
  blobs: ScreenBlob[];
  sweep: SVGRectElement;
  bb: DOMRect;
  near: number;
};
type Key = { cx: number; cy: number; glow: SVGPolygonElement; isB: boolean };

export function mountDesk(ctx: MountContext): () => void {
  const { svg, pointer, reduced } = ctx;

  let defs = svg.querySelector("defs");
  if (!defs) {
    defs = svgEl("defs");
    svg.insertBefore(defs, svg.firstChild);
  }
  defs.insertAdjacentHTML("beforeend", DEFS);

  // ===== 1) ÉCRAN — lava flow réactif =====
  let screenSim: ScreenSim | null = null;
  const scr = svg.querySelector<SVGPolygonElement>(".screen");
  if (scr) {
    const ptsStr = scr.getAttribute("points") ?? "";
    svg.querySelector("#scr-clip-poly")?.setAttribute("points", ptsStr);
    const bb = scr.getBBox();
    const cx0 = bb.x + bb.width / 2,
      cy0 = bb.y + bb.height / 2;

    const wrap = svgEl("g", { class: "scr-fx", "clip-path": "url(#scr-clip)" });
    wrap.appendChild(svgEl("polygon", { points: ptsStr, fill: "#2b2150" }));

    const blobs: ScreenBlob[] = [
      { g: "url(#scr-b1)", r: 21, ax: -9, ay: 6, sx: 0.7, sy: 0.9, ph: 0, el: null as unknown as SVGCircleElement },
      { g: "url(#scr-b2)", r: 17, ax: 8, ay: -7, sx: 0.9, sy: 0.6, ph: 2.1, el: null as unknown as SVGCircleElement },
      { g: "url(#scr-b3)", r: 14, ax: 4, ay: 9, sx: 1.1, sy: 0.8, ph: 4.0, el: null as unknown as SVGCircleElement },
    ];
    const blobG = svgEl("g", { filter: "url(#scr-soft)" });
    blobG.style.mixBlendMode = "screen";
    blobs.forEach((b) => {
      b.el = svgEl("circle", { cx: cx0, cy: cy0, r: b.r, fill: b.g });
      blobG.appendChild(b.el);
    });
    wrap.appendChild(blobG);

    const scan = svgEl("g");
    scan.style.mixBlendMode = "overlay";
    for (let i = 0; i < 7; i++) {
      scan.appendChild(
        svgEl("line", { x1: bb.x - 4, y1: bb.y + 4 + i * 8, x2: bb.x + bb.width + 4, y2: bb.y + 4 + i * 8, stroke: "#fff", "stroke-width": 0.6, opacity: 0.06 }),
      );
    }
    const sweep = svgEl("rect", { x: bb.x - 6, y: bb.y, width: bb.width * 0.5, height: bb.height + 8, fill: "#fff", opacity: 0.05 });
    sweep.style.mixBlendMode = "overlay";
    wrap.appendChild(scan);
    wrap.appendChild(sweep);

    scr.parentNode?.insertBefore(wrap, scr.nextSibling);
    screenSim = { cx0, cy0, blobs, sweep, bb, near: 0 };
  }

  // ===== 2) CLAVIER — touches qui s'illuminent (vague + onde « B ») =====
  const Z0 = 26.4,
    KH = 1.05; // base (face sup.) + hauteur des keycaps
  const cols = 6,
    rows = 2,
    gap = 0.5;
  const KX0 = 10.2,
    KX1 = 23.8,
    KY0 = 12.2,
    KY1 = 16.8;
  const cellW = (KX1 - KX0) / cols,
    cellD = (KY1 - KY0) / rows;
  const kw = cellW - gap,
    kd = cellD - gap;
  const bKey = { c: 2, r: 1 };
  const keys: Key[] = [];

  const kbG = svgEl("g", { class: "kbd-fx" });
  kbG.appendChild(
    svgEl("polygon", {
      class: "kbd-deck",
      points: pointsAttr([
        project(KX0 - 0.5, KY0 - 0.5, Z0),
        project(KX1 + 0.5, KY0 - 0.5, Z0),
        project(KX1 + 0.5, KY1 + 0.5, Z0),
        project(KX0 - 0.5, KY1 + 0.5, Z0),
      ]),
    }),
  );

  const kbox = (ax: number, ay: number, w: number, d: number, h: number, z0: number) => {
    const z1 = z0 + h;
    return {
      top: [project(ax, ay, z1), project(ax + w, ay, z1), project(ax + w, ay + d, z1), project(ax, ay + d, z1)],
      right: [project(ax + w, ay, z1), project(ax + w, ay + d, z1), project(ax + w, ay + d, z0), project(ax + w, ay, z0)],
      front: [project(ax, ay + d, z1), project(ax + w, ay + d, z1), project(ax + w, ay + d, z0), project(ax, ay + d, z0)],
      ctr: project(ax + w / 2, ay + d / 2, z1),
    };
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ax = KX0 + c * cellW + gap / 2,
        ay = KY0 + r * cellD + gap / 2;
      const isB = c === bKey.c && r === bKey.r;
      const k = kbox(ax, ay, kw, kd, KH, Z0);
      kbG.appendChild(svgEl("polygon", { class: "kbd-front", points: pointsAttr(k.front) }));
      kbG.appendChild(svgEl("polygon", { class: "kbd-side", points: pointsAttr(k.right) }));
      kbG.appendChild(svgEl("polygon", { class: `kbd-top${isB ? " is-b" : ""}`, points: pointsAttr(k.top) }));
      const glow = svgEl("polygon", { class: "kbd-glow", points: pointsAttr(k.top), opacity: 0 });
      kbG.appendChild(glow);
      if (isB) {
        const lbl = svgEl("text", { class: "kbd-b", x: k.ctr[0].toFixed(1), y: (k.ctr[1] + 1.0).toFixed(1) });
        lbl.textContent = "B";
        kbG.appendChild(lbl);
      }
      keys.push({ cx: k.ctr[0], cy: k.ctr[1], glow, isB });
    }
  }
  (svg.querySelector(".setup") ?? svg).appendChild(kbG);
  const bk = keys.find((k) => k.isB) ?? keys[0];

  // onde déclenchée par « B »
  let pulseT = -999;
  let flashTimer: ReturnType<typeof setTimeout> | null = null;
  let loop: RafLoop | null = null;
  const flashOnce = () => {
    keys.forEach((k) => k.glow.setAttribute("opacity", String(k.isB ? 0.9 : 0.5)));
    flashTimer = setTimeout(() => keys.forEach((k) => k.glow.setAttribute("opacity", String(k.isB ? 0.18 : 0))), 260);
  };
  const pulse = () => {
    pulseT = performance.now() / 1000;
    if (reduced) flashOnce();
    else loop?.wake();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "b" || e.key === "B") pulse();
  };
  window.addEventListener("hero:bpulse", pulse);
  window.addEventListener("keydown", onKeyDown);

  // ===== état statique (reduced motion) =====
  if (reduced) {
    if (screenSim) screenSim.blobs.forEach((b) => {
      b.el.setAttribute("cx", (screenSim!.cx0 + b.ax).toFixed(1));
      b.el.setAttribute("cy", (screenSim!.cy0 + b.ay).toFixed(1));
    });
    keys.forEach((k) => k.glow.setAttribute("opacity", String(k.isB ? 0.18 : 0)));
    return () => {
      if (flashTimer) clearTimeout(flashTimer);
      window.removeEventListener("hero:bpulse", pulse);
      window.removeEventListener("keydown", onKeyDown);
    };
  }

  // ===== boucle d'animation =====
  loop = createRafLoop((now) => {
    const t = now / 1000;
    const active = pointer.active;
    const mx = pointer.local.x,
      my = pointer.local.y;

    // — écran —
    let dScreen = 9999;
    if (screenSim) {
      const s = screenSim;
      dScreen = active ? Math.hypot(mx - s.cx0, my - s.cy0) : 9999;
      const near = Math.exp(-dScreen / 90);
      s.near += (near - s.near) * 0.08;
      s.blobs.forEach((b) => {
        let bx = s.cx0 + b.ax + Math.cos(t * b.sx + b.ph) * 8;
        let by = s.cy0 + b.ay + Math.sin(t * b.sy + b.ph) * 7;
        if (active) {
          bx += (mx - bx) * 0.18 * s.near;
          by += (my - by) * 0.18 * s.near;
        }
        b.el.setAttribute("cx", bx.toFixed(1));
        b.el.setAttribute("cy", by.toFixed(1));
        b.el.setAttribute("r", (b.r * (1 + s.near * 0.12)).toFixed(1));
      });
      const sweepX = s.bb.x - 6 + (((t * 0.18) % 1.4) / 1.4) * (s.bb.width + 12);
      s.sweep.setAttribute("x", sweepX.toFixed(1));
      s.sweep.setAttribute("opacity", (0.04 + s.near * 0.06).toFixed(3));
    }

    // — clavier —
    const elapsed = t - pulseT; // depuis la dernière onde B
    const waveR = elapsed * 130;
    let dKbd = 9999;
    for (const k of keys) {
      let g = 0;
      if (active) {
        const d = Math.hypot(mx - k.cx, my - k.cy);
        dKbd = Math.min(dKbd, d);
        g += Math.exp(-d / 26) * 0.55;
      }
      g += 0.05 + 0.04 * Math.sin(t * 1.6 + k.cx * 0.1);
      if (elapsed < 1.4) {
        const dB = Math.hypot(k.cx - bk.cx, k.cy - bk.cy);
        const front = Math.exp(-Math.abs(waveR - dB) / 12) * (1 - elapsed / 1.4);
        g += front * 1.0;
        if (k.isB) g += Math.exp(-elapsed * 4) * 0.8;
      }
      if (k.isB) g += 0.16;
      k.glow.setAttribute("opacity", Math.min(1, g).toFixed(3));
    }

    // throttle : plein régime près du bureau ou pendant l'onde, sinon 30 fps
    const hot = dScreen < 180 || dKbd < 120 || elapsed < 1.4;
    return { fps: hot ? 60 : 30 };
  });

  const onPointerMoveWake = pointer.onMove(() => loop.wake());

  return () => {
    loop?.dispose();
    onPointerMoveWake();
    if (flashTimer) clearTimeout(flashTimer);
    window.removeEventListener("hero:bpulse", pulse);
    window.removeEventListener("keydown", onKeyDown);
  };
}
