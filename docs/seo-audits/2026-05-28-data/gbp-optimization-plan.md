# Plan d'optimisation Google Business Profile (GBP) — augmenter.PRO

**Date** : 2026-05-28
**Contexte** : décision stratégique « Pivot GBP + national tech/GEO » (cf. session 2026-05-28).
**Pourquoi ce doc** : la recherche 2025-2026 (Whitespark *2026 Local Search Ranking Factors*, Sterling Sky *State of Local SEO 2026*, SparkToro/Datos zero-click) montre que sur les requêtes « service + ville » (audit informatique Yvelines / Val-d'Oise), **le clic part au Local Pack / Google Maps, pas au lien bleu organique**. Le GBP pèse **~32 % du Local Pack** vs **~7 % du référencement organique local**. C'est donc le levier local #1 — bien plus rentable que d'enrichir les landing pages départementales (volume 10-70 recherches/mois).

> ⚠️ Ce plan s'exécute **dans l'interface Google Business Profile** (pas dans le code du site). Claude ne peut pas l'appliquer. C'est une checklist actionnable côté Pierre Legrand.

> 🔗 Lié à : [`geo-prompts.md`](geo-prompts.md) · [`../2026-05-28-audit.md`](../2026-05-28-audit.md) §6.4 · memory `reference_gmb.md` (« GMB existant à auditer/optimiser sem. 27+ »).

---

## 0. Préalable — profil « Service-Area Business » (SAB)

augmenter.PRO est un consultant sans vitrine grand public → profil **Service-Area Business**.

- [ ] **Validation d'adresse obligatoire** (Google exige une adresse pour vérifier), **mais on la masque publiquement** : dans GBP → *Infos* → *Localisation* → décocher « Afficher l'adresse ». Source : Whitespark, *GBP Eligibility by Business Type* (Ellis, 30/10/2025).
- [ ] **Définir les zones desservies** : Yvelines (78), Val-d'Oise (95) + principales villes (Versailles, Saint-Germain-en-Laye, Cergy, Pontoise, Argenteuil…). Max 20 zones.
- [ ] ⚠️ Le masquage d'adresse dégrade légèrement le ranking (facteur documenté) → **compenser par avis + citations + autorité** (sections 3-5).

---

## 1. Catégorie & informations (facteur n°1 du Local Pack)

- [ ] **Catégorie principale précise** : « Consultant en informatique » ou « Service de conseil en informatique » (tester laquelle déclenche le pack sur « audit informatique [ville] »). La catégorie principale est **LE facteur n°1** du Local Pack (Whitespark 2026).
- [ ] **Catégories secondaires** : « Consultant en sécurité », « Conseil en management », « Service de formation continue » (selon disponibilité FR).
- [ ] **Nom exact** : `augmenter.PRO` (graphie gelée — cohérence NAP avec le site, cf. audit §6.4). Ne PAS keyword-stuffer le nom (« augmenter.PRO Audit Informatique Yvelines » = violation guidelines).
- [ ] **Horaires** renseignés (5ᵉ facteur de ranking) — même si visio, indiquer des plages de disponibilité.
- [ ] **Description** : 750 caractères, reprendre le positionnement (IA + audit IT/cyber, 78/95 présentiel + visio France), sans « gratuit » (utiliser « offert »).
- [ ] **Lien site web** → pointer vers la page la plus pertinente (home, ou `/audit-informatique-yvelines` selon la zone) + UTM pour tracer dans GA4.
- [ ] **Attributs** : « Sur rendez-vous », « En ligne », « Devis en ligne ».

---

## 2. NAP — cohérence stricte (signal entité, pour Google ET pour les IA)

Le **N**ame / **A**ddress / **P**hone doit être **rigoureusement identique** partout (audit §6.4 : marque en 2 graphies = signal dilué).

- [ ] Nom : `augmenter.PRO` (idem site, JSON-LD, mentions légales).
- [ ] Adresse : la même que celle à compléter dans les **mentions légales** (cf. squelette SIRET ajouté ce jour) — ex. Jouy-le-Moutier 95280.
- [ ] Téléphone : format FR cohérent (idem mentions légales + JSON-LD LocalBusiness).
- [ ] ⚠️ Aligner avec le `LocalBusiness` JSON-LD du site (`src/app/layout.tsx`) une fois l'adresse/tel figés.

---

## 3. Avis — récence + sentiment priment sur le volume (≈20 % du pack)

- [ ] **Lancer une cadence d'avis** : viser 1-2 nouveaux avis/mois (la **récence** est désormais pondérée, pas seulement le total — Whitespark 2026).
- [ ] Solliciter les clients récents (les cas cités sur `/auteur/pierre-legrand`) avec un lien d'avis direct.
- [ ] **Répondre à chaque avis** (signal d'activité), en réinjectant naturellement le service + la zone.
- [ ] Cible réaliste 90 j : passer de [X] à [X+4] avis, note ≥ 4,8.

---

## 4. Activité — un GBP statique décroche

- [ ] **Posts GBP réguliers** (1/semaine ou 1/quinzaine) : nouveautés, cas client anonymisés, articles de blog (recycler le contenu du cluster tech !).
- [ ] **Photos** : logo, portrait Pierre Legrand (⚠️ l'audit §6.4 note l'absence de vraie photo — à régler aussi sur la page auteur), visuels d'intervention.
- [ ] **Produits/Services** : créer les entrées « Audit 180° (offert) », « Audit 360° IA (225 €) », « Atelier Claude Code » avec descriptions.

---

## 5. Citations & présence off-site (signal entité + carburant des IA)

3 des 5 premiers facteurs de visibilité **IA** sont des citations (Whitespark/AdviceLocal 2026). Les LLM (Perplexity, ChatGPT) s'appuient largement sur l'index **Bing**.

- [ ] **Bing Places for Business** : créer/valider la fiche (NAP identique) — impact IA + organique.
- [ ] **Citations FR cohérentes** : Pages Jaunes, annuaires CCI Yvelines / Val-d'Oise, annuaires sectoriels IT.
- [ ] **France Num Activateur** : suivre la demande en cours (memory `project_france_num_pending`) → dès validation, ajouter l'URL fiche aux `sameAs` (Organization + Person) — levier GEO confirmé (l'audit §6.2 montre ChatGPT citant STEMA via sa référence France Num).
- [ ] **LinkedIn entreprise** : page augmenter.PRO + poste exact « Consultant IA chez augmenter.PRO » sur le profil Pierre Legrand (cohérence entité).

---

## 6. Mesure (boucle de validation)

- [ ] **GBP Insights** : suivre mensuellement vues, recherches (directes vs découverte), actions (appels, clics site, itinéraires).
- [ ] **GA4** : tracer le trafic `utm_source=gbp` pour isoler ce que le GBP rapporte vs l'organique.
- [ ] **Local Pack rank** : tester manuellement « audit informatique Versailles / Cergy / Pontoise » en navigation privée géolocalisée, noter la position dans le pack à T0 / T+30 / T+90.
- [ ] ⚠️ Rappel recherche : le Local Pack se **contracte** en 2026 (1-2 résultats au lieu de 3, bouton d'appel supprimé sur les « AI-powered local packs » — Sterling Sky 2026). Le GBP reste le meilleur levier local mais ne suffit pas seul → garder les 2 landing pages comme filet hors-pack + miser sur l'autorité nationale.

---

## Récap priorisation (impact décroissant)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Catégorie principale + masquage adresse SAB + zones | 🔴 Pack | 30 min |
| 2 | Cadence d'avis (récence) + réponses | 🔴 Pack + confiance | continu |
| 3 | NAP cohérent (GBP ↔ site ↔ mentions légales ↔ JSON-LD) | 🔴 Entité | 1 h |
| 4 | Bing Places + citations FR | 🟠 IA + organique | 2 h |
| 5 | Posts + photos réguliers | 🟠 Activité | continu |
| 6 | France Num dans sameAs (dès validation) | 🟠 GEO | 15 min |
