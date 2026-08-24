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
| 1 | Canal de réception fonctionnel | jours | ✅ **fait et vérifié en prod le 2026-08-24** |
| 2 | Avis Google (bouche-à-oreille → Local Pack) | semaines | manuel |
| 3 | Catégories + zones GBP | 1 h | manuel |
| 4 | Trouvabilité sur le nom propre (SEO d'entité) | semaines | mixte |
| 5 | Google Ads local | jours à lancer | budget |
| 6 | SEO organique | **6-12 mois** | contenu |

⚠ Ne pas promettre de devis via le SEO organique à court terme : positions
commerciales entre 20 et 90, `/audit-informatique-yvelines` à 75,8 en août,
profil de backlinks vide (aucune citation tierce détectable).

## Levier 2 — Demander les avis Google

> ⬅ **Chantier courant.** Le levier 1 est clos ; c'est ici que se joue la suite.

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

**État constaté le 2026-08-24** (fiche ouverte via Playwright — audit de juin périmé,
l'essentiel du chantier catégories a été fait entre-temps) :

✅ Catégorie principale **« Consultant informatique »** · parasites supprimées
(« Club privé », « odoo », « erp ») · description canonique en place · tél +
WhatsApp · **horaires alignés (ferme 19 h)** · adresse masquée · rendez-vous en ligne.
Secondaires actuelles : Consultant en marketing · Consultant en ingénierie ·
Service de sécurité informatique · Assistance et services informatiques.
Zones : Paris · Yvelines · Val-d'Oise. **Avis : 3, tous d'avril.**

**Manques réels restants, par impact décroissant :**

✅ **Services — traité le 2026-08-24.** Le panneau est sous le bouton « **Éditer
services** », distinct de « Modifier les infos » (et sans rapport avec « Fournis par
l'établissement », qui n'est que la section des *attributs* type « géré par une
femme », sans effet de matching). La catégorie principale n'avait qu'un service
générique ; **8 services ont été créés** sous `Consultant informatique` :

Audit 360° IA · Audit 180° infrastructure · Configuration et paramétrage Odoo ·
Migration et transfert de logiciel ERP · Récupération de données logiciel de
comptabilité · Atelier Claude Cowork pour dirigeant · Automatisation de tâches avec
l'IA · Formation IA pour dirigeant et équipe.

**Principe de nommage retenu** (consigne user) : libeller en **langage de la demande**
— ce que la cible tape — et non en langage d'offre. Cohérent avec la découverte GSC
« les décideurs cherchent en langage tâche/outil, jamais "consultant ia" ».

Deux fautes publiques corrigées au passage : « audit infrastucture » → **Audit
infrastructure informatique** et « Intégration ia » → **Intégration IA sur mesure**,
toutes deux dotées d'une description.

**Manques restants, par impact décroissant :**

1. **LinkedIn absent** des profils sociaux — seul `x.com/Pi3r2Dev` y figure, alors que
   le `sameAs` du site déclare `linkedin.com/in/legrand-pierre`. LinkedIn est le signal
   de légitimité B2B principal. **Non automatisable** (cf. tableau ci-dessous).
2. **Hauts-de-Seine (92) absent des zones** (Paris · Yvelines · Val-d'Oise) alors que
   la description de la fiche annonce « 78/95/92/75 » → la fiche se contredit.
3. `Consultant en marketing` et `Consultant en ingénierie` restent **sans aucun
   service**. Les remplir ou les supprimer — une catégorie vide dilue la lecture.
4. **« Organisme de formation professionnelle »** absent des secondaires alors que
   l'Atelier est une offre vendue.
5. Date de création et Clientèle vides.
6. Le champ **prix** de chaque service est resté vide volontairement — TJM 550 €/j,
   à ne pas publier sans validation explicite.

### Ce que Playwright peut / ne peut pas faire sur la fiche (testé 2026-08-24)

| Zone | Écriture automatisée |
|------|----------------------|
| **Services** (bouton « Éditer services ») | ✅ **fonctionne** — création, renommage, description, prix |
| Profils sur les réseaux sociaux | ❌ champ `disabled=true`, `fill()` timeout |
| Catégories / zones | ❌ non retesté en août ; l'audit de juin conclut à l'échec (autocomplétion inerte, valeur tapée « non reconnue ») |
| Posts Google | ✅ (juin) |
| Lecture / audit de la fiche | ✅ fiable — à faire avant tout conseil, la fiche évolue vite |

**Méthode qui marche pour les services** : « Éditer services » → « Ajouter d'autres
services » sous la catégorie visée → « Ajouter un service personnalisé » → saisir dans
le `combobox` → « Enregistrer ». Pour modifier un service existant, cliquer dessus :
le panneau offre nom, **prix** et **description (300 car.)**.

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
