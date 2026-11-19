import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "../lib/seo";

const protectedPaths = ["/api/", "/admin/", "/dashboard/private/"];

export default function robots(): MetadataRoute.Robots {
  const publicBots = [
    "OAI-SearchBot",
    "GPTBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "Applebot-Extended",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: protectedPaths },
      ...publicBots.map((userAgent) => ({ userAgent, allow: "/", disallow: protectedPaths })),
    ],
    sitemap: `${SITE_CONFIG.blogDomain}/sitemap.xml`,
  };
}
