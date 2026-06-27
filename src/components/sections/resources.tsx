// src/components/sections/resources.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BentoGrid,
  BentoCard,
  SectionHead,
  Pill,
} from "@/components/bento/bento-grid";
import { ArticleBentoCard } from "@/components/bento/article-bento-card";
import {
  IdeaCardBigNumber,
  type IdeaData,
} from "@/components/widgets/idea-card";
import type { Palette } from "@/components/widgets/palettes";

const IDEAS: Array<IdeaData & { palette: Palette }> = [
  {
    number: "01",
    title: "Robot nettoyeur pour bureaux",
    description:
      "Et si un robot faisait le ménage de votre bureau ? Les chiffres sont convaincants.",
    pros: [
      "−20 % sur le budget ménage annuel",
      "Rapports via application",
      "Image moderne et tech",
    ],
    cons: ["Coût initial élevé (location possible)"],
    seed: 1.1,
    palette: "amber",
  },
  {
    number: "02",
    title: "Secrétaire personnelle IA",
    description:
      "Une assistante infatigable : grâce à l'IA, gagnez des heures précieuses chaque semaine.",
    pros: ["Disponibilité 24/7", "Transcription automatique", "Agenda auto"],
    cons: ["Jugement limité sur cas complexes"],
    seed: 2.3,
    palette: "violet",
  },
  {
    number: "03",
    title: "Optimisation des tournées",
    description:
      "Des livraisons plus malignes : optimisez vos tournées avec des algorithmes.",
    pros: ["−30 % coûts carburant", "Livraisons plus rapides"],
    cons: ["Nécessite données trafic temps réel"],
    seed: 3.5,
    palette: "duo",
  },
];

const FEATURED = {
  slug: "veille-concurrentielle-ia-pme",
  title: "Veille concurrentielle IA : guide pratique 2026",
  excerpt:
    "Automatisez votre veille avec l'IA : méthode en 5 étapes, outils testés et retour terrain pour PME.",
  tags: ["Intelligence Artificielle", "PME"],
  readTime: "8 min",
  image: "/images/blog/veille-concurrentielle-ia-pme.webp",
};

const COMPACT_ARTICLES = [
  {
    slug: "nis2-pme-yvelines-val-doise",
    title: "NIS2 & PME : guide pratique Yvelines / Val d'Oise",
    tags: ["Cybersécurité", "PME"],
    readTime: "10 min",
    image: "/images/blog/nis2-pme-yvelines-val-doise.webp",
  },
  {
    slug: "serveur-mcp-guide-pratique-pme",
    title: "Serveur MCP : connecter l'IA à vos outils métier",
    tags: ["Intelligence Artificielle", "Intégration"],
    readTime: "8 min",
    image: "/images/blog/serveur-mcp-guide-pratique-pme.webp",
  },
  {
    slug: "cout-audit-informatique-yvelines",
    title: "Combien coûte un audit informatique en Yvelines ?",
    tags: ["Audit 360°", "PME"],
    readTime: "8 min",
    image: "/images/blog/cout-audit-informatique-yvelines.webp",
  },
  {
    slug: "automatiser-emails-reseaux-sociaux-ia",
    title: "Automatiser emails & réseaux sociaux : 10 h/sem gagnées",
    tags: ["Intelligence Artificielle", "Productivité"],
    readTime: "7 min",
    image: "/images/blog/automatiser-emails-reseaux-sociaux-ia.webp",
  },
  {
    slug: "ia-redefinit-vente-commerciale",
    title: "Comment l'IA redéfinit la vente commerciale",
    tags: ["Intelligence Artificielle", "Commercial"],
    readTime: "3 min",
    image: "/images/blog/ia-redefinit-vente-commerciale.webp",
  },
  {
    slug: "5-signes-moderniser-informatique-pme",
    title: "5 signes qu'il est temps de moderniser l'informatique",
    tags: ["Audit 360°", "PME"],
    readTime: "3 min",
    image: "/images/blog/5-signes-moderniser-informatique-pme.webp",
  },
];

export function Resources() {
  return (
    <section id="contenus" className="py-16 md:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionHead
          eyebrow="/ 03 — ressources"
          title={
            <>
              Idées PME &amp; articles
              <br />
              pour passer au niveau supérieur.
            </>
          }
          controls={
            <>
              <Pill tone="solid" size="md">
                Tout
              </Pill>
              <Pill tone="outline" size="md">
                Idées
              </Pill>
              <Pill tone="outline" size="md">
                Articles
              </Pill>
              <Pill tone="outline" size="md">
                Études de cas
              </Pill>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
                aria-label="Précédent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="h-11 w-11 rounded-full"
                aria-label="Suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          }
        />

        <BentoGrid>
          {/* Idée 01 — 4 × 4 */}
          <BentoCard span={4} rows={4} variant="flush" mobileMinH="360px">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <IdeaCardBigNumber idea={IDEAS[0]} palette={IDEAS[0].palette} />
            </motion.div>
          </BentoCard>

          {/* Article featured — 4 × 4 */}
          <BentoCard
            span={4}
            rows={4}
            pad="none"
            mobileMinH="420px"
            className="!p-0"
          >
            <ArticleBentoCard article={FEATURED} featured />
          </BentoCard>

          {/* Idée 02 — 4 × 4 */}
          <BentoCard span={4} rows={4} variant="flush" mobileMinH="360px">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full"
            >
              <IdeaCardBigNumber idea={IDEAS[1]} palette={IDEAS[1].palette} />
            </motion.div>
          </BentoCard>

          {/* 3 articles compacts — chacun 3 × 3 */}
          {COMPACT_ARTICLES.slice(0, 3).map((article) => (
            <BentoCard
              key={article.slug}
              span={3}
              rows={3}
              pad="none"
              mobileMinH="300px"
              className="!p-0"
            >
              <ArticleBentoCard article={article} />
            </BentoCard>
          ))}

          {/* Idée 03 — 3 × 3 */}
          <BentoCard span={3} rows={3} variant="flush" mobileMinH="300px">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <IdeaCardBigNumber idea={IDEAS[2]} palette={IDEAS[2].palette} />
            </motion.div>
          </BentoCard>

          {/* 3 autres articles compacts */}
          {COMPACT_ARTICLES.slice(3, 6).map((article) => (
            <BentoCard
              key={article.slug}
              span={3}
              rows={3}
              pad="none"
              mobileMinH="300px"
              className="!p-0"
            >
              <ArticleBentoCard article={article} />
            </BentoCard>
          ))}

          {/* CTA explorer tout — 3 × 3 en accent */}
          <BentoCard
            variant="accent"
            span={3}
            rows={3}
            pad="lg"
            mobileMinH="260px"
            className="justify-between"
          >
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                12 articles · 15 idées
              </span>
              <h3 className="mt-3 text-[1.1rem] font-semibold leading-[1.25] tracking-[-0.015em]">
                Explorer toutes les ressources &amp; études de cas
              </h3>
              <p className="mt-2 text-[0.78rem] leading-[1.5] opacity-75">
                IA, cybersécurité, intégrations MCP, retours PME — tous les
                contenus au même endroit.
              </p>
            </div>
            <Button
              asChild
              className="mt-4 w-fit gap-2 bg-primary text-primary-foreground hover:bg-violet-700"
            >
              <Link href="/blog">
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}
