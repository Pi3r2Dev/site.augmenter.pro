import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_ROBOTS } from "@/lib/seo-policy";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité d'augmenter.PRO : données collectées, cookies, droits RGPD. Aucune donnée stockée via le formulaire de contact.",
  robots: LEGAL_ROBOTS,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Politique de Confidentialité
          </h1>

          <div className="mt-8 space-y-8 text-sm text-muted-foreground [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:underline [&_a]:hover:text-foreground">
            <p>
              Dernière mise à jour : février 2026. Cette politique décrit comment
              augmenter.PRO collecte et utilise vos données lorsque vous visitez
              ce site.
            </p>

            <div>
              <h2>Responsable du traitement</h2>
              <p>
                augmenter.PRO
                <br />
                Pierre Legrand — Entrepreneur individuel
                <br />
                Email :{" "}
                <a href="mailto:vite@augmenter.pro">vite@augmenter.pro</a>
                <br />
                Zone d&apos;intervention : Yvelines (78) &amp; Val d&apos;Oise
                (95)
              </p>
            </div>

            <div>
              <h2>Données collectées</h2>
              <p>
                <strong>Formulaire de contact :</strong> le formulaire de la page{" "}
                <Link href="/contact">Contact</Link> ouvre votre client email
                (mailto:). Aucune donnée n&apos;est transmise ni stockée sur nos
                serveurs. Les informations que vous renseignez (nom, email,
                entreprise, message) sont uniquement envoyées via votre propre
                messagerie.
              </p>
              <p className="mt-2">
                <strong>Données de navigation :</strong> nous utilisons Google
                Tag Manager (GTM) et Google Analytics 4 (GA4) pour analyser le
                trafic du site de manière agrégée. Ces outils peuvent collecter
                des informations comme votre adresse IP (anonymisée), le type de
                navigateur, les pages visitées et la durée de visite.
              </p>
            </div>

            <div>
              <h2>Cookies</h2>
              <p>
                Ce site utilise des cookies via Google Tag Manager et Google
                Analytics pour mesurer l&apos;audience. Ces cookies ne sont pas
                utilisés à des fins publicitaires. Vous pouvez les refuser ou
                les supprimer à tout moment via les paramètres de votre
                navigateur.
              </p>
              <p className="mt-2">
                Aucun cookie publicitaire ou de profilage n&apos;est déposé.
                Seuls des cookies techniques et d&apos;analyse sont utilisés.
              </p>
            </div>

            <div>
              <h2>Finalité du traitement</h2>
              <p>
                Les données de navigation sont utilisées exclusivement pour :
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  Mesurer la fréquentation et comprendre l&apos;utilisation du
                  site
                </li>
                <li>Améliorer le contenu et l&apos;expérience utilisateur</li>
                <li>Détecter d&apos;éventuels problèmes techniques</li>
              </ul>
            </div>

            <div>
              <h2>Durée de conservation</h2>
              <p>
                Les données de navigation collectées via Google Analytics sont
                conservées pendant 14 mois conformément aux paramètres par défaut
                de GA4. Elles sont ensuite automatiquement supprimées.
              </p>
            </div>

            <div>
              <h2>Partage avec des tiers</h2>
              <p>
                Vos données ne sont ni vendues, ni partagées avec des tiers à
                des fins commerciales. Les seuls sous-traitants techniques
                sont :
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  <strong>Google LLC</strong> (Google Analytics, Google Tag
                  Manager) — données agrégées d&apos;audience
                </li>
                <li>
                  <strong>Hostinger International Ltd</strong> — hébergement du
                  site
                </li>
              </ul>
            </div>

            <div>
              <h2>Vos droits (RGPD)</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  <strong>Droit d&apos;accès :</strong> obtenir une copie de vos
                  données personnelles
                </li>
                <li>
                  <strong>Droit de rectification :</strong> corriger des données
                  inexactes
                </li>
                <li>
                  <strong>Droit à l&apos;effacement :</strong> demander la
                  suppression de vos données
                </li>
                <li>
                  <strong>Droit d&apos;opposition :</strong> vous opposer au
                  traitement de vos données
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> recevoir vos données
                  dans un format structuré
                </li>
              </ul>
              <p className="mt-2">
                Pour exercer ces droits, contactez-nous à{" "}
                <a href="mailto:vite@augmenter.pro">vite@augmenter.pro</a>. Nous
                répondrons dans un délai de 30 jours.
              </p>
              <p className="mt-2">
                En cas de litige, vous pouvez saisir la CNIL (Commission
                Nationale de l&apos;Informatique et des Libertés) :{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.cnil.fr
                </a>
              </p>
            </div>

            <div>
              <h2>Modifications</h2>
              <p>
                Cette politique peut être mise à jour à tout moment. La date de
                dernière modification est indiquée en haut de page. Nous vous
                encourageons à la consulter régulièrement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
