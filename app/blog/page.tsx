import { BlogIndexFilter } from "@/components/BlogIndexFilter";
import { Button } from "@/components/Button";
import { SITE } from "@/lib/site";
import { getPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: SITE.seo.blog.title,
  description: SITE.seo.blog.description,
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <main className="page-main blog-index-page" id="main-content">
      <header className="page-shell page-heading blog-index-heading">
        <p className="eyebrow">{SITE.blog.eyebrow}</p>
        <h1>{SITE.blog.title}</h1>
        <p>{SITE.blog.introduction}</p>
      </header>
      <section aria-label={SITE.blog.categoryFilterLabel} className="page-section blog-index-section">
        <div className="page-shell">
          <BlogIndexFilter posts={posts} />
        </div>
      </section>
      <section className="page-section blog-index-cta surface-sand">
        <div className="page-shell blog-index-cta__inner">
          <p>{SITE.blog.closing}</p>
          <Button href={SITE.ui.enquireHref}>{SITE.ui.enquire}</Button>
        </div>
      </section>
    </main>
  );
}
