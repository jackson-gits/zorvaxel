"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/motion/gsap";
import { registerScrollController } from "@/lib/motion/scroll-lock";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Site-wide smooth scrolling. Lenis owns the scroll position; GSAP's ticker
 * drives it and ScrollTrigger reads from it, so pinned/scrubbed sections stay
 * in sync with the eased scroll rather than the raw wheel event.
 *
 * The whole layer is skipped when the visitor asks for reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const refreshRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    let cancelled = false;
    let removeTicker: (() => void) | null = null;

    void (async () => {
      const [{ gsap, ScrollTrigger }, { default: LenisClass }] = await Promise.all([
        loadGsap(),
        import("lenis"),
      ]);

      if (cancelled) return;

      const lenis = new LenisClass({
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.35,
        wheelMultiplier: 1,
      });

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      removeTicker = () => gsap.ticker.remove(raf);

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);

      ScrollTrigger.config({ ignoreMobileResize: true });

      lenisRef.current = lenis;
      refreshRef.current = () => ScrollTrigger.refresh();
      registerScrollController(lenis);

      // Fonts change where lines and pins land; measure again once settled.
      if (document.fonts?.ready) {
        document.fonts.ready
          .then(() => {
            if (!cancelled) ScrollTrigger.refresh();
          })
          .catch(() => undefined);
      }

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      removeTicker?.();
      registerScrollController(null);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      refreshRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash) return;

    // App Router resets the window on navigation, but Lenis keeps its own
    // eased position — keep the two in agreement.
    lenisRef.current?.scrollTo(0, { immediate: true });

    const refresh = refreshRef.current;
    if (!refresh) return;

    const timer = window.setTimeout(refresh, 340);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
