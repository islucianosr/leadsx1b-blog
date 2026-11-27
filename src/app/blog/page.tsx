import React from "react";
import { Metadata } from "next";
import { getAllPosts } from "../../lib/blog";
import { CATEGORIES } from "../../lib/categories";
import { SITE_CONFIG } from "../../lib/seo";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { PostCard } from "../../components/PostCard";
import { SearchAndFilter } from "../../components/SearchAndFilter";
import { BlogJsonLd } from "../../components/BlogJsonLd";

export const metadata: Metadata = {
  title: "Leadsx1B Insights — B2B Lead Generation & WhatsApp Sales",
  description:
    "Real-world data, outbound playbooks, and pipeline architectures to help modern sales teams extract Google Maps leads and close deals on WhatsApp.",
  alternates: {
    canonical: `${SITE_CONFIG.blogDomain}/blog`,
    languages: {
      en: `${SITE_CONFIG.blogDomain}/blog`,
      "pt-BR": `${SITE_CONFIG.blogDomain}/pt/blog`,
      "x-default": `${SITE_CONFIG.blogDomain}/blog`
    }
  },
  openGraph: {
    title: "Leadsx1B Insights — B2B Lead Generation & Outbound Sales",
    description:
      "Actionable outbound sales playbooks, Google Maps lead extraction, and automated visual CRM pipelines.",
    url: `${SITE_CONFIG.blogDomain}/blog`,
    siteName: "Leadsx1B",
    locale: "en_US",
    type: "website",
    images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630, alt: "Leadsx1B Insights" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadsx1B Insights — B2B Lead Generation & WhatsApp Sales",
    description: "Real-world data, outbound playbooks, and pipeline architectures for modern sales teams.",
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function BlogEnPage() {
  const posts = getAllPosts("en");
  const topStories = posts.slice(0, 3);

  const categoryCounts: Record<string, number> = {};
  posts.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col justify-between">
      <BlogJsonLd locale="en" />
      <Header currentLocale="en" alternateUrl="/pt/blog" />

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 flex-1">
        {/* Editorial Hero Header (Matching Autograph Reference) */}
        <section className="border-b border-slate-100 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Official Leadsx1B Publication
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
                Real-world insights to help{" "}
                <span className="text-slate-400 font-normal">
                  founders build and scale with purpose.
                </span>
              </h1>
            </div>

            {/* Social proof & newsletter card */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    The Leadsx1B outbound playbook
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Practical guides for prospecting, pipeline and sales
                  </p>
                </div>
              </div>

              <a href={SITE_CONFIG.domain} className="inline-flex rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-violet-700">
                Explore Leadsx1B
              </a>
            </div>
          </div>
        </section>

        {/* Search & Minimal Categories */}
        <SearchAndFilter
          locale="en"
          categoryCounts={categoryCounts}
          posts={posts}
        />

        {/* Section 1: Top Stories for Leaders */}
        <section className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Top stories for founders and business leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topStories.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div className="h-1 w-14 bg-violet-600 rounded-full" />
            <div className="h-1 w-6 bg-slate-200 rounded-full" />
            <div className="h-1 w-6 bg-slate-200 rounded-full" />
          </div>
        </section>

        {/* Section 2: Explore Popular Categories (Folder Cards) */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Explore Popular Categories
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Curated teardowns and tactics to scale every phase of outbound sales.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, idx) => {
              const count = posts.filter((p) => p.category === cat.name.en).length;
              const colorClass =
                idx === 0
                  ? "bg-violet-600"
                  : idx === 1
                  ? "bg-emerald-600"
                  : idx === 2
                  ? "bg-indigo-600"
                  : "bg-slate-700";

              return (
                <div
                  key={cat.id}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-slate-300 hover:bg-white transition space-y-4"
                >
                  <div className="relative h-12 w-full flex items-end">
                    <div className="absolute bottom-2 left-0 right-0 h-8 rounded-lg bg-slate-200 transform -rotate-2" />
                    <div
                      className={`absolute bottom-1 left-1 right-1 h-8 rounded-lg ${colorClass} opacity-80 transform rotate-1`}
                    />
                    <div className="relative h-8 w-full rounded-lg bg-white border border-slate-200 shadow-xs flex items-center px-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        DIR_{cat.id.toUpperCase().slice(0, 6)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-violet-600 transition">
                      {cat.name.en}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {count} articles
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Social Proof Quotes & Purple Newsletter Drop Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Built for focused, repeatable outbound
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Connect lead discovery, CRM stages and WhatsApp conversations in one clear workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-900">
                  From search to first conversation
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Extract local prospects, add useful context and move qualified leads into a visible pipeline.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-900">
                  Follow up without losing context
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Keep stages, next actions and conversation history organized as opportunities progress.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-violet-600 p-8 text-white flex flex-col justify-between space-y-6 shadow-xl shadow-violet-600/20">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold leading-tight">
                Explore ideas to improve your outbound process.
              </h3>
              <p className="text-xs text-violet-100 leading-relaxed">
                Browse practical WhatsApp playbooks, lead generation guides, and sales pipeline ideas.
              </p>
            </div>

            <a href={SITE_CONFIG.domain} className="inline-flex w-full items-center justify-center rounded-xl bg-white py-3 text-sm font-bold text-violet-700 shadow-md transition hover:bg-violet-50">
              Explore the platform
            </a>
          </div>
        </section>
      </main>

      <Footer locale="en" />
    </div>
  );
}
