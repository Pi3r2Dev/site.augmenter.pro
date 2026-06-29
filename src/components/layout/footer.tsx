"use client";

import Link from "next/link";
import { Zap, Linkedin, Twitter, Github, Mail, Phone, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { sendGTMEvent } from "@next/third-parties/google";

// Mini-cockpit footer — same DNA as src/app/approche/narrative/shared/suite-cockpit.tsx
// but compact (no audit card, no engagement hero) for use across all pages
// that don't render the full narrative SuiteCockpit.

interface FooterColumn {
  title: string;
  accent: string;
  items: { label: string; href: string }[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Services & Approche",
    accent: "oklch(0.702 0.183 293)",
    items: [
      { label: "Notre approche", href: "/approche" },
      { label: "Atelier Claude Cowork & Code", href: "/atelier-claude-code-dirigeant" },
      { label: "Audit IA pour PME", href: "/audit-ia-pme" },
      { label: "Audit informatique Yvelines (78)", href: "/audit-informatique-yvelines" },
      { label: "Audit informatique Val d'Oise (95)", href: "/audit-informatique-val-doise" },
      { label: "Intégration MCP", href: "/integration-mcp" },
    ],
  },
  {
    title: "Ressources",
    accent: "oklch(0.828 0.189 84.429)",
    items: [
      { label: "Augmenter mon entreprise", href: "/augmenter-mon-entreprise" },
      { label: "Stratégie IA PME", href: "/strategie-ia-pme" },
      { label: "Articles & tutos", href: "/blog" },
      { label: "Prompts IA", href: "/prompts" },
      { label: "Idées PRO", href: "/idees" },
      { label: "Nos projets", href: "/projets" },
    ],
  },
  {
    title: "Identité & Légal",
    accent: "oklch(0.72 0.15 260)",
    items: [
      { label: "Pierre Legrand", href: "/auteur/pierre-legrand" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/politique-confidentialite" },
      { label: "CGV", href: "/cgv" },
      { label: "Plan du site", href: "/plan-du-site" },
    ],
  },
];

interface SocialLink {
  href: string;
  label: string;
  icon: LucideIcon;
  external: boolean;
}

const SOCIALS: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/legrand-pierre/",
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
  },
  { href: "https://x.com/Pi3r2Dev", label: "Twitter / X", icon: Twitter, external: true },
  { href: "https://github.com/Pi3r2Dev", label: "GitHub", icon: Github, external: true },
  { href: "mailto:vite@augmenter.pro", label: "Email", icon: Mail, external: false },
  { href: "https://wa.me/33679119774", label: "WhatsApp", icon: Phone, external: true },
  // Lien court "Demander un avis" du dashboard GBP → ouvre directement la fenêtre d'avis (1 clic).
  {
    href: "https://g.page/r/CWg20PXid2i2EBM/review",
    label: "Avis Google",
    icon: Star,
    external: true,
  },
];

function ColumnBlock({ col, index }: { col: FooterColumn; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.08 }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="block h-2.5 w-2.5 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${col.accent}, transparent 70%), ${col.accent}`,
            boxShadow: `0 0 12px ${col.accent}`,
          }}
        />
        <h4 className="font-mono text-[11px] uppercase tracking-widest text-white/85">
          {col.title}
        </h4>
      </div>
      <ul className="flex flex-col gap-2">
        {col.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-1.5 text-[14px] text-white/70 transition-colors hover:text-white"
            >
              <span
                aria-hidden
                className="text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-amber-300"
              >
                →
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/8 bg-[oklch(0.08_0.02_293)] text-white">
      {/* Subtle ambient gradient behind the footer (matches the SuiteCockpit ember palette in spirit) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 20% 0%, oklch(0.28 0.18 293 / 0.35), transparent 60%), radial-gradient(ellipse 50% 70% at 90% 100%, oklch(0.4 0.12 30 / 0.25), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Top: pitch + 3-col cockpit */}
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <Link href="/" className="inline-flex items-center gap-2.5 w-fit">
              <span
                aria-hidden
                className="grid h-[28px] w-[28px] place-items-center rounded-md bg-violet-600 text-white"
              >
                <Zap className="h-3.5 w-3.5" />
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.01em]">
                augmenter
                <span className="text-violet-300">.PRO</span>
              </span>
            </Link>
            <p className="max-w-[34ch] text-[14px] leading-relaxed text-white/65">
              Boostez votre potentiel humain et numérique.
              <br />
              PME &amp; indépendants — Yvelines &amp; Val d&apos;Oise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {COLUMNS.map((col, i) => (
              <ColumnBlock key={col.title} col={col} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom: social row + copyright */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              const common =
                "grid h-9 w-9 place-items-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white";
              return s.external ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={common}
                  onClick={
                    s.label === "WhatsApp"
                      ? () => sendGTMEvent({ event: "whatsapp_click", location: "footer" })
                      : s.label === "Avis Google"
                        ? () => sendGTMEvent({ event: "gbp_click", location: "footer" })
                        : undefined
                  }
                >
                  <Icon className="h-4 w-4" />
                </a>
              ) : (
                <a key={s.label} href={s.href} aria-label={s.label} className={common}>
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <div className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-widest text-white/45 sm:text-right">
            <span>© {new Date().getFullYear()} augmenter.PRO — Tous droits réservés.</span>
            <span>
              Conçu par{" "}
              <a
                href="https://pierrelegrand.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/75 hover:text-white hover:underline"
              >
                Pierre Legrand
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
