/**
 * Juge du chantier Discover / format « news » (ADR 0007).
 *
 * Dégât réel évité : sans la directive `max-image-preview:large`, Google
 * n'affiche qu'une vignette dans Discover, et une carte à vignette n'y est
 * presque jamais servie. Les articles de fond perdent alors la seule surface
 * où Google les pousse sans requête. La directive vit dans le layout racine ;
 * une page qui redéclare `robots` la remplace entièrement (la fusion de
 * metadata de Next est superficielle) et doit donc être une page noindex.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ARTICLES, articleSchemaType } from "@/data/resources";
import { GET } from "../app/news-sitemap.xml/route";
import { webpDimensions } from "./image-dimensions";
import * as seoPolicy from "./seo-policy";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Toutes les `page.tsx` sous `src/app`, chemins relatifs à la racine. */
function pageFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return pageFiles(full);
    return entry.name === "page.tsx" ? [relative(root, full)] : [];
  });
}

/** Constantes `*_ROBOTS` exportées par `seo-policy.ts` (toutes noindex). */
const POLICY_ROBOTS = Object.keys(seoPolicy).filter((name) =>
  name.endsWith("_ROBOTS"),
);

describe("Discover : directive d'aperçu d'image (DN-0)", () => {
  const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8");

  it("le layout racine déclare max-image-preview: large pour googleBot", () => {
    const robots = layout.match(/robots:\s*\{[\s\S]*?googleBot:\s*\{([\s\S]*?)\}/);
    expect(robots, "bloc robots.googleBot absent du layout racine").not.toBeNull();
    const googleBot = robots![1];
    expect(googleBot).toMatch(/["']max-image-preview["']:\s*["']large["']/);
    expect(googleBot).toMatch(/["']max-snippet["']:\s*-1\b/);
    expect(googleBot).toMatch(/["']max-video-preview["']:\s*-1\b/);
    expect(googleBot).toMatch(/\bindex:\s*true\b/);
    expect(googleBot).toMatch(/\bfollow:\s*true\b/);
  });

  it("seo-policy n'expose que des constantes robots noindex", () => {
    expect(POLICY_ROBOTS.length).toBeGreaterThanOrEqual(3);
    for (const name of POLICY_ROBOTS) {
      const value = (seoPolicy as Record<string, unknown>)[name];
      expect(value, name).toMatchObject({ index: false });
    }
  });

  it("toute page qui redéclare robots est noindex (constante seo-policy ou index: false)", () => {
    const pages = pageFiles(join(root, "src/app"));
    // Anti-vacuum : un walk cassé ne doit pas passer au vert.
    expect(pages.length).toBeGreaterThanOrEqual(40);

    const offenders: string[] = [];
    for (const page of pages) {
      const source = readFileSync(join(root, page), "utf8");
      for (const match of source.matchAll(/\brobots:\s*([A-Z_]+\b|\{[^}]*\})/g)) {
        const value = match[1];
        const fromPolicy =
          POLICY_ROBOTS.includes(value) &&
          /from\s+["']@\/lib\/seo-policy["']/.test(source);
        const noindex = /^\{[^}]*\bindex:\s*false\b/.test(value);
        if (!fromPolicy && !noindex) offenders.push(`${page} → robots: ${value}`);
      }
      // Une forme non reconnue (variable locale, appel) est aussi un écart.
      for (const match of source.matchAll(/\brobots:\s*(?![A-Z_]+\b|\{)(\S+)/g)) {
        offenders.push(`${page} → robots: ${match[1]}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

/** Largeur minimale d'un visuel servi en grand format dans Discover. */
const DISCOVER_MIN_WIDTH = 1200;

/**
 * Visuels connus trop étroits pour Discover, en attente de remplacement par
 * Pierre (tâche H-N0 de docs/backlog-news.md). Les visuels ne se régénèrent
 * pas dans la boucle. Retirer le slug dès que son visuel est remplacé.
 */
const DISCOVER_IMAGE_EXCEPTIONS: string[] = [
  // augmenter-pro-village-renovation-hero.webp : 784 × 1168, portrait (H-N0).
  "machine-de-guerre-commerciale",
];

describe("Discover : visuels d'article (DN-1)", () => {
  it(`chaque article a un visuel WebP d'au moins ${DISCOVER_MIN_WIDTH} px de large`, () => {
    // Anti-vacuum : un catalog vidé ne doit pas passer au vert.
    expect(ARTICLES.length).toBeGreaterThanOrEqual(30);

    const offenders: string[] = [];
    for (const article of ARTICLES) {
      if (DISCOVER_IMAGE_EXCEPTIONS.includes(article.slug)) continue;
      let buf: Buffer;
      try {
        buf = readFileSync(join(root, "public", article.image));
      } catch {
        offenders.push(`${article.slug} → ${article.image} absent`);
        continue;
      }
      const size = webpDimensions(buf);
      if (!size) offenders.push(`${article.slug} → ${article.image} n'est pas un WebP lisible`);
      else if (size.width < DISCOVER_MIN_WIDTH)
        offenders.push(`${article.slug} → ${article.image} ${size.width} × ${size.height}`);
    }
    expect(offenders).toEqual([]);
  });

  it("chaque exception de visuel désigne un article existant", () => {
    const slugs = new Set(ARTICLES.map((a) => a.slug));
    for (const slug of DISCOVER_IMAGE_EXCEPTIONS) expect(slugs.has(slug), slug).toBe(true);
  });
});

/**
 * Seuls articles « news » au 2026-10-14 (ADR 0007 §4). En ajouter un autre
 * est une décision éditoriale, pas un effet de bord : ce test doit rougir.
 */
const NEWS_SLUGS = ["bilan-ia-janvier-juillet-2026", "odoo-20-serveur-mcp-agents"];

describe("Type d'article : guide ou news (DN-2)", () => {
  it("exactement les deux articles prévus par l'ADR sont « news »", () => {
    // Anti-vacuum : un catalog vidé ne doit pas passer au vert.
    expect(ARTICLES.length).toBeGreaterThanOrEqual(30);
    const news = ARTICLES.filter((a) => a.kind === "news").map((a) => a.slug);
    expect(news.sort()).toEqual(NEWS_SLUGS);
  });

  it("chaque « news » a un datePublished AAAA-MM-JJ égal au dateISO de sa page", () => {
    const news = ARTICLES.filter((a) => a.kind === "news");
    expect(news.length).toBe(NEWS_SLUGS.length);
    for (const article of news) {
      expect(article.datePublished, article.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const page = readFileSync(join(root, "src/app/blog", article.slug, "page.tsx"), "utf8");
      const dateISO = page.match(/\bdateISO="([^"]+)"/);
      expect(dateISO, `${article.slug} : dateISO absent de la page`).not.toBeNull();
      expect(article.datePublished, article.slug).toBe(dateISO![1]);
    }
  });

  it("articleSchemaType : guide → Article, news → NewsArticle, inconnu → Article", () => {
    const guide = ARTICLES.find((a) => a.kind !== "news");
    const news = ARTICLES.find((a) => a.kind === "news");
    expect(articleSchemaType(guide)).toBe("Article");
    expect(articleSchemaType(news)).toBe("NewsArticle");
    expect(articleSchemaType(undefined)).toBe("Article");
  });

  it("ArticleLayout tire le @type du JSON-LD d'articleSchemaType", () => {
    const layout = readFileSync(join(root, "src/components/layout/article-layout.tsx"), "utf8");
    expect(layout).toMatch(/"@type":\s*articleSchemaType\(/);
    expect(layout).not.toMatch(/"@type":\s*"Article"/);
  });
});

describe("Sitemap news dynamique (DN-4)", () => {
  it("GET /news-sitemap.xml sert le XML news, cache CDN 5 min", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/^application\/xml\b/);
    expect(res.headers.get("cache-control")).toContain("s-maxage=300");
    const body = await res.text();
    expect(body).toContain('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"');
  });

  it("la route ne se fige pas au build (ni dynamic, ni revalidate)", () => {
    // Une route prérendue figerait la fenêtre de 48 h à la date du build :
    // le sitemap annoncerait des news périmées ou n'en annoncerait aucune.
    const route = readFileSync(join(root, "src/app/news-sitemap.xml/route.ts"), "utf8");
    expect(route).not.toMatch(/export\s+const\s+(dynamic|revalidate)\b/);
  });
});

describe("Règle de rédaction et doc (DN-5)", () => {
  // Une doc restée sur l'ancien interdit ferait refuser le format news au
  // prochain rédacteur, ou recréer un sitemap statique rempli de guides.
  it("CLAUDE.md dit l'état final et renvoie à l'ADR 0007", () => {
    const claude = readFileSync(join(root, "CLAUDE.md"), "utf8");
    expect(claude).not.toContain("ne pas recréer de news-sitemap");
    expect(claude).toContain("0007");
  });

  it("/create-article porte la règle du format news", () => {
    const cmd = readFileSync(join(root, ".claude/commands/create-article.md"), "utf8");
    expect(cmd).toContain("Format news");
    expect(cmd).toContain("NEWS_SLUGS");
  });

  it("la checklist SEO demande kind news pour un article daté, sans sitemap statique", () => {
    const checklist = readFileSync(join(root, ".claude/templates/seo/checklist.md"), "utf8");
    expect(checklist).toContain('`kind: "news"`');
    expect(checklist).not.toMatch(/\*\*Pas de news-sitemap\.\*\*/);
  });
});
