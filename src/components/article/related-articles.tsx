import Link from "next/link";
import type { CatalogArticle } from "@/data/resources";

interface RelatedArticlesProps {
  articles: CatalogArticle[];
}

/** « À lire ensuite » — 3 articles proches (calcul sectors/pains côté serveur). */
export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="related" aria-label="Articles liés">
      <p className="related__head">À lire ensuite</p>
      <div className="related__grid">
        {articles.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="related__card">
            <span className="related__tag">{a.tags[0]}</span>
            <h3 className="related__title">{a.title}</h3>
            <p className="related__excerpt">{a.excerpt ?? a.tldr}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
