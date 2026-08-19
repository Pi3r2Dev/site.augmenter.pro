"use client";

import { useEffect, useRef } from "react";
import { MOOD_PALETTES, MOOD_CONFIGS, type Mood } from "@/app/approche/narrative/moods";
import {
  readDecorativeMotionHints,
  scheduleWhenIdle,
  shouldRunDecorativeMotion,
} from "@/lib/perf/idle-webgl";

// Same fragment shader as the narrative BackgroundCanvas
// (src/app/approche/narrative/background-canvas.tsx) but stripped of the
// mood observer + lerp transitions. Stays at a single mood for the lifetime
// of the component. Positioned absolute inside the parent — drop it
// behind a card, a section, anything.

const VERT = /* glsl */ `
  void main() { gl_Position = vec4(position, 1.0); }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uMouseVel;
  uniform vec2  uRes;
  uniform vec3  uC0;
  uniform vec3  uC1;
  uniform vec3  uC2;
  uniform float uContrast;
  uniform float uGrain;
  uniform float uMouseStrength;

  float hash(vec2 p){
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float vnoise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0 - 2.0*f);
    float a = hash(i);
    float b = hash(i + vec2(1.,0.));
    float c = hash(i + vec2(0.,1.));
    float d = hash(i + vec2(1.,1.));
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    mat2 r = mat2(0.8,-0.6,0.6,0.8);
    for (int i = 0; i < 5; i++) {
      v += a * vnoise(p);
      p = r * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uRes.xy;
    vec2 p = uv;
    p.x *= uRes.x / uRes.y;
    vec2 m = uMouse;
    m.x *= uRes.x / uRes.y;

    float t = uTime * 0.06;
    vec2 toMouse = m - p;
    float md = length(toMouse);
    float pullFalloff = exp(-md * 3.2);
    vec2 pull = toMouse * pullFalloff * uMouseStrength * 0.35;
    pull += uMouseVel * pullFalloff * 1.2;

    vec2 q;
    q.x = fbm(p * 2.0 + vec2(0.0, t));
    q.y = fbm(p * 2.0 + vec2(5.2, -t));
    vec2 r;
    r.x = fbm(p * 2.2 + 4.0 * q + vec2(1.7, 9.2) + pull);
    r.y = fbm(p * 2.2 + 4.0 * q + vec2(8.3, 2.8) - pull);
    float n = fbm(p * 1.8 + 4.0 * r + pull * 2.0);

    float wash = smoothstep(0.20, 0.85, n + 0.1 * r.y);
    float ink  = smoothstep(0.55, 0.95, n + 0.15 * r.x) * uContrast;

    vec3 col = mix(uC0, uC1, wash);
    col = mix(col, uC2, ink);

    float vig = smoothstep(1.2, 0.4, length(uv - 0.5) * 1.3);
    col *= mix(0.92, 1.0, vig);

    float halo = exp(-md * 4.0) * 0.18;
    col += halo * (uC2 * 0.6 + 0.2);

    float g = (hash(gl_FragCoord.xy + floor(uTime * 14.0)) - 0.5) * uGrain;
    col += g;

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface ShaderBackdropProps {
  mood?: Mood;
  /** Opacity of the canvas — useful if you want the paint to be subtle behind dark text. */
  opacity?: number;
  className?: string;
}

/**
 * Peinture shader localisée derrière un hero / une card.
 * Mobile et reduced-motion : gradient CSS uniquement (pas de chunk Three.js).
 * Desktop : `import("three")` après idle pour laisser le LCP se peindre.
 */
export function ShaderBackdrop({
  mood = "dawn",
  opacity = 1,
  className = "",
}: ShaderBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Mobile / save-data / reduced-motion : le gradient CSS du wrapper suffit.
    // Lighthouse mobile ne doit jamais télécharger le chunk Three.js.
    if (!shouldRunDecorativeMotion(readDecorativeMotionHints())) return;

    const container = containerRef.current;
    if (!container) return;
    const host = container;

    let disposed = false;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").OrthographicCamera | null = null;
    let mesh: import("three").Mesh | null = null;
    let material: import("three").ShaderMaterial | null = null;
    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let removePointer: (() => void) | null = null;

    const cancelIdle = scheduleWhenIdle(() => {
      startWebGL().catch((err) => {
        console.warn("[shader-backdrop] init failed", err);
      });
    });

    // import() dynamique : code-splitting LCP — Three.js hors du bundle critique.
    async function startWebGL() {
      if (disposed) return;
      const THREE = await import("three");
      if (disposed) return;

      const rect = host.getBoundingClientRect();
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(rect.width, rect.height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      host.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const palette = MOOD_PALETTES[mood];
      const cfg = MOOD_CONFIGS[mood];
      material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseVel: { value: new THREE.Vector2(0, 0) },
          uRes: { value: new THREE.Vector2(rect.width, rect.height) },
          uC0: { value: new THREE.Vector3(...palette.c0) },
          uC1: { value: new THREE.Vector3(...palette.c1) },
          uC2: { value: new THREE.Vector3(...palette.c2) },
          uContrast: { value: cfg.uContrast },
          uGrain: { value: cfg.uGrain },
          uMouseStrength: { value: cfg.uMouseStrength },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
      });

      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      // Track mouse relative to the canvas (not the viewport)
      const target = { x: 0.5, y: 0.5 };
      const smoothed = { x: 0.5, y: 0.5 };
      const lastSmoothed = { x: 0.5, y: 0.5 };
      let lastInputAt = performance.now();

      const onPointerMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target.x = (e.clientX - r.left) / r.width;
        target.y = 1 - (e.clientY - r.top) / r.height;
        lastInputAt = performance.now();
      };
      window.addEventListener("pointermove", onPointerMove);

      const updateSize = () => {
        if (!renderer || !material) return;
        const r = host.getBoundingClientRect();
        renderer.setSize(r.width, r.height, false);
        (material.uniforms.uRes.value as import("three").Vector2).set(r.width, r.height);
      };
      resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(host);

      let lastFrame = performance.now();
      const tick = () => {
        if (disposed || !renderer || !scene || !camera || !material) return;
        const now = performance.now();
        const dt = Math.min(0.05, (now - lastFrame) / 1000);
        lastFrame = now;

        // Ambient drift after 1.4s of idle
        const idle = (now - lastInputAt) / 1000 > 1.4;
        if (idle) {
          const tt = now / 1000;
          target.x = 0.5 + Math.cos(tt * 0.18) * 0.18;
          target.y = 0.5 + Math.sin(tt * 0.22) * 0.18;
        }

        smoothed.x += (target.x - smoothed.x) * Math.min(1, dt * 6);
        smoothed.y += (target.y - smoothed.y) * Math.min(1, dt * 6);

        const velX = (smoothed.x - lastSmoothed.x) * 8;
        const velY = (smoothed.y - lastSmoothed.y) * 8;
        lastSmoothed.x = smoothed.x;
        lastSmoothed.y = smoothed.y;

        material.uniforms.uTime.value = now / 1000;
        (material.uniforms.uMouse.value as import("three").Vector2).set(smoothed.x, smoothed.y);
        (material.uniforms.uMouseVel.value as import("three").Vector2).set(velX, velY);

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      removePointer = () => {
        window.removeEventListener("pointermove", onPointerMove);
      };
    }

    return () => {
      disposed = true;
      cancelIdle();
      cancelAnimationFrame(rafId);
      removePointer?.();
      resizeObserver?.disconnect();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      mesh?.geometry.dispose();
      material?.dispose();
    };
  }, [mood]);

  // Static CSS fallback when reduce-motion or pre-mount, matches dawn palette
  const fallbackBg =
    mood === "dawn"
      ? "radial-gradient(ellipse 60% 80% at 50% 0%, oklch(0.94 0.05 293), oklch(0.985 0.005 293))"
      : "transparent";

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity, backgroundImage: fallbackBg }}
    />
  );
}
