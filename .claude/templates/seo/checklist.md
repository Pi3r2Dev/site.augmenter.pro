# Template — Check-lists SEO communes

Check-lists partagées par les 4 commandes SEO (`/seo-audit`, `/create-article`, `/create-resource`, `/modify-resource`). Référencer le bloc utile dans la commande — pas besoin de tout dupliquer.

> **Sources de vérité connexes** : [`project-context.md`](project-context.md) (positionnement, contraintes), [`eeat-grid.md`](eeat-grid.md) (scoring détaillé E-E-A-T).

---

## ✅ A. SEO on-page (toute page indexable)

- [ ] `<title>` unique, **< 60 caractères**, contient le mot-clé principal et ≥ 1 power word (Guide, Offert, 2026, Sans Engagement, Inclus…)
- [ ] `<meta description>` unique, **< 155 caractères**, avec CTA clair et mot-clé principal
- [ ] **Géo-ciblage 78/95 uniquement si pertinent** (formation présentielle / page locale). Pour intent national → formulation « PME française », « dirigeant PME » (cf. [`project-context.md`](project-context.md) §Audience)
- [ ] Mot-clé principal dans : H1, premier paragraphe, ≥ 2 H2
- [ ] Mots-clés secondaires répartis naturellement, densité 1-2 %
- [ ] Hiérarchie Hn correcte (un seul H1, H2 ordonnés, pas de sauts)
- [ ] Slug URL court et descriptif (kebab-case, **≤ 4-5 mots**)
- [ ] Échappement JSX OK : `&apos;` pour ', `&amp;` pour &, `&quot;` pour "
- [ ] ≥ 3 liens internes via `<Link href="/...">` (import `next/link`) — ancres descriptives, pas « cliquez ici »
- [ ] ≥ 1 CTA clair (Audit 180° offert / Audit 360° / `/contact`)
- [ ] Images via `<Image>` de `next/image`, format WebP, `alt` descriptif en français
- [ ] **Pas d'occurrence du mot « gratuit »** — remplacer par « offert », « sans engagement », « inclus », « 0 € »

---

## ✅ B. Qualité de contenu & E-E-A-T

Règle : ces points sont **prioritaires sur le SEO on-page**. En cas de conflit, privilégier la qualité.

**Grille de scoring détaillée** : [`eeat-grid.md`](eeat-grid.md) — auto-scorer après rédaction, objectif **≥ 15/20**.

- [ ] **Experience** : ≥ 1 exemple terrain concret (cas client anonymisé, observation 78/95, retour de mission)
- [ ] **Expertise** : ≥ 1 avis d'expert tranché, recommandation directe ou mise en garde
- [ ] **Autorité** : auteur identifié (Pierre Legrand), bio/credentials accessibles
- [ ] **Fiabilité** : toutes les données chiffrées sourcées (jamais de stat inventée)
- [ ] ≥ 1 limite ou nuance mentionnée (« cela ne s'applique pas si… »)
- [ ] Originalité : chaque section apporte un angle absent du top 5 SERP — pas de reformulation
- [ ] Actionnable : ≥ 1 élément concret (checklist, étapes, template) que le lecteur peut appliquer
- [ ] Ton « consultant qui partage son expérience », **pas** « encyclopédie qui compile »
- [ ] **Ton provocateur encouragé** sur les accroches (parler aux douleurs PME — cf. [`project-context.md`](project-context.md) §Contraintes éditoriales)
- [ ] Sujet dans le périmètre d'expertise augmenter.PRO (IA / digital / audit / transformation pour PME)

---

## ✅ C. JSON-LD & données structurées

- [ ] Article de blog → prop `slug` passé à `ArticleLayout` (génère l'URL canonique du JSON-LD `Article`)
- [ ] Page custom → JSON-LD inline approprié (Service, LocalBusiness, FAQPage, ItemList, DefinedTerm, etc.)
- [ ] FAQ section présente → JSON-LD `FAQPage` ajouté
- [ ] Pas de stats inventées dans `Review` / `AggregateRating` — réutiliser le tableau `REVIEWS` de [`src/app/layout.tsx`](../../src/app/layout.tsx)
- [ ] Pages indexables → vérifier `metadata.robots` non défini ou `index: true`
- [ ] Pages légales / utilitaires → `robots: { index: false, follow: true }`

---

## ✅ D. Intégration site (chaque nouvelle ressource)

- [ ] `public/sitemap.xml` : entrée `<url>` avec `<lastmod>` ISO 8601 réel + priorité adaptée (1.0 home, 0.9 approche/contact, 0.8 services, 0.7 articles/comparatifs, 0.5 glossaire, 0.3 légales)
- [ ] `public/news-sitemap.xml` : entrée pour les articles récents (< 30 jours)
- [ ] `public/llms.txt` : entrée dans la section appropriée (`## Articles de blog`, `## Pages sectorielles`, `## Glossaire`, `## Pages`…)
- [ ] Si article : `src/app/blog/blog-view.tsx` → ajouter en **première position** du tableau `ARTICLES` (⚠️ `src/components/sections/blog-preview.tsx` est **legacy** depuis la refonte bento — ne pas y toucher)
- [ ] Si page sectorielle / locale / légale : `src/components/layout/footer.tsx` → lien dans la section correcte (services / secteurs / zones / legal)
- [ ] Si image hero requise : `public/images/blog/<slug>.webp` (WebP, 16:9, < 300 Ko) + entrée dans `public/images/blog/INDEX.md` + prop `image` passé à `ArticleLayout`
- [ ] Si l'image n'est pas encore générée : marquer TODO, ne **pas** publier sans image
- [ ] `npm run build` passe sans erreur TypeScript

---

## ✅ E. Modification / restructuration d'une ressource existante

(Spécifique à `/modify-resource` — en complément des sections A à D ci-dessus)

- [ ] Toute URL supprimée ou déplacée a une **redirection 301** dans `next.config.ts` (`async redirects()`, `permanent: true`)
- [ ] Pas de **double redirect** (A → B → C → simplifier en A → C)
- [ ] Aucune redirection existante ne pointe vers une URL supprimée
- [ ] `grep -r "ancien-slug" src/ public/` → 0 résultat avant de finaliser (sauf dans next.config.ts)
- [ ] `sitemap.xml` : ancienne URL retirée + nouvelle ajoutée
- [ ] `llms.txt` : ancienne entrée retirée + nouvelle ajoutée
- [ ] `src/app/blog/blog-view.tsx` (articles) / `footer.tsx` (pages) : entrées mises à jour si applicable
- [ ] E-E-A-T ne **régresse** pas après modification (re-scorer avec [`eeat-grid.md`](eeat-grid.md))
- [ ] Aucune occurrence de « gratuit » introduite par la modification

---

## ✅ F. Audit complet (`/seo-audit`)

- [ ] Phase 0 — Vérifier MCPs (GSC, DataForSEO, Firecrawl, Playwright). Voir [`mcp-calls.md`](mcp-calls.md) pour les pings de validation
- [ ] Phase 0 — Sauver la baseline GSC (clics, impressions, position, CTR) — sert de référence pour audits futurs
- [ ] Phase 6 — Cocher la check-list §G ci-dessous (GEO / LLM citation)
- [ ] Phase 7 — Appliquer [`eeat-grid.md`](eeat-grid.md) à chaque page indexable
- [ ] Phase 8 — Briefs au format [`article-brief.md`](article-brief.md) (15-20)
- [ ] Phase 8 — Fiches pages au format [`page-spec.md`](page-spec.md)
- [ ] Phase 9 — Copy au format [`copy-proposal.md`](copy-proposal.md), cartes services au format [`service-card.md`](service-card.md)
- [ ] Phase 10 — Rapport au format [`report.md`](report.md), sauvegardé dans `docs/seo-audits/<YYYY-MM-DD>-audit.md`
- [ ] Section finale : KPIs avec baseline datée → comparable au prochain audit

---

## ✅ G. GEO / LLM citation (Phase 6 du seo-audit)

Objectif : être cité par ChatGPT Search, Perplexity Pro, Google Gemini AI Mode / AI Overviews, Claude, Brave Summarizer, Bing Copilot — quand un dirigeant PME formule une requête correspondant aux prestations augmenter.pro.

> **Deux voies de citation — ne pas confondre** : (a) **retrieval live** — le moteur va chercher la page au moment de la requête → leviers *on-page* §G.1-G.6 (accessibilité bots, citation triggers, llms.txt, NAP) ; (b) **training data** — le moteur a « appris » l'entité/le contenu pendant son entraînement → leviers *off-site* §G.7 (mentions dans publications, annuaires, podcasts, forums que les LLMs ingèrent). **L'on-page parfait (score §G.5 = 10/10) reste invisible si la voie (b) est vide** — c'est le verrou diagnostiqué (entité externe faible). Optimiser les DEUX, pas seulement le on-page.

### G.1 Accessibilité des bots IA (prérequis bloquant)

- [ ] `robots.txt` autorise explicitement : `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, `Perplexity-User`, `CCBot`
- [ ] Décision éditoriale prise pour `Bytespider` et `Meta-ExternalAgent` (allow ou disallow — pas d'implicite)
- [ ] Aucun header `X-Robots-Tag: noai` ou `noimageai` sur les pages indexables
- [ ] CSP `frame-ancestors` ne bloque pas le rendu pour Bing Copilot
- [ ] Test fetch HTTP 200 avec User-Agent `GPTBot/1.0` et `PerplexityBot/1.0` (cf. [`mcp-calls.md`](mcp-calls.md) §6.3)

### G.2 Entity author — Pierre Legrand

- [ ] Page `/auteur/pierre-legrand` (ou `/a-propos/pierre-legrand`) existe et est indexable
- [ ] JSON-LD `Person` complet : `name`, `jobTitle`, `worksFor` (ref `#organization`), `sameAs: [LinkedIn, GitHub, X, France Num, Bpifrance]`, `knowsAbout: [...]`, `description` ≥ 150 mots, `image`
- [ ] `ArticleLayout` injecte `Article.author` avec une ref `@id` vers la page auteur (pas juste une string)
- [ ] Headshot Pierre Legrand consistant sur toutes les pages (mêmes pixels ou même framing)
- [ ] Bio mise à jour `dateModified` dans le `Person` schema

### G.3 NAP consistency (Name / Address / Phone)

- [ ] Nom exact uniforme : `augmenter.PRO` vs `augmenter.pro` vs `Augmenter Pro` → **une seule forme** sur tout le site
- [ ] Adresse complète (rue + CP + ville) identique entre footer, page contact, mentions légales, JSON-LD `LocalBusiness`
- [ ] Téléphone au format E.164 dans `LocalBusiness.telephone`
- [ ] SIRET / TVA cohérents entre mentions légales et CGV
- [ ] `openingHoursSpecification` si applicable

### G.4 `llms.txt` et `llms-full.txt`

> ⚠️ **Recalibrage 2026-06-10** : les études de juin 2026 (SE Ranking sur ~300k domaines, rapport ALLMO) ne mesurent **aucun effet** de `llms.txt` sur les citations LLM, et un trafic bots IA marginal (~0,1 %). On **maintient** les fichiers (coût nul, utiles aux agents IDE et à la lisibilité), mais on **ne les présente plus comme un levier de citation** : la citation se joue ailleurs (citation triggers §G.5, indexation Bing/IndexNow §G.8, surface GitHub §G.9, entité externe §G.7).

- [ ] `public/llms.txt` à jour (cf. Phase 6.6.1 du seo-audit pour le détail)
- [ ] `public/llms-full.txt` existe (contenu markdown complet de toutes les pages indexables)
- [ ] `llms-full.txt` < 5 MB (sinon split en `llms-full-blog.txt`, `llms-full-services.txt`)
- [ ] Référencé dans `llms.txt` ET dans `robots.txt` (`Sitemap: https://augmenter.pro/llms-full.txt`)
- [ ] Dates `dateModified` ISO 8601 visibles pour chaque page listée

### G.5 Citation triggers (par page stratégique — score ≥ 7/10)

- [ ] **Définition courte en intro** (≤ 25 mots) dans le 1er paragraphe
- [ ] **Chaque H2 = chunk auto-suffisant** : la réponse complète tient dès la 1re phrase de la section, sans dépendre du contexte amont (les moteurs RAG découpent la page ; ChatGPT ne cite que ~15 % des pages récupérées — AirOps, 548k pages)
- [ ] **≥ 1 donnée originale propre** (mesure terrain, benchmark maison, observation 78/95) — **pas seulement** une stat tierce sourcée. Tactique GEO la plus validée empiriquement (+30-40 % de visibilité IA)
- [ ] **≥ 1 tableau comparatif** markdown
- [ ] **Données chiffrées sourcées** (`X %`, `X €` + source en lien)
- [ ] **Listes numérotées** (étapes, top N)
- [ ] **FAQ Q→A direct** + `FAQPage` JSON-LD
- [ ] **Timestamp explicite** dans le contenu (« au DD/MM/2026 » ou « Mise à jour mai 2026 »)
- [ ] **Attribution claire** (« selon Pierre Legrand, consultant IA chez augmenter.pro »)
- [ ] **Auteur identifié + lien** vers page auteur en haut/bas
- [ ] **TL;DR / résumé exécutif** en encadré haut de page
- [ ] **Slug court et descriptif** (max 5 mots kebab-case)

### G.6 Schémas JSON-LD complémentaires

- [ ] `HowTo` sur articles méthodologiques
- [ ] `Product` + `aggregateRating` sur chaque offre individuelle (Audit 180°, Audit 360°, Sprint, etc.)
- [ ] `BreadcrumbList` sur pages profondes (≥ 2 niveaux)
- [ ] `VideoObject` si vidéo embarquée
- [ ] `Course` si formation packagée en module

### G.7 Entity mentions externes (voie training data)

> C'est la voie (b) de l'intro §G : être **appris** par les LLMs, pas seulement retrieved. Levier #1 diagnostiqué pour débloquer la citation.

- [ ] Profil LinkedIn Pierre Legrand mentionne « augmenter.pro » exactement
- [ ] Bio GitHub Pierre Legrand mentionne augmenter.pro
- [ ] Demandes/inscriptions actives : France Num Activateur, Bpifrance IA Booster directory
- [ ] **Placements dans des sources ingérées à l'entraînement** : ≥ 1 publication / média sectoriel, podcast invité, ou contribution longue (Reddit / LinkedIn long-form FR) — **distinct** des annuaires de validation d'entité ci-dessus (eux servent la cohérence NAP, pas le corpus d'entraînement)
- [ ] (Long terme) Wikidata Q-item Pierre Legrand si ≥ 3 mentions presse vérifiables
- [ ] (Long terme) ≥ 1 article presse indexable mentionnant augmenter.pro

### G.8 Indexation Bing / IndexNow (angle mort ChatGPT Search)

> **Pourquoi** : ChatGPT Search s'appuie sur l'index **Bing**, pas Google. Un contenu absent de Bing est invisible pour ChatGPT, quel que soit son rang Google. **IndexNow** (protocole Microsoft/Yandex) pousse une URL dans l'index en quelques heures — décisif pour les contenus *first-mover*. (Source : oltre.ai/blog/indexnow-for-geo-bing-chatgpt-visibility.)
>
> ⚠️ **Prérequis utilisateur (actions manuelles, à faire une fois)** : (1) vérifier le site dans **Bing Webmaster Tools** via l'import de la propriété GSC ; (2) générer une **clé IndexNow** et la déposer en `public/<clé>.txt` (le fichier contient la clé en clair). Tant que la clé n'existe pas dans `public/`, le ping §ci-dessous échoue (403). Voir [`mcp-calls.md`](mcp-calls.md) §9 pour l'appel curl.

- [ ] Site vérifié dans **Bing Webmaster Tools** (import de la propriété Google Search Console)
- [ ] **Clé IndexNow** présente dans `public/<clé>.txt` (fichier à la racine publique, contenu = la clé)
- [ ] **Ping IndexNow** déclenché à chaque publication / modification d'URL (POST `https://api.indexnow.org/indexnow` — cf. [`mcp-calls.md`](mcp-calls.md) §9)
- [ ] URLs modifiées ou redirigées (301) également pingées (cf. [`/modify-resource`](../../commands/modify-resource.md))

### G.9 Surface GitHub (prompts & outils — voie training data)

> **Pourquoi** : les SERP et les réponses LLM sur des requêtes type « claude audit prompt » citent massivement des **repos / gists GitHub**. Publier nos prompts majeurs en repo public alimente la voie (b) « training data » de l'intro §G — le verrou diagnostiqué (entité externe faible). **Décision actée 2026-06-10 : on le fait pour les prompts majeurs.**
>
> ⚠️ **Action manuelle utilisateur si `gh` n'est pas authentifié** : la création/mise à jour du repo est une étape manuelle (Claude prépare le contenu, l'utilisateur pousse).

- [ ] Pour toute ressource de type **prompt majeur** → **repo public miroir** sur GitHub
- [ ] README **bilingue FR/EN** décrivant le prompt et son usage
- [ ] **Lien canonique** vers l'article / la ressource correspondante sur augmenter.pro
- [ ] Licence **MIT** présente
- [ ] Mention **augmenter.pro + Pierre Legrand** (auteur, lien) dans le README

### G.10 Tests directs multi-moteurs (résultats consignés dans le rapport)

- [ ] Bibliothèque de 15-20 prompts cibles maintenue dans `docs/seo-audits/<date>-data/geo-prompts.md`
- [ ] Tests passés sur : ChatGPT (Search), Perplexity Pro, Gemini AI Mode, Google AI Overviews, Brave Summarizer, Bing Copilot (et Claude si accès)
- [ ] Tableau (prompt × moteur) rempli dans §7.3 du rapport : cité oui/non, position, fragment cité, sources concurrentes

---

**Utilisé par** :
- [`/seo-audit`](../../commands/seo-audit.md) — Phase 0 (validation outils) + check-list finale (§F)
- [`/create-article`](../../commands/create-article.md) — sections A à D (on-page, E-E-A-T, JSON-LD, intégration site)
- [`/create-resource`](../../commands/create-resource.md) — sections A à D
- [`/modify-resource`](../../commands/modify-resource.md) — sections A à E (la §E « Modification » est exclusive à cette commande)
