"use client";

import React, { useEffect, useState } from "react";
import { TableOfContentItem } from "../lib/blog";
import { SITE_CONFIG } from "../lib/seo";

interface TableOfContentsProps {
  headings: TableOfContentItem[];
  locale: "en" | "pt";
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  locale
}) => {
  const [activeId, setActiveId] = useState<string>("");
  const isPt = locale === "pt";

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Table of Contents List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-900">
          <svg
            className="h-4 w-4 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h10M4 18h7"
            />
          </svg>
          <span>{isPt ? "Neste Artigo" : "Table of Contents"}</span>
        </div>

        <nav className="mt-3 max-h-[60vh] overflow-y-auto pr-1">
          <ul className="space-y-2 text-xs">
            {headings.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(item.id);
                      if (target) {
                        const top =
                          target.getBoundingClientRect().top +
                          window.pageYOffset -
                          80;
                        window.scrollTo({ top, behavior: "smooth" });
                        setActiveId(item.id);
                      }
                    }}
                    className={`block py-1 pl-2 border-l-2 transition ${
                      isActive
                        ? "border-violet-600 font-bold text-violet-600"
                        : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Sidebar Conversion Box */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
          {isPt ? "Plataforma Leadsx1B" : "Leadsx1B Platform"}
        </span>
        <h4 className="text-xs font-bold text-slate-900">
          {isPt ? "Quer extrair leads agora?" : "Ready to extract leads?"}
        </h4>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          {isPt
            ? "Faça sua primeira extração no Google Maps e teste gratuitamente com 100 contatos verificados."
            : "Scrape verified Google Maps prospects with AI enrichment in under 3 minutes."}
        </p>
        <a
          href={SITE_CONFIG.domain}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center rounded-xl bg-violet-600 py-2.5 text-xs font-bold text-white hover:bg-violet-700 transition"
        >
          {isPt ? "Criar Conta Gratuita" : "Start Free Trial"}
        </a>
      </div>
    </div>
  );
};
