"use client";

import { useState } from "react";
import { BlogCard, type BlogCardData } from "@/components/BlogCard";
import { SITE } from "@/lib/site";

type BlogIndexFilterProps = {
  posts: BlogCardData[];
};

export function BlogIndexFilter({ posts }: BlogIndexFilterProps) {
  const [selected, setSelected] = useState<string>(SITE.blog.allCategory);
  const categories = [SITE.blog.allCategory, ...SITE.blog.categories];
  const filteredPosts =
    selected === SITE.blog.allCategory
      ? posts
      : posts.filter((post) => post.category === selected);

  return (
    <div className="blog-index-filter">
      <div aria-label={SITE.blog.categoryFilterLabel} className="blog-filter-tabs" role="group">
        {categories.map((category) => (
          <button
            aria-pressed={selected === category}
            className="blog-filter-tabs__tab"
            key={category}
            onClick={() => setSelected(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="blog-index-filter__results">
        {filteredPosts.length ? (
          filteredPosts.map((post) => <BlogCard key={post.slug} post={post} />)
        ) : (
          <p className="blog-empty">{SITE.blog.emptyCategory}</p>
        )}
      </div>
    </div>
  );
}
