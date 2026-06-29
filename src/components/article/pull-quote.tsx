import type { ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
}

/** Citation de rythme — Fraunces, filet amber à gauche. Rythme le long-form. */
export function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote">
      <p>{children}</p>
    </blockquote>
  );
}
