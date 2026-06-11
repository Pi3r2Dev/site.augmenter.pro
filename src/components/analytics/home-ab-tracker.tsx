"use client";

import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

const HEARTBEAT_SECONDS = 15;
// Plafond anti-onglet-oublié : 40 battements = 10 min d'attention max comptée.
const MAX_BEATS = 40;

/**
 * Instrumentation A/B des pages d'accueil (variante A `/` narrative,
 * variante B `/accueil-2` servie par rewrite middleware sur `/`).
 *
 * Trois événements GTM :
 * - `home_attention`       — battement toutes les 15 s onglet visible
 *                            (attention totale = nb d'événements × 15 s)
 * - `home_chapter_reached` — profondeur max atteinte dans le récit
 *                            (écoute l'événement window `home:chapter`)
 * - `home_next_click`      — clic vers une autre page du site ; `is_first`
 *                            marque le « second clic » (premier départ
 *                            volontaire après l'atterrissage)
 *
 * Les CTA en <button> (pas <a>) doivent dispatcher
 * `new CustomEvent("home:nextclick", { detail: "/cible" })`.
 */
export function HomeAbTracker({
  variant,
  totalChapters,
}: {
  variant: string;
  totalChapters: number;
}) {
  useEffect(() => {
    let beats = 0;
    let maxChapter = -1;
    let nextClicks = 0;

    const interval = window.setInterval(() => {
      if (document.hidden || beats >= MAX_BEATS) return;
      beats += 1;
      sendGTMEvent({
        event: "home_attention",
        ab_variant: variant,
        seconds_total: beats * HEARTBEAT_SECONDS,
      });
    }, HEARTBEAT_SECONDS * 1000);

    const handleChapter = (event: Event) => {
      const idx = (event as CustomEvent<number>).detail;
      if (typeof idx !== "number" || idx <= maxChapter) return;
      maxChapter = idx;
      sendGTMEvent({
        event: "home_chapter_reached",
        ab_variant: variant,
        chapter: idx + 1,
        chapters_total: totalChapters,
      });
    };

    const sendNextClick = (href: string) => {
      nextClicks += 1;
      sendGTMEvent({
        event: "home_next_click",
        ab_variant: variant,
        click_href: href,
        is_first: nextClicks === 1,
      });
    };

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("/") || href.startsWith("https://augmenter.pro")) {
        sendNextClick(href);
      }
    };

    const handleNextEvent = (event: Event) => {
      sendNextClick((event as CustomEvent<string>).detail ?? "");
    };

    window.addEventListener("home:chapter", handleChapter);
    window.addEventListener("home:nextclick", handleNextEvent);
    document.addEventListener("click", handleClick, true);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("home:chapter", handleChapter);
      window.removeEventListener("home:nextclick", handleNextEvent);
      document.removeEventListener("click", handleClick, true);
    };
  }, [variant, totalChapters]);

  return null;
}
