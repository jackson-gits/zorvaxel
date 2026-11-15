import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

// OG images render outside the document, so CSS custom properties are unavailable.
// Keep these literals in sync with the palette tokens in app/globals.css.
const PALETTE = {
  parchment: "#F4F1DE",
  navy: "#0D1B2A",
  slate: "#1B263B",
  steel: "#415A77",
  moss: "#778D7A",
  steelDark: "#3A4F66",
  sand: "#D4C4A8",
} as const;

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "1200px",
          height: "630px",
          overflow: "hidden",
          backgroundColor: PALETTE.parchment,
          color: PALETTE.navy,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            zIndex: 2,
            flexDirection: "column",
            width: "760px",
            padding: "58px 0 0 74px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <svg height="34" viewBox="0 0 22 34" width="22" aria-hidden="true">
              <path d="M11 2 C11 2 3 13 3 21 a8 8 0 0 0 16 0 C19 13 11 2 11 2Z" fill="none" stroke={PALETTE.navy} strokeWidth="1.5" />
              <path d="M11 7 v17" fill="none" stroke={PALETTE.moss} strokeLinecap="round" strokeWidth="1.5" />
            </svg>
            <span style={{ fontSize: "29px", letterSpacing: "-1px" }}>{SITE.name}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "68px",
              color: PALETTE.steelDark,
              fontFamily: "Arial, sans-serif",
              fontSize: "15px",
              letterSpacing: "2px",
            }}
          >
            {SITE.home.hero.label}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "670px",
              marginTop: "24px",
              fontSize: "65px",
              letterSpacing: "-2.5px",
              lineHeight: 1.02,
            }}
          >
            {SITE.home.hero.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "26px",
              color: PALETTE.steelDark,
              fontFamily: "Arial, sans-serif",
              fontSize: "20px",
            }}
          >
            {SITE.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "78px",
            right: "66px",
            width: "330px",
            height: "474px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: PALETTE.navy,
          }}
        >
          <svg height="360" viewBox="0 0 160 360" width="160" aria-hidden="true">
            <g fill="none" stroke={PALETTE.parchment} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M72 24h16v50H72z" />
              <path d="M68 30h24M68 40h24M68 50h24M68 60h24" />
              <path d="M76 74v29l-29 31c-8 9-12 20-12 33v112c0 20 14 34 34 34h22c20 0 34-14 34-34V167c0-13-4-24-12-33l-29-31V74" />
              <path d="M48 185h64v61H48z" />
              <path d="M58 202h44M58 216h35" />
              <path d="M44 285h72" />
            </g>
            <path d="M80 16c0 0-8 11-8 17a8 8 0 0 0 16 0c0-6-8-17-8-17Z" fill={PALETTE.moss} />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "66px",
            bottom: "36px",
            color: PALETTE.steelDark,
            fontFamily: "Arial, sans-serif",
            fontSize: "11px",
            letterSpacing: "2px",
          }}
        >
          {SITE.footer.copyright.toUpperCase()}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
