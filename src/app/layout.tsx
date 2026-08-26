import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import { DelayedGoogleTagManager } from "@/components/analytics/delayed-gtm";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ASSET_RECOVERY_SCRIPT } from "@/lib/asset-recovery";

/**
 * ISR site-wide : sans `revalidate`, Next émet `Cache-Control: s-maxage=31536000` (1 an) sur
 * le HTML statique — un cache partagé (CDN Hostinger) peut alors servir un HTML périmé qui
 * référence des CSS/JS hashés supprimés au déploiement suivant (une seule version conservée).
 * Avec revalidate=300 + expireTime=300 (next.config.ts) → `s-maxage=300` sans fenêtre stale.
 * Troisième ligne de défense côté client : `ASSET_RECOVERY_SCRIPT` (cf. src/lib/asset-recovery.ts).
 */
export const revalidate = 300;

/** ID du conteneur Google Tag Manager (ex. GTM-XXXXXXX). GA4 et événements se configurent dans GTM. */
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/** Fraunces — serif optique variable, réservé aux titres/pull-quotes des articles (voix éditoriale). */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

/** Image Open Graph partagée (Facebook, WhatsApp, X, LinkedIn). JPEG = compat max plugins + crawlers. */
const OG_IMAGE_PATH = "/images/general/og-augmenter-pro.jpg";
const OG_IMAGE_ALT =
  "augmenter.PRO — Diorama isométrique ordinateur & robots PME, consultant IA Claude Code, Odoo, audit IT 78/95";

export const metadata: Metadata = {
  title: {
    default:
      "augmenter.PRO · Référence Claude Code & Odoo PME · Audit IT 78/95",
    template: "%s | augmenter.PRO",
  },
  description:
    "Consultant IA pour dirigeants PME : Claude Code, Odoo, automatisation, audit IT. Visio France entière, présentiel 78/95 et sur demande partout en France.",
  keywords: [
    "consultant IA PME",
    "audit informatique PME",
    "transformation digitale PME",
    "IA pour PME",
    "consultant IA Yvelines",
    "audit informatique 78",
    "digitalisation PME Val d'Oise",
    "automatisation entreprise",
    "stratégie IA PME",
    "audit IA PME",
  ],
  authors: [{ name: "Pierre Legrand", url: "https://pierrelegrand.fr" }],
  creator: "augmenter.PRO",
  metadataBase: new URL("https://augmenter.pro"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://augmenter.pro",
    siteName: "augmenter.PRO",
    title: "augmenter.PRO · Référence Claude Code & Odoo PME · Audit IT 78/95",
    description:
      "Consultant IA pour dirigeants PME : Claude Code, Odoo, automatisation, audit IT. Visio France entière, présentiel 78/95 et sur demande partout en France.",
    images: [
      {
        url: OG_IMAGE_PATH,
        secureUrl: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Pi3r2Dev",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
        type: "image/jpeg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Avis clients — 5★ partagés entre l'affichage UI (section Convert du Hero bento)
 * et le schema Review/AggregateRating attaché au LocalBusiness ci-dessous.
 * Source : retours clients collectés 2025-2026.
 */
const REVIEWS = [
  {
    name: "Arnaud L.",
    role: "Gérant, commerce spécialisé — Île-de-France",
    quote:
      "On gérait notre catalogue sur des fichiers Excel éparpillés. Pierre a centralisé notre catalogue et automatisé la mise en ligne de nos annonces. Résultat : 2h de saisie en moins par jour et +35 % de demandes clients en ligne.",
    stars: 5,
  },
  {
    name: "Maud J.",
    role: "Architecte d'intérieur indépendante",
    quote:
      "L'IA pour la déco, j'y croyais pas. Pierre m'a fait découvrir des outils qui accélèrent mes moodboards et mes propositions 3D. Mes clients reçoivent leurs planches en 48h au lieu d'une semaine — et la qualité a monté d'un cran.",
    stars: 5,
  },
  {
    name: "Marc L.",
    role: "Responsable informatique, PME industrielle",
    quote:
      "L'audit 360° a révélé des failles de sécurité que nous ignorions. En 3 mois, notre infrastructure est passée de vulnérable à conforme RGPD, avec un budget IT réduit de 20 %.",
    stars: 5,
  },
  {
    name: "Nathalie R.",
    role: "Gérante, entreprise BTP",
    quote:
      "Nos devis prenaient 2 heures, maintenant 15 minutes. L'automatisation mise en place par augmenter.pro a libéré mon équipe pour se concentrer sur les chantiers.",
    stars: 5,
  },
  {
    name: "Karim B.",
    role: "Consultant indépendant",
    quote:
      "En tant qu'indépendant, je pensais que l'IA n'était pas pour moi. Pierre m'a montré comment gagner 8 heures par semaine avec des outils simples. Mon chiffre d'affaires a augmenté de 30 % en 6 mois.",
    stars: 5,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://augmenter.pro/#organization",
      name: "augmenter.PRO",
      url: "https://augmenter.pro",
      description:
        "Consultant IA et transformation digitale pour PME en Yvelines (78) et Val d'Oise (95).",
      founder: {
        "@type": "Person",
        "@id": "https://augmenter.pro/auteur/pierre-legrand#person",
        name: "Pierre Legrand",
        url: "https://augmenter.pro/auteur/pierre-legrand",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "vite@augmenter.pro",
        telephone: "+33679119774",
        contactType: "customer service",
        availableLanguage: "French",
      },
      sameAs: [
        "https://www.linkedin.com/in/legrand-pierre/",
        "https://x.com/Pi3r2Dev",
        "https://github.com/Pi3r2Dev",
        "https://www.google.com/maps?cid=13143887329151170152",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://augmenter.pro/#localbusiness",
      name: "augmenter.PRO",
      url: "https://augmenter.pro",
      description:
        "Consultant IA, audit informatique et transformation digitale pour PME du BTP, immobilier et industrie en Yvelines (78) et Val d'Oise (95).",
      image: "https://augmenter.pro/icon.png",
      telephone: "+33679119774",
      email: "vite@augmenter.pro",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jouy-le-Moutier",
        postalCode: "95280",
        addressRegion: "Val d'Oise",
        addressCountry: "FR",
      },
      // Coordonnées au niveau commune (Jouy-le-Moutier 95280) — l'adresse exacte
      // reste masquée côté GBP (profil Service-Area Business).
      geo: {
        "@type": "GeoCoordinates",
        latitude: 49.0181,
        longitude: 2.0394,
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Yvelines (78)",
        },
        {
          "@type": "AdministrativeArea",
          name: "Val d'Oise (95)",
        },
        {
          "@type": "AdministrativeArea",
          name: "Île-de-France",
        },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      priceRange: "€-€€",
      knowsAbout: [
        "Intelligence Artificielle",
        "Transformation Digitale",
        "Audit Informatique",
        "Automatisation",
        "Robotique",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: String(REVIEWS.length),
        bestRating: "5",
        worstRating: "1",
      },
      review: REVIEWS.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(r.stars),
          bestRating: "5",
        },
        reviewBody: r.quote,
      })),
    },
    {
      "@type": "WebSite",
      "@id": "https://augmenter.pro/#website",
      url: "https://augmenter.pro",
      name: "augmenter.PRO",
      publisher: { "@id": "https://augmenter.pro/#organization" },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Récupère un HTML servi par le CDN qui référencerait des assets d'un build supprimé.
            Doit rester en tête du <head> : le listener doit exister avant le chargement des chunks. */}
        <script dangerouslySetInnerHTML={{ __html: ASSET_RECOVERY_SCRIPT }} />
        {/* Legacy Facebook / certains plugins SEO (IMAGE_SRC) */}
        <link rel="image_src" href={`https://augmenter.pro${OG_IMAGE_PATH}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {gtmId ? <DelayedGoogleTagManager gtmId={gtmId} /> : null}
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
