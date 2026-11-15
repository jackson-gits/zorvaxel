import Link from "next/link";

export type BlogCardData = {
  slug: string;
  date: string;
  displayDate?: string;
  title: string;
  excerpt: string;
  readingTime: string;
  category: string;
};

type BlogCardProps = {
  post: BlogCardData;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link className="blog-row" href={`/blog/${post.slug}`}>
      <div className="blog-row__meta">
        <time dateTime={post.date}>{post.displayDate ?? post.date}</time>
        <span>{post.category}</span>
      </div>
      <div className="blog-row__content">
        <span className="blog-row__title">{post.title}</span>
        <span className="blog-row__excerpt">{post.excerpt}</span>
      </div>
      <span className="blog-row__reading-time">{post.readingTime}</span>
      <span aria-hidden="true" className="blog-row__arrow">→</span>
    </Link>
  );
}
