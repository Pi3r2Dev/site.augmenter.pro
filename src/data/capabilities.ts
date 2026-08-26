// src/data/capabilities.ts
/**
 * Matrice de capacités — « ce que l'IA sait faire chez vous ».
 *
 * Source de vérité de l'outil de la section 02 de `/`. Contenu **curé à la
 * main** : aucune génération à la volée en page d'accueil, chaque phrase est
 * défendable en rendez-vous et chaque preuve est vérifiable.
 *
 * Le classement en trois verdicts — dont « par crans, jamais d'un coup » — est
 * le principal signal E-E-A-T de la page : presque personne n'écrit ce qu'il
 * refuse de livrer d'emblée. Ce troisième verdict n'est pas un refus sec : il
 * doit toujours ouvrir sur le palier par lequel on commence.
 *
 * Une capacité n'est PAS le produit cartésien métier × outil : elle déclare les
 * contextes où elle s'applique, et le filtre croise (avec relâchement
 * progressif, comme le hub `/augmenter-mon-entreprise` — jamais d'écran vide).
 */

// ─── Axe 1 — Métier ────────────────────────────────────────────────────────

export const CAPABILITY_SECTORS = [
  "BTP & rénovation",
  "Négoce & distribution",
  "Industrie",
  "Commerce & service local",
  "Conseil & services",
] as const;
export type CapabilitySector = (typeof CAPABILITY_SECTORS)[number];

/** Correspondance vers les secteurs du wizard `/contact` (pré-remplissage). */
export const SECTOR_TO_WIZARD: Record<CapabilitySector, string> = {
  "BTP & rénovation": "BTP / Immobilier",
  "Négoce & distribution": "Commerce / Distribution",
  Industrie: "Industrie / Logistique",
  "Commerce & service local": "Commerce / Distribution",
  "Conseil & services": "Services / Conseil",
};

// ─── Axe 2 — Outils en place ───────────────────────────────────────────────

export const CAPABILITY_TOOLS = [
  "Odoo",
  "Sage, EBP, Ciel",
  "Logiciel métier",
  "Excel & Drive",
  "Papier & tableur",
] as const;
export type CapabilityTool = (typeof CAPABILITY_TOOLS)[number];

// ─── Verdicts ──────────────────────────────────────────────────────────────

export type Verdict = "production" | "cadrer" | "pas-encore";

export const VERDICTS: Record<
  Verdict,
  { label: string; hint: string; color: string }
> = {
  production: {
    label: "Déjà en production chez un client",
    hint: "Livré, mesuré, encore en service aujourd'hui.",
    color: "oklch(0.72 0.19 150)",
  },
  cadrer: {
    label: "Faisable, à cadrer",
    hint: "La technique est là. Ce qui reste à décider, c'est votre périmètre.",
    color: "oklch(0.828 0.189 84.429)",
  },
  "pas-encore": {
    label: "Par crans, jamais d'un coup",
    hint: "Techniquement faisable. On refuse de le livrer d'emblée — voici par quoi on commence.",
    color: "oklch(0.65 0.02 293)",
  },
};

// ─── Capacités ─────────────────────────────────────────────────────────────

export interface Capability {
  id: string;
  /** La tâche, formulée comme le dirigeant la vit. */
  title: string;
  /** Ce qu'on livre — ou, pour le dernier verdict, par quel cran on commence. */
  detail: string;
  /** Preuve vérifiable, chiffre terrain ou garde-fou de méthode. */
  proof?: string;
  verdict: Verdict;
  /** `"Tous"` = transversal. */
  sectors: CapabilitySector[] | "Tous";
  tools: CapabilityTool[] | "Tous";
  /** Mise en service — alimente le badge « nouveau » (< 6 mois). */
  since?: string;
  /** Le contenu qui creuse, quand il existe. */
  href?: string;
}

export const CAPABILITIES: Capability[] = [
  // ── Déjà en production ──────────────────────────────────────────────────
  {
    id: "devis-chiffre",
    title: "Un devis chiffré depuis votre catalogue",
    detail:
      "Un assistant nourri par vos références et vos règles de marge, qui sort un devis structuré — le même d'une agence à l'autre.",
    proof: "2 h → 15 min, PME du BTP",
    verdict: "production",
    sectors: ["BTP & rénovation", "Négoce & distribution", "Conseil & services"],
    tools: ["Odoo", "Logiciel métier", "Excel & Drive"],
  },
  {
    id: "catalogue",
    title: "Un catalogue remis d'aplomb, puis mis en ligne",
    detail:
      "On reclasse familles, références et fiches produit avant d'ouvrir quoi que ce soit au client. L'ordre inverse échoue toujours.",
    proof: "Trois personnes une semaine, désormais une journée",
    verdict: "production",
    sectors: ["Négoce & distribution", "Commerce & service local"],
    tools: ["Odoo", "Excel & Drive", "Papier & tableur"],
  },
  {
    id: "recherche-documents",
    title: "Retrouver la bonne référence dans 400 PDF",
    detail:
      "Fiche technique, certificat, procès-verbal, clause de contrat : l'assistant répond en citant sa source. Vérifiable, donc opposable.",
    proof: "Réponse sourcée, ou pas de réponse",
    verdict: "production",
    sectors: ["BTP & rénovation", "Industrie", "Négoce & distribution"],
    tools: "Tous",
  },
  {
    id: "rapprochement",
    title: "Rapprocher facture, bon de livraison et commande",
    detail:
      "Le contrôle de cohérence tourne tout seul et ne remonte que les écarts. Personne ne relit 600 lignes à la main.",
    proof: "Une journée de contrôle mensuel, réduite à la relecture des écarts",
    verdict: "production",
    sectors: ["Négoce & distribution", "Industrie"],
    tools: ["Odoo", "Sage, EBP, Ciel"],
  },
  {
    id: "appro",
    title: "Savoir quoi commander, et quand",
    detail:
      "Le besoin net calculé pour vous — commandes confirmées, moins le stock, moins ce qui est déjà en route — et le seuil de franco affiché avant de valider.",
    proof: "Le franco affiché avant de valider la commande",
    verdict: "production",
    sectors: ["Négoce & distribution", "Industrie"],
    tools: ["Odoo", "Sage, EBP, Ciel", "Excel & Drive"],
  },
  {
    id: "pont-logiciels",
    title: "Faire parler deux logiciels qui s'ignorent",
    detail:
      "Le pont entre vos outils, y compris quand aucun n'expose d'API : export mensuel vers le cabinet comptable, transferts, contrôles de cohérence.",
    proof: "Y compris sans API des deux côtés",
    verdict: "production",
    sectors: "Tous",
    tools: "Tous",
  },
  {
    id: "compte-rendu",
    title: "Un compte rendu de réunion qui produit les actions",
    detail:
      "Le résumé, n'importe quel outil le fait. Ce qui compte : la décision à exécuter, le fournisseur à relancer, le devis à envoyer.",
    proof: "1 h de réunion, relevé de décisions en 3 min",
    verdict: "production",
    sectors: "Tous",
    tools: "Tous",
    href: "/blog/compte-rendu-reunion-ia",
  },
  {
    id: "odoo-config",
    title: "Configurer votre ERP sans y passer un trimestre",
    detail:
      "Paramétrage, reprise de données, champs métier : mené avec l'IA en binôme plutôt qu'en régie chez un intégrateur.",
    proof: "4 jours au lieu de 3 500 € de prestation",
    verdict: "production",
    sectors: "Tous",
    tools: ["Odoo"],
    href: "/blog/configurer-odoo-ia-claude-cowork",
  },

  // ── Faisable, à cadrer ──────────────────────────────────────────────────
  {
    id: "mcp-erp",
    title: "Brancher l'IA directement sur votre ERP",
    detail:
      "Un serveur MCP qui donne à l'assistant l'accès à vos vraies données — stocks, clients, historiques — sous vos règles et vos droits.",
    proof: "Lecture seule d'abord, écriture ensuite",
    verdict: "cadrer",
    sectors: "Tous",
    tools: ["Odoo", "Sage, EBP, Ciel", "Logiciel métier"],
    since: "2026-05",
    href: "/integration-mcp",
  },
  {
    id: "modele-souverain",
    title: "Un modèle ouvert, chez nous ou chez vous",
    detail:
      "Pour les dossiers que vous ne voulez envoyer nulle part : contrats, dossiers de personnel, pièces d'un litige. Hébergé sur nos serveurs et infogéré, ou installé chez vous si vous préférez tout garder en interne.",
    proof: "Notre propre flotte de modèles tourne comme ça au quotidien",
    verdict: "cadrer",
    sectors: "Tous",
    tools: "Tous",
    since: "2026-06",
    href: "/audit-ia-pme",
  },
  {
    id: "portail-commande",
    title: "Un portail de réassort pour vos clients réguliers",
    detail:
      "Ils commandent seuls, vous arrêtez de ressaisir. À une condition : le catalogue doit être propre avant, sinon le portail expose le désordre.",
    proof: "Catalogue d'abord, portail ensuite",
    verdict: "cadrer",
    sectors: ["Négoce & distribution", "Commerce & service local"],
    tools: ["Odoo", "Logiciel métier"],
  },
  {
    id: "relance-devis",
    title: "Relancer les devis restés sans réponse",
    detail:
      "La relance part au bon moment, avec le bon contexte, et s'arrête dès que le client répond. Pas de mitraillage automatique.",
    proof: "Relance contextualisée, pas de séquence aveugle",
    verdict: "cadrer",
    sectors: "Tous",
    tools: ["Odoo", "Logiciel métier", "Excel & Drive"],
  },
  {
    id: "visibilite-llm",
    title: "Exister quand un dirigeant interroge ChatGPT",
    detail:
      "Audit de visibilité classique et générative, puis les contenus qui répondent aux questions que vos clients posent réellement.",
    proof: "Les moteurs IA citent surtout des pages hors top 10",
    verdict: "cadrer",
    sectors: "Tous",
    tools: "Tous",
  },

  // ── Pas encore honnête ──────────────────────────────────────────────────
  {
    id: "chiffrage-autonome",
    title: "Un chiffrage envoyé sans relecture humaine",
    detail:
      "Un devis engage votre marge. Cran 1 : l'IA prépare, quelqu'un chez vous valide tout. Cran 2, une fois les écarts mesurés sur trois mois : validation automatique sur les lignes standard, relecture sur le reste.",
    proof: "On relâche la bride sur des écarts mesurés, pas sur une promesse",
    verdict: "pas-encore",
    sectors: "Tous",
    tools: "Tous",
  },
  {
    id: "relation-client-bout-en-bout",
    title: "Confier toute la relation client à un agent",
    detail:
      "Vos clients réguliers appellent aussi pour parler à quelqu'un. On commence par le back-office — ressaisie, recherche, préparation des réponses — puis le premier niveau sur les sujets sans enjeu. Le lien commercial reste le vôtre.",
    proof: "Le back-office d'abord, jamais le téléphone en premier",
    verdict: "pas-encore",
    sectors: "Tous",
    tools: "Tous",
  },
  {
    id: "analytique-sans-reprise",
    title: "De l'analytique fiable sans reprendre l'existant",
    detail:
      "Si le plan comptable ou le catalogue est faux, l'IA ne le corrige pas : elle industrialise l'erreur. On chiffre d'abord la remise en ordre — souvent moins lourde que redouté — puis on branche l'analytique dessus.",
    proof: "Remise en ordre chiffrée avant de s'engager sur la suite",
    verdict: "pas-encore",
    sectors: "Tous",
    tools: "Tous",
  },
];

// ─── Filtrage à relâchement progressif ─────────────────────────────────────

function matchSector(c: Capability, sector: CapabilitySector | null) {
  return !sector || c.sectors === "Tous" || c.sectors.includes(sector);
}

function matchTool(c: Capability, tool: CapabilityTool | null) {
  return !tool || c.tools === "Tous" || c.tools.includes(tool);
}

export interface CapabilityMatch {
  items: Capability[];
  /** Vrai quand l'axe outil a dû être relâché pour ne pas afficher un écran vide. */
  relaxedTool: boolean;
}

/**
 * Croise les deux axes. Si le croisement ne rend rien de spécifique, on relâche
 * l'outil plutôt que d'afficher le vide — le visiteur en découverte ne doit
 * jamais tomber sur une impasse.
 */
export function matchCapabilities(
  sector: CapabilitySector | null,
  tool: CapabilityTool | null
): CapabilityMatch {
  const strict = CAPABILITIES.filter(
    (c) => matchSector(c, sector) && matchTool(c, tool)
  );

  // On considère l'axe outil utile seulement s'il reste des capacités ciblées
  // (hors transversales) — sinon la sélection n'apprend rien au visiteur.
  const targeted = strict.filter((c) => c.sectors !== "Tous" || c.tools !== "Tous");
  if (targeted.length > 0) return { items: strict, relaxedTool: false };

  return {
    items: CAPABILITIES.filter((c) => matchSector(c, sector)),
    relaxedTool: tool !== null,
  };
}

/** Une capacité mise en service depuis moins de 6 mois porte le badge « nouveau ». */
export function isRecent(since: string | undefined, todayISO: string): boolean {
  if (!since) return false;
  const [y, m] = since.split("-").map(Number);
  const [ty, tm] = todayISO.split("-").map(Number);
  return (ty - y) * 12 + (tm - m) <= 6;
}
