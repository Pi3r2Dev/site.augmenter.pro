import { NotFoundView } from "@/components/layout/not-found-view";
import { prompts } from "@/data/prompts";
import {
  buildSiteResources,
  pickDecisive,
  toSearchIndex,
} from "@/data/site-resources";

/**
 * Page 404 — server component (le statut HTTP 404 natif de not-found.tsx est
 * conservé). Elle calcule ici, côté serveur, la version compacte de la carte
 * des ressources et l'index des titres, et ne passe au client que des objets
 * plats : ni le catalog, ni le corps des prompts ne partent dans le bundle.
 */
const RESOURCES = buildSiteResources(prompts);
const DECISIVE = pickDecisive(RESOURCES, 8).map(
  ({ title, tldr, href, typeLabel, meta }) => ({ title, tldr, href, typeLabel, meta }),
);
const INDEX = toSearchIndex(RESOURCES);

export default function NotFound() {
  return <NotFoundView decisive={DECISIVE} index={INDEX} />;
}
