# Commande : Créer une ressource SEO

Tu es un expert en stratégie de contenu SEO pour le marché français des PME. Tu vas créer une **ressource optimisée** pour **augmenter.pro** — article, page sectorielle, landing page, étude de cas, ou tout autre format adapté au besoin.

## Contexte projet

**À lire en premier** : [`.claude/templates/seo/project-context.md`](.claude/templates/seo/project-context.md)

Ce fichier centralise : positionnement, stack technique, stack SEO/LLM, audience et modalités géographiques, pyramide d'offres, contraintes éditoriales, identité éditoriale.

Spécifique aux ressources multi-types (cette commande) :
- **Contact** : formulaire client-side `mailto:` (pas d'API serveur)
- L'étape 1.2 ci-dessous recommande le **type de ressource** le plus adapté (article, page sectorielle, locale, comparatif, étude de cas, glossaire, landing, prompt, page légale)

**Check-lists & appels MCP communs** :
- Check-lists A à D : [`.claude/templates/seo/checklist.md`](.claude/templates/seo/checklist.md) (SEO on-page, E-E-A-T, JSON-LD, intégration site)
- Appels MCP keywords + SERP : [`.claude/templates/seo/mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §1, §2, §3

## Document de référence stratégique (optionnel)

`STRATEGIE-EDITORIALE.md` à la racine du projet est un **snapshot historique partiellement obsolète** (cf. avertissement en tête du fichier). Sections **toujours utiles** : §3 (clusters de mots-clés et pages piliers), §6 (axes de variabilité géo/secteur/format/intention/saisonnier), §7 (banque de stats sourcées + PAA), §8 (protocole de crawl). Sections **désynchronisées** : §4 matrice, §5 file, §11 journal — préférer `git log` + `ls src/app/` + `ls src/app/blog/` pour l'état réel. §9 (optimisations techniques) à re-vérifier après refonte bento.

**Workflow** :
1. Lister les ressources existantes (`ls src/app/`, `ls src/app/blog/`) pour cartographier l'état réel
2. Si `$ARGUMENTS` est vide → identifier les manques en croisant avec les clusters §3, optionnellement consulter §12 (cible peut avoir évolué depuis février 2026)
3. Si `$ARGUMENTS` est fourni → vérifier l'absence de doublon dans les pages existantes
4. Exécuter le protocole de recherche §8.1 + §8.2 avant de rédiger

---

## Paramètre requis

Le besoin / sujet est : `$ARGUMENTS`

Si aucun argument n'est fourni :
1. **D'abord** : lister `src/app/` + `src/app/blog/`, croiser avec les clusters §3 de `STRATEGIE-EDITORIALE.md` pour identifier les manques. Optionnellement consulter §12 (prochain contenu recommandé) en gardant en tête que la cible peut avoir évolué depuis février 2026
2. Proposer ce contenu à l'utilisateur avec la justification stratégique (cluster, priorité, timing)
3. Si l'utilisateur refuse ou veut autre chose, demander :
   - Le besoin ou objectif business (ex: "cibler les artisans BTP", "se positionner sur Versailles", "comparer les CRM")
   - Le mot-clé principal visé
   - La zone géographique si pertinent

---

## Étape 1 — Analyse du besoin & choix du type de ressource

### 1.1 Recherche SEO

Avant toute chose :

1. **Mots-clés** :
   - **DataForSEO** (si disponible) : `keywords_google_ads_search_volume` + `labs_google_keyword_ideas` (location: "France", language: "fr")
   - **GSC** (si disponible) : `search_analytics` pour vérifier le positionnement existant sur le sujet
   - **Fallback** : recherche web pour volumes et concurrence
   - Identifier : volume, concurrence, longue traîne, People Also Ask, intention de recherche

2. **Intention de recherche** : informationnelle, transactionnelle, navigationnelle, commerciale

3. **Concurrence** :
   - **DataForSEO** (si disponible) : `serp_google_organic_live` pour le top 10 SERP réel
   - **Fallback** : scrape les 3-5 premiers résultats Google via Firecrawl (`mcp-calls.md` §8)
   - Analyser : structure, angles, points manquants

4. **Maillage** : lire les pages existantes pour les liens internes pertinents (dont `/prompts` si un prompt associé existe dans `src/data/prompts.ts` — utiliser `<PromptCard slug="...">` pour l'intégration visuelle)

### 1.2 Recommandation du type de ressource

En fonction de l'analyse, recommande le **type de ressource le plus adapté** :

| Type | Quand l'utiliser | Route | JSON-LD |
|------|-----------------|-------|---------|
| **Article de blog** | Contenu éditorial, guide, tutoriel, actualité | `/blog/<slug>` | Article (auto via ArticleLayout) |
| **Rapport sectoriel local** | Classement / étude / synthèse sur un secteur ou une zone, **optimisé pour citation par les LLMs** (ChatGPT Search, Perplexity, Gemini) | `/blog/rapport-<secteur>-<zone>-<annee>` | Article (auto) + `Report` manuel |
| **Page sectorielle** | Cibler un secteur d'activité spécifique | `/secteurs/<slug>` | Service + areaServed |
| **Page locale SEO** | Cibler une ville ou zone géographique | `/zones/<slug>` | LocalBusiness + areaServed |
| **Comparatif** | Comparer des outils, solutions, approches | `/comparatifs/<slug>` | Article + ItemList |
| **Étude de cas** | Montrer un résultat client concret | `/etudes-de-cas/<slug>` | Article + Review |
| **Glossaire** | Définir un terme pour capter du trafic informationnel | `/glossaire/<slug>` | DefinedTerm |
| **Landing page** | Page d'atterrissage campagne ou offre spécifique | `/<slug>` | Service ou Product |
| **Prompt IA** | Prompt prêt à l'emploi pour la bibliothèque | Ajout dans `src/data/prompts.ts` + `public/downloads/` | CreativeWork (via CollectionPage /prompts) |
| **Page légale** | Obligation réglementaire (CGV, confidentialité) | `/<slug>` | Aucun |

> **Quand préférer Rapport sectoriel local à Article de blog classique** : sujet qui se prête à un classement, une étude de maturité, un comparatif d'acteurs ou une synthèse chiffrée sur un secteur/zone donnés. Objectif principal = visibilité dans les **sources citées par les LLMs**, pas trafic search direct. Voir [`/seo-audit`](.claude/commands/seo-audit.md) Phase 6.3 (boucle de validation T+7/T+30/T+90) et [`/create-article`](.claude/commands/create-article.md) Étape 3 (règles structurelles : exec summary ≤ 100 mots, méthodologie, tableau obligatoire, ton neutre).

**Justifie ton choix** en expliquant pourquoi ce format est le meilleur pour :
- L'intention de recherche détectée
- Le volume et la difficulté du mot-clé
- La stratégie de conversion (quel CTA naturel)
- Le maillage interne possible

### 1.3 — Qualification E-E-A-T

Avant de proposer le brief, réponds à ces 3 questions. Si la réponse à l'une d'elles est NON, **propose un angle différent ou alerte l'utilisateur** :

1. **Légitimité** : augmenter.PRO a-t-il une expérience directe ou une expertise démontrable sur ce sujet ?
2. **Valeur ajoutée** : Peux-tu identifier un angle, une donnée ou une méthodologie qu'aucun concurrent ne couvre ?
3. **Utilité lecteur** : Le visiteur cible pourra-t-il agir concrètement après consultation de cette ressource ?

> Règle : Pas de ressource dont la seule justification est un volume de recherche.

---

## Étape 2 — Brief éditorial

Propose un brief complet **avant de coder**, au format adapté au type de ressource.

| Type de ressource | Template de brief |
|---|---|
| Article / rapport sectoriel local / comparatif / étude de cas / glossaire | [`.claude/templates/seo/article-brief.md`](.claude/templates/seo/article-brief.md) (renseigner le champ **Format** en conséquence) |
| Page sectorielle / page locale / landing / hub | [`.claude/templates/seo/page-spec.md`](.claude/templates/seo/page-spec.md) |

**Champs supplémentaires spécifiques à create-resource** (à ajouter au brief choisi) :
- **Type de ressource** choisi + **justification** (pourquoi ce format vs. les autres)
- **JSON-LD prévu** (schema + propriétés clés — voir section « JSON-LD par type de ressource » plus bas)
- **CTA principal** : Audit 180° offert / Audit 360° / contact / ou autre — **jamais** « gratuit »

**Tags existants à aligner** (si article) : `"Intelligence Artificielle"`, `"Commercial"`, `"Audit 360°"`, `"PME"`, `"Claude Code"`.

**Attends la validation de l'utilisateur avant de passer à l'étape 3.**

---

## Étape 3 — Création de la ressource

### Template selon le type

---

#### A) Article de blog / Comparatif / Étude de cas / Glossaire

Ces types utilisent `ArticleLayout` qui fournit automatiquement le JSON-LD Article.

**Fichier** : `src/app/<route>/<slug>/page.tsx`

```tsx
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/article-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "<Titre SEO < 60 chars>",
  description: "<Meta description < 155 chars>",
};

export default function ResourcePage() {
  return (
    <ArticleLayout
      title="<Titre complet>"
      excerpt="<Résumé 1-2 phrases>"
      tags={["Tag1", "Tag2"]}
      readTime="<X> min"
      date="<jour mois année>"
      slug="<slug-complet>"
    >
      {/* Contenu JSX */}
    </ArticleLayout>
  );
}
```

**IMPORTANT** :
- Le prop `slug` est **OBLIGATOIRE** — il génère l'URL canonique dans le JSON-LD
- Pour les **comparatifs**, le slug doit refléter la comparaison (ex: `comparatifs/crm-pme-2026`)
- Pour les **études de cas**, inclure un encadré résultats chiffrés
- Pour le **glossaire**, commencer par une définition claire et directe (optimisée featured snippet)
- La page est un **server component** (pas de `"use client"`) pour que `metadata` soit exportée

**Enrichissement JSON-LD supplémentaire** (optionnel, en plus de l'Article auto) :
- **Comparatif** : ajouter un JSON-LD `ItemList` inline pour la liste des éléments comparés
- **Étude de cas** : ajouter un JSON-LD `Review` inline pour le témoignage client
- **Glossaire** : ajouter un JSON-LD `DefinedTerm` inline

Pour ajouter du JSON-LD supplémentaire dans un ArticleLayout, l'injecter dans le contenu children :
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(extraJsonLd) }}
/>
```

---

#### B) Page sectorielle / Page locale SEO / Landing page

Ces types nécessitent une **page custom avec sections** et du JSON-LD inline.

**Fichier** : `src/app/<route>/page.tsx` (ou `src/app/<route>/<slug>/page.tsx`)

**Modèle de référence** : s'inspirer de `src/app/prestations/page.tsx` pour la structure.

```tsx
import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Importer les icônes Lucide pertinentes

export const metadata: Metadata = {
  title: "<Titre SEO < 60 chars>",
  description: "<Meta description < 155 chars>",
};

// JSON-LD adapté au type
const jsonLd = {
  "@context": "https://schema.org",
  // ... schema selon le type (voir section JSON-LD ci-dessous)
};

export default function ResourcePage() {
  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Contexte</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Titre avec <span className="gradient-text">mot-clé</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Paragraphe d&apos;accroche avec le mot-clé principal.
            </p>
          </div>
        </div>
      </section>

      {/* Sections de contenu */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Grille de Cards, listes, contenu structuré */}
        </div>
      </section>

      {/* FAQ section si pertinent (avec FAQPage JSON-LD) */}

      {/* CTA */}
      <CTA />
    </div>
  );
}
```

**Conventions de style** :
- `pt-16` sur le wrapper principal (offset du header fixe)
- `py-24` sur chaque section
- `mx-auto max-w-6xl px-4 sm:px-6` pour les containers
- Alterner `bg-muted/30` sur les sections pour le rythme visuel
- Utiliser `gradient-text` pour mettre en valeur le mot-clé dans le H1
- Cards shadcn/ui pour structurer les contenus

---

#### C) Page légale

**Fichier** : `src/app/<slug>/page.tsx`

**Modèle de référence** : `src/app/mentions-legales/page.tsx`

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "<Titre>",
  description: "<Description>",
  robots: { index: false, follow: true }, // Les pages légales n'ont pas besoin d'être indexées
};

export default function LegalPage() {
  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold">Titre</h1>
          {/* Contenu structuré avec <h2>, <p>, <ul> */}
        </div>
      </section>
    </div>
  );
}
```

---

### JSON-LD par type de ressource

#### Page sectorielle
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Transformation digitale pour le BTP",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "@id": "https://augmenter.pro/#organization"
  },
  "areaServed": {
    "@type": "State",
    "name": "Île-de-France"
  },
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "PME du BTP"
  }
}
```

#### Page locale SEO
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "augmenter.PRO — Consultant IA à Versailles",
  "description": "...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Versailles",
    "postalCode": "78000",
    "addressRegion": "Yvelines"
  },
  "areaServed": {
    "@type": "City",
    "name": "Versailles"
  },
  "url": "https://augmenter.pro/zones/versailles-78"
}
```

#### Comparatif (en plus de l'Article auto)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Comparatif des CRM pour PME",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Solution A" },
    { "@type": "ListItem", "position": 2, "name": "Solution B" }
  ]
}
```

#### Glossaire (en plus de l'Article auto)
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Intelligence Artificielle Générative",
  "description": "Définition concise...",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Glossaire augmenter.PRO"
  }
}
```

#### Landing page
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Audit IA 180° offert pour PME",
  "description": "...",
  "provider": { "@type": "Organization", "@id": "https://augmenter.pro/#organization" },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Audit 180° offert de 60 minutes, sans engagement"
  }
}
```

---

### Règles de rédaction (tous types)

- **Langue** : Français courant, professionnel mais accessible
- **Ton** : Expert pragmatique, orienté résultats
- **Longueur** : 800-2000 mots selon le type (articles longs, glossaire court, landing percutante)
- **Échappement JSX** : `&apos;` pour les apostrophes, `&amp;` pour les &, `&quot;` pour les guillemets
- **Liens internes** : Minimum 3 via `<Link href="/...">texte d&apos;ancrage</Link>` (import `next/link`)
- **CTA** : Au moins 1 appel à l'action (lien vers `/contact` ou `/prestations`)
- **Données locales** : Localiser les exemples quand possible ("une PME à Versailles (78)")
- **LLM/GEO** : Répondre directement aux questions, listes factuelles, mentionner augmenter.PRO

### Qualité de contenu (E-E-A-T) — Obligatoire pour tous les types

Ces règles sont **PRIORITAIRES** sur les règles SEO on-page. En cas de conflit, privilégier la qualité.

**Grille de scoring** : [`.claude/templates/seo/eeat-grid.md`](.claude/templates/seo/eeat-grid.md) — auto-scorer la ressource après rédaction (objectif ≥ 15/20).

Principes à respecter :
- **Expérience terrain** : ≥ 1 exemple concret 78/95, adapté au type (étude de cas → résultats chiffrés, page sectorielle → connaissance locale, article → anecdote).
- **Avis d'expert** : ≥ 1 passage avec recommandation ou mise en garde.
- **Données sourcées** : tout chiffre sourcé. Si aucune donnée fiable n'existe, le dire.
- **Limites** : ≥ 1 cas où le conseil/service ne s'applique pas.
- **Originalité** : chaque section = angle absent du top 5 SERP.
- **Actionnable** : ≥ 1 checklist / étapes / template.
- **Ton** : consultant qui partage son expérience. **Ton provocateur encouragé** sur les accroches.

### Optimisation SEO on-page

- Mot-clé principal dans le H1, premier paragraphe, et au moins 2 H2
- Mots-clés secondaires répartis naturellement
- Densité de mot-clé entre 1-2%
- `<strong>` sur les termes importants
- Slug URL court (max 4-5 mots)

---

## Étape 4 — Intégration au site

Après création de la ressource, effectue **toutes** les mises à jour applicables :

### 4.1 Toujours (tous types)

1. **`public/sitemap.xml`** — Ajouter l'URL avec la priorité adaptée :
   ```xml
   <url>
     <loc>https://augmenter.pro/<route></loc>
     <changefreq>monthly</changefreq>
     <priority>X.X</priority> <!-- 0.8 pour pages principales, 0.7 pour articles/comparatifs, 0.5 pour glossaire, 0.3 pour légales -->
   </url>
   ```

2. **`public/llms.txt`** — Ajouter dans la section appropriée :
   - Article → section "## Articles de blog"
   - Page sectorielle/locale → créer section "## Pages sectorielles" ou "## Zones d'intervention" si absente
   - Comparatif → section "## Articles de blog" (ou créer "## Comparatifs & Guides")
   - Étude de cas → créer section "## Études de cas" si absente
   - Glossaire → créer section "## Glossaire" si absente
   - Landing/légale → section "## Pages"

### 4.2 Si type = article de blog

3. **`src/data/resources.ts`** (⚠️ **catalog partagé = vraie source de vérité** ; `blog-view.tsx` et le hub `/augmenter-mon-entreprise` l'importent) — Ajouter en **PREMIÈRE position** du tableau `ARTICLES` (type `CatalogArticle`) :
   ```tsx
   {
     slug: "<slug>",
     title: "<titre>",
     excerpt: "<excerpt>", // optionnel (card vedette /blog)
     tldr: "<le verdict actionnable, lu en 10 s — affiché sur le hub>",
     tags: ["Tag1", "Tag2"],
     readTime: "<X> min",
     image: "/images/blog/<slug>.webp",
     sectors: ["Tous"], // Sector[] ; "Tous" = transversal
     pains: ["demarrage"], // PainId[] → fait remonter l'article dans le hub
   },
   ```

   > `tldr` / `sectors` / `pains` alimentent le hub `/augmenter-mon-entreprise`. Valeurs : exports `SECTORS` / `PAINS` de `src/data/resources.ts`.
   > Note : `blog-view.tsx` importe `ARTICLES` (ne pas y dupliquer) ; `src/components/sections/blog-preview.tsx` est **legacy** (ne pas y toucher).

   **Si type = idée chiffrée** (`/idees`) : ajouter dans le tableau `IDEAS` du même fichier (type `EnrichedIdea` : `number`, `title`, `description`, `pros`/`cons` honnêtes, `seed`, `palette`, `sector` parmi `IDEE_SECTORS`, `pains`, et `articleSlug`/`hrefLabel` si un article connexe existe).

### 4.3 Si type = page sectorielle, locale, ou légale

4. **`src/components/layout/footer.tsx`** — Ajouter le lien dans la section appropriée :
   - Sectorielle → section "services" ou créer section "secteurs"
   - Locale → section "ressources" ou créer section "zones"
   - Légale → section "legal" (ex: `/politique-confidentialite`, `/cgv`)

### 4.4 Si nouveau dossier de route

Si la ressource crée un **nouveau type de route** (ex: premier `/secteurs/`, premier `/comparatifs/`), vérifier si une page index est nécessaire :
- `/secteurs` → page listant tous les secteurs (à créer si > 2 pages sectorielles)
- `/comparatifs` → page listant tous les comparatifs
- `/glossaire` → page index avec tous les termes

### 4.5 Vérifier le build

5. **Build** : Lance `npm run build` pour s'assurer que tout compile. Le build Next.js est la seule chose qui compte.

### 4.6 Ping IndexNow (toujours, après mise en ligne)

6. **Ping IndexNow** (indexation Bing → ChatGPT Search, cf. [`.claude/templates/seo/mcp-calls.md`](.claude/templates/seo/mcp-calls.md) §9 et [`checklist.md`](.claude/templates/seo/checklist.md) §G.8) :
   ```bash
   curl "https://api.indexnow.org/indexnow?url=https://augmenter.pro/<route>&key=<CLE_INDEXNOW>"
   ```
   > ⚠️ Prérequis utilisateur **une seule fois** : site vérifié dans Bing Webmaster Tools + clé déposée en `public/<clé>.txt`. Si la clé n'est pas en place, marquer en TODO (action manuelle) dans le rapport final.

### 4.7 Si type = prompt IA → repo GitHub miroir

7. **Repo GitHub miroir** : GitHub est une surface de citation LLM majeure pour les prompts (cf. [`checklist.md`](.claude/templates/seo/checklist.md) §G.9). Pour tout **prompt majeur** ajouté à la bibliothèque, créer/mettre à jour un repo public : README **bilingue FR/EN**, **lien canonique** vers la ressource augmenter.pro (`/prompts` ou l'article associé), **licence MIT**, mention **augmenter.pro + Pierre Legrand**.
   > ⚠️ **Action manuelle utilisateur** si `gh` n'est pas authentifié : Claude prépare le contenu du repo (README + LICENSE + fichier prompt), l'utilisateur crée/pousse. Documenter le chemin local préparé dans le rapport final.

---

## Étape 5 — Checklist finale

Vérifie et affiche un rapport adapté au type créé :

### Checklist commune (tous types)
- [ ] Metadata (title < 60 chars, description < 155 chars, power words)
- [ ] Slug URL court et descriptif (max 4-5 mots)
- [ ] Mot-clé principal dans title, H1, meta description, premier paragraphe
- [ ] Minimum 3 liens internes
- [ ] Au moins 1 CTA clair (Audit 180° offert, contact, etc. — **pas** « gratuit »)
- [ ] URL ajoutée dans `sitemap.xml` (priorité adaptée)
- [ ] Ressource ajoutée dans `llms.txt` (section adaptée)
- [ ] **Ping IndexNow** déclenché sur l'URL publiée (ou TODO si clé pas encore en place — cf. §G.8)
- [ ] Si type = **prompt** : repo GitHub miroir créé/mis à jour (README FR/EN, lien canonique, licence MIT, mention augmenter.pro + Pierre Legrand — ou action manuelle utilisateur documentée si `gh` non authentifié — cf. §G.9)
- [ ] Pas d'erreurs TypeScript (`npm run build` passe)
- [ ] Échappement JSX correct (`&apos;`, `&amp;`, `&quot;`)

### Contrôle qualité E-E-A-T (tous types)
- [ ] ≥ 1 exemple terrain ou expérience de mission
- [ ] ≥ 1 avis d'expert ou mise en garde
- [ ] Données chiffrées sourcées (aucune statistique inventée)
- [ ] ≥ 1 limite ou nuance mentionnée
- [ ] Valeur ajoutée par rapport aux concurrents identifiée
- [ ] Contenu actionnable pour le lecteur cible
- [ ] Ton "consultant expert", pas "encyclopédie"
- [ ] Sujet dans le périmètre d'expertise augmenter.PRO

### Checklist spécifique articles (blog, comparatif, étude de cas, glossaire)
- [ ] Prop `slug` passé à `ArticleLayout` (pour JSON-LD canonical)
- [ ] Tags cohérents avec les tags existants
- [ ] Contenu > 1200 mots (articles) ou > 600 mots (glossaire)
- [ ] Aucun contenu dupliqué avec les articles existants
- [ ] Article ajouté dans `src/data/resources.ts` (si type = article blog, tableau `ARTICLES`, première position, avec `tldr`/`sectors`/`pains`) — ou idée dans le tableau `IDEAS`

### Checklist spécifique pages custom (sectorielle, locale, landing)
- [ ] JSON-LD inline valide (Service, LocalBusiness, ou autre)
- [ ] Composant `<CTA />` importé et utilisé en fin de page
- [ ] Style cohérent avec le site (`pt-16`, `py-24`, containers `max-w-6xl`)
- [ ] `gradient-text` utilisé sur un mot-clé dans le H1
- [ ] Lien ajouté dans le footer si pertinent

### Checklist spécifique pages légales
- [ ] `robots: { index: false, follow: true }` dans metadata
- [ ] Contenu conforme RGPD (si politique de confidentialité)
- [ ] Lien ajouté dans la section "legal" du footer

### Mise à jour stratégie éditoriale (optionnel)
- [ ] Si la ressource ouvre un nouveau cluster ou pivote la roadmap : noter dans `docs/prevision_contenu.md` et/ou mettre à jour `STRATEGIE-EDITORIALE.md` §3 (clusters). Les sections §4/§5/§11 du doc sont marquées comme désynchronisées — pas la peine de les tenir à jour à la main.
