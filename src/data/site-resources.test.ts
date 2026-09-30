import { describe, expect, it } from "vitest";
import { ARTICLES, IDEAS } from "./resources";
import { prompts } from "./prompts";
import { CAPABILITIES } from "./capabilities";
import {
  INTENTS,
  buildSiteResources,
  capabilityCounts,
  groupByIntent,
  normalizeText,
  pickDecisive,
  searchTitles,
  toSearchIndex,
} from "./site-resources";

const ALL = buildSiteResources(prompts);

/** Pages de décision que la carte doit couvrir (périmètre fixé par le plan). */
const REQUIRED_HREFS = [
  "/augmenter-mon-entreprise",
  "/#capacites",
  "/blog/ma-pme-en-2027",
  "/prompts",
  "/ia-souveraine-pme",
  "/integration-mcp",
  "/strategie-ia-pme",
  "/audit-ia-pme",
  "/audit-informatique-yvelines",
  "/audit-informatique-val-doise",
  "/atelier-claude-code-dirigeant",
  "/approche",
];

describe("carte des ressources — construction depuis les données", () => {
  it("couvre toutes les pages de décision du périmètre", () => {
    const hrefs = new Set(ALL.map((r) => r.href));
    for (const href of REQUIRED_HREFS) {
      expect(hrefs.has(href), href).toBe(true);
    }
  });

  it("reprend chaque article et chaque idée du catalog, et chaque prompt", () => {
    const hrefs = new Set(ALL.map((r) => r.href));
    for (const a of ARTICLES) {
      expect(hrefs.has(`/blog/${a.slug}`), a.slug).toBe(true);
    }
    // Une idée pointe vers son article compagnon ou vers /idees : les deux
    // destinations doivent être dans la carte.
    for (const i of IDEAS) {
      const target = i.articleSlug ? `/blog/${i.articleSlug}` : "/idees";
      expect(hrefs.has(target), `idée ${i.number}`).toBe(true);
    }
    for (const p of prompts) {
      expect(hrefs.has(`/prompts#${p.id}`), p.id).toBe(true);
    }
  });

  it("n'a aucun doublon d'URL (la déclaration statique l'emporte sur le catalog)", () => {
    const hrefs = ALL.map((r) => r.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    const guide = ALL.find((r) => r.href === "/blog/ma-pme-en-2027");
    expect(guide?.type).toBe("outil");
  });

  it("donne à chaque entrée un titre, un verdict et une intention connue", () => {
    const intents = new Set<string>(INTENTS.map((i) => i.id));
    for (const r of ALL) {
      expect(r.title.length, r.id).toBeGreaterThan(8);
      expect(r.tldr.length, r.id).toBeGreaterThan(40);
      expect(intents.has(r.intent), r.id).toBe(true);
      expect(r.weight, r.id).toBeGreaterThan(0);
    }
  });

  it("n'emploie aucun mot interdit dans les verdicts des pages statiques", () => {
    for (const r of ALL.filter((r) => r.type === "page" || r.type === "outil")) {
      expect(r.tldr, r.id).not.toMatch(/\b(gratuit|offert)\w*/i);
      expect(r.title, r.id).not.toMatch(/\b(gratuit|offert)\w*/i);
    }
  });

  it("chiffre la matrice de capacités depuis ses données, pas à la main", () => {
    const n = capabilityCounts();
    expect(n.production + n.cadrer + n["pas-encore"]).toBe(CAPABILITIES.length);
    const matrice = ALL.find((r) => r.href === "/#capacites")!;
    expect(matrice.tldr).toContain(`${n.production} tâches déjà en production`);
    expect(matrice.tldr).toContain(`${n["pas-encore"]} qu'on refuse`);
  });
});

describe("groupement par intention", () => {
  const groups = groupByIntent(ALL);

  it("suit l'ordre des INTENTS et ne perd aucune ressource", () => {
    expect(groups.map((g) => g.intent.id)).toEqual(INTENTS.map((i) => i.id));
    const total = groups.reduce((n, g) => n + g.items.length, 0);
    expect(total).toBe(ALL.length);
  });

  it("n'a aucun groupe vide : chaque intention a au moins une ressource", () => {
    for (const g of groups) {
      expect(g.items.length, g.intent.id).toBeGreaterThan(0);
    }
  });

  it("place outils et pages avant les articles, idées et prompts", () => {
    for (const g of groups) {
      const order = g.items.map((r) =>
        r.type === "outil" || r.type === "page" ? 0 : r.type === "article" ? 1 : 2,
      );
      const sorted = [...order].sort((a, b) => a - b);
      expect(order, g.intent.id).toEqual(sorted);
    }
  });
});

describe("sélection compacte pour la 404", () => {
  it("retient les 8 entrées les plus décisives, hub en tête", () => {
    const top = pickDecisive(ALL, 8);
    expect(top).toHaveLength(8);
    expect(top[0].href).toBe("/augmenter-mon-entreprise");
    for (let i = 1; i < top.length; i++) {
      expect(top[i - 1].weight).toBeGreaterThanOrEqual(top[i].weight);
    }
  });

  it("projette un index de recherche sans le contenu des prompts", () => {
    const index = toSearchIndex(ALL);
    expect(index).toHaveLength(ALL.length);
    expect(Object.keys(index[0]).sort()).toEqual(["href", "title", "typeLabel"]);
    const serialized = JSON.stringify(index);
    // Le corps d'un prompt ne doit jamais partir dans le bundle de la 404.
    expect(serialized).not.toContain(prompts[0].content.slice(0, 60));
  });
});

describe("recherche sur les titres", () => {
  const index = toSearchIndex(ALL);

  it("normalise accents, casse et apostrophes", () => {
    expect(normalizeText("Écarts d’AUDIT à Jouy")).toBe("ecarts d audit a jouy");
  });

  it("trouve un titre sans les accents ni la casse", () => {
    const hits = searchTitles(index, "CYBERSECURITE");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every((h) => normalizeText(h.title).includes("cybersecurite"))).toBe(true);
  });

  it("exige tous les mots de la requête", () => {
    const hits = searchTitles(index, "odoo ia");
    expect(hits.length).toBeGreaterThan(0);
    for (const h of hits) {
      const t = normalizeText(h.title);
      expect(t).toContain("odoo");
      expect(t).toContain("ia");
    }
    // Un mot absent de tous les titres vide le résultat, même si l'autre matche.
    expect(searchTitles(index, "odoo zzzz")).toEqual([]);
  });

  it("ne renvoie rien sous deux caractères utiles, et borne les résultats", () => {
    expect(searchTitles(index, "a")).toEqual([]);
    expect(searchTitles(index, "  ")).toEqual([]);
    expect(searchTitles(index, "ia", 3).length).toBeLessThanOrEqual(3);
  });
});
