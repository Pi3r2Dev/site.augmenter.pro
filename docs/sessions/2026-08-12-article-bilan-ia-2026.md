---
date: 2026-08-12
slug: article-bilan-ia-2026
status: open
mode: solo
parent_plan: docs/prevision_contenu.md
tags: [contenu, seo, geo, maillage]
---

# Publier le bilan IA janvier-juillet 2026 avec maillage bidirectionnel complet

## Status
green — article livré, buildé, commité/pushé par le watcher ; restent 3 actions manuelles post-déploiement.

## Done in this session
- Article `/blog/bilan-ia-janvier-juillet-2026` (~2 600 mots, 9 chapitres + FAQ, vouvoiement) : course des modèles, Google AI Overviews France (22 juillet), open source vs privé, agents (OpenClaw/Hermes/Moltbook), Buzz de Dorsey, sécurité (21 000 instances exposées), Mistral/souveraineté, prix (–88 % tokens). Chaque chapitre conclu par un **verdict PME**.
- Donnée originale terrain : mission Reva 9 **anonymisée** (« PME de motoculture du Val d'Oise ») — ~190 h ≈ 6 000 € TTC, sourcée depuis `../odoo-reva9/docs/reva9/devis/devis-002.md` + `devis-003.md`.
- FAQ JSON-LD (4 questions), 7 `<Memo>`, Callout/PullQuote/KeyTakeaways, 12 sources externes datées.
- Maillage **sortant** : 10 liens internes (1 par chapitre). Maillage **entrant** : 5 retrofits (claude-code-prompt-architecture, configurer-odoo, comparatif-llm [encart fraîcheur], agent-ia, cybersecurite [bullet risques agents]).
- Intégration : catalog `resources.ts` (1re position, pains demarrage/cyber/prestataire), sitemap, news-sitemap, llms.txt (résumé dense), swap home ch05 (bilan remplace prompt-audit-Fable).
- Image hero Gemini convertie (WebP 48 Ko + OG JPEG 50 Ko) + INDEX.md images.
- Fix CSS global : `.takeaways-block li strong` illisible (écrasé par `.prose-article li strong`) → doré `--ra-400`, corrige tous les KeyTakeaways du site.
- Post-relecture externe : titre SERP → « Bilan IA 2026 : ce que votre concurrent a déjà compris », meta enrichie (–58 %, –88 %, 190 h). Points 3 et 5 du relecteur déjà en place (TL;DR auto, FAQ JSON-LD).
- Article dédié planifié dans `docs/prevision_contenu.md` : « Ce que ChatGPT dit de votre PME » (captures réelles requises).

## Files touched
- `src/app/blog/bilan-ia-janvier-juillet-2026/page.tsx` — nouvel article
- `src/data/resources.ts` — entrée catalog 1re position
- `public/sitemap.xml` · `public/news-sitemap.xml` · `public/llms.txt` — entrées ajoutées
- `src/app/blog/{claude-code-prompt-architecture,configurer-odoo-ia-claude-cowork,comparatif-llm-vente-commerciale,agent-ia-dirigeant-pme,cybersecurite-pme-guide-pratique}/page.tsx` — liens entrants
- `src/app/home-narrative/chapters/ch05-recit.tsx` — swap article vedette
- `src/app/globals.css` — fix takeaways strong doré
- `public/images/blog/bilan-ia-janvier-juillet-2026.webp` + `og/…jpg` + `INDEX.md`
- `docs/prevision_contenu.md` — article planifié 2026-08-11

## Git state
- Branch: `main` (sync origin/main, 0/0)
- Uncommitted : `next.config.ts` modifié + `docs/seo-audits/2026-08-12-diagnostic-chute-juillet-plan-action.md` non suivi — **étrangers à cette session** (autre chantier en cours)
- Travail de session : déjà commité/pushé par le watcher auto-commit (commits `6e0c557`, `6133af4`, `797bae0`, `ae89613`)

## Test status
- Snapshot: `green` — `npm run build` passé avec la route `/blog/bilan-ia-janvier-juillet-2026` générée
- Source: next build (webpack)

## Next concrete step
1. **Ping IndexNow** post-déploiement : `curl "https://api.indexnow.org/indexnow?url=https://augmenter.pro/blog/bilan-ia-janvier-juillet-2026&key=<CLE>"` — vérifier d'abord que la clé Bing est déposée en `public/<clé>.txt` (sinon : prérequis Bing Webmaster Tools une fois).
2. **Captures LLM T0** (Pierre, manuel) : tester « bilan IA premier semestre 2026 PME France » + « meilleure agence IA PME Yvelines » dans ChatGPT/Perplexity/Claude, capturer — sert de baseline T0 pour la citation ET de matière pour l'article dédié planifié.
3. `/relecture-editoriale` sur l'article (passage charte complet).

## Open decisions
- Datation : article daté « 29 juillet 2026 » (fin de fenêtre) avec `dateModified` 2026-08-11 posé par Pierre — sitemap/news-sitemap restés au 29/07. Aligner si on redate.

## Blockers
- DataForSEO MCP : crédits épuisés (HTTP 402) — volumes de mots-clés non vérifiés pour cet article (pari fraîcheur/GEO assumé).

## How to resume
1. Lire ce doc + `docs/prevision_contenu.md` (section 2026-08-11).
2. Vérifier si le déploiement Hostinger a suivi le push, puis dérouler les 3 next steps.
3. `/flow resume`
