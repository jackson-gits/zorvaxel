"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EDITORIAL_EASE, MOTION_TIMING, motionDuration } from "@/lib/animations";

type DrawLineProps = {
  direction?: "horizontal" | "vertical";
  className?: string;
  delay?: number;
};

export function DrawLine({
  direction = "horizontal",
  className = "",
  delay = 0,
}: DrawLineProps) {
  const reduceMotion = useReducedMotion();
  const isVertical = direction === "vertical";

  return (
    <motion.span
      aria-hidden="true"
      className={`draw-line${isVertical ? " draw-line--vertical" : ""}${className ? ` ${className}` : ""}`}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 1, scaleX: isVertical ? 1 : 0, scaleY: isVertical ? 0 : 1 }}
      whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: motionDuration(Boolean(reduceMotion), MOTION_TIMING.lineDrawSeconds),
        delay: reduceMotion ? 0 : delay,
        ease: EDITORIAL_EASE,
      }}
      style={{ transformOrigin: isVertical ? "top center" : "left center" }}
    />
  );
}
