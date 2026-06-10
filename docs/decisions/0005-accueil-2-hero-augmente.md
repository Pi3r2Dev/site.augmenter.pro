---
adr: 0005
title: Accueil 2 — page de démonstration du hero augmenté
status: accepted
date: 2026-06-05
deciders: Pierre Legrand
consulted: Cursor Agent
informed: —
follows: 0002-home-narrative-scroll
---

# ADR 0005 — Accueil 2 : page de démonstration du hero augmenté

## Contexte

La home `/` actuelle est une expérience narrative scroll en 6 chapitres, documentée par [ADR 0002](0002-home-narrative-scroll.md). Elle reste la page de production tant que la nouvelle proposition n'est pas validée visuellement et éditorialement.

Un handoff design hifi existe dans [docs/ClaudeDesign_handoff/design_handoff_hero_augmente/](../ClaudeDesign_handoff/design_handoff_hero_augmente/) : il décrit un hero plein écran en 4 chapitres (`vos outils → l'IA → la robotique → vos équipes`) avec une scène SVG isométrique générée par script et des modules d'interaction avancés.

Le besoin immédiat n'est pas de remplacer `/`, ni de mettre en place un vrai split A/B automatique. Le besoin est de disposer d'une **page de présentation live** pour évaluer la direction créative avant une éventuelle bascule future.

## Décision

On crée et maintient une page isolée `/accueil-2`, noindex, destinée à la démonstration du hero augmenté.

Décisions clés :

- `/` reste inchangée.
- `/approche` reste inchangée.
- Aucune attribution aléatoire, aucun cookie A/B, aucun middleware de variant.
- `/accueil-2` masque le Header/Footer globaux pour reproduire une scène plein écran.
- La page est `robots: noindex, follow: false` tant qu'elle reste une démo.
- La scène SVG utilise le générateur original `scene-epanoui-or.js` pour conserver la projection isométrique exacte.
- Les modules d'interaction originaux restent chargés côté client, mais seulement quand leur coût est justifié.

## Pourquoi garder le générateur original

Le prototype ne place pas les objets à la main en coordonnées écran. Il utilise une projection commune :

```js
P(x, y, z) = [OX + (x - y) * COS, OY + (x + y) * SIN - z * ZH]
```

Avec `S = 3.5`, `OX = 460`, `OY = 338`, `COS = S * 0.866`, `SIN = S * 0.5`, `ZH = S`, et une `viewBox` `"210 78 590 480"`.

Cette projection est partagée par :

- le générateur de scène ;
- les câbles Verlet ;
- l'écran et le clavier interactifs ;
- les ancres des nuages ;
- les plantes réactives.

Une réécriture approximative de la scène rompt immédiatement la profondeur, les câbles et les alignements. Pour la fidélité visuelle, la décision est donc de **monter le générateur original** dans la version de démonstration, puis de porter progressivement en TypeScript seulement après stabilisation.

## Stratégie mobile et performance

Le dessin doit rester visible sur mobile, mais mobile ne doit pas payer le coût des interactions desktop.

Règles retenues :

- Mobile/tactile : scène SVG fidèle, statique ou très légère.
- Desktop avec `(hover: hover) and (pointer: fine)` : interactions avancées autorisées.
- `prefers-reduced-motion: reduce` : interactions avancées désactivées.
- Les modules lourds (`cloud-lava`, `verlet-cables`, `desk-interactive`, `plants-interactive`) sont chargés après le premier rendu et en parallèle.
- Le rendu mobile est piloté par l'enveloppe CSS de la scène, pas par une modification de la projection SVG.

## Instrumentation

La page de démonstration peut envoyer des événements GTM minimaux :

- `home_demo_view` avec `variant: "accueil_2_hero_augmente"`
- `home_chapter_view` avec `chapter_id`
- `home_cta_click` avec `cta_location`

Ces événements servent à la démo et à la mesure exploratoire. Ils ne constituent pas encore une vraie expérience A/B.

## Alternatives considérées

### A. Remplacer directement `/` — rejetée

**Pour** : retour visuel immédiat sur la vraie page d'accueil.

**Contre** : risque SEO/conversion trop fort. La home actuelle est déjà indexée, structurée et documentée. On ne remplace pas la page principale avant validation visuelle, mobile, performance et analytics.

### B. Middleware A/B 50/50 — rejetée pour l'instant

**Pour** : mesure quantitative réelle.

**Contre** : prématuré. La variante n'est pas encore assez stabilisée, et la mécanique A/B ajoute de la complexité SEO, analytics et cookie alors que le besoin est une présentation live.

### C. Réécrire toute la scène en React/TS dès maintenant — rejetée

**Pour** : code plus idiomatique Next.js.

**Contre** : fort risque de perdre la fidélité du handoff. Le générateur et les modules partagent des hypothèses géométriques fines ; le port TS doit venir après stabilisation, module par module.

### D. Mobile sans dessin — rejetée

**Pour** : performance maximale.

**Contre** : trahit la proposition créative. Le dessin fait partie du concept. La solution retenue est un dessin mobile léger, sans interactions lourdes.

## Conséquences

### Positives

- Page de démo isolée et présentable en live.
- Aucun risque direct sur `/` et `/approche`.
- Fidélité forte au handoff grâce au générateur original.
- Mobile conserve l'identité visuelle sans charger les modules les plus coûteux.
- La future bascule vers `/` pourra être décidée sur preuves visuelles et perf.

### Négatives / risques

- Des scripts vanilla restent chargés pour effet de bord via `window.*`.
- Les modules originaux n'ont pas encore de contrat `destroy()`.
- Le CSS runtime de scène reste volumineux dans le composant client.
- La page est une démo, pas encore une architecture production définitive.

### Mitigations

- Documenter le hardening dans [docs/plans/accueil-2-hero-augmente-hardening.md](../plans/accueil-2-hero-augmente-hardening.md).
- Ajouter un cleanup/destroy avant toute mise en production.
- Porter en TypeScript progressivement, sans changer le rendu.
- Garder `/accueil-2` noindex tant que la page n'est pas validée.

## Plan d'implémentation

Voir [docs/plans/accueil-2-hero-augmente-hardening.md](../plans/accueil-2-hero-augmente-hardening.md).

## Critères avant bascule vers `/`

- Rendu validé sur desktop, tablette et mobile.
- Lint et build verts.
- Aucun module lourd chargé sur mobile tactile.
- Lighthouse ou Web Vitals acceptables sur mobile.
- Cleanup des listeners/rAF implémenté.
- Analytics stabilisés.
- ADR de bascule ou mise à jour de cette ADR.
- Mise à jour de `sitemap.xml`, `llms.txt` et JSON-LD uniquement au moment de la bascule.

## Références

- [ADR 0002 — Refonte home narrative scroll](0002-home-narrative-scroll.md)
- [Plan de hardening Accueil 2](../plans/accueil-2-hero-augmente-hardening.md)
- [Handoff Hero augmenté](../ClaudeDesign_handoff/design_handoff_hero_augmente/README.md)
- [Prototype HTML](../ClaudeDesign_handoff/design_handoff_hero_augmente/Hero%20augment%C3%A9.html)
- Implémentation actuelle : [src/app/accueil-2/](../../src/app/accueil-2/)
