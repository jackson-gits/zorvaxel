import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = SITE.origin || "https://zorvaxel.com";
  const now = new Date();

  const pageEntries = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/blog?lang=ta", changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const pages: MetadataRoute.Sitemap = pageEntries.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, origin).toString(),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const allPosts = getAllPosts();
  const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: new URL(
      post.lang === "ta" ? `/blog/${post.slug}?lang=ta` : `/blog/${post.slug}`,
      origin,
    ).toString(),
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
