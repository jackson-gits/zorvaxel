import Image from "next/image";
import { PackageIllustration, type IllustrationName } from "@/components/illustrations";

type ServiceVisualCardProps = {
  number: string;
  title: string;
  image: string;
  illustration: IllustrationName;
  spec: string;
  highlightTag?: string;
  turnaround?: string;
  isDarkSection?: boolean;
};

export function ServiceVisualCard({
  number,
  title,
  image,
  illustration,
  spec,
  highlightTag,
  turnaround,
  isDarkSection = false,
}: ServiceVisualCardProps) {
  return (
    <div
      className={`service-card-visual${isDarkSection ? " service-card-visual--dark" : ""}`}
      data-service-number={number}
    >
      {/* Giant Constructivist Numeral overlapping the card boundary */}
      <span aria-hidden="true" className="service-card-visual__numeral">
        {number}
      </span>

      {/* Main card viewport */}
      <div className="service-card-visual__frame">
        {/* Real Product Photography */}
        <div className="service-card-visual__image-wrap">
          <Image
            alt={`${title} — Zorvaxel Chennai cosmetic serum packaging preview`}
            className="service-card-visual__image"
            height={600}
            priority={number === "01"}
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
            src={image}
            width={800}
          />
          <div aria-hidden="true" className="service-card-visual__gradient-overlay" />
        </div>

        {/* Floating Technical Badges & Crosshairs */}
        <div className="service-card-visual__header">
          {highlightTag ? (
            <span className="service-card-visual__badge service-card-visual__badge--accent">
              <span className="service-card-visual__badge-dot" aria-hidden="true" />
              {highlightTag}
            </span>
          ) : null}

          {turnaround ? (
            <span className="service-card-visual__badge service-card-visual__badge--subtle">
              {turnaround}
            </span>
          ) : null}
        </div>

        {/* Technical Vector Stamp Badge (Line Icon in Cream / Sage) */}
        <div className="service-card-visual__stamp" title={`Technical Schematic: ${title}`}>
          <PackageIllustration className="service-card-visual__stamp-icon" name={illustration} />
          <span className="service-card-visual__stamp-code">SPEC {number}</span>
        </div>

        {/* Constructivist Crosshair Corner Marks */}
        <div aria-hidden="true" className="service-card-visual__corner service-card-visual__corner--tl" />
        <div aria-hidden="true" className="service-card-visual__corner service-card-visual__corner--tr" />
        <div aria-hidden="true" className="service-card-visual__corner service-card-visual__corner--bl" />
        <div aria-hidden="true" className="service-card-visual__corner service-card-visual__corner--br" />

        {/* Bottom Technical Spec Bar */}
        <div className="service-card-visual__footer">
          <span className="service-card-visual__spec-label">TECH SPEC</span>
          <span className="service-card-visual__spec-text">{spec}</span>
        </div>
      </div>
    </div>
  );
}
