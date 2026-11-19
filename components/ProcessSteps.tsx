"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import "./process-story.css";

type ProcessItem = { number: string; title: string; description: string };

type Props = {
  items: readonly ProcessItem[];
  label: string;
  number?: string;
  title?: ReactNode;
  description?: string;
  titleId?: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const eo = (t: number) => 1 - Math.pow(1 - t, 3);
const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

const BOTTLE = "M175 140H225V172Q262 180 262 215V365Q262 385 242 385H158Q138 385 138 365V215Q138 180 175 172Z";
const BUBBLES = [0, 1, 2, 3, 4, 5, 6].map((i) => ({ cx: 150 + i * 17, cy: 370 - ((i * 37) % 60), r: 2 + (i % 3), o: i * 0.13 }));
const GRID = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PHASE_TAGS = [
  "Phase 01 · Client Brief & Specs",
  "Phase 02 · Ready Formula or Supply Serum",
  "Phase 03 · Precision Fill & Capping",
  "Phase 04 · Finished Batch & Dispatch",
];

const STEP_SHORT_TITLES = ["Brief", "Formula", "Fill & Cap", "Dispatch"];
const STEP_TARGETS = [0.12, 0.38, 0.68, 0.98];
const STEP_METAS = [
  "Day 0–1 · Scope & formula choice",
  "Day 2–3 · Formula lock & sample test",
  "Day 4–6 · Cleanroom fill, cap & seal",
  "Day 7 · QC verified & batch dispatch",
];

const STEP_HIGHLIGHTS = [
  ["Scope & quantity agreed", "Formulation library selection", "Dropper container confirmed"],
  ["Ready formulas or your serum", "Cleanroom quality verification", "Packaging spec confirmed"],
  ["Cleanroom precision fill", "Nitrogen headspace flush", "Tamper-evident cap seal"],
  ["Final QC verification", "Custom label application", "Dispatched from Chennai"],
];

export function ProcessSteps({ items, label, number, title, description, titleId }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const activeRef = useRef(0);
  const curRef = useRef(STEP_TARGETS[0]);
  const tgtRef = useRef(STEP_TARGETS[0]);
  const rafRef = useRef<number>(0);
  const reduceMotionRef = useRef(false);

  // Check desktop vs mobile & reduced motion
  useEffect(() => {
    const mqLive = window.matchMedia("(min-width: 1000px) and (prefers-reduced-motion: no-preference)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setLive(mqLive.matches);
      reduceMotionRef.current = mqMotion.matches;
    };

    sync();
    mqLive.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);
    return () => {
      mqLive.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
    };
  }, []);

  const render = useCallback(
    (p: number) => {
      const root = rootRef.current;
      if (!root) return;

      const one = (k: string) => root.querySelector<SVGElement>(`[data-ps="${k}"]`);
      const out = one("out"),
        liq = one("liq"),
        dr = one("dr"),
        lab = one("lab"),
        bt = one("bt");
      const carton = one("carton"),
        lid = one("lid"),
        seal = one("seal"),
        halo = one("halo"),
        dims = one("dims");
      const stage = root.querySelector<HTMLElement>(".process-story__stage");
      if (!out || !liq || !dr || !lab || !bt || !carton || !lid || !seal || !halo || !stage) return;

      const bubs = [...root.querySelectorAll<SVGElement>('[data-ps="bub"] circle')];
      const drops = [...root.querySelectorAll<SVGElement>('[data-ps="drop"]')];
      const stepEls = [...root.querySelectorAll<HTMLElement>(".process-story__step")];
      const n = stepEls.length || 4;

      const q = p * 4; // animation timeline is 0..4
      const s = Math.min(n - 1, Math.floor(p * n));

      if (s !== activeRef.current) {
        activeRef.current = s;
        setActiveStep(s);
      }

      stepEls.forEach((el, i) => {
        el.classList.toggle("is-active", i === s);
        el.classList.toggle("is-past", i < s);
        el.style.setProperty("--p", clamp(p * n - i).toFixed(3));
      });

      out.style.strokeDasharray = "1 2";
      out.style.strokeDashoffset = String(1 - io(seg(q, 0, 0.6)));

      const fill = eo(seg(q, 0.4, 1)) * 120 + eo(seg(q, 1.5, 2.6)) * 70;
      liq.style.transform = `translateY(${190 - fill}px)`;

      bubs.forEach((b, i) => {
        const t = clamp(seg(q, 0.7, 2.8) * 1.4 - BUBBLES[i].o);
        b.style.transform = `translateY(${-t * 110}px)`;
        b.style.opacity = String(Math.sin(t * Math.PI) * 0.8);
      });

      const dIn = eo(seg(q, 1, 1.25)) - eo(seg(q, 2.6, 2.9));
      dr.style.transform = `translateY(${(1 - dIn) * -140}px)`;
      dr.style.opacity = String(dIn);
      drops.forEach((d, i) => {
        const t = seg(q, 1.25 + i * 0.4, 1.7 + i * 0.4);
        d.style.transform = `translateY(${140 + t * 120}px)`;
        d.style.opacity = t > 0 && t < 1 ? "1" : "0";
      });

      const lb = eo(seg(q, 2.1, 3));
      lab.style.opacity = String(lb);
      lab.style.transform = `translateX(${(1 - lb) * -60}px)`;

      const pk = io(seg(q, 3, 3.5));
      bt.style.transform = `scale(${1 - pk * 0.38}) translateY(${pk * 30}px)`;
      bt.style.opacity = String(1 - seg(q, 3.3, 3.6));
      carton.style.opacity = String(seg(q, 3.25, 3.55));
      lid.style.opacity = String(seg(q, 3.45, 3.55));
      lid.style.transform = `translateY(${(1 - eo(seg(q, 3.45, 3.8))) * -60}px)`;
      seal.style.opacity = String(seg(q, 3.8, 3.9));
      seal.style.transform = `scale(${0.3 + 0.7 * eo(seg(q, 3.8, 4))})`;
      halo.style.opacity = String(seg(q, 3.7, 4));
      halo.style.transform = `scale(${0.8 + 0.2 * seg(q, 3.7, 4)})`;

      if (dims) {
        dims.style.opacity = String(1 - seg(q, 3.1, 3.45));
      }

      stage.style.transform = `rotateY(${(p - 0.5) * -8}deg) rotateX(${Math.sin(p * Math.PI) * 2}deg)`;
    },
    [],
  );

  const animateTo = useCallback(
    (targetP: number, instant = false) => {
      tgtRef.current = targetP;
      if (instant || reduceMotionRef.current) {
        curRef.current = targetP;
        render(targetP);
        return;
      }

      const frame = () => {
        curRef.current += (tgtRef.current - curRef.current) * 0.14;
        if (Math.abs(tgtRef.current - curRef.current) < 0.0004) {
          curRef.current = tgtRef.current;
        }
        render(curRef.current);
        if (curRef.current !== tgtRef.current) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          rafRef.current = 0;
        }
      };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(frame);
      }
    },
    [render],
  );

  const selectStep = useCallback(
    (i: number) => {
      const idx = clamp(i, 0, items.length - 1);
      setActiveStep(idx);
      activeRef.current = idx;
      const target = STEP_TARGETS[idx] ?? (idx + 0.5) / items.length;
      animateTo(target);
    },
    [items.length, animateTo],
  );

  // Desktop scroll tracking vs mobile initial render
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (!live) {
      // Mobile / tablet / reduced motion mode
      const initialTarget = STEP_TARGETS[activeRef.current] ?? 0.12;
      curRef.current = initialTarget;
      tgtRef.current = initialTarget;
      render(initialTarget);
      return;
    }

    let tgt = 0,
      cur = 0,
      raf = 0;

    const frame = () => {
      cur += (tgt - cur) * 0.12;
      if (Math.abs(tgt - cur) < 0.0004) cur = tgt;
      render(cur);
      raf = cur !== tgt ? requestAnimationFrame(frame) : 0;
    };

    const onScroll = () => {
      const r = root.getBoundingClientRect();
      tgt = clamp(-r.top / (r.height - window.innerHeight));
      if (!raf) raf = requestAnimationFrame(frame);
    };

    onScroll();
    cur = tgt;
    render(cur);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [live, render]);

  const jumpTo = (i: number) => {
    if (!live) {
      selectStep(i);
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + r.top + (r.height - window.innerHeight) * ((i + 0.5) / items.length),
      behavior: "smooth",
    });
  };

  const headerElement =
    title || description ? (
      <header className="process-story__header">
        <div aria-hidden="true" className="process-story__header-numeral">
          {number ?? String(activeStep + 1).padStart(2, "0")}
        </div>
        <div className="process-story__header-content">
          {title ? (
            <h2 className="process-story__header-title" id={titleId}>
              {title}
            </h2>
          ) : null}
          {description ? <p className="process-story__header-description">{description}</p> : null}
        </div>
      </header>
    ) : null;

  const currentItem = items[activeStep] ?? items[0];

  return (
    <div className={`process-story${live ? " is-live" : " is-mobile"}`} ref={rootRef}>
      <div className="process-story__pin">
        <div className="process-story__grid">
          <div className="process-story__copy">
            {headerElement}

            {/* Stage progress pill & status tracker */}
            <div className="process-story__meta" aria-live="polite">
              <div className="process-story__meta-eyebrow">
                <span className="eyebrow">STAGE {String(activeStep + 1).padStart(2, "0")} / 04</span>
                <span className="process-story__meta-tag">{PHASE_TAGS[activeStep] ?? "In Progress"}</span>
              </div>
              <div className="process-story__meta-bar" aria-hidden="true">
                <div
                  className="process-story__meta-progress"
                  style={{ transform: `scaleX(${(activeStep + 1) / items.length})` }}
                />
              </div>
            </div>

            {/* Mobile Segmented Stage Selector Tabs */}
            <div aria-label="Manufacturing phases" className="process-story__mobile-tabs" role="tablist">
              {items.map((item, i) => (
                <button
                  aria-controls={`process-panel-${i}`}
                  aria-selected={i === activeStep}
                  className={`process-story__tab${i === activeStep ? " is-active" : ""}`}
                  id={`process-tab-${i}`}
                  key={item.number}
                  onClick={() => selectStep(i)}
                  role="tab"
                  type="button"
                >
                  <span className="process-story__tab-num">{item.number}</span>
                  <span className="process-story__tab-title">{STEP_SHORT_TITLES[i] ?? item.title}</span>
                </button>
              ))}
            </div>

            {/* Mobile Active Stage Card with description and Next/Prev controls */}
            {currentItem ? (
              <div
                aria-labelledby={`process-tab-${activeStep}`}
                className="process-story__mobile-card"
                id={`process-panel-${activeStep}`}
                role="tabpanel"
              >
                <div className="process-story__mobile-card-top">
                  <span className="process-story__mobile-card-num">STAGE {currentItem.number}</span>
                  <span className="process-story__mobile-card-time">{STEP_METAS[activeStep]}</span>
                </div>
                <h3 className="process-story__mobile-card-title">
                  {PHASE_TAGS[activeStep]?.split("· ")[1] ?? currentItem.title}
                </h3>
                <p className="process-story__mobile-card-desc">{currentItem.description}</p>

                {STEP_HIGHLIGHTS[activeStep] ? (
                  <div className="process-story__mobile-card-highlights">
                    {STEP_HIGHLIGHTS[activeStep].map((hl) => (
                      <span className="process-story__mobile-highlight" key={hl}>
                        <span aria-hidden="true" className="process-story__highlight-check">✓</span>
                        {hl}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="process-story__mobile-card-nav">
                  <button
                    aria-label="Previous manufacturing phase"
                    className="process-story__nav-btn"
                    disabled={activeStep === 0}
                    onClick={() => selectStep(activeStep - 1)}
                    type="button"
                  >
                    ← Prev
                  </button>
                  <span className="process-story__nav-indicator">
                    Phase {activeStep + 1} of {items.length}
                  </span>
                  {activeStep < items.length - 1 ? (
                    <button
                      aria-label="Next manufacturing phase"
                      className="process-story__nav-btn process-story__nav-btn--primary"
                      onClick={() => selectStep(activeStep + 1)}
                      type="button"
                    >
                      Next Phase →
                    </button>
                  ) : (
                    <a className="process-story__nav-btn process-story__nav-btn--primary" href="/contact">
                      Start your first batch →
                    </a>
                  )}
                </div>
              </div>
            ) : null}

            {/* Timeline of steps (Accordion on desktop, connected timeline on mobile) */}
            <ol aria-label={label} className="process-story__steps">
              {items.map((item, i) => (
                <li
                  aria-current={i === activeStep ? "step" : undefined}
                  className={`process-story__step${i === activeStep ? " is-active" : ""}${i < activeStep ? " is-past" : ""}`}
                  key={item.number}
                  onClick={() => jumpTo(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      jumpTo(i);
                    }
                  }}
                  role={live ? "button" : undefined}
                  tabIndex={live ? 0 : -1}
                >
                  <span className="process-story__fill" />
                  <div className="process-story__head">
                    <div className="process-story__head-left">
                      <span className="process-story__index">{item.number}</span>
                      <h3 className="process-story__title">{item.title}</h3>
                    </div>
                    <span className="process-story__step-meta">{STEP_METAS[i] ?? `Phase 0${i + 1}`}</span>
                  </div>
                  <div className="process-story__body">
                    <div>
                      <p className="process-story__desc">{item.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Architectural vertical divider and 01/04 counter in the gap */}
          <div aria-hidden="true" className="process-story__divider">
            <div className="process-story__divider-line">
              <div
                className="process-story__divider-thumb"
                style={{ transform: `translateY(${(activeStep / (items.length - 1)) * 110}px)` }}
              />
            </div>
            <div className="process-story__divider-counter">
              <span className="process-story__divider-current">{String(activeStep + 1).padStart(2, "0")}</span>
              <span className="process-story__divider-slash">/</span>
              <span className="process-story__divider-total">04</span>
            </div>
          </div>

          {/* Visual column & spec strip: larger 560-620px constructivist blueprint */}
          <div className="process-story__visual-wrap">
            <div aria-hidden="true" className="process-story__visual">
              <div className="process-story__stage">
                <svg className="process-story__svg" viewBox="0 0 400 440">
                  <defs>
                    <clipPath id="ps-bottle-clip">
                      <path d={BOTTLE} />
                    </clipPath>
                  </defs>
                  {/* Background drafting grid */}
                  <g>
                    {GRID.map((i) => (
                      <g key={i}>
                        <path className="l gl" d={`M${i * 40} 0V440`} strokeWidth={1} />
                        <path className="l gl" d={`M0 ${i * 44}H400`} strokeWidth={1} />
                      </g>
                    ))}
                  </g>

                  {/* Technical laboratory drafting notes - High contrast & crisp */}
                  <g>
                    <path d="M26 36H38M32 30V42" stroke="#f4f1de" strokeOpacity="0.55" strokeWidth="1" />
                    <path d="M364 36H376M370 30V42" stroke="#f4f1de" strokeOpacity="0.55" strokeWidth="1" />
                    <path d="M26 404H38M32 398V410" stroke="#f4f1de" strokeOpacity="0.55" strokeWidth="1" />
                    <path d="M364 404H376M370 398V410" stroke="#f4f1de" strokeOpacity="0.55" strokeWidth="1" />
                    <text className="spec-note" fill="#f4f1de" fontSize="8" fontWeight="600" opacity="0.88" x="46" y="39">
                      ZORVAXEL LAB · CHENNAI
                    </text>
                    <text className="spec-note" fill="#f4f1de" fontSize="8" fontWeight="600" opacity="0.88" textAnchor="end" x="354" y="39">
                      SPEC 01 / 30 ML
                    </text>
                  </g>

                  {/* Dimension lines and callouts on the bottle */}
                  <g data-ps="dims" opacity="0.8">
                    {/* Height dimension line */}
                    <path d="M68 140V385" stroke="#f4f1de" strokeDasharray="3 2" strokeOpacity="0.4" strokeWidth="0.8" />
                    <path d="M62 140H74M62 385H74" stroke="#f4f1de" strokeOpacity="0.55" strokeWidth="0.8" />
                    <text
                      fill="#f4f1de"
                      fontFamily="var(--ps-sans)"
                      fontSize="7"
                      letterSpacing="0.08em"
                      opacity="0.85"
                      textAnchor="middle"
                      transform="rotate(-90 58 262)"
                    >
                      92.0 MM
                    </text>

                    {/* Neck diameter dimension */}
                    <path d="M175 120H225" stroke="#f4f1de" strokeOpacity="0.4" strokeWidth="0.8" />
                    <path d="M175 116V124M225 116V124" stroke="#f4f1de" strokeOpacity="0.55" strokeWidth="0.8" />
                    <text
                      fill="#f4f1de"
                      fontFamily="var(--ps-sans)"
                      fontSize="6.5"
                      letterSpacing="0.08em"
                      opacity="0.85"
                      textAnchor="middle"
                      x="200"
                      y="114"
                    >
                      Ø 18.0 MM DIN
                    </text>

                    {/* Body diameter dimension */}
                    <path d="M138 412H262" stroke="#f4f1de" strokeOpacity="0.4" strokeWidth="0.8" />
                    <path d="M138 408V416M262 408V416" stroke="#f4f1de" strokeOpacity="0.55" strokeWidth="0.8" />
                    <text
                      fill="#f4f1de"
                      fontFamily="var(--ps-sans)"
                      fontSize="6.5"
                      letterSpacing="0.08em"
                      opacity="0.85"
                      textAnchor="middle"
                      x="200"
                      y="424"
                    >
                      Ø 38.5 MM BODY
                    </text>

                    {/* Right leader lines with technical callouts */}
                    <path d="M225 156H275L292 144H370" fill="none" stroke="#f4f1de" strokeOpacity="0.45" strokeWidth="0.8" />
                    <circle cx="225" cy="156" fill="#f4f1de" opacity="0.85" r="1.5" />
                    <text fill="#f4f1de" fontFamily="var(--ps-sans)" fontSize="6.5" letterSpacing="0.06em" opacity="0.9" x="296" y="140">
                      GPI 18-400 NECK
                    </text>

                    <path d="M262 265H288L305 278H370" fill="none" stroke="#f4f1de" strokeOpacity="0.45" strokeWidth="0.8" />
                    <circle cx="262" cy="265" fill="#f4f1de" opacity="0.85" r="1.5" />
                    <text fill="#f4f1de" fontFamily="var(--ps-sans)" fontSize="6.5" letterSpacing="0.06em" opacity="0.9" x="308" y="274">
                      NOMINAL 30 ML ±0.5
                    </text>

                    <path d="M262 365H285L300 352H370" fill="none" stroke="#f4f1de" strokeOpacity="0.45" strokeWidth="0.8" />
                    <circle cx="262" cy="365" fill="#f4f1de" opacity="0.85" r="1.5" />
                    <text fill="#f4f1de" fontFamily="var(--ps-sans)" fontSize="6.5" letterSpacing="0.06em" opacity="0.9" x="304" y="348">
                      FLINT GLASS BASE
                    </text>
                  </g>

                  {/* Calibration graduation marks along the bottle side */}
                  <g opacity="0.75">
                    <path className="calibration-line" d="M125 265H137" />
                    <text className="calibration-text" textAnchor="end" x="120" y="267">
                      30 ML
                    </text>
                    <path className="calibration-line" d="M125 300H137" />
                    <text className="calibration-text" textAnchor="end" x="120" y="302">
                      20 ML
                    </text>
                    <path className="calibration-line" d="M125 335H137" />
                    <text className="calibration-text" textAnchor="end" x="120" y="337">
                      10 ML
                    </text>
                  </g>

                {/* Radiance halo on finished pack */}
                <circle
                  cx="200"
                  cy="270"
                  data-ps="halo"
                  fill="none"
                  r="150"
                  stroke="#d4c4a8"
                  strokeDasharray="4 2"
                  strokeOpacity=".45"
                  strokeWidth="1.5"
                  style={{ transformOrigin: "200px 270px" }}
                />
                <ellipse cx="200" cy="394" fill="#04070e" opacity=".55" rx="90" ry="9" />

                {/* Bottle body, liquid & custom private label */}
                <g data-ps="bt" style={{ transformOrigin: "200px 300px" }}>
                  <g clipPath="url(#ps-bottle-clip)">
                    {/* Glass inner ambient wash */}
                    <rect fill="#778d7a" fillOpacity="0.08" height="260" width="160" x="120" y="140" />
                    <g data-ps="liq">
                      <rect className="liq" height="220" width="160" x="120" y="190" />
                      <rect className="hi" height="220" width="14" x="150" y="190" />
                    </g>
                    <g data-ps="bub">
                      {BUBBLES.map((b) => (
                        <circle cx={b.cx} cy={b.cy} fill="#f4f1de" fillOpacity="0.75" key={b.cx} r={b.r} />
                      ))}
                    </g>
                  </g>
                  <path className="l" d={BOTTLE} data-ps="out" pathLength={1} />
                  {/* Custom private label */}
                  <g data-ps="lab">
                    <rect
                      fill="#f4f1de"
                      height="92"
                      rx="3"
                      stroke="#0d1b2a"
                      strokeOpacity="0.25"
                      strokeWidth="1"
                      width="102"
                      x="149"
                      y="254"
                    />
                    <text
                      className="spec-note"
                      fill="#415a77"
                      fontSize="5.5"
                      letterSpacing="0.1em"
                      textAnchor="middle"
                      x="200"
                      y="267"
                    >
                      ZORVAXEL LAB · CHENNAI
                    </text>
                    <text
                      className="serif"
                      fill="#0d1b2a"
                      fontSize="13"
                      letterSpacing="-0.02em"
                      textAnchor="middle"
                      x="200"
                      y="284"
                    >
                      ZORVAXEL
                    </text>
                    <text
                      className="spec-note"
                      fill="#778d7a"
                      fontSize="5"
                      letterSpacing="0.08em"
                      textAnchor="middle"
                      x="200"
                      y="293"
                    >
                      Nº 01 · BOTANICAL SERUM
                    </text>
                    <path d="M162 299H238" stroke="#0d1b2a" strokeOpacity="0.2" strokeWidth="0.75" />
                    <path d="M165 306H235M165 313H225M165 320H215" stroke="#0d1b2a" strokeOpacity="0.25" strokeWidth="0.8" />
                    <text
                      className="sans"
                      fill="#0d1b2a"
                      fontSize="6.5"
                      fontWeight="600"
                      letterSpacing="0.08em"
                      textAnchor="middle"
                      x="200"
                      y="335"
                    >
                      BATCH 001 · 30 ML
                    </text>
                  </g>
                </g>

                {/* Dropper assembly */}
                <g data-ps="dr">
                  {/* Rubber bulb */}
                  <rect
                    fill="#778d7a"
                    height="46"
                    rx="14"
                    stroke="#f4f1de"
                    strokeOpacity="0.4"
                    strokeWidth="1.2"
                    width="32"
                    x="184"
                    y="40"
                  />
                  <path d="M196 46V80M204 46V80" stroke="#f4f1de" strokeOpacity="0.25" strokeWidth="1" />
                  {/* Collar band */}
                  <rect
                    fill="#d4c4a8"
                    height="14"
                    rx="2"
                    stroke="#1b263b"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                    width="22"
                    x="189"
                    y="84"
                  />
                  {/* Pipette */}
                  <path className="l" d="M200 98V142" strokeWidth="1.8" />
                  <path d="M197 104V138M203 104V138" stroke="#f4f1de" strokeOpacity="0.3" strokeWidth="0.8" />
                </g>

                {/* Serum droplets */}
                <g>
                  {[0, 1, 2].map((i) => (
                    <path d="M200 -6Q205 3 200 8Q195 3 200 -6Z" data-ps="drop" fill="#eddca8" key={i} />
                  ))}
                </g>

                {/* Outer presentation carton */}
                <g data-ps="carton">
                  <rect
                    fill="#f4f1de"
                    height="182"
                    rx="4"
                    stroke="#0d1b2a"
                    strokeOpacity="0.25"
                    strokeWidth="1.2"
                    width="190"
                    x="105"
                    y="214"
                  />
                  <path d="M105 252H295" stroke="#0d1b2a" strokeOpacity="0.18" strokeWidth="1" />
                  <text className="spec-note" fill="#778d7a" fontSize="6" letterSpacing="0.1em" textAnchor="middle" x="200" y="244">
                    SMALL BATCH MANUFACTURE
                  </text>
                  <text className="serif" fill="#0d1b2a" fontSize="23" letterSpacing="-0.02em" textAnchor="middle" x="200" y="306">
                    ZORVAXEL
                  </text>
                  <path d="M140 316H260" stroke="#778d7a" strokeOpacity="0.3" strokeWidth="1" />
                  <text
                    className="sans"
                    fill="#0d1b2a"
                    fontSize="7.5"
                    fontWeight="500"
                    letterSpacing="0.1em"
                    textAnchor="middle"
                    x="200"
                    y="332"
                  >
                    PRIVATE LABEL · 30 ML
                  </text>
                  <text
                    className="spec-note"
                    fill="#415a77"
                    fontSize="5.5"
                    letterSpacing="0.08em"
                    textAnchor="middle"
                    x="200"
                    y="348"
                  >
                    CHENNAI · FORMULA Nº 01
                  </text>
                </g>

                {/* Carton lid */}
                <g data-ps="lid">
                  <rect
                    fill="#ece7d5"
                    height="34"
                    rx="4"
                    stroke="#0d1b2a"
                    strokeOpacity="0.3"
                    strokeWidth="1.2"
                    width="206"
                    x="97"
                    y="190"
                  />
                  <path d="M97 206H303" stroke="#0d1b2a" strokeOpacity="0.15" strokeWidth="0.8" />
                </g>

                {/* Quality wax seal with Zorvaxel Z monogram */}
                <g data-ps="seal" style={{ transformOrigin: "200px 250px" }}>
                  <circle cx="200" cy="250" fill="#778d7a" r="22" stroke="#d4c4a8" strokeWidth="1.5" />
                  <circle
                    cx="200"
                    cy="250"
                    fill="none"
                    r="17"
                    stroke="#f4f1de"
                    strokeDasharray="2 1.5"
                    strokeOpacity="0.7"
                    strokeWidth="1"
                  />
                  <text className="serif" fill="#f4f1de" fontSize="17" fontWeight="500" textAnchor="middle" x="200" y="256">
                    Z
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Hairline spec strip below the blueprint card */}
          <div aria-label="Batch specifications" className="process-story__spec-strip">
            <div className="process-story__spec-cell">
              <span className="process-story__spec-label">CONTAINER</span>
              <span className="process-story__spec-value">30 ML DROPPER</span>
            </div>
            <div className="process-story__spec-cell">
              <span className="process-story__spec-label">MIN ORDER</span>
              <span className="process-story__spec-value">NO MOQ</span>
            </div>
            <div className="process-story__spec-cell">
              <span className="process-story__spec-label">LEAD TIME</span>
              <span className="process-story__spec-value">5–7 DAYS</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
