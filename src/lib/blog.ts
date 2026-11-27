import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Locale = "en" | "pt";

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface PostSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  ogTitle?: string;
  ogImageAlt?: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  locale: Locale;
  alternateSlug?: string;
  category: string;
  excerpt: string;
  coverImage: string;
  author: Author;
  date: string;
  dateISO: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  content: string;
  headings: TableOfContentItem[];
  seo: PostSEO;
}

const CONTENT_PATH = path.join(process.cwd(), "content", "blog");

const MONTHS: Record<string, number> = {
  january: 1, janeiro: 1,
  february: 2, fevereiro: 2,
  march: 3, marco: 3,
  april: 4, abril: 4,
  may: 5, maio: 5,
  june: 6, junho: 6,
  july: 7, julho: 7,
  august: 8, agosto: 8,
  september: 9, setembro: 9,
  october: 10, outubro: 10,
  november: 11, novembro: 11,
  december: 12, dezembro: 12,
};

export function toISODate(value: string): string {
  const text = String(value).trim();
  let year: number;
  let month: number;
  let day: number;
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const localized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const ptDate = localized.match(/^(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})$/);
  const enDate = localized.match(/^([a-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);

  if (iso) {
    year = Number(iso[1]); month = Number(iso[2]); day = Number(iso[3]);
  } else if (ptDate) {
    day = Number(ptDate[1]); month = MONTHS[ptDate[2]]; year = Number(ptDate[3]);
  } else if (enDate) {
    month = MONTHS[enDate[1]]; day = Number(enDate[2]); year = Number(enDate[3]);
  } else {
    const parsed = new Date(text);
    if (Number.isNaN(parsed.getTime())) throw new Error(`Invalid blog publication date: ${value}`);
    return parsed.toISOString().slice(0, 10);
  }

  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (!month || parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) {
    throw new Error(`Invalid blog publication date: ${value}`);
  }
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractHeadings(content: string): TableOfContentItem[] {
  const headings: TableOfContentItem[] = [];
  const h2Regex = /^##\s+(.+)$/gm;
  let match;
  while ((match = h2Regex.exec(content)) !== null) {
    const title = match[1].trim();
    headings.push({
      id: slugify(title),
      title
    });
  }
  return headings;
}

export function calculateReadTime(content: string, locale: Locale): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return locale === "pt" ? `${minutes} min de leitura` : `${minutes} min read`;
}

export function getAllPosts(locale: Locale): BlogPost[] {
  const dir = path.join(CONTENT_PATH, locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));

  const posts = files.map((file) => {
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);

    return {
      title: data.title,
      slug: data.slug || file.replace(/\.md$/, ""),
      locale,
      alternateSlug: data.alternateSlug,
      category: data.category,
      excerpt: data.excerpt,
      coverImage: data.coverImage || "/images/default-cover.svg",
      author: data.author || {
        name: "Leadsx1B Team",
        role: "Growth Team",
        avatar: "/images/author-default.jpg"
      },
      date: data.date,
      dateISO: toISODate(data.date),
      readTime: data.readTime || calculateReadTime(content, locale),
      featured: Boolean(data.featured),
      tags: Array.isArray(data.tags) ? data.tags : [],
      content,
      headings: extractHeadings(content),
      seo: data.seo || {
        metaTitle: `${data.title} | Leadsx1B`,
        metaDescription: data.excerpt,
        keywords: [],
        ogImage: data.coverImage || "/images/blog-google-maps-lead-gen.png"
      }
    } as BlogPost;
  });

  return posts.sort(
    (a, b) => b.dateISO.localeCompare(a.dateISO)
  );
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | null {
  const posts = getAllPosts(locale);
  return posts.find((p) => p.slug === slug) || null;
}

export function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): BlogPost[] {
  const all = getAllPosts(currentPost.locale);
  const filtered = all.filter((p) => p.slug !== currentPost.slug);

  // Match same category first
  const sameCategory = filtered.filter(
    (p) => p.category.toLowerCase() === currentPost.category.toLowerCase()
  );
  const others = filtered.filter(
    (p) => p.category.toLowerCase() !== currentPost.category.toLowerCase()
  );

  return [...sameCategory, ...others].slice(0, limit);
}
