import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "../../../lib/blog";
import { CATEGORIES } from "../../../lib/categories";
import { SITE_CONFIG } from "../../../lib/seo";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { PostCard } from "../../../components/PostCard";
import { SearchAndFilter } from "../../../components/SearchAndFilter";

export const metadata: Metadata = {
  title: "Blog Leadsx1B — Prospecção B2B, Vendas no WhatsApp e CRM",
  description:
    "Análises táticas e dados práticos para equipes comerciais acelerarem receita, extraírem leads do Google Maps e escalarem vendas no WhatsApp.",
  alternates: {
    canonical: `${SITE_CONFIG.blogDomain}/pt/blog`,
    languages: {
      en: `${SITE_CONFIG.blogDomain}/blog`,
      pt: `${SITE_CONFIG.blogDomain}/pt/blog`,
      "x-default": `${SITE_CONFIG.blogDomain}/blog`
    }
  },
  openGraph: {
    title: "Blog Leadsx1B — Estratégias Outbound, Leads e WhatsApp Sales",
    description:
      "Aprenda a estruturar operações outbound de alta conversão com IA, Google Maps e CRM integrado.",
    url: `${SITE_CONFIG.blogDomain}/pt/blog`,
    siteName: "Leadsx1B Insights",
    locale: "pt_BR",
    type: "website"
  }
};

export default function BlogPtPage() {
  const posts = getAllPosts("pt");
  const topStories = posts.slice(0, 3);

  const categoryCounts: Record<string, number> = {};
  posts.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col justify-between">
      <Header currentLocale="pt" alternateUrl="/blog" />

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 flex-1">
        {/* Editorial Hero Header (Matching Autograph Reference) */}
        <section className="border-b border-slate-100 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Publicação Oficial Leadsx1B
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
                Estratégias e análises práticas para{" "}
                <span className="text-slate-400 font-normal">
                  equipes comerciais acelerarem receita e escala B2B.
                </span>
              </h1>
            </div>

            {/* Social proof & newsletter card */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white text-[10px] font-bold border-2 border-white">
                    RA
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-700 text-white text-[10px] font-bold border-2 border-white">
                    MS
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-[10px] font-bold border-2 border-white">
                    BM
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    +5.000 líderes comerciais
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Recebem nossas análises semanais
                  </p>
                </div>
              </div>

              <form className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="seu.email@empresa.com"
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-700 transition shrink-0"
                  >
                    Inscrever
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Search & Minimal Categories */}
        <SearchAndFilter
          locale="pt"
          categoryCounts={categoryCounts}
          posts={posts}
        />

        {/* Section 1: Top Stories for Leaders */}
        <section className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Destaques para líderes e gestores comerciais
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
              Explorar Categorias Principais
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Táticas selecionadas para cada estágio da sua operação de vendas.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, idx) => {
              const count = posts.filter((p) => p.category === cat.name.pt).length;
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
                      {cat.name.pt}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {count} artigos publicados
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
                Recomendado por mais de 2.000 líderes e operações comerciais
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Empresas B2B, agências e consultorias que escalaram sua prospecção ativa com o Leadsx1B.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="space-y-2">
                <p className="text-xs italic text-slate-700 leading-relaxed">
                  "Reduzimos o tempo de prospecção de 4 horas para 12 minutos ao extrair clínicas direto do Google Maps com validação de WhatsApp."
                </p>
                <p className="text-[11px] font-bold text-slate-900">
                  Rodrigo Castilho — Diretor Comercial
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs italic text-slate-700 leading-relaxed">
                  "A cadência segura de WhatsApp e o pipeline integrado transformaram nossas taxas de resposta em 38% constantes."
                </p>
                <p className="text-[11px] font-bold text-slate-900">
                  Letícia Duarte — Sócia em Agência B2B
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-violet-600 p-8 text-white flex flex-col justify-between space-y-6 shadow-xl shadow-violet-600/20">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold leading-tight">
                Fique por dentro das melhores táticas.
              </h3>
              <p className="text-xs text-violet-100 leading-relaxed">
                Receba novos scripts de WhatsApp, parâmetros de busca do Google Maps e guias práticos sem nenhum spam.
              </p>
            </div>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="seu.email@empresa.com"
                className="w-full rounded-xl border border-violet-400/40 bg-violet-700/60 px-4 py-3 text-xs text-white placeholder:text-violet-200 focus:bg-violet-800 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-white py-3 text-xs font-bold text-violet-700 hover:bg-violet-50 transition shadow-md"
              >
                Quero Receber os Artigos
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer locale="pt" />
    </div>
  );
}
