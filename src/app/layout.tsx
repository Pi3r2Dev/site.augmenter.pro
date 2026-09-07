import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import { DelayedGoogleTagManager } from "@/components/analytics/delayed-gtm";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ASSET_RECOVERY_SCRIPT } from "@/lib/asset-recovery";
import { GBP_MAPS_URL } from "@/lib/gbp";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  pageOpenGraph,
} from "@/lib/page-metadata";

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
  openGraph: pageOpenGraph({
    // Racine sans slash final — même forme que le `<loc>` du sitemap.
    path: "",
    title: "augmenter.PRO · Référence Claude Code & Odoo PME · Audit IT 78/95",
    description:
      "Consultant IA pour dirigeants PME : Claude Code, Odoo, automatisation, audit IT. Visio France entière, présentiel 78/95 et sur demande partout en France.",
  }),
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
        // Fiche GBP : c'est CE lien qui fait remonter les vraies étoiles côté
        // Google (Local Pack, Maps) — pas un AggregateRating déclaré ici.
        GBP_MAPS_URL,
      ],
      // Réciproque du `parentOrganization` déclaré par ouquequoi.fr (@id vérifié
      // dans son JSON-LD de prod). Un graphe d'entité unidirectionnel est plus
      // faible qu'un graphe réciproque — les deux côtés doivent se citer.
      subOrganization: { "@id": "https://ouquequoi.fr/#organization" },
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
      // Pas d'`aggregateRating` ni de `review` ici : depuis 09/2019 Google interdit
      // les avis auto-déclarés (self-serving) sur LocalBusiness et Organization —
      // un site qui se note lui-même. Au mieux le balisage est ignoré, au pire c'est
      // un signal négatif de qualité. Les vraies étoiles viennent du Google Business
      // Profile (CID en sameAs) ; les témoignages restent affichés en UI, sans balisage.
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
