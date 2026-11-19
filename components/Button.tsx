"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ComponentProps, ReactNode } from "react";
import { gsap } from "gsap";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "amber" | "sage";
  showArrow?: boolean;
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export function Button({
  href,
  children,
  variant = "primary",
  showArrow = true,
  external = false,
  className = "",
  ...linkProps
}: ButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = linkRef.current;
    if (!element) return;

    // Fine pointers only, and only for primary / highlighted actions.
    if (variant === "secondary") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const label = element.querySelector<HTMLElement>(".button__label");
    const arrow = element.querySelector<HTMLElement>(".button__arrow");
    const inner = [label, arrow].filter((node): node is HTMLElement => Boolean(node));
    const pull = 0.22;

    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(element, { x: x * pull, y: y * pull, duration: 0.5, ease: "power3.out" });
      gsap.to(inner, { x: x * 0.1, y: y * 0.1, duration: 0.5, ease: "power3.out" });
    };

    const onPointerLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    };

    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);
    element.classList.add("button--magnetic");

    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      element.classList.remove("button--magnetic");
      gsap.killTweensOf([element, ...inner]);
      gsap.set([element, ...inner], { clearProps: "transform" });
    };
  }, [variant]);

  const isExternal = external || href.startsWith("http") || href.startsWith("//");
  return (
    <Link
      className={`button button--${variant}${className ? ` ${className}` : ""}`}
      href={href}
      ref={linkRef}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...linkProps}
    >
      <span className="button__label">{children}</span>
      {showArrow ? (
        <span
          aria-hidden="true"
          className={`button__arrow${isExternal ? " button__arrow--external" : ""}`}
        >
          {isExternal ? "↗" : "→"}
        </span>
      ) : null}
    </Link>
  );
}
