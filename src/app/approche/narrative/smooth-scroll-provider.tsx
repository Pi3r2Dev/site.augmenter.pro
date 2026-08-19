"use client";

import { ReactNode, useEffect, useRef } from "react";
import { shouldAnimateChapterEntrance } from "@/lib/perf/chapter-entrance";
import { narrativeStore } from "./store";

declare global {
  interface Window {
    __narrativeLenis?: import("lenis").default | null;
  }
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const initedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || initedRef.current) return;
    initedRef.current = true;

    if (narrativeStore.get().prefersReducedMotion) return;

    let lenis: import("lenis").default | null = null;
    let gsapTicker: ((time: number) => void) | null = null;
    let ScrollTriggerRef: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    // Force scroll to top on mount — Next.js client-side navigation between
    // two narrative pages (/ ↔ /approche) doesn't reset window.scrollY, and
    // Lenis would otherwise pick up the stale position from the previous page.
    window.scrollTo(0, 0);

    (async () => {
      const [{ default: Lenis }, gsapMod, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapMod.default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTriggerRef = ScrollTrigger;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });
      window.__narrativeLenis = lenis;
      // Double-safety: tell Lenis itself to be at 0, immediately, in case its
      // internal scroll state got out of sync with window.scrollY.
      lenis.scrollTo(0, { immediate: true, force: true });

      lenis.on("scroll", () => ScrollTrigger.update());
      gsapTicker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(gsapTicker);
      gsap.ticker.lagSmoothing(0);

      // Sections fade-up baseline
      const chapters = document.querySelectorAll<HTMLElement>("section[data-mood]");
      chapters.forEach((section, index) => {
        const head = section.querySelector("[id$='-title']")?.parentElement;
        const lede = section.querySelector("[data-anim='words']");
        const ups = section.querySelectorAll<HTMLElement>("[data-anim='up']");
        const staggers = section.querySelectorAll<HTMLElement>("[data-anim='stagger'] > *");
        const animateEntrance = shouldAnimateChapterEntrance(index);

        if (animateEntrance) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 85%",
            once: true,
            onEnter: () => {
              if (head) gsap.from(head, { opacity: 0, y: 14, duration: 0.6, ease: "power3.out" });
              if (lede) {
                const spans = lede.querySelectorAll(".word > span");
                gsap.from(spans, {
                  yPercent: 110,
                  opacity: 0,
                  duration: 0.9,
                  stagger: 0.035,
                  ease: "power3.out",
                  delay: 0.05,
                });
              }
              if (ups.length > 0) {
                gsap.from(ups, {
                  opacity: 0,
                  y: 28,
                  duration: 0.7,
                  stagger: 0.06,
                  delay: 0.25,
                  ease: "power3.out",
                });
              }
              if (staggers.length > 0) {
                gsap.from(staggers, {
                  opacity: 0,
                  y: 36,
                  duration: 0.75,
                  stagger: 0.09,
                  delay: 0.35,
                  ease: "power3.out",
                });
              }
            },
          });
        }

        // Parallax scrub on lede — ne cache pas l'élément, OK sur le cover.
        if (lede) {
          gsap.to(lede, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
        if (head) {
          gsap.to(head, {
            xPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      ScrollTrigger.refresh();
    })().catch((err) => {
      console.warn("[narrative] smooth scroll init failed", err);
    });

    return () => {
      if (gsapTicker) {
        import("gsap").then((g) => g.default.ticker.remove(gsapTicker!));
      }
      if (ScrollTriggerRef) ScrollTriggerRef.getAll().forEach((t) => t.kill());
      lenis?.destroy();
      window.__narrativeLenis = null;
    };
  }, []);

  return <>{children}</>;
}
