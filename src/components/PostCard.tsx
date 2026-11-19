import React from "react";
import Link from "next/link";
import { BlogPost } from "../lib/blog";

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const isPt = post.locale === "pt";
  const postUrl = isPt ? `/pt/blog/${post.slug}` : `/blog/${post.slug}`;

  // Clean Editorial Graphics (No emojis, sleek modern visual geometry)
  const isWpp = post.category.toLowerCase().includes("whatsapp");
  const isCrm = post.category.toLowerCase().includes("crm");
  const isGuide = post.category.toLowerCase().includes("tutorial") || post.category.toLowerCase().includes("guide");

  return (
    <article className="group cursor-pointer space-y-3.5">
      {/* Visual Cover (High-end 3D abstract look matching Autograph reference) */}
      <Link href={postUrl} className="relative block h-48 w-full overflow-hidden rounded-xl bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 transition-transform duration-300 group-hover:scale-105" />

        {/* Abstract Geometry */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isWpp ? (
            <div className="relative w-24 h-32 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-500 to-emerald-900 shadow-2xl transition-transform duration-300 group-hover:scale-110" />
          ) : isCrm ? (
            <div className="relative flex -space-x-4 transition-transform duration-300 group-hover:scale-110">
              <div className="w-14 h-20 rounded-xl bg-slate-700 shadow-md transform -rotate-6" />
              <div className="w-14 h-20 rounded-xl bg-violet-600 shadow-xl" />
              <div className="w-14 h-20 rounded-xl bg-indigo-500 shadow-md transform rotate-6" />
            </div>
          ) : isGuide ? (
            <div className="grid grid-cols-3 gap-2 transition-transform duration-300 group-hover:scale-110">
              <div className="w-7 h-7 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center font-mono text-[9px] text-white">⌘</div>
              <div className="w-7 h-7 rounded-lg bg-violet-600 border border-violet-500 flex items-center justify-center font-mono text-[9px] text-white">K</div>
              <div className="w-7 h-7 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center font-mono text-[9px] text-white">↵</div>
            </div>
          ) : (
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-800 shadow-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-200/20 to-white/60 blur-xs" />
            </div>
          )}
        </div>

        {/* Category Pill Tag Overlay */}
        <div className="absolute top-3 right-3">
          <span className="rounded bg-slate-900/80 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-md border border-white/20">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Meta details */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-violet-600 transition line-clamp-2">
          <Link href={postUrl}>{post.title}</Link>
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
};
