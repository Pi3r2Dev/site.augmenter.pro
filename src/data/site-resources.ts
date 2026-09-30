// src/data/site-resources.ts
// ─────────────────────────────────────────────────────────────────────────
// Carte des ressources d'aide à la décision — source unique.
//
// Alimente `/a-propos` (carte complète, groupée par intention du dirigeant)
// et la page 404 (version compacte + recherche sur les titres). Rien n'est
// recopié à la main : les articles, idées et prompts viennent du catalog
// `./resources` (via `buildHubResources`), la matrice de capacités de
// `./capabilities`. Seules les pages statiques (landings, outils) sont
// déclarées ici, avec leur verdict en une phrase.
//
// Une ressource appartient à UNE intention : la première douleur qu'elle
// adresse dans le catalog (`pains[0]`), qui est la plus pertinente par
// convention de saisie. Pas de doublon d'une intention à l'autre.
//
// ⚠ Même contrainte de bundle que `./resources` : ce module n'importe de
//   `./prompts` que les types. Le consommateur passe `prompts` en argument
//   (server component) ou une projection allégée (client component).
// ─────────────────────────────────────────────────────────────────────────

import type { Prompt } from "@/data/prompts";
import { CAPABILITIES } from "@/data/capabilities";
import {
  buildHubResources,
  getArticleBySlug,
  type HubResource,
  type PainId,
} from "@/data/resources";

// ─── Intentions du dirigeant (l'axe de groupement de la carte) ─────────────

export const INTENTS = [
  {
    id: "demarrage",
    label: "Je tourne autour de l'IA sans savoir par où commencer",
    short: "Par où commencer",
    pains: ["demarrage"],
  },
  {
    id: "temps",
    label: "Je perds mes journées en tâches répétitives, tout passe par moi",
    short: "Reprendre du temps",
    pains: ["repetitif", "goulot"],
  },
  {
    id: "leads",
    label: "Je laisse filer des leads, mon commercial plafonne",
    short: "Vendre plus",
    pains: ["leads"],
  },
  {
    id: "prestataire",
    label: "Je dépends d'un prestataire opaque ou trop cher",
    short: "Reprendre la main",
    pains: ["prestataire"],
  },
  {
    id: "cyber",
    label: "Je ne sais pas si mes données sont vraiment protégées",
    short: "Protéger",
    pains: ["cyber"],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  short: string;
  pains: readonly PainId[];
}>;

export type IntentId = (typeof INTENTS)[number]["id"];

const PAIN_TO_INTENT: Record<PainId, IntentId> = {
  demarrage: "demarrage",
  repetitif: "temps",
  goulot: "temps",
  leads: "leads",
  prestataire: "prestataire",
  cyber: "cyber",
};

// ─── Ressource unifiée de la carte ─────────────────────────────────────────

export type SiteResourceType = "page" | "outil" | "article" | "idee" | "prompt";

export interface SiteResource {
  id: string;
  type: SiteResourceType;
  typeLabel: string;
  title: string;
  /** Le verdict en une phrase — lu en 10 s, jamais un teaser. */
  tldr: string;
  href: string;
  intent: IntentId;
  /**
   * Décisivité : plus c'est haut, plus la ressource fait avancer une décision
   * à elle seule. Sert à choisir les entrées de la 404 (`pickDecisive`).
   */
  weight: number;
  /** Métadonnée courte (durée de lecture, prix, secteur…). */
  meta?: string;
}

const TYPE_LABEL: Record<SiteResourceType, string> = {
  page: "Page",
  outil: "Outil",
  article: "Article",
  idee: "Idée chiffrée",
  prompt: "Prompt",
};

// ─── Matrice de capacités : son verdict est calculé, pas écrit ─────────────

/** Compte des capacités par verdict — chiffres vivants, jamais figés à la main. */
export function capabilityCounts() {
  const counts = { production: 0, cadrer: 0, "pas-encore": 0 };
  for (const c of CAPABILITIES) counts[c.verdict] += 1;
  return counts;
}

function capabilitiesTldr(): string {
  const n = capabilityCounts();
  return `Croise ton métier et l'outil déjà en place : ${n.production} tâches déjà en production chez un client, ${n.cadrer} faisables à cadrer, ${n["pas-encore"]} qu'on refuse de livrer d'un coup — avec le cran par lequel on commence.`;
}

// ─── Pages statiques (landings, outils) — déclarées ici, une seule fois ────

interface StaticPage {
  id: string;
  type: "page" | "outil";
  title: string;
  tldr: string;
  href: string;
  intent: IntentId;
  weight: number;
  meta?: string;
}

const STATIC_PAGES: StaticPage[] = [
  // ── Par où commencer ─────────────────────────────────────────────────────
  {
    id: "hub",
    type: "outil",
    title: "Augmenter mon entreprise : le hub par secteur, douleur et objectif",
    tldr: "Ton secteur, ce qui te coûte le plus, ce que tu veux : le hub filtre toutes nos ressources et te sort le verdict en une phrase. Trois clics, pas trois heures de lecture.",
    href: "/augmenter-mon-entreprise",
    intent: "demarrage",
    weight: 100,
    meta: "Sélecteur 3 axes",
  },
  {
    id: "capacites",
    type: "outil",
    title: "Ce que l'IA sait faire chez toi : la matrice de capacités",
    tldr: capabilitiesTldr(),
    href: "/#capacites",
    intent: "demarrage",
    weight: 92,
    meta: "Métier × outil en place",
  },
  {
    id: "guide-2027",
    type: "outil",
    title: "Ma PME en 2027 : le guide d'achat en trois questions",
    tldr:
      getArticleBySlug("ma-pme-en-2027")?.tldr ??
      "Trois questions, une porte d'entrée et des fourchettes de prix signées : ce qu'on branche en premier, ce qu'on refuse encore de vendre.",
    href: "/blog/ma-pme-en-2027",
    intent: "demarrage",
    weight: 90,
    meta: "3 questions → une porte",
  },
  {
    id: "audit-ia-pme",
    type: "page",
    title: "Audit IA pour PME : diagnostic et feuille de route chiffrée",
    tldr: "Avant d'acheter quoi que ce soit, on trie tes cas d'usage par retour sur investissement et on chiffre une feuille de route sur six mois. Le premier rendez-vous de 60 min n'est pas facturé.",
    href: "/audit-ia-pme",
    intent: "demarrage",
    weight: 86,
    meta: "180° non facturé · 360° à 550 €",
  },
  {
    id: "approche",
    type: "page",
    title: "Notre approche : quatre piliers, deux audits, les questions avant de signer",
    tldr: "La méthode en quatre piliers (technique, process, humain, vision), les deux portes d'entrée avec leurs prix, et les réponses aux questions qu'on nous pose avant de signer. Tout est écrit, y compris ce que ça coûte.",
    href: "/approche",
    intent: "demarrage",
    weight: 80,
    meta: "Méthode · prestations · FAQ",
  },
  {
    id: "strategie-ia-pme",
    type: "page",
    title: "Stratégie IA pour PME : cadrer une trajectoire sur six mois",
    tldr: "Pour la PME qui a dépassé le stade des essais et veut une trajectoire IA priorisée, avec les financements Bpifrance dans la réflexion. Diagnostic d'abord, plan ensuite.",
    href: "/strategie-ia-pme",
    intent: "demarrage",
    weight: 60,
    meta: "Feuille de route 6 mois",
  },

  // ── Reprendre la main sur ses outils ─────────────────────────────────────
  {
    id: "atelier",
    type: "page",
    title: "Atelier Claude Cowork & Claude Code pour dirigeant",
    tldr: "Une demi-journée en tête-à-tête pour prendre la main sur Claude, sur ton contexte réel : Cowork sans code dès 450 € HT, Code à 650 € HT le jour où un vrai projet le justifie. Présentiel 78/95 ou visio.",
    href: "/atelier-claude-code-dirigeant",
    intent: "prestataire",
    weight: 88,
    meta: "½ journée · dès 450 € HT",
  },
  {
    id: "integration-mcp",
    type: "page",
    title: "Intégration MCP : brancher l'IA sur ton ERP, ton CRM et tes mails",
    tldr: "Le protocole MCP donne à l'assistant l'accès à tes vraies données, sous tes droits. Lecture seule d'abord, écriture ensuite. Ce qu'on branche, dans quel ordre, et les tarifs indicatifs.",
    href: "/integration-mcp",
    intent: "prestataire",
    weight: 76,
    meta: "Audit · conception · intégration",
  },

  // ── Protéger ─────────────────────────────────────────────────────────────
  {
    id: "ia-souveraine",
    type: "page",
    title: "IA souveraine pour PME : tes données restent chez toi",
    tldr: "La souveraineté n'est pas un absolu, c'est un routage : l'ordinaire chez l'éditeur, le sensible sur une infrastructure administrée ou chez toi. Quatre niveaux réels, quatre crans pour décider.",
    href: "/ia-souveraine-pme",
    intent: "cyber",
    weight: 82,
    meta: "RGPD · AI Act · modèles ouverts",
  },
  {
    id: "audit-78",
    type: "page",
    title: "Audit informatique en Yvelines (78)",
    tldr: "Diagnostic IT en présentiel dans les Yvelines : réseau, sécurité, cloud, licences, RGPD. Soixante minutes sur rendez-vous pour savoir où tu en es avant de dépenser.",
    href: "/audit-informatique-yvelines",
    intent: "cyber",
    weight: 54,
    meta: "Présentiel 78",
  },
  {
    id: "audit-95",
    type: "page",
    title: "Audit informatique en Val d'Oise (95)",
    tldr: "Diagnostic IT en présentiel dans le Val d'Oise : réseau, sécurité, cloud, licences, RGPD. Soixante minutes sur rendez-vous pour savoir où tu en es avant de dépenser.",
    href: "/audit-informatique-val-doise",
    intent: "cyber",
    weight: 54,
    meta: "Présentiel 95",
  },

  // ── Reprendre du temps ───────────────────────────────────────────────────
  {
    id: "prompts",
    type: "outil",
    title: "La bibliothèque de prompts pour dirigeant de PME",
    tldr: "Des prompts prêts à coller dans ChatGPT ou Claude, classés par usage : commercial, productivité, marketing, ERP, stratégie IA, cybersécurité. Chacun avec son niveau et son temps d'exécution.",
    href: "/prompts",
    intent: "temps",
    weight: 70,
    meta: "Copier-coller",
  },
];

// ─── Construction ──────────────────────────────────────────────────────────

/** Les articles les plus récents (en tête du catalog) pèsent un peu plus. */
function catalogWeight(r: HubResource, index: number): number {
  const base = r.type === "article" ? 48 : r.type === "idee" ? 24 : 30;
  return Math.max(base - index, 1);
}

function fromHub(r: HubResource, index: number): SiteResource {
  const primary = r.pains[0] ?? "demarrage";
  return {
    id: r.id,
    type: r.type,
    typeLabel: TYPE_LABEL[r.type],
    title: r.title,
    tldr: r.tldr,
    href: r.href,
    intent: PAIN_TO_INTENT[primary],
    weight: catalogWeight(r, index),
    meta: r.meta,
  };
}

/**
 * La carte complète : pages statiques + catalog (articles, idées, prompts),
 * sans doublon d'URL. Quand une page statique cible la même URL qu'une entrée
 * du catalog (le guide 2027 est aussi un article), la déclaration statique
 * l'emporte : c'est elle qui porte l'intention et le poids.
 */
export function buildSiteResources(prompts: Prompt[]): SiteResource[] {
  const statics: SiteResource[] = STATIC_PAGES.map((p) => ({
    ...p,
    typeLabel: TYPE_LABEL[p.type],
  }));
  const seen = new Set(statics.map((s) => s.href));

  const hub = buildHubResources(prompts);
  const perTypeIndex: Record<string, number> = {};
  const catalog: SiteResource[] = [];
  for (const r of hub) {
    if (seen.has(r.href)) continue;
    seen.add(r.href);
    const i = perTypeIndex[r.type] ?? 0;
    perTypeIndex[r.type] = i + 1;
    catalog.push(fromHub(r, i));
  }

  return [...statics, ...catalog];
}

export interface IntentGroup {
  intent: (typeof INTENTS)[number];
  items: SiteResource[];
}

const TYPE_ORDER: Record<SiteResourceType, number> = {
  outil: 0,
  page: 1,
  article: 2,
  idee: 3,
  prompt: 4,
};

/**
 * Groupe par intention, dans l'ordre des INTENTS. À l'intérieur d'un groupe :
 * outils et pages d'abord, puis articles, idées, prompts ; à type égal, le
 * plus décisif en premier.
 */
export function groupByIntent(resources: SiteResource[]): IntentGroup[] {
  return INTENTS.map((intent) => ({
    intent,
    items: resources
      .filter((r) => r.intent === intent.id)
      .sort(
        (a, b) => TYPE_ORDER[a.type] - TYPE_ORDER[b.type] || b.weight - a.weight,
      ),
  }));
}

/** Les `n` ressources les plus décisives, toutes intentions confondues. */
export function pickDecisive(resources: SiteResource[], n = 8): SiteResource[] {
  return [...resources].sort((a, b) => b.weight - a.weight).slice(0, n);
}

// ─── Recherche sur les titres (404) ────────────────────────────────────────

/** Minuscules, sans accents, espaces normalisés — pour comparer sans surprise. */
export function normalizeText(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Projection minimale d'une ressource pour la recherche côté client. */
export interface SearchEntry {
  title: string;
  href: string;
  typeLabel: string;
}

export function toSearchIndex(resources: SiteResource[]): SearchEntry[] {
  return resources.map(({ title, href, typeLabel }) => ({ title, href, typeLabel }));
}

/**
 * Recherche « tous les mots » sur les titres, insensible aux accents et à la
 * casse. Moins de deux caractères utiles → aucun résultat (on n'affiche pas
 * tout le site sur une lettre).
 */
export function searchTitles<T extends { title: string }>(
  entries: T[],
  query: string,
  limit = 8,
): T[] {
  const q = normalizeText(query);
  if (q.length < 2) return [];
  const words = q.split(" ");
  return entries
    .filter((e) => {
      const t = normalizeText(e.title);
      return words.every((w) => t.includes(w));
    })
    .slice(0, limit);
}
