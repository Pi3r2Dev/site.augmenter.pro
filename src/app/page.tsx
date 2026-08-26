import { Hero } from "@/components/sections/hero";
import { CapabilityExplorer } from "@/components/sections/capability-explorer";
import { PrestationsTypes } from "@/components/sections/prestations-types";
import { Resources } from "@/components/sections/resources";
import { Convert } from "@/components/sections/convert";

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
