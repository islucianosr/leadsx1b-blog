"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale } from "../lib/blog";
import { SITE_CONFIG } from "../lib/seo";

interface HeaderProps {
  currentLocale: Locale;
  alternateUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentLocale, alternateUrl }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPt = currentLocale === "pt";
  const targetEnUrl = !isPt ? "#" : alternateUrl || "/blog";
  const targetPtUrl = isPt ? "#" : alternateUrl || "/pt/blog";

  const navLinks = isPt
    ? [
        { label: "Plataforma", href: SITE_CONFIG.domain, external: true },
        { label: "CRM Visual", href: SITE_CONFIG.domain, external: true },
        { label: "WhatsApp", href: SITE_CONFIG.domain, external: true },
        { label: "Preços", href: SITE_CONFIG.domain, external: true },
        { label: "Blog", href: "/pt/blog", active: true }
      ]
    : [
        { label: "Platform", href: SITE_CONFIG.domain, external: true },
        { label: "Visual CRM", href: SITE_CONFIG.domain, external: true },
        { label: "WhatsApp", href: SITE_CONFIG.domain, external: true },
        { label: "Pricing", href: SITE_CONFIG.domain, external: true },
        { label: "Blog", href: "/blog", active: true }
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo (Autograph / Linear Editorial Style) */}
        <a
          href={SITE_CONFIG.domain}
          className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-90"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Leads<span className="text-violet-600">x1B</span>
            </span>
            <span className="text-slate-300 font-light text-lg">|</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Insights
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition hover:text-slate-900 ${
                link.active ? "text-violet-600 font-bold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: SVG Flag Language Switcher & CTAs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
            aria-label={mobileMenuOpen ? (isPt ? "Fechar menu" : "Close menu") : (isPt ? "Abrir menu" : "Open menu")}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span aria-hidden="true" className="text-lg">{mobileMenuOpen ? "×" : "☰"}</span>
          </button>
          {/* Language Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Select Language"
              aria-expanded={isLangOpen}
            >
              {isPt ? (
                <span className="w-4 h-3 inline-block shadow-xs rounded-[1px] overflow-hidden">
                  <svg viewBox="0 0 640 480" className="w-full h-full">
                    <path fill="#009c3b" d="M0 0h640v480H0z"/>
                    <path fill="#ffdf00" d="m320 40 280 200-280 200L40 240z"/>
                    <circle cx="320" cy="240" r="105" fill="#002776"/>
                  </svg>
                </span>
              ) : (
                <span className="w-4 h-3 inline-block shadow-xs rounded-[1px] overflow-hidden">
                  <svg viewBox="0 0 640 480" className="w-full h-full">
                    <path fill="#bd3d44" d="M0 0h640v480H0z"/>
                    <path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
                    <path fill="#192f5d" d="M0 0h256v258H0z"/>
                  </svg>
                </span>
              )}
              <span className="uppercase font-bold tracking-wider text-[11px]">{currentLocale}</span>
              <svg
                className={`h-3 w-3 text-slate-400 transition-transform ${
                  isLangOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isLangOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50"
                role="menu"
              >
                <Link
                  href={targetEnUrl}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                    !isPt
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  role="menuitem"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-3 inline-block shadow-xs rounded-[1px] overflow-hidden">
                      <svg viewBox="0 0 640 480" className="w-full h-full">
                        <path fill="#bd3d44" d="M0 0h640v480H0z"/>
                        <path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
                        <path fill="#192f5d" d="M0 0h256v258H0z"/>
                      </svg>
                    </span>
                    <span>English (/blog)</span>
                  </span>
                  {!isPt && <span className="text-violet-600 font-bold">✓</span>}
                </Link>

                <Link
                  href={targetPtUrl}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                    isPt
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  role="menuitem"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-3 inline-block shadow-xs rounded-[1px] overflow-hidden">
                      <svg viewBox="0 0 640 480" className="w-full h-full">
                        <path fill="#009c3b" d="M0 0h640v480H0z"/>
                        <path fill="#ffdf00" d="m320 40 280 200-280 200L40 240z"/>
                        <circle cx="320" cy="240" r="105" fill="#002776"/>
                      </svg>
                    </span>
                    <span>Português (/pt/blog)</span>
                  </span>
                  {isPt && <span className="text-violet-600 font-bold">✓</span>}
                </Link>
              </div>
            )}
          </div>

          <a
            href={SITE_CONFIG.domain}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-violet-700 active:scale-98"
          >
            {isPt ? "Testar Leadsx1B" : "Try Leadsx1B Free"}
          </a>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden" aria-label={isPt ? "Navegação principal" : "Main navigation"}>
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`rounded-lg px-3 py-3 text-sm font-medium ${link.active ? "bg-violet-50 text-violet-700" : "text-slate-700 hover:bg-slate-50"}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
