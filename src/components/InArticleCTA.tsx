import React from "react";
import Link from "next/link";
import { Locale } from "../lib/blog";
import { SITE_CONFIG } from "../lib/seo";

interface InArticleCTAProps {
  locale: Locale;
}

export const InArticleCTA: React.FC<InArticleCTAProps> = ({ locale }) => {
  const isPt = locale === "pt";

  return (
    <aside className="my-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 not-prose">
      <div className="space-y-1 text-center sm:text-left">
        <span className="text-[10px] font-bold tracking-wider uppercase text-violet-700">
          {isPt ? "Plataforma Leadsx1B" : "Leadsx1B Platform"}
        </span>
        <h3 className="text-lg font-bold text-slate-900">
          {isPt
            ? "Extraia leads do Google Maps em segundos"
            : "Extract leads from Google Maps in seconds"}
        </h3>
        <p className="text-xs text-slate-500 max-w-md">
          {isPt
            ? "Encontre empresas ativas, valide telefones com WhatsApp e envie abordagens personalizadas direto do CRM visual."
            : "Locate active businesses, verify real WhatsApp lines with AI, and dispatch personalized outreach sequences with 1 click."}
        </p>
      </div>

      <a
        href={SITE_CONFIG.domain}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-violet-700 transition shadow-xs text-center"
      >
        {isPt ? "Testar 100 Leads Grátis" : "Get 100 Free Leads"}
      </a>
    </aside>
  );
};
