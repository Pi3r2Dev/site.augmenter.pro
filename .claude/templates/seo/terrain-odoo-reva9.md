# Terrain — mission ERP « Odoo Reva 9 » (gisement de preuves pour le contenu)

Pont documentaire entre **ce repo** (site vitrine) et le repo de mission **`D:\SourceFast\coolify_linux\odoo-reva9`**. Sert de **réservoir de preuves terrain** (chiffres réels, pièges payés, décisions tranchées) pour `/create-article`, `/create-resource`, `/seo-audit`, `/modify-resource`.

> **À lire après** [`project-context.md`](project-context.md) et **avant** d'écrire un contenu du cluster **Tier 1 (Claude / Odoo / ERP / MCP)** — celui qui draine ~100 % des clics réels.
>
> **Dernière synchro** : 2026-08-16 · **État du repo source** : dernière activité 2026-07-31.
> Ce fichier est une **photo**, pas un miroir : la source de vérité reste le repo de mission.

---

## 1. Pourquoi ce fichier existe

Le principe de méthode n°2 de [`project-context.md`](project-context.md) dit : *« recherche client AVANT recherche de mots-clés »*, et le n°3 : *« information gain = donnée originale + expérience terrain »*. Le repo `odoo-reva9` **est** cette recherche client — 5 mois de mission ERP facturée, tracée au quart d'heure, sur un persona qui est exactement le persona cible du site (dirigeant PME tech-curieux, déjà sur Odoo).

Sans ce pont, cette matière reste invisible depuis le site : le lien existe déjà **éditorialement** (article [`configurer-odoo-ia-claude-cowork`](../../../src/app/blog/configurer-odoo-ia-claude-cowork/page.tsx), idée n°08 du catalog, [`public/downloads/skill-odoo-configuration.md`](../../../public/downloads/skill-odoo-configuration.md)) mais **rien ne documentait** d'où venaient les faits — donc personne ne pouvait les réutiliser ni les vérifier.

**Ce que ce fichier n'est pas** : une autorisation de publier. Voir §2.

---

## 2. Règles de confidentialité — à trancher AVANT toute réutilisation

Le repo de mission contient des données client, comptables et M&A. Trois niveaux, sans zone grise :

| Niveau | Ce que ça couvre | Règle |
|---|---|---|
| 🟢 **Publiable anonymisé** | Mécanique technique Odoo/Claude, pièges de plateforme, méthodes, volumétries non identifiantes (nb de produits, de catégories, de contacts), durées de chantier | Publiable **sans nommer le client** ni montrer son instance |
| 🟠 **Accord écrit requis** | Nom du client, secteur + ville simultanés, captures de son instance, chiffres métier (CA, marges, tarifs, noms de ses fournisseurs et clients) | Rien ne part avant un **accord écrit** du dirigeant. Pas d'accord ⇒ on retombe en 🟢 anonymisé |
| 🔴 **Jamais** | Volet **M&A / reprise** (`docs/reva9/valorisation-reva9-v1.md`, SIREN, comptes, noms de dirigeants, montages), grands livres `0001_GRAND_LIVRE_*.xlsx`, données nominatives clients/fournisseurs, **prix de la prestation augmenter.pro** (devis #002/#003), prospects en cours (`docs/prospects/`) | Ne jamais publier, ne jamais citer, même indirectement, même « anonymisé » |

**Forme d'anonymisation recommandée** (à réutiliser telle quelle) :
> « un distributeur-réparateur de matériel d'espaces verts, une poignée de salariés, ~1 360 références en ligne »

⚠️ **Piège géo à lever avant tout usage local** : le `CLAUDE.md` du repo de mission situe le client en *Languedoc-Roussillon*, la fiche mémoire projet le situe à **Jouy-le-Moutier (95)**. Les deux ne peuvent pas être vrais. **Vérifier auprès du client** avant d'utiliser ce cas comme ancrage 78/95 — publier une localisation fausse coûterait plus cher que le bénéfice SEO local.

**Règle de prudence supplémentaire** : le même client est cible d'un mandat de reprise (niveau 🔴). Un article trop précis (secteur + taille + ville + calendrier) le rend identifiable, donc rend le volet M&A déductible. **Ne jamais combiner secteur, effectif et localisation** dans un même contenu public.

---

## 3. Carte du repo source — où trouver quoi

Racine : `D:\SourceFast\coolify_linux\odoo-reva9`. Point d'entrée : `ETAT.md` (aiguilleur), puis `CHANGELOG.md` (journal chronologique + temps passés — **la mine principale**).

| Chemin (relatif au repo de mission) | Ce qu'on y trouve | Niveau |
|---|---|---|
| `CHANGELOG.md` | ~90 entrées datées : tâche, contexte métier, ce qui a été fait, décisions, **temps passé** | 🟢 (chiffres) / 🟠 (détails client) |
| `ETAT.md` | État courant des chantiers, priorités | 🟢 |
| `docs/reference/odoo/odoo-saas-customisation.md` | Contraintes Odoo Online SaaS : ce qui est interdit / autorisé, import de module data-only | 🟢 **le plus réutilisable** |
| `docs/reference/augmenter-x-odoo/playwright-odoo-automation.md` | Piloter Odoo depuis Claude Code (RPC `call_kw`, introspection OWL, limites) | 🟢 **cœur Tier 1** |
| `docs/reference/augmenter-x-odoo/odoo-rpc-cookbook.md` | Recettes RPC prêtes à l'emploi | 🟢 |
| `docs/reference/odoo/export-fec-odoo19.md` | Procédure d'export FEC + piège de la date de verrouillage | 🟢 |
| `docs/reference/odoo/dashboard-pilotage.md` | Construire un tableau de bord dirigeant en ~15 min de clics | 🟢 (sauf les valeurs de CA affichées → 🟠) |
| `docs/decisions/ADR-001-paniers-achat-fournisseur.md` | ADR complet : 3 options, arbitrage, risques, plan — **modèle de raisonnement à montrer** | 🟢 anonymisé |
| `docs/reva9/suivis/suivi-compta-filaos.md` | Cycle FEC mensuel ERP → logiciel du comptable, pièges, réconciliation | 🟢 méthode / 🟠 montants |
| `docs/reva9/suivis/suivi-vente-au-bidon.md` | Le cas UoM : 4 stratégies, dont une qui corrompt les historiques | 🟢 **le meilleur sujet d'article** |
| `docs/reva9/suivis/suivi-segmentation-contacts.md` | Classer 3 000 contacts par scoring multi-signaux (et pourquoi pas par LLM) | 🟢 |
| `docs/reva9/suivis/suivi-tarification-promotions.md` | Politique de prix par catégorie, pricelists, Discount & Loyalty | 🟢 méthode / 🟠 taux de marge |
| `docs/reva9/suivis/suivi-transporteur-livraison.md` | Connecteurs transporteurs Odoo : le piège français | 🟢 |
| `docs/reports/audit-flux-reception-fournisseur.md` | Diagnostic de flux + 3 modèles natifs comparés | 🟢 anonymisé |
| `docs/reva9/comms/procedure-*.md` | Procédures rédigées **pour l'équipe du client** — modèles de « livrable d'autonomie » | 🟠 |
| `scripts/phase2_enrichment/enrich-products-v2.py` | Enrichissement LLM de 1 360 fiches + **garde-fou anti-hallucination par tokens** | 🟢 |
| `scripts/utils/classify-contacts.py` | Scoring multi-signaux (nom, email, SIRET, TVA) | 🟢 |
| `modules/reva9_stock_line_info/` | Module data-only JS/XML/SCSS qui patche un widget OWL natif | 🟢 |
| `docs/reva9/devis/`, `docs/reva9/valorisation-reva9-v1.md`, `docs/prospects/`, `0001_GRAND_LIVRE_*.xlsx`, `data/` | Facturation, M&A, prospects, données brutes | 🔴 |

---

## 4. Registre de preuves — chiffres vérifiables, prêts à citer

Chaque ligne est une **donnée originale** au sens du principe GEO n°5 (« ≥ 1 donnée chiffrée propre par ressource, +30-40 % de visibilité IA »). Toutes sont 🟢 **si** publiées sans nommer le client.

### Volumétrie & état réel d'un ERP de PME

| Fait | Valeur | Source |
|---|---|---|
| Catalogue produits total | **367 410** produits, 333 584 lignes fournisseur | `ADR-001` (diag RPC 2026-06-04) |
| Produits réellement en stock | **~2 158** | `docs/reports/audit-flux-reception-fournisseur.md` |
| Produits publiés sur le site | **1 360** | `CLAUDE.md` (mission), phase 2 |
| Catégories avant / après | **370 chaotiques → 15 familles** (max 3 niveaux) | phase 1 |
| Produits orphelins reclassés | **3 099** + **4 710** sans catégorie | `scripts/phase1_categories/` |
| Emplacements de stockage créés / utilisés | **7 346 créés, 0 quant dedans** (tout en racine) | audit réception |
| Emplacement géré « en texte » à la place | **1 604** produits | idem |
| Fournisseurs référencés / avec franco de port renseigné | **98 / 14** (mini de commande : 3/98) | `ADR-001` |
| Contacts à segmenter | **3 105** total → **2 879** dans le périmètre | `suivi-segmentation-contacts.md` |
| Produits sans coût d'achat (`standard_price=0`) | **1 165** hors services | `suivi-tarification-promotions.md` |
| Commandes confirmées non livrées / devis en cours | **1 204 / 481** | audit réception |

> **POV que ces chiffres autorisent** : un ERP de PME ne souffre pas d'un manque de fonctionnalités, il souffre de **données non tenues**. 7 346 emplacements pour 0 stock rangé dedans, 14 fournisseurs sur 98 avec un franco renseigné : aucun agent IA ne rattrape ça. C'est un angle tranché, rare, et invérifiable ailleurs.

### Comptabilité — remplacer une double saisie

| Fait | Valeur | Source |
|---|---|---|
| Cycle FEC mensuel en production | **juin + juillet 2026** importés et validés chez le comptable | `suivi-compta-filaos.md` |
| Volume mensuel traité | **242** puis **210 écritures**, 100 % des tiers résolus | idem |
| Comptes tiers créés automatiquement à l'import | **54** (juin) + **45** (juillet) | idem |
| Taux de réconciliation ventes (6 mois) | **98,6 %** (1 061 factures sur 1 102) | `RAPPORT-RECONCILIATION-VENTES-jan-juin.md` |
| Écart résiduel | **1,4 %**, concentré sur un seul mois | idem |
| Entités seedées avec un code comptable | **323**, 0 erreur, 0 écrasement, réversible | idem |

### Pièges techniques payés (chacun = un H2 auto-suffisant)

| Piège | Conséquence réelle |
|---|---|
| **UoM au litre sur un produit vendu au bidon** | Le client paie **1,83 €** au lieu de **45,75 €** sur la boutique. 4 stratégies possibles, **une seule sans casse** : changer l'UoM d'un produit existant **corrompt les historiques** (devis + commandes confirmées) |
| **Export FEC « non-test »** | **Verrouille la comptabilité** jusqu'à la date de fin. Il faut cocher « Fichier de test » pour un export de travail |
| **Fin de ligne LF au lieu de CRLF** | Le logiciel comptable lit tout le fichier « sur une seule ligne » |
| **Code comptable posé sur un contact-enfant** | La ligne client (411) utilise l'entité parente : 11 codes à corriger |
| **Odoo Online SaaS** | **Aucun module Python custom** installable. Restent : Studio, server actions sandbox, modules data-only (JS/XML/SCSS), RPC |
| **ZIP créé sous Windows** | `Compress-Archive` met des backslashes → l'import de module échoue. Créer le ZIP en Python |
| **Connecteurs transporteurs Odoo** | **Aucun connecteur natif** pour Colissimo, Chronopost, La Poste, DPD, GLS — les dominants du marché français. Les entrées « (ancien)/(Legacy) » sont d'anciennes API |
| **Champs calculés non stockés** | Non filtrables dans les domaines de recherche : ils cassent les filtres de vue |
| **Kanban Odoo 19** | `kanban-box` supprimé → `<t t-name="card">` obligatoire |

### Méthode IA — ce qui a marché, ce qui a été écarté

| Constat | Détail |
|---|---|
| **Garde-fou anti-hallucination par tokens** | Enrichissement LLM de 1 360 fiches : les tokens techniques du nom source sont extraits automatiquement ; si le nom généré en perd un, il est **rejeté** et le nom d'origine conservé |
| **Le LLM n'a pas gagné partout** | Pour classer 3 000 contacts, la solution retenue est un **scoring multi-signaux déterministe** (nom, forme juridique, ~700 prénoms, toponymes, domaine email, SIRET, TVA) + revue manuelle des incertains. Aucune classification « par défaut » : sans signal net → INCONNU |
| **Le champ `is_company` est pollué** | Personnes physiques à `true`, sociétés à `false` → signal marginalisé. Illustration : *les données de votre ERP mentent, il faut les auditer avant de les automatiser* |
| **Principe client verrouillé** | « Données manquantes → **on fait remplir l'équipe, on ne reconstruit pas** ». Anti-pattern inverse : deviner à la place du métier |
| **Réversibilité systématique** | Chaque chantier livre un `rollback()` : suppression des modèles Studio = retour arrière propre, rien de natif modifié |
| **Pilotage par RPC + navigateur** | Tout le backend est piloté via `/web/dataset/call_kw` depuis Claude Code + Playwright : lecture, création de champs, modification de vues, introspection des widgets OWL |

### Économie réelle de la mission

| Fait | Valeur | Source |
|---|---|---|
| Durée de la mission tracée | **~5 mois** (mars → juillet 2026), toujours active | `CHANGELOG.md` |
| Granularité des interventions | **15 min à 2 h 30** par ticket, ~90 entrées datées | idem |
| Chantier le plus lourd | Board d'achat : **~8 h 30 cumulées** (conception + ADR + 5 phases + V2) | `suivi-paniers-achat.md` |
| Chantier compta | **12 h** pour remplacer une double saisie par un cycle mensuel | `suivi-compta-filaos.md` |

> ⚠️ **Ces durées sont 🟢 en tant que durées, 🔴 dès qu'on les multiplie par un taux journalier.** Ne jamais reconstituer le montant de la prestation dans un contenu public.

---

## 5. Angles éditoriaux adossés à ce terrain

Priorisés Tier 1 d'abord (cluster Claude/Odoo/ERP = 100 % des clics). Chacun respecte l'arc **douleur d'abord, solution complète ensuite** et apporte au moins une donnée du §4.

| # | Angle | Douleur d'ouverture | Preuve terrain | Cluster / `pains` |
|---|---|---|---|---|
| 1 | **Odoo Online : ce que vous ne pourrez jamais y installer (et les 4 contournements qui marchent)** | Tu as payé un abonnement SaaS et ton intégrateur te dit « impossible » | Aucun module Python ; Studio + server actions + data-only + RPC ; un module de calcul de livraison refusé par la plateforme | Tier 1 · `prestataire` |
| 2 | **Votre boutique vend 1,83 € ce qui coûte 45,75 € : le piège de l'unité de mesure** | Une commande web encaissée à 4 % du prix réel | 4 stratégies comparées, une corrompt les historiques ; obligation légale d'affichage du prix au litre | Tier 1 · `repetitif` |
| 3 | **Supprimer la double saisie comptable : le FEC mensuel, de l'ERP au cabinet** | Ta comptable saisit deux fois les mêmes factures | 242 puis 210 écritures/mois, 98,6 % de réconciliation, 4 pièges de format | Tier 2 · `repetitif` |
| 4 | **Piloter votre ERP au clavier de l'IA : RPC, Playwright et Claude Code** | Chaque micro-modif passe par un ticket chez l'intégrateur | Recettes RPC réelles, introspection de widgets, limites honnêtes (upload de fichiers impossible) | Tier 1 · `prestataire` |
| 5 | **Non, l'IA ne va pas classer vos 3 000 clients toute seule** | On te vend « l'IA nettoie tes données » | Scoring déterministe retenu **contre** le LLM, `is_company` pollué, principe « sans signal net → INCONNU » | Tier 1 · `demarrage` |
| 6 | **Enrichir 1 360 fiches produit avec un LLM sans qu'il invente** | Des descriptions générées qui perdent la référence technique | Validation par tokens obligatoires, rejet automatique, nom d'origine conservé | Tier 1 · `repetitif` |
| 7 | **Le franco de port que votre ERP ignore** | Tu paies le port parce que personne ne voit le seuil | 14 fournisseurs sur 98 avec un franco renseigné ; besoin net = confirmé − stock − entrant | Tier 2 · `marges` |
| 8 | **Livrer en France avec Odoo : la liste des connecteurs est un piège** | Tu cherches Colissimo dans la liste, il n'y est pas | Aucun connecteur natif FR ; agrégateur recommandé, alternative points relais | Tier 1 · `demarrage` |
| 9 | **7 346 emplacements de stock, 0 article rangé dedans** | Ton ERP est « configuré » mais personne ne l'utilise | Emplacements vides + 1 604 casiers gérés en texte + 1 165 produits sans coût d'achat | Tier 2 · `demarrage` |
| 10 | **Comment on décide dans un ERP : un ADR, 3 options, 1 arbitrage** | Tu subis les choix techniques sans jamais voir le raisonnement | ADR-001 publié en version anonymisée : options A/B/C, critère décisif, risques assumés | Tier 1 · `prestataire` |

**Avant d'en lancer un** : passer par `/create-article`, qui relira [`project-context.md`](project-context.md), la [charte éditoriale](charte-editoriale.md) et la [grille E-E-A-T](eeat-grid.md). Le terrain fournit le critère **Experience** (« ≥ 1 exemple terrain réel ») — c'est précisément ce qui manquait aux articles produits sans mission derrière.

---

## 6. Ce que ce terrain corrige dans le discours actuel du site

1. **L'article `configurer-odoo-ia-claude-cowork` (« 4 jours au lieu de 3 500 € ») est incomplet, pas faux.** La reconfiguration initiale tient bien en quelques jours ; le repo montre que **la vie d'après** est faite de ~90 interventions de 15 min à 2 h 30 sur 5 mois. Un update honnête (« ce que 4 jours ne couvrent pas ») renforce l'E-E-A-T au lieu de l'entamer — et donne un second contenu.
2. **Le persona est validé par les faits.** Le dirigeant tranche lui-même les arbitrages métier (jauge de franco, définition du besoin net, périmètre comptable) et réclame des **procédures écrites pour son équipe**. Le « dirigeant PME tech-curieux » n'est pas une hypothèse marketing, c'est le comportement observé.
3. **Le vrai différenciateur n'est pas « on connaît Odoo ».** C'est : réversibilité systématique (`rollback()`), refus de deviner à la place du métier, traçabilité au quart d'heure. Trois promesses vérifiables — donc citables — que les concurrents ne formulent pas.
4. **L'ancrage local reste à trancher** avant tout usage (cf. contradiction géo §2). En attendant, traiter ce cas comme **national**.

---

## 7. Protocole d'usage et de rafraîchissement

**Utiliser ce fichier** :
1. Lire le §2 (confidentialité) — non négociable, avant même de choisir l'angle.
2. Prendre l'angle dans le §5, la donnée chiffrée dans le §4.
3. **Rouvrir le fichier source** cité avant de publier le chiffre : ce document est daté, la mission continue.
4. Anonymiser avec la formule du §2. Ne jamais croiser secteur + effectif + ville.

**Rafraîchir ce fichier** — quand l'un de ces événements survient :
- un chantier de la mission passe en « livré » avec des chiffres nouveaux ;
- un accord client (ou un refus) fait bouger un niveau de confidentialité ;
- la contradiction géographique du §2 est levée ;
- un angle du §5 est publié → le marquer ici avec le slug de l'article, pour ne pas le retraiter.

Relire alors, dans le repo de mission : `ETAT.md`, puis la section « En cours » de `CHANGELOG.md`, puis les `docs/reva9/suivis/` modifiés depuis la date de synchro en tête de fichier.

**Angles déjà publiés** : *(aucun à ce jour — l'article `configurer-odoo-ia-claude-cowork` précède ce registre et n'est pas sourcé sur lui)*

---

**Voir aussi** : [`project-context.md`](project-context.md) (positionnement, tiers, principes) · [`charte-editoriale.md`](charte-editoriale.md) (voix) · [`eeat-grid.md`](eeat-grid.md) (critère Experience) · [`checklist.md`](checklist.md) §G.5 (donnée originale + chunk auto-suffisant) · catalog [`src/data/resources.ts`](../../../src/data/resources.ts) (où atterrit un article).
