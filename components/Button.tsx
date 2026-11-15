import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  showArrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export function Button({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className = "",
  ...linkProps
}: ButtonProps) {
  return (
    <Link
      className={`button button--${variant}${className ? ` ${className}` : ""}`}
      href={href}
      {...linkProps}
    >
      <span className="button__label">{children}</span>
      {showArrow ? (
        <span aria-hidden="true" className="button__arrow">
          ↗
        </span>
      ) : null}
    </Link>
  );
}
