/**
 * Note de candidature spontanée — Arlequin AI (Forward Deployed Engineer).
 *
 * Page unlisted `/notes/arlequin` : lisible par URL, jamais indexée, jamais
 * maillée depuis le site. Source de vérité du copy ; la vue n'en duplique pas
 * les chaînes. Le cas client lié est l'article public anonymisé (🟢), pas le
 * portail `/clients/reva9` (🔴 prix, nominatif, M&A).
 */

export const ARLEQUIN_NOTE_PATH = "/notes/arlequin";

export const ARLEQUIN_NOTE_META = {
  title: "Le siège manquant — Pierre Legrand",
  description:
    "Candidature spontanée Arlequin AI. Le siège manquant entre vos ingénieurs et vos clients : Forward Deployed Engineer, Pierre Legrand.",
  dateISO: "2026-09-10",
} as const;

export const ARLEQUIN_STATS = [
  { value: "6", label: "Ingénierie et R&D", emphasis: false },
  { value: "2", label: "Produit et design", emphasis: false },
  { value: "2", label: "Vente", emphasis: false },
  { value: "0", label: "Déploiement chez le client", emphasis: true },
] as const;

export const ARLEQUIN_LIMITS = [
  "Je ne viens pas de la défense. Les marchés publics de ce secteur sont un monde que je ne connais pas, et je n'ai pas de réseau à y apporter.",
  "Je ne suis pas chercheur. Vos réseaux de neurones topologiques, je saurai les déployer et les instrumenter, pas les faire progresser.",
  "Je n'ai jamais porté de quota de logiciel d'entreprise. J'ai vendu des dossiers et des financements, pas des licences. C'est pourquoi je ne réponds pas à votre annonce d'Account Executive : le siège que je décris ici est celui où mon parcours sert, l'autre est celui où il manquerait.",
] as const;

export interface ArlequinWork {
  title: string;
  href: string;
  external: boolean;
  body: string;
}

/** Trois destinations derrière le seul lien de la candidature. */
export const ARLEQUIN_WORKS: readonly ArlequinWork[] = [
  {
    title: "augmenter.pro",
    href: "/",
    external: false,
    body: "Mon activité : conseil et delivery IA pour PME. La plateforme SaaS que j'édite y est décrite.",
  },
  {
    title: "Trois référentiels",
    href: "/blog/configurer-odoo-ia-claude-cowork",
    external: false,
    body: "Une mission de bout en bout, chiffrée et anonymisée : un catalogue de 7 800 références, un stock invisible au moment de vendre et une comptabilité qui ne se rapprochait plus, remis d'aplomb en cinq mois. C'est le meilleur aperçu de ma méthode de déploiement.",
  },
  {
    title: "linkedin.com/in/legrand-pierre",
    href: "https://www.linkedin.com/in/legrand-pierre/",
    external: true,
    body: "Parcours complet.",
  },
];

export const ARLEQUIN_CONTACT = {
  name: "Pierre Legrand",
  role: "ingénieur logiciel, ancien directeur du développement",
  email: "pro@pierrelegrand.fr",
  phoneDisplay: "06 79 11 97 74",
  phoneHref: "tel:+33679119774",
  siteLabel: "augmenter.pro",
  siteHref: "/",
} as const;
