# Plan — LCP pages classiques (Lighthouse `/blog`)

Baseline 2026-08-19, audit Lighthouse mobile sur `https://augmenter.pro/blog` :

| Métrique | Avant |
|----------|-------|
| Performance | 65 |
| LCP | 8,0 s (pauvre) |
| Speed Index | 5,9 s (pauvre) |
| TBT | 260 ms (à améliorer) |
| FCP | 1,2 s (bon) |
| CLS | 0 (bon) |

Cause principale : lede du hero en `opacity: 0` jusqu'à l'hydratation Framer Motion (**3 270 ms** de délai d'élément). Détail : [ADR 0006](../decisions/0006-lcp-pages-classiques.md).

## Livré

- [x] Hero `/blog` `/idees` `/augmenter-mon-entreprise` `/prompts` en HTML opaque
- [x] Politique WebGL / blobs (`src/lib/perf/idle-webgl.ts`) — skip mobile, idle desktop
- [x] Un seul canvas `/blog` (overlay featured retiré)
- [x] Blobs sans re-render React 60 fps
- [x] GTM différé
- [x] Tests Vitest `src/lib/perf/*.test.ts`

## Vérification post-déploiement

Relancer Lighthouse mobile sur `/blog` (throttling par défaut) :

- LCP cible : **≤ 2,5 s** (idéalement collé au FCP ~1,2–1,8 s)
- Plus de chunk `three` dans « JS inutilisé » sur mobile
- Score Performance cible : **≥ 85**

```bash
npm test
npm run build
```

Hors scope : CSS Tailwind global render-blocking (~1 s en 4G), polyfills Next `next-polyfill-module` (17 Kio), pages narrative `/` et `/approche`.
