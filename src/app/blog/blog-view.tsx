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

const FILTERS = ["Tout", "IA", "PME", "Commercial", "Cybersécurité", "Audit 360°"] as const;
type FilterTag = (typeof FILTERS)[number];
import {
  ArticleBentoCard,
  type ArticleBentoData,
} from "@/components/bento/article-bento-card";
import { TrustStatCard } from "@/components/widgets/trust-stat";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";

interface Article extends ArticleBentoData {
  excerpt?: string;
}

const ARTICLES: Article[] = [
  {
    slug: "serveur-mcp-heberge-pme",
    title:
      "Serveur MCP hébergé : faut-il le coder, le louer ou l'héberger soi-même ?",
    excerpt:
      "Vous voulez que votre IA lise vos vraies données sans monter une usine à gaz. Trois chemins, et un seul détail les départage : où vivent vos données. Panorama des plateformes, coûts réels et grille de décision PME.",
    tags: ["IA", "PME"],
    readTime: "10 min",
    image: "/images/blog/serveur-mcp-heberge-pme.webp",
  },
  {
    slug: "cybersecurite-pme-guide-pratique",
    title:
      "Cybersécurité PME : 93 % des attaques sont évitables avec du bon sens",
    excerpt:
      "Pas besoin d'une DSI ni d'un gros budget. Mots de passe, double authentification, phishing, fraude au président : le guide pratique pour couvrir l'essentiel du risque, avec un plan d'action en une semaine.",
    tags: ["Cybersécurité", "PME"],
    readTime: "13 min",
    image: "/images/blog/cybersecurite-pme-guide-pratique.webp",
  },
  {
    slug: "prompt-audit-projet-claude-fable",
    title:
      "Votre code vieillit en silence : le prompt Claude Fable qui audite tout votre projet",
    excerpt:
      "Le prompt d'audit en 4 phases pour Claude Fable 5, traduit et amélioré en français. Cartographie, constats fichier:ligne, plan de remise à niveau — testé sur un vrai projet : 11 constats en 3 minutes.",
    tags: ["IA", "Claude Code"],
    readTime: "11 min",
    image: "/images/blog/prompt-audit-projet-claude-fable.webp",
  },
  {
    slug: "claude-cowork-community-manager",
    title:
      "J'ai transformé Claude Cowork en community manager : le setup, les prompts, ce qui a foiré",
    excerpt:
      "J'ai confié mes réseaux sociaux à Claude Cowork pendant six semaines. Le setup exact, les prompts que j'utilise vraiment, les chiffres avant/après — et les trois fois où ça a foiré.",
    tags: ["IA", "Commercial"],
    readTime: "11 min",
    image: "/images/blog/claude-cowork-community-manager.webp",
  },
  {
    slug: "agent-ia-dirigeant-pme",
    title: "Agent IA pour dirigeant de PME : c'est quoi, et comment en créer un",
    excerpt:
      "Tout le monde vend des « agents IA », personne ne dit ce que c'est vraiment. Définition sans jargon, 3 exemples concrets (BTP, immobilier, services) et la méthode en 4 étapes pour créer le vôtre.",
    tags: ["IA", "PME"],
    readTime: "9 min",
    image: "/images/blog/agent-ia-dirigeant-pme.webp",
  },
  {
    slug: "patron-goulot-paradoxe-ia-dirigeant-pme",
    title: "Le patron-goulot : quand l'IA rend le dirigeant encore plus indispensable",
    excerpt:
      "Vous avez déployé ChatGPT/Claude dans votre PME et vous êtes toujours débordé ? Pire, c'est vous qui formez tout le monde ? 5 signaux du patron-goulot et protocole en 4 étapes pour en sortir.",
    tags: ["IA", "PME"],
    readTime: "10 min",
    image: "/images/blog/patron-goulot-paradoxe-ia-dirigeant-pme.webp",
  },
  {
    slug: "ia-contradicteur-prompts-dirigeant-pme",
    title: "L'IA comme contradicteur : 5 prompts pour challenger vos décisions",
    excerpt:
      "ChatGPT vous donne toujours raison ? 5 prompts copiables pour transformer l'IA en contradicteur honnête et identifier vos angles morts avant chaque décision structurante.",
    tags: ["IA", "PME"],
    readTime: "9 min",
    image: "/images/blog/ia-contradicteur-prompts-dirigeant-pme.webp",
  },
  {
    slug: "rapport-adoption-ia-btp-francilien-2026",
    title: "Rapport 2026 : Adoption de l'IA dans le BTP francilien",
    excerpt:
      "Tableau de maturité par sous-secteur (gros œuvre, second œuvre, artisanat, négoce) croisé avec les usages IA réels en 2026. Sources publiques + observations terrain 78/95.",
    tags: ["IA", "PME", "Rapport sectoriel"],
    readTime: "6 min",
    image: "/images/blog/rapport-adoption-ia-btp-francilien-2026.webp",
  },
  {
    slug: "configurer-odoo-ia-claude-cowork",
    title: "Configurer Odoo avec l'IA : 4 Jours au Lieu de 3 500 €",
    excerpt:
      "Comment nous avons reconfiguré tout Odoo d'un client en 4 jours avec Claude Cowork.",
    tags: ["IA", "PME"],
    readTime: "12 min",
    image: "/images/blog/configurer-odoo-ia-claude-cowork.webp",
  },
  {
    slug: "veille-concurrentielle-ia-pme",
    title: "Veille Concurrentielle IA pour PME : Guide Pratique 2026",
    excerpt:
      "Comment automatiser votre veille concurrentielle avec l'IA. Méthode en 5 étapes, outils testés et retour d'expérience terrain.",
    tags: ["IA", "PME"],
    readTime: "8 min",
    image: "/images/blog/veille-concurrentielle-ia-pme.webp",
  },
  {
    slug: "automatiser-emails-reseaux-sociaux-ia",
    title: "Automatiser Emails et Réseaux Sociaux avec l'IA en PME",
    excerpt:
      "Gagnez 10h par semaine en automatisant vos emails et publications sociales avec l'IA.",
    tags: ["IA", "Productivité"],
    readTime: "7 min",
    image: "/images/blog/automatiser-emails-reseaux-sociaux-ia.webp",
  },
  {
    slug: "cout-audit-informatique-yvelines",
    title: "Combien coûte un audit informatique en Yvelines (78) ?",
    tags: ["Audit 360°", "PME"],
    readTime: "8 min",
    image: "/images/blog/cout-audit-informatique-yvelines.webp",
  },
  {
    slug: "nis2-pme-yvelines-val-doise",
    title: "NIS2 et PME : Guide Pratique pour les Yvelines et le Val d'Oise",
    tags: ["Cybersécurité", "PME"],
    readTime: "10 min",
    image: "/images/blog/nis2-pme-yvelines-val-doise.webp",
  },
  {
    slug: "serveur-mcp-guide-pratique-pme",
    title: "Serveur MCP : Connecter l'IA à Vos Outils Métier",
    tags: ["IA", "Intégration"],
    readTime: "8 min",
    image: "/images/blog/serveur-mcp-guide-pratique-pme.webp",
  },
  {
    slug: "serveur-mcp-integration-crm-erp",
    title: "Intégrer un Agent IA à Votre CRM/ERP : Pourquoi MCP Change la Donne",
    tags: ["IA", "Commercial"],
    readTime: "7 min",
    image: "/images/blog/serveur-mcp-integration-crm-erp.webp",
  },
  {
    slug: "machine-de-guerre-commerciale",
    title: "Rénovation Énergétique : construisez votre machine de guerre commerciale",
    tags: ["IA", "Commercial"],
    readTime: "3 min",
    image: "/images/blog/augmenter-pro-village-renovation-hero.webp",
  },
  {
    slug: "ia-redefinit-vente-commerciale",
    title: "Comment l'IA redéfinit la Vente Commerciale",
    tags: ["IA", "Commercial"],
    readTime: "3 min",
    image: "/images/blog/ia-redefinit-vente-commerciale.webp",
  },
  {
    slug: "claude-code-prompt-architecture",
    title: "Utiliser Claude Code sans ce prompt est une perte de temps",
    tags: ["Claude Code"],
    readTime: "2 min",
    image: "/images/blog/claude-code-prompt-architecture.webp",
  },
  {
    slug: "comparatif-llm-vente-commerciale",
    title: "Comparatif : Forces et Faiblesses des LLM dans la Vente",
    tags: ["IA"],
    readTime: "5 min",
    image: "/images/blog/comparatif-llm-vente-commerciale.webp",
  },
  {
    slug: "5-signes-moderniser-informatique-pme",
    title: "5 signes qu'il est temps de moderniser l'informatique de votre PME",
    tags: ["Audit 360°", "PME"],
    readTime: "3 min",
    image: "/images/blog/5-signes-moderniser-informatique-pme.webp",
  },
];

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
