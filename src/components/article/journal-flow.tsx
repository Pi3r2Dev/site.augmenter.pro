import { Children, isValidElement, type ReactNode } from "react";
import { groupJournal, wordCount, type JournalBlock } from "@/lib/article/journal-flow";

/** Sous ce nombre de mots, une tranche reste sur une colonne (deux colonnes de deux lignes = bruit). */
const MIN_WORDS_FOR_COLUMNS = 40;

interface JournalFlowProps {
  children: ReactNode;
}

/**
 * Rendu « journal » du corps d'article : sections numérotées (une par h2),
 * texte courant coulé en tranches multicolonnes sur bureau, éléments larges
 * pleine largeur. Sur mobile, les mêmes conteneurs se lisent en une colonne.
 *
 * Le premier paragraphe de l'article est le **lede** : plus grand, une colonne,
 * lettrine — l'entrée dans le texte, avant la densité des sections.
 */
export function JournalFlow({ children }: JournalFlowProps) {
  const sections = groupJournal(children);

  return (
    <>
      {sections.map((section, i) => {
        const isIntro = section.head === null;
        const num = isIntro ? 0 : sections.filter((s, j) => j <= i && s.head !== null).length;
        const blocks = isIntro ? splitLede(section.blocks) : section.blocks;
        const body = blocks.map((block, j) => renderBlock(block, j));

        if (isIntro) {
          return (
            <div key="intro" className="journal-intro">
              {body}
            </div>
          );
        }
        return (
          <section key={`s${num}`} className="journal-section">
            <div className="journal-section__head">
              <span className="journal-section__num" aria-hidden>
                {String(num).padStart(2, "0")}
              </span>
              {section.head}
            </div>
            {body}
          </section>
        );
      })}
    </>
  );
}

/** Le lede = premier `<p>` de l'intro, sorti de sa tranche pour un rendu propre. */
function splitLede(blocks: JournalBlock[]): Array<JournalBlock | { kind: "lede"; node: ReactNode }> {
  const idx = blocks.findIndex((b) => b.kind === "flow");
  if (idx === -1) return blocks;
  const flow = blocks[idx];
  if (flow.kind !== "flow") return blocks;
  const [first, ...rest] = flow.items;
  if (!isValidElement(first) || first.type !== "p") return blocks;
  const out: Array<JournalBlock | { kind: "lede"; node: ReactNode }> = [...blocks];
  const lede = { kind: "lede" as const, node: first };
  if (rest.length === 0) out.splice(idx, 1, lede);
  else out.splice(idx, 1, lede, { kind: "flow", items: rest, words: flow.words - wordCount(first) });
  return out;
}

function renderBlock(block: JournalBlock | { kind: "lede"; node: ReactNode }, key: number) {
  if (block.kind === "lede") {
    return (
      <div key={key} className="journal-lede">
        {block.node}
      </div>
    );
  }
  if (block.kind === "wide") {
    // Un <script> JSON-LD n'a pas de rendu : pas d'enveloppe (sinon une marge vide).
    if (isValidElement(block.node) && block.node.type === "script") {
      return block.node; // déjà clé par Children.toArray
    }
    return (
      <div key={key} className="journal-wide">
        {block.node}
      </div>
    );
  }
  return (
    <div
      key={key}
      className="journal-flow"
      data-cols={block.words >= MIN_WORDS_FOR_COLUMNS ? 2 : 1}
    >
      {Children.toArray(block.items)}
    </div>
  );
}
