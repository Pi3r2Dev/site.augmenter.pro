import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const src = (relative: string) =>
  readFileSync(join(root, relative), "utf8");

describe("hygiène LCP des heroes classiques", () => {
  it("n'anime plus le hero `/` (bento) depuis opacity 0 — LCP Lighthouse 6,9 s", () => {
    const hero = src("components/sections/hero.tsx");
    expect(hero).not.toContain("framer-motion");
    expect(hero).not.toMatch(/<motion\.(h1|p|div)/);
    expect(hero).toContain(
      "Nous accompagnons les PME et indépendants à trouver l&apos;équilibre",
    );
  });

  it("n'anime plus le hero /blog depuis opacity 0 (élément LCP Lighthouse)", () => {
    const blog = src("app/blog/blog-view.tsx");
    expect(blog).not.toContain("framer-motion");
    expect(blog).not.toMatch(/<motion\.(h1|p|div)/);
    expect(blog).toMatch(/<h1[\s\S]*Articles &amp;[\s\S]*<\/h1>/);
    expect(blog).toContain(
      "Conseils pratiques pour les professionnels qui veulent passer au",
    );
  });

  it("n'anime plus le hero /idees depuis opacity 0", () => {
    const idees = src("app/idees/idees-view.tsx");
    expect(idees).not.toMatch(/<motion\.h1/);
    expect(idees).not.toMatch(/<motion\.p/);
  });

  it("n'anime plus le hero /augmenter-mon-entreprise depuis opacity 0", () => {
    const hub = src("app/augmenter-mon-entreprise/augmenter-view.tsx");
    expect(hub).not.toContain("framer-motion");
    expect(hub).not.toMatch(/<motion\.h1/);
  });

  it("n'empile plus un second canvas WebGL sur la carte featured /blog", () => {
    const card = src("components/bento/article-bento-card.tsx");
    expect(card).not.toMatch(
      /from ["']@\/components\/widgets\/shader-backdrop["']/,
    );
  });

  it("reporte GTM après idle pour ne pas concurrencer le LCP", () => {
    const layout = src("app/layout.tsx");
    expect(layout).toContain("DelayedGoogleTagManager");
    expect(layout).not.toMatch(
      /import \{ GoogleTagManager \} from "@next\/third-parties\/google"/,
    );
  });

  it("garde Three.js hors du chemin critique mobile (hero + narrative)", () => {
    const shader = src("components/widgets/shader-backdrop.tsx");
    expect(shader).toContain("shouldRunDecorativeMotion");
    expect(shader).toContain("scheduleWhenIdle");
    expect(shader).toContain('await import("three")');

    const canvas = src("app/approche/narrative/background-canvas.tsx");
    expect(canvas).toContain("shouldRunDecorativeMotion");
    expect(canvas).toContain("scheduleWhenIdle");
  });

  it("n'anime pas l'entrée GSAP du premier chapitre narrative (LCP)", () => {
    const provider = src("app/approche/narrative/smooth-scroll-provider.tsx");
    expect(provider).toContain("shouldAnimateChapterEntrance");
  });
});
