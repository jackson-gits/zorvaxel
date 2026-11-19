"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { EDITORIAL_EASE } from "@/lib/animations";

export default function RouteTemplate({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      className="route-transition"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.15 : 0.35,
        ease: EDITORIAL_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
