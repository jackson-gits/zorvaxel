import Image from "next/image";
import { SITE } from "@/lib/site";

export function AboutCleanroomSection() {
  const { about } = SITE;

  return (
    <section aria-labelledby="about-cleanroom-title" className="page-section about-cleanroom">
      <div className="page-shell">
        <div className="about-cleanroom__header">
          <p className="eyebrow">{about.cleanroomEyebrow}</p>
          <h2 id="about-cleanroom-title" className="about-cleanroom__heading">
            {about.cleanroomHeading}
          </h2>
          <p className="about-cleanroom__lead">{about.cleanroomDescription}</p>
        </div>

        {/* Real Cleanroom Photography Showcase */}
        <div className="about-cleanroom__photo-container">
          <div className="about-cleanroom__photo-wrap">
            <Image
              alt="ISO 8 Cleanroom filling and nitrogen purge line at Zorvaxel Chennai laboratory"
              className="about-cleanroom__image"
              height={700}
              priority={false}
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              src="/services/service-03-filling.jpg"
              width={1200}
            />
            <div className="about-cleanroom__photo-overlay">
              <div className="about-cleanroom__photo-badges">
                <span className="about-cleanroom__hud-badge">
                  <span className="about-cleanroom__hud-dot" aria-hidden="true" />
                  ISO 14644-1 CLASS 8 CERTIFIED
                </span>
                <span className="about-cleanroom__hud-badge about-cleanroom__hud-badge--subtle">
                  CHENNAI FILL BAY 01
                </span>
              </div>
              <p className="about-cleanroom__photo-caption">
                Peristaltic volumetric dosing line under positive pressure HEPA laminar airflow with in-line nitrogen purge.
              </p>
            </div>
          </div>
        </div>

        {/* Cleanroom Specification Grid */}
        <div className="about-specs-grid">
          {about.cleanroomSpecs.map((spec) => (
            <div className="about-spec-card" key={spec.code}>
              <div className="about-spec-card__top">
                <span className="about-spec-card__code tabular-nums">{spec.code}</span>
                <span className="about-spec-card__badge">{spec.badge}</span>
              </div>
              <h3 className="about-spec-card__title">{spec.title}</h3>
              <p className="about-spec-card__desc">{spec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
