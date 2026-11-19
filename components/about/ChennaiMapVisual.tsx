import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function ChennaiMapVisual() {
  const { about } = SITE;
  const [primaryPhoto, ...secondaryPhotos] = about.facilityPhotos;

  return (
    <section aria-labelledby="about-location-title" className="page-section about-location-section">
      <div className="page-shell">
        <div className="about-location-hub">
          {/* Top Editorial Narrative */}
          <div className="about-location-hub__intro">
            <span className="eyebrow">{about.locationEyebrow}</span>
            <h2 id="about-location-title" className="about-location-hub__title">
              {about.locationHeading}
            </h2>
            <p className="about-location-hub__text">{about.locationText}</p>
          </div>

          {/* Visual Showcase: Chennai Facility Photo Gallery + Docked White Card */}
          <div className="about-location-stage">
            <div className="about-facility-gallery" aria-label="Zorvaxel Chennai facility photographs">
              {primaryPhoto && (
                <figure className="about-facility-photo about-facility-photo--primary">
                  <Image
                    alt={primaryPhoto.alt}
                    className="about-facility-photo__img"
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    src={primaryPhoto.src}
                  />
                  <div className="about-facility-photo__scrim" aria-hidden="true" />
                  <figcaption className="about-facility-photo__overlay">
                    <span className="about-facility-photo__tag">{primaryPhoto.tag}</span>
                    <p className="about-facility-photo__caption">{primaryPhoto.caption}</p>
                  </figcaption>
                </figure>
              )}

              <div className="about-facility-gallery__subgrid">
                {secondaryPhotos.map((photo) => (
                  <figure className="about-facility-photo about-facility-photo--secondary" key={photo.src}>
                    <Image
                      alt={photo.alt}
                      className="about-facility-photo__img"
                      fill
                      quality={90}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                      src={photo.src}
                    />
                    <div className="about-facility-photo__scrim" aria-hidden="true" />
                    <figcaption className="about-facility-photo__overlay">
                      <span className="about-facility-photo__tag">{photo.tag}</span>
                      <p className="about-facility-photo__caption">{photo.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Docked Crisp White Fact Card */}
            <div className="about-location-card" role="region" aria-label="Facility verified credentials">
              <div className="about-location-card__top">
                <span className="about-location-card__badge">HUB VERIFIED</span>
                <span className="about-location-card__tag">TAMIL NADU, INDIA</span>
              </div>

              <h3 className="about-location-card__heading">Zorvaxel Laboratory Hub</h3>
              <p className="about-location-card__sub">
                Small-batch compounding, ISO 8 cleanroom filling, and automated labeling operations.
              </p>

              <dl className="about-location-card__list">
                {about.locationDetails.map((item) => (
                  <div className="about-location-card__row" key={item.label}>
                    <dt className="about-location-card__dt">{item.label}</dt>
                    <dd className="about-location-card__dd">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="about-location-card__cta">
                <Link className="about-location-card__action-btn" href={SITE.ui.enquireHref}>
                  <span>Book a laboratory consultation</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
