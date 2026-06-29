# Primitives de lecture d'article (fil de mémoire & repères)

Depuis la refonte lecture (2026-06-29), `ArticleLayout` offre des **primitives de balisage** que le rédacteur pose dans le corps JSX. Elles alimentent le **fil de mémoire** (signature interactive) et rythment le long-form. À utiliser à la rédaction **et** à toute restructuration d'article.

## Ce qui est AUTOMATIQUE (ne pas le refaire en JSX)

- **Bloc TL;DR en tête** : rendu auto depuis le champ `tldr` de l'entrée catalog (`src/data/resources.ts`). **Ne plus écrire d'encadré TL;DR inline** dans le corps — il ferait doublon. (Si un vieil article en a un à puces → le convertir en `<KeyTakeaways>`.)
- **Table des matières + scroll-spy + barre de progression** : générés auto par `ReadingRail` qui scanne les `<h2>`. Rien à baliser. (Soigner les `<h2>` : ce sont les entrées du sommaire.)
- **Signature auteur + articles liés + CTA** : auto en pied. Ne rien ajouter.

## Primitives à poser (opt-in, import depuis `@/components/article/*`)

### `<Memo>` — repère du fil de mémoire (LE plus important)
```tsx
import { Memo } from "@/components/article/memo";
…
<Memo type="num" label="×30 entités régulées">multiplie par 30</Memo>
```
- `type` : `"idea"` (idée-pivot, point violet) · `"num"` (chiffre/donnée-choc, point amber) · `"link"` (ressource/outil, contour pointillé — englober le `<a>`/`<Link>`).
- `label` : libellé **court** affiché dans la pastille (≠ le texte inline, qui peut être plus long).
- **Dosage : 4 à 8 Memo par article**, uniquement les éléments vraiment mémorables (chiffre-choc, idée-pivot, lien-outil). **Pas tous les `<strong>`** → sinon le fil devient du bruit. Le bandeau mémoire ne s'affiche que si l'article a ≥ 1 `<Memo>`.

### `<Callout>` — encadré « à retenir » (1-3 phrases)
```tsx
import { Callout } from "@/components/article/callout";
…
<Callout><p><strong>À retenir.</strong> …</p></Callout>
```
Signal « réponse définitive » (lecteur + crawlers). Mettre le `<strong>` d'accroche dans `children`.

### `<PullQuote>` — citation de rythme (Fraunces)
```tsx
import { PullQuote } from "@/components/article/pull-quote";
…
<PullQuote>La phrase-choc de la section, sortie du flux.</PullQuote>
```
1 à 2 par article max, sur une formule forte. Pas une simple répétition du paragraphe voisin.

### `<KeyTakeaways>` — boîte points-clés actionnables
```tsx
import { KeyTakeaways } from "@/components/article/key-takeaways";
…
<KeyTakeaways title="Par où commencer"><ul><li>…</li></ul></KeyTakeaways>
```
Remplace les anciens encadrés TL;DR-à-puces inline. Contient une `<ul>` rédigée par l'auteur.

## Check rapide
- [ ] 4-8 `<Memo>` posés sur les éléments mémorables (mix idea/num/link), `label` courts
- [ ] Aucun encadré TL;DR inline (le `tldr` catalog s'affiche tout seul en tête)
- [ ] `<Callout>` / `<PullQuote>` / `<KeyTakeaways>` utilisés là où ils servent la lecture (pas de remplissage)
- [ ] Imports depuis `@/components/article/*`
