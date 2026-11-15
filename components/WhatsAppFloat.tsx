import { SITE, getWhatsAppHref } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      aria-label={`${SITE.ui.whatsappLabel}: ${SITE.ui.whatsappMessage}`}
      className="whatsapp-float"
      href={getWhatsAppHref()}
      rel="noreferrer"
      target="_blank"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
        <path
          d="M3.1 16.9 4 13.6a7.5 7.5 0 1 1 2.5 2.4l-3.4.9Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M7.1 7.2c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.6 1.4c.1.2 0 .3-.1.5l-.4.5c-.1.1-.2.3 0 .5.2.4.7 1 1.3 1.4.7.5 1.2.7 1.5.8.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.3.6c.2.1.4.2.4.4 0 .3-.2 1-.6 1.3-.4.4-1 .6-1.5.6-.4 0-1-.1-1.7-.4-.8-.3-1.7-.9-2.6-1.7-.7-.7-1.4-1.5-1.8-2.3-.3-.6-.4-1.2-.4-1.6 0-.5.2-.9.5-1.1Z"
          fill="currentColor"
        />
      </svg>
      <span>{SITE.ui.whatsappLabel}</span>
    </a>
  );
}
