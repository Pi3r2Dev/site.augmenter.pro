# Positionnement : du « consultant IA 78/95 » à la référence intégration IA / Odoo — note de recherche

Date : 2026-10-23. Statut : **recherche**, pas décision. Nourrit une future ADR 0008. Prolonge [ADR 0003](../decisions/0003-funnel-geo-conversion.md) (persona dirigeant tech-curieux, mesure d'abord) et le pivot du 2026-05-28 (local = fiche Google, effort sur le national tech).

## Résumé

- Le postulat obsolète n'est pas « le géographique », c'est **« le SEO produit des devis »**. Les 3-4 devis/mois viennent de la recommandation ([playbook](../playbooks/acquisition-devis.md)).
- Sur 16 mois, le cluster **intégration IA / Odoo / dev** fait **84 % des clics** du site (503 / 597). Le cluster **local / audit IT** en fait **15**, pour 8 666 impressions.
- La demande se formule **par outil** (Odoo, Claude, Cowork, MCP, agent IA, n8n), jamais par « sur mesure » ni « intégration IA ». Autour du local, Google n'a presque rien à suggérer.
- La niche francophone « Claude × Odoo pour PME » est **naissante, pas vide** : un partenaire Gold (Nalios, 13 agences) y est déjà. Personne n'y combine terrain tracé, coût à l'usage et Claude Code.
- Le site **se décrit encore en local** là où les machines le lisent : JSON-LD `Organization` / `LocalBusiness` (78/95, « Robotique », ni Odoo ni Claude ni MCP). `llms.txt` et la fiche auteur, eux, sont déjà alignés.

## 1. Notre portefeuille — 50 pages, 16 mois GSC (2025-06-23 → 2026-10-22)

| Cluster | Pages | Impr. | Clics | Avant la chute (03-01 → 07-10) | Après (07-24 → 10-22) |
|---|---|---|---|---|---|
| A · intégration IA / Odoo / dev | 23 | 14 521 | **503** | 13 556 / 491 | 420 / 6 |
| B · local / audit IT / cyber | 6 | 8 666 | **15** | 7 186 / 13 | 156 / 0 |
| C · IA dirigeant / usages génériques | 11 | 4 188 | 11 | 3 719 / 11 | 78 / 0 |
| D · structure / marque | 10 | 2 577 | 68 | 1 553 / 28 | 457 / 6 |

Lecture :
- 94 % des clics du cluster A viennent de **deux articles** (`claude-code-prompt-architecture` 309, `configurer-odoo-ia-claude-cowork` 164). Les 9 pages de l'essaim MCP / Odoo 20 (2026-10-14) ont 1 à 2 impressions chacune : indexées, pas encore visibles.
- Le cluster B fait des impressions sans clic **même avant la chute** (position 2 sur « audit informatique 78 » = 1 clic pour 2 552 impressions). Le clic local part au Local Pack, pas au lien bleu.
- Le cluster C (« stratégie IA PME », « audit IA PME ») : 4 188 impressions, 11 clics. `/strategie-ia-pme` seule : 2 113 impressions, 0 clic, position 24.
- Depuis la chute, tout est à plat (crawl gelé, cf. [recrawl](2026-10-14-recrawl-urls-gelees.md)) : les comparaisons se font sur la période d'avant.

Top requêtes à clics du cluster A : `prompt claude code` (9 clics, pos. 7), `odoo claude` (8, pos. 7), `claude cowork odoo` (7, **pos. 3**), `claude code odoo` (6, pos. 5), `prompt claude` (5), `claude odoo` (5), `odoo et claude` (5). **8 des 10 premières contiennent « claude », 6 contiennent « odoo ».**

Requêtes formation / cowork / MCP / agent (16 mois) : 58 requêtes, 512 impressions, 8 clics. `agent ia pme` 123 impr. (pos. 16), `automatisation ia pme` 49 (pos. 38, servie par `/strategie-ia-pme`), `hébergement mcp` 38 (pos. 19), `integration mcp entreprise` 31 (pos. 14), `claude cowork prix` 6 (pos. 11). `/atelier-claude-code-dirigeant` : 185 impressions, 0 clic.

## 2. La demande — suggestions Google France, relevées le 2026-10-23

Méthode : pour chaque graine, graine seule + 9 modificateurs (prix, tarif, pme, france, avis, exemple, freelance, comment, pourquoi) + 26 lettres, soit ~180 requêtes par graine, via `suggestqueries.google.com` (`hl=fr&gl=fr`, sans clé). Dédoublonné par cluster.

| Cluster (graines) | Suggestions distinctes | Intentions repérées |
|---|---|---|
| Odoo (intégrateur, consultant, pme, ia, claude, mcp, agent ia, migration, sur mesure, prix) | **712** | prix 57 · technique 24 · hors France 23 · emploi 14 |
| Claude (code entreprise, pme, cowork, mcp, consultant, formation) | **658** | technique 22 · prix 10 · emploi 8 |
| ERP (pme, ia, optimisation, crm ia, logiciel sur mesure, dev sur mesure) | 189 | prix 2 (beaucoup de bruit hors sujet) |
| Agents (agent ia entreprise/pme, automatisation ia pme, n8n, intégration ia) | 124 | emploi 5 (n8n = marché de freelances) |
| **Local** (audit informatique pme/yvelines, consultant ia yvelines, consultant informatique 78, formation ia pme) | **7** | dont 2 pour la Suisse romande |

Ce que ça dit :
- **« développement sur mesure pme »**, **« intégrateur odoo pme »**, **« audit informatique yvelines »** : aucune suggestion. Ces formulations n'existent pas dans la tête des gens.
- **« intégrateur odoo »** se décline en **france, paris, lyon**, belgique, suisse, maroc : la demande est géographique à l'échelle du pays, pas du département.
- **« odoo claude »** se décline en **mcp, connector, claude code, skill, cowork, plugin, api, odoo sh** : exactement notre essaim. **« odoo mcp claude code »** apparaît 4 fois.
- **Claude Cowork** est vivant : pme, prix, tarif, avis, c'est quoi, comment ça marche, exemple, windows/mac.
- **Formation Claude Code** : en français, en ligne, Paris, **CPF**, Anthropic, Udemy. Une demande que l'atelier n'adresse pas en ces termes.
- Sur Odoo, **le prix domine** (57 suggestions) : prix, migration, enterprise → community. Cohérent avec notre angle coût à l'usage.

## 3. Le marché — ce qu'on peut citer et avec quelle prudence

| Source | Chiffres utiles | Prudence |
|---|---|---|
| [Baromètre France Num 2026](https://presse.economie.gouv.fr/barometre-france-num-2026-quatre-tpe-pme-sur-dix-utilisent-desormais-lintelligence-artificielle/) (DGE, communiqué n° 1062 du 2026-09-28, 9 655 entreprises) | 40 % des TPE-PME utilisent l'IA (26 % en 2025, 13 % en 2024) ; **PME : 53 %** ; **19 % paient** (32 % des PME) ; impact positif 68 %, **85 % chez les payants** ; usages : texte/voix/image 34 %, chatbots 24 %, documents 13 %, **automatisation 11 %**, données 9 % ; l'IA est **dernière des priorités numériques 2026-27 (18 %)** derrière facturation électronique (39 %) ; interlocuteur conseil numérique : **expert-comptable 41 % (+23 pts)**, réseaux de prestataires 37 % | Communiqué lu. Ventilation usages et expert-comptable via [ActuIA](https://www.actuia.com/actualite/40-des-tpe-pme-utilisent-lia-mais-19-seulement-la-paient/) et Blog du Modérateur (secondaires). Dépenses IA : abonnements 17 %, formation 5 %, **développements spécifiques 3 %, conseil 2 %** |
| Bpifrance Le Lab, « L'IA dans les PME et ETI françaises » (1 200+ dirigeants) | 32 % utilisateurs ; la moitié des adoptants n'utilise **que des solutions gratuites ou prêtes à l'emploi** ; 43 % n'exploitent pas leurs données ; freins : « coûts jugés élevés », difficulté à trouver des « cas d'usage pertinents », « manque de maturité de l'offre » ; typologie : sceptiques 27 %, bloqués 26 %, expérimentateurs 28 %, innovateurs 19 % ; 73 % des projets impulsés par le dirigeant ; 94 % visent l'optimisation de l'existant | **PDF inaccessible (403)**. Chiffres via [ActuIA](https://www.actuia.com/actualite/lia-dans-les-pme-et-eti-francaises-un-territoire-encore-a-explorer-selon-bpifrance/). L'étude date probablement de **juin 2025**, pas de janvier 2026 (correction par rapport à ce qui a été dit en séance) |
| [Malt Tech Trends 2026](https://pages.malt.com/hubfs/Malt-Tech-Trends-2026/Malt-Tech-Trends-2026-Mini-Report-EN.pdf) (mini-rapport lu en entier) | briefs « AI agents » **×60 vs 2024** ; typologie des projets IA : intégration/orchestration d'API LLM 45 %, RAG 30 %, agents 15 % ; demande IA dans les PME (< 1 000 sal.) « plus que doublée » vs +25 % en grande entreprise ; **n8n ×14**, « de loin la plateforme la plus populaire » ; réglementation IA +380 % | Le mini-rapport **ne donne ni TJM ni coupe < 50 salariés** : les « 82 % n8n < 50 salariés » et « TJM 450 € » cités en séance viennent d'un article de presse (Programmez), pas du rapport |

Ce que ces trois sources disent ensemble : le marché PME est passé de « faut-il ? » à **« on l'utilise gratuitement, de façon générique, sans stratégie, et ça ne touche ni nos données ni nos outils »**. Le conseil et le développement spécifique pèsent 2 à 3 % des dépenses IA : la demande solvable est petite mais c'est précisément celle qui paie, et 85 % des payants sont satisfaits.

## 4. La concurrence francophone

Partenaires Odoo officiels en France ([odoo.com/partners/country/france-74](https://www.odoo.com/fr_FR/partners/country/france-74)) : **143** (16 Gold, 27 Silver, 100 Ready). Marché fragmenté, entrée de gamme pléthorique.

Sur « Odoo + IA / Claude / MCP » en français, quatre acteurs identifiés :

| Acteur | Statut | Ce qu'il dit | Prix | Preuves |
|---|---|---|---|---|
| [Nalios](https://www.nalios.com/en/odoo-ia) | **Gold, 13 agences** | Connexion Claude via MCP (devis, factures, langage naturel) | aucun | exemples illustratifs, aucun cas |
| [Drakkar](https://www.drakkar.io/blog/odoo-x-ia) | partenaire certifié, 80+ projets, Qualiopi | « IA dans Odoo » par cas d'usage, stack Python/LangChain/OpenAI-Anthropic/n8n | **audit 4 000 € HT, prototype 10-25 k€, projet 25-80 k€** | « +15 % productivité » non sourcé |
| [Origin 137](https://o137.ai/odoo-ia) | agence d'ingénierie IA | Odoo + agents métier, MCP, multi-LLM | migration 15-40 k€ | ratios revendiqués sans client |
| [Koïno](https://www.koino.fr/articles/connecter-odoo-agent-ia-pme-industrielle-2026) | cabinet IA/data Paris | MCP = un des 4 chemins | TJM marché 1 200-1 800 € cité | logos grands comptes, cas hors Odoo |

Couche technique open source, **toute anglophone** : [ivnvxd/mcp-server-odoo](https://github.com/ivnvxd/mcp-server-odoo) (406 ★), odoo-claude-mcp, Pantalytics Odoo MCP Pro, modules apps.odoo.com. Un [fil du forum Odoo](https://www.odoo.com/fr_FR/forum/aide-1/native-anthropic-claude-integration-any-timeline-301964) réclame une intégration Claude native.

Agences « agent IA PME » : prix d'appel publics très bas (Skuria audit 690 €, premier agent 990 € ; agent-ia.fr dès 1 900 € + 90-290 €/mois ; Lewis agents dès 450 €). Segment bas de gamme saturé.

**Ce qui manque chez tous** : un cas client avec chiffres vérifiables, un journal de mission daté, les pièges réellement rencontrés, le coût réel à l'usage (crédits IAP Odoo 20 vs machine locale), la voix d'un indépendant qui livre lui-même. C'est exactement le registre de [terrain-odoo-reva9.md](../../.claude/templates/seo/terrain-odoo-reva9.md) et [terrain-iacommerce.md](../../.claude/templates/seo/terrain-iacommerce.md), sous leurs règles de confidentialité.

## 5. Ce que le site dit de lui-même (relevé prod 2026-10-23)

| Où | Ce qui est dit | Aligné ? |
|---|---|---|
| `llms.txt` | « Consultant IA pour dirigeants PME : Claude Code, Odoo, automatisation, audit IT. Visio partout en France, présentiel 78/95 » ; « spécialisé Claude Code et Odoo pour dirigeants PME (et secondairement audit informatique local) » | **oui** |
| `Person` JSON-LD (`/auteur`) | knowsAbout : Claude Code, Odoo ERP, MCP, n8n/Make, audit IT PME, NIS2… | **oui** (jobTitle encore « Consultant IA & Transformation Digitale ») |
| `/a-propos` | mission ERP tracée, « 15 000-25 000 € chez un intégrateur classique », code public | **oui** |
| **`Organization` JSON-LD (root layout)** | « Consultant IA et transformation digitale pour PME en Yvelines (78) et Val d'Oise (95). » ; `areaServed` = 78, 95, Île-de-France ; `knowsAbout` = IA, Transformation digitale, Audit informatique, Automatisation, **Robotique** | **non** : ni Odoo, ni Claude, ni MCP, ni France |
| **`LocalBusiness` JSON-LD** | « …pour PME du BTP, immobilier et industrie en Yvelines (78) et Val d'Oise (95) » | **non** (secteurs et zone d'un autre positionnement) |
| `<title>` racine | « IA agentique & logiciel sur mesure PME · Audit IT 78 » | moitié |
| h1 `/` et `/approche` | « Votre PME, augmentée par l'IA » ; `/approche` : « Formation en présentiel en Yvelines et Val d'Oise, conseil et audits en visio partout en France » | neutre |

Le graphe d'entité est **la** source que lisent Google et les LLM pour nous décrire. Il porte encore le postulat de 2025.

## 6. Thèse et risques

**Thèse** : augmenter.pro se positionne comme **référence francophone de l'intégration de l'IA aux outils métier des PME (Odoo d'abord), par un indépendant qui livre lui-même avec Claude Code, et qui publie son terrain**. Le 78/95 reste l'ancrage de la fiche Google et de la formation en présentiel ; il sort de l'identité du site.

Risques à regarder en face :
1. **La niche n'est pas vide** : Nalios (Gold, 13 agences) dit déjà « Claude via MCP ». Notre différence n'est pas l'outil, c'est **la preuve** (journal de mission, pièges payés, coût à l'usage) et **le format** (un indépendant, pas une agence). Si on ne publie pas le terrain, on perd.
2. **Dépendance à deux marques tierces** (Claude, Odoo) : un changement de politique Anthropic ou Odoo (ex. Odoo 20 qui ferme l'API hors plan Custom) déplace le terrain. Mitigation : l'angle « coût à l'usage, modèle local, souveraineté » ne dépend d'aucune des deux.
3. **La demande solvable est étroite** (conseil 2 %, dev spécifique 3 % des dépenses IA des TPE-PME). On vise les 19 % qui paient déjà, pas les 81 %.
4. **« Intégrateur Odoo » est une requête nationale concurrentielle** (143 partenaires). On ne gagnera pas « intégrateur odoo france » ; on peut gagner **« odoo claude »**, **« claude cowork odoo »**, **« serveur mcp odoo »**, **« coût agent ia odoo »**, que personne ne travaille en français et où on est déjà en page 1.
5. **Le site ne produit pas de devis** aujourd'hui, quel que soit le positionnement. Le rôle réaliste du site : **confirmer** la recommandation (un prospect recommandé tape « Pierre Legrand » ou « augmenter.pro » et doit trouver une référence) et **être cité par les LLM**. Ça se mesure, et ce n'est pas mesuré.
6. **Le cluster C** (« stratégie IA PME », « audit IA PME ») est le vrai perdant : 4 188 impressions, 11 clics, et un positionnement « conseil générique » qui ressemble à tout le monde.

## 7. Questions à trancher dans l'ADR 0008

1. L'identité structurée (`Organization` / `LocalBusiness`) : description, `knowsAbout` (Odoo, Claude Code, MCP, agents IA, coût à l'usage), `areaServed` France + 78/95 pour le présentiel, suppression de « Robotique » et des secteurs BTP/immobilier. Faut-il garder `LocalBusiness` du tout, ou le réserver à la fiche Google ?
2. Le sort de `/strategie-ia-pme` et `/audit-ia-pme` : fusion sous une page **« intégration IA PME »** (le terme que les gens tapent avec « agent ia pme », « automatisation ia pme »), ou maintien ?
3. Les deux pages audit local : ancrage léger (fiche Google, présentiel) ou suppression avec 301 vers une page « audit » nationale ?
4. Une page **« Odoo × Claude »** (ou renforcement de `/serveur-mcp-odoo`) comme tête de pont de la niche, adossée au terrain Reva 9 anonymisé. Avec ou sans le mot « intégrateur » (143 concurrents, et on n'est pas partenaire Odoo) ?
5. **Formation Claude Code** : la demande existe en ces mots (en français, Paris, CPF). L'atelier doit-il se renommer et viser le CPF (Qualiopi = coût et délai) ?
6. Le `jobTitle` de Pierre : « Consultant IA & Transformation Digitale » dit encore 2024.
7. Confidentialité : quel niveau d'accord écrit obtenir de Reva 9 pour passer de 🟢 anonymisé à un cas nommé, le seul élément que la concurrence n'a pas ?

Préalable à tout : **poser la mesure GEO** (limelit ou elmo sur le VPS, prompts de [geo-prompts.md](2026-05-21-data/geo-prompts.md), cf. mémoire « Outils GEO & positionnement ») pour avoir un avant/après, et finir la sortie de sanction (9 pages avec avis à faire recrawler).

## 7 bis. Orientations retenues en séance (2026-10-23, réponses de Pierre)

Pas encore une ADR : des orientations qui cadrent le brainstorm et le dialectic à venir.

| Question | Orientation |
|---|---|
| Identité structurée | **Réécrire** `Organization` (intégration IA / Odoo / Claude Code, zone France) ; **garder `LocalBusiness` restreint** à la formation en présentiel 78/95, aligné sur la fiche Google |
| `/strategie-ia-pme` + `/audit-ia-pme` | **Fusionner** en une page « intégration IA PME », 301 depuis les deux |
| Pages audit local | **Ancrage léger** : garder, différencier la page 95, ajouter les prix, lier à la fiche Google, pas de refonte |
| Tête de pont Odoo × Claude | **Non tranché** : question requalifiée en **architecture de silos et de maillage** (quels silos, quelle page pilier par silo, circulation du jus, outils tiers dans quel silo), à brainstormer avant de choisir une URL |
| Formation Claude Code | **Renommer** l'atelier avec les mots cherchés (« formation Claude Code pour dirigeants »), sans CPF / Qualiopi |
| `jobTitle` Person | **« Consultant intégration IA · Odoo & Claude Code »**, repris sur `/auteur`, `/a-propos`, LinkedIn |
| Terrain Reva 9 | **Rester anonymisé** (🟢) : pas de demande d'accord écrit, le volet M&A reste ouvert |
| Séquence avant l'ADR 0008 | 1. **brainstorm silos & maillage** · 2. **`/dialectic`** sur la thèse · 3. **mesure GEO** (limelit sur le VPS, prompts de `geo-prompts.md`) · puis rédaction de l'ADR |

## 8. Reproductibilité

Scripts versionnés dans [`scripts/seo/`](../../scripts/seo/), sans dépendance, lecture seule :

| Script | Ce qu'il sort |
|---|---|
| `gsc-portfolio.mjs` | les 50 pages du sitemap taguées par cluster, 16 mois / avant / après, top requêtes du cluster A |
| `autocomplete-map.mjs` | suggestions Google FR par graine (graine + modificateurs + a-z), intentions |
| `gsc-commercial.mjs`, `gsc-formation.mjs` | requêtes d'une famille et pages que Google montre dessus |
| `gsc-crawl.mjs`, `audit-gsc.mjs` | courbe quotidienne, inspection des 50 URL (crawl, index, résultats enrichis, canonique) |
| `audit-prod.mjs [base]` | crawl technique de la prod ou d'un build local (`http://127.0.0.1:3000`) |

Les scripts GSC lisent la clé JSON du compte de service via `GOOGLE_APPLICATION_CREDENTIALS` (la même variable que le MCP dans `.mcp.json`) : `GOOGLE_APPLICATION_CREDENTIALS=<clé.json> node scripts/seo/gsc-portfolio.mjs`. L'inspection d'URL prend ~5 min (une requête par URL). Les suggestions Google sont encodées par `encodeURIComponent` dans le script ; en ligne de commande sous Windows, encoder les accents à la main.
