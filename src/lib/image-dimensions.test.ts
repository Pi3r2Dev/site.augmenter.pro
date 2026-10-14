import { describe, expect, it } from "vitest";
import { webpDimensions } from "./image-dimensions";

/** En-tête RIFF/WEBP + code de chunk, complété à 30 octets. */
function webp(chunk: string, fill: (buf: Buffer) => void): Buffer {
  const buf = Buffer.alloc(30);
  buf.write("RIFF", 0, "ascii");
  buf.writeUInt32LE(22, 4);
  buf.write("WEBP", 8, "ascii");
  buf.write(chunk, 12, "ascii");
  fill(buf);
  return buf;
}

describe("webpDimensions", () => {
  it("lit un WebP lossy (VP8 ) en ignorant les bits d'échelle", () => {
    const buf = webp("VP8 ", (b) => {
      b.write("\x9d\x01\x2a", 23, "latin1");
      b.writeUInt16LE(1600 | 0xc000, 26); // 2 bits d'échelle à 1 : à masquer
      b.writeUInt16LE(900 | 0x4000, 28);
    });
    expect(webpDimensions(buf)).toEqual({ width: 1600, height: 900 });
  });

  it("lit un WebP lossless (VP8L)", () => {
    const buf = webp("VP8L", (b) => {
      b.writeUInt8(0x2f, 20);
      b.writeUInt32LE((1200 - 1) | ((675 - 1) << 14), 21);
    });
    expect(webpDimensions(buf)).toEqual({ width: 1200, height: 675 });
  });

  it("lit un WebP étendu (VP8X)", () => {
    const buf = webp("VP8X", (b) => {
      b.writeUIntLE(2400 - 1, 24, 3);
      b.writeUIntLE(1350 - 1, 27, 3);
    });
    expect(webpDimensions(buf)).toEqual({ width: 2400, height: 1350 });
  });

  it("renvoie null pour un fichier qui n'est pas un WebP", () => {
    const png = Buffer.alloc(30);
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(png);
    expect(webpDimensions(png)).toBeNull();
    expect(webpDimensions(Buffer.from("RIFF"))).toBeNull();
  });
});
