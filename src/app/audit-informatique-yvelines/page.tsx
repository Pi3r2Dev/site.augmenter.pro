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
  AlertTriangle,
  ShieldAlert,
  Banknote,
  Search,
  FileText,
  Settings,
  Building2,
  Briefcase,
  ShoppingCart,
  Heart,
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
  title: "Audit informatique & cybersécurité PME Yvelines (78)",
  description:
    "Ton prestataire te facture plus qu'il ne résout ? Audit informatique & cybersécurité PME en Yvelines (78) — 60 min offerts, sans CB, sans engagement.",
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
    icon: AlertTriangle,
    title: "Pannes récurrentes et temps d'arrêt",
    description:
      "Votre équipe à Versailles perd des heures chaque semaine à cause de lenteurs réseau ou de pannes matérielles. Sans diagnostic, vous subissez au lieu d'anticiper.",
  },
  {
    icon: ShieldAlert,
    title: "Sécurité informatique insuffisante",
    description:
      "Les PME des Yvelines sont des cibles privilégiées : ransomware, phishing, vol de données. 60 % des PME attaquées déposent le bilan dans les 18 mois.",
  },
  {
    icon: Banknote,
    title: "Budget IT opaque et non maîtrisé",
    description:
      "Licences inutilisées, contrats de maintenance surdimensionnés, matériel vieillissant : votre SI coûte plus cher qu'il ne devrait.",
  },
  {
    icon: HardDrive,
    title: "Pas de plan de continuité d'activité",
    description:
      "En cas de sinistre — cyberattaque, panne serveur, incendie — combien de temps votre activité à Rambouillet ou Poissy serait-elle paralysée ?",
  },
];

const methodology = [
  {
    step: "01",
    icon: Phone,
    title: "Prise de contact & cadrage",
    description:
      "Échange téléphonique ou en présentiel dans vos locaux en Yvelines. Nous comprenons votre activité, vos enjeux et vos contraintes.",
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
      "Notre consultant intervient dans vos locaux — Versailles, Saint-Germain-en-Laye, Mantes-la-Jolie ou ailleurs dans le 78 — pour un diagnostic complet.",
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
    icon: Building2,
    title: "BTP & Rénovation énergétique",
    description:
      "Les entreprises du BTP à Versailles et Mantes-la-Jolie ont besoin d'un SI fiable pour gérer les chantiers, la facturation et les appels d'offres.",
    example:
      "Entreprise BTP à Poissy (78) : temps de facturation divisé par 3 après audit",
  },
  {
    icon: Briefcase,
    title: "Services aux entreprises",
    description:
      "Cabinets de conseil, ESN et prestataires à Saint-Germain-en-Laye : votre informatique doit être aussi performante que vos prestations.",
    example:
      "Cabinet RH à Saint-Germain (78) : migration cloud réussie, 0 interruption",
  },
  {
    icon: ShoppingCart,
    title: "Commerce & Distribution",
    description:
      "Points de vente, e-commerce, logistique : un audit révèle les failles de votre caisse, de votre stock et de votre site web.",
    example:
      "Réseau de boutiques à Rambouillet (78) : sécurité POS renforcée",
  },
  {
    icon: Heart,
    title: "Santé & Professions libérales",
    description:
      "Médecins, avocats, architectes en Yvelines : vos données patients et clients exigent une conformité et une sécurité irréprochables.",
    example:
      "Cabinet médical à Versailles (78) : conformité RGPD et HDS validée",
  },
];

const faqItems = [
  {
    question: "Combien coûte un audit informatique en Yvelines ?",
    answer:
      "Le diagnostic initial de 60 min est offert, sans engagement. L'Audit 360° complet coûte 550 € et inclut 3h sur site, un rapport détaillé et un plan d'action chiffré. Sur le marché, un audit PME standard coûte entre 2 000 et 15 000 € HT selon la taille et le périmètre. Consultez notre guide complet sur le coût d'un audit informatique en Yvelines : /blog/cout-audit-informatique-yvelines",
  },
  {
    question: "Combien de temps dure un audit informatique complet ?",
    answer:
      "Le diagnostic initial dure 60 min. L'audit complet nécessite environ 3h d'intervention sur site, plus le temps d'analyse et de rédaction du rapport, livré sous 5 jours ouvrés.",
  },
  {
    question:
      "Intervenez-vous à Versailles, Saint-Germain-en-Laye et Rambouillet ?",
    answer:
      "Oui, nous intervenons dans toutes les Yvelines : Versailles, Saint-Germain-en-Laye, Rambouillet, Mantes-la-Jolie, Poissy, Le Chesnay, Conflans-Sainte-Honorine, Sartrouville, et toutes les communes du 78.",
  },
  {
    question:
      "Mon entreprise a moins de 10 salariés, l'audit est-il adapté ?",
    answer:
      "Absolument. Nos audits sont calibrés pour les TPE et PME. Même avec 3 postes de travail, un audit permet d'identifier les risques critiques, d'optimiser vos coûts IT et de sécuriser vos données.",
  },
  {
    question: "Que se passe-t-il après l'audit ?",
    answer:
      "Vous recevez un rapport avec des recommandations priorisées par impact et budget. Nous pouvons vous accompagner dans la mise en œuvre ou vous laisser choisir vos prestataires. Aucune obligation.",
  },
  {
    question:
      "Proposez-vous aussi un audit IA et transformation digitale ?",
    answer:
      "Oui, notre Audit 360° IA Stratégique couvre aussi la maturité numérique et les opportunités IA de votre entreprise. Découvrez notre page Stratégie IA PME pour en savoir plus.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Audit informatique & cybersécurité Yvelines",
  description:
    "Audit informatique et cybersécurité complet pour PME en Yvelines (78) : diagnostic réseau, sécurité, cloud, RGPD. Intervention sur site à Versailles, Saint-Germain-en-Laye, Rambouillet.",
  provider: {
    "@type": "Organization",
    "@id": "https://augmenter.pro/#organization",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Yvelines",
    sameAs: "https://fr.wikipedia.org/wiki/Yvelines",
  },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "PME et TPE des Yvelines",
  },
  serviceType: "Audit informatique et cybersécurité",
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
      price: "550",
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

export default function AuditInformatiqueYvelinesPage() {
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
              Audit IT &amp; Cybersécurité · Yvelines 78
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Audit informatique &amp; cybersécurité pour PME en{" "}
              <span className="gradient-text">Yvelines (78)</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Votre informatique ralentit votre activité au lieu de
              l&apos;accélérer, ou vous doutez de votre niveau de sécurité ?
              Notre audit révèle les failles, les surcoûts et les risques de
              votre SI — avec un <strong>plan d&apos;action concret</strong>{" "}
              pour y remédier. Intervention sur site à{" "}
              <strong>
                Versailles, Saint-Germain-en-Laye, Rambouillet, Poissy
              </strong>{" "}
              et dans tout le 78.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <Zap className="mb-0.5 inline h-3.5 w-3.5 text-primary" /> Notre
              différence : un audit mené avec les outils d&apos;IA que nous
              maîtrisons (Claude Code, Claude Cowork) pour aller plus vite et
              plus loin que l&apos;inventaire classique —{" "}
              <Link
                href="/audit-ia-pme"
                className="text-primary underline-offset-4 hover:underline"
              >
                voir notre audit IA pour PME
              </Link>
              .
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
              24h — intervention sur site dans tout le 78
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
              Un audit informatique n&apos;est pas un luxe — c&apos;est une
              assurance. Les PME qui auditent régulièrement leur SI réduisent
              leurs coûts, leurs risques et leurs temps d&apos;arrêt.
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
              <span className="gradient-text">audit informatique &amp; cybersécurité</span>
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

      {/* Cybersécurité focus */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Badge variant="secondary" className="mb-4">
            Audit de cybersécurité · Yvelines 78
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Un audit de{" "}
            <span className="gradient-text">cybersécurité</span> pour PME en
            Yvelines (78)
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Un audit de cybersécurité pour une PME en Yvelines part toujours du
            même constat : <strong>93 % des incidents auraient pu être évités</strong>{" "}
            avec les mesures d&apos;hygiène de base (ANSSI). Notre diagnostic
            vérifie là où ça casse vraiment — comptes sans double authentification,
            sauvegardes jamais testées, accès d&apos;anciens collaborateurs encore
            actifs, procédure de virement non sécurisée — et vous repart avec un
            plan d&apos;action priorisé par impact, pas une liste de peurs.
          </p>
          <p className="mt-4 text-muted-foreground">
            Trois ressources pour aller plus loin selon votre besoin :
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-muted-foreground">
                <Link
                  href="/blog/cybersecurite-pme-guide-pratique"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Le guide pratique de la cybersécurité PME
                </Link>{" "}
                — les gestes concrets (MFA, mots de passe, phishing, fraude au
                président) à mettre en place cette semaine, sans budget.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-muted-foreground">
                <Link
                  href="/blog/nis2-pme-yvelines-val-doise"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Le guide et la checklist NIS2
                </Link>{" "}
                — si vos donneurs d&apos;ordres vous imposent des exigences cyber :
                les 10 mesures à cocher pour rester dans la course.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-muted-foreground">
                <Link
                  href="/blog/cout-audit-informatique-yvelines"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Combien coûte un audit informatique
                </Link>{" "}
                — la grille tarifaire transparente pour budgéter, du diagnostic
                offert à l&apos;audit complet.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Les problèmes que nos clients en{" "}
              <span className="gradient-text">Yvelines</span> rencontrent
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
              Un audit informatique en 2026, ce n&apos;est plus seulement
              vérifier vos serveurs — c&apos;est identifier les processus que
              l&apos;IA peut{" "}
              <strong>automatiser, accélérer ou simplifier</strong>. 60 % des
              organisations obtiennent un ROI complet en moins de 12 mois.
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
                icon: FileSpreadsheet,
                title: "Devis & facturation automatisés",
                description:
                  "Génération automatique de devis à partir de vos modèles, envoi et relance par IA. Les entreprises du BTP à Versailles gagnent 2h par jour sur l'administratif.",
              },
              {
                icon: Bot,
                title: "Accueil client intelligent",
                description:
                  "Chatbot ou standard téléphonique IA qui qualifie les demandes, prend les rendez-vous et répond aux questions fréquentes 24h/24.",
              },
              {
                icon: Repeat,
                title: "Workflows métier sans couture",
                description:
                  "Connexion automatique entre vos outils (CRM, compta, email, planning) pour éliminer la double saisie et les oublis. Jusqu'à 50 % de tâches manuelles en moins.",
              },
              {
                icon: FileText,
                title: "Analyse documentaire IA",
                description:
                  "Extraction de données dans vos contrats, factures et appels d'offres. Un cabinet à Saint-Germain réduit son temps de traitement de 70 %.",
              },
              {
                icon: BarChart3,
                title: "Reporting & tableaux de bord",
                description:
                  "Tableaux de bord générés par IA qui consolident vos données métier en temps réel. Fini les exports Excel manuels chaque vendredi.",
              },
              {
                icon: Zap,
                title: "Détection d'anomalies",
                description:
                  "L'IA surveille vos systèmes et vos données pour détecter les écarts, les fraudes potentielles ou les pannes imminentes avant qu'elles ne surviennent.",
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
              Notre audit identifie les flux à automatiser en priorité.{" "}
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
              <span className="gradient-text">votre secteur</span> dans le 78
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Chaque métier a ses propres enjeux informatiques. Nous adaptons
              notre audit au contexte de votre activité en Yvelines.
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
              Questions fréquentes sur l&apos;audit informatique en Yvelines
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tout ce que les dirigeants de PME du 78 nous demandent avant de
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

      <CTA variant="audit-78" />
    </div>
  );
}
