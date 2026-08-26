# Plan — Refonte home : fusion sections 1+2, outil de capacités, retrait du lexique « offert »

Date : 2026-08-26
Branche : `feat/refonte-home-outil`
Statut : lots 1 à 4 livrés — reste le lot 5 (page `/ia-souveraine-pme`)

## Objectif

Fusionner les deux premières sections de `/`, remplacer la section 02 (approche & méthode) par un
**outil de navigation dans les capacités** (métier × logiciel), porter le message de **souveraineté
des données**, et sortir tout le champ lexical du cadeau (« offert ») du site.

Objectif business : l'outil qualifie et pousse vers le devis. Cf. [playbook acquisition](../playbooks/acquisition-devis.md).

## Décisions actées (discussion du 2026-08-26)

| Sujet | Décision |
|---|---|
| Section 1 | Fusion hero + section 02. `h1` « Votre PME, augmentée par l'IA. » **conservé** (LCP + mot-clé) ; le texte « équilibre humain / outils / habitudes » descend en **lede** |
| 4 cartes lava lamp | Gardées, **texte stat retiré**. Muettes + cliquables desktop (libellé au survol), forme compacte 2×2 sur mobile (~72 px, mot visible + chevron) |
| Mots des 4 cartes | `IA souveraines` · `Intégrations profondes` · `Développement sur mesure` · `Formation continue` |
| Carte Odoo | Gardée avec son badge −3 500 €, **devient cliquable** → `/blog/configurer-odoo-ia-claude-cowork` |
| Avis hero | **Maud J.** remplace Nathalie R. |
| Avis Arnaud L. | 7ᵉ carte de `PrestationsTypes`, adjacente à « Catalogue & commandes » (dont il est la preuve ; seule preuve qui nomme Jouy-le-Moutier) |
| Nathalie R. | Sort du hero. Preuve « 2 h → 15 min » conservée dans `PrestationsTypes` + `REVIEWS` du JSON-LD racine |
| Section 2 | Outil « ce que l'IA sait faire chez vous ». **Fond sombre** (rythme du scroll), **vouvoiement**, **matrice curée à la main** (pas de génératif), renvoi secondaire vers `/augmenter-mon-entreprise` |
| Souveraineté | **Deux régimes assumés** (chez nous / chez l'éditeur), ancrés sur l'infra réelle |
| Section 04 | Les 4 étapes de méthode reviennent en **frise compacte** dans « Quel est votre prochain niveau ? », avant les deux plans. Libellés verbaux : `On regarde` / `On tranche` / `On construit` / `On ajuste` |
| Audit 180° | Non facturé **sous 3 conditions** : PME ou indépendant · sujet précis · intention d'agir |
| Lexique | « offert » **banni partout**, comme « gratuit ». Registre : politique commerciale |

Numérotation inchangée : `02` outil, `03` prestations types, `04` passons à l'action.

## Lexique de remplacement (lot 1)

Phrase canonique : **« On ne facture pas le premier rendez-vous. »**

| Contexte | Avant | Après |
|---|---|---|
| Badge / pill | `Offert` | `Sur RDV` |
| Sous-ligne | Offert · sans engagement | Sur rendez-vous · sans engagement |
| Gros chiffre carte plan | `Offert` | `60 min` (la durée, pas le prix) |
| Phrase CTA | Audit 180° offert pour les PME… | On ne facture pas le premier rendez-vous. Aux PME et indépendants qui ont un sujet précis. |
| FAQ `/approche` | Le diagnostic est-il vraiment offert ? | Le premier rendez-vous est-il payant ? |
| Meta description | 60 min offerts, sans CB | premier RDV non facturé, sans CB |
| Description du marché (article prix) | « diagnostic offert » | « diagnostic à 0 € » (factuel, pas promo) |

Interdits élargis : `gratuit`, `offert`, `sans frais`, `cadeau`, `bonus`.

### Pièges

1. [prestations-types.tsx:78](../../src/components/sections/prestations-types.tsx) — « seuil de **port offert** » = franco de port, contenu métier. **Ne pas toucher** (ou « franco de port »).
2. `title`/`description` des 3 landings d'acquisition changent → variation de CTR possible. Arbitrage assumé par le fondateur.
3. FAQ `/approche` alimente le `FAQPage` JSON-LD : **reformuler, jamais supprimer** l'entrée.
4. `price: "0"` reste **vrai** (non facturé sous conditions) → garder, compléter par `eligibleCustomerType` (`http://purl.org/goodrelations/v1#Business`) + `description` d'éligibilité. 3 fichiers : `/approche`, `/audit-ia-pme`, `/audit-informatique-yvelines`.
5. `public/llms-full.txt` n'a **aucun script de génération** → 29 occurrences à éditer à la main (+ 9 dans `llms.txt`).

## Message souveraineté — ancré sur l'infra réelle

Ce qui tourne effectivement (cf. [unified-infrastructure/CLAUDE.md](../../../unified-infrastructure/CLAUDE.md)) :
Qwen 3.5 9B chat/vision (llama.cpp, RTX 3070) · embeddings gte-Qwen2 1536d · reranker BGE + Whisper ·
ComfyUI sur 2× RTX 3080 · routage LiteLLM avec bascule de secours Groq / OpenRouter.

⚠️ **Ne jamais écrire le nom exact des modèles ni le mot « abliterated »** sur le site (un dirigeant qui
cherche le terme tombe sur « modèle sans garde-fous »). Rester sur « modèles ouverts ».
⚠️ **Les fallbacks cloud existent** → « rien ne sort jamais de nos serveurs » serait faux. D'où les deux régimes.

Texte de la colonne droite de l'outil :

> **Où vivent vos données** — Deux régimes, et vous choisissez lequel.
> **Chez nous.** Modèles ouverts, sur des serveurs que nous administrons. Configuration par défaut — c'est aussi celle qui fait tourner nos propres outils tous les jours.
> **Chez l'éditeur.** Quand vous voulez la puissance d'un Claude ou équivalent, on le branche — et on vous dit ce qui transite, ce qui est conservé, et ce qui n'entraîne aucun modèle.
> Dans les deux cas, la question est posée avant la première ligne de code, pas après.

## Conditions du premier rendez-vous

1. Vous dirigez une PME ou vous êtes indépendant
2. Vous avez un sujet précis (une tâche qui coince, un logiciel qui bloque) — pas une exploration générale
3. Vous comptez faire quelque chose de la réponse

FAQ `/approche` reformulée (actif PAA) — conserver la phrase finale, meilleur signal E-E-A-T de la page :
« Si votre sujet sort de ce qu'on sait faire, on vous le dit dans les dix premières minutes. »

## Lots

| Lot | Contenu | Dépend de |
|---|---|---|
| ~~**1**~~ | ✅ Retrait « offert » partout : composants, pages, 15 articles, FAQ, JSON-LD, `llms.txt`, `llms-full.txt` | — |
| ~~**2**~~ | ✅ Section 1 fusionnée : lede, 4 tuiles cliquables (+ variante mobile 2×2), Odoo cliquable, Maud | — |
| ~~**3**~~ | ✅ Section 2 : `CapabilityExplorer` + 17 capacités curées. ⚠️ **Contenu à relire par le fondateur** (preuves chiffrées, verdicts) | — |
| ~~**4**~~ | ✅ Frise 4 étapes en section 04 + citation Arnaud en `PrestationsTypes` | — |
| **5** | Page `/ia-souveraine-pme` — débloque la destination de la 1ʳᵉ carte | optionnel |

En attendant le lot 5, la carte `IA souveraines` pointe vers `/audit-ia-pme` (page qui traite le plus
la souveraineté : « Où partent tes données ? », shadow AI, AI Act).

## Structure de l'outil (lot 3)

Deux axes, résultat visible dès le premier clic, jamais d'écran vide (relâchement progressif comme
`/augmenter-mon-entreprise`). Pas d'étapes bloquantes — le visiteur est en découverte, pas en demande.

```
Votre métier    BTP & rénovation · Négoce & distribution · Industrie · Commerce & service local · Conseil & services
Vos outils      Odoo · Sage/EBP/Ciel · Logiciel métier · Excel & Drive · Rien de structuré

┌─ verdicts ──────────────────────────┬─ Où vivent vos données ─┐
│ ● Déjà en production chez un client │  (deux régimes)         │
│ ● Faisable, à cadrer      [NOUVEAU] │                         │
│ ● Pas encore honnête                │                         │
└─────────────────────────────────────┴─────────────────────────┘
        [ Vérifier mon cas — 60 min ]  → /contact pré-rempli (via src/lib/quote-prefill.ts)
```

Les trois verdicts, dont « pas encore honnête », sont le principal signal E-E-A-T : personne n'affiche
ce que l'IA ne sait pas faire. Le badge daté répond au besoin « naviguer sur les récentes évolutions ».

Matière première : les 6 entrées de [prestations-types.tsx](../../src/components/sections/prestations-types.tsx)
ont déjà `pain` / `delivery` / `proof` / `sectors` — il manque l'axe outil.
