# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for **augmenter.pro** — an AI consulting and digital transformation agency targeting French SMEs. All content is in French. Deployed as a Node.js app on Hostinger (via GitHub integration).

**Zone d'intervention** : formation **en présentiel** en Yvelines (78) et Val d'Oise (95) ; conseil, audit et accompagnement **en visio ou téléphone partout en France** ; déplacements possibles pour les gros projets. Le 78/95 est donc un **ancrage de crédibilité locale**, pas une exclusivité commerciale.

**Contexte partagé par toutes les commandes SEO** : [`.claude/templates/seo/project-context.md`](.claude/templates/seo/project-context.md) — à consulter avant toute création/modification de contenu.

**Gisement de preuves terrain (mission ERP)** : [`.claude/templates/seo/terrain-odoo-reva9.md`](.claude/templates/seo/terrain-odoo-reva9.md) — pont vers le repo de mission [`../odoo-reva9`](../odoo-reva9) (5 mois de mission Odoo/Claude tracée au quart d'heure). Chiffres réels, pièges payés, angles d'articles adossés au terrain, **et règles de confidentialité client/M&A à trancher avant toute publication**. À lire avant d'écrire un contenu du cluster Tier 1 (Claude / Odoo / ERP / MCP).

**Charte éditoriale (voix, ton, arc, lexique, E-E-A-T)** : [`.claude/templates/seo/charte-editoriale.md`](.claude/templates/seo/charte-editoriale.md) — source de vérité de la **voix** du site. Relire un brouillon contre la charte : `/relecture-editoriale`.

**Playbook influence éthique (la *mécanique* : accroches, persuasion transparente, accroches de mail)** : [`.claude/templates/seo/playbook-influence-ethique.md`](.claude/templates/seo/playbook-influence-ethique.md) — couche « comment écrire » dérivée de l'hypnose humaniste (Lockert, source primaire PDF) ; détaille la règle §3.4 de la charte. **Découplage registre** (charte §3.3) : pages commerciales/hub/landings = **tutoiement** (`/augmenter-mon-entreprise`, `/contact` déjà migrées) ; récits narratifs (`/`, `/approche`) = **vouvoiement**.

## Web Crawling

**Priorité : Firecrawl self-hosted sur VPS IONOS** (remplace crawl4ai Coolify depuis 2026-05-27)

| Contexte | URL de base | Accès |
|----------|-------------|-------|
| **Prod Coolify** (ouquequoi, app.augmenter.pro) | `http://10.10.0.1:3002` | Tunnel WireGuard `10.10.0.0/24` (VPS `.1` ↔ Coolify `.2`) |
| **Dev local Cursor** (MCP + curl) | `https://firecrawl-test.augmenter.pro` | Caddy + basic-auth sur le VPS (cf. infra) ; sinon WireGuard vers `10.10.0.1:3002` |

- **Endpoint principal** : `POST /v2/scrape` avec `{"url": "...", "formats": ["markdown"]}` → `{success, data: {markdown, html, metadata}}`
- **Endpoint batch** : `POST /v1/crawl` (jobs asynchrones) — préférer `/v2/scrape` pour une URL unique
- **Pas d'API key** en self-host (`USE_DB_AUTHENTICATION=false`)
- **Ne PAS utiliser** `crawl4ai.augmenter.pro` (caduc, hog CPU sur Coolify — retrait prévu après cutover)
- **Ne PAS utiliser** le SaaS Firecrawl cloud (19 $/mois) — self-host VPS uniquement
- Si le MCP Firecrawl est connecté, utiliser `mcp__firecrawl__firecrawl_scrape` (URL unique) ou `mcp__firecrawl__firecrawl_crawl` (batch)
- Sinon, appeler l'API REST via curl (cf. [`.claude/templates/seo/mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §8)
- Fallback si Firecrawl indispo : Playwright MCP (`browser_navigate` + `browser_snapshot`)

**Infra détaillée** : [`../unified-infrastructure/docs/VPS_IONOS.md`](../unified-infrastructure/docs/VPS_IONOS.md) · stack [`../unified-infrastructure/vps-ionos-firecrawl/`](../unified-infrastructure/vps-ionos-firecrawl/) · ADR [`docs/decisions/0004-firecrawl-ionos-migration.md`](docs/decisions/0004-firecrawl-ionos-migration.md)

## Commands

```bash
npm run dev       # Start dev server with --webpack (NOT Turbopack — see below)
npm run build     # Production build (Node.js standalone server)
npm run start     # Start production server
npm run lint      # ESLint
npm test          # Vitest — hygiène SEO (www→apex, sitemap, 301 /accueil-2)
```

⚠ **Le script `dev` force `--webpack`** (pas Turbopack). Turbopack résout `tailwindcss` depuis le dossier parent `d:\SourceFast\coolify_linux\` au lieu du projet et plante. Le build prod tourne sur webpack aussi (`next build --webpack`). Si tu reviens à `next dev` sans flag, le serveur ne montera plus.

### Custom Claude Commands

```
/create-article <sujet>   # Créer un article SEO (recherche, rédaction, intégration)
/relecture-editoriale     # Relire un contenu contre la charte éditoriale (ton, arc, E-E-A-T, lexique)
/seo-audit                 # Audit SEO complet (crawl site + concurrents, plan d'action)
/security-audit            # Audit sécurité (OWASP, headers, RGPD)
/doc-audit                 # Audit documentation (CLAUDE.md, code, metadata)
/debt-report               # Rapport dette technique (architecture, TS, deps, build)
```

## Tech Stack

- **Next.js 16** (App Router) — `output: "standalone"`, deployed as Node.js app on Hostinger
- **React 19** with RSC
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4** with OKLCH color space and CSS variables
- **shadcn/ui** (new-york style, lucide icons) — config in `components.json`
- **Framer Motion** for entry animations (light pages, CTA, footer)
- **Radix UI** primitives via shadcn
- **Three.js 0.160** — background WebGL paint shader on narrative pages (`/` and `/approche`)
- **GSAP 3.15 + ScrollTrigger** — chapter entry timelines + parallax scrub on narrative pages
- **Lenis 1.3** — smooth scroll momentum-based, narrative pages only
- **Fonts** : Inter (sans, `--font-geist-sans`) + JetBrains Mono (mono, `--font-geist-mono`), both loaded via `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx)

## Architecture

**Path alias:** `@/*` maps to `src/*`

### Routing (App Router)

Deux pages sont des **expériences scroll narrative** (Three.js + Lenis + GSAP) : `/approche` (prod) et `/accueil-narrative` (préview). **`/` est actuellement le layout bento classique** (`Hero` + sections), pas le récit 6 chapitres. Le A/B `/accueil-2` (hero augmenté) n'est servi que via `?ab=b` (kill switch `AB_HOME_ENABLED`).

| Route | Type | Structure |
|-------|------|-----------|
| `/` | **Bento** (Header/Footer globaux) | [src/app/page.tsx](src/app/page.tsx) : `<Hero />` + ApproachServices + Resources + Convert. LCP = lede du Hero — **interdit** `motion` opacity 0 (ADR 0006). |
| `/accueil-narrative` | **Narrative** (6 chapitres) | [src/app/home-narrative/](src/app/home-narrative/) — preview du récit, pas l'URL publique. |
| `/approche` | **Narrative** (9 chapitres) | [src/app/approche/layout.tsx](src/app/approche/layout.tsx) strip Header/Footer. `page.tsx` injecte `FAQPage` + `Service`/`OfferCatalog` JSON-LDs + render `<ApprocheNarrative />` depuis [src/app/approche/narrative/](src/app/approche/narrative/). Absorbe `/prestations` via redirect 308 (ancre `#prestations` à l'intérieur du Ch07 audits). |
| `/blog` | Bento + Header/Footer globaux | `page.tsx` (metadata) + `blog-view.tsx` (`"use client"`, importe `ARTICLES` depuis le catalog `src/data/resources.ts`) |
| `/blog/<slug>` | Article via `ArticleLayout` | Each slug has its own directory under [src/app/blog/](src/app/blog/) |
| `/idees` | Bento + Header/Footer globaux | `page.tsx` + `idees-view.tsx` (importe `IDEAS` depuis le catalog) |
| `/augmenter-mon-entreprise` | **Hub interactif** + Header/Footer globaux | Server `page.tsx` (metadata + `CollectionPage`/`ItemList` JSON-LD) + client `augmenter-view.tsx`. Sélecteur **3 axes** (secteur × douleur × objectif) qui filtre **toutes les ressources du catalog** (articles + idées + prompts) avec relâchement progressif, chaque ressource servie en **TL;DR**. Cf. [src/data/resources.ts](src/data/resources.ts). |
| `/contact` | Form + Header/Footer | Server `page.tsx` + client `contact-form.tsx` |
| `/prompts`, `/projets`, `/strategie-ia-pme`, `/integration-mcp`, `/audit-informatique-{yvelines,val-doise}`, `/auteur/pierre-legrand` | Pages classiques | Header/Footer globaux + le CTA widget en bas |
| `/mentions-legales`, `/cgv`, `/politique-confidentialite` | Legal | Header/Footer globaux |

### Site-wide hero shader pattern

Toutes les pages classiques (en dehors des 2 narrative `/` et `/approche`)
ont un même hero pattern : un `ShaderBackdrop` Three.js localisé derrière
le contenu du hero.

[src/components/widgets/shader-backdrop.tsx](src/components/widgets/shader-backdrop.tsx) — extracted version of `BackgroundCanvas` :
- Même fragment shader (FBM 5 octaves + domain warp + curseur smear + grain) que les narrative pages
- `position: absolute; inset: 0` à l'intérieur du parent (pas fixed full-screen comme sur le narrative)
- Mood statique passé en prop (pas de mood observer — un seul mood pour la vie du composant)
- Coords mouse relatives au canvas (pas au viewport) → le smear suit le curseur quand on hover la section
- `ResizeObserver` qui suit les redimensionnements du parent
- `alpha: true` + prop `opacity` → la peinture peut blend avec le fond du parent
- **Perf LCP** (ADR 0006) : pas de WebGL sous 768 px / `prefers-reduced-motion` / Save-Data (gradient CSS) ; `import("three")` après idle sur desktop. Politique : [`src/lib/perf/idle-webgl.ts`](src/lib/perf/idle-webgl.ts)
- SSR-safe (dynamic import de Three.js)

Pattern d'usage standard sur un hero :

```tsx
<section className="relative isolate overflow-hidden py-24">
  <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />
  <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
    {/* hero content */}
  </div>
</section>
```

Pour un hero qui est une BentoCard (cas `/blog` + `/idees`) :

```tsx
<BentoCard className="relative isolate justify-end overflow-hidden">
  <ShaderBackdrop mood="dawn" opacity={0.6} />
  <h1 className="relative z-10 ...">Titre</h1>
  ...
</BentoCard>
```

Pages où c'est en place : `/blog` (hero card uniquement), `/prompts`, `/projets`, `/idees`, `/strategie-ia-pme`, `/integration-mcp`, `/audit-informatique-yvelines`, `/audit-informatique-val-doise`, `/contact`, `/auteur/pierre-legrand`. Mood **dawn** (paper near-white + violet wash) + opacity **0.6** sur la plupart, **0.55** sur l'auteur (un peu plus subtil pour ne pas voler la vedette au gros avatar PL violet).

⚠ **Un seul canvas WebGL par page classique**, et seulement après idle / desktop. La carte featured `/blog` n'a plus d'overlay Three.js (gradient CSS). Si on veut étendre aux 14 autres cards, il faudrait un `IntersectionObserver` qui mount/unmount le canvas selon la visibilité, sinon N contextes WebGL concurrents = GPU saturé.

⚠ **Ne jamais animer le LCP depuis `opacity: 0`** (Framer Motion `initial` est peint en SSR). Le `h1` / lede du hero doit être opaque dans le HTML, sinon Lighthouse compte 3 s+ de « délai d'affichage de l'élément ».

### Narrative Scroll System

L'infrastructure narrative vit dans [src/app/approche/narrative/](src/app/approche/narrative/) et est réutilisée cross-route par `/` qui importe depuis ce path. Pas de duplication.

```
src/app/approche/narrative/
├── background-canvas.tsx       ← Three.js shader (FBM 5 octaves, domain warp,
│                                  cursor pull, halo, grain). Disposed on unmount.
├── smooth-scroll-provider.tsx  ← Lenis + GSAP ScrollTrigger pipe.
├── custom-cursor.tsx           ← Dot + ring, mix-blend: difference (≥620px + fine pointer).
├── nav-fixed.tsx               ← Brand + 4 menu links + Premier diagnostic CTA.
├── chapter-rail.tsx            ← 8 boutons verticaux droite, active state.
├── progress-bar.tsx            ← Fill scaleX live + label dynamique CH.0X.
├── mood-observer.ts            ← RAF qui détermine le chapitre actif + blend.
├── store.ts                    ← useSyncExternalStore custom (pas Zustand).
├── moods.ts                    ← 8 mood palettes + 9 ChapterMeta /approche.
├── primitives/
│   ├── chapter.tsx             ← Scaffold .chapter wrapper.
│   ├── lede.tsx                ← h2 avec data-anim="words" pour GSAP word stagger.
│   ├── pill.tsx                ← Eyebrow (default / amber / glass).
│   ├── annot.tsx               ← Kicker + body, grille 200/1fr.
│   └── word-splitter.tsx       ← Hook qui wrap chaque mot en <span class="word">.
├── chapters/                   ← 9 chapitres /approche (ch01-preambule → ch09-suite).
└── shared/
    └── suite-cockpit.tsx       ← Final chapter UNIFIÉ entre / et /approche.
                                   Audit 180° card + cockpit 3 cols + brand/social.
```

Le pendant home :

```
src/app/home-narrative/
├── home-moods.ts               ← 6 ChapterMeta (ids "h-01" → "h-06").
├── index.tsx                   ← Orchestrateur, importe l'infra cross-route.
└── chapters/                   ← 6 chapitres (ch01-cover → ch06-suite).
```

**Chapitres** :

| /approche (9) | / (6) |
|---------------|-------|
| 01 Préambule (dawn) | 01 Cover (dawn) |
| 02 Le terrain (reality) | 02 Le constat (reality) — 3 douleurs lava lamp |
| 03 Les 4 piliers (violet DARK) | 03 Trois disciplines (violet DARK) |
| 04 L'équilibre — interlude pleine page (dawn) | 04 Les preuves (night DARK) — stats + témoignage XL |
| 05 La méthode (amber) | 05 Le récit continue (amber) — 3 articles + 3 idées hand-picked |
| 06 Les preuves (night DARK) | 06 La suite (ember DARK) — SuiteCockpit |
| 07 Les audits (audits DARK) — `id="prestations"` |   |
| 08 Les questions (questions light) — FAQ accordion |   |
| 09 La suite (ember DARK) — SuiteCockpit |   |

**SuiteCockpit** ([src/app/approche/narrative/shared/suite-cockpit.tsx](src/app/approche/narrative/shared/suite-cockpit.tsx)) — composant unifié de fin de page partagé entre / et /approche. Reçoit `chapterId` / `chapterNum` / `totalChapters` en props. Contient : hero engagement + grosse card Audit 180° (lava lamp violet) + 3 CTAs + contact strip + cockpit nav 3 cols (Services & Approche / Ressources / Identité & Légal) + brand row avec social icons.

**Gotcha critique — `<em>` gradient + word splitter** : Tailwind 4 arbitrary selectors `[&_em_.word>span]:` NE compilent PAS en CSS attendu dans ce setup (Next 16 + Tailwind 4 + webpack). Les règles pour le gradient `<em>` et le highlighter `<u>` sont écrites en CSS direct dans [globals.css](src/app/globals.css) sous `h2[data-anim="words"] em` et `h2[data-anim="words"] em .word > span` (cf. handoff README lignes 446-464).

### Component Organization

- [src/components/sections/](src/components/sections/) — Composants de section partagés
  - `cta.tsx` (variants `default` / `audit-78` / `audit-95` / `blog` / `auteur`) — utilisé sur les pages services, blog articles, auteur. **Animé** : 2 LiquidBlob + word stagger + magnetic primary button + gradient em.
  - `prompt-card.tsx` (/prompts)
  - `atelier-callout.tsx` — encart CTA mid-article vers la landing Atelier Claude Code (cf. ADR 0003)
  - _(Les composants legacy `approach.tsx`, `blog-preview.tsx`, `ideas.tsx`, `pricing.tsx` ont été supprimés le 2026-05-26 — code mort post-refonte bento/narrative.)_
- **[src/data/resources.ts](src/data/resources.ts) — catalog partagé = SOURCE DE VÉRITÉ** des tableaux `ARTICLES` (articles) et `IDEAS` (idées), chacun enrichi de `tldr` (verdict actionnable), `sectors` (taxonomie hub) et `pains` (douleurs adressées). Exporte aussi `SECTORS` / `PAINS` / `OBJECTIVES` (axes du hub), `IDEE_SECTORS` (filtre `/idees`), `promptToResource()` et `buildHubResources(prompts)`. ⚠️ **Un nouvel article ou une nouvelle idée s'ajoute ICI**, plus dans les vues. (Note d'archi : on importe uniquement les _types_ de `src/data/prompts.ts` dans ce module — pas la valeur `prompts`, dont le contenu volumineux ne doit pas être embarqué dans les bundles `/blog` et `/idees`.)
- [src/app/blog/blog-view.tsx](src/app/blog/blog-view.tsx) + [src/app/idees/idees-view.tsx](src/app/idees/idees-view.tsx) — pages bento client qui **importent** `ARTICLES`/`IDEAS` depuis le catalog (plus de data inline)
- [src/app/augmenter-mon-entreprise/augmenter-view.tsx](src/app/augmenter-mon-entreprise/augmenter-view.tsx) — hub client : sélecteur 3 axes (secteur × douleur × objectif) → `buildHubResources(prompts)` (articles + idées + prompts), filtrage à relâchement progressif (jamais d'écran vide), carte Audit 180° toujours présente, chaque ressource en TL;DR
- [src/components/bento/](src/components/bento/) — Primitives bento (`BentoGrid`, `BentoCard`, `SectionHead`, `Pill`, `ArticleBentoCard`, `PullQuoteCard`, `MiniQuoteCard`) — **utilisées uniquement sur /blog et /idees** (les pages bento restantes)
- [src/components/widgets/](src/components/widgets/) — Widgets animés :
  - `blobs.tsx` : `LiquidBlob`, `MeshAurora`, `CardShell`, `CornerArrow`, `PillTag` (SVG morphing)
  - `service-card.tsx`, `idea-card.tsx`, `trust-stat.tsx` — wrappers `CardShell + LiquidBlob`
  - **`shader-backdrop.tsx`** : Three.js shader localisé (clone du narrative `BackgroundCanvas`, voir « Site-wide hero shader pattern » plus haut). Utilisé sur 10+ pages heroes + en mix-blend overlay sur l'image du featured article /blog.
  - `palettes.ts` : 6 palettes OKLCH (violet / amber / duo / cold / warm / mono)
  - Respecte `prefers-reduced-motion` via `useMorph` qui fige le seed.
- [src/components/layout/](src/components/layout/) — Header (fixed navbar + mobile sheet), **Footer mini-cockpit** (dark, 3 cols + social), ArticleLayout (blog wrapper + Article JSON-LD)
- [src/components/ui/](src/components/ui/) — shadcn/ui primitives
- [src/lib/utils.ts](src/lib/utils.ts) — `cn()` utility

### Footer global (mini-cockpit)

Le [Footer](src/components/layout/footer.tsx) est rendu par le root [layout.tsx](src/app/layout.tsx) sur toutes les routes **sauf** `/` et `/approche` (qui le hide via leur layout local). Pattern dark mini-cockpit, même DNA que le `SuiteCockpit` mais sans audit card :

- Fond dark `oklch(0.08 0.02 293)` + radiaux ambient violet/ember sur les côtés
- Layout : brand pitch à gauche / 3 colonnes cockpit à droite (Services & Approche · Ressources · Identité & Légal)
- Chaque colonne a un dot palette glow (violet / amber / cold) + hover slide-arrow amber
- Bottom strip : 4 social icons (LinkedIn / X / Mail / WhatsApp) + copyright mono
- **Aucune ancre** dans les liens — seules les pages réelles sont listées

### CTA widget

Le [CTA](src/components/sections/cta.tsx) est utilisé sur les pages classiques (blog articles, audits, services, auteur). Composant unique avec un prop `variant` :

| Variant | Pages |
|---------|-------|
| `default` | /strategie-ia-pme, /integration-mcp (fallback) |
| `audit-78` | /audit-informatique-yvelines |
| `audit-95` | /audit-informatique-val-doise |
| `blog` | tous les articles via ArticleLayout |
| `auteur` | /auteur/pierre-legrand |

Animations : 2 LiquidBlob accents (violet + duo) en plus du MeshAurora, headline word-stagger Framer Motion, gradient violet→amber sur le fragment `<em>`, Zap badge avec spring scale+rotate, primary CTA magnétique (suit le curseur à ≤110px, max 25% strength), shadow violet sur le primary button.

### Bento Layout System (/blog et /idees uniquement)

Grille bento 12 colonnes (desktop) / 6 (tablette) / 1 (mobile) avec rangées de 110px. Chaque `BentoCard` déclare `span` (3-12) et `rows` (1-6) — mapping vers Tailwind explicite (pas de classes dynamiques). 4 variantes : `light`, `dark`, `flush` (transparent pour widget plein-cadre), `accent`.

⚠ **N'utilise plus pour la home ou /approche** — ces 2 pages sont en narrative scroll (cf. plus haut).

### Styling

- Color palette: violet primary, amber accent, neutral base — OKLCH custom properties dans [globals.css](src/app/globals.css)
- **Tokens narrative** ajoutés dans `globals.css` : `--fg`, `--fg-muted`, `--primary-soft`, `--border-soft`, `--gradient-brand`, `--gradient-ember`, `--violet-X` (50→900), `--amber-X` (400/500), `--neutral-X`
- **Theming chapitre** : `[data-narrative-theme="dark"]` et `[data-theme="dark"]` (utilisé via `<section data-theme="dark">`) swappent les variables narrative pour le thème sombre **sans toucher** au `.dark` global du site
- Custom utilities: `.gradient-text` (violet→amber), `.hero-gradient` (radial background)

### Images

Voir [public/images/](public/images/) — convention WebP, kebab-case, INDEX.md par sous-dossier. Format obligatoire `<Image>` de `next/image` avec `alt` français descriptif. Détails complets dans la section précédente de ce doc — pas changé.

## SEO & LLM Optimization

### Structured Data (JSON-LD)

| Schema | Location | Purpose |
|--------|----------|---------|
| Organization + LocalBusiness + WebSite | [src/app/layout.tsx](src/app/layout.tsx) (root, toutes pages) | Identité globale, geo-targeting 78/95, contact, social links |
| AggregateRating + Review[] | [src/app/layout.tsx](src/app/layout.tsx) imbriqué dans `LocalBusiness` du `@graph` | 5 reviews (tableau `REVIEWS` en tête du fichier). ⚠ **Ne produit PAS d étoiles en SERP** : depuis 09/2019 Google ignore les avis auto-déclarés (self-serving) sur `LocalBusiness`/`Organization`. Utile pour les AI Overviews uniquement — les vraies étoiles viennent du **Google Business Profile** |
| **CreativeWork** (`WebPage` + nested) | [src/app/(home)/page.tsx](src/app/(home)/page.tsx) | Positionne `/` comme contenu éditorial narrative |
| FAQPage | [src/app/approche/page.tsx](src/app/approche/page.tsx) (server) | FAQ section → Google "People Also Ask" |
| Service + OfferCatalog | [src/app/approche/page.tsx](src/app/approche/page.tsx) (server) | 5 services with pricing (0€ et 225€) — `/prestations` redirige 308 vers `/approche#prestations` (ancre dans le Ch07 audits) |
| Article | [src/components/layout/article-layout.tsx](src/components/layout/article-layout.tsx) | Each blog post (author, publisher, tags, URL) |
| Person | [src/app/auteur/pierre-legrand/page.tsx](src/app/auteur/pierre-legrand/page.tsx) | Person JSON-LD pour E-E-A-T |
| CollectionPage + ItemList | [src/app/augmenter-mon-entreprise/page.tsx](src/app/augmenter-mon-entreprise/page.tsx) | Hub ressources — carte structurée des destinations (maillage interne + citabilité LLM) |

### LLM/GEO Files

- [public/llms.txt](public/llms.txt) — résumé site pour crawlers LLM (Perplexity, ChatGPT, Claude)
- [public/llms-full.txt](public/llms-full.txt) — version étendue (llmstxt.org spec)
- [public/robots.txt](public/robots.txt) — directives crawlers + sitemap reference + bot AI explicites
- [public/sitemap.xml](public/sitemap.xml) — URLs **indexables** uniquement (pas de pages légales noindex)
- **Pas de news-sitemap** : le site n'est pas une publication Google News (retiré 2026-08-16)

### Google Tag Manager (GTM) — GA4 et événements

(Section inchangée — voir intégration via `@next/third-parties/google` dans [src/app/layout.tsx](src/app/layout.tsx). Événements : `contact_form_submit`, `lecture_article`.)

### MCP SEO Tools (optionnels)

Si configurés, ces MCP servers fournissent des données SEO réelles aux commandes `/create-article`, `/create-resource`, `/seo-audit` :

| MCP Server | Données |
|------------|---------|
| **DataForSEO** (`dfs-mcp`) | Volumes de recherche, difficulté, SERP, concurrents |
| **Google Search Console** (`google-search-console`) | Clics, impressions, CTR, positions |

Les commandes fonctionnent sans (fallback web search), mais les données sont **beaucoup plus fiables** avec.

### SEO Conventions

- Every page **must** export `metadata: Metadata` avec `title` (<60 chars) et `description` (<155 chars) optimisés
- Power words OK : Guide, Offert, 2026, Sans Engagement. **Mot « gratuit » interdit** — utiliser « offert », « sans engagement », « inclus »
- Geo-targeting 78/95 uniquement quand pertinent (formation présentielle) ; sinon formulation nationale
- Layout template: `"%s | augmenter.PRO"`
- Blog articles : passer `slug` à `ArticleLayout` pour canonical URL dans Article schema
- Préférer données MCP réelles aux estimations web search

### Qualité de Contenu & E-E-A-T

augmenter.pro est un site de conseil pour PME (domaine YMYL) — Google applique un standard E-E-A-T élevé.

#### Identité éditoriale

- **Qui** : Pierre Legrand, consultant IA & transformation digitale. Articles publiés sous son nom (Article JSON-LD `author`).
- **Comment** : Contenu rédigé avec assistance IA et révisé par Pierre Legrand. Ne jamais prétendre « 100% humain » si ce n'est pas le cas.
- **Pourquoi** : Aider les PME à décider, pas générer du trafic. Si un sujet ne sert pas l'audience (PME française, BTP/immobilier/industrie/artisans), ne pas traiter.

#### E-E-A-T

| Signal | Exigence |
|--------|----------|
| **Experience** | ≥ 1 exemple terrain réel ou observation directe secteur local |
| **Expertise** | Analyse approfondie, pas de reformulation superficielle |
| **Autorité** | Credentials intégrées naturellement |
| **Fiabilité** | Données sourcées, limites mentionnées |

#### Contenu People-First

1. Test du lecteur : après lecture, le dirigeant PME peut **agir** (checklist, étapes, décision)
2. Valeur ajoutée absente du top 5 Google : angle unique, donnée originale, méthodo propre, terrain
3. Pas de SEO-first : sujet = expertise réelle × besoin réel
4. Périmètre IA / digital / audit / transformation PME
5. Anti-patterns interdits : reformulation concurrent, longueur arbitraire, fausses MAJ, variantes mineures

### Adding a New Blog Article

Use `/create-article <sujet>` or follow this manual process:

1. Create [src/app/blog/<slug>/page.tsx](src/app/blog/) using `ArticleLayout` wrapper — baliser le corps avec les **primitives de lecture** (`<Memo>` 4-8 pour le fil de mémoire, + `<Callout>`/`<PullQuote>`/`<KeyTakeaways>` depuis `@/components/article/*`) ; **pas de TL;DR inline** (le `tldr` du catalog s'affiche auto en tête ; TOC + barre de progression sont auto depuis les `<h2>`). Réf. [.claude/templates/seo/article-primitives.md](.claude/templates/seo/article-primitives.md)
2. Export `const metadata = articleMetadata({ title, description, slug })` — helper [src/lib/article-metadata.ts](src/lib/article-metadata.ts) qui génère **openGraph + twitter + canonical** à partir d'une seule source (title/description SEO + slug). **Ne JAMAIS revenir à `metadata: Metadata` brut** sans `openGraph` : un article sans bloc `openGraph` hérite de la carte de partage générique du site (titre + image `og-augmenter-pro.jpg`) au lieu de la sienne. og:image pointe vers `/images/blog/og/<slug>.jpg`.
3. Pass `slug="<slug>"` à `ArticleLayout` pour canonical URL JSON-LD
4. Pass `dateISO` (ISO 8601) et `dateModified` props à `ArticleLayout`
5. Add image [public/images/blog/<slug>.webp](public/images/blog/) (WebP, 16:9, < 300 Ko) et passer `image="/images/blog/<slug>.webp"` prop
6. **Générer le JPEG Open Graph** `public/images/blog/og/<slug>.jpg` (1200×630, JPEG qualité 82) recadré `cover` depuis le hero WebP — sinon `og:image` 404. Voir convention dans [public/images/blog/INDEX.md](public/images/blog/INDEX.md) (sous-dossier `og/`). Recadrage via sharp : `sharp(hero).resize(1200,630,{fit:"cover"}).jpeg({quality:82,mozjpeg:true})`.
7. Update [public/images/blog/INDEX.md](public/images/blog/INDEX.md) avec description image (type, dimensions, poids, contexte, alt text)
8. Add article entry dans le tableau `ARTICLES` du catalog [src/data/resources.ts](src/data/resources.ts) (en première position pour les plus récents) — **plus** dans `blog-view.tsx`, qui l'importe désormais. Renseigner les champs catalog : `tldr` (le verdict actionnable, lu en 10 s), `sectors` (un ou plusieurs `Sector` ; `"Tous"` = transversal) et `pains` (les `PainId` adressés) → c'est ce qui fait remonter l'article dans le hub `/augmenter-mon-entreprise`
9. Add URL dans [public/sitemap.xml](public/sitemap.xml) avec `<lastmod>` ISO 8601 — **ne pas recréer de news-sitemap**
10. Add article dans [public/llms.txt](public/llms.txt) section blog
11. Si l'article est suffisamment fort, hand-pick dans [src/app/home-narrative/chapters/ch05-recit.tsx](src/app/home-narrative/chapters/ch05-recit.tsx) — la home featuring 3 articles, à curater
12. Tag(s) doivent matcher les filter pills cliquables de `/blog` : `IA` / `PME` / `Commercial` / `Cybersécurité` / `Audit 360°`. Si tu utilises un tag différent (`Productivité`, `Intégration`, `Claude Code`, etc.), l'article n'apparaîtra que sous le filtre « Tout ». **Ne pas utiliser « Intelligence Artificielle » comme tag** — utiliser `IA` (normalisé site-wide).
13. Run `npm run build` to verify

## Acquisition & réception des demandes de devis

**Objectif business n°1 du site : recevoir des demandes de devis**, pas du trafic. Tout chantier contenu/SEO s'arbitre là-dessus. Contexte mesuré (GSC, 2026-08-24) : ~3-4 devis/mois dont la quasi-totalité vient du **bouche-à-oreille**, trafic de marque quasi nul (15 impressions / 0 clic sur 6 mois, « pierre legrand » en position 68), et 843 impressions sur des requêtes prix/tarif/devis captées à **0 clic** (tout en page 2-4).

Playbook opérationnel (message de demande d'avis, checklist GBP, ordre de rendement) : [`docs/playbooks/acquisition-devis.md`](docs/playbooks/acquisition-devis.md).

### Chaîne de réception (à ne pas casser)

> **État : opérationnelle en production depuis le 2026-08-24.** Validée de bout en bout (`delivered: ["log","email"]`), variables déclarées côté Hostinger, alerte reçue. Toute régression sur cette chaîne se traduit par des demandes de devis perdues **en silence** — c'est le mode de panne à redouter, pas une erreur visible.

Le wizard [`src/app/contact/quote-wizard.tsx`](src/app/contact/quote-wizard.tsx) (rendu sur `/contact` via `contact-form.tsx`) se termine historiquement par un `mailto:` ou un lien WhatsApp — deux canaux qui **sortent du site et ne laissent aucune trace serveur**. Depuis 2026-08-24, `handleSend()` POSTe d'abord la demande sur [`/api/quote`](src/app/api/quote/route.ts).

Deux détails d'implémentation qui ne doivent pas être « nettoyés » :

| Détail | Raison |
|--------|--------|
| `keepalive: true` sur le `fetch` | la requête doit survivre à la navigation vers le client mail |
| **pas d'`await`** avant `window.open` | un `await` casse le *user gesture* → WhatsApp bloqué par le popup blocker |

`/api/quote` livre sur trois niveaux, du plus robuste au plus confortable :

1. **`console.log` préfixé `[QUOTE]` — inconditionnel.** Seul canal qui ne dépend d'aucune variable d'environnement. **Ne jamais le retirer** : c'est le filet qui a manqué à `/api/notify-abandon`, dont le webhook n'a jamais été branché (`NOTIFY_WEBHOOK_URL` vide → `graceful no-op` renvoyant `ok: true`, donc panne silencieuse).
2. **Webhook** si `NOTIFY_WEBHOOK_URL` (n8n, Make, Zapier).
3. **E-mail Resend** si `RESEND_API_KEY` + `QUOTE_NOTIFY_EMAIL` + `QUOTE_FROM_EMAIL`. Le `reply_to` pointe sur le prospect.

Variables documentées dans [`.env.example`](.env.example). ⚠ **Elles doivent aussi être déclarées côté Hostinger** : sans elles en prod, la demande est captée dans les logs mais **aucune alerte ne part**.

### Envoi e-mail (Resend)

Domaine d'envoi dédié **`mail.augmenter.pro`** (Resend, région `eu-west-1`, **`verified` le 2026-08-24**), expéditeur `devis@mail.augmenter.pro`. Les 3 enregistrements DNS (DKIM `resend._domainkey.mail`, MX + SPF `send.mail`) sont posés dans la zone `augmenter.pro`.

⚠ **Ne jamais déclarer Resend sur le domaine racine `augmenter.pro`** : il porte la messagerie Hostinger (`MX mx1/mx2.hostinger.com`, SPF `_spf.mail.hostinger.com`) sur laquelle `vite@augmenter.pro` **reçoit** le courrier. Toucher au SPF racine risque la réception pour une alerte de devis. Le sous-domaine isole l'envoi sans rien impacter.

## Déploiement & cache CDN (Hostinger)

Hostinger sert le site derrière son CDN (`hcdn`) et **ne conserve qu'une seule version de build** : au déploiement, les `/_next/static/*` du build précédent sont supprimés. Un HTML mis en cache avant le déploiement référence donc des CSS/JS hashés qui renvoient **404 en `text/plain`** → refus MIME du navigateur → page sans styles + `Application error: a client-side exception has occurred`.

Incident du 2026-08-14 : la home cassée ~35 h (`x-hcdn-cache-status: HIT`, `Age: 128490`) parce que Next émettait `s-maxage=31536000` (1 an) sur le HTML statique.

Trois protections en place — **ne pas les retirer** :

| Couche | Fichier | Effet |
|--------|---------|-------|
| `export const revalidate = 300` | [src/app/layout.tsx](src/app/layout.tsx) | fait descendre le `s-maxage` du HTML de 1 an à 5 min. ⚠ `expireTime` **seul n'y suffit pas** sur une route statique pure — il ne pilote que le `stale-while-revalidate` compagnon |
| `expireTime: 300` | [next.config.ts](next.config.ts) | `swr=0` → le CDN ne peut plus servir de réponse périmée (valeur 3600 = fenêtre stale de 55 min) |
| `ASSET_RECOVERY_SCRIPT` | [src/lib/asset-recovery.ts](src/lib/asset-recovery.ts) | filet client inline dans `<head>` : un asset `_next/static` en échec déclenche un rechargement `?_cb=`, qui force `x-hcdn-cache-status: DYNAMIC`. Garde anti-boucle : 1 tentative/min/session, param retiré de l'URL après coup |

Plus [src/app/global-error.tsx](src/app/global-error.tsx) — error boundary racine, **styles inline obligatoires** (doit rester lisible quand c'est le CSS qui 404).

Diagnostic en cas de récidive :

```bash
curl -sI https://augmenter.pro/ | grep -iE 'cache-control|x-hcdn-cache-status|^age'
```

`HIT` + `Age` élevé ⇒ HTML périmé : purger le cache CDN dans hPanel. Comparer les assets du HTML caché et du HTML frais (`?bust=<random>` force l'origine) pour confirmer.

## Key Constraints

- **Réception des devis** : `/api/quote` doit TOUJOURS conserver son `console.log` préfixé `[QUOTE]` (seul canal indépendant de toute variable d'env) ; et dans `quote-wizard.tsx`, ne jamais ajouter d'`await` avant `window.open` ni retirer `keepalive: true` — cf. section Acquisition
- **Cache CDN** : toute modif de `revalidate` / `expireTime` / du filet `asset-recovery` se vérifie sur les headers réellement émis (`npm run build && npm run start`, puis `curl -sI http://127.0.0.1:3000/`) — cf. section Déploiement & cache CDN
- **Données hardcodées (pas de CMS)** — articles et idées centralisés dans le catalog [src/data/resources.ts](src/data/resources.ts) (`ARTICLES` / `IDEAS`) ; testimonials, pricing et prompts (`src/data/prompts.ts`) restent inline
- **Client components** must use `"use client"` (required for framer-motion, gsap, lenis, three.js, interactive forms, mobile menu)
- **Client components cannot export metadata** — si une page a besoin de `"use client"`, split : server `page.tsx` (metadata + JSON-LDs) + client component (UI). Voir `/contact`, `/(home)/page.tsx`, `/approche/page.tsx` comme exemples.
- **Blog articles** : routes statiques directory-based (pas dynamiques `[slug]`), chaque article est `src/app/blog/<slug>/page.tsx`
- **llms.txt et sitemap.xml doivent être mis à jour** quand on ajoute pages ou articles ; un article/idée s'ajoute au catalog [src/data/resources.ts](src/data/resources.ts) (avec `tldr`/`sectors`/`pains`), pas dans les vues. Pages légales : `robots: LEGAL_ROBOTS` (`src/lib/seo-policy.ts`), hors sitemap.
- **JSON-LD structured data** ajouter sur toute page indexable. Sur les narrative pages, le JSON-LD vit dans le server `page.tsx`, le narrative component est rendu client-side en dessous.
- **Dev server force webpack** (`next dev --webpack`) — voir Commands ci-dessus pour la raison
- **Ne jamais utiliser des ancres** (`/route#section`) dans le footer ou le NavFixed — seuls les liens pages réels. Si une section n'a pas sa page, soit on consolide sous un parent, soit on la skip.

## Branching Convention

- 1-3 commits ou bug fix → commit direct sur main
- 4+ commits ou refonte structurelle (routes, layout, infra) → branche `feat/<slug>` ou `fix/<slug>`, merge fast-forward quand validé visuellement
- Toujours demander confirmation avant `git push` — jamais push autonome

## ADRs et Plans

- [docs/decisions/0001-approche-narrative-scroll.md](docs/decisions/0001-approche-narrative-scroll.md) — décision narrative /approche
- [docs/decisions/0002-home-narrative-scroll.md](docs/decisions/0002-home-narrative-scroll.md) — décision narrative /
- [docs/decisions/0003-funnel-geo-conversion.md](docs/decisions/0003-funnel-geo-conversion.md) — stratégie funnel GEO : mesurer d'abord, monétiser le cluster tech sur le persona dirigeant confirmé
- [docs/decisions/0006-lcp-pages-classiques.md](docs/decisions/0006-lcp-pages-classiques.md) — LCP pages classiques : hero opaque, WebGL différé, GTM idle
- [docs/playbooks/acquisition-devis.md](docs/playbooks/acquisition-devis.md) — **playbook acquisition de devis** : constat chiffré GSC, ordre de rendement, message de demande d'avis Google (réutilisable), checklist GBP restante
- [docs/plans/](docs/plans/) — plans d'implémentation détaillés
- [docs/ClaudeDesign_handoff/](docs/ClaudeDesign_handoff/) — source du design narrative (HTML/CSS/JS prototype)
