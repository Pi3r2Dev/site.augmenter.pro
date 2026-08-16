import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { NEWS_SITEMAP_ENABLED, NOINDEX_FOLLOW_PATHS } from "./seo-policy";

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
