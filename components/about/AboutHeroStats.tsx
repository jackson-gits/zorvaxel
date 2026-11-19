"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  value: string;
  unit: string;
  label: string;
  detail: string;
  targetNumber?: number;
  prefix?: string;
  suffix?: string;
};

const STATS: StatItem[] = [
  {
    value: "50",
    targetNumber: 50,
    unit: "Units",
    label: "Pilot Batch MOQ",
    detail: "Launch your brand without taking a 5,000-unit warehouse inventory gamble.",
  },
  {
    value: "7",
    targetNumber: 7,
    unit: "Days",
    label: "Pilot Dispatch",
    detail: "From formulation approval to courier handoff at our Chennai facility.",
  },
  {
    value: "ISO 8",
    prefix: "ISO ",
    targetNumber: 8,
    unit: "Class 100k",
    label: "Cleanroom Standard",
    detail: "Continuous positive pressure air handling with multi-stage HEPA filtration.",
  },
  {
    value: "1",
    targetNumber: 1,
    unit: "Chemist",
    label: "Direct Lab Lead",
    detail: "Single formulation chemist & production coordinator from brief to batch.",
  },
];

export function AboutHeroStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCounts([50, 7, 8, 1]);
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const targets = [50, 7, 8, 1];
    const duration = 1400; // ms
    const startTime = performance.now();

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(targets.map((target) => Math.round(target * ease)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setCounts(targets);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted]);

  return (
    <section
      aria-label="Core laboratory proof points"
      className="about-hero-stats"
      ref={containerRef}
    >
      <div className="page-shell">
        <div className="about-hero-stats__header">
          <span className="about-hero-stats__eyebrow">PROOF OF CAPABILITY · CHENNAI FACILITY</span>
          <p className="about-hero-stats__lead">
            Hard proof points engineered for early-stage and agile skincare brands.
          </p>
        </div>

        <div className="about-hero-stats__grid">
          {STATS.map((stat, i) => {
            const displayValue = stat.prefix
              ? `${stat.prefix}${counts[i]}`
              : counts[i];

            return (
              <div
                className={`about-hero-stat-card ${hasStarted ? "is-active" : ""}`}
                key={stat.label}
                style={{ "--stat-index": i } as React.CSSProperties}
              >
                <div className="about-hero-stat-card__stat-line">
                  <span className="about-hero-stat-card__number tabular-nums">
                    {displayValue}
                  </span>
                  <span className="about-hero-stat-card__unit">{stat.unit}</span>
                </div>
                <h3 className="about-hero-stat-card__label">{stat.label}</h3>
                <p className="about-hero-stat-card__detail">{stat.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
