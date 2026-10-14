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

## gbp-cover.jpg (couverture Google Business Profile)

- **Statut** : visuel de couverture de la fiche Google augmenter.pro (remplace la photo de sceaux Ouquequoi.fr qui s'y affichait au 2026-10-14)
- **Source** : illustration Gemini dédiée (`Gemini_Generated_Image_r5jo1kr5jo1kr5jo.jpg`, 2752 × 1536), redimensionnée en 16:9. Remplace le premier jet du 2026-10-14 tiré de l'OG.
- **Description** : diorama isométrique 3D d'un bureau de dirigeant, palette violet / ambre / beige. Un homme travaille sur un portable affichant un tableau de bord, un petit robot assistant souriant se tient à côté, tableau blanc couvert de schémas, plantes et bibliothèques. Aucun texte dans l'image.
- **Dimensions** : 1920 × 1080 px (16:9 — minimum Google 1024 × 576)
- **Poids** : ~138 Ko (JPEG q=85)
- **Alt text** : "Bureau de dirigeant de PME en illustration isométrique, accompagné d'un assistant IA — augmenter.PRO"
- **Usage** : upload manuel dans GBP → Photos → Couverture. Non référencé par le site. Scène centrée avec marge : supporte le recadrage en bandeau large de Google sur mobile.

## gbp-logo.png (logo Google Business Profile)

- **Statut** : logo de la fiche Google augmenter.pro
- **Source** : rendu 720 px de `src/app/icon.svg` (carré violet `#7c3aed` arrondi, éclair blanc)
- **Dimensions** : 720 × 720 px (1:1 — recommandation Google)
- **Poids** : ~24 Ko (PNG)
- **Usage** : upload manuel dans GBP → Photos → Logo. Non référencé par le site.
