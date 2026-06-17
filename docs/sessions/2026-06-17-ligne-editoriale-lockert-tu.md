---
date: 2026-06-17
slug: ligne-editoriale-lockert-tu
status: open
mode: solo
related_docs:
  - .claude/templates/seo/playbook-influence-ethique.md
  - .claude/templates/seo/charte-editoriale.md
tags: [editorial, charte, lockert, influence-ethique, tu-vous, ab-test, robotique]
---

# Ligne éditoriale : doctrine Lockert (influence éthique) + bascule registre « tu » + honnêteté robotique

## Status
green — changements de **copy + docs** uniquement (aucune logique métier touchée). `npm run build` **non lancé** cette session (risque faible). Un watcher externe auto-commit/push le repo (cf. memory `project_auto_commit_automation`) — l'état git exact peut donc déjà être commité.

## Contexte de départ
Récupération d'une doctrine éditoriale que le user avait fait travailler dans **un autre projet** (WeBuild — Trading Authority Game, `docs/storytelling-playbook.md`, 2026-05-27) à partir du livre **« L'Hypnose Humaniste Pour les Nuls » d'Olivier Lockert**. Le fil était perdu (jamais sauvegardé en mémoire). Rapatrié et adapté à augmenter.pro.

## Done in this session

**1. Doctrine éditoriale récupérée + sourcée (durable)**
- Créé **[`.claude/templates/seo/playbook-influence-ethique.md`](../../.claude/templates/seo/playbook-influence-ethique.md)** (la « mécanique » : patterns d'accroche, persuasion transparente, accroches de mail, garde-fous).
- **Correction doctrinale majeure** vs le résumé web d'origine : Lockert **rejette** le Milton Model / patterns PNL (= influence *cachée*) ; il autorise la persuasion **explicite** (réf. *Carducci & Deuser, 1984*, p.164). « Dire les choses franchement, c'est déjà refuser de manipuler. »
- **Source primaire lue** : `Z:\Pi3r\Drive\A Lire\Lhypnose humaniste Pour les Nuls - Olivier Lockert.pdf` (457 p.). Carte des chapitres utiles + n° de pages PDF dans le **§7** du playbook (pour y revenir).
- Charte mise à jour : **§3.4 « influence éthique en ouverture »** + anti-pattern « influence manipulatoire » (§7) + pointeur playbook dans l'en-tête. Date charte → 2026-06-17.
- Mémoire : `reference_playbook_influence_ethique.md` (pointe le PDF + acte la correction doctrinale).
- Pointeur ajouté dans **CLAUDE.md** (section éditoriale, avec rappel du découplage tu/vous).

**2. Passe « valider la méfiance » + bascule registre `tu` (charte §3.3 : pages commerciales = tutoiement)**
- **`/augmenter-mon-entreprise`** ([augmenter-view.tsx](../../src/app/augmenter-mon-entreprise/augmenter-view.tsx) + [page.tsx](../../src/app/augmenter-mon-entreprise/page.tsx)) : hero réécrit en `tu` (ouvre sur la méfiance + sortie libre « tu ignores le reste »), badge « tu n'en liras que 3 », puces **#5** (« je ne sais pas si mes données sont vraiment protégées ») + **#6** (« je tourne autour de l'IA sans savoir par où commencer », corrige le hors-axe), harmonisation `tu` complète (résultats, CTA cards), metadata `description` + OG en `tu`.
- **`/contact`** ([page.tsx](../../src/app/contact/page.tsx) + [contact-form.tsx](../../src/app/contact/contact-form.tsx) + [quote-wizard.tsx](../../src/app/contact/quote-wizard.tsx)) : metadata en `tu` (« On ne te vendra rien… on te dit la vérité »), hero « Construis ton brief » + « Pas de formulaire piège ni de rappel commercial surprise », trust signal en `tu`, **wizard complet en `tu`** (15 chaînes UI : titres d'étapes, labels, bloc RGPD, exit-intent, écran de confirmation). **Laissés en `vous`** : le brief généré + les messages email/WhatsApp pré-remplis (voix du dirigeant → Pierre).

**3. Honnêteté E-E-A-T sur la robotique (robotique = R&D, rien à prouver — seulement des entretiens avec de grandes boîtes du secteur)**
- **Home `/` (variante A)** [ch03-disciplines.tsx](../../src/app/home-narrative/chapters/ch03-disciplines.tsx) : 3ᵉ pilier ~~« Robotique & IoT »~~ → **« Formation & autonomie »** (icône `GraduationCap`, aligné sur les offres Atelier/Cohorte). Robotique reléguée en **mention** « Axe d'exploration · Robotique & IoT en R&D — un projet ? parlons-en ».
- **`/accueil-2` (variante B A/B)** [hero-augmente.tsx](../../src/app/accueil-2/hero-augmente.tsx) : Ch3 trust line ~~« Du matériel installé et expliqué sur place »~~ (claim de livraison **faux**) → **« Pas encore en catalogue — notre axe d'exploration assumé »** + subRest cadré « Demain… ». Scène robot/drone **conservée** (vision légitime).

## Git state
- Branch : `main`. Changements = copy + docs uniquement.
- ⚠ Watcher externe auto-commit/push → ne pas committer manuellement ; vérifier `git log` pour l'état réel.

## Test status
- `npm run build` **non lancé** cette session. Risque faible (chaînes/copy), mais l'édition de `ch03-disciplines.tsx` touche un **import** (`Bot` → `GraduationCap`) + de la **structure JSX** → un build de validation est recommandé avant de s'y fier en prod.

## Next concrete step
1. **`npm run build`** pour valider la compilation (surtout `ch03-disciplines.tsx`).
2. **Valider la véracité littérale des claims robotique** : que « entretiens / acteurs majeurs du secteur » corresponde exactement à la réalité (le user doit posséder la phrase).
3. **(En réserve, proposé non fait)** : 2-3 variantes de **lede de couverture** pour la home `/` Ch1 (la ligne « un cran d'avance », la plus tiède de la page — cf. mon parcours).
4. **Lot suivant logique** : décider si on uniformise le **registre `tu`** sur les pages services/audits encore en `vous` (`/strategie-ia-pme`, `/integration-mcp`, `/audit-informatique-{yvelines,val-doise}`).
5. **A/B en cours** : `/` (A) vs `/accueil-2` (B). Quand une variante gagne, propager la doctrine sur l'autre si besoin.
6. **Quand une vraie mission robotique tombe** → repromouvoir l'axe en pilier réel (home + accueil-2), avec preuve.

## Open decisions
- Registre des pages **services/audits** (`tu` pour cohérence commerciale vs `vous` actuel) — non tranché.
- Réf. exacte du livre : le PDF fourni = *« Pour les Nuls »* (confirmé). Le doc WeBuild citait aussi *« Changez grâce aux états de conscience augmentée »* (ouvrage distinct du même auteur) — le playbook s'appuie désormais sur le PDF *Pour les Nuls*.

## Blockers
- Aucun blocker technique. La validation des claims robotique dépend du user (vérité terrain).

## How to resume
1. Lire ce doc + le **playbook** [`.claude/templates/seo/playbook-influence-ethique.md`](../../.claude/templates/seo/playbook-influence-ethique.md) (§7 = carte du PDF source pour replonger précisément).
2. La doctrine opérationnelle = **charte §3.4** + playbook ; `/relecture-editoriale` applique la charte à un brouillon.
3. Lancer `npm run build` si pas encore fait.
4. Trancher le registre des pages services/audits (open decision).
5. Si reprise « copy » : proposer les variantes de lede home Ch1 (point 3 du Next step).
