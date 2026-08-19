---
adr: 0006
title: LCP pages classiques — hero opaque, WebGL différé, GTM idle
status: accepted
date: 2026-08-19
deciders: Pierre Legrand
consulted: Cursor Agent
informed: —
follows: 0002-home-narrative-scroll
---

# ADR 0006 — LCP des pages classiques (hors narrative)

## Contexte

Lighthouse mobile sur `/blog` (2026-08-19) : Performance **65**, LCP **8,0 s**, Speed Index **5,9 s**. Accessibilité / bonnes pratiques / SEO à 100.

Répartition LCP : TTFB 150 ms (sain) + **délai d'affichage de l'élément 3 270 ms**. L'élément LCP était le `<p>` du hero, rendu par Framer Motion avec `initial={{ opacity: 0 }}`. Le HTML SSR partait donc invisible ; Lighthouse n'enregistrait le LCP qu'après hydratation + animation.

Autres contributeurs : chunk Three.js (~227 Kio) chargé tout de suite (hero **et** overlay featured = 2 canvas), blobs SVG en `setState` 60 fps, GTM `afterInteractive` (~280 Kio).

Les polyfills « Ancien JavaScript » (17 Kio, `Array.at` / `flat` / …) viennent du module Next.js `next-polyfill-module`, **indépendant** de `browserslist`. Next 16 compile déjà vers Chrome 111+ par défaut. On ne les chasse pas.

Le CSS render-blocking (~27 Kio, ~1 s en 4G) reste le chemin critique de peinture : c'est le stylesheet Tailwind global, attendu. Après correction du hero, FCP et LCP doivent se recoller (~1,2 s).

## Décision

1. **Hero LCP opaque dès le SSR** sur `/blog`, `/idees`, `/augmenter-mon-entreprise`, `/prompts`. Pas de `motion.*` avec `opacity: 0` sur `h1` / lede.
2. **`shouldRunDecorativeMotion`** : pas de WebGL ni de morph RAF sous 768 px, ni si `prefers-reduced-motion` / Save-Data. Desktop : `import("three")` après idle (3,5 s max).
3. **Un seul canvas** sur `/blog` : overlay Three.js retiré de la carte featured (gradient CSS conserve le fondu).
4. **Blobs** : mutation DOM via refs, plus de `setState` à chaque frame.
5. **GTM** monté après idle (`DelayedGoogleTagManager`) pour sortir du chemin LCP/TBT.

Utilitaire partagé : [`src/lib/perf/idle-webgl.ts`](../../src/lib/perf/idle-webgl.ts).

## Conséquences

- Mobile Lighthouse ne télécharge plus Three.js sur les pages classiques.
- Desktop conserve le shader, après le LCP.
- Les ~3 premières secondes de session peuvent manquer dans GTM.
- Pages narrative `/` et `/approche` inchangées (WebGL plein écran assumé).
