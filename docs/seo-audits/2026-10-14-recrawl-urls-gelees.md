# Recrawl des URL gelées — état au 2026-10-14

Suite de [2026-08-12-diagnostic-chute-juillet-plan-action.md](2026-08-12-diagnostic-chute-juillet-plan-action.md). Inspection d'URL GSC (API) sur les 41 URL du sitemap, le 2026-10-14.

## Constat

- L'alignement des `lastmod` sur 2026-09-07 (commit `f239785`, en prod) **a déclenché une vague de recrawl le 30 septembre** sur 16 pages, dont les deux piliers et la home. Ces pages ne portent plus le balisage d'avis.
- **21 pages n'ont pas été recrawlées depuis le retrait du balisage (2026-09-07)** : Google y voit encore « Extraits d'avis × 6 ».
- **4 URL du sitemap sont inconnues de Google** (« Google ne reconnaît pas cette URL ») alors qu'elles y figurent depuis 5 semaines : le sitemap seul ne suffit plus à faire découvrir une page.
- `/audit-informatique-val-doise` recrawlée le 30 septembre puis **retirée de l'index** (« Explorée, actuellement non indexée »).
- Ping IndexNow envoyé le 2026-10-14 sur les 41 URL (HTTP 200). IndexNow ne touche **pas** Google (Bing, Yandex, Naver, Seznam) : pour Google, seule la demande manuelle compte.

## À faire par Pierre : « Demander une indexation » dans GSC

Quota : ~10 demandes par jour et par propriété. Trois jours, dans cet ordre.

### Jour 1 — pages commerciales + pages jamais vues

| URL | Dernier crawl | État |
|---|---|---|
| `/audit-informatique-yvelines` | 2026-07-06 | avis encore vus |
| `/strategie-ia-pme` | 2026-08-05 | avis encore vus |
| `/integration-mcp` | 2026-07-28 | avis encore vus |
| `/contact` | 2026-09-01 | avis encore vus |
| `/blog` | 2026-07-11 | avis encore vus |
| `/prompts` | 2026-08-12 | avis encore vus |
| `/ia-souveraine-pme` | jamais | inconnue de Google |
| `/a-propos` | jamais | inconnue de Google |
| `/blog/ma-pme-en-2027` | jamais | inconnue de Google |
| `/blog/claude-cowork-community-manager` | jamais | inconnue de Google |

### Jour 2 — cluster Claude / MCP / IA dirigeant

| URL | Dernier crawl |
|---|---|
| `/blog/prompt-audit-projet-claude-fable` | 2026-07-30 |
| `/blog/serveur-mcp-heberge-pme` | 2026-07-30 |
| `/blog/serveur-mcp-integration-crm-erp` | 2026-07-13 |
| `/blog/ia-contradicteur-prompts-dirigeant-pme` | 2026-07-05 |
| `/blog/patron-goulot-paradoxe-ia-dirigeant-pme` | 2026-07-06 |
| `/blog/bilan-ia-janvier-juillet-2026` | 2026-08-11 |
| `/blog/compte-rendu-reunion-ia` | 2026-08-24 |
| `/blog/veille-concurrentielle-ia-pme` | 2026-08-23 |
| `/blog/automatiser-emails-reseaux-sociaux-ia` | 2026-07-08 |
| `/projets` | 2026-07-12 |

### Jour 3 — reste

| URL | Dernier crawl |
|---|---|
| `/blog/comparatif-llm-vente-commerciale` | 2026-08-16 |
| `/blog/machine-de-guerre-commerciale` | 2026-08-16 |
| `/blog/rapport-adoption-ia-btp-francilien-2026` | 2026-07-11 |
| `/blog/5-signes-moderniser-informatique-pme` | 2026-06-27 |
| `/plan-du-site` | 2026-08-12 |
| `/audit-informatique-val-doise` | 2026-09-30 (non indexée) |

## Pages propres (recrawlées après le 2026-09-07, sans balisage d'avis)

`/`, `/approche`, `/audit-ia-pme`, `/atelier-claude-code-dirigeant`, `/augmenter-mon-entreprise`, `/auteur/pierre-legrand`, `/idees`, `/blog/claude-code-prompt-architecture`, `/blog/configurer-odoo-ia-claude-cowork`, `/blog/cout-audit-informatique-yvelines`, `/blog/nis2-pme-yvelines-val-doise`, `/blog/serveur-mcp-guide-pratique-pme`, `/blog/cybersecurite-pme-guide-pratique`, `/blog/agent-ia-dirigeant-pme`, `/blog/ia-redefinit-vente-commerciale`.

## Contrôle

Rejouer l'inspection dans deux semaines (2026-10-28). Critère : plus aucune page avec « Extraits d'avis », les 4 inconnues découvertes, courbe d'impressions à relire sur la semaine 43.
