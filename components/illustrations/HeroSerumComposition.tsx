import type { SVGProps } from "react";

type HeroSerumCompositionProps = SVGProps<SVGSVGElement> & {
  animate?: boolean;
};

export function HeroSerumComposition({
  className = "",
  animate = true,
  ...props
}: HeroSerumCompositionProps) {
  return (
    <svg
      aria-hidden="true"
      className={`hero-serum-composition${animate ? " hero-serum-composition--animate" : ""}${className ? ` ${className}` : ""}`}
      fill="none"
      focusable="false"
      viewBox="0 0 280 280"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Soft shadow for the entire composition */}
        <filter height="130%" id="hero-shadow" filterUnits="userSpaceOnUse" width="120%" x="-10%" y="-10%">
          <feDropShadow dx="0" dy="16" floodColor="var(--navy)" floodOpacity="0.14" stdDeviation="14" />
        </filter>

        {/* Ambient base contact shadow */}
        <radialGradient cx="50%" cy="50%" id="base-shadow" r="50%">
          <stop offset="0%" stopColor="var(--navy)" stopOpacity="0.25" />
          <stop offset="55%" stopColor="var(--navy)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--navy)" stopOpacity="0" />
        </radialGradient>

        {/* Authentic warm amber cosmetic glass gradient */}
        <linearGradient id="amber-glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#e5b27a" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#ba763b" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#8d4c1f" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#542b0d" stopOpacity="0.85" />
        </linearGradient>

        {/* Radiant serum liquid fill inside the bottle */}
        <linearGradient id="serum-liquid" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f0e2b6" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#d8c190" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#778d7a" stopOpacity="0.82" />
        </linearGradient>

        {/* Outer presentation carton surface */}
        <linearGradient id="carton-face" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f5f2e3" />
          <stop offset="60%" stopColor="#ece5d0" />
          <stop offset="100%" stopColor="#ded5be" />
        </linearGradient>
      </defs>

      {/* Ground contact shadows */}
      <ellipse cx="90" cy="242" fill="url(#base-shadow)" rx="44" ry="7" />
      <ellipse cx="178" cy="244" fill="url(#base-shadow)" rx="50" ry="9" />

      {/* ============================================================ */}
      {/* 1. LAYER: REAR OUTER CARTON (Standing to the left)           */}
      {/* ============================================================ */}
      <g className="hero-comp__carton" filter="url(#hero-shadow)">
        {/* Main front face */}
        <rect
          fill="url(#carton-face)"
          height="168"
          rx="3"
          stroke="var(--ink)"
          strokeLinejoin="round"
          strokeWidth="1.4"
          width="74"
          x="52"
          y="68"
        />

        {/* Carton top crease & flap detail */}
        <path
          d="M52 86h74M68 68l6 18M110 68l-6 18"
          stroke="var(--ink)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />

        {/* Brand wordmark on carton */}
        <text
          fill="var(--navy)"
          fontFamily="var(--font-instrument-serif), Georgia, serif"
          fontSize="9.5"
          letterSpacing="-0.02em"
          textAnchor="middle"
          x="89"
          y="108"
        >
          ZORVAXEL
        </text>

        {/* Debossed carton design lines */}
        <line stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.8" x1="64" x2="114" y1="116" y2="116" />
        <line stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.8" x1="64" x2="104" y1="122" y2="122" />

        {/* Carton sage foil accent badge */}
        <rect fill="var(--moss)" fillOpacity="0.9" height="28" rx="2" width="28" x="64" y="140" />
        <path d="M72 154h12M78 148v12" stroke="var(--parchment)" strokeLinecap="round" strokeWidth="1.5" />

        {/* Spec note */}
        <text
          fill="var(--ink)"
          fillOpacity="0.6"
          fontFamily="monospace"
          fontSize="5.2"
          letterSpacing="0.08em"
          x="64"
          y="184"
        >
          CHENNAI LAB
        </text>

        {/* Carton footer batch code */}
        <text
          fill="var(--ink)"
          fillOpacity="0.5"
          fontFamily="monospace"
          fontSize="6"
          letterSpacing="0.1em"
          x="64"
          y="218"
        >
          ZX-BATCH-01
        </text>
        <line stroke="var(--ink)" strokeOpacity="0.25" strokeWidth="0.8" x1="64" x2="114" y1="223" y2="223" />
      </g>

      {/* ============================================================ */}
      {/* 2. LAYER: AMBER SERUM DROPPER BOTTLE (Foreground, overlapping) */}
      {/* ============================================================ */}
      <g className="hero-comp__bottle" filter="url(#hero-shadow)">
        {/* Liquid level fill inside bottle */}
        <path
          d="M152 142
             C152 138, 155 135, 160 135
             H196
             C201 135, 204 138, 204 142
             V224
             C204 231, 198 236, 190 236
             H166
             C158 236, 152 231, 152 224
             Z"
          fill="url(#serum-liquid)"
        />

        {/* Amber glass bottle outline and glass body */}
        <path
          d="M166 68
             H190
             V86
             L196 94
             C203 102, 206 112, 206 122
             V224
             C206 233, 199 240, 190 240
             H166
             C157 240, 150 233, 150 224
             V122
             C150 112, 153 102, 160 94
             L166 86
             Z"
          fill="url(#amber-glass)"
          stroke="var(--ink)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />

        {/* Glass base thickness shelf */}
        <path
          d="M154 227 C154 234, 160 237, 168 237 H188 C196 237, 202 234, 202 227"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />

        {/* Tactile cream label band */}
        <g className="hero-comp__label">
          <rect
            fill="var(--parchment)"
            height="62"
            rx="2"
            stroke="var(--ink)"
            strokeWidth="1.1"
            width="53"
            x="151.5"
            y="136"
          />
          {/* Brand header on label */}
          <text
            fill="var(--navy)"
            fontFamily="var(--font-instrument-serif), Georgia, serif"
            fontSize="7"
            letterSpacing="-0.01em"
            textAnchor="middle"
            x="178"
            y="149"
          >
            ZORVAXEL
          </text>
          <line stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="0.8" x1="160" x2="196" y1="153" y2="153" />

          {/* Sage green botanical droplet seal */}
          <circle cx="178" cy="166" fill="var(--moss)" fillOpacity="0.2" r="7.5" stroke="var(--moss)" strokeWidth="0.9" />
          <path
            d="M178 161.5 C176 164.2, 174.5 165.5, 174.5 167 A3.5 3.5 0 0 0 181.5 167 C181.5 165.5, 180 164.2, 178 161.5 Z"
            fill="var(--moss)"
          />

          <text
            fill="var(--ink)"
            fontFamily="monospace"
            fontSize="5.2"
            fontWeight="600"
            letterSpacing="0.08em"
            textAnchor="middle"
            x="178"
            y="184"
          >
            30 ML · SERUM
          </text>
          <text
            fill="var(--steel)"
            fontFamily="monospace"
            fontSize="4.2"
            letterSpacing="0.06em"
            textAnchor="middle"
            x="178"
            y="191"
          >
            CHENNAI LAB
          </text>
        </g>

        {/* Vertical glass specular reflection highlight */}
        <line
          stroke="var(--parchment)"
          strokeLinecap="round"
          strokeOpacity="0.45"
          strokeWidth="2.2"
          x1="156"
          x2="156"
          y1="102"
          y2="224"
        />

        {/* Bottle neck collar rings */}
        <path d="M164 74h28M164 80h28" stroke="var(--ink)" strokeWidth="1.2" />

        {/* Dropper Cap assembly */}
        <g className="hero-comp__cap">
          {/* Ribbed cap collar */}
          <rect
            fill="var(--ink)"
            height="16"
            rx="1.5"
            stroke="var(--ink)"
            strokeWidth="1.4"
            width="30"
            x="163"
            y="54"
          />
          {/* Cap rib vertical lines */}
          <line stroke="var(--parchment)" strokeOpacity="0.35" strokeWidth="0.8" x1="168" x2="168" y1="56" y2="68" />
          <line stroke="var(--parchment)" strokeOpacity="0.35" strokeWidth="0.8" x1="173" x2="173" y1="56" y2="68" />
          <line stroke="var(--parchment)" strokeOpacity="0.35" strokeWidth="0.8" x1="178" x2="178" y1="56" y2="68" />
          <line stroke="var(--parchment)" strokeOpacity="0.35" strokeWidth="0.8" x1="183" x2="183" y1="56" y2="68" />
          <line stroke="var(--parchment)" strokeOpacity="0.35" strokeWidth="0.8" x1="188" x2="188" y1="56" y2="68" />

          {/* Rubber bulb squeeze top */}
          <path
            d="M170 54
               C170 42, 172 34, 178 34
               C184 34, 186 42, 186 54
               Z"
            fill="var(--ink)"
            stroke="var(--ink)"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          {/* Bulb highlight */}
          <path
            d="M174 50 C174 44, 175 40, 178 38"
            fill="none"
            stroke="var(--parchment)"
            strokeLinecap="round"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* ============================================================ */}
      {/* 3. LAYER: FLOATING PRECISION GLASS PIPETTE & SAGE DROPLET   */}
      {/* ============================================================ */}
      <g className="hero-comp__pipette">
        {/* Floating animated serum droplet */}
        <path
          className="hero-comp__drop"
          d="M178 96
             C175 101, 172 104, 172 107
             A6 6 0 0 0 184 107
             C184 104, 181 101, 178 96
             Z"
          fill="var(--moss)"
          stroke="var(--ink)"
          strokeWidth="1.2"
        />
        {/* Highlight inside drop */}
        <circle cx="176" cy="105.5" fill="var(--parchment)" fillOpacity="0.8" r="1.5" />
      </g>
    </svg>
  );
}
