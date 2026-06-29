import Link from "next/link";
import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { LpLogo } from "./lp-logo";

interface AuthorSignoffProps {
  /** URL canonique de l'article (pour les liens de partage). */
  shareUrl: string;
  title: string;
}

/**
 * Signature minimale de fin d'article. Ligne éditoriale « ego minimal » :
 * pas de bio vendeuse, juste « Votre serviteur » + le logo de marque + un lien discret.
 * E-E-A-T reste porté par le JSON-LD Article et la page auteur.
 */
export function AuthorSignoff({ shareUrl, title }: AuthorSignoffProps) {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(title);

  return (
    <div className="author-signoff">
      <LpLogo />
      <div className="author-signoff__body">
        <p className="author-signoff__mark">— Votre serviteur,</p>
        <div className="author-signoff__row">
          <span className="author-signoff__name">Pierre Legrand</span>
          <Link className="author-signoff__link" href="/auteur/pierre-legrand">
            Qui suis-je ↗
          </Link>
          <div className="author-signoff__share">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur LinkedIn"
            >
              <Linkedin className="size-[18px]" />
            </a>
            <a
              href={`mailto:?subject=${encodedText}&body=${encodedUrl}`}
              aria-label="Partager par e-mail"
            >
              <Mail className="size-[18px]" />
            </a>
            <a
              href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur WhatsApp"
            >
              <MessageCircle className="size-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
