import type { Metadata } from "next";
import { LEGAL_ROBOTS } from "@/lib/seo-policy";

export const metadata: Metadata = {
  title: "Mentions Légales",
  robots: LEGAL_ROBOTS,
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mentions Légales
          </h1>

          <div className="mt-8 space-y-8 text-sm text-muted-foreground [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
            <div>
              <h2>Éditeur du site</h2>
              <p>
                augmenter.PRO
                <br />
                Pierre Legrand — Entrepreneur individuel (EI)
                <br />
                Siège / établissement : [À COMPLÉTER : adresse complète — ex. Jouy-le-Moutier 95280]
                <br />
                SIRET : [À COMPLÉTER : 14 chiffres]
                <br />
                Immatriculation : [À COMPLÉTER : RCS Pontoise n° … OU Répertoire des Métiers OU « dispensé d&apos;immatriculation »]
                <br />
                N° TVA intracommunautaire : [À COMPLÉTER : FR… — OU mention « TVA non applicable, art. 293 B du CGI » si franchise en base]
                <br />
                Code APE/NAF : [À COMPLÉTER : ex. 6202A — Conseil en systèmes et logiciels informatiques]
                <br />
                Zone d&apos;intervention : Yvelines (78) &amp; Val d&apos;Oise (95) — conseil &amp; audit en visio partout en France
                <br />
                Email : vite@augmenter.pro
                <br />
                Téléphone : [À COMPLÉTER : numéro au format +33…]
              </p>
            </div>

            <div>
              <h2>Directeur de la publication</h2>
              <p>Pierre Legrand, en qualité d&apos;éditeur du site.</p>
            </div>

            <div>
              <h2>Hébergement</h2>
              <p>
                Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina,
                CA 91723, États-Unis.
              </p>
            </div>

            <div>
              <h2>Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo,
                icônes) est la propriété exclusive d&apos;augmenter.PRO, sauf mention
                contraire. Toute reproduction, même partielle, est interdite sans
                autorisation préalable.
              </p>
            </div>

            <div>
              <h2>Données personnelles</h2>
              <p>
                Les informations collectées via le formulaire de contact sont
                uniquement utilisées pour répondre à votre demande. Elles ne sont ni
                vendues, ni partagées avec des tiers. Conformément au RGPD, vous
                disposez d&apos;un droit d&apos;accès, de rectification et de suppression de
                vos données. Contactez-nous à vite@augmenter.pro pour exercer ces
                droits.
              </p>
            </div>

            <div>
              <h2>Cookies</h2>
              <p>
                Ce site n&apos;utilise aucun cookie de tracking ou publicitaire. Seuls
                des cookies techniques strictement nécessaires au fonctionnement
                peuvent être déposés.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
