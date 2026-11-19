"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { loadGsap } from "@/lib/motion/gsap";

/**
 * HeroVisual — an interactive 2D animated SVG cleanroom scene powered by GSAP.
 * Features:
 * - GSAP vector stroke drawing on initial load
 * - Harmonic floating 2D physics on ingredient chips
 * - Interactive dropper dispenser with rubber bulb squeeze, falling droplet, and meniscus ripple
 * - GPU-accelerated multi-plane mouse parallax
 * - Full prefers-reduced-motion accessibility support
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dropsCount, setDropsCount] = useState(0);
  const [isDispensing, setIsDispensing] = useState(false);
  const reduceMotion = useReducedMotion();

  // GSAP animation & parallax setup
  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let revertContext: (() => void) | undefined;
    let removeParallax: (() => void) | undefined;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !containerRef.current || !svgRef.current) return;

      const container = containerRef.current;
      const svg = svgRef.current;

      const ctx = gsap.context(() => {
        // 1. Initial linework stroke setup
        const linework = gsap.utils.toArray<SVGGeometryElement>(
          ".hero-visual__draw-path",
          svg,
        );
        gsap.set(linework, {
          strokeDasharray: (_i, el) => el.getTotalLength(),
          strokeDashoffset: (_i, el) => el.getTotalLength(),
        });

        // 2. Entrance Timeline
        const enterTl = gsap.timeline({ delay: 0.2 });

        enterTl
          .fromTo(
            ".hero-visual__carton",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
          )
          .fromTo(
            ".hero-visual__bottle",
            { autoAlpha: 0, y: 32, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.2)" },
            "-=0.6",
          )
          .to(
            linework,
            { strokeDashoffset: 0, duration: 1.1, stagger: 0.04, ease: "power2.out" },
            "-=0.7",
          )
          .fromTo(
            ".hero-visual__chip",
            { autoAlpha: 0, scale: 0.8, y: 16 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "back.out(1.4)" },
            "-=0.5",
          );

        // 3. Continuous 2D Harmonic Levitation (sinusoidal floating chips)
        gsap.to(".hero-visual__chip--1", {
          y: -9,
          rotation: 1.2,
          duration: 2.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        gsap.to(".hero-visual__chip--2", {
          y: 8,
          rotation: -1.4,
          duration: 3.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 0.35,
        });

        gsap.to(".hero-visual__chip--3", {
          y: -7,
          rotation: 0.9,
          duration: 2.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 0.7,
        });

        // 4. Subtle pulsating orbit nodes
        gsap.to(".hero-visual__node", {
          scale: 1.3,
          transformOrigin: "center center",
          duration: 1.8,
          stagger: 0.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // 5. Ambient glow pulsation
        gsap.to(".hero-visual__glow", {
          scale: 1.08,
          opacity: 0.85,
          transformOrigin: "center center",
          duration: 3.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // 6. Interactive Multiplane Parallax via quickTo
        const xBottle = gsap.quickTo(".hero-visual__bottle", "x", { duration: 0.6, ease: "power2.out" });
        const yBottle = gsap.quickTo(".hero-visual__bottle", "y", { duration: 0.6, ease: "power2.out" });
        const xCarton = gsap.quickTo(".hero-visual__carton", "x", { duration: 0.8, ease: "power2.out" });
        const yCarton = gsap.quickTo(".hero-visual__carton", "y", { duration: 0.8, ease: "power2.out" });
        const xChips = gsap.quickTo(".hero-visual__chip", "x", { duration: 0.5, ease: "power2.out" });
        const yChips = gsap.quickTo(".hero-visual__chip", "y", { duration: 0.5, ease: "power2.out" });

        const handlePointerMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          xBottle(relX * 22);
          yBottle(relY * 16);
          xCarton(relX * 12);
          yCarton(relY * 10);
          xChips(relX * -24);
          yChips(relY * -18);
        };

        const handlePointerLeave = () => {
          xBottle(0);
          yBottle(0);
          xCarton(0);
          yCarton(0);
          xChips(0);
          yChips(0);
        };

        container.addEventListener("mousemove", handlePointerMove);
        container.addEventListener("mouseleave", handlePointerLeave);

        removeParallax = () => {
          container.removeEventListener("mousemove", handlePointerMove);
          container.removeEventListener("mouseleave", handlePointerLeave);
        };
      }, containerRef);

      revertContext = () => {
        removeParallax?.();
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      revertContext?.();
    };
  }, [reduceMotion]);

  // Interactive 2D Dropper Dispense Action
  const dispenseDrop = useCallback(() => {
    if (isDispensing || !svgRef.current) return;
    setIsDispensing(true);

    void loadGsap().then(({ gsap }) => {
      const svg = svgRef.current;
      if (!svg) {
        setIsDispensing(false);
        return;
      }

      const bulb = svg.querySelector(".hero-visual__bulb");
      const drop = svg.querySelector(".hero-visual__drop");
      const ripple1 = svg.querySelector(".hero-visual__ripple--1");
      const ripple2 = svg.querySelector(".hero-visual__ripple--2");

      const tl = gsap.timeline({
        onComplete: () => {
          setIsDispensing(false);
          setDropsCount((prev) => prev + 1);
        },
      });

      // 1. Bulb compression
      tl.to(bulb, {
        scaleY: 0.78,
        scaleX: 1.08,
        transformOrigin: "bottom center",
        duration: 0.14,
        ease: "power2.inOut",
      })
        .to(bulb, {
          scaleY: 1,
          scaleX: 1,
          transformOrigin: "bottom center",
          duration: 0.22,
          ease: "elastic.out(1, 0.4)",
        })
        // 2. Drop release and gravity acceleration
        .fromTo(
          drop,
          { y: 0, opacity: 1, scaleY: 0.8, scaleX: 1.1 },
          {
            y: 84,
            opacity: 1,
            scaleY: 1.4,
            scaleX: 0.85,
            duration: 0.42,
            ease: "power2.in",
          },
          "-=0.18",
        )
        // 3. Drop disappearance upon hitting liquid surface
        .to(drop, { opacity: 0, scaleY: 0.4, duration: 0.08 })
        // 4. Concentric liquid ripple waves
        .fromTo(
          ripple1,
          { scale: 0.1, opacity: 0.85, transformOrigin: "270px 226px" },
          { scale: 2.8, opacity: 0, duration: 0.65, ease: "power2.out" },
          "-=0.06",
        )
        .fromTo(
          ripple2,
          { scale: 0.1, opacity: 0.6, transformOrigin: "270px 226px" },
          { scale: 3.6, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        )
        // Reset drop position
        .set(drop, { y: 0, opacity: 1, scaleY: 1, scaleX: 1 });
    });
  }, [isDispensing]);

  return (
    <div
      className={`hero-visual${className ? ` ${className}` : ""}`}
      ref={containerRef}
      aria-label="Interactive 2D cleanroom formulation dropper bottle visualization"
    >
      <div className="hero-visual__scene">
        <svg
          className="hero-visual__svg"
          ref={svgRef}
          viewBox="0 0 540 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Ambient glow behind bottle */}
            <radialGradient id="hv-glow" cx="50%" cy="58%" r="42%">
              <stop offset="0%" stopColor="#d4c4a8" stopOpacity="0.72" />
              <stop offset="55%" stopColor="#778d7a" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ded5be" stopOpacity="0" />
            </radialGradient>

            {/* Amber glass gradient */}
            <linearGradient id="hv-amber" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f0c97a" stopOpacity="0.82" />
              <stop offset="30%" stopColor="#c8823e" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#8d4c1f" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4d2208" stopOpacity="0.92" />
            </linearGradient>

            {/* Liquid fill */}
            <linearGradient id="hv-liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5e9c5" stopOpacity="0.94" />
              <stop offset="50%" stopColor="#d8c190" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#778d7a" stopOpacity="0.82" />
            </linearGradient>

            {/* Carton face */}
            <linearGradient id="hv-carton" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f8f5ea" />
              <stop offset="60%" stopColor="#ece5d0" />
              <stop offset="100%" stopColor="#ddd4bc" />
            </linearGradient>

            {/* Carton side shadow */}
            <linearGradient id="hv-carton-side" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c8bfa8" />
              <stop offset="100%" stopColor="#b8ae96" />
            </linearGradient>

            {/* Panel bg for ingredient chips */}
            <linearGradient id="hv-chip-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbf9f4" />
              <stop offset="100%" stopColor="#efe9dc" />
            </linearGradient>

            {/* Drop shadow filter */}
            <filter id="hv-shadow" x="-15%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0d1b2a" floodOpacity="0.14" />
            </filter>

            {/* Soft shadow for carton */}
            <filter id="hv-shadow-sm" x="-15%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0d1b2a" floodOpacity="0.10" />
            </filter>

            {/* Chip shadow */}
            <filter id="hv-chip-shadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0d1b2a" floodOpacity="0.09" />
            </filter>

            {/* Clip path for bottle liquid fill */}
            <clipPath id="hv-bottle-clip">
              <path d="M216 190 C216 184,220 180,226 180 H314 C320 180,324 184,324 190 V368 C324 378,316 386,306 386 H234 C224 386,216 378,216 368 Z" />
            </clipPath>
          </defs>

          {/* ── Ambient glow disc ── */}
          <ellipse className="hero-visual__glow" cx="270" cy="310" rx="190" ry="130" fill="url(#hv-glow)" />

          {/* ── Ground contact shadow ── */}
          <ellipse cx="270" cy="420" rx="130" ry="14" fill="#0d1b2a" fillOpacity="0.08" />
          <ellipse cx="130" cy="422" rx="52" ry="8" fill="#0d1b2a" fillOpacity="0.06" />

          {/* ════════════════════════════════════════
              LAYER 1 — OUTER CARTON (left, standing)
              ════════════════════════════════════════ */}
          <g className="hero-visual__carton" filter="url(#hv-shadow-sm)">
            {/* Front face */}
            <rect className="hero-visual__draw-path" x="62" y="118" width="96" height="210" rx="4" fill="url(#hv-carton)" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />
            {/* Right side panel */}
            <path className="hero-visual__draw-path" d="M158 118 L174 128 L174 338 L158 328 Z" fill="url(#hv-carton-side)" stroke="var(--ink)" strokeWidth="1.2" strokeLinejoin="round" />
            {/* Flap creases */}
            <path d="M62 138 L158 138" stroke="var(--ink)" strokeWidth="1.1" strokeOpacity="0.5" />
            <path d="M80 118 L84 138 M130 118 L126 138" stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" />

            {/* Brand name */}
            <text x="110" y="168" textAnchor="middle" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" letterSpacing="-0.01em" fill="var(--navy)">ZORVAXEL</text>
            <line x1="80" y1="176" x2="140" y2="176" stroke="var(--ink)" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="80" y1="183" x2="128" y2="183" stroke="var(--ink)" strokeWidth="0.8" strokeOpacity="0.2" />

            {/* Moss badge */}
            <rect x="80" y="198" width="34" height="34" rx="3" fill="var(--moss)" fillOpacity="0.88" />
            <path d="M89 215 h16 M97 207 v16" stroke="var(--parchment)" strokeWidth="1.6" strokeLinecap="round" />

            {/* Spec text */}
            <text x="80" y="246" fontFamily="monospace" fontSize="6.2" letterSpacing="0.08em" fill="var(--ink)" fillOpacity="0.55">CHENNAI LAB</text>
            <text x="80" y="254" fontFamily="monospace" fontSize="5.6" letterSpacing="0.08em" fill="var(--ink)" fillOpacity="0.4">30 ML · SERUM</text>

            {/* Batch barcode lines */}
            <g strokeWidth="1.2" stroke="var(--ink)" strokeOpacity="0.35">
              {[80, 83, 86, 88, 91, 94, 97, 100, 104, 107, 110, 113].map((x, i) => (
                <line key={i} x1={x} y1="284" x2={x} y2={i % 3 === 0 ? 300 : 294} />
              ))}
            </g>
            <text x="80" y="310" fontFamily="monospace" fontSize="5.8" letterSpacing="0.1em" fill="var(--ink)" fillOpacity="0.4">ZX-BATCH-01</text>
          </g>

          {/* ════════════════════════════════════════
              LAYER 2 — AMBER DROPPER BOTTLE (centre)
              ════════════════════════════════════════ */}
          <g className="hero-visual__bottle" filter="url(#hv-shadow)">
            {/* Liquid fill */}
            <rect
              x="216"
              y="220"
              width="108"
              height="168"
              rx="2"
              fill="url(#hv-liquid)"
              clipPath="url(#hv-bottle-clip)"
            />

            {/* Concentric liquid ripple waves on meniscus */}
            <circle
              className="hero-visual__ripple hero-visual__ripple--1"
              cx="270"
              cy="226"
              r="12"
              fill="none"
              stroke="#778d7a"
              strokeWidth="1.8"
              opacity="0"
            />
            <circle
              className="hero-visual__ripple hero-visual__ripple--2"
              cx="270"
              cy="226"
              r="18"
              fill="none"
              stroke="#d4c4a8"
              strokeWidth="1.4"
              opacity="0"
            />

            {/* Bottle body */}
            <path
              className="hero-visual__draw-path"
              d="M228 100 H312 V126 L322 142 C332 158,336 175,336 193 V368 C336 382,325 392,311 392 H229 C215 392,204 382,204 368 V193 C204 175,208 158,218 142 L228 126 Z"
              fill="url(#hv-amber)"
              stroke="var(--ink)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glass base ledge */}
            <path d="M208 372 C208 383,218 388,230 388 H310 C322 388,332 383,332 372" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeOpacity="0.4" />

            {/* Specular highlight */}
            <line x1="212" y1="158" x2="212" y2="368" stroke="var(--parchment)" strokeWidth="2.8" strokeLinecap="round" strokeOpacity="0.4" />
            <line x1="218" y1="158" x2="218" y2="368" stroke="var(--parchment)" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.18" />

            {/* Neck collar rings */}
            <path d="M222 108 H318 M222 118 H318" stroke="var(--ink)" strokeWidth="1.4" />

            {/* Label band */}
            <g className="hero-visual__label">
              <rect x="208" y="186" width="124" height="82" rx="3" fill="var(--parchment)" stroke="var(--ink)" strokeWidth="1.2" />
              <text x="270" y="204" textAnchor="middle" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="9" letterSpacing="-0.01em" fill="var(--navy)">ZORVAXEL</text>
              <line x1="220" y1="209" x2="320" y2="209" stroke="var(--ink)" strokeWidth="0.8" strokeOpacity="0.25" />
              <circle cx="270" cy="228" r="11" fill="var(--moss)" fillOpacity="0.18" stroke="var(--moss)" strokeWidth="1" />
              <path d="M270 220 C267 224,264 226,264 229 A6 6 0 0 0 276 229 C276 226,273 224,270 220 Z" fill="var(--moss)" />
              <text x="270" y="253" textAnchor="middle" fontFamily="monospace" fontSize="6.2" fontWeight="600" letterSpacing="0.09em" fill="var(--ink)">30 ML · SERUM</text>
              <text x="270" y="262" textAnchor="middle" fontFamily="monospace" fontSize="5.2" letterSpacing="0.07em" fill="var(--steel)">CHENNAI LAB</text>
            </g>

            {/* Dropper cap with bulb */}
            <g
              className="hero-visual__cap"
              onClick={dispenseDrop}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              aria-label="Click dropper bulb to dispense formulation test drop"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  dispenseDrop();
                }
              }}
            >
              {/* Cap collar */}
              <rect x="230" y="66" width="80" height="20" rx="2.5" fill="var(--ink)" stroke="var(--ink)" strokeWidth="1.4" />
              {[240, 250, 260, 270, 280, 290, 300].map((x) => (
                <line key={x} x1={x} y1="68" x2={x} y2={84} stroke="var(--parchment)" strokeWidth="1" strokeOpacity="0.3" />
              ))}
              {/* Rubber bulb */}
              <path
                className="hero-visual__bulb"
                d="M246 66 C246 46,250 32,270 32 C290 32,294 46,294 66 Z"
                fill="var(--ink)"
                stroke="var(--ink)"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
              <path d="M254 58 C254 46,257 38,264 34" fill="none" stroke="var(--parchment)" strokeLinecap="round" strokeWidth="1.4" strokeOpacity="0.3" />
            </g>

            {/* Animated serum drop */}
            <path
              className="hero-visual__drop"
              d="M270 136 C266 143,262 148,262 153 A8 8 0 0 0 278 153 C278 148,274 143,270 136 Z"
              fill="#c8823e"
              stroke="var(--ink)"
              strokeWidth="1.3"
            />
            <circle cx="266" cy="151" r="2" fill="var(--parchment)" fillOpacity="0.8" />
          </g>

          {/* ════════════════════════════════════════
              LAYER 3 — FLOATING INGREDIENT CHIPS
              ════════════════════════════════════════ */}

          {/* Chip 1: Hyaluronic Acid */}
          <g className="hero-visual__chip hero-visual__chip--1" filter="url(#hv-chip-shadow)">
            <rect x="358" y="104" width="136" height="52" rx="8" fill="url(#hv-chip-bg)" stroke="var(--line)" strokeWidth="1" />
            <circle cx="381" cy="130" r="13" fill="var(--moss)" fillOpacity="0.22" />
            <text x="381" y="134" textAnchor="middle" fontSize="10" fill="var(--moss)" fontWeight="700">HA</text>
            <text x="402" y="121" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" fill="var(--navy)" letterSpacing="-0.01em">Hyaluronic</text>
            <text x="402" y="135" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" fill="var(--navy)" letterSpacing="-0.01em">Acid</text>
            <text x="402" y="148" fontFamily="monospace" fontSize="7" fill="var(--steel)" letterSpacing="0.06em">HYDRATION</text>
          </g>

          {/* Chip 2: Niacinamide */}
          <g className="hero-visual__chip hero-visual__chip--2" filter="url(#hv-chip-shadow)">
            <rect x="372" y="284" width="136" height="52" rx="8" fill="url(#hv-chip-bg)" stroke="var(--line)" strokeWidth="1" />
            <circle cx="395" cy="310" r="13" fill="var(--steel)" fillOpacity="0.18" />
            <text x="395" y="314" textAnchor="middle" fontSize="9" fill="var(--steel)" fontWeight="700">B3</text>
            <text x="416" y="301" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" fill="var(--navy)" letterSpacing="-0.01em">Niacinamide</text>
            <text x="416" y="315" fontFamily="monospace" fontSize="7" fill="var(--steel)" letterSpacing="0.06em">BRIGHTENING</text>
            <text x="416" y="327" fontFamily="monospace" fontSize="6.5" fill="var(--muted)" letterSpacing="0.04em">5% CONC.</text>
          </g>

          {/* Chip 3: Peptides */}
          <g className="hero-visual__chip hero-visual__chip--3" filter="url(#hv-chip-shadow)">
            <rect x="28" y="280" width="124" height="52" rx="8" fill="url(#hv-chip-bg)" stroke="var(--line)" strokeWidth="1" />
            <circle cx="50" cy="306" r="13" fill="var(--sand)" fillOpacity="0.6" />
            <text x="50" y="310" textAnchor="middle" fontSize="9" fill="var(--navy)" fontWeight="700">Pep</text>
            <text x="72" y="297" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" fill="var(--navy)" letterSpacing="-0.01em">Peptides</text>
            <text x="72" y="311" fontFamily="monospace" fontSize="7" fill="var(--steel)" letterSpacing="0.06em">RESTORATIVE</text>
            <text x="72" y="323" fontFamily="monospace" fontSize="6.5" fill="var(--muted)" letterSpacing="0.04em">BARRIER</text>
          </g>

          {/* ════════════════════════════════════════
              LAYER 4 — FLOATING ORBIT NODES
              ════════════════════════════════════════ */}
          <circle className="hero-visual__node hero-visual__node--a" cx="186" cy="96" r="5" fill="var(--moss)" fillOpacity="0.55" />
          <circle className="hero-visual__node hero-visual__node--b" cx="362" cy="206" r="4" fill="var(--steel)" fillOpacity="0.5" />
          <circle className="hero-visual__node hero-visual__node--c" cx="156" cy="348" r="6" fill="var(--sand)" fillOpacity="0.7" stroke="var(--ink)" strokeWidth="0.8" strokeOpacity="0.2" />
          <circle className="hero-visual__node hero-visual__node--d" cx="400" cy="168" r="3.5" fill="var(--moss)" fillOpacity="0.4" />
          <circle className="hero-visual__node hero-visual__node--e" cx="88" cy="200" r="4" fill="var(--steel)" fillOpacity="0.3" />

          {/* Connecting dashed orbit lines */}
          <line x1="191" y1="96" x2="216" y2="130" stroke="var(--moss)" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 4" />
          <line x1="358" y1="208" x2="336" y2="240" stroke="var(--steel)" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="4 4" />
          <line x1="162" y1="344" x2="208" y2="360" stroke="var(--sand)" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="4 4" />

          {/* ════════════════════════════════════════
              LAYER 5 — LABORATORY ANNOTATIONS
              ════════════════════════════════════════ */}
          <line x1="295" y1="48" x2="344" y2="40" stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.2" />
          <text x="348" y="43" fontFamily="monospace" fontSize="7.5" letterSpacing="0.07em" fill="var(--ink)" fillOpacity="0.4">DROPPER CAP</text>

          <line x1="208" y1="228" x2="168" y2="236" stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.2" />
          <text x="164" y="240" fontFamily="monospace" fontSize="7.5" letterSpacing="0.07em" fill="var(--ink)" fillOpacity="0.35" textAnchor="end">AMBER GLASS</text>

          <rect x="204" y="398" width="132" height="18" rx="3" fill="var(--navy)" fillOpacity="0.06" />
          <text x="270" y="411" textAnchor="middle" fontFamily="monospace" fontSize="7" letterSpacing="0.12em" fill="var(--ink)" fillOpacity="0.5">30 ML · AMBER · DROPPER · NO MOQ</text>
        </svg>
      </div>

      {/* Interactive Micro-Dispenser Control Bar */}
      <div className="hero-visual__controls">
        <button
          type="button"
          className="hero-visual__dispense-btn"
          onClick={dispenseDrop}
          disabled={isDispensing}
          aria-label="Dispense laboratory sample drop"
        >
          <span className="hero-visual__dispense-icon" aria-hidden="true">
            💧
          </span>
          <span>{isDispensing ? "Dispensing..." : "Test dropper fill"}</span>
        </button>

        <div className="hero-visual__status">
          <span className="hero-visual__status-dot" aria-hidden="true" />
          <span className="hero-visual__status-text">
            Cleanroom sample:{" "}
            <strong className="hero-visual__status-count tabular-nums">
              {dropsCount}
            </strong>{" "}
            {dropsCount === 1 ? "drop" : "drops"} tested
          </span>
        </div>
      </div>
    </div>
  );
}