---
adr: 0008
title: Positionnement « intégration IA / Odoo / Claude Code » — distribution d'abord, le site convertit
status: proposed
date: 2026-10-23
revised: 2026-10-27
deciders: Pierre Legrand
consulted: Claude Code (brainstorm silos, revue croisée, /dialectic du 2026-10-23, revue du 2026-10-27)
informed: boucle de travail (docs/backlog.md)
follows: ADR 0003 (persona dirigeant tech-curieux, mesurer d'abord), ADR 0007 (Discover, format news), pivot du 2026-05-28 (local = fiche Google)
---

# ADR 0008 — Positionnement « intégration IA / Odoo / Claude Code » : distribution d'abord, le site convertit

> **Statut proposed.** Révisé le 2026-10-27 : l'option B (architecture de silos, 55 pages) cède la place à l'option D. Passe en `accepted` le jour où la capture GEO de départ (limelit, prompts de [geo-prompts.md](../seo-audits/2026-05-21-data/geo-prompts.md)) est enregistrée. V0 et la consolidation démarrent sans attendre.

## Contexte

Le site se décrit encore comme un « consultant IA et transformation digitale pour PME en Yvelines et Val d'Oise » (JSON-LD `Organization` / `LocalBusiness`, `jobTitle` de l'auteur). Les faits mesurés disent autre chose ([note de recherche](../seo-audits/2026-10-23-positionnement-integration-ia.md)) :
- sur 16 mois, le cluster intégration IA / Odoo / dev fait **503 clics sur 597 (84 %)** ; le local et l'audit IT, 15 clics pour 8 666 impressions ;
- la demande se formule **par outil** : « claude code » 301 suggestions, « claude cowork » 265, « odoo claude » 63, « intégration ia pme » 1 ;
- la niche francophone « Claude × Odoo pour PME » est naissante. Personne ne combine terrain tracé, coût à l'usage et Claude Code.

Le problème n'est pas l'ordre interne du site, c'est qu'**on ne le découvre pas** :
- **Aucune autorité externe.** Aucune citation tierce trouvée (recherche du 2026-08-24), recherches de marque quasi nulles, un seul backlink connu de Google (reva9.fr). Le maillage interne répartit l'autorité, il n'en crée pas.
- **Le clic organique s'effondre.** Position 3 et 0 clic sur les deux piliers en août. Quand une réponse IA s'affiche, le premier résultat perd environ 58 % de clics (Ahrefs, 300 000 mots-clés) ; Seer mesure −61 % de CTR organique.
- **Les IA citent d'autres plateformes que les sites.** YouTube est la première source des AI Overviews (environ 20 à 30 % selon les études) ; Reddit et Wikipédia dominent chez ChatGPT et Perplexity. Les **mentions de marque** corrèlent environ trois fois plus que les backlinks avec la visibilité IA (Spearman 0,66 contre 0,22, Ahrefs, 75 000 marques). Corrélation, pas causalité, mais toutes les études vont dans ce sens.
- **Le site sort d'une sanction** : crawl gelé depuis juillet, seules les demandes d'indexation manuelles fonctionnent ([recrawl](../seo-audits/2026-10-14-recrawl-urls-gelees.md)). Publier 55 pages produites par des agents expose au signal « contenu à l'échelle ».
- Les 3-4 devis mensuels viennent presque tous de la **recommandation** ([playbook](../playbooks/acquisition-devis.md)) et **rien ne permet de mesurer** l'origine d'un devis.

## Options considérées

### Option A — Statu quo : consultant IA généraliste ancré 78/95
**Contre** : décrit le site par son segment le plus faible ; le graphe d'entité contredit le contenu qui marche. Écartée.

### Option B — Architecture de silos cible (55 pages, règles R1-R12), vagues conditionnées
**Pour** : hiérarchie claire, maillage vérifiable. **Contre** : optimise l'intérieur d'un site que personne ne cite ; volume risqué en sortie de sanction ; la cible de pages dépend du classement Google, dont le clic s'effondre. *(Retenue le 2026-10-23, remplacée le 2026-10-27.)* Détail : [plan d'architecture des silos](../plans/2026-10-23-architecture-silos.md).

### Option C — Thèse seule, contenu gelé jusqu'à preuve de devis
**Contre** : à 3-4 devis par mois, gel sans échéance. Écartée.

### Option D — Distribution d'abord : un sujet = un package open source + une vidéo + une page (RETENUE)
**Pour** : place la preuve là où les IA et les dirigeants la trouvent (GitHub, YouTube, LinkedIn) ; produit des mentions et des liens naturels, le seul signal qui manque ; chaque pièce est un livrable réutilisable en formation ; le volume reste faible (un sujet toutes les deux semaines), donc tenable et défendable.
**Contre** : demande de produire des vidéos et du code maintenu, pas seulement du texte ; dépend de la diffusion faite par Pierre ; résultats plus lents à lire dans GSC.
**Coût** : un gabarit Remotion, un gabarit de repo, une page par sujet ; temps de diffusion.

## Décision

**On retient l'option D.** Critère décisif : **on investit là où se forme la découverte (plateformes citées par les IA, mentions de marque), et le site sert à convertir et à prouver.** De l'option B, on garde ce qui ne dépend pas du volume : l'instrumentation, l'identité, la consolidation.

### Ce qui est décidé

| Sujet | Décision |
|---|---|
| **Thèse** | augmenter.pro aide les dirigeants de PME françaises à intégrer l'IA à leurs outils (Odoo d'abord), avec du code ouvert, des vidéos de formation et un terrain publié. Le 78/95 reste l'ancrage de la fiche Google et de la formation en présentiel ; il sort de l'identité du site |
| **Identité structurée** | `Organization` réécrit (intégration IA, Odoo, Claude Code ; zone France) ; `LocalBusiness` restreint au présentiel 78/95 ; « Robotique » et les secteurs BTP / immobilier retirés ; `jobTitle` « Consultant intégration IA · Odoo & Claude Code » ; `sameAs` complété par le compte GitHub et la chaîne YouTube dès leur ouverture |
| **Unité de production : le sujet** | un problème réel de dirigeant (formulé outil + tâche) donne **trois pièces** : ① un **package open source** installable, README en français, licence explicite, sur GitHub, déclaré dans les annuaires pertinents (registres MCP, listes « awesome-claude-code », apps Odoo) ; ② une **vidéo Remotion** de 3 à 6 min sur YouTube, titrée avec les mots de la demande ; ③ une **page du site** qui intègre les deux, porte la preuve terrain et l'appel au devis |
| **Rythme** | un sujet toutes les deux semaines. Pas de lot de pages sans package ni vidéo |
| **Diffusion** | faite par Pierre à chaque sujet : post LinkedIn, communauté Odoo, X. Aucun envoi automatique |
| **Preuve** | chaque sujet s'adosse à une preuve 🟢 nommée (terrain Reva 9, iaCommerce, ou source primaire) + relecture humaine avant publication. iaCommerce n'est jamais nommé : le package publié est un extrait générique |
| **Frise de l'IA (actif phare)** | voir ci-dessous |
| **Silos** | gelés. Le registre `silos.ts` et le filtre des cartes « À lire ensuite » se font en V0 (ils corrigent 59 cartes hors thème), les règles R1-R12 et la cible de 55 pages ne sont pas poursuivies. La fusion `/strategie-ia-pme` + `/audit-ia-pme` (26 fichiers) attend un signal de crawl |
| **Mesure** | devis attribués (page d'origine + UTM côté serveur, champ déclaratif en complément) ; mentions de « augmenter.pro » ; étoiles, forks et clones GitHub ; vues et rétention YouTube ; citations LLM (limelit, avant/après). Le classement Google devient un indicateur secondaire |

### Frise de l'IA — actif éducatif phare

Remplace le « journal des annonces IA » du plan (§ 2.9). Ce n'est pas une course à l'annonce du jour, que la documentation des éditeurs gagne toujours : c'est un **contenu éducatif comparatif** qu'aucun éditeur ne produit sur ses concurrents.

| Choix | Décision |
|---|---|
| **Promesse** | faire **ressentir** la vitesse de l'IA à un dirigeant : effet « waouh » sur l'interface et sur le contenu |
| **Métaphore visuelle** | l'évolution des consoles de jeu et de leurs graphismes (8 bits → 16 bits → 3D → photoréalisme) comme échelle de la vitesse d'avancée de l'IA. **Illustrations maison** évoquant chaque génération, jamais de logo, de capture ni de sprite d'un fabricant (droit des marques et droit d'auteur) |
| **Périmètre** | multi-éditeurs : Anthropic, OpenAI, Google, Mistral, DeepSeek, Qwen, Meta et les modèles ouverts. On **recoupe** : la même capacité, qui l'a sortie, quand, à quel prix |
| **Entrée** | date · éditeur · lien vers la publication officielle · ce que ça change pour une PME · verdict (`tester` / `attendre` / `ignorer`) · page du site concernée |
| **Données** | `src/data/frise-ia.ts`, une entrée = un objet typé. `dateModified` calculé depuis la dernière entrée, jamais posé à la main |
| **Alimentation** | à terme, **pipeline nocturne sur app.augmenter.pro** (Firecrawl sur les notes de version des éditeurs) qui produit des **brouillons d'entrée**. Le verdict et la publication restent humains : rien ne part en ligne sans validation |
| **Prolongements** | chaque grande étape de la frise peut devenir une vidéo Remotion ; une grosse annonce donne aussi un article `kind: "news"` (ADR 0007) |
| **URL** | à figer à la construction (`/journal-ia` du plan ou un nom propre à la frise) ; absorbe `bilan-ia-janvier-juillet-2026` en 301 |
| **Tenue** | alerte si plus de 45 jours sans entrée ; dépublication = décision humaine |

## Conséquences

### Positives
- La preuve vit là où les IA et les dirigeants la cherchent, et chaque pièce renvoie vers le site.
- Les packages et les vidéos servent deux fois : acquisition et matière des formations.
- Le volume reste bas, donc défendable pendant la sortie de sanction.
- On saura enfin d'où viennent les devis.

### Négatives (assumées)
- Produire une vidéo et maintenir un package coûte plus qu'écrire une page.
- La diffusion repose sur Pierre ; sans elle, les pièces restent invisibles.
- Les résultats se lisent hors de GSC (GitHub, YouTube, limelit) : il faut un relevé régulier.

### Risques résiduels et mitigations
- **Aucun devis attribué.** Instrumentation en premier ; revue à 90 jours ; 2 fenêtres de 90 jours sans contact attribué → rouvrir la thèse.
- **Package abandonné ou cassé** (mauvais signal public). README avec version testée et statut ; un package non maintenu est archivé sur GitHub, pas laissé en l'état.
- **Frise qui hallucine ou se trompe de date.** Chaque entrée cite la publication officielle ; brouillons du pipeline jamais publiés sans validation.
- **Dépendance à Anthropic et Odoo.** La frise multi-éditeurs et l'angle coût à l'usage / modèles locaux ne dépendent d'aucune marque.
- **Casser la chaîne de réception des devis en l'instrumentant.** Garder le `console.log [QUOTE]`, `keepalive: true` et l'absence d'`await` avant `window.open` ; test local avant tout déploiement (exécuté par Pierre).
- **Confidentialité Reva 9 / iaCommerce.** 🟢 uniquement ; jamais secteur + effectif + localisation ensemble ; iaCommerce jamais nommé, ni dans le code publié.

## Plan d'implémentation

- [ ] **Préalable à l'acceptation** : capture GEO de départ (limelit sur le VPS), baseline GSC, relevé des mentions de « augmenter.pro ».
- [ ] **V0 — maintenant** : suivi de l'origine des devis ([route.ts](../../src/app/api/quote/route.ts), [quote-wizard.tsx](../../src/app/contact/quote-wizard.tsx)) et UTM sur les CTA ; filtre des cartes « À lire ensuite » par thème.
- [ ] **Consolider — maintenant** : les 2 articles forts et `/serveur-mcp-odoo` (maillage, CTA) ; les 7 liens en dur de l'annexe B du plan.
- [ ] **Identité structurée** ([layout.tsx](../../src/app/layout.tsx), `/auteur`, `/a-propos`).
- [ ] **Gabarits** : composition Remotion réutilisable ; gabarit de repo (README FR, licence, CI) ; gabarit de page « sujet ».
- [ ] **Sujets 1 à 3** : choisis dans les terrains, un toutes les deux semaines.
- [ ] **Frise de l'IA** : données, maquette UI, amorce avec les annonces 2023-2026 ; pipeline nocturne app.augmenter.pro quand prêt.
- [ ] Mettre à jour [project-context.md](../../.claude/templates/seo/project-context.md) et le `CLAUDE.md` du projet.

## Validation post-implémentation

- **Métrique cœur** : contacts et devis attribués (page d'origine ou UTM). Baseline : 0 à la mise en place du suivi.
- **Découverte** (T+90) : mentions tierces de « augmenter.pro » > 0 ; au moins un package cité ou listé hors de nos comptes ; au moins une citation LLM sur les prompts « intégration IA / Odoo » par rapport à la capture de départ.
- **Frise** : au moins un lien ou partage externe à T+90 ; tenue d'au moins 2 entrées par mois.
- **Conditions de réouverture** : 2 fenêtres de 90 jours sans contact attribué → rouvrir la thèse ; frise sans aucun partage ni citation au 2026-12-15 + 90 jours → décider de la garder comme outil de formation seulement.

## Références

- [Plan d'architecture des silos](../plans/2026-10-23-architecture-silos.md) — option B, gelée ; § 2.9 remplacé par la frise
- [Note de recherche positionnement](../seo-audits/2026-10-23-positionnement-integration-ia.md)
- [Dossier du brainstorm](../sessions/2026-10-23-brainstorm-silos-maillage.md)
- [ADR 0003](0003-funnel-geo-conversion.md) · [ADR 0007](0007-google-news-discover.md) · [Playbook acquisition de devis](../playbooks/acquisition-devis.md)
- Terrains : [terrain-odoo-reva9.md](../../.claude/templates/seo/terrain-odoo-reva9.md), [terrain-iacommerce.md](../../.claude/templates/seo/terrain-iacommerce.md)
- Données externes (relevées le 2026-10-27, synthèses secondaires à recouper avant publication) : [Ahrefs, mentions de marque et visibilité IA](https://ahrefs.com/blog/ai-overview-brand-correlation/) · [Ahrefs, CTR et AI Overviews](https://seoworth.it.com/news/ahrefs-ai-overviews-ctr-study/) · [Seer, CTR organique](https://ppc.land/google-ai-overviews-reduce-organic-ctr-61-paid-traffic-68/) · [Index des sources citées par les IA 2026](https://everything-pr.com/the-50-most-cited-websites-in-ai-reddit-wikipedia-youtube-lead-2026-index)
