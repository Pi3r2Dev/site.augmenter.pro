"use client";

import { useEffect } from "react";

/**
 * Error boundary racine — remplace tout le document quand une exception non rattrapée survient
 * (y compris pendant l'hydratation). Avant lui, ce cas affichait le message brut de Next
 * « Application error: a client-side exception has occurred » (incident CDN du 2026-08-14).
 *
 * Styles 100 % inline et aucun import de `globals.css` : ce composant doit rester lisible dans le
 * scénario même qui le déclenche, c'est-à-dire quand la feuille de style hashée renvoie un 404.
 *
 * La récupération automatique (rechargement cache-busté) est portée par `ASSET_RECOVERY_SCRIPT`,
 * qui se déclenche plus tôt — dès l'échec réseau, sans attendre le rendu React. Ici on se contente
 * du dernier recours manuel si ce filet n'a pas suffi.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Trace exploitable dans la console si l'incident se reproduit malgré les deux filets.
    console.error("[global-error]", error?.message, error?.digest);
  }, [error]);

  /** Recharge en contournant le cache partagé : le paramètre force l'origine côté CDN Hostinger. */
  const hardReload = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("_cb", Date.now().toString(36));
    window.location.replace(url.toString());
  };

  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#0c0a12",
          color: "#f4f2f7",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ maxWidth: "34rem", textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#a78bfa",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            augmenter.PRO
          </p>
          <h1 style={{ margin: "0 0 12px", fontSize: "1.6rem", lineHeight: 1.25 }}>
            Cette page n&apos;a pas pu s&apos;afficher
          </h1>
          <p style={{ margin: "0 0 28px", lineHeight: 1.6, color: "#c9c3d6" }}>
            Un incident technique passager, le plus souvent une version du site gardée en cache.
            Rechargez la page : dans la quasi-totalité des cas, cela suffit.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={hardReload}
              style={{
                cursor: "pointer",
                border: 0,
                borderRadius: "9999px",
                padding: "12px 24px",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#0c0a12",
                background: "#f4b942",
              }}
            >
              Recharger la page
            </button>
            <button
              type="button"
              onClick={reset}
              style={{
                cursor: "pointer",
                borderRadius: "9999px",
                padding: "12px 24px",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#f4f2f7",
                background: "transparent",
                border: "1px solid rgba(244, 242, 247, 0.28)",
              }}
            >
              Réessayer
            </button>
          </div>
          <p style={{ margin: "28px 0 0", fontSize: "0.85rem", color: "#8f87a3" }}>
            Le problème persiste ?{" "}
            <a href="mailto:vite@augmenter.pro" style={{ color: "#a78bfa" }}>
              vite@augmenter.pro
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
