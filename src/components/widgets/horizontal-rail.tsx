"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RailMarker {
  /** Doit correspondre à un enfant portant `data-rail-marker={id}`. */
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface HorizontalRailProps {
  /** Libellé accessible de la piste. */
  label: string;
  tone?: "light" | "dark";
  /** Défilement automatique (désactivé sous 768px, au pointeur grossier et en reduced-motion). */
  autoplay?: boolean;
  /** Vitesse en px/s. */
  speed?: number;
  /** Repères de groupe : onglets cliquables au-dessus de la piste, scroll-spy. */
  markers?: RailMarker[];
  /** Contenu libre à gauche de la barre quand il n'y a pas de repères. */
  lead?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Piste horizontale à la manière d'une frise de journal : une seule rangée qui
 * occupe une hauteur fixe au lieu d'une grille qui empile les cartes.
 *
 * - Défilement natif (molette, tactile, clavier) + boutons précédent/suivant.
 * - Auto-défilement lent en aller-retour, qui s'arrête au survol, au focus, et
 *   dès que la personne interagit ; il ne reprend qu'à la prochaine entrée dans
 *   le viewport. Bouton pause/lecture (WCAG 2.2.2).
 * - Repères : onglets qui sautent à un groupe et se colorent au passage.
 *
 * Chaque enfant doit être un `.hrail__item` (largeur via `--hrail-w`).
 */
export function HorizontalRail({
  label,
  tone = "light",
  autoplay = true,
  speed = 26,
  markers,
  lead,
  className,
  children,
}: HorizontalRailProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(markers?.[0]?.id ?? null);
  const [running, setRunning] = React.useState(false);
  const [userPaused, setUserPaused] = React.useState(false);

  // ── Position, bornes, repère actif ──────────────────────────────────────
  const measure = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    setProgress(max > 0 ? x / max : 0);
    setAtStart(x <= 2);
    setAtEnd(max <= 0 || x >= max - 2);
    if (markers?.length) {
      let id = markers[0].id;
      el.querySelectorAll<HTMLElement>("[data-rail-marker]").forEach((m) => {
        if (m.offsetLeft - el.offsetLeft <= x + 40) id = m.dataset.railMarker ?? id;
      });
      setActive(id);
    }
  }, [markers]);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [measure, children]);

  // ── Auto-défilement ─────────────────────────────────────────────────────
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el || !autoplay) return;
    const allowed = () =>
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    if (!allowed()) return;

    let inView = false;
    let hover = false;
    let focus = false;
    let interacted = false;
    let dir = 1;
    let pos = el.scrollLeft;
    let waitUntil = 0;
    let last = 0;
    let raf = 0;
    let on = false;

    const shouldRun = () => inView && !hover && !focus && !interacted && !userPaused;

    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      if (!last) last = t;
      const dt = Math.min(64, t - last);
      last = t;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0 || t < waitUntil) return;
      // Resynchronise si la personne a déplacé la piste entre deux frames.
      if (Math.abs(el.scrollLeft - pos) > 3) pos = el.scrollLeft;
      pos += (dir * speed * dt) / 1000;
      if (pos >= max) {
        pos = max;
        dir = -1;
        waitUntil = t + 2200;
      } else if (pos <= 0) {
        pos = 0;
        dir = 1;
        waitUntil = t + 2200;
      }
      el.scrollLeft = pos;
    };

    const sync = () => {
      const next = shouldRun();
      if (next === on) return;
      on = next;
      setRunning(on);
      if (on) {
        pos = el.scrollLeft;
        last = 0;
        raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        // Nouvelle entrée dans le viewport : on redonne sa chance à l'auto-défilement.
        if (inView) interacted = false;
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    const onEnter = () => {
      hover = true;
      sync();
    };
    const onLeave = () => {
      hover = false;
      sync();
    };
    const onFocusIn = () => {
      focus = true;
      sync();
    };
    const onFocusOut = () => {
      focus = false;
      sync();
    };
    const onInteract = () => {
      interacted = true;
      sync();
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("wheel", onInteract, { passive: true });
    el.addEventListener("pointerdown", onInteract);
    el.addEventListener("touchstart", onInteract, { passive: true });
    el.addEventListener("keydown", onInteract);
    sync();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("wheel", onInteract);
      el.removeEventListener("pointerdown", onInteract);
      el.removeEventListener("touchstart", onInteract);
      el.removeEventListener("keydown", onInteract);
    };
  }, [autoplay, speed, userPaused, children]);

  // ── Commandes ───────────────────────────────────────────────────────────
  const itemWidth = () => {
    const el = trackRef.current;
    const first = el?.querySelector<HTMLElement>(".hrail__item");
    return first ? first.getBoundingClientRect().width + 12 : 320;
  };
  const by = (n: number) =>
    trackRef.current?.scrollBy({ left: n * itemWidth(), behavior: "smooth" });
  const toMarker = (id: string) => {
    const el = trackRef.current;
    const m = el?.querySelector<HTMLElement>(`[data-rail-marker="${id}"]`);
    if (!el || !m) return;
    el.scrollTo({ left: m.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      by(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      by(-1);
    }
  };

  return (
    <div className={cn("hrail", `hrail--${tone}`, running && "hrail--auto", className)}>
      <div className="hrail__bar">
        {markers?.length ? (
          <div className="hrail__markers" role="tablist" aria-label={`${label} — groupes`}>
            {markers.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active === m.id}
                className="hrail__marker"
                onClick={() => toMarker(m.id)}
              >
                <span className="hrail__marker-dot" style={{ background: m.color }} aria-hidden />
                {m.label}
                {typeof m.count === "number" && <span className="hrail__marker-count">{m.count}</span>}
              </button>
            ))}
          </div>
        ) : (
          <div className="hrail__lead">{lead}</div>
        )}
      </div>

      <div
        ref={trackRef}
        className="hrail__track"
        role="group"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKey}
      >
        {children}
      </div>

      <div className="hrail__progress" aria-hidden>
        <span style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
      </div>

      <div className="hrail__nav">
          {autoplay && (
            <button
              type="button"
              className="hrail__btn"
              aria-pressed={userPaused}
              aria-label={userPaused ? "Reprendre le défilement automatique" : "Mettre en pause le défilement automatique"}
              onClick={() => setUserPaused((p) => !p)}
            >
              {userPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          )}
          <button
            type="button"
            className="hrail__btn"
            aria-label="Précédent"
            disabled={atStart}
            onClick={() => by(-1)}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            className="hrail__btn"
            aria-label="Suivant"
            disabled={atEnd}
            onClick={() => by(1)}
          >
            <ChevronRight className="size-4" />
          </button>
      </div>
    </div>
  );
}
