import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ARTICLES, getRelatedArticles } from "./resources";
import {
  COPILOT_GHOST_YEAR_EUR,
  CUT_FIRST,
  DOOR_TABLE_ORDER,
  DOORS,
  GESTURES,
  recommendDoor,
  type DoorId,
  type GestureId,
  type UnusedId,
} from "./buying-guide-2027";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Vérifie que chaque variante du geste a une porte, et que les fourchettes signées tiennent. */
describe("recommendDoor — grille d'achat 2027", () => {
  it("oriente dès le premier geste, sans attendre les deux autres questions", () => {
    const rec = recommendDoor("quotes", null, null);
    expect(rec.door.id).toBe("chiffrage");
    expect(rec.cutFirst).toBeNull();
  });

  it("sans geste, propose l'Audit 180° — jamais un écran vide", () => {
    const rec = recommendDoor(null, null, null);
    expect(rec.door.id).toBe("audit-180");
    expect(rec.door.cta).toBe("audit-180");
  });

  it("refuse l'agent client même si Copilot est déjà trop large", () => {
    const rec = recommendDoor("client-agent", "copilot-wide", "money");
    expect(rec.door.id).toBe("refuse-client");
    expect(rec.hitl).toBe(true);
    expect(rec.cutFirst).toContain("3 300");
  });

  it("force la relecture humaine dès que ça engage la marge", () => {
    const rec = recommendDoor("pdfs", "none", "money");
    expect(rec.door.id).toBe("knowledge");
    expect(rec.hitl).toBe(true);
  });

  it("la porte formation sort vers l'atelier, pas vers un chantier k€", () => {
    const rec = recommendDoor("autonomy", null, "none");
    expect(rec.door.cta).toBe("formation");
    expect(rec.door.range).toMatch(/450/);
  });

  it("ajoute Appro et relance comme portes, pas comme notes de bas de page", () => {
    expect(recommendDoor("replenish", null, null).door.id).toBe("appro");
    expect(recommendDoor("followup", null, null).door.id).toBe("relance");
  });

  it("mappe chaque geste vers une porte distincte", () => {
    const expected: Record<GestureId, DoorId> = {
      unknown: "audit-180",
      roadmap: "audit-360",
      autonomy: "formation",
      bottleneck: "goulot",
      quotes: "chiffrage",
      pdfs: "knowledge",
      matching: "precompta",
      odoo: "odoo",
      replenish: "appro",
      followup: "relance",
      "client-agent": "refuse-client",
    };
    for (const { id } of GESTURES) {
      expect(recommendDoor(id, null, null).door.id).toBe(expected[id]);
    }
  });
});

describe("fourchettes signées (élargies vers le haut, sept. 2026)", () => {
  it("place le goulot, le chiffrage et les PDF au-dessus des fourchettes 2026 basses", () => {
    expect(DOORS.goulot.range).toBe("~2 à 6 k€ HT");
    expect(DOORS.chiffrage.range).toBe("~4 à 10 k€ HT selon propreté du catalogue");
    expect(DOORS.knowledge.range).toBe("~3 à 7 k€ HT");
    expect(DOORS.precompta.range).toBe("~3 à 7 k€ HT");
    expect(DOORS.appro.range).toBe("~3 à 8 k€ HT");
    expect(DOORS.relance.range).toBe("~2 à 6 k€ HT");
  });

  it("chiffre le Copilot fantôme à ~3 300 € HT / an au catalogue France", () => {
    expect(COPILOT_GHOST_YEAR_EUR).toBe(3276);
  });

  it("donne un « si c'est ça » à chaque porte, et le tableau les liste toutes une fois", () => {
    const ids = Object.keys(DOORS) as DoorId[];
    expect(new Set(DOOR_TABLE_ORDER)).toEqual(new Set(ids));
    expect(DOOR_TABLE_ORDER).toHaveLength(ids.length);
    for (const door of Object.values(DOORS)) {
      expect(door.when.length).toBeGreaterThan(8);
    }
  });

  it("documente un « couper d'abord » pour chaque logiciel fantôme", () => {
    const unused: Exclude<UnusedId, "none">[] = [
      "copilot-wide",
      "odoo-apps",
      "make",
      "kanban-saas",
      "llm-seats",
    ];
    for (const id of unused) {
      expect(CUT_FIRST[id].length).toBeGreaterThan(20);
    }
  });
});

describe("publication /blog/ma-pme-en-2027", () => {
  it("est en tête du catalog, avec les trois douleurs du brief", () => {
    const article = ARTICLES[0];
    expect(article.slug).toBe("ma-pme-en-2027");
    expect(article.pains).toEqual(["goulot", "demarrage", "prestataire"]);
  });

  it("propose trois articles liés en pied — pas dans le corps", () => {
    expect(getRelatedArticles("ma-pme-en-2027", 3)).toHaveLength(3);
  });

  it("a un hero, un OG, et une URL sitemap + llms", () => {
    expect(existsSync(join(root, "public/images/blog/ma-pme-en-2027.webp"))).toBe(
      true,
    );
    expect(
      existsSync(join(root, "public/images/blog/og/ma-pme-en-2027.jpg")),
    ).toBe(true);
    expect(readFileSync(join(root, "public/sitemap.xml"), "utf8")).toContain(
      "/blog/ma-pme-en-2027",
    );
    expect(readFileSync(join(root, "public/llms.txt"), "utf8")).toContain(
      "/blog/ma-pme-en-2027",
    );
  });
});
