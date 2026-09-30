/**
 * Grille d'achat IA PME 2027 — source de vérité du guide `/blog/ma-pme-en-2027`.
 *
 * Le widget « 3 questions → porte » et les tableaux de l'article lisent ici.
 * Fourchettes **signées** par Pierre Legrand (sept. 2026) : ordres de grandeur HT
 * de missions déjà livrées, élargis d'un cran vers le haut. Un devis signé sort
 * de l'Audit 180°, pas de cette page.
 */

export const GUIDE_UPDATED = "2026-09-30";

export const COPILOT_CATALOG_EUR = 18.2;
export const COPILOT_PROMO_EUR = 15.6;
/** Offre de lancement Copilot Business, page tarifs Microsoft France (1er juillet → 31 décembre 2026). */
export const COPILOT_PROMO_UNTIL = "2026-12-31";
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
    range: "Premier rendez-vous non facturé",
    keep: "Une liste de gestes à gagner vite. Si le sujet n'est pas pour nous, on vous oriente ailleurs.",
    cut: "Aucun outil avant d'avoir ouvert les factures éditeurs.",
    cta: "audit-180",
  },
  "audit-360": {
    id: "audit-360",
    title: "Audit 360° : cartographie et feuille de route",
    when: "Il me faut une feuille de route, pas un outil",
    range: "550 € HT, une demi-journée",
    keep: "Six mois priorisés, le retour attendu par chantier, et la liste des outils à ne pas acheter.",
    cut: "Le catalogue de fonctionnalités. On part de vos gestes, pas d'une pile logicielle.",
    cta: "audit-180",
  },
  formation: {
    id: "formation",
    title: "Atelier Claude Cowork ou Claude Code",
    when: "L'équipe doit pêcher toute seule",
    range: "Dès 450 € HT la demi-journée",
    keep: "L'autonomie : moins de journées d'intégrateur à 600 ou 1 000 €.",
    cut: "La régie opaque. Après l'atelier, l'équipe modifie ses propres réglages.",
    cta: "formation",
  },
  goulot: {
    id: "goulot",
    title: "Le goulot : triage, brouillons, comptes rendus qui produisent des actions",
    when: "Tout passe par vous (mail, WhatsApp, décisions)",
    range: "~2 à 6 k€ HT",
    keep: "Vous signez encore. Vous ne triez plus.",
    cut: "Copilot déployé sur tous les postes, l'agent vocal « qui décroche tout ».",
    cta: "audit-180",
  },
  chiffrage: {
    id: "chiffrage",
    title: "Assistant de chiffrage (catalogue et marges, relecture humaine)",
    when: "Deux heures pour un devis, deux prix selon l'agence",
    range: "~4 à 10 k€ HT selon propreté du catalogue",
    keep: "Cas mesuré chez une PME du BTP : de 2 h à 15 min par devis. Personne n'envoie sans relecture.",
    cut: "Le portail client tant que le catalogue est sale.",
    cta: "audit-180",
  },
  knowledge: {
    id: "knowledge",
    title: "Base de connaissance sourcée",
    when: "Le commercial fouille 400 PDF pendant que le client attend",
    range: "~3 à 7 k€ HT",
    keep: "Une réponse avec sa source, ou pas de réponse.",
    cut: "Un assistant générique branché sur le Drive en vrac.",
    cta: "audit-180",
  },
  precompta: {
    id: "precompta",
    title: "Rapprochement facture, bon de livraison, commande",
    when: "Une journée à rapprocher facture, BL et commande",
    range: "~3 à 7 k€ HT",
    keep: "Personne ne relit 600 lignes. On relit les écarts.",
    cut: "La migration d'ERP « parce que l'IA ».",
    cta: "audit-180",
  },
  odoo: {
    id: "odoo",
    title: "Remise d'aplomb Odoo, puis formation de l'équipe",
    when: "Odoo est « bloqué » chez l'intégrateur",
    range: "Des jours, pas des semaines (3 500 € déjà vus en devis)",
    keep: "L'équipe modifie ensuite ses réglages toute seule.",
    cut: "Le réglage facturé 600 à 1 000 € la journée chez l'intégrateur.",
    cta: "audit-180",
  },
  appro: {
    id: "appro",
    title: "Savoir quoi commander, et quand",
    when: "On ne sait jamais quoi commander, ni où en est le franco",
    range: "~3 à 8 k€ HT",
    keep: "Le besoin net calculé et le seuil de franco affiché avant de valider.",
    cut: "Le module stock installé et jamais ouvert, Excel restant la vérité.",
    cta: "audit-180",
  },
  relance: {
    id: "relance",
    title: "Relance des devis restés sans réponse",
    when: "Les devis partent et personne ne relance",
    range: "~2 à 6 k€ HT",
    keep: "La relance part au bon moment, avec le contexte du dossier, et s'arrête dès que le client répond.",
    cut: "La séquence Make ou Zapier aveugle que plus personne n'ose toucher.",
    cta: "audit-180",
  },
  "refuse-client": {
    id: "refuse-client",
    title: "L'agent qui parle à vos clients : pas en premier",
    when: "« Je veux un agent qui parle à mes clients »",
    range: "Pas de devis d'emblée",
    keep: "Le lien commercial. On prépare les réponses, on ne décroche pas à votre place.",
    cut: "« Confier toute la relation client à l'IA ». Le back-office passe d'abord.",
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
    "Réduisez Copilot aux deux ou trois sièges où le mail vit vraiment. Copilot Chat est déjà compris dans l'abonnement ; quinze licences au catalogue représentent environ 3 300 € HT par an pour des sièges vides.",
  "odoo-apps":
    "Désinstallez les applications Odoo que personne n'ouvre. Un socle de cinq à sept modules, puis on branche. Chaque réglage chez l'intégrateur coûte un rappel et une journée.",
  make: "Une brique, mesurée : la relance de devis qui s'arrête dès que le client répond. Pas une séquence aveugle de plus.",
  "kanban-saas":
    "On ne remplace pas le tableau blanc. On sort les actions du compte rendu vers l'outil que les gens ouvrent déjà.",
  "llm-seats":
    "Un à trois sièges, et une mémoire métier partagée (PDF, devis, règles). Sans elle, vous payez cher un assistant qui n'a jamais lu vos marges.",
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
  "Fourchettes 2026-2027, HT, hors spécificités, d'après nos missions. Copilot Business : tarif Microsoft France (catalogue 18,20 € HT par utilisateur et par mois ; 15,60 € la première année sur engagement annuel, offre valable jusqu'au 31 décembre 2026). Odoo : plan Standard, engagement annuel. Sage 50 Comptabilité Simply : 252 € HT par an (guide tarifs de janvier 2026). Un devis signé sort de l'Audit 180°.";

export const MARKET_VS_US = [
  {
    item: "« Projet IA » générique, premier cas d'usage",
    market: "15 à 50 k€ HT (pages prestataires 2026)",
    us: "2 à 10 k€ HT pour une tâche, branchée sur l'existant, avec validation humaine",
  },
  {
    item: "Assistant documentaire (recherche dans vos PDF)",
    market: "15 à 35 k€ HT",
    us: "3 à 7 k€ HT, réponse sourcée ou pas de réponse",
  },
  {
    item: "Copilot pour toute l'équipe",
    market: "18,20 € HT par utilisateur et par mois, en complément",
    us: "Deux ou trois sièges, Copilot Chat déjà compris. Le métier se branche sur le catalogue, pas sur Word",
  },
] as const;
