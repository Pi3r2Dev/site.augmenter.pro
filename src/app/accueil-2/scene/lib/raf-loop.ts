/**
 * Boucle d'animation `requestAnimationFrame` réutilisable, avec trois leviers de
 * performance que les modules n'ont plus à réimplémenter (fixe les points
 * chauds P1) :
 *
 *  • **idle-sleep** : le callback peut renvoyer `{ sleep: true }` pour ARRÊTER la
 *    boucle (0 coût CPU/GPU). Elle est relancée par `wake()` (typiquement sur un
 *    `pointermove`). Modèle calqué sur l'ancien `plants-interactive`.
 *  • **throttle** : le callback peut renvoyer `{ fps }` pour plafonner la cadence
 *    (ex. 30 fps quand le curseur est loin — invisible sur de la lave lente,
 *    moitié moins de rastérisations de filtres SVG).
 *  • **pause onglet caché** : `visibilitychange` met la boucle en pause.
 *
 * Le callback reçoit l'horodatage `now` (ms) de `requestAnimationFrame`.
 */

export type FrameResult = { sleep?: boolean; fps?: number } | void;

export type RafLoop = {
  /** Relance la boucle si elle dort (ou n'a jamais démarré). */
  wake(): void;
  dispose(): void;
  readonly sleeping: boolean;
};

export function createRafLoop(frame: (now: number) => FrameResult): RafLoop {
  let rafId = 0;
  let lastTick = 0;
  let minInterval = 0; // 0 = cadence native (pas de throttle)
  let sleeping = false;
  let disposed = false;

  const tick = (now: number) => {
    rafId = 0;
    if (disposed) return;
    // Throttle : on saute la frame sans appeler le callback.
    if (minInterval > 0 && now - lastTick < minInterval) {
      rafId = requestAnimationFrame(tick);
      return;
    }
    lastTick = now;
    const result = frame(now) || {};
    minInterval = result.fps && result.fps > 0 ? 1000 / result.fps : 0;
    if (result.sleep) {
      sleeping = true;
      return; // pas de nouvelle frame planifiée → 0 coût
    }
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!rafId && !disposed) rafId = requestAnimationFrame(tick);
  };

  const onVisibility = () => {
    if (disposed) return;
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!sleeping) {
      start();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  start();

  return {
    get sleeping() {
      return sleeping;
    },
    wake() {
      if (disposed) return;
      if (sleeping || !rafId) {
        sleeping = false;
        lastTick = 0; // la prochaine frame s'exécute immédiatement
        start();
      }
    },
    dispose() {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}
