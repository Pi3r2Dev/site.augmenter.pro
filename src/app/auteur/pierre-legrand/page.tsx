import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Target,
  Twitter,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/cta";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";

export const metadata: Metadata = {
  title: {
    absolute: "Pierre Legrand — Consultant IA PME | augmenter.PRO",
  },
  description:
    "Pierre Legrand, consultant IA pour PME — audits, formation et conseil en transformation digitale. Yvelines (78), Val d'Oise (95) et visio France entière.",
  alternates: {
    canonical: "https://augmenter.pro/auteur/pierre-legrand",
  },
  openGraph: {
    type: "profile",
    url: "https://augmenter.pro/auteur/pierre-legrand",
    title: "Pierre Legrand — Consultant IA & Transformation Digitale PME",
    description:
      "Consultant IA pour PME françaises. Audits 180°/360°, formation présentielle (78/95) et accompagnement visio partout en France.",
  },
};

const personDescription =
  "Pierre Legrand est consultant en intelligence artificielle et transformation digitale pour PME françaises. Son parcours croise deux mondes rarement réunis : ingénierie logicielle et leadership commercial. Avant augmenter.pro, il a piloté la croissance d'une structure financière en passant le revenu de 500 k€ à 4,3 M€ tout en encadrant une équipe de plus de 40 personnes — il sait ce qu'est un cycle de vente complexe et un C-level qui hésite à signer. Aujourd'hui, il accompagne les dirigeants PME du BTP, de l'immobilier, de l'industrie et des services à adopter l'IA générative (LLM, agents IA, RAG) de manière sûre et rentable. Sa méthode 360° couvre quatre piliers : technique (infrastructure, audits), processus (automatisation n8n / Make / Odoo), humain (formation et conduite du changement, avec une approche issue de la psychologie humaniste certifiée) et stratégique (roadmap chiffrée, ROI). En parallèle, il développe app.augmenter.pro, un SaaS de productivité IA pour PME basé sur Next.js, CrewAI et RAG. Basé en Val d'Oise, il intervient en présentiel dans les Yvelines (78) et le Val d'Oise (95), et en visio partout en France.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://augmenter.pro/auteur/pierre-legrand#person",
  name: "Pierre Legrand",
  givenName: "Pierre",
  familyName: "Legrand",
  jobTitle: "Consultant IA & Transformation Digitale",
  description: personDescription,
  url: "https://augmenter.pro/auteur/pierre-legrand",
  worksFor: { "@id": "https://augmenter.pro/#organization" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jouy-le-Moutier",
    postalCode: "95280",
    addressRegion: "Val d'Oise",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Yvelines (78)" },
    { "@type": "AdministrativeArea", name: "Val d'Oise (95)" },
    { "@type": "Country", name: "France" },
  ],
  knowsAbout: [
    "Intelligence artificielle générative",
    "Prompt engineering",
    "Claude Code",
    "Odoo ERP",
    "Automatisation de workflows (n8n, Make)",
    "Audit informatique PME",
    "Transformation digitale",
    "Directive NIS2 et cybersécurité PME",
    "Model Context Protocol (MCP)",
    "Formation IA pour dirigeants",
    "BTP et industrie",
    "RGPD et conformité SI",
  ],
  sameAs: [
    "https://www.linkedin.com/in/legrand-pierre/",
    "https://x.com/Pi3r2Dev",
    "https://github.com/Pi3r2Dev",
    "https://pierrelegrand.fr",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "vite@augmenter.pro",
    telephone: "+33679119774",
    contactType: "professional services",
    availableLanguage: "French",
    areaServed: "FR",
  },
};

const expertiseDomains = [
  "IA générative",
  "Prompt engineering",
  "Claude Code",
  "Odoo ERP",
  "Automatisation (n8n, Make)",
  "Audit IT PME",
  "NIS2 & RGPD",
  "Transformation digitale",
  "MCP Protocol",
  "Formation dirigeants",
  "BTP & industrie",
  "RAG & agents IA",
];

const missions = [
  {
    sector: "BTP — Automatisation des devis",
    location: "PME du Val d'Oise",
    body:
      "Cycle devis ramené de 2 heures à 15 minutes par dossier, via un workflow d'extraction et de pré-remplissage. L'équipe terrain a pu se reconcentrer sur le suivi chantier sans embauche supplémentaire.",
  },
  {
    sector: "Commerce spécialisé — Catalogue produit centralisé",
    location: "Boutique jardin, Jouy-le-Moutier (95)",
    body:
      "500 références éparpillées sur fichiers Excel consolidées dans un catalogue unique avec mise en ligne automatisée sur Le Bon Coin. Résultat : 2h de saisie en moins par jour et +35 % de demandes clients entrantes.",
  },
  {
    sector: "Industrie — Audit 360° et mise en conformité",
    location: "PME industrielle, Île-de-France",
    body:
      "Diagnostic complet infrastructure et sécurité : failles RGPD identifiées et corrigées en 3 mois, budget IT réduit de 20 % par rationalisation des licences et de l'hébergement.",
  },
];

const apportPME = [
  {
    icon: Briefcase,
    title: "Terrain, pas théorie",
    body:
      "Dix ans à scaler une structure de 500 k€ à 4,3 M€ et à encadrer 40 personnes. Les arbitrages C-level, les cycles de vente complexes et la conduite du changement ne sont pas des concepts — c'est du vécu.",
  },
  {
    icon: Target,
    title: "Méthode 360° en 4 piliers",
    body:
      "Technique (infrastructure, audits), processus (automatisation n8n / Make / Odoo), humain (formation, conduite du changement) et stratégique (roadmap, ROI). Aucun pilier n'est traité isolément.",
  },
  {
    icon: GraduationCap,
    title: "Résultats chiffrés",
    body:
      "Chaque mission part d'un audit (180° sur rendez-vous ou 360° à 550 €) et se termine par un livrable opérationnel : plan d'action priorisé, automatisations en production, équipes formées et autonomes.",
  },
];

export default function PierreLegrandPage() {
  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <article className="relative isolate overflow-hidden py-16">
        <ShaderBackdrop mood="dawn" opacity={0.55} className="-z-10" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          {/* Hero auteur ------------------------------------------------- */}
          <section className="grid gap-10 md:grid-cols-[240px_1fr] md:items-start">
            <div className="flex justify-center md:justify-start">
              <div
                aria-label="Pierre Legrand, consultant IA"
                className="flex h-60 w-60 items-center justify-center rounded-full bg-violet-600 text-6xl font-bold text-white shadow-lg"
              >
                PL
              </div>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Consultant IA &amp; Transformation Digitale
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                Pierre Legrand
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Consultant IA et transformation digitale pour PME françaises.
                J&apos;accompagne les dirigeants du BTP, de l&apos;immobilier,
                de l&apos;industrie et des services à intégrer l&apos;IA
                générative dans leurs opérations — sans jargon, avec des
                résultats chiffrés. Méthode 360° en quatre piliers : technique,
                processus, humain et stratégique. Basé en Val d&apos;Oise,
                j&apos;interviens en présentiel dans les Yvelines (78) et le
                Val d&apos;Oise (95), et en visio partout en France.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Jouy-le-Moutier (95) · France entière en visio
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/legrand-pierre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Profil LinkedIn de Pierre Legrand"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://x.com/Pi3r2Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Profil X / Twitter de Pierre Legrand"
                >
                  <Twitter className="h-4 w-4" />
                  X (Twitter)
                </a>
                <a
                  href="https://github.com/Pi3r2Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Profil GitHub de Pierre Legrand"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://pierrelegrand.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Site personnel de Pierre Legrand"
                >
                  <Globe className="h-4 w-4" />
                  pierrelegrand.fr
                </a>
              </div>
            </div>
          </section>

          {/* Apport PME -------------------------------------------------- */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight">
              Ce que j&apos;apporte aux PME
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Un croisement rare entre ingénierie logicielle et leadership
              commercial, mis au service de dirigeants qui n&apos;ont ni le
              temps ni l&apos;envie d&apos;apprendre le jargon IA.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {apportPME.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Domaines d'expertise --------------------------------------- */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight">
              Domaines d&apos;expertise
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Stack technique et thématiques sur lesquelles j&apos;interviens
              en audit, formation ou développement sur mesure.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {expertiseDomains.map((domain) => (
                <li
                  key={domain}
                  className="rounded-full border border-border bg-muted/40 px-4 py-1.5 text-sm font-medium text-foreground"
                >
                  {domain}
                </li>
              ))}
            </ul>
          </section>

          {/* Missions & expérience -------------------------------------- */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight">
              Missions &amp; expérience
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Sélection de missions récentes (clients anonymisés). Chaque ligne
              correspond à un audit ou un accompagnement réel mené depuis 2024.
            </p>

            <ol className="mt-8 space-y-6 border-l-2 border-primary/30 pl-6">
              {missions.map((mission) => (
                <li key={mission.sector} className="relative">
                  <span
                    className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-primary"
                    aria-hidden
                  />
                  <h3 className="text-lg font-semibold">{mission.sector}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {mission.location}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {mission.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-xs text-muted-foreground">
              Mis à jour le 21 mai 2026.
            </p>
          </section>

          {/* Partenariats & présence ------------------------------------ */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold tracking-tight">
              Partenariats &amp; présence
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Retrouvez-moi sur ces plateformes pour suivre mes retours
              d&apos;expérience IA, mes publications et mes projets ouverts.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="https://www.linkedin.com/in/legrand-pierre/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent"
              >
                <Linkedin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Publications IA, transformation digitale et retours
                    terrain PME.
                  </p>
                </div>
              </a>
              <a
                href="https://x.com/Pi3r2Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent"
              >
                <Twitter className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">X / Twitter</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Veille IA, Claude Code, MCP Protocol et fil dev en temps
                    réel.
                  </p>
                </div>
              </a>
              <a
                href="https://github.com/Pi3r2Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent"
              >
                <Github className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">GitHub</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Templates CLAUDE.md, prompts dirigeants et ressources
                    Claude Code en accès ouvert.
                  </p>
                </div>
              </a>
              <a
                href="https://pierrelegrand.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent"
              >
                <Globe className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">pierrelegrand.fr</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Site personnel : parcours, expérimentations et écrits
                    longs.
                  </p>
                </div>
              </a>
            </div>
          </section>

          {/* CTA fin de page -------------------------------------------- */}
          <section className="mt-20 rounded-2xl border border-border bg-muted/40 p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Échangeons sur votre transformation IA
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              60 minutes pour cadrer vos enjeux, identifier les quick wins et
              décider si l&apos;Audit 180° ou l&apos;Audit 360° à 550 €
              est le bon point de départ.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Réserver mon Audit 180°
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/approche">Voir l&apos;approche complète</Link>
              </Button>
            </div>
          </section>
        </div>
      </article>

      <CTA variant="auteur" />
    </div>
  );
}
