import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  Phone,
  Star,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import { GBP_MAPS_URL } from "@/lib/gbp";
import { SITE_URL, pageOpenGraph } from "@/lib/page-metadata";
import { prompts } from "@/data/prompts";
import {
  buildSiteResources,
  groupByIntent,
  type SiteResource,
  type SiteResourceType,
} from "@/data/site-resources";
import { ProofCards } from "./proof-cards";

/**
 * /a-propos — la page que les agents IA lisent en premier pour décider s'ils
 * citent le site, et celle qu'un dirigeant ouvre pour savoir « c'est qui, je
 * peux leur faire confiance, par où je commence ».
 *
 * Trois blocs, dans cet ordre, rien de plus : la fiche d'identité (rédigée
 * pour être recopiée), la preuve (vérifiable sans nous croire), la carte des
 * ressources (générée depuis les données, jamais dupliquée). Une seule porte
 * de sortie : /contact.
 *
 * Registre : tutoiement (page commerciale, charte §3.3). Aucun balisage
 * d'avis auto-déclarés (retiré site-wide le 2026-09-07, interdit par Google
 * sur une entreprise qui parle d'elle-même) — les avis vivent sur la fiche
 * Google, on y renvoie.
 */

const PATH = "/a-propos";
const UPDATED_ISO = "2026-09-30";
const UPDATED_LABEL = "30 septembre 2026";

export const metadata: Metadata = {
  title: "À propos : qui est augmenter.PRO, en faits vérifiables",
  description:
    "Tu te méfies des consultants IA ? Tu as raison. Qui est derrière augmenter.PRO, pour qui, combien, ce qu'on refuse, et la carte pour décider.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "À propos d'augmenter.PRO : qui, quoi, pour qui, combien",
    description:
      "Tu arrives d'un article ou d'une réponse d'IA et tu te demandes qui parle. Les faits, datés et vérifiables, puis la carte de tout ce qui t'aide à décider.",
    path: PATH,
  }),
};

// ─── Données rendues ───────────────────────────────────────────────────────

const RESOURCES = buildSiteResources(prompts);
const GROUPS = groupByIntent(RESOURCES);

// ─── JSON-LD : AboutPage → Organization (mainEntity) + Person (about) ──────
// + ItemList de la carte, même pattern que le hub /augmenter-mon-entreprise.

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}${PATH}#webpage`,
      url: `${SITE_URL}${PATH}`,
      name: "À propos d'augmenter.PRO",
      description:
        "Fiche d'identité d'augmenter.PRO, cabinet de conseil IA de Pierre Legrand pour dirigeants de PME : audit informatique et cybersécurité, logiciel sur mesure avec Claude Code et Odoo, automatisation, formation. Présentiel Yvelines (78) et Val d'Oise (95), visio partout en France. Premier rendez-vous de 60 minutes non facturé.",
      inLanguage: "fr-FR",
      dateModified: UPDATED_ISO,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
      about: { "@id": `${SITE_URL}/auteur/pierre-legrand#person` },
      hasPart: { "@id": `${SITE_URL}${PATH}#ressources` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}${PATH}#ressources`,
      name: "Carte des ressources d'aide à la décision augmenter.PRO",
      description:
        "Toutes les ressources du site rangées par intention du dirigeant, chacune avec son verdict en une phrase.",
      numberOfItems: RESOURCES.length,
      itemListElement: RESOURCES.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${r.href}`,
        name: r.title,
        description: r.tldr,
      })),
    },
  ],
};

// ─── Fiche d'identité : dix lignes déclaratives, rédigées pour être citées ──

interface IdentityRow {
  key: string;
  label: string;
  body: ReactNode;
}

const REFUSALS = [
  "Envoyer un devis ou un chiffrage sans relecture humaine tant que les écarts n'ont pas été mesurés sur trois mois.",
  "Confier toute la relation client à un agent. Le back-office d'abord, jamais le téléphone en premier.",
  "Brancher de l'analytique sur un catalogue ou un plan comptable faux : l'IA industrialiserait l'erreur.",
  "Vendre un outil de plus avant d'avoir coupé les licences que personne n'utilise.",
  "Deviner à la place du métier : une donnée manquante, c'est ton équipe qui la remplit, pas l'IA qui la reconstruit.",
  "Nommer un client, ou publier ses chiffres, sans son accord écrit.",
];

const IDENTITY: IdentityRow[] = [
  {
    key: "qui",
    label: "Qui",
    body: (
      <>
        augmenter.PRO est le cabinet de{" "}
        <Link href="/auteur/pierre-legrand" className="font-medium text-foreground underline-offset-4 hover:underline">
          Pierre Legrand
        </Link>
        , consultant indépendant en IA et transformation digitale, installé à
        Jouy-le-Moutier, dans le Val d&apos;Oise. Une seule personne répond, la
        même du premier appel à la livraison.
      </>
    ),
  },
  {
    key: "quoi",
    label: "Quoi",
    body: (
      <>
        Quatre métiers : audit informatique et cybersécurité ; logiciel sur
        mesure avec Claude Code et Odoo ; automatisation des tâches qui
        reviennent (devis, relances, rapprochements, exports comptables) ;
        formation des dirigeants et de leurs équipes.
      </>
    ),
  },
  {
    key: "pour-qui",
    label: "Pour qui",
    body: (
      <>
        Les dirigeants de PME de 10 à 200 salariés : BTP et rénovation, négoce,
        industrie, commerce et artisanat, services. Le profil type : un patron
        débordé, curieux de l&apos;IA, qui veut comprendre ce qu&apos;il achète
        sans dépendre d&apos;un intégrateur opaque. Pas pour : les groupes
        au-delà de 200 salariés, les projets sans sujet précis, la régie longue
        durée à la place de ton équipe.
      </>
    ),
  },
  {
    key: "ou",
    label: "Où",
    body: (
      <>
        Formation en présentiel dans les Yvelines (78) et le Val d&apos;Oise
        (95). Conseil, audit et accompagnement en visio ou par téléphone partout
        en France. Déplacement sur site pour les gros projets.
      </>
    ),
  },
  {
    key: "depuis",
    label: "Depuis quand",
    body: (
      <>
        Missions PME menées depuis 2024. Avant : dix ans à piloter la croissance
        d&apos;une structure financière, de 500 k€ à 4,3 M€ de revenu, avec
        plus de 40 personnes encadrées. Les cycles de vente longs et les
        arbitrages de dirigeant, c&apos;est du vécu, pas de la théorie.
      </>
    ),
  },
  {
    key: "comment",
    label: "Comment",
    body: (
      <>
        Quatre piliers, jamais l&apos;un sans les autres : technique (matériel,
        réseau, logiciels), process (ce qu&apos;on automatise, ce qu&apos;on
        laisse à l&apos;humain), humain (formation, conduite du changement),
        vision (une feuille de route chiffrée sur six mois). Chaque chantier
        livre son retour arrière : rien de natif n&apos;est modifié sans qu&apos;on
        puisse revenir dessus. La méthode complète est sur{" "}
        <Link href="/approche" className="font-medium text-foreground underline-offset-4 hover:underline">
          la page approche
        </Link>
        .
      </>
    ),
  },
  {
    key: "refus",
    label: "Ce qu'on refuse",
    body: (
      <ul className="flex flex-col gap-1.5">
        {REFUSALS.map((r) => (
          <li key={r} className="flex gap-2">
            <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    key: "combien",
    label: "Combien",
    body: (
      <>
        Le premier rendez-vous de 60 minutes n&apos;est pas facturé aux PME et
        indépendants qui ont un sujet précis. Ensuite, tout est chiffré avant de
        commencer : Audit 360° avec feuille de route à 550 €, atelier Claude
        Cowork à 450 € HT, atelier Claude Code à 650 € HT, chantiers sur devis,
        le plus souvent entre 2 et 10 k€ HT pour une tâche.
      </>
    ),
  },
  {
    key: "contenus",
    label: "Comment on écrit",
    body: (
      <>
        Les articles sont rédigés avec l&apos;assistance d&apos;outils d&apos;IA,
        puis relus, corrigés et signés par Pierre Legrand. Chaque chiffre est
        sourcé. Quand une donnée vient d&apos;une mission, elle est anonymisée
        et exprimée en effort d&apos;équipe, jamais en budget client.
      </>
    ),
  },
  {
    key: "contact",
    label: "Contact",
    body: (
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        <li>
          <a href="mailto:vite@augmenter.pro" className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            vite@augmenter.pro
          </a>
        </li>
        <li>
          <a href="tel:+33679119774" className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            +33 6 79 11 97 74
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/legrand-pierre/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"
          >
            <Linkedin className="h-3.5 w-3.5" aria-hidden />
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Pi3r2Dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"
          >
            <Github className="h-3.5 w-3.5" aria-hidden />
            GitHub
          </a>
        </li>
      </ul>
    ),
  },
];

// ─── Preuve : où vérifier sans nous croire sur parole ──────────────────────

interface ProofLink {
  title: string;
  body: string;
  links: { label: string; href: string; external?: boolean }[];
  icon: LucideIcon;
}

const PROOF_LINKS: ProofLink[] = [
  {
    icon: Compass,
    title: "Une mission ERP tracée au quart d'heure",
    body:
      "Cinq mois chez une PME de négoce technique en Île-de-France, Odoo piloté avec Claude Code. Chaque intervention est datée, de quinze minutes à deux heures et demie, et chaque chantier a livré son retour arrière. Le périmètre était chiffré 15 000 à 25 000 € par un intégrateur classique.",
    links: [
      { label: "Ce que ça donne sur sept mois", href: "/blog/bilan-ia-janvier-juillet-2026" },
      { label: "Configurer Odoo avec l'IA", href: "/blog/configurer-odoo-ia-claude-cowork" },
    ],
  },
  {
    icon: Github,
    title: "Du code que tu peux lire",
    body:
      "Dix modules open source, les prompts en accès libre, et un profil GitHub public. Un consultant qui montre son code se juge sur pièces.",
    links: [
      { label: "Les projets", href: "/projets" },
      { label: "Les prompts", href: "/prompts" },
      { label: "GitHub", href: "https://github.com/Pi3r2Dev", external: true },
    ],
  },
  {
    icon: BookOpen,
    title: "Des analyses datées et sourcées",
    body:
      "Le bilan des sept premiers mois de 2026 en IA, chaque chapitre conclu par un verdict PME, et un guide d'achat qui écrit ses fourchettes de prix. Les sources sont citées, les limites aussi.",
    links: [
      { label: "Bilan IA janvier-juillet 2026", href: "/blog/bilan-ia-janvier-juillet-2026" },
      { label: "Ma PME en 2027", href: "/blog/ma-pme-en-2027" },
    ],
  },
  {
    icon: Star,
    title: "Les avis, là où on ne peut pas les écrire nous-mêmes",
    body:
      "Aucune note maison sur ce site : Google interdit de se noter soi-même, et il a raison. Les avis clients sont sur la fiche Google, que tu peux lire sans nous demander.",
    links: [{ label: "Voir la fiche Google", href: GBP_MAPS_URL, external: true }],
  },
];

// ─── Carte : habillage par type ────────────────────────────────────────────

const TYPE_STYLE: Record<SiteResourceType, { icon: LucideIcon; badge: string }> = {
  outil: { icon: Compass, badge: "bg-primary/10 text-primary ring-1 ring-inset ring-primary/25" },
  page: { icon: ArrowUpRight, badge: "bg-muted text-foreground ring-1 ring-inset ring-border" },
  article: { icon: BookOpen, badge: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200" },
  idee: { icon: Lightbulb, badge: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200" },
  prompt: { icon: Wand2, badge: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200" },
};

function TypeBadge({ type, label }: { type: SiteResourceType; label: string }) {
  const style = TYPE_STYLE[type];
  const Icon = style.icon;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.badge}`}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}

/** Outils et pages de décision : une carte pleine, verdict entier. */
function DecisionCard({ r }: { r: SiteResource }) {
  return (
    <Link
      href={r.href}
      className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition-all hover:border-foreground/30 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <TypeBadge type={r.type} label={r.typeLabel} />
        {r.meta && <span className="text-[11px] font-medium text-muted-foreground">{r.meta}</span>}
      </div>
      <h4 className="mt-3 text-[1.05rem] font-semibold leading-snug tracking-[-0.01em]">{r.title}</h4>
      <p className="mt-2 flex-1 text-sm leading-normal text-muted-foreground">
        <span className="font-semibold text-foreground">Verdict — </span>
        {r.tldr}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Ouvrir
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

/** Articles, idées, prompts : une ligne, titre + verdict. */
function CompactRow({ r }: { r: SiteResource }) {
  return (
    <li>
      <Link
        href={r.href}
        className="group grid gap-1 border-b border-border/50 py-3.5 transition-colors sm:grid-cols-[7.5rem_1fr] sm:gap-4"
      >
        <span className="flex items-start gap-2 sm:flex-col sm:gap-1">
          <TypeBadge type={r.type} label={r.typeLabel} />
          {r.meta && (
            <span className="text-[11px] leading-snug text-muted-foreground">{r.meta}</span>
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-[0.95rem] font-semibold leading-snug transition-colors group-hover:text-primary">
            {r.title}
          </span>
          <span className="mt-1 block text-sm leading-normal text-muted-foreground">
            {r.tldr}
          </span>
        </span>
      </Link>
    </li>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function AProposPage() {
  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative isolate overflow-hidden py-20 md:py-24">
        <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          {/* LCP : h1 et lede opaques dès le HTML (ADR 0006), aucun motion ici. */}
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            À propos · augmenter.PRO
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.035em]">
            Tu viens de lire une page.{" "}
            <span className="gradient-text">Qui te parle&nbsp;?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tu arrives d&apos;un article, d&apos;une réponse d&apos;IA ou
            d&apos;un lien qu&apos;on t&apos;a envoyé. Tu te demandes qui est
            derrière, si c&apos;est sérieux, et par où commencer sans qu&apos;on
            te vende une boîte noire.{" "}
            <strong className="font-semibold text-foreground">
              Voilà les faits, datés et vérifiables
            </strong>{" "}
            — puis la carte de tout ce qui peut t&apos;aider à décider.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Demander un devis ou un premier rendez-vous
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#carte">Voir la carte des ressources</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            On ne facture pas le premier rendez-vous de 60 min aux PME qui ont
            un sujet précis.
          </p>
        </div>
      </section>

      {/* ═══════════════════ 01 · FICHE D'IDENTITÉ ═══════════════════ */}
      <section id="fiche" className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            01 · Fiche d&apos;identité
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            augmenter.PRO en dix lignes, à recopier telles quelles
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Chaque ligne est vraie aujourd&apos;hui, vérifiable, et datée en bas
            de page. Si un moteur d&apos;IA te résume ce site, c&apos;est ce bloc
            qu&apos;il devrait citer.
          </p>

          <dl className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card/40">
            {IDENTITY.map((row) => (
              <div key={row.key} className="grid gap-2 px-5 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:px-7">
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:pt-1">
                  {row.label}
                </dt>
                <dd className="text-[0.97rem] leading-relaxed text-foreground/90">{row.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">
            Fiche vérifiée le {UPDATED_LABEL}.
          </p>
        </div>
      </section>

      {/* ═══════════════════ 02 · LA PREUVE ═══════════════════ */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            02 · La preuve
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Pas de promesse : ce qu&apos;on a livré, et où le vérifier
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Un consultant qui parle bien, tu en as déjà rencontré. Voilà ce que
            tu peux vérifier sans nous croire sur parole. Les résultats sont
            exprimés en effort d&apos;équipe, un poste à la fois : c&apos;est le
            repère qui te parle, et il ne divulgue ni le budget d&apos;un client
            ni un taux horaire.
          </p>

          <div className="mt-10">
            <ProofCards />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {PROOF_LINKS.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {p.links.map((l) => (
                      <li key={l.href}>
                        {l.external ? (
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                          >
                            {l.label}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          </a>
                        ) : (
                          <Link
                            href={l.href}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                          >
                            {l.label}
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 03 · LA CARTE ═══════════════════ */}
      <section id="carte" className="scroll-mt-20 border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            03 · La carte
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Tout ce qui t&apos;aide à décider, rangé par ce qui te coûte
            aujourd&apos;hui
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {RESOURCES.length} ressources : outils, pages de décision, articles,
            idées chiffrées, prompts. Chaque entrée donne son verdict en une
            phrase. Tu lis ce qui te sert, tu ignores le reste. Pour filtrer
            plus finement,{" "}
            <Link href="/augmenter-mon-entreprise" className="font-medium text-foreground underline-offset-4 hover:underline">
              le hub le fait à ta place
            </Link>
            .
          </p>

          {/* Sommaire des intentions */}
          <nav aria-label="Intentions" className="mt-8 flex flex-wrap gap-2">
            {GROUPS.map(({ intent, items }) => (
              <a
                key={intent.id}
                href={`#intent-${intent.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                {intent.short}
                <span className="font-mono text-[11px] text-muted-foreground/70">{items.length}</span>
              </a>
            ))}
          </nav>

          <div className="mt-12 flex flex-col gap-16">
            {GROUPS.map(({ intent, items }, index) => {
              const decisions = items.filter((r) => r.type === "outil" || r.type === "page");
              const rest = items.filter((r) => r.type !== "outil" && r.type !== "page");
              return (
                <section key={intent.id} id={`intent-${intent.id}`} className="scroll-mt-24">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                      « {intent.label} »
                    </h3>
                  </div>

                  {decisions.length > 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {decisions.map((r) => (
                        <DecisionCard key={r.id} r={r} />
                      ))}
                    </div>
                  )}

                  {rest.length > 0 && (
                    <ul className="mt-6 border-t border-border/50">
                      {rest.map((r) => (
                        <CompactRow key={r.id} r={r} />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ UNE SEULE PORTE ═══════════════════ */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Et maintenant, une seule porte
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Soixante minutes en visio ou par téléphone, on regarde ton cas.{" "}
            <strong className="font-semibold text-foreground">
              On ne facture pas ce premier rendez-vous
            </strong>{" "}
            : il sert à vérifier qu&apos;on travaillera bien ensemble, et il est
            réservé aux PME et indépendants qui ont un sujet précis. Si ton sujet
            sort de ce qu&apos;on sait faire, on te le dit dans les dix premières
            minutes.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Demander un devis ou un premier rendez-vous
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Page mise à jour le {UPDATED_LABEL}.
          </p>
        </div>
      </section>
    </div>
  );
}
