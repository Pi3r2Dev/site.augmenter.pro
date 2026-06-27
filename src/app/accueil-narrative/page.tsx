import type { Metadata } from "next";
import { HomeNarrative } from "../home-narrative";

// ARCHIVE — version narrative scroll de la home (récit en 6 chapitres,
// ADR 0002), en service sur `/` du 2026-05-21 au 2026-06. Remplacée par le
// retour de la home bento sur `/`, conservée ici pour re-parcours interne.
// noindex : ne doit pas concurrencer `/` ni dupliquer le contenu dans l'index.

export const metadata: Metadata = {
  title: "Archive — Home narrative scroll",
  description:
    "Archive de la version narrative scroll de la page d'accueil augmenter.PRO (récit en 6 chapitres).",
  robots: { index: false, follow: true },
  alternates: { canonical: "/accueil-narrative" },
};

export default function AccueilNarrativePage() {
  return <HomeNarrative />;
}
