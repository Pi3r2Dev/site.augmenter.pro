"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";
import { CardShell, LiquidBlob } from "@/components/widgets/blobs";
import type { Palette } from "@/components/widgets/palettes";
import { Chapter } from "../../approche/narrative/primitives/chapter";
import { Pill } from "../../approche/narrative/primitives/pill";
import { Lede } from "../../approche/narrative/primitives/lede";
import { useWordSplitter } from "../../approche/narrative/primitives/word-splitter";

interface FeatureItem {
  kind: "article" | "idee";
  title: string;
  excerpt: string;
  href: string;
  palette: Palette;
  seed: number;
  tag: string;
}

const ARTICLES: FeatureItem[] = [
  {
    kind: "article",
    tag: "Commercial",
    title:
      "J'ai transformé Claude Cowork en community manager : le setup, ce qui a foiré",
    excerpt:
      "Six semaines à confier les réseaux à Claude Cowork. Le setup en 4 briques, les prompts, les chiffres — et les trois fois où ça a mal tourné.",
    href: "/blog/claude-cowork-community-manager",
    palette: "violet",
    seed: 41,
  },
  {
    kind: "article",
    tag: "Cybersécurité",
    title: "Cybersécurité PME : 93 % des attaques sont évitables avec du bon sens",
    excerpt:
      "Mots de passe, double authentification, phishing, fraude au président : le plan d'action pour couvrir l'essentiel du risque en une semaine, sans DSI ni gros budget.",
    href: "/blog/cybersecurite-pme-guide-pratique",
    palette: "duo",
    seed: 46,
  },
  {
    kind: "article",
    tag: "Bilan 2026",
    title: "IA janvier-juillet 2026 : sept mois de bascule pour votre PME",
    excerpt:
      "Quatre modèles frontier en deux mois, agents open source, prix divisés par huit, IA en tête de Google. Le tri — fait, sourcé, et traduit en décisions PME.",
    href: "/blog/bilan-ia-janvier-juillet-2026",
    palette: "amber",
    seed: 53,
  },
];

const IDEES: FeatureItem[] = [
  {
    kind: "idee",
    tag: "Facility",
    title: "Robot nettoyeur pour bureaux",
    excerpt:
      "Pour les surfaces > 300 m², la robotique amortit en 18-24 mois. Rapports d'entretien dans l'app, équipes libérées du ménage répétitif.",
    href: "/idees#robot-nettoyeur",
    palette: "violet",
    seed: 61,
  },
  {
    kind: "idee",
    tag: "Assistant",
    title: "Secrétaire personnelle IA",
    excerpt:
      "Transcription des appels, agenda, rédaction d'emails, follow-ups — pour les dirigeants qui passent 8 h par semaine sur de l'admin.",
    href: "/idees#secretaire-ia",
    palette: "cold",
    seed: 68,
  },
  {
    kind: "idee",
    tag: "Logistique",
    title: "Optimisation des tournées",
    excerpt:
      "Algorithme Google OR-Tools sur vos livraisons : −30 % de carburant, trajets plus courts, moins de stress pour les chauffeurs.",
    href: "/idees#optimisation-tournees",
    palette: "mono",
    seed: 74,
  },
];

function FeatureCard({ item }: { item: FeatureItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      data-hover
      className="block h-[320px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label={item.title}
    >
      <CardShell palette={item.palette} hovered={hovered} onHover={setHovered}>
        <div
          aria-hidden
          className="absolute h-[80%] w-[80%]"
          style={{ top: -50, right: -70 }}
        >
          <LiquidBlob palette={item.palette} hovered={hovered} seed={item.seed} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur-sm">
            {item.tag}
          </span>
          <div>
            <h3 className="text-[18px] font-semibold leading-tight tracking-[-0.01em] text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-[13px] leading-snug text-white/75 line-clamp-3">
              {item.excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/65 transition-colors group-hover:text-white">
              {item.kind === "article" ? "Lire l'article" : "Voir l'idée"}
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </CardShell>
    </Link>
  );
}

export function H05Recit() {
  const ledeRef = useRef<HTMLDivElement>(null);
  useWordSplitter(ledeRef);

  return (
    <Chapter id="h-05" num="05" title="Le récit continue" mood="amber" theme="light">
      <div data-anim="up">
        <Pill variant="amber">Le récit continue</Pill>
      </div>
      <div ref={ledeRef}>
        <Lede>
          Trois lectures, trois
          <br />
          <em>idées</em> à tester demain.
        </Lede>
      </div>
      <p
        data-anim="up"
        className="max-w-[58ch] text-[clamp(17px,1.5vw,22px)] leading-relaxed text-(--fg-muted)"
      >
        Le contenu d&apos;augmenter.PRO sert un usage : vous donner des
        outils, des cas réels et des chiffres à recycler dès demain matin.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-(--fg-muted)">
            <BookOpen className="h-4 w-4" />
            Articles · trois lectures
          </h3>
          <Link
            href="/blog"
            data-hover
            className="font-mono text-[11px] uppercase tracking-widest text-(--fg-muted) hover:text-(--fg)"
          >
            Tout le blog →
          </Link>
        </div>
        <div
          data-anim="stagger"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ARTICLES.map((a) => (
            <FeatureCard key={a.href} item={a} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-(--fg-muted)">
            <Lightbulb className="h-4 w-4" />
            Idées · trois pistes
          </h3>
          <Link
            href="/idees"
            data-hover
            className="font-mono text-[11px] uppercase tracking-widest text-(--fg-muted) hover:text-(--fg)"
          >
            Toutes les idées →
          </Link>
        </div>
        <div
          data-anim="stagger"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {IDEES.map((i) => (
            <FeatureCard key={i.href} item={i} />
          ))}
        </div>
      </div>
    </Chapter>
  );
}
