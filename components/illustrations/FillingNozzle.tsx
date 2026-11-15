import type { SVGProps } from "react";

type FillingNozzleProps = SVGProps<SVGSVGElement>;

export function FillingNozzle({ className, ...props }: FillingNozzleProps) {
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
        <path d="M28 29h26v9H28zM41 38v26h20v10H45v10M54 33h30v9H54M84 33v28H67v10h-6" />
        <path d="M34 29v-7h14v7M45 83h10v10H45zM62 93h-7M45 97h10" />
      </g>
      <path
        d="M60 78c-2.2 3.2-3.2 4.8-3.2 6.2a3.2 3.2 0 0 0 6.4 0c0-1.4-1-3-3.2-6.2Z"
        fill="var(--accent)"
      />
    </svg>
  );
}
