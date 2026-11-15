"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EDITORIAL_EASE, MOTION_TIMING, motionDuration } from "@/lib/animations";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: "div" | "section" | "article";
};

export function Reveal({
  children,
  className,
  delay = 0,
  staggerChildren = MOTION_TIMING.childStaggerSeconds,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : as === "article" ? motion.article : motion.div;
  const variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionDuration(Boolean(reduceMotion), MOTION_TIMING.revealSeconds),
        delay,
        staggerChildren: reduceMotion ? 0 : staggerChildren,
        ease: EDITORIAL_EASE,
      },
    },
  };

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: motionDuration(Boolean(reduceMotion), MOTION_TIMING.revealSeconds),
            ease: EDITORIAL_EASE,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
