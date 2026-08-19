// src/components/bento/article-bento-card.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pill } from "./bento-grid";

export interface ArticleBentoData {
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  readTime: string;
  image: string;
}

interface ArticleBentoCardProps {
  article: ArticleBentoData;
  /** featured = grande carte 16/10 avec excerpt, sinon carte 5/3 compacte */
  featured?: boolean;
  className?: string;
}

/**
 * Carte article adaptée au layout bento :
 *  - featured : image 16/10 en haut, tags + titre large + excerpt + meta
 *  - compact : image 5/3, tags + titre + meta uniquement
 */
export function ArticleBentoCard({
  article,
  featured = false,
  className,
}: ArticleBentoCardProps) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden rounded-[22px]",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          featured ? "aspect-[16/10]" : "aspect-[5/3]"
        )}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes={featured ? "(max-width:768px) 100vw, 33vw" : "(max-width:768px) 100vw, 25vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Overlay CSS uniquement — pas de second canvas WebGL
            (le hero /blog a déjà le shader). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        {featured && (
          <div className="absolute left-3 top-3 z-10">
            <Pill tone="solid" size="sm">
              À la une
            </Pill>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "p-5 sm:p-6" : "p-4"
        )}
      >
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 2).map((tag) => (
            <Pill key={tag} tone="primary" size="sm">
              {tag}
            </Pill>
          ))}
        </div>
        <h3
          className={cn(
            "mt-2 flex-1 font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-primary",
            featured ? "text-[1.05rem] sm:text-[1.15rem]" : "text-[0.9rem]"
          )}
        >
          {article.title}
        </h3>
        {featured && article.excerpt && (
          <p className="mt-2 text-[0.82rem] leading-[1.5] text-muted-foreground">
            {article.excerpt}
          </p>
        )}
        <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          {article.readTime}
          {featured && <span className="ml-1">· Guide</span>}
        </div>
      </div>
    </Link>
  );
}
