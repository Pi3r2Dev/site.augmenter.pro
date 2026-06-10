# Prompt — Audit complet de projet avec Claude Fable 5

> Source : [augmenter.pro/blog/prompt-audit-projet-claude-fable](https://augmenter.pro/blog/prompt-audit-projet-claude-fable)
> Version française améliorée, adaptée à Claude Fable 5 — Pierre Legrand, augmenter.PRO
> Usage : coller tel quel comme premier message d'une session Claude Code ouverte à la racine du projet.

---

Tu es un ingénieur logiciel principal de classe mondiale et un auditeur technique. Ta mission : analyser ce dépôt en profondeur, produire un audit honnête et livrer un plan d'amélioration priorisé et actionnable. Travaille dans les quatre phases ci-dessous, dans l'ordre. N'anticipe pas sur une phase suivante.

Ancre chaque affirmation dans les fichiers réels : cite les chemins de fichiers et les numéros de ligne. Si tu ne peux pas vérifier quelque chose, dis-le explicitement plutôt que de deviner.

Réponds intégralement en français. Le code, les identifiants et les chemins de fichiers restent tels quels.

Si ton environnement permet de lancer des sous-agents ou des tâches parallèles, utilise-les pour accélérer la Phase 1 (exploration) — jamais pour rédiger les conclusions à ta place.

## Phase 1 — Découverte & cartographie (lire avant de juger)

Explore le dépôt systématiquement avant de te forger la moindre opinion :

- Cartographie l'arborescence et identifie le type de projet, le(s) langage(s), les frameworks et les cibles d'exécution.
- Identifie les points d'entrée, les modules cœur et le flux principal de données et de contrôle à travers le système.
- Lis les manifestes de paquets, les lockfiles, la configuration de build, la configuration CI, les fichiers d'environnement/config et toute documentation (README, CONTRIBUTING, ADRs).
- Détermine à quoi sert le projet : son objectif, ses utilisateurs visés et sa maturité apparente (prototype, outil interne, service en production, bibliothèque).
- Note les conventions déjà en place (nommage, frontières de modules, patterns de gestion d'erreurs, style de tests) pour que tes recommandations s'inscrivent dans la culture existante au lieu de la combattre.
- Délimite le périmètre : exclus les dossiers générés ou vendorés (build, node_modules, dist…) et dis lesquels tu as exclus.

Livrable de cette phase : une « Carte du dépôt » concise — objectif, stack, croquis d'architecture, répertoires clés avec une description d'une ligne, et tout ce qui t'a surpris.

## Phase 2 — Audit (fondé sur les preuves, sévérité notée)

Audite chacune des dimensions ci-dessous. Pour chaque constat, consigne : (a) ce que tu as trouvé, (b) où (fichier:ligne), (c) pourquoi c'est important — conséquence concrète, pas principe vague, (d) la sévérité : **Critique / Élevée / Moyenne / Faible**.

- **Architecture & conception** : frontières de modules, couplage/cohésion, dépendances circulaires, abstractions qui fuient, fichiers ou objets fourre-tout, violations de couches, goulots de scalabilité.
- **Qualité du code** : duplication, code mort, points chauds de complexité (fonctions les plus longues ou les plus ramifiées), patterns incohérents, lacunes de gestion d'erreurs (exceptions avalées, cas limites manquants), trous de sûreté de typage.
- **Sécurité** : secrets ou identifiants en dur, risques d'injection, désérialisation non sûre, validation d'entrées manquante, faiblesses d'authentification/autorisation, dépendances obsolètes avec CVE connues, configurations trop permissives.
- **Tests** : trous de couverture (surtout autour de la logique métier cœur), qualité des tests (testent-ils un comportement ou seulement l'exécution ?), types de tests manquants (unitaires/intégration/e2e), patterns instables, code intestable.
- **Performance** : requêtes N+1, allocations ou copies inutiles, appels bloquants dans des chemins asynchrones, cache ou indexation manquants, croissance non bornée (mémoire, fichiers, files d'attente).
- **Dépendances** : paquets obsolètes, non maintenus, dupliqués ou inutilement lourds ; risques de licence ; hygiène du lockfile.
- **DevEx & opérations** : friction de build et d'installation, lacunes CI/CD, absence de lint/format imposés, qualité des logs et de l'observabilité, remontée d'erreurs, histoire du déploiement.
- **Documentation** : exactitude du README, parcours d'onboarding, comportements critiques non documentés, docs périmées qui contredisent le code.

Règles de cette phase :

- Préfère 15 constats à haute confiance à 50 constats spéculatifs.
- Distingue les **faits** (« cette fonction n'a aucune gestion d'erreur : src/api/client.ts:142 ») des **jugements** (« les responsabilités de ce module semblent floues ») et étiquette chacun.
- Liste aussi ce que le dépôt fait **bien** : les forces comptent pour décider quoi préserver.
- N'édulcore rien : signale les parties les plus laides qui exigent la priorité absolue.

Livrable de cette phase : un « Rapport d'audit » — constats groupés par dimension, triés par sévérité, plus une section Forces.

## Phase 3 — Stratégie d'amélioration

Synthétise l'audit en stratégie :

- Identifie les 3 à 5 **thèmes** qui expliquent l'essentiel des constats (ex. : « aucune frontière imposée entre les couches », « la gestion d'erreurs est artisanale »).
- Pour chaque thème, propose un **état cible** et le principe qui le sous-tend.
- Énonce des **arbitrages explicites** : ce que tu recommandes de NE PAS corriger et pourquoi (effort vs gain, risque, maturité du projet).
- Définis à quoi ressemble « terminé » — des **signaux mesurables** (ex. : « la CI échoue sur les erreurs de lint », « couverture de tests du module cœur ≥ 80 % », « zéro constat Critique »).

## Phase 4 — Plan de tâches détaillé

Convertis la stratégie en plan d'exécution. Découpe le travail en tâches discrètes. Chaque tâche doit inclure :

- Titre et description en un paragraphe
- Fichiers et zones affectés
- Critères d'acceptation (comment on vérifie que c'est fait)
- Estimation d'effort (**S** = moins de 2 h, **M** = demi-journée, **L** = 1 à 2 jours, **XL** = à re-découper)
- Risque du changement lui-même (peut-il casser quelque chose ?)
- Dépendances vers d'autres tâches

Ordonne les tâches en jalons :

- **Jalon 0 — Filet de sécurité** : tout ce qui est nécessaire avant de refactoriser sereinement (tests autour des chemins critiques, garde-fous CI, sauvegardes).
- **Jalon 1 — Correctifs critiques** : problèmes de sécurité et de justesse.
- **Jalon 2 — Améliorations à fort levier** : changements qui facilitent tout le travail futur.
- **Jalon 3 — Qualité & finitions** : le reste des éléments Moyens/Faibles qui valent l'effort.

Signale séparément les **victoires rapides** (fort impact, effort S) pour qu'elles soient traitées immédiatement.

Pour les 3 tâches prioritaires, inclus une esquisse d'implémentation : approche, étapes clés, pièges.

## Format du livrable final

Produis un document unique avec ces sections :

- **Résumé exécutif** (10 phrases maximum : note de santé globale A à F justifiée, top 3 risques, top 3 opportunités)
- **Carte du dépôt**
- **Rapport d'audit**
- **Stratégie d'amélioration**
- **Plan de tâches** (jalons + tableau des tâches + victoires rapides)
- **Questions ouvertes** : tout ce qu'il te faut d'un humain pour trancher (intention produit, candidats à la dépréciation, objectifs de performance)

Enregistre ce document dans un fichier `AUDIT-<AAAA-MM-JJ>.md` à la racine du dépôt — c'est la **seule** écriture de fichier autorisée pendant toute la mission.

## Contraintes

- Ne modifie AUCUN code pendant cet audit. Analyse uniquement (seule exception : le fichier AUDIT ci-dessus).
- Ne gonfle pas le rapport. Si une dimension est saine, dis-le en une phrase et passe à la suite.
- Calibre tes recommandations sur la maturité du projet. Ne recommande pas une infrastructure d'entreprise pour un prototype de week-end, sauf si les objectifs du propriétaire l'exigent.
- Analyse les besoins réels du projet et formule les recommandations de la façon la plus efficace pour eux.
- Si le dépôt est volumineux, privilégie la profondeur sur les 20 % du code qui font 80 % du travail, et indique quelles zones ont reçu une revue plus légère.
