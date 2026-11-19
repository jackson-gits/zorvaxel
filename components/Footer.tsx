import Link from "next/link";
import { SITE, getWhatsAppHref } from "@/lib/site";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  const whatsappHref = getWhatsAppHref();

  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Wordmark inverse />
            <p>{SITE.footer.description}</p>
            <div className="site-footer__trust-tag">
              <span className="site-footer__trust-dot" aria-hidden="true" />
              <span>ISO 8 Cleanroom · Chennai Industrial Corridor</span>
            </div>
          </div>
          <div className="site-footer__column">
            <span className="eyebrow site-footer__label">{SITE.footer.exploreLabel}</span>
            {SITE.footer.links.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="site-footer__column site-footer__contact">
            <span className="eyebrow site-footer__label">{SITE.contact.locationHeading}</span>
            {SITE.contact.phone.href ? (
              <a className="site-footer__contact-link" href={SITE.contact.phone.href}>
                <svg aria-hidden="true" className="site-footer__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>{SITE.contact.phone.label}</span>
              </a>
            ) : (
              <span>{SITE.contact.phone.label}</span>
            )}
            {SITE.contact.email.href ? (
              <a className="site-footer__contact-link" href={SITE.contact.email.href}>
                <svg aria-hidden="true" className="site-footer__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>{SITE.contact.email.label}</span>
              </a>
            ) : (
              <span>{SITE.contact.email.label}</span>
            )}
            {whatsappHref ? (
              <a
                className="site-footer__contact-link site-footer__whatsapp-link"
                href={whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                <svg aria-hidden="true" className="site-footer__icon site-footer__icon--whatsapp" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.18 8.18 0 0 1-5.82 2.42c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29" />
                </svg>
                <span>{SITE.contact.whatsapp.label} · WhatsApp Direct</span>
              </a>
            ) : (
              <span>{SITE.contact.whatsapp.label}</span>
            )}
            <div className="site-footer__contact-item">
              <svg aria-hidden="true" className="site-footer__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{SITE.contact.address}</span>
            </div>
            <div className="site-footer__contact-item">
              <svg aria-hidden="true" className="site-footer__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{SITE.contact.workingHours}</span>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} {SITE.name} · Small-batch serum manufacturing laboratory</span>
          <span>{SITE.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
