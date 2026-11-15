"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { EDITORIAL_EASE } from "@/lib/animations";

export function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  return (
    <span className={`word-reveal${className ? ` ${className}` : ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="word-reveal__visual">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="word-reveal__mask">
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : "105%" }}
                transition={{
                  duration: reduceMotion ? 0.2 : 0.6,
                  delay: reduceMotion ? 0 : delay + index * 0.065,
                  ease: EDITORIAL_EASE,
                }}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
