"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogCard, type BlogCardData } from "@/components/BlogCard";
import { SITE } from "@/lib/site";

type BlogIndexFilterProps = {
  posts: BlogCardData[];
};

export function BlogIndexFilter({ posts }: BlogIndexFilterProps) {
  const [selected, setSelected] = useState<string>(SITE.blog.allCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [SITE.blog.allCategory, ...SITE.blog.categories];

  // Identify featured "Start here" post (foundation article on cost/launch)
  const featuredPost = useMemo(() => {
    return (
      posts.find((p) => p.slug.includes("cost") || p.slug.includes("launch")) ??
      posts[0] ??
      null
    );
  }, [posts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selected === SITE.blog.allCategory || post.category === selected;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [posts, selected, searchQuery]);

  // When browsing all categories and no active search, separate featured post from list
  const isDefaultView = selected === SITE.blog.allCategory && !searchQuery.trim();
  const listPosts = isDefaultView && featuredPost
    ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <div className="blog-index-filter">
      {/* Search and Category Control Bar */}
      <div className="blog-filter-bar">
        <div aria-label={SITE.blog.categoryFilterLabel} className="blog-filter-tabs" role="group">
          {categories.map((category) => (
            <button
              aria-pressed={selected === category}
              className={`blog-filter-tabs__tab${selected === category ? " is-active" : ""}`}
              key={category}
              onClick={() => setSelected(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-search-box">
          <input
            type="search"
            aria-label="Search notes"
            placeholder="Search notes by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blog-search-input"
          />
          {searchQuery ? (
            <button
              type="button"
              className="blog-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          ) : null}
        </div>
      </div>

      {/* Featured "Start Here" Post (Pinned for new visitors) */}
      {isDefaultView && featuredPost ? (
        <div className="blog-featured-card">
          <div className="blog-featured-card__badge">START HERE · ESSENTIAL FOUNDER NOTE</div>
          <Link href={`/blog/${featuredPost.slug}`} className="blog-featured-card__link">
            <div className="blog-featured-card__body">
              <div className="blog-featured-card__meta">
                <span className="blog-featured-card__category">{featuredPost.category}</span>
                <time dateTime={featuredPost.date}>{featuredPost.displayDate ?? featuredPost.date}</time>
                <span>·</span>
                <span>{featuredPost.readingTime}</span>
              </div>
              <h2 className="blog-featured-card__title">{featuredPost.title}</h2>
              <p className="blog-featured-card__excerpt">{featuredPost.excerpt}</p>
              <span className="blog-featured-card__cta">
                Read essential guide <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>
      ) : null}

      {/* Article List */}
      <div aria-live="polite" className="blog-index-filter__results">
        {filteredPosts.length ? (
          listPosts.map((post) => <BlogCard key={post.slug} post={post} />)
        ) : (
          <div className="blog-empty">
            <p>No notes found matching "{searchQuery}".</p>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => {
                setSelected(SITE.blog.allCategory);
                setSearchQuery("");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
