/**
 * Feuilles réactives au curseur — ultra-léger.
 *
 * La vie ambiante (balancement) reste portée par l'animation CSS `.sway`
 * (compositée, gratuite). Ce module n'ajoute QUE la réaction au curseur :
 * les feuilles proches s'inclinent à l'écart du pointeur (bourrasque) + un
 * frémissement décroissant, puis reviennent au repos par ressort.
 *
 * La boucle s'ENDORT dès que le curseur est loin ET les feuilles au repos
 * (0 coût CPU/GPU à l'idle), via `createRafLoop` + `pointer.onMove → wake`.
 */

import { createRafLoop } from "../lib/raf-loop";
import type { MountContext } from "../types";

const LEAF_TRANSFORM =
  /translate\(\s*([-\d.]+)[ ,]+([-\d.]+)\s*\)\s*rotate\(\s*([-\d.]+)\s*\)\s*scale\(\s*([-\d.]+)/;
const INFLUENCE = 64; // rayon d'influence (unités viewBox)
const MAX_DEG = 20; // inclinaison max d'une feuille
const IDLE_MS = 1400; // fenêtre « le curseur vient de bouger »

type Leaf = {
  el: SVGElement;
  cx: number;
  cy: number;
  a0: number;
  sc: number;
  px: number;
  py: number;
  flip: number;
  off: number;
  vel: number;
  ph: number;
};

export function mountPlants(ctx: MountContext): () => void {
  const { svg, pointer, reduced } = ctx;
  if (reduced) return () => {};

  const leaves: Leaf[] = [];
  svg.querySelectorAll<SVGElement>(".leaf, .leaf-d").forEach((el) => {
    const m = (el.getAttribute("transform") || "").match(LEAF_TRANSFORM);
    if (!m) return;
    const cx = +m[1],
      cy = +m[2],
      a0 = +m[3],
      sc = +m[4];
    // pivot en coordonnées viewBox (calculé une fois ; l'erreur due au sway CSS
    // ±1.5° est négligeable)
    let px = cx,
      py = cy,
      flip = 1;
    const parent = el.parentNode as SVGGraphicsElement | null;
    const ctm = parent?.getCTM?.();
    if (ctm) {
      const p = new DOMPoint(cx, cy).matrixTransform(ctm);
      px = p.x;
      py = p.y;
      flip = ctm.d < 0 ? -1 : 1;
    }
    leaves.push({ el, cx, cy, a0, sc, px, py, flip, off: 0, vel: 0, ph: Math.random() * 6.28 });
  });
  if (!leaves.length) return () => {};

  let lastMove = -1e4;

  const loop = createRafLoop((now) => {
    const t = now / 1000;
    const recentlyMoved = now - lastMove < IDLE_MS;
    const active = pointer.active;
    const mx = pointer.local.x,
      my = pointer.local.y;
    let activity = 0;

    for (const lf of leaves) {
      let target = 0;
      if (recentlyMoved && active) {
        const dx = lf.px - mx,
          dy = lf.py - my;
        const dist = Math.hypot(dx, dy);
        if (dist < INFLUENCE * 2.4) {
          const near = Math.exp(-dist / (INFLUENCE * 0.5));
          const bend = (dx >= 0 ? 1 : -1) * lf.flip * near * MAX_DEG;
          const tremble = Math.sin(t * 9 + lf.ph) * near * 4.5;
          target = bend + tremble;
        }
      }
      lf.vel += (target - lf.off) * 0.18;
      lf.vel *= 0.72;
      lf.off += lf.vel;
      activity += Math.abs(lf.vel) + Math.abs(lf.off - target);
      lf.el.setAttribute(
        "transform",
        `translate(${lf.cx},${lf.cy}) rotate(${(lf.a0 + lf.off).toFixed(2)}) scale(${lf.sc})`,
      );
    }

    // endort la boucle quand tout est au repos et que le curseur ne bouge plus
    if (activity < 0.15 && !recentlyMoved) return { sleep: true };
  });

  const unMove = pointer.onMove(() => {
    lastMove = performance.now();
    loop.wake();
  });

  return () => {
    unMove();
    loop.dispose();
  };
}
