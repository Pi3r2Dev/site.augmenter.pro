"use client";

import { useRef } from "react";
import { TrendingDown, Clock, Zap, ShieldCheck } from "lucide-react";
import { TrustStatCard, type TrustStatData } from "@/components/widgets/trust-stat";
import type { Palette } from "@/components/widgets/palettes";
import { Chapter } from "../primitives/chapter";
import { Pill } from "../primitives/pill";
import { Lede } from "../primitives/lede";
import { useWordSplitter } from "../primitives/word-splitter";

const stats: Array<{ data: TrustStatData; palette: Palette }> = [
  {
    palette: "violet",
    data: {
      icon: TrendingDown,
      value: "−30 %",
      label: "Gain de temps moyen",
      description: "Sur les tâches automatisées (admin, devis, relances).",
      seed: 5,
    },
  },
  {
    palette: "cold",
    data: {
      icon: Clock,
      value: "48 h",
      label: "Délai de premier livrable",
      description: "Du diagnostic au premier outil opérationnel.",
      seed: 11,
    },
  },
  {
    palette: "amber",
    data: {
      icon: Zap,
      value: "2 h → 15 min",
      label: "Tâche type compressée",
      description: "Nos propres devis, préparés par assistant IA et relus avant envoi.",
      seed: 17,
    },
  },
  {
    palette: "mono",
    data: {
      icon: ShieldCheck,
      value: "0",
      label: "Engagement long terme",
      description: "Aucun abonnement obligatoire. Vous gardez la main.",
      seed: 23,
    },
  },
];

export function Ch06Preuves() {
  const ledeRef = useRef<HTMLDivElement>(null);
  useWordSplitter(ledeRef);

  return (
    <Chapter id="ch-06" num="06" title="Les preuves" mood="night" theme="dark">
      <div data-anim="up">
        <Pill variant="glass">Chiffres de terrain · 2026</Pill>
      </div>
      <div ref={ledeRef} className="text-white">
        <Lede>
          Ce qui compte n&apos;est pas
          <br />
          le <em>buzz</em>, mais ce qu&apos;on <u>mesure</u>.
        </Lede>
      </div>
      <p
        data-anim="up"
        className="max-w-[58ch] text-[clamp(17px,1.5vw,22px)] leading-relaxed text-white/70"
      >
        Quelques chiffres observés sur les missions de l&apos;année écoulée.
        Pas de moyenne marketing : des cas réels, anonymisés, vérifiables sur
        demande.
      </p>
      <div
        data-anim="stagger"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <TrustStatCard key={s.data.label} stat={s.data} palette={s.palette} />
        ))}
      </div>
    </Chapter>
  );
}
