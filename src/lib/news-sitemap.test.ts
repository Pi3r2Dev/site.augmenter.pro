import { describe, expect, it } from "vitest";
import type { CatalogArticle } from "@/data/resources";
import { buildNewsSitemap } from "./news-sitemap";

// Horloge fixe : 2026-10-14 à midi UTC.
const NOW = new Date("2026-10-14T12:00:00Z");

function article(slug: string, overrides: Partial<CatalogArticle> = {}): CatalogArticle {
  return {
    slug,
    title: `Titre ${slug}`,
    tags: ["IA"],
    readTime: "5 min",
    image: `/images/blog/${slug}.webp`,
    tldr: "Verdict.",
    sectors: ["Tous"],
    pains: [],
    ...overrides,
  };
}

const news = (slug: string, datePublished: string, title?: string) =>
  article(slug, { kind: "news", datePublished, ...(title ? { title } : {}) });

describe("buildNewsSitemap — fenêtre de 48 h", () => {
  it("inclut une news publiée il y a 47 h", () => {
    // 2026-10-13T00:00Z + 47 h = 2026-10-14T23:00Z.
    const xml = buildNewsSitemap([news("a", "2026-10-13")], new Date("2026-10-14T23:00:00Z"));
    expect(xml).toContain("<loc>https://augmenter.pro/blog/a</loc>");
  });

  it("exclut une news publiée il y a 49 h", () => {
    const xml = buildNewsSitemap([news("a", "2026-10-12")], new Date("2026-10-14T01:00:00Z"));
    expect(xml).not.toContain("<loc>");
  });

  it("exclut une news datée de demain", () => {
    const xml = buildNewsSitemap([news("a", "2026-10-15")], NOW);
    expect(xml).not.toContain("<loc>");
  });

  it("n'inclut jamais un guide, même publié aujourd'hui", () => {
    const guides = [
      article("guide-implicite", { datePublished: "2026-10-14" }),
      article("guide-explicite", { kind: "guide", datePublished: "2026-10-14" }),
    ];
    expect(buildNewsSitemap(guides, NOW)).not.toContain("<loc>");
  });
});

describe("buildNewsSitemap — XML", () => {
  it("déclare les namespaces sitemap et news", () => {
    const xml = buildNewsSitemap([], NOW);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xml).toContain('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"');
  });

  it("produit un urlset vide valide quand rien n'est dans la fenêtre", () => {
    const xml = buildNewsSitemap([article("guide")], NOW);
    expect(xml).toMatch(/<urlset [^>]+>\s*<\/urlset>\s*$/);
    expect(xml).not.toContain("<url>");
  });

  it("pose publication, langue, date et titre de chaque news", () => {
    const xml = buildNewsSitemap([news("odoo", "2026-10-14", "Odoo 20")], NOW);
    expect(xml).toContain("<news:name>augmenter.PRO</news:name>");
    expect(xml).toContain("<news:language>fr</news:language>");
    expect(xml).toContain("<news:publication_date>2026-10-14</news:publication_date>");
    expect(xml).toContain("<news:title>Odoo 20</news:title>");
  });

  it("échappe le titre", () => {
    const xml = buildNewsSitemap([news("a", "2026-10-14", `R&D <IA> "vite" l'été`)], NOW);
    expect(xml).toContain("<news:title>R&amp;D &lt;IA&gt; &quot;vite&quot; l&apos;été</news:title>");
  });

  it("trie du plus récent au plus ancien", () => {
    const xml = buildNewsSitemap(
      [news("hier", "2026-10-13"), news("aujourdhui", "2026-10-14")],
      NOW,
    );
    expect(xml.indexOf("/blog/aujourdhui")).toBeGreaterThan(-1);
    expect(xml.indexOf("/blog/aujourdhui")).toBeLessThan(xml.indexOf("/blog/hier"));
  });

  it("plafonne à 1 000 URL", () => {
    const many = Array.from({ length: 1005 }, (_, i) => news(`n${i}`, "2026-10-14"));
    const xml = buildNewsSitemap(many, NOW);
    expect(xml.match(/<url>/g)?.length).toBe(1000);
  });
});
