# Plan — Mini portail client : héberger le point d'étape Reva 9 derrière un accès privé

**Date** : 2026-08-27 · **Auteur** : Pierre (via session odoo-reva9) · **Statut** : à implémenter
**Repo cible** : `site.augmenter.pro` (Next.js App Router, Hostinger + CDN hcdn)
**Repo source du contenu** : [`../odoo-reva9`](../../../odoo-reva9) — le HTML est produit et maintenu là-bas, le site n'en héberge qu'une copie.

---

## 1. Pourquoi

Le point d'étape à 5 mois de la mission Odoo Reva 9 a été rédigé comme une **page HTML autonome** (bilan par domaine des 3 devis, checklist de recette cochable, dettes, capacités proposées pour la suite). Elle est aujourd'hui publiée comme Artifact Claude (URL privée `claude.ai/code/artifact/…`).

On veut qu'elle **vive sur augmenter.pro**, derrière un **mini portail client** : une URL propre à donner au dirigeant (`https://augmenter.pro/clients/reva9/…`), protégée par un code d'accès, jamais indexée, et réutilisable pour les prochains clients et les prochains livrables (relevés, comptes rendus, checklists).

## 2. Le contenu à héberger

| Quoi | Où (repo source) |
|---|---|
| Page HTML autonome (≈ 60 Ko, CSS inline, Google Fonts, JS vanilla ≈ 30 lignes) | `../odoo-reva9/docs/reva9/comms/2026-08-27-point-etape-arnaud.html` |
| Email d'accompagnement (référence, pas à héberger) | `../odoo-reva9/docs/reva9/comms/2026-08-27-email-point-etape-arnaud.md` |

Particularités du fichier HTML — **à connaître avant de l'intégrer** :

- **Pas d'enveloppe** `<!doctype>` / `<html>` / `<head>` / `<body>` : c'est la convention Artifact. Le fichier commence par `<title>`, `<link rel="stylesheet">` (Google Fonts), `<style>`, puis le contenu. Le serveur doit l'**envelopper** : `<!doctype html><html lang="fr"><head>` + `<meta charset>` + `<meta viewport>` + **`<meta name="robots" content="noindex, nofollow">`** + le `<title>`/`<link>`/`<style>` extraits du fichier, puis `<body>` avec le reste. Ne pas laisser `<title>` dans le body.
- **Thème** : tokens CSS sur `:root`, dark via `prefers-color-scheme` et `[data-theme]`. Rien à faire côté site — la page ne doit **pas** hériter du `globals.css` ni du layout React du site (Header/Footer, GTM, shader). Elle se sert **telle quelle**, en dehors de l'arbre React.
- **Polices** : `fonts.googleapis.com` / `fonts.gstatic.com`. Vérifier qu'aucune CSP du site ne les bloque (grep `Content-Security-Policy` dans `next.config.ts` / headers).
- **Checklist** : 18 cases persistées en `localStorage` (clé `reva9-recette-2026-08-27`), donc **par navigateur**. V1 : on garde. V2 : voir §6.
- **Confidentiel** : nom du client, prix de la prestation, codes comptables, noms de clients finaux. Voir §5 — non négociable.

## 3. Cible fonctionnelle (V1)

```
/clients/reva9                         → écran code d'accès (form, 1 champ)
POST /api/portal/login                 → vérifie le code, pose un cookie signé, redirige
/clients/reva9/point-etape-2026-08-27  → la page HTML (si cookie valide), sinon → /clients/reva9
```

- **Un code par client**, en variable d'env : `PORTAL_REVA9_PASSCODE`. Secret de signature : `PORTAL_COOKIE_SECRET`. Les deux à déclarer dans `.env.example` (vides), `.env.local` (dev) et **hPanel Hostinger** (prod) — cf. convention `.env.example` existante.
- **Cookie** `portal_reva9` : HttpOnly, Secure en prod, SameSite=Lax, 30 jours, valeur = HMAC-SHA256(`reva9` + expiry, `PORTAL_COOKIE_SECRET`) + expiry. Pas de session serveur, pas de base.
- **Réponse de la page** : `Content-Type: text/html; charset=utf-8`, **`Cache-Control: private, no-store`**, `X-Robots-Tag: noindex, nofollow`. Le `no-store` est impératif : le CDN Hostinger a déjà servi 35 h de HTML périmé (incident 2026-08-14, cf. CLAUDE.md § Déploiement & cache CDN) — une page privée mise en cache CDN serait une fuite.
- **Écran code d'accès** : page classique du site (Header/Footer OK), `robots: LEGAL_ROBOTS`-like (`src/lib/seo-policy.ts`) → `noindex`, **hors sitemap, hors llms.txt, aucun lien depuis le site**. Message d'erreur sobre, pas d'indice sur le client. Rate-limit minimal (compteur en mémoire par IP, 5 essais / 15 min) — suffisant pour un code de 8+ caractères.
- **Pas de GTM/GA sur la page servie** : elle est rendue hors layout React, donc rien à désactiver — le vérifier (aucun `googletagmanager` dans la réponse).

### Où mettre le fichier

`src/content/portal/reva9/2026-08-27-point-etape.html` — **jamais dans `public/`** (tout ce qui est dans `public/` est servi sans contrôle). Lu côté serveur (`fs.readFile`) dans le route handler.

### Implémentation proposée (à challenger)

| Fichier | Rôle |
|---|---|
| `src/lib/portal.ts` | `signPortalToken(client, exp)`, `verifyPortalCookie(req, client)`, `wrapArtifactHtml(raw, {title})` (enveloppe head/body, extraction `<title>`/`<link>`/`<style>`), registre `PORTAL_CLIENTS = { reva9: { passcodeEnv: "PORTAL_REVA9_PASSCODE", docs: { "point-etape-2026-08-27": "2026-08-27-point-etape.html" } } }` |
| `src/app/clients/[client]/page.tsx` | Server page : metadata noindex + `<PortalLogin client=… />` (client component, form POST) — 404 si client inconnu |
| `src/app/clients/[client]/[doc]/route.ts` | GET : vérifie cookie → lit le fichier → `wrapArtifactHtml` → Response avec headers §3 ; sinon 302 vers `/clients/[client]` |
| `src/app/api/portal/login/route.ts` | POST `{ client, code }` → compare (timing-safe) au `process.env[passcodeEnv]` → set-cookie → 303 vers le premier doc du client |
| `src/middleware.ts` | **Ne pas toucher** : la protection vit dans le route handler. Le matcher actuel exclut `api` et ne gêne pas `/clients/*`. |
| `public/robots.txt` | `Disallow: /clients/` et `Disallow: /api/portal/` |

Route handlers dynamiques (`[client]`, `[doc]`) + registre : V1 ne sert que Reva 9, mais la structure accueille le client suivant sans nouveau code.

## 4. Vérifications avant de dire « fait »

1. `npm run build` passe (Next 16 : lire `node_modules/next/dist/docs/` si doute sur les route handlers / cookies API — cf. bloc `nextjs-agent-rules` du CLAUDE.md).
2. `npm run start` puis :
   - `curl -sI http://127.0.0.1:3000/clients/reva9/point-etape-2026-08-27` → **302** vers `/clients/reva9`, `cache-control: private, no-store`
   - login via le form (ou `curl -X POST … -c jar`) puis `curl -sI -b jar …/point-etape-2026-08-27` → **200**, `content-type: text/html; charset=utf-8`, `x-robots-tag: noindex, nofollow`, `cache-control: private, no-store`
   - la réponse contient `<!doctype html>`, `<meta name="robots"`, **aucun** `googletagmanager`, et le `<title>` est dans `<head>`
   - `curl -s http://127.0.0.1:3000/clients/reva9 | grep -i robots` → noindex
3. Ouvrir la page dans un navigateur : polices chargées (Bricolage Grotesque / Instrument Sans / IBM Plex Mono), thème sombre OK (`prefers-color-scheme`), cocher 2 cases → rechargement → cases toujours cochées.
4. `public/sitemap.xml`, `public/llms.txt`, `public/llms-full.txt` : **aucune** mention de `/clients`.
5. Mauvais code ×6 → 429 (ou refus) ; bon code → cookie posé ; suppression du cookie → 302.

## 5. Confidentialité — non négociable

Le registre [`.claude/templates/seo/terrain-odoo-reva9.md`](../../.claude/templates/seo/terrain-odoo-reva9.md) § 2 classe en 🔴 **« jamais publier »** : les prix de la prestation (devis #002/#003), les données nominatives clients/fournisseurs, tout le volet M&A. **Cette page en contient** (montants, noms de clients finaux, codes Filaos). Elle n'est donc **pas une publication** : c'est un document remis au client, derrière un accès.

Conséquences pratiques :

- **Vérifier la visibilité du repo GitHub** du site avant de commiter le HTML. Repo public ⇒ ne pas commiter le contenu : le charger depuis un emplacement hors repo (volume Hostinger, variable d'env base64, ou fetch authentifié) — à trancher avec Pierre avant le premier commit.
- Aucune route `/clients/*` dans le sitemap, `llms.txt`, le maillage interne, les JSON-LD, la page plan-du-site.
- Aucun log applicatif du contenu ; le login ne logge que `[PORTAL] client=reva9 ok|ko`.
- Le contenu reste **la propriété du repo `odoo-reva9`** : toute correction se fait là-bas, puis copie ici (§6 procédure). Ne jamais éditer le HTML directement dans ce repo.

## 6. Procédure de mise à jour et V2

**Mise à jour du document** (ex. item 43 passé à 100 % après l'activation) :
```bash
cp ../odoo-reva9/docs/reva9/comms/2026-08-27-point-etape-arnaud.html src/content/portal/reva9/2026-08-27-point-etape.html
git add src/content/portal/reva9 && git commit -m "portal(reva9): maj point d'étape 2026-08-27"
# push après confirmation Pierre — jamais autonome (Branching Convention)
```

**V2 (hors périmètre de la session, à noter en backlog)** :
- Remonter les cases cochées côté serveur : `POST /api/portal/reva9/recette` → `NOTIFY_WEBHOOK_URL` (n8n, déjà branché pour `/api/quote`) → Pierre voit l'avancement de la recette sans demander.
- Index du portail par client (`/clients/reva9` après login liste les documents disponibles).
- Lien magique par e-mail à la place du code (Resend est déjà configuré).
- Second client : ajouter une entrée au registre + une variable d'env, rien d'autre.

## 7. Hors périmètre

- Pas de compte utilisateur, pas de base, pas de next-auth.
- Pas de refonte de la page HTML (design, contenu) — elle est validée telle quelle dans `odoo-reva9`.
- Pas de modification du `middleware.ts` (A/B home) ni des protections cache CDN (`revalidate`, `expireTime`, `asset-recovery`).

---

## Prompt de lancement de la session (à coller tel quel)

```
Lis d'abord CLAUDE.md, puis docs/plans/2026-08-27-portail-client-reva9.md en entier — c'est le cahier des charges, il prime sur tes habitudes.

Objectif : implémenter le mini portail client V1 décrit au §3 pour héberger, derrière un code d'accès, la page docs/reva9/comms/2026-08-27-point-etape-arnaud.html du repo voisin ../odoo-reva9 (copie dans src/content/portal/reva9/2026-08-27-point-etape.html, jamais dans public/).

Avant d'écrire du code :
1. Vérifie la visibilité du repo GitHub (gh repo view --json visibility). Si public, STOP et propose-moi une alternative pour ne pas commiter le contenu (§5).
2. Lis node_modules/next/dist/docs/ pour les route handlers, cookies() et les params dynamiques de cette version de Next — ne te fie pas à ta mémoire.
3. Propose-moi le plan de fichiers (§3 est une proposition, challenge-la si tu vois mieux) et attends mon go.

Contraintes non négociables : Cache-Control: private, no-store sur la page servie ; noindex partout (meta + X-Robots-Tag + robots.txt) ; rien dans sitemap/llms.txt/maillage ; page servie hors layout React (pas de GTM) ; ne touche ni middleware.ts ni les protections cache CDN ; timing-safe compare du code ; secrets uniquement en env (.env.example vide + .env.local + hPanel).

Fini = la checklist du §4 passe intégralement, avec les sorties curl collées dans ta réponse. Commit sur main (≤ 3 commits) ; ne pushe pas sans mon accord. Termine par la ligne à ajouter dans CLAUDE.md § Routing pour /clients, et par les 2 variables d'env que je dois créer dans hPanel.
```
