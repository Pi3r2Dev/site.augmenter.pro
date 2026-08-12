# Diagnostic chute de trafic juillet 2026 + plan d'action

> Session du 2026-08-12. Sources : GSC (API), SSH Hostinger, SERP live google.fr (Playwright), Google Suggest FR, recherche web.

## 1. Diagnostic de la chute

### Les faits (GSC, propriété `sc-domain:augmenter.pro`)

- **Effondrement des impressions de ~90 % entre le 11 et le 12 juillet 2026** : de ~150-220 impressions/jour à ~20/jour, du jour au lendemain. Clics à quasi zéro depuis.
- **Aucune désindexation** : home, `claude-code-prompt-architecture`, `nis2-pme-yvelines-val-doise` inspectés via API → « Envoyée et indexée », `pageFetchState: SUCCESSFUL`, crawls réussis (30/07, 11/08). Googlebot accède au site normalement (testé en live : HTTP 200, 130 ms).
- **C'est un effondrement de positions, transversal à toutes les pages** : « agent ia pme » 10→28, « audit cybersécurité prix » 19→33, « audit cybersécurité yvelines » 144→39 impressions, requêtes claude/odoo quasi disparues des SERP.
- Côté serveur : **aucun incident en juillet** (logs Node continus, zéro crash) et **aucun déploiement entre le 29 juin et le 11 août** — la chute ne coïncide avec rien côté infra.

### La cause : core update Google de juin/juillet 2026

- Rollout ~28 juin → **terminé le 9 juillet 2026** (~11 jours de volatilité), secousse supplémentaire le week-end du 18 juillet. La chute du 11-12 juillet est la signature classique d'une dévaluation qualité site-wide.
- Le spam update de juin (24-26 juin) ne correspond pas aux dates — écarté.
- Conséquence : **pas de fix technique magique**. La récupération passe par la qualité perçue et se matérialise généralement au core update suivant.

### Problème distinct découvert au passage : bug CDN/CSS (corrigé)

- Next.js émettait `Cache-Control: s-maxage=31536000` (1 an) sur le HTML prérendu.
- Hostinger ne conserve **qu'une seule version de build** : après chaque déploiement, les anciens CSS/JS hashés font 404.
- HTML périmé en cache CDN + assets disparus = pages sans styles / cassées → purges CDN manuelles à répétition. Les erreurs « Failed to find Server Action… older deployment » dans les logs de juillet le confirment.
- **Correctif appliqué le 2026-08-12** : `expireTime: 300` dans `next.config.ts` → `s-maxage=300` sur le HTML. Après déploiement : purger le CDN une dernière fois puis vérifier `curl -sI https://augmenter.pro/ | grep -i cache-control`.
- Non relié formellement à la chute SEO (Google crawlait avec succès) — facteur aggravant UX/conversion, pas la cause.

### Reste à vérifier

- [ ] GSC → Paramètres → Statistiques d'exploration (non exposé par l'API) : disponibilité hôte + codes 5xx autour du 10-12 juillet.
- [ ] Dates exactes des incidents « site inaccessible » + symptôme (5xx ? page blanche ? timeout ?).
- [ ] Config CDN hPanel (options actives, purge auto post-deploy ?).

## 2. Analyse SERP : qui a pris les places (google.fr, 2026-08-12)

augmenter.pro **absent du top 10 sur les 6 requêtes testées**.

| Requête perdue | Qui occupe le terrain | Pattern |
|---|---|---|
| audit cybersécurité yvelines | Redopus (×2), ACI Technology, Cybervaillance, AlezPC, Sortlist, AMI, Fastwatt | Pure players locaux mono-sujet |
| audit cybersécurité prix / coût audit informatique | Sicollab « 2 000 à 8 000 € (2026) », Odyssix « Tarifs 2026 », Digitemis, Deefense, Cyberses, nathanibgui | Guides tarifaires **millésimés** + **AI Overview** présent |
| agent ia pme | Limova, Datasuits, Juwa, Skuria, Akerwise, PromptConsulting | Agences IA spécialisées, contenu frais « 2026 » |
| prompt claude code | **code.claude.com en position 1** (bibliothèque officielle), Jedha, Ottho, SFEIR, Stéphane Robert | Doc officielle + vague FR récente |
| odoo claude | apps.odoo.com, forums odoo.com, n8n | Écosystème officiel Odoo verrouille tout |
| audit informatique yvelines | Local Pack + Infranat, AlezPC, Fastwatt, DLPC | Local Pack + prestataires IT locaux |

**Lecture** : le core update a favorisé (a) les sources officielles, (b) les spécialistes mono-sujet/locaux, (c) le contenu tarifaire daté/frais. Les deux moteurs de trafic (cluster claude/odoo, cluster audit local) pris en tenaille Anthropic-Odoo d'un côté, spécialistes locaux de l'autre.

**Conclusion stratégique** : abandonner l'espoir de re-ranker sur « prompt claude code » et « odoo claude » en l'état — pivot GEO (être cité PAR les IA) sur ce cluster, conformément à l'ADR 0003.

## 3. Où cherchent réellement les décideurs TPE/PME/ETI (Google Suggest FR)

**Découverte clé** : « consultant ia » est une requête *carrière* (salaire, emploi, freelance, formation) — un dirigeant ne cherche presque jamais un « consultant ». Il cherche dans trois langages :

### a) Langage de la tâche (intention la plus chaude)
- « intégrer l'ia dans son entreprise », « comment mettre en place l'ia », « mise en place ia entreprise »
- « automatiser des tâches avec l'ia », « mettre en place agent ia », « mettre en place une ia locale »

### b) Langage de l'outil (il cherche le logiciel ; le consultant se vend en le testant pour lui)
- **Transcription** : « ia compte rendu réunion » (+ gratuit / teams / outil / application / boîtier — filon très dense), « transcription réunion teams »
- **Vision/documents** : « ia analyse d'image », « ia lecture de documents pdf », « ocr ia c'est quoi »
- **BTP (persona)** : « ia devis btp », « ia devis travaux », « ia compte rendu chantier », « ia suivi de chantier », « ia planning chantier », « ia gestion de chantier »

### c) Langage de la confiance (l'objection qui précède l'achat)
- « ia rgpd cnil », « ia rgpd compatible », « ia souveraine france », « agents ia entreprise risques »

### La famille qui relie tout : « … ia pour pme »
audit / automatisation / formation / assistant / agent / agence **ia pour pme** — seul contexte où « consultant » réapparaît naturellement.

## 4. Outillage recommandé pour affiner

| Palier | Outil | Usage | Coût |
|---|---|---|---|
| Déjà en place | **GSC MCP** | Mining regex des requêtes latentes (positions 15-40) | 0 € |
| Gratuit à activer | **Google Keyword Planner** | Volumes FR officiels (fourchettes) pour prioriser | 0 € (compte Ads) |
| Gratuit | **Google Trends** | Comparer formulations, requêtes montantes | 0 € |
| Gratuit (maison) | **Cron Google Suggest** sur VPS | Balayage 50 seeds × a-z, alerte nouveautés | 0 € |
| **Priorité n°1 payant** | **DataForSEO** (MCP `dfs-mcp` déjà prévu au CLAUDE.md) | Volumes FR exacts, difficulté, SERP historisées, dans `/create-article` et `/seo-audit` | Dépôt min 50 $, ~0,0006 $/SERP, sans abonnement |
| Open source self-hosted | **SerpBear** (Docker, sur VPS IONOS — pas Coolify, saturé) | Rank tracking quotidien google.fr ; peut consommer DataForSEO | 0 € + API |
| Freemium | **AlsoAsked** (3/jour gratuits) | Arbre des People Also Ask → structure H2 des articles | 0-15 €/mois |
| Freemium FR | **Haloscan** | Base de données FR native, longue traîne française | ~20-40 €/mois, free tier |
| Confort | **Keywords Everywhere** | Volumes en overlay navigateur | ~2 $/mois |
| Distribution | **SparkToro** (freemium) | Où traîne le persona (podcasts, LinkedIn, newsletters) | 0-50 $/mois |
| GEO maison | Script LiteLLM mensuel | 20 requêtes clés sur 3-4 LLM → augmenter.pro cité ou pas | 0 € (infra existante) |
| Non recommandé | Semrush / Ahrefs | Overkill pour 40 pages (~120-140 €/mois) | — |

## 4bis. Décisions arbitrées (2026-08-12, avec PL)

- **Outillage** : tout activer — DataForSEO (⚠ le compte existe déjà, crédits épuisés → **recharge**, cf. mémoire `reference_dataforseo_credits`), SerpBear sur VPS IONOS (**après** la recharge DataForSEO, il s'en sert comme scraper), cron Google Suggest maison (déployé), gratuits (GSC mining fait, Keyword Planner/Trends à la demande).
- **Article n°1** : « ia compte rendu chantier » / « ia suivi de chantier ».
- **Matière E-E-A-T** : bancs d'essai à monter (pas de cas client documentable) — protocoles de test des outils à définir avec PL.
- **Offre vision/transcription** : décision reportée après validation des volumes (DataForSEO/Keyword Planner).

### Mining GSC regex (2026-04-01 → 2026-08-09) — gisement latent

| Requête | Impressions | Position | Verdict |
|---|---|---|---|
| **audit ia pme** (+ « audit ia pour pme ») | 132 + 11 | 29-31 | **Quick win n°1** : la page `/audit-ia-pme` existe, à renforcer (contenu + maillage) |
| agent ia pme (famille) | 123 + ~40 | 15-27 | Article `agent-ia-dirigeant-pme` : regagner le top 10 perdu au core update |
| automatiser les emails (famille) | ~80 | 22-46 | Article existant à repositionner |
| devis audit sécurité informatique | 27 | 26 | Rattacher au refresh millésime cout-audit |
| compte rendu / chantier / transcription / rgpd / ocr | **0** | — | **Terrain vierge** : aucune empreinte, l'article chantier est une conquête pure (pas de quick win, mais pas de cannibalisation non plus) |

## 5. Plan d'action

### Phase 0 — Hygiène technique (fait / en cours)
- [x] Correctif cache HTML `expireTime: 300` (2026-08-12)
- [ ] Purge CDN post-déploiement + vérification header `s-maxage=300`
- [ ] Screenshot GSC Statistiques d'exploration (user) → clore le volet inaccessibilité
- [ ] Audit config CDN hPanel : envisager cache CDN sur `/_next/static` + images uniquement, HTML exclu

### Phase 1 — Données (semaine 1)
- [x] Mining GSC regex (2026-08-12) → résultats en §4bis ; quick win n°1 = `/audit-ia-pme`
- [x] Cron Google Suggest déployé sur VPS IONOS (2026-08-12) : `/root/seo-suggest-watch/`, quotidien 07:30, baseline 114 requêtes ; nouveautés dans `new-queries.log`
- [ ] **Recharger les crédits DataForSEO** (compte existant, 402 depuis 2026-08-12) → re-valider volumes des cibles §3
- [ ] Déployer SerpBear sur VPS IONOS avec les ~20 requêtes cibles (après recharge DataForSEO — il s'en sert comme scraper)

### Phase 2 — Contenu « langage de l'outil » (semaines 2-6)
Articles-tests terrain (E-E-A-T réel : tester les outils, pas les lister), chacun convergeant vers l'Audit 180° :
- [ ] Cible 1 (quasi vierge, persona parfait) : « ia compte rendu chantier » / « ia suivi de chantier »
- [ ] Cible 2 (dense mais gagnable, angle PME+RGPD) : « ia compte rendu réunion »
- [ ] Cible 3 (confiance, YMYL légitime) : « ia rgpd compatible » — quels outils IA sont conformes CNIL pour une PME
- [ ] Cible 4 (BTP) : « ia devis btp » / « ia devis travaux »
- [ ] Millésime : rafraîchir `cout-audit-informatique-yvelines` avec « 2026 » dans le title + vraie mise à jour du contenu (tous les gagnants SERP affichent l'année)

### Phase 3 — Récupération core update (continu, horizon prochain update)
- [ ] Poursuivre diversification actée (cyber/NIS2, GBP, dé-géo)
- [ ] GBP : finaliser les actions manuelles en attente (catégories, zones, posts — cf. mémoire 2026-06-29)
- [ ] Monitoring GEO mensuel (script LiteLLM) sur le cluster claude/odoo
- [ ] Ne PAS produire de variantes mineures sur claude/odoo (doc officielle indélogeable en SERP classique)

### Métriques de succès
- Header cache HTML ≤ 300 s en prod ; zéro purge CDN manuelle sur 30 jours
- 4 articles « langage de l'outil » publiés et indexés d'ici fin septembre
- Retour à ≥ 100 impressions/jour GSC d'ici le prochain core update ; ≥ 3 requêtes cibles en top 10 SerpBear
