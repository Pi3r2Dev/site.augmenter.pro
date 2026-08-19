# Architecture frontend — augmenter.PRO

> 🛑 **DOC PÉRIMÉ (2026-05-26) — ne pas s'y fier pour l'état actuel.**
> Ce guide décrit une homepage en **layout bento** qui n'existe plus : `/` et
> `/approche` sont passées en **narrative scroll** (Three.js + GSAP + Lenis), et
> le bento ne subsiste que sur `/blog` et `/idees`. L'arborescence `sections/`
> ci-dessous est fausse — `hero.tsx`, `approach-services.tsx`, `resources.tsx`,
> `convert.tsx`, `approach.tsx`, `ideas.tsx`, `pricing.tsx`, `blog-preview.tsx`
> ont tous été supprimés. `sections/` ne contient plus que `cta.tsx`,
> `prompt-card.tsx`, `atelier-callout.tsx`.
>
> **Perf LCP (2026-08-19)** : ne plus animer le hero depuis `opacity: 0`. Shader et blobs : voir [ADR 0006](decisions/0006-lcp-pages-classiques.md). `useMorph` a été remplacé par un RAF qui mute le DOM (`blobs.tsx`).

Guide de la homepage en **layout bento** et des widgets animés réutilisables.

## Structure

```
src/components/
  bento/                    ← primitives de grille bento
    bento-grid.tsx          ← BentoGrid, BentoCard, SectionHead, Pill
    article-bento-card.tsx  ← ArticleBentoCard (featured 16:10 ou compact 5:3)
    pull-quote-card.tsx     ← PullQuoteCard (dark) + MiniQuoteCard (light)

  widgets/                  ← widgets animés Bionova (SVG morphing)
    palettes.ts             ← 6 palettes OKLCH partagées
    blobs.tsx               ← LiquidBlob, MeshAurora, CardShell, CornerArrow, PillTag + hook useMorph
    service-card.tsx        ← ServiceCardStat (stat hero + blob latéral)
    idea-card.tsx           ← IdeaCardBigNumber (numéro filigrane + aurora)
    trust-stat.tsx          ← TrustStatCard (compact 180 px)

  sections/                 ← sections page entières
    hero.tsx                ← Section 1 bento (titre + 4 stats + image + mini-quote)
    approach-services.tsx   ← Section 2 bento dark (4 étapes + 3 services + pull-quote)
    resources.tsx           ← Section 3 bento (3 idées + 6 articles + CTA accent)
    convert.tsx             ← Section 4 bento dark (pricing + contact + garanties + rating)
    approach.tsx            ← /approche (FAQ + 4 piliers)
    ideas.tsx               ← /idees
    pricing.tsx             ← /prestations
    blog-preview.tsx        ← /blog (liste articles)
    cta.tsx                 ← Bloc CTA réutilisé en bas de plusieurs pages
    prompt-card.tsx         ← /prompts
```

## Layout bento — comment ça marche

**Grille** : 12 colonnes desktop, 6 tablette, 1 mobile. Rangées de 110 px en desktop, auto en mobile.

**Span & rows** : chaque `BentoCard` déclare `span={3|4|5|6|7|8|9|12}` et `rows={1..6}`. Le mapping vers Tailwind est explicite dans `bento-grid.tsx` pour que JIT scanne les classes (pas de `md:col-span-${n}`).

**Variantes** :

| Variante | Usage | Rendu |
|----------|-------|-------|
| `light` (défaut) | Cartes claires, hover lift | `bg-card` + border + shadow au hover |
| `dark` | Sections sombres (Approach×Services, Convert) | `bg-linear-gradient(#13101d→#0f0c1a)` + border white/7% |
| `flush` | Héberge un widget plein-cadre (ServiceCardStat etc.) | `border-transparent bg-transparent` (pas de double frame) |
| `accent` | CTA secondaires | Gradient violet clair |

**Exemple d'usage** :

```tsx
<BentoGrid>
  <BentoCard span={6} rows={4} pad="lg">
    <h1>Titre principal</h1>
  </BentoCard>
  <BentoCard span={3} rows={2} variant="flush">
    <ServiceCardStat service={...} palette="violet" />
  </BentoCard>
  {/* ... */}
</BentoGrid>
```

## Widgets animés

Les widgets `widgets/*` utilisent du SVG morphing (path.d recalculé par `requestAnimationFrame` via le hook `useMorph`). Ils :

- **respectent `prefers-reduced-motion: reduce`** (figent l'animation) ;
- **gèrent leur hover** via state local + prop `hovered` dans `CardShell` ;
- ont tous leur propre `CardShell` (border + gradient OKLCH) — donc doivent toujours être placés dans `<BentoCard variant="flush">` pour éviter un double cadre.

**Palettes disponibles** (`widgets/palettes.ts`) :

| Palette | Usage suggéré |
|---------|---------------|
| `violet` | Primary, default |
| `amber` | Accent chaud |
| `duo` | Violet + amber dégradé |
| `cold` | Bleu-violet (trust/zone géo) |
| `warm` | Orange-rouge |
| `mono` | Neutre gris |

## Animations framer-motion

**⚠️ Éviter `whileInView` avec `once: true` + `margin: "-80px"` sur des éléments cachés sous le fold** : le déclenchement est flaky quand le scroll est rapide (Playwright, scroll programmatique, prerender), et les éléments restent à `opacity: 0`. Préférer :

- `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` pour le hero ;
- pas d'animation du tout pour les cartes bento cachées sous le fold (le design fonctionne sans) ;
- si tu insistes sur `whileInView`, utilise `amount: 0.2` plutôt que `margin: "-80px"`.

## Accessibilité

- Tous les widgets respectent `prefers-reduced-motion`.
- Les SVG décoratifs ont `aria-hidden`.
- Les cartes cliquables (`ServiceCardStat`, `ArticleBentoCard`) sont des `<Link>` avec `aria-label` explicite.
- Le contraste minimum AA est respecté sur tous les variants (texte blanc sur dark ≥ 4.5:1).

## Tests visuels

```bash
npm run dev
# ouvrir http://localhost:3000
```

Points à vérifier sur la homepage :

1. **Hero** — pill violette, titre gradient violet→amber, 4 TrustStatCard avec blobs animés, image Odoo avec overlay et badge prix, mini-quote Nathalie
2. **Approche × Services** — 4 step-cards numérotés, 3 ServiceCardStat avec chiffres (10h/3×/24/7), PullQuote Maud à droite
3. **Ressources** — 3 IdeaCardBigNumber alternées avec 6 articles (featured + 6 compacts) + CTA accent violet
4. **Convert** — titre + 2 plans pricing dark avec badge "Recommandé" sur 360°, contact/engagements/rating en ligne du bas

Pour un screenshot full-page fiable : scroller jusqu'en bas puis remonter (déclenche tous les `whileInView` restants).

## Responsive

- **< 640 px** : toutes les cartes `col-span-6` (monocolonne), padding réduit
- **640-1100 px** : grille 6 colonnes, les cartes 3-4 deviennent 6 (2 par ligne)
- **≥ 1100 px** : grille 12 colonnes pleine

## Rollback

La refonte bento a été introduite le 2026-04-21. Pour revenir à l'ancienne homepage 9-sections :

```bash
git log --oneline src/app/page.tsx
git checkout <commit-avant-refonte> -- src/app/page.tsx src/components/sections/hero.tsx
```

Les anciennes sections (`trust.tsx`, `services.tsx`, `testimonials.tsx`) sont conservées mais **non importées** — elles peuvent servir de base à une restauration ou être supprimées (voir `todo_corrections.md`).
