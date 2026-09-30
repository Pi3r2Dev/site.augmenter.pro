import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Regroupement « journal » du corps d'un article.
 *
 * Le corps d'un article est un JSX plat (p, h2, h3, ul, table, encadrés…).
 * Pour la mise en page bureau en colonnes, on le découpe :
 *   - en **sections** (une par `<h2>`, plus l'introduction avant le premier h2) ;
 *   - à l'intérieur, en **tranches** de texte courant (`flow`) bornées en mots,
 *     que le CSS coule sur deux colonnes équilibrées — une tranche tient dans
 *     un écran, donc le lecteur ne redescend jamais une colonne qu'il vient de
 *     remonter (le défaut connu des multicolonnes web sur un texte long) ;
 *   - les éléments larges (`wide` : tableaux, encadrés, code, outils, images)
 *     coupent la tranche et s'étendent sur toute la largeur.
 *
 * Aucun rendu ici : logique pure, testée en Node.
 */

/** Balises qui font partie du texte courant et peuvent couler en colonnes. */
export const FLOW_TAGS: ReadonlySet<string> = new Set(["p", "ul", "ol", "h3", "h4"]);
/** Intertitres qui ne doivent jamais fermer une tranche (orphelin en bas de colonne). */
const SUBHEAD_TAGS: ReadonlySet<string> = new Set(["h3", "h4"]);

/** Taille cible d'une tranche : ~280 mots ≈ 12-14 lignes par colonne, toujours sous un écran. */
export const MAX_WORDS_PER_FLOW = 280;

export type JournalBlock =
  | { kind: "flow"; items: ReactNode[]; words: number }
  | { kind: "wide"; node: ReactNode };

export interface JournalSection {
  /** `null` pour l'introduction (avant le premier h2). */
  head: ReactElement | null;
  blocks: JournalBlock[];
}

export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(" ");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

export function wordCount(node: ReactNode): number {
  return textOf(node).trim().split(/\s+/).filter(Boolean).length;
}

function tagOf(node: ReactNode): string | null {
  return isValidElement(node) && typeof node.type === "string" ? node.type : null;
}

/** Aplatit Fragments et tableaux, retire les blancs, conserve des clés uniques. */
export function flattenChildren(children: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  Children.toArray(children).forEach((child) => {
    if (typeof child === "string") {
      if (child.trim()) out.push(child);
      return;
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      out.push(...flattenChildren(child.props.children));
      return;
    }
    out.push(child);
  });
  return out;
}

export function groupJournal(children: ReactNode): JournalSection[] {
  const nodes = flattenChildren(children);
  const sections: JournalSection[] = [];
  let current: JournalSection = { head: null, blocks: [] };
  let run: ReactNode[] = [];
  let runWords = 0;

  const flush = () => {
    if (run.length === 0) return;
    current.blocks.push({ kind: "flow", items: run, words: runWords });
    run = [];
    runWords = 0;
  };

  for (const node of nodes) {
    const tag = tagOf(node);

    if (tag === "h2") {
      flush();
      if (current.head !== null || current.blocks.length > 0) sections.push(current);
      current = { head: node as ReactElement, blocks: [] };
      continue;
    }

    if (tag && FLOW_TAGS.has(tag)) {
      const w = wordCount(node);
      if (runWords > 0 && runWords + w > MAX_WORDS_PER_FLOW) {
        // Un intertitre en fin de tranche serait orphelin : il ouvre la suivante.
        const carry: ReactNode[] = [];
        while (run.length > 0) {
          const lastTag = tagOf(run[run.length - 1]);
          if (lastTag && SUBHEAD_TAGS.has(lastTag)) carry.unshift(run.pop());
          else break;
        }
        flush();
        run = carry;
        runWords = carry.reduce((n, c) => n + wordCount(c), 0);
      }
      run.push(node);
      runWords += w;
      continue;
    }

    // Tout le reste (tableaux, encadrés, code, scripts JSON-LD, composants) coupe la tranche.
    flush();
    current.blocks.push({ kind: "wide", node });
  }

  flush();
  if (current.head !== null || current.blocks.length > 0) sections.push(current);
  return sections;
}
