import { ContactForm } from "@/components/ContactForm";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { getWhatsAppHref, SITE } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: SITE.seo.contact.title,
  description: SITE.seo.contact.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="page-main contact-page" id="main-content">
      <LocalBusinessJsonLd />
      <header className="page-shell page-heading contact-heading">
        <p className="eyebrow">{SITE.contactPage.eyebrow}</p>
        <h1>{SITE.contactPage.title}</h1>
        <p>{SITE.contactPage.introduction}</p>
      </header>

      <section aria-label={SITE.contactPage.formHeading} className="page-section contact-section">
        <div className="page-shell contact-layout">
          <div className="contact-form-column">
            <h2>{SITE.contactPage.formHeading}</h2>
            <ContactForm />
          </div>

          <aside aria-labelledby="contact-details-title" className="contact-details">
            <h2 id="contact-details-title">{SITE.contactPage.detailsHeading}</h2>
            <p className="contact-details__location">{SITE.contact.locationHeading}</p>
            <dl>
              <div>
                <dt>{SITE.contact.detailLabels.phone}</dt>
                <dd>
                  {SITE.contact.phone.href ? (
                    <a href={SITE.contact.phone.href}>{SITE.contact.phone.label}</a>
                  ) : SITE.contact.phone.label}
                </dd>
              </div>
              <div>
                <dt>{SITE.contact.detailLabels.email}</dt>
                <dd>
                  {SITE.contact.email.href ? (
                    <a href={SITE.contact.email.href}>{SITE.contact.email.label}</a>
                  ) : SITE.contact.email.label}
                </dd>
              </div>
              <div>
                <dt>{SITE.contact.detailLabels.whatsapp}</dt>
                <dd>
                  <a href={getWhatsAppHref()} rel="noreferrer" target="_blank">
                    {SITE.contact.whatsapp.label}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{SITE.contact.detailLabels.address}</dt>
                <dd><address>{SITE.contact.address}</address></dd>
              </div>
              <div>
                <dt>{SITE.contact.detailLabels.workingHours}</dt>
                <dd>{SITE.contact.workingHours}</dd>
              </div>
            </dl>
            <p className="contact-details__response">{SITE.contactPage.responseTime}</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
