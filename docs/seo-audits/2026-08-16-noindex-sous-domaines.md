# Masquer les sous-domaines `*.augmenter.pro` aux moteurs de recherche

> Session du 2026-08-16. Contexte : la propriété Search Console est de type **domaine**
> (`sc-domain:augmenter.pro`) — elle agrège donc **tous** les sous-domaines. Chaque outil interne
> indexé pollue les statistiques du site vitrine et expose l'outillage dans les résultats de recherche.

## Constat de départ

| Sous-domaine | État avant | Gravité |
|---|---|---|
| **app.augmenter.pro** | **Indexé** (23 impressions / 6 mois, 1 page) et `robots.txt` avec `Allow: /` **+ déclaration d'un sitemap** — invitation active à l'indexation | 🔴 |
| litellm.augmenter.pro | HTTP 200, Swagger UI de l'API exposée, aucun `X-Robots-Tag` | 🟠 |
| storages.augmenter.pro | HTTP 200 (page par défaut Hostinger), stockage de fichiers, aucun `X-Robots-Tag` | 🟠 |
| nango / connect-nango | HTTP 200, aucun `X-Robots-Tag` | 🟡 |
| animates (401), s3 (400), api (404) | protégés ou muets, mais sans `X-Robots-Tag` | 🟢 |
| langfuse, flower, bullboard, uptime, grafana | non déployés actuellement (404/DNS absent) | 🟢 |
| firecrawl-test | **DNS mort**, Caddy inactif sur le VPS IONOS | — |

Aucun lien depuis le site vitrine vers un sous-domaine (vérifié sur `src/` et `public/`) — le seul
vecteur de découverte était le crawl direct et le `robots.txt` permissif de l'app.

## Le principe appliqué (et le piège à éviter)

**`Disallow` dans robots.txt ≠ désindexation.** Un `Disallow` empêche le *crawl*, pas l'*indexation* :
une URL bloquée peut rester listée (sans description) si Google la connaît déjà. Pire, s'il ne peut
plus crawler la page, **il ne verra jamais le `noindex`** et l'URL restera indexée indéfiniment.

Donc la séquence correcte pour une URL **déjà indexée** (cas `app.augmenter.pro`) :

1. **Maintenant** : `X-Robots-Tag: noindex` en en-tête HTTP **+ crawl laissé autorisé**, pour que
   Googlebot puisse constater le `noindex` et sortir l'URL de l'index.
2. **Dans 1 à 2 mois**, une fois l'URL disparue de l'index (à vérifier dans Search Console) :
   basculer le `robots.txt` en `Disallow: /` pour économiser le budget de crawl.

Pour les sous-domaines **jamais indexés**, `noindex` + `Disallow` d'emblée est sans risque.

## Ce qui a été mis en place

### 1. Middleware Traefik partagé (Coolify)

`/data/coolify/proxy/dynamic/noindex.yml` sur l'hôte Coolify — ajoute
`X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` aux réponses.

> ⚠️ **Ne jamais poser ce middleware au niveau de l'`entrypoint`** : le même proxy sert
> **coachcredit.fr**, site public qui doit rester indexé. Le middleware est donc attaché
> **routeur par routeur**, via les labels des fichiers compose.

### 2. Labels `middlewares=noindex@file` (14 labels, 12 routeurs, versionnés)

| Fichier | Routeurs équipés |
|---|---|
| `unified-infrastructure/docker-compose.coolify.yml` | langfuse, litellm, flower, bullboard, uptime, grafana |
| `app.augmenter.pro/docker-compose.coolify.yml` | nango-connect, nango-api, backend, hocuspocus\*, frontend |
| `anime-shorts-review/docker-compose.coolify.yml` | review-studio\*, review-sync |
| `anime-shorts-review/docker-compose.minio.yml` | animates-s3 |

\* routeurs qui avaient déjà un middleware (`hocuspocus-strip`, `review-auth`) → `noindex@file`
a été **ajouté à la suite**, pas substitué.

### 3. app.augmenter.pro (Next.js 15) — double ceinture

- `frontend/next.config.ts` : en-tête `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`
  sur `/(.*)`
- `frontend/public/robots.txt` : suppression de la déclaration de sitemap ; crawl **volontairement
  laissé ouvert** le temps de la désindexation (cf. séquence ci-dessus)

### 4. storages.augmenter.pro (Hostinger) — ✅ actif et vérifié

`app.augmenter.pro/storage-server/.htaccess` : `Header always set X-Robots-Tag "noindex, …"`
+ `robots.txt` en `Disallow: /` (jamais indexé, donc les deux d'emblée).
Déployé sur le serveur et **confirmé en live**.

## Reste à faire

- [ ] **Redéployer les 3 stacks Coolify** pour que les labels prennent effet :
      `unified-infrastructure`, `app.augmenter.pro`, `anime-shorts-review`.
      Sans redéploiement, les conteneurs conservent leurs anciens labels.
- [ ] **Demande de suppression Search Console** pour `app.augmenter.pro` (masquage immédiat ~6 mois,
      le temps que le `noindex` fasse effet) : Search Console → Suppressions → Nouvelle demande →
      « Supprimer toutes les URL avec ce préfixe » → `https://app.augmenter.pro/`
- [ ] **Vérification après redéploiement** :
      `curl -sI https://litellm.augmenter.pro/ | grep -i x-robots-tag`
- [ ] **Dans 1-2 mois** : une fois `app.augmenter.pro` sorti de l'index, passer son `robots.txt`
      en `Disallow: /`.

## Réflexe pour la suite

Tout nouveau sous-domaine `*.augmenter.pro` exposé publiquement doit naître avec
`traefik.http.routers.<nom>.middlewares=noindex@file` dans son compose — sauf s'il s'agit
d'un site public destiné à être référencé.
