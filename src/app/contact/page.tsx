import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Diagnostic IA 60 min | Yvelines & Val d'Oise",
  description:
    "On ne te vendra rien pendant les 60 premières minutes. On écoute, on diagnostique, on te dit la vérité. PME Yvelines (78) & Val d'Oise (95).",
};

export default function ContactPage() {
  return <ContactForm />;
}
