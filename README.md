# Leadsx1B Blog

A bilingual English and Portuguese blog for Leadsx1B, an AI-powered B2B lead-generation platform. The platform helps sales teams find qualified businesses on Google Maps, filter prospects with AI, manage leads in a CRM pipeline, and start WhatsApp outreach in one click.

- **Official platform:** [www.leads1xb.pro](https://www.leads1xb.pro/)
- **This repository:** the public blog and its content; it is not the Leadsx1B application or CRM dashboard.

## Routes

| Page | Route |
| --- | --- |
| English blog index | `/blog` |
| English article | `/blog/[slug]` |
| Portuguese blog index | `/pt/blog` |
| Portuguese article | `/pt/blog/[slug]` |

Article slugs are defined in each Markdown file's frontmatter. `alternateSlug` connects the English and Portuguese versions for the language switcher and SEO alternate links. The blog's platform links point to the official platform URL above.

## Search and AI discovery

- `src/app/robots.ts` allows public search and AI crawlers and publishes the sitemap URL.
- `src/app/sitemap.ts` builds a sitemap from the current article files, including language alternates.
- `public/llms.txt` and `public/llms-full.txt` are regenerated from the Markdown articles before each production build.
- On Vercel, set `NEXT_PUBLIC_BLOG_URL` to the blog's canonical origin (for example, `https://blog.leads1xb.pro`). If unset, it defaults to `https://www.leads1xb.pro`.

To publish an article, add its Markdown file under `content/blog/en/` or `content/blog/pt/`, commit it, and push to the production branch. The connected Vercel project rebuilds the article pages and discovery files from those sources.

## Requirements

- Node.js 18.17 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/blog](http://localhost:3000/blog) for English or [http://localhost:3000/pt/blog](http://localhost:3000/pt/blog) for Portuguese.

## Build and production

```bash
npm run build
npm start
```

`npm run lint` runs the Next.js linter.

## Add or edit an article

Create a Markdown file in `content/blog/en/` or `content/blog/pt/`. Include the frontmatter fields used by the blog:

```markdown
---
title: "A Practical Guide to B2B Lead Generation"
slug: "b2b-lead-generation-guide"
locale: "en"
alternateSlug: "guia-de-geracao-de-leads-b2b"
category: "B2B Lead Generation"
excerpt: "A short summary shown on the blog index and in search results."
coverImage: "/images/example-cover.svg"
author:
  name: "Leadsx1B Team"
  role: "Editorial Team"
  avatar: "/images/author-default.jpg"
date: "November 19, 2026"
readTime: "5 min read"
featured: false
seo:
  metaTitle: "A Practical Guide to B2B Lead Generation"
  metaDescription: "A concise description of the article."
  keywords: ["B2B leads", "lead generation"]
  ogImage: "/images/example-cover.svg"
---

Article content in Markdown. Use `##` headings for the article table of contents.
```

Use the corresponding language's directory and set `locale` to `en` or `pt`. `alternateSlug` should match the other-language article's `slug`. Image paths are relative to `public/`; add the referenced image there. Category names and IDs are defined in `src/lib/categories.ts`:

- B2B Lead Generation
- WhatsApp Sales
- CRM & Pipeline
- Guides & Tutorials

## Project structure

```text
content/blog/       English and Portuguese Markdown articles
public/             Static assets, robots.txt, sitemap.xml, and LLM context files
src/app/            Next.js App Router pages and root layout
src/components/     Blog UI components
src/lib/blog.ts     Markdown loading, article metadata, and related-post helpers
src/lib/categories.ts
src/lib/seo.ts      Canonical domain, metadata helpers, and structured data
```

## SEO and domain

`src/lib/seo.ts` is the source of truth for the canonical site domain used by the application, metadata, structured data, and platform links. Static SEO files under `public/` also contain absolute URLs; update them if the production domain changes:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`
- `public/llms-full.txt`

The current official domain is `https://www.leads1xb.pro`. Keep the hostname consistent across canonical URLs, sitemap entries, social metadata, and platform calls to action.
