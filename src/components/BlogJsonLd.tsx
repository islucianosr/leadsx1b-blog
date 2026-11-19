import type { BlogPost, Locale } from "../lib/blog";
import { generateBlogJsonLdGraph } from "../lib/seo";

interface BlogJsonLdProps {
  locale: Locale;
  post?: BlogPost;
}

export function BlogJsonLd({ locale, post }: BlogJsonLdProps) {
  const jsonLd = JSON.stringify(generateBlogJsonLdGraph(locale, post)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />;
}
