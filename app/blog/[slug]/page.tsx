import type { ComponentProps } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArticleJsonLd } from "@/components/JsonLd";
import {
  ArticleIllustration,
  Callout,
  Checklist,
  ComparisonTable,
  PullQuote,
  SourcesBlock,
  StatCard,
  StatGrid,
} from "@/components/blog/ArticleFurniture";
import { ArticleFooter } from "@/components/blog/ArticleFooter";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { getCategoryTheme } from "@/components/BlogCard";
import {
  getPostBySlug,
  getPosts,
  getPostSlugs,
  getTableOfContents,
  slugifyHeading,
  type BlogLocale,
} from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

type BlogArticleProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const sParams = await searchParams;
  const locale: BlogLocale = sParams?.lang === "ta" ? "ta" : "en";
  const post = getPostBySlug(slug, locale);
  if (!post) {
    return {
      title: { absolute: `${SITE.seo.notFound.title} | ${SITE.name}` },
      robots: { index: false, follow: true },
    };
  }

  return createPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    path: locale === "ta" ? `/blog/${post.slug}?lang=ta` : `/blog/${post.slug}`,
    openGraphType: "article",
    openGraphTitle: post.title,
    publishedTime: post.date,
    section: post.category,
  });
}

const mdxComponents = {
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2 {...props} id={slugifyHeading(String(children))}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<"h3">) => (
    <h3 {...props} id={slugifyHeading(String(children))}>
      {children}
    </h3>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="article-table-scroll" tabIndex={0} role="region">
      <table className="article-table" {...props}>
        {children}
      </table>
    </div>
  ),
  blockquote: ({ children, ...props }: ComponentProps<"blockquote">) => (
    <blockquote className="article-editorial-quote" {...props}>
      {children}
    </blockquote>
  ),
  StatGrid,
  StatCard,
  Callout,
  ComparisonTable,
  PullQuote,
  SourcesBlock,
  ArticleIllustration,
  Checklist,
};

export default async function BlogArticlePage({ params, searchParams }: BlogArticleProps) {
  const { slug } = await params;
  const sParams = await searchParams;
  const locale: BlogLocale = sParams?.lang === "ta" ? "ta" : "en";
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const [compiled, allPosts] = await Promise.all([
    compileMDX({ source: post.content, components: mdxComponents }),
    Promise.resolve(getPosts(locale)),
  ]);

  const i18n = SITE.blog.i18n[locale];
  const tableOfContents = getTableOfContents(post.content);

  // Determine sequential Next Post
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : allPosts[0] && allPosts[0].slug !== post.slug
      ? allPosts[0]
      : null;

  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const theme = getCategoryTheme(post.category, post.slug);

  return (
    <main className="page-main blog-post-page" id="main-content">
      <ReadingProgressBar />
      <ArticleJsonLd post={post} />

      {/* Editorial Article Header */}
      <header className="page-shell blog-post-header">
        <div className="blog-post-header__nav">
          <Link
            className="blog-post-header__back"
            href={locale === "ta" ? "/blog?lang=ta" : "/blog"}
          >
            <span aria-hidden="true">←</span> {i18n.backToIndex}
          </Link>

          <div className="blog-post-header__nav-right">
            {/* Bilingual Switcher Pill */}
            <div
              className="blog-article-lang-switch"
              role="group"
              aria-label={i18n.langSwitchLabel}
            >
              <Link
                href={`/blog/${post.slug}`}
                className={`blog-article-lang-pill${locale === "en" ? " is-active" : ""}`}
                aria-pressed={locale === "en"}
                title="Read in English"
              >
                English
              </Link>
              <span className="blog-article-lang-sep" aria-hidden="true">/</span>
              <Link
                href={`/blog/${post.slug}?lang=ta`}
                className={`blog-article-lang-pill${locale === "ta" ? " is-active" : ""}`}
                aria-pressed={locale === "ta"}
                title="தமிழில் படிக்கவும்"
              >
                தமிழ்
              </Link>
            </div>

            <span className="blog-post-header__issue-tag">
              {i18n.issueTag} #{String(currentIndex + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="blog-post-header__cat-row">
          <span className={theme.pillClass}>{post.category}</span>
          <span className="blog-post-header__tag-sub">{i18n.laboratoryTag}</span>
        </div>

        <h1 className="blog-post-header__title">{post.title}</h1>

        <p className="blog-post-header__excerpt">{post.excerpt}</p>

        {/* Editorial Byline & Meta */}
        <div className="blog-post-meta">
          <div className="blog-post-meta__author">
            <div className="blog-post-meta__avatar" aria-hidden="true">
              ZX
            </div>
            <div>
              <span className="blog-post-meta__name">{i18n.authorName}</span>
              <span className="blog-post-meta__dept">{i18n.authorDept}</span>
            </div>
          </div>
          <div className="blog-post-meta__divider" aria-hidden="true" />
          <div className="blog-post-meta__date-time">
            <time dateTime={post.date}>{post.displayDate}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Main Reading Grid: Interactive Sticky Sidebar + Article Body */}
      <div className="page-shell blog-post-layout">
        {tableOfContents.length ? (
          <BlogSidebar
            tableOfContents={tableOfContents}
            articleTitle={post.title}
            articleSlug={post.slug}
            lang={locale}
          />
        ) : null}
        <article className="article-body">{compiled.content}</article>
      </div>

      {/* Comprehensive End-of-Article Suite */}
      <ArticleFooter
        currentSlug={post.slug}
        nextPost={nextPost}
        relatedPosts={relatedPosts}
        lang={locale}
      />
    </main>
  );
}
