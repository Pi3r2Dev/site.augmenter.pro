---
date: 2026-10-23
slug: architecture-silos
status: proposé — entrée du `/dialectic`, puis de l'ADR 0008
sources: docs/sessions/2026-10-23-brainstorm-silos-maillage.md
---

# Architecture de silos et circulation du jus — repositionnement « intégration IA / Odoo / Claude Code »

Plan issu du brainstorm du 2026-10-23. **Rien n'est implémenté** : ce document nourrit le `/dialectic`, la mesure GEO et l'ADR 0008. Les orientations du [§ 7 bis de la note positionnement](../seo-audits/2026-10-23-positionnement-integration-ia.md) ne sont pas rouvertes.

## 0. Décision proposée, en une ligne

**Scénario hybride (S3)** : une page hub « intégration IA PME » au-dessus, deux silos d'outil (**Odoo & agents**, **Claude Code & Cowork**), un silo **local** fermé, quatre pages hors maillage. Il demande de recâbler 48 liens entre silos ; le plus gros levier est le calcul des cartes « À lire ensuite », pas la réécriture des articles.

## 1. Ce que dit le graphe actuel (base de chiffrage)

Source : [maillage-interne.tsv](../seo-audits/2026-10-23-data/maillage-interne.tsv) (735 liens rendus, hors header/footer/nav), reclassé page par page ; [suggestions Google FR](#annexe-a--demande-par-graine-2026-10-23) relevées le jour même.

| Constat | Chiffre | Conséquence |
|---|---|---|
| Les cartes « À lire ensuite » (`getRelatedArticles()`) font 93 liens ; 21 articles sur 31 n'ont pas de liste `related` et sont scorés sur douleurs et secteurs communs | **59 / 93 cartes sortent du silo** ; les 4 articles cyber/audit envoient 11 cartes sur 12 vers Odoo/MCP | Invisible pour le juge (lien rendu depuis des données), mais la fonction est pure donc testable : **levier n°1** |
| Liens écrits en dur entre pages de silo | 198, dont **13** violeraient S3 (6 après autorisation des remontées vers le hub) | Le recâblage manuel est petit |
| MCP / agents (9 pages) envoie 30 liens à Odoo, en reçoit 16 ; cohésion 31 % | Pas un silo autonome : un affluent d'Odoo | Fusion dans le silo Odoo |
| Odoo × IA (8 pages) reçoit 150 liens, le plus gros aimant | `/serveur-mcp-odoo` liée par 18 pages, ancre canonique tenue | Pilier déjà en place |
| Sur les 51 liens D→C, 49 viennent de pages-listes (`/a-propos`, hub ressources, `/blog`, plan du site) | 2 seulement sont éditoriaux | Les listes sont exemptées des règles ; le flux tombe de lui-même |
| « intégration ia pme » : **1** suggestion ; « agent ia pme » : **4** | En face : « claude code » 301, « claude cowork » 265, « odoo claude » 63 | La page fusionnée est un **hub** d'identité et de conversion, pas une tête de requête |

## 2. Silos retenus

Registres : pages commerciales et piliers en **tu**, articles de fond en **vous** (charte § 3.3). Confidentialité : Reva 9 en 🟢 uniquement, iaCommerce jamais nommé (🟠).

### 2.1 Hub — « Intégration IA PME » (au-dessus des silos)

| Rôle | Page | Statut |
|---|---|---|
| **Pilier hub** | `/integration-ia-pme` *(URL proposée, à figer dans l'ADR)* | **à créer** par fusion ; **301** depuis `/strategie-ia-pme` et `/audit-ia-pme` (décision déjà prise) |
| Satellites | `/blog/agent-ia-dirigeant-pme` (porte « agent ia pme », 123 impr., pos. 16), `/blog/ma-pme-en-2027`, `/ia-souveraine-pme`, `/blog/patron-goulot-paradoxe-ia-dirigeant-pme`, `/blog/bilan-ia-janvier-juillet-2026` (absorbé par le journal IA si le pilote part, § 2.9) | existants |

Le hub **distribue** : il lie les deux piliers, le sous-pilier MCP et peut lier n'importe quel satellite. Tout silo peut **remonter** vers une page du hub.

### 2.2 Silo « Odoo & agents » — 14 pages

| Rôle | Page | Statut |
|---|---|---|
| **Pilier** | `/serveur-mcp-odoo` | existant (13 routes sources dans le silo) |
| **Sous-pilier** « brancher l'IA sur tes autres outils » | `/integration-mcp` | existant, **repositionné** : il accueille les outils tiers (§ 4) ; ancre canonique déjà imposée (« intégration MCP pour PME ») |
| Satellites Odoo | `configurer-odoo-ia-claude-cowork`, `claude-code-odoo-workflow`, `odoo-online-ce-que-vous-ne-pouvez-pas-installer`, `odoo-20-serveur-mcp-agents`, `cout-agent-ia-odoo`, `agent-ia-qui-ne-touche-pas-aux-prix`, `ia-enrichir-catalogue-sans-perdre-la-main` | existants |
| Satellites MCP / agents | `serveur-mcp-guide-pratique-pme`, `serveur-mcp-heberge-pme`, `serveur-mcp-integration-crm-erp`, `petit-modele-bien-outille`, `logiciel-construit-par-agents-dix-semaines` | existants |
| À créer (file d'attente, pas d'engagement) | Assistant client sur le site branché sur Odoo (Chatwoot, ADR-011 iaCommerce 🟢) → rattaché au sous-pilier ; angles terrain Reva 9 n° 2 (piège de l'unité de mesure), n° 3 (FEC mensuel), n° 11 (facturation électronique, fraîcheur) | proposés |

### 2.3 Silo « Claude Code & Cowork » — 8 pages + bibliothèque

| Rôle | Page | Statut |
|---|---|---|
| **Pilier** | page formation « formation Claude Code pour dirigeants » | existant `/atelier-claude-code-dirigeant`, **renommé** (décision prise). URL proposée `/formation-claude-code-dirigeant` + **301** : 185 impr. / 0 clic, peu de capital à perdre, et l'URL porte les mots cherchés. À figer dans l'ADR |
| **Tête de trafic** | `/blog/claude-code-prompt-architecture` (309 clics sur 16 mois) | existant ; doit lier le pilier avec l'ancre canonique |
| Satellites | `prompt-audit-projet-claude-fable`, `ia-contradicteur-prompts-dirigeant-pme`, `claude-cowork-community-manager`, `compte-rendu-reunion-ia`, `veille-concurrentielle-ia-pme`, `automatiser-emails-reseaux-sociaux-ia` | existants (les trois derniers viennent du cluster C, usages Cowork du dirigeant) |
| Bibliothèque | `/prompts` | page-liste exemptée des interdits, mais doit lier le pilier |
| À créer | « Claude Cowork pour un dirigeant : prix, ce qu'il fait, ce qu'il ne fait pas » (demande : cowork prix, tarif, avis, c'est quoi, pme ; preuves 🟢 : configuration Odoo, community manager) | proposé |

### 2.4 Silo local — fermé, 6 pages

`/audit-informatique-yvelines`, `/audit-informatique-val-doise`, `cout-audit-informatique-yvelines`, `nis2-pme-yvelines-val-doise`, `cybersecurite-pme-guide-pratique`, `5-signes-moderniser-informatique-pme`. Ancrage léger (décision prise) : alimenté par la structure (nav, `/approche`, plan du site, fiche Google), ne reçoit rien des silos nationaux, n'envoie rien vers leurs satellites. Pas de pilier imposé.

### 2.5 Hors maillage — 4 pages, restent en ligne

`ia-redefinit-vente-commerciale`, `comparatif-llm-vente-commerciale`, `machine-de-guerre-commerciale`, `rapport-adoption-ia-btp-francilien-2026`. Liées seulement depuis les pages-listes ; aucune page de silo ne les lie ; leurs cartes ne pointent qu'entre elles. Candidates à une fusion ou une dépublication plus tard, hors de ce plan.

### 2.6 Recyclage du cluster C (11 pages)

| Page | Destination |
|---|---|
| `/strategie-ia-pme`, `/audit-ia-pme` | fusion → pilier hub (301) |
| `patron-goulot-paradoxe-ia-dirigeant-pme`, `bilan-ia-janvier-juillet-2026` | satellites du hub |
| `compte-rendu-reunion-ia`, `veille-concurrentielle-ia-pme`, `automatiser-emails-reseaux-sociaux-ia` | satellites Claude (usages Cowork) |
| les 4 pages vente / BTP | hors maillage (§ 2.5) |

### 2.7 Pages de structure

- **`/` et `/approche`** : récit de marque, hors silo. Rôle : porte d'entrée vers le hub et les deux piliers (règle R10). Ils restent en vous.
- **Pages-listes exemptées** des interdits (elles listent tout par construction) : `/blog`, `/idees`, `/prompts`, `/augmenter-mon-entreprise`, `/plan-du-site`, `/a-propos`, `/projets`. Note hors règle : `/a-propos` liste tout le catalogue (69 liens) ; la resserrer sur les piliers et les preuves concentrerait le jus, chantier non bloquant.
- **Utilitaires** : `/contact`, `/auteur/pierre-legrand`, liables depuis partout.

### 2.8 Pages-ponts Odoo ↔ Claude (liste fermée)

`claude-code-odoo-workflow`, `configurer-odoo-ia-claude-cowork`, `logiciel-construit-par-agents-dix-semaines`. Elles appartiennent au silo Odoo mais traitent de Claude Code autant que d'Odoo : elles peuvent **recevoir** des liens des deux silos et **lier** les deux silos. Sans elles, trois assertions du juge actuel (MA-1, MA-4c, liste workflow) contrediraient le découpage. Liste plafonnée à 3 (règle R5).

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
| **Tenue** | 2 entrées par mois minimum ; relevé automatisable (boucle news `PROMPT-news.md`, Firecrawl sur les notes de version), **verdict humain** | Une page vivante abandonnée fait plus de mal que pas de page |
| **Pilote** | 3 mois, calé sur la revue de l'ADR 0007 (2026-11-15, arrêt possible le 2026-12-15) | Mesuré en citations LLM et en clics vers les piliers, pas en trafic propre |

## 3. Règles de maillage testables

À encoder dans [`maillage-cluster.test.ts`](../../src/lib/maillage-cluster.test.ts) (ou un juge frère `maillage-silos.test.ts` qui réutilise ses extracteurs).

### 3.1 Modèle de données (préalable)

- **`src/lib/silos.ts`** : registre unique. `SILOS = { hub, odoo, claude, local, hors }`, chacun avec `pilier`, `sousPiliers`, `ancreCanonique`, `pages` (routes non-articles) ; `PONTS` (§ 2.8) ; `EXEMPTES` (listes + utilitaires + `/` + `/approche`).
- **Catalog** (`src/data/resources.ts`) : champ **`silo` obligatoire** sur `CatalogArticle` (le typage TS refuse un article sans silo).
- **`getRelatedArticles()`** : filtre par silo avant le score (règle R2), repli sur le hub si le silo n'a pas assez d'articles.

### 3.2 Assertions

Deux familles de mesure : **(L)** liens écrits en dur, lus par le walk existant (`routeLinks`, `sourceRoutes`, `anchorsTo`) ; **(C)** appel direct de fonctions du catalog. Une ancre se compare sans tenir compte de la casse.

| ID | Assertion | Mesure | Seuil | État actuel |
|---|---|---|---|---|
| **R1** Registre complet | Chaque URL de `public/sitemap.xml` appartient à exactement un silo ou à `EXEMPTES` ; chaque article du catalog a un `silo` cohérent avec le registre | registre + sitemap | 0 URL orpheline, 0 double appartenance | à créer |
| **R2** Cartes dans le silo | Pour tout article : `getRelatedArticles(slug, 3)` renvoie 3 articles, tous du même silo. Exceptions : un pont reçoit `odoo ∪ claude` ; un article du hub reçoit `hub ∪ odoo ∪ claude` ; un article `hors` ne reçoit que `hors` | (C) | 3 cartes, 0 hors silo | **59 / 93 hors silo** |
| **R3** Satellite → pilier | Chaque page d'un silo (pilier exclu) lie son pilier en dur, avec l'ancre canonique : Odoo « serveur MCP pour Odoo », Claude « formation Claude Code », hub « intégration IA » ; satellites MCP rattachés : « intégration MCP pour PME » vers le sous-pilier accepté à la place | (L) | 100 % des pages du silo | Odoo : déjà vrai pour l'essaim (MA-3, landing) ; Claude : à faire ; Local : non concerné |
| **R4** Pilier → satellites | Chaque pilier lie au moins 3 satellites de son silo + le pilier hub ; vers un autre silo, il ne lie que l'autre pilier (pont pilier ↔ pilier, MA-5) | (L) | ≥ 3 / 0 satellite d'un autre silo | `/serveur-mcp-odoo` OK ; formation à vérifier |
| **R5** Pas de lien transverse | Une page du silo X ne lie en dur aucune page du silo Y ≠ X, sauf : une page du hub (remontée) ; le pilier ou sous-pilier de Y ; un pont, si X et Y ∈ {odoo, claude}. Le hub lie tout. Local et hors ne lient que leur silo, le hub et `EXEMPTES` | (L) | **0 violation** ; `PONTS.length ≤ 3` | **6 violations** (annexe B) |
| **R6** Entrants minimum | Pilier Odoo ≥ 12 routes sources dans son silo ; pilier Claude ≥ 5 ; pilier hub ≥ 8 routes sources, tous silos confondus ; chaque satellite ≥ 2 routes sources dans son silo ; l'essaim garde ≥ 3 routes sources (MA-4c, inchangé) | (L) `sourceRoutes` | seuils ci-contre | Odoo 13 ✅ ; Claude 2 ❌ ; satellites Claude à 0-1 : contradicteur, community manager, compte rendu, veille, emails ❌ ; Local ✅ |
| **R7** Ancres canoniques | **Toutes** les ancres en dur vers un pilier contiennent son ancre canonique (même mécanique que MA-8 pour le workflow) ; aucune ancre réduite à « Voir », « Voir les ateliers », « MCP » | (L) `anchorsTo` | 0 ancre hors canon | Odoo : 1 écart (« serveur MCP métier pour Odoo ») ; formation : « Voir les ateliers » ×7 ❌ |
| **R8** Local étanche | Aucune page `odoo`, `claude`, `hors` ne lie une page `local` ; une page `local` ne lie aucun satellite national | (L) + R2 | 0 | 1 lien Claude → local, 2 hors → local (annexe B) |
| **R9** Hors maillage | Aucune page de silo ni du hub ne lie une page `hors` | (L) | 0 | 2 liens Claude → hors |
| **R10** Portes d'entrée | `/` et `/approche` lient en dur le pilier hub, `/serveur-mcp-odoo` et le pilier formation, avec leurs ancres canoniques | (L) | 3 / 3 par page | `/` lie `/integration-mcp` (« Intégrations profondes ») mais aucun pilier ❌ |
| **R11** Journal sourcé | Chaque entrée de `journal-ia.ts` a une date ISO, une URL source `https` hors `augmenter.pro`, un `silo` ∈ {hub, odoo, claude}, un verdict de l'énumération ; la page rend le lien vers le pilier de chaque silo cité ; `dateModified` = max des dates | (C) + (L) | 0 entrée incomplète | à créer |
| **R12** Journal tenu | La dernière entrée a moins de **45 jours** ; au-delà, la page passe d'elle-même en `noindex` et sort du sitemap (calculé au rendu, pas un test qui rougit le CI à date fixe) | (C) | 45 j | à créer |

### 3.3 Garde-fous anti-vacuum (obligatoires)

- Le registre couvre **≥ 45** URL du sitemap, et le sitemap en contient ≥ 45 (sinon un glob cassé passe au vert).
- Chaque silo national compte au moins N pages : odoo ≥ 12, claude ≥ 6, local ≥ 5, hub ≥ 4.
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

### 3.5 Compatibilité avec le juge actuel

Aucune assertion n'est relâchée.

| Assertion existante | Sous S3 |
|---|---|
| Essaim → `/serveur-mcp-odoo` ; MA-3 ; MA-4 ; MA-4b ; MA-6 ; MA-8 | intactes (même silo, ou pont, ou lien vers un pilier) |
| Liste workflow (atelier, prompt-audit… → `claude-code-odoo-workflow`) ; MA-1 ; MA-4c | intactes grâce aux pages-ponts (§ 2.8) |
| MA-2 (`agent-ia-dirigeant-pme` → satellites Odoo) | intacte : la source est dans le hub, qui lie tout |
| MA-5 (réciproques `serveur-mcp-odoo` ↔ atelier) | intacte (pilier ↔ pilier) ; **la route change** si l'URL formation change : on renomme la route dans le test, l'assertion reste la même |
| MA-8 (`automatiser-emails…` → `/integration-mcp`) | intacte : lien vers le sous-pilier d'un autre silo |

## 4. Outils tiers

**Critère** : demande mesurée (suggestions FR sur le sujet, formulation PME) × preuve terrain 🟢 × cohérence avec le geste vendu (intégrer, former). **Silo** = demande forte en mots de PME + offre + au moins 3 preuves ; **satellite** = au moins 1 preuve 🟢 et cohérence ; **hors scope** sinon (cité au mieux dans `/integration-mcp`).

| Outil | Demande (2026-10-23) | Preuve 🟢 | Décision |
|---|---|---|---|
| **Odoo 20 natif** (MCP, agents, crédits IAP) | « odoo claude » 63, « odoo ia » 127 (surtout IAP), « odoo 20 ia » 1 | terrain iaCommerce § 5 | **déjà couvert** par le silo Odoo (`odoo-20-serveur-mcp-agents`, `cout-agent-ia-odoo`) ; pas de page de plus |
| **Claude Cowork** | **265** (prix, tarif, avis, c'est quoi, pme, windows/mac) | configuration Odoo, community manager | **satellite** du silo Claude + 1 page à créer (§ 2.3) ; pas de silo propre (3 pages, pas d'offre dédiée, cohésion 26 % mesurée en S1) |
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
| **S3 · hybride (retenu)** | **48** liens à recâbler (+ 59 autorisés via le hub) ; cohésion Odoo **87 %**, Claude 51 %, Local 54 % ; 0 page faible côté Odoo | Épouse les deux grappes que le graphe a formées seul ; donne à la page fusionnée le rôle de hub que sa demande nulle impose. Point faible assumé : le silo Claude est à renforcer (R6) |

Objections attendues au `/dialectic` : (1) deux marques tierces portent les deux silos (risque 2 de la note) → le hub porte l'angle neutre (coût à l'usage, souveraineté) ; (2) le pilier formation n'a aucun clic → sa tête de trafic en a 309, et R3 + R7 font passer le jus ; (3) trois ponts, c'est déjà une brèche → la liste est fermée et plafonnée par le juge.

## 6. Indicateurs par silo et calendrier de revue

Point de départ : le crawl est gelé depuis la sanction de juillet ([recrawl](../seo-audits/2026-10-14-recrawl-urls-gelees.md)). Les comparaisons se font **à partir de la mise en ligne**, pas contre la période d'avant la chute.

| Silo | Indicateur principal | Requêtes suivies (position GSC) | Seuil de révision à T+90 |
|---|---|---|---|
| Odoo & agents | clics GSC des 14 pages | « serveur mcp odoo », « odoo claude », « claude code odoo », « claude cowork odoo », « coût agent ia odoo » | aucune des 5 en page 1 → revoir le pilier (page « Odoo × Claude » distincte ?) |
| Claude Code & Cowork | contacts `?offer=formation` + clics | « formation claude code » (+ « en français »), « prompt claude code », « claude cowork prix » | pilier formation hors du top 20 sur « formation claude code » **et** 0 contact attribué → rouvrir le choix du pilier (prompt architecture) |
| Hub | citations LLM (limelit, prompts de [geo-prompts.md](../seo-audits/2026-05-21-data/geo-prompts.md)) + recherches de marque | « agent ia pme », « automatisation ia pme », « consultant intégration ia » | 0 citation sur les prompts « intégration IA / Odoo » → revoir l'entité avant le maillage |
| Journal IA (pilote) | citations LLM sur « actualité ia claude », « nouveautés odoo 20 », « actualité ia entreprise » + clics sortants vers les piliers (GA4) | « actualité ia entreprise », « actualité ia claude », « nouveautés odoo 20 » | 0 citation et < 2 entrées/mois tenues au 2026-12-15 → dépublier (301 vers le hub) |
| Local | actions fiche Google (appels, itinéraires) ; pas d'objectif SEO | « audit informatique yvelines » (info) | — (ancrage, pas un combat) |
| Maillage (tous) | juge vert ; cohésion recalculée par `node scripts/seo/link-graph.mjs` | — | cible Odoo ≥ 85 %, Claude ≥ 70 %, Local ≥ 80 %, cartes hors silo = 0 |

Calendrier : **T0** = mise en ligne après l'ADR 0008 (baseline GSC + link-graph + capture limelit le jour même) ; **T+45** = indexation des 301 et du hub, juge, cohésion ; **T+90** = positions, clics, contacts, citations → seuils ci-dessus.

## 7. Séquence d'implémentation (après l'ADR, pas avant)

1. Registre `src/lib/silos.ts` + champ `silo` du catalog + filtre de `getRelatedArticles()` (R1, R2) : le plus gros gain, sans toucher une page.
2. Juge R3-R10 écrit **en rouge d'abord**, tests négatifs du § 3.4.
3. Recâblage : les 6 violations, les ancres R7, les entrants Claude R6 (~8 liens), les portes R10.
4. Pages : hub par fusion (301 ×2), renommage formation (301), sous-pilier `/integration-mcp` repositionné. `pageOpenGraph()`, sitemap, llms.txt, `seo-hygiene.test.ts`.
5. Mesure T0.
6. Journal IA, **seulement si** le pilote est validé à la revue ADR 0007 du 2026-11-15 : données + page + 301 du bilan + R11/R12, amorcé avec 6 entrées.

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

## Annexe B — liens en dur à corriger sous S3 (relevé du 2026-10-23)

| Règle | Lien | Ancre |
|---|---|---|
| R9 | `ia-contradicteur-prompts-dirigeant-pme` → `comparatif-llm-vente-commerciale` | « comparatif LLM » |
| R9 | `ia-contradicteur-prompts-dirigeant-pme` → `ia-redefinit-vente-commerciale` | « accompagnement de la fonction commerciale » |
| R5 / R8 | `veille-concurrentielle-ia-pme` → `nis2-pme-yvelines-val-doise` | « NIS2 en 2025 » |
| R5 | `compte-rendu-reunion-ia` → `serveur-mcp-guide-pratique-pme` | « guide des serveurs MCP pour PME » (→ remplacer par le sous-pilier `/integration-mcp`) |
| R8 | `rapport-adoption-ia-btp-francilien-2026` → `5-signes-moderniser-informatique-pme` | « modernisation informatique générale » |
| R8 | `rapport-adoption-ia-btp-francilien-2026` → `cout-audit-informatique-yvelines` | « audit IT préalable » |

Les 7 autres écarts relevés sont des liens vers une page du hub (`bilan-ia…`, `agent-ia-dirigeant-pme`, `patron-goulot…`, `ia-souveraine-pme`), autorisés par R5. Les liens `hors → local` relèvent de R8 : une page hors maillage reste en ligne mais ne nourrit pas le silo local.
