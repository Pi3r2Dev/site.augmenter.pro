import { Hero } from "@/components/sections/hero";
import { ApproachServices } from "@/components/sections/approach-services";
import { Resources } from "@/components/sections/resources";
import { Convert } from "@/components/sections/convert";

export default function Home() {
  return (
    <>
      <Hero />
      <ApproachServices />
      <Resources />
      <Convert />
    </>
  );
}
