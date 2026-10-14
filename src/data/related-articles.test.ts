/**
 * Bloc « articles liés » en pied d'article (MA-7).
 *
 * Dégât réel évité : avec des ex aequo départagés par l'ordre du catalog, trois
 * articles de l'essaim Odoo raflaient la moitié des emplacements et quinze
 * articles (dont le workflow Claude Code + Odoo et le prompt d'architecte) n'en
 * recevaient aucun — ils perdaient leur seul lien entrant automatique, donc leur
 * chance d'être recrawlés.
 */
import { describe, expect, it } from "vitest";
import { ARTICLES, getRelatedArticles } from "./resources";

const N = 3;
const slugs = new Set(ARTICLES.map((a) => a.slug));

function slotCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const a of ARTICLES) {
    for (const r of getRelatedArticles(a.slug, N)) {
      counts.set(r.slug, (counts.get(r.slug) ?? 0) + 1);
    }
  }
  return counts;
}

describe("articles liés — répartition des emplacements (MA-7)", () => {
  it("aucun article n'occupe plus de 15 % des emplacements", () => {
    const total = ARTICLES.length * N;
    const max = Math.floor(total * 0.15);
    const over = [...slotCounts()].filter(([, c]) => c > max);
    expect(over, `plafond ${max} sur ${total}`).toEqual([]);
  });

  it("le workflow Claude Code + Odoo et le prompt d'architecte reçoivent des emplacements", () => {
    const counts = slotCounts();
    expect(counts.get("claude-code-odoo-workflow") ?? 0).toBeGreaterThan(0);
    expect(counts.get("claude-code-prompt-architecture") ?? 0).toBeGreaterThan(0);
  });

  it("chaque article reçoit 3 liés distincts, jamais lui-même", () => {
    for (const a of ARTICLES) {
      const related = getRelatedArticles(a.slug, N).map((r) => r.slug);
      expect(related, a.slug).toHaveLength(N);
      expect(new Set(related).size, a.slug).toBe(N);
      expect(related, a.slug).not.toContain(a.slug);
    }
  });

  it("la sortie est stable d'un appel à l'autre", () => {
    for (const a of ARTICLES) {
      expect(getRelatedArticles(a.slug, N)).toEqual(getRelatedArticles(a.slug, N));
    }
  });
});

describe("articles liés — sélection éditoriale `related` (MA-7)", () => {
  const curated = ARTICLES.filter((a) => a.related?.length);

  it("est renseignée pour l'essaim, le cas Odoo Cowork et le prompt d'architecte", () => {
    const expected = [
      "cout-agent-ia-odoo",
      "odoo-20-serveur-mcp-agents",
      "agent-ia-qui-ne-touche-pas-aux-prix",
      "petit-modele-bien-outille",
      "ia-enrichir-catalogue-sans-perdre-la-main",
      "odoo-online-ce-que-vous-ne-pouvez-pas-installer",
      "logiciel-construit-par-agents-dix-semaines",
      "claude-code-odoo-workflow",
      "configurer-odoo-ia-claude-cowork",
      "claude-code-prompt-architecture",
    ];
    expect(curated.map((a) => a.slug).sort()).toEqual([...expected].sort());
  });

  it("ne cite que des slugs du catalog, jamais l'article lui-même, sans doublon", () => {
    for (const a of curated) {
      const rel = a.related ?? [];
      for (const s of rel) expect(slugs.has(s), `${a.slug} → ${s}`).toBe(true);
      expect(rel, a.slug).not.toContain(a.slug);
      expect(new Set(rel).size, a.slug).toBe(rel.length);
    }
  });

  it("est servie en premier, dans l'ordre", () => {
    for (const a of curated) {
      const rel = (a.related ?? []).slice(0, N);
      const served = getRelatedArticles(a.slug, N).map((r) => r.slug);
      expect(served.slice(0, rel.length), a.slug).toEqual(rel);
    }
  });
});
