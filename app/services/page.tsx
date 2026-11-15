import dynamic from "next/dynamic";
import { Button } from "@/components/Button";
import { FAQPageJsonLd } from "@/components/JsonLd";
import { PackageIllustration } from "@/components/illustrations";
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
      <header className="page-shell page-heading services-heading">
        <p className="eyebrow">{SITE.services.eyebrow}</p>
        <h1>{SITE.services.title}</h1>
        <p>{SITE.services.introduction}</p>
      </header>

      <div className="page-shell services-list">
        {SITE.services.items.map((service, index) => (
          <section
            aria-labelledby={`service-title-${service.number}`}
            className={`service-detail${index % 2 === 1 ? " service-detail--reversed" : ""}`}
            id={`service-${service.number}`}
            key={service.number}
          >
            <Reveal className="service-detail__copy">
              <p className="eyebrow service-detail__meta">{service.number} <span>·</span> {service.moq}</p>
              <h2 id={`service-title-${service.number}`}>{service.title}</h2>
              <p className="service-detail__description">{service.description}</p>
              <div className="service-detail__audience">
                <h3>{SITE.services.detailLabels.whoFor}</h3>
                <p>{service.whoFor}</p>
              </div>
              <div className="service-detail__included">
                <h3>{SITE.services.detailLabels.included}</h3>
                <ul>
                  {service.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </Reveal>
            <div aria-hidden="true" className="service-detail__art">
              <span className="service-detail__art-number">{service.number}</span>
              <PackageIllustration className="service-detail__illustration" name={service.illustration} />
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="services-guide-title" className="page-section service-guide">
        <div className="page-shell service-guide__inner">
          <Reveal>
            <p className="eyebrow">{SITE.services.decisionGuide.eyebrow}</p>
            <h2 id="services-guide-title">{SITE.services.decisionGuide.title}</h2>
            <div className="service-guide__rows">
              {SITE.services.decisionGuide.rows.map((row) => (
                <div className="service-guide__row" key={row.need}>
                  <span>{row.need}</span>
                  <span>{row.answer}</span>
                </div>
              ))}
            </div>
            <Button href={SITE.ui.enquireHref}>{SITE.services.decisionGuide.action}</Button>
          </Reveal>
          <span aria-hidden="true" className="service-guide__number">05</span>
        </div>
      </section>

      <section aria-labelledby="services-faq-title" className="page-section service-faq">
        <div className="page-shell service-faq__inner">
          <Reveal>
            <p className="eyebrow">{SITE.services.eyebrow}</p>
            <h2 id="services-faq-title">{SITE.services.faqHeading}</h2>
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
