import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export function TextLink({
  href,
  children,
  showArrow = true,
  className = "",
  ...linkProps
}: TextLinkProps) {
  return (
    <Link
      className={`text-link${className ? ` ${className}` : ""}`}
      href={href}
      {...linkProps}
    >
      <span>{children}</span>
      {showArrow ? <span aria-hidden="true" className="text-link__arrow">↗</span> : null}
    </Link>
  );
}
