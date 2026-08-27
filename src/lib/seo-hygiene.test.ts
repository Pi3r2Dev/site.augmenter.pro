import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import {
  NEWS_SITEMAP_ENABLED,
  NOINDEX_FOLLOW_PATHS,
  PORTAL_PATH_PREFIX,
} from "./seo-policy";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

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

  it("signale les 3 articles à réindexer avec un lastmod 2026-08-16", () => {
    const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
    for (const slug of [
      "claude-cowork-community-manager",
      "machine-de-guerre-commerciale",
      "comparatif-llm-vente-commerciale",
    ]) {
      expect(sitemap).toMatch(
        new RegExp(
          `/blog/${slug}</loc>\\s*<lastmod>2026-08-16</lastmod>`,
        ),
      );
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
  // Une URL commençant par /clients (suivie de /, d'une quote ou d'un espace).
  const PORTAL_URL_RE = new RegExp(`${PORTAL_PATH_PREFIX}(?=[/"'\`\\s)])`);

  it("n'apparaît ni dans les sitemaps/llms, ni dans le plan du site, ni dans les navs", () => {
    for (const file of [
      "public/sitemap.xml",
      "public/llms.txt",
      "public/llms-full.txt",
      "src/app/plan-du-site/page.tsx",
      "src/components/layout/footer.tsx",
      "src/components/layout/header.tsx",
      "src/app/approche/narrative/nav-fixed.tsx",
      "src/app/approche/narrative/shared/suite-cockpit.tsx",
    ]) {
      expect(readFileSync(join(root, file), "utf8"), file).not.toMatch(PORTAL_URL_RE);
    }
  });

  it("est interdit au crawl dans chaque groupe de robots.txt qui autorise /", () => {
    const robots = readFileSync(join(root, "public/robots.txt"), "utf8");
    const groups = robots
      .split(/\r?\n[ \t]*\r?\n/)
      .filter((group) => /^User-agent:/m.test(group));
    expect(groups.length).toBeGreaterThan(10);
    for (const group of groups) {
      if (!/^Allow: \/[ \t]*$/m.test(group)) continue;
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
