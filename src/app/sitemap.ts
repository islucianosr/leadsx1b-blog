import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/blog";
import { SITE_CONFIG } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.blogDomain;
  const listings: MetadataRoute.Sitemap = [
    {
      url: `${base}/blog`,
      lastModified: "2026-11-27",
      changeFrequency: "weekly",
      alternates: { languages: { en: `${base}/blog`, "pt-BR": `${base}/pt/blog`, "x-default": `${base}/blog` } },
    },
    {
      url: `${base}/pt/blog`,
      lastModified: "2026-11-27",
      changeFrequency: "weekly",
      alternates: { languages: { en: `${base}/blog`, "pt-BR": `${base}/pt/blog`, "x-default": `${base}/blog` } },
    },
    {
      url: `${base}/privacy`,
      lastModified: "2026-11-27",
      changeFrequency: "yearly",
      alternates: { languages: { en: `${base}/privacy`, "pt-BR": `${base}/pt/privacidade`, "x-default": `${base}/privacy` } },
    },
    {
      url: `${base}/terms`,
      lastModified: "2026-11-27",
      changeFrequency: "yearly",
      alternates: { languages: { en: `${base}/terms`, "pt-BR": `${base}/pt/termos`, "x-default": `${base}/terms` } },
    },
    {
      url: `${base}/pt/privacidade`,
      lastModified: "2026-11-27",
      changeFrequency: "yearly",
      alternates: { languages: { en: `${base}/privacy`, "pt-BR": `${base}/pt/privacidade`, "x-default": `${base}/privacy` } },
    },
    {
      url: `${base}/pt/termos`,
      lastModified: "2026-11-27",
      changeFrequency: "yearly",
      alternates: { languages: { en: `${base}/terms`, "pt-BR": `${base}/pt/termos`, "x-default": `${base}/terms` } },
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
      lastModified: post.dateISO,
      changeFrequency: "monthly",
      alternates: {
        languages: {
          [post.locale]: url,
          ...(alternateUrl ? { [isPt ? "en" : "pt-BR"]: alternateUrl } : {}),
          "x-default": isPt && alternateUrl ? alternateUrl : url,
        },
      },
    };
  });

  return [...listings, ...articles];
}
