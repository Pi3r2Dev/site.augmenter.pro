# Commande : Audit SEO complet du site

Tu es un consultant SEO senior spécialisé dans les sites vitrine francophones et l'optimisation GEO (Generative Engine Optimization) pour les moteurs IA. Tu vas réaliser un audit SEO **exhaustif, data-driven et actionnable** de **augmenter.pro** et produire un rapport de niveau référence avec plan d'action priorisé.

Cet audit doit croiser : (1) l'état technique du site, (2) les données réelles de performance (GSC), (3) les opportunités du marché (DataForSEO), (4) le paysage concurrentiel, (5) la visibilité dans les moteurs génératifs (ChatGPT, Perplexity, Google AI Overviews), et (6) la qualité E-E-A-T du contenu.

## Contexte projet

**À lire en premier** : [`.claude/templates/seo/project-context.md`](.claude/templates/seo/project-context.md)

Ce fichier centralise : positionnement, stack technique, stack SEO/LLM en place, **audience et modalités géographiques** (formation présentielle 78/95 vs. visio national vs. déplacements gros projets), pyramide d'offres, contraintes éditoriales (mot « gratuit » interdit, ton provocateur, people-first), identité éditoriale, conventions de code.

Spécifique à cette commande — l'audit SEO doit croiser :
1. État technique du site
2. Données réelles de performance (GSC)
3. Opportunités marché (DataForSEO)
4. Paysage concurrentiel
5. Visibilité moteurs génératifs (ChatGPT, Perplexity, AI Overviews)
6. Qualité E-E-A-T du contenu

---

> **Bibliothèque d'appels MCP** : [`.claude/templates/seo/mcp-calls.md`](.claude/templates/seo/mcp-calls.md) — signatures vérifiées (notamment les pièges `dimensions` string CSV pour GSC, `location_name` pour DFS Labs, accès Backlinks gated).
> **Check-lists d'audit (§F)** : [`.claude/templates/seo/checklist.md`](.claude/templates/seo/checklist.md) §F « Audit complet ».

## Phase 0 — Préparation & baseline

### 0.1 Vérification des outils disponibles

Commencer par tester les MCP (cf. [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §0 « Pings de validation ») et noter l'état dans une section « Outils disponibles » du rapport :

| Outil | Test | Si disponible | Si absent |
|-------|------|---------------|-----------|
| GSC MCP | `mcp__google-search-console__list_sites` | Phase 2 complète | Recommander installation |
| DataForSEO MCP | `mcp__dfs-mcp__kw_data_google_ads_locations` (`country_iso_code: "FR"`) | Phases 3/4/5/6 complètes | Fallback web search |
| DFS Backlinks (sous-souscription) | `mcp__dfs-mcp__backlinks_summary` | Phase 5 complète | **Skip Phase 5** (subscription requise) |
| Firecrawl MCP | `mcp__firecrawl__firecrawl_scrape` sur augmenter.pro | Phase 4 crawl concurrents | Fallback fetch / Playwright |
| Playwright MCP | `mcp__plugin_playwright_playwright__browser_navigate` | Tests rendering + CWV visuels | Skip |

### 0.2 Baseline instantanée (si GSC MCP dispo)

- `list_sites` → confirmer que `sc-domain:augmenter.pro` ou `https://augmenter.pro/` est connecté
- `search_analytics` (dimensions: `date` ; 90 derniers jours) → courbe clics/impressions
- `list_sitemaps` → sitemaps soumis à Google
- Snapshot : total clics 30j, total impressions 30j, position moyenne, CTR moyen

Cette baseline servira de référence pour mesurer l'impact des actions proposées.

---

## Phase 1 — Audit technique on-site

### 1.1 Crawl exhaustif des pages

**Pages à auditer (lecture source + parsing) :**
- `src/app/page.tsx` (accueil — hérite layout)
- `src/app/layout.tsx` (metadata globale + JSON-LD Organization/LocalBusiness/WebSite)
- `src/app/prestations/page.tsx` (Service/OfferCatalog)
- `src/app/approche/page.tsx` (FAQPage)
- `src/app/idees/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/<slug>/page.tsx` (tous les articles)
- `src/app/prompts/page.tsx` + `prompt-library.tsx`
- `src/app/contact/page.tsx` + `contact-form.tsx`
- `src/app/mentions-legales/page.tsx`

**Pour chaque page, vérifier :**
- [ ] `<title>` unique, < 60 caractères, power word + géo si pertinent
- [ ] `<meta description>` unique, < 155 caractères, avec CTA clair
- [ ] Hiérarchie Hn correcte (un seul H1, H2 ordonnés, pas de sauts)
- [ ] Mot-clé principal identifiable dans title, H1, première phrase
- [ ] Liens internes (nombre, diversité d'ancres, profondeur)
- [ ] Images avec `alt` descriptif en français
- [ ] Contenu suffisant (> 300 mots pour page service, > 1000 mots pour article de fond)
- [ ] JSON-LD présent et pertinent pour le type de page
- [ ] Signaux E-E-A-T (Phase 7)
- [ ] Contenu people-first (actionnable, angle original)
- [ ] Originalité : apporte une valeur absente des SERP concurrents
- [ ] Pas d'utilisation du mot interdit « gratuit » (remplacer par « offert »)

### 1.2 Données structurées (JSON-LD)

Vérifier validité et complétude de chaque schema :
- [ ] `layout.tsx` — Organization (`@id`, name, url, founder, contactPoint, sameAs)
- [ ] `layout.tsx` — LocalBusiness (areaServed 78/95, priceRange, knowsAbout, geo)
- [ ] `layout.tsx` — WebSite (publisher ref vers Organization, potentialAction SearchAction)
- [ ] `article-layout.tsx` — Article (headline, author Pierre Legrand, publisher, datePublished, dateModified, keywords, url via slug, image)
- [ ] `approche/page.tsx` — FAQPage (mainEntity, questions/answers suffisamment longues)
- [ ] `prestations/page.tsx` — Service + OfferCatalog (prix, descriptions, URLs, areaServed)
- [ ] `testimonials.tsx` — AggregateRating + Review (ratingValue, reviewCount, reviewBody authentique)
- [ ] Tous les articles passent bien le prop `slug` et `dateISO` à ArticleLayout

**Validation externe** : pour 3-5 URLs prioritaires, appel `mcp-calls.md` §7 (`on_page_content_parsing`) sur l'URL publique pour récupérer le DOM réel et croiser avec le code source (vérifie que le SSR produit bien ce qui est attendu).

### 1.3 Core Web Vitals & performance (Lighthouse via DataForSEO)

**Si DataForSEO disponible :** pour chaque page clé (home, approche, blog, un article représentatif, contact), appel `mcp-calls.md` §4 (`on_page_lighthouse`, `for_mobile: true`).

Extraire et tabuler :
- **Performance** score + LCP, FID/INP, CLS, TBT, TTFB
- **Accessibility** score + issues (contrast, labels, landmarks)
- **Best Practices** score + issues
- **SEO** score + issues (meta, viewport, tap targets, hreflang)

Seuils Core Web Vitals = voir [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §4.

Si Lighthouse indisponible, utiliser Playwright MCP pour mesure manuelle via `browser_navigate` + `browser_evaluate` sur `performance.getEntriesByType('navigation')` et `PerformanceObserver` pour LCP/CLS.

### 1.4 Indexation Google (GSC — `index_inspect`)

Pour les 10-15 URLs les plus importantes, appel `mcp-calls.md` §1.7 (`index_inspect`).

Pour chaque URL, extraire :
- **Indexation** : `coverageState` Indexé / Non indexé / Exclu (+ raison : noindex, canonical, qualité, duplicate, crawl error)
- **Couverture** : `lastCrawlTime`, `crawledAs` (mobile/desktop), `robotsTxtState`
- **Canonical** : `googleCanonical` vs `userCanonical` (drift = problème)
- **Rich results** détectés (`richResultsResult.detectedItems` : Article, FAQ, Review snippets, Product, etc.)

**Seuil d'alerte** : si > 20 % des URLs prioritaires ne sont pas « Submitted and indexed » → investigation urgente.

> ⚠️ **Distinguer deux familles de problèmes** (J. Mueller, 2026) : (1) **« Couldn't fetch » / « Sitemap could not be read »** = problème **réseau/serveur** (timeout, 5xx, DNS, gzip, taille) → débugger l'infra, ce n'est PAS un signal qualité ; (2) **« Discovered / Crawled – currently not indexed »** = signal **qualité / demande** → Google n'explore pas en profondeur un site dont il ne juge pas le contenu « nouveau ou important ». Remède (1) = fix technique ; remède (2) = information gain + maillage interne + autorité, PAS « produire 60 articles » par réflexe. Avant de conclure « contenu insuffisant », vérifier que ce n'est pas un simple trou de **découverte** (lien interne manquant, URL absente du sitemap soumis, canonical divergent).

### 1.5 Architecture & maillage interne

- **Cartographie des liens** : parcourir chaque page et lister ses liens sortants internes
- **Pages orphelines** : pages sans aucun lien entrant (hors sitemap)
- **Profondeur** : calculer la distance en clics depuis la home (cible ≤ 3)
- **Header** (`header.tsx`) : cohérence des liens principaux + CTA
- **Footer** (`footer.tsx`) : liens secondaires, mentions légales, sitemap HTML
- **Cross-linking éditorial** : vérifier `src/app/blog/blog-view.tsx` (liste articles `/blog` — vraie source), `services.tsx`, `pricing.tsx`, `ideas.tsx`, `related-content.tsx` (note : `src/components/sections/blog-preview.tsx` est legacy post-refonte bento)
- **Diversité des ancres** : éviter les ancres répétitives (« cliquez ici », « en savoir plus ») — favoriser des ancres descriptives et riches en mot-clé secondaire
- **Ratio de liens internes par page** : cible minimum 3-5 liens contextuels sortants par article long

### 1.6 Fichiers SEO & crawlabilité

- [ ] `public/robots.txt` — autorise tous les bots, référence `sitemap.xml`, pas de `Disallow` accidentel
- [ ] `public/sitemap.xml` — toutes les pages indexables listées, `<lastmod>` ISO 8601 à jour, priorités cohérentes, pas de 404/redirect
- [ ] `public/news-sitemap.xml` — articles récents (< 48h idéalement, max 30 jours)
- [ ] `public/llms.txt` — synchronisé avec contenu réel (voir Phase 6)
- [ ] Pas d'URL avec paramètres query indexée accidentellement
- [ ] Pas de pagination mal gérée (rel=prev/next ou canonical vers page 1)

**Validation sitemap (si GSC dispo)** : appels `mcp-calls.md` §1.8 (`list_sitemaps`, `get_sitemap`). Vérifier : statut OK, erreurs/warnings (0 attendu), URLs soumises.

> ⚠️ Le compteur `indexed: 0` retourné par `list_sitemaps` est un **bug d'affichage GSC** connu — vérifier l'indexation réelle via `index_inspect` (§1.4), pas via ce compteur.

### 1.7 Technique (config Next.js + headers)

- [ ] `next.config.ts` : `output: "standalone"`, pas de `distDir` custom, redirects cohérents
- [ ] `metadataBase` défini dans `layout.tsx` (canonical URLs)
- [ ] Composants client (`"use client"`) minimisés — RSC par défaut
- [ ] Images via `<Image>` de `next/image` avec `priority` uniquement sur LCP
- [ ] Semantic HTML (`<article>`, `<nav>`, `<main>`, `<aside>`)
- [ ] Accessibilité basique (aria-labels sur boutons icônes, contraste)
- [ ] **Headers HTTP de sécurité** (à configurer dans `next.config.ts`) : `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Content-Security-Policy` basique
- [ ] Redirections 301 propres (pas de chaînes, pas de 302 là où 301 attendu)
- [ ] HTTPS forcé, HSTS présent
- [ ] Pas de mixed content

### 1.8 Technologies détectées (benchmark)

Optionnel — appel `mcp-calls.md` §7 (`domain_analytics_technologies_domain_technologies`) sur augmenter.pro + 3-5 concurrents → identifier avantages stack (Next.js vs WordPress legacy par ex.).

---

## Phase 2 — Performance réelle (Google Search Console)

**Toute cette phase suppose GSC MCP disponible.** Sans GSC, noter « Données de performance non disponibles — recommander installation du MCP google-search-console » et passer à la Phase 3.

> **Appels MCP** : voir [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §1. **Piège récurrent** : `dimensions` est une string CSV (`"query"`, `"page,query"`) — pas un array JSON.

### 2.1 Vue d'ensemble (trafic organique)

Appel : `mcp-calls.md` §1.1. Sortie attendue : **courbe clics/impressions 90 jours**. Détecter saisonnalité, baisses brutales, pics.

### 2.2 Requêtes qui amènent du trafic

Appel : `mcp-calls.md` §1.2. Analyser :
- **Top 20 requêtes** par clics
- **Top 20 requêtes** par impressions (souvent différent — réservoir caché)
- **Requêtes brandées** vs non brandées (ratio — sain = 30/70 non brandé/brandé pour un site mature)
- **CTR anormaux** : si CTR < 2 % en position 1-3 → title/description à optimiser
- **Intention par requête** : informationnelle / navigationnelle / commerciale / transactionnelle

### 2.3 Pages qui performent

Appel : `mcp-calls.md` §1.3. Sortie : classement des pages par clics, par impressions, par position moyenne, par CTR.

### 2.4 Couples page × requête

Appel : `mcp-calls.md` §1.4. **C'est l'or pur de l'audit** : révèle **sur quelles requêtes chaque page se positionne réellement** (souvent différent des mots-clés visés).

Pour chaque page importante :
- La requête qui amène le plus de clics = mot-clé « réel » de la page (peut différer du mot-clé « visé »)
- Requêtes secondaires positionnées = opportunités d'enrichissement on-page
- Cannibalisation : 2+ pages rankant sur la même requête → fusionner ou différencier

### 2.5 Quick Wins automatiques

Appel : `mcp-calls.md` §1.6. Détection automatique des requêtes en **position 4-10** avec impressions significatives et CTR sous-optimal. Intégrer directement les résultats au rapport.

### 2.6 Analytics enrichies (device, country, search appearance)

Appel : `mcp-calls.md` §1.5. Répéter avec dimensions `device`, `country`, `searchAppearance`, `query,device`.

Analyses clés :
- **Mobile vs Desktop** : position moyenne, CTR, taux de conversion estimé
- **Géographie** : trafic FR majoritaire ? Fuites internationales non utiles ?
- **Rich results** : quels types apparaissent (Article, FAQ, etc.) et avec quelle performance ?

### 2.7 Évolution (benchmarking temporel)

Comparer deux périodes de 90 jours (courante vs précédente) :
- Pages en progression (gain de clics/impressions/positions)
- Pages en régression (alerte : cannibalisation, obsolescence, concurrence accrue)
- Requêtes perdues (positionnaient avant, plus maintenant)
- Requêtes émergentes

### 2.8 Gap analysis GSC × DataForSEO

Ce croisement produit les recommandations les plus actionnables :

| Situation | Signal | Action |
|-----------|--------|--------|
| Mot-clé à fort volume (DFS) non présent dans GSC | Opportunité marché non ciblée | Créer page ou section dédiée |
| Mot-clé positionné (GSC) mais CTR faible | Title/description sous-optimisés | Réécrire avec power words + promesse |
| Mot-clé positionné (GSC) en perte de rang | Concurrence fraîche, contenu daté | Rafraîchir avec angle original |
| Mot-clé en position 8-20 avec impressions > 100 | Proche du top 5 | Enrichir contenu, interlinking, backlinks |
| Mot-clé en position 4-7 avec CTR < 5 % | Snippet battable | Optimiser title + structured data |

---

## Phase 3 — Recherche de mots-clés & sémantique (DataForSEO)

> **Appels MCP** : voir [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §2 (Labs + KW), §3 (SERP). **Pièges récurrents** :
> - DFS Labs (`dataforseo_labs_*`) : utiliser **`location_name: "France"` + `language_code: "fr"`** (pas `location_code` qui n'est pas accepté).
> - DFS KW Data (`kw_data_*`) : `location_code: 2250` OK.
> - Sur un petit domaine, `ranked_keywords` peut retourner un dataset très partiel — **GSC reste la source primaire** dans ce cas.

### 3.1 Keywords actuellement positionnés (par DataForSEO)

Appel : `mcp-calls.md` §2.1. Vue complémentaire à GSC. Extraire :
- Nombre total de mots-clés positionnés
- Distribution par tranche de position (1-3, 4-10, 11-20, 21-50, 51-100)
- Top 50 mots-clés par volume
- Estimation du trafic organique mensuel

### 3.2 Keyword ideas + suggestions + related (expansion)

Appels : `mcp-calls.md` §2.3.

À partir de 5-10 seed keywords stratégiques (`consultant IA PME`, `audit informatique PME Yvelines`, `automatisation entreprise`, `transformation digitale artisan`, `ChatGPT entreprise`, `IA pour BTP`, `n8n automatisation`, `formation IA dirigeant` + **`claude code prompt`**, **`odoo ia`** depuis l'audit 2026-05-21), produire un mini-cluster (50-100 suggestions par seed) → consolidé en Phase 8.

### 3.3 Volumes bulk + difficulté + intent + trafic estimé

Appels : `mcp-calls.md` §2.4 (4 endpoints à enchaîner sur la liste consolidée 200-500 mots-clés).

Classement intent : `informational` / `navigational` / `commercial` / `transactional`. Un site de consulting doit cibler majoritairement `commercial` + `informational` orienté conversion.

### 3.4 Tendances (Trends)

Appel : `mcp-calls.md` §2.6 (`kw_data_google_trends_explore`, complément `kw_data_dfs_trends_explore`).

Identifier :
- Mots-clés en croissance → prioriser dans le calendrier éditorial
- Saisonnalité (rentrée, Q4, début d'année)
- Pics liés à l'actualité (releases OpenAI/Anthropic, réglementation IA, etc.)

### 3.5 SERP analysis (top 10 keywords prioritaires)

Appel : `mcp-calls.md` §3 (`serp_organic_live_advanced`).

Extraire pour chaque SERP :
- **Top 10 URLs** (domaines, types de contenu : article, page service, comparatif)
- **Features** : Featured Snippet, People Also Ask, AI Overview, Video, Image pack, Local pack, Knowledge Graph
- **Longueur moyenne du contenu** top 3 (via content parsing si besoin — `mcp-calls.md` §7)
- **Format dominant** (guide long, page commerciale, liste, tutoriel)
- **Capture potentielle** : snippet vide, PAA mal répondu, AI Overview citant 5 sources dont aucune n'est augmenter.pro

### 3.6 Content analysis (veille + trendspotting)

Appels : `mcp__dfs-mcp__content_analysis_search` et `mcp__dfs-mcp__content_analysis_phrase_trends`. Identifier les angles éditoriaux qui gagnent en citations/partages.

---

## Phase 4 — Analyse concurrentielle (data-driven)

> **Appels MCP** : voir [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §2.5 (concurrents + intersection), §7 (technologies), §8 (Firecrawl).

### 4.1 Identification automatique des concurrents SEO

Appels : `mcp-calls.md` §2.5 (`competitors_domain` + `serp_competitors`).

Combiner les deux listes et sélectionner 5-8 concurrents pertinents par :
- **Type** : institutionnel (Bpifrance IA Booster, France Num, CCI), cabinets IA, MSP infogérance locaux (78/95), blogs IA B2B
- **Taille** : domain rank comparable (± 20 pts)
- **Overlap sémantique** : keywords en commun

### 4.2 Domain rank & vue d'ensemble

Appel : `mcp-calls.md` §2.2 (sur chaque concurrent). Tableau comparatif :

| Domaine | Domain Rank | KW organiques | Trafic estimé | KW top 3 | KW top 10 |
|---------|-------------|---------------|---------------|----------|-----------|

### 4.3 Content gap (domain intersection)

Appel : `mcp-calls.md` §2.5 (`domain_intersection` avec `intersection_mode: "concurrent_any_ours_none"`).

Chaque mot-clé retourné est une opportunité de contenu net à produire.

### 4.4 Crawl concurrentiel (Firecrawl)

Pour chaque concurrent, via `mcp-calls.md` §8 (`mcp__firecrawl__firecrawl_scrape` ou `firecrawl_crawl`) :
- Homepage + page services + 2-3 articles représentatifs
- Extraire : structure Hn, longueur, angle, format, rich snippets, CTAs
- Analyser : fonctionnalités différenciantes (chat, calculateur ROI, configurateur, études de cas, annuaire), types de preuves (logos clients, chiffres, témoignages)

Si Firecrawl indispo, fallback sur Playwright MCP (`browser_navigate` + `browser_snapshot`).

### 4.5 Technologies des concurrents

Appel : `mcp-calls.md` §7 (`domain_analytics_technologies_domain_technologies`).

Utile pour identifier : stack legacy (WordPress non optimisé) = opportunité de vitesse ; stack moderne = concurrent à surveiller de près.

### 4.6 Synthèse positioning

Tableau final :
| Concurrent | Type | Forces | Faiblesses | Opportunités pour nous |
|------------|------|--------|------------|-----------------------|

---

## Phase 5 — Audit backlinks (DataForSEO)

> ⚠️ **Phase entièrement gatée par la souscription DataForSEO Backlinks** (sans souscription, `40204 Access denied` sur tous les endpoints). Vérifier en Phase 0. Si indispo, écrire « Phase 5 skippée — souscription Backlinks non active » dans le rapport et passer à la Phase 6.
> **Tous les appels** : [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §5.

### 5.1 Synthèse augmenter.pro

Appel : `backlinks_summary`. Extraire : total backlinks, referring domains, rank, spam score global, do-follow ratio, anchor diversity.

### 5.2 Référents de qualité

Appel : `backlinks_referring_domains` (order by rank desc). Identifier backlinks premium vs low quality.

### 5.3 Spam score (nettoyage potentiel)

Appel : `backlinks_bulk_spam_score`. Si spam score > 30 % → audit détaillé des referring domains, potentiel désaveu.

### 5.4 Ancres

Appel : `backlinks_anchors`. Vérifier : diversité, ancres brandées vs keywords vs génériques, sur-optimisation (> 30 % ancres exact match = risque).

### 5.5 Nouveau & perdu (time series)

Appel : `backlinks_timeseries_new_lost_summary` (`date_from: <J-180>`). Tendance : croissance nette, plateau, ou hémorragie ?

### 5.6 Benchmark concurrents

Appels : `backlinks_bulk_ranks`, `backlinks_bulk_referring_domains`, `backlinks_competitors` sur `["augmenter.pro", "<c1>", "<c2>", ...]`.

### 5.7 Domain intersection backlinks (prospects à démarcher)

Appel : `backlinks_domain_intersection` avec `exclude_targets: ["augmenter.pro"]`.

Sites qui linkent 2+ concurrents mais pas augmenter.pro = **cibles prioritaires de digital PR / guest posting**.

---

## Phase 6 — Visibilité GEO (moteurs génératifs)

C'est **le chantier de différenciation** pour 2026. L'objectif explicite : être cité par **ChatGPT (Search)**, **Perplexity (Pages & Pro Search)**, **Google Gemini AI Mode / AI Overviews / SGE**, **Claude (web search)**, **Brave Summarizer**, **Bing Copilot** — quand un dirigeant PME formule une requête correspondant exactement aux prestations augmenter.pro.

> **Appels MCP** : voir [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §6 (DFS AI Optimization) + §8 (Firecrawl pour scraper concurrents) + Playwright MCP pour les tests directs multi-moteurs.
>
> **Logique de cette phase** : (1) on s'assure d'abord que les bots IA peuvent **crawler** le site → (2) on mesure ensuite la visibilité actuelle → (3) on identifie les **citation triggers manquants** → (4) on plante les jalons d'entité (Person, NAP, mentions externes).
>
> **Deux voies de citation à optimiser en parallèle** (cf. [`checklist.md`](.claude/templates/seo/checklist.md) §G intro) : (a) **retrieval live** = leviers on-page (§6.1 accessibilité bots, §6.7 citation triggers, §6.6 llms.txt) ; (b) **training data** = être *appris* par les modèles via des mentions dans des sources qu'ils ingèrent (publications, annuaires, podcasts, forums — §6.8 entity mentions externes). ⚠️ Le verrou diagnostiqué est la voie (b) : un contenu on-page scoré 10/10 (§6.7) reste silencieux à T+90 si l'entité externe est absente. Ne pas sur-investir le on-page au détriment de l'off-site.

### 6.1 Accessibilité des crawlers IA (prérequis bloquant)

**Auditer `public/robots.txt`** pour la présence de directives par bot. ⚠️ Nuance : `User-agent: * / Allow: /` **suffit déjà** à autoriser le crawl de tous les bots respectueux. Les blocs nommés servent à (1) l'opt-in/opt-out granulaire que certains tokens exigent (Google-Extended, Applebot-Extended), (2) documenter la posture bot par bot. **La vraie valeur du fichier est dans les `Disallow` ciblés + la lisibilité décisionnelle, pas dans les `Allow` redondants.** Et surtout : autoriser un bot ≠ être cité — le levier GEO réel est l'entité + les citation triggers (cf. §6.5-6.8), pas ce fichier.

Grille de référence (alignée sur le `robots.txt` réel au 2026-05-22) :

| Bot | Opérateur | Usage | Reco | Statut actuel |
|-----|-----------|-------|------|---------------|
| `GPTBot` | OpenAI | Entraînement ChatGPT | ✅ Allow | ✅ |
| `OAI-SearchBot` | OpenAI | Index ChatGPT Search (temps réel) | ✅ Allow | ✅ |
| `ChatGPT-User` | OpenAI | Fetch on-demand (user click) | ✅ Allow | ✅ |
| `ClaudeBot` / `Claude-Web` / `anthropic-ai` | Anthropic | Entraînement + fetch Claude | ✅ Allow | ✅ |
| `Googlebot` | Google | Crawl Search classique (= Gemini AI Mode / AI Overviews) | ✅ Allow (explicité pour lever l'ambiguïté avec Google-Extended) | ✅ |
| `Google-Extended` | Google | **Opt-OUT** entraînement Gemini/Vertex (absent = déjà autorisé) — ne crawle rien, n'influence pas la citation AI Overviews | ✅ Allow (documentaire) | ✅ |
| `Google-CloudVertexBot` | Google | Fetch on-demand agents Vertex AI | ✅ Allow | ✅ |
| `PerplexityBot` | Perplexity | Index Perplexity Search | ✅ Allow | ✅ |
| `Perplexity-User` | Perplexity | Fetch on-demand | ✅ Allow | ✅ |
| `Applebot-Extended` | Apple | Opt-in Apple Intelligence / Siri | ✅ Allow | ✅ |
| `Amazonbot` | Amazon | Alexa / Rufus | ✅ Allow | ✅ |
| `DuckAssistBot` | DuckDuckGo | DuckDuckGo AI | ✅ Allow | ✅ |
| `CCBot` | Common Crawl | Corpus open (Anthropic/Mistral/etc.) | ✅ Allow (asymétrie assumée vs Meta/ByteDance) | ✅ |
| `facebookexternalhit` | Meta | **Previews Open Graph** (FB/Messenger/WhatsApp/IG) — ≠ bot IA | ✅ Allow (assurance previews B2B) | ✅ |
| `meta-externalfetcher` | Meta | Fetch on-demand Meta AI (= ChatGPT-User côté Meta) | ✅ Allow (acté 2026-05-22 : fetch on-demand favorable citation ≠ training de masse) | ✅ |
| `Bytespider` | ByteDance | Doubao / TikTok AI (training) | ⚖️ Bloqué (faible ROI GEO FR) | 🚫 Disallow |
| `meta-externalagent` | Meta | Entraînement Llama (training de masse) | ⚖️ Bloqué (souveraineté ciblée) | 🚫 Disallow |

> ⚠️ Ne PAS confondre `meta-externalagent` (training Llama, bloqué) avec `facebookexternalhit` (previews sociales, autorisé) ni `FacebookBot` (crawl FB générique, pas un bot IA — ne sert à rien de le bloquer pour des raisons IA).

**Vérifications complémentaires** :
- [ ] Pas de `Disallow: /` accidentel pour les bots autorisés dans un futur ajout
- [ ] Header HTTP `X-Robots-Tag` n'inclut pas `noai` / `noimageai` sur les pages indexables
- [ ] CSP `frame-ancestors` n'empêche pas le rendu (Bing Copilot rend des pages pour extraction)
- [ ] `robots.txt` accessible en HTTP 200 (vérifier via `mcp__firecrawl__firecrawl_scrape`)
- [ ] ⚠️ **Aucune directive `Sitemap:` ne pointe vers `llms.txt` / `llms-full.txt`** (la directive attend du XML/liste d'URLs — un markdown y génère une erreur Search Console). Les fichiers LLM se découvrent par convention de chemin racine.
- [ ] La grille ci-dessus reste alignée avec le `robots.txt` réel (re-vérifier à chaque ajout de bot)

**Test crawl bot-by-bot** : `mcp__google-search-console__index_inspect` retourne le `crawledAs` Google ; pour les autres, utiliser `mcp-calls.md` §8 (Firecrawl avec header `User-Agent` custom) ou un fetch direct avec header `User-Agent: GPTBot/1.0`.

### 6.2 Mentions LLM actuelles (DataForSEO AI Optimization)

Appels : `mcp-calls.md` §6 (`ai_opt_llm_ment_search`, `ai_opt_llm_ment_agg_metrics`, `ai_opt_llm_ment_top_domains`, `ai_opt_llm_ment_top_pages`).

Mesurer :
- Nombre de mentions par LLM (ChatGPT, Perplexity, Gemini, Claude)
- Requêtes qui déclenchent une mention
- Pages citées
- **Domaines co-cités** (concurrents dans le « Graph de citations ») → identifier qui prend notre place

> 💳 **Mesure baseline de mentions LLM** : si des crédits DataForSEO sont disponibles, établir une baseline via les endpoints `ai_optimization_llm_mentions_*` (filters / agg metrics / top domains / top pages — cf. `mcp-calls.md` §6.1) et l'archiver dans `docs/seo-audits/<date>-data/`. ⚠️ **Crédits DataForSEO épuisés au 2026-06-10** : si toujours le cas, écrire « baseline mentions LLM non mesurée — crédits DFS épuisés » et se rabattre sur les tests directs §6.3 (Playwright) pour une mesure qualitative.

### 6.3 Tests directs multi-moteurs

Bibliothèque de **15-20 prompts** typiques d'un dirigeant PME cible (à maintenir dans `docs/seo-audits/<date>-data/geo-prompts.md`). Exemples :
- « Quel consultant IA pour PME en Yvelines ? »
- « Comment intégrer Odoo avec une IA ? »
- « Combien coûte un audit informatique pour une PME du BTP ? »
- « Quel prompt utiliser pour structurer Claude Code ? »
- « Formation IA pour dirigeant PME en présentiel près de Versailles »
- « Comment se mettre en conformité NIS2 quand on est une PME ? »

Pour chaque prompt, tester via :

| Moteur | Méthode | Outil |
|--------|---------|-------|
| ChatGPT (Search) | API scraper DFS | `mcp__dfs-mcp__ai_optimization_chat_gpt_scraper` |
| Generic LLM (GPT/Claude/Gemini) | API scraper DFS | `mcp__dfs-mcp__ai_optimization_llm_response` |
| **Perplexity Pro** | Playwright | `mcp__plugin_playwright_playwright__browser_navigate` → `https://www.perplexity.ai/?q=<prompt>` + `browser_snapshot` |
| **Google Gemini AI Mode** | Playwright | `https://gemini.google.com/` ou paramètre `?udm=50` sur Google Search |
| **Google AI Overviews / SGE** | DFS SERP | `mcp-calls.md` §3 → bloc `ai_overview` dans `serp_organic_live_advanced` |
| **Brave Summarizer** | Playwright | `https://search.brave.com/search?q=<prompt>&summary=1` |
| **Bing Copilot** | Playwright | `https://www.bing.com/chat` (nécessite login compte Microsoft) |
| **Claude** (web search) | Playwright | `https://claude.ai/new` (manuel, ou skip si pas d'access API) |

Pour chaque (prompt × moteur), capturer :
- augmenter.pro cité ? (oui/non + URL exacte si oui)
- Position dans la liste de sources (1/3, 2/5, etc.)
- Texte cité verbatim (le fragment précis utilisé)
- Sources concurrentes citées à notre place

Synthèse en tableau Phase 10 §7.3 du rapport.

#### Test après publication (boucle de validation GEO)

Pour chaque nouveau contenu de type `rapport-sectoriel-local` publié (cf. Phase 8.2), exécuter un protocole de re-test :

| Étape | Délai | Action |
|-------|-------|--------|
| T0 | Jour de publication | Logger l'URL + la requête locale cible dans `docs/seo-audits/<date>-data/geo-prompts.md` |
| T+7 | 5-10 jours après | Re-tester la requête sur ChatGPT Search + Perplexity (méthodes du tableau §6.3 ci-dessus) — logger : cité oui/non, position, fragment |
| T+30 | 30 jours après | Re-tester sur les 7 moteurs du tableau §6.3 — logger résultat complet |
| T+90 | 90 jours après | Vérification finale + décision : contenu performant (citations stables) → dupliquer le pattern sur autre secteur ; contenu silencieux → analyser pourquoi (entity, format, distribution, autorité du domaine) |

Format de log à maintenir dans `geo-prompts.md` :

```markdown
### <Requête locale> — publié le YYYY-MM-DD — URL: /blog/rapport-...

| Date test | Moteur | Cité ? | Position | Fragment cité | Concurrents citants |
|-----------|--------|--------|----------|---------------|---------------------|
| T+7 | ChatGPT | non | — | — | site-a.fr, site-b.com |
| T+7 | Perplexity | oui | 2/4 | « ... » | site-c.fr |
| T+30 | ... | ... | ... | ... | ... |
```

**Pourquoi** : la visibilité LLM se mesure dans le temps (les index LLM ne crawlent pas en temps réel comme Google) ; un contenu peut n'apparaître qu'après 7-30 jours. Le tracking permet d'identifier ce qui marche vraiment et d'**industrialiser le format gagnant** plutôt que de produire à l'aveugle.

### 6.4 AI Overviews & blocs génératifs dans Google SERP

Dans les résultats `serp_organic_live_advanced` (Phase 3.5), repérer les blocs :
- `ai_overview` (Google AI Overviews — version stable)
- `ai_overview_reference` (citations directes dans AIO)
- `people_also_ask` enrichis (souvent alimentent les AI Overviews)
- `discussions_and_forums` (Reddit / Quora source des AIO)

Pour chaque SERP analysé :
- AI Overview présent ? Quelles sources (3-5 URLs) ?
- augmenter.pro figure-t-il ? Sinon, caractéristiques des URLs citées (longueur, structure Hn, présence FAQ schema, présence date `dateModified`, nom auteur explicite ?)
- **Hypothèse à valider** : sur 5 prompts BTP/Yvelines, est-ce que les sources citées ont systématiquement (a) un auteur Person schema, (b) une date < 6 mois, (c) une FAQ section ?

### 6.5 Entity author — Person JSON-LD Pierre Legrand + NAP consistency

**Constat 2026** : Gemini AI Mode et ChatGPT Search citent presque systématiquement le **nom de l'auteur** quand celui-ci a une entité reconnue (Wikidata, LinkedIn vérifié, GitHub actif). Sans entité auteur, les LLMs citent le domaine de manière anonyme — moins de poids E-E-A-T.

**Auditer** :
- [ ] Existe-t-il une page `/auteur/pierre-legrand` (ou `/a-propos/pierre-legrand`) ? Si non → 🔴 critique
- [ ] Cette page contient-elle un JSON-LD `Person` avec : `name`, `jobTitle`, `worksFor` (ref Organization), `sameAs: [LinkedIn, GitHub, X, France Num annuaire, Bpifrance directory]`, `knowsAbout: [IA, automatisation, audit IT, ...]`, `alumniOf` si applicable, `description` ≥ 150 mots ?
- [ ] Chaque `ArticleLayout` injecte-t-il `Article.author` avec une ref `@id` vers la page auteur (et pas juste une string) ?
- [ ] Le `headshot` de Pierre Legrand est-il consistant sur toutes les pages (mêmes pixels, ou au moins même framing) ?

**NAP (Name / Address / Phone) consistency** — vérifier sur toutes les pages publiques :
- [ ] Nom exact : `augmenter.PRO` vs `augmenter.pro` vs `Augmenter Pro` → **une seule forme** sur tout le site
- [ ] Adresse complète (rue + CP + ville) cohérente entre footer, page contact, mentions légales, JSON-LD LocalBusiness
- [ ] Téléphone (si affiché) au format E.164 dans le JSON-LD
- [ ] SIRET / numéro de TVA cohérent entre mentions légales et CGV
- [ ] Heures d'ouverture si applicable (LocalBusiness.openingHoursSpecification)

> ⚠️ Les LLMs vérifient cette cohérence pour valider l'entité — un Pierre Legrand mentionné comme "consultant IA" sur une page et "expert digital" sur une autre = dilution du signal entity.

### 6.6 `llms.txt` + `llms-full.txt`

#### 6.6.1 `public/llms.txt` (résumé indexable)

Vérifier que `public/llms.txt` contient :
- [ ] Résumé clair (5-10 lignes) : qui, quoi, pour qui, pourquoi
- [ ] Liste structurée des services avec prix exacts (0 €, 225 €)
- [ ] Liste complète des articles avec titre + URL + résumé en 1 ligne + **date de publication ISO 8601**
- [ ] FAQ principales extraites de `/approche`
- [ ] Contact + zone géographique (Yvelines, Val d'Oise, visio France entière)
- [ ] Pas de hallucinations (services qui n'existent pas, prix faux)
- [ ] Lien vers `llms-full.txt` à la fin (cf. ci-dessous)
- [ ] Ressources markdown liées (prompts téléchargeables, audits publics, etc.)

#### 6.6.2 `public/llms-full.txt` (format étendu, optionnel mais recommandé)

Standard émergent (cf. [llmstxt.org](https://llmstxt.org)) — version étendue contenant le **contenu complet en markdown** de toutes les pages indexables, optimisée pour ingestion LLM en une seule requête.

- [ ] `public/llms-full.txt` existe ? Si non → 🟠 à créer (génération scriptée depuis le contenu existant)
- [ ] Format : pour chaque page → titre H1 + URL canonique + dateModified + corps complet en markdown clean (pas de JSX, pas de classes Tailwind)
- [ ] Taille raisonnable (< 5 MB — au-delà, splitter en `llms-full-blog.txt`, `llms-full-services.txt`)
- [ ] Référencé dans `llms.txt` et dans `robots.txt` (`Sitemap: https://augmenter.pro/llms-full.txt`)

### 6.7 Citation triggers — grille spécifique

Pour chaque article et chaque page service, scorer ces 10 « déclencheurs de citation » (les LLMs préfèrent ces patterns pour produire des extraits cités) :

| # | Trigger | Format attendu | Présent ? |
|---|---------|----------------|-----------|
| 1 | **Définition courte en intro** (≤ 25 mots) | « X est Y qui Z. » dans le 1er paragraphe | [ ] |
| 2 | **Tableaux comparatifs** | ≥ 1 `<table>` markdown avec en-têtes clairs | [ ] |
| 3 | **Données chiffrées sourcées** | Chiffres au format `X %` ou `X €` + source en lien | [ ] |
| 4 | **Listes numérotées** | Étapes 1, 2, 3 ou « Top N » | [ ] |
| 5 | **FAQ format Q→A direct** | `<h3>Question ?</h3><p>Réponse en 1-3 phrases.</p>` + FAQPage schema | [ ] |
| 6 | **Timestamps explicites** | « Au 21 mai 2026, … » ou « Mise à jour mai 2026 » visible | [ ] |
| 7 | **Attribution claire** | « Selon Pierre Legrand, consultant IA chez augmenter.pro, … » | [ ] |
| 8 | **Auteur identifié + lien** | Lien vers page auteur en haut/bas, schema `Article.author` | [ ] |
| 9 | **TL;DR / résumé exécutif** | Encadré 3-5 bullets en haut de l'article | [ ] |
| 10 | **Citation-friendly URL** | Slug court, descriptif, kebab-case, max 5 mots | [ ] |

**Score cible** : ≥ 7/10 sur les pages stratégiques (services + top 5 articles par trafic GSC).

**Schémas JSON-LD complémentaires à considérer** (en plus de ceux existants) :
- `HowTo` sur articles méthodologiques (« Comment intégrer Claude Code à votre PME »)
- `Product` + `aggregateRating` sur chaque offre individuelle (`/approche#prestations` → un Product par palier)
- `BreadcrumbList` sur toutes les pages profondes (≥ 2 niveaux)
- `VideoObject` si vidéo embarquée
- `Course` si la formation est packagée en module

### 6.8 Entity mentions externes (signaux off-site)

Les LLMs valident l'entité « augmenter.pro » via des **mentions externes vérifiables**. Auditer :

| Source | Vérification | Action si absent |
|--------|--------------|------------------|
| Wikidata | Pierre Legrand a-t-il une entrée Q-item ? augmenter.pro a-t-il une fiche entreprise ? | 🟠 Créer si signaux suffisants (≥ 3 mentions presse) |
| LinkedIn | Profil Pierre Legrand → poste « Consultant IA chez augmenter.pro » exact ? Page entreprise augmenter.pro existe ? | 🔴 Aligner si décalage |
| GitHub | Bio Pierre Legrand → mention augmenter.pro ? | 🟡 Ajouter dans bio |
| France Num annuaire « Activateur » | augmenter.pro listé ? | 🟠 Demander label (cf. STRATEGIE-EDITORIALE §10) |
| Bpifrance « IA Booster » directory | augmenter.pro listé ? | 🟠 Demander label |
| CCI Yvelines / Val d'Oise | Profil entreprise déclaré ? | 🟡 Optionnel |
| Mentions presse (Le Parisien Yvelines, Les Échos Solutions, etc.) | ≥ 1 citation indexable ? | 🟢 Long terme — digital PR |
| Annuaires sectoriels (Welcome to the Jungle, Malt Pro, etc.) | Profil consultant ? | 🟡 Optionnel |

Outil de mesure : `mcp__dfs-mcp__backlinks_referring_domains` (Phase 5, si souscription active) → identifier les domaines d'autorité qui linkent augmenter.pro. **Sans souscription Backlinks**, fallback : recherche Google `"augmenter.pro" -site:augmenter.pro` via SERP scraper.

### 6.9 Indexation Bing / IndexNow & surface GitHub (cf. checklist §G.8 / §G.9)

Deux leviers GEO ajoutés au 2026-06-10, longtemps angles morts du projet. Auditer :

**Indexation Bing / IndexNow** (cf. [`checklist.md`](.claude/templates/seo/checklist.md) §G.8) — ChatGPT Search s'appuie sur l'index **Bing**, pas Google :
- [ ] Site vérifié dans **Bing Webmaster Tools** (import propriété GSC) ?
- [ ] **Clé IndexNow** présente et servie en HTTP 200 à `https://augmenter.pro/<clé>.txt` ? (tester via `mcp__firecrawl__firecrawl_scrape`)
- [ ] Procédure de **ping IndexNow** intégrée au workflow de publication / modification (cf. [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §9, [`/create-article`](.claude/commands/create-article.md), [`/modify-resource`](.claude/commands/modify-resource.md)) ?
- [ ] Échantillon d'URLs récentes : sont-elles indexées dans Bing ? (recherche `site:augmenter.pro` sur bing.com)

**Surface GitHub** (cf. [`checklist.md`](.claude/templates/seo/checklist.md) §G.9) — voie *training data*, citations LLM sur les prompts :
- [ ] Les **prompts majeurs** publiés sur le site ont-ils un **repo public miroir** GitHub ?
- [ ] Repos conformes : README **FR/EN**, **lien canonique** vers augmenter.pro, licence **MIT**, mention **augmenter.pro + Pierre Legrand** ?
- [ ] Bio GitHub de Pierre Legrand mentionne augmenter.pro (recoupe §6.8 entity mentions) ?

> ⚠️ Si la clé IndexNow ou le compte Bing WMT n'existent pas encore → **actions manuelles utilisateur** à lister dans le plan d'action (§11) avec la procédure pas-à-pas de [`mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §9.1.

### 6.10 Synthèse Phase 6 dans le rapport

Restituer en §7 du rapport (cf. [`report.md`](.claude/templates/seo/report.md)) :
- Tableau accessibilité bots (§6.1) — verdict bot par bot
- Tableau citations actuelles par LLM × prompt (§6.3) — score visibilité
- Tableau AI Overviews observés (§6.4) — taux de capture vs concurrents
- Verdict entity author (§6.5) — Person schema présent oui/non, NAP consistency oui/non
- Score citation triggers moyen sur top 10 pages (§6.7) — ex. 5.3/10
- Verdict indexation Bing/IndexNow + surface GitHub (§6.9) — clé présente oui/non, repos prompts oui/non
- Liste des actions Critique / Haute pour rejoindre le top des sources citées (§11 du rapport)

---

## Phase 7 — Évaluation E-E-A-T approfondie

augmenter.pro est un site de conseil avec décisions financières impliquées = domaine **YMYL adjacent** → standard E-E-A-T élevé.

**Utiliser la grille complète** : [`.claude/templates/seo/eeat-grid.md`](.claude/templates/seo/eeat-grid.md)

Elle contient :
- Barème par signal (Experience, Expertise, Autorité, Fiabilité — 0-5 chacun)
- Check-lists auteur + autorité du domaine
- Seuils d'action (< 10 / 10-15 / > 15)
- Format de restitution pour le rapport
- Anti-patterns à flagger immédiatement

Appliquer la grille à **chaque page indexable** et remplir le tableau §8 du rapport.

---

## Phase 8 — Stratégie de contenu & topical authority

### 8.1 Topical map

Depuis les keyword clusters de la Phase 3, construire une carte thématique :
- **Piliers** (5-7 grands sujets — ex. « IA pour PME », « Automatisation métier », « Cybersécurité PME », « Adoption IA dirigeants », « IA locale 78/95 »)
- **Supports** (15-25 articles sous chaque pilier)
- **Interconnexion** : chaque article support linke vers son pilier + 2-3 autres supports pertinents

Visualiser sous forme de tableau :
| Pilier | Article support | Mot-clé | Volume | Difficulté | Intent | Statut (existe / à créer / à refresh) |

### 8.2 Calendrier éditorial (15-20 briefs **rédigés**, pas juste listés)

**Format de chaque brief** : [`.claude/templates/seo/article-brief.md`](.claude/templates/seo/article-brief.md)

Ce template couvre : titre SEO, slug, kw principal + secondaires + volumes, intent, pilier, persona cible, douleur adressée, angle différenciant, promesse, preuves, plan H2/H3, CTA, longueur, liens internes, RICE, trafic estimé, trimestre.

**Produire 15 à 20 briefs** classés par RICE décroissant.

**Exigence GEO — minimum 2-3 briefs au format `rapport-sectoriel-local`** (cf. `article-brief.md` §Format). Ce format optimise spécifiquement la citation par les LLMs (ChatGPT Search, Perplexity, Gemini AI Mode) qui privilégient les contenus à structure de rapport / étude / classement plutôt que les pages services classiques. Couvrir au moins un secteur par brief (ex. BTP 78/95, artisans 95, industrie 78, immobilier Yvelines). Trafic search direct attendu modeste — l'objectif est la **visibilité dans les sources citées par les LLMs**, mesurable en Phase 6.3.

Rappel de ton : provocateur, pas SEO corporate.
- ✅ « ChatGPT dans votre PME : 3 chantiers utiles, 5 pièges qui coûtent cher »
- ✅ « Automatiser votre devis BTP : ce que personne ne vous dit avant de signer »
- ❌ « Les avantages de l'IA pour les PME »

### 8.3 Refresh planning

Pour les articles existants :
- **À rafraîchir** (> 12 mois + perte de position GSC) : liste + actions spécifiques
- **À fusionner** (cannibalisation détectée Phase 2.4) : liste + URL de destination + redirects 301
- **À splitter** (page trop large cible des intents divergents)
- **À supprimer** (zombie pages sans trafic ni rôle SEO ni valeur)

### 8.4 Pages manquantes stratégiques (fiches spec prêtes à implémenter)

**Format de chaque fiche** : [`.claude/templates/seo/page-spec.md`](.claude/templates/seo/page-spec.md)

Ce template couvre : URL, type, objectif business, kw + volume, H1, hook, plan des sections, schema JSON-LD, images, maillage entrant/sortant, CTA, effort, priorité — ainsi que les **10 catégories de pages à considérer systématiquement** (services sectoriels, pages locales, comparateurs, études de cas, page auteur, hub ressources, glossaire, IA Booster, calculateur ROI, Activateur France Num).

---

## Phase 9 — Recommandations éditoriales & cohérence de l'offre

Cette phase transforme le diagnostic en **livrables copy prêts à intégrer**. Elle va au-delà du SEO pur : elle questionne la cohérence de l'offre commerciale, la structuration du parcours de conversion et le ton éditorial.

### 9.1 Audit de cohérence de l'offre

Lire avec une attention particulière :
- `src/app/page.tsx` (homepage) + `src/components/sections/hero.tsx`, `trust.tsx`, `services.tsx`, `pricing.tsx`, `cta.tsx`
- `src/app/prestations/page.tsx` (source de vérité prix)
- `src/app/approche/page.tsx` (méthode + FAQ)
- Data : `src/data/prompts.ts` + tout fichier data

**Grille d'analyse :**

| Critère | Vérification |
|---------|--------------|
| Value proposition | Est-elle identique sur home / approche / prestations / contact ? Si non, hiérarchiser et harmoniser. |
| Différenciation services | Les 5 (ou N) services sont-ils clairement distincts dans l'esprit du lecteur ? Qui fait quoi, pour qui, à quel prix ? |
| Parcours de conversion | Le lecteur comprend-il en 10 secondes quelle est la **prochaine étape** (Audit 180° offert) ? |
| Cohérence des prix | L'offre 0€ → 225€ → sur mesure crée-t-elle une échelle lisible ? Y a-t-il un palier manquant (150€ ? 500€ ? 1500€ abonnement) ? |
| Naming des offres | « Audit 180° », « Audit 360° IA Booster » sont-ils mémorables, différenciants, parlent-ils au client ? |
| CTAs | Sont-ils homogènes (même libellé, même URL cible) à travers le site ? |
| Ton | Le ton « provocateur, douleur-centric » est-il porté partout, ou dilué en SEO corporate sur certaines pages ? |
| Preuves | Sur chaque page clé, y a-t-il au moins : un chiffre, un logo client, un témoignage, un cas concret ? |
| Anti-« gratuit » | Le mot « gratuit » est-il absent partout ? Remplacé correctement par « offert », « sans engagement », « inclus » ? |

Produire un **tableau des incohérences détectées** avec : page concernée, problème, correction proposée.

### 9.2 Propositions de copy prêt-à-coller

**Format de chaque page** : [`.claude/templates/seo/copy-proposal.md`](.claude/templates/seo/copy-proposal.md)

Ce template couvre : H1 actuel + 3 propositions A (provocateur), B (aspirationnel), C (pragmatique), meta title + variantes, meta description + variantes, CTA + variantes. Il inclut la grille de décision par ton, des exemples de patterns et les contraintes (mot « gratuit » interdit, longueurs, power words, géo).

**Pages à couvrir systématiquement** : home (hero + sections stratégiques), `/prestations`, `/approche`, `/idees`, `/blog`, `/contact`, top 5 articles par trafic GSC.

### 9.3 Réécriture des cartes services / pricing

**Format de chaque carte** : [`.claude/templates/seo/service-card.md`](.claude/templates/seo/service-card.md)

Ce template couvre : nom de l'offre, accroche, pour qui / pour qui pas, livrable concret, durée, méthodologie, prix + justification de palier, preuves, CTA, schema JSON-LD.

Appliquer à **chaque service** présent dans `services.tsx` / `pricing.tsx` / `prestations/page.tsx` pour transformer des pages descriptives en pages de vente.

### 9.4 Enrichissement de l'offre (nouveaux paliers / produits)

**Pyramide d'offres de référence** : voir [`.claude/templates/seo/service-card.md`](.claude/templates/seo/service-card.md) section « Pyramide d'offres de référence » (Lead magnet → Audit 180° offert → Audit 360° → Atelier collectif → Sprint découverte → Accompagnement mensuel → Abonnement veille → Hotline IA → Prestations sur mesure).

Analyser la pyramide actuelle du site vs. celle de référence et proposer les paliers manquants. Pour chaque proposition, justifier :
- **Pourquoi maintenant** (signal marché / gap concurrentiel)
- **Pour qui** (persona)
- **Revenu attendu** (estimation volume × prix)
- **Effort de mise en place**
- **Risque principal**

Considérer également : **partenariats / labels** (Activateur France Num, Bpifrance IA Booster, MonCompteFormation) et **formats pédagogiques** (webinar trimestriel, cohorte « IA pour dirigeants PME » 6 semaines).

### 9.5 Cohérence cross-pages (audit des liens et des CTAs)

Vérifier via lecture systématique :

- [ ] Le bouton « Audit 180° » pointe-t-il vers la **même URL** depuis toutes les pages (home, header, footer, articles, prestations) ?
- [ ] Le libellé du CTA est-il **rigoureusement identique** ? (Sinon harmoniser : « Réserver mon audit 180° offert » par ex.)
- [ ] Chaque page de service linke-t-elle vers un cas client concret ?
- [ ] Chaque article linke-t-il vers au moins un service pertinent (maillage édito → conversion) ?
- [ ] La page `/contact` est-elle accessible en 1 clic depuis n'importe où ?
- [ ] La page `/prestations` liste-t-elle **exactement** les mêmes services que la home ?
- [ ] Les tarifs sont-ils cohérents entre `pricing.tsx` et `prestations/page.tsx` ?

Livrer un **tableau des dérives** (page × élément × écart × correction).

### 9.6 Plan éditorial synthétique (livrable final)

Consolider Phase 8 + 9 en un plan ligne par ligne :

| # | Type | Titre / objet | URL | Mot-clé | Effort (h) | Priorité | Trimestre |
|---|------|---------------|-----|---------|------------|----------|-----------|
| 1 | Refactor copy | Home hero | `/` | ... | 1 | 🔴 | Q1 |
| 2 | Article | ... | `/blog/...` | ... | 6 | 🟠 | Q1 |
| 3 | Nouvelle page | Page BTP | `/prestations/btp` | ... | 10 | 🟠 | Q2 |
| 4 | Refresh | Article X | `/blog/x` | ... | 3 | 🟡 | Q2 |
| 5 | Nouvelle offre | Sprint 2 semaines | `/prestations/sprint` | ... | 20 | 🟢 | Q3 |

Cette table = **backlog éditorial/commercial actionnable** à intégrer dans le board projet.

---

## Phase 10 — Rapport & plan d'action

### Format du rapport

**Structure complète du rapport** : [`.claude/templates/seo/report.md`](.claude/templates/seo/report.md)

Ce template couvre les 13 sections standard :
1. Outils utilisés
2. Audit technique (on-page, Core Web Vitals, indexation, JSON-LD, maillage, fichiers SEO)
3. Performance GSC (vue d'ensemble, top requêtes/pages, quick wins, cannibalisations, évolution)
4. Analyse sémantique (DataForSEO)
5. Concurrence
6. Backlinks
7. Visibilité GEO (moteurs IA)
8. E-E-A-T par page (grille `eeat-grid.md`)
9. Stratégie de contenu (topical map, briefs, refresh, fiches spec)
10. Recommandations éditoriales & cohérence offre (copy, services, enrichissement, dérives, backlog)
11. Plan d'action priorisé (🔴🟠🟡🟢)
12. Roadmap 90j / 6 mois / 12 mois
13. KPIs à suivre (baseline + cibles M3/M6/M12)

Copier ce template comme point de départ puis remplir chaque section avec les données collectées aux phases 1-9.

### Actions automatiques (si l'utilisateur le demande)

Implémenter directement :
- Correction meta titles/descriptions (power words, géo, longueur, pas de « gratuit »)
- Ajout/correction de liens internes manquants
- Mise à jour `sitemap.xml`, `news-sitemap.xml`, `llms.txt`
- Ajout/correction de structured data JSON-LD
- Ajout de FAQ schema sur pages pertinentes
- Optimisation slugs URL trop longs
- Headers sécurité dans `next.config.ts`
- Redirects 301 manquants
- Création de la page auteur Pierre Legrand (squelette)

Toujours créer un commit dédié par lot d'actions avec message explicite, et vérifier `npm run build` avant de valider.

### Sauvegarde du rapport

Écrire le rapport complet dans `docs/seo-audits/<YYYY-MM-DD>-audit.md` pour permettre le suivi dans le temps et la comparaison avec les audits précédents. Archiver également les données brutes clés (JSON/CSV des exports GSC et DataForSEO) dans `docs/seo-audits/<YYYY-MM-DD>-data/` si volumineux.

### Check-list finale

Cocher [`.claude/templates/seo/checklist.md`](.claude/templates/seo/checklist.md) §F « Audit complet » avant de clore l'audit.
