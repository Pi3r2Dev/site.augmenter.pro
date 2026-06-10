/**
 * Tracés organiques lissés, partagés par les modules de scène.
 * Catmull-Rom → Bézier cubique, repris à l'identique du prototype handoff.
 */

import type { Vec2 } from "./iso";

/**
 * Chemin lissé (ouvert) passant par une polyligne de points `{x, y}`.
 * Utilisé par les câbles Verlet (caténaire qui pend).
 */
export function smoothPath(points: ReadonlyArray<Vec2>): string {
  if (points.length < 2) return "";
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)},${c2x.toFixed(1)} ${c2y.toFixed(1)},${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/**
 * Tracé de blob organique FERMÉ (Catmull-Rom radial), façon goutte de lava-lamp.
 * `squish` module l'irrégularité du rayon, `stretch` aplatit horizontalement.
 * Utilisé par les nuages liquides.
 */
export function blobPath(
  cx: number,
  cy: number,
  r: number,
  n: number,
  seed: number,
  squish: number,
  stretch = 1,
): string {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr =
      r *
      (1 + Math.sin(seed + i * 1.7) * squish + Math.cos(seed * 2 + i) * squish * 0.6);
    pts.push([cx + Math.cos(a) * rr * stretch, cy + Math.sin(a) * rr]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)},${c2x.toFixed(1)} ${c2y.toFixed(1)},${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
}
