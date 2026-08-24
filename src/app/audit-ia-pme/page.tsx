import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Workflow,
  Target,
  Database,
  ShieldCheck,
  Gauge,
  Banknote,
  TrendingUp,
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  Search,
  FileText,
  Settings,
  Phone,
  Building2,
  Home,
  Factory,
  Briefcase,
  MapPin,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Audit IA PME : diagnostic offert + feuille de route chiffrée",
  description:
    "L'IA peut booster ta PME mais tu ne sais pas par où commencer ? Audit IA : cas d'usage prioritaires, ROI chiffré, feuille de route. Diagnostic 180° offert.",
  alternates: { canonical: "https://augmenter.pro/audit-ia-pme" },
};

const stats = [
  {
    value: "+255 %",
    label: "de recherches « audit IA » en 1 an",
    detail: "Le sujet explose chez les dirigeants (Google, FR)",
    icon: TrendingUp,
  },
  {
    value: "165 %",
    label: "ROI médian d'un projet IA bien ciblé",
    detail: "Retour en 6 à 7 mois en moyenne",
    icon: BarChart3,
  },
  {
    value: "60 %",
    label: "des PME freinées par les compétences",
    detail: "Premier frein cité par les dirigeants",
    icon: Users,
  },
  {
    value: "80 %",
    label: "de prise en charge possible",
    detail: "Via le programme Osez l'IA (Bpifrance)",
    icon: Banknote,
  },
];

const auditScope = [
  {
    icon: Gauge,
    title: "Maturité IA de l'entreprise",
    description:
      "Où en sont réellement tes équipes et tes outils ? Un état des lieux honnête, sans flatter ni dramatiser.",
  },
  {
    icon: Workflow,
    title: "Cartographie des processus",
    description:
      "On suit tes flux de travail réels pour repérer où le temps se perd, où les tâches se répètent.",
  },
  {
    icon: Target,
    title: "Cas d'usage prioritaires",
    description:
      "Les 20 % de cas d'usage IA qui génèrent 80 % des gains, classés par ROI et facilité de déploiement.",
  },
  {
    icon: Database,
    title: "Données & conformité",
    description:
      "Qualité, accessibilité et gouvernance de tes données. RGPD et AI Act intégrés dès le diagnostic.",
  },
  {
    icon: Brain,
    title: "Stack & outils IA existants",
    description:
      "ChatGPT, Claude, Copilot, no-code… On audite ce qui tourne déjà et ce qui se chevauche inutilement.",
  },
  {
    icon: EyeOff,
    title: "Shadow AI & risques",
    description:
      "L'IA utilisée en douce par tes équipes, hors cadre. On la révèle et on la sécurise.",
  },
  {
    icon: ShieldCheck,
    title: "Souveraineté & sécurité",
    description:
      "Où partent tes données ? Hébergement européen, solutions souveraines quand c'est pertinent.",
  },
  {
    icon: Banknote,
    title: "Éligibilité au financement",
    description:
      "On vérifie si ton projet rentre dans Osez l'IA (Bpifrance) — jusqu'à 80 % pris en charge.",
  },
];

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Tu ne sais pas par où commencer",
    description:
      "Tout le monde te parle d'IA, mais personne ne te dit quoi faire concrètement dans TA boîte. Résultat : tu attends, et tes concurrents avancent.",
  },
  {
    icon: EyeOff,
    title: "L'IA tourne déjà en douce, sans cadre",
    description:
      "Tes équipes collent déjà des données dans ChatGPT sans que tu le saches. Sans audit, tu subis un risque RGPD au lieu de le piloter.",
  },
  {
    icon: Target,
    title: "Tu as peur qu'on te vende un projet inutile",
    description:
      "Les agences IA promettent monts et merveilles puis facturent des projets à 20 000 € au ROI invisible. Un audit indépendant te protège de ça.",
  },
  {
    icon: Banknote,
    title: "Budget gaspillé sur les mauvais chantiers",
    description:
      "Sans priorisation, tu investis dans des cas d'usage à faible impact. L'audit identifie les quick wins avant de dépenser un euro.",
  },
];

const methodology = [
  {
    step: "01",
    icon: Phone,
    title: "Diagnostic 180° — 60 min, offert",
    description:
      "Un premier échange en visio (partout en France) pour comprendre ton activité, tes irritants et tes objectifs. Sans CB, sans engagement.",
    details: [
      "Entretien dirigeant de 60 min",
      "Identification des premiers irritants",
      "Périmètre de l'audit défini ensemble",
      "Premières pistes de cas d'usage",
    ],
  },
  {
    step: "02",
    icon: Search,
    title: "Audit IA 360° — cartographie & maturité",
    description:
      "Une demi-journée pour cartographier tes processus, évaluer ta maturité IA et la qualité de tes données. En visio ou en présentiel (78/95).",
    details: [
      "Cartographie des flux de travail",
      "Évaluation de la maturité numérique",
      "Audit des données & conformité RGPD/AI Act",
      "Entretiens avec les équipes terrain",
    ],
  },
  {
    step: "03",
    icon: FileText,
    title: "Rapport & feuille de route chiffrée",
    description:
      "Un livrable clair et actionnable : cas d'usage priorisés par ROI, outils recommandés, budget et calendrier sur 6 mois. Prêt à exécuter.",
    details: [
      "Matrice impact / effort des cas d'usage",
      "Roadmap avec jalons trimestriels",
      "Budget prévisionnel détaillé",
      "Recommandations outils & souveraineté",
    ],
  },
  {
    step: "04",
    icon: Settings,
    title: "Accompagnement au déploiement",
    description:
      "On ne te laisse pas seul avec un rapport. Mise en œuvre, formation des équipes et ajustements pour transformer le plan en résultats.",
    details: [
      "Pilotage des quick wins",
      "Formation & conduite du changement",
      "Suivi KPI et ajustements",
      "Montage du dossier de financement",
    ],
  },
];

const sectors = [
  {
    icon: Building2,
    title: "BTP & Rénovation",
    description:
      "Devis générés à la chaîne, planning chantier optimisé, comptes-rendus automatisés et prospection internalisée.",
    example: "PME BTP à Versailles (78) : devis générés 3× plus vite",
  },
  {
    icon: Home,
    title: "Immobilier",
    description:
      "Estimation assistée, rédaction d'annonces, scoring acquéreur et suivi client automatisé de bout en bout.",
    example: "Agence à Cergy (95) : 50 % de temps gagné sur les estimations",
  },
  {
    icon: Factory,
    title: "Industrie & Artisanat",
    description:
      "Maintenance prédictive, gestion de stock intelligente, optimisation des tournées et contrôle qualité.",
    example: "Artisan à Pontoise (95) : ruptures de stock réduites de 40 %",
  },
  {
    icon: Briefcase,
    title: "Services & Conseil",
    description:
      "Assistants IA pour la veille, la rédaction, l'analyse documentaire et l'automatisation administrative.",
    example: "Cabinet à Saint-Germain (78) : productivité +35 %",
  },
];

const faqItems = [
  {
    question: "C'est quoi, concrètement, un audit IA pour une PME ?",
    answer:
      "C'est un diagnostic stratégique : on cartographie tes processus, on évalue ta maturité IA et la qualité de tes données, puis on identifie les cas d'usage IA à fort ROI pour ton métier. Le livrable n'est pas un rapport théorique mais une feuille de route chiffrée et priorisée, prête à exécuter. L'objectif : savoir exactement où l'IA va te faire gagner du temps ou de l'argent, et dans quel ordre.",
  },
  {
    question: "Combien coûte un audit IA pour une PME ?",
    answer:
      "Le diagnostic 180° initial est offert (60 min, sans engagement). L'Audit IA 360° complet coûte 550 € et inclut une demi-journée de cartographie et une feuille de route sur 6 mois. C'est volontairement accessible : sur le marché, un audit IA d'agence coûte généralement entre 3 000 et 20 000 € HT. Le programme Osez l'IA de Bpifrance peut ensuite prendre en charge jusqu'à 80 % du coût d'accompagnement au déploiement.",
  },
  {
    question: "Combien de temps prend un audit IA ?",
    answer:
      "Le diagnostic initial dure 60 min. L'audit complet repose sur une demi-journée d'intervention (en visio ou sur site), suivie de l'analyse et de la rédaction du rapport, livré sous 5 jours ouvrés. Pas besoin de bloquer des semaines : on va à l'essentiel.",
  },
  {
    question: "Faut-il déjà avoir des compétences IA en interne ?",
    answer:
      "Non, c'est même le cas de la majorité des dirigeants qu'on accompagne. L'audit part de ton métier, pas de la technologie. On identifie des quick wins réalisables sans expertise technique, et la formation de tes équipes fait partie intégrante de l'accompagnement si tu décides d'aller plus loin.",
  },
  {
    question: "Et la conformité RGPD et l'AI Act dans tout ça ?",
    answer:
      "Elle est intégrée dès la phase de diagnostic. On vérifie où partent tes données, on privilégie l'hébergement européen et les solutions souveraines quand c'est pertinent, et on cadre les usages « shadow AI » (l'IA utilisée en douce par tes équipes). L'AI Act européen impose de nouvelles obligations selon les usages : on t'indique celles qui te concernent.",
  },
  {
    question: "Vous n'intervenez qu'en Yvelines et Val-d'Oise ?",
    answer:
      "Non. L'audit IA et l'accompagnement se font en visio partout en France (et en francophonie). Nous sommes basés en Yvelines (78) et intervenons en présentiel dans le 78 et le Val-d'Oise (95), avec des déplacements possibles pour les projets de plus grande ampleur.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Audit IA pour PME",
  description:
    "Audit IA pour PME françaises : évaluation de la maturité IA, cartographie des processus, identification des cas d'usage prioritaires par ROI et feuille de route chiffrée. Diagnostic initial offert.",
  provider: {
    "@type": "Organization",
    "@id": "https://augmenter.pro/#organization",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "France",
    },
    {
      "@type": "AdministrativeArea",
      name: "Yvelines",
      sameAs: "https://fr.wikipedia.org/wiki/Yvelines",
    },
    {
      "@type": "AdministrativeArea",
      name: "Val-d'Oise",
      sameAs: "https://fr.wikipedia.org/wiki/Val-d%27Oise",
    },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "PME et ETI françaises",
  },
  serviceType: "Audit IA / diagnostic intelligence artificielle",
  offers: [
    {
      "@type": "Offer",
      name: "Diagnostic 180° IA",
      price: "0",
      priceCurrency: "EUR",
      description:
        "Audit initial de 60 minutes pour identifier tes premiers leviers IA",
      url: "https://augmenter.pro/contact",
    },
    {
      "@type": "Offer",
      name: "Audit IA 360°",
      price: "550",
      priceCurrency: "EUR",
      description:
        "Diagnostic complet avec cartographie des processus et feuille de route IA chiffrée sur 6 mois",
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

export default function AuditIaPmePage() {
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
              Audit IA pour PME
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="gradient-text">Audit IA</span> pour PME : par où
              commencer, sans te faire piéger
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Tu sais que l&apos;IA peut t&apos;aider, mais entre le bruit
              ambiant et les agences qui veulent te vendre un projet à 20 000 €,
              tu ne sais plus quoi faire. Notre audit IA part de{" "}
              <strong>ton métier</strong> : on identifie les cas d&apos;usage qui
              comptent vraiment, chiffrés et priorisés. Diagnostic{" "}
              <strong>180° offert</strong>, en visio partout en France.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Diagnostic 180° — 60 min offertes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/approche#prestations">Voir nos prestations</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Clock className="mb-0.5 inline h-3.5 w-3.5" /> Réponse sous 24h —
              sans CB, sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              L&apos;audit IA : un réflexe de dirigeant, pas un gadget
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Les recherches « audit IA » ont explosé chez les dirigeants
              français. La raison est simple : seules les PME qui{" "}
              <strong>cadrent avant d&apos;investir</strong> tirent un vrai
              retour de l&apos;intelligence artificielle.
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
            Sources : Google Trends FR, Baromètre France Num 2025, Bpifrance Le
            Lab.{" "}
            <Link
              href="/blog/agent-ia-dirigeant-pme"
              className="text-primary underline-offset-4 hover:underline"
            >
              Comprendre ce qu&apos;un agent IA peut faire pour toi
            </Link>
            . Et si c&apos;est ton logiciel métier qui t&apos;inquiète,
            commence par le passer au{" "}
            <Link
              href="/blog/prompt-audit-projet-claude-fable"
              className="text-primary underline-offset-4 hover:underline"
            >
              prompt d&apos;audit complet Claude Fable
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Audit Scope */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ce que couvre notre{" "}
              <span className="gradient-text">audit IA</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Un diagnostic à 360° de ton potentiel IA — des processus terrain à
              la conformité, sans angle mort.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {auditScope.map((item) => (
              <Card key={item.title} className="border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ces blocages te parlent ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tu n&apos;es pas en retard. Tu manques juste d&apos;un cadre clair.
              Un audit IA fait passer ta PME de l&apos;hésitation à la décision.
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
            adresse ces blocages à la racine : technique, processus et humain.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Notre audit IA en 4 étapes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Du diagnostic offert à la feuille de route exécutable — une méthode
              cadrée, sans jargon et sans projet imposé.
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
              <Link href="/contact">
                Lancer mon diagnostic 180°
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Un audit IA adapté à{" "}
              <span className="gradient-text">ton secteur</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Chaque métier a ses propres cas d&apos;usage IA. On part de tes
              enjeux terrain, avec des exemples concrets de PME — locales et
              partout en France.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sectors.map((sector) => (
              <Card key={sector.title} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <sector.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{sector.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {sector.description}
                  </p>
                  <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-primary">
                    <MapPin className="mb-0.5 mr-1 inline h-3 w-3" />
                    {sector.example}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Découvre comment{" "}
            <Link
              href="/idees"
              className="text-primary underline-offset-4 hover:underline"
            >
              l&apos;IA facture déjà dans 9 cas d&apos;usage concrets
            </Link>{" "}
            par secteur.
          </p>
        </div>
      </section>

      {/* Financing */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Fais financer ton projet IA
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Le programme <strong>Osez l&apos;IA</strong> (Bpifrance / France
                2030) finance jusqu&apos;à <strong>80 % du coût</strong>{" "}
                d&apos;accompagnement IA pour les PME. On t&apos;aide à en
                bénéficier dès l&apos;audit.
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
                        <span>PME de 10 à 2 000 salariés, CA &gt; 250 K&euro;</span>
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
                      Notre rôle dans ton dossier
                    </h3>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Évaluation de ton éligibilité</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Préparation du diagnostic préalable</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>Accompagnement à la constitution du dossier</span>
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
              Une fois les cas d&apos;usage validés, découvre notre{" "}
              <Link
                href="/strategie-ia-pme"
                className="text-primary underline-offset-4 hover:underline"
              >
                accompagnement stratégie IA
              </Link>{" "}
              pour passer de l&apos;audit au déploiement.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Questions fréquentes sur l&apos;audit IA en PME
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Les réponses aux questions que se posent les dirigeants avant de se
              lancer.
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
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Plutôt un besoin d&apos;audit du parc informatique ?{" "}
              <Link
                href="/audit-informatique-yvelines"
                className="text-primary underline-offset-4 hover:underline"
              >
                Découvre notre audit informatique (78)
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
