// src/components/sections/cta.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { LiquidBlob, MeshAurora } from "@/components/widgets/blobs";

export type CTAVariant = "default" | "audit-78" | "audit-95" | "blog" | "auteur";

interface CTACopy {
  title: string;
  emText: string; // The fragment of the title that gets the gradient
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
}

const COPY: Record<CTAVariant, CTACopy> = {
  default: {
    title: "Quel est votre <em>prochain niveau</em> ?",
    emText: "prochain niveau",
    subtitle:
      "Commencez par un diagnostic de 60 minutes. Zéro engagement, zéro jargon technique — juste des solutions concrètes.",
    primaryLabel: "Réserver mon diagnostic",
    primaryHref: "/contact",
  },
  "audit-78": {
    title: "Réservez votre audit <em>Yvelines (78)</em>.",
    emText: "Yvelines (78)",
    subtitle:
      "60 minutes pour identifier les leviers IA et digital de votre PME locale, en présentiel ou en visio. Sans engagement.",
    primaryLabel: "Réserver mon audit 78",
    primaryHref: "/contact",
  },
  "audit-95": {
    title: "Réservez votre audit <em>Val d'Oise (95)</em>.",
    emText: "Val d'Oise (95)",
    subtitle:
      "60 minutes pour identifier les leviers IA et digital de votre PME locale, en présentiel ou en visio. Sans engagement.",
    primaryLabel: "Réserver mon audit 95",
    primaryHref: "/contact",
  },
  blog: {
    title: "Vous êtes au bon endroit. <em>On en parle ?</em>",
    emText: "On en parle ?",
    subtitle:
      "60 minutes pour transformer cette lecture en plan concret pour votre PME. Zéro engagement, zéro jargon — juste votre métier et nos outils.",
    primaryLabel: "Réserver mon diagnostic",
    primaryHref: "/contact",
  },
  auteur: {
    title: "Échanger directement <em>avec Pierre</em>.",
    emText: "avec Pierre",
    subtitle:
      "Un appel de 60 minutes, sans intermédiaire. On ne facture pas ce premier rendez-vous aux PME qui ont un sujet précis.",
    primaryLabel: "Réserver mon audit",
    primaryHref: "/contact",
  },
};

/**
 * Subtle magnetic effect: the element follows the cursor when it's within
 * `range` pixels, capped by `strength`. Disabled if reduce-motion or coarse
 * pointer (mobile).
 */
function useMagnetic<T extends HTMLElement>(strength = 0.25, range = 110) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < range) {
        const factor = 1 - dist / range;
        target.x = dx * strength * factor;
        target.y = dy * strength * factor;
      } else {
        target.x = 0;
        target.y = 0;
      }
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, [strength, range]);
  return ref;
}

interface CTAProps {
  variant?: CTAVariant;
}

export function CTA({ variant = "default" }: CTAProps) {
  const copy = COPY[variant];
  const primaryRef = useMagnetic<HTMLAnchorElement>(0.25, 110);

  // Split the title around the <em> fragment so we can apply gradient + stagger
  const titlePieces = copy.title.split(/<em>|<\/em>/);
  // titlePieces[0] = before, titlePieces[1] = em content, titlePieces[2] = after
  const beforeWords = titlePieces[0].split(/\s+/).filter(Boolean);
  const emWords = (titlePieces[1] ?? "").split(/\s+/).filter(Boolean);
  const afterWords = (titlePieces[2] ?? "").split(/\s+/).filter(Boolean);

  const wordTransition = (i: number) => ({
    duration: 0.55,
    delay: 0.08 + i * 0.045,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  });

  let wordIndex = 0;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="group relative isolate overflow-hidden rounded-2xl bg-foreground px-8 py-16 text-center text-background sm:px-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Background layers — MeshAurora wide + 2 LiquidBlob accents */}
          <div className="absolute inset-0 -z-10" style={{ opacity: 0.5 }} aria-hidden>
            <MeshAurora palette="violet" seed={2.1} />
          </div>
          <div
            className="pointer-events-none absolute -z-10"
            style={{ top: -80, left: -120, width: 420, height: 420 }}
            aria-hidden
          >
            <LiquidBlob palette="violet" seed={11} />
          </div>
          <div
            className="pointer-events-none absolute -z-10"
            style={{ bottom: -100, right: -140, width: 420, height: 420 }}
            aria-hidden
          >
            <LiquidBlob palette="duo" seed={29} />
          </div>

          <div className="relative">
            <motion.div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Zap className="h-7 w-7 text-primary-foreground" />
            </motion.div>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {beforeWords.map((w) => {
                const i = wordIndex++;
                return (
                  <motion.span
                    key={`before-${i}-${w}`}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={wordTransition(i)}
                    className="mr-[0.28em] inline-block"
                  >
                    {w}
                  </motion.span>
                );
              })}
              {emWords.length > 0 && (
                <span className="cta-gradient-text">
                  {emWords.map((w, j) => {
                    const i = wordIndex++;
                    return (
                      <motion.span
                        key={`em-${i}-${w}`}
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={wordTransition(i)}
                        className="mr-[0.28em] inline-block"
                      >
                        {w}
                        {j === emWords.length - 1 ? "" : ""}
                      </motion.span>
                    );
                  })}
                </span>
              )}
              {afterWords.map((w) => {
                const i = wordIndex++;
                return (
                  <motion.span
                    key={`after-${i}-${w}`}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={wordTransition(i)}
                    className="mr-[0.28em] inline-block"
                  >
                    {w}
                  </motion.span>
                );
              })}
            </h2>

            <motion.p
              className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-background/75"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.45 + wordIndex * 0.02 }}
            >
              {copy.subtitle}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.6 + wordIndex * 0.02 }}
            >
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary text-primary-foreground shadow-[0_8px_30px_-6px_oklch(0.541_0.281_293/0.55)] transition-all hover:bg-primary/90 hover:shadow-[0_12px_40px_-8px_oklch(0.541_0.281_293/0.75)]"
              >
                <Link href={copy.primaryHref} ref={primaryRef} data-hover>
                  {copy.primaryLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 border-background/25 bg-transparent text-background transition-colors hover:border-background/55 hover:bg-background/10"
              >
                <a
                  href="https://wa.me/33679119774"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  onClick={() => sendGTMEvent({ event: "whatsapp_click", location: "cta-widget" })}
                >
                  <Phone className="h-4 w-4" />
                  Discuter sur WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Gradient text helper — scoped style to avoid leaking */}
          <style>{`
            .cta-gradient-text {
              background: linear-gradient(135deg, oklch(0.811 0.111 293), oklch(0.828 0.189 84.429));
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              color: transparent;
              display: inline-block;
            }
            .cta-gradient-text > span {
              background: linear-gradient(135deg, oklch(0.811 0.111 293), oklch(0.828 0.189 84.429));
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              color: transparent;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
