import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import {
  NEWS_SITEMAP_ENABLED,
  NOINDEX_FOLLOW_PATHS,
  NOTES_PATH_PREFIX,
  PORTAL_PATH_PREFIX,
} from "./seo-policy";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Fichiers de maillage public : une URL unlisted n'a rien à y faire. */
const PUBLIC_GRAPH_FILES = [
  "public/sitemap.xml",
  "public/llms.txt",
  "public/llms-full.txt",
  "src/app/plan-du-site/page.tsx",
  "src/components/layout/footer.tsx",
  "src/components/layout/header.tsx",
  "src/app/approche/narrative/nav-fixed.tsx",
  "src/app/approche/narrative/shared/suite-cockpit.tsx",
] as const;

function pathPrefixRe(prefix: string): RegExp {
  return new RegExp(`${prefix}(?=[/"'\`\\s)])`);
}

function robotsGroupsAllowingRoot(): string[] {
  const robots = readFileSync(join(root, "public/robots.txt"), "utf8");
  return robots
    .split(/\r?\n[ \t]*\r?\n/)
    .filter((group) => /^User-agent:/m.test(group))
    .filter((group) => /^Allow: \/[ \t]*$/m.test(group));
}

describe("politique noindex légal", () => {
  it("liste les trois pages légales et désactive le news-sitemap", () => {
    expect([...NOINDEX_FOLLOW_PATHS]).toEqual([
      "/mentions-legales",
      "/cgv",
      "/politique-confidentialite",
    ]);
    expect(NEWS_SITEMAP_ENABLED).toBe(false);
  });

  it("n'expose plus les pages légales dans public/sitemap.xml", () => {
    const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
    for (const path of NOINDEX_FOLLOW_PATHS) {
      expect(sitemap).not.toContain(path);
    }
  });

  it("ne déclare plus le news-sitemap dans robots.txt", () => {
    const robots = readFileSync(join(root, "public/robots.txt"), "utf8");
    expect(robots).not.toContain("news-sitemap.xml");
    expect(robots).toContain("Sitemap: https://augmenter.pro/sitemap.xml");
  });

  it("n'embarque plus le fichier news-sitemap.xml", () => {
    expect(existsSync(join(root, "public/news-sitemap.xml"))).toBe(false);
  });

  it("garde les 3 articles à réindexer signalés rafraîchis (lastmod ≥ 2026-08-16)", () => {
    // Renforcés le 2026-08-16 pour sortir de « Détectée, non indexée » ; un
    // lastmod antérieur annulerait ce signal. Un lastmod plus récent est
    // légitime (ex. nettoyage JSON-LD site-wide du 2026-09-07).
    const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
    for (const slug of [
      "claude-cowork-community-manager",
      "machine-de-guerre-commerciale",
      "comparatif-llm-vente-commerciale",
    ]) {
      const match = sitemap.match(
        new RegExp(`/blog/${slug}</loc>\\s*<lastmod>(\\d{4}-\\d{2}-\\d{2})</lastmod>`),
      );
      expect(match, slug).not.toBeNull();
      expect(match![1] >= "2026-08-16", `${slug} lastmod=${match![1]}`).toBe(true);
    }
  });
});

describe("maillage des pages GSC « non indexées » utiles", () => {
  it("expose Claude Cowork depuis le chapitre 5 de la home", () => {
    const src = readFileSync(
      join(root, "src/app/home-narrative/chapters/ch05-recit.tsx"),
      "utf8",
    );
    expect(src).toContain("/blog/claude-cowork-community-manager");
  });
});

describe("portail client /clients — hors index, hors maillage", () => {
  const PORTAL_URL_RE = pathPrefixRe(PORTAL_PATH_PREFIX);

  it("n'apparaît ni dans les sitemaps/llms, ni dans le plan du site, ni dans les navs", () => {
    for (const file of PUBLIC_GRAPH_FILES) {
      expect(readFileSync(join(root, file), "utf8"), file).not.toMatch(PORTAL_URL_RE);
    }
  });

  it("est interdit au crawl dans chaque groupe de robots.txt qui autorise /", () => {
    const groups = robotsGroupsAllowingRoot();
    expect(groups.length).toBeGreaterThan(10);
    for (const group of groups) {
      expect(group).toMatch(/^Disallow: \/clients\/[ \t]*$/m);
      expect(group).toMatch(/^Disallow: \/api\/portal\/[ \t]*$/m);
    }
  });

  it("ne versionne aucun HTML en clair sous src/content/portal (repo public)", () => {
    const dir = join(root, "src/content/portal");
    const entries = existsSync(dir) ? readdirSync(dir, { recursive: true }) : [];
    const html = entries.map(String).filter((entry) => /\.html?$/i.test(entry));
    expect(html).toEqual([]);
    expect(readFileSync(join(root, ".gitignore"), "utf8")).toContain(
      "/src/content/portal/**/*.html",
    );
  });
});

describe("notes unlisted /notes — hors index, hors maillage", () => {
  const NOTES_URL_RE = pathPrefixRe(NOTES_PATH_PREFIX);

  it("n'apparaît ni dans les sitemaps/llms, ni dans le plan du site, ni dans les navs", () => {
    for (const file of PUBLIC_GRAPH_FILES) {
      expect(readFileSync(join(root, file), "utf8"), file).not.toMatch(NOTES_URL_RE);
    }
  });

  it("est interdit au crawl dans chaque groupe de robots.txt qui autorise /", () => {
    const groups = robotsGroupsAllowingRoot();
    expect(groups.length).toBeGreaterThan(10);
    for (const group of groups) {
      expect(group).toMatch(/^Disallow: \/notes\/[ \t]*$/m);
    }
  });

  it("pose X-Robots-Tag noindex, nofollow sur /notes/:path*", async () => {
    const headers = nextConfig.headers ? await nextConfig.headers() : [];
    expect(headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: `${NOTES_PATH_PREFIX}/:path*`,
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
        }),
      ]),
    );
  });
});

describe("page /a-propos — identité citable, maillée partout", () => {
  // Pas `pathPrefixRe` : dans le sitemap l'URL est suivie de `<`.
  const A_PROPOS_RE = /\/a-propos(?![\w-])/;

  it("est présente dans le sitemap, les llms.txt, le plan du site et le footer", () => {
    for (const file of [
      "public/sitemap.xml",
      "public/llms.txt",
      "public/llms-full.txt",
      "src/app/plan-du-site/page.tsx",
      "src/components/layout/footer.tsx",
      "src/app/auteur/pierre-legrand/page.tsx",
    ]) {
      expect(readFileSync(join(root, file), "utf8"), file).toMatch(A_PROPOS_RE);
    }
  });

  it("ouvre la section « À propos » de llms.txt (page canonique pour les agents IA)", () => {
    const llms = readFileSync(join(root, "public/llms.txt"), "utf8");
    const section = llms.slice(llms.indexOf("## À propos"));
    const firstLink = section.indexOf("https://augmenter.pro/a-propos");
    const nextHeading = section.indexOf("\n## ", 3);
    expect(firstLink).toBeGreaterThan(0);
    expect(firstLink).toBeLessThan(nextHeading);
  });

  it("porte un lastmod du jour de publication ou plus récent dans le sitemap", () => {
    const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
    const match = sitemap.match(
      /\/a-propos<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/,
    );
    expect(match).not.toBeNull();
    expect(match![1] >= "2026-09-30").toBe(true);
  });

  it("n'emploie aucun mot interdit (« gratuit », « offert ») ni balisage d'avis", () => {
    const dir = join(root, "src/app/a-propos");
    const files = readdirSync(dir).map((f) => join(dir, f));
    files.push(
      join(root, "src/app/not-found.tsx"),
      join(root, "src/components/layout/not-found-view.tsx"),
    );
    expect(files.length).toBeGreaterThan(2);
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      expect(src, file).not.toMatch(/\b(gratuit|offert)\w*/i);
      expect(src, file).not.toMatch(/AggregateRating|"Review"/);
    }
  });
});

describe("redirections SEO", () => {
  it("redirige /accueil-2 vers / en 301 (plus d'URL publique de démo)", async () => {
    const redirects = nextConfig.redirects
      ? await nextConfig.redirects()
      : [];
    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/accueil-2",
          destination: "/",
          permanent: true,
        }),
      ]),
    );
  });
});
