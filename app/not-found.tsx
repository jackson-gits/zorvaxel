import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.seo.notFound.title} | ${SITE.name}` },
  description: SITE.seo.notFound.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="page-main not-found" id="main-content">
      <div className="page-shell not-found__inner">
        <p className="eyebrow">{SITE.notFound.eyebrow}</p>
        <h1>{SITE.notFound.title}</h1>
        <p>{SITE.notFound.description}</p>
        <Button href="/">{SITE.notFound.action}</Button>
        <span aria-hidden="true" className="not-found__number">404</span>
      </div>
    </main>
  );
}
