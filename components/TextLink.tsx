import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export function TextLink({
  href,
  children,
  showArrow = true,
  external = false,
  className = "",
  ...linkProps
}: TextLinkProps) {
  const isExternal = external || href.startsWith("http") || href.startsWith("//");
  return (
    <Link
      className={`text-link${className ? ` ${className}` : ""}`}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...linkProps}
    >
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden="true"
          className={`text-link__arrow${isExternal ? " text-link__arrow--external" : ""}`}
        >
          {isExternal ? "↗" : "→"}
        </span>
      ) : null}
    </Link>
  );
}
