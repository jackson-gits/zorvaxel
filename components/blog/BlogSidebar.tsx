"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BlogLocale, TableOfContentsItem } from "@/lib/blog";
import { SITE } from "@/lib/site";

type BlogSidebarProps = {
  tableOfContents: TableOfContentsItem[];
  articleTitle: string;
  articleSlug: string;
  lang?: BlogLocale;
};

export function BlogSidebar({
  tableOfContents,
  articleTitle,
  articleSlug,
  lang = "en",
}: BlogSidebarProps) {
  const i18n = SITE.blog.i18n[lang];
  const [activeId, setActiveId] = useState<string>(
    tableOfContents[0]?.id ?? ""
  );
  const [progress, setProgress] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Track scroll reading progress & active heading
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector(".article-body");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = Math.max(0, -rect.top);
        const percent = Math.min(100, Math.round((scrolled / totalHeight) * 100));
        setProgress(percent);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for active section
    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible headings
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by top distance
          visibleEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 0.5, 1],
      }
    );

    tableOfContents.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [tableOfContents]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : lang === "ta"
      ? `https://zorvaxel.com/blog/${articleSlug}?lang=ta`
      : `https://zorvaxel.com/blog/${articleSlug}`;

  const shareText =
    lang === "ta"
      ? `சீரம் தயாரிப்பு பற்றிய முக்கிய குறிப்பு: ${articleTitle}\n${articleUrl}`
      : `Interesting note on serum production: ${articleTitle}\n${articleUrl}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <aside aria-label={i18n.tableOfContents} className="blog-toc">
      {/* Reading Progress Indicator */}
      <div className="blog-toc__progress-box">
        <div className="blog-toc__progress-header">
          <span className="eyebrow">{i18n.tableOfContents}</span>
          <span className="blog-toc__percent" aria-live="polite">
            {progress}% {lang === "ta" ? "வாசிக்கப்பட்டது" : "read"}
          </span>
        </div>
        <div
          className="blog-toc__progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="blog-toc__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation List */}
      <nav aria-label="Article sections" className="blog-toc__nav">
        <ol className="blog-toc__list">
          {tableOfContents.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                className={`blog-toc__item${
                  item.level === 3 ? " blog-toc__item--nested" : ""
                }${isActive ? " is-active" : ""}`}
                key={item.id}
              >
                <a
                  href={`#${item.id}`}
                  className="blog-toc__link"
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      const offset = 100;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = target.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                      setActiveId(item.id);
                      history.pushState(null, "", `#${item.id}`);
                    }
                  }}
                >
                  <span className="blog-toc__bullet" aria-hidden="true" />
                  <span className="blog-toc__text">{item.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Quick Utilities: Back to Top & Share */}
      <div className="blog-toc__tools">
        <a
          href="#main-content"
          onClick={scrollToTop}
          className="blog-toc__back-top"
          aria-label={lang === "ta" ? "கட்டுரையின் மேலே செல்ல" : "Back to top of article"}
        >
          <span aria-hidden="true">↑</span> {lang === "ta" ? "மேலே செல்ல" : "Back to top"}
        </a>
        <div className="blog-toc__share-group">
          <button
            type="button"
            onClick={handleCopyLink}
            className="blog-toc__tool-btn"
            aria-label={lang === "ta" ? "இணைப்பை நகலெடு" : "Copy article link to clipboard"}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>
              {copied
                ? lang === "ta"
                  ? "நகலெடுக்கப்பட்டது!"
                  : "Link copied!"
                : lang === "ta"
                ? "இணைப்பை நகலெடு"
                : "Copy link"}
            </span>
          </button>
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-toc__tool-btn"
            aria-label={lang === "ta" ? "வாட்ஸ்அப்பில் பகிர்க" : "Share article on WhatsApp"}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.18 8.18 0 0 1-5.82 2.42c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29" />
            </svg>
            <span>{lang === "ta" ? "பகிர்க" : "Share"}</span>
          </a>
        </div>
      </div>

      {/* Persistent Sidebar Batch Enquiry Card */}
      <div className="blog-toc-cta">
        <div className="blog-toc-cta__tag">
          {lang === "ta" ? "நேரடி ஆய்வக மதிப்பீடு" : "DIRECT LAB ESTIMATE"}
        </div>
        <h4 className="blog-toc-cta__title">
          {lang === "ta" ? "தயாரிப்பைத் திட்டமிடுகிறீர்களா?" : "Planning a batch?"}
        </h4>
        <p className="blog-toc-cta__text">
          {lang === "ta"
            ? "சென்னையில் ஃபார்முலேஷன், நிரப்புதல் மற்றும் பேக்கேஜிங் உள்ளிட்ட தெளிவான விவரங்கள் — 50 பாட்டில்கள் முதல்."
            : "Get an itemised scope covering formulation, filling, and packaging in Chennai — starting from 50 bottles."}
        </p>
        <Link href={SITE.ui.enquireHref} className="blog-toc-cta__button">
          {lang === "ta" ? "மதிப்பீட்டைக் கோருங்கள்" : "Request an estimate"}{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}
