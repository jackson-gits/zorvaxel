import { Button } from "@/components/Button";
import { TextLink } from "@/components/TextLink";
import { SITE } from "@/lib/site";

export function HomeHero() {
  return (
    <section aria-labelledby="home-title" className="home-hero">
      <div className="home-hero__bg" aria-hidden="true">
        {/*
          Minimal inline SVG background — botanical geometry in brand palette.
          No external image dependency. Fully scalable, zero layout shift.
        */}
        <svg
          className="home-hero__bg-art"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Warm sand bloom — upper right */}
            <radialGradient id="bg-sand" cx="78%" cy="12%" r="55%">
              <stop offset="0%" stopColor="#d4c4a8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#d4c4a8" stopOpacity="0" />
            </radialGradient>
            {/* Moss botanical — lower left */}
            <radialGradient id="bg-moss" cx="8%" cy="88%" r="48%">
              <stop offset="0%" stopColor="#778d7a" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#778d7a" stopOpacity="0" />
            </radialGradient>
            {/* Subtle steel — mid right */}
            <radialGradient id="bg-steel" cx="96%" cy="58%" r="38%">
              <stop offset="0%" stopColor="#415a77" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#415a77" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Colour washes */}
          <rect width="1440" height="800" fill="url(#bg-sand)" />
          <rect width="1440" height="800" fill="url(#bg-moss)" />
          <rect width="1440" height="800" fill="url(#bg-steel)" />

          {/* Large concentric arcs — upper right, very faint */}
          <circle cx="1360" cy="-60" r="460" stroke="#0d1b2a" strokeWidth="0.6" strokeOpacity="0.055" fill="none" />
          <circle cx="1360" cy="-60" r="560" stroke="#0d1b2a" strokeWidth="0.5" strokeOpacity="0.04" fill="none" />
          <circle cx="1360" cy="-60" r="660" stroke="#0d1b2a" strokeWidth="0.4" strokeOpacity="0.03" fill="none" />

          {/* Botanical cross-hair mark — upper right accent */}
          <line x1="1180" y1="80" x2="1360" y2="80" stroke="#778d7a" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1="1270" y1="0"  x2="1270" y2="160" stroke="#778d7a" strokeWidth="0.6" strokeOpacity="0.3" />
          <circle cx="1270" cy="80" r="22" stroke="#778d7a" strokeWidth="0.6" strokeOpacity="0.28" fill="none" />
          <circle cx="1270" cy="80" r="8"  fill="#778d7a" fillOpacity="0.14" />

          {/* Fine horizontal rule — mid right, editorial feel */}
          <line x1="860" y1="398" x2="1440" y2="398" stroke="#0d1b2a" strokeWidth="0.5" strokeOpacity="0.07" />
          <line x1="860" y1="406" x2="1180" y2="406" stroke="#0d1b2a" strokeWidth="0.5" strokeOpacity="0.05" />

          {/* Small registration marks — lower right corner */}
          <path d="M1380 740 h28 M1380 740 v28" stroke="#0d1b2a" strokeWidth="0.7" strokeOpacity="0.12" strokeLinecap="round" />
          <path d="M1408 768 h-28 M1408 768 v-28" stroke="#0d1b2a" strokeWidth="0.7" strokeOpacity="0.12" strokeLinecap="round" />

          {/* Sparse dot field — right half only */}
          {[
            [900, 160],[960, 310],[1020, 90],[1100, 240],[1160, 400],
            [1240, 180],[1310, 320],[1380, 140],[1050, 480],[1140, 580],
            [1290, 520],[1400, 460],[920, 540],[1070, 660],[1200, 700],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.4" fill="#0d1b2a" fillOpacity="0.055" />
          ))}

          {/* Loose moss vine strokes — lower left botanical accent */}
          <path
            d="M-20 680 C80 660, 140 580, 200 600 C260 620, 290 540, 360 530 C420 520, 460 580, 500 560"
            stroke="#778d7a" strokeWidth="1.2" strokeOpacity="0.18" strokeLinecap="round" fill="none"
          />
          <path
            d="M-20 730 C60 710, 120 650, 180 660 C240 670, 280 620, 330 610"
            stroke="#778d7a" strokeWidth="0.8" strokeOpacity="0.12" strokeLinecap="round" fill="none"
          />

          {/* Sand ellipse blob — lower right warm glow */}
          <ellipse cx="1300" cy="780" rx="420" ry="180" fill="#d4c4a8" fillOpacity="0.22" />
        </svg>
      </div>

      <div className="page-shell">
        <div className="home-hero__content">
          <div className="home-hero__copy">
            <p className="eyebrow home-hero__eyebrow">{SITE.home.hero.label}</p>

            <h1 className="home-hero__title" id="home-title">
              Your first serum batch,
              <br />
              without the{" "}
              <span className="home-hero__strike-wrap">
                <em className="home-hero__strike-target">minimum&#8209;order trap.</em>
                <span className="home-hero__strike-bar" aria-hidden="true" />
              </span>
            </h1>

            <p className="home-hero__supporting">{SITE.home.hero.supporting}</p>

            <div className="home-hero__actions">
              <Button href={SITE.ui.enquireHref}>{SITE.home.hero.primaryAction}</Button>
              <TextLink href="#home-process">{SITE.home.hero.secondaryAction}</TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
