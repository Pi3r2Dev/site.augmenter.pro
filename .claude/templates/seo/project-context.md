# Contexte projet — augmenter.pro (commandes SEO/éditoriales)

Fichier de référence partagé par toutes les commandes SEO (`/seo-audit`, `/create-article`, `/create-resource`, `/modify-resource`). Centralise positionnement, audience, contraintes éditoriales et modalités opérationnelles. **À lire en premier** par toute commande qui produit du contenu pour le site.

> **Pour les commandes non-SEO** (`/debt-report`, `/security-audit`, `/doc-audit`, `/codex-execute-task`) → voir [`../shared/project-context.md`](../shared/project-context.md) qui couvre la stack, les patterns, les conventions de code et le build, sans les couches éditoriales/géographiques décrites ci-dessous.

> **Dernière mise à jour** : 2026-06-10 (recalibrage GEO — Bing/IndexNow, surface GitHub prompts, llms.txt recalibré, donnée originale + chunk auto-suffisant : cf. principe de méthode n°5 et [`checklist.md`](checklist.md) §G.4/G.5/G.8/G.9). Socle stratégique précédent : 2026-05-21 (post-brainstorm `/seo-audit` — persona unique précisé, double positionnement acté, binôme A d'offres Q2-Q3 2026 planifié). **Source de vérité des décisions stratégiques** : [`/docs/seo-audits/2026-05-21-audit-complet.md`](../../../docs/seo-audits/2026-05-21-audit-complet.md) §14 Addendum.

## Positionnement

**augmenter.pro** est le site vitrine d'un cabinet de conseil IA pour PME françaises, positionné sur une **hiérarchie à 3 tiers** (affinée 2026-05-28, validée par les données GSC — cf. [`/docs/seo-audits/2026-05-28-audit.md`](../../../docs/seo-audits/2026-05-28-audit.md)) :

1. **🥇 Tier 1 — LE moteur (cœur technique)** : **intégration IA / intégration de Claude / ERP Odoo + développement personnalisé sur ERP**. Cluster sémantique dominant : Claude Code/Cowork, Claude + Odoo, MCP, agents IA, automatisation. **Draine ~100 % des clics réels.** C'est là qu'on investit en priorité (création de contenu + page-entité `/integration-claude-erp` à créer).
2. **🥈 Tier 2 — cœur conseil (enveloppe dirigeant)** : accompagnement stratégique du dirigeant — strat **commerciale** (couverte), strat **IA** (couverte), strat **marketing** (trou éditorial — ex. « Claude Cowork community manager »), strat **RH** (trou éditorial).
3. **🥉 Tier 3 — périphérie défensive (PAS un combat SEO)** : sécurité reformulée **« audit de sécurité assisté par Claude Code / Cowork »** + ancrage local 78/95. **1 page consolidée + ancres, pas de course MSP** (on ne bat pas ACI/ExpertCyber et ce n'est pas le métier). Le 78/95 reste un **ancrage de crédibilité**, pas un axe d'investissement SEO.

> ⚠️ **Correction 2026-05-28** : le « pilier #2 audit/cyber local 78/95 » du brainstorm 2026-05-21 est **rétrogradé en Tier 3**. Raison data : le cluster cyber/audit local = milliers d'impressions / **0 clic** ; le cluster Claude/ERP = 100 % des clics. Ne **pas** créer de nouvelles pages-villes cyber ni se battre sur « audit cybersécurité Yvelines ».

**Objectif** : acquisition organique de leads qualifiés via SEO thématique (Tier 1 Claude/ERP) + advisory dirigeant (Tier 2) + **GEO** (être cité par ChatGPT/Perplexity sur Claude/Odoo — aujourd'hui 0 citation, chantier prioritaire ; levier entité = label France Num en cours).

## Stack technique

- **Next.js 16** (App Router) — `output: "standalone"`, déployé comme app Node.js sur Hostinger via GitHub
- **React 19** avec RSC
- **TypeScript 5** strict
- **Tailwind CSS 4** (OKLCH, CSS variables) + **shadcn/ui** (style new-york, lucide icons)
- **Framer Motion** (client components uniquement — `"use client"` requis)
- **GTM + GA4** via `@next/third-parties/google`, variable `NEXT_PUBLIC_GTM_ID`
- Path alias : `@/*` → `src/*`

## Stack SEO/LLM en place

- **JSON-LD** : Organization + LocalBusiness + WebSite (layout.tsx), Article (article-layout.tsx), FAQPage (approche), Service + OfferCatalog (prestations), AggregateRating + Review (testimonials)
- **llms.txt** : `public/llms.txt` pour crawlers LLM (Perplexity, ChatGPT, Claude)
- **robots.txt** + **sitemap.xml** + **news-sitemap.xml** dans `public/`
- **Events GA4** : `contact_form_submit` (formulaire), `lecture_article` (via `ArticleReadEvent` dans `ArticleLayout`)
- Meta titles optimisés avec power words et géo-ciblage **si** pertinent (voir section Audience)

## Audience & modalités géographiques

### Persona unique : dirigeant PME tech-curieux

augmenter.PRO sert **un persona principal et unique** : le **dirigeant PME tech-curieux** — gérant 10-200 salariés, francophone, qui code peut-être occasionnellement, est déjà sur Odoo ou veut migrer, formation scientifique/tech, débordé mais curieux des LLMs. Veut **comprendre** la techno (ChatGPT, Claude, Odoo, automatisation) sans jargon et sans dépendre d'un intégrateur opaque.

**Décision brainstorm 2026-05-21** : les lecteurs réels des articles top (`claude-code-prompt-architecture`, `configurer-odoo-ia-claude-cowork`) sont majoritairement ces dirigeants tech-curieux (pas des freelance devs sans pouvoir d'achat). Donc le cluster SEO tech ≈ persona commercial cible — pas de schizophrénie de positionnement.

Secteurs servis : BTP, immobilier, industrie, artisans, commerces, services. PME 10-200 salariés.

### Modalités géographiques

La zone géographique doit être nuancée selon les modalités d'intervention :

| Modalité | Zone | Implication SEO |
|---|---|---|
| **Formation en présentiel** | Yvelines (78) et Val d'Oise (95) | Focus SEO local : requêtes géolocalisées, LocalBusiness schema, pages villes si volumes (Versailles, Saint-Germain-en-Laye, Cergy-Pontoise…) |
| **Visio / appel téléphonique** | Toute la France | SEO national thématique : pages service et articles doivent cibler un marché national, **pas** uniquement 78/95 |
| **Déplacements pour gros projets** | National (selon enveloppe budgétaire) | Rassurance à l'échelle France sur les pages commerciales |

### Règles de ciblage géographique

- Le 78/95 est un **ancrage de crédibilité** (implantation, cas clients, presse locale), **pas une exclusivité commerciale**
- Ne **pas** restreindre systématiquement le copy à « PME en Yvelines » — cela exclurait le marché national adressable en visio
- Pour un contenu à intent **informational / commercial national** → formuler « PME française », « dirigeant PME »
- Pour un contenu à intent **local** (formation présentielle, intervention sur site) → géo-ciblage 78/95 explicite (villes précises)
- Les **études de cas** peuvent rester 78/95 pour l'ancrage local, mais mentionner la disponibilité nationale en conclusion
- JSON-LD `LocalBusiness` reste valable (adresse 78/95) mais `areaServed` doit inclure la France (ou Île-de-France + zones d'intervention visio)

### Anti-patterns à éviter

- ❌ « Consultant IA PME Yvelines » comme titre d'article qui adresse un besoin national
- ❌ « Nos missions en Val d'Oise » dans une page prestations cherchant à convertir toute la France
- ✅ « Consultant IA PME — accompagnement en visio partout en France, présentiel 78/95 »
- ✅ Études de cas : « Une PME immobilière de Saint-Germain-en-Laye (78) a… » (récit local) + « Disponible en visio pour toute la France » (CTA)

## Pyramide d'offres (synthèse)

### Offres en place

| Palier | Prix | Format | Zone | Cible |
|---|---|---|---|---|
| Lead magnet | 0 € | PDF / check-list / outil | National | Tout prospect |
| Audit 180° offert | 0 € | 60 min visio | **France entière** | Premier contact qualifié |
| Audit 360° IA Booster | 225 € | 1 demi-journée | Visio ou présentiel 78/95 | Dirigeant prêt à investir |
| Prestations sur mesure | sur devis | Projet dédié | National (déplacements gros projets) | Missions spécifiques |

### Offres planifiées Q2-Q3 2026 (binôme A acté brainstorm 2026-05-21)

| Palier | Prix | Format | Zone | Cible | Lancement |
|---|---|---|---|---|---|
| **Atelier Claude Code dirigeant PME** | 650 € HT | 1/2 journée, 1 participant | Présentiel 78/95 ou visio | Dirigeant tech-curieux (cluster SEO `prompt claude code`) | Sem. 24-25 (mise en vente début juillet 2026) |
| **Cohorte "IA pour dirigeants PME"** | 990 €/pers HT | 6 semaines, 8-12 personnes/promo, mix visio + 2 présentiels | Yvelines présentiel + visio France | Dirigeant PME tech-curieux, format communautaire | Sem. 26-28 (mise en vente juillet, promo #1 rentrée septembre) |

### Offres reportées (Q4 2026 ou T1 2027 selon traction du binôme A)

- Sprint Odoo + Claude (4 jours, 6 500 €) — sur site PME
- Formation OPCO 5 jours certifiée Qualiopi (3 500 €)
- Abonnement veille IA PME (150 €/mois)
- Lead magnet PDF « Grille financements IA PME 2026 »
- Calculateur ROI IA interactif

Détails + paliers potentiels supplémentaires : voir [`service-card.md`](service-card.md).

## Principes de méthode SEO/GEO (2026)

> Garde-fous de priorisation — à appliquer **avant** toute production de contenu. (Source : doctrine 2026 + diagnostics audits 2026-05.)

1. **TAM-first** : avant d'investir un cluster, vérifier le marché de recherche réel — volume **+ tendance + intent commercial**. Ne pas investir un marché en déclin : cf. Tier 3 audit local 78/95 (volumes en chute jusqu'à −84 %, milliers d'impressions / 0 clic). Le SEO n'est pas toujours le bon canal pour un sujet donné.
2. **Recherche client AVANT recherche de mots-clés** : le langage exact, les douleurs et les angles différenciants viennent des feedbacks / RDV / retours ventes réels, pas des outils KW. Les outils de mots-clés *soutiennent* la stratégie, ils ne la *dirigent* pas.
3. **Information gain** : seuil de classement **ET** de citation LLM = données originales + expérience terrain + POV tranché. L'IA a commoditisé le contenu moyen — la reformulation du top SERP ne ranke plus et n'est pas citée (cf. [`eeat-grid.md`](eeat-grid.md), critère Expertise 4-5/5).
4. **Deux voies de citation LLM** (cf. [`checklist.md`](checklist.md) §G) : (a) **retrieval** live (on-page : citation triggers, llms.txt, NAP) **ET** (b) **training data** (mentions tierces : publications, annuaires, podcasts, forums que les modèles ingèrent). La voie (b) est le **verrou actuel** (entité externe faible) — l'on-page seul ne suffit pas à être cité.
5. **Recalibrage GEO juin 2026** (sources : SE Ranking ~300k domaines, Ahrefs 15k requêtes, AirOps 548k pages, oltre.ai) — quatre ajustements opérationnels, détaillés en [`checklist.md`](checklist.md) §G :
   - **Bing / IndexNow** (§G.8) : ChatGPT Search indexe via **Bing**, pas Google. Vérifier le site dans Bing Webmaster Tools + déposer une clé IndexNow + pinger chaque URL publiée/modifiée — angle mort jusqu'ici.
   - **Surface GitHub** (§G.9) : les prompts majeurs sont publiés en **repo public miroir** (README FR/EN, lien canonique, MIT) — GitHub est une source de citation LLM forte sur les prompts, alimente la voie (b) training data.
   - **llms.txt recalibré** (§G.4) : **maintenu** (coût nul, utile aux agents IDE) mais **plus présenté comme levier de citation** — aucun effet mesuré sur les citations, ~0,1 % du trafic bots IA.
   - **Donnée originale + chunk auto-suffisant** (§G.5) : produire ≥ 1 donnée chiffrée **propre** par ressource (+30-40 % de visibilité IA, tactique la plus validée) ; chaque H2 doit être un fragment auto-suffisant (réponse dès la 1re phrase) car les moteurs RAG ne citent que ~15 % des pages récupérées, et 88 % des citations IA viennent de pages hors top 10 Google (fraîcheur + format > DA).

## Contraintes éditoriales

> 🎙️ **Voix & ton — source de vérité canonique** : [`charte-editoriale.md`](charte-editoriale.md). Les points ci-dessous en sont le **résumé opérationnel** ; en cas de doute sur la forme, c'est la charte qui fait foi. Pour relire un brouillon contre la charte → skill [`/relecture-editoriale`](../../commands/relecture-editoriale.md).

1. **Mot « gratuit » interdit** — utiliser « offert », « sans engagement », « inclus », « sans CB », « 0 € ». Exception : citer un concurrent ou critiquer l'usage du mot (cf. `ch07-audits.tsx`).
2. **Arc « douleur d'abord, solution complète ensuite »** — principe **structurel** de tout contenu (accroche ET corps), pas seulement un ton
   - **a) Ouvrir sur la douleur, frontalement.** Nommer le problème réel du dirigeant *avant* toute solution, sous plusieurs angles (coût, temps perdu, dépendance à un prestataire, frustration). Le lecteur doit penser « c'est exactement mon problème » avant qu'on lui propose quoi que ce soit. Ton provocateur, pas de SEO corporate lisse.
     - ✅ « ChatGPT dans votre PME : 3 chantiers utiles, 5 pièges qui coûtent cher »
     - ❌ « Les avantages de l'IA pour les PME »
   - **b) Puis livrer la solution *complète*, pas un teaser.** Une fois la douleur installée, donner la réponse entière et actionnable — étapes, méthode, ce qu'il faut faire ET ne pas faire. Jamais une réponse partielle qui force à « nous contacter pour la suite » : la valeur se donne, le CTA vient *en plus*, jamais *à la place*.
   - **Pourquoi** : (i) c'est ce qui convertit le dirigeant méfiant — il se sent compris avant d'être vendu ; (ii) c'est le seuil de citation LLM — une réponse complète et auto-suffisante est citée, un teaser ne l'est pas (cf. principe *Information gain* §Principes de méthode). Renforce People-first (#4).
3. **Tutoiement vs vouvoiement — règle de découplage** (actée brainstorm 2026-05-21) :
   - **Pages commerciales** (landings, meta titles/descriptions, CTAs) → **tutoiement direct** ("ton prestataire te facture", "reprends le contrôle")
   - **Récits narratifs** (home `/` et `/approche` narrative scroll, articles de fond) → **vouvoiement** maintenu (ton littéraire/journalistique)
   - Raison : le tutoiement matche le côté "coach direct" en SERP/landing, le vouvoiement préserve la posture éditoriale du récit
4. **People-first** : après lecture, le dirigeant PME doit pouvoir **agir concrètement**
5. **Pas de contenu SEO-first** : ne jamais écrire un article JUSTE parce qu'un mot-clé a du volume
6. **Périmètre élargi (post-brainstorm 2026-05-21)** : pilier #1 = Claude Code / Odoo / MCP / agents IA pour dirigeants PME (cluster gagnant SEO). Pilier #2 = audit IT / cybersécurité / NIS2 local 78/95. Hors périmètre : sujets trending IA grand public sans angle dirigeant PME.
7. **E-E-A-T élevé** (YMYL adjacent — décisions financières) : chaque page importante doit passer la grille [`eeat-grid.md`](eeat-grid.md) (objectif ≥ 15/20)

## Identité éditoriale

- **Auteur** : Pierre Legrand, consultant IA & transformation digitale
- **Publication** : contenu assisté par IA et **révisé par Pierre Legrand** — ne jamais prétendre que le contenu est 100 % humain
- **Pourquoi** : aider les PME à prendre des décisions éclairées, pas générer du trafic pour générer du trafic. Si un sujet ne sert pas l'audience cible (PME française avec douleurs IA/digital/audit), ne pas le traiter

## Conventions de code (rappels utiles)

- **Server components par défaut** — `"use client"` uniquement si nécessaire (framer-motion, state interactif)
- **Pages à `"use client"`** : split server/client (page.tsx + `<name>-client.tsx`) pour permettre `export const metadata`
- **Articles de blog** : route statique `src/app/blog/<slug>/page.tsx`, wrapper `<ArticleLayout slug="<slug>">`
- **Images** : WebP uniquement, `public/images/<catégorie>/<slug>.webp`, alt en français, composant `<Image>` de `next/image`
- **À jour à chaque ajout** : `sitemap.xml`, `news-sitemap.xml` (articles), `llms.txt`, et **`src/data/resources.ts`** — catalog partagé, ⚠️ **vraie source de vérité** des tableaux `ARTICLES` et `IDEAS` (un nouvel article/idée s'ajoute ici, avec `tldr`/`sectors`/`pains` ; `blog-view.tsx` et `idees-view.tsx` l'importent). Le hub `/augmenter-mon-entreprise` consomme le même catalog. (`src/components/sections/blog-preview.tsx` reste **legacy** post-refonte bento.)

---

**Utilisé par** (toute modification doit être validée vis-à-vis de ces 4 commandes) :
- [`/seo-audit`](../../commands/seo-audit.md) — À lire en premier (Phase 0)
- [`/create-article`](../../commands/create-article.md) — À lire en premier
- [`/create-resource`](../../commands/create-resource.md) — À lire en premier
- [`/modify-resource`](../../commands/modify-resource.md) — À lire en premier
