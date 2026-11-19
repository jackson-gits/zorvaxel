"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: "div" | "section" | "article";
};

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

function useRevealOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if already in viewport on mount so initial content reveals immediately
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.unobserve(element);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

function revealClass(className: string | undefined, revealed: boolean) {
  return [className, "scroll-reveal", revealed ? "is-revealed" : ""]
    .filter(Boolean)
    .join(" ");
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const { ref, revealed } = useRevealOnce();
  const classes = revealClass(className, revealed);
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;

  if (as === "section") {
    return <section className={classes} ref={ref as any} style={style}>{children}</section>;
  }
  if (as === "article") {
    return <article className={classes} ref={ref as any} style={style}>{children}</article>;
  }
  return <div className={classes} ref={ref} style={style}>{children}</div>;
}

export function RevealItem({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealItemProps) {
  const { ref, revealed } = useRevealOnce();
  const classes = revealClass(className, revealed);
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;

  if (as === "li") {
    return (
      <li className={classes} ref={ref as any} style={style}>
        {children}
      </li>
    );
  }

  return (
    <div className={classes} ref={ref} style={style}>
      {children}
    </div>
  );
}
