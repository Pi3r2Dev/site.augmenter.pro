# Charte éditoriale — augmenter.pro

**Source de vérité de la VOIX du site.** Identité, ton, lexique, arc de contenu, barre qualité E-E-A-T, anti-patterns. Tout contenu user-facing s'y conforme : articles de blog, pages services, landings, récits narratifs (`/`, `/approche`), meta titles/descriptions, `llms.txt`.

> **Division des rôles — ne pas dupliquer, croiser :**
> - **Cette charte = la VOIX** (comment on parle : ton, lexique, arc, barre qualité).
> - [`playbook-influence-ethique.md`](playbook-influence-ethique.md) = la **MÉCANIQUE** d'influence éthique (patterns d'accroche, boîte à outils PNL/Milton, structure « en ouverture », accroches de mail) — détaille la règle §3.4 ci-dessous.
> - [`project-context.md`](project-context.md) = la **STRATÉGIE** (positionnement 3-tiers, persona détaillé, audience/géo, pyramide d'offres, méthode SEO/GEO).
> - [`eeat-grid.md`](eeat-grid.md) = le **scoring** E-E-A-T détaillé (barème /20).
> - [`checklist.md`](checklist.md) = les **check-lists** opérationnelles (on-page, JSON-LD, intégration site).
>
> En cas de doute sur le **fond stratégique** → project-context. Sur la **forme / la voix** → ici.

> **Dernière mise à jour** : 2026-06-17 (ajout §3.4 influence éthique + playbook).
> **Contrôle automatique** : passer tout contenu au crible de `/relecture-editoriale` avant publication (skill projet qui note ton / arc / lexique / E-E-A-T contre cette charte).

---

## 1. Identité éditoriale

- **Auteur** : Pierre Legrand, consultant IA & transformation digitale. Tout article est publié sous son nom (`Article.author` JSON-LD).
- **Mode de production** : contenu **assisté par IA et révisé par Pierre Legrand**. Ne **jamais** prétendre « 100 % humain ».
- **Raison d'être** : aider les dirigeants de PME à **décider et agir**, pas générer du trafic pour générer du trafic. Si un sujet ne sert pas l'audience cible, on ne le traite pas.

## 2. À qui on parle (résumé — détail dans [project-context.md](project-context.md) §Audience)

Un **persona unique** : le **dirigeant PME tech-curieux** — gérant 10-200 salariés, francophone, déjà sur Odoo ou tenté de migrer, formation tech/scientifique, débordé mais curieux des LLMs. Il veut **comprendre** la techno (ChatGPT, Claude, Odoo, automatisation) **sans jargon** et **sans dépendre d'un intégrateur opaque**. Secteurs : BTP, immobilier, industrie, artisans, commerces, services.

**Test du lecteur** : à la fin de la lecture, le dirigeant doit pouvoir **faire quelque chose** — décider, appliquer une checklist, lancer un chantier. S'il ne peut rien faire, le contenu a échoué.

---

## 3. La voix — 3 règles

### 3.1 Arc « douleur d'abord, solution complète ensuite » — principe **structurel** central

Ce n'est pas qu'un ton d'accroche : c'est l'**architecture** de chaque contenu.

- **a) Ouvrir sur la douleur, frontalement.** Nommer le problème réel du dirigeant *avant* toute solution, sous plusieurs angles (coût, temps perdu, dépendance à un prestataire, frustration). Le lecteur doit penser **« c'est exactement mon problème »** avant qu'on lui propose quoi que ce soit.
- **b) Puis livrer la solution *complète*, pas un teaser.** Une fois la douleur installée, donner la réponse **entière et actionnable** : étapes, méthode, ce qu'il faut faire **ET ne pas faire**. Jamais une réponse partielle qui force à « nous contacter pour la suite ». La valeur se donne ; le CTA vient **en plus**, jamais **à la place**.
- **Pourquoi** : (i) ça convertit le dirigeant méfiant — il se sent compris avant d'être vendu ; (ii) c'est le seuil de **citation LLM** — une réponse complète et auto-suffisante est citée, un teaser ne l'est pas.

### 3.2 Ton provocateur, jamais corporate

Les accroches (titles, descriptions, CTA, intros) touchent les **frustrations réelles**, pas les fonctionnalités.

- Parler aux **douleurs**, pas aux features : « Vos prestataires passent plus de temps à vous faire des devis qu'à vous aider »
- **Challenger** le lecteur : « Vous devriez vous former à l'IA pour ne plus dépendre de ceux qui l'utilisent »
- Registre : accusations bienveillantes, questions rhétoriques, constats provocants
- ✅ « ChatGPT dans votre PME : 3 chantiers utiles, 5 pièges qui coûtent cher »
- ❌ « Les avantages de l'intelligence artificielle pour les PME »

### 3.3 Découplage tu / vous (acté 2026-05-21)

| Type de contenu | Registre | Exemple |
|---|---|---|
| **Pages commerciales** (landings, meta titles/descriptions, CTA) | **tutoiement direct** | « ton prestataire te facture », « reprends le contrôle » |
| **Récits narratifs** (`/`, `/approche`, articles de fond) | **vouvoiement** | ton littéraire / journalistique |

Raison : le tutoiement matche le « coach direct » en SERP/landing ; le vouvoiement préserve la posture éditoriale du récit.

### 3.4 Influence éthique « en ouverture » (Lockert + Milton) — la mécanique

La voix s'outille d'une **mécanique d'influence éthique** tirée de l'hypnose humaniste (Lockert) et du Milton Model. Principe : **on éclaire, on n'enferme pas**. On rejoint la réalité du dirigeant (synchronisation = la douleur de §3.1), on ouvre vers une méthode complète (ré-association), on invite sans forcer (sortie libre). Jamais de langage caché : *dire les choses franchement, c'est déjà refuser de manipuler*.

> **Test décisif** (chaque accroche, mail, paragraphe) : *« Si le dirigeant voyait la technique à l'œuvre, se sentirait-il respecté — ou floué ? »* → si « floué », on réécrit.

Détail opérationnel (patterns d'accroche, boîte à outils PNL, structure « en ouverture » d'un mail, lignes rouges) : **[playbook-influence-ethique.md](playbook-influence-ethique.md)**.

---

## 4. Lexique & interdits

- 🚫 **Mot « gratuit » interdit** → « offert », « sans engagement », « inclus », « sans CB », « 0 € ». *Exception* : citer ou critiquer l'usage du mot chez un concurrent.
- ✅ **Power words autorisés** : Guide, Offert, 2026, Sans Engagement, Inclus.
- 🚫 **Zéro jargon corporate** : pas de « nous proposons », « solutions innovantes », « synergies », « cutting-edge », ni listes de services en mode catalogue.
- **NAP** : une seule forme du nom — **`augmenter.PRO`** (cf. [checklist.md](checklist.md) §G.3). Identifiants de code en anglais ; copy user-facing en français.

---

## 5. Barre qualité E-E-A-T (domaine YMYL adjacent)

Objectif **≥ 15/20** sur la grille [`eeat-grid.md`](eeat-grid.md). Seuil clé 2026 = **information gain** : donnée originale + retour terrain + POV tranché. La reformulation du top SERP plafonne à 2/5 (« régurgitation »), ne ranke pas et n'est pas citée par les LLMs.

Minimum non négociable par contenu :
- **Experience** : ≥ 1 exemple terrain réel/chiffré (cas anonymisé, observation 78/95, retour de mission)
- **Expertise** : ≥ 1 avis tranché, recommandation directe ou mise en garde
- **Autorité** : auteur identifié (Pierre Legrand) + bio/credentials accessibles
- **Fiabilité** : toute donnée chiffrée sourcée (jamais de stat inventée) + ≥ 1 limite/nuance (« cela ne s'applique pas si… »)

---

## 6. People-first & périmètre

- **People-first** : la valeur prime sur le SEO. En cas de conflit, on privilégie l'utilité lecteur.
- **Pas de SEO-first** : ne jamais écrire un contenu JUSTE parce qu'un mot-clé a du volume.
- **Périmètre** : IA / digital / audit / transformation pour PME. Hors périmètre : sujets trending IA grand public sans angle dirigeant PME.

---

## 7. Anti-patterns (rejet immédiat)

- ❌ Intro/accroche « catalogue » qui liste des services au lieu d'ouvrir sur une douleur
- ❌ Solution en **teaser** qui renvoie au contact pour « la suite »
- ❌ Reformulation du top SERP sans angle propre (aucun information gain)
- ❌ Présence du mot « gratuit »
- ❌ Jargon corporate / « nous proposons » / listes de mots-clés dans les meta descriptions
- ❌ Statistique non sourcée ou inventée
- ❌ **Influence manipulatoire** : fausse urgence/rareté, culpabilisation, peur ou honte comme moteurs, suggestion qui court-circuite la décision au lieu de l'éclairer (cf. [playbook-influence-ethique.md](playbook-influence-ethique.md) §5)
- ❌ Article sans exemple terrain, uniquement théorique
- ❌ Longueur artificielle, fausses « mises à jour », variantes mineures d'un contenu existant
- ❌ Géo-ciblage 78/95 imposé sur un contenu à intent national (cf. project-context §Audience)

---

**Référencé par** :
- [`project-context.md`](project-context.md) — §Contraintes éditoriales + §Identité éditoriale (résumé opérationnel pointant ici)
- [`/relecture-editoriale`](../../commands/relecture-editoriale.md) — applique cette charte à un brouillon
- [`/create-article`](../../commands/create-article.md), [`/create-resource`](../../commands/create-resource.md), [`/modify-resource`](../../commands/modify-resource.md), [`/seo-audit`](../../commands/seo-audit.md)
