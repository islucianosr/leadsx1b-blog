import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "../../../../lib/blog";
import { generateHreflangTags, getArticleImageUrl, SITE_CONFIG } from "../../../../lib/seo";
import { BlogJsonLd } from "../../../../components/BlogJsonLd";
import { Header } from "../../../../components/Header";
import { Footer } from "../../../../components/Footer";
import { ReadingProgressBar } from "../../../../components/ReadingProgressBar";
import { TableOfContents } from "../../../../components/TableOfContents";
import { InArticleCTA } from "../../../../components/InArticleCTA";
import { BottomCTA } from "../../../../components/BottomCTA";
import { PostCard } from "../../../../components/PostCard";
import { renderMarkdown } from "../../../../lib/markdown";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts("pt");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug, "pt");
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
      canonical: `${SITE_CONFIG.blogDomain}/pt/blog/${post.slug}`,
      languages: alternatesLanguages
    },
    openGraph: {
      title: `${post.title} | Leadsx1B Insights`,
      description: post.seo.metaDescription,
      url: `${SITE_CONFIG.blogDomain}/pt/blog/${post.slug}`,
      siteName: SITE_CONFIG.name,
      locale: "pt_BR",
      type: "article",
      publishedTime: `${post.dateISO}T08:00:00.000Z`,
      authors: [post.author.name],
      images: [{ url: getArticleImageUrl(post), width: 1200, height: 630, alt: post.title }]
    },
    twitter: { card: "summary_large_image", title: `${post.title} | Leadsx1B Insights`, description: post.seo.metaDescription, images: [getArticleImageUrl(post)] }
  };
}

export default function BlogPostPtPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug, "pt");
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const alternateEnUrl = post.alternateSlug
    ? `/blog/${post.alternateSlug}`
    : `/blog`;

  const contentParts = post.content.split("\n## ");
  const midPoint = Math.floor(contentParts.length / 2);
  const firstHalf = contentParts.slice(0, midPoint).join("\n## ");
  const secondHalf = contentParts.slice(midPoint).join("\n## ");

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col justify-between">
      <BlogJsonLd locale="pt" post={post} />

      <ReadingProgressBar />
      <Header currentLocale="pt" alternateUrl={alternateEnUrl} />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/pt/blog" className="flex items-center gap-1 font-bold text-violet-600 hover:text-violet-800 transition">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
              <span>Voltar ao Blog</span>
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold">{post.category}</span>
            <span>/</span>
            <span className="truncate max-w-[200px] sm:max-w-md text-slate-400 font-normal">
              {post.title}
            </span>
          </div>

          <Link
            href={alternateEnUrl}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:border-violet-300 hover:text-violet-600 transition shadow-xs"
          >
            <span className="w-4 h-3 inline-block shadow-xs rounded-[1px] overflow-hidden">
              <svg viewBox="0 0 640 480" className="w-full h-full">
                <path fill="#bd3d44" d="M0 0h640v480H0z"/>
                <path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
                <path fill="#192f5d" d="M0 0h256v258H0z"/>
              </svg>
            </span>
            <span>Read in English (/blog)</span>
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
            <time dateTime={post.dateISO} className="text-slate-500">
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

        <figure className="max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
          <img src={post.coverImage} alt={post.title} width={1200} height={630} className="aspect-[1200/630] w-full object-cover" />
        </figure>

        {/* Article Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 space-y-8 text-slate-800 leading-relaxed text-[15px]">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(firstHalf) }} />
            <InArticleCTA locale="pt" />
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown("## " + secondHalf) }} />
          </article>

          <aside className="hidden lg:block lg:col-span-4 sticky top-28">
            <TableOfContents headings={post.headings} locale="pt" />
          </aside>
        </div>

        <BottomCTA locale="pt" />

        {/* Related Posts */}
        <section className="space-y-6 pt-4 border-t border-slate-100">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Artigos Relacionados
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Mais estratégias para aprimorar sua máquina de aquisição de clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <PostCard key={rel.slug} post={rel} />
            ))}
          </div>
        </section>
      </main>

      <Footer locale="pt" />
    </div>
  );
}

