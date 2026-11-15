"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { EDITORIAL_EASE, MOTION_TIMING, motionDuration } from "@/lib/animations";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type ProcessStepsProps = {
  items: readonly ProcessStep[];
  label: string;
};

export function ProcessSteps({ items, label }: ProcessStepsProps) {
  const reduceMotion = useReducedMotion();
  const ease = EDITORIAL_EASE;

  return (
    <div
      aria-label={label}
      className="process-diagram"
      role="list"
      style={{ "--process-count": items.length } as CSSProperties}
    >
      {items.map((step, index) => (
        <motion.div
          className="process-step"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          key={step.number}
          role="listitem"
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: motionDuration(Boolean(reduceMotion), MOTION_TIMING.revealSeconds),
            delay: reduceMotion ? 0 : index * 0.1,
            ease,
          }}
        >
          <div className="process-step__header">
            <span aria-hidden="true" className="process-step__node">{step.number}</span>
            {index < items.length - 1 ? (
              <motion.span
                aria-hidden="true"
                className="process-step__connector"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: motionDuration(Boolean(reduceMotion), MOTION_TIMING.lineDrawSeconds),
                  delay: reduceMotion ? 0 : 0.2 + index * 0.12,
                  ease,
                }}
              />
            ) : null}
          </div>
          <h3 className="process-step__title">{step.title}</h3>
          <p className="process-step__description">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
