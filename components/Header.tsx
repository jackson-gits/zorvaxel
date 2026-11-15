"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { MobileMenu } from "@/components/MobileMenu";
import { Wordmark } from "@/components/Wordmark";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const previousScroll = useRef(0);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuToggleRef.current?.focus());
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      const currentScroll = window.scrollY;
      const scrollingDown = currentScroll > previousScroll.current;
      if (currentScroll < 64) {
        setIsHidden(false);
      } else if (scrollingDown && currentScroll - previousScroll.current > 10) {
        setIsHidden(true);
      } else if (currentScroll < previousScroll.current - 5) {
        setIsHidden(false);
      }
      previousScroll.current = currentScroll;
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`site-header${isHidden && !menuOpen ? " is-hidden" : ""}`}>
        <div className="page-shell site-header__inner">
          <Wordmark href="/" />
          <nav className="desktop-navigation" aria-label={SITE.ui.mainNavigationLabel}>
            {SITE.navigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  className={`nav-link${active ? " is-active" : ""}`}
                  href={item.href}
                  key={item.href}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link className="nav-link nav-link--enquire" href={SITE.ui.enquireHref}>
              {SITE.ui.enquire}
              <span aria-hidden="true">→</span>
            </Link>
          </nav>
          <button
            aria-controls={menuOpen ? "mobile-navigation" : undefined}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? SITE.ui.menuClose : SITE.ui.menuOpen}
            className="menu-toggle"
            ref={menuToggleRef}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span className="menu-toggle__label">
              {menuOpen ? SITE.ui.menuLabelClose : SITE.ui.menuLabelOpen}
            </span>
            <span className={`menu-toggle__mark${menuOpen ? " is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
