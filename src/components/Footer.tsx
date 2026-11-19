import React from "react";
import Link from "next/link";
import { Locale } from "../lib/blog";
import { SITE_CONFIG } from "../lib/seo";

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const isPt = locale === "pt";

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-900">
                Leads<span className="text-violet-600">x1B</span>
              </span>
              <span className="text-slate-300 font-light">|</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Insights
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              {isPt
                ? "Plataforma tudo-em-um para extrair leads do Google Maps com IA, gerenciar contatos em CRM visual e disparar mensagens no WhatsApp com segurança."
                : "The all-in-one AI platform to extract verified leads from Google Maps, organize in a visual CRM, and reach out on WhatsApp."}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>
                {isPt
                  ? "Infraestrutura 100% operacional"
                  : "All systems operational"}
              </span>
            </div>
          </div>

          {/* Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {isPt ? "Plataforma" : "Platform"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={SITE_CONFIG.domain} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                  {isPt ? "Google Maps Scraping" : "Google Maps Extractor"}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.domain} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                  {isPt ? "Enriquecimento IA" : "AI Enrichment"}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.domain} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                  {isPt ? "CRM Kanban Integrado" : "Visual CRM Pipeline"}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.domain} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                  {isPt ? "Módulo de WhatsApp" : "WhatsApp Outreach"}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Content */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {isPt ? "Conteúdo" : "Content"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href={isPt ? "/pt/blog" : "/blog"}
                  className="text-violet-600 font-bold hover:underline"
                >
                  {isPt ? "Blog & Playbooks" : "Blog & Playbooks"}
                </Link>
              </li>
              <li>
                <a href={SITE_CONFIG.domain} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                  {isPt ? "Documentação Técnica" : "Documentation & API"}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.domain} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                  {isPt ? "Modelos de Abordagem" : "Outreach Templates"}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.domain} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                  {isPt ? "Casos de Sucesso" : "Case Studies"}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Languages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {isPt ? "Idiomas" : "Languages"}
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <Link
                href="/pt/blog"
                className={`flex items-center gap-2 rounded-lg p-1.5 transition ${
                  isPt ? "font-bold text-slate-900" : "hover:text-slate-900"
                }`}
              >
                <span className="w-4 h-3 inline-block shadow-xs rounded-[1px] overflow-hidden">
                  <svg viewBox="0 0 640 480" className="w-full h-full">
                    <path fill="#009c3b" d="M0 0h640v480H0z"/>
                    <path fill="#ffdf00" d="m320 40 280 200-280 200L40 240z"/>
                    <circle cx="320" cy="240" r="105" fill="#002776"/>
                  </svg>
                </span>
                <span>Português (/pt/blog)</span>
              </Link>
              <Link
                href="/blog"
                className={`flex items-center gap-2 rounded-lg p-1.5 transition ${
                  !isPt ? "font-bold text-slate-900" : "hover:text-slate-900"
                }`}
              >
                <span className="w-4 h-3 inline-block shadow-xs rounded-[1px] overflow-hidden">
                  <svg viewBox="0 0 640 480" className="w-full h-full">
                    <path fill="#bd3d44" d="M0 0h640v480H0z"/>
                    <path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
                    <path fill="#192f5d" d="M0 0h256v258H0z"/>
                  </svg>
                </span>
                <span>English (/blog)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Sub-footer Legal */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-8 text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Leadsx1B Inc. {isPt ? "Todos os direitos reservados." : "All rights reserved."}</p>
          <div className="flex items-center gap-6">
            <Link href={isPt ? "/pt/privacidade" : "/privacy"} className="hover:text-slate-600 transition">
              {isPt ? "Privacidade" : "Privacy"}
            </Link>
            <Link href={isPt ? "/pt/termos" : "/terms"} className="hover:text-slate-600 transition">
              {isPt ? "Termos" : "Terms"}
            </Link>
            <a href="mailto:suporte@leads1xb.pro?subject=Security" className="hover:text-slate-600 transition">
              {isPt ? "Segurança" : "Security"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
