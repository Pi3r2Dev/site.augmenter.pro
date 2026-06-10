# Template — Grille E-E-A-T

Barème de notation sur 20 points utilisé par `/seo-audit` (Phase 7) pour chaque page indexable.

augmenter.pro est un site de conseil avec décisions financières impliquées = domaine **YMYL adjacent** → standard E-E-A-T élevé appliqué par Google.

## Barème par signal (0-5)

| Signal | 0 | 1-2 | 3 | 4 | 5 |
|--------|---|-----|---|---|---|
| **Experience** | Aucun exemple | Exemples génériques | Exemples sectoriels | Cas terrain anonymisés | Cas géo-localisés 78/95 chiffrés |
| **Expertise** | Reformulation Wikipedia | Reformulation avec liens | Bonne couverture | Analyse originale | Méthodologie propriétaire |
| **Autorité** | Auteur absent | Auteur nommé | Auteur + bio courte | Credentials mentionnés | Credentials + missions + preuves |
| **Fiabilité** | Affirmations sans source | 1-2 sources | Sources pour chiffres clés | Sources + nuances | Tout sourcé + limites + ton prudent |

> **Information gain (critère clé 2026)** : Expertise 4-5/5 = **apport d'information nouveau** (donnée originale, retour terrain, POV tranché, méthodo propre). L'IA ayant commoditisé le contenu moyen, c'est devenu le seuil **à la fois du classement et de la citation LLM** : la reformulation du top SERP plafonne à 2/5 (« régurgitation »), n'est ni rankée ni citée.

## Signaux auteur à vérifier

- [ ] Page auteur dédiée pour Pierre Legrand (bio, photo, credentials, missions, liens sociaux)
- [ ] JSON-LD `Person` sur la page auteur avec `sameAs` (LinkedIn, GitHub, Twitter/X)
- [ ] Lien auteur sur chaque article (rel=author + schema Article.author)
- [ ] Photo de profil cohérente sur l'ensemble du site
- [ ] Présence sur annuaires d'experts (LinkedIn Top Voices, France Num, Bpifrance, etc.)

## Signaux d'autorité du domaine

- [ ] Mentions presse (si existantes → lien depuis page À propos)
- [ ] Témoignages clients vérifiables (logos, citations attribuées, chiffres)
- [ ] Études de cas détaillées avec résultats chiffrés
- [ ] Partenariats affichés (Bpifrance IA Booster, France Num Activateur, CCI)
- [ ] Conférences / interventions publiques
- [ ] Articles de fond référencés / cités par tiers

## Seuils d'action

- **Score < 10/20** → 🔴 priorité haute : enrichir avec exemples terrain + sources
- **Score 10-15/20** → 🟠 priorité moyenne : ajouter nuances + credentials
- **Score > 15/20** → 🟢 correct : maintenir + veille concurrentielle

## Format de restitution (section §8 du rapport `/seo-audit`)

```markdown
| Page | Experience | Expertise | Autorité | Fiabilité | Score /20 | Action prioritaire |
|------|-----------|-----------|---------|-----------|-----------|-------------------|
| /    | 3/5       | 4/5       | 3/5     | 3/5       | 13/20     | Ajouter cas 78/95 chiffré |
| ...  | ...       | ...       | ...     | ...       | ...       | ...               |
```

## Audit rapide (anti-patterns à flagger immédiatement)

- Article sans auteur identifié → score Autorité plafonné à 1/5
- Article sans aucune source externe → score Fiabilité plafonné à 2/5
- Article qui reformule les top 3 SERP sans angle propre → score Expertise plafonné à 2/5
- Article sans exemple concret, uniquement théorique → score Experience plafonné à 2/5
- Page commerciale sans preuves (logos, chiffres, témoignages) → score global < 10
- Contenu contenant « gratuit » (mot interdit) → à corriger avant scoring

---

**Utilisé par** :
- [`/seo-audit`](../../commands/seo-audit.md) — Phase 7 (évaluation E-E-A-T approfondie par page) + §8 du rapport
- [`/create-article`](../../commands/create-article.md) — Étape 3 (qualité de contenu, scoring après rédaction)
- [`/create-resource`](../../commands/create-resource.md) — Étape 3 (E-E-A-T obligatoire, tous types)
- [`/modify-resource`](../../commands/modify-resource.md) — Étape 5.2 (re-scoring post-modification : ne doit jamais régresser)
