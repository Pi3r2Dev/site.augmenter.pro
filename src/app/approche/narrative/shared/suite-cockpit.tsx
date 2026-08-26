"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  ArrowRight,
  Check,
  Target,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Phone,
  Zap,
} from "lucide-react";
import { CardShell, LiquidBlob } from "@/components/widgets/blobs";
import type { Palette } from "@/components/widgets/palettes";
import { Chapter } from "../primitives/chapter";
import { Pill } from "../primitives/pill";
import { useWordSplitter } from "../primitives/word-splitter";

const auditFeatures = [
  "Diagnostic de votre infrastructure",
  "Analyse des processus actuels",
  "Identification des quick wins",
  "Recommandations personnalisées",
];

const contactBlocks = [
  { k: "Pierre Legrand", v: "Consultant indépendant" },
  { k: "Email", v: "vite@augmenter.pro", href: "mailto:vite@augmenter.pro" },
  { k: "Téléphone", v: "+33 6 79 11 97 74", href: "tel:+33679119774" },
];

// Cockpit — pure page links, no anchors. Reorganised from the old global
// footer (Services / Ressources / Légal). Anchor-only items from the
// legacy footer (Audit IA 360°, Audit Informatique 180°, Dév sur mesure,
// Formation équipes — all pointed to /approche#prestations) were
// consolidated into the single "Notre approche" link.
interface CockpitColumn {
  title: string;
  palette: Palette;
  accent: string;
  items: { label: string; href: string }[];
}

const cockpit: CockpitColumn[] = [
  {
    title: "Services & Approche",
    palette: "violet",
    accent: "oklch(0.702 0.183 293)",
    items: [
      { label: "Notre approche", href: "/approche" },
      { label: "Audit informatique Yvelines (78)", href: "/audit-informatique-yvelines" },
      { label: "Audit informatique Val d'Oise (95)", href: "/audit-informatique-val-doise" },
      { label: "Intégration MCP", href: "/integration-mcp" },
    ],
  },
  {
    title: "Ressources",
    palette: "amber",
    accent: "oklch(0.828 0.189 84.429)",
    items: [
      { label: "Stratégie IA PME", href: "/strategie-ia-pme" },
      { label: "Articles & tutos", href: "/blog" },
      { label: "Prompts IA", href: "/prompts" },
      { label: "Idées PRO", href: "/idees" },
      { label: "Nos projets", href: "/projets" },
    ],
  },
  {
    title: "Identité & Légal",
    palette: "cold",
    accent: "oklch(0.72 0.15 260)",
    items: [
      { label: "Pierre Legrand", href: "/auteur/pierre-legrand" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/politique-confidentialite" },
      { label: "CGV", href: "/cgv" },
      { label: "Plan du site", href: "/plan-du-site" },
    ],
  },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/legrand-pierre/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "https://x.com/Pi3r2Dev", label: "Twitter / X", icon: Twitter },
  { href: "https://github.com/Pi3r2Dev", label: "GitHub", icon: Github },
  { href: "mailto:vite@augmenter.pro", label: "Email", icon: Mail },
  {
    href: "https://wa.me/33679119774",
    label: "WhatsApp",
    icon: Phone,
  },
];

function AuditCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="h-[480px]">
      <CardShell palette="violet" hovered={hovered} onHover={setHovered}>
        <div
          aria-hidden
          className="absolute h-[85%] w-[85%]"
          style={{ top: -60, right: -90 }}
        >
          <LiquidBlob palette="violet" hovered={hovered} seed={161} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
              <Target className="h-5 w-5 text-white" />
            </div>
            <span className="rounded-full border border-white/20 bg-white/8 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur-sm">
              Audit 180°
            </span>
          </div>
          <div>
            <div
              className="font-semibold leading-none tracking-[-0.04em] text-white"
              style={{ fontSize: 60 }}
            >
              60 min
            </div>
            <div className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-white/65">
              Sur rendez-vous · sans engagement
            </div>
            <h3 className="mt-5 text-[22px] font-semibold leading-tight text-white">
              Premier rendez-vous, non facturé
            </h3>
            <p className="mt-2 max-w-[34ch] text-[13px] leading-snug text-white/75">
              Un échange concret pour identifier vos quick wins et vérifier
              qu&apos;on est alignés. Si le fit n&apos;est pas là, on vous oriente
              ailleurs.
            </p>
            <ul className="mt-4 flex flex-col gap-1.5">
              {auditFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[13px] leading-snug text-white/85"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/contact"
            data-hover
            className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[13px] font-medium text-neutral-900 transition-colors hover:bg-white/90"
          >
            Réserver mon diagnostic
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardShell>
    </div>
  );
}

function CockpitNavColumn({ col }: { col: CockpitColumn }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="block h-2.5 w-2.5 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${col.accent}, transparent 70%), ${col.accent}`,
            boxShadow: `0 0 12px ${col.accent}`,
          }}
        />
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-white/85">
          {col.title}
        </h3>
      </div>
      <ul className="flex flex-col gap-2.5">
        {col.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              data-hover
              className="group inline-flex items-center gap-1.5 text-[14px] text-white/75 transition-colors hover:text-white"
            >
              <span
                aria-hidden
                className="text-white/30 transition-all group-hover:text-amber-300 group-hover:translate-x-0.5"
              >
                →
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SuiteCockpitProps {
  chapterId: string;
  chapterNum: string;
  totalChapters: number;
}

export function SuiteCockpit({
  chapterId,
  chapterNum,
  totalChapters,
}: SuiteCockpitProps) {
  const ledeRef = useRef<HTMLHeadingElement>(null);
  useWordSplitter(ledeRef);

  return (
    <Chapter id={chapterId} num={chapterNum} title="La suite" mood="ember" theme="dark">
      <div data-anim="up">
        <Pill variant="glass">Prochain pas · le vôtre</Pill>
      </div>
      <h2
        ref={ledeRef}
        data-anim="words"
        data-gradient="ember"
        className="max-w-[16ch] font-bold leading-[0.95] tracking-[-0.04em] text-white"
        style={{ fontSize: "clamp(48px, 9vw, 144px)" }}
      >
        Quel est votre
        <br />
        <em>prochain niveau&nbsp;?</em>
      </h2>
      <p
        data-anim="up"
        className="max-w-[60ch] text-[clamp(17px,1.5vw,22px)] leading-relaxed text-white/75"
      >
        Zéro engagement, zéro jargon technique — 60 minutes pour identifier
        vos leviers concrets et savoir où l&apos;IA et le numérique peuvent
        vraiment vous faire gagner du temps, de l&apos;argent, ou de la
        sérénité.
      </p>

      {/* Audit card + Contact column */}
      <div
        data-anim="stagger"
        className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-stretch"
      >
        <AuditCard />
        <div className="flex flex-col justify-between gap-8 md:pl-2">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              data-hover
              className="inline-flex items-center gap-2.5 rounded-md bg-violet-600 px-5 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-violet-700"
            >
              Réserver l&apos;audit 180°
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              data-hover
              className="inline-flex items-center gap-2.5 rounded-md border border-white/30 px-5 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Lire les articles
            </Link>
          </div>
          <div className="flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-10">
            {contactBlocks.map((c) => {
              const value = c.href ? (
                <Link href={c.href} className="hover:underline" data-hover>
                  {c.v}
                </Link>
              ) : (
                <span>{c.v}</span>
              );
              return (
                <div key={c.k} className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/55">
                    {c.k}
                  </span>
                  <span className="text-[15px] text-white">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cockpit nav grid */}
      <div
        data-anim="stagger"
        className="relative mt-8 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-12"
      >
        {cockpit.map((col) => (
          <CockpitNavColumn key={col.title} col={col} />
        ))}
      </div>

      {/* Brand + social + récit count */}
      <div
        data-anim="up"
        className="mt-6 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-white/65">
          <span
            aria-hidden
            className="grid h-[22px] w-[22px] place-items-center rounded-md bg-(--violet-600) text-white"
          >
            <Zap className="h-3 w-3" />
          </span>
          <span>augmenter.PRO · 2026</span>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map((s) => {
            const Icon = s.icon;
            const external = s.href.startsWith("http");
            return external ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-hover
                className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                onClick={
                  s.label === "WhatsApp"
                    ? () => sendGTMEvent({ event: "whatsapp_click", location: "suite-cockpit" })
                    : undefined
                }
              >
                <Icon className="h-4 w-4" />
              </a>
            ) : (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                data-hover
                className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Récit · {totalChapters} chapitres · fin
        </div>
      </div>
    </Chapter>
  );
}
