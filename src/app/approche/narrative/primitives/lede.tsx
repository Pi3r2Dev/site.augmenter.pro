"use client";

import { ReactNode } from "react";

interface LedeProps {
  children: ReactNode;
  size?: "default" | "xl";
  /** `h1` pour le titre d'ouverture d'une page narrative (une page sans h1 a une
   *  arborescence d'accessibilité mal formée). `h2` partout ailleurs. Le style est
   *  identique : les règles CSS ciblent `:is(h1, h2)[data-anim="words"]`. */
  as?: "h1" | "h2";
}

// The <em> brand gradient + <u> highlighter styling lives in globals.css
// under h2[data-anim="words"] selectors. That's the only place that
// correctly survives the word-splitter mutation (see handoff README
// section "CRITICAL gotcha — <em> gradient + word splitter").
export function Lede({ children, size = "default", as = "h2" }: LedeProps) {
  const fontSize =
    size === "xl"
      ? "clamp(48px, 9vw, 144px)"
      : "clamp(40px, 7.5vw, 112px)";
  const Tag = as;
  return (
    <Tag
      data-anim="words"
      className="text-balance font-bold leading-[0.96] tracking-[-0.035em] text-(--fg)"
      style={{ fontSize }}
    >
      {children}
    </Tag>
  );
}
