import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Terminal,
  FileCode,
  Workflow,
  AppWindow,
  Plug,
  Puzzle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/cta";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";

export const metadata: Metadata = {
  title: "Atelier Claude Cowork & Claude Code Dirigeant PME",
  description:
    "Deux ateliers ½ journée pour dirigeant PME : Claude Cowork no-code (450 €) puis Claude Code (650 €) selon votre projet. Présentiel 78/95 ou visio.",
  alternates: { canonical: "https://augmenter.pro/atelier-claude-code-dirigeant" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://augmenter.pro/atelier-claude-code-dirigeant#service",
  name: "Atelier Claude Cowork & Claude Code pour dirigeant de PME",
  serviceType: "Formation / atelier IA",
  description:
    "Deux ateliers d'une demi-journée pour dirigeant de PME : un palier d'entrée no-code avec Claude Cowork (l'application desktop) et un palier avancé avec Claude Code (le terminal). Démarrage no-code, montée en puissance quand le projet le justifie. Présentiel Yvelines (78) / Val d'Oise (95) ou visio.",
  provider: { "@id": "https://augmenter.pro/#organization" },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Yvelines (78)" },
    { "@type": "AdministrativeArea", name: "Val d'Oise (95)" },
    { "@type": "Country", name: "France" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ateliers IA pour dirigeant de PME",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Atelier Claude Cowork — demi-journée (no-code)",
        price: "450",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://augmenter.pro/atelier-claude-code-dirigeant",
        itemOffered: {
          "@type": "Service",
          name: "Atelier Claude Cowork pour dirigeant de PME",
          description:
            "Demi-journée no-code : prise en main de Claude Desktop / onglet Cowork, connexion de vos fichiers et outils, création de 2-3 skills et workflows métier. Aucun code.",
        },
      },
      {
        "@type": "Offer",
        name: "Atelier Claude Code — demi-journée (avancé)",
        price: "650",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://augmenter.pro/atelier-claude-code-dirigeant",
        itemOffered: {
          "@type": "Service",
          name: "Atelier Claude Code pour dirigeant de PME",
          description:
            "Demi-journée avancée : installation de Claude Code sur votre projet, rédaction d'un CLAUDE.md opérationnel et mise en production de 2-3 workflows.",
        },
      },
    ],
  },
};

const faqItems = [
  {
    q: "Quelle différence entre Claude Cowork et Claude Code ?",
    a: "Claude Cowork est l'application desktop de Claude : un assistant agentique no-code qui lit vos fichiers, se branche à vos outils et exécute des tâches sur votre poste, sans écrire une ligne de code. Claude Code est l'outil en ligne de commande (terminal), pensé pour les projets et dépôts de code que l'on veut industrialiser, versionner et automatiser en profondeur.",
  },
  {
    q: "Par lequel commencer ?",
    a: "Si vous n'écrivez pas de code, commencez par Claude Cowork (450 €) : c'est la porte d'entrée la plus rapide vers l'IA qui agit sur votre quotidien. Vous passerez à Claude Code (650 €) le jour où vous aurez un vrai projet ou dépôt à industrialiser — et pas avant.",
  },
  {
    q: "Faut-il savoir coder pour l'atelier Claude Cowork ?",
    a: "Non. L'atelier Cowork est entièrement no-code : tout se fait dans l'application desktop, sur vos documents et vos outils. Le seul prérequis est d'être déjà à l'aise avec ChatGPT ou Claude en conversation.",
  },
  {
    q: "C'est en présentiel ou en visio ?",
    a: "Les deux. En présentiel dans les Yvelines (78) et le Val d'Oise (95), ou en visio partout en France. Le format est le même : une demi-journée en tête-à-tête, sur votre contexte réel.",
  },
  {
    q: "Peut-on enchaîner Cowork puis Code ?",
    a: "Oui, c'est même la progression recommandée. Beaucoup de dirigeants démarrent en no-code avec Cowork, prennent leurs marques sur quelques workflows, puis réservent l'atelier Code quand un projet plus technique le justifie.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const coworkPourQui = [
  "Dirigeant ou cadre qui n'écrit pas de code (et ne veut pas s'y mettre)",
  "Déjà à l'aise avec ChatGPT / Claude, prêt à passer à l'IA qui agit",
  "Des tâches répétitives concrètes : devis, comptes-rendus, reporting, tri d'emails",
  "Veut un assistant qui lit ses fichiers et ses outils, pas une énième fenêtre de chat",
];

const codePourQui = [
  "Dirigeant tech-curieux, à l'aise avec un terminal (ou prêt à apprendre)",
  "Un projet, un dépôt de code ou une automatisation à industrialiser",
  "Veut versionner, documenter et fiabiliser ses workflows IA",
  "A déjà tiré la valeur de Cowork et veut aller plus loin",
];

const coworkProgramme = [
  {
    icon: AppWindow,
    title: "1 · Claude Desktop & l'onglet Cowork",
    body: "On installe Claude Desktop et on prend en main l'onglet Cowork. Vous comprenez ce que l'IA agentique sait faire sur votre poste — lire vos fichiers, rédiger, organiser — et ses garde-fous.",
  },
  {
    icon: Plug,
    title: "2 · Connecter vos fichiers & vos outils",
    body: "On branche Cowork sur vos documents et vos outils métier pour qu'il travaille sur VOTRE contexte réel, pas sur du générique.",
  },
  {
    icon: Puzzle,
    title: "3 · Vos premiers skills & workflows",
    body: "On crée ensemble 2-3 skills réutilisables tirés de votre quotidien (devis, compte-rendu, reporting…). Vous repartez avec des automatisations no-code qui tournent.",
  },
];

const codeProgramme = [
  {
    icon: Terminal,
    title: "1 · Installation & prise en main",
    body: "On installe Claude Code sur votre machine et votre projet réel. Vous comprenez la logique agentique en terminal : ce que l'outil sait faire, ses garde-fous, quand l'utiliser.",
  },
  {
    icon: FileCode,
    title: "2 · Votre premier CLAUDE.md",
    body: "On rédige ensemble le fichier de contexte qui transforme Claude Code en collaborateur qui connaît votre projet : conventions, garde-fous, décisions. La mémoire qui évite la dérive.",
  },
  {
    icon: Workflow,
    title: "3 · 2-3 workflows lancés",
    body: "On met en production 2-3 cas d'usage tirés de VOTRE quotidien. Vous repartez avec des automatisations qui tournent, pas des slides.",
  },
];

const coworkInclus = [
  "Une demi-journée (≈ 3h30) en tête-à-tête, sur vos fichiers réels",
  "Claude Desktop installé + 2-3 skills et workflows no-code en place",
  "Un compte-rendu écrit avec vos prochaines étapes",
  "30 jours de questions par email après l'atelier",
];

const codeInclus = [
  "Une demi-journée (≈ 3h30) en tête-à-tête, sur votre projet réel",
  "Votre CLAUDE.md opérationnel + 2-3 workflows en production",
  "Les templates CLAUDE.md prêts à l'emploi (accès au dépôt public)",
  "Un compte-rendu écrit + 30 jours de questions par email",
];

const comparatif = [
  { critere: "Outil", cowork: "Claude Desktop (app)", code: "Claude Code (terminal)" },
  { critere: "Niveau", cowork: "Entrée — no-code", code: "Avancé — projet / dépôt" },
  { critere: "Prérequis", cowork: "Aucun (sait utiliser un chat IA)", code: "À l'aise avec un terminal" },
  { critere: "Vous repartez avec", cowork: "2-3 skills & workflows no-code", code: "CLAUDE.md + workflows en prod" },
  { critere: "Durée", cowork: "½ journée", code: "½ journée" },
  { critere: "Prix", cowork: "450 € HT", code: "650 € HT" },
];

export default function AtelierClaudeCodePage() {
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

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden py-20">
        <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
            <Terminal className="h-4 w-4" />
            Ateliers dirigeant · demi-journée
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Passez à l&apos;IA qui agit —{" "}
            <span className="gradient-text">de Claude Cowork à Claude Code</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Pas une formation théorique. Deux ateliers en tête-à-tête, sur{" "}
            <strong>vos</strong> cas réels. On démarre en no-code avec{" "}
            <strong>Claude Cowork</strong>, et on passe à <strong>Claude Code</strong>{" "}
            le jour où votre projet le justifie. Vous repartez autonome.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="#cowork">
                Démarrer avec Cowork — 450 € HT
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="#code">Atelier Claude Code — 650 € HT</Link>
            </Button>
          </div>
          <p className="mt-5 inline-flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> Présentiel 78/95 ou visio
            <Clock className="ml-2 h-4 w-4" /> ½ journée chacun
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-20 px-4 pb-24 sm:px-6">
        {/* ── Comparatif / chooser ── */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight">Deux paliers, une progression</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Cowork est la porte d&apos;entrée no-code. Claude Code est le niveau
            supérieur, pour industrialiser un vrai projet. Vous choisissez selon
            où vous en êtes.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 font-medium text-muted-foreground"> </th>
                  <th className="px-4 py-3 font-semibold text-violet-700 dark:text-violet-300">
                    Claude Cowork
                  </th>
                  <th className="px-4 py-3 font-semibold">Claude Code</th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((row) => (
                  <tr key={row.critere} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-muted-foreground">{row.critere}</td>
                    <td className="px-4 py-3">{row.cowork}</td>
                    <td className="px-4 py-3">{row.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Palier 1 — Cowork ── */}
        <section id="cowork" className="scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
                Palier 1 · entrée no-code
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Atelier Claude Cowork
              </h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-violet-700 dark:text-violet-300">450 € HT</p>
              <p className="text-sm text-muted-foreground">demi-journée, sans code</p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            L&apos;application desktop de Claude qui agit sur vos fichiers et vos
            outils. On la met en route sur votre quotidien, sans une ligne de code.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-lg font-bold">Pour qui</h3>
              <ul className="mt-4 space-y-3">
                {coworkPourQui.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-7 dark:border-violet-900/50 dark:bg-violet-950/20">
              <h3 className="text-lg font-bold">Ce qui est inclus</h3>
              <ul className="mt-4 space-y-3">
                {coworkInclus.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {coworkProgramme.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Réserver l&apos;atelier Cowork — 450 € HT
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── Palier 2 — Code ── */}
        <section id="code" className="scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                Palier 2 · avancé
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Atelier Claude Code
              </h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-violet-700 dark:text-violet-300">650 € HT</p>
              <p className="text-sm text-muted-foreground">demi-journée, sur votre projet</p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            L&apos;outil en ligne de commande qui transforme un vrai projet en
            workflows fiables, versionnés et documentés. Pour aller plus loin que
            le no-code.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-lg font-bold">Pour qui</h3>
              <ul className="mt-4 space-y-3">
                {codePourQui.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/60 p-7 dark:border-violet-900/50 dark:bg-violet-950/20">
              <h3 className="text-lg font-bold">Ce qui est inclus</h3>
              <ul className="mt-4 space-y-3">
                {codeInclus.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {codeProgramme.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Réserver l&apos;atelier Code — 650 € HT
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── Progression ── */}
        <section className="rounded-2xl border border-border bg-muted/30 p-8">
          <h2 className="text-2xl font-bold tracking-tight">Quand passer de Cowork à Code ?</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-violet-700 dark:text-violet-300">Restez sur Cowork si…</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>vous travaillez surtout sur des documents et de la bureautique ;</li>
                <li>vos tâches sont récurrentes mais simples (devis, comptes-rendus, tri) ;</li>
                <li>vous ne voulez pas toucher à un terminal.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-amber-700 dark:text-amber-300">Passez à Code quand…</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>vous avez un vrai projet ou dépôt de code à faire avancer ;</li>
                <li>vous voulez versionner et fiabiliser vos automatisations ;</li>
                <li>vous voulez intégrer l&apos;IA dans votre chaîne d&apos;outils technique.</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Pas besoin de choisir parfaitement aujourd&apos;hui : on en discute
            ensemble au premier contact, et beaucoup de dirigeants enchaînent les
            deux à quelques semaines d&apos;intervalle.
          </p>
        </section>

        {/* ── Pourquoi pas 3 000 € ── */}
        <section className="rounded-2xl border border-violet-200 bg-violet-50/60 p-8 dark:border-violet-900/50 dark:bg-violet-950/20">
          <h2 className="text-2xl font-bold tracking-tight">Pourquoi des tarifs à 450 € et 650 €, pas 3 000 € ?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Parce que l&apos;objectif n&apos;est pas de vous vendre des jours de
            prestation, mais de vous rendre autonome en une session. Si vous voulez
            aller plus loin ensuite, on en reparle — sans engagement.
          </p>
        </section>

        {/* ── Crédibilité ── */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight">Pourquoi avec augmenter.PRO</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            On documente publiquement notre méthode — vous savez exactement à quoi
            vous attendre :
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              →{" "}
              <Link href="/blog/claude-code-prompt-architecture" className="text-primary hover:underline">
                L&apos;architecture de prompt Claude Code
              </Link>{" "}
              (notre article le plus lu)
            </li>
            <li>
              →{" "}
              <Link href="/blog/prompt-audit-projet-claude-fable" className="text-primary hover:underline">
                Le prompt d&apos;audit complet de projet (Claude Fable)
              </Link>{" "}
              (pour évaluer votre existant avant l&apos;atelier)
            </li>
            <li>
              →{" "}
              <Link href="/blog/configurer-odoo-ia-claude-cowork" className="text-primary hover:underline">
                Configurer Odoo avec Claude Cowork en 4 jours
              </Link>{" "}
              — cas client réel
            </li>
            <li>
              →{" "}
              <a
                href="https://github.com/Pi3r2Dev/claude-md-templates-pme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Nos templates CLAUDE.md en accès ouvert (GitHub)
              </a>
            </li>
          </ul>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight">Questions fréquentes</h2>
          <div className="mt-8 space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <CTA variant="default" />
    </div>
  );
}
