"use client";

import { createElement, useEffect, useRef } from "react";
import type { SVGProps } from "react";
import { useReducedMotion } from "framer-motion";
import { loadGsap } from "@/lib/motion/gsap";
import { ILLUSTRATIONS, type IllustrationName } from "./index";

type InteractivePackageIllustrationProps = SVGProps<SVGSVGElement> & {
  name: IllustrationName;
};

export function InteractivePackageIllustration({
  name,
  className,
  ...props
}: InteractivePackageIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const Illustration = ILLUSTRATIONS[name];

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !containerRef.current) return;

      const container = containerRef.current;
      const ctx = gsap.context(() => {
        const paths = gsap.utils.toArray<SVGGeometryElement>(
          "path, rect, line, circle, polyline",
          container,
        );

        // Filter out tiny dots or fills without strokes
        const drawablePaths = paths.filter((el) => {
          try {
            return typeof el.getTotalLength === "function" && el.getTotalLength() > 0;
          } catch {
            return false;
          }
        });

        // Setup stroke dash for drawing
        gsap.set(drawablePaths, {
          strokeDasharray: (_i, el) => el.getTotalLength(),
          strokeDashoffset: (_i, el) => el.getTotalLength(),
        });

        // Trigger on scroll into view
        ScrollTrigger.create({
          trigger: container,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(drawablePaths, {
              strokeDashoffset: 0,
              duration: 0.95,
              stagger: 0.04,
              ease: "power2.out",
            });

            // Accent droplet pop
            const drop = container.querySelector(".package-illustration__drop, [fill*='accent']");
            if (drop) {
              gsap.fromTo(
                drop,
                { scale: 0, transformOrigin: "center center", autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.45, delay: 0.6, ease: "back.out(2)" },
              );
            }
          },
        });

        // Hover micro-interaction
        const handleMouseEnter = () => {
          gsap.to(container, {
            scale: 1.05,
            y: -3,
            duration: 0.22,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(container, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, container);

      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [reduceMotion]);

  if (!Illustration) return null;

  return (
    <div
      ref={containerRef}
      className={["package-illustration-interactive", className].filter(Boolean).join(" ")}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {createElement(Illustration, {
        className: "package-illustration",
        ...props,
      })}
    </div>
  );
}