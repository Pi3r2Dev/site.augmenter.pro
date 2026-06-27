// src/components/sections/hero.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoCard, Pill } from "@/components/bento/bento-grid";
import { MiniQuoteCard } from "@/components/bento/pull-quote-card";
import { TrustStatCard } from "@/components/widgets/trust-stat";

/**
 * Hero bento : fusion du bloc héro + indicateurs de confiance + preuve sociale.
 * Layout Home.html ligne 255-352 : 6-3-3 / 3-3-3-3.
 */
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
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Pill tone="primary" size="md">
                <Sparkles className="h-3 w-3" />
                Conseil IA &amp; Transformation numérique
              </Pill>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            >
              Votre PME,{" "}
              <span className="gradient-text">augmentée par l&apos;IA.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4 max-w-136 text-[0.95rem] leading-[1.55] text-muted-foreground"
            >
              Nous accompagnons les PME et indépendants à trouver l&apos;équilibre
              parfait entre <strong className="font-semibold text-foreground">performance humaine</strong> et{" "}
              <strong className="font-semibold text-foreground">numérique</strong>. IA,
              digitalisation, robotique — des solutions sur mesure qui tiennent la route.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-5 flex flex-wrap items-center gap-2.5"
            >
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
            </motion.div>
          </BentoCard>

          {/* Stat widget violet */}
          <BentoCard span={3} rows={2} variant="flush" mobileMinH="180px">
            <TrustStatCard
              stat={{
                icon: Target,
                value: "60 min",
                label: "Diagnostic offert",
                description: "Audit complet de votre SI",
                seed: 1.1,
              }}
              palette="violet"
            />
          </BentoCard>

          {/* Stat widget cold */}
          <BentoCard span={3} rows={2} variant="flush" mobileMinH="180px">
            <TrustStatCard
              stat={{
                icon: MapPin,
                value: "78 & 95",
                label: "Zone d'intervention",
                description: "Yvelines, Val d'Oise & distance",
                seed: 2.2,
              }}
              palette="cold"
            />
          </BentoCard>

          {/* Image vedette — cas client Odoo */}
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
          </BentoCard>

          {/* Mini citation client */}
          <BentoCard span={3} rows={2} pad="none" mobileMinH="180px">
            <MiniQuoteCard
              quote="Devis passés de 2 h à 15 min — mon équipe se concentre sur les chantiers."
              author="Nathalie R."
              role="BTP · 95"
            />
          </BentoCard>

          {/* Stat duo (−30%) */}
          <BentoCard span={3} rows={2} variant="flush" mobileMinH="180px">
            <TrustStatCard
              stat={{
                icon: TrendingUp,
                value: "−30 %",
                label: "Temps gagné",
                description: "Sur les tâches automatisées",
                seed: 3.3,
              }}
              palette="duo"
            />
          </BentoCard>

          {/* Stat amber (48h) */}
          <BentoCard span={3} rows={2} variant="flush" mobileMinH="180px">
            <TrustStatCard
              stat={{
                icon: Sparkles,
                value: "48 h",
                label: "Premiers résultats",
                description: "Quick wins déployés",
                seed: 4.4,
              }}
              palette="amber"
            />
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}
