---
adr: 0007
title: Google Actualités — Discover d'abord, format « news » réservé aux sujets datés
status: accepted
date: 2026-10-14
deciders: Pierre Legrand
consulted: Claude Code (session interactive)
informed: boucle de travail (docs/backlog-news.md)
supersedes: retrait du news-sitemap du 2026-08-16 (pas d'ADR à l'époque)
---

# ADR 0007 — Google Actualités : Discover d'abord, format « news » réservé aux sujets datés

## Contexte

Question de Pierre (2026-10-14) : « comment apparaître sur Google News ? Il n'y a pas d'article d'aussi bonne qualité que les nôtres. »

Faits vérifiés le 2026-10-14 :

- **On ne postule plus.** Google a fermé l'ajout manuel de publications dans Publisher Center (finalisé en mars 2025). L'éligibilité à Google Actualités est automatique pour tout éditeur qui respecte les règles de contenu ; Publisher Center est facultatif et n'influe pas sur l'éligibilité. Les flux RSS soumis ne sont plus lus, le logo et le nom viennent du favicon et du nom de site.
- **La qualité d'un guide n'est pas le critère.** Les facteurs de classement d'Actualités sont la pertinence, la notoriété, l'autorité, la **fraîcheur**, le lieu et la langue. Un guide durable (« workflow Claude Code + Odoo ») est classé dans la recherche web, jamais dans l'onglet Actualités.
- **Le site n'a pas le profil.** 31 articles publiés en 2026 (≈ 3 par mois), presque tous des guides. Balisage `Article`, pas `NewsArticle`.
- **Premier essai raté.** Un `news-sitemap.xml` statique listant tous les articles a été posé puis retiré le 2026-08-16 : zéro URL indexée en Actualités, crawl pollué. Le site garde l'interrupteur `NEWS_SITEMAP_ENABLED = false` (`src/lib/seo-policy.ts`) et trois assertions qui l'imposent (`src/lib/seo-hygiene.test.ts`).
- **Objectif business inchangé** : recevoir des demandes de devis (CLAUDE.md § Acquisition), pas du trafic.

Sources : [Search Engine Land — Publisher Center](https://searchengineland.com/google-publisher-center-to-stop-allowing-you-to-add-publications-439978), [PPC Land — publication pages automatisées](https://ppc.land/google-news-shifts-to-automated-publication-pages/), [Google News Initiative — Publisher Center](https://newsinitiative.withgoogle.com/resources/trainings/start-building-your-audience/get-started-on-google-news-with-publisher-center/).

## Décision

1. **On ne court pas après l'onglet Google Actualités.** Y entrer exigerait des nouvelles quotidiennes, contraire à la ligne éditoriale et à l'objectif devis.
2. **Discover d'abord.** C'est la surface où Google pousse des articles de fond sans requête. On lève le seul frein technique restant : la directive `max-image-preview:large` (forme Next 16 : `robots.googleBot['max-image-preview'] = 'large'`, émise dans une meta `googlebot`). Le reste est déjà en place : visuels d'articles de 1 200 à 2 752 px de large, image Open Graph 1 200 × 630 par article, date de publication visible, `dateModified` honnête, page auteur et page à propos.
3. **Format « news » réservé aux sujets datés** (2 à 3 par trimestre : sortie d'Odoo 20, lancement d'un modèle Claude, changement du plan Osez l'IA, bilan semestriel IA). Pour ceux-là seulement : publication sous 24 à 48 h après l'événement, balisage `NewsArticle`, et un **sitemap news dynamique** qui ne liste que les articles « news » publiés dans les **48 dernières heures**. *Amendé le 2026-10-16* : quand aucun n'est dans la fenêtre, il garde la news la plus récente déjà publiée, car Search Console rejette un urlset vide (« Balise XML manquante », première lecture du 2026-10-16).
4. Articles « news » au 2026-10-14 : `odoo-20-serveur-mcp-agents` (2026-10-14) et `bilan-ia-janvier-juillet-2026` (2026-07-29). Tous les autres restent des guides.

## Pourquoi c'est différent de l'essai d'août

L'essai d'août listait **tous** les articles dans un fichier statique : Google a vu un « sitemap news » rempli de guides vieux de plusieurs mois. Ici le sitemap est **généré** à chaque requête depuis le catalog, filtré sur le type `news` et la fenêtre de 48 h. Il ne peut pas vieillir ni se remplir de guides.

## Spécification (pour la boucle — six éléments, cf. playbook § 7 bis)

| Élément | Contenu |
|---|---|
| **Résultat attendu** | (a) `robots.googleBot` du layout racine porte `max-image-preview: large`, `max-snippet: -1`, `max-video-preview: -1`. (b) Chaque article du catalog a un visuel existant ≥ 1 200 px de large. (c) Le catalog porte `kind?: "guide" \| "news"` et `datePublished` (AAAA-MM-JJ) pour les « news » ; `ArticleLayout` émet `NewsArticle` pour elles, `Article` sinon. (d) `GET /news-sitemap.xml` sert un sitemap news (namespace `http://www.google.com/schemas/sitemap-news/0.9`) des articles « news » de moins de 48 h, 404 si l'interrupteur est coupé. (e) `robots.txt` déclare ce sitemap. (f) La règle de rédaction est écrite dans `/create-article`, CLAUDE.md dit l'état final. |
| **Périmètre — ce qu'on NE fait PAS** | Pas de Publisher Center, pas de flux RSS, pas de fichier statique `public/news-sitemap.xml` (l'assertion qui l'interdit reste), pas de changement de `public/sitemap.xml`, pas de nouvel article, pas de reclassement d'autres articles en « news », pas de `NewsMediaOrganization`. |
| **Contraintes héritées** | Next 16 : lire `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md` avant d'écrire la route (un handler n'est pas mis en cache par défaut, c'est voulu : la fenêtre se calcule à chaque requête). `public/` gagne sur `src/app/` à chemin égal : la route vit en `src/app/news-sitemap.xml/route.ts` et aucun fichier `public/news-sitemap.xml` ne doit exister. Cache CDN : en-tête explicite `Cache-Control: public, max-age=0, s-maxage=300`, aligné sur le reste du site (CLAUDE.md § Déploiement). Aucune dépendance nouvelle : `sharp` n'est qu'un transitif de Next, les dimensions WebP se lisent dans l'en-tête RIFF. Les pages qui redéfinissent `robots` (légales, portail, notes, `/accueil-narrative`) sont noindex : non concernées. |
| **Seuils chiffrés** | Fenêtre news : `datePublished` lu à 00:00 UTC, inclus si `published ≤ now < published + 48 h`. Au plus 1 000 URL. Visuel ≥ 1 200 px de large (mesuré le 2026-10-14 : les 31 visuels d'articles sont entre 1 200 et 2 752 px). Anti-vacuum : ≥ 30 articles lus dans le catalog. |
| **Incréments** | DN-0 robots Discover → DN-1 contrôle des visuels → DN-2 type d'article → DN-3 générateur pur du sitemap news → DN-4 route + interrupteur + robots.txt → DN-5 règle de rédaction et CLAUDE.md. |
| **Vérification** | Assertions vitest à chaque incrément (détail dans `docs/backlog-news.md`). Ce que vitest ne voit pas (build, en-têtes servis, test des résultats enrichis, Search Console) est une tâche `[humain]`. |

## Conséquences

- Les deux assertions de `seo-hygiene.test.ts` qui imposent l'interrupteur coupé et l'absence du news-sitemap dans `robots.txt` sont **remplacées** par cette décision (tâche DN-4). L'assertion « pas de fichier `public/news-sitemap.xml` » reste vraie et reste en place.
- **Mesure et critère d'arrêt.** Revue le **2026-11-15** : rapport Discover de Search Console et apparence « Actualités » dans les performances. Le **2026-12-15**, si zéro impression Discover et zéro impression Actualités, ou si le crawl remonte des anomalies sur le sitemap news : couper l'interrupteur (`NEWS_SITEMAP_ENABLED = false`, la route répond 404) et le noter ici. Discover reste en place quoi qu'il arrive : il ne coûte rien.
- Gain attendu modeste et honnête : Discover peut apporter des lecteurs qualifiés sur les guides ; l'onglet Actualités restera marginal pour un site de conseil.
