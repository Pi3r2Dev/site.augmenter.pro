"use client";

import { useRef, useState } from "react";
import { TrendingDown, Clock, Star, Reply } from "lucide-react";
import { CardShell, LiquidBlob } from "@/components/widgets/blobs";
import {
  TrustStatCard,
  type TrustStatData,
} from "@/components/widgets/trust-stat";
import type { Palette } from "@/components/widgets/palettes";
import { Chapter } from "../../approche/narrative/primitives/chapter";
import { Pill } from "../../approche/narrative/primitives/pill";
import { Lede } from "../../approche/narrative/primitives/lede";
import { useWordSplitter } from "../../approche/narrative/primitives/word-splitter";

const stats: Array<{ data: TrustStatData; palette: Palette }> = [
  {
    palette: "violet",
    data: {
      icon: TrendingDown,
      value: "−30 %",
      label: "Gain de temps moyen",
      description: "Sur les tâches automatisées (admin, devis, relances).",
      seed: 101,
    },
  },
  {
    palette: "cold",
    data: {
      icon: Clock,
      value: "48 h",
      label: "Premier livrable",
      description: "Du diagnostic au premier outil opérationnel.",
      seed: 107,
    },
  },
  {
    palette: "amber",
    data: {
      icon: Star,
      value: "5 / 5",
      label: "Satisfaction client",
      description: "Moyenne sur 5 missions vérifiables. Avis publiés.",
      seed: 113,
    },
  },
  {
    palette: "mono",
    data: {
      icon: Reply,
      value: "< 24 h",
      label: "Délai de réponse",
      description: "Sur premier contact ouvré. Pas de standardiste, c'est Pierre.",
      seed: 119,
    },
  },
];

// Témoignage XL — Karim B., consultant indépendant, parle au cœur de cible PME.
// Affichage UI seulement : ne JAMAIS le rebaliser en Review/AggregateRating —
// les avis auto-déclarés sont interdits par Google (cf. CLAUDE.md §Structured Data).
const featuredTestimonial = {
  quote:
    "En tant qu'indépendant, je pensais que l'IA n'était pas pour moi. Pierre m'a montré comment gagner 8 heures par semaine avec des outils simples. Mon chiffre d'affaires a augmenté de 30 % en 6 mois.",
  name: "Karim B.",
  role: "Consultant indépendant",
  gain: "+30 % de CA en 6 mois",
};

function TestimonialXL() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="h-[300px]">
      <CardShell palette="duo" hovered={hovered} onHover={setHovered}>
        <div
          aria-hidden
          className="absolute h-[70%] w-[60%]"
          style={{ top: -30, right: -100 }}
        >
          <LiquidBlob palette="duo" hovered={hovered} seed={127} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-amber-400 text-amber-400"
                aria-hidden
              />
            ))}
          </div>
          <blockquote className="max-w-[42ch] text-[clamp(18px,2vw,26px)] font-medium leading-tight tracking-[-0.015em] text-white">
            <span className="text-(--violet-300)" aria-hidden>
              «{" "}
            </span>
            {featuredTestimonial.quote}
            <span className="text-(--violet-300)" aria-hidden>
              {" "}»
            </span>
          </blockquote>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4">
            <div>
              <div className="text-[15px] font-medium text-white">
                {featuredTestimonial.name}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/65">
                {featuredTestimonial.role}
              </div>
            </div>
            <span className="rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-300">
              {featuredTestimonial.gain}
            </span>
          </div>
        </div>
      </CardShell>
    </div>
  );
}

export function H04Preuves() {
  const ledeRef = useRef<HTMLDivElement>(null);
  useWordSplitter(ledeRef);

  return (
    <Chapter id="h-04" num="04" title="Les preuves" mood="night" theme="dark">
      <div data-anim="up">
        <Pill variant="glass">Chiffres + voix de terrain · 2026</Pill>
      </div>
      <div ref={ledeRef} className="text-white">
        <Lede>
          Pas de buzz.
          <br />
          Des <em>résultats</em> <u>mesurés</u>.
        </Lede>
      </div>
      <p
        data-anim="up"
        className="max-w-[58ch] text-[clamp(17px,1.5vw,22px)] leading-relaxed text-white/70"
      >
        Quatre chiffres et une voix. Tous sourcés sur des missions réelles —
        anonymisés quand il faut, vérifiables sur demande.
      </p>
      <div
        data-anim="stagger"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <TrustStatCard key={s.data.label} stat={s.data} palette={s.palette} />
        ))}
      </div>
      <div data-anim="up">
        <TestimonialXL />
      </div>
    </Chapter>
  );
}
