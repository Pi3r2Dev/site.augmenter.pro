/**
 * Câbles simulés en physique Verlet, ATTRAPABLES à la souris.
 *
 * Réseau aérien en étoile centré sur l'écran du PC : serveur→écran, étagère→écran,
 * écran↔nuage IA, écran↔nuage Clients, nuage IA↔nuage Clients. Caténaires qui
 * pendent sous la gravité ; les bouts côté nuages SUIVENT le flottement des nuages.
 *
 * Optimisations vs prototype :
 *  • ancres des nuages lues dans `ctx.cloudAnchors` (publiées par `clouds`) →
 *    plus AUCUN `getScreenCTM()` par frame (fixe P3) ;
 *  • per-cable skip : un câble à ancres statiques cesse de se re-simuler/rendre
 *    dès qu'il s'est stabilisé (économise le re-parsing du `d`) ;
 *  • throttle 30 fps au repos, 60 fps pendant un drag ; idle-sleep si tous les
 *    câbles sont statiques et stabilisés.
 *
 * Le feedback « attrapable » (anneau du curseur qui enfle) est porté par les
 * tracés `.vc-hit` tagués `data-hover`, gérés par le curseur custom du hero.
 */

import { project, svgEl } from "../lib/iso";
import { smoothPath } from "../lib/geometry";
import { createRafLoop, type RafLoop } from "../lib/raf-loop";
import type { CloudKey, MountContext } from "../types";

type ScenePt = [number, number, number];
type AnchorSpec =
  | { scene: ScenePt }
  | { cloud: CloudKey; off: [number, number]; fallback: [number, number] }
  | [number, number];
type AnchorFn = () => [number, number];

type CableCfg = {
  a: AnchorSpec;
  b: AnchorSpec;
  slack: number;
  n: number;
  w: number;
  color: string;
  plug: string;
  min: number;
};

type Point = { x: number; y: number; px: number; py: number; pinned: boolean };
type Cable = {
  pts: Point[];
  n: number;
  segRest: number;
  base: SVGPathElement;
  live: SVGPathElement;
  hit: SVGPathElement;
  g: SVGGElement;
  aA: AnchorFn;
  aB: AnchorFn;
  endTop: SVGCircleElement;
  endBot: SVGCircleElement;
  isStatic: boolean;
  settled: boolean;
};

const GRAV = 0.42;
const DAMP = 0.86;
const ITER = 14;
const SETTLE_EPS = 0.05;

export function mountCables(ctx: MountContext): () => void {
  const { svg, pointer, reduced, cloudAnchors } = ctx;

  // 1) retirer le réseau statique (arcs + hub + nœuds) — garder les nuages
  svg.querySelectorAll(".wire-base, .wire-live, .node, .hub, .hub-ring").forEach((e) => e.remove());

  // 2) calque de fond (derrière TOUS les éléments)
  const backLayer = (() => {
    const existing = svg.querySelector<SVGGElement>(".vcable-back");
    if (existing) return existing;
    const layer = svgEl("g", { class: "vcable-back" });
    const before = svg.querySelector(".netlayer") || svg.querySelector(".shelf");
    if (before?.parentNode) before.parentNode.insertBefore(layer, before);
    else svg.appendChild(layer);
    return layer;
  })();

  // 3) config des fils (l'ÉCRAN est le hub central)
  const SCREEN: AnchorSpec = { scene: [17, 5, 38] };
  const CFG: CableCfg[] = [
    { a: { scene: [29.75, -16.25, 17] }, b: SCREEN, slack: 1.08, n: 20, w: 2.7, color: "#7c3aed", plug: "#a78bfa", min: 1 }, // serveur IA → écran
    { a: { scene: [59, -4, 23] }, b: SCREEN, slack: 1.09, n: 22, w: 2.7, color: "#7c3aed", plug: "#a78bfa", min: 2 }, // étagère → écran
    { a: SCREEN, b: { cloud: "IA", off: [0, 16], fallback: [442, 116] }, slack: 1.07, n: 20, w: 2.6, color: "#7c3aed", plug: "#c084fc", min: 2 }, // écran → nuage IA
    { a: SCREEN, b: { cloud: "Cli", off: [0, 16], fallback: [748, 138] }, slack: 1.07, n: 22, w: 2.6, color: "#7c3aed", plug: "#fbbf24", min: 2 }, // écran → nuage Clients
    { a: { cloud: "IA", off: [0, 16], fallback: [442, 116] }, b: { cloud: "Cli", off: [0, 16], fallback: [748, 138] }, slack: 1.05, n: 22, w: 2.3, color: "#8b5cf6", plug: "#c084fc", min: 2 }, // nuage IA ↔ nuage Clients
  ];

  const isStaticSpec = (s: AnchorSpec) => Array.isArray(s) || "scene" in s;
  const makeAnchor = (spec: AnchorSpec): AnchorFn => {
    if (Array.isArray(spec)) {
      const v: [number, number] = [spec[0], spec[1]];
      return () => v;
    }
    if ("scene" in spec) {
      const v = project(spec.scene[0], spec.scene[1], spec.scene[2]);
      return () => v;
    }
    const { cloud, off, fallback } = spec;
    return () => {
      const a = cloudAnchors[cloud];
      return a ? [a.x + off[0], a.y + off[1]] : fallback;
    };
  };

  const buildCable = (cfg: CableCfg): Cable => {
    const aA = makeAnchor(cfg.a),
      aB = makeAnchor(cfg.b);
    const A = aA(),
      B = aB(),
      n = cfg.n;
    const segRest = (Math.hypot(B[0] - A[0], B[1] - A[1]) / (n - 1)) * cfg.slack;
    const pts: Point[] = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const x = A[0] + (B[0] - A[0]) * t,
        y = A[1] + (B[1] - A[1]) * t;
      pts.push({ x, y, px: x, py: y, pinned: i === 0 || i === n - 1 });
    }
    const g = svgEl("g", { class: "vcable grp", "data-min": cfg.min });
    const hit = svgEl("path", { class: "vc-hit", fill: "none", stroke: "transparent", "stroke-width": 16, "stroke-linecap": "round", "data-hover": "true" });
    const base = svgEl("path", { class: "vc-base", fill: "none", stroke: cfg.color, "stroke-width": cfg.w, "stroke-linecap": "round", opacity: 0.85 });
    const live = svgEl("path", { class: "vc-live", fill: "none", stroke: cfg.plug, "stroke-width": cfg.w * 0.5, "stroke-linecap": "round", "stroke-dasharray": "1 9", opacity: 0.9 });
    g.append(hit, base, live);
    const endTop = svgEl("circle", { class: "vc-end", cx: A[0], cy: A[1], r: 2.4, fill: cfg.color, stroke: "#fff", "stroke-width": 0.8 });
    const endBot = svgEl("circle", { class: "vc-end", cx: B[0], cy: B[1], r: 2.4, fill: cfg.color, stroke: "#fff", "stroke-width": 0.8 });
    g.append(endTop, endBot);
    backLayer.appendChild(g);
    return { pts, n, segRest, base, live, hit, g, aA, aB, endTop, endBot, isStatic: isStaticSpec(cfg.a) && isStaticSpec(cfg.b), settled: false };
  };

  const cables = CFG.map(buildCable);

  let active: { c: Cable; i: number } | null = null;

  const simulate = (c: Cable) => {
    const A = c.aA(),
      B = c.aB(); // extrémités vivantes (suivent l'élément ancré)
    for (let i = 0; i < c.n; i++) {
      const p = c.pts[i];
      if (i === 0) {
        p.x = A[0];
        p.y = A[1];
        p.px = p.x;
        p.py = p.y;
        continue;
      }
      if (i === c.n - 1) {
        p.x = B[0];
        p.y = B[1];
        p.px = p.x;
        p.py = p.y;
        continue;
      }
      if (active && active.c === c && active.i === i) {
        p.px = p.x;
        p.py = p.y;
        continue;
      }
      const vx = (p.x - p.px) * DAMP,
        vy = (p.y - p.py) * DAMP;
      p.px = p.x;
      p.py = p.y;
      p.x += vx;
      p.y += vy + GRAV;
    }
    for (let k = 0; k < ITER; k++) {
      for (let i = 0; i < c.n - 1; i++) {
        const a = c.pts[i],
          b = c.pts[i + 1];
        const dx = b.x - a.x,
          dy = b.y - a.y,
          d = Math.hypot(dx, dy) || 0.001;
        const diff = ((d - c.segRest) / d) * 0.5,
          ox = dx * diff,
          oy = dy * diff;
        const aP = a.pinned || (active != null && active.c === c && active.i === i);
        const bP = b.pinned || (active != null && active.c === c && active.i === i + 1);
        if (aP && bP) continue;
        if (aP) {
          b.x -= ox * 2;
          b.y -= oy * 2;
        } else if (bP) {
          a.x += ox * 2;
          a.y += oy * 2;
        } else {
          a.x += ox;
          a.y += oy;
          b.x -= ox;
          b.y -= oy;
        }
      }
    }
  };

  const render = (c: Cable) => {
    const d = smoothPath(c.pts);
    c.base.setAttribute("d", d);
    c.live.setAttribute("d", d);
    c.hit.setAttribute("d", d);
    const A = c.pts[0],
      B = c.pts[c.n - 1];
    c.endTop.setAttribute("cx", A.x.toFixed(1));
    c.endTop.setAttribute("cy", A.y.toFixed(1));
    c.endBot.setAttribute("cx", B.x.toFixed(1));
    c.endBot.setAttribute("cy", B.y.toFixed(1));
  };

  // pré-stabilisation : les ancres sont déjà valides (math pure, pas de layout)
  for (let s = 0; s < 260; s++) for (const c of cables) simulate(c);
  for (const c of cables) render(c);

  if (reduced) {
    return () => {};
  }

  const nearestPoint = (loc: { x: number; y: number }) => {
    let best: { c: Cable; i: number } | null = null,
      bd = 24 * 24;
    for (const c of cables) {
      if (c.g.classList.contains("off")) continue;
      for (let i = 1; i < c.n - 1; i++) {
        const dx = c.pts[i].x - loc.x,
          dy = c.pts[i].y - loc.y,
          d = dx * dx + dy * dy;
        if (d < bd) {
          bd = d;
          best = { c, i };
        }
      }
    }
    return best;
  };

  const loop: RafLoop = createRafLoop(() => {
    const dragging = active != null;
    let anyAwake = dragging;
    for (const c of cables) {
      const isActive = dragging && active!.c === c;
      const needsSim = isActive || !c.isStatic || !c.settled;
      if (needsSim) {
        simulate(c);
        render(c);
      }
      if (c.isStatic && !isActive) {
        let energy = 0;
        for (const p of c.pts) energy += Math.abs(p.x - p.px) + Math.abs(p.y - p.py);
        c.settled = energy < SETTLE_EPS;
        if (!c.settled) anyAwake = true;
      } else {
        anyAwake = true; // câble ancré à un nuage : suit son flottement
      }
    }
    if (!anyAwake) return { sleep: true };
    return { fps: dragging ? 60 : 30 };
  });

  const onPointerDown = (e: PointerEvent) => {
    const loc = pointer.toViewBox(e.clientX, e.clientY);
    if (!loc) return;
    const hit = nearestPoint(loc);
    if (hit) {
      active = hit;
      svg.setPointerCapture?.(e.pointerId);
      e.preventDefault();
      loop.wake();
    }
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!active) return;
    const loc = pointer.toViewBox(e.clientX, e.clientY);
    if (!loc) return;
    const p = active.c.pts[active.i];
    p.x = loc.x;
    p.y = loc.y;
    active.c.settled = false;
    loop.wake();
  };
  const release = () => {
    active = null;
  };

  svg.addEventListener("pointerdown", onPointerDown);
  svg.addEventListener("pointermove", onPointerMove, { passive: true });
  svg.addEventListener("pointerup", release);
  svg.addEventListener("pointercancel", release);
  window.addEventListener("blur", release);

  const unMove = pointer.onMove(() => loop.wake());

  return () => {
    loop.dispose();
    unMove();
    svg.removeEventListener("pointerdown", onPointerDown);
    svg.removeEventListener("pointermove", onPointerMove);
    svg.removeEventListener("pointerup", release);
    svg.removeEventListener("pointercancel", release);
    window.removeEventListener("blur", release);
  };
}
