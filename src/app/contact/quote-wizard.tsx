"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Target,
  Code2,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Mail,
  MessageCircle,
  Shield,
  Sparkles,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sendGTMEvent } from "@next/third-parties/google";

// ─── DATA ──────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "audit-180",
    name: "Audit 180°",
    desc: "Diagnostic organisationnel — 60 min",
    icon: Search,
    tag: "Offert",
    tagVariant: "secondary" as const,
  },
  {
    id: "audit-360",
    name: "Audit 360° IA",
    desc: "Feuille de route IA sur mesure",
    icon: Target,
    tag: "225 €",
    tagVariant: "default" as const,
  },
  {
    id: "dev",
    name: "Développement",
    desc: "Apps, automatisations & IA",
    icon: Code2,
    tag: null,
    tagVariant: "secondary" as const,
  },
  {
    id: "formation",
    name: "Formation",
    desc: "Ateliers IA pour tes équipes",
    icon: GraduationCap,
    tag: null,
    tagVariant: "secondary" as const,
  },
  {
    id: "conseil",
    name: "Conseil Stratégique",
    desc: "Roadmap transformation digitale",
    icon: Lightbulb,
    tag: null,
    tagVariant: "secondary" as const,
  },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

const SERVICE_LABELS: Record<ServiceId, string> = {
  "audit-180": "un Audit 180° (diagnostic offert)",
  "audit-360": "un Audit 360° IA Stratégique",
  dev: "du Développement sur mesure",
  formation: "de la Formation & Accompagnement",
  conseil: "du Conseil Stratégique",
};

const SECTORS = [
  "BTP / Immobilier",
  "Industrie / Logistique",
  "Commerce / Distribution",
  "Services / Conseil",
  "Autre",
];

const TEAM_SIZES = ["1–10 personnes", "11–50 personnes", "51–200 personnes", "200+ personnes"];

const URGENCIES = ["Exploration (pas urgent)", "Dans les 3 mois", "Le plus vite possible"];

const ADAPTIVE_QUESTIONS: Partial<
  Record<ServiceId, { label: string; options: string[]; key: string }>
> = {
  formation: {
    key: "formation_size",
    label: "Combien de personnes à former ?",
    options: ["1–5 personnes", "6–15 personnes", "16–30 personnes", "30+ personnes"],
  },
  dev: {
    key: "dev_si",
    label: "Tu as déjà un système d'information en place ?",
    options: ["Oui — à intégrer", "Partiellement", "Non — on repart de zéro"],
  },
  conseil: {
    key: "conseil_goal",
    label: "Quel est ton objectif principal ?",
    options: ["Réduire les coûts", "Gagner du temps", "Se différencier", "Accompagner la croissance"],
  },
};

// ─── TYPES ──────────────────────────────────────────────────────────────────

interface WizardContext {
  sector: string;
  teamSize: string;
  urgency: string;
  additional: Record<string, string>;
}

interface WizardContact {
  name: string;
  email: string;
  company: string;
}

const INITIAL_CONTEXT: WizardContext = {
  sector: "",
  teamSize: "",
  urgency: "",
  additional: {},
};

const INITIAL_CONTACT: WizardContact = { name: "", email: "", company: "" };

const STEP_LABELS = ["Services", "Contexte", "Brief & Contact"];

const STORAGE_KEY = "augmenter-quote-wizard";

// ─── HELPERS ────────────────────────────────────────────────────────────────

function buildClientFallbackBrief(
  services: ServiceId[],
  sector: string,
  teamSize: string
): string {
  const serviceText =
    services.length === 1
      ? SERVICE_LABELS[services[0]]
      : `${services.length} domaines d'intervention`;
  return `J'ai bien noté votre intérêt pour ${serviceText}. En tant que PME du secteur ${sector || "votre secteur"} avec une équipe de ${teamSize || "votre taille"}, votre démarche est exactement celle que nous accompagnons au quotidien dans les Yvelines et le Val d'Oise. Je vous propose un premier échange de 60 min pour comprendre vos enjeux et vous donner une vision claire des possibilités — sans engagement.`;
}

function buildMailtoUrl(
  services: ServiceId[],
  ctx: WizardContext,
  contact: WizardContact,
  brief: string
): string {
  const serviceNames = services.map((s) => SERVICE_LABELS[s]).join(", ");
  const subject = encodeURIComponent(
    `Demande de contact — ${contact.company || contact.name}`
  );
  const body = encodeURIComponent(
    [
      `Bonjour Pierre,`,
      ``,
      `Suite à mon passage sur augmenter.pro, voici mon besoin :`,
      ``,
      `Services souhaités : ${serviceNames}`,
      `Secteur : ${ctx.sector}`,
      `Taille équipe : ${ctx.teamSize}`,
      `Urgence : ${ctx.urgency}`,
      Object.entries(ctx.additional)
        .filter(([, v]) => v)
        .map(([, v]) => `› ${v}`)
        .join("\n"),
      ``,
      `---`,
      `Nom : ${contact.name}`,
      `Email : ${contact.email}`,
      contact.company ? `Entreprise : ${contact.company}` : "",
      ``,
      `Brief généré :`,
      brief,
    ]
      .filter((l) => l !== null)
      .join("\n")
  );
  return `mailto:vite@augmenter.pro?subject=${subject}&body=${body}`;
}

function buildWhatsAppUrl(
  services: ServiceId[],
  ctx: WizardContext,
  contact: WizardContact
): string {
  const serviceNames = services.map((s) => SERVICE_LABELS[s]).join(", ");
  const message = encodeURIComponent(
    [
      `Bonjour Pierre,`,
      ``,
      `Je vous contacte depuis augmenter.pro pour ${serviceNames}.`,
      ``,
      `Secteur : ${ctx.sector} | Équipe : ${ctx.teamSize} | Urgence : ${ctx.urgency}`,
      ``,
      `Nom : ${contact.name}`,
      contact.company ? `Entreprise : ${contact.company}` : "",
      `Email : ${contact.email}`,
      ``,
      `Disponible pour un premier échange ?`,
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `https://wa.me/33679119774?text=${message}`;
}

// ─── CHIP BUTTON ────────────────────────────────────────────────────────────

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}

// ─── STEP TRANSITION ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

// ─── EXIT INTENT POPUP ──────────────────────────────────────────────────────

function ExitIntentPopup({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email && consent) onSubmit(email);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Ton brief est presque prêt</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Laisse ton email et on reprend là où tu en étais.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.pro"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 shrink-0"
            />
            <span>
              J&apos;accepte de recevoir un lien pour reprendre mon devis. Aucune
              base de données — juste un email de Pierre.
            </span>
          </label>
          <Button type="submit" size="sm" className="w-full" disabled={!email || !consent}>
            Sauvegarder mon avancement
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── MAIN WIZARD ────────────────────────────────────────────────────────────

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [context, setContext] = useState<WizardContext>(INITIAL_CONTEXT);
  const [contact, setContact] = useState<WizardContact>(INITIAL_CONTACT);
  const [brief, setBrief] = useState<string | null>(null);
  const [briefLoading, setBriefLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Exit intent state
  const [showExitIntent, setShowExitIntent] = useState(false);
  const exitIntentShownRef = useRef(false);

  // Abandon tracking: fired once when email is filled on step 3
  const abandonFiredRef = useRef(false);

  // ── Restore from localStorage ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const data = JSON.parse(saved);
      if (data.selectedServices?.length) setSelectedServices(data.selectedServices);
      if (data.context) setContext(data.context);
      if (data.contact) setContact(data.contact);
      if (data.step && data.step <= 3) {
        setStep(data.step);
        // Restore brief if we were on step 3
        if (data.step === 3 && data.brief) setBrief(data.brief);
      }
    } catch {
      // Ignore malformed storage
    }
  }, []);

  // ── Persist to localStorage ──
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ step, selectedServices, context, contact, brief })
      );
    } catch {
      // Storage might be full — ignore
    }
  }, [step, selectedServices, context, contact, brief]);

  // ── Exit intent (desktop only) ──
  useEffect(() => {
    if (step >= 3 || submitted) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShownRef.current) {
        exitIntentShownRef.current = true;
        setShowExitIntent(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [step, submitted]);

  // ── Navigation ──
  function goNext() {
    setDirection(1);
    setStep((s) => s + 1);
    sendGTMEvent({ event: "quote_step_completed", step });
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  // ── Brief generation (called on entering step 3) ──
  const generateBrief = useCallback(async () => {
    setBriefLoading(true);
    setBrief(null);
    try {
      const res = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedServices,
          sector: context.sector,
          teamSize: context.teamSize,
          urgency: context.urgency,
          additionalContext: context.additional,
        }),
      });
      if (!res.ok) throw new Error();
      const { brief: generated } = await res.json();
      setBrief(generated);
      sendGTMEvent({ event: "brief_generated", source: "ai", services: selectedServices.join(",") });
    } catch {
      setBrief(buildClientFallbackBrief(selectedServices, context.sector, context.teamSize));
      sendGTMEvent({ event: "brief_generated", source: "fallback", services: selectedServices.join(",") });
    } finally {
      setBriefLoading(false);
    }
  }, [selectedServices, context]);

  // Trigger brief generation when reaching step 3
  useEffect(() => {
    if (step === 3 && brief === null && !briefLoading) {
      generateBrief();
    }
  }, [step, brief, briefLoading, generateBrief]);

  // ── Email blur handler (abandon tracking) ──
  function handleEmailBlur() {
    if (abandonFiredRef.current) return;
    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) return;
    abandonFiredRef.current = true;

    fetch("/api/notify-abandon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: contact.email,
        services: selectedServices,
        step: 3,
        consentGiven: true, // At step 3 they've engaged enough; we send Pierre a heads-up
        sector: context.sector,
        teamSize: context.teamSize,
        urgency: context.urgency,
      }),
    }).catch(() => {});

    sendGTMEvent({ event: "quote_email_captured", step: 3 });
  }

  // ── Exit intent submission ──
  function handleExitIntentSubmit(email: string) {
    fetch("/api/notify-abandon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        services: selectedServices,
        step,
        consentGiven: true,
        sector: context.sector,
        teamSize: context.teamSize,
      }),
    }).catch(() => {});
    sendGTMEvent({ event: "quote_abandon_email_captured", step });
    setShowExitIntent(false);
  }

  // ── Form submission ──
  function handleSend(channel: "email" | "whatsapp") {
    const finalBrief = brief ?? buildClientFallbackBrief(selectedServices, context.sector, context.teamSize);
    sendGTMEvent({
      event: "contact_form_submit",
      form_name: "quote_wizard",
      channel,
      services: selectedServices.join(","),
    });
    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);

    // Capture serveur AVANT de quitter la page. `keepalive` fait survivre la
    // requête à la navigation, et l'absence d'`await` préserve le user gesture
    // (sinon window.open serait bloqué par le popup blocker).
    fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        company: contact.company,
        services: selectedServices,
        sector: context.sector,
        teamSize: context.teamSize,
        urgency: context.urgency,
        additional: context.additional,
        brief: finalBrief,
        channel,
      }),
    }).catch(() => {});

    if (channel === "email") {
      window.location.href = buildMailtoUrl(selectedServices, context, contact, finalBrief);
    } else {
      window.open(buildWhatsAppUrl(selectedServices, context, contact), "_blank");
    }
  }

  // ── Adaptive questions for step 2 ──
  const adaptiveQuestions = selectedServices
    .map((s) => ADAPTIVE_QUESTIONS[s])
    .filter(Boolean) as NonNullable<(typeof ADAPTIVE_QUESTIONS)[ServiceId]>[];

  // Remove duplicates by key
  const uniqueAdaptiveQuestions = adaptiveQuestions.filter(
    (q, i, arr) => arr.findIndex((x) => x.key === q.key) === i
  );

  const step2Complete =
    context.sector && context.teamSize && context.urgency;

  const step3Complete = contact.name && contact.email;

  // ── Progress bar ──
  function ProgressBar() {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < step;
            const isCurrent = stepNum === step;
            return (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors ${
                      isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCurrent
                        ? "border-primary bg-background text-primary"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                  </div>
                  <span
                    className={`mt-1 hidden text-xs sm:block ${
                      isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 transition-colors ${
                      isCompleted ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Submitted state ──
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-12 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">Message envoyé !</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Pierre te répond sous 24h. Garde un œil sur ta messagerie.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <ProgressBar />

      <AnimatePresence mode="wait" custom={direction}>
        {/* ── STEP 1 : Services ─────────────────────────────────────── */}
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-semibold">Qu&apos;est-ce qui t&apos;intéresse ?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sélectionne un ou plusieurs services pour commencer.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      setSelectedServices((prev) =>
                        isSelected
                          ? prev.filter((s) => s !== service.id)
                          : [...prev, service.id]
                      );
                    }}
                    className={`relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/40 hover:bg-muted/50"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{service.name}</span>
                        {service.tag && (
                          <Badge variant={service.tagVariant} className="text-xs">
                            {service.tag}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{service.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={goNext}
                disabled={selectedServices.length === 0}
                size="lg"
                className="gap-2"
              >
                Continuer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2 : Contexte ─────────────────────────────────────── */}
        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-semibold">Parle-nous de ta situation</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ces informations permettent de personnaliser ton brief.
            </p>

            <div className="mt-6 space-y-6">
              {/* Secteur */}
              <div>
                <p className="mb-2 text-sm font-medium">Secteur d&apos;activité</p>
                <div className="flex flex-wrap gap-2">
                  {SECTORS.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      selected={context.sector === s}
                      onClick={() => setContext((c) => ({ ...c, sector: s }))}
                    />
                  ))}
                </div>
                {context.sector === "Autre" && (
                  <input
                    type="text"
                    placeholder="Précise ton secteur…"
                    className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
                    onChange={(e) =>
                      setContext((c) => ({ ...c, additional: { ...c.additional, sector_detail: e.target.value } }))
                    }
                  />
                )}
              </div>

              {/* Taille équipe */}
              <div>
                <p className="mb-2 text-sm font-medium">Taille de ton équipe</p>
                <div className="flex flex-wrap gap-2">
                  {TEAM_SIZES.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      selected={context.teamSize === s}
                      onClick={() => setContext((c) => ({ ...c, teamSize: s }))}
                    />
                  ))}
                </div>
              </div>

              {/* Urgence */}
              <div>
                <p className="mb-2 text-sm font-medium">Ton horizon</p>
                <div className="flex flex-wrap gap-2">
                  {URGENCIES.map((u) => (
                    <Chip
                      key={u}
                      label={u}
                      selected={context.urgency === u}
                      onClick={() => setContext((c) => ({ ...c, urgency: u }))}
                    />
                  ))}
                </div>
              </div>

              {/* Adaptive questions */}
              {uniqueAdaptiveQuestions.map((q) => (
                <div key={q.key}>
                  <p className="mb-2 text-sm font-medium">{q.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={context.additional[q.key] === opt}
                        onClick={() =>
                          setContext((c) => ({
                            ...c,
                            additional: { ...c.additional, [q.key]: opt },
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="ghost" onClick={goBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button
                onClick={goNext}
                disabled={!step2Complete}
                size="lg"
                className="gap-2"
              >
                Générer mon brief
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3 : Brief + Contact ──────────────────────────────── */}
        {step === 3 && (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-6"
          >
            {/* Brief section */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  Analyse de ton besoin
                </span>
              </div>

              {briefLoading ? (
                <div className="flex items-center gap-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Analyse en cours…
                  </span>
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm leading-relaxed"
                >
                  {brief}
                </motion.p>
              )}

              {/* Services recap */}
              <div className="mt-3 flex flex-wrap gap-1">
                {selectedServices.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {SERVICES.find((sv) => sv.id === s)?.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Tes coordonnées</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Nom complet <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    placeholder="Jean Martin"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email professionnel <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    onBlur={handleEmailBlur}
                    placeholder="jean@entreprise.fr"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Entreprise <span className="text-muted-foreground text-xs">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={contact.company}
                  onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                  placeholder="Mon Entreprise SAS"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            {/* Send buttons */}
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={() => handleSend("email")}
                  disabled={!step3Complete}
                  size="lg"
                  className="w-full gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Envoyer par Email
                </Button>
                <Button
                  onClick={() => handleSend("whatsapp")}
                  disabled={!step3Complete}
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 border-green-500/40 text-green-700 hover:bg-green-50 hover:text-green-800 dark:text-green-400 dark:hover:bg-green-950/30"
                >
                  <MessageCircle className="h-4 w-4" />
                  Envoyer par WhatsApp
                </Button>
              </div>
            </div>

            {/* RGPD block */}
            <div className="rounded-xl border border-green-500/20 bg-green-50/50 p-4 dark:bg-green-950/20">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                    Tes données ne quittent jamais ton navigateur
                  </p>
                  <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                    On n&apos;utilise aucune base de données. Ton brief est construit et
                    stocké localement sur ton appareil. En cliquant &quot;Envoyer&quot;, ton
                    message s&apos;ouvre directement dans ton client email ou WhatsApp —
                    sans aucun intermédiaire ni serveur de collecte.
                  </p>
                </div>
              </div>
            </div>

            {/* Back */}
            <Button variant="ghost" onClick={goBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Modifier mon contexte
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit intent popup */}
      <AnimatePresence>
        {showExitIntent && (
          <ExitIntentPopup
            onClose={() => setShowExitIntent(false)}
            onSubmit={handleExitIntentSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
}
