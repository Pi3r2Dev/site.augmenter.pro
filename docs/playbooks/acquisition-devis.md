# Playbook — Acquisition de demandes de devis

> Objectif business n°1 du site. Tout chantier contenu/SEO s'arbitre sur « est-ce que
> ça produit une demande de devis », pas sur le trafic ni les positions.
> Dernière mise à jour : 2026-08-24.

## Le constat qui fixe l'ordre des priorités

Mesuré sur Google Search Console, 6 mois glissants (2026-02-24 → 2026-08-24) :

| Fait | Chiffre |
|------|---------|
| Demandes de devis reçues | **3-4/mois**, quasi toutes par **bouche-à-oreille** |
| Trafic de marque | **15 impressions / 0 clic** — « pierre legrand » en position **68** |
| Requêtes prix/tarif/devis | **843 impressions / 0 clic** (positions 18-35) |
| Requêtes prestataire/service hors tech | **5 622 impressions / 1 clic** |
| Cluster Claude/Odoo/MCP | 2 205 imp / **82 clics** (CTR 3,72 %) |
| Cluster audit local 78/95 | 3 014 imp / **1 clic** |
| Concentration | 2 articles = **471 clics sur ~550 (86 %)** |

**Lecture.** Le canal qui produit les devis (recommandation) et le site ne se croisent
jamais : personne ne cherche la marque. Le seul actif SEO (Claude Code / Odoo) attire
des **praticiens**, public qui ne demande pas de devis d'audit. Et la demande
commerciale réelle existe (843 imp) mais est captée à zéro, faute de rang.

**Conséquence.** Le levier n'est pas d'aller chercher du trafic froid : c'est de rendre
public un actif qui existe déjà — des clients satisfaits, invisibles.

## Ordre de rendement

| # | Levier | Délai | Qui |
|---|--------|-------|-----|
| 1 | Canal de réception fonctionnel | jours | code — **fait** (cf. CLAUDE.md § Acquisition) |
| 2 | Avis Google (bouche-à-oreille → Local Pack) | semaines | manuel |
| 3 | Catégories + zones GBP | 1 h | manuel |
| 4 | Trouvabilité sur le nom propre (SEO d'entité) | semaines | mixte |
| 5 | Google Ads local | jours à lancer | budget |
| 6 | SEO organique | **6-12 mois** | contenu |

⚠ Ne pas promettre de devis via le SEO organique à court terme : positions
commerciales entre 20 et 90, `/audit-informatique-yvelines` à 75,8 en août,
profil de backlinks vide (aucune citation tierce détectable).

## Levier 2 — Demander les avis Google

**Lien d'avis 1-clic : <https://g.page/r/CWg20PXid2i2EBM/review>**
(déjà utilisé par le bouton « Avis Google » du footer, event GTM `gbp_click`)

Envoyer **au pic de satisfaction** — juste après un résultat livré et constaté,
jamais à la facturation.

```
Objet : Un service à te demander (2 minutes)

Salut [Prénom],

[Rappel du résultat concret : « Depuis qu'on a branché l'automatisation,
tes devis passent de 2 h à 15 min. »]

J'ai un service à te demander. Je bosse presque exclusivement par
recommandation — ce qui marche bien, mais qui laisse zéro trace publique.
Quand un dirigeant cherche quelqu'un dans la région, il ne trouve rien
sur moi.

Est-ce que tu accepterais de laisser un avis Google ? C'est le lien direct,
ça prend deux minutes :
https://g.page/r/CWg20PXid2i2EBM/review

Si tu ne sais pas quoi écrire, le plus utile pour quelqu'un qui hésite,
c'est :
- où tu en étais avant,
- ce qu'on a fait concrètement,
- ce que ça a changé, avec un chiffre si tu en as un.

Pas besoin d'en faire des tonnes, trois lignes honnêtes valent mieux
qu'un paragraphe.

Merci,
Pierre
```

Relance **unique**, J+7, jamais deux :

```
Salut [Prénom], je remonte juste mon message au cas où il serait passé
à la trappe. Si tu n'as pas le temps ou pas envie, aucun souci, dis-le moi
et je n'en reparle plus.
https://g.page/r/CWg20PXid2i2EBM/review
```

**Pourquoi ces deux passages précis :**

- *Quoi écrire* (les 3 angles) : la plupart des demandes échouent parce que le client
  est d'accord, ouvre le lien, bloque sur la page blanche et ferme.
- *Porte de sortie explicite* dans la relance : retire la pression sociale qui pousse
  à ignorer le message → augmente le taux de réponse au lieu de le baisser.

**Projection** : 3-4 clients/mois × ~50 % → ~15 avis récents en 6 mois, contre 3
datant tous d'avril aujourd'hui. La **fraîcheur** compte autant que le nombre.

⚠ Les 5 avis du tableau `REVIEWS` de `src/app/layout.tsx` **ne produisent aucune
étoile en SERP** : depuis 09/2019 Google ignore les avis auto-déclarés
(*self-serving*) sur `LocalBusiness`/`Organization`. Les étoiles viennent du GBP,
donc des clients.

## Levier 3 — Fiche Google Business Profile

Entité `/g/11n44vnyqf` · cid `13143887329151170152` · compte `legrand.work@gmail.com`
Service-Area Business, base Jouy-le-Moutier 95280.

**Fait (2026-06-29)** : téléphone `06 79 11 97 74`, 5 posts Google.

**Reste — manuel obligatoire** : l'autocomplétion catégories/zones ne se déclenche pas
en automatisation Playwright, il faut sélectionner dans la liste déroulante sinon la
valeur ressort « non reconnue ».

Par impact décroissant sur les devis :

1. **Catégorie principale** → `Service de conseil en informatique`.
   Décide sur quelles requêtes la fiche peut apparaître dans le Local Pack.
   Actuellement « Assistance et services informatiques » = rangé avec le dépannage.
   Supprimer les parasites non reconnues : « Club privé », « Club d'informatique »,
   « odoo », « erp ».
2. **Zones desservies** → 78 / 95 / 92 / 75 + communes.
3. **Catégories secondaires** → Organisme de formation professionnelle ·
   Conseiller en gestion d'entreprise · Assistance et services informatiques.
4. **Services + description** (texte canonique validé 2026-06-29).
5. **Horaires** — fiche ferme 17 h, site annonce 19 h : incohérence NAP à aligner.
6. **Photos** — les dernières datent de 60 j.

Les points 1 et 2 sont structurels : sans eux, les avis collectés font monter une
fiche qui n'apparaît pas sur les bonnes requêtes.

## Levier 4 — Trouvabilité sur le nom

« pierre legrand » = position **68**, nom très commun (homonymes notoires).
Un prospect à qui on recommande « Pierre Legrand » ne le trouve pas → fuite directe
du canal qui produit les devis. Chantier d'**entité**, pas de mots-clés : page auteur,
cohérence des profils, `sameAs`, GBP, France Num quand la fiche sera validée.

## À vérifier périodiquement

- Écart entre les événements GA4 `contact_form_submit` et les demandes réellement
  reçues → mesure les devis perdus en bas de funnel.
- Nombre et fraîcheur des avis GBP.
- `RESEND_API_KEY` / `QUOTE_NOTIFY_EMAIL` / `QUOTE_FROM_EMAIL` bien déclarées côté
  Hostinger — sinon la capture tourne en silence.
