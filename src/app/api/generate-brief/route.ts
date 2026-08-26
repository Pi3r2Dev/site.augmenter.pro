import { NextRequest, NextResponse } from "next/server";

interface BriefRequest {
  services: string[];
  sector: string;
  teamSize: string;
  urgency: string;
  additionalContext?: Record<string, string>;
}

const SERVICE_LABELS: Record<string, string> = {
  "audit-180": "un Audit 180° (diagnostic organisationnel, premier rendez-vous)",
  "audit-360": "un Audit 360° IA Stratégique",
  "dev": "du Développement sur mesure (applications & automatisations IA)",
  "formation": "de la Formation & Accompagnement équipes",
  "conseil": "du Conseil Stratégique (roadmap transformation digitale)",
};

function buildFallbackBrief(data: BriefRequest): string {
  const serviceCount = data.services.length;
  const serviceText =
    serviceCount === 1
      ? (SERVICE_LABELS[data.services[0]] ?? data.services[0])
      : data.services
          .map((s) => SERVICE_LABELS[s] ?? s)
          .join(", ");

  return `J'ai bien noté votre intérêt pour ${serviceText}. En tant que PME du secteur ${data.sector} avec une équipe de ${data.teamSize}, votre démarche est exactement celle que nous accompagnons au quotidien dans les Yvelines et le Val d'Oise. Je vous propose un premier échange de 60 min pour comprendre vos enjeux spécifiques et vous donner une vision claire des possibilités — sans engagement.`;
}

export async function POST(req: NextRequest) {
  let data: BriefRequest;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const litellmUrl = process.env.LITELLM_BASE_URL;
  const litellmKey = process.env.LITELLM_API_KEY;

  if (!litellmUrl || !litellmKey) {
    return NextResponse.json({
      brief: buildFallbackBrief(data),
      source: "template",
    });
  }

  const serviceNames = data.services
    .map((s) => SERVICE_LABELS[s] ?? s)
    .join(", ");

  const additionalCtx = data.additionalContext
    ? Object.entries(data.additionalContext)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k} : ${v}`)
        .join(" | ")
    : "";

  const userMessage = [
    `Services souhaités : ${serviceNames}`,
    `Secteur : ${data.sector}`,
    `Taille de l'équipe : ${data.teamSize}`,
    `Urgence : ${data.urgency}`,
    additionalCtx ? `Contexte additionnel : ${additionalCtx}` : "",
  ]
    .filter(Boolean)
    .join(". ");

  try {
    const response = await fetch(`${litellmUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${litellmKey}`,
      },
      body: JSON.stringify({
        model: "default-fast",
        messages: [
          {
            role: "system",
            content: `Tu es Pierre Legrand, consultant IA et transformation digitale pour PME (Yvelines 78, Val d'Oise 95). Rédige un brief de confirmation court (3-4 phrases, 80-100 mots maximum) qui :
1. Commence par "J'ai bien noté..." et confirme la compréhension du besoin
2. Montre que tu as saisi le contexte spécifique (secteur, taille, urgence)
3. Propose naturellement un premier échange de 60 min
Ton chaleureux mais expert. En français. Texte courant uniquement, pas de markdown ni de listes.`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 160,
        stream: false,
      }),
      signal: AbortSignal.timeout(9000),
    });

    if (!response.ok) throw new Error(`LLM ${response.status}`);

    const result = await response.json();
    const brief = result.choices?.[0]?.message?.content?.trim();

    if (!brief) throw new Error("Empty response");

    return NextResponse.json({ brief, source: "llm" });
  } catch {
    return NextResponse.json({
      brief: buildFallbackBrief(data),
      source: "template",
    });
  }
}
