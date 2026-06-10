/**
 * Suivi du pointeur en coordonnées viewBox, partagé par tous les modules.
 *
 * Optimisation clé (fixe le point chaud P3) : la matrice de conversion
 * écran → viewBox (`getScreenCTM().inverse()`) est **mise en cache** et
 * recalculée uniquement quand le SVG bouge réellement (scroll / resize), au
 * lieu d'un `getScreenCTM()` par frame et par module — qui forçait un flush de
 * layout à chaque image.
 *
 * Un SEUL tracker est créé par scène (un seul jeu de listeners `pointermove`)
 * puis injecté dans chaque module via le `MountContext`.
 */

import type { Vec2 } from "./iso";

export type PointerTracker = {
  /** Dernière position connue du pointeur, en coordonnées viewBox. */
  readonly local: Readonly<Vec2>;
  /** `true` tant que le pointeur est dans la fenêtre. */
  readonly active: boolean;
  /** Convertit un point client (px écran) en coordonnées viewBox (CTM caché). */
  toViewBox(clientX: number, clientY: number): Vec2 | null;
  /** S'abonne aux déplacements ; renvoie la fonction de désabonnement. */
  onMove(cb: (local: Readonly<Vec2>) => void): () => void;
  /** S'abonne à la sortie de fenêtre ; renvoie la fonction de désabonnement. */
  onLeave(cb: () => void): () => void;
  dispose(): void;
};

export function createPointerTracker(svg: SVGSVGElement): PointerTracker {
  let inverse: DOMMatrix | null = null;
  let dirty = true;
  const local: Vec2 = { x: -9999, y: -9999 };
  let active = false;

  const moveSubs = new Set<(local: Readonly<Vec2>) => void>();
  const leaveSubs = new Set<() => void>();

  const markDirty = () => {
    dirty = true;
  };

  const toViewBox = (clientX: number, clientY: number): Vec2 | null => {
    if (dirty || !inverse) {
      const ctm = svg.getScreenCTM();
      inverse = ctm ? ctm.inverse() : null;
      dirty = false;
    }
    if (!inverse) return null;
    const p = new DOMPoint(clientX, clientY).matrixTransform(inverse);
    return { x: p.x, y: p.y };
  };

  const onMove = (event: PointerEvent) => {
    const v = toViewBox(event.clientX, event.clientY);
    if (!v) return;
    local.x = v.x;
    local.y = v.y;
    active = true;
    moveSubs.forEach((cb) => cb(local));
  };

  const onLeave = () => {
    active = false;
    leaveSubs.forEach((cb) => cb());
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerleave", onLeave);
  // Le SVG peut se déplacer à l'écran → invalider le CTM mis en cache.
  window.addEventListener("scroll", markDirty, { passive: true, capture: true });
  window.addEventListener("resize", markDirty);

  return {
    get local() {
      return local;
    },
    get active() {
      return active;
    },
    toViewBox,
    onMove(cb) {
      moveSubs.add(cb);
      return () => moveSubs.delete(cb);
    },
    onLeave(cb) {
      leaveSubs.add(cb);
      return () => leaveSubs.delete(cb);
    },
    dispose() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", markDirty, { capture: true });
      window.removeEventListener("resize", markDirty);
      moveSubs.clear();
      leaveSubs.clear();
    },
  };
}
