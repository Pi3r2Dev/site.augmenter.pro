"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";
import { ArrowRight, Check, Menu, Network, Sparkles } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import styles from "./hero-augmente.module.css";
import {
  buildScene,
  mountInteractions,
  prepareScene,
  revealStage,
} from "./scene";

/** Navigation alignée sur le Header global du site (parité A/B). */
const NAV_LINKS = [
  { href: "/approche", label: "Approche" },
  { href: "/blog", label: "Blog" },
  { href: "/prompts", label: "Prompts" },
  { href: "/contact", label: "Contact" },
];

type Chapter = {
  accent: string;
  accentSoft: string;
  halo: [number, number];
  eyebrow: string;
  keyword: string;
  subLead: string;
  subRest: string;
  trust: string;
};

type TypedKeyword = {
  chapterIndex: number;
  text: string;
};

const CHAPTERS: Chapter[] = [
  {
    accent: "oklch(0.50 0.04 280)",
    accentSoft: "oklch(0.90 0.02 280)",
    halo: [58, 42],
    eyebrow: "Le point de départ · PME 78 / 95",
    keyword: "vos outils.",
    subLead: "Factures, devis, relances, planning…",
    subRest:
      " le quotidien tourne — mais tout repose sur vous et la saisie manuelle.",
    trust: "On part de votre réalité, pas d'une page blanche.",
  },
  {
    accent: "oklch(0.541 0.281 293)",
    accentSoft: "oklch(0.894 0.057 293)",
    halo: [66, 40],
    eyebrow: "+ Intelligence artificielle",
    keyword: "l'IA.",
    subLead: "Un assistant qui rédige, trie, répond.",
    subRest: " Vos données sortent de l'écran et travaillent pour vous.",
    trust: "Des cas d'usage concrets, pensés pour votre métier.",
  },
  {
    accent: "oklch(0.62 0.25 350)",
    accentSoft: "oklch(0.90 0.06 350)",
    halo: [72, 48],
    eyebrow: "+ Robotique & terrain connecté",
    keyword: "la robotique.",
    subLead: "Drones, robots, capteurs, caméras.",
    subRest: " Le stock se range, le terrain remonte la donnée en temps réel.",
    trust: "Du matériel installé et expliqué sur place.",
  },
  {
    accent: "oklch(0.74 0.17 66)",
    accentSoft: "oklch(0.90 0.07 80)",
    halo: [62, 52],
    eyebrow: "Le résultat",
    keyword: "vos équipes.",
    subLead: "Moins d'administratif, plus de clients.",
    subRest: " Une entreprise qui respire — et des équipes épanouies.",
    trust: "Le temps repris est réinvesti là où ça compte.",
  },
];

const AUTO_DELAY_MS = 5_000;
const AUTO_RESUME_MS = 5_400;
const ACCENT_LERP_MS = 1_100;

type Oklch = { l: number; c: number; h: number };

/** Lit une couleur `oklch(l c h)` en triplet numérique (interpolation manuelle). */
function parseOklch(value: string): Oklch {
  const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.-]+)/);
  if (!match) return { l: 0, c: 0, h: 0 };
  return { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) };
}

/** Interpole une teinte par le plus court arc (évite le détour à travers tout le cercle). */
function lerpHue(from: number, to: number, t: number): number {
  const delta = ((to - from + 540) % 360) - 180;
  return from + delta * t;
}

function fmtOklch({ l, c, h }: Oklch): string {
  const hue = ((h % 360) + 360) % 360;
  return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${hue.toFixed(2)})`;
}

/**
 * Hero autonome utilisé pour présenter la variante d'accueil en live.
 * La scène SVG vient du générateur original afin de conserver la projection
 * isométrique et les ancres partagées par les modules interactifs.
 */
export function HeroAugmente() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [typedKeyword, setTypedKeyword] = useState<TypedKeyword>({
    chapterIndex: 0,
    text: "",
  });
  const router = useRouter();
  const [isAuto, setIsAuto] = useState(true);
  const [buttonPulse, setButtonPulse] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  // false par défaut : sur tactile on ne monte ni curseur custom ni boucle halo.
  const [isFinePointer, setIsFinePointer] = useState(false);

  const typeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelLocked = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const exposureSent = useRef(false);
  const trackedChapters = useRef<Set<number>>(new Set());

  const stageRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<readonly [number, number]>(CHAPTERS[0].halo);
  const accentRef = useRef({
    a: parseOklch(CHAPTERS[0].accent),
    s: parseOklch(CHAPTERS[0].accentSoft),
  });

  const currentChapter = CHAPTERS[chapterIndex];
  const displayedKeyword = isReducedMotion
    ? currentChapter.keyword
    : typedKeyword.chapterIndex === chapterIndex
      ? typedKeyword.text
      : "";

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setIsReducedMotion(motionQuery.matches);

    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    return () => motionQuery.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setIsFinePointer(pointerQuery.matches);

    updatePointer();
    pointerQuery.addEventListener("change", updatePointer);

    return () => pointerQuery.removeEventListener("change", updatePointer);
  }, []);

  useEffect(() => {
    if (exposureSent.current) return;
    exposureSent.current = true;

    sendGTMEvent({
      event: "home_demo_view",
      variant: "accueil_2_hero_augmente",
    });
  }, []);

  useEffect(() => {
    if (trackedChapters.current.has(chapterIndex)) return;
    trackedChapters.current.add(chapterIndex);

    sendGTMEvent({
      event: "home_chapter_view",
      variant: "accueil_2_hero_augmente",
      chapter_id: `chapter_${chapterIndex + 1}`,
    });
  }, [chapterIndex]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(
    () => () => {
      if (idleResumeTimer.current) clearTimeout(idleResumeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (typeTimer.current) clearTimeout(typeTimer.current);
    if (isReducedMotion) return;

    let cursorIndex = 0;
    const typeNext = () => {
      setTypedKeyword({
        chapterIndex,
        text: currentChapter.keyword.slice(0, cursorIndex),
      });
      cursorIndex += 1;

      if (cursorIndex <= currentChapter.keyword.length + 1) {
        typeTimer.current = setTimeout(typeNext, 55);
      }
    };

    typeTimer.current = setTimeout(typeNext, 0);

    return () => {
      if (typeTimer.current) clearTimeout(typeTimer.current);
    };
  }, [chapterIndex, currentChapter.keyword, isReducedMotion]);

  const setManualChapter = useCallback((nextIndex?: number) => {
    setIsAuto(false);
    if (typeof nextIndex === "number") {
      setChapterIndex((nextIndex + CHAPTERS.length) % CHAPTERS.length);
    }

    // Comme le handoff : après une interaction, on relance l'autoplay au repos.
    if (idleResumeTimer.current) clearTimeout(idleResumeTimer.current);
    idleResumeTimer.current = setTimeout(() => setIsAuto(true), AUTO_RESUME_MS);
  }, []);

  const triggerAudit = useCallback(
    (ctaLocation: "header" | "hero" | "float" | "keyboard") => {
      setButtonPulse((value) => value + 1);
      window.dispatchEvent(new CustomEvent("hero:bpulse"));

      sendGTMEvent({
        event: "home_cta_click",
        variant: "accueil_2_hero_augmente",
        cta_location: ctaLocation,
      });
      // CTA en <button> : signale le départ au tracker A/B (home_next_click).
      window.dispatchEvent(
        new CustomEvent("home:nextclick", { detail: "/contact" }),
      );

      router.push("/contact");
    },
    [router],
  );

  // Relaie le chapitre actif au tracker A/B (home_chapter_reached).
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("home:chapter", { detail: chapterIndex }),
    );
  }, [chapterIndex]);

  useEffect(() => {
    if (!isAuto || isReducedMotion) return;

    const interval = window.setInterval(() => {
      setChapterIndex((current) => (current + 1) % CHAPTERS.length);
    }, AUTO_DELAY_MS);

    return () => window.clearInterval(interval);
  }, [isAuto, isReducedMotion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight" ||
        event.key === "PageDown"
      ) {
        event.preventDefault();
        setManualChapter(chapterIndex + 1);
        return;
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft" ||
        event.key === "PageUp"
      ) {
        event.preventDefault();
        setManualChapter(chapterIndex - 1);
        return;
      }

      if (event.key === "b" || event.key === "B") {
        triggerAudit("keyboard");
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 8) return;
      if (wheelLocked.current) {
        setManualChapter();
        return;
      }

      wheelLocked.current = true;
      setManualChapter(chapterIndex + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => {
        wheelLocked.current = false;
      }, 640);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY.current === null) return;

      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      const deltaY = touchStartY.current - currentY;
      if (Math.abs(deltaY) > 40) {
        setManualChapter(chapterIndex + (deltaY > 0 ? 1 : -1));
        touchStartY.current = null;
      }
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [chapterIndex, setManualChapter, triggerAudit]);

  // Accent animé : interpolation OKLCH (~1100 ms, easing inOutQuad), comme le
  // handoff. Une transition CSS interpolerait en sRGB et virerait au gris/brun
  // entre violet et ambre — d'où le lerp manuel piloté en rAF.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const targetA = parseOklch(currentChapter.accent);
    const targetS = parseOklch(currentChapter.accentSoft);
    const applyAccent = (a: Oklch, s: Oklch) => {
      stage.style.setProperty("--accent", fmtOklch(a));
      stage.style.setProperty("--accent-soft", fmtOklch(s));
    };

    if (isReducedMotion) {
      accentRef.current = { a: targetA, s: targetS };
      applyAccent(targetA, targetS);
      return;
    }

    const fromA = { ...accentRef.current.a };
    const fromS = { ...accentRef.current.s };
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const p = Math.min(1, (now - start) / ACCENT_LERP_MS);
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      const a: Oklch = {
        l: fromA.l + (targetA.l - fromA.l) * e,
        c: fromA.c + (targetA.c - fromA.c) * e,
        h: lerpHue(fromA.h, targetA.h, e),
      };
      const s: Oklch = {
        l: fromS.l + (targetS.l - fromS.l) * e,
        c: fromS.c + (targetS.c - fromS.c) * e,
        h: lerpHue(fromS.h, targetS.h, e),
      };
      accentRef.current = { a, s };
      applyAccent(a, s);
      if (p < 1) raf = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(raf);
  }, [currentChapter, isReducedMotion]);

  // Ancre « maison » du halo selon le chapitre. En reduced-motion, on la pose
  // statiquement (pas de boucle rAF dans ce mode).
  useEffect(() => {
    anchorRef.current = currentChapter.halo;
    // halo réactif (rAF) uniquement sur desktop pointeur fin ; sinon statique.
    if (!isReducedMotion && isFinePointer) return;

    const ambient = ambientRef.current;
    if (!ambient) return;
    const [hx, hy] = currentChapter.halo;
    ambient.style.setProperty("--halo-x", `${hx}%`);
    ambient.style.setProperty("--halo-y", `${hy}%`);
    ambient.style.setProperty("--glow-x", `${hx}%`);
    ambient.style.setProperty("--glow-y", `${hy}%`);
  }, [currentChapter, isReducedMotion, isFinePointer]);

  // Curseur custom (point + anneau, blend difference) + halo réactif en
  // parallaxe lissée. Le glow réagit plus que la nappe (0.55 vs 0.22), comme
  // spécifié. Tout est piloté en DOM direct dans une boucle rAF unique (pas de
  // re-render React par frame).
  useEffect(() => {
    // curseur custom + halo réactif : desktop pointeur fin uniquement.
    // Sur tactile, le halo reste statique (effet ancre ci-dessus) → pas de rAF.
    if (isReducedMotion || !isFinePointer) return;

    const ambient = ambientRef.current;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const fineHover = true;

    const [anchorX, anchorY] = anchorRef.current;
    const mousePct = { x: anchorX, y: anchorY };
    const mousePx = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mousePx.x, y: mousePx.y };
    const live = { hx: anchorX, hy: anchorY, gx: anchorX, gy: anchorY };
    let cursorShown = false;
    let raf = 0;
    // dernières valeurs écrites : on n'écrit (et donc on ne repeint le gradient
    // plein écran) que lorsqu'elles changent → 0 repaint quand tout est immobile.
    let lastHalo = "";
    let lastRing = "";

    const handlePointerMove = (event: PointerEvent) => {
      mousePct.x = (event.clientX / window.innerWidth) * 100;
      mousePct.y = (event.clientY / window.innerHeight) * 100;

      if (fineHover && dot) {
        mousePx.x = event.clientX;
        mousePx.y = event.clientY;
        dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        if (!cursorShown) {
          cursorShown = true;
          dot.style.opacity = "1";
          if (ring) ring.style.opacity = "1";
        }
      }
    };

    // Le halo revient à l'ancre du chapitre quand le curseur quitte la fenêtre.
    const handleDocumentLeave = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        [mousePct.x, mousePct.y] = anchorRef.current;
      }
    };

    const handleBlur = () => {
      cursorShown = false;
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
    };

    const handlePointerDown = () => ring?.classList.add(styles.ringDown);
    const handlePointerUp = () => ring?.classList.remove(styles.ringDown);
    const handlePointerOver = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest("a, button")) {
        ring?.classList.add(styles.ringHover);
      }
    };
    const handlePointerOut = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest("a, button")) {
        ring?.classList.remove(styles.ringHover);
      }
    };

    const loop = () => {
      const [ax, ay] = anchorRef.current;
      const targetHaloX = ax + (mousePct.x - ax) * 0.22;
      const targetHaloY = ay + (mousePct.y - ay) * 0.22;
      const targetGlowX = ax + (mousePct.x - ax) * 0.55;
      const targetGlowY = ay + (mousePct.y - ay) * 0.55;
      live.hx += (targetHaloX - live.hx) * 0.06;
      live.hy += (targetHaloY - live.hy) * 0.06;
      live.gx += (targetGlowX - live.gx) * 0.11;
      live.gy += (targetGlowY - live.gy) * 0.11;

      if (ambient) {
        const hx = live.hx.toFixed(2),
          hy = live.hy.toFixed(2),
          gx = live.gx.toFixed(2),
          gy = live.gy.toFixed(2);
        const next = `${hx} ${hy} ${gx} ${gy}`;
        if (next !== lastHalo) {
          ambient.style.setProperty("--halo-x", `${hx}%`);
          ambient.style.setProperty("--halo-y", `${hy}%`);
          ambient.style.setProperty("--glow-x", `${gx}%`);
          ambient.style.setProperty("--glow-y", `${gy}%`);
          lastHalo = next;
        }
      }

      if (fineHover && ring) {
        ringPos.x += (mousePx.x - ringPos.x) * 0.18;
        ringPos.y += (mousePx.y - ringPos.y) * 0.18;
        const rx = ringPos.x.toFixed(1),
          ry = ringPos.y.toFixed(1);
        const next = `${rx} ${ry}`;
        if (next !== lastRing) {
          ring.style.transform = `translate(${rx}px, ${ry}px)`;
          lastRing = next;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener(
      "pointerleave",
      handleDocumentLeave,
    );
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);
    if (fineHover) {
      window.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointerover", handlePointerOver);
      document.addEventListener("pointerout", handlePointerOut);
    }

    raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handleDocumentLeave,
      );
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [isReducedMotion, isFinePointer]);

  return (
    <div className={styles.stage} data-screen-label="Hero augmenté" ref={stageRef}>
      <div className={styles.ambient} aria-hidden="true" ref={ambientRef} />
      <div className={styles.frame} aria-hidden="true" />

      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="Retour à l'accueil actuel">
          <span className={styles.logoMark}>
            <Network aria-hidden="true" size={16} strokeWidth={2.4} />
          </span>
          augmenter<em>.PRO</em>
        </Link>

        <nav className={styles.nav} aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <AuditButton location="header" onClick={triggerAudit} pulse={buttonPulse} />

          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Ouvrir le menu"
                className={styles.menuButton}
                type="button"
              >
                <Menu aria-hidden="true" size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Network aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="text-lg font-bold tracking-tight">
                      augmenter<span className="text-primary">.PRO</span>
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild className="mt-2">
                    <Link href="/contact">Premier diagnostic</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className={styles.hero} aria-label="Accueil augmenté">
        <div className={styles.colText} onPointerEnter={() => setManualChapter()}>
          <div className={styles.eyebrow}>
            <Sparkles aria-hidden="true" size={14} />
            <span>{currentChapter.eyebrow}</span>
          </div>

          <h1 className={styles.title}>
            <span>Votre PME,</span>
            <span>augmentée par</span>
            <span className={styles.keywordLine}>
              <span className={styles.keyword}>{displayedKeyword}</span>
              <span
                aria-hidden="true"
                className={
                  displayedKeyword === currentChapter.keyword
                    ? `${styles.caret} ${styles.caretHidden}`
                    : styles.caret
                }
              />
            </span>
          </h1>

          <p className={styles.subtitle} key={currentChapter.keyword}>
            <strong>{currentChapter.subLead}</strong>
            {currentChapter.subRest}
          </p>

          <div className={styles.ctaRow}>
            <AuditButton location="hero" onClick={triggerAudit} pulse={buttonPulse} />
            <span className={styles.ctaHint}>
              Offert · 60 min · sans engagement
            </span>
          </div>

          <div className={styles.trust}>
            <span className={styles.seal}>
              <Check aria-hidden="true" size={15} strokeWidth={2.2} />
            </span>
            <span>{currentChapter.trust}</span>
          </div>

          <div className={styles.dots} aria-label="Chapitres du hero">
            {CHAPTERS.map((chapter, index) => (
              <button
                aria-label={`Afficher le chapitre ${index + 1} : ${chapter.keyword}`}
                className={index === chapterIndex ? styles.dotActive : undefined}
                key={chapter.keyword}
                onClick={() => setManualChapter(index)}
                type="button"
              />
            ))}
            <span
              className={
                isAuto ? styles.autoBadge : `${styles.autoBadge} ${styles.paused}`
              }
            >
              <span className={styles.pulse} />
              {isAuto ? "AUTO" : "MANUEL"}
            </span>
          </div>
        </div>

        <div className={styles.colArt}>
          <div className={styles.sceneWrap}>
            <div className={styles.chapno}>0{chapterIndex + 1} / 04</div>
            <GeneratedScene chapterIndex={chapterIndex} />
          </div>
        </div>
      </section>

      <button
        className={styles.floatCta}
        onClick={() => triggerAudit("float")}
        type="button"
      >
        Augmenter vos potentiels <ArrowRight aria-hidden="true" size={16} />
      </button>

      {isFinePointer && !isReducedMotion && (
        <>
          <div aria-hidden="true" className={styles.cursorRing} ref={cursorRingRef} />
          <div aria-hidden="true" className={styles.cursor} ref={cursorDotRef} />
        </>
      )}
    </div>
  );
}

function AuditButton({
  location,
  onClick,
  pulse,
}: {
  location: "header" | "hero";
  onClick: (location: "header" | "hero" | "float" | "keyboard") => void;
  pulse: number;
}) {
  return (
    <button
      className={styles.kbtn}
      data-pulse={pulse}
      onClick={() => onClick(location)}
      type="button"
    >
      <span className={styles.key}>B</span>
      Tapez B pour un audit
    </button>
  );
}

/**
 * Génère et monte la scène SVG via les modules TS de `./scene`.
 * React ne pilote que le chapitre visible ; les interactions lourdes (nuages
 * lava, câbles Verlet, écran/clavier, feuilles) sont montées en différé et
 * uniquement sur desktop pointeur fin hors `reduced-motion`.
 */
function GeneratedScene({ chapterIndex }: { chapterIndex: number }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const chapterRef = useRef(chapterIndex);

  // chapitre courant exposé aux modules montés en différé (sans lecture en render)
  useEffect(() => {
    chapterRef.current = chapterIndex;
  }, [chapterIndex]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const scene = buildScene();
    svg.setAttribute("viewBox", scene.viewBox);
    svg.innerHTML = scene.defs + scene.inner;

    const styleEl = document.createElement("style");
    styleEl.textContent = scene.css;
    document.head.appendChild(styleEl);

    prepareScene(svg);
    revealStage(svg, chapterRef.current);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let cancelled = false;
    let disposeInteractions: (() => void) | null = null;
    let idleCallback: number | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    if (finePointer && !reduced) {
      const start = () => {
        if (cancelled || !svg.isConnected) return;
        disposeInteractions = mountInteractions(svg);
        // les câbles, créés tardivement, reçoivent l'état de révélation courant
        revealStage(svg, chapterRef.current);
      };
      if ("requestIdleCallback" in window) {
        idleCallback = window.requestIdleCallback(start, { timeout: 1_600 });
      } else {
        fallbackTimer = setTimeout(start, 320);
      }
    }

    return () => {
      cancelled = true;
      if (idleCallback !== null) window.cancelIdleCallback(idleCallback);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      disposeInteractions?.();
      styleEl.remove();
    };
  }, []);

  useEffect(() => {
    if (svgRef.current) revealStage(svgRef.current, chapterIndex);
  }, [chapterIndex]);

  return (
    <svg
      aria-label="Bureau qui s'augmente (illustration)"
      className={`${styles.scene} heroAugmenteScene`}
      ref={svgRef}
    />
  );
}
