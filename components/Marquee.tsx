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

  return (
    <div aria-label={accessibleLabel} className="marquee" ref={marqueeRef}>
      <span className="sr-only">{phrase}</span>
      <div
        aria-hidden="true"
        className={`marquee__track${isVisible ? " marquee__track--active" : ""}`}
      >
        {[0, 1].map((copy) => (
          <span className="marquee__group" key={copy}>
            {items.map((item, index) => (
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
