// src/lib/quote-prefill.ts
/**
 * Pré-remplissage du wizard de devis.
 *
 * Le wizard `/contact` restaure son état depuis `localStorage` à l'ouverture.
 * Une page qui envoie un visiteur vers `/contact` avec un contexte déjà connu
 * (son métier, son outil en place) peut donc le déposer ici avant de naviguer :
 * le visiteur arrive avec la moitié des questions déjà répondues, et le brief
 * envoyé à Pierre est qualifié.
 *
 * ⚠ Ce module est le **seul** endroit qui connaît la clé et la forme du
 * stockage — le wizard l'importe lui aussi. Ne pas dupliquer la chaîne ailleurs :
 * un pré-remplissage qui rate se voit rarement, et coûte une demande de devis
 * mal qualifiée.
 */

export const QUOTE_STORAGE_KEY = "augmenter-quote-wizard";

interface PrefillInput {
  /** Identifiant de service du wizard, ex. `"audit-180"`. */
  service?: string;
  /** Secteur, dans le vocabulaire du wizard (cf. SECTOR_TO_WIZARD). */
  sector?: string;
  /** Contexte libre ajouté au brief, ex. `{ outil_en_place: "Odoo" }`. */
  additional?: Record<string, string>;
}

/**
 * Complète l'état du wizard sans jamais écraser ce que le visiteur a déjà
 * saisi : une session en cours prime toujours sur une suggestion.
 */
export function prefillQuote({ service, sector, additional }: PrefillInput) {
  if (typeof window === "undefined") return;

  try {
    const raw = window.localStorage.getItem(QUOTE_STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : {};

    // Une session déjà avancée n'est pas touchée.
    if (saved.step && saved.step > 1) return;

    const selectedServices: string[] = saved.selectedServices?.length
      ? saved.selectedServices
      : service
        ? [service]
        : [];

    const context = {
      sector: saved.context?.sector || sector || "",
      teamSize: saved.context?.teamSize || "",
      urgency: saved.context?.urgency || "",
      additional: { ...additional, ...(saved.context?.additional ?? {}) },
    };

    window.localStorage.setItem(
      QUOTE_STORAGE_KEY,
      JSON.stringify({
        step: 1,
        selectedServices,
        context,
        contact: saved.contact ?? null,
        brief: null,
      })
    );
  } catch {
    // Stockage indisponible ou plein : le wizard repartira de zéro, sans casse.
  }
}
