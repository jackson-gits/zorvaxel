import Link from "next/link";
import { SITE } from "@/lib/site";

type AudienceCardData = {
  tag: string;
  title: string;
  description: string;
  ctaText: string;
  href: string;
  theme: "clinic" | "founder" | "brand";
  badge: string;
  highlights: string[];
};

const AUDIENCES: AudienceCardData[] = [
  {
    tag: "CLINICAL PRACTICE",
    title: "Dermatologists & Aesthetic Clinics",
    badge: "50 Units / Clinic Branch",
    description:
      "Custom-branded post-peel, calming, and active antioxidant serums formulated for clinic patients. Prescribe your own clinic-branded skincare without holding thousands of bottles in inventory.",
    highlights: ["Custom clinic branding", "Post-procedure actives", "Zero shelf expiration waste"],
    ctaText: "Enquire for Clinics",
    href: "/contact?audience=clinics",
    theme: "clinic",
  },
  {
    tag: "MARKET VALIDATION",
    title: "Indie Beauty Founders",
    badge: "Zero Inventory Risk",
    description:
      "Validate your hero SKU, gather verified customer reviews, and test repeat purchase rates before raising outside capital or committing to industrial factory runs.",
    highlights: ["True 50-unit pilot batch", "Ready formula library", "CDSCO dieline guidance"],
    ctaText: "Enquire for Founders",
    href: "/contact?audience=founders",
    theme: "founder",
  },
  {
    tag: "AGILE R&D",
    title: "Growing D2C Brands",
    badge: "7-Day Dispatch",
    description:
      "Launch seasonal formulations, limited micro-drops, or VIP influencer gift batches in days—without disrupting your primary high-volume contract manufacturer's queue.",
    highlights: ["Agile micro-drops", "Parallel batch filling", "High-speed air dispatch"],
    ctaText: "Enquire for Brands",
    href: "/contact?audience=brands",
    theme: "brand",
  },
];

export function AboutAudienceGrid() {
  const { about } = SITE;

  return (
    <section aria-labelledby="about-partners-title" className="page-section about-partners">
      <div className="page-shell">
        <div className="about-partners__header">
          <p className="eyebrow">{about.partnersEyebrow}</p>
          <h2 id="about-partners-title" className="about-partners__heading">
            {about.partnersHeading}
          </h2>
          <p className="about-partners__lead">{about.partnersDescription}</p>
        </div>

        <div className="about-audience-grid">
          {AUDIENCES.map((item) => (
            <div
              className={`about-audience-card about-audience-card--${item.theme}`}
              key={item.theme}
            >
              {/* Card Header with Custom Themed Icon */}
              <div className="about-audience-card__top">
                <span className="about-audience-card__tag">{item.tag}</span>
                <div className="about-audience-card__icon-wrap">
                  {item.theme === "clinic" && (
                    <svg
                      aria-hidden="true"
                      className="about-audience-card__icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8.25v7.5M8.25 12h7.5"
                      />
                    </svg>
                  )}
                  {item.theme === "founder" && (
                    <svg
                      aria-hidden="true"
                      className="about-audience-card__icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.942A4.5 4.5 0 0115.89 16.5H8.11a4.5 4.5 0 01-2.34-.658L4.2 14.9"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                      />
                    </svg>
                  )}
                  {item.theme === "brand" && (
                    <svg
                      aria-hidden="true"
                      className="about-audience-card__icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <span className="about-audience-card__badge">{item.badge}</span>
              <h3 className="about-audience-card__title">{item.title}</h3>
              <p className="about-audience-card__desc">{item.description}</p>

              <ul className="about-audience-card__highlights" role="list">
                {item.highlights.map((highlight) => (
                  <li className="about-audience-card__highlight-item" key={highlight}>
                    <span aria-hidden="true" className="about-audience-card__dot" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="about-audience-card__footer">
                <Link className="about-audience-card__link" href={item.href}>
                  <span>{item.ctaText}</span>
                  <span aria-hidden="true" className="about-audience-card__arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
