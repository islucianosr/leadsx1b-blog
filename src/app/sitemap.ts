import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/blog";
import { SITE_CONFIG } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.blogDomain;
  const listings: MetadataRoute.Sitemap = [
    {
      url: `${base}/blog`,
      changeFrequency: "weekly",
      alternates: { languages: { en: `${base}/blog`, pt: `${base}/pt/blog`, "x-default": `${base}/blog` } },
    },
    {
      url: `${base}/pt/blog`,
      changeFrequency: "weekly",
      alternates: { languages: { en: `${base}/blog`, pt: `${base}/pt/blog`, "x-default": `${base}/blog` } },
    },
    {
      url: `${base}/privacy`,
      changeFrequency: "yearly",
      alternates: { languages: { en: `${base}/privacy`, pt: `${base}/pt/privacidade` } },
    },
    {
      url: `${base}/terms`,
      changeFrequency: "yearly",
      alternates: { languages: { en: `${base}/terms`, pt: `${base}/pt/termos` } },
    },
    {
      url: `${base}/pt/privacidade`,
      changeFrequency: "yearly",
      alternates: { languages: { en: `${base}/privacy`, pt: `${base}/pt/privacidade` } },
    },
    {
      url: `${base}/pt/termos`,
      changeFrequency: "yearly",
      alternates: { languages: { en: `${base}/terms`, pt: `${base}/pt/termos` } },
    },
  ];

  const articles: MetadataRoute.Sitemap = ([...getAllPosts("en"), ...getAllPosts("pt")]).map((post) => {
    const isPt = post.locale === "pt";
    const url = `${base}${isPt ? "/pt" : ""}/blog/${post.slug}`;
    const alternateUrl = post.alternateSlug
      ? `${base}${isPt ? "" : "/pt"}/blog/${post.alternateSlug}`
      : undefined;

    return {
      url,
      changeFrequency: "monthly",
      alternates: {
        languages: {
          [post.locale]: url,
          ...(alternateUrl ? { [isPt ? "en" : "pt"]: alternateUrl } : {}),
          "x-default": isPt && alternateUrl ? alternateUrl : url,
        },
      },
    };
  });

  return [...listings, ...articles];
}
