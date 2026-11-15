"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { EDITORIAL_EASE, MOTION_TIMING, motionDuration } from "@/lib/animations";

export default function RouteTemplate({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        key={pathname}
        exit={{ opacity: 0 }}
        transition={{
          duration: motionDuration(Boolean(reduceMotion), MOTION_TIMING.routeFadeSeconds),
          ease: EDITORIAL_EASE,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
