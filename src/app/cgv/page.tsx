import type { Metadata } from "next";
import { LEGAL_ROBOTS } from "@/lib/seo-policy";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description:
    "CGV d'augmenter.PRO : conditions applicables aux prestations de conseil IA, audit informatique et développement sur mesure pour PME.",
  robots: LEGAL_ROBOTS,
};

export default function CGVPage() {
  return (
    <div className="pt-16">
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Conditions Générales de Vente
          </h1>

          <div className="mt-8 space-y-8 text-sm text-muted-foreground [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
            <p>
              Dernière mise à jour : février 2026. Les présentes Conditions
              Générales de Vente (CGV) s&apos;appliquent à toutes les
              prestations proposées par augmenter.PRO.
            </p>

            <div>
              <h2>Article 1 — Identification du prestataire</h2>
              <p>
                augmenter.PRO
                <br />
                Pierre Legrand — Entrepreneur individuel
                <br />
                Email : vite@augmenter.pro
                <br />
                Zone d&apos;intervention : Yvelines (78) &amp; Val d&apos;Oise
                (95), Île-de-France et à distance
              </p>
            </div>

            <div>
              <h2>Article 2 — Objet</h2>
              <p>
                Les présentes CGV régissent les prestations de services
                proposées par augmenter.PRO, notamment :
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  Audit IA 360° et audit informatique 180° pour PME
                </li>
                <li>Développement d&apos;outils et d&apos;automatisations sur mesure</li>
                <li>Formation des équipes aux outils IA</li>
                <li>Conseil en transformation digitale</li>
              </ul>
            </div>

            <div>
              <h2>Article 3 — Devis et commande</h2>
              <p>
                Toute prestation fait l&apos;objet d&apos;un devis sans engagement et
                personnalisé. Le devis est valable 30 jours à compter de sa
                date d&apos;émission. La commande est considérée comme ferme et
                définitive à réception du devis signé par le client.
              </p>
              <p className="mt-2">
                Le premier échange (diagnostic initial de 60 minutes) est sans
                engagement et n&apos;entraîne aucune obligation d&apos;achat.
              </p>
            </div>

            <div>
              <h2>Article 4 — Tarifs</h2>
              <p>
                Les tarifs sont indiqués en euros hors taxes (HT). TVA non
                applicable, article 293 B du CGI (auto-entrepreneur). Les prix
                sont ceux en vigueur au jour de la signature du devis.
              </p>
            </div>

            <div>
              <h2>Article 5 — Modalités de paiement</h2>
              <p>
                Sauf mention contraire sur le devis, le paiement s&apos;effectue
                selon les modalités suivantes :
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>30 % à la commande (signature du devis)</li>
                <li>70 % à la livraison de la prestation</li>
              </ul>
              <p className="mt-2">
                Moyens de paiement acceptés : virement bancaire. Le délai de
                paiement est de 30 jours à compter de la date de facturation.
              </p>
            </div>

            <div>
              <h2>Article 6 — Délais de réalisation</h2>
              <p>
                Les délais de réalisation sont indicatifs et communiqués au
                client lors de l&apos;acceptation du devis. augmenter.PRO
                s&apos;engage à informer le client en cas de retard prévisible.
                Un retard ne peut donner lieu à aucune pénalité ni annulation
                de commande, sauf accord préalable écrit.
              </p>
            </div>

            <div>
              <h2>Article 7 — Annulation et remboursement</h2>
              <p>
                Toute annulation par le client doit être notifiée par écrit
                (email) :
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  <strong>Avant le début de la prestation :</strong> remboursement
                  intégral de l&apos;acompte versé
                </li>
                <li>
                  <strong>Après le début de la prestation :</strong> les
                  travaux réalisés sont facturés au prorata du temps passé.
                  L&apos;acompte reste acquis.
                </li>
              </ul>
            </div>

            <div>
              <h2>Article 8 — Obligations du prestataire</h2>
              <p>
                augmenter.PRO s&apos;engage à exécuter les prestations avec
                diligence et professionnalisme, conformément aux règles de
                l&apos;art et au cahier des charges convenu. Il s&apos;agit
                d&apos;une obligation de moyens.
              </p>
            </div>

            <div>
              <h2>Article 9 — Obligations du client</h2>
              <p>
                Le client s&apos;engage à fournir toutes les informations et
                accès nécessaires à la bonne exécution de la prestation dans
                les délais convenus. Tout retard imputable au client peut
                entraîner un décalage du planning sans responsabilité du
                prestataire.
              </p>
            </div>

            <div>
              <h2>Article 10 — Propriété intellectuelle</h2>
              <p>
                Sauf mention contraire dans le devis, les livrables produits
                dans le cadre de la prestation sont la propriété du client à
                compter du paiement intégral. Le prestataire conserve la
                propriété intellectuelle des méthodologies, outils et
                frameworks génériques utilisés.
              </p>
            </div>

            <div>
              <h2>Article 11 — Confidentialité</h2>
              <p>
                Chaque partie s&apos;engage à ne pas divulguer les informations
                confidentielles reçues de l&apos;autre partie dans le cadre de
                la prestation. Cette obligation de confidentialité subsiste
                pendant 2 ans après la fin de la prestation.
              </p>
            </div>

            <div>
              <h2>Article 12 — Responsabilité</h2>
              <p>
                La responsabilité d&apos;augmenter.PRO est limitée au montant
                total de la prestation concernée. En aucun cas le prestataire
                ne pourra être tenu responsable des dommages indirects
                (perte de chiffre d&apos;affaires, perte de données, préjudice
                commercial).
              </p>
            </div>

            <div>
              <h2>Article 13 — Force majeure</h2>
              <p>
                Aucune des parties ne pourra être tenue responsable d&apos;un
                manquement à ses obligations dû à un cas de force majeure tel
                que défini par l&apos;article 1218 du Code civil.
              </p>
            </div>

            <div>
              <h2>Article 14 — Droit applicable et litiges</h2>
              <p>
                Les présentes CGV sont soumises au droit français. En cas de
                litige, les parties s&apos;engagent à rechercher une solution
                amiable avant toute action judiciaire. À défaut, le litige
                sera porté devant les tribunaux compétents de Versailles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
