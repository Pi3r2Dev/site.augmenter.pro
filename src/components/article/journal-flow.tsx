import { Children, isValidElement, type CSSProperties, type ReactNode } from "react";
import { Callout } from "@/components/article/callout";
import { groupJournal, textOf, wordCount, type JournalBlock } from "@/lib/article/journal-flow";

/** Sous ce nombre de mots, une tranche reste sur une colonne (deux colonnes de deux lignes = bruit). */
const MIN_WORDS_FOR_COLUMNS = 40;
/** Un `<Callout>` court se lit en marge (≥ 1400px) à côté de la tranche qu'il commente. */
const MAX_WORDS_FOR_ASIDE = 70;
/** …à condition que cette tranche soit assez haute pour l'accueillir sans trou. */
const MIN_FLOW_WORDS_FOR_ASIDE = 80;

interface JournalFlowProps {
  children: ReactNode;
}

type RenderBlock = JournalBlock | { kind: "lede"; node: ReactNode };

/**
 * Rendu « journal » du corps d'article : sections numérotées (une par h2),
 * texte courant coulé en tranches multicolonnes sur bureau, éléments larges
 * pleine largeur, encadrés courts en marge droite sur grand écran.
 * Sur mobile, les mêmes conteneurs se lisent en une colonne, dans l'ordre du JSX.
 *
 * Le premier paragraphe de l'article est le **lede** : plus grand, une colonne,
 * lettrine — l'entrée dans le texte, avant la densité des sections.
 *
 * Chaque bloc porte sa ligne de grille (`grid-row`) : sur grand écran, la
 * section est une grille « texte | marge » et un encadré court se place sur la
 * ligne de la tranche qui le précède, sans changer l'ordre du DOM.
 */
export function JournalFlow({ children }: JournalFlowProps) {
  const sections = groupJournal(children);

  return (
    <>
      {sections.map((section, i) => {
        const isIntro = section.head === null;
        const num = isIntro ? 0 : sections.filter((s, j) => j <= i && s.head !== null).length;
        const blocks = isIntro ? splitLede(section.blocks) : section.blocks;
        const body = layoutRows(blocks, isIntro ? 1 : 2);

        if (isIntro) {
          return (
            <div key="intro" className="journal-intro">
              {body}
            </div>
          );
        }
        return (
          <section key={`s${num}`} className="journal-section">
            <div className="journal-section__head" style={{ gridRow: 1 }}>
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
function splitLede(blocks: JournalBlock[]): RenderBlock[] {
  const idx = blocks.findIndex((b) => b.kind === "flow");
  if (idx === -1) return blocks;
  const flow = blocks[idx];
  if (flow.kind !== "flow") return blocks;
  const [first, ...rest] = flow.items;
  if (!isValidElement(first) || first.type !== "p") return blocks;
  const out: RenderBlock[] = [...blocks];
  const lede = { kind: "lede" as const, node: first };
  if (rest.length === 0) out.splice(idx, 1, lede);
  else out.splice(idx, 1, lede, { kind: "flow", items: rest, words: flow.words - wordCount(first) });
  return out;
}

function isAsideCandidate(block: RenderBlock): boolean {
  return (
    block.kind === "wide" &&
    isValidElement(block.node) &&
    block.node.type === Callout &&
    wordCount(block.node) <= MAX_WORDS_FOR_ASIDE
  );
}

/** Attribue une ligne de grille à chaque bloc ; un encadré court partage celle de la tranche précédente. */
function layoutRows(blocks: RenderBlock[], firstRow: number) {
  const out: ReactNode[] = [];
  let row = firstRow - 1;
  let prev: RenderBlock | null = null;
  let prevRowHasAside = false;

  blocks.forEach((block, j) => {
    const asideHere =
      isAsideCandidate(block) &&
      prev !== null &&
      prev.kind === "flow" &&
      prev.words >= MIN_FLOW_WORDS_FOR_ASIDE &&
      !prevRowHasAside;

    if (asideHere) {
      prevRowHasAside = true;
      out.push(renderBlock(block, j, { gridRow: row }, "journal-wide journal-aside"));
      return;
    }
    row += 1;
    prevRowHasAside = false;
    prev = block;
    out.push(renderBlock(block, j, { gridRow: row }));
  });
  return out;
}

function renderBlock(block: RenderBlock, key: number, style: CSSProperties, wideClass = "journal-wide") {
  if (block.kind === "lede") {
    // Lettrine seulement sur une lettre : « 7 » sorti de « 77 % » serait un contresens.
    const first = textOf(block.node).trimStart().charAt(0);
    const cap = /\p{L}/u.test(first);
    return (
      <div key={key} className={cap ? "journal-lede journal-lede--cap" : "journal-lede"} style={style}>
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
      <div key={key} className={wideClass} style={style}>
        {block.node}
      </div>
    );
  }
  return (
    <div
      key={key}
      className="journal-flow"
      data-cols={block.words >= MIN_WORDS_FOR_COLUMNS ? 2 : 1}
      style={style}
    >
      {Children.toArray(block.items)}
    </div>
  );
}
