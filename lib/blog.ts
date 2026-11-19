import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { SITE } from "@/lib/site";

const postsDirectory = path.join(process.cwd(), "content", "blog");
const allowedCategories: readonly string[] = SITE.blog.categories;

export type BlogLocale = "en" | "ta";

const frontmatterSchema = z.object({
  title: z.string().trim().min(1),
  seoTitle: z.string().trim().min(1).max(120).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.string().refine((category) => allowedCategories.includes(category)),
  excerpt: z.string().trim().min(1).max(400),
});

type Frontmatter = z.infer<typeof frontmatterSchema>;

export type BlogPost = Frontmatter & {
  slug: string;
  lang: BlogLocale;
  displayDate: string;
  readingTime: string;
  content: string;
};

export type TableOfContentsItem = {
  level: 2 | 3;
  title: string;
  id: string;
};

function getPostFromFile(fileName: string): BlogPost {
  const fullPath = path.join(postsDirectory, fileName);
  const parsed = matter(fs.readFileSync(fullPath, "utf8"));
  const frontmatter = frontmatterSchema.parse(parsed.data);
  const date = new Date(`${frontmatter.date}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date in blog post: ${fileName}`);
  }

  const isTamil = fileName.endsWith(".ta.mdx");
  const lang: BlogLocale = isTamil ? "ta" : "en";
  const slug = fileName.replace(/\.ta\.mdx$/i, "").replace(/\.mdx$/i, "");

  const wordCount = parsed.content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / (isTamil ? 140 : 200)));

  const displayDate = new Intl.DateTimeFormat(isTamil ? "ta-IN" : "en-IN", {
    day: "numeric",
    month: isTamil ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  return {
    ...frontmatter,
    slug,
    lang,
    content: parsed.content.trim(),
    displayDate,
    readingTime: isTamil ? `${minutes} நிமிட வாசிப்பு` : `${minutes} min read`,
  };
}

export function getPosts(locale: BlogLocale = "en"): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(getPostFromFile)
    .filter((post) => post.lang === locale)
    .sort((first, second) => second.date.localeCompare(first.date));
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(getPostFromFile)
    .sort((first, second) => second.date.localeCompare(first.date));
}

export function getLatestPosts(limit = 3, locale: BlogLocale = "en"): BlogPost[] {
  return getPosts(locale).slice(0, limit);
}

export function getPostBySlug(slug: string, locale: BlogLocale = "en"): BlogPost | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)) return null;
  const targetFile = locale === "ta" ? `${slug}.ta.mdx` : `${slug}.mdx`;
  const fallbackFile = locale === "ta" ? `${slug}.mdx` : `${slug}.ta.mdx`;

  if (fs.existsSync(path.join(postsDirectory, targetFile))) {
    return getPostFromFile(targetFile);
  }
  if (fs.existsSync(path.join(postsDirectory, fallbackFile))) {
    return getPostFromFile(fallbackFile);
  }
  return null;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const slugs = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.ta\.mdx$/i, "").replace(/\.mdx$/i, ""));
  return Array.from(new Set(slugs));
}

export function slugifyHeading(text: string): string {
  return text
    .toLocaleLowerCase("en")
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

export function getTableOfContents(source: string): TableOfContentsItem[] {
  const headings = source.matchAll(/^(#{2,3})\s+(.+?)\s*#*\s*$/gm);
  return Array.from(headings, ([, hashes, rawTitle]) => {
    const title = rawTitle.replace(/\*|`|_/g, "").trim();
    return {
      level: hashes.length as 2 | 3,
      title,
      id: slugifyHeading(title),
    };
  });
}
