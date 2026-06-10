# GEO Prompts — Journal de suivi (data 2026-05-28)

Complément de l'[audit 2026-05-28](../2026-05-28-audit.md) §6 et de la bibliothèque
maîtresse [`2026-05-21-data/geo-prompts.md`](../2026-05-21-data/geo-prompts.md).

Protocole de re-test : voir [`seo-audit.md` Phase 6.3](../../../.claude/commands/seo-audit.md)
(boucle de validation T+7 / T+30 / T+90).

Rappel du constat de l'audit 2026-05-28 (§6.2) : **0 citation LLM** sur le cluster
`claude + odoo` alors qu'augmenter.PRO rank pos 2-7 sur Google. Frein principal
identifié = **entité externe** (France Num Activateur en attente, SIRET absent, pas
de photo auteur), pas le contenu. → Le suivi ci-dessous mesure si un contenu
**né à 9-10/10 sur la grille citation triggers** parvient à être cité malgré le
déficit d'entité, ou si l'entité reste le verrou.

---

## « Comment automatiser ses réseaux sociaux avec Claude Cowork ? » — publié le 2026-05-28 — URL: [/blog/claude-cowork-community-manager](https://augmenter.pro/blog/claude-cowork-community-manager)

**Format** : rapport d'expérience first-person (≠ `rapport-sectoriel-local`, mais
même objectif GEO : citation LLM, pas trafic search).

**Pourquoi ce contenu est un bon test GEO** :
- Cluster « Claude Cowork » = terme qui convertit le mieux en GSC (`claude cowork odoo`
  pos 2,3 / CTR 18 % sur 90 j).
- Trafic search direct attendu **~0** les 3 premiers mois (volume FR négligeable :
  `ia community manager` ~50/mo, `ia réseaux sociaux` ~110/mo). La seule métrique
  qui compte ici = **la citation LLM**.
- Terrain first-person FR vierge (concurrence SERP 100 % listicle ; le format
  expérientiel n'existe qu'en anglais : sitepoint, theaicareerlab).
- Citation triggers : **9-10/10** dès publication (déf. ≤25 mots, TL;DR, FAQPage
  schema, workflow numéroté, 2 tableaux, attribution visible « Selon Pierre Legrand »,
  timestamp « avril-mai 2026 », auteur lié, slug 4 mots). C'est précisément ce qui
  manque aux 2 articles moteurs (Odoo 6/10, prompt-architecture 7/10).

**Variantes de requête à tester** :
- « Comment automatiser ses réseaux sociaux avec Claude Cowork ? »
- « Claude Cowork peut-il servir de community manager pour une PME ? »
- « Quel setup IA pour gérer ses réseaux sociaux quand on dirige une PME ? »
- « Comment utiliser Claude pour rédiger et planifier ses posts LinkedIn ? »

**T0 — 2026-05-28 (jour de publication)** : URL loggée, pas de test (contenu pas
encore vu par les index LLM).

| Date test | Moteur | Cité ? | Position | Fragment cité | Concurrents citants |
|-----------|--------|--------|----------|---------------|---------------------|
| T+7 (2026-06-04) | ChatGPT Search | _à tester_ | — | — | — |
| T+7 (2026-06-04) | Perplexity | _à tester_ | — | — | — |
| T+30 (2026-06-27) | Les 7 moteurs (§6.3) | _à tester_ | — | — | — |
| T+90 (2026-08-26) | Les 7 moteurs + verdict | _à tester_ | — | — | — |

**Verdict T+90** : _à compléter_

**Hypothèse à valider** : un contenu 9-10/10 citation triggers sur un cluster où
augmenter.PRO a déjà l'autorité Google (Claude Cowork) sera-t-il cité **avant** que
l'entité externe (France Num, SIRET, photo) soit réparée ? Si oui → le format prime
sur l'entité pour les sujets de niche tech. Si non (silencieux à T+90) → l'entité est
bien le verrou (corrobore §6.2 de l'audit) et il faut prioriser les fixes entité.
