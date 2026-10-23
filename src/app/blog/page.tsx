import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/page-metadata";
import { BlogView } from "./blog-view";

const META_TITLE = "Blog IA & Digital — Guides Pratiques pour PME (2026)";
const META_DESCRIPTION =
  "Articles, tutos et guides pratiques sur l'IA, la vente commerciale et la digitalisation. Conseils concrets pour PME et indépendants, sans jargon.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: pageOpenGraph({ title: META_TITLE, description: META_DESCRIPTION, path: "/blog" }),
};

export default function BlogPage() {
  return <BlogView />;
}
