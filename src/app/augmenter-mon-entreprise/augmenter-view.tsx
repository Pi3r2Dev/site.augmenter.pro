"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  Wand2,
  RotateCcw,
  Compass,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import {
  SECTORS,
  PAINS,
  OBJECTIVES,
  buildHubResources,
  type Sector,
  type PainId,
  type ObjectiveId,
  type ResourceType,
  type HubResource,
} from "@/data/resources";
import { prompts } from "@/data/prompts";

// Construit une seule fois la liste unifiée articles + idées + prompts.
const RESOURCES = buildHubResources(prompts);

type RelaxNote = null | "format" | "secteur" | "douleur";

/**
 * Filtre les ressources selon (secteur × douleur × objectif) avec relâchement
 * progressif → jamais d'écran vide. Fonction pure (hors composant) pour que le
 * React Compiler puisse optimiser le composant (pas de useMemo manuel).
 */
function selectResources(
  sector: Sector,
  pain: PainId | null,
  objective: ObjectiveId | null,
): { results: HubResource[]; relaxed: RelaxNote } {
  const selectedType: ResourceType | "cta" | null = objective
    ? OBJECTIVES.find((o) => o.id === objective)!.type
    : null;

  const test = (
    r: HubResource,
    useSector: boolean,
    usePain: boolean,
    useType: boolean,
  ) => {
    if (useSector && sector !== "Tous") {
      if (!r.sectors.includes(sector) && !r.sectors.includes("Tous"))
        return false;
    }
    if (usePain && pain) {
      if (!r.pains.includes(pain)) return false;
    }
    if (useType && selectedType && selectedType !== "cta") {
      if (r.type !== selectedType) return false;
    }
    return true;
  };

  const score = (r: HubResource) => {
    let s = 0;
    if (pain && r.pains.includes(pain)) s += 4;
    if (sector !== "Tous" && r.sectors.includes(sector)) s += 3;
    else if (sector !== "Tous" && r.sectors.includes("Tous")) s += 1;
    if (selectedType && selectedType !== "cta" && r.type === selectedType) s += 2;
    return s;
  };

  // Tentatives, de la plus stricte à la plus large. `note` = axe relâché.
  const attempts: Array<{
    useSector: boolean;
    usePain: boolean;
    useType: boolean;
    note: RelaxNote;
  }> = [
    { useSector: true, usePain: true, useType: true, note: null },
    { useSector: true, usePain: true, useType: false, note: "format" },
    { useSector: false, usePain: true, useType: false, note: "secteur" },
    { useSector: true, usePain: false, useType: false, note: "douleur" },
    { useSector: false, usePain: false, useType: false, note: "douleur" },
  ];

  for (const a of attempts) {
    const matched = RESOURCES.filter((r) =>
      test(r, a.useSector, a.usePain, a.useType),
    );
    if (matched.length > 0) {
      const sorted = [...matched].sort((x, y) => score(y) - score(x));
      return { results: sorted, relaxed: a.note };
    }
  }
  return { results: RESOURCES, relaxed: null };
}

// ─── Habillage par type de ressource (badge + icône) ──────────────────────
const TYPE_STYLE: Record<
  ResourceType,
  { icon: typeof BookOpen; badge: string; cta: string }
> = {
  article: {
    icon: BookOpen,
    badge: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
    cta: "Lire l'article",
  },
  idee: {
    icon: Lightbulb,
    badge: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    cta: "Voir l'idée",
  },
  prompt: {
    icon: Wand2,
    badge: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
    cta: "Copier le prompt",
  },
};

// ─── Pill réutilisable (single-select, toggleable) ─────────────────────────
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
        active
          ? "border border-foreground bg-foreground text-background"
          : "border border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function AugmenterView() {
  const [sector, setSector] = useState<Sector>("Tous");
  const [pain, setPain] = useState<PainId | null>(null);
  const [objective, setObjective] = useState<ObjectiveId | null>(null);

  const objType: ResourceType | "cta" | null = objective
    ? OBJECTIVES.find((o) => o.id === objective)!.type
    : null;
  const wantsHelp = objType === "cta";
  const hasSelection = sector !== "Tous" || pain !== null || objective !== null;

  // Filtrage avec relâchement progressif → jamais d'écran vide.
  // (fonction pure module-level — le React Compiler mémoïse l'appel)
  const { results, relaxed } = selectResources(sector, pain, objective);

  const reset = () => {
    setSector("Tous");
    setPain(null);
    setObjective(null);
  };

  const onPickPain = (id: PainId) => {
    const next = pain === id ? null : id;
    setPain(next);
    if (next) sendGTMEvent({ event: "augmenter_pain_select", pain: next });
  };

  const relaxNote =
    relaxed === "format"
      ? "Rien d'exactement dans ce format sur ce point — voici les ressources les plus proches."
      : relaxed === "secteur"
        ? "Rien de spécifique à ce secteur ici — voici les ressources transversales qui s'appliquent."
        : relaxed === "douleur"
          ? "On a élargi la recherche — voici les ressources qui s'en rapprochent le plus."
          : null;

  return (
    <div className="pt-16">
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative isolate overflow-hidden py-20 md:py-24">
        <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary"
          >
            <Compass className="h-3.5 w-3.5" />
            {RESOURCES.length} ressources · tu n&apos;en liras que 3
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.035em]"
          >
            Augmenter <span className="gradient-text">mon entreprise</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Tu n&apos;as pas le temps d&apos;éplucher des dizaines d&apos;articles,
            et tu te méfies des promesses creuses. Normal.{" "}
            <strong className="font-semibold text-foreground">
              Dis-nous juste où tu en es
            </strong>{" "}
            — ton secteur, ce qui te coûte le plus, ce que tu veux. On te sort les
            bonnes ressources, le verdict en une phrase. Tu lis ce qui te sert, tu
            ignores le reste.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════ SÉLECTEUR — la phrase à compléter ═══════════════════ */}
      <section className="border-y border-border bg-muted/30 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-9">
            {/* Axe 1 — Secteur */}
            <fieldset>
              <legend className="text-lg font-semibold leading-snug sm:text-xl">
                Je dirige une PME dans…
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {SECTORS.map((s) => (
                  <Pill
                    key={s}
                    active={sector === s}
                    onClick={() => setSector(s)}
                  >
                    {s === "Tous" ? "Tous secteurs" : s}
                  </Pill>
                ))}
              </div>
            </fieldset>

            {/* Axe 2 — Douleur */}
            <fieldset className="mt-9">
              <legend className="text-lg font-semibold leading-snug sm:text-xl">
                Là, maintenant, ce qui me coûte le plus, c&apos;est…
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {PAINS.map((p) => (
                  <Pill
                    key={p.id}
                    active={pain === p.id}
                    onClick={() => onPickPain(p.id)}
                  >
                    {p.label}
                  </Pill>
                ))}
              </div>
            </fieldset>

            {/* Axe 3 — Objectif */}
            <fieldset className="mt-9">
              <legend className="text-lg font-semibold leading-snug sm:text-xl">
                Et là, ce que je veux, c&apos;est…
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {OBJECTIVES.map((o) => (
                  <Pill
                    key={o.id}
                    active={objective === o.id}
                    onClick={() =>
                      setObjective(objective === o.id ? null : o.id)
                    }
                  >
                    {o.label}
                  </Pill>
                ))}
              </div>
            </fieldset>

            {hasSelection && (
              <button
                type="button"
                onClick={reset}
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Repartir de zéro
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ RÉSULTATS ═══════════════════ */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-6 flex flex-col gap-1.5">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              {hasSelection ? (
                <>
                  {results.length} ressource{results.length > 1 ? "s" : ""} pour
                  ta situation
                </>
              ) : (
                <>Tout ce qu&apos;on a, en un coup d&apos;œil</>
              )}
            </h2>
            {relaxNote ? (
              <p className="text-sm text-muted-foreground">{relaxNote}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Chaque carte = le verdict en une phrase. Clique pour aller au fond.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* CTA Audit mis en avant si l'objectif est « me faire accompagner » */}
            {wantsHelp && <AuditCtaCard featured />}

            {results.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}

            {/* CTA Audit en clôture (sauf s'il est déjà épinglé en tête) */}
            {!wantsHelp && <AuditCtaCard />}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BANDEAU FINAL ═══════════════════ */}
      <section className="border-t border-border bg-muted/30 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Toujours pas sûr de la première marche&nbsp;?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Un <strong className="font-semibold text-foreground">audit 180° de 60 min</strong>,
            sans engagement et sans CB, suffit pour repartir avec un plan chiffré.
            En visio partout en France, en présentiel dans le 78/95.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Réserver mon audit 180°
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2"
            >
              <a
                href="https://wa.me/33679119774"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  sendGTMEvent({
                    event: "whatsapp_click",
                    location: "augmenter-mon-entreprise",
                  })
                }
              >
                <Phone className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Carte ressource (TL;DR + lien) ────────────────────────────────────────
function ResourceCard({ resource }: { resource: HubResource }) {
  const style = TYPE_STYLE[resource.type];
  const Icon = style.icon;
  return (
    <Link
      href={resource.href}
      onClick={() =>
        sendGTMEvent({
          event: "augmenter_resource_click",
          resource_type: resource.type,
          resource_id: resource.id,
        })
      }
      className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition-all hover:border-foreground/30 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${style.badge}`}
        >
          <Icon className="h-3 w-3" />
          {resource.typeLabel}
        </span>
        <span className="text-[11px] font-medium text-muted-foreground">
          {resource.meta}
        </span>
      </div>
      <h3 className="mt-3 text-[1.05rem] font-semibold leading-snug tracking-[-0.01em]">
        {resource.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-normal text-muted-foreground">
        <span className="font-semibold text-foreground">TL;DR — </span>
        {resource.tldr}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        {style.cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

// ─── Carte CTA Audit (toujours présente dans la grille) ────────────────────
function AuditCtaCard({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`relative isolate flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          <Compass className="h-3 w-3" />
          Sur mesure
        </span>
        <h3 className="mt-3 text-[1.05rem] font-semibold leading-snug">
          Et si on regardait ton cas, directement&nbsp;?
        </h3>
        <p className="mt-2 text-sm leading-normal text-muted-foreground">
          <span className="font-semibold text-foreground">TL;DR — </span>
          60 min en visio, sans engagement ni CB : on identifie tes 2-3 chantiers
          prioritaires et on repart avec un plan chiffré.
        </p>
      </div>
      <Button asChild className="mt-4 w-fit gap-2">
        <Link href="/contact">
          Réserver l&apos;audit 180°
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
}
