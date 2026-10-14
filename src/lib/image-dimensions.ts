/**
 * Dimensions d'un WebP lues dans son en-tête RIFF, sans dépendance.
 *
 * `sharp` n'est qu'un transitif de Next, pas une dépendance du projet : on ne
 * s'y adosse pas. Sert au juge Discover (ADR 0007), qui exige des visuels
 * d'article d'au moins 1 200 px de large.
 */
export function webpDimensions(
  buf: Buffer,
): { width: number; height: number } | null {
  if (buf.length < 30) return null;
  if (buf.toString("ascii", 0, 4) !== "RIFF") return null;
  if (buf.toString("ascii", 8, 12) !== "WEBP") return null;

  switch (buf.toString("ascii", 12, 16)) {
    case "VP8 ": // lossy : largeur et hauteur sur 14 bits après le start code
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      };
    case "VP8L": {
      // lossless : 14 bits largeur - 1, puis 14 bits hauteur - 1
      const bits = buf.readUInt32LE(21);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
    case "VP8X": // étendu : 24 bits largeur - 1, puis 24 bits hauteur - 1
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    default:
      return null;
  }
}
