"use client";

import { useState } from "react";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prefillQuote } from "@/lib/quote-prefill";
import {
  GESTURES,
  UNUSED_SOFTWARES,
  recommendDoor,
  type GestureId,
  type GuideCta,
  type StakesId,
  type UnusedId,
} from "@/data/buying-guide-2027";

/**
 * Outil du guide d'achat : trois questions, une porte, une fourchette, ce
 * qu'on n'achète pas. Le long-form de la page est la légende de cet outil.
 * Le premier clic suffit : jamais d'écran vide (même mécanique que
 * l'explorateur de capacités de la home, sans y être branché).
 */
export function BuyingGuideTool() {
  const [gesture, setGesture] = useState<GestureId | null>(null);
  const [unused, setUnused] = useState<UnusedId | null>(null);
  const [stakes, setStakes] = useState<StakesId | null>(null);

  const rec = recommendDoor(gesture, unused, stakes);
  const context = { porte: rec.door.id, guide: "ma-pme-en-2027" };

  function goAudit() {
    sendGTMEvent({ event: "buying_guide_cta", porte: rec.door.id, cta: "audit-180" });
    prefillQuote({ service: "audit-180", additional: context });
  }

  function goFormation() {
    sendGTMEvent({ event: "buying_guide_cta", porte: rec.door.id, cta: "formation" });
    prefillQuote({ service: "formation", additional: context });
  }

  return (
    <section
      id="outil"
      className="my-10 rounded-xl border border-violet-200 bg-violet-50/60 p-5 sm:p-7 dark:border-violet-900/50 dark:bg-violet-950/20"
    >
      <p className="m-0 text-xs font-mono uppercase tracking-widest text-violet-700 dark:text-violet-300">
        L&apos;outil — 3 questions
      </p>
      <p className="mt-2 text-xl font-semibold tracking-tight">
        Quelle porte, chez vous — et ce qu&apos;on ne vend pas
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Un clic suffit. La fourchette est un ordre de grandeur HT, pas un devis
        signé. Le diagnostic précise.
      </p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">
          1. Quel geste revient tous les jours, et que personne n&apos;aime ?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {GESTURES.map((g) => (
            <Choice
              key={g.id}
              selected={gesture === g.id}
              onClick={() => {
                setGesture(g.id);
                sendGTMEvent({ event: "buying_guide_gesture", geste: g.id });
              }}
            >
              {g.label}
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">
          2. Quel logiciel est déjà payé et presque jamais ouvert ?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {UNUSED_SOFTWARES.map((u) => (
            <Choice
              key={u.id}
              selected={unused === u.id}
              onClick={() => setUnused(u.id)}
            >
              {u.label}
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">
          3. Est-ce que ça engage la marge, le juridique, ou le client ?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          <Choice
            selected={stakes === "money"}
            onClick={() => setStakes("money")}
          >
            Oui — l&apos;IA prépare, un humain valide
          </Choice>
          <Choice selected={stakes === "none"} onClick={() => setStakes("none")}>
            Non — tri, recherche, premier jet
          </Choice>
        </div>
      </fieldset>

      <div className="mt-8 rounded-lg border border-border bg-background p-5">
        <p className="m-0 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Porte
        </p>
        <p className="mt-1 text-lg font-semibold">{rec.door.title}</p>
        <p className="mt-1 text-sm font-medium text-violet-700 dark:text-violet-300">
          {rec.door.range}
        </p>
        <p className="mt-3 text-sm">
          <strong>Vous gardez.</strong> {rec.door.keep}
        </p>
        <p className="mt-2 text-sm">
          <strong>Vous n&apos;achetez pas.</strong> {rec.door.cut}
        </p>
        {rec.hitl ? (
          <p className="mt-2 text-sm">
            <strong>Validation humaine.</strong> Devis, écart, message qui
            engage : l&apos;IA propose, quelqu&apos;un chez vous tranche.
          </p>
        ) : null}
        {rec.cutFirst ? (
          <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
            <strong>Avant d&apos;ajouter.</strong> {rec.cutFirst}
          </p>
        ) : null}

        <DoorCtas cta={rec.door.cta} onAudit={goAudit} onFormation={goFormation} />
      </div>
    </section>
  );
}

/**
 * Deux issues toujours visibles : Audit 180° et atelier. Le CTA principal
 * suit la porte (formation vs chantier) — le second reste une issue.
 */
function DoorCtas({
  cta,
  onAudit,
  onFormation,
}: {
  cta: GuideCta;
  onAudit: () => void;
  onFormation: () => void;
}) {
  switch (cta) {
    case "formation":
      return (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button asChild>
            <Link href="/atelier-claude-code-dirigeant" onClick={onFormation}>
              Atelier dès 450 € HT
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact" onClick={onAudit}>
              Plutôt un Audit 180° — 60 min
            </Link>
          </Button>
        </div>
      );
    case "audit-180":
      return (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button asChild>
            <Link href="/contact" onClick={onAudit}>
              Audit 180° — 60 min
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/atelier-claude-code-dirigeant" onClick={onFormation}>
              L&apos;équipe doit pêcher seule ? Atelier dès 450 €
            </Link>
          </Button>
        </div>
      );
    default: {
      const _exhaustive: never = cta;
      return _exhaustive;
    }
  }
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-3 py-1.5 text-left text-sm transition-colors",
        selected
          ? "border-violet-600 bg-violet-600 text-white"
          : "border-border bg-background hover:border-violet-400",
      )}
    >
      {children}
    </button>
  );
}
