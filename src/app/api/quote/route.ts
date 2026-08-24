import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface QuotePayload {
  name: string;
  email: string;
  company?: string;
  services: string[];
  sector?: string;
  teamSize?: string;
  urgency?: string;
  additional?: Record<string, string>;
  brief?: string;
  channel?: "email" | "whatsapp";
}

const SERVICE_LABELS: Record<string, string> = {
  "audit-180": "Audit 180°",
  "audit-360": "Audit 360° IA",
  dev: "Développement sur mesure",
  formation: "Formation & Accompagnement",
  conseil: "Conseil Stratégique",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clamp(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

/** Résumé lisible, réutilisé par le webhook, le mail et le log serveur. */
function buildSummary(p: QuotePayload): string {
  const services =
    p.services.length > 0
      ? p.services.map((s) => SERVICE_LABELS[s] ?? s).join(", ")
      : "Aucun service sélectionné";
  const extra = Object.values(p.additional ?? {})
    .filter(Boolean)
    .map((v) => `  › ${v}`)
    .join("\n");

  return [
    `Nom       : ${p.name}`,
    `Email     : ${p.email}`,
    p.company ? `Entreprise: ${p.company}` : null,
    `Services  : ${services}`,
    `Secteur   : ${p.sector || "Non renseigné"}`,
    `Équipe    : ${p.teamSize || "Non renseigné"}`,
    `Urgence   : ${p.urgency || "Non renseigné"}`,
    `Canal     : ${p.channel ?? "email"}`,
    extra ? `Précisions:\n${extra}` : null,
    p.brief ? `\nBrief généré :\n${p.brief}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

async function notifyWebhook(url: string, p: QuotePayload, summary: string) {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "quote_submitted",
      source: "augmenter.pro/contact",
      timestamp: new Date().toISOString(),
      ...p,
      summary,
    }),
    signal: AbortSignal.timeout(5000),
  });
}

async function notifyEmail(p: QuotePayload, summary: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFY_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: p.email,
      subject: `Demande de devis — ${p.name}${p.company ? ` (${p.company})` : ""}`,
      text: summary,
    }),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad json" }, { status: 400 });
  }

  const body = raw as Partial<QuotePayload>;
  const payload: QuotePayload = {
    name: clamp(body.name, 120),
    email: clamp(body.email, 200),
    company: clamp(body.company, 160),
    services: Array.isArray(body.services) ? body.services.slice(0, 10).map((s) => clamp(s, 40)) : [],
    sector: clamp(body.sector, 80),
    teamSize: clamp(body.teamSize, 80),
    urgency: clamp(body.urgency, 80),
    additional: Object.fromEntries(
      Object.entries(body.additional ?? {})
        .slice(0, 12)
        .map(([k, v]) => [clamp(k, 60), clamp(v, 400)])
    ),
    brief: clamp(body.brief, 4000),
    channel: body.channel === "whatsapp" ? "whatsapp" : "email",
  };

  if (!payload.name || !EMAIL_RE.test(payload.email)) {
    return NextResponse.json({ ok: false, reason: "invalid contact" }, { status: 400 });
  }

  const summary = buildSummary(payload);

  // ── Filet inconditionnel : la demande est tracée même sans aucune conf ──
  // Visible dans les logs applicatifs Hostinger. Ne jamais retirer : c'est le
  // seul canal qui ne dépend d'aucune variable d'environnement.
  console.log(`[QUOTE] ${new Date().toISOString()}\n${summary}\n[/QUOTE]`);

  const delivered: string[] = ["log"];

  const webhookUrl = process.env.NOTIFY_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await notifyWebhook(webhookUrl, payload, summary);
      delivered.push("webhook");
    } catch {
      console.error("[QUOTE] webhook failed");
    }
  }

  try {
    if (await notifyEmail(payload, summary)) delivered.push("email");
  } catch {
    console.error("[QUOTE] email failed");
  }

  return NextResponse.json({ ok: true, delivered });
}
