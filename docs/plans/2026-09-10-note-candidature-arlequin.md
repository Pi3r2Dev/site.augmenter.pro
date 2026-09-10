# Plan — Note unlisted de candidature Arlequin AI

**Date** : 2026-09-10 · **Statut** : implémenté
**URL à coller** : `https://augmenter.pro/notes/arlequin`

## Pourquoi

Candidature spontanée chez **Arlequin AI** (produit HUDEX) pour un rôle de *Forward Deployed Engineer* — le siège manquant entre leurs 6 ingénieurs / 2 produit / 2 commerciaux et le déploiement chez le client. Un seul lien à donner dans le champ *Portfolio / website* ; derrière : l'argument, l'activité, le cas, LinkedIn.

La page doit être **lisible sans code** (le recruteur clique et lit) et **invisible des index** (pas une page du site vitrine, pas de concurrence SEO, pas de fuite dans llms.txt).

## Posture SEO (non négociable)

Même famille que le portail client, **sans** code d'accès :

| Couche | Mesure |
|---|---|
| Metadata | `unlistedPageMetadata()` → `robots: { index: false, follow: false }`, titre `absolute` |
| HTTP | `X-Robots-Tag: noindex, nofollow` sur `/notes/:path*` (`next.config.ts`) |
| robots.txt | `Disallow: /notes/` dans **chaque** groupe qui `Allow: /` |
| Graphe | absent de sitemap, llms.txt, llms-full.txt, plan du site, header, footer, NavFixed, SuiteCockpit |
| JSON-LD | aucun `Article` / `WebPage` dédié (le root layout garde Organization site-wide) |
| Chrome | Header/Footer retirés (layout `/notes`), pas de CTA devis |

Open Graph + Twitter Card **volontaires** : coller l'URL dans Slack / un mail affiche une carte, pas la home générique. Ça n'indexe pas.

## Contenu

Copy source : [`src/data/notes/arlequin.ts`](../../src/data/notes/arlequin.ts). Vue : [`src/app/notes/arlequin/note-view.tsx`](../../src/app/notes/arlequin/note-view.tsx) (Server Component, h1 opaque, ADR 0006).

**Cas client lié** : article public [`/blog/configurer-odoo-ia-claude-cowork`](../../src/app/blog/configurer-odoo-ia-claude-cowork/page.tsx) — mission anonymisée déjà en ligne (🟢). **Pas** le portail `/clients/reva9` (🔴 prix, nominatif, M&A — cf. [terrain-odoo-reva9.md](../../.claude/templates/seo/terrain-odoo-reva9.md) §2). Un recruteur sans code tomberait sur l'écran d'accès ; un lien mort au milieu de l'argument.

## Formulaire Arlequin (rappel)

| Champ | Valeur |
|---|---|
| Role | Forward Deployed Engineer |
| Name | Pierre Legrand |
| Email | pro@pierrelegrand.fr |
| LinkedIn | https://www.linkedin.com/in/legrand-pierre/ |
| Portfolio / website | https://augmenter.pro/notes/arlequin |
| Short motivation | ~90 mots (le texte fourni pour le formulaire, pas la note entière) |

Note et motivation restent en **français** (fondateurs français, thèse souveraineté européenne). Version anglaise : à produire seulement si Pierre le demande.

## Vérifications

1. `npm test` — hygiène `/notes/` + contenu Arlequin + LCP h1.
2. Dev : ouvrir `/notes/arlequin`, lire jusqu'à Mes travaux, cliquer les 3 cartes (accueil, article Odoo, LinkedIn).
3. `curl -sI http://127.0.0.1:3000/notes/arlequin` → `x-robots-tag: noindex, nofollow`.
4. Header/Footer absents ; pas de bouton « Premier diagnostic ».
5. `/`, `/blog`, footer : aucun lien vers `/notes/arlequin`.
