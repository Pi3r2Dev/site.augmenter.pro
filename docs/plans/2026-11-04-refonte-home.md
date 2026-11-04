---
date: 2026-11-04
status: cadré, maquette à faire
follows: ADR 0008 (option D, précisions du 2026-11-04), ADR 0006 (LCP pages classiques)
---

# Refonte de la home — moins chargée, imagée en pixel art

## Diagnostic (prod, 1440 px, 2026-11-04)

| Mesure | Valeur |
|---|---|
| Hauteur | 6 216 px (≈ 7 écrans) |
| Mots / liens / boutons | ≈ 2 100 / 31 / 21 |
| Sections | Hero 193 mots · 02 outil métier × outils **894 mots** · 03 six chantiers 499 · 04 ressources 298 (7 images) · 05 conversion 214 + footer |

- **Chargée** : la 02 est un outil complet ; la 03 redit la 02 ; la 05 empile deux offres, 4 étapes, contact, avis, engagements. Trois langages visuels (blobs, isométrique violet, cartes terminal).
- **Décorée, pas imagée** : 4 tuiles du hero = blobs abstraits ; aucune photo, aucun livrable, aucun écran réel ; les seules vraies illustrations arrivent au 4e écran.
- **Hors thèse** : « Conseil IA & Transformation numérique », « Votre PME augmentée par l'IA », « 78 & 95 » ; avis mis en avant = création de site et référencement.

## Décisions (Pierre, 2026-11-04)

| Sujet | Décision |
|---|---|
| **Refrain** | « **Branchée sur vos outils. Prouvée sur le terrain.** » Porté par la home, puis par tout le site |
| **Style d'image** | **pixel art façon consoles**, en écho à la Frise de l'IA. Illustrations maison, jamais un sprite, un logo ou une console d'un fabricant |
| **Pierre** | **illustré dans le style des agents**, en chef d'équipe de la galerie. La photo réelle reste sur `/auteur/pierre-legrand` (signal E-E-A-T) |
| **Section 02** | l'outil métier × outils part sur `/augmenter-mon-entreprise` (« Par où commencer ») ; la home garde un lien. Les données restent dans `src/data/capabilities.ts` |

## Structure cible : 5 écrans

1. **Hero** — refrain en H1, Pierre en pixel art, un **livrable réel** en visuel (relance d'impayé « à valider » sortie d'Odoo, anonymisée 🟢), un prix d'entrée, un CTA.
2. **Aperçu de la Frise** — bande horizontale 8 bits → 16 bits → 3D → réaliste, qui mène à la Frise.
3. **Galerie d'agents nommés** — un agent pixel art = un sujet (package GitHub + vidéo + page). Remplace les six chantiers et les tuiles à blobs.
4. **Preuve** — le cas Odoo chiffré, le livrable, le lien GitHub ; l'avis Google réel en appui, pas en vedette.
5. **Passer à l'action** — une seule offre d'entrée + contact.

Idée de signature : le pixel art **monte en définition** en descendant la page (8 bits au hero, plus fin à la preuve), comme la Frise.

## Contraintes

- **LCP (ADR 0006)** : H1 et visuel du hero opaques dès le HTML, jamais d'entrée depuis `opacity: 0`. Pixel art en SVG ou PNG léger, `image-rendering: pixelated`.
- `prefers-reduced-motion` et mobile : animations coupées, mise en page empilée.
- Pas de « gratuit » ni d'« offert ». Pas de chiffre prêté à un client sans preuve 🟢.
- Le footer global, le CTA, la chaîne de réception des devis ne changent pas.

## À trancher pendant la maquette

- Liste des agents (nom, rôle, sujet rattaché) : le premier est celui des **relances d'impayés**.
- Le livrable réel du hero : quelle capture 🟢, avec quelles données masquées.
- Production des images : pixel art codé (SVG, animable, très léger) ou généré puis retouché.
- Sort de la section 03 Prestations (fondue dans la galerie ou réduite à une ligne).
