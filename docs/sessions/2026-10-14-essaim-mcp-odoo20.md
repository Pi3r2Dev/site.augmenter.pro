---
date: 2026-10-14
slug: essaim-mcp-odoo20
status: open
mode: solo
tags: [seo, tier1, odoo, mcp, cout, geo]
---

# Essaim MCP / Odoo 20 : landing `/serveur-mcp-odoo` + 8 articles courts

## Status
green — livré, buildé, testé, commité sur `main`. **Rien n'est poussé** : Pierre pousse, déploie, puis soumet les URL.

## Done in this session
- **Landing** `/serveur-mcp-odoo` (tutoiement, Service + FAQPage JSON-LD) : douleur frontale, tableau « Odoo 20 donne / nous ajoutons », section **coût à l'usage** sourcée (crédits Odoo AI 1 €, sièges 20-25 $, machine à zéro la question), encarts carte graphique + fine-tuning (kiaraoke.fr), garde-fous, « ce qu'on refuse », 4 étapes, 8 lectures, FAQ. Maillée : footer, plan du site, carte des ressources, `/integration-mcp`.
- **Articles** (vouvoiement, 4-6 min, sauf le workflow long d'une autre session) : `cout-agent-ia-odoo` (pivot coût), `odoo-20-serveur-mcp-agents`, `agent-ia-qui-ne-touche-pas-aux-prix`, `petit-modele-bien-outille`, `ia-enrichir-catalogue-sans-perdre-la-main`, `odoo-online-ce-que-vous-ne-pouvez-pas-installer`, `logiciel-construit-par-agents-dix-semaines` + `claude-code-odoo-workflow` (session voisine, lien retour et paragraphe coût ajoutés).
- **Coût à l'usage** ajouté partout à la demande de Pierre (règle durable : mémoire `feedback_cout_usage_levier`).
- **Corrections le soir** (bilan de la session iaCommerce, vérifié à la source) : le MCP d'Odoo 20 a **27 outils dont Create/Update Records** (pas « lecture seule ») ; **plan Custom** (44,90 € vs 24,90 €) requis pour Studio, API externe et IA agentique → « Odoo Online, plan Custom ».
- Catalog `resources.ts`, `site-resources.ts`, sitemap, `llms.txt`, `llms-full.txt`, index images, terrains `terrain-iacommerce.md` (registre coût + Odoo 20 officiel + angles publiés) et `terrain-odoo-reva9.md` (angle 1 publié).
- Illustrations Gemini installées pour 7 articles ; outillage `scripts/blog-placeholder-images.mjs` (dégradé provisoire) et `scripts/blog-hero-image.mjs <source> <slug>` (hero WebP + OG JPEG).
- Commits : `ecee8c8` `b4b42b3` `8bc9682` `5a329b3` `669b62f` `bead0f3` `108f1b7` `4927814` `967f096` `157d9af` `6abc370` `36982eb` (+ `6357ff9` session voisine).
- Vérifs finales : build OK, 112/112 tests (Vitest 4), lint 0 erreur sur nos fichiers.

## Next step
1. **Visuel** de `cout-agent-ia-odoo` : seul provisoire restant, prompt Gemini dans `public/images/blog/INDEX.md` → `node scripts/blog-hero-image.mjs <source> cout-agent-ia-odoo`.
2. **Push + déploiement** (Pierre).
3. **IndexNow + GSC** sur les 9 URL : `/serveur-mcp-odoo` en premier, puis les 8 `/blog/…` ci-dessus.

## Open points
- **Lint rouge hors périmètre** : 3 erreurs dans `src/app/contact/quote-wizard.tsx` (setState dans un effet, composant créé au rendu), apparues après la montée de dépendances d'une session voisine (next 16.3.8, vitest 4). Fichier critique (réception des devis) : à corriger avant le prochain déploiement.
- **Accord Pierre** : nommer le produit (iaCommerce) sur la page, ou rester sur « notre serveur MCP pour Odoo ».
- **ChatGPT Business** non chiffré (page officielle inaccessible) : « même ordre de grandeur ».
- **Odoo 20** : page « AI API keys » en construction ; quand elle sort, mettre à jour l'article Odoo 20 (modèle local possible côté Odoo ?) et le terrain.
- Coût par conversation **non mesuré** côté produit (ADR-002) : ne rien publier de chiffré tant que ce n'est pas mesuré.
