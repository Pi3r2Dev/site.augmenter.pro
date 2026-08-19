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

Lighthouse mobile **2026-08-19** :

| URL | Perf | LCP | Délai d'élément LCP |
|-----|------|-----|---------------------|
| `/blog` | 65 | 8,0 s | 3 270 ms |
| `/` | 71 | 6,9 s | 2 340 ms |

Les deux LCP sont le **lede du hero** (`<p>`), SSR avec Framer Motion `initial={{ opacity: 0 }}`. TTFB sain (150–230 ms). **`/` n'est pas la home narrative** : c'est le bento [`src/components/sections/hero.tsx`](../../src/components/sections/hero.tsx). Le récit 6 chapitres vit sur `/accueil-narrative`.

Autres contributeurs : chunk Three.js chargé trop tôt, blobs SVG en `setState` 60 fps (corrigé), GTM `afterInteractive` (~280 Kio).

Les polyfills « Ancien JavaScript » (17 Kio, `Array.at` / `flat` / …) viennent du module Next.js `next-polyfill-module`, **indépendant** de `browserslist`. Next 16 compile déjà vers Chrome 111+ par défaut. On ne les chasse pas.

Le CSS render-blocking (~27 Kio, ~1 s en 4G) reste le chemin critique de peinture : stylesheet Tailwind global, attendu. Après correction du hero, FCP et LCP doivent se recoller (~1,2–1,8 s).

## Décision

1. **Hero LCP opaque dès le SSR** sur `/` (bento), `/blog`, `/idees`, `/augmenter-mon-entreprise`, `/prompts`. Pas de `motion.*` avec opacity nulle sur `h1` / lede.
2. **`shouldRunDecorativeMotion`** : pas de WebGL ni de morph RAF sous 768 px, ni si `prefers-reduced-motion` / Save-Data. Desktop : `import("three")` après idle (3,5 s max). S'applique à `ShaderBackdrop` **et** au `BackgroundCanvas` narrative.
3. **Un seul canvas** sur `/blog` : overlay Three.js retiré de la carte featured (gradient CSS conserve le fondu).
4. **Blobs** : mutation DOM via refs, plus de `setState` à chaque frame.
5. **GTM** monté après idle (`DelayedGoogleTagManager`) pour sortir du chemin LCP/TBT.
6. **Premier chapitre narrative** (`/approche`, `/accueil-narrative`) : pas de `gsap.from({ opacity: 0 })` — [`shouldAnimateChapterEntrance`](../../src/lib/perf/chapter-entrance.ts).

Utilitaire partagé : [`src/lib/perf/idle-webgl.ts`](../../src/lib/perf/idle-webgl.ts).

## Conséquences

- Mobile Lighthouse ne télécharge plus Three.js sur les pages classiques **ni** sur le cover narrative.
- Desktop conserve le shader, après le LCP.
- Les ~3 premières secondes de session peuvent manquer dans GTM.
- Le cover narrative n'a plus d'entrée word-stagger (parallax scrub conservé).
