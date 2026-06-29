import { Info } from "lucide-react";
import type { ReactNode } from "react";

interface CalloutProps {
  /** Icône custom optionnelle (défaut : Info). */
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Encadré court (1-3 phrases) — signal « réponse définitive » pour le lecteur et les crawlers.
 * Généralise le pattern d'AtelierCallout. Le rédacteur place le <strong> d'accroche dans children.
 */
export function Callout({ icon, children }: CalloutProps) {
  return (
    <aside className="callout-block">
      <span className="callout-block__icon" aria-hidden>
        {icon ?? <Info className="size-4" />}
      </span>
      <div className="callout-block__body">{children}</div>
    </aside>
  );
}
