# Commande : Modifier / Restructurer une ressource SEO

Tu es un expert en stratégie de contenu SEO et en architecture Next.js. Tu vas **modifier, restructurer ou transformer** une ou plusieurs ressources existantes sur **augmenter.pro** — sans rien casser (SEO, maillage, redirections, intégration).

## Contexte projet

**À lire en premier** : [`.claude/templates/seo/project-context.md`](.claude/templates/seo/project-context.md)

Ce fichier centralise : positionnement, stack technique, stack SEO/LLM, audience et modalités géographiques, pyramide d'offres, contraintes éditoriales, identité éditoriale.

Spécifique à la modification/restructuration :
- **Redirections** : `next.config.ts` → `async redirects()` avec `permanent: true` pour les 301
- **Données inline** : pas de CMS — tout est hardcodé dans les composants, donc la modification passe toujours par de l'édition de fichiers TSX
- **Règle SEO critique** : toute URL supprimée ou déplacée DOIT avoir une redirection 301
- ⚠️ **Liste articles & idées** : la **vraie source de vérité** est désormais le catalog `src/data/resources.ts` (tableau `ARTICLES` pour `/blog`, tableau `IDEAS` pour `/idees`) — `blog-view.tsx` et `idees-view.tsx` l'importent, et le hub `/augmenter-mon-entreprise` le consomme. Modifier/supprimer un article ou une idée se fait **dans `resources.ts`** (penser à `tldr`/`sectors`/`pains` pour les articles). Partout dans ce document où `blog-view.tsx` ou `blog-preview.tsx` est mentionné comme cible pour la liste d'articles, **utiliser `src/data/resources.ts` à la place** (`blog-preview.tsx` reste **legacy**). Les autres références (footer, sitemap, llms.txt, `next.config.ts`) restent inchangées.

**Check-lists & appels MCP communs** :
- Check-lists A à E : [`.claude/templates/seo/checklist.md`](.claude/templates/seo/checklist.md) (SEO on-page, E-E-A-T, JSON-LD, intégration site, **§E spécifique modify/restructure**)
- Appels MCP performance & indexation : [`.claude/templates/seo/mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §1.4 (page × query) + §1.7 (`index_inspect` post-modification)

## Document de référence stratégique (optionnel)

`STRATEGIE-EDITORIALE.md` à la racine du projet est un **snapshot historique partiellement obsolète** (cf. avertissement en tête du fichier). Sections **toujours utiles** : §3 (clusters de mots-clés), §6 (axes de variabilité), §7 (banque de stats sourcées + PAA). Sections **désynchronisées** : §4 matrice, §5 file, §11 journal — préférer `git log` + `ls src/app/` pour l'état réel des ressources.

---

## Paramètre requis

La modification demandée : `$ARGUMENTS`

Si aucun argument n'est fourni, demander :
1. Quelle(s) ressource(s) modifier ? (URL ou chemin de fichier)
2. Quel type de transformation ? (voir §1.1 ci-dessous)
3. Quel est l'objectif ? (SEO, restructuration, mise à jour contenu, fusion, split)

---

## Étape 1 — Inventaire de l'existant

### 1.1 Identifier le type de transformation

| Transformation | Description | Complexité |
|---|---|---|
| **Split** | 1 page → N pages/articles (ex: article trop long → pilier + satellites) | Haute |
| **Merge** | N pages → 1 page (ex: 3 articles proches → 1 guide complet) | Haute |
| **Restructure** | Réorganiser le contenu d'une page (H2/H3, sections, ordre) | Moyenne |
| **Move** | Changer la route/slug d'une page (ex: `/blog/x` → `/secteurs/x`) | Moyenne |
| **Update** | Mettre à jour le contenu (chiffres, dates, liens, exemples) | Faible |
| **Type change** | Changer le type de ressource (ex: article → page sectorielle) | Haute |
| **Enrich** | Ajouter du contenu à une page existante (sections, FAQ, cas) | Faible |
| **Prune** | Supprimer une ressource obsolète (avec redirect) | Moyenne |

### 1.2 Audit complet de la ressource source

Pour CHAQUE ressource concernée, collecter :

```
INVENTAIRE — [URL de la ressource]

1. FICHIER
   - Chemin : src/app/.../page.tsx
   - Type : server component / client component
   - Composant wrapper : ArticleLayout / custom / aucun

2. METADATA
   - Title : "..."
   - Description : "..."
   - Robots : (si spécifié)

3. JSON-LD
   - Type(s) : Article / Service / FAQPage / etc.
   - Propriétés clés : slug, canonical, author, offers...

4. CONTENU
   - Nombre de mots approximatif
   - Structure H2/H3 (plan)
   - Tags (si ArticleLayout)
   - Date de publication

5. LIENS INTERNES SORTANTS
   - Liste des <Link href="..."> dans la page
   - Texte d'ancrage de chaque lien

6. LIENS INTERNES ENTRANTS (critique !)
   - Grep toutes les pages qui pointent vers cette URL
   - Inclure : pages, articles, footer, header, blog-preview

7. INTÉGRATION SITE
   - Entrée dans sitemap.xml : oui/non, priorité
   - Entrée dans llms.txt : oui/non, section
   - Entrée dans blog-preview.tsx : oui/non, position
   - Entrée dans footer.tsx : oui/non, section
   - Prompt associé dans `src/data/prompts.ts` : oui/non (vérifier `relatedArticles`)

8. REDIRECTIONS EXISTANTES
   - Vérifier dans next.config.ts si des redirections pointent vers cette URL
```

**Commandes de recherche** :

```bash
# Trouver tous les liens entrants vers une ressource
grep -r "href=\"/chemin-de-la-page" src/
grep -r "/chemin-de-la-page" public/llms.txt public/sitemap.xml
grep -r "slug-de-la-page" src/components/sections/blog-preview.tsx
grep -r "/chemin-de-la-page" src/components/layout/footer.tsx
grep -r "/chemin-de-la-page" next.config.ts
```

### 1.3 Qualification E-E-A-T de la modification

Avant de proposer le plan, vérifier :

1. **La modification améliore-t-elle l'E-E-A-T ?** Si non, pourquoi la faire ?
2. **Le contenu modifié restera-t-il dans le périmètre d'expertise ?** augmenter.PRO = IA + digital + audit pour PME 78/95.
3. **L'utilisateur final y gagnera-t-il ?** Plus clair, plus actionnable, mieux structuré ?

---

## Étape 2 — Plan de transformation

### 2.1 Tableau de correspondance URL

Pour chaque changement d'URL, créer un tableau :

| URL actuelle | URL cible | Type | Action |
|---|---|---|---|
| `/blog/ancien-slug` | `/blog/nouveau-slug` | 301 redirect | Move |
| `/blog/ancien-slug` | `/secteurs/nouveau` | 301 redirect | Type change |
| `/blog/article-trop-long` | `/blog/article-trop-long` (conservé) | Pas de redirect | Restructure |
| `/blog/article-trop-long` | `/blog/satellite-1` (nouveau) | Pas de redirect | Split (nouveau) |
| `/blog/article-a-merger` | `/blog/guide-complet` | 301 redirect | Merge (supprimé) |

**Règle SEO critique** : Toute URL supprimée ou déplacée DOIT avoir une redirection 301 dans `next.config.ts`.

### 2.2 Plan de contenu

Pour chaque ressource résultante, utiliser le template approprié :

| Cas | Template |
|---|---|
| Nouvelle ressource créée (Split, Type change article, Move) | [`.claude/templates/seo/article-brief.md`](.claude/templates/seo/article-brief.md) |
| Nouvelle page custom créée (Split vers page sectorielle/locale, Type change page) | [`.claude/templates/seo/page-spec.md`](.claude/templates/seo/page-spec.md) |
| Réécriture copy / enrichissement (Update, Enrich, Restructure) | [`.claude/templates/seo/copy-proposal.md`](.claude/templates/seo/copy-proposal.md) |
| Modification d'une offre / service | [`.claude/templates/seo/service-card.md`](.claude/templates/seo/service-card.md) |

Champs minimums à documenter par ressource résultante : titre SEO (< 60 chars), meta description (< 155 chars), type, slug/route, contenu conservé/modifié/ajouté/supprimé, nouveaux liens internes, JSON-LD adapté.

### 2.3 Impact sur le maillage interne

| Page impactée | Modification nécessaire |
|---|---|
| `src/app/page-qui-lien.tsx` | Mettre à jour `href="/ancien"` → `href="/nouveau"` |
| `blog-preview.tsx` | Modifier/supprimer/ajouter l'entrée |
| `footer.tsx` | Modifier le lien si concerné |
| `sitemap.xml` | Supprimer ancien, ajouter nouveau |
| `llms.txt` | Supprimer ancien, ajouter nouveau |
| `next.config.ts` | Ajouter redirect 301 |

**Attends la validation de l'utilisateur avant de passer à l'étape 3.**

---

## Étape 3 — Exécution des modifications

### 3.1 Ordre d'exécution (IMPORTANT)

Respecter cet ordre pour éviter les liens cassés pendant le processus :

```
1. CRÉER les nouvelles ressources (fichiers page.tsx)
2. MODIFIER les ressources existantes (contenu, metadata, liens)
3. SUPPRIMER les ressources obsolètes (si applicable)
4. AJOUTER les redirections dans next.config.ts
5. METTRE À JOUR les références (sitemap, llms.txt, blog-preview, footer)
6. METTRE À JOUR les liens internes dans toutes les pages impactées
7. BUILD pour vérifier
```

### 3.2 Redirections dans next.config.ts

Pour chaque URL modifiée ou supprimée, ajouter dans `async redirects()` :

```ts
{ source: "/ancienne-url", destination: "/nouvelle-url", permanent: true },
```

**Conventions** :
- Toujours `permanent: true` (redirect 301) sauf si la redirection est temporaire
- Si l'ancienne URL avait elle-même des redirections pointant vers elle, mettre à jour la chaîne (pas de double redirect)
- Vérifier qu'aucune redirect existante ne pointe vers l'URL qu'on supprime

### 3.3 Templates de modification

#### Split : 1 article → page pilier + articles satellites

1. **Conserver** l'URL d'origine pour la page pilier (pas de redirect nécessaire)
2. **Extraire** les sections en articles autonomes avec `ArticleLayout`
3. **Ajouter** des liens croisés entre la page pilier et les satellites
4. **Enrichir** la page pilier avec des résumés + liens vers les satellites
5. **Créer** les satellites comme de nouveaux articles (suivre le template de `create-resource`)

#### Merge : N articles → 1 guide

1. **Choisir** l'URL à conserver (celle avec le plus de liens entrants / ancienneté)
2. **Fusionner** le contenu en dédupliquant, réorganisant, enrichissant
3. **Supprimer** les fichiers des articles absorbés
4. **Ajouter** des redirections 301 des URLs supprimées vers l'URL conservée
5. **Mettre à jour** blog-preview.tsx (supprimer les entrées fusionnées, modifier l'entrée conservée)

#### Move : changement de route

1. **Créer** le fichier dans la nouvelle route
2. **Supprimer** le fichier de l'ancienne route
3. **Ajouter** la redirection 301
4. **Mettre à jour** tous les liens internes (grep exhaustif)
5. **Mettre à jour** sitemap.xml, llms.txt, blog-preview.tsx, footer.tsx

#### Type change : article → page sectorielle (ou inversement)

1. **Créer** la nouvelle page avec le bon template (ArticleLayout → page custom, ou inversement)
2. **Migrer** le contenu en adaptant la structure (H2/sections, JSON-LD, CTA)
3. **Si changement d'URL** : redirection 301 + mise à jour des références
4. **Adapter** le JSON-LD (Article → Service, etc.)
5. **Mettre à jour** blog-preview si passage article → non-article (supprimer l'entrée)
6. **Mettre à jour** footer si passage vers page sectorielle/locale (ajouter l'entrée)

#### Enrich : ajouter du contenu

1. **Lire** la page existante
2. **Identifier** où insérer le nouveau contenu (après quel H2, avant le CTA, etc.)
3. **Ajouter** les sections sans modifier la structure existante
4. **Mettre à jour** la metadata si le titre/description doivent évoluer
5. **Ajouter** des liens internes si les nouvelles sections le permettent
6. **Mettre à jour** llms.txt si la description de la page change significativement

#### Prune : supprimer une ressource

1. **Vérifier** que la page a bien une URL de destination pour la redirect
2. **Supprimer** le fichier page.tsx (et le dossier si vide)
3. **Ajouter** la redirection 301 vers la page la plus pertinente
4. **Supprimer** l'entrée de sitemap.xml, llms.txt, blog-preview.tsx, footer.tsx
5. **Mettre à jour** tous les liens internes qui pointaient vers cette page

---

## Étape 4 — Mise à jour de toutes les références

### 4.1 Checklist de mise à jour (pour chaque URL modifiée/supprimée/créée)

| Fichier | Action | Commande de vérification |
|---|---|---|
| **`next.config.ts`** | Ajouter redirect 301 si URL changée/supprimée | Lire `async redirects()` |
| **`public/sitemap.xml`** | Supprimer ancien `<url>`, ajouter nouveau | Grep `<loc>` |
| **`public/llms.txt`** | Supprimer ancienne entrée, ajouter nouvelle | Grep URL |
| **`blog-preview.tsx`** | Supprimer/modifier/ajouter entrée article | Grep slug |
| **`footer.tsx`** | Modifier/ajouter/supprimer lien si applicable | Grep URL |
| **Toutes les pages `src/app/`** | Mettre à jour `<Link href="...">` | Grep ancienne URL |

### 4.2 Grep exhaustif des liens internes

**OBLIGATOIRE** avant de finaliser : vérifier qu'aucun lien interne ne pointe vers une URL supprimée ou déplacée.

```
# Pour chaque ancienne URL supprimée ou déplacée :
grep -r "ancien-slug" src/ --include="*.tsx" --include="*.ts"
grep -r "ancien-slug" public/ --include="*.txt" --include="*.xml"
```

Si des résultats apparaissent → mettre à jour ces fichiers.

### 4.3 Vérification des chaînes de redirections

Après avoir ajouté des redirections, vérifier qu'il n'y a pas de **double redirect** (A → B → C). Si oui, simplifier en A → C.

```
# Dans next.config.ts, vérifier :
# - Aucune `source` ne pointe vers une `destination` qui est elle-même une `source`
# - Aucune `destination` n'est une URL supprimée
```

### 4.4 Ping IndexNow (toute URL modifiée, déplacée ou redirigée)

Une fois les modifications en ligne, pousser dans l'index Bing (→ ChatGPT Search) **chaque URL touchée** : la nouvelle URL d'une page déplacée, l'URL conservée d'une page enrichie, et l'**ancienne URL** désormais redirigée (pour que Bing réindexe le 301). Cf. [`.claude/templates/seo/mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §9 et [`checklist.md`](.claude/templates/seo/checklist.md) §G.8.

```bash
# Lot d'URLs touchées (nouvelle + ancienne redirigée)
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "augmenter.pro",
    "key": "<CLE_INDEXNOW>",
    "keyLocation": "https://augmenter.pro/<CLE_INDEXNOW>.txt",
    "urlList": ["https://augmenter.pro/<nouvelle-url>", "https://augmenter.pro/<ancienne-url>"]
  }'
```

> ⚠️ Prérequis utilisateur **une seule fois** : site vérifié dans Bing Webmaster Tools + clé déposée en `public/<clé>.txt`. Si la clé n'est pas en place, marquer le ping en TODO (action manuelle) dans le rapport final.

---

## Étape 5 — Qualité du contenu modifié

### 5.1 Règles de rédaction (identiques à create-resource)

- **Langue** : Français courant, professionnel mais accessible
- **Ton** : Expert pragmatique, orienté résultats
- **Échappement JSX** : `&apos;` pour les apostrophes, `&amp;` pour les &, `&quot;` pour les guillemets
- **Liens internes** : Minimum 3 par page via `<Link href="/...">` (import `next/link`)
- **CTA** : Au moins 1 appel à l'action par page
- **Données locales** : Localiser les exemples quand possible

### 5.2 E-E-A-T — Vérifier après modification

Re-scorer la ressource avec la grille [`.claude/templates/seo/eeat-grid.md`](.claude/templates/seo/eeat-grid.md) — la modification ne doit **jamais** dégrader le score E-E-A-T.

- [ ] Le contenu modifié conserve ≥ 1 exemple terrain
- [ ] Le contenu modifié conserve ≥ 1 avis d'expert
- [ ] Les données chiffrées sont toujours sourcées et à jour
- [ ] Les limites/nuances sont toujours présentes
- [ ] Le contenu reste actionnable pour le lecteur
- [ ] Aucune occurrence du mot « gratuit » introduite par la modification (remplacer systématiquement par « offert », « sans engagement », « inclus »)

### 5.3 SEO — Vérifier après modification

- [ ] Title < 60 chars, description < 155 chars
- [ ] Mot-clé principal dans title, H1, premier paragraphe
- [ ] Slug URL court et descriptif
- [ ] JSON-LD valide et cohérent avec le nouveau contenu
- [ ] Aucun contenu dupliqué entre les pages résultantes

---

## Étape 6 — Build & Checklist finale

### 6.1 Build

```bash
npm run build
```

Le build Next.js doit passer sans erreur. Vérifier que toutes les pages apparaissent dans la sortie.

### 6.2 Checklist finale

#### Intégrité des URLs
- [ ] Toute URL supprimée/déplacée a une redirection 301 dans `next.config.ts`
- [ ] Pas de double redirect (vérifier la chaîne A → B → C)
- [ ] Aucune redirect existante ne pointe vers une URL supprimée

#### Références mises à jour
- [ ] `sitemap.xml` : anciennes URLs supprimées, nouvelles ajoutées (priorité correcte)
- [ ] `llms.txt` : anciennes entrées supprimées, nouvelles ajoutées (section correcte)
- [ ] `blog-preview.tsx` : entrées modifiées/supprimées/ajoutées selon les articles impactés
- [ ] `footer.tsx` : liens mis à jour si pages sectorielles/locales/légales impactées
- [ ] Aucun `<Link href="...">` dans `src/` ne pointe vers une URL supprimée (grep vérifié)
- [ ] **Ping IndexNow** déclenché sur chaque URL touchée (nouvelle + ancienne redirigée) — ou TODO si clé pas encore en place (cf. §4.4 et §G.8)

#### Contenu
- [ ] Metadata (title, description) à jour sur toutes les pages modifiées
- [ ] JSON-LD cohérent avec le nouveau contenu sur toutes les pages
- [ ] Maillage interne : ≥ 3 liens sortants par page modifiée
- [ ] CTA présent sur chaque page modifiée
- [ ] E-E-A-T préservé (exemples terrain, avis expert, données sourcées, limites)

#### Stratégie éditoriale (optionnel)
- [ ] Si la modification ouvre/ferme un cluster ou pivote la roadmap : noter dans `docs/prevision_contenu.md` et/ou mettre à jour `STRATEGIE-EDITORIALE.md` §3 (clusters). Les sections §4/§5/§11 du doc sont marquées comme désynchronisées — pas la peine de les tenir à jour à la main.

#### Build
- [ ] `npm run build` passe sans erreur
- [ ] Toutes les pages attendues apparaissent dans la sortie du build

### 6.3 Rapport final

Afficher un résumé structuré :

```
## Résumé de la modification

### Transformation effectuée
- Type : [Split / Merge / Move / Update / Type change / Enrich / Prune]
- Ressource(s) source : [URLs]
- Ressource(s) résultante(s) : [URLs]

### Fichiers modifiés
- Créés : [liste]
- Modifiés : [liste]
- Supprimés : [liste]

### Redirections ajoutées
- /ancienne-url → /nouvelle-url (301)

### Références mises à jour
- sitemap.xml : [ajouts/suppressions]
- llms.txt : [ajouts/suppressions]
- blog-preview.tsx : [ajouts/suppressions/modifications]
- footer.tsx : [modifications si applicable]
- Liens internes : [N pages mises à jour]

### Impact SEO estimé
- URLs préservées : [liste]
- URLs redirigées : [liste avec destination]
- Equity SEO : [conservée via 301 / risque si...]
```
