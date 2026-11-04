# Benchmark concurrent : ouvrali.fr (2026-11-04)

> Relevé du site **ouvrali.fr** (kit de méthodes + agents IA, éditeur GeeKoS Nexus, créateur « Rémy »), page par page : style graphique, message, SEO.
> Source : sitemap complet (55 URL) aspiré le 2026-11-04, extraction title/meta/Hn/JSON-LD/liens/mots, CSS du site, capture pleine page de la home.
> Cible : la même que nous (indépendants, TPE, associations), **niveau plus débutant**. Positionnement produit (kit à 79 €), pas cabinet de conseil.

## 1. Synthèse en 10 lignes

- **Offre** : un kit numérique (8 rôles d'agents, 30 méthodes, 30 modèles de documents, cadre, guides) à installer dans *son propre* outil IA, **ChatGPT en mode Codex** recommandé. 79 € (autonomie) / 149 € (+1 h) / 219 € (+2 h) / sur devis. Achat unique, outil IA à part.
- **Promesse** : « Déléguez à l'IA. Avancez avec méthode. » La décision reste à l'humain : refrain présent sur **chaque** page (« Les agents préparent, vous décidez », « Vous gardez la main »).
- **Marque incarnée** : 8 agents personnages illustrés (Hugo pilotage, Nora commercial, Alice administration, Oscar finances, Léo communication, Maya projets, Sacha recherche, Iris qualité) + Rémy, le créateur, présent dans le hero.
- **Montrer plutôt que dire** : chaque page de vente affiche un **document de travail fictif** produit (proposition « Atelier Rivage », 1 × 600 €), avec la mention « Document de travail · à valider » et les points ouverts.
- **SEO** : 8 pages commerciales + **47 articles** (`/blog`, rebaptisé « L'IA en pratique »). Le gros du trafic visé vient de **requêtes métier non-IA** (devis, note de frais, PV d'AG, fiche de poste…) ramenées vers le kit par une section « Avec Ouvrali ».
- **Technique SEO propre** : title + description uniques sur 55/55, canonical, `max-image-preview:large`, BreadcrumbList partout, FAQPage + Product/Offer sur la home, Product/Offer sur tarifs, Article sur les 47 articles.
- **Faiblesses** : `author` = Organization (aucune Person, pas de page auteur), **aucune date** (ni `datePublished` ni `dateModified`, 0/47), pages segment peu maillées (2 liens internes dans `<main>`), images de la home sans `alt` hors hero, pas de preuve réelle (tout est « exemple fictif »).

## 2. Identité graphique (site entier)

| Élément | Relevé |
|---|---|
| Ambiance | Éditoriale chaude, « atelier » : papier crème, brun-rouge terre cuite, bleu nuit. Calme, rassurant, très aéré. Aucune animation spectaculaire (bouton « Réduire les animations » en pied de page) |
| Palette (tokens CSS) | `--cream #f9f5ed` (fond), `--paper #fffdf8` (cartes), `--navy #142941` (texte, titres, pied de page), `--clay #963e30` (accent : 2e ligne du H1, CTA pleins, liens), `--sage #e5e8dc` (carte Associations), `--line #ddd5c9` (filets) |
| Typo | **Inter variable seule** (préchargée, auto-hébergée). H1 très gros `clamp(48px, 5.3vw, 82px)`, graisse forte, interlignage serré. Pas de serif |
| Titres | Motif signature **en deux temps** : phrase 1 en navy, phrase 2 en clay (« Déléguez à l'IA. / Avancez avec méthode. », « Une demande. / Un travail à examiner. »). Répété sur toutes les pages |
| Formes | Rayons 8–14 px, ombre douce unique `0 18px 40px #2631271c`, cartes blanches sur crème, filets beige. Icônes ligne fines (dossier, fichier, réglages) |
| Illustrations | Personnages 3D façon animation (style Pixar) : Rémy + agents en atelier dans le hero, avatars ronds des agents en vignettes, un agent mascotte dans le bloc CTA final. Cohérence forte, très mémorisable |
| Composants récurrents | Maquette de document (fond blanc, entête « Proposition · Atelier Rivage », mention « à valider ») ; frise 5 étapes numérotées (Cadrer, Déléguer, Examiner, Décider, Reprendre) ; onglets de missions par segment ; tableau comparatif des formules ; FAQ accordéon ; grand bloc CTA final brun-rouge arrondi |
| Navigation | Header sobre : logo, Indépendants & TPE, Associations, Comment ça marche, L'IA en pratique, Contact + bouton plein « Voir les tarifs ». Pied de page navy 3 colonnes (Découvrir / Ressources / Contact) + « Un produit de GeeKoS Nexus » |
| Stack | Site statique maison (HTML + CSS `remy.css`, `shared/*.js`), derrière Cloudflare, `Cache-Control: no-store`. Bandeau cookies maison (Refuser / Accepter / Personnaliser) |

## 3. Pages commerciales (8)

### 3.1 `/` Accueil (1 456 mots)

- **Title** : « Ouvrali : méthode et agents IA pour votre travail » · **Description** : « Un kit de méthodes et d'agents IA pour déléguer des tâches, gagner du temps et avancer avec un cadre adapté. Pour indépendants, TPE et associations. »
- **H1** : « Déléguez à l'IA. Avancez avec méthode. »
- **Message** : tu utilises déjà ChatGPT/Claude ? Va plus loin avec un *cadre*. Le prix est donné dès le hero (« Dès 79 € TTC · Achat unique · Compte et forfait IA séparés »), avec la caution humaine « Rémy, créateur d'Ouvrali · Les agents préparent, vous décidez ».
- **Arc** (10 sections) : hero → « Vous utilisez déjà l'IA ? » (3 bénéfices : mieux cadrer, déléguer avec rigueur, progresser) → démonstration « Une demande. Un travail à examiner. » (cycle 5 étapes + maquette de proposition commerciale) → aiguillage segment (Indépendants & TPE / Associations) → « Ce que vous recevez » (4 blocs + sélecteur des 8 agents) → « Une méthode préparée » → grille tarifaire 4 formules → FAQ 9 questions → teaser blog → CTA « On commence par quoi ? ».
- **CTA** : « Voir un exemple » (plein clay), « Découvrir le cadre » (contour), « Voir les tarifs » (header), « Parlons de votre besoin » (final).
- **SEO** : JSON-LD Organization + Brand + WebSite + WebPage + **FAQPage (9 Q/R)** + **Product avec 3 Offer**. 56 images, alt seulement sur le hero et le logo. FAQ qui traite l'homonymie (« Ouvrali n'est pas Ouvralis, le logiciel de devis pour artisans ») et la confidentialité (« Ouvrali ne reçoit pas vos documents de travail »).

### 3.2 `/independants/` (942 mots)

- **Title** : « IA pour indépendants et TPE : gestion et communication — Ouvrali » · **Description** : « Gestion, communication, prospection et projets : déléguez des tâches avec les méthodes et agents IA d'Ouvrali. Kit pour indépendants et TPE ; outil IA séparé. »
- **H1** : « Organisez et faites avancer votre activité avec l'IA. »
- **Message** : choisis une situation (onglets Gestion et priorités / Offres et prospection / Communication / Projets et organisation) et vois ce qu'elle devient : la demande citée (« Je veux préparer une proposition claire à partir de cet échange client. »), l'agent qui la prend (Nora), ce que tu apportes, le document produit, ce qu'Iris contrôle, ce qui reste à valider. Mention « Cas fictif · essai documenté dans ChatGPT, en mode Codex ».
- **Sections** : mission interactive → « Une méthode pour le travail quotidien » → « Les méthodes sont préparées. Le contexte est le vôtre. » → « Déjà en activité, ou au début d'un projet ? » → « Vous gardez la main sur le résultat » → FAQ → « Quel sera votre premier chantier ? ».
- **SEO** : pas de FAQPage malgré la FAQ visible ; seulement 2 liens internes éditoriaux.

### 3.3 `/associations/` (647 mots)

- **Title** : « IA pour associations : méthode et agents — Ouvrali » · **Description** : « Organisation, budget, communication et projets : adaptez les méthodes et agents IA d'Ouvrali à votre association pour alléger le travail du collectif. »
- **H1** : « Faites avancer votre association avec l'IA. »
- **Message** : même gabarit que la page indépendants, vocabulaire du collectif (gouvernance, bénévoles, validation par les personnes responsables, « Plusieurs personnes. Un fil de travail commun. »). Onglets Projets et budget / Communication / Réunions et relais / Bilans et dossiers. Exemple : feuille de route d'événement (Maya).
- **Note** : mention honnête « Illustration fictive · adaptation associative à qualifier ». Page la plus courte du site. Pas de FAQPage.

### 3.4 `/comment-ca-marche/` (1 235 mots)

- **Title** : « Comment fonctionne Ouvrali : méthode et agents IA » · **Description** : « Déléguer une mission, examiner le résultat, adapter le cadre : découvrez les méthodes et agents IA d'Ouvrali, l'installation et les prérequis. »
- **H1** : « Déléguez avec méthode. Gardez le fil. »
- **Message** : la page « mode d'emploi » qui lève les objections techniques **avant** l'achat : prérequis (environnement IA, ordinateur + dossier de travail, capacités fichiers/instructions/actions, adaptation selon l'outil ; « Chez Ouvrali, nous préférons GPT en mode Codex », Claude et Hermes cités), cycle en 5 étapes cliquables, examen d'une proposition, les agents et leurs rôles, **les 30 modèles classés en 6 familles** (Créer et piloter, Vendre et lancer, Communiquer et mobiliser, Financer et coopérer, Réunir et organiser, Accueillir et transmettre) avec un sélecteur « Quel document vous serait utile ? », cadre évolutif, « À votre rythme ou accompagné ».
- **CTA** : « Vérifier les prérequis », « Poser une question sur mon environnement », « Découvrir les formules ».

### 3.5 `/tarifs/` (863 mots)

- **Title** : « Tarifs Ouvrali : kit à 79 €, avec aide dès 149 € » (prix dans le title) · **Description** : « Kit Ouvrali dès 79 €, ou avec accompagnement à 149 € et 219 €. Personnalisation complète et collectif sur devis. Outil et forfait IA séparés. »
- **H1** : « Le kit complet. Le départ qui vous convient. »
- **Grille** : Autonomie 79 € TTC (kit + guides) · Prise en main 149 € (kit + RDV 1 h) · Personnalisation 219 € (kit + 2 h consécutives, non fractionnable, « ajustement de l'équipe à vos besoins ») · Sur mesure sur devis (personnalisation complète, collectif à distance ou sur site). « Un achat par structure, plusieurs utilisateurs. »
- **Mécaniques** : « Le conseil d'Oscar » (l'agent finances conseille la formule) ; tableau « Votre besoin → La formule → Le point de départ » rédigé à la première personne (« Je suis à l'aise avec les fichiers et mon outil IA. ») ; bloc « Ce que vous recevez / Ce que vous préparez » ; FAQ ; un seul CTA final « Préparer ma demande ».
- **SEO** : Product + 3 Offer + BreadcrumbList.

### 3.6 `/contact/` (178 mots)

- **Title** : « Contact Ouvrali : préparer votre démarrage avec l'IA » · **H1** : « Préparons votre démarrage avec l'IA. »
- **Message** : « quelques phrases suffisent ». Téléphone pro affiché, Rémy nommé (« Créateur d'Ouvrali · GeeKoS Nexus »).
- **Formulaire** : nom, courriel, structure (facultatif), contexte (Indépendant ou TPE / Association / Autre), sujet (Mon besoin / une des 4 formules / Le fonctionnement du kit), « Ce que vous aimeriez faire avancer », champ « Votre site » (pot de miel probable). Écran de confirmation avec **« Copier ma demande »** (récapitulatif à garder).
- **Bas de page** : « Une réponse déjà accessible ? » → prérequis, comparer les démarrages, trouver une première mission.

### 3.7 `/ressources/` (120 mots)

- **Title** : « Ressources Ouvrali : livret et présentation à télécharger » · **H1** : « Les ressources pour découvrir Ouvrali. »
- **Contenu** : livret illustré PDF (29 pages, 4,77 Mo) et présentation du kit en HTML (2,5 Mo, avec sommaire), chacun « Télécharger » + « Consulter ». **Sans formulaire** : aucun mur d'e-mail.

### 3.8 `/blog/` « L'IA en pratique » (hub, 47 articles)

- **Title** : « L'IA en pratique : méthodes et usages — Ouvrali » · **H1** : « L'IA en pratique. »
- **Mécanique** : recherche plein texte + 3 portes d'entrée (« J'ai une tâche à faire », « Je découvre les usages de l'IA », « Mon métier ou mon association ») + filtres **Besoin** (Développer son activité, Organiser le travail, Gérer les finances, Communiquer, Recruter et gérer l'équipe, Faire vivre une association) × **Activité** (Association, Bâtiment, Commerce, Coaching, Immobilier, Restauration, Hébergement touristique) × **Format** (Guides pratiques, Cas concrets, Décryptages) × **Rubrique** (Avec Ouvrali, Actualités IA). Pagination. Fallback sans JS : « Toutes les lectures restent accessibles ci-dessous ».
- **Note** : très proche de notre hub `/augmenter-mon-entreprise` (secteur × douleur × objectif), mais placé sur la page blog elle-même.

## 4. Gabarit d'article (commun aux 47)

Ordre fixe, observé sur `faire-un-devis`, `ia-btp`, `connecteurs-api-mcp-ia` :

1. **H1** + chapeau qui part de la douleur (« Un devis sert à deux choses : dire au client ce qu'il va recevoir, et l'aider à dire oui. »).
2. **Avertissement d'honnêteté** : « Les documents et échanges d'exemple sont pédagogiques et fictifs ; ils ne décrivent pas une mission cliente exécutée. »
3. **« Les agents de cet exemple »** : avatars + rôle (ex. Hugo, Nora, Iris).
4. **Sommaire** « Dans cet article ».
5. Corps en sections numérotées (« 1. Avant le devis… »), avec **modèles à copier** et **exemples remplis** affichés comme documents.
6. **« Avec Ouvrali : … »** : le pont produit (ce que le kit contient pour ce sujet, jusqu'où l'agent va).
7. **« Les documents à ouvrir et à reprendre »** : PDF téléchargeable + « Source texte » (113 liens de téléchargement au total sur le blog).
8. **« Une demande à adapter à votre activité »** : un prompt prêt avec bouton **« Copier la demande »**.
9. **« Les questions pratiques »** (FAQ, non balisée).
10. **« Sources et repères »** : sources officielles (Service Public, economie.gouv.fr, DGCCRF, MDN, doc MCP, aide OpenAI).
11. **« Pour poursuivre »** : 2 articles liés + « Revenir à toutes les lectures ».

JSON-LD : WebPage + BreadcrumbList + Article (author = Organization). **Aucune date** publiée ni modifiée.

## 5. Les 47 articles par famille

### 5.1 Guides pratiques « document de gestion » (18) : le moteur SEO

Requêtes **sans le mot IA**, à volume, intention « modèle/exemple ». 2 500 à 4 100 mots. Title = « [Requête] : [promesse], avec un modèle/exemple ».

| Slug | Title | Mots |
|---|---|---|
| `faire-un-devis` | Faire un devis clair et le relancer : méthode et exemples | 4 129 |
| `relance-facture-impayee` | Relance de facture impayée : le calendrier et les modèles | 3 262 |
| `demande-subvention-association` | Demande de subvention association : bâtir un dossier solide | 3 069 |
| `annonce-de-recrutement` | Annonce de recrutement : la rédiger, avec un exemple complet | 2 976 |
| `rapport-moral-association` | Rapport moral et rapport d'activité d'association : le plan | 2 928 |
| `proces-verbal-assemblee-generale-association` | PV d'assemblée générale d'association : contenu et exemple | 2 898 |
| `planning-de-travail` | Planning de travail : le faire pour une équipe, pas à pas | 2 881 |
| `compte-rendu-de-reunion` | Compte rendu de réunion : modèle simple et suite à envoyer | 2 874 |
| `fiche-de-poste` | Fiche de poste : modèle, exemple et méthode pour la rédiger | 2 825 |
| `tableau-de-bord-de-gestion` | Tableau de bord de gestion : le suivi mensuel d'une TPE | 2 818 |
| `veille-appels-d-offres` | Veille des appels d'offres : la méthode pour une TPE | 2 787 |
| `note-de-frais` | Note de frais : contenu, justificatifs et routine simple | 2 742 |
| `calendrier-editorial` | Calendrier éditorial : la méthode simple, avec un modèle | 2 721 |
| `entretien-annuel` | Entretien annuel : le préparer, le mener et en garder trace | 2 716 |
| `veille-concurrentielle` | Veille concurrentielle : la méthode simple pour une TPE | 2 679 |
| `livret-accueil-airbnb` | Livret d'accueil Airbnb : que mettre dedans (modèle) | 2 672 |
| `documents-comptables` | Documents comptables : que transmettre au comptable et quand | 2 664 |
| `mode-operatoire` | Mode opératoire et fiche de procédure : rédiger les vôtres | 2 616 |

### 5.2 Verticales métier « IA et [secteur] » (5)

Gabarit : « ce qu'un [métier] peut confier à l'IA, et ses limites ». Section dédiée « Ce que l'IA ne doit pas faire seule ». 2 470 à 2 900 mots.

| Slug | Title | Mots |
|---|---|---|
| `ia-immobilier` | IA immobilier : ce qu'une agence peut déléguer à l'IA | 2 901 |
| `ia-coaching` | IA et coaching : ce qu'un coach peut confier à l'IA | 2 695 |
| `ia-btp` | IA et BTP : ce qu'un artisan peut confier à l'IA | 2 510 |
| `ia-restauration` | IA et restauration : ce qu'un restaurant peut confier à l'IA | 2 508 |
| `ia-commerce` | IA et commerce : ce qu'une boutique peut confier à l'IA | 2 470 |

### 5.3 Cas concrets « avec l'IA » (11)

Une session fictive déroulée de bout en bout (demande → document → contrôles → décision). 1 460 à 3 020 mots.

| Slug | Title | Mots |
|---|---|---|
| `du-message-a-la-proposition` | Exemple de proposition commerciale avec l'IA | 3 019 |
| `preparer-un-mois-de-communication-avec-ia` | Un mois de communication avec l'IA | 2 397 |
| `entreprendre-avec-ia-premiere-offre` | Entreprendre avec l'IA : tester une offre | 2 057 |
| `projet-associatif-budget-ia` | Projet associatif et budget avec l'IA | 1 939 |
| `creer-agent-ia-activite` | Créer son agent IA pour son activité | 1 828 |
| `compte-rendu-reunion-association-ia` | Un compte rendu associatif utile avec l'IA | 1 765 |
| `preparer-comptabilite-avec-ia` | Préparer sa comptabilité avec l'IA | 1 718 |
| `organiser-semaine-tpe-ia` | Organiser sa semaine avec l'IA | 1 686 |
| `garder-contexte-travail-ia` | Garder le contexte d'un travail avec l'IA | 1 542 |
| `documents-entreprise-ia-confidentialite` | Documents d'entreprise et IA : quoi transmettre ? | 1 505 |
| `verifier-reponse-ia` | Vérifier une réponse IA | 1 464 |

### 5.4 Décryptages outils (13) : pédagogie ChatGPT et agentique

Courts (1 000 à 1 950 mots), un exemple concret en ouverture puis la définition. Recouvrent **notre** terrain technique (MCP, harness, skills, agents), vulgarisé.

| Slug | Title | Mots |
|---|---|---|
| `gpt-astra-sol-luna` | GPT Astra, Sol et Luna : différences et prix | 1 955 |
| `assistant-agent-automatisation-ia` | Assistant IA, agent IA et automatisation | 1 482 |
| `workflows-skills-automatisation` | Skill, workflow et automatisation : un exemple | 1 273 |
| `skills-chatgpt-methodes` | Skills ChatGPT : créer une méthode et la réutiliser | 1 143 |
| `planifier-travail-chatgpt` | Tâches planifiées ChatGPT : programmer une revue | 1 127 |
| `ia-utiliser-navigateur` | Une IA qui utilise le navigateur : comment ça marche ? | 1 109 |
| `connecteurs-api-mcp-ia` | Connecteur, API et MCP : retrouver une fiche | 1 104 |
| `fichiers-artefacts-chatgpt` | Fichiers ChatGPT : choisir, ouvrir et corriger l'artefact | 1 062 |
| `harness-travail-agentique` | Harness IA : comprendre le travail avec des outils | 1 040 |
| `projets-chatgpt-ouvrali` | Projets ChatGPT : créer et organiser un projet | 1 034 |
| `llm-modele-application-ia` | LLM, modèle et application IA : comprendre | 1 034 |
| `plugins-chatgpt-outils` | Plugins ChatGPT : installer Google Drive | 1 017 |
| `fichier-md-markdown-ia` | Fichier .md et Markdown : à quoi ça sert ? | 1 011 |

## 6. Voix et lexique

- **Vouvoiement** partout. Phrases courtes, verbes d'action, zéro jargon dans les pages de vente (le jargon est confiné aux décryptages).
- Mots-pivots répétés : *déléguer*, *méthode*, *cadre*, *mission*, *examiner*, *décider*, *points ouverts*, *à valider*, *garder la main*.
- **Aucune promesse chiffrée de gain** (pas de « x heures gagnées »), aucun témoignage, aucun logo client. La crédibilité repose sur la transparence (exemples marqués fictifs, sources officielles, données non reçues par Ouvrali) et sur l'exhaustivité des documents montrés.
- Ton plus doux que le nôtre : pas d'accroche provocatrice, pas de douleur frontale dans les pages de vente (la douleur n'apparaît que dans les chapeaux d'articles).

## 7. Ce qu'on peut en retenir pour augmenter.pro

| Ce qu'ils font bien | Transposition possible chez nous |
|---|---|
| Prix dans le hero et dans le title de `/tarifs` | Afficher un point d'entrée chiffré (Audit 180°, Atelier Claude Code) près du H1 des pages commerciales |
| Document produit montré dans la page (« à valider », points ouverts) | Montrer un livrable réel anonymisé (rapport d'audit, workflow Odoo) dans `/serveur-mcp-odoo` et `/approche` ; chez nous il peut être **réel** (cas Reva 9, preuves 🟢), avantage net |
| 18 guides « document de gestion » sans le mot IA, avec modèle téléchargeable | Piste de contenu à volume pour le persona dirigeant : chaque guide finit par « ce qu'un agent branché sur Odoo ferait de ce document » |
| Bloc « Une demande à adapter » + bouton « Copier la demande » en fin d'article | À ajouter comme primitive d'article (proche de nos `/prompts`) |
| « Sources et repères » officielles en fin d'article | Systématiser (renforce E-E-A-T) |
| Personnages-agents récurrents | Pas à copier tel quel ; l'idée utile est **une galerie de rôles d'agents nommés** pour rendre l'offre agentique concrète |
| `/comment-ca-marche` qui traite les prérequis avant l'achat | Une section « Ce qu'il vous faut avant de démarrer » sur nos landings Odoo/MCP (plan Custom, comptes, accès) |
| Ressources téléchargeables sans mur d'e-mail | Un livret PDF de présentation de l'offre |
| Formulaire contact court + « Copier ma demande » | Notre wizard devis est plus riche ; vérifier qu'il reste aussi court ressenti |

**Nos avantages face à eux** : preuves réelles (mission Odoo tracée) là où ils n'ont que du fictif ; auteur identifié (Person JSON-LD, page auteur) là où ils publient sous Organization ; articles datés ; expertise d'intégration (Odoo, MCP, Claude Code) au-delà du kit de prompts ; présence locale 78/95.

**Leurs points faibles à ne pas reproduire** : aucune date sur les articles, FAQ visibles non balisées hors home, auteur anonyme, images décoratives sans `alt`, pages segment quasi sans maillage interne.
