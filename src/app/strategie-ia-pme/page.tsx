import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Target,
  Route,
  Building2,
  Banknote,
  Brain,
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  MapPin,
  Lightbulb,
  Cog,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Stratégie IA PME : feuille de route en 60 min · Visio France + 78/95",
  description:
    "Tes concurrents avancent sur ChatGPT/Claude et tu tâtonnes ? Feuille de route IA priorisée en 60 min. Financement Bpifrance. Offert.",
};

const stats = [
  {
    value: "26 %",
    label: "des PME utilisent l\u2019IA",
    detail: "Doublement en 1 an (France Num 2025)",
    icon: TrendingUp,
  },
  {
    value: "165 %",
    label: "ROI médian constaté",
    detail: "Retour en 6 à 7 mois en moyenne",
    icon: BarChart3,
  },
  {
    value: "60 %",
    label: "freinées par les compétences",
    detail: "Premier frein identifié par les dirigeants",
    icon: Users,
  },
  {
    value: "80 %",
    label: "de prise en charge possible",
    detail: "Via le programme Osez l\u2019IA (Bpifrance)",
    icon: Banknote,
  },
];

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Outils IA éparpillés",
    description:
      "ChatGPT par-ci, un outil no-code par-là\u2026 Sans stratégie, vos équipes multiplient les abonnements sans cohérence ni résultats mesurables.",
  },
  {
    icon: Target,
    title: "ROI invisible",
    description:
      "Impossible de prouver la valeur de vos investissements IA à votre direction ou vos associés. Pas de KPI, pas de suivi, pas de décision éclairée.",
  },
  {
    icon: Users,
    title: "Équipes déboussolées",
    description:
      "Vos collaborateurs sont soit enthousiastes mais livrés à eux-mêmes, soit réfractaires par manque de formation. Le résultat est le même : sous-utilisation.",
  },
  {
    icon: Banknote,
    title: "Budget gaspillé",
    description:
      "Sans priorisation des cas d\u2019usage, vous investissez dans des projets IA à faible impact au lieu de cibler les 20 % qui génèrent 80 % des gains.",
  },
];

const methodology = [
  {
    step: "01",
    icon: Brain,
    title: "On démarre par l’audit IA",
    description:
      "Le point de départ, c’est notre audit IA dédié : maturité, processus et données. Il fixe le cap — la stratégie se construit dessus.",
    details: [
      "Audit IA réalisé en amont",
      "Cartographie des flux de travail",
      "Évaluation de la maturité numérique",
      "Entretiens avec les équipes terrain",
    ],
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Cas d\u2019usage prioritaires",
    description:
      "Nous identifions les cas d\u2019usage IA à fort impact pour votre métier, classés par ROI potentiel et facilité de déploiement.",
    details: [
      "Identification des quick wins IA",
      "Analyse ROI par cas d\u2019usage",
      "Benchmark sectoriel",
      "Matrice impact / effort",
    ],
  },
  {
    step: "03",
    icon: Route,
    title: "Feuille de route sur 6 mois",
    description:
      "Un plan d\u2019action chiffré et priorisé : quels outils, quel calendrier, quel budget, quelles ressources. Prêt à exécuter.",
    details: [
      "Roadmap avec jalons trimestriels",
      "Recommandations outils & fournisseurs",
      "Budget prévisionnel détaillé",
      "Plan de formation des équipes",
    ],
  },
  {
    step: "04",
    icon: Cog,
    title: "Accompagnement au déploiement",
    description:
      "Nous restons à vos côtés pendant la mise en \u0153uvre : formation, intégration, ajustements. Votre stratégie IA prend vie concrètement.",
    details: [
      "Support technique continu",
      "Ateliers de prise en main",
      "Suivi KPI et ajustements",
      "Support email pendant 30 jours",
    ],
  },
];

const sectors = [
  {
    icon: Building2,
    title: "BTP & Rénovation",
    description:
      "Automatisez vos devis, optimisez la planification chantier et internalisez votre prospection commerciale.",
    example: "PME du BTP à Versailles (78) : devis générés 3\u00d7 plus vite",
  },
  {
    icon: MapPin,
    title: "Immobilier",
    description:
      "IA pour l\u2019estimation, la rédaction d\u2019annonces, le scoring acquéreur et le suivi client automatisé.",
    example: "Agence à Cergy (95) : 50 % de temps gagné sur les estimations",
  },
  {
    icon: Cog,
    title: "Industrie & Artisanat",
    description:
      "Maintenance prédictive, gestion de stock intelligente, optimisation des itinéraires et contrôle qualité.",
    example: "Artisan à Pontoise (95) : stock optimisé, ruptures réduites de 40 %",
  },
  {
    icon: GraduationCap,
    title: "Services & Conseil",
    description:
      "Assistants IA pour la veille, la rédaction, l\u2019analyse documentaire et l\u2019automatisation administrative.",
    example: "Cabinet conseil à Saint-Germain (78) : productivité +35 %",
  },
];

const faqItems = [
  {
    question: "Combien coûte une stratégie IA pour une PME ?",
    answer:
      "Notre diagnostic initial est offert (60 min). L’audit IA 360° qui pose la feuille de route coûte 225 € — il est détaillé sur notre page dédiée. Pour le déploiement, le budget dépend des cas d’usage retenus, et le programme Osez l’IA de Bpifrance peut prendre en charge jusqu’à 80 % de l’accompagnement.",
  },
  {
    question:
      "Comment déployer l’IA quand on n’a aucune compétence en interne ?",
    answer:
      "C’est le cas de la majorité de nos clients. On part de votre métier, pas de la technologie : des quick wins réalisables sans expertise, puis la formation de vos équipes intégrée à l’accompagnement. Le cadrage initial passe par notre audit IA dédié.",
  },
  {
    question: "Quels résultats concrets peut-on attendre ?",
    answer:
      "Les PME accompagnées constatent en moyenne un ROI de 165 % avec un retour en 6-7 mois. Concrètement : réduction des tâches répétitives de 30-50 %, amélioration de la productivité de 20-35 %, et des décisions commerciales mieux informées grâce à l\u2019analyse de données.",
  },
  {
    question:
      "L\u2019IA est-elle compatible avec le RGPD pour les PME françaises ?",
    answer:
      "Oui, à condition de choisir les bons outils et de respecter certaines règles. Nous intégrons la conformité RGPD dès la phase de diagnostic : hébergement des données en Europe, minimisation des données collectées, information des collaborateurs. Notre approche privilégie les solutions souveraines quand c\u2019est pertinent.",
  },
  {
    question:
      "Qu\u2019est-ce que le programme Osez l\u2019IA de Bpifrance ?",
    answer:
      "Osez l\u2019IA (anciennement IA Booster France 2030) est un programme gouvernemental doté de 200 millions d\u2019euros. Il finance jusqu\u2019à 80 % du coût d\u2019accompagnement IA pour les PME de 10 à 2 000 salariés. Nous aidons nos clients à préparer leur dossier et à identifier les phases les plus pertinentes pour leur situation.",
  },
  {
    question: "Intervenez-vous uniquement en Yvelines et Val-d\u2019Oise ?",
    answer:
      "Nous sommes basés en Yvelines (78) et intervenons principalement en Yvelines, Val-d\u2019Oise (95) et Île-de-France. Les diagnostics et le suivi peuvent se faire en présentiel ou à distance \u2014 nous accompagnons également des clients dans toute la France en visio.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Stratégie IA pour PME",
  description:
    "Accompagnement stratégique en intelligence artificielle pour les PME : diagnostic initial, cartographie des cas d\u2019usage IA, feuille de route personnalisée et déploiement.",
  provider: {
    "@type": "Organization",
    "@id": "https://augmenter.pro/#organization",
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Yvelines",
      sameAs: "https://fr.wikipedia.org/wiki/Yvelines",
    },
    {
      "@type": "AdministrativeArea",
      name: "Val-d\u2019Oise",
      sameAs: "https://fr.wikipedia.org/wiki/Val-d%27Oise",
    },
    {
      "@type": "State",
      name: "Île-de-France",
    },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "PME et ETI françaises",
  },
  serviceType: "Conseil en stratégie IA",
  offers: [
    {
      "@type": "Offer",
      name: "Diagnostic IA initial",
      price: "0",
      priceCurrency: "EUR",
      description: "Audit initial de 60 minutes pour identifier vos leviers IA",
      url: "https://augmenter.pro/contact",
    },
    {
      "@type": "Offer",
      name: "Stratégie IA — cadrage & feuille de route",
      price: "225",
      priceCurrency: "EUR",
      description:
        "Cadrage stratégique avec feuille de route IA personnalisée sur 6 mois",
      url: "https://augmenter.pro/contact",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function StrategieIaPmePage() {
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
              Stratégie IA pour PME
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Définissez votre{" "}
              <span className="gradient-text">stratégie IA</span> sur mesure
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              26 % des PME françaises utilisent déjà l&apos;IA. Pas besoin
              d&apos;être expert pour commencer — il faut juste un{" "}
              <strong>plan adapté à votre métier</strong> et à votre budget.
              Nous accompagnons les PME des{" "}
              <strong>Yvelines (78) et Val-d&apos;Oise (95)</strong> de
              l&apos;audit au déploiement.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Diagnostic initial — 60 min
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/approche#prestations">Découvrir nos prestations</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Clock className="mb-0.5 inline h-3.5 w-3.5" /> Réponse sous
              24h — en présentiel ou à distance
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              L&apos;IA en PME : les chiffres qui comptent
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              L&apos;adoption de l&apos;intelligence artificielle dans les PME
              françaises a doublé en un an. Les résultats sont là — mais seules
              les entreprises avec une{" "}
              <strong>stratégie IA structurée</strong> en tirent pleinement
              profit.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium">{stat.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Sources : Baromètre France Num 2025, Bpifrance Le Lab.{" "}
            <Link
              href="/blog/5-signes-moderniser-informatique-pme"
              className="text-primary underline-offset-4 hover:underline"
            >
              Découvrez les 5 signes qu&apos;il est temps de moderniser
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pourquoi votre PME a besoin d&apos;une{" "}
              <span className="gradient-text">stratégie IA</span> structurée
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              43 % des dirigeants de PME ont adopté une démarche IA, mais
              beaucoup naviguent à vue. Sans cadre clair, les mêmes erreurs se
              répètent.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {painPoints.map((point) => (
              <Card key={point.title} className="border-border/50">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                    <point.icon className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{point.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Notre{" "}
            <Link
              href="/approche"
              className="text-primary underline-offset-4 hover:underline"
            >
              approche 360°
            </Link>{" "}
            adresse ces problèmes à la racine : technique, processus et humain.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Notre accompagnement en 4 étapes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              De l&apos;audit initial au déploiement opérationnel — une méthode
              éprouvée pour construire votre <strong>stratégie IA</strong> sans
              risque.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {methodology.map((step) => (
              <Card key={step.step} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary">
                          ÉTAPE {step.step}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {step.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/approche#prestations">
                Voir les tarifs détaillés
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Pas encore prêt pour une stratégie complète ? Commence par un{" "}
              <Link
                href="/audit-ia-pme"
                className="text-primary underline-offset-4 hover:underline"
              >
                audit IA dédié
              </Link>{" "}
              : cas d&apos;usage prioritaires et feuille de route chiffrée.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Une stratégie IA adaptée à{" "}
              <span className="gradient-text">votre secteur</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Chaque métier a ses propres cas d&apos;usage IA. Nous adaptons
              notre accompagnement à vos enjeux terrain, avec des exemples
              concrets de PME locales.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sectors.map((sector) => (
              <Card key={sector.title} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <sector.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    {sector.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {sector.description}
                  </p>
                  <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-primary">
                    {sector.example}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Découvrez comment{" "}
            <Link
              href="/blog/ia-redefinit-vente-commerciale"
              className="text-primary underline-offset-4 hover:underline"
            >
              l&apos;IA redéfinit la vente commerciale
            </Link>{" "}
            dans tous les secteurs.
          </p>
        </div>
      </section>

      {/* Financing */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Financez votre transformation IA
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Le programme <strong>Osez l&apos;IA</strong> (Bpifrance /
                France 2030) finance jusqu&apos;à{" "}
                <strong>80 % du coût</strong> d&apos;accompagnement IA pour les
                PME. Nous vous aidons à en bénéficier.
              </p>
            </div>

            <Card className="mt-12 border-primary/20">
              <CardContent className="p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="font-semibold">
                      Osez l&apos;IA (ex-IA Booster France 2030)
                    </h3>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          PME de 10 à 2 000 salariés, CA &gt; 250 K&euro;
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Budget total : 200 millions d&apos;euros</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          Diagnostic + accompagnement pris en charge à 50-80 %
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Tous secteurs d&apos;activité éligibles</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Notre rôle dans votre dossier
                    </h3>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Évaluation de votre éligibilité</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Préparation du diagnostic préalable</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          Accompagnement à la constitution du dossier
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Suivi post-financement et déploiement</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button asChild className="gap-2">
                    <Link href="/contact">
                      Vérifier mon éligibilité
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Découvrez aussi nos{" "}
              <Link
                href="/projets"
                className="text-primary underline-offset-4 hover:underline"
              >
                projets IA
              </Link>{" "}
              : 10 modules développés pour automatiser le quotidien professionnel.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Questions fréquentes sur la stratégie IA en PME
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Les réponses aux questions que se posent les dirigeants de PME
              avant de se lancer.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
