"use client";

import { useEffect, useRef } from "react";
import { narrativeStore } from "./store";
import { MOOD_PALETTES, MOOD_CONFIGS, type Mood } from "./moods";
import {
  readDecorativeMotionHints,
  scheduleWhenIdle,
  shouldRunDecorativeMotion,
} from "@/lib/perf/idle-webgl";

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

function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface UniformTargets {
  contrast: number;
  grain: number;
  mouseStrength: number;
}

function configFor(mood: Mood): UniformTargets {
  const cfg = MOOD_CONFIGS[mood];
  return { contrast: cfg.uContrast, grain: cfg.uGrain, mouseStrength: cfg.uMouseStrength };
}

/**
 * Canvas WebGL plein écran des pages narrative (`/approche`, `/accueil-narrative`).
 * Mobile / reduced-motion / Save-Data : gradient CSS uniquement.
 * Desktop : Three.js après idle pour laisser le LCP se peindre.
 */
export function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    narrativeStore.setReducedMotion(mq.matches);
    const onMqChange = (e: MediaQueryListEvent) => narrativeStore.setReducedMotion(e.matches);
    mq.addEventListener("change", onMqChange);

    if (mq.matches) return () => mq.removeEventListener("change", onMqChange);

    // Mobile / Save-Data : le gradient CSS du wrapper suffit. Lighthouse
    // ne doit pas télécharger Three.js sur le chemin LCP.
    if (!shouldRunDecorativeMotion(readDecorativeMotionHints())) {
      return () => mq.removeEventListener("change", onMqChange);
    }

    const container = containerRef.current;
    if (!container) return () => mq.removeEventListener("change", onMqChange);
    const host = container;

    let disposed = false;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").OrthographicCamera | null = null;
    let mesh: import("three").Mesh | null = null;
    let material: import("three").ShaderMaterial | null = null;
    let rafId = 0;
    let unsubscribe = () => {};
    let removeWindowListeners: (() => void) | null = null;

    const cancelIdle = scheduleWhenIdle(() => {
      startWebGL().catch((err) => {
        console.warn("[narrative] background canvas init failed", err);
      });
    });

    // import() dynamique : Three.js hors du bundle critique (LCP).
    async function startWebGL() {
      if (disposed) return;
      const THREE = await import("three");
      if (disposed) return;

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      host.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const initial = MOOD_PALETTES.dawn;
      const initialCfg = MOOD_CONFIGS.dawn;
      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseVel: { value: new THREE.Vector2(0, 0) },
          uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uC0: { value: new THREE.Vector3(...initial.c0) },
          uC1: { value: new THREE.Vector3(...initial.c1) },
          uC2: { value: new THREE.Vector3(...initial.c2) },
          uContrast: { value: initialCfg.uContrast },
          uGrain: { value: initialCfg.uGrain },
          uMouseStrength: { value: initialCfg.uMouseStrength },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
      });

      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      const onResize = () => {
        if (!renderer || !material) return;
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        (material.uniforms.uRes.value as import("three").Vector2).set(
          window.innerWidth,
          window.innerHeight,
        );
      };
      window.addEventListener("resize", onResize);

      const target = { x: 0.5, y: 0.5 };
      const smoothed = { x: 0.5, y: 0.5 };
      const lastSmoothed = { x: 0.5, y: 0.5 };
      let lastInputAt = performance.now();

      const onPointerMove = (e: PointerEvent) => {
        target.x = e.clientX / window.innerWidth;
        target.y = 1 - e.clientY / window.innerHeight;
        lastInputAt = performance.now();
      };
      window.addEventListener("pointermove", onPointerMove);

      let configTarget: UniformTargets = configFor("dawn");
      const configCurrent: UniformTargets = { ...configTarget };

      unsubscribe = narrativeStore.subscribe(() => {
        const s = narrativeStore.get();
        configTarget = configFor(s.currentMood);
      });

      let lastFrame = performance.now();
      const tick = () => {
        if (disposed || !renderer || !scene || !camera || !material) return;
        const now = performance.now();
        const dt = Math.min(0.05, (now - lastFrame) / 1000);
        lastFrame = now;

        // Ambient Lissajous drift if no input for > 1.4s
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

        // Update palette interp from store (current → next, blend in last 40%)
        const s = narrativeStore.get();
        const cur = MOOD_PALETTES[s.currentMood];
        const next = MOOD_PALETTES[s.nextMood];
        const c0 = lerp3(cur.c0, next.c0, s.blendFraction);
        const c1 = lerp3(cur.c1, next.c1, s.blendFraction);
        const c2 = lerp3(cur.c2, next.c2, s.blendFraction);
        (material.uniforms.uC0.value as import("three").Vector3).set(...c0);
        (material.uniforms.uC1.value as import("three").Vector3).set(...c1);
        (material.uniforms.uC2.value as import("three").Vector3).set(...c2);

        // Smooth config (contrast/grain/strength) toward target
        const tweenSpeed = Math.min(1, dt * 1.5); // ~1.2s power2.out approx
        configCurrent.contrast = lerpN(configCurrent.contrast, configTarget.contrast, tweenSpeed);
        configCurrent.grain = lerpN(configCurrent.grain, configTarget.grain, tweenSpeed);
        configCurrent.mouseStrength = lerpN(
          configCurrent.mouseStrength,
          configTarget.mouseStrength,
          tweenSpeed,
        );
        material.uniforms.uContrast.value = configCurrent.contrast;
        material.uniforms.uGrain.value = configCurrent.grain;
        material.uniforms.uMouseStrength.value = configCurrent.mouseStrength;

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      removeWindowListeners = () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointerMove);
      };
    }

    return () => {
      disposed = true;
      cancelIdle();
      cancelAnimationFrame(rafId);
      unsubscribe();
      removeWindowListeners?.();
      mq.removeEventListener("change", onMqChange);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      mesh?.geometry.dispose();
      material?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.94 0.05 293), oklch(0.985 0.005 293))",
      }}
    />
  );
}
