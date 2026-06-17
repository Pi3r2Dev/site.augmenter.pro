# Commande : Audit documentation

Tu es un expert en documentation technique. Tu vas auditer et améliorer la documentation du projet **augmenter.pro** pour garantir la maintenabilité et l'onboarding facile.

## Contexte projet

**À lire en premier** : [`.claude/templates/shared/project-context.md`](.claude/templates/shared/project-context.md) — stack, patterns, conventions, fichiers SEO/LLM à maintenir cohérents.

Spécifique à `/doc-audit` :
- **Sources de vérité documentaires** : `CLAUDE.md` (instructions Claude), `STRATEGIE-EDITORIALE.md` (référence éditoriale, sections obsolètes flaguées dans le header), `docs/` (audits datés, backlog cleanup, prevision contenu).
- **Commandes Claude** : 8 commandes dans `.claude/commands/` (4 SEO + 4 non-SEO). Templates dans `.claude/templates/seo/` et `.claude/templates/shared/`.
- **Critère d'audit** : un nouvel arrivant doit pouvoir comprendre l'architecture + lancer le dev server en < 15 min via `CLAUDE.md` + `README.md`.

## Phase 1 — Inventaire de la documentation existante

Lis et analyse chaque fichier de documentation :

### 1.1 Documentation racine

1. **`CLAUDE.md`** — Instructions pour Claude Code (fichier critique)
   - Sections attendues : Project Overview, Commands, Tech Stack, Architecture, SEO & LLM Optimization, Key Constraints
   - Doit refléter exactement l'état actuel du projet
2. **`README.md`** (s'il existe) — Documentation développeur standard
3. **`package.json`** — Scripts (dev, build, start, lint), description, metadata

### 1.2 Configuration documentée

4. **`next.config.ts`** — `output: "standalone"`, headers de sécurité (si ajoutés)
5. **`components.json`** — Configuration shadcn/ui (style: new-york, tsx, aliases)
6. **`tsconfig.json`** — Path alias `@/*` → `src/*`, strict mode

### 1.3 Commandes Claude

7. **`.claude/commands/create-article.md`** — Workflow création article SEO
8. **`.claude/commands/seo-audit.md`** — Audit SEO complet
9. **`.claude/commands/security-audit.md`** — Audit sécurité
10. **`.claude/commands/doc-audit.md`** — Cet audit documentation
11. **`.claude/commands/debt-report.md`** — Rapport dette technique

### 1.4 Fichiers SEO/LLM

12. **`public/llms.txt`** — Description du site pour les crawlers IA
13. **`public/sitemap.xml`** — Plan du site pour les moteurs de recherche
14. **`public/robots.txt`** — Directives pour les crawlers

## Phase 2 — Vérification de la cohérence

### 2.1 CLAUDE.md vs réalité du projet

Compare chaque section du `CLAUDE.md` avec l'état réel :

| Section CLAUDE.md | Vérification |
|-------------------|-------------|
| Commands (dev, build, start, lint) | Lance chaque commande et vérifie qu'elle fonctionne |
| Tech Stack | Vérifie les versions dans package.json |
| Architecture — Routing | Compare avec les dossiers réels dans `src/app/` |
| Architecture — API Routes | Vérifie `src/app/api/` — routes actives ou dossier vide ? |
| Architecture — Component Organization | Compare avec `src/components/` réel |
| SEO & LLM — JSON-LD | Vérifie la table des schemas vs les fichiers source |
| SEO & LLM — Files | Vérifie que llms.txt, sitemap.xml, robots.txt existent |
| Key Constraints | Vérifie chaque contrainte listée |

### 2.2 llms.txt vs contenu réel

Vérifie que `public/llms.txt` est synchronisé :
- [ ] Section "Services" — correspond aux offres dans `pricing.tsx` et `prestations/page.tsx`
- [ ] Section "Articles de blog" — liste tous les articles existants dans `src/app/blog/*/page.tsx`
- [ ] Section "Idées d'innovation" — correspond à `idees/page.tsx`
- [ ] Section "FAQ" — correspond aux FAQ dans `approche/page.tsx`
- [ ] Section "Pages" — liste toutes les routes existantes
- [ ] Section "Contact" — email, téléphone, réseaux à jour
- [ ] Pas d'articles ou pages listés qui n'existent plus

### 2.3 sitemap.xml vs routes réelles

Vérifie que `public/sitemap.xml` est synchronisé :
- [ ] Toutes les pages de `src/app/*/page.tsx` ont une entrée `<url>`
- [ ] Tous les articles de blog `src/app/blog/*/page.tsx` sont listés
- [ ] Pas d'URLs orphelines (présentes dans le sitemap mais page supprimée)
- [ ] Priorités cohérentes (accueil 1.0, pages principales 0.8-0.9, articles 0.7, légales 0.3)
- [ ] `<lastmod>` renseigné si possible

### 2.4 catalog `resources.ts` vs articles/idées réels

La **vraie source de vérité** des listes `/blog` et `/idees` est le catalog `src/data/resources.ts` (tableaux `ARTICLES` et `IDEAS`) — `blog-view.tsx`, `idees-view.tsx` et le hub `/augmenter-mon-entreprise` l'importent. _(L'ancien `blog-preview.tsx` a été supprimé le 2026-05-26.)_

- [ ] Chaque article du tableau `ARTICLES` correspond à un dossier `src/app/blog/<slug>/`
- [ ] Tous les dossiers `src/app/blog/<slug>/` apparaissent dans `ARTICLES` (sinon l'article n'est pas visible sur `/blog`)
- [ ] Les slugs, titres, excerpts, tags, readTime, image correspondent entre la liste et la page article
- [ ] Chaque article a `tldr` + `sectors` + `pains` renseignés (sinon absent ou mal classé dans le hub `/augmenter-mon-entreprise`) ; chaque idée a `sector` + `pains`
- [ ] L'article le plus récent est en première position

### 2.5 JSON-LD schemas vs composants

Vérifie la cohérence des données structurées :

| Schema | Fichier source | Vérification |
|--------|---------------|--------------|
| Organization | `layout.tsx` | name, url, founder, contactPoint, sameAs |
| LocalBusiness | `layout.tsx` | areaServed (78, 95, IDF), priceRange, knowsAbout |
| WebSite | `layout.tsx` | publisher ref vers Organization |
| Article | `article-layout.tsx` | Chaque article passe bien le prop `slug` |
| FAQPage | `approche/page.tsx` | Questions/réponses synchronisées avec le contenu visible |
| Service/OfferCatalog | `prestations/page.tsx` | Prix et descriptions synchronisés avec `pricing.tsx` |
| AggregateRating/Review | `testimonials.tsx` | ratingValue et reviewCount à jour |

## Phase 3 — Audit du code source

### 3.1 Composants — documentation inline

Pour chaque composant dans `src/components/`, vérifie :
- [ ] Interface TypeScript avec props typées (si le composant accepte des props)
- [ ] Commentaires sur la logique métier non évidente
- [ ] Nommage clair et auto-documenté des variables/fonctions

**Fichiers clés à analyser :**
- `src/components/layout/article-layout.tsx` — Props : title, excerpt, tags, readTime, date, slug (optionnel pour JSON-LD canonical)
- `src/components/layout/header.tsx` — Navigation avec liens + CTA "Audit offert" (le mot « gratuit » est interdit sur le site)
- `src/components/layout/footer.tsx` — Liens footer
- `src/components/sections/*.tsx` — 9 sections de la homepage

### 3.2 Pages — metadata

Pour chaque route dans `src/app/`, vérifie :
- [ ] `export const metadata: Metadata` présent et complet (title < 60 chars, description < 155 chars)
- [ ] Page qui est server component (pas de `"use client"`) pour permettre l'export metadata
- [ ] Si la page a besoin d'interactivité, le pattern server/client split est respecté (cf. `/contact`)

**Pages à vérifier :**
- `src/app/layout.tsx` — metadata globale + JSON-LD
- `src/app/page.tsx` — page accueil (hérite du layout, peut avoir sa propre metadata)
- `src/app/prestations/page.tsx`
- `src/app/approche/page.tsx`
- `src/app/idees/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/contact/page.tsx` — server wrapper avec metadata
- `src/app/mentions-legales/page.tsx`
- `src/app/blog/*/page.tsx` — tous les articles

### 3.3 Utilitaires

- `src/lib/utils.ts` — fonction `cn()` (clsx + tailwind-merge)

## Phase 4 — Documentation manquante

Identifie ce qui devrait être documenté mais ne l'est pas :

### Documentation projet (priorité haute)
- [ ] Guide d'ajout d'un article de blog (dans CLAUDE.md — section "Adding a New Blog Article")
- [ ] Procédure de déploiement (GitHub → Hostinger, build standalone)
- [ ] Variables d'environnement requises (liste avec descriptions)

### Documentation technique (priorité moyenne)
- [ ] Architecture des composants (quels composants sont client vs server, et pourquoi)
- [ ] Pattern server/client split (documenté ? cf. `/contact`)
- [ ] Conventions CSS/Tailwind (palette OKLCH, classes custom `.gradient-text`, `.hero-gradient`)
- [ ] Convention des commandes Claude (format, objectif, quand les utiliser)

### Documentation métier (priorité basse)
- [ ] Personas cibles et parcours utilisateur
- [ ] Objectifs de conversion par page
- [ ] Processus éditorial pour le blog (recherche → brief → rédaction → intégration)

## Phase 5 — Rapport

Génère un rapport structuré :

```
## Score documentation : X/100

## Résumé
- Fichiers documentés : X/Y
- Pages avec metadata complète : X/Y
- CLAUDE.md : X écarts identifiés
- llms.txt : X désynchronisations
- sitemap.xml : X pages manquantes/orphelines
- blog-preview.tsx : X articles désynchronisés
- JSON-LD schemas : X incohérences

## CLAUDE.md — Écarts détectés
| Section | État CLAUDE.md | État réel | Action |
|---------|----------------|-----------|--------|
| ...     | ...            | ...       | ...    |

## Synchronisation SEO/LLM
| Fichier | Statut | Problèmes |
|---------|--------|-----------|
| llms.txt | ✅/⚠️ | ... |
| sitemap.xml | ✅/⚠️ | ... |
| robots.txt | ✅/⚠️ | ... |
| blog-preview.tsx | ✅/⚠️ | ... |
| JSON-LD schemas | ✅/⚠️ | ... |

## Documentation manquante (par priorité)
| Priorité | Document | Impact | Effort |
|----------|----------|--------|--------|
| HAUTE    | ...      | ...    | ...    |
| MOYENNE  | ...      | ...    | ...    |
| FAIBLE   | ...      | ...    | ...    |

## Code sous-documenté
| Fichier | Problème | Suggestion |
|---------|----------|------------|
| ...     | ...      | ...        |

## Plan d'action
1. [IMMÉDIAT] Corriger les désynchronisations llms.txt/sitemap...
2. [COURT TERME] Mettre à jour CLAUDE.md...
3. [MOYEN TERME] Ajouter documentation manquante...
```

### Corrections automatiques

Si l'utilisateur le demande, implémente directement :
- Mise à jour du `CLAUDE.md` avec les écarts corrigés
- Synchronisation de `llms.txt` avec le contenu réel du site
- Synchronisation de `sitemap.xml` avec les routes réelles
- Synchronisation de `blog-preview.tsx` avec les articles existants
- Ajout des metadata manquantes sur les pages
- Mise à jour des commandes `.claude/` si nécessaire
