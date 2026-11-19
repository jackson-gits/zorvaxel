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
  const [isScrolled, setIsScrolled] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuToggleRef.current?.focus());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}>
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
              <span>Batch Enquiry</span>
              <span aria-hidden="true">→</span>
            </Link>
          </nav>

          <div className="site-header__mobile-controls">
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
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
