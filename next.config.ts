import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://tagmanager.google.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
      "frame-src https://www.googletagmanager.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Borne haute du cache HTML partagé. Combiné au `export const revalidate = 300` du root layout,
  // Next émet `s-maxage=300, stale-while-revalidate=0` : le CDN ne peut plus servir de réponse
  // périmée du tout, il repasse par l'origine dès la 5e minute (upstream mesuré ~25 ms).
  // Enjeu : Hostinger ne garde qu'une version de build. Un HTML caché au-delà d'un déploiement
  // référence des CSS/JS hashés supprimés (404) → page sans styles et exception à l'hydratation.
  // Valeur précédente 3600 → laissait une fenêtre stale de 55 min après chaque mise en ligne.
  expireTime: 300,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/ia-booster-pour-pme-and-independants-votre-intelligence-artificielle-de-la-strategie-a-laction", destination: "/strategie-ia-pme", permanent: true },
      { source: "/comparatif-forces-et-faiblesses-des-llm-dans-les-processus-de-vente-commerciale", destination: "/blog/comparatif-llm-vente-commerciale", permanent: true },
      { source: "/audit-360-signes-moderniser-informatique-pme-yvelines-val-doise", destination: "/blog/5-signes-moderniser-informatique-pme", permanent: true },
      { source: "/construisez-votre-propre-machine-de-guerre-commerciale", destination: "/blog/machine-de-guerre-commerciale", permanent: true },
      { source: "/rendez-vous-audit-360", destination: "/contact", permanent: true },
      { source: "/claude-code-prompt-architecture", destination: "/blog/claude-code-prompt-architecture", permanent: true },
      { source: "/prestations-et-tarifs", destination: "/approche#prestations", permanent: true },
      { source: "/prestations", destination: "/approche#prestations", permanent: true },
      { source: "/actualites-pro", destination: "/blog", permanent: true },
      { source: "/approche-360", destination: "/approche", permanent: true },
      { source: "/projets-pro", destination: "/idees", permanent: true },
      { source: "/de-la-prospection-au-closing-comment-ia-redefinit-la-vente-commerciale", destination: "/blog/ia-redefinit-vente-commerciale", permanent: true },
      { source: "/nos-articles", destination: "/blog", permanent: true },
      { source: "/rdv-rapide", destination: "/contact", permanent: true },
      { source: "/plateforme", destination: "/projets", permanent: true },
      { source: "/plateforme/onboarding-ia", destination: "/projets", permanent: true },
      { source: "/plateforme/dashboard-intelligent", destination: "/projets", permanent: true },
      { source: "/plateforme/curation-ia", destination: "/projets", permanent: true },
      { source: "/plateforme/reseau-professionnel", destination: "/projets", permanent: true },
      { source: "/plateforme/email-intelligent", destination: "/projets", permanent: true },
      { source: "/plateforme/publication-sociale", destination: "/projets", permanent: true },
      { source: "/plateforme/transcription-vocale", destination: "/projets", permanent: true },
      { source: "/plateforme/bot-telegram", destination: "/projets", permanent: true },
      { source: "/plateforme/analyse-documents", destination: "/projets", permanent: true },
      { source: "/plateforme/veille-concurrentielle", destination: "/projets", permanent: true },
      { source: "/quest-ce-que-lintelligence-artificielle-ia", destination: "/strategie-ia-pme", permanent: true },
    ];
  },
};

export default nextConfig;
