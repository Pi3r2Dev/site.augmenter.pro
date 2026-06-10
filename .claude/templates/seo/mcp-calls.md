# Template — Bibliothèque d'appels MCP (SEO)

Recueil d'appels MCP types pour DataForSEO + Google Search Console, avec **signatures correctes vérifiées sur ce projet** (audit 2026-05-21). Permet d'éviter les erreurs de paramètres récurrentes et de ne pas dupliquer les snippets longs dans chaque commande.

> **Référencé par** : [`/seo-audit`](../../commands/seo-audit.md) (Phases 0 à 7). Les commandes plus légères (`/create-article`, `/create-resource`, `/modify-resource`) en utilisent un sous-ensemble (mots-clés + SERP).

---

## 0. Pings de validation (Phase 0 du seo-audit)

```text
mcp__google-search-console__list_sites             → confirme propriété sc-domain:augmenter.pro
mcp__dfs-mcp__kw_data_google_ads_locations         (country_iso_code: "FR")   → confirme accès DFS + récupère location_code 2250
mcp__firecrawl__firecrawl_scrape                  (url: "https://augmenter.pro", formats: ["markdown"])   → confirme Firecrawl self-hosted VPS
mcp__plugin_playwright_playwright__browser_navigate  (url: "about:blank")   → confirme Playwright
```

⚠️ **Pièges connus** :
- **GSC `dimensions`** = string CSV (`"query"`, `"page,query"`), **pas** un array JSON
- **DFS `kw_data_google_ads_locations`** : param requis = `country_iso_code` (`"FR"`), **pas** `country`
- **DFS Labs** : utiliser `location_name: "France"` (string) + `language_code: "fr"` — **pas** `location_code: 2250` (qui marche pour `serp_*` mais pas pour `dataforseo_labs_*`)
- **DFS `backlinks_*`** : nécessite une **souscription dédiée** (40204 Access denied sinon). Skipper la Phase 5 si non active

---

## 1. Google Search Console — baseline & analyse

### 1.1 Vue d'ensemble (courbe 90j)

```text
mcp__google-search-console__search_analytics
  siteUrl: "sc-domain:augmenter.pro"
  startDate: "<J-90>"
  endDate: "<J-3>"
  dimensions: "date"
  rowLimit: 100
```

### 1.2 Top requêtes

```text
mcp__google-search-console__search_analytics
  siteUrl: "sc-domain:augmenter.pro"
  startDate: "<J-90>"
  endDate: "<J-3>"
  dimensions: "query"
  rowLimit: 5000
```

### 1.3 Top pages

```text
mcp__google-search-console__search_analytics
  siteUrl: "sc-domain:augmenter.pro"
  startDate: "<J-90>"
  endDate: "<J-3>"
  dimensions: "page"
  rowLimit: 1000
```

### 1.4 Couples page × requête (la mine d'or)

```text
mcp__google-search-console__search_analytics
  siteUrl: "sc-domain:augmenter.pro"
  startDate: "<J-90>"
  endDate: "<J-3>"
  dimensions: "page,query"
  rowLimit: 5000
```

### 1.5 Breakdown device / country / search appearance

```text
dimensions: "device"           → mobile vs desktop performance
dimensions: "country"          → fuites internationales ?
dimensions: "searchAppearance" → rich results performance
dimensions: "query,device"     → cannibalisation mobile-only
```

### 1.6 Quick Wins (positions 4-10 avec impressions, CTR sous-optimal)

```text
mcp__google-search-console__detect_quick_wins
  siteUrl: "sc-domain:augmenter.pro"
  startDate: "<J-90>"
  endDate: "<J-3>"
```

### 1.7 Inspection d'indexation (10-15 URLs prioritaires)

```text
mcp__google-search-console__index_inspect
  siteUrl: "sc-domain:augmenter.pro"
  inspectionUrl: "https://augmenter.pro/<path>"
```

Extraire : `coverageState`, `googleCanonical` vs `userCanonical` (drift = problème), `lastCrawlTime`, `richResultsResult.detectedItems`.

### 1.8 Sitemaps

```text
mcp__google-search-console__list_sitemaps           (siteUrl)
mcp__google-search-console__get_sitemap             (siteUrl, feedpath)
mcp__google-search-console__submit_sitemap          (siteUrl, feedpath)
```

> Note : le compteur `indexed: 0` retourné par `list_sitemaps` est un bug d'affichage GSC connu — vérifier l'indexation via `index_inspect`.

---

## 2. DataForSEO Labs — keywords & positioning

### 2.1 Keywords positionnés par augmenter.pro

```text
mcp__dfs-mcp__dataforseo_labs_google_ranked_keywords
  target: "augmenter.pro"
  location_name: "France"
  language_code: "fr"
  limit: 500
  order_by: ["keyword_data.keyword_info.search_volume,desc"]
```

⚠️ Sur un petit domaine, DFS Labs peut retourner un dataset très partiel (1-5 keywords) alors que GSC en voit ~80+. Dans ce cas, **GSC est la source primaire** pour les keywords positionnés.

### 2.2 Vue d'ensemble du domaine

```text
mcp__dfs-mcp__dataforseo_labs_google_domain_rank_overview
  target: "augmenter.pro"
  location_name: "France"
  language_code: "fr"
```

### 2.3 Keyword ideas / suggestions / related

```text
mcp__dfs-mcp__dataforseo_labs_google_keyword_ideas
  keywords: ["<seed1>", "<seed2>"]
  location_name: "France"
  language_code: "fr"
  limit: 200
  include_serp_info: true

mcp__dfs-mcp__dataforseo_labs_google_keyword_suggestions
  keyword: "<seed>"
  location_name: "France"
  language_code: "fr"
  limit: 200

mcp__dfs-mcp__dataforseo_labs_google_related_keywords
  keyword: "<seed>"
  location_name: "France"
  language_code: "fr"
  depth: 2
  limit: 100
```

### 2.4 Bulk volumes + difficulté + intent + trafic estimé

```text
mcp__dfs-mcp__kw_data_google_ads_search_volume
  keywords: [...]
  location_code: 2250        # OK pour kw_data_*
  language_code: "fr"

mcp__dfs-mcp__dataforseo_labs_bulk_keyword_difficulty
  keywords: [...]
  location_name: "France"
  language_code: "fr"

mcp__dfs-mcp__dataforseo_labs_search_intent
  keywords: [...]
  language_code: "fr"

mcp__dfs-mcp__dataforseo_labs_bulk_traffic_estimation
  targets: ["augmenter.pro"]
  location_name: "France"
  language_code: "fr"
```

### 2.5 Concurrents SEO

```text
mcp__dfs-mcp__dataforseo_labs_google_competitors_domain
  target: "augmenter.pro"
  location_name: "France"
  language_code: "fr"
  limit: 30

mcp__dfs-mcp__dataforseo_labs_google_serp_competitors
  keywords: ["consultant IA PME", "audit IA entreprise", ...]
  location_name: "France"
  language_code: "fr"
  limit: 50

mcp__dfs-mcp__dataforseo_labs_google_domain_intersection
  targets: ["augmenter.pro", "<concurrent1>", "<concurrent2>"]
  location_name: "France"
  language_code: "fr"
  intersection_mode: "concurrent_any_ours_none"   # opportunités content gap
  limit: 500
```

### 2.6 Tendances

```text
mcp__dfs-mcp__kw_data_google_trends_explore
  keywords: ["IA entreprise", "ChatGPT PME"]
  location_code: 2250
  date_from: "<J-365>"
  date_to: "<J-1>"
```

---

## 3. SERP analysis (DFS)

```text
mcp__dfs-mcp__serp_organic_live_advanced
  keyword: "<kw>"
  location_code: 2250
  language_code: "fr"
  device: "desktop"
  depth: 20
  people_also_ask_click_depth: 2
```

Extraire : top 10 URLs, features (`featured_snippet`, `people_also_ask`, `ai_overview`, `video`, `image`, `local_pack`), longueur top 3, opportunités snippet vide.

---

## 4. Core Web Vitals (Lighthouse via DFS)

```text
mcp__dfs-mcp__on_page_lighthouse
  url: "https://augmenter.pro/<path>"
  for_mobile: true
  categories: ["performance", "accessibility", "best-practices", "seo"]
```

Seuils Good / Needs Improvement / Poor :
- **LCP** : ≤ 2.5s / ≤ 4.0s / > 4.0s
- **INP** : ≤ 200ms / ≤ 500ms / > 500ms
- **CLS** : ≤ 0.1 / ≤ 0.25 / > 0.25

---

## 5. Backlinks (DFS — souscription requise)

⚠️ Toute cette section nécessite une **souscription DataForSEO Backlinks** active (sinon `40204 Access denied`).

```text
mcp__dfs-mcp__backlinks_summary                     (target, include_subdomains: true)
mcp__dfs-mcp__backlinks_referring_domains           (target, limit: 100, order_by: ["rank,desc"])
mcp__dfs-mcp__backlinks_bulk_spam_score             (targets: ["augmenter.pro"])
mcp__dfs-mcp__backlinks_anchors                     (target, limit: 100)
mcp__dfs-mcp__backlinks_timeseries_new_lost_summary (target, date_from, date_to)
mcp__dfs-mcp__backlinks_bulk_ranks                  (targets: ["augmenter.pro", "<c1>", "<c2>"])
mcp__dfs-mcp__backlinks_competitors                 (target, limit: 20)
mcp__dfs-mcp__backlinks_domain_intersection         (targets, exclude_targets, limit: 200)   # cibles digital PR
```

---

## 6. GEO / LLM (DFS AI Optimization)

### 6.1 Mentions agrégées (DFS)

```text
mcp__dfs-mcp__ai_opt_llm_ment_search
  keyword: "consultant IA PME France"
  llm: "chatgpt"        # ou perplexity, gemini, claude

mcp__dfs-mcp__ai_opt_llm_ment_agg_metrics
  target: "augmenter.pro"
  date_from: "<J-90>"

mcp__dfs-mcp__ai_opt_llm_ment_top_domains      (keyword)
mcp__dfs-mcp__ai_opt_llm_ment_top_pages        (target)

mcp__dfs-mcp__ai_optimization_chat_gpt_scraper
  prompt: "Quel consultant IA pour PME en Yvelines ?"
  location_code: 2250

mcp__dfs-mcp__ai_optimization_llm_response
  model: "gpt-4"
  prompt: "<prompt>"
```

### 6.2 Tests directs multi-moteurs (Playwright MCP)

Pour les moteurs non couverts par les scrapers DFS (Perplexity Pro, Gemini AI Mode, Brave Summarizer, Bing Copilot, Claude web), utiliser Playwright MCP. Le pattern est identique pour chaque :

```text
1. mcp__plugin_playwright_playwright__browser_navigate
   url: "<URL du moteur avec query en paramètre>"

2. mcp__plugin_playwright_playwright__browser_wait_for
   text: "Sources" / "Citations" / "Références"   # selon le moteur

3. mcp__plugin_playwright_playwright__browser_snapshot
   # capture accessibility tree (préférer à screenshot pour parsing)

4. (optionnel) mcp__plugin_playwright_playwright__browser_take_screenshot
   filename: "geo-test-<moteur>-<promptId>.png"
```

URLs cibles par moteur :

| Moteur | URL pattern | Notes |
|--------|-------------|-------|
| Perplexity Pro Search | `https://www.perplexity.ai/?q=<prompt-url-encoded>` | Pas de login requis pour tests basiques |
| Google Gemini AI Mode | `https://www.google.com/search?q=<prompt>&udm=50` | Paramètre `udm=50` force AI Mode |
| Google AI Overviews | `https://www.google.com/search?q=<prompt>` | AIO apparaît automatiquement sur queries informationnelles |
| Brave Summarizer | `https://search.brave.com/search?q=<prompt>&summary=1` | Pas de login |
| Bing Copilot | `https://www.bing.com/chat?q=<prompt>` | Login Microsoft requis ; alternative : DFS `ai_optimization_llm_response` avec `model: "bing"` si supporté |
| Claude.ai (search) | `https://claude.ai/new?q=<prompt>` | Login Anthropic requis ; sinon skip |
| ChatGPT (Search) | API DFS (§6.1) — plus fiable que scraping web | — |

**Extraction à faire dans le snapshot** :
- `augmenter.pro` apparaît dans les sources / citations ? (yes/no)
- Position dans la liste (1, 2, 3…)
- URL exacte citée (vérifier que ce n'est pas une redirection 301)
- Fragment de texte cité verbatim (pour identifier quelle section de la page a été retenue)
- Sources concurrentes citées (`ipaconseils.fr`, `agence-ia.com`, `france-num.fr`, etc.)

### 6.3 Test crawlabilité bot-by-bot (robots.txt + User-Agent)

Pour vérifier qu'un bot IA spécifique peut crawler une URL, simuler son User-Agent via Firecrawl :

```text
# Via API REST Firecrawl self-hosted (VPS IONOS)
curl -X POST "${FIRECRAWL_API_URL:-https://firecrawl-test.augmenter.pro}/v2/scrape" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://augmenter.pro/blog/<slug>",
    "formats": ["markdown"],
    "headers": {
      "User-Agent": "GPTBot/1.0 (+https://openai.com/gptbot)"
    }
  }'
```

User-Agents à tester (au minimum) :
- `GPTBot/1.0 (+https://openai.com/gptbot)` (OpenAI training)
- `OAI-SearchBot/1.0 (+https://openai.com/searchbot)` (ChatGPT Search live)
- `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)` (Anthropic)
- `Mozilla/5.0 (compatible; Google-Extended)` (Gemini training opt-in)
- `Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://docs.perplexity.ai/docs/perplexity-bot)` (Perplexity)
- `Mozilla/5.0 (compatible; CCBot/2.0; +http://commoncrawl.org/faq/)` (Common Crawl)

**Pour chaque bot** : statut HTTP attendu = 200, contenu HTML/markdown extrait complet, pas de blocage CSP/CORS, pas de header `X-Robots-Tag: noai`.

---

## 7. On-page / domain analytics (DFS)

```text
mcp__dfs-mcp__on_page_content_parsing
  url: "https://augmenter.pro/<path>"        # DOM réel, croisé avec le code source

mcp__dfs-mcp__on_page_instant_pages
  url: "https://augmenter.pro/<path>"

mcp__dfs-mcp__domain_analytics_technologies_domain_technologies
  target: "augmenter.pro"                    # ou concurrent — utile pour benchmark stack
```

---

## 8. Firecrawl (self-hosted VPS IONOS)

> **URLs** : prod Coolify → `http://10.10.0.1:3002` (WireGuard) · dev Cursor → `https://firecrawl-test.augmenter.pro` (Caddy + basic-auth) · cf. [CLAUDE.md](../../../CLAUDE.md) § Web Crawling

```text
mcp__firecrawl__firecrawl_scrape
  url: "https://<site>"
  formats: ["markdown"]                       # markdown brut d'une URL

mcp__firecrawl__firecrawl_crawl
  url: "https://<site>"                       # crawl récursif (job async)

mcp__firecrawl__firecrawl_batch_scrape
  urls: ["https://<site>/page1", "..."]      # scrape batch
```

Endpoint REST de fallback si le MCP est indisponible :

```bash
# URL unique → markdown
curl -X POST "${FIRECRAWL_API_URL:-https://firecrawl-test.augmenter.pro}/v2/scrape" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://<site>", "formats": ["markdown"]}'
```

Réponse attendue : `{"success": true, "data": {"markdown": "...", "metadata": {...}}}`

⚠️ **crawl4ai.augmenter.pro est caduc** — ne plus l'utiliser (remplacé par Firecrawl VPS, cf. [docs/decisions/0004-firecrawl-ionos-migration.md](../../../docs/decisions/0004-firecrawl-ionos-migration.md)).

---

## 9. IndexNow (push d'index Bing / ChatGPT Search)

> **Pourquoi** : ChatGPT Search s'appuie sur l'index **Bing**, pas Google. IndexNow (protocole Microsoft/Yandex) pousse une URL fraîche ou modifiée dans l'index en quelques heures — décisif pour les contenus *first-mover*. Levier consigné dans [`checklist.md`](checklist.md) §G.8.

### 9.1 Prérequis (actions manuelles utilisateur, une seule fois)

1. **Bing Webmaster Tools** : vérifier `augmenter.pro` via l'import de la propriété Google Search Console (`bing.com/webmasters` → Importer depuis GSC).
2. **Clé IndexNow** : générer une clé (32+ caractères hexadécimaux, ex. depuis `bing.com/indexnow`) et la déposer en `public/<clé>.txt` — le fichier doit contenir **uniquement la clé en clair**, accessible en HTTP 200 à `https://augmenter.pro/<clé>.txt`.

> Tant que le fichier clé n'est pas en ligne, l'API IndexNow renvoie **403** (clé non vérifiable). Ne pas committer de fausse clé.

### 9.2 Ping d'une ou plusieurs URLs (après publication / modification)

Remplacer `<CLE_INDEXNOW>` par la clé déposée en `public/`.

```bash
# Une seule URL (variante GET, la plus simple)
curl "https://api.indexnow.org/indexnow?url=https://augmenter.pro/blog/<slug>&key=<CLE_INDEXNOW>"

# Un lot d'URLs (variante POST JSON — préférée pour publication + maillage impacté)
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "augmenter.pro",
    "key": "<CLE_INDEXNOW>",
    "keyLocation": "https://augmenter.pro/<CLE_INDEXNOW>.txt",
    "urlList": [
      "https://augmenter.pro/blog/<slug>"
    ]
  }'
```

Réponse attendue : **200** (URLs acceptées) ou **202** (acceptées, en attente de validation de clé). Codes d'erreur utiles : **403** (clé invalide / fichier absent), **422** (URL hors du `host` déclaré), **429** (trop de requêtes).

> **Quand pinger** : à chaque **publication** d'une nouvelle URL et à chaque **modification / redirection 301** d'une URL existante. Utilisé par [`/create-article`](../../commands/create-article.md) et [`/create-resource`](../../commands/create-resource.md) (étape d'intégration finale) et [`/modify-resource`](../../commands/modify-resource.md) (toute URL modifiée/redirigée).

---

## Conventions de fenêtre temporelle

- `<J-3>` au lieu de today : GSC publie les données à J-2/J-3 (éviter les rows à 0 du dernier jour)
- `<J-90>` : fenêtre standard pour baseline et tendances
- Comparaisons period-over-period : 2× 90 jours consécutifs (courant vs précédent)
- Refresh de baseline : à chaque audit `/seo-audit`, archiver la table KPIs dans `docs/seo-audits/<date>-audit.md` §13 pour suivi

---

**Utilisé par** :
- [`/seo-audit`](../../commands/seo-audit.md) — Phase 0 (pings de validation) + Phases 1-7 (tous les appels)
- [`/create-article`](../../commands/create-article.md) — §1 GSC baseline / §2 DFS keyword research / §3 SERP top 10 + §9 (ping IndexNow après publication)
- [`/create-resource`](../../commands/create-resource.md) — §1, §2, §3 (mêmes usages que create-article + opportunités content gap §2.5 si analyse concurrentielle approfondie) + §9 (ping IndexNow après publication)
- [`/modify-resource`](../../commands/modify-resource.md) — §1.4 (page × query pour identifier l'impact réel) + §1.7 (`index_inspect` post-modification) + §9 (ping IndexNow sur toute URL modifiée/redirigée)
