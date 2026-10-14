/**
 * Google Business Profile — les deux seuls liens vers la fiche, et les seuls
 * avis clients que le site a le droit d'afficher.
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
 * Pack et Maps. Sur la page, on affiche les avis en clair (sans balisage) et on
 * renvoie vers la fiche pour la preuve.
 *
 * Pourquoi les avis vivent ICI et nulle part ailleurs : jusqu'au 2026-10-14 le
 * site affichait cinq « témoignages » dont aucun n'existait sur la fiche, l'un
 * d'eux attribuant à une vraie cliente (Maud J.) une phrase qu'elle n'a jamais
 * écrite, à côté d'un lien « Voir les avis Google ». Un visiteur qui clique et ne
 * retrouve pas la citation conclut que tout le site est inventé.
 *
 * Pourquoi l'avis s'affiche EN ENTIER et jamais en extrait : le 2026-10-14 au
 * soir, une phrase isolée (« la majorité de mes clients me découvrent grâce au
 * bon référencement de mon site ») a été jugée trompeuse par Pierre — sortie de
 * son contexte (l'accompagnement, le « 1/10 il y a un an », la recommandation),
 * ce n'est plus l'avis de Maud. Règle : une citation client affichée = le texte
 * intégral d'un avis de la fiche, tiré de `GBP_QUOTES`, sans coupe ni retouche.
 * Garde-fou : `src/lib/gbp-reviews.test.ts`.
 */

/** Fiche + avis en lecture. Le CID identifie la fiche de façon stable. */
export const GBP_MAPS_URL =
  "https://www.google.com/maps?cid=13143887329151170152";

/**
 * Dépôt d'avis en 1 clic (ouvre directement le formulaire d'étoiles).
 * Vérifié le 2026-10-14 : la redirection aboutit au lieu
 * `0x40100e4a96d27e8b:0xb66877e2f5d03668`, dont la partie basse vaut
 * 13143887329151170152 en décimal — le même CID que `GBP_MAPS_URL`.
 */
export const GBP_REVIEW_URL = "https://g.page/r/CWg20PXid2i2EBM/review";

/**
 * Note et nombre d'avis tels qu'affichés sur la fiche, relevés à la main.
 * ⚠ À METTRE À JOUR à chaque nouvel avis : un chiffre périmé affiché à côté
 * d'un lien vers la fiche se contredit au premier clic. `checkedOn` est rendu
 * dans l'interface pour que le lecteur sache de quand date le relevé.
 */
export const GBP_RATING = {
  value: "5,0",
  count: 3,
  checkedOn: "octobre 2026",
} as const;

/**
 * Avis de la fiche relevés le 2026-10-14 (Google Maps, onglet Avis, re-vérifié
 * le soir même mot pour mot) :
 *   - JOLY Maud, 5 étoiles, avec texte (seul avis citable) ;
 *   - Ben Cana, 5 étoiles, sans texte ;
 *   - Alvin S, 5 étoiles, sans texte.
 *
 * `text` reproduit l'avis à l'identique, fautes de frappe et espaces compris,
 * avec ses retours à la ligne. C'est ce texte, entier, que les cartes affichent.
 */
export const GBP_QUOTES = [
  {
    id: "maud-j",
    author: "Maud J.",
    role: "Architecte d'intérieur",
    stars: 5,
    text: "Pierre m'a accompagnée dans la création de mon site internet ( je suis architecte d'intérieur dans la région lilloise). Il m'a apporté son expertise dans tous les domaines : hébergement, SEO, mails...Il m'a donné les outils pour améliorer les performances de mon site.\nAujourd'hui, la majorité de mes clients me découvrent grâce au bon référencement de mon site. ( 1/10 il ya un an).\nDisponible, motivant, pédagogue et réactif, je recommande Pierre à tous les entrepreneurs qui veulent améliorer leur chiffre d'affaires grâce à leur site.",
  },
] as const;

export const MAUD_J = GBP_QUOTES[0];
