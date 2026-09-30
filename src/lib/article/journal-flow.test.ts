import { createElement as h, Fragment } from "react";
import { describe, expect, it } from "vitest";
import { groupJournal, MAX_WORDS_PER_FLOW, wordCount } from "./journal-flow";

const words = (n: number) => Array.from({ length: n }, (_, i) => `mot${i}`).join(" ");
const p = (n: number) => h("p", null, words(n));

describe("groupJournal — regroupement journal du corps d'article", () => {
  it("sépare l'introduction (sans h2) des sections ouvertes par chaque h2", () => {
    const sections = groupJournal([
      p(20),
      h("h2", null, "Un"),
      p(20),
      h("h2", null, "Deux"),
      p(20),
    ]);
    expect(sections).toHaveLength(3);
    expect(sections[0].head).toBeNull();
    expect(sections[1].head?.props).toMatchObject({ children: "Un" });
    expect(sections[2].head?.props).toMatchObject({ children: "Deux" });
  });

  it("fusionne les paragraphes consécutifs en une tranche bornée en mots", () => {
    const [intro] = groupJournal([p(100), p(100), p(100), p(100)]);
    const flows = intro.blocks.filter((b) => b.kind === "flow");
    expect(flows.length).toBeGreaterThan(1);
    for (const f of flows) {
      if (f.kind === "flow") expect(f.words).toBeLessThanOrEqual(MAX_WORDS_PER_FLOW);
    }
    // Aucun paragraphe perdu.
    const total = flows.reduce((n, f) => n + (f.kind === "flow" ? f.items.length : 0), 0);
    expect(total).toBe(4);
  });

  it("ne coupe jamais un paragraphe : un pavé plus long que la borne fait sa propre tranche", () => {
    const [intro] = groupJournal([p(MAX_WORDS_PER_FLOW + 50)]);
    expect(intro.blocks).toEqual([
      expect.objectContaining({ kind: "flow", words: MAX_WORDS_PER_FLOW + 50 }),
    ]);
  });

  it("un intertitre h3 en fin de tranche ouvre la tranche suivante (pas d'orphelin)", () => {
    const [intro] = groupJournal([p(200), h("h3", null, "Titre"), p(200)]);
    const flows = intro.blocks.filter((b) => b.kind === "flow");
    expect(flows).toHaveLength(2);
    const second = flows[1];
    if (second.kind !== "flow") throw new Error("flow attendu");
    expect((second.items[0] as { type: string }).type).toBe("h3");
  });

  it("un élément large (tableau, encadré, composant) coupe la tranche et s'étend seul", () => {
    const Callout = () => null;
    const sections = groupJournal([
      h("h2", null, "S"),
      p(30),
      h("table", null),
      p(30),
      h(Callout),
      h("div", { className: "overflow-x-auto" }),
      p(30),
    ]);
    const kinds = sections[0].blocks.map((b) => b.kind);
    expect(kinds).toEqual(["flow", "wide", "flow", "wide", "wide", "flow"]);
  });

  it("aplatit les Fragments et ignore les blancs", () => {
    const sections = groupJournal(
      h(Fragment, null, "\n  ", h("h2", null, "A"), h(Fragment, null, p(10), p(10)), "\n"),
    );
    expect(sections).toHaveLength(1);
    expect(sections[0].blocks).toEqual([expect.objectContaining({ kind: "flow", words: 20 })]);
  });

  it("wordCount lit le texte à travers les composants imbriqués (Memo, Link…)", () => {
    const Memo = () => null;
    const node = h("p", null, "un deux ", h(Memo, null, h("strong", null, "trois quatre")), " cinq");
    expect(wordCount(node)).toBe(5);
  });
});
