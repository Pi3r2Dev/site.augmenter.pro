---
date: 2026-10-23
slug: architecture-silos
status: proposé, révisé après revue croisée (§ 8, réponses § 9) — entrée du `/dialectic`, puis de l'ADR 0008
sources: docs/sessions/2026-10-23-brainstorm-silos-maillage.md
---

# Architecture de silos et circulation du jus — repositionnement « intégration IA / Odoo / Claude Code »

Plan issu du brainstorm du 2026-10-23, révisé le même jour après la revue croisée. **Rien n'est implémenté** : ce document nourrit le `/dialectic`, la mesure GEO et l'ADR 0008. Les orientations du [§ 7 bis de la note positionnement](../seo-audits/2026-10-23-positionnement-integration-ia.md) ne sont pas rouvertes.

## 0. Décision proposée, en une ligne

**Scénario hybride (S3)** : une page hub « intégration IA PME » qui porte aussi les usages IA du dirigeant (outil indifférent), deux silos d'outil (**Odoo & agents**, **Claude Code & Cowork**), un silo **local** fermé, deux pages hors maillage. Il demande de recâbler 38 liens entre silos ; le plus gros levier est le calcul des cartes « À lire ensuite », pas la réécriture des articles. Le point faible est assumé : le silo Claude ne compte que 3 articles pour la deuxième demande du site, et il faut le construire.

## 1. Ce que dit le graphe actuel (base de chiffrage)

Source : [maillage-interne.tsv](../seo-audits/2026-10-23-data/maillage-interne.tsv) (735 liens rendus, hors header/footer/nav), reclassé page par page ; [suggestions Google FR](#annexe-a--demande-par-graine-2026-10-23) et GSC 16 mois (`scripts/seo/gsc-portfolio.mjs`) relevés le jour même.

| Constat | Chiffre | Conséquence |
|---|---|---|
| Les cartes « À lire ensuite » (`getRelatedArticles()`) font 93 liens ; 21 articles sur 31 n'ont pas de liste `related` et sont scorés sur douleurs et secteurs communs | **59 / 93 cartes sortent du silo** ; les 4 articles cyber/audit envoient 11 cartes sur 12 vers Odoo/MCP | Invisible pour le juge (lien rendu depuis des données), mais la fonction est pure donc testable : **levier n°1** |
| Liens écrits en dur entre pages de silo | 198, dont **7** violent le découpage révisé (annexe B) | Le recâblage éditorial est petit ; le coût réel est ailleurs (réécriture des liens vers les URL redirigées, § 7) |
| MCP / agents (9 pages) envoie 30 liens à Odoo, en reçoit 16 ; cohésion 31 % | Pas un silo autonome : un affluent d'Odoo | Fusion dans le silo Odoo |
| Odoo × IA (8 pages) reçoit 150 liens, le plus gros aimant | `/serveur-mcp-odoo` liée par 18 pages, ancre canonique tenue | Pilier déjà en place |
| Sur les 51 liens D→C, 49 viennent de pages-listes (`/a-propos`, hub ressources, `/blog`, plan du site) | 2 seulement sont éditoriaux | Les listes sont exemptées des règles ; le flux tombe de lui-même |
| « intégration ia pme » : **1** suggestion ; « agent ia pme » : **4** | En face : « claude code » 301, « claude cowork » 265, « odoo claude » 63 | La page fusionnée est un **hub**, pas une tête de requête ; son titre porte la requête qu'elle hérite (§ 2.1) |
| Pages « IA du dirigeant » classées sur leur contenu, pas sur leurs cartes | `veille-concurrentielle-ia-pme` ne cite ni Claude ni Cowork ; `compte-rendu-reunion-ia` parle de ChatGPT ; `ia-redefinit-vente-commerciale` fait **752 impr. / 6 clics** | Elles vont au hub (critère § 2.0), pas dans le silo Claude |

## 2. Silos retenus

Registres : pages commerciales et piliers en **tu**, articles de fond en **vous** (charte § 3.3). Confidentialité : Reva 9 en 🟢 uniquement, iaCommerce jamais nommé (🟠).

### 2.0 Critère d'appartenance (écrit, appliqué à chaque page)

1. **Silo d'outil** (Odoo, Claude) : la promesse de la page (title, h1) **et** sa méthode reposent sur l'outil du silo. Citer l'outil en passant ne suffit pas.
2. **Hub** : la page traite de l'IA dans la PME **quel que soit l'outil** (ChatGPT, Claude, Gemini interchangeables), ou de sujets transverses (vision, coût à l'usage, souveraineté, agents en général).
3. **Local** : présentiel 78/95, audit IT, cybersécurité.
4. **Hors maillage** : sujet ou secteur que le positionnement ne sert plus. Critère **thématique**, avec un garde-fou de performance : aucune page au-dessus de **100 impressions sur 16 mois** ne sort du maillage sans décision explicite dans l'ADR.

### 2.1 Hub — « Intégration IA PME » et usages IA du dirigeant

| Rôle | Page | Statut |
|---|---|---|
| **Pilier hub** | `/integration-ia-pme` *(URL proposée, à figer dans l'ADR)* | **à créer** par fusion ; **301** depuis `/strategie-ia-pme` et `/audit-ia-pme` (décision déjà prise). **Title et h1** porteurs de « automatisation IA » pour PME (49 impr., requête aujourd'hui servie par `/strategie-ia-pme`, que le hub hérite par la 301). « Agent IA PME » reste au satellite qui la porte (pas de cannibalisation). « intégration IA » est l'**ancre interne** (R3) |
| Satellites transverses | `agent-ia-dirigeant-pme` (« agent ia pme », 123 impr., pos. 16), `ma-pme-en-2027`, `/ia-souveraine-pme`, `patron-goulot-paradoxe-ia-dirigeant-pme`, `bilan-ia-janvier-juillet-2026` (absorbé par le journal IA si le pilote part, § 2.9) | existants |
| Satellites usages du dirigeant | `ia-redefinit-vente-commerciale` (752 / 6), `veille-concurrentielle-ia-pme` (532 / 1), `automatiser-emails-reseaux-sociaux-ia` (326 / 2), `comparatif-llm-vente-commerciale` (191 / 2), `ia-contradicteur-prompts-dirigeant-pme` (138 / 8), `compte-rendu-reunion-ia` (6 / 0) | existants, ex-cluster C |

Le hub **fait la transversale** : ses pages peuvent lier les satellites des deux silos d'outil (aujourd'hui 17 liens de ce type, justifiés par le contenu, dont 2 imposés par MA-2). Elles ne lient **ni le local ni les pages hors maillage**. Tout silo peut **remonter** vers une page du hub.

### 2.2 Silo « Odoo & agents » — 14 pages

| Rôle | Page | Statut |
|---|---|---|
| **Pilier** | `/serveur-mcp-odoo` | existant (13 routes sources dans le silo) |
| **Sous-pilier** « brancher l'IA sur tes autres outils » | `/integration-mcp` | existant, **repositionné** : il accueille les outils tiers (§ 4) ; ancre canonique déjà imposée (« intégration MCP pour PME ») |
| Satellites Odoo | `configurer-odoo-ia-claude-cowork`, `claude-code-odoo-workflow`, `odoo-online-ce-que-vous-ne-pouvez-pas-installer`, `odoo-20-serveur-mcp-agents`, `cout-agent-ia-odoo`, `agent-ia-qui-ne-touche-pas-aux-prix`, `ia-enrichir-catalogue-sans-perdre-la-main` | existants |
| Satellites MCP / agents | `serveur-mcp-guide-pratique-pme`, `serveur-mcp-heberge-pme`, `serveur-mcp-integration-crm-erp`, `petit-modele-bien-outille`, `logiciel-construit-par-agents-dix-semaines` | existants |
| À créer (file d'attente, pas d'engagement) | Assistant client sur le site branché sur Odoo (Chatwoot, ADR-011 iaCommerce 🟢) → rattaché au sous-pilier ; angles terrain Reva 9 n° 2 (piège de l'unité de mesure), n° 3 (FEC mensuel), n° 11 (facturation électronique, fraîcheur) | proposés |

### 2.3 Silo « Claude Code & Cowork » — 4 pages + 3 ponts + bibliothèque

| Rôle | Page | Statut |
|---|---|---|
| **Pilier** | `/atelier-claude-code-dirigeant`, **renommé** « formation Claude Code pour dirigeants » : title, h1, ancres. **L'URL ne change pas** (§ 9, point 3) | existant |
| **Tête de trafic** | `/blog/claude-code-prompt-architecture` (309 clics sur 16 mois) | existant ; doit lier le pilier avec l'ancre canonique |
| Satellites | `prompt-audit-projet-claude-fable`, `claude-cowork-community-manager` | existants |
| Ponts reçus | les 3 pages-ponts du § 2.8 (rattachées au silo Odoo) | existants |
| Bibliothèque | `/prompts` | page-liste exemptée des interdits, mais doit lier le pilier |
| **À créer, prioritaire** | « Claude Cowork pour un dirigeant : prix, ce qu'il fait, ce qu'il ne fait pas » (demande : cowork prix, tarif, avis, c'est quoi, pme ; preuves 🟢 : configuration Odoo, community manager) | **condition** pour que le silo tienne : 3 articles pour 566 suggestions (Code + Cowork), la plus grosse demande du site après Odoo |

Mesure du silo en l'état : cohésion **33 %**, et le filtre des cartes ne le renforce pas (après filtre : 1 carte entrante pour le prompt architecture, 1 pour l'audit, 0 pour Cowork ; les cartes partent vers les ponts). Les liens écrits à la main (R6) et la page Cowork font le travail.

### 2.4 Silo local — fermé, 6 pages

`/audit-informatique-yvelines`, `/audit-informatique-val-doise`, `cout-audit-informatique-yvelines`, `nis2-pme-yvelines-val-doise`, `cybersecurite-pme-guide-pratique`, `5-signes-moderniser-informatique-pme`. Ancrage léger (décision prise) : alimenté par la structure (nav, `/approche`, plan du site, fiche Google), ne reçoit rien des silos nationaux **ni du hub**, n'envoie rien vers leurs satellites. Pas de pilier imposé.

### 2.5 Hors maillage — 2 pages, restent en ligne

`machine-de-guerre-commerciale` (rénovation énergétique, 22 impr. / 0 clic) et `rapport-adoption-ia-btp-francilien-2026` (73 / 0). Liées seulement depuis les pages-listes ; aucune page de silo ni du hub ne les lie ; leurs cartes « À lire ensuite » viennent **du hub** (entre elles, elles n'en auraient qu'une). Candidates à une fusion ou une dépublication plus tard, hors de ce plan.

### 2.6 Recyclage du cluster C (11 pages)

| Page | Destination |
|---|---|
| `/strategie-ia-pme`, `/audit-ia-pme` | fusion → pilier hub (301) |
| `patron-goulot-paradoxe-ia-dirigeant-pme`, `bilan-ia-janvier-juillet-2026`, `ia-redefinit-vente-commerciale`, `comparatif-llm-vente-commerciale`, `veille-concurrentielle-ia-pme`, `automatiser-emails-reseaux-sociaux-ia`, `compte-rendu-reunion-ia` | satellites du hub (critère 2.0-2 : outil indifférent) |
| `machine-de-guerre-commerciale`, `rapport-adoption-ia-btp-francilien-2026` | hors maillage (§ 2.5) |

(Et `ia-contradicteur-prompts-dirigeant-pme`, classée en A par le script mais générique : 14 mentions de ChatGPT, autant de Claude → hub.)

### 2.7 Pages de structure

- **`/` et `/approche`** : récit de marque, hors silo. Rôle : porte d'entrée vers le hub et les deux piliers (règle R10). Ils restent en vous.
- **Pages-listes exemptées** des interdits (elles listent tout par construction) : `/blog`, `/idees`, `/prompts`, `/augmenter-mon-entreprise`, `/plan-du-site`, `/a-propos`, `/projets`. Note hors règle : `/a-propos` liste tout le catalogue (69 liens) ; la resserrer sur les piliers et les preuves concentrerait le jus, chantier non bloquant.
- **Utilitaires** : `/contact`, `/auteur/pierre-legrand`, liables depuis partout.

### 2.8 Pages-ponts Odoo ↔ Claude (liste fermée)

`claude-code-odoo-workflow` (le workflow Claude Code qui pilote Odoo), `configurer-odoo-ia-claude-cowork` (Odoo reconfiguré avec Claude Cowork), `logiciel-construit-par-agents-dix-semaines` (un produit Odoo construit par une boucle d'agents Claude Code). Leur titre et leur méthode reposent sur **les deux** outils (critère 2.0-1 rempli pour les deux silos) : c'est ce qui les qualifie. Elles appartiennent au silo Odoo, peuvent **recevoir** des liens des deux silos et **lier** les deux silos. Qu'elles couvrent aussi MA-1, MA-4c et la liste workflow du juge actuel est une conséquence, pas la raison. Liste plafonnée à 3 (règle R5) ; un 4e pont exige le même critère et une ligne dans l'ADR.

### 2.9 Journal des annonces IA (question 10 du dossier, ajoutée après la séance)

| Choix | Décision proposée | Pourquoi |
|---|---|---|
| **Place** | **satellite du hub**, pas un silo ni une page-liste exemptée | Une entrée concerne Odoo, Claude ou un modèle ouvert : seul le hub a le droit de lier les deux silos (R5). Exempté, il échapperait aux règles alors qu'il porte du contenu éditorial (verdicts) |
| **URL** | `/journal-ia` *(à figer dans l'ADR)* ; **absorbe** `bilan-ia-janvier-juillet-2026` (301) | Le bilan de juillet est déjà un journal rétrospectif (2 impr.) : deux pages « que s'est-il passé en IA » dans le hub se cannibaliseraient |
| **Périmètre** | annonces qui changent une décision sur Odoo, Claude / Cowork, MCP, modèles ouverts ; rien d'autre | « actualité ia » généraliste est tenue par les médias et les labos (1 requête en 16 mois, 0 clic) |
| **Entrée** | date · labo · lien vers la publication officielle · ce que ça change pour une PME · verdict (`tester` / `attendre` / `ignorer`) · pilier du silo concerné | La traduction en décision est ce que les LLM ne trouvent pas chez le labo |
| **Données** | `src/data/journal-ia.ts`, une entrée = un objet typé ; la page rend la liste | Rend R11 testable en famille (C) ; le lien vers le pilier est dérivé du `silo`, jamais tapé à la main |
| **Fraîcheur** | `dateModified` du JSON-LD = date de la dernière entrée, calculée ; jamais posée à la main | Anti-pattern « fausses mises à jour » de CLAUDE.md |
| **Grosse annonce** | en plus de l'entrée, un article `kind: "news"` (ADR 0007), satellite du silo concerné ; l'entrée le lie | Odoo 20 a été le premier cas |
| **Tenue** | 2 entrées par mois minimum ; relevé automatisable (boucle news `PROMPT-news.md`, Firecrawl sur les notes de version), **verdict humain** ; une **alerte** (R12) signale un journal à l'abandon, la dépublication reste une décision humaine | Une page vivante abandonnée fait plus de mal que pas de page |
| **Pilote** | 3 mois, calé sur la revue de l'ADR 0007 (2026-11-15, arrêt possible le 2026-12-15) | Mesuré en citations LLM et en clics vers les piliers, pas en trafic propre |

## 3. Règles de maillage testables

À encoder dans [`maillage-cluster.test.ts`](../../src/lib/maillage-cluster.test.ts) (ou un juge frère `maillage-silos.test.ts` qui réutilise ses extracteurs).

### 3.1 Modèle de données (préalable)

- **`src/lib/silos.ts`** : registre unique. `SILOS = { hub, odoo, claude, local, hors }`, chacun avec `pilier`, `sousPiliers`, `ancreCanonique`, `pages` (routes non-articles) ; `PONTS` (§ 2.8) ; `EXEMPTES` (listes + utilitaires + `/` + `/approche`).
- **Catalog** (`src/data/resources.ts`) : champ **`silo` obligatoire** sur `CatalogArticle` (le typage TS refuse un article sans silo).
- **`getRelatedArticles()`** : filtre par silo avant le score (règle R2).

### 3.2 Assertions

Deux familles de mesure : **(L)** liens écrits en dur, lus par le walk existant (`routeLinks`, `sourceRoutes`, `anchorsTo`) ; **(C)** appel direct de fonctions du catalog. Une ancre se compare sans tenir compte de la casse.

| ID | Assertion | Mesure | Seuil | État actuel |
|---|---|---|---|---|
| **R1** Registre complet | Chaque URL de `public/sitemap.xml` appartient à exactement un silo ou à `EXEMPTES` ; chaque article du catalog a un `silo` cohérent avec le registre ; **aucun `href` interne ne vise une URL redirigée** (liste des 301 de `next.config.ts`) | registre + sitemap + (L) | 0 URL orpheline, 0 double appartenance, 0 lien vers une 301 | à créer ; ~33 fichiers liront une 301 après la fusion (§ 7) |
| **R2** Cartes dans le silo | Pour tout article : `getRelatedArticles(slug, 3)` renvoie 3 articles. Silo odoo ou claude : pris dans le silo **ou** parmi les ponts ; hub : dans le hub ; local : dans le local ; hors : **dans le hub** | (C) | 3 cartes, 0 hors périmètre | **59 / 93 hors silo** |
| **R3** Satellite → pilier | Chaque page d'un silo d'outil (pilier exclu) lie son pilier en dur avec l'ancre canonique : Odoo « serveur MCP pour Odoo » (« intégration MCP pour PME » vers le sous-pilier accepté à la place), Claude « formation Claude Code » ; chaque satellite du hub lie le pilier hub avec « intégration IA » | (L) | 100 % des pages concernées | Odoo : déjà vrai pour l'essaim ; Claude et hub : à faire |
| **R4** Pilier → satellites | Chaque pilier d'outil lie au moins 3 pages de son silo (ponts compris) + le pilier hub ; vers l'autre silo d'outil, il ne lie que l'autre pilier ou un pont | (L) | ≥ 3 / 0 satellite non-pont de l'autre silo | `/serveur-mcp-odoo` OK ; l'atelier ne lie que les 3 ponts et le pilier Odoo (revue § 8) ✅ |
| **R5** Pas de lien transverse | Une page du silo X ∈ {odoo, claude} ne lie en dur aucune page du silo Y ≠ X, sauf : une page du hub (remontée) ; le pilier ou sous-pilier de Y ; un pont. Le hub lie odoo et claude librement, jamais local ni hors. Local et hors ne lient que leur silo, le hub et `EXEMPTES` | (L) | **0 violation** ; `PONTS.length ≤ 3` | **7 violations** (annexe B) |
| **R6** Entrants minimum | Pilier Odoo ≥ 12 routes sources dans son silo ; pilier Claude ≥ 6 routes sources parmi silo Claude + ponts + hub ; pilier hub ≥ 8 routes sources, tous silos confondus ; chaque satellite ≥ 2 routes sources dans son silo (ponts et hub comptés pour Claude, faute de masse) ; l'essaim garde ≥ 3 routes sources (MA-4c) | (L) `sourceRoutes` | seuils ci-contre | Odoo 13 ✅ ; Claude 5 ❌ ; hub : atteint par la réécriture des liens vers les deux pages fusionnées (7 + 7 routes aujourd'hui) ; satellites à recompter à l'étape 2 du § 7 |
| **R7** Ancres canoniques | **Toutes** les ancres en dur vers un pilier contiennent son ancre canonique (même mécanique que MA-8 pour le workflow) ; aucune ancre réduite à « Voir », « Voir les ateliers », « MCP » | (L) `anchorsTo` | 0 ancre hors canon | Odoo : 1 écart (« serveur MCP métier pour Odoo ») ; formation : « Voir les ateliers » ×7 ❌ |
| **R8** Local étanche | Aucune page `odoo`, `claude`, `hub`, `hors` ne lie une page `local` ; une page `local` ne lie aucun satellite national | (L) + R2 | 0 | 3 liens hub → local, 2 hors → local (annexe B) |
| **R9** Hors maillage | Aucune page de silo ni du hub ne lie une page `hors` | (L) | 0 | 2 liens hub → hors |
| **R10** Portes d'entrée | `/` et `/approche` lient en dur le pilier hub, `/serveur-mcp-odoo` et le pilier formation, avec leurs ancres canoniques | (L) | 3 / 3 par page | `/` lie `/integration-mcp` (« Intégrations profondes ») mais aucun pilier ❌ |
| **R11** Journal sourcé | Chaque entrée de `journal-ia.ts` a une date ISO, une URL source `https` hors `augmenter.pro`, un `silo` ∈ {hub, odoo, claude}, un verdict de l'énumération ; la page rend le lien vers le pilier de chaque silo cité ; `dateModified` = max des dates | (C) + (L) | 0 entrée incomplète | à créer |
| **R12** Journal tenu — **alerte** | Si la dernière entrée a plus de **45 jours**, un avertissement non bloquant (test `warn` ou relevé de la boucle news) le signale. **Pas de `noindex` automatique** : le sitemap est statique, et un `noindex` qui va et vient selon la date fait osciller l'indexation. La dépublication (301 vers le hub) est une décision humaine (§ 6) | (C) | 45 j | à créer |

### 3.3 Garde-fous anti-vacuum (obligatoires)

- Le registre couvre **≥ 45** URL du sitemap, et le sitemap en contient ≥ 45 (sinon un glob cassé passe au vert).
- Chaque silo compte au moins N pages : odoo ≥ 12, hub ≥ 10, local ≥ 5, claude ≥ 4 (seuil bas assumé, à relever à chaque article ajouté).
- R1 lit la liste des redirections et en voit ≥ 2.
- R2 lit **≥ 30** articles et voit **≥ 90** cartes.
- R5 voit **≥ 150** liens en dur entre pages de silo (198 aujourd'hui).
- R7 voit ≥ 10 ancres vers `/serveur-mcp-odoo` et ≥ 5 vers le pilier formation.
- R11 lit ≥ 6 entrées (amorçage : les annonces d'août à octobre 2026, Odoo 20 compris).

### 3.4 Tests négatifs (avant de déclarer le juge bon)

Un par famille, à faire en local, à constater en rouge, puis à annuler :
1. Retirer le champ `silo` d'un article → R1 rouge (et erreur TS).
2. Désactiver le filtre de `getRelatedArticles()` → R2 rouge sur ~20 articles.
3. Ajouter dans un satellite Claude un lien vers `/blog/cout-audit-informatique-yvelines` → R5 et R8 rouges.
4. Ajouter un 4e pont → R5 rouge (plafond).
5. Changer une ancre vers `/serveur-mcp-odoo` en « ici » → R7 rouge.
6. Remettre un lien vers `/strategie-ia-pme` après la 301 → R1 rouge.

### 3.5 Le juge actuel sous la nouvelle architecture

La règle globale interdit d'assouplir un check **pour le faire passer** ; elle demande d'encoder la règle en vigueur. Quand l'architecture change, une assertion se **ré-encode** si la règle change, et chaque ré-encodage est listé dans l'ADR 0008 avec sa raison. Relevé :

| Assertion existante | Sous S3 révisé |
|---|---|
| Essaim → `/serveur-mcp-odoo` ; MA-3 ; MA-4 ; MA-4b ; MA-6 ; MA-8 | inchangées : déjà conformes (même silo, pont, ou lien vers un pilier) |
| Liste workflow (atelier, prompt-audit… → `claude-code-odoo-workflow`) ; MA-1 ; MA-4c | inchangées : le workflow et le logiciel construit par agents sont des ponts **par leur contenu** (§ 2.8) |
| MA-2 (`agent-ia-dirigeant-pme` → satellites Odoo) | inchangée : la source est dans le hub, qui fait la transversale |
| MA-5 (réciproques `serveur-mcp-odoo` ↔ atelier) | inchangée : l'URL de l'atelier ne change plus |
| Liste workflow, entrée `blog/prompt-audit-projet-claude-fable` ; MA-8, entrée `automatiser-emails-reseaux-sociaux-ia` | inchangées (la seconde vient désormais du hub, qui peut lier le sous-pilier) |
| `discover-news.test.ts`, `NEWS_SLUGS` (liste fermée qui contient `bilan-ia-janvier-juillet-2026`) | **à ré-encoder** si le journal absorbe le bilan (étape 6 du § 7) : retrait du slug, ou le journal devient l'entrée « news » ; décision dans l'ADR |

## 4. Outils tiers

**Critère** : demande mesurée (suggestions FR sur le sujet, formulation PME) × preuve terrain 🟢 × cohérence avec le geste vendu (intégrer, former). **Silo** = demande forte en mots de PME + offre + au moins 3 preuves ; **satellite** = au moins 1 preuve 🟢 et cohérence ; **hors scope** sinon (cité au mieux dans `/integration-mcp`).

| Outil | Demande (2026-10-23) | Preuve 🟢 | Décision |
|---|---|---|---|
| **Odoo 20 natif** (MCP, agents, crédits IAP) | « odoo claude » 63, « odoo ia » 127 (surtout IAP), « odoo 20 ia » 1 | terrain iaCommerce § 5 | **déjà couvert** par le silo Odoo (`odoo-20-serveur-mcp-agents`, `cout-agent-ia-odoo`) ; pas de page de plus |
| **Claude Cowork** | **265** (prix, tarif, avis, c'est quoi, pme, windows/mac) | configuration Odoo, community manager | **satellite** du silo Claude + **page à créer en priorité** (§ 2.3) ; pas de silo propre (pas d'offre dédiée, cohésion 26 % mesurée en S1) |
| **Chatwoot** | 250, mais en mots de produit (github, docker, self hosted) | assistant client identifié (ADR-011) | **satellite** rattaché à `/integration-mcp`, angle « assistant client qui connaît tes commandes », pas un tutoriel Chatwoot |
| **Modèles locaux** (Qwen, Ollama) | qwen 219 (produit), « ollama entreprise » 9, « ia locale entreprise » 3 | Qwen 27B local en production (iaCommerce) ; fine-tuning outillé, pas en prod | **satellites existants** (`petit-modele-bien-outille` dans Odoo, `ia-souveraine-pme` dans le hub) ; l'angle coût à l'usage reste transversal |
| **n8n / Make** | 283 / 114, marché de freelances (Malt : n8n ×14) | **aucune** | **hors scope** : comparaison dans `/integration-mcp` seulement ; à rouvrir si une mission n8n produit du terrain |
| **HubSpot / Pipedrive** | 90 / 15, surtout du bruit étranger | aucune | **hors scope** : cités dans `/integration-mcp`, comme aujourd'hui |

## 5. Scénarios écartés (matière du `/dialectic`)

Mesures sur le graphe réel : cohésion = part des liens sortants qui restent dans le silo.

| Scénario | Chiffres | Pourquoi écarté |
|---|---|---|
| **S0 · silo unique « intégration IA »** (Odoo + MCP + Claude ensemble) | cohésion 84 % (189 / 224) | Aucune hiérarchie entre `/serveur-mcp-odoo`, le workflow et la formation : c'est exactement le dégât que le juge actuel combat (Google hésite entre les pages, aucune ne passe en page 1). Ne dit pas quelle page porte « formation claude code » |
| **S1 · par outil** (Odoo · Agents & MCP · Claude Code · Cowork · Local) | **130** liens à recâbler ; cohésion 69 / 41 / 49 / **26** / 55 % ; 18 pages liées par moins de 3 pages de leur silo | Coupe le flux MCP → Odoo (30 liens), le plus fort du site ; l'essaim Odoo 20 est par construction à cheval sur Odoo et les agents ; Cowork n'a ni pilier ni offre |
| **S2 · par geste** (Intégrer · Développer · Former · Auditer) | 113 liens à recâbler ; Intégrer 81 % mais Développer **29 %** (4 pages, aucun pilier) | La demande ne se formule pas par geste (« intégration ia pme » = 1 suggestion) ; « Auditer » mélange le local et l'audit IA, déjà fusionné ; le prompt architecture (309 clics) serait partagé entre Développer et Former |
| *S3 première version* (pages C rangées dans Claude d'après leurs cartes) | 48 liens ; Claude 51 % | Classement faux sur le contenu (§ 1, § 9 point 4) : remplacé par S3 révisé |
| **S3 révisé (retenu)** | **38** liens à recâbler (+ 61 autorisés via le hub) ; cohésion Odoo **88 %**, Local 54 %, hub 46 % (il distribue), Claude **33 %** (4 pages) ; 0 page faible côté Odoo | Épouse les deux grappes que le graphe a formées seul ; range chaque page sur son contenu ; donne à la page fusionnée le rôle de hub que sa demande nulle impose. Point faible assumé : le silo Claude est sous-construit face à sa demande |

Objections attendues au `/dialectic` : (1) deux marques tierces portent les deux silos (risque 2 de la note) → le hub porte l'angle neutre (coût à l'usage, souveraineté) ; (2) le pilier formation n'a aucun clic et le silo Claude 3 articles → sa tête de trafic en a 309, R3 + R7 font passer le jus, et la page Cowork est une condition, pas une option ; (3) trois ponts, c'est déjà une brèche → la liste est fermée, justifiée par le contenu et plafonnée par le juge ; (4) un hub de 12 pages qui lie tout, c'est le cluster C rebaptisé → il ne lie ni le local ni le hors maillage, et ses satellites remontent tous au pilier hub avec une ancre unique (R3).

## 6. Indicateurs par silo et calendrier de revue

Point de départ : le crawl est gelé depuis la sanction de juillet ([recrawl](../seo-audits/2026-10-14-recrawl-urls-gelees.md)). Les comparaisons se font **à partir de la mise en ligne**, pas contre la période d'avant la chute.

**Préalable de mesure** : aucun tag `?offer=` / `?source=` n'existe dans le code (l'étape « standardiser les CTA » de l'[ADR 0003](../decisions/0003-funnel-geo-conversion.md) n'a jamais été faite). Sans lui, les indicateurs « contacts attribués » ci-dessous ne se mesurent pas : étape 0 du § 7.

| Silo | Indicateur principal | Requêtes suivies (position GSC) | Seuil de révision à T+90 |
|---|---|---|---|
| Odoo & agents | clics GSC des 14 pages | « serveur mcp odoo », « odoo claude », « claude code odoo », « claude cowork odoo », « coût agent ia odoo » | aucune des 5 en page 1 → revoir le pilier (page « Odoo × Claude » distincte ?) |
| Claude Code & Cowork | contacts `?offer=formation` (après l'étape 0) + clics | « formation claude code » (+ « en français »), « prompt claude code », « claude cowork prix » | pilier formation hors du top 20 sur « formation claude code » **et** 0 contact attribué → rouvrir le choix du pilier (prompt architecture) |
| Hub | citations LLM (limelit, prompts de [geo-prompts.md](../seo-audits/2026-05-21-data/geo-prompts.md)) + recherches de marque + contacts `?source=` du hub | « automatisation ia pme », « agent ia pme », « consultant intégration ia » | 0 citation sur les prompts « intégration IA / Odoo » → revoir l'entité avant le maillage |
| Journal IA (pilote) | citations LLM sur « actualité ia claude », « nouveautés odoo 20 », « actualité ia entreprise » + clics sortants vers les piliers (GA4) | « actualité ia entreprise », « actualité ia claude », « nouveautés odoo 20 » | 0 citation et < 2 entrées/mois tenues au 2026-12-15 → dépublier (301 vers le hub), décision humaine |
| Local | actions fiche Google (appels, itinéraires) ; pas d'objectif SEO | « audit informatique yvelines » (info) | — (ancrage, pas un combat) |
| Maillage (tous) | juge vert ; cohésion recalculée par `node scripts/seo/link-graph.mjs` | — | cible Odoo ≥ 85 %, Local ≥ 80 %, Claude ≥ 50 % (avec la page Cowork), cartes hors périmètre = 0 |

Calendrier : **T0** = mise en ligne après l'ADR 0008 (baseline GSC + link-graph + capture limelit le jour même) ; **T+45** = indexation des 301 et du hub, juge, cohésion ; **T+90** = positions, clics, contacts, citations → seuils ci-dessus.

## 7. Séquence d'implémentation (après l'ADR, pas avant)

0. **Tags de CTA** (`?offer=`, `?source=`) sur les CTA du pilier formation, du hub et des piliers, lus par l'événement GA4 du formulaire : sans eux, le § 6 ne mesure pas les contacts.
1. Registre `src/lib/silos.ts` + champ `silo` du catalog + filtre de `getRelatedArticles()` (R1, R2) : le plus gros gain, sans toucher une page.
2. Juge R1-R10 écrit **en rouge d'abord**, tests négatifs du § 3.4 ; recompter R6 sur le juge (les cartes ne comptent pas dans `sourceRoutes`).
3. Recâblage : les 7 violations (annexe B), les ancres R7, les entrants Claude et hub de R6, les portes R10.
4. Pages : hub par fusion (301 ×2) **et réécriture de tous les liens internes vers les deux anciennes URL** (13 + 13 fichiers dans `src/` et `public/`, sitemap et llms.txt compris) ; renommage de la formation (title, h1, ancres, **même URL**) ; sous-pilier `/integration-mcp` repositionné. `pageOpenGraph()`, sitemap, llms.txt, `seo-hygiene.test.ts`.
5. Page « Claude Cowork pour un dirigeant » (§ 2.3), condition du silo Claude.
6. Mesure T0.
7. Journal IA, **seulement si** le pilote est validé à la revue ADR 0007 du 2026-11-15 : données + page + 301 du bilan (**+ 7 fichiers** qui le lient à réécrire, **+ `NEWS_SLUGS`** de `discover-news.test.ts` à ré-encoder) + R11/R12, amorcé avec 6 entrées.

## 8. Revue croisée (session d'audit, 2026-10-23 au soir)

Chiffres recalculés depuis le TSV avec le découpage S3 : cohésion Odoo 87 % ✅, Claude 47 % (51 % annoncé, écart = cartes comptées), Local 54 % ✅ ; pilier Odoo 13 routes sources dans son silo ✅ ; les 6 liens en dur de l'annexe B retrouvés à l'identique ✅ ; aucune URL du sitemap hors registre ✅ ; `/serveur-mcp-odoo` n'a qu'un lien hors silo (vers l'atelier, pilier ↔ pilier, autorisé) et l'atelier ne lie que les 3 ponts et le pilier Odoo ✅ ; les assertions MA-1, MA-2, MA-4c, MA-5, MA-8 et la liste workflow sont bien couvertes par les ponts et les remontées. **Le plan est juste sur ses mesures.** Sept points à trancher au `/dialectic` ou dans l'ADR :

1. **R12 est inapplicable telle quelle.** `public/sitemap.xml` est un fichier statique (il prime sur `src/app/sitemap.ts`, vérifié en prod le 2026-06-10) : une page ne peut pas « sortir du sitemap au rendu ». Un `noindex` calculé sur une URL encore listée dans le sitemap produit une incohérence que GSC signale, et un `noindex` qui s'allume et s'éteint selon la date fait du flapping d'index. **Proposition** : R12 devient une alerte (test en `warn` ou relevé de la boucle news) et la dépublication reste une décision humaine (301 vers le hub), comme le dit déjà le § 6.
2. **Le coût des 301 est sous-estimé, parce que le juge lit les `href` littéraux.** Après redirection, chaque lien interne vers l'ancienne URL doit être réécrit (sinon R1/R5 voient des `href` hors registre, et Google suit des 301 internes). Relevé : `/strategie-ia-pme` cité dans **17 fichiers**, `/audit-ia-pme` **16**, `/atelier-claude-code-dirigeant` **17**, `/blog/bilan-ia-janvier-juillet-2026` **12** (src, llms, sitemap). Soit ~60 fichiers à toucher, absents des « 48 liens à recâbler » et de l'étape 4 du § 7.
3. **Le 301 de l'atelier n'est pas nécessaire à la décision prise** (« renommer avec les mots cherchés »). Les mots dans l'URL pèsent peu ; title, h1 et ancres (R3, R7) font le travail. Un 301 de plus sur un site en sortie de sanction, 17 fichiers à réécrire, MA-5 à renommer, et « atelier claude » (pos. 3) / « claude code workshop » (pos. 10) perdus le temps de la bascule. **Proposition** : garder l'URL, changer title / h1 / ancres ; ne changer l'URL que si la page est refondue de toute façon.
4. **Le critère « hors maillage » n'est pas écrit, et il sacrifie la meilleure page du cluster C.** `ia-redefinit-vente-commerciale` : 752 impressions, 6 clics sur 16 mois (2e article du cluster par clics) ; `comparatif-llm-vente-commerciale` : 191 / 2. Pendant ce temps `compte-rendu-reunion-ia` (6 impressions, 0 clic) devient satellite Claude. Le critère est donc thématique (vente / BTP), pas de performance : il faut l'écrire. Et la logique « usages Cowork du dirigeant » qui range veille et emails dans Claude vaut aussi pour la vente (ChatGPT / Claude pour prospecter et closer). **Proposition** : les deux pages vente en satellites Claude ou du hub ; BTP et machine-de-guerre hors maillage.
5. **Le hub porte un nom que personne ne tape** (« intégration ia pme » : 1 suggestion) alors que ses satellites portent les requêtes vivantes du cluster : « agent ia pme » 123 impressions, « automatisation ia pme » 49. Le plan le sait (§ 1) et assume un hub « d'identité et de conversion ». **Proposition** : que le title et le h1 du hub portent « agent IA » et « automatisation » pour PME, l'expression « intégration IA » restant l'ancre interne (R3). Et R6 « hub ≥ 8 routes sources » n'est atteignable que par la réécriture du point 2 (aujourd'hui 1 route source dans le silo).
6. **« Aucune assertion relâchée » est une contrainte mal posée.** La règle globale interdit d'assouplir un check *pour le faire passer* ; elle demande d'encoder la règle réellement en vigueur. Si l'architecture change, ré-encoder MA-1 ou MA-4c n'est pas un relâchement. Les trois pages-ponts sont justifiées par le contenu (elles parlent autant de Claude que d'Odoo) : qu'elles le soient pour ça, pas pour sauver trois assertions. Même logique pour `NEWS_SLUGS` (point 7).
7. **Le 301 du bilan vers le journal casse `discover-news.test.ts`** : `NEWS_SLUGS` est une liste fermée `["bilan-ia-janvier-juillet-2026", "odoo-20-serveur-mcp-agents"]` avec égalité `datePublished` = `dateISO` lu dans la `page.tsx` ; page supprimée = test rouge. À ré-encoder dans l'étape 6 du § 7 (retrait du slug, ou le journal devient lui-même l'entrée « news » du bilan).

Deux préalables de mesure, hors plan : (a) l'indicateur principal du silo Claude est « contacts `?offer=formation` », mais **aucun tag `?offer=` / `?source=` n'existe dans le code** (l'étape « standardiser les CTA » de l'ADR 0003 n'a jamais été faite) ; (b) le filtre R2 va faire remonter les entrants des satellites Claude par les cartes : recompter R6 après l'étape 1 du § 7 avant d'écrire « ~8 liens à la main ».

## 9. Réponses à la revue croisée (2026-10-23, session du brainstorm)

Chaque point vérifié dans le code ou dans GSC avant d'être tranché. Les corrections sont reportées dans les sections citées.

| Point | Verdict | Ce qui change |
|---|---|---|
| 1 · R12 inapplicable | **Intégré.** Sitemap statique confirmé (`public/` prime sur `src/app/sitemap.ts`) | R12 devient une alerte non bloquante ; dépublication humaine (§ 2.9, § 3.2) |
| 2 · coût des 301 sous-estimé | **Intégré, recompté.** Liens en dur relevés dans `src/` et `public/` : `/strategie-ia-pme` 13 fichiers, `/audit-ia-pme` 13, bilan 7 ; l'atelier (14) sort du compte avec le point 3. Coût réel : **26 fichiers** pour la fusion, + 7 si le journal part | R1 interdit tout `href` vers une 301 ; étapes 4 et 7 du § 7 chiffrées ; test négatif n° 6 |
| 3 · 301 de l'atelier inutile | **Intégré** (ma proposition retirée). Le renommage se fait par title, h1 et ancres ; l'URL reste | § 2.3 ; MA-5 n'a plus à être renommée. Positions « atelier claude » citées par la revue non revérifiées : la décision tient sans elles |
| 4 · critère hors maillage absent, page vente sacrifiée | **Intégré, et plus loin que la revue.** GSC confirme 752 / 6 et 191 / 2. Vérifié aussi que mon classement « usages Cowork » était faux : la veille ne cite ni Claude ni Cowork, le compte rendu parle de ChatGPT | Critère écrit (§ 2.0). Les 2 pages vente, la veille, les emails, le compte rendu et le contradicteur vont **au hub**, pas dans Claude : leur outil est indifférent. Hors maillage réduit à 2 pages. Le silo Claude tombe à 3 articles, d'où la page Cowork en condition |
| 5 · nom du hub sans demande | **Intégré en partie.** Title et h1 portent « automatisation IA » pour PME, requête héritée par la 301 de `/strategie-ia-pme`. **Refusé pour « agent IA PME »** : la requête est portée par `agent-ia-dirigeant-pme` (123 impr.) ; la mettre aussi dans le title du hub recréerait la cannibalisation que le juge combat | § 2.1 ; R6 hub atteint par la réécriture du point 2 |
| 6 · « aucune assertion relâchée » mal posé | **Intégré.** Ré-encoder une assertion quand la règle change n'est pas un relâchement, à condition de le tracer dans l'ADR | § 3.5 réécrit ; ponts justifiés par leur contenu (§ 2.8) |
| 7 · `NEWS_SLUGS` | **Intégré.** Liste fermée confirmée (ligne 129 de `discover-news.test.ts`) | § 3.5 et étape 7 du § 7 |
| (a) pas de tag `?offer=` | **Intégré.** Aucun `?offer=` ni `?source=` dans `src/` | Préalable du § 6, étape 0 du § 7 |
| (b) le filtre des cartes fera remonter les entrants Claude | **Réfuté par la mesure.** Simulation du filtre : 1 carte entrante pour le prompt architecture, 1 pour l'audit, 0 pour Cowork ; les cartes partent vers les ponts. Et R6 compte les liens en dur (`sourceRoutes`), où les cartes n'entrent pas | R6 garde des liens écrits à la main ; recomptage à l'étape 2 du § 7 sur le juge, pas sur les cartes |

Chiffres du découpage révisé (même TSV) : 38 liens transverses à recâbler (+ 61 via le hub), 7 violations en dur, cohésion Odoo 88 %, Local 54 %, hub 46 %, Claude 33 %.

## Annexe A — demande par graine (2026-10-23)

Suggestions Google FR distinctes, graine + 9 modificateurs + a-z, `hl=fr&gl=fr`, sans clé (méthode de `scripts/seo/autocomplete-map.mjs`).

| Graine | Suggestions | Exemples |
|---|---|---|
| claude code | 301 | install, pricing, prix france, prix abonnement |
| claude cowork | 265 | windows, prix, c'est quoi, tarif, pme, france |
| n8n | 283 | workflow, ai agent, c'est quoi, pricing, mcp |
| serveur mcp | 264 (37 sur le sujet) | c'est quoi, liste, claude, local, france |
| chatwoot | 250 | github, open source, self hosted, whatsapp |
| qwen | 240 | 3.8, ai, code, prix |
| make automatisation | 203 (114 sur le sujet) | ia, exemple, prix, agence |
| odoo ia | 129 | iap, iap credits, ai integration, agent ia |
| hubspot ia | 90 | ai, agent ia, crm |
| odoo claude | 63 | mcp, connector, claude code, skill, cowork, plugin |
| formation claude code | 19 | anthropic, cpf, en français, paris, en ligne |
| claude code odoo | 17 | skill, odoo sh, mcp, 19, plugin |
| pipedrive ia | 15 | surtout du bruit |
| ollama entreprise | 9 | enterprise license, pricing |
| agent ia pme | 4 | agent ia pour pme |
| ia locale entreprise | 4 | — |
| intégration ia pme | 1 | — |
| odoo 20 ia | 1 | — |

## Annexe B — liens en dur à corriger sous S3 révisé (relevé du 2026-10-23)

| Règle | Lien | Ancre |
|---|---|---|
| R8 | `bilan-ia-janvier-juillet-2026` (hub) → `cybersecurite-pme-guide-pratique` | « guide cybersécurité PME — 93 % des attaques… » |
| R8 | `bilan-ia-janvier-juillet-2026` (hub) → `nis2-pme-yvelines-val-doise` | « notre guide NIS2 avec checklist de conformité » |
| R8 | `veille-concurrentielle-ia-pme` (hub) → `nis2-pme-yvelines-val-doise` | « NIS2 en 2025 » |
| R8 | `rapport-adoption-ia-btp-francilien-2026` (hors) → `5-signes-moderniser-informatique-pme` | « modernisation informatique générale » |
| R8 | `rapport-adoption-ia-btp-francilien-2026` (hors) → `cout-audit-informatique-yvelines` | « audit IT préalable » |
| R9 | `ia-redefinit-vente-commerciale` (hub) → `machine-de-guerre-commerciale` | « la machine de guerre en rénovation énergétique » |
| R9 | `comparatif-llm-vente-commerciale` (hub) → `machine-de-guerre-commerciale` | « canal d'acquisition propriétaire » |

Les liens de la première version (contradicteur → pages vente, compte rendu → guide MCP) deviennent conformes : ils partent désormais du hub. Les 17 liens hub → satellites Odoo/Claude sont autorisés (le hub fait la transversale).
