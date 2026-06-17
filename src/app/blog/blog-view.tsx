"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Mail,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BentoGrid,
  BentoCard,
  SectionHead,
  Pill,
} from "@/components/bento/bento-grid";
import { ArticleBentoCard } from "@/components/bento/article-bento-card";
import { TrustStatCard } from "@/components/widgets/trust-stat";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import { ARTICLES } from "@/data/resources";

const FILTERS = ["Tout", "IA", "PME", "Commercial", "Cybersécurité", "Audit 360°"] as const;
type FilterTag = (typeof FILTERS)[number];

export function BlogView() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("Tout");

  const filteredArticles = useMemo(() => {
    if (activeFilter === "Tout") return ARTICLES;
    return ARTICLES.filter((a) => a.tags.includes(activeFilter));
  }, [activeFilter]);

  const [featured, ...rest] = filteredArticles;

  return (
    <div className="pt-16">
      {/* ═══════════════════ HERO — bento clair ═══════════════════ */}
      <section className="hero-gradient relative overflow-hidden py-14 md:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <BentoGrid>
            {/* Titre — 8 × 3 */}
            <BentoCard
              span={8}
              rows={3}
              pad="lg"
              mobileMinH="280px"
              className="relative isolate justify-end overflow-hidden"
            >
              {/* Three.js shader paint — same engine as home/approche, palette
                  dawn for readability. 60% opacity so the dark text remains
                  comfortably above WCAG AA. */}
              <ShaderBackdrop mood="dawn" opacity={0.6} />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <Pill tone="primary" size="md">
                  <BookOpen className="h-3 w-3" />
                  {ARTICLES.length} articles · mis à jour 2026
                </Pill>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="relative z-10 mt-4 text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em]"
              >
                Articles &amp; <span className="gradient-text">Tutos</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="relative z-10 mt-4 max-w-xl text-[0.95rem] leading-normal text-muted-foreground"
              >
                Conseils pratiques pour les professionnels qui veulent passer au
                niveau supérieur. <strong className="font-semibold text-foreground">IA, commercial, audit, cybersécurité</strong> —
                sans jargon, terrain.
              </motion.p>
            </BentoCard>

            {/* Stat articles */}
            <BentoCard span={4} rows={3} variant="flush" mobileMinH="220px">
              <TrustStatCard
                stat={{
                  icon: Sparkles,
                  value: `${ARTICLES.length}`,
                  label: "Articles publiés",
                  description: "Guides, tutos et études de cas",
                  seed: 2.7,
                }}
                palette="violet"
              />
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* ═══════════════════ LISTE — bento clair ═══════════════════ */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <SectionHead
            eyebrow="/ tous les articles"
            title="Tous les contenus, du plus récent au plus ancien."
            controls={
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Filtres par catégorie"
              >
                {FILTERS.map((label) => {
                  const isActive = activeFilter === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(label)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? "border border-foreground bg-foreground text-background"
                          : "border border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            }
          />

          {!featured && (
            <div className="mb-8 rounded-2xl border border-dashed border-border/60 bg-background p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Aucun article dans la catégorie{" "}
                <strong className="font-semibold text-foreground">{activeFilter}</strong>{" "}
                pour le moment.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("Tout")}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Voir tous les articles
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <BentoGrid>
            {/* Article vedette — 6 × 5 */}
            {featured && (
              <BentoCard
                span={6}
                rows={5}
                pad="none"
                mobileMinH="440px"
              >
                <ArticleBentoCard article={featured} featured />
              </BentoCard>
            )}

            {/* Carte newsletter — 6 × 2 accent */}
            <BentoCard
              variant="accent"
              span={6}
              rows={2}
              pad="lg"
              mobileMinH="180px"
            >
              <div className="flex h-full flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Newsletter
                  </span>
                  <h3 className="mt-1.5 text-[1.05rem] font-semibold leading-tight">
                    1 email, 2 cas client, 0 blabla — mensuel.
                  </h3>
                </div>
                <Button asChild className="shrink-0 gap-2">
                  <Link href="/contact">
                    <Mail className="h-4 w-4" />
                    Je m&apos;abonne
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </BentoCard>

            {/* 2 premiers articles — 3 × 3 chacun */}
            {rest.slice(0, 2).map((article) => (
              <BentoCard
                key={article.slug}
                span={3}
                rows={3}
                pad="none"
                mobileMinH="300px"
              >
                <ArticleBentoCard article={article} />
              </BentoCard>
            ))}

            {/* 3 articles suivants — 4 × 3 */}
            {rest.slice(2, 5).map((article) => (
              <BentoCard
                key={article.slug}
                span={4}
                rows={3}
                pad="none"
                mobileMinH="300px"
              >
                <ArticleBentoCard article={article} />
              </BentoCard>
            ))}

            {/* 4 articles suivants — 3 × 3 */}
            {rest.slice(5, 9).map((article) => (
              <BentoCard
                key={article.slug}
                span={3}
                rows={3}
                pad="none"
                mobileMinH="300px"
              >
                <ArticleBentoCard article={article} />
              </BentoCard>
            ))}

            {/* Derniers articles */}
            {rest.slice(9).map((article) => (
              <BentoCard
                key={article.slug}
                span={3}
                rows={3}
                pad="none"
                mobileMinH="300px"
              >
                <ArticleBentoCard article={article} />
              </BentoCard>
            ))}

            {/* CTA final — 3 × 3 accent (comble la dernière colonne) */}
            <BentoCard
              variant="accent"
              span={3}
              rows={3}
              pad="lg"
              mobileMinH="280px"
              className="justify-between"
            >
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Besoin sur mesure ?
                </span>
                <h3 className="mt-3 text-[1.1rem] font-semibold leading-tight">
                  Un audit de 60 min suffit pour savoir par où commencer.
                </h3>
                <p className="mt-2 text-[0.8rem] leading-normal opacity-75">
                  Sans engagement, livrable chiffré.
                </p>
              </div>
              <Button asChild className="w-fit gap-2">
                <Link href="/contact">
                  Réserver
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>
    </div>
  );
}
