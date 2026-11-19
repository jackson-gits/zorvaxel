"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

export function AboutComparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`about-comparison-wrap ${inView ? "is-in-view" : ""}`}
      ref={containerRef}
    >
      <div className="about-comparison-grid">
        {/* 1. The Factory Dilemma (Dark, Muted, Status Quo) */}
        <div className="about-dilemma-card">
          <div className="about-dilemma-card__badge-row">
            <span className="about-dilemma-card__badge">STATUS QUO</span>
            <span className="about-dilemma-card__sublabel">MASS FACTORY TRAP</span>
          </div>
          <h3 className="about-dilemma-card__title">The Factory Dilemma</h3>
          <p className="about-dilemma-card__intro">
            Traditional industrial contract manufacturers require massive volume commitments, slow iterations, and third-party brokers.
          </p>

          <ul className="about-dilemma-card__list" role="list">
            <li className="about-dilemma-card__item">
              <span aria-hidden="true" className="about-dilemma-card__icon-box">
                <svg className="about-svg-cross" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="about-dilemma-card__text">
                <div className="about-dilemma-card__stat-strike">
                  <del className="about-strikethrough">5,000 – 10,000 units</del>
                </div>
                <span>Mandatory factory minimum locking up ₹4L – ₹12L in unvalidated stock</span>
              </div>
            </li>

            <li className="about-dilemma-card__item">
              <span aria-hidden="true" className="about-dilemma-card__icon-box">
                <svg className="about-svg-cross" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="about-dilemma-card__text">
                <div className="about-dilemma-card__stat-strike">
                  <del className="about-strikethrough">60 – 90 days lead time</del>
                </div>
                <span>Bureaucratic pipeline delays before receiving initial pilot sample vials</span>
              </div>
            </li>

            <li className="about-dilemma-card__item">
              <span aria-hidden="true" className="about-dilemma-card__icon-box">
                <svg className="about-svg-cross" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="about-dilemma-card__text">
                <strong>Forced packaging bundles</strong>
                <span>You are forced to accept catalog bottles and generic caps you didn’t choose</span>
              </div>
            </li>

            <li className="about-dilemma-card__item">
              <span aria-hidden="true" className="about-dilemma-card__icon-box">
                <svg className="about-svg-cross" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="about-dilemma-card__text">
                <strong>Brokers & Middlemen markups</strong>
                <span>Layered commission sales reps with zero direct chemist contact or bench access</span>
              </div>
            </li>
          </ul>

          <div className="about-dilemma-card__footer">
            <span>Result: Founders burn launch capital on warehouse dust.</span>
          </div>
        </div>

        {/* Floating VS Divider */}
        <div aria-hidden="true" className="about-comparison-vs">
          <div className="about-comparison-vs__circle">
            <span>VS</span>
          </div>
          <div className="about-comparison-vs__line" />
        </div>

        {/* 2. The Zorvaxel Model (Bright, Elevated, Heroic) */}
        <div className="about-zorvaxel-card">
          <div className="about-zorvaxel-card__badge-row">
            <span className="about-zorvaxel-card__badge">SMALL-BATCH LAB</span>
            <span className="about-zorvaxel-card__sublabel">CHENNAI FACILITY</span>
          </div>
          <h3 className="about-zorvaxel-card__title">The Zorvaxel Model</h3>
          <p className="about-zorvaxel-card__intro">
            Purpose-engineered for market testing, clinical agility, and formulation control from day one.
          </p>

          <ul className="about-zorvaxel-card__list" role="list">
            <li className="about-zorvaxel-card__item">
              <span aria-hidden="true" className="about-zorvaxel-card__icon-box">
                <svg className="about-svg-check" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10.5L8 14.5L16 6"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="about-zorvaxel-card__text">
                <div className="about-zorvaxel-card__stat-highlight">
                  <span className="about-zorvaxel-card__num">50 Units</span>
                  <span className="about-zorvaxel-card__pill">True Pilot Run</span>
                </div>
                <span>Validate product-market fit and genuine repeat orders with zero inventory debt</span>
              </div>
            </li>

            <li className="about-zorvaxel-card__item">
              <span aria-hidden="true" className="about-zorvaxel-card__icon-box">
                <svg className="about-svg-check" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10.5L8 14.5L16 6"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="about-zorvaxel-card__text">
                <div className="about-zorvaxel-card__stat-highlight">
                  <span className="about-zorvaxel-card__num">7 Working Days</span>
                  <span className="about-zorvaxel-card__pill">Rapid Dispatch</span>
                </div>
                <span>Fast cleanroom turnaround from dieline clearance to insured courier pickup</span>
              </div>
            </li>

            <li className="about-zorvaxel-card__item">
              <span aria-hidden="true" className="about-zorvaxel-card__icon-box">
                <svg className="about-svg-check" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10.5L8 14.5L16 6"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="about-zorvaxel-card__text">
                <strong>Modular entry flexibility</strong>
                <span>Supply your own bulk serum or choose from our tested clinical active formulation library</span>
              </div>
            </li>

            <li className="about-zorvaxel-card__item">
              <span aria-hidden="true" className="about-zorvaxel-card__icon-box">
                <svg className="about-svg-check" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10.5L8 14.5L16 6"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="about-zorvaxel-card__text">
                <strong>Direct bench chemist access</strong>
                <span>One technical formulation lead managing your specs, stability tests, and lot CoAs</span>
              </div>
            </li>
          </ul>

          <div className="about-zorvaxel-card__cta-box">
            <Link className="about-zorvaxel-card__btn" href={SITE.ui.enquireHref}>
              <span>Start 50-Unit Pilot Batch</span>
              <span aria-hidden="true" className="about-zorvaxel-card__arrow">→</span>
            </Link>
            <span className="about-zorvaxel-card__guarantee">No lock-in contracts · Transparent per-bottle rates</span>
          </div>
        </div>
      </div>
    </div>
  );
}
