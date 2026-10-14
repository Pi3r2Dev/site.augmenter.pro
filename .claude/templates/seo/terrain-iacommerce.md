# Terrain — produit « iaCommerce » (gisement de preuves pour le contenu)

Pont documentaire entre **ce repo** (site vitrine) et le repo produit **`D:\SourceFast\coolify_linux\iaCommerce`** : un commerce piloté par des agents IA, branché sur Odoo par un serveur MCP. Sert de **réservoir de preuves** pour `/create-article` et les pages du cluster **Tier 1 (Claude / Odoo / ERP / MCP)**, en particulier :

- une **page** sur les serveurs MCP pour Odoo (ce que nous faisons, ce que nous ajoutons à Odoo 20) ;
- un **article** sur l'avenir du commerce avec des agents, le lien avec Odoo et ce que la v20 change.

> **À lire après** [`project-context.md`](project-context.md) et [`terrain-odoo-reva9.md`](terrain-odoo-reva9.md) : iaCommerce est né de cette mission, ses règles de confidentialité s'appliquent **en plus** de celles du §2 ci-dessous.
>
> **Dernière synchro** : 2026-10-14 · **État du repo source** : 537 commits du 2026-08-05 au 2026-10-14.
> Ce fichier est une **photo**, pas un miroir : la source de vérité reste le repo produit.

---

## 1. Pourquoi ce fichier existe

La mission Odoo (voir `terrain-odoo-reva9.md`) a montré qu'une PME avait déjà, sans le savoir, le substrat d'un commerce agentique : un ERP propre, des données nettoyées, des procédures. Il manquait la couche qui **lit, propose, puis agit**. iaCommerce est cette couche, construite comme un **produit** (un code, des configurations), pas comme une prestation.

Depuis fin septembre 2026, Odoo 20 annonce son propre serveur MCP et des agents IA intégrés. Le sujet « serveur MCP + Odoo » devient donc grand public, et le site a besoin de deux choses que seul ce terrain fournit : **ce qu'Odoo fait désormais tout seul**, et **ce qu'un produit construit au-dessus apporte en plus**, preuves à l'appui.

**Ce que ce fichier n'est pas** : une autorisation de publier. Voir §2.

---

## 2. Règles de confidentialité — à trancher AVANT toute réutilisation

Les règles du §2 de `terrain-odoo-reva9.md` s'appliquent telles quelles au client pilote (même client). En plus :

| Niveau | Ce que ça couvre | Règle |
|---|---|---|
| 🟢 **Publiable** | Architecture, garde-fous, méthodes, décisions techniques (ADR), noms des outils MCP, nombre de tests, méthode de travail en boucle d'agents, comparaison avec Odoo 20 sur sources publiques | Publiable tel quel, sans nommer le pilote |
| 🟠 **Accord de piAIR requis** | Le nom **iaCommerce** et les noms de gamme (Essentiel / Pro Cloud / Souverain) en public ; les **prix de gamme** (hypothèses non validées) ; le **coût cumulé des runs d'agents** (chiffre personnel) ; toute capture d'écran du bot | Rien ne part sans accord explicite. Le fil X prévu sur le sujet (2026-09-28) est resté **non publié** |
| 🔴 **Jamais** | La **structuration de la société** (NewCo, capital, apports), tout ce qui touche une **reprise** du pilote, les **chiffres du pilote** (CA, résultats, chiffres par vendeur vus pendant les tests), les **prénoms** de l'équipe du pilote, l'**adresse** de l'assistant client (elle contient le nom du client), les **marques de fournisseurs** associées au pilote | Ne jamais publier, ne jamais citer, même indirectement |

**Formule pour le pilote** : reprendre celle de `terrain-odoo-reva9.md` (« une PME de négoce technique en Île-de-France »), ou plus court : « **un pilote en cours** ». Jamais « motoculture », jamais « concessionnaire », jamais une marque.

**Piège à éviter** : les tests en direct ont été faits sur de vrais chiffres (chiffre d'affaires d'une semaine, par vendeur, au centime). On peut dire « **recoupé au centime avec Odoo** », jamais citer les montants.

---

## 3. Carte du repo source — où trouver quoi

Racine : `D:\SourceFast\coolify_linux\iaCommerce`. Point d'entrée : `CLAUDE.md`, puis `docs/VISION.md`.

| Chemin | Ce qu'on y trouve | Niveau |
|---|---|---|
| `docs/VISION.md` | Le commerce de demain piloté par agents, les **3 paris** (petit modèle bien outillé, souveraineté, marché en réseau) | 🟢 (sauf § NewCo → 🔴) |
| `docs/GAMME.md` | Trois postures : où tourne le modèle, quelles données il voit, jusqu'où il agit seul | 🟢 principes / 🟠 prix |
| `docs/architecture/autonomie-paliers.md` | Paliers d'autonomie **P1 / P2 / P3** | 🟢 |
| `docs/decisions/INDEX.md` | 11 ADR datés, chacun avec options, arbitrage, risques | 🟢 **modèle de raisonnement à montrer** |
| `docs/decisions/ADR-003-outils-par-dossier.md` | Des outils par **intention** (le dossier d'un client), pas par objet Odoo | 🟢 **cœur de la page MCP** |
| `docs/decisions/ADR-004-verificateur-chiffres-cites.md` | Chaque chiffre cité par l'agent est **vérifié par du code** | 🟢 |
| `docs/decisions/ADR-009-index-local-de-reference.md` | Chercher dans un index local, lire prix et stock en direct | 🟢 |
| `docs/decisions/ADR-010-assortiment-enrichi-recherche-hybride.md` | Enrichir le catalogue par propositions **validées par un humain** | 🟢 |
| `docs/decisions/ADR-011-assistant-client-chatwoot-identifie.md` | L'assistant client : identifié par code, outils cloisonnés | 🟢 |
| `docs/guides/utilisateur.md` | Ce que l'équipe peut demander au bot | 🟢 (sans captures) |
| `docs/communication/guidelines-x.md` | Voix des prises de parole publiques du produit | 🟢 interne |
| `docs/contexte/structuration-newco.md`, `docs/contexte/reva9-*` | Société, capital, pilote | 🔴 |
| `docs/backlog.md`, `docs/backlog-archive.md` | Chaque tâche, ses tests, ce qui a été vu en direct | 🟢 méthode / 🔴 chiffres du pilote |

---

## 4. Registre de preuves — prêt à citer

### Ce qui existe et tourne (au 2026-10-14)

| Fait | Source | Niveau |
|---|---|---|
| Un **serveur MCP** écrit en Python avec le SDK officiel, qui parle à Odoo 19 par son API JSON-2, sans une ligne de Python dans Odoo (compatible Odoo Online) | ADR-001, `mcp-commerce/` | 🟢 |
| Des outils **par intention** : fiche produit, dossier client, dossier machine, « mes devis », chiffre d'affaires du magasin, factures, devis en brouillon | `mcp-commerce/src/mcp_commerce/tools/` | 🟢 |
| **Aucun outil n'a de paramètre prix, coût ou validation de commande**, vérifié par un test qui compare le schéma des outils | `CLAUDE.md` du repo, test des garde-fous | 🟢 **argument central** |
| L'écriture s'arrête au **brouillon** (devis, demande de prix) ; c'est un humain qui appuie sur « Créer le brouillon » | ADR-003, guides | 🟢 |
| Un **vérificateur de chiffres** : un nombre cité par l'agent qu'aucun outil n'a rendu est repéré par du code | ADR-004 | 🟢 |
| Un **bot Telegram pour l'équipe** : questions écrites ou dictées (vocal transcrit en local), boutons de choix, photos des produits, devis en brouillon | `docs/guides/utilisateur.md` | 🟢 |
| Un **assistant client** sur le site, par Chatwoot, qui identifie le client par un code avant de lui parler de ses commandes | ADR-011 | 🟢 (pas l'adresse) |
| Les réponses sont rédigées par un **modèle Qwen 27B qui tourne en local**, un 9B classe chaque message | `CLAUDE.md`, compose | 🟢 |
| Un **index local** (PostgreSQL, trigrammes) pour retrouver clients et références : **31 ms** mesurés en direct sur une recherche au pluriel, prix et stock toujours relus en direct dans Odoo | ADR-009, backlog MC-59 | 🟢 |
| **Un conteneur par client**, jamais de mutualisation applicative | `GAMME.md` | 🟢 |

### La rigueur, en chiffres

| Fait | Source | Niveau |
|---|---|---|
| **5 794 tests automatisés** au vert (2 335 côté serveur MCP, 3 459 côté conversation), le 2026-10-14 | runs du 2026-10-14 | 🟢 |
| **11 décisions d'architecture** écrites (ADR), chacune avec ses options rejetées | `docs/decisions/` | 🟢 |
| **436 tâches livrées** en dix semaines : 320 faites par des agents, 116 par un humain (vérifications en direct, décisions, réglages) | backlog | 🟢 |
| Chaque capacité est **vérifiée en direct** dans Telegram et **recoupée dans Odoo** : un chiffre d'affaires par vendeur exact au centime, deux clients homonymes départagés par la ville, un redéploiement qui attend la fin de la question en cours | backlog H-148, H-131, H-132 | 🟢 sans les montants |
| 103 runs de boucle d'agents, environ **2 $ par tâche** livrée sur les derniers runs | `.boucle/journal*.md` | 🟠 chiffre personnel |

### L'enrichissement du catalogue (le cas le plus parlant)

Le modèle propose un **type** pour chaque produit (« filtre à air », « courroie »…). Rien n'est écrit tant qu'un humain n'a pas validé :

1. le code **refuse** une proposition dont les mots ne figurent pas dans la fiche d'origine (le modèle ne peut pas inventer un type) ;
2. les propositions arrivent dans Odoo dans des **champs de transit**, visibles dans une liste éditable ; le responsable accepte ou refuse, en lot s'il veut ;
3. seule une fonction peut écrire dans Odoo, sur une **liste fermée de champs** (jamais prix, coût, catégorie, stock) — un test lit tout le code pour s'en assurer ;
4. chaque écriture garde la **valeur d'avant**, qui a validé, quand, avec quel modèle ; une note est posée sur la fiche, y compris pour un refus et son motif ;
5. un lot entier **s'annule** d'une commande ; un champ modifié depuis par un humain n'est pas écrasé ;
6. l'écriture est **fermée par défaut**, et ouverte seulement la nuit.

Premier lot : 22 produits d'une même famille, en attente de validation humaine au 2026-10-14. Après une itération sur la qualité, **environ 20 types justes sur 22** à la relecture.

---

## 5. Odoo 20 : ce qu'Odoo fait désormais tout seul

Présenté à l'**Odoo Experience 2026** (Bruxelles, fin septembre). L'IA est le thème principal de la version.

| Nouveauté Odoo 20 | Ce qu'on en sait | Source |
|---|---|---|
| **Serveur MCP natif** (« Connect Odoo to anything ») | Module `ai_mcp`, point d'accès `/mcp` sur la base ; clé API à portée « MCP » ou OAuth 2.1 (clients autorisés : claude.ai, chatgpt.com, grok.com dans la pré-version) ; l'outil agit **avec les droits de l'utilisateur** qui a donné la clé | Notes de version officielles ; guide tiers sur la pré-version du 2026-09-23 |
| Outils exposés par ce serveur | Génériques et **en lecture** dans la pré-version : modèles, champs, recherche, regroupement ; un administrateur peut exposer une **action serveur** de son choix, y compris en écriture | Guide tiers, **à vérifier** sur la version finale |
| **Agents IA** qui créent et modifient des enregistrements, envoient des fichiers | Déclenchables par des **actions automatisées ou planifiées**, sans ouvrir de fenêtre de discussion ; réponses interactives (boutons, demandes de permission) | Notes de version officielles |
| **Crédits IAP** | Toutes les fonctions d'IA consomment des crédits achetés à part | Notes de version officielles |
| Choix automatique du modèle | Odoo choisit le modèle selon la tâche, une fois le fournisseur choisi | Notes de version officielles |
| **Édition de produit assistée par IA** | Depuis la boutique : images, nom, **prix** ou description d'un produit | Notes de version officielles |
| Ventes croisées générées automatiquement | Accessoires, options, alternatives | Notes de version officielles |
| Prix TTC ou HT au choix sur devis et factures | | Notes de version officielles |
| Fin annoncée des API **XML-RPC et JSON-RPC** | Au profit de JSON-2 | Guide tiers, **à vérifier** |

**Sources** :
- [Odoo 20 — notes de version officielles](https://www.odoo.com/odoo-20-release-notes)
- [Octura — le serveur MCP d'Odoo 20 (pré-version)](https://octurasolutions.com/resources/odoo-20-mcp-server-connect-claude-chatgpt-any-client)
- [daily.dev — Odoo 20, la version où les agents entrent dans le flux de travail](https://daily.dev/posts/odoo-20-the-release-where-ai-agents-become-part-of-the-workflow-ixkvacrrg)
- [Octura — toutes les nouveautés d'Odoo 20](https://octurasolutions.com/resources/whats-new-in-odoo-20-every-app-feature-guide)

> ⚠️ Les blogs tiers se contredisent sur l'étendue du MCP au lancement (lecture seule ou écriture). **Relire les notes officielles et la documentation développeur** avant de publier un détail.

---

## 6. Ce que nous ajoutons — et ce qui est complémentaire

Ton à tenir : **sympathique, jamais hostile** (voir `guidelines-x.md` du repo source). Odoo 20 est une très bonne nouvelle pour nous : il rend le sujet évident pour les dirigeants. On marque la différence, on ne dénigre pas.

| Odoo 20 donne | iaCommerce ajoute | Pourquoi ça compte pour un dirigeant |
|---|---|---|
| Un serveur MCP **générique** : modèles, champs, recherche | Des outils **métier** : « le dossier de ce client », « mon chiffre d'affaires de la semaine », « ce produit, son prix, son stock libre » | Le modèle n'a pas à connaître le schéma d'Odoo : un **petit modèle local** suffit, parce que l'outil répond juste |
| Les droits de l'utilisateur qui donne la clé | Des garde-fous **dans le code** : aucun paramètre prix, écriture limitée au brouillon, un humain qui appuie sur le bouton | Un agent qui ne peut pas changer un prix, même si on le lui demande |
| Des agents qui créent et modifient des enregistrements | Un **chiffre vérifié par du code** avant de partir ; une écriture **tracée et annulable** | « Réponse sourcée, ou pas de réponse » (repère déjà publié sur le site) |
| L'édition de produit par IA, prix compris | Un enrichissement **proposé, validé par un humain, tracé, annulable**, sur une liste fermée de champs | La donnée catalogue reste sous contrôle, et on sait qui a validé quoi |
| Des **crédits IAP** chez les fournisseurs de modèles choisis par Odoo ; les résultats des outils lus par le client du fournisseur | Des modèles qui tournent **dans les murs du client** (tier Souverain), ou en France sous contrat (tier cloud) | « Votre comptabilité ne quitte jamais vos murs » |
| L'interface d'Odoo et les clients MCP du marché | Les **canaux du métier** : Telegram pour l'équipe (y compris en vocal), le site pour les clients, avec identification | L'équipe pose sa question là où elle est déjà, le client aussi |
| JSON-2 comme API d'avenir | Déjà sur JSON-2, et sans module Python : marche sur **Odoo Online** | Pas de migration à prévoir de ce côté |

**Complémentarité à dire** : le serveur MCP d'Odoo 20 peut devenir, demain, une des façons dont nos outils parlent à Odoo. Notre valeur n'est pas le tuyau, c'est **ce qui passe dedans** : des outils métier, des garde-fous, un modèle qui tourne chez le client, et un humain qui garde la main.

---

## 7. Angles éditoriaux

| # | Format | Angle | Douleur d'ouverture | Preuve |
|---|---|---|---|---|
| 1 | **Page** | **Un serveur MCP pour Odoo : ce que nous ajoutons à Odoo 20** | « Odoo 20 a un serveur MCP, j'ai encore besoin de quoi ? » | §5 et §6, tableau par tableau |
| 2 | **Article** | **Odoo 20 ouvre la porte aux agents : ce qui change pour le commerce, et ce qu'il manque encore** | Ton ERP parle enfin aux IA, mais qui l'empêche de dire n'importe quoi à ton client ? | Vérificateur de chiffres, brouillon seulement, recoupé au centime |
| 3 | Article | **Un petit modèle bien outillé bat un gros modèle qui devine** | On te vend le plus gros modèle du marché | 27B local, outils métier, index à 31 ms |
| 4 | Article | **Laisser une IA enrichir ton catalogue, sans perdre la main** | Des fiches produit réécrites que personne n'a relues | Le cas du §4 : proposition, validation, trace, annulation |
| 5 | Article | **Construire un logiciel avec des agents : dix semaines, 436 tâches, 5 794 tests** | « L'IA code n'importe quoi » | Boucle d'agents, juge à chaque tâche, fichiers de garde-fous protégés, vérification humaine en direct |
| 6 | Article | **L'agent qui ne peut pas toucher aux prix** | Peur qu'un agent accorde une remise ou change un tarif | Test de schéma : aucun paramètre prix, écriture bornée |

**Avant d'en lancer un** : passer par `/create-article` (contexte, charte, grille E-E-A-T). Ce terrain fournit le critère **Experience** et la donnée originale.

---

## 8. Protocole d'usage et de rafraîchissement

**Utiliser ce fichier** :
1. Lire le §2 ici **et** le §2 de `terrain-odoo-reva9.md`.
2. Pour Odoo 20, **rouvrir les sources** du §5 : la version vient de sortir, les détails bougent.
3. Rouvrir le fichier source du repo produit avant de publier un chiffre : le produit avance tous les jours.
4. Demander l'accord de piAIR pour tout élément 🟠, en particulier le nom du produit.

**Rafraîchir ce fichier** quand :
- le premier lot d'enrichissement est écrit dans Odoo (taux de refus, temps de validation) ;
- l'assistant client ouvre au public ;
- Odoo publie la documentation développeur du serveur MCP ;
- un angle du §7 est publié (le marquer ici avec son slug).

**Angles déjà publiés** (essaim du 2026-10-14, visuels provisoires à remplacer — cf. `public/images/blog/INDEX.md`) :

| # | Slug | Note |
|---|---|---|
| 1 (page) | `/serveur-mcp-odoo` | Landing tutoiement, tableau §6 repris ligne à ligne, FAQ, « ce qu'on refuse ». Produit **non nommé** (🟠 en attente d'accord), aucun prix de gamme |
| 2 | `/blog/odoo-20-serveur-mcp-agents` | Sources §5 citées ; à mettre à jour quand la doc développeur Odoo 20 sort |
| 3 | `/blog/petit-modele-bien-outille` | 27B / 9B, 31 ms, homonymes départagés par la ville |
| 4 | `/blog/ia-enrichir-catalogue-sans-perdre-la-main` | Les 6 verrous, 22 produits / ~20 justes — à rafraîchir quand le lot est écrit |
| 5 | `/blog/logiciel-construit-par-agents-dix-semaines` | 436 / 320 / 116, 5 794 tests, 11 ADR. Coût des runs **non chiffré** (🟠) : « quelques dollars de calcul par tâche » |
| 6 | `/blog/agent-ia-qui-ne-touche-pas-aux-prix` | Test de schéma, brouillon, écriture fermée par défaut |

L'angle 1 du terrain Odoo (`terrain-odoo-reva9.md` §5) est sorti dans le même essaim : `/blog/odoo-online-ce-que-vous-ne-pouvez-pas-installer`.
