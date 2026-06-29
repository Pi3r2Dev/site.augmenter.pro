// src/data/resources.ts
// ─────────────────────────────────────────────────────────────────────────
// Catalog partagé — source unique de vérité des ressources éditoriales.
//
//  • ARTICLES  → consommé par /blog (blog-view) ET par le hub /augmenter-mon-entreprise
//  • IDEAS     → consommé par /idees (idees-view) ET par le hub
//  • prompts   → vit dans ./prompts ; le hub le mappe via promptToResource()
//
// Chaque ressource est enrichie de deux axes de projection en plus de ses tags :
//  • sectors[] : secteurs concernés (taxonomie hub) — "Tous" = transversal
//  • pains[]   : douleurs du dirigeant adressées (taxonomie hub)
//
// ⚠ Ce module est importé par des composants client (blog-view, idees-view) ET
//    par un server component (la page hub, pour le JSON-LD). On n'importe donc
//    de ./prompts QUE les *types* (effacés à la compilation) — jamais la valeur
//    `prompts`, dont le contenu volumineux ne doit pas être embarqué dans le
//    bundle de /blog ou /idees. Le hub importe `prompts` lui-même.
// ─────────────────────────────────────────────────────────────────────────

import type { ArticleBentoData } from "@/components/bento/article-bento-card";
import type { IdeaData } from "@/components/widgets/idea-card";
import type { Palette } from "@/components/widgets/palettes";
import type { Prompt, PromptCategory } from "@/data/prompts";

// ─── Axe 1 — Secteur (taxonomie hub) ──────────────────────────────────────

export const SECTORS = [
  "Tous",
  "BTP & rénovation",
  "Immobilier",
  "Courtage",
  "Commerce & service local",
  "Industrie",
  "Professions réglementées",
  "Conseil & services",
] as const;
export type Sector = (typeof SECTORS)[number];

// ─── Axe 2 — Douleur du moment (formulée à la 1re personne, ton direct) ────

export const PAINS = [
  { id: "repetitif", label: "je perds mes journées en tâches répétitives" },
  { id: "goulot", label: "tout passe par moi — je suis le goulot" },
  { id: "leads", label: "je laisse filer des leads, mon commercial plafonne" },
  { id: "prestataire", label: "je dépends d'un prestataire opaque (ou trop cher)" },
  { id: "cyber", label: "je ne sais pas si mes données sont vraiment protégées" },
  { id: "demarrage", label: "je tourne autour de l'IA sans savoir par où commencer" },
] as const;
export type PainId = (typeof PAINS)[number]["id"];

// ─── Axe 3 — Objectif / intention (drive le type de ressource) ─────────────

export const OBJECTIVES = [
  { id: "comprendre", label: "comprendre le sujet à fond", type: "article" },
  { id: "chiffres", label: "voir des exemples chiffrés", type: "idee" },
  { id: "prompt", label: "un prompt prêt à l'emploi", type: "prompt" },
  { id: "accompagner", label: "me faire accompagner", type: "cta" },
] as const;
export type ObjectiveId = (typeof OBJECTIVES)[number]["id"];
export type ResourceType = "article" | "idee" | "prompt";

// ─── Taxonomie secteur des IDÉES (conservée pour le filtre de /idees) ──────

export const IDEE_SECTORS = [
  "Tout",
  "Immobilier",
  "Courtage",
  "BTP",
  "Notariat",
  "Commerce",
  "Outils PME",
] as const;
export type IdeeSector = (typeof IDEE_SECTORS)[number];

/** Mapping secteur-idée → secteur(s) hub. "Outils PME" = transversal → Tous. */
const IDEE_TO_HUB_SECTOR: Record<Exclude<IdeeSector, "Tout">, Sector[]> = {
  Immobilier: ["Immobilier"],
  Courtage: ["Courtage"],
  BTP: ["BTP & rénovation"],
  Notariat: ["Professions réglementées"],
  Commerce: ["Commerce & service local"],
  "Outils PME": ["Tous"],
};

// ─── ARTICLES (source de vérité de /blog) ──────────────────────────────────

export interface CatalogArticle extends ArticleBentoData {
  /** TL;DR — le verdict actionnable, pas un teaser. Affiché sur le hub. */
  tldr: string;
  sectors: Sector[];
  pains: PainId[];
}

export const ARTICLES: CatalogArticle[] = [
  {
    slug: "serveur-mcp-heberge-pme",
    title:
      "Serveur MCP hébergé : faut-il le coder, le louer ou l'héberger soi-même ?",
    excerpt:
      "Vous voulez que votre IA lise vos vraies données sans monter une usine à gaz. Trois chemins, et un seul détail les départage : où vivent vos données. Panorama des plateformes, coûts réels et grille de décision PME.",
    tldr: "Coder, louer ou héberger soi-même son serveur MCP : trois chemins pour brancher l'IA sur vos vraies données, et un seul détail les départage — où vivent vos données. Panorama des plateformes, coûts réels et grille de décision PME.",
    tags: ["IA", "PME"],
    readTime: "10 min",
    image: "/images/blog/serveur-mcp-heberge-pme.webp",
    sectors: ["Tous", "Industrie"],
    pains: ["prestataire", "demarrage"],
  },
  {
    slug: "cybersecurite-pme-guide-pratique",
    title:
      "Cybersécurité PME : 93 % des attaques sont évitables avec du bon sens",
    excerpt:
      "Pas besoin d'une DSI ni d'un gros budget. Mots de passe, double authentification, phishing, fraude au président : le guide pratique pour couvrir l'essentiel du risque, avec un plan d'action en une semaine.",
    tldr: "93 % des attaques PME passent par une erreur humaine évitable. Mots de passe, MFA, phishing, fraude au président : le plan d'action qui couvre l'essentiel du risque en une semaine — sans DSI ni gros budget.",
    tags: ["Cybersécurité", "PME"],
    readTime: "13 min",
    image: "/images/blog/cybersecurite-pme-guide-pratique.webp",
    sectors: ["Tous"],
    pains: ["cyber"],
  },
  {
    slug: "prompt-audit-projet-claude-fable",
    title:
      "Votre code vieillit en silence : le prompt Claude Fable qui audite tout votre projet",
    excerpt:
      "Le prompt d'audit en 4 phases pour Claude Fable 5, traduit et amélioré en français. Cartographie, constats fichier:ligne, plan de remise à niveau — testé sur un vrai projet : 11 constats en 3 minutes.",
    tldr: "Un prompt d'audit en 4 phases pour Claude Fable 5 : cartographie, constats fichier:ligne, plan de remise à niveau. Testé sur un vrai projet — 11 constats en 3 minutes, pour reprendre la main sur du code que vous ne maîtrisez plus.",
    tags: ["IA", "Claude Code"],
    readTime: "11 min",
    image: "/images/blog/prompt-audit-projet-claude-fable.webp",
    sectors: ["Tous", "Industrie"],
    pains: ["prestataire", "demarrage"],
  },
  {
    slug: "claude-cowork-community-manager",
    title:
      "J'ai transformé Claude Cowork en community manager : le setup, les prompts, ce qui a foiré",
    excerpt:
      "J'ai confié mes réseaux sociaux à Claude Cowork pendant six semaines. Le setup exact, les prompts que j'utilise vraiment, les chiffres avant/après — et les trois fois où ça a foiré.",
    tldr: "Six semaines à confier mes réseaux sociaux à Claude Cowork : le setup exact, les prompts utilisés, les chiffres avant/après — et les trois fois où ça a foiré. Pour arrêter de perdre vos soirées sur LinkedIn.",
    tags: ["IA", "Commercial"],
    readTime: "11 min",
    image: "/images/blog/claude-cowork-community-manager.webp",
    sectors: ["Tous", "Commerce & service local"],
    pains: ["repetitif", "leads"],
  },
  {
    slug: "agent-ia-dirigeant-pme",
    title: "Agent IA pour dirigeant de PME : c'est quoi, et comment en créer un",
    excerpt:
      "Tout le monde vend des « agents IA », personne ne dit ce que c'est vraiment. Définition sans jargon, 3 exemples concrets (BTP, immobilier, services) et la méthode en 4 étapes pour créer le vôtre.",
    tldr: "Tout le monde vend des « agents IA », personne ne dit ce que c'est vraiment. Définition sans jargon, 3 exemples concrets (BTP, immobilier, services) et la méthode en 4 étapes pour créer le vôtre.",
    tags: ["IA", "PME"],
    readTime: "9 min",
    image: "/images/blog/agent-ia-dirigeant-pme.webp",
    sectors: ["Tous", "BTP & rénovation", "Immobilier", "Conseil & services"],
    pains: ["demarrage", "repetitif"],
  },
  {
    slug: "patron-goulot-paradoxe-ia-dirigeant-pme",
    title: "Le patron-goulot : quand l'IA rend le dirigeant encore plus indispensable",
    excerpt:
      "Vous avez déployé ChatGPT/Claude dans votre PME et vous êtes toujours débordé ? Pire, c'est vous qui formez tout le monde ? 5 signaux du patron-goulot et protocole en 4 étapes pour en sortir.",
    tldr: "Vous avez déployé l'IA et vous êtes toujours débordé — pire, c'est vous qui formez tout le monde ? 5 signaux du patron-goulot et un protocole en 4 étapes pour en sortir.",
    tags: ["IA", "PME"],
    readTime: "10 min",
    image: "/images/blog/patron-goulot-paradoxe-ia-dirigeant-pme.webp",
    sectors: ["Tous"],
    pains: ["goulot"],
  },
  {
    slug: "ia-contradicteur-prompts-dirigeant-pme",
    title: "L'IA comme contradicteur : 5 prompts pour challenger vos décisions",
    excerpt:
      "ChatGPT vous donne toujours raison ? 5 prompts copiables pour transformer l'IA en contradicteur honnête et identifier vos angles morts avant chaque décision structurante.",
    tldr: "ChatGPT vous donne toujours raison ? 5 prompts copiables pour transformer l'IA en contradicteur honnête et débusquer vos angles morts avant chaque décision structurante.",
    tags: ["IA", "PME"],
    readTime: "9 min",
    image: "/images/blog/ia-contradicteur-prompts-dirigeant-pme.webp",
    sectors: ["Tous"],
    pains: ["goulot", "demarrage"],
  },
  {
    slug: "rapport-adoption-ia-btp-francilien-2026",
    title: "Rapport 2026 : Adoption de l'IA dans le BTP francilien",
    excerpt:
      "Tableau de maturité par sous-secteur (gros œuvre, second œuvre, artisanat, négoce) croisé avec les usages IA réels en 2026. Sources publiques + observations terrain 78/95.",
    tldr: "Tableau de maturité IA par sous-secteur du BTP (gros œuvre, second œuvre, artisanat, négoce), croisé avec les usages réels en 2026. Sources publiques + terrain 78/95 — pour situer votre entreprise.",
    tags: ["IA", "PME", "Rapport sectoriel"],
    readTime: "6 min",
    image: "/images/blog/rapport-adoption-ia-btp-francilien-2026.webp",
    sectors: ["BTP & rénovation"],
    pains: ["demarrage"],
  },
  {
    slug: "configurer-odoo-ia-claude-cowork",
    title: "Configurer Odoo avec l'IA : 4 Jours au Lieu de 3 500 €",
    excerpt:
      "Comment nous avons reconfiguré tout Odoo d'un client en 4 jours avec Claude Cowork.",
    tldr: "Comment nous avons reconfiguré tout l'Odoo d'un client en 4 jours avec Claude Cowork, au lieu de payer 3 500 € à un intégrateur. L'équipe ressort autonome.",
    tags: ["IA", "PME"],
    readTime: "12 min",
    image: "/images/blog/configurer-odoo-ia-claude-cowork.webp",
    sectors: ["Tous", "Industrie", "Commerce & service local"],
    pains: ["prestataire", "demarrage"],
  },
  {
    slug: "veille-concurrentielle-ia-pme",
    title: "Veille Concurrentielle IA pour PME : Guide Pratique 2026",
    excerpt:
      "Comment automatiser votre veille concurrentielle avec l'IA. Méthode en 5 étapes, outils testés et retour d'expérience terrain.",
    tldr: "Automatiser votre veille concurrentielle : méthode en 5 étapes, outils testés et retour terrain. 4-6 h/semaine de veille manuelle supprimées, zéro angle mort.",
    tags: ["IA", "PME"],
    readTime: "8 min",
    image: "/images/blog/veille-concurrentielle-ia-pme.webp",
    sectors: ["Tous"],
    pains: ["repetitif", "leads"],
  },
  {
    slug: "automatiser-emails-reseaux-sociaux-ia",
    title: "Automatiser Emails et Réseaux Sociaux avec l'IA en PME",
    excerpt:
      "Gagnez 10h par semaine en automatisant vos emails et publications sociales avec l'IA.",
    tldr: "Gagnez ~10 h/semaine en automatisant emails et publications sociales avec l'IA : les chaînes concrètes, les outils, et les limites à connaître avant de tout déléguer.",
    tags: ["IA", "Productivité"],
    readTime: "7 min",
    image: "/images/blog/automatiser-emails-reseaux-sociaux-ia.webp",
    sectors: ["Tous"],
    pains: ["repetitif"],
  },
  {
    slug: "cout-audit-informatique-yvelines",
    title: "Combien coûte un audit informatique PME ?",
    tldr: "Les fourchettes de prix réelles d'un audit informatique ou de cybersécurité (0 € à 20 000 €), ce qui fait varier la facture, et comment éviter de payer pour du vent.",
    tags: ["Audit 360°", "PME"],
    readTime: "8 min",
    image: "/images/blog/cout-audit-informatique-yvelines.webp",
    sectors: ["Tous"],
    pains: ["prestataire", "demarrage"],
  },
  {
    slug: "nis2-pme-yvelines-val-doise",
    title: "NIS2 PME : Guide + Checklist de Conformité 2026",
    tldr: "NIS2 vous concerne-t-il ? Qui est concerné, quelles obligations, quels délais — et la checklist des 10 mesures à cocher pour commencer concrètement.",
    tags: ["Cybersécurité", "PME"],
    readTime: "10 min",
    image: "/images/blog/nis2-pme-yvelines-val-doise.webp",
    sectors: ["Tous", "Industrie"],
    pains: ["cyber"],
  },
  {
    slug: "serveur-mcp-guide-pratique-pme",
    title: "Serveur MCP : Connecter l'IA à Vos Outils Métier",
    tldr: "MCP, c'est le câble qui branche l'IA sur vos vrais outils (ERP, CRM, fichiers). Ce que ça change concrètement, et comment démarrer sans usine à gaz.",
    tags: ["IA", "Intégration"],
    readTime: "8 min",
    image: "/images/blog/serveur-mcp-guide-pratique-pme.webp",
    sectors: ["Tous", "Industrie"],
    pains: ["prestataire", "demarrage"],
  },
  {
    slug: "serveur-mcp-integration-crm-erp",
    title: "Intégrer un Agent IA à Votre CRM/ERP : Pourquoi MCP Change la Donne",
    tldr: "Brancher un agent IA directement sur votre CRM/ERP via MCP : les cas d'usage qui font gagner du temps commercial, et les pièges d'intégration à anticiper.",
    tags: ["IA", "Commercial"],
    readTime: "7 min",
    image: "/images/blog/serveur-mcp-integration-crm-erp.webp",
    sectors: ["Tous", "Commerce & service local"],
    pains: ["leads", "prestataire"],
  },
  {
    slug: "machine-de-guerre-commerciale",
    title: "Rénovation Énergétique : construisez votre machine de guerre commerciale",
    tldr: "Rénovation énergétique : le système d'acquisition + traitement de leads qui transforme les demandes en chantiers signés. Le plus rapide rafle le marché.",
    tags: ["IA", "Commercial"],
    readTime: "3 min",
    image: "/images/blog/augmenter-pro-village-renovation-hero.webp",
    sectors: ["BTP & rénovation"],
    pains: ["leads"],
  },
  {
    slug: "ia-redefinit-vente-commerciale",
    title: "Comment l'IA redéfinit la Vente Commerciale",
    tldr: "Où l'IA fait vraiment la différence dans un cycle de vente B2B — et où elle ne sert à rien. Pour muscler le commercial sans gadget.",
    tags: ["IA", "Commercial"],
    readTime: "3 min",
    image: "/images/blog/ia-redefinit-vente-commerciale.webp",
    sectors: ["Tous"],
    pains: ["leads"],
  },
  {
    slug: "claude-code-prompt-architecture",
    title: "Utiliser Claude Code sans ce prompt est une perte de temps",
    tldr: "Le prompt système à coller AVANT tout projet Claude Code : il transforme l'agent en architecte qui respecte votre structure. Sans lui, vous perdez votre temps.",
    tags: ["Claude Code"],
    readTime: "2 min",
    image: "/images/blog/claude-code-prompt-architecture.webp",
    sectors: ["Tous", "Industrie"],
    pains: ["prestataire", "demarrage"],
  },
  {
    slug: "comparatif-llm-vente-commerciale",
    title: "Comparatif : Forces et Faiblesses des LLM dans la Vente",
    tldr: "ChatGPT, Claude, Gemini : lequel pour quelle tâche commerciale ? Le comparatif sans langue de bois, usage par usage.",
    tags: ["IA"],
    readTime: "5 min",
    image: "/images/blog/comparatif-llm-vente-commerciale.webp",
    sectors: ["Tous"],
    pains: ["leads", "demarrage"],
  },
  {
    slug: "5-signes-moderniser-informatique-pme",
    title: "5 signes qu'il est temps de moderniser l'informatique de votre PME",
    tldr: "5 signaux concrets que votre informatique vous freine (et coûte plus qu'elle ne rapporte) — et par quoi commencer pour moderniser sans tout casser.",
    tags: ["Audit 360°", "PME"],
    readTime: "3 min",
    image: "/images/blog/5-signes-moderniser-informatique-pme.webp",
    sectors: ["Tous"],
    pains: ["demarrage", "prestataire"],
  },
];

// ─── IDÉES (source de vérité de /idees) ────────────────────────────────────

export interface EnrichedIdea extends IdeaData {
  palette: Palette;
  sector: Exclude<IdeeSector, "Tout">;
  /** Slug d'article blog connexe — la card devient cliquable et reçoit un badge. */
  articleSlug?: string;
  hrefLabel?: string;
  /** Douleurs adressées — pour le filtrage du hub. */
  pains: PainId[];
}

export const IDEAS: EnrichedIdea[] = [
  {
    number: "01",
    title: "Voicebot qui décroche tous vos appels",
    description:
      "Un agent vocal IA répond 24/7, qualifie acheteur/vendeur/budget/secteur, pousse la fiche dans le CRM et déclenche la relance. Fini les appels manqués le samedi.",
    pros: [
      "+28 % de conversion, ROI 2-4 mois",
      "Couverture soir + week-end (créneau prospects)",
      "60-70 % du temps négociateur libéré des leads froids",
    ],
    cons: [
      "Acceptabilité variable selon la cible (vendeurs seniors)",
      "Scénario à calibrer au marché local sinon brûle des leads chauds",
    ],
    seed: 1.1,
    palette: "violet",
    sector: "Immobilier",
    pains: ["leads", "repetitif"],
  },
  {
    number: "02",
    title: "Annonces immo SEO en 30 secondes",
    description:
      "Pipeline qui prend les caractéristiques du bien + 5 photos et sort annonce portails + texte SEO Google + post LinkedIn/Insta calibré sur la cible.",
    pros: [
      "Temps de rédaction divisé par 3 à 4",
      "Cohérence éditoriale sur toute l'équipe",
      "Variantes par persona (primo-accédant, investisseur)",
    ],
    cons: [
      "Révision humaine obligatoire (la « petite phrase qui vend »)",
      "Risque de doublons SEO si tous les agents du secteur utilisent le même outil",
    ],
    seed: 2.3,
    palette: "amber",
    sector: "Immobilier",
    pains: ["repetitif", "leads"],
  },
  {
    number: "03",
    title: "Pré-scoring dossier emprunteur en 30 s",
    description:
      "L'IA lit bulletins, avis d'imposition et relevés bancaires, calcule capacité et taux d'endettement selon les grilles des 15 banques principales, sort un GO/NO-GO avant de monter le dossier.",
    pros: [
      "Analyse documentaire : 70 % du temps admin récupéré",
      "Détection auto des incohérences (revenus vs flux)",
      "Plus de dossiers non finançables qui dorment",
    ],
    cons: [
      "Dépendance OCR — contrôle humain obligatoire",
      "AI Act (août 2026) : scoring crédit = haut risque, traçabilité renforcée",
    ],
    seed: 3.5,
    palette: "cold",
    sector: "Courtage",
    pains: ["repetitif", "leads"],
  },
  {
    number: "04",
    title: "Pipeline courtier + relances bancaires auto",
    description:
      "CRM courtier dopé IA : vue pipeline (banque, pièces manquantes), relances mail+SMS conditionnelles, génération de courriers, signature électronique. Délai de réponse de principe en 48-72 h.",
    pros: [
      "Délai moyen de relance client : 3,2 j → 45 min",
      "Aucun dossier qui dort (alerte auto J+5)",
      "Vision pipeline temps réel pour le dirigeant",
    ],
    cons: [
      "150-600 €/mois selon suite, 5-15 k€ pour du sur-mesure IOBSP",
      "Connecteurs banques limités sur les acteurs régionaux",
    ],
    seed: 4.1,
    palette: "duo",
    sector: "Courtage",
    pains: ["repetitif", "goulot"],
  },
  {
    number: "05",
    title: "Devis chantier depuis 5 photos",
    description:
      "L'artisan envoie 3-5 photos + une description vocale, l'IA sort un devis structuré (postes, métrés estimés, MaPrimeRénov éligible, CEE). Le plus rapide rafle le chantier.",
    pros: [
      "Devis : 4 h → 40 min, +28 % de transformation",
      "+31 % de marge nette sur entreprises équipées",
      "Relances incluses jusqu'à la signature",
    ],
    cons: [
      "Métrés depuis photo restent approximatifs : validation terrain",
      "Inutile sans canal d'acquisition propriétaire en amont",
    ],
    seed: 5.2,
    palette: "warm",
    sector: "BTP",
    articleSlug: "machine-de-guerre-commerciale",
    hrefLabel: "Méthode complète",
    pains: ["leads", "repetitif"],
  },
  {
    number: "06",
    title: "Extraction d'actes notariés + clauses",
    description:
      "IA souveraine type Brain/Septeo intégrée au logiciel notarial : lit avant-contrats, contrats de réservation, offres de prêt, crée le dossier + fiche client, ébauche les clauses standard.",
    pros: [
      "≈ 21 minutes gagnées par dossier",
      "Hébergement France — argument compliance fort",
      "Standardisation des clauses sur tous les actes",
    ],
    cons: [
      "Validation notariale systématique obligatoire",
      "Coût licence éditeur métier (Septeo, Genapi)",
    ],
    seed: 6.4,
    palette: "mono",
    sector: "Notariat",
    pains: ["repetitif"],
  },
  {
    number: "07",
    title: "Agent WhatsApp réservation + avis Google",
    description:
      "Bot WhatsApp qui prend les RDV hors heures d'ouverture, confirme, relance la veille. Module séparé qui analyse les avis Google entrants, alerte sur les négatifs, suggère une réponse calibrée.",
    pros: [
      "8-10 h/semaine récupérées pour ~80 €/mois",
      "+32 % CA documenté (e-commerce) avec assistant conversationnel",
      "Réponse < 24 h aux avis = critère Google My Business",
    ],
    cons: [
      "Réponses génériques mal calibrées font fuir une clientèle de proximité",
      "Demande un script clair et une charte de ton",
    ],
    seed: 7.6,
    palette: "amber",
    sector: "Commerce",
    pains: ["repetitif", "leads"],
  },
  {
    number: "08",
    title: "Reconfigurer Odoo en 4 jours avec Claude",
    description:
      "Plutôt que payer 3 500 € à un intégrateur, on configure Studio + bons packages + paramétrage SaaS/SH directement avec Claude Cowork. L'équipe ressort autonome.",
    pros: [
      "4 jours au lieu de 3 500 € de prestation",
      "Équipe formée = plus de dépendance intégrateur",
      "Skill Claude qui lit la doc Odoo en temps réel",
    ],
    cons: [
      "Demande une vraie disponibilité d'un référent côté client",
      "Modules métier très custom (industrie) restent un chantier dédié",
    ],
    seed: 8.7,
    palette: "violet",
    sector: "Outils PME",
    articleSlug: "configurer-odoo-ia-claude-cowork",
    hrefLabel: "Cas client",
    pains: ["prestataire", "demarrage"],
  },
  {
    number: "09",
    title: "Veille concurrentielle automatisée",
    description:
      "Surveillance auto de 5-10 concurrents locaux et 3-5 nationaux : prix, recrutements, posts LinkedIn, nouveautés. Alertes ciblées et synthèse hebdo livrée par mail.",
    pros: [
      "4-6 h/semaine de veille manuelle supprimées",
      "Plus d'angles morts (un concurrent baisse ses prix = alerte J+0)",
      "Détection des opportunités réglementaires (NIS2, CSRD)",
    ],
    cons: [
      "Setup initial ~1 journée pour calibrer les sources",
      "Sans process de décision, les alertes finissent ignorées",
    ],
    seed: 9.3,
    palette: "cold",
    sector: "Outils PME",
    articleSlug: "veille-concurrentielle-ia-pme",
    hrefLabel: "Méthode 5 étapes",
    pains: ["repetitif", "leads"],
  },
  {
    number: "10",
    title: "Bot Telegram de gestion (IA + RAG + email)",
    description:
      "Un assistant privé sur Telegram branché sur vos données (RAG sur documents, CRM, compta) et votre boîte mail : vous demandez « relance les impayés de plus de 30 jours » ou « résume les mails clients d'aujourd'hui » depuis votre téléphone.",
    pros: [
      "Toute la boîte interrogeable depuis Telegram, sans ouvrir cinq logiciels",
      "RAG = réponses sourcées sur VOS documents, pas des généralités",
      "~30-45 min/jour récupérées sur les requêtes et relances courantes",
    ],
    cons: [
      "La qualité des réponses = la qualité de l'indexation : données en vrac, réponses en vrac",
      "Données qui transitent par Telegram + un LLM : hébergement et RGPD à cadrer avant d'y brancher la compta",
    ],
    seed: 10.4,
    palette: "violet",
    sector: "Outils PME",
    articleSlug: "agent-ia-dirigeant-pme",
    hrefLabel: "Créer son agent",
    pains: ["repetitif", "goulot"],
  },
  {
    number: "11",
    title: "Standard vocal IA avec votre voix de marque",
    description:
      "Un standard téléphonique IA qui décroche 24/7 avec une voix clonée sur la vôtre (≈ 30 s d'enregistrement) : il renseigne, qualifie, prend les rendez-vous et transfère les appels chauds à un humain.",
    pros: [
      "Plus aucun appel manqué le soir, le week-end ou pendant les pics",
      "Une voix cohérente avec la marque, pas un robot générique",
      "Prise de RDV et qualification automatiques, transfert des appels à enjeu",
    ],
    cons: [
      "Le clonage vocal exige le consentement explicite de la personne dont on reproduit la voix",
      "Une partie des clients refuse de parler à une IA : prévoir une bascule humaine immédiate, sinon on perd l'appel",
    ],
    seed: 11.2,
    palette: "amber",
    sector: "Commerce",
    pains: ["leads", "repetitif"],
  },
  {
    number: "12",
    title: "Vision intelligente de chantier (OmniVision)",
    description:
      "Des caméras couplées à un modèle de vision (type OmniVision) qui « comprend » l'image : détection des EPI manquants et zones à risque, suivi d'avancement, comptage de matériel. Alerte en temps réel et rapport automatique.",
    pros: [
      "Contrôle sécurité continu sans ronde manuelle systématique",
      "Suivi d'avancement chiffré depuis les images, reporting auto au client",
      "Traçabilité précieuse en cas de litige ou de contrôle",
    ],
    cons: [
      "Filmer des personnes au travail = cadre strict (information, CSE, RGPD, durée de conservation)",
      "Les modèles de vision se trompent : faux positifs/négatifs à calibrer site par site avant de s'y fier",
    ],
    seed: 12.5,
    palette: "warm",
    sector: "BTP",
    pains: ["repetitif"],
  },
  {
    number: "13",
    title: "Base de connaissance IA interne (anti patron-goulot)",
    description:
      "Un assistant entraîné sur VOS procédures, devis types, fiches techniques et historique : l'équipe (et les nouveaux) se servent eux-mêmes au lieu de venir vous demander. Le savoir sort de votre tête.",
    pros: [
      "Moins d'interruptions : les questions récurrentes trouvent réponse sans vous",
      "Onboarding accéléré — un nouvel arrivant est opérationnel plus vite",
      "Le savoir-faire reste dans l'entreprise, même en cas de départ",
    ],
    cons: [
      "Une base mal tenue diffuse des infos périmées avec aplomb : il faut un référent qui la maintient",
      "Demande un minimum de mise en forme des procédures au départ (rien n'est magique sur du non-écrit)",
    ],
    seed: 13.3,
    palette: "cold",
    sector: "Outils PME",
    articleSlug: "patron-goulot-paradoxe-ia-dirigeant-pme",
    hrefLabel: "Le patron-goulot",
    pains: ["goulot", "prestataire"],
  },
  {
    number: "14",
    title: "Copilote cybersécurité PME",
    description:
      "Un copilote qui surveille les signaux faibles (connexions douteuses, partages anormaux, mises à jour en retard), explique le risque en français et guide la réponse étape par étape — sans jargon ni SOC à cinq chiffres.",
    pros: [
      "Couvre l'essentiel du risque sans recruter ni payer un SOC complet",
      "Alertes traduites en actions concrètes pour un dirigeant non-technique",
      "Aide à documenter pour NIS2 et l'assurance cyber",
    ],
    cons: [
      "Ne remplace pas une vraie réponse à incident grave : un humain compétent reste indispensable le jour J",
      "Trop d'alertes mal calibrées = on finit par toutes les ignorer (à régler finement)",
    ],
    seed: 14.6,
    palette: "mono",
    sector: "Outils PME",
    articleSlug: "cybersecurite-pme-guide-pratique",
    hrefLabel: "Le guide cyber",
    pains: ["cyber", "demarrage"],
  },
  {
    number: "15",
    title: "Pré-compta : lecture des factures fournisseurs (OCR + IA)",
    description:
      "L'IA lit les factures fournisseurs (PDF, photos, mails), extrait montants, TVA et échéances, les pousse en compta et signale les anomalies (doublon, écart bon de commande). La saisie disparaît.",
    pros: [
      "Saisie manuelle quasi supprimée — plusieurs heures/semaine récupérées",
      "Détection des doublons et des écarts avant paiement",
      "Moins de dépendance au cabinet comptable pour la saisie pure",
    ],
    cons: [
      "L'OCR se trompe sur les factures exotiques : un contrôle humain reste nécessaire",
      "Intégration à votre logiciel comptable pas toujours native (connecteur à vérifier)",
    ],
    seed: 15.1,
    palette: "duo",
    sector: "Outils PME",
    pains: ["repetitif", "prestataire"],
  },
  {
    number: "16",
    title: "Assistant de conformité NIS2",
    description:
      "Un assistant qui lit votre situation, déroule les 10 mesures NIS2 en langage dirigeant, vous dit lesquelles sont couvertes et lesquelles manquent, et génère le début de votre politique de sécurité et de votre registre d'incidents.",
    pros: [
      "Transforme une directive abstraite en checklist actionnable et priorisée",
      "Prépare les documents que vos donneurs d'ordres vont exiger (politique, PRA, registre)",
      "Anticipe l'obligation avant que le client ne vous envoie son questionnaire cyber",
    ],
    cons: [
      "Ne remplace pas un audit humain pour les entités essentielles à fort enjeu",
      "La conformité reste un processus continu : l'assistant amorce, il ne maintient pas tout seul",
    ],
    seed: 16.4,
    palette: "violet",
    sector: "Outils PME",
    articleSlug: "nis2-pme-yvelines-val-doise",
    hrefLabel: "Le guide NIS2",
    pains: ["cyber", "prestataire"],
  },
];

// ─── Ressource unifiée du hub ──────────────────────────────────────────────

export interface HubResource {
  id: string;
  type: ResourceType;
  typeLabel: string;
  title: string;
  /** TL;DR — verdict actionnable, lu en 10 s. */
  tldr: string;
  href: string;
  /** Métadonnée courte affichée sous le titre (durée, secteur, difficulté…). */
  meta: string;
  sectors: Sector[];
  pains: PainId[];
}

function articleToResource(a: CatalogArticle): HubResource {
  return {
    id: `article-${a.slug}`,
    type: "article",
    typeLabel: "Article",
    title: a.title,
    tldr: a.tldr,
    href: `/blog/${a.slug}`,
    meta: `${a.readTime} de lecture`,
    sectors: a.sectors,
    pains: a.pains,
  };
}

function ideaToResource(i: EnrichedIdea): HubResource {
  return {
    id: `idee-${i.number}`,
    type: "idee",
    typeLabel: "Idée chiffrée",
    title: i.title,
    tldr: i.description,
    href: i.articleSlug ? `/blog/${i.articleSlug}` : "/idees",
    meta: i.sector,
    sectors: IDEE_TO_HUB_SECTOR[i.sector],
    pains: i.pains,
  };
}

// Mapping catégorie de prompt → douleur(s). Surchargé au cas par cas ci-dessous.
const PROMPT_CATEGORY_PAINS: Record<PromptCategory, PainId[]> = {
  commercial: ["leads"],
  productivite: ["repetitif", "goulot"],
  marketing: ["leads", "repetitif"],
  "erp-outils": ["prestataire", "repetitif"],
  "strategie-ia": ["demarrage"],
  cybersecurite: ["cyber"],
};

const PROMPT_PAIN_OVERRIDES: Record<string, PainId[]> = {
  "automatisation-crm": ["leads", "repetitif", "prestataire"],
  "odoo-configuration": ["prestataire", "repetitif", "demarrage"],
  "claude-code-architecte": ["prestataire", "demarrage"],
  "audit-projet-claude-fable": ["prestataire", "demarrage"],
  "audit-ia-pme": ["demarrage", "prestataire"],
};

const PROMPT_SECTOR_OVERRIDES: Record<string, Sector[]> = {
  "odoo-configuration": ["Tous", "Industrie", "Commerce & service local"],
};

const PROMPT_DIFFICULTY_LABEL: Record<Prompt["difficulty"], string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

export function promptToResource(p: Prompt): HubResource {
  return {
    id: `prompt-${p.id}`,
    type: "prompt",
    typeLabel: "Prompt",
    title: p.title,
    tldr: p.description,
    href: "/prompts",
    meta: `${PROMPT_DIFFICULTY_LABEL[p.difficulty]} · ${p.estimatedTime}`,
    sectors: PROMPT_SECTOR_OVERRIDES[p.id] ?? ["Tous"],
    pains: PROMPT_PAIN_OVERRIDES[p.id] ?? PROMPT_CATEGORY_PAINS[p.category],
  };
}

/**
 * Construit la liste unifiée des ressources du hub.
 * `prompts` est passé en argument pour éviter d'embarquer le contenu volumineux
 * des prompts dans les bundles de /blog et /idees (cf. note d'en-tête).
 */
export function buildHubResources(prompts: Prompt[]): HubResource[] {
  return [
    ...ARTICLES.map(articleToResource),
    ...IDEAS.map(ideaToResource),
    ...prompts.map(promptToResource),
  ];
}

// ─── Lookup & articles liés (refonte lecture article) ──────────────────────

/** Retrouve une entrée article du catalog par son slug. */
export function getArticleBySlug(slug: string): CatalogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/**
 * Articles liés à `slug`, classés par proximité éditoriale.
 * Score : douleur commune +4, secteur exact commun +3, secteur transversal "Tous" +1.
 * Même barème que le scoring du hub (augmenter-view.tsx).
 */
export function getRelatedArticles(slug: string, n = 3): CatalogArticle[] {
  const source = getArticleBySlug(slug);
  if (!source) return [];

  const sourceSectors = new Set(source.sectors);
  const sourcePains = new Set(source.pains);

  return ARTICLES.filter((a) => a.slug !== slug)
    .map((a) => {
      let score = 0;
      for (const p of a.pains) if (sourcePains.has(p)) score += 4;
      for (const s of a.sectors) {
        if (s === "Tous") score += 1;
        else if (sourceSectors.has(s)) score += 3;
      }
      return { article: a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, n)
    .map((x) => x.article);
}
