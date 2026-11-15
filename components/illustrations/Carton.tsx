import type { SVGProps } from "react";

type CartonProps = SVGProps<SVGSVGElement>;

export function Carton({ className, ...props }: CartonProps) {
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
        <path d="M36 24h48v72H36z" />
        <path d="M36 34h48M46 24l5 10M74 24l-5 10M47 59h26M47 64h26M47 69h18" />
      </g>
      <path d="M70 57h6v6h-6z" fill="var(--accent)" />
    </svg>
  );
}
