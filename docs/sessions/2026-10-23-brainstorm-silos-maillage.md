---
date: 2026-10-23
slug: brainstorm-silos-maillage
status: open
mode: solo
tags: [seo, positionnement, silos, maillage, geo, adr-0008]
---

# Brainstorm : architecture de silos et circulation du jus pour le positionnement « intégration IA / Odoo »

## Status
open — brainstorm mené le 2026-10-23 : **scénario hybride retenu** (hub « intégration IA PME » + silos Odoo & agents / Claude Code & Cowork + local fermé). Livrable : [plan d'architecture des silos](../plans/2026-10-23-architecture-silos.md). Prochaine étape : `/dialectic` sur la thèse + le plan.

## Objet

Le site se repositionne de « consultant IA 78/95 » vers **référence de l'intégration de l'IA aux outils métier des PME (Odoo d'abord), par un indépendant qui livre avec Claude Code et publie son terrain**. Les orientations sont prises (ci-dessous). Ce qui n'est pas tranché : **comment on découpe le site en silos, quelle page porte chaque silo, comment le jus circule, et où se rangent les outils tiers**. C'est l'objet de ce brainstorm.

## Décisions déjà prises (ne pas rouvrir ici)

Source : [2026-10-23-positionnement-integration-ia.md § 7 bis](../seo-audits/2026-10-23-positionnement-integration-ia.md).

- `Organization` réécrit (intégration IA / Odoo / Claude Code, France) ; `LocalBusiness` **restreint** au présentiel 78/95.
- `/strategie-ia-pme` + `/audit-ia-pme` → **une page « intégration IA PME »** (301).
- Pages audit local → **ancrage léger**, pas de refonte.
- Atelier → **« formation Claude Code pour dirigeants »**, sans CPF.
- `jobTitle` → « Consultant intégration IA · Odoo & Claude Code ».
- Terrain Reva 9 → **anonymisé** (🟢 uniquement).
- Séquence : **ce brainstorm → `/dialectic` → mesure GEO (limelit) → ADR 0008**. Rien ne change sur le site avant l'ADR.

## Matière à lire, dans cet ordre

1. [Note de recherche positionnement](../seo-audits/2026-10-23-positionnement-integration-ia.md) : portefeuille 16 mois par cluster, carte de la demande, marché, concurrence, incohérences d'entité, questions.
2. [Carte du maillage interne](../seo-audits/2026-10-23-data/maillage-interne.tsv) (735 liens éditoriaux, hors header/footer/nav, avec ancres) et son [résumé](../seo-audits/2026-10-23-data/maillage-interne-resume.txt) (entrants par page, flux entre clusters). Régénérable : `node scripts/seo/link-graph.mjs`.
3. [Juge du maillage existant](../../src/lib/maillage-cluster.test.ts) : ancres canoniques déjà imposées (« workflow technique Claude Code + Odoo », landing `/serveur-mcp-odoo`), ≥ 3 entrants éditoriaux par article de l'essaim, réciproques commerciales. **Toute règle de silo retenue devra y être encodée** (règle d'archi = vérificateur exécutable).
4. [project-context.md](../../.claude/templates/seo/project-context.md), [charte éditoriale](../../.claude/templates/seo/charte-editoriale.md) (registres : pages commerciales = tu, récits = vous), terrains [Reva 9](../../.claude/templates/seo/terrain-odoo-reva9.md) et [iaCommerce](../../.claude/templates/seo/terrain-iacommerce.md) avec leurs niveaux 🟢 🟠 🔴.
5. [ADR 0003](../decisions/0003-funnel-geo-conversion.md) (persona dirigeant tech-curieux, mesure d'abord) et [playbook acquisition](../playbooks/acquisition-devis.md) (3-4 devis/mois par recommandation ; le site **confirme**, il ne prospecte pas).

## Faits clés à garder sous les yeux

**Portefeuille (16 mois GSC, 50 pages)** : A · intégration IA / Odoo / dev = 23 pages, 503 clics (84 %) ; B · local / audit IT = 6 pages, 15 clics ; C · IA dirigeant générique = 11 pages, 11 clics ; D · structure / marque = 10 pages, 68 clics. 94 % des clics de A viennent de deux articles (`claude-code-prompt-architecture`, `configurer-odoo-ia-claude-cowork`). L'essaim MCP / Odoo 20 (9 URL du 2026-10-14) est indexé mais pas encore visible.

**Demande (suggestions Google FR, 2026-10-23)** : 712 suggestions autour d'Odoo, 658 autour de Claude, 124 autour des agents / n8n, **7 autour du local**. Formulée **par outil** : « odoo claude » → mcp, connector, claude code, skill, cowork ; « intégrateur odoo » → france, paris, lyon ; « formation claude code » → en français, Paris, CPF ; « claude cowork » → prix, avis, c'est quoi. Jamais « sur mesure », jamais « intégration IA » seul.

**Maillage actuel (flux entre clusters, nb de liens)** : A→A **189**, D→A 135, A→D 81, D→D 60, D→C 51, C→D 44, C→A 29, C→C 27, D→B 26, B→D 25, B→B 22, A→C 18, B→A 11, A→B **2**. Lecture : A est déjà un silo étanche ; B est isolé et peu alimenté ; **C est diffus** (il donne plus qu'il ne reçoit, vers D et A). `/contact` reçoit 100 liens de 49 pages (CTA), `/prompts` 44 liens dont 34 depuis D (la carte des ressources). Pages les plus liées de A : `cout-agent-ia-odoo` (22 pages sources), `serveur-mcp-odoo` (18), `configurer-odoo-ia-claude-cowork` (18). Aucune page du sitemap sans entrant éditorial.

**Concurrence** : 143 partenaires Odoo officiels en France ; sur « Odoo + IA », Nalios (Gold, 13 agences) dit déjà « Claude via MCP », Drakkar affiche ses prix (audit 4 k€, projet 25-80 k€). Personne n'a : journal de mission, pièges réels, coût à l'usage, voix d'indépendant. Agences « agent IA PME » : prix d'appel 450-2 900 €, segment saturé.

## Questions du brainstorm

1. **Combien de silos, et lesquels ?** Hypothèses à confronter : (a) un seul silo « intégration IA » avec des sous-ensembles par outil ; (b) un silo par outil — Odoo, Claude Code, agents / MCP, Claude Cowork — avec une page pilier chacun ; (c) un silo par **geste** — intégrer, développer, former, auditer. Quel découpage colle à la fois à la demande (par outil) et à l'offre (par geste) ?
2. **Quelle page pilier par silo ?** `/serveur-mcp-odoo` ou une page « Odoo × Claude » distincte ? La future page « intégration IA PME » est-elle un pilier ou le hub au-dessus des piliers ? Que devient `/integration-mcp` (320 impr., 3 clics, positionnement 2025 « MCP pour CRM/ERP ») ?
3. **Circulation du jus** : quelles règles ? Satellites → pilier avec ancre canonique ; pilier → 2-3 satellites max ; pas de lien transversal entre silos sauf via le hub ; `/prompts` et `/idees` (gros donneurs depuis D) orientés vers quels piliers ? Que fait-on des 51 liens D→C et des 29 liens C→A une fois C fusionné ?
4. **Le cluster C, recyclage** : les 11 pages « IA dirigeant » (vente, veille, emails, comptes rendus, contradicteur, patron-goulot, bilan, BTP) : lesquelles deviennent des satellites d'un silo (lequel ?), lesquelles sont fusionnées, lesquelles sortent du maillage ?
5. **Le cluster B, étanchéité** : les 6 pages locales restent-elles un silo fermé (ancrage fiche Google, présentiel) qui ne reçoit du jus que de D ? Doit-il encore pointer vers A (11 liens aujourd'hui) ?
6. **Outils tiers** : n8n / Make, Claude Cowork, Chatwoot, HubSpot / Pipedrive, modèles locaux (Qwen, Ollama), Odoo 20 natif. Chacun mérite-t-il un silo, un satellite dans un silo existant, ou rien ? Critère : demande mesurée (suggestions, GSC) × preuve terrain disponible (🟢) × cohérence avec le geste vendu.
7. **Formation** : « formation Claude Code » est-elle un silo (avec satellites tutoriels / prompts) ou un satellite commercial du silo Claude Code ?
8. **Home et `/approche`** : rôle dans l'architecture (hub d'entrée vers les piliers ? récit de marque hors silo ?). Aujourd'hui `/` n'a que 3 entrants éditoriaux et vit par la nav.
9. **Ce qu'on mesure** : quel indicateur par silo (clics GSC, position des requêtes pilier, citations LLM) et quel seuil de révision.

## Contraintes dures

- **Confidentialité** : Reva 9 en 🟢 uniquement (pas de secteur + effectif + localisation combinés, aucun montant de prestation) ; iaCommerce non nommé sans accord (🟠).
- **Maillage** : pas d'ancres `#` en footer / nav ; le juge ne lit que les `href` littéraux (un lien rendu depuis un tableau de données ne compte pas) ; ne jamais relâcher une assertion pour passer au vert.
- **Éditorial** : charte (arc douleur → solution complète), mots interdits (« gratuit », « offert »), registres tu / vous, chiffres sourçables seulement, « ce qu'on vise ensemble » pour tout objectif non prouvé.
- **SEO** : un article s'ajoute au catalog `src/data/resources.ts`, pas dans les vues ; toute nouvelle page passe par `pageOpenGraph()` + canonique (juge `seo-hygiene.test.ts`) ; sitemap + llms.txt à jour.
- **Pas d'implémentation** dans cette session : on produit un plan, on ne touche ni pages, ni JSON-LD, ni redirections.

## Livrable attendu

Un fichier `docs/plans/2026-10-XX-architecture-silos.md` avec :

1. La liste des silos retenus, leur page pilier, leurs satellites (existants, à fusionner, à créer), les 301.
2. Les **règles de maillage** écrites comme des assertions testables (qui lie qui, avec quelle ancre, combien d'entrants minimum, quels liens interdits), prêtes à être encodées dans `maillage-cluster.test.ts` (avec garde-fou anti-vacuum et test négatif).
3. La place des outils tiers (silo / satellite / hors scope) avec le critère appliqué.
4. Les 2 ou 3 scénarios écartés et pourquoi (ça nourrit le `/dialectic`).
5. Les indicateurs par silo et le calendrier de revue.

## Méthode proposée

Lire la matière (30 min) → reconstruire la carte actuelle silo par silo depuis le TSV → poser 3 scénarios de découpage (par outil / par geste / hybride) → les confronter aux chiffres (demande, clics, entrants, preuves disponibles) → choisir → écrire le plan avec ses règles testables → `/flow handoff` en fin de session.

## Next step
1. Ouvrir une session dédiée avec le prompt ci-dessous.
2. Produire le plan d'architecture.
3. `/dialectic` sur la thèse + le plan, puis mesure GEO, puis `/adr 0008-positionnement-integration-ia`.

## Prompt de lancement (à coller dans la nouvelle session)

```
Lis docs/sessions/2026-10-23-brainstorm-silos-maillage.md et toute la matière qu'il liste (dans l'ordre), puis mène avec moi le brainstorm « architecture de silos et circulation du jus » pour le repositionnement d'augmenter.pro vers la référence intégration IA / Odoo / Claude Code. Ne rouvre pas les décisions déjà prises, ne modifie aucune page : le livrable est le plan docs/plans/2026-10-XX-architecture-silos.md décrit dans le dossier, avec des règles de maillage testables. Commence par me présenter la carte actuelle silo par silo (depuis le TSV de maillage), puis propose 3 scénarios de découpage chiffrés avant qu'on choisisse ensemble.
```
