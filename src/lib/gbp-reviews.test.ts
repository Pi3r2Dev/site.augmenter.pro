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
  // Chiffres « de cas » tirés des mêmes faux témoignages (retirés le 2026-10-14).
  // Le « 2 h → 15 min » reste, mais comme mesure faite chez nous, jamais prêté
  // à un client.
  /budget IT réduit/,
  /2 ?h de saisie en moins/,
  /demandes clients (entrantes|en ligne)/,
  /15 min, PME du BTP/,
  /chez une PME du BTP\s*:?\s*(a ramené|de 2 h)/,
  /Cabinet immobilier — synthèse de visites/,
  /missions vérifiables\. Avis publiés/,
  // Cas « clients » géolocalisés et moyennes de marché sans source, retirés le
  // 2026-10-14 : aucune mission connue derrière, aucune étude retrouvée. Les
  // preuves affichées sont nos propres mesures, le cas réel du terrain Odoo et
  // des objectifs fixés ensemble (jamais un résultat prêté à un tiers).
  /(PME|Entreprise|Cabinet|Agence|Artisan|Réseau|Restaurant|Transporteur)[^".\n]{0,40}à (Versailles|Cergy|Pontoise|Saint-Germain|Poissy|Rambouillet|Gonesse|Ermont|Enghien|Persan) \((78|95)\) ?:/,
  /\(Versailles, 78\)|à Cergy \(95\) —|à Pontoise \(95\) —/,
  /165 ?%/,
  /\+255 ?%/,
  /ROI (complet en moins de 12 mois|médian)/,
  /jusqu.{1,3}à 80 ?% (du coût|pris en charge|de l.{1,3}accompagnement|de votre accompagnement)/,
  /50-80 ?%/,
  /72 ?%[^\n]{0,40}(attaqu|ANSSI)|audit récent \(ANSSI\)/,
  // Le mythe « 60 % des PME attaquées ferment » : le site le démonte dans
  // l'article cyber, il ne doit plus être affirmé nulle part.
  /déposent le bilan/,
  /Gain de temps moyen|Premier livrable|Premiers résultats|Résultats 48 h/,
  // « Les artisans d'Ermont gagnent 2h par jour » : un résultat prêté à une
  // population locale qu'on n'a jamais mesurée.
  /(Les|Un|Une) [^.\n]{0,40}(de|à|d['’]) ?(Versailles|Cergy|Pontoise|Saint-Germain|Poissy|Gonesse|Ermont|Taverny|Persan|Roissy)[^.\n]{0,40}(gagnent|réduisent|récupèrent|visualisent|réduit)/,
  /Jusqu.{1,3}à (50|70) ?% de/,
  /(25 à 30|20-35|30-50) ?%/,
  /nos clients constatent|PME accompagnées constatent|Dans nos accompagnements|observons chez nos clients/,
  /dizaines de diagnostics|trentaine de PME|situations réelles \(anonymisées\)/,
  /étude Mirax|Mirax\/McKinsey/,
  /67 ?% des PME/,
  // Mission CRM « en cours » chez une PME des Yvelines : elle n'a jamais existé.
  /accompagnons actuellement une PME|45 minutes à 8 minutes/,
];

describe("avis Google", () => {
  it("n'expose que des avis entiers, sans champ d'extrait", () => {
    expect(GBP_QUOTES.length).toBeGreaterThan(0);
    for (const review of GBP_QUOTES) {
      expect(review.text.trim().length, review.id).toBeGreaterThan(50);
      // Un extrait sorti de son contexte n'est plus l'avis de la personne
      // (constat du 2026-10-14) : aucun champ ne doit le permettre.
      expect(Object.keys(review)).not.toContain("excerpts");
    }
  });

  it("n'affiche jamais une phrase isolée de l'avis de Maud J.", () => {
    // Les trois phrases qui servaient d'extraits : si l'une réapparaît seule
    // (sans la phrase qui la précède dans l'avis), c'est une coupe.
    const lone = [
      "Aujourd'hui, la majorité de mes clients me découvrent",
      "Disponible, motivant, pédagogue et réactif",
    ];
    const hits: string[] = [];
    for (const file of servedFiles()) {
      const src = readFileSync(file, "utf8");
      for (const phrase of lone) {
        const i = src.indexOf(phrase);
        if (i === -1) continue;
        const before = src.slice(Math.max(0, i - 220), i);
        if (!/mon site\.|un an\)\./.test(before)) {
          hits.push(`${relative(root, file)} → « ${phrase}… » sans son contexte`);
        }
      }
    }
    expect(hits).toEqual([]);
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
