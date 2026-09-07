/**
 * Google Business Profile — les deux seuls liens vers la fiche.
 *
 * Pourquoi des liens et pas du balisage : Google refuse le balisage d'avis
 * dans les deux sens pour une entreprise qui parle d'elle-même.
 *   1. Avis auto-déclarés (hébergés ici) sur `LocalBusiness`/`Organization` :
 *      interdits depuis 09/2019 (*self-serving*).
 *   2. Avis recopiés depuis une source tierce (dont Google lui-même) dans son
 *      propre `Review`/`AggregateRating` : interdits aussi — la note doit venir
 *      directement des utilisateurs, sur le site qui la balise.
 * Le canal officiel est le `sameAs` vers la fiche (ci-dessous) : il dit à Google
 * « ce site = cette fiche », et les étoiles remontent d'elles-mêmes dans le Local
 * Pack et Maps. Sur la page, on affiche les témoignages en clair (sans balisage)
 * et on renvoie vers la fiche pour la preuve vérifiable.
 */

/** Fiche + avis en lecture. Le CID identifie la fiche de façon stable. */
export const GBP_MAPS_URL =
  "https://www.google.com/maps?cid=13143887329151170152";

/** Dépôt d'avis en 1 clic (ouvre directement le formulaire d'étoiles). */
export const GBP_REVIEW_URL = "https://g.page/r/CWg20PXid2i2EBM/review";
