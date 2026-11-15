import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = SITE.origin;
  if (!origin) return [];

  const pagePaths = ["/", "/services", "/about", "/blog", "/contact"];
  const pages: MetadataRoute.Sitemap = pagePaths.map((path) => ({
    url: new URL(path, origin).toString(),
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/contact" ? 0.8 : 0.7,
  }));
  const posts: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, origin).toString(),
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
