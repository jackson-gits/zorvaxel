import type { ComponentProps } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { ArticleJsonLd } from "@/components/JsonLd";
import {
  getPostBySlug,
  getPosts,
  getPostSlugs,
  getTableOfContents,
  slugifyHeading,
} from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: { absolute: `${SITE.seo.notFound.title} | ${SITE.name}` },
      robots: { index: false, follow: true },
    };
  }

  return createPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraphType: "article",
    openGraphTitle: post.title,
    publishedTime: post.date,
    section: post.category,
  });
}

const mdxComponents = {
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2 {...props} id={slugifyHeading(String(children))}>{children}</h2>
  ),
  h3: ({ children, ...props }: ComponentProps<"h3">) => (
    <h3 {...props} id={slugifyHeading(String(children))}>{children}</h3>
  ),
};

type BlogArticleProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogArticlePage({ params }: BlogArticleProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const [compiled, allPosts] = await Promise.all([
    compileMDX({ source: post.content, components: mdxComponents }),
    Promise.resolve(getPosts()),
  ]);
  const tableOfContents = getTableOfContents(post.content);
  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main className="page-main blog-post-page" id="main-content">
      <ArticleJsonLd post={post} />
      <header className="page-shell blog-post-header">
        <Link className="blog-post-header__back" href="/blog">{SITE.blog.backToIndex}</Link>
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="blog-post-header__excerpt">{post.excerpt}</p>
        <div className="blog-post-meta">
          <time dateTime={post.date}>{post.displayDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className="page-shell blog-post-layout">
        {tableOfContents.length ? (
          <aside aria-label={SITE.blog.tableOfContents} className="blog-toc">
            <p className="eyebrow">{SITE.blog.tableOfContents}</p>
            <ol>
              {tableOfContents.map((item) => (
                <li className={`blog-toc__item${item.level === 3 ? " blog-toc__item--nested" : ""}`} key={item.id}>
                  <a href={`#${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}
        <article className="article-body">{compiled.content}</article>
      </div>

      {relatedPosts.length ? (
        <section aria-labelledby="related-notes-title" className="page-section related-notes">
          <div className="page-shell">
            <div className="related-notes__heading">
              <h2 id="related-notes-title">{SITE.blog.relatedHeading}</h2>
            </div>
            {relatedPosts.map((related) => <BlogCard key={related.slug} post={related} />)}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="article-cta-title" className="page-section article-cta">
        <div className="page-shell article-cta__inner">
          <h2 id="article-cta-title">{SITE.blog.closing}</h2>
          <Button href={SITE.ui.enquireHref}>{SITE.ui.enquire}</Button>
        </div>
      </section>
    </main>
  );
}
