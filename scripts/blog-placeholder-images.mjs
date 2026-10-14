// Visuels provisoires pour un article de blog, en attendant l'illustration
// générée par l'utilisateur (Gemini, cf. /create-article étape 4).
//
// Pourquoi : le catalog (`src/data/resources.ts`) exige un `image` par article
// et les cartes de /blog le rendent via <Image>. Un article intégré sans
// fichier image = carte cassée et og:image en 404 dès que le watcher pousse.
// Ce script pose un dégradé violet → ambre déterministe par slug (hero WebP
// 1600×900 + Open Graph JPEG 1200×630), à REMPLACER par le vrai visuel.
//
// Usage : node scripts/blog-placeholder-images.mjs <slug> [<slug>...]
import sharp from "sharp";
import { join } from "node:path";

const slugs = process.argv.slice(2);
if (slugs.length === 0) {
  console.error("usage: node scripts/blog-placeholder-images.mjs <slug>...");
  process.exit(1);
}

function svg(seed) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
  const circles = Array.from({ length: 5 }, (_, i) => {
    const cx = 200 + rnd() * 1200;
    const cy = 120 + rnd() * 660;
    const r = 60 + rnd() * 180;
    const o = 0.12 + rnd() * 0.18;
    const fill = i % 2 ? "#f59e0b" : "#ffffff";
    return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${fill}" fill-opacity="${o.toFixed(2)}"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5b21b6"/>
      <stop offset="55%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#g)"/>
  ${circles}
  <path d="M0 760 Q 400 640 800 740 T 1600 700 L1600 900 L0 900 Z" fill="#ffffff" fill-opacity="0.10"/>
  <rect x="120" y="120" width="1360" height="660" rx="40" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="3"/>
</svg>`;
}

for (const slug of slugs) {
  const buf = Buffer.from(svg(slug));
  await sharp(buf)
    .webp({ quality: 80 })
    .toFile(join("public/images/blog", `${slug}.webp`));
  await sharp(buf)
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join("public/images/blog/og", `${slug}.jpg`));
  console.log("ok", slug);
}
