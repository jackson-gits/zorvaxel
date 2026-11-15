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

function useRevealOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.unobserve(element);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
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
  const style = { "--reveal-delay": `${delay}s` } as CSSProperties;

  if (as === "section") {
    return <section className={classes} ref={ref} style={style}>{children}</section>;
  }
  if (as === "article") {
    return <article className={classes} ref={ref} style={style}>{children}</article>;
  }
  return <div className={classes} ref={ref} style={style}>{children}</div>;
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, revealed } = useRevealOnce();
  return (
    <div className={revealClass(className, revealed)} ref={ref}>
      {children}
    </div>
  );
}
