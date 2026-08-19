/**
 * Politique de motion décorative (shader Three.js, blobs SVG).
 *
 * Lighthouse mobile mesure le LCP sur un viewport ~412 px. Charger Three.js
 * et animer des SVG à 60 fps sur ce chemin concurrentise le texte du hero
 * (élément LCP) et gonfle le travail du thread principal.
 *
 * Mobile / save-data / reduced-motion → fallback CSS statique uniquement.
 * Desktop → Three.js après idle, pour laisser le LCP se peindre d'abord.
 */

/** Viewport max (px) où l'on refuse WebGL et les morphs RAF. */
export const DECORATIVE_MOTION_MAX_PX = 768;

/** Délai max avant d'exécuter un travail idle (LCP + GTM). */
export const IDLE_DEFER_TIMEOUT_MS = 3500;

export interface DecorativeMotionHints {
  reducedMotion: boolean;
  saveData: boolean;
  viewportWidth: number;
}

/**
 * Horloge injectable pour `scheduleWhenIdle` (tests Node sans `window`).
 */
export interface IdleRuntime {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (id: number) => void;
  setTimeout: (callback: () => void, ms: number) => ReturnType<typeof setTimeout>;
  clearTimeout: (id: ReturnType<typeof setTimeout>) => void;
}

/**
 * Lit les hints navigateur. Côté SSR, refuse la motion (le canvas ne monte
 * qu'après hydratation de toute façon).
 */
export function readDecorativeMotionHints(): DecorativeMotionHints {
  if (typeof window === "undefined") {
    return { reducedMotion: true, saveData: false, viewportWidth: 0 };
  }

  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;

  return {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
    saveData: Boolean(connection?.saveData),
    viewportWidth: window.innerWidth,
  };
}

/**
 * True seulement si le viewport desktop peut payer un RAF / WebGL.
 */
export function shouldRunDecorativeMotion(
  hints: DecorativeMotionHints,
): boolean {
  if (hints.reducedMotion) return false;
  if (hints.saveData) return false;
  if (hints.viewportWidth <= DECORATIVE_MOTION_MAX_PX) return false;
  return true;
}

function defaultIdleRuntime(): IdleRuntime {
  const hasWindow = typeof window !== "undefined";
  const ric = hasWindow
    ? window.requestIdleCallback?.bind(window)
    : undefined;
  const cancelRic = hasWindow
    ? window.cancelIdleCallback?.bind(window)
    : undefined;

  return {
    requestIdleCallback: ric
      ? (callback, options) => ric(callback, options)
      : undefined,
    cancelIdleCallback: cancelRic,
    setTimeout: (callback, ms) =>
      (hasWindow ? window : globalThis).setTimeout(callback, ms),
    clearTimeout: (id) =>
      (hasWindow ? window : globalThis).clearTimeout(id),
  };
}

/**
 * Exécute `callback` à l'idle, avec un timeout de sécurité.
 * Retourne une fonction d'annulation.
 */
export function scheduleWhenIdle(
  callback: () => void,
  timeoutMs: number = IDLE_DEFER_TIMEOUT_MS,
  runtime: IdleRuntime = defaultIdleRuntime(),
): () => void {
  if (runtime.requestIdleCallback) {
    const id = runtime.requestIdleCallback(callback, { timeout: timeoutMs });
    return () => runtime.cancelIdleCallback?.(id);
  }

  const timer = runtime.setTimeout(callback, timeoutMs);
  return () => runtime.clearTimeout(timer);
}
