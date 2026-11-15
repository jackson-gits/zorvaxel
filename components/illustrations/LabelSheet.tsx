import type { SVGProps } from "react";

type LabelSheetProps = SVGProps<SVGSVGElement>;

export function LabelSheet({ className, ...props }: LabelSheetProps) {
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
        <path d="M35 25h50v70H35zM42 33h36v22H42zM42 64h25M42 70h31M42 76h19M42 84h13" />
        <path d="M72 64v20M76 64v20M80 64v20M84 64v20" />
      </g>
      <path d="M42 33h36v4H42z" fill="var(--accent)" />
    </svg>
  );
}
