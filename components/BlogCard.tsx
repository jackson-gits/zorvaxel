import Link from "next/link";
import {
  AirlessPump,
  Carton,
  DropperBottle,
  FillingNozzle,
  LabelSheet,
  Vial,
} from "@/components/illustrations";

export type BlogCardData = {
  slug: string;
  date: string;
  displayDate?: string;
  title: string;
  excerpt: string;
  readingTime: string;
  category: string;
  lang?: "en" | "ta";
};

type BlogCardProps = {
  post: BlogCardData;
  layout?: "row" | "card";
  lang?: "en" | "ta";
};

export function getCategoryTheme(category: string, slug?: string) {
  const normalized = category.toLowerCase();
  const slugNorm = slug?.toLowerCase() ?? "";

  if (
    normalized.includes("packaging") ||
    normalized.includes("பேக்கேஜிங்") ||
    slugNorm.includes("dropper")
  ) {
    return {
      themeClass: "cat-theme--packaging",
      pillClass: "category-pill category-pill--packaging",
      Illustration: DropperBottle,
      label: category.includes("பேக்கேஜிங்") ? "பேக்கேஜிங் மற்றும் மூடிகள்" : "Packaging & Closures",
      accentColor: "var(--moss)",
    };
  }

  if (
    normalized.includes("formulation") ||
    normalized.includes("ஃபார்முலேஷன்")
  ) {
    return {
      themeClass: "cat-theme--formulation",
      pillClass: "category-pill category-pill--formulation",
      Illustration: FillingNozzle,
      label: category.includes("ஃபார்முலேஷன்") ? "ஃபார்முலேஷன் மற்றும் ஆய்வகம்" : "Formulation & Lab",
      accentColor: "var(--steel)",
    };
  }

  if (
    normalized.includes("label") ||
    normalized.includes("லேபிள்") ||
    slugNorm.includes("label")
  ) {
    return {
      themeClass: "cat-theme--labels",
      pillClass: "category-pill category-pill--labels",
      Illustration: LabelSheet,
      label: category.includes("லேபிள்") ? "லேபிள்கள் மற்றும் வழிகாட்டுதல்" : "Labels & Compliance",
      accentColor: "var(--amber)",
    };
  }

  // Default: Launching a brand / பிராண்டு தொடங்குதல்
  if (slugNorm.includes("private-label") || slugNorm.includes("filling")) {
    return {
      themeClass: "cat-theme--launch",
      pillClass: "category-pill category-pill--launch",
      Illustration: Carton,
      label: category.includes("பிராண்டு") ? "பிராண்டு தொடங்குதல்" : "Launching a Brand",
      accentColor: "var(--terracotta)",
    };
  }

  return {
    themeClass: "cat-theme--launch",
    pillClass: "category-pill category-pill--launch",
    Illustration: Vial,
    label: category.includes("பிராண்டு") ? "பிராண்டு தொடங்குதல்" : "Launching a Brand",
    accentColor: "var(--terracotta)",
  };
}

export function BlogCard({ post, layout = "row", lang }: BlogCardProps) {
  const activeLang = lang ?? post.lang ?? "en";
  const theme = getCategoryTheme(post.category, post.slug);
  const { Illustration } = theme;
  const href = activeLang === "ta" ? `/blog/${post.slug}?lang=ta` : `/blog/${post.slug}`;
  const readLabel = activeLang === "ta" ? "முழு குறிப்பைப் படிக்க" : "Read note";

  if (layout === "card") {
    return (
      <Link
        aria-label={`${readLabel}: ${post.title}`}
        className={`blog-grid-card ${theme.themeClass}`}
        href={href}
      >
        <div className="blog-grid-card__visual">
          <Illustration className="blog-grid-card__illustration" aria-hidden="true" />
          <span className="blog-grid-card__visual-tag">{post.category}</span>
        </div>
        <div className="blog-grid-card__body">
          <div className="blog-grid-card__meta">
            <time dateTime={post.date}>{post.displayDate ?? post.date}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="blog-grid-card__title">{post.title}</h3>
          <p className="blog-grid-card__excerpt">{post.excerpt}</p>
          <div className="blog-grid-card__footer">
            <span className="blog-grid-card__read-link">
              {readLabel} <span aria-hidden="true" className="blog-grid-card__arrow">→</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      aria-label={`${readLabel}: ${post.title}`}
      className={`blog-row ${theme.themeClass}`}
      href={href}
    >
      {/* Category Thumbnail Illustration with distinct tint */}
      <div className="blog-row__thumb" aria-hidden="true">
        <Illustration className="blog-row__thumb-svg" />
      </div>

      {/* Date & Category Pill */}
      <div className="blog-row__meta">
        <span className={theme.pillClass}>{post.category}</span>
        <time dateTime={post.date}>{post.displayDate ?? post.date}</time>
      </div>

      {/* Main Title & Excerpt */}
      <div className="blog-row__content">
        <span className="blog-row__title">{post.title}</span>
        <span className="blog-row__excerpt">{post.excerpt}</span>
      </div>

      {/* Reading Time & Arrow */}
      <div className="blog-row__action">
        <span className="blog-row__reading-time">{post.readingTime}</span>
        <span aria-hidden="true" className="blog-row__arrow">→</span>
      </div>
    </Link>
  );
}
