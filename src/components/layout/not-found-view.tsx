"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidBlob } from "@/components/widgets/blobs";
import { searchTitles, type SearchEntry } from "@/lib/title-search";

/** Une entrée décisive de la carte, telle que la 404 l'affiche. */
export interface NotFoundEntry {
  title: string;
  tldr: string;
  href: string;
  typeLabel: string;
  meta?: string;
}

interface NotFoundViewProps {
  /** Les 6-8 ressources les plus décisives (pickDecisive). */
  decisive: NotFoundEntry[];
  /** Titres de toute la carte, pour la recherche client (aucun contenu). */
  index: SearchEntry[];
}

/**
 * Vue de la page 404 — même ADN que /a-propos (fiche, carte, une seule porte),
 * en version légère : gradient CSS + un seul LiquidBlob, pas de WebGL, pas de
 * JSON-LD. Le statut HTTP 404 reste celui de not-found.tsx (server).
 */
export function NotFoundView({ decisive, index }: NotFoundViewProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const searching = query.trim().length >= 2;
  const hits = searching ? searchTitles(index, query, 8) : [];

  return (
    <section className="relative isolate overflow-hidden pt-16">
      {/* Fond : gradient CSS (page d'erreur = légère) + une seule peinture. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_90%,oklch(0.894_0.057_293_/_0.18),transparent_50%),radial-gradient(circle_at_80%_10%,oklch(0.828_0.189_84.429_/_0.10),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 -z-10 h-[420px] w-[420px] opacity-60 blur-[2px] sm:h-[560px] sm:w-[560px]"
      >
        <LiquidBlob palette="duo" seed={404} />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-24">
        {/* En-tête */}
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Erreur 404
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            Cette page n&apos;existe pas.{" "}
            <span className="gradient-text">Ta question, si.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Le lien a bougé, ou il n&apos;a jamais existé. (On a cherché aussi.
            Rien.) Tape un mot du sujet qui t&apos;amène, ou pars d&apos;une des
            entrées ci-dessous : ce sont celles qui font avancer une décision le
            plus vite.
          </p>
        </div>

        {/* Recherche sur les titres */}
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 max-w-2xl"
        >
          <label htmlFor={inputId} className="sr-only">
            Chercher dans les titres du site
          </label>
          <div className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Odoo, devis, cybersécurité, prompt, MCP…"
              autoComplete="off"
              className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-[0.95rem] shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div aria-live="polite" className="mt-3">
            {searching && hits.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Rien avec ces mots. Essaie plus court, ou{" "}
                <Link href="/augmenter-mon-entreprise" className="font-medium text-primary underline-offset-4 hover:underline">
                  laisse le hub filtrer pour toi
                </Link>
                .
              </p>
            )}
            {hits.length > 0 && (
              <ul className="divide-y divide-border/60 rounded-2xl border border-border bg-background">
                {hits.map((h) => (
                  <li key={h.href}>
                    <Link
                      href={h.href}
                      className="group flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted/50"
                    >
                      <span className="min-w-0">
                        <span className="mr-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                          {h.typeLabel}
                        </span>
                        <span className="font-medium group-hover:text-primary">{h.title}</span>
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>

        {/* Les entrées décisives */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Compass className="h-4 w-4" aria-hidden />
            </span>
            <h2 className="text-lg font-semibold tracking-tight">
              Par où les dirigeants commencent, en général
            </h2>
          </div>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {decisive.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-background p-4 transition-all hover:border-foreground/30 hover:shadow-md"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wide text-primary">
                      {r.typeLabel}
                    </span>
                    {r.meta && (
                      <span className="text-[11px] text-muted-foreground">{r.meta}</span>
                    )}
                  </span>
                  <span className="mt-2 text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] group-hover:text-primary">
                    {r.title}
                  </span>
                  <span className="mt-2 line-clamp-3 flex-1 text-[13px] leading-normal text-muted-foreground">
                    {r.tldr}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            La carte complète, rangée par ce qui te coûte aujourd&apos;hui :{" "}
            <Link href="/a-propos#carte" className="font-medium text-primary underline-offset-4 hover:underline">
              toutes les ressources sur la page à propos
            </Link>
            .
          </p>
        </div>

        {/* Une seule porte */}
        <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Ou pose ta question directement
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Soixante minutes en visio ou par téléphone, on regarde ton cas. On ne
            facture pas ce premier rendez-vous aux PME et indépendants qui ont un
            sujet précis.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Demander un devis ou un premier rendez-vous
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" aria-hidden />
                Retour à l&apos;accueil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
