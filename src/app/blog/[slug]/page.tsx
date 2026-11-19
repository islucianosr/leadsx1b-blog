import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "../../../lib/blog";
import { generateHreflangTags, generateJsonLd, SITE_CONFIG } from "../../../lib/seo";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { ReadingProgressBar } from "../../../components/ReadingProgressBar";
import { TableOfContents } from "../../../components/TableOfContents";
import { InArticleCTA } from "../../../components/InArticleCTA";
import { BottomCTA } from "../../../components/BottomCTA";
import { PostCard } from "../../../components/PostCard";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts("en");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug, "en");
  if (!post) return {};

  const hreflangs = generateHreflangTags(post);
  const alternatesLanguages: Record<string, string> = {};
  hreflangs.forEach((h) => {
    alternatesLanguages[h.hrefLang] = h.href;
  });

  return {
    title: `${post.title} | Leadsx1B Insights`,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/blog/${post.slug}`,
      languages: alternatesLanguages
    },
    openGraph: {
      title: `${post.title} | Leadsx1B Insights`,
      description: post.seo.metaDescription,
      url: `${SITE_CONFIG.domain}/blog/${post.slug}`,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: "article",
      publishedTime: `${post.date}T08:00:00+00:00`,
      authors: [post.author.name],
      images: [{ url: post.seo.ogImage, width: 1200, height: 630, alt: post.title }]
    }
  };
}

export default function BlogPostEnPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug, "en");
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const { articleSchema, breadcrumbSchema } = generateJsonLd(post);

  const alternatePtUrl = post.alternateSlug
    ? `/pt/blog/${post.alternateSlug}`
    : `/pt/blog`;

  const contentParts = post.content.split("\n## ");
  const midPoint = Math.floor(contentParts.length / 2);
  const firstHalf = contentParts.slice(0, midPoint).join("\n## ");
  const secondHalf = contentParts.slice(midPoint).join("\n## ");

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReadingProgressBar />
      <Header currentLocale="en" alternateUrl={alternatePtUrl} />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/blog" className="flex items-center gap-1 font-bold text-violet-600 hover:text-violet-800 transition">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
              <span>Back to Stories</span>
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold">{post.category}</span>
            <span>/</span>
            <span className="truncate max-w-[200px] sm:max-w-md text-slate-400 font-normal">
              {post.title}
            </span>
          </div>

          <Link
            href={alternatePtUrl}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:border-violet-300 hover:text-violet-600 transition shadow-xs"
          >
            <span className="w-4 h-3 inline-block shadow-xs rounded-[1px] overflow-hidden">
              <svg viewBox="0 0 640 480" className="w-full h-full">
                <path fill="#009c3b" d="M0 0h640v480H0z"/>
                <path fill="#ffdf00" d="m320 40 280 200-280 200L40 240z"/>
                <circle cx="320" cy="240" r="105" fill="#002776"/>
              </svg>
            </span>
            <span>Ler em Português (/pt/blog)</span>
          </Link>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 font-bold text-slate-800 uppercase tracking-wider text-[10px]">
              {post.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">{post.readTime}</span>
            <span className="text-slate-300">•</span>
            <time dateTime={post.date} className="text-slate-500">
              {post.date}
            </time>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs">
              {post.author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{post.author.name}</p>
              <p className="text-[11px] text-slate-500">{post.author.role}</p>
            </div>
          </div>
        </header>

        {/* Article Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 space-y-8 text-slate-800 leading-relaxed text-[15px]">
            <div dangerouslySetInnerHTML={{ __html: renderCleanMarkdown(firstHalf) }} />
            <InArticleCTA locale="en" />
            <div dangerouslySetInnerHTML={{ __html: renderCleanMarkdown("## " + secondHalf) }} />
          </article>

          <aside className="hidden lg:block lg:col-span-4 sticky top-28">
            <TableOfContents headings={post.headings} locale="en" />
          </aside>
        </div>

        <BottomCTA locale="en" />

        {/* Related Posts */}
        <section className="space-y-6 pt-4 border-t border-slate-100">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Related Stories
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              More tactical playbooks to elevate your customer acquisition engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <PostCard key={rel.slug} post={rel} />
            ))}
          </div>
        </section>
      </main>

      <Footer locale="en" />
    </div>
  );
}

function renderCleanMarkdown(markdown: string): string {
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-3 text-slate-900">$1</h3>')
    .replace(/^## (.*$)/gim, (_, title) => {
      const id = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
      return `<h2 id="${id}" class="text-2xl font-bold mt-10 mb-4 text-slate-900 border-b border-slate-100 pb-2">${title}</h2>`;
    })
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```json([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto my-4 font-mono"><code>$1</code></pre>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto my-4 font-mono"><code>$1</code></pre>')
    .replace(/^> \[\!TIP\]\s*\n> (.*$)/gim, '<div class="my-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800 font-medium"><strong>Note:</strong> $1</div>')
    .replace(/^> (.*$)/gim, '<blockquote class="my-4 border-l-4 border-violet-600 pl-4 py-1 italic text-slate-700 bg-slate-50/50 rounded-r-xl">$1</blockquote>')
    .replace(/\n\n/g, '</p><p class="my-4 leading-relaxed text-slate-700">');

  return `<p class="my-4 leading-relaxed text-slate-700">${html}</p>`;
}
