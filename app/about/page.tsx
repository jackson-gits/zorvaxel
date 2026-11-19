import dynamic from "next/dynamic";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { AboutHeroStats } from "@/components/about/AboutHeroStats";
import { AboutComparison } from "@/components/about/AboutComparison";
import { AboutCleanroomSection } from "@/components/about/AboutCleanroomSection";
import { AboutAudienceGrid } from "@/components/about/AboutAudienceGrid";
import { ChennaiMapVisual } from "@/components/about/ChennaiMapVisual";

const Reveal = dynamic(() => import("@/components/Reveal").then((module) => module.Reveal));
const RevealItem = dynamic(() => import("@/components/Reveal").then((module) => module.RevealItem));

export const metadata = createPageMetadata({
  title: SITE.seo.about.title,
  description: SITE.seo.about.description,
  path: "/about",
});

export default function AboutPage() {
  const { about } = SITE;

  return (
    <main className="page-main about-page" id="main-content">
      {/* Chapter 1: Hero Mission */}
      <header className="page-section about-hero">
        <div className="page-shell">
          <p className="eyebrow">{about.eyebrow}</p>
          <h1 className="about-hero__title">{about.title}</h1>
          <p className="about-hero__subtitle">{about.subtitle}</p>

          <div className="about-hero__tags">
            <span className="about-hero__pill">
              <span className="about-hero__dot" aria-hidden="true" />
              Direct Bench Access
            </span>
            <span className="about-hero__pill">ISO 8 Cleanroom</span>
            <span className="about-hero__pill">50-Unit Pilot Minimum</span>
            <span className="about-hero__pill">100% Brand IP Ownership</span>
          </div>
        </div>
      </header>

      {/* Chapter 2: The Giant Stats Hero Band (Deep Navy Strip, Cream Numerals) */}
      <AboutHeroStats />

      {/* Chapter 3: The Problem We Solve (Status Quo vs Zorvaxel Dramatic Comparison) */}
      <section aria-labelledby="about-origin-title" className="page-section about-origin">
        <div className="page-shell">
          <Reveal>
            <SectionHeader
              description={about.originDescription}
              title={about.originHeading}
              titleId="about-origin-title"
            />
          </Reveal>

          <AboutComparison />
        </div>
      </section>

      {/* Chapter 4: Cleanroom & Laboratory Standards with Real Photography */}
      <AboutCleanroomSection />

      {/* Chapter 5: Who We Work With (Differentiated Audience Cards) */}
      <AboutAudienceGrid />

      {/* Chapter 6: Operating Principles */}
      <section aria-labelledby="about-principles-title" className="page-section about-principles">
        <div className="page-shell">
          <Reveal>
            <SectionHeader
              title={about.principlesHeading}
              titleId="about-principles-title"
            />
          </Reveal>

          <div className="about-principles__grid">
            {about.principles.map((principle, i) => (
              <RevealItem className="about-principle" delay={i * 0.08} key={principle.number}>
                <span aria-hidden="true" className="about-principle__number tabular-nums">
                  {principle.number}
                </span>
                <h3 className="about-principle__title">{principle.title}</h3>
                <p className="about-principle__desc">{principle.description}</p>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 7: Chennai Facility & Logistics Hub (Visual Map + Docked Fact Card) */}
      <ChennaiMapVisual />

      {/* Chapter 8: Deep Closing Call to Action */}
      <section aria-labelledby="about-closing-title" className="page-section about-closing">
        <div className="page-shell">
          <div className="about-closing__inner surface-dark">
            <Reveal>
              <p className="eyebrow">{about.closingEyebrow}</p>
              <h2 id="about-closing-title" className="about-closing__title">
                {about.closingHeading}
              </h2>
              <p className="about-closing__copy">{about.closingCopy}</p>
              <div className="about-closing__actions">
                <Button href={SITE.ui.enquireHref}>{about.closingAction}</Button>
                <a className="about-closing__link" href="/services">
                  <span>{about.secondaryAction}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
