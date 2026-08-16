# GSC : pages non indexées — hygiène technique (2026-08-16)

> Propriété `sc-domain:augmenter.pro`. Décisions Pierre : 301 `/accueil-2` → `/`,
> retrait du news-sitemap, noindex des pages légales, périmètre technique **plus**
> renforcement éditorial des URLs « Explorée, non indexée » (en attente des
> captures GSC de chaque bac).

## Ce que GSC affiche (et ce que ça veut dire)

| Bac | Pages | Nature | Action |
|---|---|---|---|
| Page avec redirection | 5 | **Informatif**, pas une erreur | Laisser les 301/308. Google indexe la destination. |
| Doublon sans canonical utilisateur | 1 | `storages.augmenter.pro` (page Hostinger clusterisée avec nowdigital.fr) | noindex déjà posé — ne pas indexer |
| Explorée, actuellement non indexée | 15 | Refus **qualité/sélection**, pas un `robots.txt` | Hygiène + contenu (captures requises) |
| Détectée, actuellement non indexée | 1 | Pas encore crawlée (budget) | Sitemap déjà resoumis le 2026-08-16 |

L'API GSC **n'expose pas** la liste d'URLs de ces bacs. L'inspection unitaire + le repo ont suffi pour la partie technique.

Le `indexed: 0` sur les sitemaps après resoumission du jour est un **lag GSC**, pas une désindexation : la home est « Envoyée et indexée » (crawl 2026-08-13).

## Bugs / hygiène déjà corrigés dans le repo

### 1. 301 www → `https://augmenter.pro:3000/` (bug réel)

`curl -sI https://www.augmenter.pro/` renvoyait `Location: https://augmenter.pro:3000/`.

Cause : le middleware copiait l'en-tête `Host` (parfois `www.augmenter.pro:3000`, le port interne Node Hostinger) dans `request.nextUrl`. Googlebot ne peut pas suivre ce port.

Correctif : [`src/lib/canonical-host.ts`](../../src/lib/canonical-host.ts) reconstruit une URL `https://{apex}{path}` sans port. Tests dans `canonical-host.test.ts`.

Inspection GSC de `https://www.augmenter.pro/` : « Explorée, actuellement non indexée », dernier crawl **2026-03-26**. Un des 15 du bac, au minimum.

### 2. `/accueil-2` — 301 vers `/`

Variante B A/B (kill switch `AB_HOME_ENABLED` off). L'ADR 0005 demandait noindex ; le code n'avait qu'un canonical.

L'accès direct est maintenant un 301. Le preview interne `/?ab=b` reste un **rewrite** (l'URL navigateur reste `/`, les redirects `next.config` s'appliquent à la requête entrante, pas au rewrite).

### 3. News-sitemap retiré

21 articles déclarés en Google News, **0 indexé**. augmenter.pro n'est pas une publication News. Fichier supprimé, ligne retirée de `robots.txt`.

**À faire dans GSC (UI, l'API n'a pas de delete)** : Sitemaps → `https://augmenter.pro/news-sitemap.xml` → Supprimer.

### 4. Pages légales en `noindex, follow`

`/mentions-legales`, `/cgv`, `/politique-confidentialite` : meta robots + `X-Robots-Tag`, sorties du sitemap. Toujours liées depuis le footer (humains + transmission de PageRank). `/plan-du-site` reste indexable (décision Pierre).

Constantes : [`src/lib/seo-policy.ts`](../../src/lib/seo-policy.ts).

### 5. Double source sitemap/robots éliminée

`src/app/sitemap.ts` (19 URLs, incomplet) et `src/app/robots.ts` (minimal) étaient shadowés par `public/` en prod Hostinger (41 URLs sitemap, robots commenté). Piège identifié dans l'audit du 2026-05-28. Fichiers dynamiques **supprimés** : `public/sitemap.xml` et `public/robots.txt` sont la source unique.

## Constats GSC hors correctif code (pour les captures)

| URL | État inspection | Note |
|---|---|---|
| `https://augmenter.pro/` | Envoyée et indexée | OK. Referring `http://augmenter.pro/` = 301 http→https normal |
| `/approche` | Envoyée et indexée | OK |
| `/prestations` | Envoyée et indexée (crawl **10 avril**) | 308 live vers `/approche#prestations` depuis. Google n'a pas recrawl. Fragment ignoré → destination réelle = `/approche`. Demander une inspection après deploy. |
| `/prompts`, `/idees`, `/atelier-claude-code-dirigeant`, `/plan-du-site` | Envoyée et indexée | OK |
| `/blog/compte-rendu-reunion-ia` | Google ne reconnaît pas cette URL | Article du 12 août — candidat du bac « Détectée, non indexée » |
| `/accueil-2`, `/accueil-narrative` | Inconnues de Google | 301 / noindex préventifs |

## Captures GSC du 2026-08-16 — tri des URLs

### Page avec redirection (5) — ne pas « valider la correction »

Ce bac est **informatif**. Les 301/308 font leur travail. Cliquer « Valider la correction » demanderait à Google de vérifier qu'elles sont *devenues indexables* — l'inverse de ce qu'on veut.

| URL | Destination déjà en place |
|---|---|
| `/approche-360` | `/approche` |
| `/projets-pro` | `/idees` |
| `/rendez-vous-audit-360` | `/contact` |
| `/prestations-et-tarifs` | `/approche#prestations` |
| `http://augmenter.pro/` | `https://augmenter.pro/` |

### Doublon sans canonical (1) — hors de ce repo

`https://storages.augmenter.pro/` — Google a choisi comme canonique **`https://www.nowdigital.fr/`** (page d'accueil Hostinger générique, clusterisée avec d'autres sites). Déjà `noindex` + `Disallow` côté storage-server (session [noindex sous-domaines](2026-08-16-noindex-sous-domaines.md)). Après recrawl, le bac doit se vider. **Ne pas indexer.** Demande de suppression GSC sur le préfixe `https://storages.augmenter.pro/` si ça traîne.

### Explorée, actuellement non indexée (15)

| URL | Action |
|---|---|
| 2 polices `/_next/static/media/*.woff2` | Ignorer — Google a raison de ne pas indexer des fonts |
| `/sitemap.xml` | Ignorer |
| 8 anciennes URLs déjà en 301 (`/actualites-pro`, `/plateforme`, slugs pré-`/blog/`, etc.) | Recrawl → basculeront dans « Page avec redirection » |
| `www.augmenter.pro/` | Corrigé (fuite `:3000`) |
| `app.augmenter.pro/` | Session noindex sous-domaines — **ne pas indexer** |
| `/blog/comparatif-llm-vente-commerciale` | **À indexer** — contenu + maillage (cette session) |
| `/blog/machine-de-guerre-commerciale` | **À indexer** — tags + maillage (cette session). Article court : pas de padding inventé. |

### Détectée, actuellement non indexée (1)

`/blog/claude-cowork-community-manager` — jamais crawlée (`Sans objet`). Article déjà solide (11 min, FAQ). Maillage depuis la home (ch05) + `lastmod` sitemap 2026-08-16 pour déclencher le crawl.

## Reste à faire (captures GSC + contenu)

1. ~~Pierre envoie une capture de **chaque bac**~~ — reçu 2026-08-16.
2. Après déploiement : `curl -sI https://www.augmenter.pro/` → `Location: https://augmenter.pro/` **sans** `:3000`.
3. GSC UI : supprimer le news-sitemap ; **ne pas** valider le bac redirections ; inspection des 3 articles utiles ; suppression préfixe `storages.augmenter.pro` si besoin.
4. Les 8 anciennes URLs 301 + fonts : attendre le recrawl (2–4 semaines).

## Fichiers touchés

- `src/lib/canonical-host.ts` + tests
- `src/lib/seo-policy.ts` + `src/lib/seo-hygiene.test.ts`
- `src/middleware.ts`, `next.config.ts`
- pages légales, `public/sitemap.xml`, `public/robots.txt`
- suppression `public/news-sitemap.xml`, `src/app/sitemap.ts`, `src/app/robots.ts`
- `src/app/home-narrative/chapters/ch05-recit.tsx` — Claude Cowork en featured home
- `src/app/blog/comparatif-llm-vente-commerciale/page.tsx` — grille Claude/GPT/Gemini
- `src/app/blog/machine-de-guerre-commerciale/page.tsx` + `ia-redefinit-vente-commerciale`
- `src/app/strategie-ia-pme/page.tsx` — lien contextuel vers le comparatif
