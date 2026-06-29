import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface KeyTakeawaysProps {
  /** Titre du bloc (défaut : « Par où commencer »). */
  title?: string;
  /** Une liste <ul><li>…</li></ul> rédigée par l'auteur. */
  children: ReactNode;
}

/** Boîte violet-sombre des points-clés actionnables. */
export function KeyTakeaways({
  title = "Par où commencer",
  children,
}: KeyTakeawaysProps) {
  return (
    <aside className="takeaways-block">
      <p className="takeaways-block__label">
        <Check aria-hidden className="size-[15px]" />
        {title}
      </p>
      {children}
    </aside>
  );
}
