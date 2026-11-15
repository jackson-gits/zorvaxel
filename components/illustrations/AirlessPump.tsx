import type { SVGProps } from "react";

type AirlessPumpProps = SVGProps<SVGSVGElement>;

export function AirlessPump({ className, ...props }: AirlessPumpProps) {
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
        <path d="M43 38h34v51a9 9 0 0 1-9 9H52a9 9 0 0 1-9-9V38ZM47 30h26v8H47z" />
        <path d="M54 30v-8h19v4H60v4M73 26h10M43 49h34M48 62h24M48 67h24M48 87h24" />
      </g>
      <path d="M57 54h6v3h-6z" fill="var(--accent)" />
    </svg>
  );
}
