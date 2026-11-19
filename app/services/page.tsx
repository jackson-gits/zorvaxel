import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/Button";
import { FAQPageJsonLd } from "@/components/JsonLd";
import { ServiceVisualCard } from "@/components/ServiceVisualCard";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const Reveal = dynamic(() => import("@/components/Reveal").then((module) => module.Reveal));

export const metadata = createPageMetadata({
  title: SITE.seo.services.title,
  description: SITE.seo.services.description,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="page-main services-page" id="main-content">
      <FAQPageJsonLd questions={SITE.services.faq} />

      {/* ============================================================ */}
      {/* 1. HERO & QUICK JUMP NAVIGATION                             */}
      {/* ============================================================ */}
      <header className="page-shell page-heading services-heading">
        <p className="eyebrow">{SITE.services.eyebrow}</p>
        <h1 className="services-heading__title">
          Five modular services.<br />
          Start with the batch you actually need.
        </h1>
        <p className="services-heading__intro">{SITE.services.introduction}</p>

        {/* Quick jump navigation */}
        <nav aria-label="Jump to a service" className="services-jump">
          <p className="services-jump__label">Explore by service</p>
          <ol className="services-jump__list">
            {SITE.services.items.map((service) => (
              <li key={service.number}>
                <a className="services-jump__link" href={`#service-${service.number}`}>
                  <span className="services-jump__number">{service.number}</span>
                  <span className="services-jump__title">{service.title}</span>
                  <span className="services-jump__moq">{service.moq}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {/* ============================================================ */}
      {/* 2. TRUST METRICS STRIP                                       */}
      {/* ============================================================ */}
      <section aria-label="Facility trust metrics" className="services-metrics-strip">
        <div className="page-shell">
          <div className="services-metrics-strip__grid">
            {SITE.services.metrics.map((metric) => (
              <div className="services-metrics-strip__item" key={metric.label}>
                <div className="services-metrics-strip__value-row">
                  <span className="services-metrics-strip__value">{metric.value}</span>
                  <span className="services-metrics-strip__unit">{metric.unit}</span>
                </div>
                <span className="services-metrics-strip__label">{metric.label}</span>
                <span className="services-metrics-strip__detail">{metric.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PROCESS STRIP: HOW IT WORKS                               */}
      {/* ============================================================ */}
      <section aria-labelledby="services-process-heading" className="services-process-strip">
        <div className="page-shell">
          <Reveal>
            <div className="services-process-strip__header">
              <div>
                <p className="eyebrow">WORKFLOW & TIMELINE</p>
                <h2 id="services-process-heading" className="services-process-strip__title">
                  From brief to dispatched batch in five clear steps.
                </h2>
              </div>
              <p className="services-process-strip__note">
                Average pilot lead time: <strong>7 working days</strong> with direct lab updates.
              </p>
            </div>

            <ol className="services-process-strip__timeline">
              {SITE.services.processStrip.map((item) => (
                <li className="services-process-strip__step" key={item.step}>
                  <div className="services-process-strip__step-top">
                    <span className="services-process-strip__step-num">{item.step}</span>
                    <span className="services-process-strip__step-time">{item.time}</span>
                  </div>
                  <h3 className="services-process-strip__step-name">{item.name}</h3>
                  <p className="services-process-strip__step-detail">{item.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SERVICES LIST (WITH CONSTRUCTIVIST RHYTHM & PRICING STRIP) */}
      {/* ============================================================ */}
      <div className="services-list-container">
        {SITE.services.items.map((service, index) => {
          const isReversed = index % 2 === 1;
          const isFullBleedDark = Boolean(service.fullBleed);

          return (
            <div key={service.number}>
              {/* If this is Service 03, insert the Pricing Model Strip right above it! */}
              {service.number === "03" ? (
                <section
                  aria-labelledby="services-pricing-title"
                  className="services-pricing-section"
                >
                  <div className="page-shell">
                    <Reveal>
                      <div className="services-pricing-section__header">
                        <p className="eyebrow">TRANSPARENT PRICING STRUCTURE</p>
                        <h2 id="services-pricing-title">
                          Three straightforward ways we charge. No surprise line fees.
                        </h2>
                        <p className="services-pricing-section__intro">
                          Whether validating your first formula or outsourcing contract cleanroom runs, you only pay for the exact deliverable you choose.
                        </p>
                      </div>

                      <div className="services-pricing-section__grid">
                        {SITE.services.pricingModels.map((pricing) => (
                          <div
                            className="services-pricing-card"
                            key={pricing.model}
                          >
                            <div className="services-pricing-card__header">
                              <span className="services-pricing-card__badge">{pricing.badge}</span>
                              <span className="services-pricing-card__model">{pricing.model}</span>
                            </div>
                            <h3 className="services-pricing-card__title">{pricing.title}</h3>
                            <p className="services-pricing-card__desc">{pricing.description}</p>
                            <div className="services-pricing-card__footer">
                              <span className="services-pricing-card__highlight">{pricing.highlight}</span>
                              <span className="services-pricing-card__detail">{pricing.detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </section>
              ) : null}

              {/* Service Detail Section */}
              <section
                aria-labelledby={`service-title-${service.number}`}
                className={`service-detail-block${
                  isFullBleedDark ? " service-detail-block--dark" : ""
                }`}
                id={`service-${service.number}`}
              >
                <div
                  className={`page-shell service-detail${
                    isReversed ? " service-detail--reversed" : ""
                  }`}
                >
                  {/* Left or Right: Editorial Text Copy */}
                  <Reveal className="service-detail__copy">
                    <div className="service-detail__topline">
                      <span className="service-detail__meta-num">{service.number}</span>
                      <span className="service-detail__moq-badge">{service.moq}</span>
                      <span className="service-detail__pricing-tag">{service.pricingTag}</span>
                    </div>

                    <h2 id={`service-title-${service.number}`}>{service.title}</h2>
                    <p className="service-detail__lead">{service.shortDescription}</p>
                    <p className="service-detail__description">{service.description}</p>

                    <div className="service-detail__facts">
                      {/* Tinted "Who it's for" card block */}
                      <div className="service-detail__who-card">
                        <div className="service-detail__who-header">
                          <span className="service-detail__who-badge">BEST FIT</span>
                          <span className="service-detail__who-tag">{service.audienceTag}</span>
                        </div>
                        <p className="service-detail__who-text">
                          &ldquo;{service.whoFor}&rdquo;
                        </p>
                      </div>

                      {/* Scannable "What's included" 2-column checklist */}
                      <div className="service-detail__included-block">
                        <h3 className="service-detail__included-heading">
                          {SITE.services.detailLabels.included}
                        </h3>
                        <ul className="service-detail__checklist">
                          {service.included.map((item) => (
                            <li className="service-detail__checklist-item" key={item}>
                              <span aria-hidden="true" className="service-detail__check-icon">
                                <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Upgraded Solid Primary CTA + Direct Dialogue */}
                    <div className="service-detail__actions">
                      <Button
                        className="service-detail__primary-btn"
                        href={`${SITE.ui.enquireHref}?service=${service.number}`}
                        variant={isFullBleedDark ? "amber" : "primary"}
                      >
                        Discuss this service
                      </Button>
                      <Link
                        className="service-detail__secondary-link"
                        href={`${SITE.ui.enquireHref}?service=${service.number}`}
                      >
                        <span>Ask about batch lead time</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </Reveal>

                  {/* Left or Right: Visual Card with Real Product Shot & Big Numeral */}
                  <div className="service-detail__art-col">
                    <ServiceVisualCard
                      highlightTag={service.moq === "No MOQ" ? "NO MOQ · 50 UNITS" : service.moq}
                      illustration={service.illustration}
                      image={service.image}
                      isDarkSection={isFullBleedDark}
                      number={service.number}
                      spec={service.spec}
                      title={service.title}
                      turnaround={service.turnaround}
                    />
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 5. DECISION GUIDE                                           */}
      {/* ============================================================ */}
      <section aria-labelledby="services-guide-title" className="page-section service-guide">
        <div className="page-shell service-guide__inner surface-dark">
          <Reveal>
            <p className="eyebrow">{SITE.services.decisionGuide.eyebrow}</p>
            <h2 id="services-guide-title">{SITE.services.decisionGuide.title}</h2>
            <p className="service-guide__intro">
              Tell us where you are in the process and we&apos;ll point you to the right starting point.
            </p>
            <div className="service-guide__rows" role="list">
              {SITE.services.decisionGuide.rows.map((row) => (
                <Link
                  className="service-guide__row service-guide__row--link"
                  href={row.href}
                  key={row.need}
                  role="listitem"
                >
                  <span className="service-guide__need">{row.need}</span>
                  <span className="service-guide__answer">
                    <span>{row.answer}</span>
                    <span aria-hidden="true" className="service-guide__arrow">→</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="service-guide__actions">
              <Button href={SITE.ui.enquireHref} variant="amber">
                {SITE.services.decisionGuide.action}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PRACTICAL FAQ                                            */}
      {/* ============================================================ */}
      <section aria-labelledby="services-faq-title" className="page-section service-faq">
        <div className="page-shell service-faq__inner">
          <Reveal>
            <div className="service-faq__header">
              <p className="eyebrow">{SITE.services.eyebrow}</p>
              <h2 id="services-faq-title">{SITE.services.faqHeading}</h2>
              <p className="service-faq__intro">
                Clear answers on quantities, timelines, pricing, compliance, and what to send for a quote.
              </p>
            </div>
            <div className="service-faq__items">
              {SITE.services.faq.map((item) => (
                <details className="service-faq__item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
