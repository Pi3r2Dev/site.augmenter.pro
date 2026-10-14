# PROMPT de boucle — chantier Discover / format news (ADR 0007)

Tu es UN TOUR d'une boucle autonome. Ton chantier est **Discover et le format
« news »** et rien d'autre. Tu ne sais rien des tours précédents : ta mémoire
est sur disque. Font foi : `docs/decisions/0007-google-news-discover.md` (la
décision et la spec), `CLAUDE.md` (conventions), et le juge
`src/lib/discover-news.test.ts` dès DN-0.

## Où est la mémoire

- `docs/backlog-news.md` — la file ordonnée (le « quoi faire ») et « Acquis ».
  `(apres ID, ID)` en fin de ligne = la tâche attend ces lignes cochées.
- `.boucle/journal.md` — les tours précédents. ⚠️ Les tours d'avant DN-0
  appartiennent au chantier « maillage » (`docs/backlog.md`), terminé : ne les
  reprends pas.
- `git log` + `git status`. Un watcher externe commite et pousse ce repo : un
  commit que tu n'as pas fait n'est pas une anomalie, ne le commente pas.

## Le tour (dans l'ordre)

1. `git status` + les 2 derniers tours du journal + **l'en-tête de TON tour**
   (`> Tache du tour : …`, `> Harnais d'entree : …`), qui fait foi. Un fichier
   modifié hors de ton périmètre n'est pas ton travail : le noter, continuer.
2. Harnais `npx vitest run --reporter=dot`. Rouge = `Tache du tour : REPARER`.
3. UNE tâche : celle de l'en-tête. Relire sa ligne du backlog ET la spec de
   l'ADR 0007 avant d'écrire.
4. **L'assertion d'abord** (rouge), puis le code, puis le harnais vert. Toute
   logique testable va en fonction pure (`src/lib/` ou `src/data/resources.ts`).
   ⚠️ Next 16 n'est pas celui de ta mémoire : lire `node_modules/next/dist/docs/`
   avant toute API Next (metadata `robots`, route handler, `revalidate`).
   ⚠️ Le harnais ne voit ni le build, ni les en-têtes servis, ni Search Console :
   c'est H-N1/H-N2, pas toi.
5. Porte de sortie : `npx tsc --noEmit` puis `npx eslint <fichiers touchés>`.
6. Clore : cocher (date + preuve chiffrée : assertions ajoutées, harnais
   X/X), consigner au journal (fait, mesures, message de commit SUGGÉRÉ en
   Conventional Commits anglais, corps français, trailer
   `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` — jamais exécuté).
   Un piège payé → une ligne dans « Acquis » (fait + conséquence + preuve).

## Interdits absolus

- ⛔ `git commit` / `git push` / `git add` — l'index appartient à l'humain.
- ⛔ plus d'une tâche par tour ; toucher une tâche `[humain]` ou `[bloquee]`.
- ⛔ `npm run build|dev|start`, `npx next` : c'est H-N1.
- ⛔ créer `public/news-sitemap.xml` ; toucher `public/sitemap.xml`,
  `src/app/contact/`, `src/app/api/`, `src/lib/portal/`, `src/app/clients/`,
  `src/app/notes/`, `next.config.ts`, `docs/backlog.md`, `PROMPT.md`.
- ⛔ relâcher une assertion existante d'un `*.test.ts`. **Seule exception**, et
  seulement dans DN-4 : les deux assertions news de `seo-hygiene.test.ts` que
  la ligne DN-4 nomme, remplacées comme elle le dit (ADR 0007).
- ⛔ marquer « news » un autre article que les deux de DN-2 ; régénérer un visuel.
- Mots interdits sur le site : « gratuit », « offert ». Aucun chiffre inventé.

## Quand la tâche est plus grosse que prévu

Compter ses livrables AVANT. Plus d'un → écrire la découpe dans le backlog
(suffixes `b`, `c`), faire le premier morceau, le dire au journal.

## Blocage

⚠️ Le runner tague une ligne d'après le premier mot entre crochets qu'il y
trouve : n'écris jamais « [humain] », « [machine] » ou « [bloquee] » dans le
TEXTE d'une tâche, seulement dans son étiquette.

Le runner bloque, pas toi. Une tâche infaisable dans son énoncé (API Next
différente de la spec, décision à prendre) : créer une tâche `[humain]` qui dit
quoi trancher **et** ajouter `(apres H-NN)` en fin de ta ligne.

## Arrêt

Plus AUCUNE tâche `[machine]` non cochée : écrire `.boucle/DONE` (raison + état
en 3 lignes), puis terminer par exactement, seul sur la dernière ligne :

BOUCLE-TERMINEE
