const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

const root = path.join(__dirname, "..");
const contentRoot = path.join(root, "content", "blog");
const publicRoot = path.join(root, "public");
const siteUrl = (process.env.NEXT_PUBLIC_BLOG_URL || "https://www.leads1xb.pro").replace(/\/$/, "");

const windows1252 = new Map([
  ["€", 0x80], ["‚", 0x82], ["ƒ", 0x83], ["„", 0x84], ["…", 0x85],
  ["†", 0x86], ["‡", 0x87], ["ˆ", 0x88], ["‰", 0x89], ["Š", 0x8a],
  ["‹", 0x8b], ["Œ", 0x8c], ["Ž", 0x8e], ["‘", 0x91], ["’", 0x92],
  ["“", 0x93], ["”", 0x94], ["•", 0x95], ["–", 0x96], ["—", 0x97],
  ["˜", 0x98], ["™", 0x99], ["š", 0x9a], ["›", 0x9b], ["œ", 0x9c],
  ["ž", 0x9e], ["Ÿ", 0x9f],
]);

function repairMojibake(value) {
  return value.split(/(\r?\n)/).map((line) => {
    if (!line || /^\r?\n$/.test(line)) return line;
    const bytes = [];
    for (const char of line) {
      const point = char.codePointAt(0);
      if (point <= 0xff) bytes.push(point);
      else if (windows1252.has(char)) bytes.push(windows1252.get(char));
      else return line;
    }
    try {
      const decoded = new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
      const markers = (text) => (text.match(/Ã|Â|â€|â€™|â€œ|â€“|â€”/g) || []).length;
      return markers(decoded) < markers(line) ? decoded : line;
    } catch {
      return line;
    }
  }).join("");
}

function readPosts(locale) {
  const folder = path.join(contentRoot, locale);
  return fs.readdirSync(folder)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const parsed = matter(fs.readFileSync(path.join(folder, file), "utf8"));
      return {
        ...parsed.data,
        title: repairMojibake(String(parsed.data.title || "")),
        excerpt: repairMojibake(String(parsed.data.excerpt || "")),
        slug: parsed.data.slug || file.replace(/\.md$/, ""),
        locale,
        content: repairMojibake(parsed.content.trim()),
      };
    })
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

const english = readPosts("en");
const portuguese = readPosts("pt");
const postUrl = (post) => `${siteUrl}${post.locale === "pt" ? "/pt" : ""}/blog/${post.slug}`;

const links = (posts) => posts.map((post) =>
  `- [${post.title}](${postUrl(post)}): ${post.excerpt}`
).join("\n");

const llms = [
  "# Leadsx1B Blog",
  "> Official bilingual blog about B2B prospecting, Google Maps lead generation, WhatsApp sales, and CRM workflows.",
  "",
  "The blog is published in English and Portuguese. Article pages are public and can be cited with their canonical URLs.",
  "",
  "## Blog indexes",
  `- [English blog](${siteUrl}/blog): Latest English articles.`,
  `- [Blog em português](${siteUrl}/pt/blog): Artigos recentes em português.`,
  "",
  "## English articles",
  links(english),
  "",
  "## Artigos em português",
  links(portuguese),
  "",
  "## Full article text",
  `- [Full text of all listed articles](${siteUrl}/llms-full.txt): Markdown source with article titles, summaries, and body text.`,
  "",
].join("\n");

const fullText = [
  "# Leadsx1B Blog — Full Article Text",
  "> Full text of the public English and Portuguese articles published on the Leadsx1B blog.",
  "",
  ...[...english, ...portuguese].flatMap((post) => [
    `## ${post.title}`,
    `Canonical URL: ${postUrl(post)}`,
    `Language: ${post.locale === "pt" ? "Português" : "English"}`,
    `Published: ${post.date || ""}`,
    "",
    post.excerpt,
    "",
    post.content,
    "",
    "---",
    "",
  ]),
].join("\n");

fs.mkdirSync(publicRoot, { recursive: true });
fs.writeFileSync(path.join(publicRoot, "llms.txt"), llms, "utf8");
fs.writeFileSync(path.join(publicRoot, "llms-full.txt"), fullText, "utf8");
console.log(`Generated discovery files for ${english.length + portuguese.length} articles.`);
