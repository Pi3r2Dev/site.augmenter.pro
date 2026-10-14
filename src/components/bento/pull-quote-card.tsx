// src/components/bento/pull-quote-card.tsx
"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { sendGTMEvent } from "@next/third-parties/google";
import { GBP_MAPS_URL, GBP_QUOTES } from "@/lib/gbp";

/**
 * Ces deux cartes n'acceptent PAS de citation libre : elles prennent un avis de
 * la fiche Google (`GBP_QUOTES`) et le nom d'un de ses extraits. Impossible
 * donc d'y glisser un témoignage qui n'existe pas sur la fiche — c'est ce qui
 * s'était produit jusqu'au 2026-10-14 (cf. `src/lib/gbp.ts`).
 */
type GbpQuote = (typeof GBP_QUOTES)[number];

interface QuoteCardProps<Q extends GbpQuote = GbpQuote> {
  review: Q;
  excerpt: keyof Q["excerpts"];
  /** Emplacement remonté dans l'événement GTM `gbp_click`. */
  location: string;
}

function Stars({ count, size }: { count: number; size: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
        </svg>
      ))}
    </>
  );
}

function GbpSourceLink({
  location,
  className,
}: {
  location: string;
  className: string;
}) {
  return (
    <a
      href={GBP_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => sendGTMEvent({ event: "gbp_click", location })}
      className={className}
    >
      Avis Google
      <ArrowUpRight className="h-3 w-3" aria-hidden />
    </a>
  );
}

/**
 * Grande citation pour sections bento sombres.
 * Guillemet décoratif + extrait d'avis Google + auteur/rôle + lien vers la fiche.
 */
export function PullQuoteCard({ review, excerpt, location }: QuoteCardProps) {
  const quote = review.excerpts[excerpt as keyof GbpQuote["excerpts"]];
  return (
    <figure className="flex h-full flex-col justify-between p-6 sm:p-7">
      <div
        aria-hidden
        className="select-none font-serif text-[3rem] leading-[0.4] text-violet-300"
        style={{ fontFamily: "Georgia, serif" }}
      >
        &ldquo;
      </div>
      <blockquote className="mt-4 flex-1 text-[1rem] font-medium leading-[1.5] text-white sm:text-[1.05rem]">
        {quote}
      </blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center gap-2 text-[0.72rem] text-white/60">
        <span className="font-semibold text-white">{review.author}</span>
        <span>·</span>
        <span>{review.role}</span>
        <span
          className="ml-auto flex gap-0.5 text-[oklch(0.828_0.189_84.429)]"
          role="img"
          aria-label={`${review.stars} étoiles sur Google`}
        >
          <Stars count={review.stars} size={11} />
        </span>
        <GbpSourceLink
          location={location}
          className="inline-flex items-center gap-1 font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
        />
      </figcaption>
    </figure>
  );
}

/**
 * Mini carte blanche pour le hero : étoiles + extrait d'avis Google + lien.
 */
export function MiniQuoteCard({ review, excerpt, location }: QuoteCardProps) {
  const quote = review.excerpts[excerpt as keyof GbpQuote["excerpts"]];
  return (
    <figure className="flex h-full flex-col p-5">
      <div
        className="flex gap-0.5 text-[oklch(0.828_0.189_84.429)]"
        role="img"
        aria-label={`${review.stars} étoiles sur Google`}
      >
        <Stars count={review.stars} size={11} />
      </div>
      <blockquote className="mt-2 flex-1 text-[0.88rem] italic leading-[1.45] text-foreground">
        &laquo;&nbsp;{quote}&nbsp;&raquo;
      </blockquote>
      <figcaption className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.7rem] text-muted-foreground">
        <span className="font-semibold text-foreground not-italic">
          {review.author}
        </span>
        <span>·</span>
        <span>{review.role}</span>
        <GbpSourceLink
          location={location}
          className="ml-auto inline-flex items-center gap-0.5 font-medium underline-offset-4 hover:text-foreground hover:underline"
        />
      </figcaption>
    </figure>
  );
}
