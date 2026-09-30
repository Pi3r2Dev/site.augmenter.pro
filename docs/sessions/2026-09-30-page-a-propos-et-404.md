---
date: 2026-09-30
slug: page-a-propos-et-404
status: open
mode: solo
parent_plan: docs/plans/2026-09-30-page-a-propos-et-404.md
tags: [geo, identite, maillage, conversion, 404]
---

# Page `/a-propos` (identité citable + carte des ressources) et refonte de la 404

## Status
green — livré, buildé, testé, Lighthouse passé. Branche `feat/a-propos` **non poussée** : Pierre pousse, déploie, puis soumet les URL (liste ci-dessous).

## Done in this session
- `src/data/site-resources.ts` — source unique « carte des ressources » : 12 pages de décision déclarées une fois avec leur verdict, + tous les articles, idées et prompts tirés du catalog, + matrice de capacités chiffrée depuis `capabilities.ts`. Groupement par **intention du dirigeant** (5 intentions, une ressource = une intention = sa première douleur du catalog), dédoublonnage par URL (le guide 2027 est déclaré « outil », son entrée article s'efface). Recherche sur les titres isolée dans `src/lib/title-search.ts` (aucune dépendance data, pour le bundle client de la 404). Test : `src/data/site-resources.test.ts` (15 cas).
- `/a-propos` — `src/app/a-propos/page.tsx` (server) + `proof-cards.tsx` (client, 4 `TrustStatCard`). Trois blocs : fiche d'identité en dix lignes (qui, quoi, pour qui **avec limites**, où, depuis quand, comment, ce qu'on refuse ×6, combien, comment on écrit, contact) ; preuves (4 formulations « effort d'équipe » figées par la minimisation du 2026-08-26, mission ERP décrite par sa durée et un seul poste, code public, analyses sourcées, avis renvoyés vers la fiche Google) ; carte complète (69 ressources) par intention, cartes pour outils/pages, lignes compactes pour le reste. Une seule porte : `/contact`. Tutoiement. JSON-LD `AboutPage` (mainEntity → `#organization`, about → `#person`) + `ItemList` avec `description` = verdict.
- Relecture éditoriale appliquée : meta description en douleur (« Tu te méfies des consultants IA ? Tu as raison. … »), limite explicite dans « Pour qui », même texte répercuté dans `llms-full.txt`.
- Maillage : footer « Identité & Légal » (1re position), plan du site, page auteur (chip « À propos d'augmenter.PRO »), sitemap (`lastmod` 2026-09-30, priorité 0.8), **tête de la section « À propos » de `llms.txt`**, index + section complète de `llms-full.txt`.
- 404 — `src/app/not-found.tsx` (server, statut 404 natif conservé, calcule sélection + index de titres) + `src/components/layout/not-found-view.tsx` (client) : gradient CSS + un `LiquidBlob`, recherche sur les titres, 8 entrées décisives, CTA `/contact`. Une blague (« On a cherché aussi. Rien. »).
- Tests d'hygiène étendus (`seo-hygiene.test.ts`) : `/a-propos` présent dans sitemap / llms / llms-full / plan du site / footer / page auteur ; la section « À propos » de `llms.txt` ouvre sur la page ; `lastmod` ≥ 2026-09-30 ; aucun « gratuit »/« offert », aucun balisage d'avis dans `src/app/a-propos/**`, `not-found.tsx`, `not-found-view.tsx`.
- Vérifications : `tsc` 0 erreur · `npm run lint` 0 erreur (5 warnings préexistants dans `docs/ClaudeDesign_handoff`) · `npm test` 108/108 · `npm run build` OK (`/a-propos` statique, `s-maxage=300`) · `curl` : `/a-propos` 200, URL inconnue 404.
- Lighthouse desktop (`lighthouse@12`, preset desktop, `next start`) sur `/a-propos` : **perf 95 · a11y 96 → contraste corrigé après coup · best practices 100 · SEO 100**. LCP **0,8 s** sur le `h1` (TTFB 129 ms, render delay 692 ms = polices, aucun délai d'affichage d'élément), CLS 0,002, TBT 160 ms.
- Lighthouse mobile émulé (slow 4G simulé) : `/a-propos` perf 85, LCP 3,8 s, CLS 0,003 — au niveau du hub `/augmenter-mon-entreprise` (perf 84, LCP 3,5 s) mesuré dans les mêmes conditions. Lighthouse refuse d'auditer une réponse 404 (comportement normal).
- Vérification mobile émulée (puppeteer-core, 390 px, DPR 2) : aucun débordement horizontal sur `/a-propos` ni sur la 404 ; la recherche de la 404 répond (« odoo » → article Odoo + prompt Odoo 19). Captures dans le scratchpad de session.

## Décisions à connaître
- **Confidentialité client** : aucun chiffre brut de la mission (ni 1 360, ni 98,6 %, ni 7 346…), aucun nom, aucun secteur précis, aucun montant de prestation. Seuls repères : « PME de négoce technique en Île-de-France », durée (5 mois, 15 min à 2 h 30 par intervention), les 4 formulations figées, et la comparaison marché 15 000-25 000 € (donnée publique déjà publiée dans le bilan).
- **TJM non publié.** Prix affichés = ceux déjà publics (360° 550 €, Cowork 450 € HT, Code 650 € HT, « 2 à 10 k€ HT une tâche » du guide 2027).
- Les verdicts d'articles gardent leur vouvoiement d'origine dans la carte (citations du catalog, cohérent avec le hub).
- Les navigateurs MCP (chrome-devtools, playwright) étaient tenus par une autre session : Lighthouse en CLI, captures via Chrome headless avec profil dédié.

## Files touched
- `src/data/site-resources.ts` · `src/data/site-resources.test.ts` · `src/lib/title-search.ts`
- `src/app/a-propos/page.tsx` · `src/app/a-propos/proof-cards.tsx`
- `src/app/not-found.tsx` · `src/components/layout/not-found-view.tsx`
- `src/components/layout/footer.tsx` · `src/app/plan-du-site/page.tsx` · `src/app/auteur/pierre-legrand/page.tsx`
- `public/sitemap.xml` · `public/llms.txt` · `public/llms-full.txt`
- `src/lib/seo-hygiene.test.ts`
- `docs/sessions/INDEX.md` · cette note

## Git state
- Branche `feat/a-propos` (depuis `main` @ `bcd89b0`), 6 commits de session : `42f5ae0` data · `b633701` page + maillage · `98e97a0` relecture · `9bcaa08` 404 · + contraste/handoff.
- Deux commits d'une autre session se sont intercalés sur la branche (`a665bdc`, `8522778`, réécriture « Ma PME en 2027 ») — ils sont fonctionnels avec ce chantier (le test lit le `tldr` dynamiquement). À garder au merge.
- **Rien n'est poussé.**

## Next steps (Pierre)
1. Relire `/a-propos` dans le navigateur (`npm run dev` → http://localhost:3000/a-propos et une URL au hasard pour la 404). Valider la fiche « Combien » (prix repris de pages déjà publiques) et la ligne « Depuis quand » (reprise de la page auteur).
2. Merge fast-forward sur `main` puis push :
   ```bash
   git checkout main && git merge --ff-only feat/a-propos && git push origin main
   ```
3. Après déploiement, ping IndexNow (Bing / ChatGPT Search) :
   ```bash
   curl -s -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" -d '{"host":"augmenter.pro","key":"96dcfd53b10246a296724faac42d91da","keyLocation":"https://augmenter.pro/96dcfd53b10246a296724faac42d91da.txt","urlList":["https://augmenter.pro/a-propos","https://augmenter.pro/plan-du-site","https://augmenter.pro/auteur/pierre-legrand","https://augmenter.pro/llms.txt"]}'
   ```
4. Search Console → Inspection d'URL → « Demander l'indexation », dans cet ordre : `https://augmenter.pro/a-propos` (en premier), `https://augmenter.pro/plan-du-site`, `https://augmenter.pro/auteur/pierre-legrand`. Puis re-soumettre `https://augmenter.pro/sitemap.xml`.
5. Purger le cache CDN hPanel si la home ou le footer semblent ne pas afficher « À propos » (HTML caché ≤ 5 min normalement).
6. Optionnel, hors périmètre : un visuel dédié OG pour `/a-propos` (Gemini → WebP/JPEG 1200×630) ; aujourd'hui la page hérite de l'image OG du site via `pageOpenGraph()`.
