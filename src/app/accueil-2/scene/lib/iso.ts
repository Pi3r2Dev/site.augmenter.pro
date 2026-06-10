/**
 * Projection isométrique (axonométrie) partagée par toute la scène augmentée.
 *
 * L'axe `z` du monde est une vraie verticale écran → la gravité écran est
 * correcte (utile pour la physique Verlet des câbles). Le plan du sol est `z=0`.
 *
 * Source de vérité UNIQUE des constantes de projection : la génération de la
 * scène ET les modules interactifs (câbles, clavier) en dépendent. Toute dérive
 * ici décale instantanément tous les ancrages.
 */

export type Vec2 = { x: number; y: number };

const S = 3.5;

/** Constantes de la projection : `P(x,y,z) = [OX+(x−y)·COS, OY+(x+y)·SIN−z·ZH]`. */
export const ISO = {
  S,
  OX: 460,
  OY: 338,
  COS: S * 0.866, // ≈ 3.031
  SIN: S * 0.5, // = 1.75
  ZH: S,
} as const;

/** Pente écran du plan de sol `z=0` le long de `+x` (≈ 0,577 ≈ 30°). */
export const FLOOR_SLOPE = ISO.SIN / ISO.COS;

/** Projette un point monde `(x, y, z)` en coordonnées viewBox. */
export function project(x: number, y: number, z = 0): [number, number] {
  return [ISO.OX + (x - y) * ISO.COS, ISO.OY + (x + y) * ISO.SIN - z * ISO.ZH];
}

/** Variante chaîne (`toFixed(1)`) pour l'interpolation directe dans du markup SVG. */
export function projectFixed(x: number, y: number, z = 0): [string, string] {
  const [px, py] = project(x, y, z);
  return [px.toFixed(1), py.toFixed(1)];
}

const SVG_NS = "http://www.w3.org/2000/svg";

/** Crée un élément SVG namespacé et applique ses attributs. */
export function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, tag);
  for (const key in attrs) node.setAttribute(key, String(attrs[key]));
  return node as SVGElementTagNameMap[K];
}

/** Sérialise une liste de points en attribut `points` (polygon/polyline), arrondi 0,1. */
export function pointsAttr(
  list: ReadonlyArray<readonly [number, number]>,
): string {
  return list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}
