import type { SVGProps } from "react";

type DropperBottleProps = SVGProps<SVGSVGElement> & { animate?: boolean };

export function DropperBottle({
  className,
  animate = false,
  ...props
}: DropperBottleProps) {
  const classes = [
    "package-illustration",
    animate ? "package-illustration--draw" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      viewBox="0 0 120 120"
      className={classes}
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
        <path d="M48 16h24v12H48zM51 28v8l-8 9v45a9 9 0 0 0 9 9h16a9 9 0 0 0 9-9V45l-8-9v-8" />
        <path d="M43 49h34M46 83h28M50 60h20M50 65h20" />
      </g>
      <path
        className="package-illustration__drop package-illustration__drop--fall"
        d="M60 55c-2.7 4-4 6.2-4 8a4 4 0 0 0 8 0c0-1.8-1.3-4-4-8Z"
        fill="var(--accent)"
      />
    </svg>
  );
}
