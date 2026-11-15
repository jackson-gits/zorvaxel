import { SITE } from "@/lib/site";
import type { BlogPost } from "@/lib/blog";

type JsonLdProps = {
  data: Record<string, unknown>;
};

function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function LocalBusinessJsonLd() {
  const phone = SITE.contact.phone.href?.startsWith("tel:")
    ? SITE.contact.phone.href.slice(4)
    : undefined;
  const email = SITE.contact.email.href?.startsWith("mailto:")
    ? SITE.contact.email.href.slice(7)
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...(SITE.origin ? { "@id": `${SITE.origin}/#business`, url: SITE.origin } : {}),
    name: SITE.name,
    description: SITE.shortDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
  };

  return <JsonLd data={data} />;
}

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const articleUrl = SITE.origin
    ? new URL(`/blog/${post.slug}`, SITE.origin).toString()
    : undefined;
  const imageUrl = SITE.origin
    ? new URL("/og-image", SITE.origin).toString()
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    ...(articleUrl
      ? { mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl }, url: articleUrl }
      : {}),
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    articleSection: post.category,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      ...(SITE.origin ? { url: SITE.origin } : {}),
    },
    ...(imageUrl ? { image: [imageUrl] } : {}),
  };

  return <JsonLd data={data} />;
}

export function FAQPageJsonLd({
  questions,
}: {
  questions: readonly { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
