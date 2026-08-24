"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Target, Brain, ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CardShell, LiquidBlob } from "@/components/widgets/blobs";
import type { Palette } from "@/components/widgets/palettes";
import { Chapter } from "../primitives/chapter";
import { Pill } from "../primitives/pill";
import { Lede } from "../primitives/lede";
import { useWordSplitter } from "../primitives/word-splitter";

interface AuditOffer {
  icon: LucideIcon;
  badge: string;
  priceBig: string;
  priceSub: string;
  title: string;
  subtitle: string;
  features: string[];
  cta: string;
  href: string;
  palette: Palette;
  seed: number;
}

const audits: AuditOffer[] = [
  {
    icon: Target,
    badge: "Audit 180°",
    priceBig: "60 min",
    priceSub: "Offert · sans engagement",
    title: "Diagnostic offert",
    subtitle:
      "Un échange concret pour identifier vos quick wins et vérifier qu'on est alignés.",
    features: [
      "Diagnostic de votre infrastructure",
      "Analyse des processus actuels",
      "Identification des quick wins",
      "Recommandations personnalisées",
    ],
    cta: "Réserver mon diagnostic",
    href: "/contact",
    palette: "violet",
    seed: 31,
  },
  {
    icon: Brain,
    badge: "Audit 360°",
    priceBig: "550 €",
    priceSub: "~3 h + livrable PDF",
    title: "Feuille de route IA",
    subtitle:
      "Diagnostic approfondi + cartographie des cas d'usage IA pertinents pour votre métier.",
    features: [
      "Tout l'Audit 180° inclus",
      "Cartographie cas d'usage IA + ROI",
      "Feuille de route 6 mois",
      "Recommandations outils & fournisseurs",
      "Support email 30 jours",
    ],
    cta: "Démarrer l'Audit IA",
    href: "/contact",
    palette: "duo",
    seed: 37,
  },
];

function AuditCard({ offer }: { offer: AuditOffer }) {
  const [hovered, setHovered] = useState(false);
  const Icon = offer.icon;

  return (
    <div className="h-[520px]">
      <CardShell palette={offer.palette} hovered={hovered} onHover={setHovered}>
        <div
          aria-hidden
          className="absolute h-[80%] w-[80%]"
          style={{ top: -40, right: -90 }}
        >
          <LiquidBlob palette={offer.palette} hovered={hovered} seed={offer.seed} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="rounded-full border border-white/20 bg-white/8 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur-sm">
              {offer.badge}
            </span>
          </div>
          <div>
            <div
              className="font-semibold leading-none tracking-[-0.04em] text-white"
              style={{ fontSize: 56 }}
            >
              {offer.priceBig}
            </div>
            <div className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-white/65">
              {offer.priceSub}
            </div>
            <h3 className="mt-5 text-[22px] font-semibold leading-tight text-white">
              {offer.title}
            </h3>
            <p className="mt-2 max-w-[34ch] text-[13px] leading-snug text-white/75">
              {offer.subtitle}
            </p>
            <ul className="mt-4 flex flex-col gap-1.5">
              {offer.features.map((f) => (
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
            href={offer.href}
            data-hover
            className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[13px] font-medium text-neutral-900 transition-colors hover:bg-white/90"
          >
            {offer.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardShell>
    </div>
  );
}

export function Ch07Audits() {
  const ledeRef = useRef<HTMLDivElement>(null);
  useWordSplitter(ledeRef);

  return (
    <Chapter id="ch-07" num="07" title="Les audits" mood="audits" theme="dark">
      <span id="prestations" className="absolute -top-20 block" aria-hidden />
      <div data-anim="up">
        <Pill variant="glass">Par où commencer ?</Pill>
      </div>
      <div ref={ledeRef} className="text-white">
        <Lede>
          Deux portes d&apos;entrée,
          <br />
          aucun <em>engagement</em>.
        </Lede>
      </div>
      <p
        data-anim="up"
        className="max-w-[58ch] text-[clamp(17px,1.5vw,22px)] leading-relaxed text-white/70"
      >
        Le mot « gratuit » est galvaudé ; le diagnostic 180° est{" "}
        <strong className="font-medium text-white">offert</strong> parce
        qu&apos;il sert d&apos;abord à valider qu&apos;on travaillera bien
        ensemble. Le 360° est payant — c&apos;est un livrable, pas un teaser.
      </p>
      <div
        data-anim="stagger"
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {audits.map((a) => (
          <AuditCard key={a.badge} offer={a} />
        ))}
      </div>
    </Chapter>
  );
}
