// src/components/widgets/nav-tile.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardShell, LiquidBlob } from "./blobs";
import { type Palette } from "./palettes";

export interface NavTileData {
  /** Le mot qui rappelle au décideur qu'il est au bon endroit. */
  label: string;
  href: string;
  seed: number;
}

interface NavTileCardProps {
  tile: NavTileData;
  palette?: Palette;
}

/**
 * NavTileCard — tuile de navigation « peinture d'abord ».
 *
 * Libellé toujours visible (un peu retenu au repos). Au survol ou au focus
 * clavier : texte en blanc plein, léger soulèvement, soulignement dégradé
 * violet→ambre tracé de gauche à droite, flèche qui file en diagonale.
 *
 * L'état actif est piloté par React plutôt que par un variant
 * `group-hover/…`, pour la même raison que le gradient `<em>` du narrative est
 * écrit en CSS direct : les sélecteurs Tailwind composés ne compilent pas
 * toujours comme attendu dans ce setup (Next 16 + Tailwind 4 + webpack).
 */
export function NavTileCard({ tile, palette = "violet" }: NavTileCardProps) {
  const [active, setActive] = React.useState(false);

  return (
    <Link
      href={tile.href}
      className="block h-full rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <CardShell palette={palette} hovered={active} onHover={setActive}>
        <div
          className="absolute h-[90%] w-[90%]"
          style={{ top: -40, right: -60 }}
        >
          <LiquidBlob palette={palette} hovered={active} seed={tile.seed} />
        </div>

        <div className="absolute inset-0 flex items-end justify-between gap-2 p-4 md:p-5">
          <span
            className={cn(
              "relative pb-1 text-[13px] font-semibold leading-tight tracking-[-0.01em] transition-[color,transform] duration-300 ease-out md:text-[15px]",
              active ? "-translate-y-0.5 text-white" : "text-white/80"
            )}
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
          >
            {tile.label}
            <span
              aria-hidden
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full transition-transform duration-500 ease-out",
                active ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                background:
                  "linear-gradient(90deg, var(--violet-300), var(--amber-400))",
                boxShadow: "0 0 10px var(--amber-400)",
              }}
            />
          </span>
          <ArrowUpRight
            aria-hidden
            strokeWidth={2.5}
            className={cn(
              "h-4 w-4 shrink-0 transition-[opacity,transform] duration-300 ease-out",
              active
                ? "-translate-y-0.5 translate-x-0.5 opacity-100"
                : "opacity-70"
            )}
          />
        </div>
      </CardShell>
    </Link>
  );
}
