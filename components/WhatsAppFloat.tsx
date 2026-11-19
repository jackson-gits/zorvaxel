"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE, getWhatsAppHref } from "@/lib/site";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const [formInView, setFormInView] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);

  const isArticlePage = pathname.startsWith("/blog/") && pathname !== "/blog";

  useEffect(() => {
    const form = document.querySelector(".contact-form");
    const formObserver = form
      ? new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting))
      : null;
    if (form && formObserver) formObserver.observe(form);

    const footer = document.querySelector(".site-footer");
    const footerObserver = footer
      ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
          threshold: 0.05,
        })
      : null;
    if (footer && footerObserver) footerObserver.observe(footer);

    const checkBatchOpen = () => {
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const isOpen = Boolean(document.querySelector(".batch-float--open"));
      setBatchOpen(isMobile && isOpen);
    };

    checkBatchOpen();
    const batchObserver = new MutationObserver(checkBatchOpen);
    batchObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["class"],
    });

    const mq = window.matchMedia("(max-width: 760px)");
    const onMqChange = () => checkBatchOpen();
    mq.addEventListener("change", onMqChange);

    const shouldHideForTarget = (node: EventTarget | null) => {
      if (!(node instanceof Element)) return false;
      if (!node.closest("input, select, textarea")) return false;
      if (node.closest(".batch-float") && window.matchMedia("(min-width: 768px)").matches) {
        return false;
      }
      return true;
    };

    const onFocusIn = (event: FocusEvent) => {
      setFieldFocused(shouldHideForTarget(event.target));
    };
    const onFocusOut = (event: FocusEvent) => {
      setFieldFocused(shouldHideForTarget(event.relatedTarget));
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      formObserver?.disconnect();
      footerObserver?.disconnect();
      batchObserver.disconnect();
      mq.removeEventListener("change", onMqChange);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const href = getWhatsAppHref();
  if (!href) return null;

  return (
    <a
      aria-label={`${SITE.ui.whatsappLabel}: Chat directly with our Chennai production team on WhatsApp`}
      className={`whatsapp-float${footerInView ? " whatsapp-float--docked" : ""}${
        isArticlePage ? " whatsapp-float--article" : ""
      }`}
      href={href}
      hidden={formInView || fieldFocused || batchOpen}
      rel="noreferrer"
      target="_blank"
    >
      <span className="whatsapp-float__pulse-ring" aria-hidden="true" />
      <span className="whatsapp-float__icon-box">
        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.18 8.18 0 0 1-5.82 2.42c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29" />
        </svg>
      </span>
      <span className="whatsapp-float__content">
        <span className="whatsapp-float__title">
          <span>{SITE.ui.whatsappLabel}</span>
          <span className="whatsapp-float__online-dot" aria-hidden="true" />
        </span>
        <span className="whatsapp-float__subtitle">Quick batch consultation</span>
      </span>
    </a>
  );
}
