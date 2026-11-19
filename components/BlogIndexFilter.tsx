"use client";

import Link from "next/link";
import { startTransition, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BlogCard, type BlogCardData } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { DropperBottle } from "@/components/illustrations";
import type { BlogLocale } from "@/lib/blog";
import { SITE } from "@/lib/site";

type BlogIndexFilterProps = {
  posts?: BlogCardData[];
  enPosts?: BlogCardData[];
  taPosts?: BlogCardData[];
  initialLocale?: BlogLocale;
};

export function BlogIndexFilter({
  posts = [],
  enPosts,
  taPosts,
  initialLocale = "en",
}: BlogIndexFilterProps) {
  const [locale, setLocale] = useState<BlogLocale>(() => {
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "ta" || q === "en") return q;
    }
    return initialLocale;
  });

  useEffect(() => {
    const handlePopState = () => {
      const q = new URLSearchParams(window.location.search).get("lang");
      const nextLocale: BlogLocale = q === "ta" ? "ta" : "en";
      setLocale(nextLocale);
      setSelected(SITE.blog.i18n[nextLocale].allCategory);
      setSearchQuery("");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const i18n = SITE.blog.i18n[locale];
  const [selected, setSelected] = useState<string>(i18n.allCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const reduceMotion = useReducedMotion();

  // Active posts pool for the current language
  const activePosts = useMemo(() => {
    if (locale === "ta" && taPosts && taPosts.length > 0) return taPosts;
    if (locale === "en" && enPosts && enPosts.length > 0) return enPosts;
    return posts.filter((p) => (p.lang ? p.lang === locale : true));
  }, [locale, enPosts, taPosts, posts]);

  const categories = useMemo(() => [i18n.allCategory, ...i18n.categories], [i18n]);

  // Identify featured "Start here" post (foundation article on cost/launch)
  const featuredPost = useMemo(() => {
    return (
      activePosts.find((p) => p.slug.includes("cost") || p.slug.includes("launch")) ??
      activePosts[0] ??
      null
    );
  }, [activePosts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return activePosts.filter((post) => {
      const matchesCategory =
        selected === i18n.allCategory || post.category === selected;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activePosts, selected, searchQuery, i18n.allCategory]);

  // When browsing all categories and no active search, separate featured post from list
  const isDefaultView = selected === i18n.allCategory && !searchQuery.trim();
  const listPosts =
    isDefaultView && featuredPost
      ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
      : filteredPosts;

  const enCount = enPosts?.length ?? posts.filter((p) => p.lang === "en" || !p.lang).length;
  const taCount = taPosts?.length ?? posts.filter((p) => p.lang === "ta").length;
  const currentPostCount = locale === "ta" ? taCount : enCount;

  const handleLanguageChange = (newLocale: BlogLocale) => {
    startTransition(() => {
      setLocale(newLocale);
      setSelected(SITE.blog.i18n[newLocale].allCategory);
      setSearchQuery("");
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (newLocale === "ta") {
          url.searchParams.set("lang", "ta");
        } else {
          url.searchParams.delete("lang");
        }
        window.history.replaceState({}, "", url.toString());
      }
    });
  };

  return (
    <>
      {/* Editorial Magazine Hero Header */}
      <header className="page-shell blog-index-heading">
        <div className="blog-index-heading__badge-bar">
          <span className="blog-index-badge">
            <span className="blog-index-badge__pulse" aria-hidden="true" />
            {locale === "ta"
              ? `நேரடி ஆய்வக வெளியீடு · ${currentPostCount} நடைமுறைக் குறிப்புகள்`
              : `DIRECT LAB PUBLICATION · ${currentPostCount} PRACTICAL NOTES`}
          </span>
          <span className="blog-index-heading__location">{i18n.locationTag}</span>
        </div>
        <h1 className="blog-index-heading__title">
          {i18n.heroTitle}
        </h1>
        <p className="blog-index-heading__intro">
          {i18n.heroIntro}
        </p>
      </header>

      {/* Filter Bar, Language Switcher, Featured Card & Article Results */}
      <section aria-label={i18n.categoryFilterLabel} className="page-section blog-index-section">
        <div className="page-shell">
          <div className="blog-index-filter">
            {/* Language Switcher Bar: English | தமிழ் */}
            <div className="blog-lang-bar">
              <div aria-label={i18n.langSwitchLabel} className="blog-lang-tabs" role="radiogroup">
                <button
                  aria-checked={locale === "en"}
                  className={`blog-lang-tab${locale === "en" ? " is-active" : ""}`}
                  onClick={() => handleLanguageChange("en")}
                  role="radio"
                  type="button"
                >
                  <span className="blog-lang-tab__flag" aria-hidden="true">EN</span>
                  <span>English</span>
                  <span className="blog-lang-tab__badge">{enCount}</span>
                </button>
                <button
                  aria-checked={locale === "ta"}
                  className={`blog-lang-tab${locale === "ta" ? " is-active" : ""}`}
                  onClick={() => handleLanguageChange("ta")}
                  role="radio"
                  type="button"
                >
                  <span className="blog-lang-tab__flag" aria-hidden="true">தமிழ்</span>
                  <span>தமிழ் (Tamil)</span>
                  <span className="blog-lang-tab__badge">{taCount}</span>
                </button>
              </div>
              <span className="blog-lang-hint">
                {locale === "ta"
                  ? "தமிழ் மொழியில் படிக்கிறீர்கள் · Tamil translation active"
                  : "Tamil translations available · தமிழில் வாசிக்கவும்"}
              </span>
            </div>

            {/* Category Navigation & Search Control Bar */}
            <div className="blog-filter-bar">
              <div aria-label={i18n.categoryFilterLabel} className="blog-filter-tabs" role="group">
                {categories.map((category) => {
                  const isActive = selected === category;
                  const count =
                    category === i18n.allCategory
                      ? activePosts.length
                      : activePosts.filter((p) => p.category === category).length;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={`blog-filter-tabs__tab${isActive ? " is-active" : ""}`}
                      key={category}
                      onClick={() => {
                        startTransition(() => {
                          setSelected(category);
                        });
                      }}
                      type="button"
                    >
                      {isActive && !reduceMotion && (
                        <motion.span
                          layoutId="activeFilterTabPill"
                          className="blog-filter-tabs__active-pill"
                          transition={{
                            type: "spring",
                            stiffness: 480,
                            damping: 38,
                          }}
                        />
                      )}
                      <span className="blog-filter-tabs__tab-text">
                        {category}
                        <span className="blog-filter-tabs__count">{count}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="blog-filter-actions">
                {/* Search Box */}
                <div className="blog-search-box">
                  <span className="blog-search-icon" aria-hidden="true">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="search"
                    aria-label="Search notes"
                    placeholder={i18n.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => {
                      const val = e.target.value;
                      startTransition(() => {
                        setSearchQuery(val);
                      });
                    }}
                    className="blog-search-input"
                  />
                  <AnimatePresence>
                    {searchQuery ? (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.15 }}
                        type="button"
                        className="blog-search-clear"
                        onClick={() => {
                          startTransition(() => {
                            setSearchQuery("");
                          });
                        }}
                        aria-label="Clear search"
                      >
                        ×
                      </motion.button>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* View Mode Toggle: Grid vs List */}
                <div className="blog-view-toggle" role="group" aria-label="Layout view mode">
                  <button
                    type="button"
                    aria-pressed={viewMode === "grid"}
                    className={`blog-view-toggle__btn${viewMode === "grid" ? " is-active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                    aria-label="Magazine grid view"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-pressed={viewMode === "list"}
                    className={`blog-view-toggle__btn${viewMode === "list" ? " is-active" : ""}`}
                    onClick={() => setViewMode("list")}
                    title="List view"
                    aria-label="Editorial list view"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured "Start Here" Card (Navy Editorial Hero Card with Split Layout) */}
            {isDefaultView && featuredPost ? (
              <div className="blog-featured-card blog-featured-card--navy">
                <div className="blog-featured-card__split">
                  {/* Left Content Column */}
                  <div className="blog-featured-card__left">
                    <div className="blog-featured-card__badge-row">
                      <span className="blog-featured-card__badge">{i18n.startHereBadge}</span>
                      <span className="blog-featured-card__issue">
                        {locale === "ta" ? "குறிப்பு #01" : "NOTE #01"}
                      </span>
                    </div>
                    <Link
                      href={locale === "ta" ? `/blog/${featuredPost.slug}?lang=ta` : `/blog/${featuredPost.slug}`}
                      className="blog-featured-card__link"
                    >
                      <div className="blog-featured-card__meta">
                        <span className="category-pill category-pill--launch">{featuredPost.category}</span>
                        <time dateTime={featuredPost.date}>{featuredPost.displayDate ?? featuredPost.date}</time>
                        <span>·</span>
                        <span>{featuredPost.readingTime}</span>
                      </div>
                      <h2 className="blog-featured-card__title">{featuredPost.title}</h2>
                      <p className="blog-featured-card__excerpt">{featuredPost.excerpt}</p>
                      
                      {/* Visual Number Highlights */}
                      <div className="blog-featured-card__highlights">
                        <div className="blog-featured-card__stat">
                          <span className="blog-featured-card__stat-val">₹200–₹300</span>
                          <span className="blog-featured-card__stat-lbl">
                            {locale === "ta" ? "ஒரு பாட்டில் மதிப்பீடு" : "unit estimate"}
                          </span>
                        </div>
                        <div className="blog-featured-card__stat-divider" aria-hidden="true" />
                        <div className="blog-featured-card__stat">
                          <span className="blog-featured-card__stat-val">₹60K–₹90K</span>
                          <span className="blog-featured-card__stat-lbl">
                            {locale === "ta" ? "300 பாட்டில் தயாரிப்பு" : "300-bottle run"}
                          </span>
                        </div>
                        <div className="blog-featured-card__stat-divider" aria-hidden="true" />
                        <div className="blog-featured-card__stat">
                          <span className="blog-featured-card__stat-val">₹5K–₹20K</span>
                          <span className="blog-featured-card__stat-lbl">
                            {locale === "ta" ? "R&D / ஃபார்முலேஷன்" : "R&D / testing"}
                          </span>
                        </div>
                      </div>

                      <div className="blog-featured-card__action-row">
                        <span className="blog-featured-card__cta">
                          {i18n.readGuide} <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Right Architectural Visual Column */}
                  <div className="blog-featured-card__right" aria-hidden="true">
                    <div className="blog-featured-card__blueprint">
                      <div className="blog-featured-card__tech-badge">
                        {locale === "ta" ? "சென்னை ஆய்வகம் · 50 பாட்டில் குறைந்தபட்சம்" : "CHENNAI LAB · 50 UNIT MINIMUM"}
                      </div>
                      <DropperBottle className="blog-featured-card__svg" />
                      <div className="blog-featured-card__spec-notes">
                        <div className="spec-line">
                          <span>{locale === "ta" ? "விவரம்:" : "SPEC:"}</span> 30ml Amber Glass
                        </div>
                        <div className="spec-line">
                          <span>{locale === "ta" ? "மூடி:" : "CLOSURE:"}</span> Pipette 0.8ml
                        </div>
                        <div className="spec-line">
                          <span>{locale === "ta" ? "நிலை:" : "STATUS:"}</span> {locale === "ta" ? "சரிபார்க்கப்பட்டது" : "Verified arithmetic"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Article List / Magazine Grid */}
            <div aria-live="polite" className="blog-index-filter__results">
              {filteredPosts.length ? (
                <div className={viewMode === "grid" ? "blog-editorial-grid" : "blog-editorial-list"}>
                  <AnimatePresence initial={false} mode="popLayout">
                    {listPosts.map((post) => (
                      <motion.div
                        key={`${post.slug}-${post.lang ?? "en"}`}
                        layout={!reduceMotion}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                        transition={{
                          opacity: { duration: reduceMotion ? 0.12 : 0.2 },
                          y: { duration: reduceMotion ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] },
                          layout: { duration: reduceMotion ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] },
                        }}
                      >
                        <BlogCard post={post} layout={viewMode === "grid" ? "card" : "row"} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="blog-empty">
                  <p>{i18n.noResults} "{searchQuery}".</p>
                  <button
                    type="button"
                    className="button button--secondary"
                    onClick={() => {
                      setSelected(i18n.allCategory);
                      setSearchQuery("");
                    }}
                  >
                    {locale === "ta" ? "வடிகட்டிகளை மீட்டமை" : "Reset filters"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grounding Navy CTA Section */}
      <section className="page-section blog-index-cta blog-index-cta--navy">
        <div className="page-shell blog-index-cta__inner">
          <div className="blog-index-cta__copy">
            <span className="eyebrow eyebrow--light">{i18n.ctaEyebrow}</span>
            <h2>{i18n.ctaTitle}</h2>
            <p>{i18n.ctaDesc}</p>
          </div>
          <Button href={SITE.ui.enquireHref} className="blog-index-cta__button">
            {i18n.ctaAction}
          </Button>
        </div>
      </section>
    </>
  );
}
