"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  ArrowRight,
  Lightbulb,
  MessageSquare,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BentoGrid,
  BentoCard,
  SectionHead,
  Pill,
} from "@/components/bento/bento-grid";
import { PullQuoteCard } from "@/components/bento/pull-quote-card";
import { IdeaCardBigNumber } from "@/components/widgets/idea-card";
import { TrustStatCard } from "@/components/widgets/trust-stat";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import { IDEAS, IDEE_SECTORS, type IdeeSector } from "@/data/resources";

const SECTORS = IDEE_SECTORS;
type Sector = IdeeSector;

export function IdeesView() {
  const [activeSector, setActiveSector] = useState<Sector>("Tout");

  const filteredIdeas = useMemo(() => {
    if (activeSector === "Tout") return IDEAS;
    return IDEAS.filter((idea) => idea.sector === activeSector);
  }, [activeSector]);

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
              <ShaderBackdrop mood="dawn" opacity={0.6} />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <Pill tone="primary" size="md">
                  <Lightbulb className="h-3 w-3" />
                  Inspiration · {IDEAS.length} idées chiffrées
                </Pill>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="relative z-10 mt-4 text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em]"
              >
                Idées <span className="gradient-text">PRO</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="relative z-10 mt-4 max-w-xl text-[0.95rem] leading-normal text-muted-foreground"
              >
                Des idées concrètes, chiffrées et honnêtes pour augmenter votre
                entreprise.{" "}
                <strong className="font-semibold text-foreground">
                  Avantages ET points d&apos;attention
                </strong>{" "}
                — pour décider en connaissance de cause.
              </motion.p>
              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {SECTORS.map((sector) => {
                  const isActive = activeSector === sector;
                  return (
                    <button
                      key={sector}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveSector(sector)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? "border border-foreground bg-foreground text-background"
                          : "border border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {sector}
                    </button>
                  );
                })}
              </div>
            </BentoCard>

            {/* Stat ROI */}
            <BentoCard span={4} rows={3} variant="flush" mobileMinH="200px">
              <TrustStatCard
                stat={{
                  icon: Sparkles,
                  value: "30 %",
                  label: "ROI moyen",
                  description: "sur les cas clients implémentés",
                  seed: 4.2,
                }}
                palette="duo"
              />
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* ═══════════════════ IDÉES — bento dark ═══════════════════ */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{ background: "#0a0811", color: "#fff" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 12% 20%, oklch(0.541 0.281 293 / 0.35), transparent 60%), radial-gradient(ellipse 40% 30% at 88% 80%, oklch(0.828 0.189 84.429 / 0.10), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
          <SectionHead
            eyebrow="/ catalogue"
            eyebrowTone="dark"
            title={
              activeSector === "Tout" ? (
                <>
                  {IDEAS.length} idées <em className="not-italic text-violet-300">qui facturent</em>{" "}
                  — du voicebot immo au scoring crédit.
                </>
              ) : (
                <>
                  {filteredIdeas.length} idée{filteredIdeas.length > 1 ? "s" : ""}{" "}
                  <em className="not-italic text-violet-300">
                    {activeSector.toLowerCase()}
                  </em>
                  .
                </>
              )
            }
            controls={
              activeSector !== "Tout" ? (
                <button
                  type="button"
                  onClick={() => setActiveSector("Tout")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white"
                >
                  <X className="h-3 w-3" />
                  Réinitialiser le filtre
                </button>
              ) : null
            }
          />

          {filteredIdeas.length === 0 && (
            <div className="mb-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
              <p className="text-sm text-white/65">
                Aucune idée dans le secteur{" "}
                <strong className="font-semibold text-white">{activeSector}</strong>{" "}
                pour le moment.
              </p>
              <button
                type="button"
                onClick={() => setActiveSector("Tout")}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 hover:underline"
              >
                Voir toutes les idées
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <BentoGrid>
            {/* Idées filtrées — chaque 4 cols × 4 rangées */}
            {filteredIdeas.map((idea, i) => (
              <BentoCard
                key={idea.number}
                variant="flush"
                span={4}
                rows={4}
                mobileMinH="360px"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="h-full"
                >
                  <IdeaCardBigNumber
                    idea={idea}
                    palette={idea.palette}
                    href={
                      idea.articleSlug
                        ? `/blog/${idea.articleSlug}`
                        : undefined
                    }
                    hrefLabel={idea.hrefLabel}
                  />
                </motion.div>
              </BentoCard>
            ))}

            {/* Carte "Comment choisir" — 6 × 2 */}
            <BentoCard
              variant="dark"
              span={6}
              rows={2}
              pad="lg"
              mobileMinH="180px"
            >
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300">
                Comment décider
              </span>
              <h3 className="mt-2 text-[1.1rem] font-semibold leading-tight">
                3 questions avant d&apos;investir
              </h3>
              <ul className="mt-3 flex-1 space-y-1.5 text-[0.85rem] leading-normal text-white/75">
                <li>
                  1. Quelle tâche répétitive consomme le plus d&apos;heures par
                  semaine ?
                </li>
                <li>2. Le ROI se mesure-t-il en &lt; 12 mois ?</li>
                <li>
                  3. L&apos;équipe est-elle prête au changement d&apos;outil ?
                </li>
              </ul>
            </BentoCard>

            {/* Pull quote — 6 × 2 */}
            <BentoCard
              variant="dark"
              span={6}
              rows={2}
              pad="none"
              mobileMinH="180px"
            >
              <PullQuoteCard
                quote="Devis passés de 2 h à 15 min — mon équipe se concentre sur les chantiers."
                author="Nathalie R."
                role="BTP · 95"
                stars={5}
              />
            </BentoCard>

            {/* CTA propose ton idée — 12 × 2 accent */}
            <BentoCard
              variant="accent"
              span={12}
              rows={2}
              pad="lg"
              mobileMinH="160px"
            >
              <div className="flex h-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Une autre idée en tête ?
                  </span>
                  <h3 className="mt-1.5 text-[1.05rem] font-semibold leading-tight">
                    Décrivez votre cas d&apos;usage — on estime le ROI sous 48 h.
                  </h3>
                </div>
                <Button asChild className="shrink-0 gap-2">
                  <Link href="/contact">
                    <MessageSquare className="h-4 w-4" />
                    Proposer une idée
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* ═══════════════════ CTA final ═══════════════════ */}
      <section className="py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <BentoGrid>
            <BentoCard
              variant="dark"
              span={12}
              rows={3}
              pad="lg"
              mobileMinH="260px"
              className="items-center justify-center text-center"
            >
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300">
                / prochaine étape
              </span>
              <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Laquelle mettez-vous en place cette année ?
              </h2>
              <p className="mt-3 max-w-xl text-[0.95rem] text-white/65">
                Un diagnostic de 60 min suffit pour savoir par où commencer. Sans
                engagement, livrable chiffré en main.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-violet-700"
                >
                  <Link href="/contact">
                    Réserver mon diagnostic
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <a
                    href="https://wa.me/33679119774"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sendGTMEvent({ event: "whatsapp_click", location: "idees" })}
                  >
                    WhatsApp
                  </a>
                </Button>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>
    </div>
  );
}
