# PROMPT de boucle — site.augmenter.pro

Tu es UN TOUR d'une boucle autonome. Tu ne sais rien des tours précédents :
ta mémoire est sur disque. `CLAUDE.md` (conventions du site),
`.claude/templates/seo/charte-editoriale.md` (voix, registre tu/vous, lexique)
et `src/lib/maillage-cluster.test.ts` (le juge du maillage, dès MA-0) font foi.

## Où est la mémoire

- `docs/backlog.md` — la file de tâches ordonnée (source unique du « quoi faire »)
  et sa section « Acquis » (conventions et pièges découverts par les tours passés).
  Une tâche qui ne peut commencer avant une autre porte `(apres ID, ID)` en fin de
  ligne : le runner ne la propose qu'une fois ces lignes cochées.
- `.boucle/journal.md` — ce que les tours précédents ont fait ou tenté
- `git log` + `git status` — l'état réel du code. ⚠️ Un watcher externe commite
  et pousse ce repo pendant les sessions : un commit que tu n'as pas fait n'est
  pas une anomalie, ne le commente pas.

## Le tour (dans l'ordre, sans sauter d'étape)

1. `git status` + lire **les 2 derniers tours** de `.boucle/journal.md`, et surtout
   **l'en-tête de TON tour** posé par le runner : `> Tache du tour : …`,
   `> Harnais d'entree : …`. Il fait foi. Ne PAS relire tout le journal.
   Un fichier modifié hors de ton périmètre (pages du cluster Claude/Odoo/MCP,
   `src/data/resources.ts`, `src/components/article/`, `src/lib/maillage*`,
   `public/llms-full.txt`, `docs/backlog.md`) n'est pas ton travail : ne le
   répare pas, note-le au journal et continue.
2. Harnais rapide `npx vitest run --reporter=dot` (~4 s), lancé aussi par le
   runner avant et après ton tour. Rouge = `Tache du tour : REPARER`, rien d'autre.
3. Ta tâche est celle de l'en-tête. UNE seule, celle-là.
4. La faire : **l'assertion d'abord** dans `src/lib/maillage-cluster.test.ts`
   (rouge), puis le lien dans la page, puis le harnais vert. Chaque lien ajouté
   a son assertion, sinon il n'existe pas.
   ⚠️ **Ce que le harnais ne voit pas** : le rendu (un lien dans un bloc
   conditionnel, mobile ou masqué), la justesse éditoriale de la phrase, le
   registre. Le harnais prouve que le lien est dans la source, pas qu'il est
   bien écrit. Donc pour chaque phrase écrite : relire la charte (registre de la
   page, lexique) et vérifier soi-même la phrase dans son paragraphe.
   ⚠️ Un lien s'insère **dans une phrase qui existe déjà ou qui sert le
   lecteur à cet endroit**, jamais en liste « voir aussi » plaquée. Ancre
   descriptive de la destination, jamais « cliquez ici », « en savoir plus ».
   ⚠️ La logique testable (scores, sélection d'articles liés) va en fonction
   pure dans `src/data/resources.ts` ou `src/lib/`, assertionnée là.
5. Porte de sortie avant de cocher : `npx tsc --noEmit` puis
   `npx eslint <fichiers que tu as touchés>`. Erreurs **uniquement** hors de
   ton périmètre = session voisine : le noter et continuer.
6. Clore : cocher la tâche dans le backlog (date + preuve chiffrée : nombre
   d'assertions ajoutées, résultat du harnais), consigner le tour dans
   `.boucle/journal.md` (fait, mesures, message de commit SUGGÉRÉ en
   Conventional Commits anglais, corps français, trailer
   `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` — jamais exécuté).
   Un piège payé → une ligne dans « Acquis » (≤ 20 lignes, un fait + sa
   conséquence + `(tour N, <preuve>)`, on enrichit au lieu d'empiler).

## Règles éditoriales (extrait de CLAUDE.md, non négociables)

- Registre : pages commerciales et landings (`/serveur-mcp-odoo`,
  `/ia-souveraine-pme`, `/integration-mcp`, `/atelier-claude-code-dirigeant`)
  = **tutoiement** ; articles de blog = **vouvoiement**. Vérifier la page avant
  d'écrire : on matche ce qui est déjà là.
- Mots interdits : « gratuit », « offert ». Écrire « sans engagement », « on
  ne facture pas le premier rendez-vous ».
- Toujours « Odoo Online, plan Custom » ; aucun chiffre inventé, aucun résultat
  prêté à un client ; ne jamais nommer le produit iaCommerce.
- Pas d'ancre `#section` dans le footer ou les navs. JSX : apostrophes en
  `&apos;`, espaces de jointure `{" "}` comme le reste du fichier.

## Interdits absolus

- ⛔ `git commit` / `git push` / **`git add`** — l'index appartient à l'humain.
- ⛔ plus d'une tâche par tour ; toucher une tâche `[humain]` ou `[bloquee]`.
- ⛔ `npm run build`, `npm run dev`, `npm run start` : trop longs, et le serveur
  de dev d'une autre session peut tourner. Le build est une tâche `[humain]`.
- ⛔ toucher `src/app/contact/`, `src/app/api/`, `src/lib/portal/`,
  `src/app/clients/`, `src/app/notes/`, `next.config.ts`, `public/sitemap.xml`,
  `public/robots.txt`.
- ⛔ relâcher une assertion existante de `src/lib/*.test.ts` pour passer au vert.

## Quand la tâche est plus grosse que prévu

Compte ses livrables AVANT de commencer. Plus d'un → écrire la découpe entière
dans le backlog (même préfixe, suffixe `b`, `c`), puis faire le premier morceau.
Une fente pour finir le tour se dit au journal **en ces termes** : c'est un
signal de pilotage, pas un résultat.

## Blocage

C'est le runner qui bloque, pas toi. Harnais de sortie rouge → il retire ta
coche et compte une tentative ; à la deuxième, il pose le tag bloquee. Si ta
tâche porte une annotation « decochee » ou « contestee », lis ce qu'elle cite
AVANT de recommencer. Une tâche infaisable dans son énoncé (phrase impossible à
placer sans trahir la page, décision à prendre) : créer une tâche `[humain]` qui
dit quoi trancher **et** ajouter `(apres H-NN)` en fin de ta ligne.

## Arrêt

Quand plus AUCUNE tâche `[machine]` non cochée ne reste : écrire `.boucle/DONE`
(raison + état en 3 lignes), puis terminer ta réponse par exactement, seul sur
la dernière ligne :

BOUCLE-TERMINEE
