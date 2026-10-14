# Recrawl des URL gelées — état au 2026-10-14

Suite de [2026-08-12-diagnostic-chute-juillet-plan-action.md](2026-08-12-diagnostic-chute-juillet-plan-action.md). Inspection d'URL GSC (API) sur les 41 URL du sitemap, le 2026-10-14. Mis à jour le même jour avec les 8 URL du cluster MCP / Odoo 20 (commits `ecee8c8`, `b4b42b3`, `6357ff9`, `8bc9682`).

## Constat

- L'alignement des `lastmod` sur 2026-09-07 (commit `f239785`, en prod) **a déclenché une vague de recrawl le 30 septembre** sur 16 pages, dont les deux piliers et la home. Ces pages ne portent plus le balisage d'avis.
- **21 pages n'ont pas été recrawlées depuis le retrait du balisage (2026-09-07)** : Google y voit encore « Extraits d'avis × 6 ».
- **4 URL du sitemap sont inconnues de Google** (« Google ne reconnaît pas cette URL ») alors qu'elles y figurent depuis 5 semaines : le sitemap seul ne suffit plus à faire découvrir une page.
- `/audit-informatique-val-doise` recrawlée le 30 septembre puis **retirée de l'index** (« Explorée, actuellement non indexée »).
- **8 nouvelles URL** (landing + 7 articles) attendent le déploiement : elles renvoient **404 en prod** au 2026-10-14. Vu le point précédent, elles ne seront pas découvertes par le sitemap seul.
- Ping IndexNow envoyé le 2026-10-14 sur les 41 URL **déjà en ligne** (HTTP 200). IndexNow ne touche **pas** Google (Bing, Yandex, Naver, Seznam) : pour Google, seule la demande manuelle compte.

## Préalable : déployer, puis pinger les 8 nouvelles URL

1. Pousser `main` (déploiement Hostinger). Vérifier que les nouvelles pages répondent :

```bash
for u in serveur-mcp-odoo blog/claude-code-odoo-workflow; do curl -s -o /dev/null -w "$u %{http_code}\n" "https://augmenter.pro/$u?bust=$RANDOM"; done
```

2. Une fois en 200, ping IndexNow des 8 URL :

```bash
curl -s -o /dev/null -w "indexnow %{http_code}\n" -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" --data '{"host":"augmenter.pro","key":"96dcfd53b10246a296724faac42d91da","keyLocation":"https://augmenter.pro/96dcfd53b10246a296724faac42d91da.txt","urlList":["https://augmenter.pro/serveur-mcp-odoo","https://augmenter.pro/blog/claude-code-odoo-workflow","https://augmenter.pro/blog/odoo-20-serveur-mcp-agents","https://augmenter.pro/blog/agent-ia-qui-ne-touche-pas-aux-prix","https://augmenter.pro/blog/petit-modele-bien-outille","https://augmenter.pro/blog/ia-enrichir-catalogue-sans-perdre-la-main","https://augmenter.pro/blog/odoo-online-ce-que-vous-ne-pouvez-pas-installer","https://augmenter.pro/blog/logiciel-construit-par-agents-dix-semaines"]}'
```

## À faire par Pierre : « Demander une indexation » dans GSC

Quota : ~10 demandes par jour et par propriété. Quatre jours, dans cet ordre, **à partir du jour du déploiement**.

### Jour 1 — pages commerciales, nouvelles et modifiées

| URL | Dernier crawl | État |
|---|---|---|
| `/serveur-mcp-odoo` | jamais | **nouvelle** landing |
| `/blog/claude-code-odoo-workflow` | jamais | **nouveau** pilier technique |
| `/integration-mcp` | 2026-07-28 | avis encore vus + maillage modifié (`ecee8c8`) |
| `/blog/configurer-odoo-ia-claude-cowork` | 2026-09-30 | propre, mais modifiée (`b4b42b3`) : pilier n°1 du cluster |
| `/audit-informatique-yvelines` | 2026-07-06 | avis encore vus |
| `/strategie-ia-pme` | 2026-08-05 | avis encore vus |
| `/contact` | 2026-09-01 | avis encore vus |
| `/blog` | 2026-07-11 | avis encore vus |
| `/ia-souveraine-pme` | jamais | inconnue de Google |
| `/a-propos` | jamais | inconnue de Google |

### Jour 2 — essaim MCP / Odoo 20 + pages jamais vues

| URL | Dernier crawl | État |
|---|---|---|
| `/blog/odoo-20-serveur-mcp-agents` | jamais | **nouveau** |
| `/blog/odoo-online-ce-que-vous-ne-pouvez-pas-installer` | jamais | **nouveau** |
| `/blog/agent-ia-qui-ne-touche-pas-aux-prix` | jamais | **nouveau** |
| `/blog/petit-modele-bien-outille` | jamais | **nouveau** |
| `/blog/ia-enrichir-catalogue-sans-perdre-la-main` | jamais | **nouveau** |
| `/blog/logiciel-construit-par-agents-dix-semaines` | jamais | **nouveau** |
| `/blog/ma-pme-en-2027` | jamais | inconnue de Google |
| `/blog/claude-cowork-community-manager` | jamais | inconnue de Google |
| `/prompts` | 2026-08-12 | avis encore vus |
| `/projets` | 2026-07-12 | avis encore vus |

### Jour 3 — cluster Claude / MCP / IA dirigeant gelé

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
| `/plan-du-site` | 2026-08-12 (modifiée par `ecee8c8`) |

### Jour 4 — reste

| URL | Dernier crawl |
|---|---|
| `/blog/comparatif-llm-vente-commerciale` | 2026-08-16 |
| `/blog/machine-de-guerre-commerciale` | 2026-08-16 |
| `/blog/rapport-adoption-ia-btp-francilien-2026` | 2026-07-11 |
| `/blog/5-signes-moderniser-informatique-pme` | 2026-06-27 |
| `/audit-informatique-val-doise` | 2026-09-30 (non indexée) |

## Pages propres (recrawlées après le 2026-09-07, sans balisage d'avis, non modifiées depuis)

`/`, `/approche`, `/audit-ia-pme`, `/atelier-claude-code-dirigeant`, `/augmenter-mon-entreprise`, `/auteur/pierre-legrand`, `/idees`, `/blog/claude-code-prompt-architecture`, `/blog/cout-audit-informatique-yvelines`, `/blog/nis2-pme-yvelines-val-doise`, `/blog/serveur-mcp-guide-pratique-pme`, `/blog/cybersecurite-pme-guide-pratique`, `/blog/agent-ia-dirigeant-pme`, `/blog/ia-redefinit-vente-commerciale`.

### Jour 5 — pages « propres » modifiées le 2026-10-14 au soir (commits `f52ee32`, `dff6939`)

La purge des chiffres non sourcés et des cas clients inventés a touché cinq pages de la liste ci-dessus : `/`, `/approche`, `/audit-ia-pme`, `/blog/cout-audit-informatique-yvelines`, `/blog/serveur-mcp-guide-pratique-pme`. Elles ne sont plus « non modifiées » : les demander en jour 5. Les huit autres pages modifiées par la même purge (`/strategie-ia-pme`, `/audit-informatique-yvelines`, `/audit-informatique-val-doise`, `/blog/ia-contradicteur-prompts-dirigeant-pme`, `/blog/rapport-adoption-ia-btp-francilien-2026`, `/blog/veille-concurrentielle-ia-pme`, `/blog/automatiser-emails-reseaux-sociaux-ia`, `/blog/serveur-mcp-integration-crm-erp`, `/blog/5-signes-moderniser-informatique-pme`) figurent déjà dans les jours 1 à 4. Le `lastmod` du sitemap est passé au 2026-10-14 pour les 13. Après déploiement, les ajouter au ping IndexNow :

```bash
curl -s -o /dev/null -w "indexnow %{http_code}\n" -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" --data '{"host":"augmenter.pro","key":"96dcfd53b10246a296724faac42d91da","keyLocation":"https://augmenter.pro/96dcfd53b10246a296724faac42d91da.txt","urlList":["https://augmenter.pro/","https://augmenter.pro/approche","https://augmenter.pro/strategie-ia-pme","https://augmenter.pro/audit-ia-pme","https://augmenter.pro/audit-informatique-yvelines","https://augmenter.pro/audit-informatique-val-doise","https://augmenter.pro/blog/cout-audit-informatique-yvelines","https://augmenter.pro/blog/serveur-mcp-guide-pratique-pme","https://augmenter.pro/blog/serveur-mcp-integration-crm-erp","https://augmenter.pro/blog/ia-contradicteur-prompts-dirigeant-pme","https://augmenter.pro/blog/rapport-adoption-ia-btp-francilien-2026","https://augmenter.pro/blog/veille-concurrentielle-ia-pme","https://augmenter.pro/blog/automatiser-emails-reseaux-sociaux-ia","https://augmenter.pro/blog/5-signes-moderniser-informatique-pme"]}'
```

## Contrôle

Rejouer l'inspection deux semaines après le jour 1 (au plus tôt le 2026-10-28). Critères : plus aucune page avec « Extraits d'avis », les 4 inconnues et les 8 nouvelles découvertes et indexées, courbe d'impressions relue sur la semaine suivante.
