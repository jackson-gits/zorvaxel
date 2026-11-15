import Link from "next/link";
import { SITE } from "@/lib/site";

export function Wordmark({
  href = "/",
  onClick,
  inverse = false,
}: {
  href?: string;
  onClick?: () => void;
  inverse?: boolean;
}) {
  return (
    <Link
      aria-label={`${SITE.name} — ${SITE.ui.backToHome}`}
      className={`wordmark${inverse ? " wordmark--inverse" : ""}`}
      href={href}
      onClick={onClick}
    >
      <svg aria-hidden="true" className="wordmark__mark" viewBox="0 0 17 25" fill="none">
        <path d="M8.5 1.5v15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M4.5 7.5h8M5.5 12h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M8.5 16.5c-2.5 2.7-3.5 4.1-3.5 5.1a3.5 3.5 0 0 0 7 0c0-1-1-2.4-3.5-5.1Z" fill="var(--accent)" />
      </svg>
      <span className="wordmark__text">{SITE.name}</span>
    </Link>
  );
}
