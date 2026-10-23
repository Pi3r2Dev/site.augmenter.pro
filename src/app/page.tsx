import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CapabilityExplorer } from "@/components/sections/capability-explorer";
import { PrestationsTypes } from "@/components/sections/prestations-types";
import { Resources } from "@/components/sections/resources";
import { Convert } from "@/components/sections/convert";

// Titre, description et Open Graph viennent du root layout. Le canonique,
// lui, ne peut pas y vivre : il serait hérité par toute page qui n'en déclare
// pas, et les pointerait toutes vers la home.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityExplorer />
      <PrestationsTypes />
      <Resources />
      <Convert />
    </>
  );
}
