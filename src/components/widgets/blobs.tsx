// src/components/widgets/blobs.tsx
"use client";

import * as React from "react";
import {
  readDecorativeMotionHints,
  shouldRunDecorativeMotion,
} from "@/lib/perf/idle-webgl";
import { PALETTES, type Palette } from "./palettes";

/**
 * RAF qui mute le DOM (pas de setState). Un setState à 60 fps recréait
 * tout le SVG et saturait le thread principal (~3,5 s « Other » Lighthouse).
 */
function useMorphTick(
  speed: number,
  hoverBoost: number,
  onTick: (t: number) => void,
) {
  const onTickRef = React.useRef(onTick);
  onTickRef.current = onTick;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldRunDecorativeMotion(readDecorativeMotionHints())) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      onTickRef.current(((now - start) / 1000) * speed * hoverBoost);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, hoverBoost]);
}

// ─── helper path blob ─────────────────────────────────────────
/**
 * Génère un path SVG organique (spline cubique fermée) pour un blob.
 */
function blobPath(
  cx: number,
  cy: number,
  r: number,
  points = 8,
  seed = 1,
  squish = 0.15
): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const rr =
      r *
      (1 +
        Math.sin(seed + i * 1.7) * squish +
        Math.cos(seed * 2 + i) * squish * 0.6);
    pts.push([cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % points];
    const p3 = pts[(i + 2) % points];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + " Z";
}

interface BlobProps {
  palette?: Palette;
  hovered?: boolean;
  seed?: number;
}

// ─── LiquidBlob ──────────────────────────────────────────────
export function LiquidBlob({
  palette = "violet",
  hovered = false,
  seed = 1,
}: BlobProps) {
  const p = PALETTES[palette];
  const filterId = `liq-${palette}-${seed}`;
  const gradA = `ga-${palette}-${seed}`;
  const gradB = `gb-${palette}-${seed}`;
  const path1Ref = React.useRef<SVGPathElement>(null);
  const path2Ref = React.useRef<SVGPathElement>(null);
  const path3Ref = React.useRef<SVGPathElement>(null);
  const strokeRef = React.useRef<SVGPathElement>(null);

  const path1 = blobPath(200, 200, 140, 10, seed, 0.22);
  const path2 = blobPath(200, 200, 110, 9, seed * 2, 0.28);
  const path3 = blobPath(200, 200, 80, 8, seed * 3, 0.32);

  useMorphTick(0.4, hovered ? 2.2 : 1, (t) => {
    const d1 = blobPath(200, 200, 140, 10, t + seed, 0.22);
    const d2 = blobPath(200, 200, 110, 9, -t * 0.7 + seed * 2, 0.28);
    const d3 = blobPath(200, 200, 80, 8, t * 1.3 + seed * 3, 0.32);
    path1Ref.current?.setAttribute("d", d1);
    path2Ref.current?.setAttribute("d", d2);
    path3Ref.current?.setAttribute("d", d3);
    strokeRef.current?.setAttribute("d", d3);
  });

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id={gradA} cx="35%" cy="30%">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.95" />
          <stop offset="35%" stopColor={p.a} stopOpacity="0.85" />
          <stop offset="70%" stopColor={p.b} stopOpacity="0.7" />
          <stop offset="100%" stopColor={p.b} stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id={gradB} cx="70%" cy="70%">
          <stop offset="0%" stopColor={p.c} stopOpacity="0.9" />
          <stop offset="60%" stopColor={p.a} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.b} stopOpacity="0" />
        </radialGradient>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={hovered ? 8 : 12} />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8" />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        <path ref={path1Ref} d={path1} fill={`url(#${gradA})`} />
        <path ref={path2Ref} d={path2} fill={`url(#${gradB})`} opacity="0.85" />
        <path ref={path3Ref} d={path3} fill={p.accent} opacity="0.5" />
      </g>

      <path
        ref={strokeRef}
        d={path3}
        fill="none"
        stroke={p.accent}
        strokeWidth="1.2"
        opacity="0.35"
      />
    </svg>
  );
}

// ─── MeshAurora ──────────────────────────────────────────────
export function MeshAurora({
  palette = "violet",
  hovered = false,
  seed = 1,
}: BlobProps) {
  const p = PALETTES[palette];
  const fid = `mesh-${palette}-${seed}`;
  const c1Ref = React.useRef<SVGCircleElement>(null);
  const c2Ref = React.useRef<SVGCircleElement>(null);
  const c3Ref = React.useRef<SVGCircleElement>(null);

  const x1 = 120 + Math.sin(seed) * 60;
  const y1 = 140 + Math.cos(seed) * 40;
  const x2 = 280 + Math.cos(seed) * 50;
  const y2 = 260 + Math.sin(seed * 1.3) * 50;
  const x3 = 200 + Math.sin(seed * 2) * 70;
  const y3 = 200 + Math.cos(seed * 2) * 60;

  useMorphTick(0.15, hovered ? 2 : 1, (t) => {
    c1Ref.current?.setAttribute("cx", String(120 + Math.sin(t + seed) * 60));
    c1Ref.current?.setAttribute("cy", String(140 + Math.cos(t * 0.8 + seed) * 40));
    c2Ref.current?.setAttribute("cx", String(280 + Math.cos(t * 1.1 + seed) * 50));
    c2Ref.current?.setAttribute("cy", String(260 + Math.sin(t + seed * 1.3) * 50));
    c3Ref.current?.setAttribute("cx", String(200 + Math.sin(t * 0.7 + seed * 2) * 70));
    c3Ref.current?.setAttribute("cy", String(200 + Math.cos(t * 0.9 + seed * 2) * 60));
  });

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id={`${fid}-1`}>
          <stop offset="0%" stopColor={p.a} stopOpacity="0.75" />
          <stop offset="100%" stopColor={p.a} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${fid}-2`}>
          <stop offset="0%" stopColor={p.c} stopOpacity="0.6" />
          <stop offset="100%" stopColor={p.c} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${fid}-3`}>
          <stop offset="0%" stopColor={p.b} stopOpacity="0.7" />
          <stop offset="100%" stopColor={p.b} stopOpacity="0" />
        </radialGradient>
        <filter id={`${fid}-blur`}>
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <g filter={`url(#${fid}-blur)`}>
        <circle ref={c1Ref} cx={x1} cy={y1} r={140} fill={`url(#${fid}-1)`} />
        <circle ref={c2Ref} cx={x2} cy={y2} r={130} fill={`url(#${fid}-2)`} />
        <circle ref={c3Ref} cx={x3} cy={y3} r={160} fill={`url(#${fid}-3)`} />
      </g>
    </svg>
  );
}

// ─── CardShell ───────────────────────────────────────────────
interface CardShellProps {
  palette?: Palette;
  hovered?: boolean;
  onHover?: (h: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function CardShell({
  palette = "violet",
  hovered = false,
  onHover,
  className = "",
  style,
  children,
}: CardShellProps) {
  const p = PALETTES[palette];
  return (
    <div
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={`relative h-full w-full cursor-pointer overflow-hidden text-white transition-[transform,box-shadow] duration-500 ${className}`}
      style={{
        borderRadius: 28,
        background: p.bg,
        transform: hovered ? "translateY(-4px) scale(1.01)" : "none",
        boxShadow: hovered
          ? `0 30px 60px -20px ${p.b}55, 0 0 0 1px ${p.a}33`
          : "0 12px 32px -12px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04)",
        ...style,
      }}
    >
      {children}
      {/* grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.25,
        }}
      />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 70% at 50% 100%, rgba(0,0,0,.5), transparent 60%)",
        }}
      />
    </div>
  );
}

// ─── CornerArrow ─────────────────────────────────────────────
export function CornerArrow({ hovered = false }: { hovered?: boolean }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[oklch(0.145_0_0)] transition-transform duration-300"
      style={{
        transform: hovered ? "scale(1.12) rotate(-45deg)" : "none",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 13L13 5 M7 5h6v6" />
      </svg>
    </div>
  );
}

// ─── PillTag ─────────────────────────────────────────────────
export function PillTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-[oklch(0.145_0_0)]">
      {children}
    </div>
  );
}
