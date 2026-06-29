"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Badge logo LP animé (light-painting). Joue une fois à l'apparition puis se fige
 * sur le monogramme final ; reste sur le poster statique si prefers-reduced-motion.
 */
export function LpLogo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.currentTime = 0;
            void video.play().catch(() => {});
            io.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("lp-logo", className)}
      muted
      playsInline
      preload="metadata"
      poster="/brand/lp-logo-poster.webp"
      aria-label="Logo LP — Pierre Legrand"
    >
      <source src="/brand/lp-logo.webm" type="video/webm" />
      <source src="/brand/lp-logo.mp4" type="video/mp4" />
    </video>
  );
}
