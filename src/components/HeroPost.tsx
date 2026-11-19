import React from "react";
import Link from "next/link";
import { BlogPost } from "../lib/blog";

interface HeroPostProps {
  post: BlogPost;
}

export const HeroPost: React.FC<HeroPostProps> = ({ post }) => {
  const isPt = post.locale === "pt";
  const postUrl = isPt ? `/pt/blog/${post.slug}` : `/blog/${post.slug}`;

  return (
    <article className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xs hover:border-slate-300 transition-all">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-4 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 font-bold text-slate-900 uppercase tracking-wider text-[10px]">
              {isPt ? "Artigo em Destaque" : "Featured Story"}
            </span>
            <span className="text-slate-300">•</span>
            <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-medium text-slate-700 text-[10px]">
              {post.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">{post.readTime}</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-violet-600 sm:text-3xl lg:text-4xl leading-tight">
            <Link href={postUrl} className="focus:outline-none">
              {post.title}
            </Link>
          </h2>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm shadow-xs">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {post.author.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {post.date}
                </p>
              </div>
            </div>

            <Link
              href={postUrl}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 transition group-hover:translate-x-1"
            >
              <span>{isPt ? "Ler artigo completo" : "Read full story"}</span>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Column: Abstract Minimalist Tech Card (No Emojis) */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-6 lg:col-span-5 flex flex-col justify-center items-center">
          <div className="w-full space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                LEADSX1B CRAWLER
              </span>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                STATUS: ATIVO
              </span>
            </div>

            <div className="rounded-xl bg-white p-3.5 shadow-xs border border-slate-200">
              <div className="flex justify-between items-center text-slate-400 text-[10px] mb-1 font-bold">
                <span>CONSULTA GOOGLE MAPS</span>
                <span className="text-violet-600">1.000 LEADS</span>
              </div>
              <div className="font-semibold text-slate-800">
                Clínicas Odontológicas e Estética
              </div>
            </div>

            <div className="rounded-xl bg-white p-3.5 shadow-xs border border-slate-200">
              <div className="flex justify-between items-center text-slate-400 text-[10px] mb-1 font-bold">
                <span>ENRIQUECIMENTO IA</span>
                <span className="text-emerald-600">98.4% ACURÁCIA</span>
              </div>
              <div className="text-slate-700">
                Validação de WhatsApp & Sócios
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 text-white p-3.5 shadow-xs flex justify-between items-center">
              <span className="text-[10px] text-slate-300 font-bold">INTEGRAÇÃO CRM:</span>
              <span className="text-violet-300 font-bold">1-CLIQUE WHATSAPP</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
