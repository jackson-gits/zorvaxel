import dynamic from "next/dynamic";
import { Button } from "@/components/Button";
import { ImageSlot } from "@/components/ImageSlot";
import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const ProcessSteps = dynamic(() => import("@/components/ProcessSteps").then((module) => module.ProcessSteps));
const Reveal = dynamic(() => import("@/components/Reveal").then((module) => module.Reveal));
const RevealItem = dynamic(() => import("@/components/Reveal").then((module) => module.RevealItem));

export const metadata = createPageMetadata({
  title: SITE.seo.about.title,
  description: SITE.seo.about.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="page-main about-page" id="main-content">
      <header className="page-shell page-heading about-heading">
        <p className="eyebrow">{SITE.about.eyebrow}</p>
        <h1>{SITE.about.title}</h1>
        <p className="about-heading__story-label">{SITE.about.storyHeading}</p>
        <p className="about-heading__story">{SITE.about.story}</p>
      </header>

      <section aria-labelledby="about-principles-title" className="page-section about-principles">
        <div className="page-shell">
          <Reveal>
            <SectionHeader title={SITE.about.principlesHeading} titleId="about-principles-title" />
          </Reveal>
          <div className="about-principles__grid">
            {SITE.about.principles.map((principle) => (
              <RevealItem className="about-principle" key={principle.number}>
                <span aria-hidden="true" className="about-principle__number">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-process-title" className="page-section about-process">
        <div className="page-shell">
          <Reveal>
            <SectionHeader
              description={SITE.about.processDescription}
              title={SITE.about.processHeading}
              titleId="about-process-title"
            />
          </Reveal>
          <ProcessSteps items={SITE.home.process} label={SITE.about.processHeading} />
        </div>
      </section>

      <section aria-labelledby="about-facility-title" className="page-section about-facility">
        <div className="page-shell">
          <Reveal>
            <SectionHeader title={SITE.about.facilityHeading} titleId="about-facility-title" />
          </Reveal>
          <div className="about-facility__grid">
            <ImageSlot
              alt={SITE.about.facilityAlt}
              caption={SITE.about.facilityCaption}
              imageKey="facility"
            />
            <ImageSlot
              alt={SITE.about.facilityDetailAlt}
              caption={SITE.about.facilityCaption}
              imageKey="facilityDetail"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-values-title" className="page-section about-values">
        <div className="page-shell about-values__inner surface-dark">
          <Reveal>
            <p className="eyebrow">{SITE.about.valuesEyebrow}</p>
            <h2 id="about-values-title">{SITE.about.valuesHeading}</h2>
            <p className="about-values__copy">{SITE.about.valuesCopy}</p>
            <div className="about-values__action">
              <p className="about-values__prompt">{SITE.about.closing}</p>
              <Button href={SITE.ui.enquireHref}>{SITE.about.closingAction}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
