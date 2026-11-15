"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { EDITORIAL_EASE } from "@/lib/animations";

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  /** "words" (default) rises each word; "chars" rises each letter for hero display type. */
  split?: "words" | "chars";
};

export function WordReveal({
  text,
  className = "",
  delay = 0,
  split = "words",
}: WordRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (split === "chars") {
    let cursor = 0;

    return (
      <span className={`word-reveal${className ? ` ${className}` : ""}`}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="word-reveal__visual">
          {words.map((word, wordIndex) => (
            <Fragment key={`${word}-${wordIndex}`}>
              <span className="word-reveal__word">
                {Array.from(word).map((char, charIndex) => {
                  const index = cursor;
                  cursor += 1;

                  return (
                    <span
                      className="word-reveal__mask word-reveal__mask--char"
                      key={`${char}-${charIndex}`}
                    >
                      <motion.span
                        animate={{ opacity: 1, y: "0%", rotateX: 0 }}
                        initial={{
                          opacity: 0,
                          y: reduceMotion ? "0%" : "115%",
                          rotateX: reduceMotion ? 0 : 38,
                        }}
                        style={{
                          transformPerspective: 700,
                          transformOrigin: "50% 100%",
                        }}
                        transition={{
                          duration: reduceMotion ? 0.2 : 0.62,
                          delay: reduceMotion ? 0 : delay + index * 0.012,
                          ease: EDITORIAL_EASE,
                        }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      </span>
    );
  }

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
