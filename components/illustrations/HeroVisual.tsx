"use client";

/**
 * HeroVisual — a rich animated SVG scene for the Zorvaxel hero section.
 * Shows an amber dropper bottle centre-stage, flanked by a standing carton
 * and two floating ingredient / formula orbits, with a soft ambient glow.
 * All motion respects prefers-reduced-motion.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`hero-visual${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg
        className="hero-visual__svg"
        viewBox="0 0 540 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Ambient glow behind bottle */}
          <radialGradient id="hv-glow" cx="50%" cy="58%" r="42%">
            <stop offset="0%" stopColor="var(--sand)" stopOpacity="0.72" />
            <stop offset="55%" stopColor="var(--moss)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--parchment)" stopOpacity="0" />
          </radialGradient>

          {/* Amber glass gradient — warm cosmetic look */}
          <linearGradient id="hv-amber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0c97a" stopOpacity="0.78" />
            <stop offset="30%" stopColor="#c8823e" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#8d4c1f" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#4d2208" stopOpacity="0.9" />
          </linearGradient>

          {/* Liquid fill */}
          <linearGradient id="hv-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5e9c5" stopOpacity="0.92" />
            <stop offset="50%" stopColor="#d8c190" stopOpacity="0.86" />
            <stop offset="100%" stopColor="#778d7a" stopOpacity="0.80" />
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
            <stop offset="0%" stopColor="#f5f2e8" />
            <stop offset="100%" stopColor="#ece6d6" />
          </linearGradient>

          {/* Drop shadow filter */}
          <filter id="hv-shadow" x="-15%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#0d1b2a" floodOpacity="0.13" />
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
        <ellipse cx="270" cy="310" rx="190" ry="130" fill="url(#hv-glow)" />

        {/* ── Ground contact shadow ── */}
        <ellipse cx="270" cy="420" rx="130" ry="14" fill="var(--navy)" fillOpacity="0.08" />
        <ellipse cx="130" cy="422" rx="52" ry="8" fill="var(--navy)" fillOpacity="0.06" />

        {/* ════════════════════════════════════════
            LAYER 1 — OUTER CARTON (left, standing)
            ════════════════════════════════════════ */}
        <g className="hero-visual__carton" filter="url(#hv-shadow-sm)">
          {/* Front face */}
          <rect x="62" y="118" width="96" height="210" rx="4" fill="url(#hv-carton)" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />
          {/* Right side panel (perspective) */}
          <path d="M158 118 L174 128 L174 338 L158 328 Z" fill="url(#hv-carton-side)" stroke="var(--ink)" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Top flap crease */}
          <path d="M62 138 L158 138" stroke="var(--ink)" strokeWidth="1.1" strokeOpacity="0.5" />
          <path d="M80 118 L84 138 M130 118 L126 138" stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" />

          {/* Brand name */}
          <text x="110" y="168" textAnchor="middle" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" letterSpacing="-0.01em" fill="var(--navy)">ZORVAXEL</text>
          {/* Hairlines */}
          <line x1="80" y1="176" x2="140" y2="176" stroke="var(--ink)" strokeWidth="0.8" strokeOpacity="0.3" />
          <line x1="80" y1="183" x2="128" y2="183" stroke="var(--ink)" strokeWidth="0.8" strokeOpacity="0.2" />

          {/* Moss badge */}
          <rect x="80" y="198" width="34" height="34" rx="3" fill="var(--moss)" fillOpacity="0.88" />
          <path d="M89 215 h16 M97 207 v16" stroke="var(--parchment)" strokeWidth="1.6" strokeLinecap="round" />

          {/* Spec text */}
          <text x="80" y="246" fontFamily="monospace" fontSize="6.2" letterSpacing="0.08em" fill="var(--ink)" fillOpacity="0.55">CHENNAI LAB</text>
          <text x="80" y="254" fontFamily="monospace" fontSize="5.6" letterSpacing="0.08em" fill="var(--ink)" fillOpacity="0.4">30 ML · SERUM</text>

          {/* Batch barcode lines (decorative) */}
          <g strokeWidth="1.2" stroke="var(--ink)" strokeOpacity="0.35">
            {[80,83,86,88,91,94,97,100,104,107,110,113].map((x, i) => (
              <line key={i} x1={x} y1="284" x2={x} y2={i % 3 === 0 ? 300 : 294} />
            ))}
          </g>
          <text x="80" y="310" fontFamily="monospace" fontSize="5.8" letterSpacing="0.1em" fill="var(--ink)" fillOpacity="0.4">ZX-BATCH-01</text>
        </g>

        {/* ════════════════════════════════════════
            LAYER 2 — AMBER DROPPER BOTTLE (centre)
            ════════════════════════════════════════ */}
        <g className="hero-visual__bottle" filter="url(#hv-shadow)">
          {/* Liquid fill (clipped) */}
          <rect
            x="216" y="220"
            width="108" height="168"
            rx="2"
            fill="url(#hv-liquid)"
            clipPath="url(#hv-bottle-clip)"
          />

          {/* Bottle body */}
          <path
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
            {/* Brand on label */}
            <text x="270" y="204" textAnchor="middle" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="9" letterSpacing="-0.01em" fill="var(--navy)">ZORVAXEL</text>
            <line x1="220" y1="209" x2="320" y2="209" stroke="var(--ink)" strokeWidth="0.8" strokeOpacity="0.25" />
            {/* Botanical drop mark */}
            <circle cx="270" cy="228" r="11" fill="var(--moss)" fillOpacity="0.18" stroke="var(--moss)" strokeWidth="1" />
            <path d="M270 220 C267 224,264 226,264 229 A6 6 0 0 0 276 229 C276 226,273 224,270 220 Z" fill="var(--moss)" />
            {/* Spec */}
            <text x="270" y="253" textAnchor="middle" fontFamily="monospace" fontSize="6.2" fontWeight="600" letterSpacing="0.09em" fill="var(--ink)">30 ML · SERUM</text>
            <text x="270" y="262" textAnchor="middle" fontFamily="monospace" fontSize="5.2" letterSpacing="0.07em" fill="var(--steel)">CHENNAI LAB</text>
          </g>

          {/* Dropper cap */}
          <g className="hero-visual__cap">
            {/* Cap collar */}
            <rect x="230" y="66" width="80" height="20" rx="2.5" fill="var(--ink)" stroke="var(--ink)" strokeWidth="1.4" />
            {/* Cap ribs */}
            {[240,250,260,270,280,290,300].map((x) => (
              <line key={x} x1={x} y1="68" x2={x} y2="84" stroke="var(--parchment)" strokeWidth="1" strokeOpacity="0.3" />
            ))}
            {/* Rubber bulb */}
            <path d="M246 66 C246 46,250 32,270 32 C290 32,294 46,294 66 Z" fill="var(--ink)" stroke="var(--ink)" strokeLinejoin="round" strokeWidth="1.6" />
            {/* Bulb highlight */}
            <path d="M254 58 C254 46,257 38,264 34" fill="none" stroke="var(--parchment)" strokeLinecap="round" strokeWidth="1.4" strokeOpacity="0.3" />
          </g>

          {/* Animated serum drop */}
          <path
            className="hero-visual__drop"
            d="M270 136 C266 143,262 148,262 153 A8 8 0 0 0 278 153 C278 148,274 143,270 136 Z"
            fill="var(--moss)"
            stroke="var(--ink)"
            strokeWidth="1.3"
          />
          <circle cx="266" cy="151" r="2" fill="var(--parchment)" fillOpacity="0.8" />
        </g>

        {/* ════════════════════════════════════════
            LAYER 3 — FLOATING INGREDIENT CHIPS
            ════════════════════════════════════════ */}

        {/* Chip: Hyaluronic Acid — upper right */}
        <g className="hero-visual__chip hero-visual__chip--1" filter="url(#hv-chip-shadow)">
          <rect x="358" y="104" width="136" height="52" rx="8" fill="url(#hv-chip-bg)" stroke="var(--line)" strokeWidth="1" />
          <circle cx="381" cy="130" r="13" fill="var(--moss)" fillOpacity="0.22" />
          <text x="381" y="134" textAnchor="middle" fontSize="10" fill="var(--moss)" fontWeight="700">HA</text>
          <text x="402" y="121" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" fill="var(--navy)" letterSpacing="-0.01em">Hyaluronic</text>
          <text x="402" y="135" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" fill="var(--navy)" letterSpacing="-0.01em">Acid</text>
          <text x="402" y="148" fontFamily="monospace" fontSize="7" fill="var(--steel)" letterSpacing="0.06em">HYDRATION</text>
        </g>

        {/* Chip: Niacinamide — lower right */}
        <g className="hero-visual__chip hero-visual__chip--2" filter="url(#hv-chip-shadow)">
          <rect x="372" y="284" width="136" height="52" rx="8" fill="url(#hv-chip-bg)" stroke="var(--line)" strokeWidth="1" />
          <circle cx="395" cy="310" r="13" fill="var(--steel)" fillOpacity="0.18" />
          <text x="395" y="314" textAnchor="middle" fontSize="9" fill="var(--steel)" fontWeight="700">B3</text>
          <text x="416" y="301" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" fill="var(--navy)" letterSpacing="-0.01em">Niacinamide</text>
          <text x="416" y="315" fontFamily="monospace" fontSize="7" fill="var(--steel)" letterSpacing="0.06em">BRIGHTENING</text>
          <text x="416" y="327" fontFamily="monospace" fontSize="6.5" fill="var(--muted-light)" letterSpacing="0.04em">5% CONC.</text>
        </g>

        {/* Chip: Peptides — lower left */}
        <g className="hero-visual__chip hero-visual__chip--3" filter="url(#hv-chip-shadow)">
          <rect x="28" y="280" width="124" height="52" rx="8" fill="url(#hv-chip-bg)" stroke="var(--line)" strokeWidth="1" />
          <circle cx="50" cy="306" r="13" fill="var(--sand)" fillOpacity="0.6" />
          <text x="50" y="310" textAnchor="middle" fontSize="9" fill="var(--navy)" fontWeight="700">Pep</text>
          <text x="72" y="297" fontFamily="var(--font-instrument-serif), Georgia, serif" fontSize="11" fill="var(--navy)" letterSpacing="-0.01em">Peptides</text>
          <text x="72" y="311" fontFamily="monospace" fontSize="7" fill="var(--steel)" letterSpacing="0.06em">ANTI-AGEING</text>
          <text x="72" y="323" fontFamily="monospace" fontSize="6.5" fill="var(--muted-light)" letterSpacing="0.04em">BARRIER</text>
        </g>

        {/* ════════════════════════════════════════
            LAYER 4 — FLOATING ORBIT NODES (small dots)
            ════════════════════════════════════════ */}
        <circle className="hero-visual__node hero-visual__node--a" cx="186" cy="96" r="5" fill="var(--moss)" fillOpacity="0.55" />
        <circle className="hero-visual__node hero-visual__node--b" cx="362" cy="206" r="4" fill="var(--steel)" fillOpacity="0.5" />
        <circle className="hero-visual__node hero-visual__node--c" cx="156" cy="348" r="6" fill="var(--sand)" fillOpacity="0.7" stroke="var(--ink)" strokeWidth="0.8" strokeOpacity="0.2" />
        <circle className="hero-visual__node hero-visual__node--d" cx="400" cy="168" r="3.5" fill="var(--moss)" fillOpacity="0.4" />
        <circle className="hero-visual__node hero-visual__node--e" cx="88" cy="200" r="4" fill="var(--steel)" fillOpacity="0.3" />

        {/* Connecting orbit lines */}
        <line x1="191" y1="96" x2="216" y2="130" stroke="var(--moss)" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 4" />
        <line x1="358" y1="208" x2="336" y2="240" stroke="var(--steel)" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="4 4" />
        <line x1="162" y1="344" x2="208" y2="360" stroke="var(--sand)" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="4 4" />

        {/* ════════════════════════════════════════
            LAYER 5 — LABORATORY ANNOTATION LINES
            ════════════════════════════════════════ */}
        {/* Callout to cap */}
        <line x1="295" y1="48" x2="344" y2="40" stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.2" />
        <text x="348" y="43" fontFamily="monospace" fontSize="7.5" letterSpacing="0.07em" fill="var(--ink)" fillOpacity="0.4">DROPPER CAP</text>

        {/* Callout to label */}
        <line x1="208" y1="228" x2="168" y2="236" stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.2" />
        <text x="80" y="240" fontFamily="monospace" fontSize="7.5" letterSpacing="0.07em" fill="var(--ink)" fillOpacity="0.35" textAnchor="end">AMBER GLASS</text>

        {/* Bottom spec strip */}
        <rect x="204" y="398" width="132" height="18" rx="3" fill="var(--navy)" fillOpacity="0.06" />
        <text x="270" y="411" textAnchor="middle" fontFamily="monospace" fontSize="7" letterSpacing="0.12em" fill="var(--ink)" fillOpacity="0.5">30 ML · AMBER · DROPPER · NO MOQ</text>
      </svg>
    </div>
  );
}
