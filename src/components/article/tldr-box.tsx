import { Zap } from "lucide-react";
import type { ReactNode } from "react";

interface TldrBoxProps {
  children: ReactNode;
}

/** Encadré « L'essentiel en 10 secondes » — le verdict actionnable, extractible Google/LLM. */
export function TldrBox({ children }: TldrBoxProps) {
  return (
    <aside className="tldr-box">
      <p className="tldr-box__label">
        <Zap aria-hidden className="size-[15px]" />
        L&apos;essentiel en 10 secondes
      </p>
      <p className="tldr-box__text">{children}</p>
    </aside>
  );
}
