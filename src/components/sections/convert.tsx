// src/components/sections/convert.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoCard } from "@/components/bento/bento-grid";

interface PlanFeature {
  label: string;
}

interface Plan {
  name: string;
  tagline: string;
  price: string;
  duration: string;
  features: PlanFeature[];
  cta: string;
  href: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Audit 180°",
    tagline: "Informatique & organisation — faisons connaissance.",
    price: "Offert",
    duration: "60 min · sans engagement",
    features: [
      { label: "Diagnostic de votre infrastructure" },
      { label: "Analyse des processus actuels" },
      { label: "Identification des quick wins" },
      { label: "Recommandations personnalisées" },
    ],
    cta: "Réserver",
    href: "/contact",
  },
  {
    name: "Audit 360°",
    tagline: "IA Stratégique — feuille de route personnalisée.",
    price: "225 €",
    duration: "~3 h + livrable",
    popular: true,
    features: [
      { label: "Tout l'Audit 180° inclus" },
      { label: "Cartographie cas d'usage IA + ROI" },
      { label: "Feuille de route 6 mois" },
      { label: "Support email 30 j" },
    ],
    cta: "Démarrer",
    href: "/contact",
  },
];

const GUARANTEES = [
  "Sans engagement",
  "Zéro jargon",
  "RGPD compliant",
  "Résultats 48 h",
];

export function Convert() {
  return (
    <section
      id="convert"
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "#0a0811", color: "#fff" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 15% 30%, oklch(0.541 0.281 293 / 0.30), transparent 60%), radial-gradient(ellipse 40% 30% at 85% 70%, oklch(0.828 0.189 84.429 / 0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
        <BentoGrid>
          {/* Titre principal — 5 × 5 */}
          <BentoCard
            variant="dark"
            span={5}
            rows={5}
            pad="lg"
            mobileMinH="320px"
            className="justify-center"
          >
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300">
              / 04 — passons à l&apos;action
            </span>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              Quel est votre
              <br />
              prochain niveau&nbsp;?
            </h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-[1.55] text-white/65">
              Commencez par un diagnostic de 60 min. Zéro engagement, zéro
              jargon technique — juste des solutions concrètes et un plan
              d&apos;action clair.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
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
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          </BentoCard>

          {/* Plan 180° — 4 × 5 */}
          <BentoCard
            variant="dark"
            span={4}
            rows={5}
            pad="lg"
            mobileMinH="420px"
          >
            <PlanCard plan={PLANS[0]} />
          </BentoCard>

          {/* Plan 360° recommandé — 3 × 5 */}
          <BentoCard
            variant="dark"
            span={3}
            rows={5}
            pad="lg"
            mobileMinH="420px"
            className="relative border-violet-400/40! shadow-[0_0_0_1px_oklch(0.702_0.183_293/0.3),0_20px_50px_-20px_oklch(0.541_0.281_293/0.5)]"
          >
            {/* Glow violet */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 80% 100%, oklch(0.541 0.281 293 / 0.55), transparent 60%)",
              }}
            />
            <PlanCard plan={PLANS[1]} />
          </BentoCard>

          {/* Contact direct — 4 × 2 */}
          <BentoCard
            variant="dark"
            span={4}
            rows={2}
            pad="md"
            mobileMinH="180px"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300">
                  Contact direct
                </span>
                <div className="mt-2 text-[1rem] font-semibold tracking-tight text-white">
                  legrand.work@gmail.com
                </div>
                <div className="mt-1 text-[0.75rem] text-white/55">
                  +33 6 79 11 97 74 · Jouy-le-Moutier (95)
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="mailto:legrand.work@gmail.com">Écrire</a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="tel:+33679119774">Appeler</a>
                </Button>
              </div>
            </div>
          </BentoCard>

          {/* Garanties — 4 × 2 */}
          <BentoCard
            variant="dark"
            span={4}
            rows={2}
            pad="md"
            mobileMinH="180px"
          >
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300">
              Nos engagements
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {GUARANTEES.map((g) => (
                <div
                  key={g}
                  className="flex items-center gap-1.5 text-[0.8rem] text-white/85"
                >
                  <Check className="h-3.5 w-3.5 text-violet-300" strokeWidth={2.5} />
                  {g}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Rating — 4 × 2 */}
          <BentoCard
            variant="dark"
            span={4}
            rows={2}
            pad="md"
            mobileMinH="180px"
          >
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300">
              Avis clients
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <div className="text-[2rem] font-bold leading-none tracking-[-0.02em] text-white">
                5.0
              </div>
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="mt-2 text-[0.75rem] text-white/60">
              sur 5 retours clients — BTP, déco, industrie, commerce
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="relative flex h-full flex-col">
      {plan.popular && (
        <span className="absolute right-0 top-0 rounded bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
          Recommandé
        </span>
      )}
      <div>
        <div className="text-[0.95rem] font-semibold tracking-[-0.01em] text-white">
          {plan.name}
        </div>
        <div className="mt-1 text-[0.78rem] leading-normal text-white/60">
          {plan.tagline}
        </div>
      </div>
      <div className="mt-5">
        <div className="text-[2rem] font-bold leading-none tracking-[-0.02em] text-white">
          {plan.price}
        </div>
        <div className="mt-1 inline-flex items-center gap-1.5 text-[0.7rem] text-white/55">
          <Clock className="h-3 w-3" />
          {plan.duration}
        </div>
      </div>
      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className="flex items-start gap-1.5 text-[0.78rem] leading-[1.45] text-white/80"
          >
            <Check
              className="mt-[3px] h-3 w-3 shrink-0 text-violet-300"
              strokeWidth={3}
            />
            {f.label}
          </li>
        ))}
      </ul>
      <Button
        asChild
        className={
          plan.popular
            ? "mt-4 w-full gap-2 bg-primary text-primary-foreground hover:bg-violet-700"
            : "mt-4 w-full gap-2 border border-white/20 bg-transparent text-white hover:bg-white/10"
        }
        variant={plan.popular ? "default" : "outline"}
      >
        <Link href={plan.href}>
          {plan.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
