---
adr: 0008
title: Positionnement « intégration IA / Odoo / Claude Code » et architecture de silos
status: proposed
date: 2026-10-23
deciders: Pierre Legrand
consulted: Claude Code (brainstorm silos, revue croisée, /dialectic du 2026-10-23)
informed: boucle de travail (docs/backlog.md, à compléter par docs/backlog-silos.md)
follows: ADR 0003 (persona dirigeant tech-curieux, mesurer d'abord), pivot du 2026-05-28 (local = fiche Google)
---

# ADR 0008 — Positionnement « intégration IA / Odoo / Claude Code » et architecture de silos

> **Statut proposed** : la séquence décidée est brainstorm → `/dialectic` → **mesure GEO** → ADR. Les deux premières étapes sont faites, la troisième ne l'est pas. L'ADR passe en `accepted` le jour où la capture GEO de départ (limelit, prompts de [geo-prompts.md](../seo-audits/2026-05-21-data/geo-prompts.md)) est enregistrée. Rien de ce qui change l'identité du site ne part avant.

## Contexte

Le site se décrit encore comme un « consultant IA et transformation digitale pour PME en Yvelines et Val d'Oise ». C'est ce que portent le JSON-LD `Organization` / `LocalBusiness` (78/95, « Robotique », ni Odoo ni Claude ni MCP) et le `jobTitle` de l'auteur. Les faits mesurés disent autre chose ([note de recherche](../seo-audits/2026-10-23-positionnement-integration-ia.md)) :
- sur 16 mois, le cluster intégration IA / Odoo / dev fait **503 clics sur 597 (84 %)**, le local et l'audit IT 15 clics pour 8 666 impressions ;
- la demande se formule **par outil** : « claude code » 301 suggestions, « claude cowork » 265, « odoo claude » 63, « intégration ia pme » 1 ;
- la niche francophone « Claude × Odoo pour PME » est naissante mais pas vide (Nalios, partenaire Gold, dit déjà « Claude via MCP »). Personne ne combine terrain tracé, coût à l'usage et Claude Code.

Deux fragilités cadrent la décision. 94 % des clics du cluster viennent de **deux articles** (309 et 164 clics). Et les 3-4 devis mensuels viennent presque tous de la **recommandation** ([playbook](../playbooks/acquisition-devis.md)) : aucun devis n'est aujourd'hui attribuable au SEO, et aucune instrumentation ne permettrait de le voir (pas de tag `?offer=` / `?source=`, étape jamais faite de l'ADR 0003). Le site sort aussi d'une sanction : crawl gelé depuis juillet, 21 URL encore gelées au 2026-10-14 ([recrawl](../seo-audits/2026-10-14-recrawl-urls-gelees.md)).

Le maillage interne, enfin, ne suit aucune architecture. Sur les 93 cartes « À lire ensuite » calculées par `getRelatedArticles()`, **59 sortent de leur thème** (les articles cyber recommandent le coût d'un agent Odoo). Ces liens échappent au juge du maillage, qui ne lit que les liens écrits en dur. Plan détaillé, chiffres et règles : [plan d'architecture des silos](../plans/2026-10-23-architecture-silos.md).

## Options considérées

### Option A — Statu quo : consultant IA généraliste ancré 78/95
**Pour** : aucun chantier ; cohérent avec la fiche Google et la formation en présentiel.
**Contre** : décrit le site par son segment le plus faible (15 clics en 16 mois) ; le graphe d'entité que lisent Google et les LLM contredit le contenu qui marche ; le positionnement « conseil IA générique » ressemble à tout le monde (cluster C : 4 188 impressions, 11 clics).
**Coût** : coût d'opportunité. La niche « odoo claude », où le site est déjà en page 1, reste sans propriétaire déclaré.

### Option B — Thèse « intégration IA / Odoo / Claude Code » + architecture de silos cible, vagues conditionnées (RETENUE)
**Pour** : suit la demande mesurée et le seul actif qui clique ; pose une hiérarchie (un pilier par silo) qui met fin à l'hésitation de Google entre pages proches ; adosse chaque page à une preuve terrain, ce que la concurrence n'a pas ; rend le maillage vérifiable par un juge.
**Contre** : dépend de deux marques tierces (Anthropic, Odoo) ; gros volume de production (33 → 55 pages hors local) ; la thèse n'est pas prouvée par des devis.
**Coût** : outillage (registre, juge, suivi des devis) ; réécriture des liens vers les URL fusionnées (26 fichiers) ; production par lots, plafonnée par le gisement de preuves.

### Option C — Thèse seule, contenu gelé à l'existant jusqu'à preuve de devis
**Pour** : aucun risque de volume pendant la sortie de sanction ; décision réversible.
**Contre** : à 3-4 devis par mois, la preuve de devis n'arrivera pas avant des mois. C'est un gel sans échéance, qui laisse vide le silo Claude (3 articles pour la deuxième demande du site). Le maillage reste désordonné.
**Coût** : faible à court terme ; à moyen terme, la niche est prise par d'autres. *(Alternative de la red team au `/dialectic`.)*

Découpages écartés en amont (plan § 5) : silo unique (aucune hiérarchie), par outil à 4 silos (130 liens à recâbler, coupe le flux MCP → Odoo), par geste (la demande ne se formule pas ainsi).

## Décision

**On retient l'option B.**

Critère décisif : **on investit là où la demande et la preuve existent toutes les deux, et on fait dépendre chaque vague de ce qui la limite réellement (le crawl et le gisement de preuves), pas d'un indicateur trop lent pour décider.** L'option C a raison sur deux points, intégrés ici : la thèse reste une **hypothèse** tant qu'aucun devis ne lui est attribué, et publier en masse pendant que le crawl est gelé ne rapporte rien. Mais conditionner tout contenu nouveau à un nombre de devis, à 3-4 par mois, revient à ne jamais décider.

### Ce qui est décidé

| Sujet | Décision |
|---|---|
| **Thèse** | augmenter.pro est la référence francophone de l'intégration de l'IA aux outils métier des PME (Odoo d'abord), par un indépendant qui livre avec Claude Code et publie son terrain. Le 78/95 reste l'ancrage de la fiche Google et de la formation en présentiel ; il sort de l'identité du site |
| **Identité structurée** (orientations du 2026-10-23) | `Organization` réécrit (intégration IA, Odoo, Claude Code ; zone France) ; `LocalBusiness` restreint au présentiel 78/95 ; « Robotique » et les secteurs BTP / immobilier retirés ; `jobTitle` « Consultant intégration IA · Odoo & Claude Code » |
| **Architecture** | hub « intégration IA PME » (fusion de `/strategie-ia-pme` et `/audit-ia-pme`, 301 ; title porteur de « automatisation IA » pour PME) qui porte aussi les usages IA du dirigeant ; silo **Odoo & agents** (pilier `/serveur-mcp-odoo`, sous-pilier `/integration-mcp` pour les outils tiers) ; silo **Claude Code & Cowork** (pilier formation, renommée « formation Claude Code pour dirigeants ») ; silo **local** fermé. Appartenance d'une page : l'outil que sa promesse et sa méthode enseignent (plan § 2.0) |
| **Ponts** | 3 pages Odoo ↔ Claude, liste fermée, justifiées par leur contenu (plan § 2.8) |
| **Règles de maillage** | R1-R12 du plan § 3, encodées dans le juge avec garde-fous anti-vacuum et tests négatifs ; les cartes « À lire ensuite » restent dans leur silo (R2) |
| **Cible** | 55 pages en silo (Odoo 27, hub 16, Claude 12), 0 page hors maillage (plan § 10). **Cible, pas quota** : le gisement de preuves fixe le plafond |
| **Discipline de publication** | une page = une preuve 🟢 nommée (terrain Reva 9 ou iaCommerce, ou source primaire) + relecture humaine avant publication ; pages nouvelles **par lots de 3-4**, dès que l'essaim du 2026-10-14 montre des impressions après recrawl |
| **Ce qui démarre sans attendre l'acceptation** | outillage (suivi de l'origine des devis, registre des silos, juge en rouge, filtre des cartes) et consolidation de l'existant : aucune page nouvelle, aucun changement d'identité |
| **Mesure** | devis attribuables (page d'origine et UTM enregistrées côté serveur, champ déclaratif en complément) + impressions hors des 2 articles dominants ; revue 90 jours après la mise en place du suivi |
| **Journal des annonces IA** | lancé comme satellite du hub (plan § 2.9), alerte (pas de `noindex` automatique) si plus de 45 jours sans entrée |

### Assertions du juge actuel à ré-encoder

Ré-encoder une assertion parce que la règle change n'est pas un relâchement. Chaque ré-encodage est listé ici :
- `NEWS_SLUGS` de [discover-news.test.ts](../../src/lib/discover-news.test.ts) si le journal absorbe le bilan de juillet ;
- les routes des tests qui visent l'atelier, quand la formation refondue changera d'URL (plan § 10.1, C1).

Toutes les autres assertions de [maillage-cluster.test.ts](../../src/lib/maillage-cluster.test.ts) restent conformes (plan § 3.5).

## Conséquences

### Positives
- Le graphe d'entité, le contenu et l'offre disent enfin la même chose, à Google comme aux LLM.
- Chaque page a une place, un pilier et une ancre canonique. Le juge le vérifie à chaque build de test.
- Le terrain publiable (journal de mission, pièges payés, coût à l'usage) devient l'ossature du site au lieu d'être dispersé.
- On saura enfin d'où viennent les devis.

### Négatives (assumées)
- Le silo Claude part de 3 articles. Il ne tiendra que si la page Cowork et la formation refondue sont livrées.
- 26 fichiers à réécrire pour la fusion du hub, avant toute page nouvelle.
- Le local devient un silo sans investissement SEO. Son levier est la fiche Google.

### Risques résiduels et mitigations
- **Risque** : la thèse ne produit aucun devis. **Mitigation** : instrumentation en premier ; revue à 90 jours. Mesure muette → on prolonge la fenêtre ; signal négatif (trafic du cluster sans aucun contact attribué sur 2 fenêtres) → on rouvre la thèse.
- **Risque** : dépendance à Anthropic et Odoo (exemple : Odoo 20 réserve l'API au plan Custom). **Mitigation** : le hub porte l'angle neutre (coût à l'usage, modèles locaux, souveraineté), qui ne dépend d'aucune des deux marques.
- **Risque** : pages creuses produites par la boucle d'agents. **Mitigation** : preuve 🟢 nommée obligatoire, relecture humaine, plafond fixé par le gisement ; trois pages restent « preuve à produire » tant que la preuve n'existe pas.
- **Risque** : casser la chaîne de réception des devis en l'instrumentant. **Mitigation** : garder le `console.log [QUOTE]`, `keepalive: true` et l'absence d'`await` avant `window.open` ; test local avant tout déploiement (exécuté par Pierre).
- **Risque** : confidentialité Reva 9 / iaCommerce. **Mitigation** : 🟢 uniquement, un poste à la fois, jamais secteur + effectif + localisation ensemble ; iaCommerce jamais nommé.

## Plan d'implémentation

Détail par vagues : [plan § 7 et § 10](../plans/2026-10-23-architecture-silos.md).

- [ ] **Préalable à l'acceptation** : capture GEO de départ (limelit sur le VPS), baseline GSC et `node scripts/seo/link-graph.mjs` le même jour.
- [ ] **V0 — maintenant** : suivi de l'origine des devis ([route.ts](../../src/app/api/quote/route.ts), [quote-wizard.tsx](../../src/app/contact/quote-wizard.tsx)) et UTM sur les CTA ; registre `src/lib/silos.ts` ; champ `silo` dans [resources.ts](../../src/data/resources.ts) et filtre de `getRelatedArticles()` ; juge R1-R10 écrit en rouge, puis tests négatifs.
- [ ] **Consolider — maintenant** : essaim du 2026-10-14 et les 2 articles forts (maillage, ancres canoniques, CTA vers `/serveur-mcp-odoo`) ; les 7 liens en dur de l'annexe B du plan.
- [ ] **Après acceptation** : identité structurée ([layout.tsx](../../src/app/layout.tsx), `/auteur`, `/a-propos`) ; hub par fusion, 301 et réécriture des 26 fichiers ; formation refondue ; sous-pilier Cowork ; portes d'entrée `/` et `/approche` (R10).
- [ ] **V1 Odoo, par lots de 3-4** dès que l'essaim montre des impressions après recrawl ; puis silo Claude et compléments du hub, même discipline.
- [ ] Journal des annonces IA : données, page, R11-R12, amorcé avec 6 entrées.
- [ ] Mettre à jour [project-context.md](../../.claude/templates/seo/project-context.md) (positionnement 3 tiers → silos) et le `CLAUDE.md` du projet.

## Validation post-implémentation

- **Métrique cœur** : contacts et devis attribués à une page de silo (page d'origine ou UTM), par silo. Baseline : 0 mesuré à la mise en place du suivi.
- **Maillage** : juge vert ; cohésion recalculée par `link-graph.mjs` : Odoo ≥ 85 %, local ≥ 80 %, Claude ≥ 50 % puis ≥ 70 % une fois construit ; 0 carte hors périmètre.
- **Positions** (T+90 après mise en ligne) : au moins une des requêtes « serveur mcp odoo », « odoo claude », « claude code odoo », « claude cowork odoo », « coût agent ia odoo » en page 1 ; pilier formation dans le top 20 sur « formation claude code ».
- **GEO** : au moins une citation LLM sur les prompts « intégration IA / Odoo » par rapport à la capture de départ.
- **Conditions de réouverture** :
  - 2 fenêtres de 90 jours avec trafic du cluster et **0 contact attribué** → rouvrir la thèse ;
  - pilier formation hors du top 20 **et** 0 contact formation à T+90 → rouvrir le choix du pilier Claude (prompt architecture) ;
  - journal sans citation et tenu à moins de 2 entrées par mois au 2026-12-15 → dépublication (301 vers le hub), décision humaine.

## Références

- [Plan d'architecture des silos](../plans/2026-10-23-architecture-silos.md) — silos, règles R1-R12, outils tiers, scénarios écartés, revue croisée (§ 8-9), cible (§ 10), issue du `/dialectic` (§ 11)
- [Note de recherche positionnement](../seo-audits/2026-10-23-positionnement-integration-ia.md) — portefeuille, demande, marché, concurrence, orientations du 2026-10-23 (§ 7 bis)
- [Dossier du brainstorm](../sessions/2026-10-23-brainstorm-silos-maillage.md)
- [ADR 0003](0003-funnel-geo-conversion.md) — persona dirigeant, mesurer d'abord · [ADR 0007](0007-google-news-discover.md) — format news, revue 2026-11-15
- [Playbook acquisition de devis](../playbooks/acquisition-devis.md)
- Juges : [maillage-cluster.test.ts](../../src/lib/maillage-cluster.test.ts), [discover-news.test.ts](../../src/lib/discover-news.test.ts), [seo-hygiene.test.ts](../../src/lib/seo-hygiene.test.ts)
- Terrains : [terrain-odoo-reva9.md](../../.claude/templates/seo/terrain-odoo-reva9.md), [terrain-iacommerce.md](../../.claude/templates/seo/terrain-iacommerce.md)
