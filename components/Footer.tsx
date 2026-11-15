import Link from "next/link";
import { SITE } from "@/lib/site";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Wordmark inverse />
            <p>{SITE.footer.description}</p>
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
              <a href={SITE.contact.phone.href}>{SITE.contact.phone.label}</a>
            ) : (
              <span>{SITE.contact.phone.label}</span>
            )}
            {SITE.contact.email.href ? (
              <a href={SITE.contact.email.href}>{SITE.contact.email.label}</a>
            ) : (
              <span>{SITE.contact.email.label}</span>
            )}
            <span>{SITE.contact.whatsapp.label}</span>
            <span>{SITE.contact.address}</span>
            <span>{SITE.contact.workingHours}</span>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>{SITE.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
