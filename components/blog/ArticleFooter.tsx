import Link from "next/link";
import { BlogCard, type BlogCardData } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import type { BlogLocale } from "@/lib/blog";
import { SITE } from "@/lib/site";

type ArticleFooterProps = {
  currentSlug: string;
  nextPost: BlogCardData | null;
  relatedPosts: BlogCardData[];
  lang?: BlogLocale;
};

export function ArticleFooter({
  currentSlug: _currentSlug,
  nextPost,
  relatedPosts,
  lang = "en",
}: ArticleFooterProps) {
  const i18n = SITE.blog.i18n[lang];

  return (
    <footer className="article-end-section">
      {/* 1. Author & Technical Lab Stamp */}
      <div className="page-shell">
        <div className="article-author-card">
          <div className="article-author-card__badge">
            <span className="article-author-card__dot" aria-hidden="true" />
            {lang === "ta" ? "நேரடி ஆய்வக வெளியீடு" : "DIRECT LAB PUBLICATION"}
          </div>
          <div className="article-author-card__inner">
            <div className="article-author-card__avatar" aria-hidden="true">
              <span>ZX</span>
            </div>
            <div className="article-author-card__content">
              <h3 className="article-author-card__name">{i18n.authorName}</h3>
              <p className="article-author-card__role">{i18n.authorRole}</p>
              <p className="article-author-card__bio">{i18n.authorBio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Next Note Card (Sequential Reader Pathway) */}
      {nextPost && (
        <div className="page-shell article-next-section">
          <div className="article-next-card">
            <div className="article-next-card__header">
              <span className="eyebrow">{i18n.upNext}</span>
              <span className="article-next-card__time">{nextPost.readingTime}</span>
            </div>
            <Link
              href={`/blog/${nextPost.slug}${lang === "ta" ? "?lang=ta" : ""}`}
              className="article-next-card__link"
            >
              <div className="article-next-card__body">
                <span className="article-next-card__cat">{nextPost.category}</span>
                <h3 className="article-next-card__title">{nextPost.title}</h3>
                <p className="article-next-card__excerpt">{nextPost.excerpt}</p>
                <span className="article-next-card__cta">
                  {i18n.continueReading} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* 3. Related Notes Grid */}
      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-notes-title" className="page-section related-notes">
          <div className="page-shell">
            <div className="related-notes__heading">
              <span className="eyebrow">
                {lang === "ta" ? "தொடர்ந்து ஆராயுங்கள்" : "CONTINUE EXPLORING"}
              </span>
              <h2 id="related-notes-title">{i18n.relatedHeading}</h2>
            </div>
            <div className="related-notes__grid">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. High-Conversion Navy CTA Band */}
      <section aria-labelledby="article-navy-cta-title" className="article-navy-cta">
        <div className="page-shell article-navy-cta__inner">
          <div className="article-navy-cta__content">
            <span className="article-navy-cta__eyebrow">{i18n.ctaEyebrow}</span>
            <h2 id="article-navy-cta-title" className="article-navy-cta__title">
              {i18n.ctaTitle}
            </h2>
            <p className="article-navy-cta__desc">{i18n.ctaDesc}</p>
          </div>
          <div className="article-navy-cta__actions">
            <Button href={SITE.ui.enquireHref} className="article-navy-cta__btn">
              {i18n.ctaAction}
            </Button>
            <span className="article-navy-cta__note">{i18n.ctaNote}</span>
          </div>
        </div>
      </section>
    </footer>
  );
}
