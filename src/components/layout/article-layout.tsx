import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ArticleReadEvent } from "@/components/layout/article-read-event";
import { CTA } from "@/components/sections/cta";
import { ReadingRail } from "@/components/article/reading-rail";
import { TldrBox } from "@/components/article/tldr-box";
import { AuthorSignoff } from "@/components/article/author-signoff";
import { RelatedArticles } from "@/components/article/related-articles";
import { getArticleBySlug, getRelatedArticles } from "@/data/resources";

interface ArticleLayoutProps {
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  date: string;
  dateISO: string;
  dateModified?: string;
  image?: string;
  slug?: string;
  /** Désactive le bloc TL;DR auto (pour un article ayant déjà un TL;DR inline). */
  showTldr?: boolean;
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  excerpt,
  tags,
  readTime,
  date,
  dateISO,
  dateModified,
  image,
  slug,
  showTldr = true,
  children,
}: ArticleLayoutProps) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    author: {
      "@type": "Person",
      "@id": "https://augmenter.pro/auteur/pierre-legrand#person",
      name: "Pierre Legrand",
      url: "https://augmenter.pro/auteur/pierre-legrand",
    },
    publisher: {
      "@type": "Organization",
      name: "augmenter.PRO",
      url: "https://augmenter.pro",
    },
    datePublished: dateISO.includes("T") ? dateISO : `${dateISO}T00:00:00+01:00`,
    ...(dateModified && {
      dateModified: dateModified.includes("T") ? dateModified : `${dateModified}T00:00:00+01:00`,
    }),
    ...(image && { image: `https://augmenter.pro${image}` }),
    isAccessibleForFree: true,
    keywords: tags.join(", "),
    inLanguage: "fr-FR",
    ...(slug && {
      url: `https://augmenter.pro/blog/${slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://augmenter.pro/blog/${slug}`,
      },
    }),
    isPartOf: {
      "@type": "WebSite",
      name: "augmenter.PRO",
      url: "https://augmenter.pro",
    },
  };

  const tldr = slug ? getArticleBySlug(slug)?.tldr : undefined;
  const related = slug ? getRelatedArticles(slug, 3) : [];
  const shareUrl = slug ? `https://augmenter.pro/blog/${slug}` : "https://augmenter.pro/blog";

  return (
    <div className="article-shell pt-16">
      {slug ? (
        <ArticleReadEvent slug={slug} title={title} readTime={readTime} />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <ReadingRail bodyId="article-body" ctaHref="/contact" ctaLabel="Diagnostic" />

      {/* En-tête éditorial — pas de byline (ligne « on parle du client, pas de nous ») */}
      <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-[var(--ink-faint)] hover:text-[var(--rv-600)]"
        >
          <ArrowLeft className="size-4" />
          Tous les articles
        </Link>

        <div className="article-eyebrow mt-8">
          <span className="dot" />
          {tags[0]}
          <span className="sep">/</span>
          <span className="muted">{readTime} de lecture</span>
        </div>

        <h1 className="mt-4 font-display text-[clamp(2.4rem,5.2vw,3.7rem)] font-[560] leading-[1.04] tracking-[-0.02em] text-[var(--ink)]">
          {title}
        </h1>

        <p className="mt-4 max-w-[42rem] text-[1.32rem] leading-[1.55] text-[var(--ink-soft)]">
          {excerpt}
        </p>

        <p className="article-dateline mt-5 border-b border-[var(--hair)] pb-6">
          Publié {date}
          {dateModified && dateModified !== dateISO
            ? ` · mis à jour ${formatDateFr(dateModified)}`
            : ""}
        </p>

        {image && (
          <div className="relative mt-9 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {showTldr && tldr ? (
          <div className="mt-9">
            <TldrBox>{tldr}</TldrBox>
          </div>
        ) : null}

        {/* Point de montage de l'accordéon TOC mobile (rempli par ReadingRail) */}
        <div id="toc-mobile-mount" className="mt-8" />
      </header>

      {/* Corps + rail TOC desktop */}
      <div className="article-grid mx-auto mt-14 max-w-[78rem] px-4 sm:px-6">
        <div id="reading-rail-mount" className="reading-rail-col" />
        <article id="article-body" className="prose-article [&_h2]:font-display">
          {children}
        </article>
        <div aria-hidden />
      </div>

      {/* Pied éditorial */}
      <div className="mx-auto mt-20 max-w-[52rem] px-4 sm:px-6">
        <AuthorSignoff shareUrl={shareUrl} title={title} />
        <div className="mt-14">
          <RelatedArticles articles={related} />
        </div>
      </div>

      <CTA variant="blog" />
    </div>
  );
}

/** Reformate une date ISO (YYYY-MM-DD) en français court : « 27 juin 2026 ». */
function formatDateFr(iso: string): string {
  const d = new Date(iso.includes("T") ? iso : `${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
