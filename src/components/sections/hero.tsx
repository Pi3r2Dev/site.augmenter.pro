// src/components/sections/hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoCard, Pill } from "@/components/bento/bento-grid";
import { MiniQuoteCard } from "@/components/bento/pull-quote-card";
import { NavTileCard, type NavTileData } from "@/components/widgets/nav-tile";
import type { Palette } from "@/components/widgets/palettes";

/**
 * Hero bento de `/` : fusion du bloc héro, des tuiles de navigation et de la
 * preuve sociale.
 *
 * Les quatre tuiles ont remplacé les cartes de statistiques : elles ne portent
 * plus un chiffre mais une porte d'entrée. Muettes au repos sur desktop,
 * libellées sur mobile (cf. NavTileCard).
 *
 * LCP : h1 + lede en HTML opaque (pas de motion opacity nulle — Lighthouse
 * 2026-08-19 mesurait 6,9 s de LCP dont 2,3 s de délai d'élément).
 */

const NAV_TILES: Array<NavTileData & { palette: Palette }> = [
  {
    label: "IA souveraines",
    // TODO(lot 5) : repointer vers /ia-souveraine-pme une fois la page écrite.
    href: "/audit-ia-pme",
    seed: 1.1,
    palette: "violet",
  },
  {
    label: "Intégrations profondes",
    href: "/integration-mcp",
    seed: 2.2,
    palette: "cold",
  },
  {
    label: "Développement sur mesure",
    href: "/projets",
    seed: 3.3,
    palette: "duo",
  },
  {
    label: "Formation continue",
    href: "/atelier-claude-code-dirigeant",
    seed: 4.4,
    palette: "amber",
  },
];

function NavTile({ index }: { index: number }) {
  const tile = NAV_TILES[index];
  return (
    <BentoCard
      span={3}
      rows={2}
      variant="flush"
      mobileMinH="96px"
      className="col-span-3"
    >
      <NavTileCard tile={tile} palette={tile.palette} />
    </BentoCard>
  );
}

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <BentoGrid>
          {/* Titre principal — 6 colonnes × 4 rangées */}
          <BentoCard
            span={6}
            rows={4}
            pad="lg"
            mobileMinH="320px"
            className="justify-end"
          >
            <div>
              <Pill tone="primary" size="md">
                <Sparkles className="h-3 w-3" />
                Conseil IA &amp; Transformation numérique
              </Pill>
            </div>
            <h1 className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              Votre PME,{" "}
              <span className="gradient-text">augmentée par l&apos;IA.</span>
            </h1>
            <p className="mt-4 max-w-136 text-[0.95rem] leading-[1.55] text-muted-foreground">
              La performance naît de l&apos;équilibre entre{" "}
              <strong className="font-semibold text-foreground">
                l&apos;humain
              </strong>
              , ses{" "}
              <strong className="font-semibold text-foreground">outils</strong>{" "}
              et ses{" "}
              <strong className="font-semibold text-foreground">
                habitudes
              </strong>
              . On diagnostique l&apos;existant, on branche l&apos;IA dans les
              logiciels que vous avez déjà, on forme vos équipes — et vous
              choisissez où vivent vos données.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Diagnostic — 60 min
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/approche#prestations">Voir nos prestations</Link>
              </Button>
              <span className="ml-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary" />
                78 &amp; 95 · présentiel ou distance
              </span>
            </div>
          </BentoCard>

          {/* Tuiles 1-2 — colonnes de droite, rangées 1-2 */}
          <NavTile index={0} />
          <NavTile index={1} />

          {/* Image vedette — cas client Odoo, cliquable vers l'article */}
          <BentoCard
            span={3}
            rows={2}
            pad="none"
            mobileMinH="220px"
            className="border-transparent!"
          >
            <div className="absolute inset-0">
              <Image
                src="/images/blog/configurer-odoo-ia-claude-cowork.webp"
                alt="Cas client : Odoo configuré avec Claude Cowork"
                fill
                sizes="(max-width:768px) 100vw, 25vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)",
                }}
              />
            </div>
            <div className="absolute right-3 top-3">
              <Pill tone="outline" size="sm" className="bg-white/95">
                IA · cas client
              </Pill>
            </div>
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
                Odoo configuré avec Claude
              </span>
              <span className="inline-flex items-center rounded-full bg-foreground px-2.5 py-1 text-[11px] font-semibold text-background">
                −3 500 €
              </span>
            </div>
            <Link
              href="/blog/configurer-odoo-ia-claude-cowork"
              className="absolute inset-0 z-20 rounded-[22px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="sr-only">
                Lire le cas client : configurer Odoo avec l&apos;IA, 4 jours au
                lieu de 3 500 €
              </span>
            </Link>
          </BentoCard>

          {/* Mini citation client */}
          <BentoCard span={3} rows={2} pad="none" mobileMinH="180px">
            <MiniQuoteCard
              quote="Moodboards et 3D livrés en 48 h au lieu d'une semaine — la qualité a monté d'un cran."
              author="Maud J."
              role="Architecte d'intérieur"
            />
          </BentoCard>

          {/* Tuiles 3-4 — sous le titre, rangées 5-6 */}
          <NavTile index={2} />
          <NavTile index={3} />
        </BentoGrid>
      </div>
    </section>
  );
}
