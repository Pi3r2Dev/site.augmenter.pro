/**
 * API publique de la scène augmentée.
 *
 *  • `buildScene()`        → markup SVG + CSS runtime (à injecter).
 *  • `prepareScene(svg)`   → préparation DOM one-shot (sol, z-order, tags reveal).
 *  • `revealStage(svg, n)` → révélation progressive par chapitre.
 *  • `mountInteractions(svg)` → monte les 4 modules interactifs, renvoie un
 *    `dispose()` unique. Tout partage UN `PointerTracker` (CTM caché) et un canal
 *    `cloudAnchors` (clouds → cables).
 *
 * Le composant React ne connaît que ces fonctions — plus aucun `window.*`.
 */

import { buildScene } from "./build-scene";
import { project } from "./lib/iso";
import { createPointerTracker } from "./lib/pointer";
import { mountCables } from "./modules/cables";
import { mountClouds } from "./modules/clouds";
import { mountDesk } from "./modules/desk";
import { mountPlants } from "./modules/plants";
import type { CloudAnchors, MountContext, SceneMarkup } from "./types";

export { buildScene };
export type { SceneMarkup };

/** Chapitre d'apparition (`data-min`) de chaque groupe révélable de la scène. */
const REVEAL_GROUPS: Record<string, number> = {
  ".scr-emojis": 1,
  ".power": 1,
  ".plant-s1": 1,
  ".shadow-s1": 1,
  ".sbox": 2,
  ".shelf": 2,
  ".shelf2": 2,
  ".cams": 2,
  ".netlayer": 2,
  ".robot": 2,
  ".drone": 2,
  ".plant-s2": 2,
  ".shadow-s2": 2,
  ".mascot": 3,
  ".emojis": 3,
  ".plant-s3": 3,
  ".shadow-s3": 3,
};

/** Grande nappe d'ombre douce sous la composition (ancre la scène au sol). */
function addFloorGround(svg: SVGSVGElement): void {
  const ns = "http://www.w3.org/2000/svg";
  let defs = svg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS(ns, "defs");
    svg.insertBefore(defs, svg.firstChild);
  }
  defs.insertAdjacentHTML(
    "beforeend",
    `<radialGradient id="floor-pool" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#5b21b6" stop-opacity="0.30"/>
      <stop offset="50%" stop-color="#6d28d9" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <filter id="floor-blur" x="-30%" y="-60%" width="160%" height="220%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>`,
  );

  const group = document.createElementNS(ns, "g");
  group.setAttribute("class", "floor-ground");
  group.setAttribute("aria-hidden", "true");

  const [cx, cy] = project(30, 16, 0); // centroïde au sol de la composition
  const pool = document.createElementNS(ns, "ellipse");
  pool.setAttribute("cx", cx.toFixed(1));
  pool.setAttribute("cy", (cy + 22).toFixed(1));
  pool.setAttribute("rx", "258");
  pool.setAttribute("ry", "74");
  pool.setAttribute("fill", "url(#floor-pool)");
  pool.setAttribute("filter", "url(#floor-blur)");
  group.appendChild(pool);
  svg.insertBefore(group, svg.firstChild);
}

/** Le robot passe DERRIÈRE la plante de premier plan (pied de l'étagère droite). */
function moveForegroundPlant(svg: SVGSVGElement): void {
  const robot = svg.querySelector(".robot");
  const plant = svg.querySelector(".plant-s2");
  if (robot && plant) robot.after(plant);
}

/** Tague les groupes révélables (`data-min`) avant la première révélation. */
function tagRevealGroups(svg: SVGSVGElement): void {
  for (const [selector, min] of Object.entries(REVEAL_GROUPS)) {
    svg.querySelectorAll<SVGElement>(selector).forEach((el) => {
      el.classList.add("grp");
      el.dataset.min = String(min);
    });
  }

  // la figure de dos disparaît quand la mascotte « se retourne »
  svg.querySelectorAll<SVGElement>(".mascot-back").forEach((el) => el.classList.add("grp"));

  // l'ombre du personnage n'apparaît QU'AVEC la mascotte (étape 3)
  const plainShadows = Array.from(svg.querySelectorAll<SVGElement>(".shadows > .shadow")).filter(
    (s) => !/shadow-s\d/.test(s.getAttribute("class") ?? ""),
  );
  if (plainShadows[1]) {
    plainShadows[1].classList.add("grp");
    plainShadows[1].dataset.min = "3";
  }
}

/** Préparation DOM one-shot, à appeler juste après l'injection du markup. */
export function prepareScene(svg: SVGSVGElement): void {
  addFloorGround(svg);
  moveForegroundPlant(svg);
  tagRevealGroups(svg);
}

/** Révèle/masque les groupes selon le chapitre courant (transition d'opacité CSS). */
export function revealStage(svg: SVGSVGElement, stage: number): void {
  svg.querySelectorAll<SVGElement>(".grp[data-min]").forEach((el) => {
    el.classList.toggle("off", Number(el.dataset.min) > stage);
  });
}

/**
 * Monte les modules interactifs (nuages, câbles, écran/clavier, feuilles) sur un
 * `MountContext` partagé. À n'appeler que sur desktop pointeur fin sans
 * `reduced-motion` ; renvoie un `dispose()` qui démonte tout proprement.
 */
export function mountInteractions(svg: SVGSVGElement): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const pointer = createPointerTracker(svg);
  const cloudAnchors: CloudAnchors = {};
  const ctx: MountContext = { svg, pointer, reduced, finePointer, cloudAnchors };

  // ordre important : clouds publie les ancres AVANT que cables ne les lise
  const disposers = [mountClouds(ctx), mountCables(ctx), mountDesk(ctx), mountPlants(ctx)];

  return () => {
    disposers.forEach((dispose) => dispose());
    pointer.dispose();
  };
}
