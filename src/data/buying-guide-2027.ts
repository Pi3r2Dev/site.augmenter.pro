/**
 * Grille d'achat IA PME 2027 — source de vérité du guide `/blog/ma-pme-en-2027`.
 *
 * Le widget « 3 questions → porte » et les tableaux de l'article lisent ici.
 * Fourchettes **signées** par Pierre Legrand (sept. 2026) : ordres de grandeur HT
 * de missions déjà livrées, élargis d'un cran vers le haut. Un devis signé sort
 * de l'Audit 180°, pas de cette page.
 */

export const GUIDE_UPDATED = "2026-09-18";

export const COPILOT_CATALOG_EUR = 18.2;
export const COPILOT_PROMO_EUR = 15.6;
export const COPILOT_PROMO_UNTIL = "2026-09-30";
/** 15 sièges × catalogue × 12 mois, arrondi à la dizaine. */
export const COPILOT_GHOST_YEAR_EUR = Math.round(15 * COPILOT_CATALOG_EUR * 12);

export type DoorId =
  | "audit-180"
  | "audit-360"
  | "formation"
  | "goulot"
  | "chiffrage"
  | "knowledge"
  | "precompta"
  | "odoo"
  | "appro"
  | "relance"
  | "refuse-client";

export type GestureId =
  | "unknown"
  | "roadmap"
  | "autonomy"
  | "bottleneck"
  | "quotes"
  | "pdfs"
  | "matching"
  | "odoo"
  | "replenish"
  | "followup"
  | "client-agent";

export type UnusedId =
  | "copilot-wide"
  | "odoo-apps"
  | "make"
  | "kanban-saas"
  | "llm-seats"
  | "none";

export type StakesId = "money" | "none";

export type GuideCta = "audit-180" | "formation";

export interface Door {
  id: DoorId;
  /** Intitulé français, comme le dirigeant le dirait. */
  title: string;
  /** Colonne « si c'est ça chez vous » du tableau devis. */
  when: string;
  range: string;
  keep: string;
  cut: string;
  /** CTA principal de la carte verdict. */
  cta: GuideCta;
}

export const DOORS: Record<DoorId, Door> = {
  "audit-180": {
    id: "audit-180",
    title: "Audit 180° — 60 min",
    when: "Je ne sais même pas par où commencer",
    range: "Premier RDV non facturé",
    keep: "Une liste de quick wins. Si le fit n'y est pas, on oriente ailleurs.",
    cut: "Aucun outil à acheter avant d'avoir ouvert les factures éditeurs.",
    cta: "audit-180",
  },
  "audit-360": {
    id: "audit-360",
    title: "Audit / cartographie IA",
    when: "Il me faut une feuille de route, pas un outil",
    range: "550 € HT (prestation existante)",
    keep: "6 mois priorisés, ROI, outils à ne pas acheter.",
    cut: "Le catalogue de fonctionnalités. On part de vos gestes, pas d'une stack.",
    cta: "audit-180",
  },
  formation: {
    id: "formation",
    title: "Formation Claude Cowork / Code",
    when: "L'équipe doit pêcher toute seule",
    range: "Dès 450 € HT la demi-journée",
    keep: "Autonomie. Moins d'intégrateur à 600–1 000 €/j.",
    cut: "La régie opaque. L'équipe pêche ensuite toute seule.",
    cta: "formation",
  },
  goulot: {
    id: "goulot",
    title: "Le goulot : triage + brouillons + CR qui produit des actions",
    when: "Tout passe par vous (mail, WhatsApp, décisions)",
    range: "~2 à 6 k€ HT",
    keep: "Vous signez encore. Vous ne triez plus.",
    cut: "Copilot déployé trop large, l'agent vocal « qui décroche tout ».",
    cta: "audit-180",
  },
  chiffrage: {
    id: "chiffrage",
    title: "Assistant de chiffrage (catalogue + marges, relecture humaine)",
    when: "2 h pour un devis, deux prix selon l'agence",
    range: "~4 à 10 k€ HT selon propreté du catalogue",
    keep: "Cas déjà mesuré : 2 h → 15 min. Personne n'envoie sans relecture.",
    cut: "Le portail client tant que le catalogue est sale.",
    cta: "audit-180",
  },
  knowledge: {
    id: "knowledge",
    title: "Base de connaissance sourcée",
    when: "Le commercial fouille 400 PDF pendant que le client attend",
    range: "~3 à 7 k€ HT",
    keep: "Réponse avec source, ou pas de réponse.",
    cut: "Un GPT générique sur le Drive en vrac.",
    cta: "audit-180",
  },
  precompta: {
    id: "precompta",
    title: "Pré-compta des écarts",
    when: "Une journée à rapprocher facture / BL / commande",
    range: "~3 à 7 k€ HT",
    keep: "Personne ne relit 600 lignes. On relit les écarts.",
    cut: "La migration ERP « parce que l'IA ».",
    cta: "audit-180",
  },
  odoo: {
    id: "odoo",
    title: "Remise d'aplomb Odoo + formation",
    when: "Odoo « bloqué » chez l'intégrateur",
    range: "Jours, pas semaines — vs 3 500 € déjà vu",
    keep: "L'équipe modifie ensuite toute seule.",
    cut: "Le tweak à 600–1 000 €/j chez l'intégrateur.",
    cta: "audit-180",
  },
  appro: {
    id: "appro",
    title: "Savoir quoi commander, et quand",
    when: "On ne sait jamais quoi commander, ni le franco",
    range: "~3 à 8 k€ HT",
    keep: "Besoin net + seuil de franco affiché avant de valider.",
    cut: "Le module stock allumé et jamais ouvert, Excel restant la vérité.",
    cta: "audit-180",
  },
  relance: {
    id: "relance",
    title: "Relance des devis restés sans réponse",
    when: "Les devis partent et personne ne relance",
    range: "~2 à 6 k€ HT",
    keep: "La relance part au bon moment, avec le contexte, et s'arrête si le client répond.",
    cut: "La séquence Make/Zapier aveugle que plus personne n'ose toucher.",
    cta: "audit-180",
  },
  "refuse-client": {
    id: "refuse-client",
    title: "On refuse d'emblée l'agent qui parle à vos clients",
    when: "« Un agent qui parle à mes clients »",
    range: "—",
    keep: "Le lien commercial. On prépare les réponses, on ne décroche pas à votre place.",
    cut: "« Confier toute la relation client à l'IA » — back-office d'abord.",
    cta: "audit-180",
  },
};

/** Ordre du tableau devis dans l'article (toutes les portes, une fois). */
export const DOOR_TABLE_ORDER: DoorId[] = [
  "audit-180",
  "audit-360",
  "formation",
  "goulot",
  "chiffrage",
  "knowledge",
  "precompta",
  "appro",
  "relance",
  "odoo",
  "refuse-client",
];

export const GESTURES: { id: GestureId; label: string }[] = [
  { id: "unknown", label: "Je ne sais même pas par où commencer" },
  { id: "roadmap", label: "Il me faut une feuille de route, pas un outil" },
  { id: "autonomy", label: "L'équipe doit pêcher toute seule" },
  { id: "bottleneck", label: "Tout passe par moi (mail, WhatsApp, décisions)" },
  { id: "quotes", label: "2 h pour un devis, deux prix selon l'agence" },
  { id: "pdfs", label: "On fouille 400 PDF pendant que le client attend" },
  { id: "matching", label: "Une journée à rapprocher facture / BL / commande" },
  { id: "replenish", label: "On ne sait jamais quoi commander, ni le franco" },
  { id: "followup", label: "Les devis partent et personne ne relance" },
  { id: "odoo", label: "Odoo est « bloqué » chez l'intégrateur" },
  { id: "client-agent", label: "Je veux un agent qui parle à mes clients" },
];

export const UNUSED_SOFTWARES: { id: UnusedId; label: string }[] = [
  { id: "none", label: "Rien d'évident — on s'en sert, ou on n'a presque rien" },
  { id: "copilot-wide", label: "Copilot sur (presque) tous les postes, 2 clics" },
  { id: "odoo-apps", label: "Odoo : 15 apps allumées, 5 utilisées" },
  { id: "make", label: "Make / Zapier : scénarios cassés, plus personne n'y touche" },
  { id: "kanban-saas", label: "Monday / Notion / ClickUp « pour s'organiser »" },
  { id: "llm-seats", label: "ChatGPT Team / Claude × toute l'équipe, zéro contexte" },
];

/** Texte « à couper d'abord » collé sur la carte verdict. */
export const CUT_FIRST: Record<Exclude<UnusedId, "none">, string> = {
  "copilot-wide":
    "Avant d'acheter quoi que ce soit : réduire Copilot à 2–3 sièges où le mail vit vraiment. Copilot Chat est souvent déjà inclus. 15 licences catalogue ≈ 3 300 € HT / an pour du vide.",
  "odoo-apps":
    "Éteindre les apps Odoo inutilisées. Socle 5–7 modules, puis on branche. Chaque tweak chez l'intégrateur coûte un rappel.",
  make: "Une brique, mesurée. Relance avec arrêt si le client répond — pas une séquence aveugle.",
  "kanban-saas":
    "On ne remplace pas le tableau blanc. On sort les actions du CR vers ce que les gens ouvrent déjà.",
  "llm-seats":
    "1–3 sièges + un coffre-fort (PDF, devis, règles). Sinon vous payez un stagiaire très cher qui n'a pas lu vos marges.",
};

export interface Recommendation {
  door: Door;
  hitl: boolean;
  cutFirst: string | null;
}

const GESTURE_TO_DOOR: Record<GestureId, DoorId> = {
  unknown: "audit-180",
  roadmap: "audit-360",
  autonomy: "formation",
  bottleneck: "goulot",
  quotes: "chiffrage",
  pdfs: "knowledge",
  matching: "precompta",
  odoo: "odoo",
  replenish: "appro",
  followup: "relance",
  "client-agent": "refuse-client",
};

/**
 * Oriente vers une porte dès le premier geste. L'enjeu (marge / juridique /
 * client) n'ouvre jamais une porte « autonome » : il force la relecture humaine.
 */
export function recommendDoor(
  gesture: GestureId | null,
  unused: UnusedId | null,
  stakes: StakesId | null,
): Recommendation {
  const doorId = gesture ? GESTURE_TO_DOOR[gesture] : "audit-180";
  const door = DOORS[doorId];
  const hitl = stakes === "money" || doorId === "chiffrage" || doorId === "refuse-client";
  const cutFirst =
    unused && unused !== "none" ? CUT_FIRST[unused] : null;
  return { door, hitl, cutFirst };
}

export const DISCLAIMER =
  "Fourchettes 2026–2027, HT, hors spécificités, d'après nos missions. Copilot : tarif Microsoft France (catalogue 18,20 € HT / user / mois ; promo 15,60 € jusqu'au 30 sept. 2026, 1re année). Odoo : tarif public promo 1re année. Sage 50 Comptabilité Simply : 252 € HT / an (guide tarifs janv. 2026). Un devis signé sort du diagnostic.";

export const MARKET_VS_US = [
  {
    item: "« Projet IA » générique, premier cas d'usage",
    market: "15–50 k€ HT (pages prestataires 2026)",
    us: "~2 à 10 k€ HT une tâche, overlay sur l'existant, validation humaine",
  },
  {
    item: "Assistant documentaire / RAG",
    market: "15–35 k€ HT",
    us: "~3 à 7 k€ HT, réponse sourcée ou pas de réponse",
  },
  {
    item: "Copilot × toute l'équipe",
    market: "18,20 € HT / user / mois en complément",
    us: "2–3 sièges + Chat inclus. Le métier se branche sur le catalogue, pas sur Word",
  },
] as const;
