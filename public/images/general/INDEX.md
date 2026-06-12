# Images — Général (site-wide)

Assets partagés hors blog / équipe. Référence pour LLM et cohérence des alt texts.

---

## og-augmenter-pro.jpg (canonical OG / social)

- **Statut** : Image Open Graph active — **JPEG prioritaire** pour Facebook, WhatsApp, X, plugins SEO
- **Source** : dérivé de `Gemini_Generated_Image_vdv3xrvdv3xrvdv3.png` (variante gagnante)
- **Dimensions** : 1200 × 630 px (1.91:1)
- **Poids** : ~92 Ko (JPEG q=75)
- **Alt text** : "augmenter.PRO — Diorama isométrique ordinateur & robots PME, consultant IA Claude Code, Odoo, audit IT 78/95"
- **Usage** : `src/app/layout.tsx` → `openGraph.images`, `twitter.images`, `<link rel="image_src">`
- **URL prod** : `https://augmenter.pro/images/general/og-augmenter-pro.jpg`

## og-augmenter-pro.webp (archive / perf locale)

- **Dimensions** : 1200 × 630 px
- **Poids** : ~76 Ko
- **Note** : non référencé dans les meta tags (WebP mal supporté par certains plugins SEO et previews Facebook)

## og-augmenter-pro-twitter.jpg

- **Note** : doublon de `og-augmenter-pro.jpg` — conservé pour compat si ancien deploy ; canonical = `.jpg` sans suffixe `-twitter`
