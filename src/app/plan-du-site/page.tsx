import type { Metadata } from "next";
import Link from "next/link";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import { ARTICLES } from "@/data/resources";
import {
  Compass,
  Briefcase,
  BookOpen,
  ScrollText,
  Newspaper,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Plan du site : pages, articles & ressources",
  description:
    "Toutes les pages d'augmenter.PRO en un coup d'œil : approche, prestations IA & audit, articles, prompts, idées et mentions légales.",
  alternates: { canonical: "/plan-du-site" },
};

// ─────────────────────────────────────────────────────────────────────────
// Plan du site HTML — hub de maillage interne, server-rendered (aucun
// "use client") pour que tous les liens vivent dans le HTML statique crawlable.
// Les pages sont déclarées ici ; les articles sont tirés de la source de
// vérité partagée (@/data/resources) pour ne jamais diverger de /blog.
// ─────────────────────────────────────────────────────────────────────────

interface SitemapLink {
  href: string;
  label: string;
  desc: string;
}

interface SitemapSection {
  title: string;
  accent: string;
  icon: LucideIcon;
  links: SitemapLink[];
}

const SECTIONS: SitemapSection[] = [
  {
    title: "Commencer",
    accent: "oklch(0.702 0.183 293)",
    icon: Compass,
    links: [
      { href: "/", label: "Accueil", desc: "Le récit en six chapitres" },
      {
        href: "/augmenter-mon-entreprise",
        label: "Par où commencer",
        desc: "Le hub ressources, trié par douleur et par secteur",
      },
      {
        href: "/approche",
        label: "Notre approche",
        desc: "La méthode 360° racontée — technique, processus, humain",
      },
      {
        href: "/contact",
        label: "Contact",
        desc: "Premier diagnostic de 60 min, sans engagement",
      },
    ],
  },
  {
    title: "Prestations",
    accent: "oklch(0.828 0.189 84.429)",
    icon: Briefcase,
    links: [
      {
        href: "/strategie-ia-pme",
        label: "Stratégie IA PME",
        desc: "Feuille de route IA priorisée sur 6 mois",
      },
      {
        href: "/audit-ia-pme",
        label: "Audit IA pour PME",
        desc: "Cas d'usage prioritaires et feuille de route chiffrée",
      },
      {
        href: "/audit-informatique-yvelines",
        label: "Audit informatique Yvelines (78)",
        desc: "Diagnostic IT en présentiel dans les Yvelines",
      },
      {
        href: "/audit-informatique-val-doise",
        label: "Audit informatique Val d'Oise (95)",
        desc: "Diagnostic IT en présentiel dans le Val d'Oise",
      },
      {
        href: "/integration-mcp",
        label: "Intégration MCP",
        desc: "Brancher l'IA sur vos vrais outils métier (CRM, ERP)",
      },
      {
        href: "/ia-souveraine-pme",
        label: "IA souveraine pour PME",
        desc: "Ce qui sort de votre entreprise, et comment le router",
      },
      {
        href: "/atelier-claude-code-dirigeant",
        label: "Atelier Claude Cowork & Code",
        desc: "Prendre la main sur Claude pour automatiser votre PME",
      },
    ],
  },
  {
    title: "Ressources",
    accent: "oklch(0.72 0.15 260)",
    icon: BookOpen,
    links: [
      {
        href: "/blog",
        label: "Articles & tutos",
        desc: "Guides terrain : IA, commercial, audit, cybersécurité",
      },
      {
        href: "/prompts",
        label: "Prompts IA",
        desc: "Prompts prêts à copier pour dirigeants de PME",
      },
      {
        href: "/idees",
        label: "Idées PRO",
        desc: "Cas d'usage IA chiffrés, secteur par secteur",
      },
      {
        href: "/projets",
        label: "Nos projets",
        desc: "Modules développés pour automatiser le quotidien pro",
      },
    ],
  },
  {
    title: "Identité & légal",
    accent: "oklch(0.72 0.12 200)",
    icon: ScrollText,
    links: [
      {
        href: "/auteur/pierre-legrand",
        label: "Pierre Legrand",
        desc: "Consultant IA & transformation digitale — l'auteur",
      },
      {
        href: "/mentions-legales",
        label: "Mentions légales",
        desc: "Éditeur, hébergeur, propriété intellectuelle",
      },
      {
        href: "/politique-confidentialite",
        label: "Politique de confidentialité",
        desc: "Traitement des données personnelles (RGPD)",
      },
      { href: "/cgv", label: "CGV", desc: "Conditions générales de vente" },
    ],
  },
];

const totalPages = SECTIONS.reduce((n, s) => n + s.links.length, 0);

export default function PlanDuSitePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://augmenter.pro",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Plan du site",
        item: "https://augmenter.pro/plan-du-site",
      },
    ],
  };

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden py-20">
        <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Navigation
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Plan du <span className="gradient-text">site</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Toutes les pages d&apos;augmenter.PRO réunies sur un seul écran :{" "}
              {totalPages} pages et {ARTICLES.length} articles, du premier
              diagnostic aux mentions légales.
            </p>
          </div>
        </div>
      </section>

      {/* Sections de pages */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid h-9 w-9 place-items-center rounded-lg"
                      style={{
                        background: `color-mix(in oklch, ${section.accent} 14%, transparent)`,
                        color: section.accent,
                      }}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <h2 className="text-lg font-semibold tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="mt-5 flex flex-col divide-y divide-border/40">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-start gap-3 py-3 transition-colors"
                        >
                          <ArrowUpRight
                            aria-hidden
                            className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                          />
                          <span className="flex flex-col">
                            <span className="text-sm font-medium transition-colors group-hover:text-primary">
                              {link.label}
                            </span>
                            <span className="mt-0.5 text-xs text-muted-foreground">
                              {link.desc}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tous les articles du blog */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"
            >
              <Newspaper className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Tous les articles
              </h2>
              <p className="text-xs text-muted-foreground">
                {ARTICLES.length} articles publiés, du plus récent au plus ancien
              </p>
            </div>
          </div>

          <ul className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex items-baseline gap-3 border-b border-border/40 py-3.5"
                >
                  <span className="flex-1 text-sm leading-snug transition-colors group-hover:text-primary">
                    {article.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            Besoin d&apos;y voir plus clair selon votre métier ?{" "}
            <Link
              href="/augmenter-mon-entreprise"
              className="text-primary underline-offset-4 hover:underline"
            >
              Filtrez les ressources par douleur et par secteur
            </Link>{" "}
            sur le hub, ou{" "}
            <Link
              href="/contact"
              className="text-primary underline-offset-4 hover:underline"
            >
              démarrez par un diagnostic de 60 min
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
