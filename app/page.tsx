import dynamic from "next/dynamic";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { DropperBottle } from "@/components/illustrations/DropperBottle";
import { Marquee } from "@/components/Marquee";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceRow } from "@/components/ServiceRow";
import { TextLink } from "@/components/TextLink";
import { getLatestPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const ProcessSteps = dynamic(() => import("@/components/ProcessSteps").then((module) => module.ProcessSteps));
const Reveal = dynamic(() => import("@/components/Reveal").then((module) => module.Reveal));
const RevealItem = dynamic(() => import("@/components/Reveal").then((module) => module.RevealItem));
const WordReveal = dynamic(() => import("@/components/WordReveal").then((module) => module.WordReveal));

export const metadata = createPageMetadata({
  title: SITE.seo.home.title,
  description: SITE.seo.home.description,
  path: "/",
});

export default function HomePage() {
  const latestPosts = getLatestPosts(3);

  return (
    <main className="page-main" id="main-content">
      <LocalBusinessJsonLd />
      <section aria-labelledby="home-title" className="home-hero">
        <div className="page-shell home-hero__inner">
          <div className="home-hero__copy">
            <p className="eyebrow home-hero__eyebrow">{SITE.home.hero.label}</p>
            <h1 className="home-hero__title" id="home-title">
              <WordReveal text={SITE.home.hero.title} />
            </h1>
            <p className="home-hero__supporting">{SITE.home.hero.supporting}</p>
            <div className="home-hero__actions">
              <Button href={SITE.ui.enquireHref}>{SITE.home.hero.primaryAction}</Button>
              <TextLink href="/services">{SITE.home.hero.secondaryAction}</TextLink>
            </div>
          </div>
          <div className="home-hero__art" aria-hidden="true">
            <div className="home-hero__panel">
              <span className="home-hero__spec">{SITE.home.hero.spec}</span>
              <DropperBottle animate className="home-hero__dropper" />
              <span className="home-hero__panel-note">{SITE.home.hero.panelNote}</span>
            </div>
          </div>
        </div>
      </section>

      <Marquee accessibleLabel={SITE.shortDescription} items={SITE.home.marquee} />

      <section aria-labelledby="home-services-title" className="page-section home-services">
        <div className="page-shell">
          <Reveal as="section" className="home-section-intro">
            <SectionHeader title={SITE.home.servicesHeading} titleId="home-services-title" />
            <TextLink href="/services">{SITE.home.servicesLink}</TextLink>
          </Reveal>
          <div className="home-services__list">
            {SITE.services.items.map((service) => (
              <RevealItem key={service.number}>
                <ServiceRow service={service} />
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-process-title" className="page-section home-process">
        <div className="page-shell">
          <Reveal className="home-process__intro">
            <SectionHeader
              description={SITE.home.processDescription}
              number="01"
              title={SITE.home.processHeading}
              titleId="home-process-title"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ProcessSteps items={SITE.home.process} label={SITE.home.processHeading} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="home-small-batch-title" className="home-no-moq">
        <div className="page-shell home-no-moq__inner">
          <Reveal>
            <p className="eyebrow">{SITE.home.noMoq.label}</p>
            <h2 id="home-small-batch-title">{SITE.home.noMoq.title}</h2>
            <TextLink href={SITE.ui.enquireHref}>{SITE.home.noMoq.action}</TextLink>
          </Reveal>
          <span aria-hidden="true" className="home-no-moq__index">50</span>
        </div>
      </section>

      <section aria-labelledby="home-notes-title" className="page-section home-notes">
        <div className="page-shell">
          <Reveal className="home-section-intro">
            <SectionHeader title={SITE.home.journalHeading} titleId="home-notes-title" />
            <TextLink href="/blog">{SITE.home.journalLink}</TextLink>
          </Reveal>
          <div className="home-notes__list">
            {latestPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-closing-title" className="page-section home-closing">
        <div className="page-shell home-closing__inner">
          <Reveal>
            <p className="eyebrow">{SITE.ui.enquire}</p>
            <h2 id="home-closing-title">{SITE.home.closing.title}</h2>
            <Button href={SITE.ui.enquireHref}>{SITE.home.closing.action}</Button>
          </Reveal>
          <span aria-hidden="true" className="home-closing__line" />
        </div>
      </section>
    </main>
  );
}
