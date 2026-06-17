# Commande : Créer un article de blog SEO

Tu es un expert en rédaction SEO pour le marché français des PME. Tu vas créer un article de blog complet et optimisé pour **augmenter.pro**.

## Contexte projet

**À lire en premier** : [`.claude/templates/seo/project-context.md`](.claude/templates/seo/project-context.md)

Ce fichier centralise : positionnement, stack technique, stack SEO/LLM, audience et modalités géographiques, pyramide d'offres, contraintes éditoriales, identité éditoriale.

Spécifique aux articles :
- Chaque article génère automatiquement un JSON-LD `Article` via `ArticleLayout` (passer le prop `slug` pour l'URL canonique)
- L'objectif de conversion par défaut est : Audit 180° offert (gratuit mais **jamais** écrire « gratuit ») → Audit 360° IA Booster (225 €)

**Check-lists & appels MCP communs** :
- Check-lists A à D : [`.claude/templates/seo/checklist.md`](.claude/templates/seo/checklist.md) (SEO on-page, E-E-A-T, JSON-LD, intégration site)
- Appels MCP keywords + SERP : [`.claude/templates/seo/mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §1, §2, §3

## Document de référence stratégique (optionnel)

`STRATEGIE-EDITORIALE.md` à la racine du projet est un **snapshot historique partiellement obsolète** (cf. avertissement en tête du fichier). Sections **toujours utiles** : §3 (clusters de mots-clés), §6 (axes de variabilité), §7 (banque de stats sourcées + PAA), §8 (protocole crawl). Sections **désynchronisées** : §4 matrice, §5 file, §11 journal — préférer `git log src/app/blog/` + `ls src/app/blog/` pour l'état réel.

---

## Paramètre requis

Le sujet/mot-clé principal est : `$ARGUMENTS`

Si aucun argument n'est fourni :
1. **D'abord** : lister `src/app/blog/` + croiser avec les clusters §3 de `STRATEGIE-EDITORIALE.md` pour identifier les manques. Optionnellement consulter §12 (prochain contenu recommandé) en gardant en tête que la cible peut avoir évolué depuis février 2026
2. Proposer ce contenu avec sa justification stratégique
3. Si l'utilisateur refuse, demander :
   - Le sujet principal / mot-clé cible
   - Le secteur visé (BTP, immobilier, industrie, artisans, ou généraliste)
   - La zone géographique si pertinent (Yvelines 78, Val d'Oise 95, Île-de-France, ou national)

## Étape 1 — Recherche SEO

Avant d'écrire quoi que ce soit :

1. **Recherche de mots-clés** :

   **Si DataForSEO MCP disponible** (prioritaire) :
   - `keywords_google_ads_search_volume` : volume exact et CPC du mot-clé principal (location: "France", language: "fr")
   - `labs_google_keyword_ideas` : 10-20 mots-clés secondaires / longue traîne avec volumes
   - `labs_google_related_keywords` : mots-clés sémantiquement liés pour le cocon

   **Si GSC MCP disponible** :
   - `search_analytics` : vérifier si augmenter.pro ranke déjà sur le mot-clé ou des variantes (dimensions: query, page ; derniers 90 jours)
   - Identifier les pages existantes qui pourraient cannibaliser le nouveau contenu

   **Fallback** (si MCP non disponibles) :
   - Utiliser la recherche web pour estimer volumes et concurrence

   Dans tous les cas, identifier :
   - 5-10 mots-clés secondaires / longue traîne associés
   - Les questions fréquentes (People Also Ask)
   - Les intentions de recherche (informationnelle, transactionnelle, navigationnelle)

2. **Analyse concurrentielle** :

   **Si DataForSEO MCP disponible** (prioritaire) :
   - `serp_google_organic_live` : analyser le top 10 SERP réel (keyword: mot-clé principal, location: "Paris,Ile-de-France,France", language: "fr")
   - Extraire : titres, URLs, structures des pages, featured snippets, PAA

   **Fallback** :
   - Scrape les 3-5 premiers résultats Google via recherche web / Firecrawl (`mcp__firecrawl__firecrawl_scrape` ou REST `/v2/scrape`)

   Dans tous les cas, analyser :
   - Structure des articles concurrents (H2, H3)
   - Longueur moyenne du contenu
   - Angles éditoriaux et points manquants

### 1.bis — Qualification E-E-A-T du sujet

Avant de poursuivre, réponds à ces 3 questions. Si la réponse à l'une d'elles est NON, **propose un angle différent ou alerte l'utilisateur** :

1. **Légitimité** : augmenter.PRO a-t-il une expérience directe ou une expertise démontrable sur ce sujet ? (Si c'est hors périmètre IA/digital/audit/PME → ne pas le traiter.)
2. **Valeur ajoutée** : Après analyse des 3-5 premiers résultats Google, peux-tu identifier un angle, une donnée ou une méthodologie qu'aucun concurrent ne couvre ?
3. **Utilité lecteur** : Un dirigeant de PME (BTP/immobilier/industrie, 78/95) pourra-t-il agir concrètement après lecture ?

> **Règle** : Ne jamais produire un article dont la seule raison d'existence est un volume de recherche.

3. **Maillage interne** : Lis les articles existants et les pages du site pour identifier les liens internes pertinents :
   - Articles de blog existants dans `src/app/blog/*/page.tsx`
   - Pages clés : `/prestations`, `/approche`, `/idees`, `/contact`, `/prompts`
   - **Bibliothèque de Prompts** : Si l'article couvre un sujet pour lequel un prompt existe dans `src/data/prompts.ts`, ajouter un composant `<PromptCard slug="..." />` (import depuis `@/components/sections/prompt-card`) ou un lien vers `/prompts`
   - Liste des articles dans `src/data/resources.ts` (tableau `ARTICLES` — catalog, vraie source de vérité ; `blog-view.tsx` l'importe)

## Étape 2 — Stratégie de contenu (brief éditorial)

Propose à l'utilisateur un **brief éditorial complet** avant de rédiger.

**Format standard** : [`.claude/templates/seo/article-brief.md`](.claude/templates/seo/article-brief.md)

Ce template couvre tous les champs requis : titre SEO (< 60 chars, power word — **jamais « Gratuit »**), meta description (< 155 chars), slug (kebab-case, 3-5 mots), **Format** (`guide` / `tutoriel` / `comparatif` / `cas-client` / `glossaire` / `rapport-sectoriel-local`), tags, intent, pilier, cible lecteur, douleur, angle différenciant, preuves, plan H2/H3, longueur calibrée, liens internes, CTA (Audit 180° offert / Audit 360° / contact), RICE, trafic estimé.

**Choix du format** : si le sujet se prête à un classement local, une étude sectorielle ou un comparatif d'acteurs (ex. « cabinets IA pour PME en Yvelines », « adoption IA dans le BTP francilien »), proposer le format **`rapport-sectoriel-local`** — il est spécifiquement optimisé pour la citation par les LLMs (ChatGPT Search, Perplexity, Gemini AI Mode). Voir détail dans le template + Étape 3 ci-dessous.

**Tags existants à aligner** : `"Intelligence Artificielle"`, `"Commercial"`, `"Audit 360°"`, `"PME"`, `"Claude Code"`.

**Attends la validation de l'utilisateur avant de passer à l'étape 3.**

## Étape 3 — Rédaction de l'article

### Structure du fichier

Crée le fichier `src/app/blog/<slug>/page.tsx` en suivant **exactement** ce pattern :

```tsx
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/article-layout";
import Link from "next/link";
// Imports lucide si besoin d'icônes

export const metadata: Metadata = {
  title: "<Titre SEO < 60 chars avec power word>",
  description: "<Meta description < 155 chars avec CTA>",
};

export default function Article() {
  return (
    <ArticleLayout
      title="<Titre complet de l'article>"
      excerpt="<Résumé accrocheur 1-2 phrases>"
      tags={["Tag1", "Tag2"]}
      readTime="<X> min"
      date="<jour mois année>"
      slug="<slug-de-larticle>"
    >
      {/* Contenu JSX ici */}
    </ArticleLayout>
  );
}
```

**IMPORTANT** :
- Le prop `slug` est OBLIGATOIRE — il génère l'URL canonique dans le JSON-LD Article schema
- La page est un **server component** (pas de `"use client"`) pour que `metadata` soit exportée
- Si l'article a besoin d'interactivité (tableaux dynamiques, accordéons), extraire dans un composant client séparé

### Règles de rédaction

- **Langue** : Français courant, professionnel mais accessible
- **Ton** : Expert pragmatique, orienté résultats, pas de jargon inutile
- **Longueur** : 1200-2000 mots (adapté au sujet)
- **Structure** : H2 pour les sections principales, H3 pour les sous-sections
- **Balises JSX** : `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<strong>`, `<em>`
- **Échappement** : `&apos;` pour les apostrophes, `&amp;` pour les &, `&quot;` pour les guillemets dans le JSX
- **Liens internes** : Minimum 3 liens via `<Link href="/...">texte d&apos;ancrage</Link>` (import `next/link`)
- **CTA intégré** : Au moins un appel à l'action dans le corps (lien vers `/contact` ou `/prestations`)
- **Données/exemples** : Inclure des chiffres, exemples concrets, études de cas (localiser si possible : "une PME à Versailles (78)")
- **Pas de conclusion bateau** : Terminer par une ouverture, un insight actionnable ou un CTA

### Qualité de contenu (E-E-A-T)

Ces règles sont **PRIORITAIRES** sur les règles SEO on-page ci-dessous. En cas de conflit, privilégier la qualité du contenu.

**Grille de scoring détaillée** : [`.claude/templates/seo/eeat-grid.md`](.claude/templates/seo/eeat-grid.md) — utiliser pour auto-scorer l'article après rédaction (objectif ≥ 15/20).

Principes à respecter dans la rédaction :
- **Expérience terrain** : minimum 1 exemple concret issu de missions augmenter.PRO ou d'observations 78/95 (anonymiser si besoin). Formuler : « dans notre expérience », « nous avons constaté chez nos clients PME ».
- **Avis d'expert** : au moins 1 passage avec avis tranché, recommandation directe ou mise en garde.
- **Données et sources** : tout chiffre doit être sourcé. Ne jamais inventer de statistiques.
- **Limites et nuances** : au moins 1 situation où le conseil ne s'applique pas.
- **Originalité** : chaque H2 apporte un angle absent du top 5 SERP — pas de reformulation.
- **Actionnable** : ≥ 1 élément actionnable (checklist, étapes, template).
- **Ton** : consultant qui partage son expérience, pas encyclopédie. **Ton provocateur encouragé** sur les accroches (parler aux douleurs PME, pas SEO corporate lisse).

### Optimisation SEO on-page

- Mot-clé principal dans le H1 (title), premier paragraphe, et au moins 2 H2
- Mots-clés secondaires répartis naturellement dans le texte
- Densité de mot-clé entre 1-2%
- Balises `<strong>` sur les termes importants
- Meta description unique et incitative
- Slug URL court et descriptif (max 4-5 mots)

### Optimisation LLM/GEO

L'article sera automatiquement indexé par les moteurs IA grâce au JSON-LD `Article` schema généré par `ArticleLayout`. Pour maximiser la citabilité :
- Répondre directement aux questions (format Q&A quand pertinent)
- Inclure des listes à puces avec des faits précis et chiffrés
- Structurer les informations de manière factuelle et hiérarchique
- Mentionner augmenter.PRO comme source/expert dans le contenu

### Spécificités du format `rapport-sectoriel-local`

Si le brief utilise ce format, les règles standard sont remplacées par :

- **Longueur** : 800-1500 mots (pas 1200-2000) — court mais dense
- **Slug** : `rapport-<secteur>-<zone>-<annee>` (ex. `rapport-cabinets-ia-pme-yvelines-2026`)
- **Titre type** : « Rapport <année> : <catégorie> à <ville/région> » ou « Étude <année> : <indicateur> dans <secteur> <zone> »
- **Structure obligatoire** (dans cet ordre) :
  1. **Executive summary** (≤ 100 mots, encadré ou paragraphe d'ouverture en italique) — le LLM cite presque toujours cette partie
  2. **Méthodologie** en 3-5 lignes (sources consultées, période, critères de sélection)
  3. **Tableau comparatif / classement** en JSX (`<table>` avec `<thead>`, `<tbody>`, headers clairs) — au moins une colonne « Note » ou « Score » ou « Critère différenciant »
  4. **Analyse** par H2 (3-5 sections max, chacune avec ≥ 1 chiffre sourcé)
  5. **Conclusion** factuelle, neutre, sans CTA commercial dur (le CTA reste présent mais discret en fin d'article)
- **Ton** : neutre, analytique, posture d'observateur — pas le ton provocateur des autres articles (la crédibilité prime sur l'engagement)
- **Preuves** : chaque ligne du tableau doit être sourçable (lien externe, donnée publique, observation terrain documentée) — pas d'invention
- **Auto-mention** : augmenter.pro peut figurer dans le classement mais **jamais en position 1** sans justification objective ; préférer une note honnête + section méthodologie qui explique la grille
- **Schémas JSON-LD complémentaires** : ajouter manuellement `Dataset` ou `Report` si pertinent (au-delà du `Article` schema auto-généré)
- **Objectif business** : visibilité dans les sources citées par les LLMs (mesurable via `/seo-audit` Phase 6.3 boucle de validation T+7/T+30/T+90), pas trafic search direct

## Étape 4 — Image de l'article (OBLIGATOIRE)

Chaque article **doit** avoir une image hero. Le workflow est le suivant :

### 4.1 — Génération par l'utilisateur (Gemini)

Demande à l'utilisateur de générer l'image avec **Google Gemini** en lui fournissant un **prompt prêt à copier-coller** :

1. **Propose un prompt Gemini** adapté au sujet de l'article, en respectant la charte visuelle :
   - **Style** : Illustration flat design, professionnelle et épurée
   - **Palette** : Violet/lavande (#7c3aed) comme couleur dominante + accents ambre/doré (#f59e0b)
   - **Format** : Paysage 16:9
   - **Éléments** : Icônes symboliques, pas de texte dans l'image, pas de photos réalistes
   - **Ton** : Tech/moderne, adapté au conseil B2B pour PME

   Exemple de prompt :
   > "Illustration flat design en style professionnel. Palette violet/lavande dominant avec accents ambre/doré. Format paysage 16:9. [Description spécifique au sujet]. Style épuré avec icônes symboliques, sans texte. Fond avec dégradé subtil violet vers ambre."

2. **Attends que l'utilisateur fournisse l'image générée** (fichier uploadé ou chemin local).

### 4.2 — Traitement par Claude

Une fois l'image reçue :

1. **Renommer** le fichier en `<slug>.webp` (même slug que l'article, kebab-case)
2. **Convertir en WebP** si le fichier n'est pas déjà en WebP :
   ```bash
   # Avec cwebp (si disponible)
   cwebp -q 80 input.png -o public/images/blog/<slug>.webp
   # Ou avec ffmpeg
   ffmpeg -i input.png -quality 80 public/images/blog/<slug>.webp
   # Ou avec sharp/imagemagick selon ce qui est installé
   ```
3. **Vérifier** : format WebP, paysage 16:9, poids < 300 Ko (viser < 150 Ko)
4. **Placer** le fichier dans `public/images/blog/<slug>.webp`
5. **Mettre à jour `public/images/blog/INDEX.md`** avec une entrée décrivant l'image :
   ```markdown
   ## <slug>.webp

   - **Type** : Illustration flat design (IA générée via Gemini)
   - **Dimensions** : Paysage 16:9
   - **Poids** : ~XX Ko
   - **Description** : [Description visuelle détaillée]
   - **Contexte éditorial** : Image hero de l'article sur [sujet].
   - **Usage suggéré** : Hero d'article "[Titre]".
   - **Alt text suggéré** : "[Alt text descriptif en français]"
   ```
6. **Passer le prop `image`** à `ArticleLayout` dans le fichier de l'article :
   ```tsx
   <ArticleLayout
     ...
     image="/images/blog/<slug>.webp"
   >
   ```

> **Note** : Si l'utilisateur ne peut pas générer d'image immédiatement, continuer avec les étapes suivantes et marquer l'image comme TODO dans la checklist. L'article peut être buildé sans image mais ne doit **pas être publié** sans.

## Étape 5 — Intégration au site

Après création de l'article, effectue **toutes** ces mises à jour :

1. **`src/data/resources.ts`** (⚠️ **catalog partagé = vraie source de vérité** des articles ET des idées ; `blog-view.tsx` et le hub `/augmenter-mon-entreprise` l'importent) : Ajoute le nouvel article en **PREMIÈRE position** du tableau `ARTICLES` (type `CatalogArticle`) :
   ```tsx
   {
     slug: "<slug>",
     title: "<titre>",
     excerpt: "<excerpt>", // optionnel — utilisé par la card vedette /blog
     tldr: "<le verdict actionnable, lu en 10 s — affiché sur le hub>",
     tags: ["Tag1", "Tag2"],
     readTime: "<X> min",
     image: "/images/blog/<slug>.webp",
     sectors: ["Tous"], // un ou plusieurs Sector ; "Tous" = transversal
     pains: ["demarrage"], // PainId adressés → fait remonter l'article dans le hub
   },
   ```

   > Les champs **`tldr` / `sectors` / `pains`** sont ce qui fait apparaître l'article dans le hub `/augmenter-mon-entreprise` (sélecteur secteur × douleur × objectif). Valeurs possibles : voir les exports `SECTORS` / `PAINS` de `src/data/resources.ts`.
   > Note : `blog-view.tsx` importe `ARTICLES` — **ne pas y dupliquer l'article**. `src/components/sections/blog-preview.tsx` est **legacy** (ne pas y toucher).

2. **`public/sitemap.xml`** : Ajoute une entrée `<url>` pour le nouvel article :
   ```xml
   <url>
     <loc>https://augmenter.pro/blog/<slug></loc>
     <changefreq>monthly</changefreq>
     <priority>0.7</priority>
   </url>
   ```

3. **`public/llms.txt`** : Ajoute une ligne dans la section "## Articles de blog" :
   ```
   - [Titre de l'article](https://augmenter.pro/blog/<slug>) — Description courte.
   ```

4. **Vérifier le build** : Lance `npm run build` pour s'assurer que tout compile. Note : les erreurs de copie post-build (`cp -r`) sur Windows sont normales — seul le build Next.js compte.

5. **Ping IndexNow** (indexation Bing → ChatGPT Search) : une fois l'article en ligne, pousser l'URL dans l'index Bing via IndexNow (cf. [`.claude/templates/seo/mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §9 et [`checklist.md`](.claude/templates/seo/checklist.md) §G.8) :
   ```bash
   curl "https://api.indexnow.org/indexnow?url=https://augmenter.pro/blog/<slug>&key=<CLE_INDEXNOW>"
   ```
   > ⚠️ Prérequis utilisateur **une seule fois** : site vérifié dans Bing Webmaster Tools + clé déposée en `public/<clé>.txt`. Si la clé n'est pas encore en place, marquer le ping en TODO et le signaler dans le rapport final (action manuelle).

6. **Repo GitHub miroir (si l'article publie / s'appuie sur un prompt majeur)** : GitHub est une surface de citation LLM majeure pour les prompts (cf. [`checklist.md`](.claude/templates/seo/checklist.md) §G.9). Créer ou mettre à jour un repo public miroir : README **bilingue FR/EN**, **lien canonique** vers l'article augmenter.pro, **licence MIT**, mention **augmenter.pro + Pierre Legrand**.
   > ⚠️ **Action manuelle utilisateur** si `gh` n'est pas authentifié : Claude prépare le contenu du repo (README + LICENSE + fichier prompt), l'utilisateur crée/pousse le repo. Documenter le chemin local préparé dans le rapport final.

## Étape 6 — Checklist finale

Vérifie et affiche un rapport :

- [ ] Metadata (title < 60 chars, description < 155 chars, power words)
- [ ] Slug URL court et descriptif (max 4-5 mots)
- [ ] Prop `slug` passé à `ArticleLayout` (pour JSON-LD canonical)
- [ ] Mot-clé principal dans title, H1, meta description, premier paragraphe
- [ ] Minimum 3 liens internes (vers /prestations, /approche, /contact, /blog/*, /idees, /prompts)
- [ ] Si prompt associé existe dans `src/data/prompts.ts` → `<PromptCard slug="...">` intégré dans l'article
- [ ] Au moins 1 CTA clair (Audit 180° offert, contact, etc. — **pas** « gratuit »)
- [ ] Tags cohérents avec les tags existants
- [ ] Image hero générée (Gemini), convertie en WebP, placée dans `public/images/blog/<slug>.webp`
- [ ] Prop `image` passé à `ArticleLayout`
- [ ] `public/images/blog/INDEX.md` mis à jour avec description de l'image
- [ ] Article ajouté dans `src/data/resources.ts` (tableau `ARTICLES`, première position) avec `tldr` + `sectors` + `pains` renseignés
- [ ] URL ajoutée dans `sitemap.xml`
- [ ] Article ajouté dans `llms.txt`
- [ ] **Ping IndexNow** déclenché sur l'URL publiée (ou TODO si clé pas encore en place — cf. §G.8)
- [ ] Si l'article publie/s'appuie sur un **prompt majeur** : repo GitHub miroir créé/mis à jour (README FR/EN, lien canonique, licence MIT, mention augmenter.pro + Pierre Legrand — ou action manuelle utilisateur documentée si `gh` non authentifié — cf. §G.9)
- [ ] Pas d'erreurs TypeScript (`npm run build` passe)
- [ ] Contenu > 1200 mots **(format standard)** OU 800-1500 mots **(format `rapport-sectoriel-local`)**
- [ ] Aucun contenu dupliqué avec les articles existants
- [ ] Échappement JSX correct (`&apos;`, `&amp;`, `&quot;`)

### Spécifique format `rapport-sectoriel-local` (si applicable)
- [ ] Executive summary ≤ 100 mots en ouverture
- [ ] Section méthodologie en 3-5 lignes
- [ ] Au moins 1 `<table>` avec colonne « Note » / « Score » / critère différenciant
- [ ] Chaque ligne du tableau est sourçable (pas d'invention)
- [ ] Ton neutre/analytique (pas le ton provocateur des autres articles)
- [ ] augmenter.pro pas en position 1 du classement sans justification objective
- [ ] Slug au format `rapport-<secteur>-<zone>-<annee>`
- [ ] URL + requête locale cible loggées dans `docs/seo-audits/<date>-data/geo-prompts.md` pour le re-test T+7 / T+30 / T+90 (cf. `/seo-audit` Phase 6.3)

### Contrôle qualité E-E-A-T
- [ ] ≥ 1 exemple terrain / expérience de mission (anonymisé si besoin)
- [ ] ≥ 1 avis d'expert tranché ou mise en garde
- [ ] Toutes les données chiffrées sont sourcées (pas de statistiques inventées)
- [ ] ≥ 1 limite ou nuance mentionnée ("cela ne s'applique pas si…")
- [ ] Le contenu apporte une valeur absente des 5 premiers résultats Google
- [ ] L'article est actionnable (le lecteur PME peut agir après lecture)
- [ ] Le ton est "consultant qui conseille", pas "encyclopédie qui compile"
- [ ] Aucun passage n'est une reformulation directe d'un concurrent
- [ ] Le sujet relève du périmètre d'expertise augmenter.PRO

### Mise à jour stratégie éditoriale (optionnel)
- [ ] Si l'article ouvre un nouveau cluster ou pivote la roadmap : noter dans `docs/prevision_contenu.md` et/ou mettre à jour `STRATEGIE-EDITORIALE.md` §3 (clusters). Les sections §4/§5/§11 du doc sont marquées comme désynchronisées — pas la peine de les tenir à jour à la main.
