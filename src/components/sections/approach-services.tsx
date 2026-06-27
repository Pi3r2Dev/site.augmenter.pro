// src/components/sections/approach-services.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BentoGrid,
  BentoCard,
  SectionHead,
  Pill,
} from "@/components/bento/bento-grid";
import { PullQuoteCard } from "@/components/bento/pull-quote-card";
import {
  ServiceCardStat,
  type ServiceData,
} from "@/components/widgets/service-card";
import type { Palette } from "@/components/widgets/palettes";

interface Step {
  num: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Diagnostic",
    description:
      "Audit complet de vos outils, processus et habitudes. On identifie ce qui fonctionne et ce qui freine.",
  },
  {
    num: "02",
    title: "Solutions sur mesure",
    description:
      "Recommandations adaptées à votre métier, budget et maturité numérique. Pas de solution générique.",
  },
  {
    num: "03",
    title: "Accompagnement",
    description:
      "Développement logiciel et formation humaine alignés avec votre ambition. Vos équipes montent en compétence.",
  },
  {
    num: "04",
    title: "Itération",
    description:
      "Suivi, mesure des résultats et ajustements. Des habitudes solides pour des résultats durables.",
  },
];

const SERVICES: Array<ServiceData & { palette: Palette }> = [
  {
    tag: "Intelligence artificielle",
    title: "L'IA au service de votre métier",
    description:
      "Automatisez les tâches répétitives, analysez vos données, prenez de meilleures décisions — adaptées à votre métier.",
    stat: "10h",
    seed: 1.2,
    palette: "violet",
    href: "/approche#prestations",
  },
  {
    tag: "Digitalisation",
    title: "Digitalisation, mais humaine",
    description:
      "Changer d'outil est un projet humain avant d'être technique. Nous accompagnons vos équipes vers des outils qui simplifient vraiment.",
    stat: "3×",
    seed: 2.4,
    palette: "duo",
    href: "/approche#prestations",
  },
  {
    tag: "Robotique & IoT",
    title: "Robotique, capteurs & terrain",
    description:
      "Drones, robots, capteurs, caméras — on explore les technologies émergentes adaptées à votre secteur et à vos contraintes terrain.",
    stat: "24/7",
    seed: 3.7,
    palette: "amber",
    href: "/approche#prestations",
  },
];

export function ApproachServices() {
  return (
    <section
      id="approche"
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "#0a0811", color: "#fff" }}
    >
      {/* Aurora décorative en fond — radial gradient violet + amber */}
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
          eyebrow="/ 02 — approche & prestations"
          eyebrowTone="dark"
          title={
            <>
              La performance naît de l&apos;équilibre entre l&apos;
              <em className="not-italic text-violet-300">humain</em>, ses{" "}
              <em className="not-italic text-amber-400">outils</em> et ses
              habitudes.
            </>
          }
          controls={
            <>
              <Pill tone="dark" size="md">
                Méthode · 4 étapes
              </Pill>
              <Pill tone="solid" size="md" className="bg-white! text-foreground! border-white!">
                3 leviers
              </Pill>
            </>
          }
        />

        <BentoGrid>
          {/* 4 étapes — chacune 3 colonnes × 2 rangées */}
          {STEPS.map((step, i) => (
            <BentoCard
              key={step.num}
              variant="dark"
              span={3}
              rows={2}
              mobileMinH="160px"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex h-full flex-col"
              >
                <div className="gradient-text text-[1.8rem] font-extrabold leading-none tracking-[-0.02em]">
                  {step.num}
                </div>
                <h3 className="mt-2.5 text-[0.95rem] font-semibold">
                  {step.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[0.78rem] leading-normal text-white/60">
                  {step.description}
                </p>
                <div className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-violet-300">
                  Étape {step.num}
                </div>
              </motion.div>
            </BentoCard>
          ))}

          {/* 3 widgets services — chacun 3 colonnes × 4 rangées */}
          {SERVICES.map((svc, i) => (
            <BentoCard
              key={svc.tag}
              variant="flush"
              span={3}
              rows={4}
              mobileMinH="340px"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="h-full"
              >
                <ServiceCardStat service={svc} palette={svc.palette} />
              </motion.div>
            </BentoCard>
          ))}

          {/* Grande citation — 3 colonnes × 4 rangées */}
          <BentoCard
            variant="dark"
            span={3}
            rows={4}
            pad="none"
            mobileMinH="240px"
          >
            <PullQuoteCard
              quote="Moodboards et 3D livrés en 48 h au lieu d'une semaine — la qualité a monté d'un cran."
              author="Maud J."
              role="Architecte d'intérieur indépendante"
              stars={5}
            />
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}
