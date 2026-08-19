# Plan — LCP pages classiques (Lighthouse `/blog` + `/`)

Baseline 2026-08-19, Lighthouse mobile 4G :

| URL | Perf | LCP | Speed Index | TBT | FCP | CLS |
|-----|------|-----|-------------|-----|-----|-----|
| `/blog` | 65 | 8,0 s | 5,9 s | 260 ms | 1,2 s | 0 |
| `/` (bento Hero) | 71 | 6,9 s | 2,8 s | 240 ms | 1,4 s | 0 |

Cause principale : lede du hero en opacity nulle jusqu'à l'hydratation Framer Motion (délai d'élément **2,3–3,3 s**). **`/` n'est pas la home narrative.** Détail : [ADR 0006](../decisions/0006-lcp-pages-classiques.md).

## Livré

- [x] Hero `/` `/blog` `/idees` `/augmenter-mon-entreprise` `/prompts` en HTML opaque
- [x] Politique WebGL / blobs (`src/lib/perf/idle-webgl.ts`) — skip mobile, idle desktop
- [x] Même politique sur `BackgroundCanvas` narrative
- [x] Pas de `gsap.from(opacity:0)` sur le chapitre 0 (`shouldAnimateChapterEntrance`)
- [x] Un seul canvas `/blog` (overlay featured retiré)
- [x] Blobs sans re-render React 60 fps
- [x] GTM différé
- [x] Tests Vitest `src/lib/perf/*.test.ts`

## Vérification post-déploiement

Relancer Lighthouse mobile (throttling par défaut) :

- `/` et `/blog` : LCP cible **≤ 2,5 s** (idéalement collé au FCP ~1,2–1,8 s)
- Plus de chunk `three` dans « JS inutilisé » sur mobile
- Score Performance cible : **≥ 85**

```bash
npm test
npm run build
```

Hors scope : CSS Tailwind global render-blocking (~1 s en 4G), polyfills Next `next-polyfill-module` (17 Kio). GTM restera dans « JS inutilisé » s'il se charge avant la fin de la trace (~3,5 s idle).
