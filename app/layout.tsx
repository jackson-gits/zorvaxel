import type { Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WebSiteJsonLd } from "@/components/JsonLd";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0D1B2A",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata = createPageMetadata({
  title: SITE.seo.home.title,
  description: SITE.seo.home.description,
  path: "/",
});

metadata.icons = {
  icon: "/dropper-mark.svg",
  shortcut: "/dropper-mark.svg",
  apple: "/dropper-mark.svg",
};
metadata.manifest = "/manifest.webmanifest";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
        <noscript>
          <style>{".scroll-reveal { opacity: 1 !important; transform: none !important; }"}</style>
        </noscript>
        <WebSiteJsonLd />
        <SmoothScroll />
        <a className="skip-link" href="#main-content">
          {SITE.ui.skipToContent}
        </a>
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
