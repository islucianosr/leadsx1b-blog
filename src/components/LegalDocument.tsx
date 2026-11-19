import Link from "next/link";
import { Locale } from "../lib/blog";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalDocumentProps {
  locale: Locale;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
  documentType: "privacy" | "terms";
}

export function LegalDocument({ locale, title, summary, updated, sections, documentType }: LegalDocumentProps) {
  const isPt = locale === "pt";
  const languageUrl = isPt
    ? documentType === "privacy" ? "/privacy" : "/terms"
    : documentType === "privacy" ? "/pt/privacidade" : "/pt/termos";

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center justify-between gap-4 text-sm">
        <Link href={isPt ? "/pt/blog" : "/blog"} className="font-semibold text-violet-700 hover:text-violet-900">
          ← {isPt ? "Voltar ao blog" : "Back to the blog"}
        </Link>
        <Link href={languageUrl} lang={isPt ? "en" : "pt"} className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-600 hover:border-violet-300 hover:text-violet-700">
          {isPt ? "English" : "Português"}
        </Link>
      </nav>

      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-violet-700">Leadsx1B Insights</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{summary}</p>
        <p className="mt-5 text-sm text-slate-500">{isPt ? "Última atualização:" : "Last updated:"} {updated}</p>
      </header>

      <div className="space-y-9 text-[15px] leading-7 text-slate-700">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {section.bullets && (
              <ul className="list-disc space-y-2 pl-6">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-slate-50 p-6 text-sm leading-6 text-slate-600">
        {isPt ? "Dúvidas ou pedidos de privacidade?" : "Questions or privacy requests?"}{" "}
        <a className="font-semibold text-violet-700 underline underline-offset-4" href="mailto:suporte@leads1xb.pro">
          suporte@leads1xb.pro
        </a>
      </div>
    </main>
  );
}
