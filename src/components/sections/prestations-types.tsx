// src/components/sections/prestations-types.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BentoGrid,
  BentoCard,
  SectionHead,
  Pill,
} from "@/components/bento/bento-grid";
import { PALETTES } from "@/components/widgets/palettes";

interface Prestation {
  /** Famille de besoin, en langage métier (pas en langage techno). */
  tag: string;
  /** Le résultat promis, formulé comme une tâche que le dirigeant reconnaît. */
  title: string;
  /** La douleur, frontale, avant toute solution (charte éditoriale). */
  pain: string;
  /** Ce qu'on livre concrètement. */
  delivery: string;
  /** Une preuve vérifiable : chiffre terrain ou garantie de méthode. */
  proof: string;
  /** Contextes où cette prestation se rencontre le plus. */
  sectors: string;
  /** Teinte d'accent, tirée du design system (widgets/palettes.ts). */
  accent: string;
}

/**
 * Les 6 prestations types.
 *
 * Formulées en tâche métier plutôt qu'en catégorie techno : les données GSC
 * montrent que les décideurs cherchent la tâche et l'outil ("devis", "catalogue",
 * "stock"), pas la discipline ("conseil IA"). Chaque entrée suit l'arc
 * douleur puis livrable puis preuve de la charte éditoriale.
 */
const PRESTATIONS: Prestation[] = [
  {
    tag: "Documentation & réglementaire",
    title: "Retrouver la bonne référence en 10 secondes",
    pain: "Vos commerciaux fouillent des PDF pendant qu'un client patiente au téléphone. Le bon document existe, personne ne sait plus où.",
    delivery:
      "Un assistant qui répond en citant sa source : fiche technique, certificat, procès-verbal, clause de contrat. Vérifiable, donc opposable.",
    proof: "Réponse sourcée, ou pas de réponse",
    sectors: "Négoce technique · BTP · Industrie",
    accent: PALETTES.violet.b,
  },
  {
    tag: "Chiffrage & devis",
    title: "Un devis en 15 minutes, pas en 2 heures",
    pain: "Chaque agence chiffre à sa façon. Le même chantier ressort à deux prix différents selon la personne qui décroche.",
    delivery:
      "Un assistant de chiffrage nourri par votre catalogue et vos règles de marge, qui produit un devis structuré et homogène d'un site à l'autre.",
    proof: "2 h → 15 min, PME du BTP",
    sectors: "BTP · Négoce · Services",
    accent: PALETTES.duo.c,
  },
  {
    tag: "Catalogue & commandes",
    title: "Un catalogue d'aplomb, puis un portail de commande",
    pain: "Vos clients réguliers commandent par téléphone et par mail. Chaque commande est ressaisie à la main, et chaque ressaisie est une erreur en puissance.",
    delivery:
      "On remet d'abord le catalogue en ordre (familles, références, fiches produit), et seulement ensuite on ouvre le réassort en ligne. L'ordre inverse échoue toujours.",
    proof: "Trois personnes une semaine, désormais une journée",
    sectors: "Distribution · Négoce B2B · E-commerce",
    accent: PALETTES.amber.b,
  },
  {
    tag: "Stocks & approvisionnement",
    title: "Savoir quoi commander, et quand",
    pain: "Du stock dormant sur un site, une rupture sur l'autre. Et des frais de port payés parce que personne ne voyait qu'il manquait 80 € pour atteindre le franco.",
    delivery:
      "Le besoin net calculé pour vous (commandes confirmées, moins le stock, moins ce qui est déjà en route) et le seuil de franco de port affiché avant de valider.",
    proof: "Le franco affiché avant de valider la commande",
    sectors: "Distribution · Multi-dépôts · Atelier",
    accent: PALETTES.cold.b,
  },
  {
    tag: "Back-office & liaisons",
    title: "Faire parler deux logiciels qui s'ignorent",
    pain: "Les mêmes lignes saisies trois fois : dans la gestion commerciale, sur le portail fournisseur, chez le transporteur. Personne n'a signé pour ça.",
    delivery:
      "Le pont entre vos outils, y compris quand aucun n'expose d'API : export mensuel vers le cabinet comptable, transferts automatisés, contrôles de cohérence.",
    proof: "Une journée de contrôle mensuel, réduite aux écarts",
    sectors: "Tous secteurs · PME multi-outils",
    accent: PALETTES.warm.b,
  },
  {
    tag: "Visibilité",
    title: "Exister quand on vous cherche, humain ou IA",
    pain: "Leader sur votre marché, invisible en ligne. Et quand un dirigeant demande à ChatGPT qui fait votre métier, votre nom n'apparaît nulle part.",
    delivery:
      "Audit de visibilité classique et générative, plan d'action priorisé, contenus qui répondent aux questions que vos clients posent vraiment.",
    proof: "Les moteurs IA citent surtout des pages hors top 10",
    sectors: "Tous secteurs · Leaders de niche",
    accent: PALETTES.mono.b,
  },
];

/**
 * Section « Prestations types » : le concret, juste après la méthode.
 *
 * Fond clair volontaire, la section précédente (ApproachServices) étant sombre.
 * Six cartes de texte dense se lisent mieux sur papier que sur nuit.
 */
export function PrestationsTypes() {
  return (
    <section
      id="prestations-types"
      className="relative overflow-hidden py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionHead
          eyebrow="/ 03 — prestations types"
          title={
            <>
              Six chantiers qui reviennent{" "}
              <em className="gradient-text not-italic">dans presque toutes</em>{" "}
              les PME que nous accompagnons.
            </>
          }
          controls={
            <>
              <Pill tone="outline" size="md">
                6 prestations
              </Pill>
              <Pill tone="primary" size="md">
                Diagnostic 60 min · sur rendez-vous
              </Pill>
            </>
          }
        />

        <BentoGrid>
          {PRESTATIONS.map((p, i) => (
            <BentoCard key={p.tag} span={4} rows={3} mobileMinH="300px">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="flex h-full flex-col"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {p.tag}
                  </span>
                </div>

                <h3 className="mt-2.5 text-[1.05rem] font-semibold leading-tight tracking-[-0.01em]">
                  {p.title}
                </h3>

                <p className="mt-2 text-[0.8rem] leading-[1.5] text-muted-foreground">
                  {p.pain}
                </p>

                <p className="mt-2.5 flex-1 text-[0.8rem] leading-[1.5] text-foreground/85">
                  {p.delivery}
                </p>

                <div className="mt-3 border-t border-border pt-2.5">
                  <div
                    className="text-[0.72rem] font-semibold"
                    style={{ color: p.accent }}
                  >
                    {p.proof}
                  </div>
                  <div className="mt-0.5 text-[0.68rem] text-muted-foreground">
                    {p.sectors}
                  </div>
                </div>
              </motion.div>
            </BentoCard>
          ))}

          {/* Preuve terrain — respiration entre six pavés denses et le
              financement. Arnaud est la preuve vivante de « Catalogue &
              commandes », et la seule qui nomme notre commune. */}
          <BentoCard span={12} rows={2} mobileMinH="200px">
            <motion.figure
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="flex h-full flex-col justify-center gap-4 md:flex-row md:items-center md:justify-between"
            >
              <blockquote className="max-w-3xl text-[1.05rem] font-medium italic leading-[1.5] tracking-[-0.01em] md:text-[1.2rem]">
                &laquo;&nbsp;On gérait notre catalogue sur des fichiers Excel
                éparpillés. Catalogue centralisé, mise en ligne automatisée
                &mdash;{" "}
                <em
                  className="not-italic"
                  style={{ color: PALETTES.amber.b }}
                >
                  2 h de saisie en moins par jour
                </em>{" "}
                et +35 % de demandes clients en ligne.&nbsp;&raquo;
              </blockquote>
              <figcaption className="shrink-0 md:text-right">
                <div className="flex items-center gap-0.5 text-[oklch(0.828_0.189_84.429)] md:justify-end">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
                    </svg>
                  ))}
                </div>
                <div className="mt-1.5 text-[0.85rem] font-semibold">
                  Arnaud L.
                </div>
                <div className="text-[0.75rem] text-muted-foreground">
                  Gérant, commerce spécialisé &mdash; Île-de-France
                </div>
                <div className="mt-1 text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">
                  Catalogue &amp; commandes
                </div>
              </figcaption>
            </motion.figure>
          </BentoCard>

          {/* Financement : l'argument qui débloque la décision */}
          <BentoCard span={12} rows={2} variant="accent" mobileMinH="220px">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="flex h-full flex-col justify-center gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="max-w-2xl">
                <Pill tone="outline" size="sm">
                  Financement
                </Pill>
                <h3 className="mt-2.5 text-[1.15rem] font-semibold leading-tight tracking-[-0.015em]">
                  Bpifrance finance jusqu&apos;à 80 % de votre accompagnement IA
                </h3>
                <p className="mt-1.5 text-[0.82rem] leading-[1.5] text-current/75">
                  Le programme{" "}
                  <strong className="font-semibold text-current">
                    Osez l&apos;IA
                  </strong>{" "}
                  (France 2030) s&apos;adresse aux PME. Nous vérifions votre
                  éligibilité pendant le diagnostic et vous accompagnons dans le
                  montage du dossier.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contact">
                    Diagnostic — 60 min
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-1.5">
                  <Link href="/audit-ia-pme">
                    Le financement en détail
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}
