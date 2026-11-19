import React from "react";
import Link from "next/link";
import { BlogPost } from "../lib/blog";

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const postUrl = post.locale === "pt" ? `/pt/blog/${post.slug}` : `/blog/${post.slug}`;

  return (
    <article className="group space-y-3.5">
      <Link href={postUrl} aria-label={post.title} className="relative block h-48 w-full overflow-hidden rounded-xl bg-slate-100">
        <img
          src={post.coverImage}
          alt={post.locale === "pt" ? `Capa do artigo: ${post.category}` : `${post.category} article cover`}
          width={1200}
          height={630}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 rounded-md border border-white/30 bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
          {post.category}
        </span>
      </Link>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
          <time dateTime={post.dateISO}>{post.date}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 transition group-hover:text-violet-600">
          <Link href={postUrl}>{post.title}</Link>
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{post.excerpt}</p>
      </div>
    </article>
  );
};
