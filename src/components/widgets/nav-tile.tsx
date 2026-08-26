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
 * Desktop : muette au repos (le lava lamp seul), libellé et flèche révélés au
 * survol ou au focus clavier.
 * Mobile : format compact, libellé toujours visible — un décor muet de 180 px
 * n'a aucun sens sur un écran où il faut le scroller pour atteindre le contenu.
 *
 * La révélation est pilotée par l'état React plutôt que par un variant
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
              "text-[13px] font-semibold leading-tight tracking-[-0.01em] transition-[opacity,transform] duration-300 md:text-[15px]",
              "opacity-100 md:translate-y-1 md:opacity-0",
              active && "md:translate-y-0 md:opacity-100"
            )}
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
          >
            {tile.label}
          </span>
          <ArrowUpRight
            aria-hidden
            strokeWidth={2.5}
            className={cn(
              "h-4 w-4 shrink-0 transition-[opacity,transform] duration-300",
              "opacity-70 md:opacity-0",
              active && "md:translate-x-0.5 md:opacity-90"
            )}
          />
        </div>
      </CardShell>
    </Link>
  );
}
