"use client";

type GsapInstance = typeof import("gsap").gsap;
type ScrollTriggerInstance = typeof import("gsap/ScrollTrigger").ScrollTrigger;

export type GsapModules = {
  gsap: GsapInstance;
  ScrollTrigger: ScrollTriggerInstance;
};

let modulesPromise: Promise<GsapModules> | null = null;

/**
 * Loads GSAP and ScrollTrigger once, on the client. Importing them inside an
 * effect keeps both out of the server render and out of the initial bundle.
 */
export function loadGsap(): Promise<GsapModules> {
  if (!modulesPromise) {
    modulesPromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.gsap ?? gsapModule.default;
        const ScrollTrigger =
          scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default;

        gsap.registerPlugin(ScrollTrigger);

        return { gsap, ScrollTrigger };
      },
    );
  }

  return modulesPromise;
}
