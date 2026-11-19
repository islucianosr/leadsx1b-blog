import React from "react";
import Link from "next/link";
import { Locale } from "../lib/blog";
import { SITE_CONFIG } from "../lib/seo";

interface BottomCTAProps {
  locale: Locale;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ locale }) => {
  const isPt = locale === "pt";

  return (
    <section className="my-14 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-16 text-center space-y-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <span className="inline-block rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[11px] font-semibold text-violet-300 uppercase tracking-wider">
          {isPt ? "Automação Outbound B2B" : "B2B Outbound Automation"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {isPt
            ? "Pronto para escalar sua prospecção com IA?"
            : "Ready to scale your outbound with AI?"}
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          {isPt
            ? "Extraia leads qualificados do Google Maps, enriqueça dados e envie abordagens no WhatsApp diretamente do seu CRM visual."
            : "Scrape high-intent Google Maps leads, verify phone lines with AI, and manage cold WhatsApp outreach with built-in CRM."}
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={SITE_CONFIG.domain}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto rounded-xl bg-violet-600 px-6 py-3 text-xs font-bold text-white hover:bg-violet-700 transition"
          >
            {isPt ? "Testar Leadsx1B Grátis" : "Try Leadsx1B Free"}
          </a>
          <a
            href={SITE_CONFIG.domain}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            {isPt ? "Ver Demonstração" : "Book a Live Demo"}
          </a>
        </div>
      </div>
    </section>
  );
};
