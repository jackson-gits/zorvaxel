import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  number?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  titleId?: string;
};

export function SectionHeader({
  title,
  number,
  eyebrow,
  description,
  className = "",
  titleId,
}: SectionHeaderProps) {
  const isNumbered = Boolean(number);
  return (
    <header className={`section-header${isNumbered ? " section-header--numbered" : ""}${className ? ` ${className}` : ""}`}>
      {number ? <span aria-hidden="true" className="section-header__number">{number}</span> : null}
      <div className="section-header__content">
        {eyebrow ? <p className="eyebrow section-header__eyebrow">{eyebrow}</p> : null}
        <h2 className="section-header__title" id={titleId}>{title}</h2>
        {description ? <p className="section-header__description">{description}</p> : null}
      </div>
    </header>
  );
}
