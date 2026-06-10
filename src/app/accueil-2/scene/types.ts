/**
 * Contrats partagés de la scène augmentée.
 */

import type { Vec2 } from "./lib/iso";
import type { PointerTracker } from "./lib/pointer";

/** Sortie de la génération de scène : à injecter dans le `<svg>` + un `<style>`. */
export type SceneMarkup = {
  /** Contenu du `<defs>` (gradients, filtres). */
  defs: string;
  /** Corps du SVG (tous les groupes de la scène). */
  inner: string;
  /** Attribut `viewBox` recadré sur le contenu. */
  viewBox: string;
  /** Règles CSS générées au runtime (animation navette drone/colis). */
  css: string;
};

/** Identifiant des deux nuages liquides. */
export type CloudKey = "IA" | "Cli";

/**
 * Position viewBox courante du centre réactif (`.cl-react`) de chaque nuage,
 * publiée par le module `clouds` et lue par `cables` pour ancrer les fils
 * aériens SANS lecture de layout (`getScreenCTM`) par frame.
 */
export type CloudAnchors = Partial<Record<CloudKey, Vec2>>;

/** Contexte injecté dans chaque module interactif au montage. */
export type MountContext = {
  svg: SVGSVGElement;
  /** Tracker pointeur partagé (CTM mis en cache). */
  pointer: PointerTracker;
  /** `prefers-reduced-motion: reduce`. */
  reduced: boolean;
  /** `(hover: hover) and (pointer: fine)` — desktop avec souris. */
  finePointer: boolean;
  /** Canal partagé clouds → cables (positions vivantes des nuages). */
  cloudAnchors: CloudAnchors;
};

/** Un module interactif : monte sur le `MountContext`, renvoie son `dispose()`. */
export type SceneModule = (ctx: MountContext) => () => void;
