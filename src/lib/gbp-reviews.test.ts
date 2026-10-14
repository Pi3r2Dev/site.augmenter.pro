/**
 * Garde-fou « avis clients » — pourquoi il existe :
 * jusqu'au 2026-10-14, le site affichait cinq témoignages dont aucun ne figurait
 * sur la fiche Google, l'un d'eux prêtant à une vraie cliente (Maud J.) une
 * phrase qu'elle n'a jamais écrite, posé à côté d'un lien « Voir les avis
 * Google », et une note « 5.0 sur 5 retours clients » alors que la fiche en
 * compte 3. Le visiteur qui clique ne retrouve rien et conclut que le site
 * invente ; Google, lui, avait vu ces avis balisés en JSON-LD jusqu'au 09-07.
 *
 * Règles vérifiées :
 *   1. chaque extrait cité figure MOT POUR MOT dans l'avis Google d'origine ;
 *   2. aucun des faux témoignages historiques ne réapparaît (code ni llms) ;
 *   3. aucun balisage JSON-LD d'avis (AggregateRating / Review) dans src/.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { GBP_QUOTES, GBP_RATING } from "./gbp";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mdx?)$/.test(name) && !/\.test\.tsx?$/.test(name)) out.push(p);
  }
  return out;
}

/** Fichiers servis ou rendus : tout le code source + les fichiers pour LLM. */
function servedFiles(): string[] {
  return [
    ...walk(join(root, "src")),
    join(root, "public/llms.txt"),
    join(root, "public/llms-full.txt"),
  ].filter((p) => !p.endsWith(join("src", "lib", "gbp.ts")));
}

/** Témoignages qui n'existent pas sur la fiche Google (relevé du 2026-10-14). */
const FABRICATED = [
  /Arnaud L\./,
  /Karim B\./,
  /Nathalie R\./,
  /Marc L\./,
  /Moodboards et 3D/,
  /retours clients/,
];

describe("avis Google", () => {
  it("cite chaque extrait mot pour mot depuis l'avis d'origine", () => {
    expect(GBP_QUOTES.length).toBeGreaterThan(0);
    for (const review of GBP_QUOTES) {
      const excerpts = Object.values(review.excerpts);
      expect(excerpts.length, review.id).toBeGreaterThan(0);
      for (const excerpt of excerpts) {
        expect(review.text, `${review.id} : « ${excerpt} »`).toContain(excerpt);
      }
    }
  });

  it("annonce une note et un nombre d'avis cohérents avec les avis relevés", () => {
    expect(GBP_RATING.count).toBeGreaterThanOrEqual(GBP_QUOTES.length);
    expect(GBP_RATING.value).toMatch(/^[1-5],\d$/);
  });

  it("ne réaffiche aucun faux témoignage historique", () => {
    const files = servedFiles();
    // Anti-vacuum : un glob cassé ne doit pas passer au vert.
    expect(files.length).toBeGreaterThan(100);
    const hits: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      for (const re of FABRICATED) {
        if (re.test(src)) hits.push(`${relative(root, file)} → ${re}`);
      }
    }
    expect(hits).toEqual([]);
  });

  it("ne balise aucun avis en JSON-LD", () => {
    const files = walk(join(root, "src"));
    expect(files.length).toBeGreaterThan(100);
    const markup =
      /["']@type["']\s*:\s*["'](AggregateRating|Review)["']|\b(aggregateRating|reviewRating)\s*:/;
    const hits = files
      .filter((f) => markup.test(readFileSync(f, "utf8")))
      .map((f) => relative(root, f));
    expect(hits).toEqual([]);
  });
});
