# Template — Carte service / offre

Format standard pour la réécriture des services (Phase 9.3) et la spécification de nouvelles offres (Phase 9.4) par `/seo-audit`.

## Structure d'une carte service

```markdown
#### <Nom de l'offre>

- **Accroche** : <1 phrase — douleur adressée ou promesse forte>
- **Pour qui c'est utile** : <persona(s) cible>
- **Pour qui ce n'est PAS fait** : <anti-persona — rassure et qualifie>
- **Livrable concret** : « vous repartez avec… »
- **Durée / format** : <ex. 60 min visio, 2 semaines, 3 mois>
- **Méthodologie résumée** : 3-5 étapes
- **Prix affiché** :
- **Justification du palier** : <pourquoi ce prix, à quoi il correspond>
- **Conditions** : prérequis, déplacement, nombre de participants
- **Preuves** : <nombre de missions réalisées, secteurs couverts, témoignage, logo>
- **CTA spécifique** : <libellé + URL>
- **Schema JSON-LD** : Service / Offer
```

## Pyramide d'offres de référence (augmenter.pro)

| Palier | Prix indicatif | Format | Cible | Statut |
|--------|----------------|--------|-------|--------|
| Lead magnet | 0 € | PDF / check-list / calculateur | Tout prospect | À développer |
| Audit 180° (non facturé, sous conditions) | 0 € | 60 min visio | Premier contact qualifié | Actif |
| Audit 360° IA Booster | 225 € | 1 demi-journée | Dirigeant prêt à investir | Actif |
| Atelier collectif | 450-750 €/pers | 1/2 journée, 4-6 PME | Pairs qui veulent apprendre ensemble | À tester |
| Sprint découverte | ~1 500 € | 2 semaines | PME prête à tester un use case | À tester |
| Accompagnement mensuel | 500-900 €/mois | Coaching dirigeant récurrent | Dirigeant en transformation | À tester |
| Abonnement veille | 150 €/mois | Newsletter + Q&A asynchrone | Veille continue post-mission | À tester |
| Hotline IA | 300 €/mois | Support outils / prompts | Utilisateurs IA actifs | À tester |
| Prestations sur mesure | sur devis | Projet dédié | Missions spécifiques | Actif |

Lors d'une refonte d'offre, vérifier :
- Chaque palier est **distinguable** du précédent (livrable différent, pas juste prix différent)
- Il existe un **palier d'entrée non facturé** (sous conditions : sujet précis, intention d'agir) qui convertit vers payant
- Il existe **au moins un palier récurrent** (LTV > one-shot)
- Les écarts de prix entre paliers sont cohérents (x3 à x5 entre paliers adjacents, pas plus)

## Contraintes

- **Mot « gratuit » interdit** — utiliser « offert », « sans engagement », « inclus »
- **Naming mémorable** — éviter « Audit classique », « Formule Premium » ; préférer des noms qui racontent (« Audit 180° », « IA Booster », « Sprint Découverte »)
- **Cohérence des prix** entre `/approche` (qui absorbe l'ancien `/prestations`), la landing `/atelier-claude-code-dirigeant` et tous les CTAs
- **JSON-LD Service** systématique avec `areaServed` (78/95), `provider` (Organization), `offers` (prix)
- **Anti-patterns** : pas de palier à 19 €/mois qui commoditise, pas de palier « Enterprise » sans prix affiché quand le marché cible est PME

---

**Utilisé par** :
- [`/seo-audit`](../../commands/seo-audit.md) — Phase 9.3 (réécriture cartes services / pricing) + Phase 9.4 (pyramide d'offres de référence)
- [`/modify-resource`](../../commands/modify-resource.md) — Étape 2.2 (Modification d'une offre / service)
