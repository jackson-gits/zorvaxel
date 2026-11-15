"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import { Wordmark } from "@/components/Wordmark";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="mobile-menu"
          exit={{ opacity: 0 }}
          id="mobile-navigation"
          initial={{ opacity: 0 }}
          ref={dialogRef}
          role="dialog"
          aria-label={SITE.ui.menuTitle}
          aria-modal="true"
          transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="page-shell mobile-menu__top">
            <Wordmark href="/" onClick={onClose} />
            <button
              className="mobile-menu__close"
              onClick={onClose}
              ref={closeButtonRef}
              type="button"
            >
              <span>{SITE.ui.menuLabelClose}</span>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav aria-label={SITE.ui.mobileNavigationLabel} className="page-shell mobile-menu__links">
            {SITE.navigation.map((item, index) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`mobile-menu__link${active ? " is-active" : ""}`}
                  href={item.href}
                  key={item.href}
                  onClick={onClose}
                  style={{ transitionDelay: reduceMotion ? "0ms" : `${index * 35}ms` }}
                >
                  <span className="mobile-menu__number">0{index + 1}</span>
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="mobile-menu__arrow">↗</span>
                </Link>
              );
            })}
            <Link className="mobile-menu__enquire" href={SITE.ui.enquireHref} onClick={onClose}>
              {SITE.ui.enquire} <span aria-hidden="true">↗</span>
            </Link>
          </nav>
          <div className="page-shell mobile-menu__note">
            <span>{SITE.home.hero.label}</span>
            <span>{SITE.contact.address}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
