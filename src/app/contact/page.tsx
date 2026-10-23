import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/page-metadata";
import { ContactForm } from "./contact-form";

const META_TITLE = "Contact — Diagnostic IA 60 min | Yvelines & Val d'Oise";
const META_DESCRIPTION =
  "On ne te vendra rien pendant les 60 premières minutes. On écoute, on diagnostique, on te dit la vérité. PME Yvelines (78) & Val d'Oise (95).";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: pageOpenGraph({ title: META_TITLE, description: META_DESCRIPTION, path: "/contact" }),
};

export default function ContactPage() {
  return <ContactForm />;
}
