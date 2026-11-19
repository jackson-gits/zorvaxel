import type { ReactNode } from "react";
import { PackageIllustration, type IllustrationName } from "@/components/illustrations";

/* -------------------------------------------------------------------------- */
/* Stat Grid & Pull Numbers                                                   */
/* -------------------------------------------------------------------------- */
export type StatItem = {
  value: string;
  label: string;
  note?: string;
  tag?: string;
};

export function StatGrid({
  items = [],
  columns = 2,
  caption,
  children,
}: {
  items?: StatItem[];
  columns?: 2 | 3 | 4;
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <figure className="article-stat-figure">
      {caption && <figcaption className="article-stat-caption">{caption}</figcaption>}
      <div className={`article-stat-grid article-stat-grid--cols-${columns}`}>
        {children
          ? children
          : items?.map((item, idx) => (
              <div className="article-stat-card" key={idx}>
                {item.tag && <span className="article-stat-card__tag">{item.tag}</span>}
                <div className="article-stat-card__value">{item.value}</div>
                <div className="article-stat-card__label">{item.label}</div>
                {item.note && <div className="article-stat-card__note">{item.note}</div>}
              </div>
            ))}
      </div>
    </figure>
  );
}

export function StatCard({
  value,
  label,
  note,
  tag,
}: {
  value: string;
  label: string;
  note?: string;
  tag?: string;
}) {
  return (
    <div className="article-stat-card article-stat-card--standalone">
      {tag && <span className="article-stat-card__tag">{tag}</span>}
      <div className="article-stat-card__value">{value}</div>
      <div className="article-stat-card__label">{label}</div>
      {note && <div className="article-stat-card__note">{note}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Callout Boxes                                                              */
/* -------------------------------------------------------------------------- */
type CalloutType = "takeaway" | "warning" | "tip" | "scope" | "quote";

export function Callout({
  type = "takeaway",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const titles: Record<CalloutType, string> = {
    takeaway: "KEY FOUNDER TAKEAWAY",
    warning: "WHAT TO WATCH OUT FOR",
    tip: "PRACTICAL LAB TIP",
    scope: "SCOPE CHECKLIST",
    quote: "FOUNDER NOTE",
  };

  return (
    <aside
      aria-label={title || titles[type]}
      className={`article-callout article-callout--${type}`}
    >
      <div className="article-callout__header">
        <span className="article-callout__icon" aria-hidden="true">
          {type === "warning" ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 3.5l7 13H3l7-13zM10 8.5v3.5M10 14.5h.01" />
            </svg>
          ) : type === "tip" ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 2.5a5.5 5.5 0 00-3.5 9.7V14a1 1 0 001 1h5a1 1 0 001-1v-1.8A5.5 5.5 0 0010 2.5zM8 17.5h4" />
            </svg>
          ) : type === "scope" ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h12M4 10h12M4 15h7" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5l3.5 3.5 7.5-8" />
            </svg>
          )}
        </span>
        <span className="article-callout__title">{title || titles[type]}</span>
      </div>
      <div className="article-callout__content">{children}</div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Comparison Table                                                           */
/* -------------------------------------------------------------------------- */
export type ComparisonColumn = {
  key: string;
  header: string;
  width?: string;
  highlight?: boolean;
};

export function ComparisonTable({
  title,
  subtitle,
  columns = [],
  rows = [],
  children,
}: {
  title?: string;
  subtitle?: string;
  columns?: ComparisonColumn[];
  rows?: Record<string, string | ReactNode>[];
  children?: ReactNode;
}) {
  return (
    <div className="article-table-wrapper">
      {(title || subtitle) && (
        <div className="article-table-header">
          {title && <h4 className="article-table-title">{title}</h4>}
          {subtitle && <p className="article-table-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="article-table-scroll" tabIndex={0} role="region" aria-label={title || "Comparison table"}>
        {children ? (
          children
        ) : (
          <table className="article-table">
            {columns && columns.length > 0 && (
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      style={col.width ? { width: col.width } : undefined}
                      className={col.highlight ? "article-table__th--highlight" : undefined}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows?.map((row, rIdx) => (
                <tr key={rIdx}>
                  {columns?.map((col) => (
                    <td
                      key={col.key}
                      className={col.highlight ? "article-table__td--highlight" : undefined}
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Editorial Pull Quote                                                       */
/* -------------------------------------------------------------------------- */
export function PullQuote({
  quote,
  attribution,
  role,
}: {
  quote: string;
  attribution?: string;
  role?: string;
}) {
  return (
    <blockquote className="article-pull-quote">
      <span className="article-pull-quote__mark" aria-hidden="true">“</span>
      <p className="article-pull-quote__text">{quote}</p>
      {(attribution || role) && (
        <cite className="article-pull-quote__cite">
          {attribution && <span className="article-pull-quote__author">{attribution}</span>}
          {role && <span className="article-pull-quote__role">{role}</span>}
        </cite>
      )}
    </blockquote>
  );
}

/* -------------------------------------------------------------------------- */
/* Sources Block (Deliberate Trust Signal)                                    */
/* -------------------------------------------------------------------------- */
export type SourceItem = {
  title: string;
  url: string;
  publisher?: string;
  date?: string;
  note?: string;
};

export function SourcesBlock({
  sources = [],
  disclaimer,
  children,
}: {
  sources?: SourceItem[];
  disclaimer?: string;
  children?: ReactNode;
}) {
  return (
    <section className="article-sources-block" aria-labelledby="sources-heading">
      <div className="article-sources-block__header">
        <div className="article-sources-block__badge">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          VERIFIED INDUSTRY REFERENCES
        </div>
        <h3 id="sources-heading" className="article-sources-block__title">
          Sources & Data Points
        </h3>
      </div>
      {children ? (
        children
      ) : (
        <ol className="article-sources-list">
          {sources.map((src, idx) => (
            <li className="article-source-item" key={idx}>
              <div className="article-source-item__content">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="article-source-item__link"
                >
                  <span>{src.title}</span>
                  <span className="article-source-item__arrow" aria-hidden="true">↗</span>
                </a>
                <div className="article-source-item__meta">
                  {src.publisher && <span className="article-source-item__pub">{src.publisher}</span>}
                  {src.date && <time dateTime={src.date}>{src.date}</time>}
                </div>
                {src.note && <p className="article-source-item__note">{src.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}
      {disclaimer && <p className="article-sources-block__disclaimer">{disclaimer}</p>}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Article Illustration Card                                                  */
/* -------------------------------------------------------------------------- */
export function ArticleIllustration({
  name,
  caption,
  specNote,
}: {
  name: IllustrationName;
  caption?: string;
  specNote?: string;
}) {
  return (
    <figure className="article-illustration-card">
      <div className="article-illustration-card__canvas">
        <PackageIllustration name={name} className="article-illustration-card__svg" />
        {specNote && <div className="article-illustration-card__spec">{specNote}</div>}
      </div>
      {caption && <figcaption className="article-illustration-card__caption">{caption}</figcaption>}
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* Checklist                                                                  */
/* -------------------------------------------------------------------------- */
export function Checklist({
  title,
  items = [],
  children,
}: {
  title?: string;
  items?: string[];
  children?: ReactNode;
}) {
  return (
    <div className="article-checklist">
      {title && <h4 className="article-checklist__title">{title}</h4>}
      {children ? (
        children
      ) : (
        <ul className="article-checklist__list">
          {items.map((item, idx) => (
            <li className="article-checklist__item" key={idx}>
              <span className="article-checklist__box" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-6" />
                </svg>
              </span>
              <span className="article-checklist__text">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
