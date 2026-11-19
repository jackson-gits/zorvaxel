import { BlogIndexFilter } from "@/components/BlogIndexFilter";
import { SITE } from "@/lib/site";
import { getPosts, type BlogLocale } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: SITE.seo.blog.title,
  description: SITE.seo.blog.description,
  path: "/blog",
});

type BlogIndexPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const sParams = await searchParams;
  const initialLocale: BlogLocale = sParams?.lang === "ta" ? "ta" : "en";
  const enPosts = getPosts("en");
  const taPosts = getPosts("ta");

  return (
    <main className="page-main blog-index-page" id="main-content">
      <BlogIndexFilter
        enPosts={enPosts}
        taPosts={taPosts}
        initialLocale={initialLocale}
      />
    </main>
  );
}
