"use client";

import { useEffect, useRef, useState } from "react";

type MarqueeProps = {
  items: readonly string[];
  accessibleLabel: string;
};

export function Marquee({ items, accessibleLabel }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const phrase = items.join(" · ");

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(marquee);
    return () => observer.disconnect();
  }, []);

  // Repeat items 4 times per copy so each track group is >= 2200px wide,
  // ensuring a completely seamless, gap-free infinite scroll on any resolution (1440px - 2560px).
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div aria-label={accessibleLabel} className="marquee" ref={marqueeRef}>
      <span className="sr-only">{phrase}</span>
      <div
        aria-hidden="true"
        className={`marquee__track${isVisible ? " marquee__track--active" : ""}`}
      >
        {[0, 1].map((copy) => (
          <span className="marquee__group" key={copy}>
            {repeatedItems.map((item, index) => (
              <span className="marquee__item" key={`${copy}-${index}`}>
                {item}
                <span className="marquee__separator">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
