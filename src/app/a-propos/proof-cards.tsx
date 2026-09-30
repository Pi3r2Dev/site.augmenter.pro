"use client";

import { Boxes, FileSearch, Scale, Truck } from "lucide-react";
import { TrustStatCard, type TrustStatData } from "@/components/widgets/trust-stat";
import type { Palette } from "@/components/widgets/palettes";

/**
 * Les preuves publiées en « effort d'équipe » — formulations figées par la
 * règle de minimisation du 2026-08-26 (cf. .claude/templates/seo/terrain-odoo-reva9.md
 * §7). Ni euros, ni heures facturées, ni périmètre énuméré : un poste par carte,
 * les mêmes phrases que sur la home, pour rester vérifiable et citable.
 *
 * Composant client uniquement parce que TrustStatCard attend une icône Lucide
 * (une fonction ne se sérialise pas depuis un server component).
 */
const PROOFS: (TrustStatData & { palette: Palette })[] = [
  {
    icon: Boxes,
    value: "1 jour",
    label: "Trois personnes une semaine, désormais une journée",
    description: "Catalogue produit remis d'aplomb, puis mis en ligne",
    seed: 41,
    palette: "violet",
  },
  {
    icon: Scale,
    value: "Écarts",
    label: "Une journée de contrôle mensuel, réduite aux écarts",
    description: "Rapprochement facture, bon de livraison, commande",
    seed: 43,
    palette: "amber",
  },
  {
    icon: Truck,
    value: "Franco",
    label: "Le franco affiché avant de valider la commande",
    description: "Besoin net : confirmé, moins le stock, moins l'entrant",
    seed: 47,
    palette: "duo",
  },
  {
    icon: FileSearch,
    value: "Sourcé",
    label: "Réponse sourcée, ou pas de réponse",
    description: "La bonne référence retrouvée dans des centaines de PDF",
    seed: 53,
    palette: "cold",
  },
];

export function ProofCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Preuves livrées, en effort d'équipe">
      {PROOFS.map(({ palette, ...stat }) => (
        <li key={stat.label}>
          <TrustStatCard stat={stat} palette={palette} />
        </li>
      ))}
    </ul>
  );
}
