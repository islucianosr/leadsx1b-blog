import { slugify } from "./blog";

const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

function renderInline(markdown: string): string {
  return escapeHtml(markdown)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, '<a href="$2" rel="nofollow">$1</a>');
}

function splitTableRow(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function renderBlock(block: string): string {
  const text = block.trim();
  if (!text) return "";

  const code = text.match(/^```([\w-]*)\n?([\s\S]*?)```$/);
  if (code) return `<pre class="my-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100"><code${code[1] ? ` class="language-${escapeHtml(code[1])}"` : ""}>${escapeHtml(code[2])}</code></pre>`;

  if (/^(?:---+|\*\*\*+|___+)\s*$/.test(text)) return '<hr class="my-8 border-slate-200" />';

  const h3 = text.match(/^###\s+(.+)$/);
  if (h3) return `<h3 class="mb-3 mt-8 text-xl font-bold text-slate-900">${renderInline(h3[1])}</h3>`;
  const h2 = text.match(/^##\s+(.+)$/);
  if (h2) return `<h2 id="${escapeHtml(slugify(h2[1].trim()))}" class="mb-4 mt-10 border-b border-slate-100 pb-2 text-2xl font-bold text-slate-900">${renderInline(h2[1])}</h2>`;

  const tip = text.match(/^>\s*\[!TIP\]\s*\n>\s*([\s\S]+)$/);
  if (tip) return `<aside class="my-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium text-slate-800"><strong>Note:</strong> ${renderInline(tip[1])}</aside>`;
  if (/^>\s?/.test(text)) {
    return `<blockquote class="my-4 rounded-r-xl border-l-4 border-violet-600 bg-slate-50/50 py-1 pl-4 italic text-slate-700">${text.split("\n").map((line) => renderInline(line.replace(/^>\s?/, ""))).join("<br />")}</blockquote>`;
  }

  const lines = text.split("\n");
  if (lines.every((line) => /^\s*[-*+]\s+/.test(line))) {
    return `<ul class="my-4 list-disc space-y-2 pl-6 text-slate-700">${lines.map((line) => `<li>${renderInline(line.replace(/^\s*[-*+]\s+/, ""))}</li>`).join("")}</ul>`;
  }
  if (lines.every((line) => /^\s*\d+[.)]\s+/.test(line))) {
    return `<ol class="my-4 list-decimal space-y-2 pl-6 text-slate-700">${lines.map((line) => `<li>${renderInline(line.replace(/^\s*\d+[.)]\s+/, ""))}</li>`).join("")}</ol>`;
  }

  if (lines.length > 1 && lines.every((line) => /^\s*\|.*\|\s*$/.test(line))) {
    const rows = lines.map(splitTableRow);
    const hasHeader = rows.length > 1 && rows[1].every((cell) => /^:?-{3,}:?$/.test(cell));
    const head = hasHeader ? `<thead><tr>${rows[0].map((cell) => `<th class="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold">${renderInline(cell)}</th>`).join("")}</tr></thead>` : "";
    const bodyRows = rows.slice(hasHeader ? 2 : 0);
    const body = `<tbody>${bodyRows.map((row) => `<tr>${row.map((cell) => `<td class="border border-slate-200 px-3 py-2">${renderInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody>`;
    return `<div class="my-5 overflow-x-auto"><table class="w-full border-collapse text-sm">${head}${body}</table></div>`;
  }

  return `<p class="my-4 leading-relaxed text-slate-700">${lines.map(renderInline).join("<br />")}</p>`;
}

export function renderMarkdown(markdown: string): string {
  const horizontalRuleToken = "\u0000BLOG_HR\u0000";
  const blocks = markdown
    .replace(/^\s{0,3}(?:-{3,}|\*{3,}|_{3,})\s*$/gm, horizontalRuleToken)
    .split(horizontalRuleToken);

  return blocks
    .map((part) => part.split(/\n\s*\n/).map(renderBlock).filter(Boolean).join("\n"))
    .join('<hr class="my-8 border-slate-200" />');
}
