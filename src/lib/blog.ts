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
  readTime: string;
  featured?: boolean;
  content: string;
  headings: TableOfContentItem[];
  seo: PostSEO;
}

const CONTENT_PATH = path.join(process.cwd(), "content", "blog");

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
      readTime: data.readTime || calculateReadTime(content, locale),
      featured: Boolean(data.featured),
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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
