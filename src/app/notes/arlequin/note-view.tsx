import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import { Callout } from "@/components/article/callout";
import { PullQuote } from "@/components/article/pull-quote";
import {
  ARLEQUIN_CONTACT,
  ARLEQUIN_LIMITS,
  ARLEQUIN_STATS,
  ARLEQUIN_WORKS,
} from "@/data/notes/arlequin";
import { cn } from "@/lib/utils";

/**
 * Document de candidature Arlequin AI. Server Component : le h1 reste opaque
 * dans le HTML (ADR 0006), pas de Framer Motion, pas de CTA commercial.
 */
export function ArlequinNote() {
  return (
    <div className="article-shell min-h-screen">
      <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--ink)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" aria-hidden />
          </span>
          <span className="text-lg font-bold tracking-tight">
            augmenter<span className="text-primary">.PRO</span>
          </span>
          <span className="sr-only"> — accueil</span>
        </Link>

        <div className="article-eyebrow mt-10">
          <span className="dot" />
          Candidature spontanée
          <span className="sep">/</span>
          <span className="muted">Arlequin AI</span>
        </div>

        <p className="article-dateline mt-3">10 septembre 2026</p>

        <h1 className="mt-6 font-display text-[clamp(2.4rem,5.2vw,3.7rem)] font-[560] leading-[1.04] tracking-[-0.02em] text-[var(--ink)]">
          Le siège manquant
        </h1>

        <p className="mt-5 max-w-[42rem] text-[1.32rem] leading-[1.55] text-[var(--ink-soft)]">
          Vous recrutez six ingénieurs, deux profils produit et deux
          commerciaux. Il n&apos;y a personne entre les deux, et c&apos;est là
          que HUDEX se jouera.
        </p>
      </header>

      <article className="prose-article mx-auto mt-12 max-w-3xl px-4 pb-24 sm:px-6">
        <h2>Le constat</h2>

        <dl className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ARLEQUIN_STATS.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "rounded-xl border px-4 py-4",
                stat.emphasis
                  ? "border-[var(--ra-500)]/40 bg-[oklch(0.828_0.189_84.4/0.08)]"
                  : "border-[var(--hair)] bg-[var(--paper-2)]",
              )}
            >
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
                {stat.label}
              </dt>
              <dd
                className={cn(
                  "mt-2 font-display text-4xl font-[560] leading-none tracking-[-0.03em]",
                  stat.emphasis
                    ? "text-[var(--ra-500)]"
                    : "text-[var(--ink)]",
                )}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <p>
          Vos annonces décrivent HUDEX comme une chaîne d&apos;ingestion et de
          traitement de données servant des interfaces d&apos;exploration et
          d&apos;analyse, pour des workflows d&apos;analystes complexes. Vos
          Account Executives vendront cette promesse à des directions de la
          conformité, à des équipes d&apos;investigation et à des acheteurs de
          la sphère défense. Entre la signature et l&apos;analyste qui ouvre
          HUDEX un lundi matin, il y a un fossé que ni un commercial ni un
          ingénieur plateforme ne traverse.
        </p>
        <p>
          Ce fossé est mesuré : environ 12&nbsp;% des pilotes d&apos;IA en
          entreprise atteignent la production. Les causes tiennent rarement au
          modèle. Ce sont l&apos;intégration aux systèmes existants, la qualité
          de sortie qui se dégrade au volume, l&apos;absence d&apos;outillage
          de vérification, et une propriété organisationnelle floue.
        </p>

        <PullQuote>
          Palantir n&apos;a pas résolu ce problème avec des commerciaux. Il
          l&apos;a résolu avec des Forward Deployed Engineers.
        </PullQuote>

        <p>
          Se présenter comme l&apos;alternative européenne souveraine sans
          cette couche, c&apos;est signer des contrats qui n&apos;atteindront
          jamais l&apos;usage réel.
        </p>

        <h2>Le rôle que je voudrais inventer avec vous</h2>
        <p className="text-[1.06rem] font-semibold text-[var(--ink)]">
          Ingénieur de déploiement client — le premier maillon entre vos
          ingénieurs et vos clients.
        </p>
        <p>
          M&apos;installer chez vos premiers comptes et transformer ce que
          HUDEX sait faire en ce dont leur infrastructure a réellement besoin
          : brancher leurs sources, absorber la saleté de leurs données,
          construire les garde-fous de vérification, former leurs analystes, et
          rapporter à votre équipe produit ce que le terrain dit et que
          personne ne remonte.
        </p>
        <p>
          C&apos;est un travail d&apos;ingénieur qui parle métier. Il suppose
          de coder, de tenir une conversation avec un directeur de la
          conformité, et d&apos;encaisser que le client change d&apos;avis au
          troisième mois. C&apos;est aussi, mécaniquement, la fonction qui
          écrit votre méthode de déploiement pendant qu&apos;elle l&apos;exécute
          — celle qui n&apos;existe pas encore et qu&apos;il faudra dupliquer
          sur chaque nouveau compte.
        </p>

        <h2>Pourquoi moi</h2>

        <h3>Je fais ce geste depuis quinze ans</h3>
        <p>
          Extraire des données métier depuis des sources sales, les structurer,
          les vérifier, et laisser l&apos;humain garder la main sur la
          validation. Chez PSA en 2012, c&apos;était un préparateur de données
          appliquant un jeu complexe de règles métier, avec l&apos;interface
          qui permettait à un opérateur de reprendre les erreurs — et un
          référentiel technique servant 350&nbsp;000 professionnels dans le
          monde. En 2024, pour un distributeur, un catalogue de 7&nbsp;800
          références ramené de 370 catégories à 15 familles, puis un export
          comptable reconstruit : 680 clients rapprochés, 323 comptes créés, un
          cycle mensuel passé d&apos;une reconstitution manuelle à quarante
          minutes scriptées.
        </p>

        <h3>Fraude et blanchiment : je suis déjà dedans</h3>
        <p>
          C&apos;est l&apos;un de vos cas d&apos;usage annoncés, et c&apos;est
          mon terrain actuel. J&apos;édite une plateforme d&apos;instruction de
          dossiers de crédit en production depuis juin 2026 : extraction de
          relevés bancaires par vision par ordinateur, puis un plan de contrôle
          à quatre niveaux — cohérence arithmétique, analyse forensique du PDF,
          examen de l&apos;image, confrontation à la source DSP2. Je connais la
          contrainte réglementaire de l&apos;intérieur : j&apos;ai été titulaire
          de l&apos;agrément d&apos;intermédiaire en opérations de banque.
        </p>

        <h3>Je sais tenir la pièce où le dossier se décide</h3>
        <p>
          Vos Account Executives vendront à des directions de la conformité, à
          des acheteurs institutionnels et à des équipes d&apos;investigation.
          J&apos;ai passé dix ans dans cette pièce.
        </p>
        <p>
          Pour Dune Investissement Solidaire, la plateforme de financement
          participatif que j&apos;ai cofondée et développée, j&apos;ai porté le
          dossier devant des directions bancaires et devant la direction
          générale de SCOR. Nous y avons obtenu un engagement de l&apos;ordre
          de 100&nbsp;M€, qui n&apos;a pas abouti pour des raisons d&apos;agenda
          politique, pas de fond. Des fonds ont été obtenus de BPI et de SCOR ;
          la plateforme a ensuite été valorisée 800&nbsp;k€.
        </p>
        <p>
          Chez NEGHOME ensuite, j&apos;ai vendu et monté du crédit professionnel
          et du crédit immobilier aux particuliers, ouvert une structure de
          crédit professionnel, signé des partenariats bancaires et obtenu
          l&apos;agrément d&apos;intermédiaire en opérations de banque. J&apos;y
          ai dirigé le développement pendant six ans : de 5 collaborateurs à
          70, de 750&nbsp;k€ à 3,8&nbsp;M€ de chiffre d&apos;affaires.
        </p>
        <p>
          Ce que j&apos;en retiens et qui sert un déploiement : un dossier
          institutionnel ne se gagne pas sur la démonstration, il se gagne sur
          la levée méthodique des objections de ceux qui ne parlent jamais en
          réunion.
        </p>

        <h3>Et je tiens l&apos;infrastructure</h3>
        <p>
          J&apos;opère seul une infrastructure mutualisée servant plus de dix
          produits : passerelle LLM multi-fournisseurs à trois niveaux de
          bascule, parc GPU en temps partagé, observabilité complète. J&apos;ai
          aussi piloté pendant un an deux équipes de développement
          externalisées, en Inde et en Argentine.
        </p>

        <h2>Ce que je ne suis pas</h2>
        <ul>
          {ARLEQUIN_LIMITS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <Callout>
          <p>
            Vous venez de lever pour déployer. Plutôt que de définir ce rôle
            sur le papier, je propose de commencer par{" "}
            <strong>
              un client, un déploiement, un délai fixé
            </strong>{" "}
            — et d&apos;écrire ensemble, à partir de ce qu&apos;on aura appris,
            ce que cette fonction doit devenir chez vous. Si l&apos;analyse
            vous parle, une demi-heure suffira pour en juger.
          </p>
        </Callout>
      </article>

      <section className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <h2 className="font-display text-[1.85rem] font-[560] leading-[1.15] tracking-[-0.015em] text-[var(--ink)]">
          Mes travaux
        </h2>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
          Un seul lien à retenir. Derrière, l&apos;activité, le cas, le
          parcours.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {ARLEQUIN_WORKS.map((work) =>
            work.external ? (
              <a
                key={work.href}
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-xl border border-[var(--hair)] bg-[var(--paper-2)] px-4 py-4 text-[var(--ink)] no-underline hover:border-[var(--rv-300)]"
              >
                <WorkCardBody work={work} />
              </a>
            ) : (
              <Link
                key={work.href}
                href={work.href}
                className="group flex items-start justify-between gap-4 rounded-xl border border-[var(--hair)] bg-[var(--paper-2)] px-4 py-4 text-[var(--ink)] no-underline hover:border-[var(--rv-300)]"
              >
                <WorkCardBody work={work} />
              </Link>
            ),
          )}
        </div>
      </section>

      <footer className="mx-auto max-w-3xl border-t border-[var(--hair)] px-4 py-10 sm:px-6">
        <p className="font-display text-xl font-[560] tracking-[-0.015em] text-[var(--ink)]">
          {ARLEQUIN_CONTACT.name}
        </p>
        <p className="mt-1 text-[var(--ink-soft)]">{ARLEQUIN_CONTACT.role}</p>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-[var(--ink-faint)]">
          <a href={`mailto:${ARLEQUIN_CONTACT.email}`}>
            {ARLEQUIN_CONTACT.email}
          </a>
          <a href={ARLEQUIN_CONTACT.phoneHref} className="whitespace-nowrap">
            {ARLEQUIN_CONTACT.phoneDisplay}
          </a>
          <Link href={ARLEQUIN_CONTACT.siteHref}>
            {ARLEQUIN_CONTACT.siteLabel}
          </Link>
        </p>
      </footer>
    </div>
  );
}

/** Titre + corps d'une carte « Mes travaux » — partagé lien interne / externe. */
function WorkCardBody({ work }: { work: (typeof ARLEQUIN_WORKS)[number] }) {
  return (
    <>
      <span>
        <span className="flex items-center gap-2 font-semibold text-[var(--ink)]">
          {work.title}
          <ArrowUpRight
            className="size-4 text-[var(--ink-faint)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--rv-600)]"
            aria-hidden
          />
        </span>
        <span className="mt-1 block text-[0.95rem] font-normal leading-snug text-[var(--ink-soft)] no-underline">
          {work.body}
        </span>
      </span>
    </>
  );
}
