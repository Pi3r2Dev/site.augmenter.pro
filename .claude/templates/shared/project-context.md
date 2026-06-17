# Contexte projet — augmenter.pro (commun à toutes les commandes)

Fichier de référence partagé par les commandes non-SEO (`/debt-report`, `/security-audit`, `/doc-audit`, `/codex-execute-task`). **À lire en premier** par toute commande qui modifie le code ou produit un rapport technique.

> **Pour les commandes SEO/éditoriales** (`/seo-audit`, `/create-article`, `/create-resource`, `/modify-resource`) → utiliser [`../seo/project-context.md`](../seo/project-context.md) qui hérite implicitement de ce fichier et ajoute audience, contraintes éditoriales, identité, modalités géographiques.

---

## Projet

**augmenter.pro** — site vitrine d'une agence de conseil IA & transformation digitale pour PME françaises. Acquisition organique de leads via SEO + conversion vers Audit 180° offert (0 €) / Audit 360° IA Booster (225 €).

- **Type** : site marketing pur (pas de SaaS, pas de produit transactionnel)
- **Auteur unique** : Pierre Legrand
- **Données 100 % inline** — articles, témoignages, pricing, idées, FAQ : tout est hardcodé dans les composants. **Pas de base de données, pas d'auth, pas de CMS, pas de route API active en production**.

## Stack technique

- **Next.js 16** (App Router) — `output: "standalone"`, déployé comme app Node.js sur Hostinger via GitHub
- **React 19** avec RSC (Server Components par défaut)
- **TypeScript 5** strict mode
- **Tailwind CSS 4** (OKLCH, CSS variables) + **shadcn/ui** (style new-york, lucide icons)
- **Framer Motion** (client components uniquement — `"use client"` requis)
- **GTM + GA4** via `@next/third-parties/google`, variable `NEXT_PUBLIC_GTM_ID` (GA4 déployé via GTM, pas de tag GA direct dans le code)
- Path alias : `@/*` → `src/*`

## Patterns architecturaux

- **Server components par défaut** — `"use client"` uniquement si nécessaire (framer-motion, state, formulaires)
- **Pages à `"use client"`** : split server/client (`page.tsx` exporte `metadata` + `<page>-view.tsx` ou `<feature>-form.tsx` contient le client component)
- **Blog** : route statique par dossier — `src/app/blog/<slug>/page.tsx` (pas de `[slug]` dynamique)
- **Formulaire de contact** : client-side `mailto:` (pas d'API serveur, pas d'envoi backend)
- **JSON-LD** : injecté via `dangerouslySetInnerHTML` dans plusieurs composants (légitime, données Schema.org)
- **Headers de sécurité** : configurés dans `next.config.ts` → `async headers()` (HSTS, CSP, X-Frame-Options, Permissions-Policy, Referrer-Policy)
- **Redirects 301** : dans `next.config.ts` → `async redirects()` avec `permanent: true`

## Structure des dossiers

- `src/app/` — routes Next.js (App Router). Chaque route a son dossier + `page.tsx`
- `src/app/blog/<slug>/page.tsx` — articles (route statique par slug)
- `src/components/sections/` — composants page-level (Hero, ApproachServices, Resources, etc.)
- `src/components/bento/` — primitives layout bento (BentoGrid, BentoCard…)
- `src/components/widgets/` — widgets animés (SVG blobs, service cards)
- `src/components/layout/` — Header, Footer, ArticleLayout
- `src/components/ui/` — shadcn primitives
- `src/lib/utils.ts` — utilitaire `cn()` (clsx + tailwind-merge)
- `public/` — assets statiques (images en WebP, sitemap.xml, llms.txt, robots.txt, downloads)
- `src/data/` — données structurées (ex. `prompts.ts`)

## Conventions de code

- **Nommage fichiers** : kebab-case (`article-layout.tsx`)
- **Nommage composants** : PascalCase (`<ArticleLayout>`)
- **Imports** : alias `@/...` plutôt que chemins relatifs profonds
- **TypeScript** : strict mode, types explicites sur les exports publics
- **Échappement JSX** : `&apos;` pour `'`, `&amp;` pour `&`, `&quot;` pour `"`
- **Images** : WebP uniquement, composant `<Image>` de `next/image`, `alt` en français, `priority` réservé au LCP
- **Commits** : créer un commit dédié par lot d'actions, message explicite. Ne **jamais** committer automatiquement — toujours suggérer, le user exécute

## Build & déploiement

- `npm run dev` — dev server (`localhost:3000`)
- `npm run build` — production standalone build
- `npm run start` — production server local
- `npm run lint` — ESLint
- **⚠️ Spécificité Windows** : les scripts post-build (`cp -r`) échouent — **seul le build Next.js compte** (la copie post-build est ignorable sur Windows)
- **Déploiement** : GitHub → Hostinger (auto). Pas d'étape manuelle.

## Fichiers SEO/LLM (à maintenir cohérents)

À chaque ajout/modification de page indexable :
- `public/sitemap.xml` — entrée `<url>` avec `<lastmod>` ISO 8601 et `priority` adaptée
- `public/news-sitemap.xml` — articles récents (< 30 jours)
- `public/llms.txt` — résumé site pour LLM crawlers (sections services, articles, FAQ)
- `public/robots.txt` — directives bot + référence sitemaps
- `src/data/resources.ts` — **catalog partagé, vraie source de vérité** : article en première position du tableau `ARTICLES` (avec `tldr`/`sectors`/`pains`) ; idées dans `IDEAS`. `blog-view.tsx`, `idees-view.tsx` et le hub `/augmenter-mon-entreprise` l'importent. (⚠️ `src/components/sections/blog-preview.tsx` est **legacy** post-refonte bento, ne pas y toucher)
- `src/components/layout/footer.tsx` — lien si page sectorielle/locale/légale

## Contraintes cross-projet (rappel)

- **Mot « gratuit » interdit** — utiliser « offert », « sans engagement », « inclus », « 0 € »
- **Auteur unique** : Pierre Legrand (à respecter dans tout JSON-LD `Article.author`, `Person`)
- **Date format** : ISO 8601 (`YYYY-MM-DD`) partout — filenames, frontmatter, `<lastmod>`, contenus
- **Slugs** : kebab-case, lowercase, ASCII, max 5 mots

---

**Utilisé par** :
- [`/debt-report`](../../commands/debt-report.md) — section Contexte projet
- [`/security-audit`](../../commands/security-audit.md) — section Contexte projet
- [`/doc-audit`](../../commands/doc-audit.md) — section Contexte projet
- [`/codex-execute-task`](../../commands/codex-execute-task.md) — section Contexte projet
- Les commandes SEO référencent [`../seo/project-context.md`](../seo/project-context.md) qui ajoute les couches éditoriales et géographiques (audience, ton, pyramide d'offres).
