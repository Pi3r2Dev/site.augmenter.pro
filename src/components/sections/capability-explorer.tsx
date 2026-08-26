// src/components/sections/capability-explorer.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHead, Pill } from "@/components/bento/bento-grid";
import { cn } from "@/lib/utils";
import { prefillQuote } from "@/lib/quote-prefill";
import {
  CAPABILITIES,
  CAPABILITY_SECTORS,
  CAPABILITY_TOOLS,
  SECTOR_TO_WIZARD,
  VERDICTS,
  isRecent,
  matchCapabilities,
  type CapabilitySector,
  type CapabilityTool,
  type Verdict,
} from "@/data/capabilities";

const VERDICT_ORDER: Verdict[] = ["production", "cadrer", "pas-encore"];

/**
 * Date de référence du badge « nouveau ». Constante plutôt que `Date.now()` :
 * une valeur calculée au rendu diverge entre le HTML serveur et le client
 * (erreur d'hydratation), et rendrait le prerender non déterministe.
 * À avancer quand on ajoute des capacités.
 */
const TODAY = "2026-08";

/**
 * Section 02 de `/` — « Ce que l'IA sait faire chez vous ».
 *
 * Deux axes (métier × outils en place), résultat visible dès le premier clic,
 * jamais d'écran vide. Pas un wizard à étapes comme `/contact` : le visiteur
 * est ici en découverte, pas en demande — toute friction le fait partir.
 *
 * Le contenu vient de `src/data/capabilities.ts`, curé à la main. La sortie
 * dépose le contexte dans le stockage du wizard : le visiteur qui clique arrive
 * sur `/contact` avec son métier et son outil déjà renseignés.
 */
export function CapabilityExplorer() {
  const [sector, setSector] = React.useState<CapabilitySector | null>(null);
  const [tool, setTool] = React.useState<CapabilityTool | null>(null);

  const { items, relaxedTool } = React.useMemo(
    () => matchCapabilities(sector, tool),
    [sector, tool]
  );

  const grouped = React.useMemo(
    () =>
      VERDICT_ORDER.map((v) => ({
        verdict: v,
        list: items.filter((c) => c.verdict === v),
      })).filter((g) => g.list.length > 0),
    [items]
  );

  function handleCheckMyCase() {
    prefillQuote({
      service: "audit-180",
      sector: sector ? SECTOR_TO_WIZARD[sector] : undefined,
      additional: tool ? { outil_en_place: tool } : undefined,
    });
  }

  return (
    <section
      id="capacites"
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "#0a0811", color: "#fff" }}
    >
      {/* Aurora décorative — même fond que la section qu'elle remplace */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 12% 20%, oklch(0.541 0.281 293 / 0.35), transparent 60%), radial-gradient(ellipse 40% 30% at 88% 80%, oklch(0.828 0.189 84.429 / 0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionHead
          eyebrow="/ 02 — ce que l'ia sait faire chez vous"
          eyebrowTone="dark"
          title={
            <>
              Dites-nous votre métier et vos outils —{" "}
              <em className="not-italic text-violet-300">on vous dit</em> ce qui
              marche, ce qui se cadre, et ce qu&apos;on{" "}
              <em className="not-italic text-amber-400">refuse encore</em> de
              vendre.
            </>
          }
          controls={
            <>
              <Pill tone="dark" size="md">
                {CAPABILITIES.length} capacités
              </Pill>
              <Pill
                tone="solid"
                size="md"
                className="bg-white! text-foreground! border-white!"
              >
                Contenu vérifié à la main
              </Pill>
            </>
          }
        />

        {/* ── Filtres ─────────────────────────────────────────────────── */}
        <div className="mt-8 space-y-4 rounded-[22px] border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6">
          <FilterRow
            label="Votre métier"
            options={CAPABILITY_SECTORS}
            value={sector}
            onChange={(v) => setSector(v as CapabilitySector | null)}
          />
          <FilterRow
            label="Vos outils"
            options={CAPABILITY_TOOLS}
            value={tool}
            onChange={(v) => setTool(v as CapabilityTool | null)}
          />
        </div>

        {/* ── Résultats + souveraineté ────────────────────────────────── */}
        <div className="mt-4 grid gap-4 md:grid-cols-12">
          <div className="space-y-6 md:col-span-8">
            {relaxedTool && (
              <p className="text-[0.8rem] leading-relaxed text-white/50">
                Sur ce métier, rien ne dépend spécifiquement de votre outil —
                voici ce qui s&apos;applique dans tous les cas.
              </p>
            )}

            {grouped.map((group) => (
              <div key={group.verdict}>
                <div className="flex items-baseline gap-2.5">
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 shrink-0 translate-y-[-1px] rounded-full"
                    style={{ background: VERDICTS[group.verdict].color }}
                  />
                  <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white">
                    {VERDICTS[group.verdict].label}
                  </h3>
                  <span className="text-[0.72rem] text-white/40">
                    {VERDICTS[group.verdict].hint}
                  </span>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {group.list.map((c) => (
                    <CapabilityCard
                      key={c.id}
                      title={c.title}
                      detail={c.detail}
                      proof={c.proof}
                      href={c.href}
                      badge={isRecent(c.since, TODAY)}
                      color={VERDICTS[c.verdict].color}
                      muted={c.verdict === "pas-encore"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Où vivent vos données — colonne persistante */}
          <aside className="md:col-span-4">
            <div className="sticky top-24 rounded-[22px] border border-white/[0.07] bg-[linear-gradient(180deg,#13101d,#0f0c1a)] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet-300" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-violet-300">
                  Où vivent vos données
                </span>
              </div>
              <p className="mt-3 text-[0.88rem] leading-[1.55] text-white/80">
                Deux régimes, et c&apos;est vous qui choisissez lequel.
              </p>
              <dl className="mt-4 space-y-3.5">
                <div>
                  <dt className="text-[0.82rem] font-semibold text-white">
                    Chez nous
                  </dt>
                  <dd className="mt-1 text-[0.78rem] leading-[1.5] text-white/60">
                    Modèles ouverts, sur des serveurs que nous administrons.
                    C&apos;est notre configuration par défaut — et celle qui fait
                    tourner nos propres outils tous les jours.
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.82rem] font-semibold text-white">
                    Chez l&apos;éditeur
                  </dt>
                  <dd className="mt-1 text-[0.78rem] leading-[1.5] text-white/60">
                    Quand vous voulez la puissance d&apos;un Claude ou
                    équivalent, on le branche — et on vous dit ce qui transite,
                    ce qui est conservé, et ce qui n&apos;entraîne aucun modèle.
                  </dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-white/[0.07] pt-4 text-[0.78rem] leading-[1.5] text-white/70">
                Dans les deux cas, la question est posée{" "}
                <strong className="font-medium text-white">
                  avant la première ligne de code
                </strong>
                , pas après.
              </p>
            </div>
          </aside>
        </div>

        {/* ── Sortie ──────────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-primary text-primary-foreground hover:bg-violet-700"
          >
            <Link href="/contact" onClick={handleCheckMyCase}>
              Vérifier mon cas — 60 min
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Link
            href="/augmenter-mon-entreprise"
            className="group inline-flex items-center gap-1.5 text-[0.85rem] text-white/60 transition-colors hover:text-white"
          >
            Explorer par situation plutôt que par outil
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Sous-composants ────────────────────────────────────────────────── */

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-28 shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/45">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? null : opt)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[0.78rem] transition-colors",
                active
                  ? "border-white bg-white text-[#0a0811]"
                  : "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CapabilityCard({
  title,
  detail,
  proof,
  href,
  badge,
  color,
  muted,
}: {
  title: string;
  detail: string;
  proof?: string;
  href?: string;
  badge: boolean;
  color: string;
  muted: boolean;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h4
          className={cn(
            "text-[0.9rem] font-semibold leading-snug",
            muted ? "text-white/70" : "text-white"
          )}
        >
          {title}
        </h4>
        {badge && (
          <span className="shrink-0 rounded-full bg-amber-400/15 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-amber-300">
            Nouveau
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-[0.78rem] leading-[1.5] text-white/55">
        {detail}
      </p>
      {proof && (
        <p
          className="mt-3 font-mono text-[0.68rem] leading-snug"
          style={{ color }}
        >
          {proof}
        </p>
      )}
      {href && (
        <span className="mt-2 inline-flex items-center gap-1 text-[0.72rem] text-white/45 transition-colors group-hover/cap:text-white">
          En savoir plus
          <ArrowUpRight className="h-3 w-3" />
        </span>
      )}
    </>
  );

  const shell =
    "group/cap flex h-full flex-col rounded-[18px] border border-white/[0.07] bg-white/[0.02] p-4 transition-colors";

  if (!href) return <div className={shell}>{body}</div>;

  return (
    <Link href={href} className={cn(shell, "hover:border-white/20 hover:bg-white/[0.05]")}>
      {body}
    </Link>
  );
}
