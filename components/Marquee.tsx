type MarqueeProps = {
  items: readonly string[];
  accessibleLabel: string;
};

export function Marquee({ items, accessibleLabel }: MarqueeProps) {
  const phrase = items.join(" · ");

  return (
    <div aria-label={accessibleLabel} className="marquee">
      <span className="sr-only">{phrase}</span>
      <div aria-hidden="true" className="marquee__track">
        {[0, 1].map((copy) => (
          <span className="marquee__group" key={copy}>
            {items.map((item, index) => (
              <span className="marquee__item" key={`${copy}-${index}`}>
                {item}
                <span className="marquee__separator">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
