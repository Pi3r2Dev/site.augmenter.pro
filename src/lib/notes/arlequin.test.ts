import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ARLEQUIN_CONTACT,
  ARLEQUIN_LIMITS,
  ARLEQUIN_NOTE_META,
  ARLEQUIN_NOTE_PATH,
  ARLEQUIN_STATS,
  ARLEQUIN_WORKS,
} from "@/data/notes/arlequin";
import { unlistedPageMetadata } from "@/lib/page-metadata";
import { NOTES_PATH_PREFIX, UNLISTED_ROBOTS } from "@/lib/seo-policy";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const src = (relative: string) =>
  readFileSync(join(root, relative), "utf8");

describe("note Arlequin — contenu", () => {
  it("expose un chemin sous /notes et une date ISO", () => {
    expect(ARLEQUIN_NOTE_PATH).toBe(`${NOTES_PATH_PREFIX}/arlequin`);
    expect(ARLEQUIN_NOTE_META.dateISO).toBe("2026-09-10");
    expect(ARLEQUIN_NOTE_META.title.length).toBeLessThan(60);
    expect(ARLEQUIN_NOTE_META.description.length).toBeLessThan(155);
  });

  it("compte un zéro sur le déploiement client", () => {
    const zero = ARLEQUIN_STATS.find((stat) => stat.emphasis);
    expect(zero?.value).toBe("0");
    expect(zero?.label).toMatch(/déploiement/i);
    expect(ARLEQUIN_STATS).toHaveLength(4);
  });

  it("assume trois limites honnêtes (défense, recherche, quota logiciel)", () => {
    expect(ARLEQUIN_LIMITS).toHaveLength(3);
    expect(ARLEQUIN_LIMITS.join(" ")).toMatch(/défense/i);
    expect(ARLEQUIN_LIMITS.join(" ")).toMatch(/chercheur/i);
    expect(ARLEQUIN_LIMITS.join(" ")).toMatch(/Account Executive/i);
  });

  it("pointe Mes travaux vers le site, le cas public et LinkedIn — jamais le portail", () => {
    expect(ARLEQUIN_WORKS.map((work) => work.href)).toEqual([
      "/",
      "/blog/configurer-odoo-ia-claude-cowork",
      "https://www.linkedin.com/in/legrand-pierre/",
    ]);
    for (const work of ARLEQUIN_WORKS) {
      expect(work.href).not.toMatch(/^\/clients(\/|$)/);
    }
  });

  it("expose un contact collable dans le formulaire", () => {
    expect(ARLEQUIN_CONTACT.email).toBe("pro@pierrelegrand.fr");
    expect(ARLEQUIN_CONTACT.phoneHref).toBe("tel:+33679119774");
  });
});

describe("note Arlequin — metadata unlisted", () => {
  it("pose noindex/nofollow, canonical et openGraph complets", () => {
    const metadata = unlistedPageMetadata({
      title: ARLEQUIN_NOTE_META.title,
      description: ARLEQUIN_NOTE_META.description,
      path: ARLEQUIN_NOTE_PATH,
    });
    expect(metadata.robots).toEqual(UNLISTED_ROBOTS);
    expect(metadata.alternates).toEqual({ canonical: ARLEQUIN_NOTE_PATH });
    expect(metadata.title).toEqual({ absolute: ARLEQUIN_NOTE_META.title });
    expect(metadata.openGraph).toMatchObject({
      locale: "fr_FR",
      siteName: "augmenter.PRO",
      url: `https://augmenter.pro${ARLEQUIN_NOTE_PATH}`,
    });
  });
});

describe("note Arlequin — vue", () => {
  const view = src("app/notes/arlequin/note-view.tsx");
  const page = src("app/notes/arlequin/page.tsx");
  const layout = src("app/notes/layout.tsx");

  it("n'anime pas le h1 depuis opacity 0 (LCP)", () => {
    expect(view).not.toContain("framer-motion");
    expect(view).not.toMatch(/<motion\.(h1|p|div)/);
    expect(view).toContain("Le siège manquant");
  });

  it("n'embarque ni CTA commercial ni JSON-LD Article", () => {
    expect(view).not.toMatch(/from ["']@\/components\/sections\/cta["']/);
    expect(page).not.toMatch(/application\/ld\+json/);
    expect(view).not.toMatch(/application\/ld\+json/);
  });

  it("retire Header et Footer globaux", () => {
    expect(layout).toContain('body > header[class*="fixed"][class*="top-0"]');
    expect(layout).toContain("body > footer { display: none !important; }");
  });

  it("rend les trois destinations de Mes travaux", () => {
    expect(view).toContain("ARLEQUIN_WORKS");
    expect(page).toContain("unlistedPageMetadata");
    expect(page).toContain("ARLEQUIN_NOTE_PATH");
  });
});
