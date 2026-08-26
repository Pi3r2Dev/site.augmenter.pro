import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Plug,
  Zap,
  BarChart3,
  HardHat,
  Home,
  Factory,
  Briefcase,
  Search,
  PenTool,
  Settings,
  HeadphonesIcon,
  Mail,
  FileText,
  Database,
  MessageSquare,
  Shield,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Intégration Serveur MCP pour PME | Yvelines & Val-d'Oise",
  description:
    "Connectez vos outils métier (CRM, ERP, email) à l'IA grâce au protocole MCP. Intégration sur mesure pour PME en Île-de-France. Diagnostic inclus.",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Intégration Serveur MCP pour PME",
  description:
    "Service d'intégration du protocole MCP (Model Context Protocol) pour connecter les outils métier des PME à l'intelligence artificielle. CRM, ERP, messagerie, documents — vos agents IA accèdent à vos données en toute sécurité.",
  provider: {
    "@type": "Organization",
    "@id": "https://augmenter.pro/#organization",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Yvelines (78)" },
    { "@type": "AdministrativeArea", name: "Val d'Oise (95)" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "PME et ETI",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Offres Intégration MCP",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Audit MCP Initial",
        description:
          "Évaluation de 60 minutes de vos outils et cas d'usage MCP prioritaires.",
        price: "0",
        priceCurrency: "EUR",
        url: "https://augmenter.pro/contact",
      },
      {
        "@type": "Offer",
        name: "Intégration MCP Standard",
        description:
          "Configuration de 2-3 serveurs MCP, agent IA, et formation équipes.",
        priceCurrency: "EUR",
        url: "https://augmenter.pro/contact",
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "C'est quoi un serveur MCP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un serveur MCP (Model Context Protocol) est un composant qui permet à un agent IA d'accéder aux données et fonctionnalités de vos outils métier (CRM, ERP, messagerie). C'est le standard universel créé par Anthropic et géré par la Linux Foundation pour connecter l'IA aux logiciels d'entreprise.",
      },
    },
    {
      "@type": "Question",
      name: "MCP est-il compatible RGPD ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le protocole MCP en lui-même est compatible RGPD : les serveurs MCP peuvent être hébergés en France/Europe, les communications sont chiffrées (TLS), et un système de permissions granulaires contrôle l'accès aux données. La conformité globale dépend aussi du modèle d'IA utilisé et de votre politique de traitement des données.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte une intégration MCP pour une PME ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour une PME de 5 à 50 salariés : un audit + prototype (1 outil) coûte entre 500 et 1 000 €, une intégration standard (2-3 outils) entre 1 000 et 5 000 €, et une intégration avancée (SI complet) entre 5 000 et 20 000 €. Le ROI est généralement atteint en 6 à 12 mois.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il un développeur pour installer un serveur MCP ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, l'installation et la configuration d'un serveur MCP nécessitent des compétences techniques. C'est pourquoi nous proposons un service clé en main : nous auditons vos besoins, configurons les serveurs MCP, déployons l'agent IA, et formons vos équipes.",
      },
    },
    {
      "@type": "Question",
      name: "Quels outils sont compatibles MCP en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En 2026, les principaux CRM (HubSpot, Salesforce, Dynamics 365), les suites bureautiques (Google Workspace, Microsoft 365), les messageries (Slack, Teams), et de nombreux ERP disposent de serveurs MCP. Pour les logiciels de niche, un serveur MCP sur mesure peut être développé.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle différence entre MCP et Zapier/Make ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zapier et Make automatisent des flux simples (si A alors B). MCP permet à un agent IA de comprendre le contexte, accéder à plusieurs outils simultanément, et prendre des décisions intelligentes. MCP ne remplace pas Zapier pour les automatisations basiques, mais il est indispensable dès que l'IA doit analyser, contextualiser ou décider.",
      },
    },
  ],
};

const solutions = [
  {
    icon: Mail,
    title: "CRM + IA",
    description:
      "Votre agent IA lit, qualifie et met à jour vos contacts automatiquement. Fini les fiches CRM vides et les relances oubliées.",
    tools: "HubSpot, Salesforce, Pipedrive, Dynamics 365",
  },
  {
    icon: Database,
    title: "ERP + IA",
    description:
      "Suivi des commandes, alertes de stock, analyse fournisseurs — l'IA accède à votre ERP et vous alerte avant les problèmes.",
    tools: "SAP, Sage, Odoo, ERP métier",
  },
  {
    icon: FileText,
    title: "Documents + IA",
    description:
      "L'agent recherche, résume et exploite vos documents partagés. Devis, contrats, appels d'offres — tout est accessible.",
    tools: "Google Drive, SharePoint, OneDrive",
  },
  {
    icon: MessageSquare,
    title: "Communication + IA",
    description:
      "Emails triés, réponses préparées, messages Slack analysés. L'agent gère le flux pour que vous gériez les décisions.",
    tools: "Outlook, Gmail, Slack, Teams",
  },
];

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Audit & Diagnostic",
    description:
      "60 minutes d'échange pour cartographier vos outils, identifier les cas d'usage prioritaires, et évaluer la faisabilité technique.",
    duration: "1 heure (sur rendez-vous)",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Conception & Architecture",
    description:
      "Choix des serveurs MCP adaptés, design de l'agent IA, validation du périmètre de données accessibles et des règles de sécurité.",
    duration: "1-2 semaines",
  },
  {
    icon: Settings,
    step: "03",
    title: "Intégration & Tests",
    description:
      "Installation des serveurs MCP, configuration de l'agent IA, phase de test supervisé où l'agent propose et un humain valide.",
    duration: "2-4 semaines",
  },
  {
    icon: HeadphonesIcon,
    step: "04",
    title: "Formation & Suivi",
    description:
      "Formation de vos équipes, passage en autonomie progressive de l'agent, suivi post-déploiement et ajustements.",
    duration: "2 semaines + suivi",
  },
];

const sectors = [
  {
    icon: HardHat,
    title: "BTP & Construction",
    useCase:
      "Réponse automatique aux appels d'offres, suivi chantier intelligent, gestion documentaire des marchés publics.",
  },
  {
    icon: Home,
    title: "Immobilier",
    useCase:
      "Qualification instantanée des acquéreurs, matching automatique biens/prospects, relance personnalisée des mandats.",
  },
  {
    icon: Factory,
    title: "Industrie & Négoce",
    useCase:
      "Alertes de rupture de stock, analyse des bons de commande fournisseurs, optimisation des approvisionnements.",
  },
  {
    icon: Briefcase,
    title: "Services & Conseil",
    useCase:
      "Qualification des leads entrants, préparation automatique des réunions clients, génération de rapports d'activité.",
  },
];

export default function IntegrationMCPPage() {
  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden py-24">
        <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Nouvelle prestation
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Connectez vos outils métier à l&apos;IA avec{" "}
              <span className="gradient-text">le protocole MCP</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Vos agents IA accèdent directement à votre CRM, ERP, messagerie
              et documents — en toute sécurité. Fini les copier-coller entre
              outils. L&apos;IA comprend votre contexte métier et agit.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Diagnostic initial (60 min)
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog/serveur-mcp-guide-pratique-pme">
                  Comprendre MCP en 8 min
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Le problème */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vos outils ne se parlent pas.
              <br />
              <span className="text-muted-foreground">
                Votre IA non plus.
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Vous utilisez un CRM, un ERP, une messagerie, des fichiers
              partagés. Mais chaque outil fonctionne en silo. Résultat : des
              données éparpillées, des tâches manuelles répétitives, et une IA
              qui ne connaît pas votre entreprise.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-destructive">95%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  des projets IA échouent sur l&apos;intégration technique — pas
                  sur l&apos;IA elle-même
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-destructive">45 min</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  temps moyen pour qualifier un lead manuellement (email + CRM +
                  réponse)
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-destructive">30%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  de relances commerciales oubliées sans système automatisé
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* La solution MCP */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Le protocole MCP : le{" "}
              <span className="gradient-text">connecteur universel</span> entre
              l&apos;IA et vos outils
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Créé par Anthropic et transféré à la Linux Foundation, MCP est le
              standard adopté par 75% des fournisseurs de passerelles API en
              2026 (Gartner). Un seul protocole pour tout connecter.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <Card className="h-full border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Plug className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Connecter</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Un serveur MCP par outil. Votre CRM, ERP, messagerie et
                  fichiers deviennent accessibles à l&apos;IA.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Automatiser</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  L&apos;agent IA comprend le contexte et agit : qualification
                  de leads, relances, rapports, mises à jour CRM.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Piloter</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Chaque action est tracée, les permissions sont granulaires, et
                  vos données restent sous votre contrôle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pour qui ? */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pour quels secteurs ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Nous accompagnons les PME du 78 et du 95 dans leur intégration IA.
              Voici les cas d&apos;usage les plus demandés par secteur.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {sectors.map((sector) => (
              <Card key={sector.title} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <sector.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{sector.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {sector.useCase}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              4 étapes, du diagnostic initial au déploiement opérationnel.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">
                  Étape {step.step}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
                <p className="mt-2 text-xs font-medium text-primary">
                  {step.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemples d'intégrations */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Exemples d&apos;intégrations MCP
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Chaque outil de votre SI peut être connecté à un agent IA via un
              serveur MCP dédié.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {solutions.map((solution) => (
              <Card key={solution.title} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <solution.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{solution.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {solution.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-primary">
                    {solution.tools}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tarification */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tarifs indicatifs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Des formules adaptées à la taille de votre SI et à vos ambitions.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Card className="h-full border-primary/20">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Découverte
                </p>
                <p className="mt-2 text-3xl font-bold">60 min</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Audit 180°, sur rendez-vous
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Cartographie de vos outils
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Identification des cas d&apos;usage MCP
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Estimation ROI et faisabilité
                  </li>
                </ul>
                <Button asChild className="mt-6 w-full gap-2">
                  <Link href="/contact">
                    Réserver
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="h-full border-2 border-primary">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Standard
                </p>
                <p className="mt-2 text-3xl font-bold">
                  1 000 - 5 000 €
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  2-3 outils connectés
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Serveurs MCP configurés
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Agent IA opérationnel
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Formation de vos équipes
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    2 semaines de test supervisé
                  </li>
                </ul>
                <Button asChild className="mt-6 w-full gap-2">
                  <Link href="/contact">
                    Demander un devis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="h-full border-primary/20">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Sur mesure
                </p>
                <p className="mt-2 text-3xl font-bold">
                  5 000 - 20 000 €
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  SI complet
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Tous vos outils connectés
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Agents IA multi-tâches
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Serveurs MCP sur mesure
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Monitoring et support continu
                  </li>
                </ul>
                <Button asChild className="mt-6 w-full gap-2">
                  <Link href="/contact">
                    Discutons
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Sécurité &amp; RGPD :</strong>{" "}
              Toutes nos intégrations respectent le RGPD. Serveurs hébergeables
              en France, permissions granulaires, chiffrement TLS, et
              traçabilité complète des actions IA. Le choix structurant, c&apos;est{" "}
              <Link
                href="/blog/serveur-mcp-heberge-pme"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                où vivent vos données — coder, louer ou héberger soi-même
              </Link>
              {" "}; pour le reste,{" "}
              <Link
                href="/blog/serveur-mcp-guide-pratique-pme"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                MCP et la sécurité
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  C&apos;est quoi un serveur MCP ?
                </AccordionTrigger>
                <AccordionContent>
                  Un serveur MCP (Model Context Protocol) est un composant qui
                  permet à un agent IA d&apos;accéder aux données et
                  fonctionnalités de vos outils métier (CRM, ERP, messagerie).
                  C&apos;est le standard universel créé par Anthropic et géré
                  par la Linux Foundation pour connecter l&apos;IA aux logiciels
                  d&apos;entreprise.{" "}
                  <Link
                    href="/blog/serveur-mcp-guide-pratique-pme"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Guide complet
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>
                  MCP est-il compatible RGPD ?
                </AccordionTrigger>
                <AccordionContent>
                  Le protocole MCP est compatible RGPD : les serveurs MCP
                  peuvent être hébergés en France/Europe, les communications
                  sont chiffrées (TLS), et un système de permissions granulaires
                  contrôle l&apos;accès aux données. La conformité globale
                  dépend aussi du modèle d&apos;IA utilisé et de votre politique
                  de traitement des données.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>
                  Combien coûte une intégration MCP pour une PME ?
                </AccordionTrigger>
                <AccordionContent>
                  Pour une PME de 5 à 50 salariés : un audit + prototype (1
                  outil) coûte entre 500 et 1 000 €, une intégration standard
                  (2-3 outils) entre 1 000 et 5 000 €, et une intégration
                  avancée (SI complet) entre 5 000 et 20 000 €. Le ROI est
                  généralement atteint en 6 à 12 mois.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>
                  Faut-il un développeur pour installer un serveur MCP ?
                </AccordionTrigger>
                <AccordionContent>
                  Oui, l&apos;installation et la configuration d&apos;un serveur
                  MCP nécessitent des compétences techniques. C&apos;est
                  pourquoi nous proposons un service clé en main : nous auditons
                  vos besoins, configurons les serveurs MCP, déployons
                  l&apos;agent IA, et formons vos équipes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger>
                  Quels outils sont compatibles MCP en 2026 ?
                </AccordionTrigger>
                <AccordionContent>
                  En 2026, les principaux CRM (HubSpot, Salesforce, Dynamics
                  365), les suites bureautiques (Google Workspace, Microsoft
                  365), les messageries (Slack, Teams), et de nombreux ERP
                  disposent de serveurs MCP. Pour les logiciels de niche, un
                  serveur MCP sur mesure peut être développé.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q6">
                <AccordionTrigger>
                  Quelle différence entre MCP et Zapier/Make ?
                </AccordionTrigger>
                <AccordionContent>
                  Zapier et Make automatisent des flux simples (si A alors B).
                  MCP permet à un agent IA de comprendre le contexte, accéder à
                  plusieurs outils simultanément, et prendre des décisions
                  intelligentes. MCP ne remplace pas Zapier pour les
                  automatisations basiques, mais il est indispensable dès que
                  l&apos;IA doit analyser, contextualiser ou décider.{" "}
                  <Link
                    href="/blog/serveur-mcp-integration-crm-erp"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Comparatif détaillé
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </div>
  );
}
