# Template — Rapport SEO augmenter.pro

Structure de rapport standard produit par `/seo-audit` et sauvegardé dans `docs/seo-audits/<YYYY-MM-DD>-audit.md`.

Le rapport est **autonome** (un lecteur qui n'a pas assisté à l'audit doit pouvoir le comprendre) et **comparable dans le temps** (KPIs baseline présents pour suivre l'évolution).

```markdown
# Audit SEO augmenter.pro — <date>

## Résumé exécutif
- Score SEO technique : X/100
- Score Performance (Core Web Vitals) : X/100
- Score Contenu & E-E-A-T : X/100
- Score Visibilité GEO/LLM : X/100
- **Score global : X/100**

- Pages indexées / soumises : X / Y (Z %)
- Backlinks / referring domains : X / Y
- Clics GSC 90j : X (±Δ%)
- Impressions GSC 90j : X (±Δ%)
- Position moyenne : X.X

**Top 3 points critiques**
1. ...
2. ...
3. ...

**Top 3 opportunités** (impact × faisabilité)
1. ...
2. ...
3. ...

---

## 1. Outils utilisés
| Outil | État | Usage |
|-------|------|-------|
| GSC MCP | ✅/❌ | ... |
| DataForSEO MCP | ✅/❌ | ... |
| Firecrawl MCP | ✅/❌ | ... |
| Playwright | ✅/❌ | ... |

## 2. Audit technique
### 2.1 Pages (on-page)
| Page | Title (chars) | Meta (chars) | H1 | Liens int. | JSON-LD | Score /10 |

### 2.2 Core Web Vitals (Lighthouse mobile)
| Page | Perf | LCP | INP | CLS | A11y | BP | SEO |

### 2.3 Indexation (GSC)
| URL | Indexé ? | Canonical OK ? | Last crawl | Rich results |

### 2.4 JSON-LD
| Schema | Fichier | Statut | Problème |

### 2.5 Maillage interne
- Pages orphelines : [...]
- Profondeur max : X clics
- Top 5 pages receveuses : [...]

### 2.6 Fichiers SEO
- robots.txt : ✅/⚠️
- sitemap.xml : X URLs, Y indexées
- llms.txt : ...

## 3. Performance GSC (90 jours)
### 3.1 Vue d'ensemble
[graphe ou tableau clics/impressions]

### 3.2 Top requêtes
| Requête | Clics | Impr. | CTR | Pos. | Intent |

### 3.3 Top pages
| Page | Clics | Impr. | CTR | Pos. |

### 3.4 Quick Wins (position 8-20)
| Requête | Position | Impr. | Page | Action |

### 3.5 Cannibalisations détectées
| Requête | Pages concurrentes | Action |

### 3.6 Évolution vs période précédente
| Metric | Période courante | Période précédente | Δ |

## 4. Analyse sémantique (DataForSEO)
### 4.1 Mots-clés positionnés
- Total : X | Top 3 : Y | Top 10 : Z
- Trafic organique estimé : X/mois

### 4.2 Opportunités mots-clés
| Mot-clé | Volume | Diff. | CPC | Intent | Cluster | Couvert ? | Priorité |

### 4.3 Intent distribution
- Informational : X %
- Commercial : Y %
- Transactional : Z %
- Navigational : W %

### 4.4 SERP analysis top 10 keywords
| KW | Features | Top 3 | Longueur moy. | Opportunité |

## 5. Concurrence
### 5.1 Panorama
| Concurrent | Type | DR | KW org. | Trafic est. | Overlap |

### 5.2 Content gap (pages à créer)
| Mot-clé | Volume | Diff. | Ranké par | Action |

### 5.3 Forces/faiblesses
| Concurrent | Forces | Faiblesses | Opportunité |

## 6. Backlinks
- Summary : X backlinks, Y referring domains, spam score Z %
- Top referring domains : [...]
- Ancre-cloud : [...]
- Prospects digital PR (intersection concurrents) : [liste priorisée]

## 7. Visibilité GEO (moteurs IA)

### 7.1 Accessibilité bots IA (prérequis bloquant)
| Bot | robots.txt | Test fetch User-Agent | Verdict |
|-----|-----------|----------------------|---------|
| GPTBot | ✅/❌ | 200/4XX | ✅/🔴 |
| OAI-SearchBot | | | |
| ClaudeBot | | | |
| Google-Extended | | | |
| PerplexityBot | | | |
| CCBot | | | |

### 7.2 Mentions LLM agrégées (DFS)
| LLM | Mentions / 90j | Top requête déclencheuse | Page citée | Domaines co-cités |

### 7.3 Tests directs multi-moteurs (prompt × moteur)
| Prompt | ChatGPT | Perplexity | Gemini AI Mode | AI Overviews | Brave | Bing Copilot | Claude |
|--------|---------|-----------|----------------|--------------|-------|--------------|--------|
| « Quel consultant IA PME Yvelines » | cité pos 2, URL `/strategie-ia-pme` | non | non | non | cité pos 3 | n/a | n/a |
| ... | | | | | | | |

→ **Taux de capture global** : X % des prompts × moteurs où augmenter.pro est cité.

### 7.4 AI Overviews / SGE Google
| Requête | AIO présent ? | Sources citées (3-5 URLs) | augmenter.pro cité ? | Caractéristiques sources retenues |

### 7.5 Entity author Pierre Legrand
- Page auteur dédiée : ✅/❌
- Person JSON-LD complet (sameAs, knowsAbout, etc.) : ✅/❌
- `Article.author` ref @id (pas string) sur ArticleLayout : ✅/❌
- Mention LinkedIn / GitHub / France Num alignées : ✅/❌

### 7.6 NAP consistency
| Élément | Forme(s) trouvée(s) | Divergence ? | Correction |
| Nom (augmenter.PRO / .pro / Augmenter Pro) | | | |
| Adresse | | | |
| Téléphone | | | |
| SIRET / TVA | | | |

### 7.7 `llms.txt` + `llms-full.txt`
- `llms.txt` couverture : X % (services / articles / FAQ / dates)
- `llms-full.txt` présent : ✅/❌ | Taille : X MB
- Référencement dans robots.txt + llms.txt : ✅/❌
- Actions correctives : [...]

### 7.8 Citation triggers (top 10 pages stratégiques)
| Page | Définition intro | Tableau | Stats sourcées | Listes | FAQ Q→A | Timestamp | Attribution | Auteur+lien | TL;DR | Slug court | Score /10 |
|------|------------------|---------|---------------|--------|---------|-----------|-------------|-------------|-------|-----------|-----------|

### 7.9 Entity mentions externes
| Source | Mention actuelle | Action | Priorité |
| Wikidata | | | |
| LinkedIn | | | |
| GitHub | | | |
| France Num Activateur | | | |
| Bpifrance IA Booster | | | |
| Presse | | | |

## 8. E-E-A-T par page
[Utiliser la grille de `.claude/templates/seo/eeat-grid.md`]
| Page | Exp | Expertise | Autorité | Fiab. | /20 | Action |

## 9. Stratégie de contenu
### 9.1 Topical map
[diagramme ou tableau pilier/supports]

### 9.2 Calendrier éditorial (15-20 briefs rédigés)
[Un brief complet par idée — format `.claude/templates/seo/article-brief.md`]

### 9.3 Refresh planning
| Page | Dernière maj | Action | Priorité |

### 9.4 Pages à créer (fiches spec)
[Une fiche par page — format `.claude/templates/seo/page-spec.md`]

## 10. Recommandations éditoriales & cohérence de l'offre
### 10.1 Incohérences détectées
| Page | Élément | Problème | Correction proposée | Priorité |

### 10.2 Copy prêt-à-coller (home + pages clés)
[Pour chaque page : A/B/C + meta + CTA — format `.claude/templates/seo/copy-proposal.md`]

### 10.3 Cartes services/pricing réécrites
[Pour chaque service — format `.claude/templates/seo/service-card.md`]

### 10.4 Enrichissement de l'offre
| Proposition | Type | Cible | Prix | Revenu estimé /mois | Effort | Risque |
|-------------|------|-------|------|--------------------|--------|--------|
| Guide PDF BTP | Lead magnet | ... | 0 € | ... | ... | ... |
| Atelier collectif | Palier intermédiaire | ... | 650 € | ... | ... | ... |
| Abonnement veille | Récurrent | ... | 150 €/mois | ... | ... | ... |

### 10.5 Dérives de cohérence cross-pages
| Page | Élément (CTA / lien / prix / nom) | Écart constaté | Correction |

### 10.6 Backlog consolidé (éditorial + offre + technique)
| # | Type | Titre / objet | URL | Effort (h) | Priorité | Trimestre |

## 11. Plan d'action priorisé

### 🔴 Critique (cette semaine)
1. ...

### 🟠 Haute priorité (ce mois)
1. ...

### 🟡 Moyen terme (trimestre)
1. ...

### 🟢 Fond de roadmap (année)
1. ...

## 12. Roadmap 90 jours / 6 mois / 12 mois

**Mois 1 — Fondations**
- Semaine 1 : corrections techniques critiques (canonical, indexation, headers sécurité)
- Semaine 2 : optimisation des pages en position 8-20 (Quick Wins GSC)
- Semaine 3 : enrichissement E-E-A-T des 3 pages les plus stratégiques
- Semaine 4 : rédaction 1 article pilier

**Mois 2 — Expansion**
- 2 articles supports par semaine (8 total)
- Création de 3 pages services sectorielles
- Démarrage digital PR (10 prospects)

**Mois 3 — Accélération**
- Page auteur Pierre Legrand complète
- Études de cas chiffrées (3)
- Optimisation LLM : llms.txt v2 + FAQ enrichie
- Mesure d'impact vs baseline Phase 0

**Mois 4-6** — [à détailler selon résultats M1-M3]

**Mois 7-12** — [à détailler]

## 13. KPIs à suivre
| KPI | Baseline | Cible M3 | Cible M6 | Cible M12 |
|-----|----------|----------|----------|-----------|
| Clics GSC / mois | X | +20 % | +50 % | +100 % |
| Impressions GSC / mois | X | +30 % | +80 % | +150 % |
| Position moyenne | X.X | < X-1 | < X-2 | ... |
| KW top 10 (DFS) | X | +50 % | +150 % | +300 % |
| Referring domains | X | +10 | +30 | +80 |
| Mentions LLM / mois | X | +X | ... | ... |
| Leads organiques / mois | X | ... | ... | ... |
```

---

**Utilisé par** :
- [`/seo-audit`](../../commands/seo-audit.md) — Phase 10 (structure du rapport final, sauvegardé dans `docs/seo-audits/<YYYY-MM-DD>-audit.md`)

**Exemple récent** : [`docs/seo-audits/2026-05-21-audit.md`](../../../docs/seo-audits/2026-05-21-audit.md)
