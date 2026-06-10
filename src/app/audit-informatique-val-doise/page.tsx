import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  TrendingDown,
  Clock,
  CheckCircle2,
  Network,
  Cloud,
  HardDrive,
  FileCheck,
  Receipt,
  Phone,
  Monitor,
  ShieldAlert,
  Database,
  FileWarning,
  Search,
  FileText,
  Settings,
  Truck,
  Building2,
  Store,
  Factory,
  ArrowRight,
  MapPin,
  Zap,
  BarChart3,
  Bot,
  FileSpreadsheet,
  Repeat,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Audit informatique Val-d'Oise (95) : 60 min pour y voir clair",
  description:
    "Pannes, sécurité fragile, infogérance opaque ? Audit informatique PME en Val-d'Oise (95) : 60 min offerts, audit complet dès 225 €. NIS2 & RGPD inclus.",
};

const stats = [
  {
    value: "72 %",
    label: "des PME attaquées sans audit",
    detail: "N'avaient pas réalisé d'audit récent (ANSSI)",
    icon: Shield,
  },
  {
    value: "−35 %",
    label: "de coûts IT après audit",
    detail: "Licences, maintenance, infra optimisées",
    icon: TrendingDown,
  },
  {
    value: "4h",
    label: "de reprise après incident",
    detail: "Temps moyen pour une PME non auditée",
    icon: Clock,
  },
  {
    value: "60 min",
    label: "diagnostic initial offert",
    detail: "Premier échange sans engagement",
    icon: CheckCircle2,
  },
];

const auditScope = [
  {
    icon: Network,
    title: "Réseau & connectivité",
    description:
      "Performance réseau, Wi-Fi, câblage, débit internet et segmentation.",
  },
  {
    icon: Shield,
    title: "Sécurité informatique",
    description:
      "Pare-feu, antivirus, politique de mots de passe, gestion des accès.",
  },
  {
    icon: Monitor,
    title: "Postes de travail",
    description:
      "État du matériel, obsolescence, performances et durée de vie restante.",
  },
  {
    icon: Cloud,
    title: "Cloud & hébergement",
    description:
      "Serveurs, solutions cloud, Microsoft 365, Google Workspace, hébergement web.",
  },
  {
    icon: HardDrive,
    title: "Sauvegarde & PRA",
    description:
      "Politique de sauvegarde, plan de reprise d'activité, tests de restauration.",
  },
  {
    icon: FileCheck,
    title: "Conformité RGPD",
    description:
      "Données personnelles, registre de traitement, droit des personnes, DPO.",
  },
  {
    icon: Receipt,
    title: "Licences & coûts",
    description:
      "Audit des licences logicielles, abonnements inutilisés, optimisation budget.",
  },
  {
    icon: Phone,
    title: "Téléphonie & collaboration",
    description:
      "VoIP, Teams, visioconférence, outils collaboratifs et messagerie.",
  },
];

const painPoints = [
  {
    icon: Monitor,
    title: "Infrastructure vieillissante",
    description:
      "Votre PME à Cergy ou Argenteuil tourne encore sur du matériel de plus de 5 ans. Pannes imprévisibles, performances dégradées, incompatibilité avec les logiciels récents.",
  },
  {
    icon: ShieldAlert,
    title: "Cybersécurité négligée",
    description:
      "Le Val-d'Oise concentre de nombreuses zones d'activité — Saint-Ouen-l'Aumône, Gonesse, Roissy. Les PME en croissance sont les premières cibles des cyberattaques.",
  },
  {
    icon: Database,
    title: "Données non protégées",
    description:
      "Sans politique de sauvegarde testée, une panne disque ou un ransomware à Pontoise peut faire disparaître des années de données clients et comptables.",
  },
  {
    icon: FileWarning,
    title: "Conformité RGPD incertaine",
    description:
      "Vos données clients, vos fichiers RH, vos échanges emails : êtes-vous certain d'être conforme ? Un audit révèle les écarts et les actions correctives à mener.",
  },
];

const methodology = [
  {
    step: "01",
    icon: Phone,
    title: "Prise de contact & cadrage",
    description:
      "Échange téléphonique ou en présentiel dans vos locaux dans le Val-d'Oise. Nous comprenons votre activité, vos enjeux et vos contraintes.",
    details: [
      "Entretien dirigeant de 60 min (offert)",
      "Identification des priorités",
      "Périmètre de l'audit défini ensemble",
      "Planification de l'intervention",
    ],
  },
  {
    step: "02",
    icon: Search,
    title: "Audit terrain sur site",
    description:
      "Notre consultant intervient dans vos locaux — Cergy, Pontoise, Argenteuil ou ailleurs dans le 95 — pour un diagnostic complet de votre infrastructure.",
    details: [
      "Inventaire matériel et logiciel",
      "Tests de performance réseau",
      "Analyse des vulnérabilités",
      "Évaluation des processus de sauvegarde",
    ],
  },
  {
    step: "03",
    icon: FileText,
    title: "Rapport & recommandations",
    description:
      "Un livrable clair et actionnable : rapport détaillé avec des recommandations priorisées par impact et budget.",
    details: [
      "Cartographie complète de votre SI",
      "Analyse des risques hiérarchisée",
      "Plan d'action chiffré et priorisé",
      "Préconisations de prestataires locaux",
    ],
  },
  {
    step: "04",
    icon: Settings,
    title: "Suivi & accompagnement",
    description:
      "Nous ne vous laissons pas seul avec un rapport. Suivi de la mise en œuvre et support continu pour transformer les recommandations en résultats.",
    details: [
      "Pilotage de la mise en œuvre",
      "Coordination avec vos prestataires",
      "Point de suivi à 30 jours",
      "Support email continu",
    ],
  },
];

const sectors = [
  {
    icon: Truck,
    title: "Logistique & Transport",
    description:
      "Le Val-d'Oise, avec la plateforme de Roissy et les zones logistiques de Gonesse et Saint-Ouen-l'Aumône, concentre des PME dont le SI doit fonctionner 24h/24.",
    example:
      "Transporteur à Gonesse (95) : PRA mis en place, reprise en 2h garantie",
  },
  {
    icon: Building2,
    title: "BTP & Artisanat",
    description:
      "Artisans et entreprises du bâtiment à Pontoise, Taverny, Ermont : un audit révèle les outils sous-utilisés et les failles de sécurité.",
    example:
      "Artisan plombier à Ermont (95) : factures automatisées, 2h/semaine gagnées",
  },
  {
    icon: Store,
    title: "Commerce & Restauration",
    description:
      "Les zones commerciales de Cergy, Argenteuil et Enghien-les-Bains regorgent de commerces dont la caisse, le stock et le site web méritent un check-up.",
    example:
      "Restaurant à Enghien (95) : système de caisse sécurisé, tickets conformes",
  },
  {
    icon: Factory,
    title: "Industrie & PME manufacturières",
    description:
      "Les zones industrielles du Val-d'Oise — Persan, Bruyères-sur-Oise — abritent des PME dont l'outil de production dépend d'un SI fiable et sécurisé.",
    example:
      "PME industrielle à Persan (95) : réseau segmenté, production protégée",
  },
];

const faqItems = [
  {
    question: "Quel est le prix d'un audit informatique dans le Val-d'Oise ?",
    answer:
      "Le diagnostic initial de 60 min est offert, sans engagement. L'Audit 360° complet coûte 225 € et comprend 3h d'intervention sur site, un rapport détaillé et un plan d'action chiffré. Un audit PME standard coûte entre 2 000 et 15 000 € HT sur le marché. Détails dans notre guide tarifaire : /blog/cout-audit-informatique-yvelines",
  },
  {
    question: "Intervenez-vous à Cergy, Pontoise et Argenteuil ?",
    answer:
      "Oui, nous intervenons dans tout le Val-d'Oise : Cergy, Pontoise, Argenteuil, Sarcelles, Enghien-les-Bains, Taverny, Ermont, Gonesse, Saint-Ouen-l'Aumône, et toutes les communes du 95.",
  },
  {
    question:
      "Mon parc informatique est petit (moins de 5 postes), l'audit vaut-il le coup ?",
    answer:
      "Oui. Un parc réduit ne signifie pas un risque réduit : une seule faille peut paralyser votre activité. L'audit identifie les priorités et permet souvent de réaliser des économies immédiates sur les licences et la maintenance.",
  },
  {
    question:
      "L'audit couvre-t-il aussi la téléphonie et les outils collaboratifs ?",
    answer:
      "Oui. Nous auditons votre téléphonie (VoIP, ligne fixe), vos outils collaboratifs (Teams, Google Workspace, Slack) et vos solutions de visioconférence pour vérifier leur sécurité et leur coût.",
  },
  {
    question:
      "Combien de temps faut-il pour mettre en œuvre les recommandations ?",
    answer:
      "Cela dépend de la complexité. Les quick wins (mises à jour, suppression de licences inutiles, politique de mots de passe) prennent 1 à 2 semaines. Une refonte réseau ou migration cloud peut nécessiter 1 à 3 mois avec un prestataire.",
  },
  {
    question:
      "Faites-vous aussi de l'infogérance ou de la maintenance informatique ?",
    answer:
      "Non, nous sommes consultants et non prestataires d'infogérance. Notre indépendance garantit des recommandations objectives. Nous pouvons vous orienter vers des prestataires locaux fiables dans le 95.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Audit informatique Val-d'Oise",
  description:
    "Audit informatique complet pour PME en Val-d'Oise (95) : diagnostic réseau, sécurité, cloud, RGPD. Intervention sur site à Cergy, Pontoise, Argenteuil.",
  provider: {
    "@type": "Organization",
    "@id": "https://augmenter.pro/#organization",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Val-d'Oise",
    sameAs: "https://fr.wikipedia.org/wiki/Val-d%27Oise",
  },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "PME et TPE du Val-d'Oise",
  },
  serviceType: "Audit informatique",
  offers: [
    {
      "@type": "Offer",
      name: "Diagnostic informatique initial",
      price: "0",
      priceCurrency: "EUR",
      description:
        "Audit initial de 60 minutes pour identifier vos leviers d'optimisation IT",
      url: "https://augmenter.pro/contact",
    },
    {
      "@type": "Offer",
      name: "Audit 360° Informatique",
      price: "225",
      priceCurrency: "EUR",
      description:
        "Diagnostic complet de 3h avec rapport détaillé et plan d'action chiffré",
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

export default function AuditInformatiqueValDoisePage() {
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
              Audit Informatique 95
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Audit informatique pour PME en{" "}
              <span className="gradient-text">Val-d&apos;Oise (95)</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Pannes à répétition, sécurité fragile, budget IT flou ? Notre
              audit identifie les failles et les surcoûts de votre système
              d&apos;information — avec un{" "}
              <strong>plan d&apos;action chiffré</strong> pour reprendre le
              contrôle. Intervention sur site à{" "}
              <strong>
                Cergy, Pontoise, Argenteuil, Sarcelles, Enghien-les-Bains
              </strong>{" "}
              et dans tout le 95.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Diagnostic initial — 60 min
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/approche#prestations">Voir nos prestations</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Clock className="mb-0.5 inline h-3.5 w-3.5" /> Réponse sous
              24h — intervention sur site dans tout le 95
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pourquoi auditer votre informatique ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Les cyberattaques ciblent de plus en plus les PME. Un audit
              régulier de votre SI est le meilleur investissement pour protéger
              votre activité et optimiser vos coûts.
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
            Sources : ANSSI, France Num 2025.{" "}
            <Link
              href="/blog/5-signes-moderniser-informatique-pme"
              className="text-primary underline-offset-4 hover:underline"
            >
              Les 5 signes qu&apos;il est temps de moderniser
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
              <span className="gradient-text">audit informatique</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Un diagnostic complet de votre système d&apos;information, de
              l&apos;infrastructure réseau à la conformité RGPD.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {auditScope.map((item) => (
              <Card key={item.title} className="text-center border-border/50">
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
              Les problèmes que nos clients en{" "}
              <span className="gradient-text">Val-d&apos;Oise</span>{" "}
              rencontrent
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ces situations vous parlent ? Un audit informatique permet de
              passer de la réaction à l&apos;anticipation.
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
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Notre méthode d&apos;audit en 4 étapes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              De la prise de contact au suivi post-audit — une démarche
              structurée pour sécuriser et optimiser votre informatique.
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
                Demander un diagnostic
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Workflow Optimization */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              IA &amp; Automatisation
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Optimisez vos{" "}
              <span className="gradient-text">flux de travail</span> grâce à
              l&apos;IA
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              En 2026, un audit informatique va plus loin que la technique :
              il identifie les processus que l&apos;IA peut{" "}
              <strong>automatiser, accélérer ou fiabiliser</strong>. Les PME
              qui automatisent constatent en moyenne 25 à 30 % de gains de
              productivité sur les processus traités.
            </p>
          </div>

          {/* Stats row */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "+30 %", label: "de productivité", icon: TrendingUp },
              { value: "−35 %", label: "de coûts opérationnels", icon: TrendingDown },
              { value: "< 12 mois", label: "pour un ROI complet", icon: BarChart3 },
              { value: "−75 %", label: "d'erreurs manuelles", icon: CheckCircle2 },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2 text-2xl font-bold text-primary">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Use cases grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Repeat,
                title: "Chaîne logistique automatisée",
                description:
                  "Suivi des expéditions, gestion des stocks et optimisation des itinéraires par IA. Les transporteurs de Gonesse et Roissy réduisent leurs coûts logistiques de 25 %.",
              },
              {
                icon: Bot,
                title: "Standard téléphonique IA",
                description:
                  "Un assistant vocal intelligent qui qualifie les appels, prend les rendez-vous et répond aux questions courantes. Disponible 24h/24, sans embauche.",
              },
              {
                icon: FileSpreadsheet,
                title: "Facturation & relances auto",
                description:
                  "Génération automatique de factures, envoi et relances par IA. Les artisans d'Ermont et Taverny gagnent 2h par jour sur la paperasse.",
              },
              {
                icon: BarChart3,
                title: "Pilotage en temps réel",
                description:
                  "Tableaux de bord IA qui consolident production, trésorerie et RH. Les PME industrielles de Persan visualisent leurs KPI sans export Excel.",
              },
              {
                icon: FileText,
                title: "Traitement documentaire IA",
                description:
                  "Extraction automatique de données dans vos bons de commande, contrats et factures fournisseurs. Jusqu'à 70 % de temps de traitement en moins.",
              },
              {
                icon: Zap,
                title: "Maintenance prédictive",
                description:
                  "L'IA analyse les données de vos équipements pour anticiper les pannes avant qu'elles ne paralysent votre production. Jusqu'à 50 % de temps d'arrêt en moins.",
              },
            ].map((useCase) => (
              <Card key={useCase.title} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <useCase.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-3 font-semibold">{useCase.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Notre audit identifie les processus à automatiser en priorité.{" "}
              <Link
                href="/strategie-ia-pme"
                className="text-primary underline-offset-4 hover:underline"
              >
                En savoir plus sur notre accompagnement IA
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Un audit adapté à{" "}
              <span className="gradient-text">votre secteur</span> dans le 95
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Chaque métier a ses propres enjeux informatiques. Nous adaptons
              notre audit au tissu économique du Val-d&apos;Oise.
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
                    <MapPin className="mb-0.5 mr-1 inline h-3 w-3" />
                    {sector.example}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Questions fréquentes sur l&apos;audit informatique en
              Val-d&apos;Oise
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tout ce que les dirigeants de PME du 95 nous demandent avant de
              lancer un audit.
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
              Vous cherchez aussi à exploiter l&apos;IA dans votre PME ?{" "}
              <Link
                href="/audit-ia-pme"
                className="text-primary underline-offset-4 hover:underline"
              >
                Découvrez notre audit IA pour PME
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTA variant="audit-95" />
    </div>
  );
}
