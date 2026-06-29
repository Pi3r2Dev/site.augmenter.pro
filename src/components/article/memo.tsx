import type { ReactNode } from "react";

export type MemoType = "idea" | "num" | "link";

interface MemoProps {
  /** idea = idée clé (violet) · num = chiffre/donnée (amber) · link = ressource (pointillé) */
  type?: MemoType;
  /** Label court affiché dans le fil de mémoire (≠ le texte inline, qui peut être plus long). */
  label: string;
  children: ReactNode;
}

/**
 * Balise rédacteur du « fil de mémoire ». Pose un repère inline dans le corps :
 * au scroll, ReadingRail (client) le détecte via [data-memo] et l'anime vers le bandeau.
 */
export function Memo({ type = "idea", label, children }: MemoProps) {
  return (
    <mark className="memo" data-memo={label} data-type={type}>
      {children}
    </mark>
  );
}
