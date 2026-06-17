# Commande : Rapport de dette technique

Tu es un architecte logiciel senior. Tu vas analyser le projet **augmenter.pro** (Next.js 16 / React 19 / Tailwind 4) et produire un rapport complet de dette technique.

## Contexte projet

**À lire en premier** : [`.claude/templates/shared/project-context.md`](.claude/templates/shared/project-context.md) — stack, patterns architecturaux, conventions de code, build/déploiement.

Spécifique à `/debt-report` :
- Focus dette technique = lisibilité long-terme. Pas de réécriture cosmétique, pas de chasse à la perfection.
- Considérer le **coût d'opportunité** : refactor ✕ valeur vs ajout de feature.
- Le projet est petit, mono-développeur — privilégier les patterns simples à maintenir seul.

## Phase 1 — Analyse de l'architecture

### 1.1 Structure du projet

Lis l'arborescence complète du projet et vérifie :
- [ ] Organisation des dossiers cohérente et scalable
- [ ] Séparation des responsabilités (pages, composants, utils, types)
- [ ] Convention de nommage cohérente (kebab-case fichiers, PascalCase composants)
- [ ] Pas de fichiers orphelins ou inutilisés

**Fichiers résiduels connus de Create Next App** :
- `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- Ces SVG ne sont référencés nulle part — à supprimer pour nettoyer le repo

### 1.2 Duplication de données (dette majeure connue)

Depuis l'introduction du catalog (`src/data/resources.ts`), les listes articles ET idées sont centralisées dans **un seul fichier** : tableaux `ARTICLES` et `IDEAS`, importés par `blog-view.tsx`, `idees-view.tsx` et le hub `/augmenter-mon-entreprise`. La triple duplication blog/idées/hub est **résolue**. _(Les composants legacy `approach.tsx`, `blog-preview.tsx`, `ideas.tsx`, `pricing.tsx` ont été supprimés le 2026-05-26 — confirmés non importés.)_

Duplication restante : les données d'un article existent encore en **deux endroits** :

1. **`src/data/resources.ts`** — tableau `ARTICLES` (slug, title, excerpt, `tldr`, tags, readTime, image, `sectors`, `pains`)
2. **`src/app/blog/<slug>/page.tsx`** — chaque article reprend les mêmes infos dans `<ArticleLayout>` props + `metadata`

**Risques** :
- Désynchronisation titre/excerpt/tags entre la liste (`resources.ts`) et la page réelle
- Oubli de mettre à jour `resources.ts` lors de l'ajout d'un article (l'article existe mais n'apparaît ni sur `/blog` ni dans le hub)
- Article sans `tldr`/`sectors`/`pains` → invisible/mal classé dans le hub
- La commande `/create-article` documente la mise à jour des deux

**Évaluer** :
- Faut-il centraliser dans un fichier `src/data/articles.ts` importé par les deux ?
- Ou accepter la duplication avec un mécanisme de vérification (commande `/doc-audit` §2.4) ?
- Impact DX vs complexité de la factorisation

### 1.3 Autres duplications potentielles

Vérifie si d'autres données sont dupliquées :
- [ ] Prix : contenu visible `/approche` (absorbe l'ancien `/prestations`) vs JSON-LD Service/OfferCatalog (`approche/page.tsx`)
- [ ] FAQ : `approche/page.tsx` contenu visible vs JSON-LD FAQPage
- [ ] Témoignages : tableau `REVIEWS` dans `layout.tsx` + JSON-LD AggregateRating/Review
- [ ] Informations de contact : `contact-form.tsx`, `footer.tsx`, `llms.txt`, layout.tsx JSON-LD

### 1.4 Patterns & anti-patterns

Lis tous les fichiers source dans `src/` et identifie :
- [ ] Logique métier mélangée avec la présentation
- [ ] Composants trop volumineux qui devraient être découpés
- [ ] Imports non utilisés ou circulaires
- [ ] Incohérences de style entre composants similaires
- [ ] Styles inline vs classes Tailwind — cohérence

### 1.5 Composants client vs server

Audite l'utilisation des directives `"use client"` :

**Composants client connus** (nécessitent `"use client"` pour framer-motion ou interactivité) :
- `cta.tsx` — animations framer-motion (LiquidBlob, word stagger, magnetic button)
- `blog-view.tsx`, `idees-view.tsx` — pages bento client (state filtres)
- narrative (`background-canvas`, `smooth-scroll-provider`, `custom-cursor`, etc.) + `suite-cockpit.tsx` — Three.js / GSAP / Lenis
- `header.tsx` — mobile menu (Sheet), scroll detection
- `contact-form.tsx` + `quote-wizard.tsx` — formulaire interactif
- _(legacy supprimés 2026-05-26 : hero/services/approach/pricing/ideas/testimonials/blog-preview/trust)_

**Vérifier** :
- [ ] Chaque composant marqué `"use client"` en a réellement besoin ?
- [ ] Les composants avec uniquement du JSON-LD + framer-motion pourraient-ils extraire le JSON-LD côté server ?
- [ ] Impact estimé sur le bundle size si certains composants étaient convertis en server components

## Phase 2 — Qualité du code

### 2.1 TypeScript

- [ ] Mode strict activé dans `tsconfig.json` — vérifié ?
- [ ] Types `any` utilisés quelque part (à éliminer)
- [ ] Interfaces vs types — cohérence dans le projet
- [ ] Props typées sur tous les composants
- [ ] Pas de `@ts-ignore` ou `@ts-expect-error`
- Lance `npx tsc --noEmit` pour vérifier les erreurs de type

### 2.2 Linting & formatage

- Lance `npm run lint` et analyse les résultats
- [ ] Règles ESLint appropriées pour Next.js
- [ ] Formatage cohérent (Prettier configuré ?)
- [ ] Pas de warnings ignorés

### 2.3 Échappement JSX

Vérifie les textes français dans le JSX :
- [ ] Apostrophes : `&apos;` ou `{'\'}` (pas de `'` brut dans le JSX)
- [ ] Guillemets : `&quot;` ou `&ldquo;`/`&rdquo;`
- [ ] Esperluettes : `&amp;`
- [ ] Les composants existants sont-ils cohérents dans leur approche d'échappement ?

## Phase 3 — Dépendances & build

### 3.1 Dépendances

Lis `package.json` :
- [ ] Dépendances obsolètes (versions majeures en retard)
- [ ] Dépendances inutilisées (installées mais non importées)
- [ ] Dépendances qui devraient être en devDependencies (ou inversement)
- [ ] Taille du bundle — dépendances lourdes évitables (framer-motion est la plus lourde)
- Lance `npm ls --depth=0` pour l'état actuel
- Lance `npm audit` pour les vulnérabilités connues

### 3.2 Build & performance

Lance `npm run build` et analyse :
- [ ] Warnings de build (ignorer les erreurs post-build `cp -r` sur Windows)
- [ ] Taille des bundles par route
- [ ] Pages statiques vs dynamiques (avec `output: "standalone"`, toutes sont pré-rendues au build)
- [ ] Temps de build
- [ ] First Load JS partagé — taille acceptable ?

**Note Windows** : Le script `postbuild` du `package.json` peut contenir des commandes Unix (`cp -r`, `mkdir -p`) qui échouent sur Windows. Ce n'est **pas** un problème : seul le `next build` compte, le postbuild est pour le déploiement Hostinger.

### 3.3 Configuration

Lis et audite :
- `next.config.ts` — `output: "standalone"`, headers de sécurité (si ajoutés), pas de distDir custom
- `tsconfig.json` — strict mode, path alias `@/*`, target/module
- `globals.css` — Variables CSS OKLCH, classes custom (`.gradient-text`, `.hero-gradient`)
- `components.json` — Config shadcn (style: new-york, baseColor: neutral, cssVariables: true)
- `tailwind.config.*` — Existe-t-il un fichier de config Tailwind séparé ou tout est dans globals.css ? (Tailwind 4 utilise CSS)

## Phase 4 — Maintenabilité & scalabilité

### 4.1 Tests

- [ ] Tests unitaires présents ? (probablement non pour un site vitrine)
- [ ] Tests e2e ? (Playwright, Cypress ?)
- [ ] CI/CD configuré ? (GitHub Actions ?)
- [ ] Si pas de tests : évaluer le risque (faible pour un site vitrine statique sans logique métier)

### 4.2 Scalabilité du contenu

Évalue la stratégie actuelle (tout hardcodé) vs les alternatives :

| Approche | Avantages | Inconvénients | Recommandé quand |
|----------|-----------|---------------|-------------------|
| **Actuel** (inline JSX) | Simple, typé, zero config | Duplication, pas de preview | < 20 articles |
| Fichiers data centralisés (`src/data/`) | Factorisation, single source of truth | Encore du code, pas de preview | 10-50 articles |
| MDX | Markdown + composants, DX agréable | Config supplémentaire | 20-100 articles |
| CMS headless (Sanity, Strapi) | Preview, non-dev peut éditer | Complexité, coût, dépendance | 50+ articles, équipe non-tech |

**Recommandation** : Pour le volume actuel (5 articles), l'inline est acceptable. À partir de ~15 articles, envisager la centralisation dans `src/data/`.

### 4.3 Accessibilité (a11y)

Vérifie rapidement :
- [ ] Semantic HTML utilisé correctement (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
- [ ] Aria labels sur les éléments interactifs (boutons icon-only, liens sociaux)
- [ ] Contraste des couleurs (palette OKLCH violet/amber sur fond sombre/clair)
- [ ] Navigation au clavier fonctionnelle (focus visible, tab order logique)
- [ ] Skip to content link (souvent manquant)
- [ ] Images avec attributs `alt` (si applicable — le site utilise surtout des icônes Lucide)
- [ ] Formulaire de contact : labels associés aux inputs, messages d'erreur accessibles

### 4.4 SEO technique

- [ ] Toutes les pages ont une metadata unique (title + description)
- [ ] Hiérarchie Hn correcte (un seul H1 par page)
- [ ] Pas de contenu dupliqué entre pages
- [ ] `metadataBase` configuré dans `layout.tsx` (pour les URLs canoniques)
- [ ] Pas de pages indexables sans contenu suffisant

## Phase 5 — Rapport

Génère un rapport structuré avec scoring :

```
## Score de dette technique : X/100
(100 = aucune dette, 0 = critique)

## Résumé
- Fichiers analysés : X
- Problèmes critiques : X
- Warnings : X
- Suggestions : X

## Dette critique (impact fort sur la prod ou le dev)
| # | Problème | Fichier(s) | Impact | Effort fix |
|---|----------|------------|--------|------------|
| 1 | ...      | ...        | HAUT   | Xh         |

## Dette moyenne (impact sur la maintenabilité)
| # | Problème | Fichier(s) | Impact | Effort fix |
|---|----------|------------|--------|------------|
| 1 | Duplication articles catalog ↔ pages (liste vs `<ArticleLayout>` props) | resources.ts (`ARTICLES`) + blog/*/page.tsx | MOYEN | 2h |
| 2 | SVG résiduels Create Next App | public/*.svg (5 fichiers) | FAIBLE | 5min |
| 3 | ... | ... | ... | ... |

## Dette faible (améliorations souhaitables)
| # | Problème | Fichier(s) | Impact | Effort fix |
|---|----------|------------|--------|------------|
| 1 | ...      | ...        | FAIBLE | Xh         |

## Métriques
- Erreurs TypeScript : X
- Warnings ESLint : X
- Dépendances obsolètes : X
- Vulnérabilités npm : X
- Composants client : X (dont X potentiellement convertibles en server)
- Données dupliquées : X emplacements
- Fichiers résiduels : X

## Build
- Taille totale : X
- Pages statiques : X (liste)
- First Load JS partagé : X kB
- Temps de build : Xs
- Warnings de build : X

## Roadmap de remédiation
### Sprint 1 — Quick wins (< 1 jour)
- [ ] Supprimer les SVG résiduels de public/
- [ ] Fix les warnings ESLint/TypeScript
- [ ] Ajouter maxLength aux champs du formulaire contact
- [ ] ...

### Sprint 2 — Fondations (1-3 jours)
- [ ] Centraliser les données articles dans src/data/articles.ts
- [ ] Ajouter les headers de sécurité dans next.config.ts
- [ ] ...

### Sprint 3 — Scalabilité (1 semaine+)
- [ ] Migrer vers MDX pour les articles (si > 15 articles)
- [ ] Ajouter tests e2e basiques (navigation, formulaire)
- [ ] ...
```

### Corrections automatiques

Si l'utilisateur le demande, implémente directement les quick wins :
- Suppression des SVG résiduels (`public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`)
- Suppression des imports inutilisés
- Fix des erreurs TypeScript
- Fix des warnings ESLint
- Centralisation des données articles dans `src/data/articles.ts`
- Conversion de composants client en server quand possible
