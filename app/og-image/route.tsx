import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

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
          backgroundColor: "#F2EDE1",
          color: "#1F3B34",
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
              <path d="M11 2 C11 2 3 13 3 21 a8 8 0 0 0 16 0 C19 13 11 2 11 2Z" fill="none" stroke="#1F3B34" strokeWidth="1.5" />
              <path d="M11 7 v17" fill="none" stroke="#C86A4A" strokeLinecap="round" strokeWidth="1.5" />
            </svg>
            <span style={{ fontSize: "29px", letterSpacing: "-1px" }}>{SITE.name}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "68px",
              color: "#435E57",
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
              color: "#435E57",
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
            backgroundColor: "#DCE2D4",
          }}
        >
          <svg height="360" viewBox="0 0 160 360" width="160" aria-hidden="true">
            <g fill="none" stroke="#1F3B34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M72 24h16v50H72z" />
              <path d="M68 30h24M68 40h24M68 50h24M68 60h24" />
              <path d="M76 74v29l-29 31c-8 9-12 20-12 33v112c0 20 14 34 34 34h22c20 0 34-14 34-34V167c0-13-4-24-12-33l-29-31V74" />
              <path d="M48 185h64v61H48z" />
              <path d="M58 202h44M58 216h35" />
              <path d="M44 285h72" />
            </g>
            <path d="M80 16c0 0-8 11-8 17a8 8 0 0 0 16 0c0-6-8-17-8-17Z" fill="#C86A4A" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "66px",
            bottom: "36px",
            color: "#435E57",
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
