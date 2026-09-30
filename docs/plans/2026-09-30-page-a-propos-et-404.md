# Prompt de session — page `/a-propos` (identité + carte des ressources) et refonte de la 404

> À coller tel quel dans une session Claude Code fraîche ouverte sur `site.augmenter.pro`.
> Rédigé le 2026-09-30. Contexte SEO du moment : `docs/seo-audits/2026-08-12-diagnostic-chute-juillet-plan-action.md` + mémoire `project_chute_trafic_juin_2026`.

---

## Mission

Créer la page **`/a-propos`** d'augmenter.pro et refondre la **page 404** dans le même esprit. Deux livrables, une seule source de données partagée.

Lis d'abord, dans cet ordre, avant d'écrire une ligne : `CLAUDE.md`, `.claude/templates/seo/project-context.md`, `.claude/templates/seo/charte-editoriale.md`, `.claude/templates/seo/playbook-influence-ethique.md`, `.claude/templates/seo/terrain-odoo-reva9.md` (règles de confidentialité client), puis `public/llms.txt`, `src/data/resources.ts`, `src/data/capabilities.ts`, `src/app/plan-du-site/page.tsx`, `src/app/auteur/pierre-legrand/page.tsx`, `src/app/not-found.tsx`, `src/components/layout/footer.tsx`.

### Pourquoi cette page

1. **Les agents IA (Perplexity, ChatGPT, Claude, Google AI Mode) lisent la page « à propos » en premier** pour décider s'ils citent un site et comment ils le décrivent. Aujourd'hui `/a-propos` renvoie **404** ; la section « À propos » de `llms.txt` n'a aucune page canonique derrière elle. Les agents se rabattent sur `/approche` (récit narratif de 9 chapitres, illisible pour un extracteur) ou sur la page auteur.
2. **Le site a perdu 97 % de ses impressions Google depuis juin 2026** (core update + crawl gelé). La citation par les LLM est le canal qui reste ; il se gagne avec des faits nets, datés, vérifiables, sur une page stable.
3. **Objectif business n°1 : des demandes de devis**, pas du trafic. La page doit convertir un dirigeant de PME qui vient de lire un article ou une réponse d'IA et se demande « c'est qui, je peux leur faire confiance, par où je commence ».

### Ce que la page doit contenir (dans cet ordre, pas plus)

1. **Fiche d'identité citables en 10 lignes**, en phrases déclaratives courtes, chacune vraie et vérifiable : qui (Pierre Legrand, consultant indépendant), quoi (audit IT & cybersécurité, logiciel sur mesure avec Claude Code et Odoo, automatisation, formation), pour qui (dirigeants de PME 10-200 salariés, BTP / négoce / industrie / artisans), où (présentiel Yvelines 78 et Val d'Oise 95 ; visio partout en France ; déplacements pour les gros projets), depuis quand, comment on travaille (les 4 piliers), ce qu'on **refuse** de faire. C'est le bloc que les LLM recopieront : le rédiger pour être recopié.
2. **La preuve** : la mission Odoo/Claude tracée au quart d'heure (chiffres réels autorisés par `terrain-odoo-reva9.md` uniquement — **trancher chaque chiffre contre la règle de confidentialité avant publication**, ne jamais nommer un client sans autorisation écrite), les projets publics, le profil GitHub, l'article bilan. Les témoignages restent en texte, **jamais** en balisage `Review`/`AggregateRating` (retiré site-wide le 2026-09-07, interdit par Google sur un `LocalBusiness` ; renvoyer vers les avis Google Business Profile).
3. **La carte complète des ressources d'aide à la décision du site**, groupée par intention du dirigeant, pas par type de contenu. Chaque entrée = titre + verdict en une phrase (le `tldr` du catalog) + lien. Périmètre exhaustif :
   - le hub `/augmenter-mon-entreprise` (sélecteur secteur × douleur × objectif) ;
   - la matrice de capacités de la home (« ce que l'IA sait faire chez vous », `src/data/capabilities.ts`) ;
   - le guide d'achat 2027 (`/blog/ma-pme-en-2027`, `src/data/buying-guide-2027.ts`) ;
   - tous les `ARTICLES` et `IDEAS` du catalog `src/data/resources.ts` (lire le catalog, ne pas recopier à la main) ;
   - les prompts `/prompts` ;
   - les pages de décision : `/ia-souveraine-pme`, `/integration-mcp`, `/strategie-ia-pme`, `/audit-ia-pme`, `/audit-informatique-yvelines`, `/audit-informatique-val-doise`, `/atelier-claude-code-dirigeant`, `/approche` (méthode + FAQ + prestations).
   La carte doit être **générée depuis les données** (catalog + une petite liste des pages statiques), jamais dupliquée en dur : c'est la même structure qui alimentera la 404.
4. **Un seul chemin de conversion** : le wizard de devis `/contact`. CTA principal + rappel « on ne facture pas le premier rendez-vous ». Interdits absolus dans le texte : « gratuit », « offert ». Le TJM (550 €) **ne se publie pas** sans validation explicite de Pierre.
5. **Pas de FAQ dupliquée** de `/approche`. Pas de récit. Pas de section « valeurs ».

### Registre et voix

Page commerciale → **tutoiement** (charte §3.3, comme `/augmenter-mon-entreprise` et `/contact`). Arc **douleur d'abord, puis solution complète** (charte + playbook influence éthique). Technique entre parenthèses, rare. Une fois le brouillon posé, passer `/relecture-editoriale` dessus et corriger.

### Contraintes techniques (toutes non négociables, cf. `CLAUDE.md`)

- Server `page.tsx` (metadata + JSON-LD) + éventuel client component pour l'interactif. `metadata` via `pageOpenGraph()` de `src/lib/page-metadata.ts`, **jamais** un `openGraph` écrit à la main. `title` < 60 car., `description` < 155.
- JSON-LD : `AboutPage` avec `mainEntity` → `https://augmenter.pro/#organization` (déjà déclaré dans le layout racine) et `about` → la `Person` de la page auteur ; plus un `ItemList` pour la carte des ressources (même pattern que `/augmenter-mon-entreprise`). Aucun `Review`, aucun `AggregateRating`.
- Hero : pattern `ShaderBackdrop` (mood `dawn`, opacity 0.6) — un seul canvas WebGL par page, chargé après idle sur desktop. **LCP opaque dans le HTML** : pas de `motion` avec `opacity: 0` sur le `h1` ni sur le lede (ADR 0006).
- Composants : `src/components/widgets/*` (CardShell, LiquidBlob, palettes) et `src/components/bento/*` si une grille sert ; Framer Motion pour les entrées hors LCP.
- Maillage : lien depuis le footer colonne « Identité & Légal » (pages réelles uniquement, aucune ancre), depuis `/plan-du-site`, depuis la page auteur. Ajouter `/a-propos` au `public/sitemap.xml` (avec `lastmod` du jour) et en **tête** de `public/llms.txt` et `public/llms-full.txt` (la section « À propos » doit pointer dessus).
- Étendre `src/lib/seo-hygiene.test.ts` : `/a-propos` présent dans sitemap, llms.txt, plan du site, footer ; aucun mot interdit (« gratuit », « offert ») dans la page.
- Aucune IA générative pour les images : si un visuel est nécessaire, demander à Pierre (il génère sur Gemini, tu convertis en WebP).

### La 404 (`src/app/not-found.tsx`)

Même ADN visuel que `/a-propos`, ton complice, une seule blague maximum, et surtout **utile** : au lieu de trois liens, elle affiche une version compacte de la carte des ressources (les 6-8 entrées les plus décisives, tirées de la même source de données), un champ de recherche simple sur les titres du catalog (client-side, sans dépendance nouvelle), et le CTA devis. Conserver le vrai statut HTTP 404 (comportement natif de `not-found.tsx`), pas de `ShaderBackdrop` ici (page d'erreur = légère : gradient CSS + un `LiquidBlob`), pas de JSON-LD. Le lien `/approche#prestations` actuel est toléré dans le corps (l'interdiction des ancres vaut pour le footer et la nav fixe).

### Déroulé attendu

1. Branche `feat/a-propos` (chantier structurel, 4+ commits).
2. `src/data/site-resources.ts` (ou nom équivalent) : la source unique « carte des ressources » = catalog + pages statiques, avec un test.
3. `/a-propos` : page, JSON-LD, maillage, sitemap, llms, tests. Commit.
4. `/relecture-editoriale` sur le texte ; corrections. Commit.
5. 404. Commit.
6. `npm run lint`, `npm test`, `npm run build`. Lighthouse sur `/a-propos` (LCP < 2,5 s desktop, pas de « délai d'affichage de l'élément »).
7. Handoff : ajouter une ligne dans `docs/sessions/INDEX.md` + note de session. **Ne pas pousser** : Pierre pousse et déploie ; lui laisser la commande IndexNow et la liste des URL à soumettre dans Search Console (`/a-propos` en premier).

### Critères de réussite

- Un LLM à qui on donne uniquement le HTML de `/a-propos` peut répondre sans erreur à : qui, quoi, pour qui, où, comment, combien (« premier rendez-vous non facturé »), et lister au moins 10 ressources du site avec leur verdict.
- Un dirigeant qui arrive de n'importe quel article trouve en moins de 30 secondes la ressource qui correspond à sa question et le bouton devis.
- Aucun chiffre client non autorisé, aucun mot interdit, aucun balisage d'avis, aucune régression des tests d'hygiène.
