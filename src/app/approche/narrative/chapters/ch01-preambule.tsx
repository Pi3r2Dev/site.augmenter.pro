"use client";

import Link from "next/link";
import { useRef } from "react";
import { Chapter } from "../primitives/chapter";
import { Pill } from "../primitives/pill";
import { Lede } from "../primitives/lede";
import { useWordSplitter } from "../primitives/word-splitter";

export function Ch01Preambule() {
  const ledeRef = useRef<HTMLDivElement>(null);
  useWordSplitter(ledeRef);

  return (
    <Chapter id="ch-01" num="01" title="Préambule" mood="dawn" theme="light">
      <div data-anim="up">
        <Pill>Un récit en huit chapitres</Pill>
      </div>
      <div ref={ledeRef}>
        {/* as="h1" : titre d'ouverture de /approche — la page n'avait aucun h1,
            ce qui casse l'arborescence d'accessibilité (agents IA, lecteurs d'écran)
            et prive la page de son signal de titre principal. Rendu identique. */}
        <Lede as="h1">
          Votre PME, <em>augmentée</em> par l&apos;IA.
          <br />
          Sans gourou, sans <u>jargon</u>.
        </Lede>
      </div>
      <p
        data-anim="up"
        className="max-w-[56ch] text-[clamp(17px,1.5vw,22px)] leading-relaxed text-(--fg-muted)"
      >
        Nous accompagnons les PME et indépendants à trouver l&apos;équilibre
        entre performance humaine et numérique. Formation en présentiel en
        Yvelines et Val d&apos;Oise, conseil et audits en visio partout en
        France — des solutions sur mesure qui tiennent la route.
      </p>
      <div
        data-anim="up"
        className="flex items-center gap-3 text-[13px] text-(--fg-muted)"
      >
        <span
          aria-hidden
          className="h-[38px] w-[38px] rounded-full"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.811 0.111 293), oklch(0.828 0.189 84.429))",
          }}
        />
        <span>
          Récit de méthode ·{" "}
          <Link
            href="/auteur/pierre-legrand"
            data-hover
            className="font-medium text-(--fg) underline-offset-2 hover:underline"
          >
            Pierre Legrand
          </Link>{" "}
          · Consultant indépendant
        </span>
      </div>
      <div
        data-anim="up"
        className="absolute right-10 top-[140px] hidden text-right font-mono text-[11px] uppercase leading-[1.7] tracking-[0.14em] text-(--fg-muted) md:block"
      >
        Mai 2026
        <br />
        <strong className="font-medium text-(--fg)">
          Jouy-le-Moutier (95)
        </strong>
        <br />
        47°N · 2°E
      </div>
    </Chapter>
  );
}
