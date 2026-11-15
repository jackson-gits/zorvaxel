import type { SVGProps } from "react";

type VialProps = SVGProps<SVGSVGElement>;

export function Vial({ className, ...props }: VialProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={["package-illustration", className].filter(Boolean).join(" ")}
      {...props}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M47 21h26v13H47zM50 34v8l-8 10v38a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8V52l-8-10v-8" />
        <path d="M43 55h34M45 84h30M50 65h20M50 70h20" />
        <path d="M49 30h22" stroke="var(--accent)" />
      </g>
    </svg>
  );
}
