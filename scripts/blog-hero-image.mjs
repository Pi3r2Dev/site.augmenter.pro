// Installe l'illustration d'un article de blog à partir d'un fichier source
// (sortie Gemini en général : 2752×1536 JPEG/PNG, trop lourd).
//
// Produit, selon la convention de public/images/blog/INDEX.md :
//   public/images/blog/<slug>.webp      hero 1600×900, cover, WebP q80 (< 300 Ko)
//   public/images/blog/og/<slug>.jpg    Open Graph 1200×630, cover, JPEG q82 mozjpeg
//
// Usage : node scripts/blog-hero-image.mjs <source> <slug>
import sharp from "sharp";
import { statSync } from "node:fs";
import { join } from "node:path";

const [, , source, slug] = process.argv;
if (!source || !slug) {
  console.error("usage: node scripts/blog-hero-image.mjs <source> <slug>");
  process.exit(1);
}

const hero = join("public/images/blog", `${slug}.webp`);
const og = join("public/images/blog/og", `${slug}.jpg`);

const meta = await sharp(source).metadata();
await sharp(source)
  .resize(1600, 900, { fit: "cover" })
  .webp({ quality: 80 })
  .toFile(hero);
await sharp(source)
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(og);

const kb = (p) => Math.round(statSync(p).size / 1024);
console.log(`source ${meta.width}×${meta.height} ${meta.format}`);
console.log(`${hero} ${kb(hero)} Ko`);
console.log(`${og} ${kb(og)} Ko`);
if (kb(hero) > 300) console.warn("⚠ hero > 300 Ko : baisser la qualité");
