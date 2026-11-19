import React from "react";
import { BlogPost } from "../lib/blog";
import { PostCard } from "./PostCard";

interface RelatedPostsProps {
  posts: BlogPost[];
  locale: "en" | "pt";
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, locale }) => {
  if (!posts || posts.length === 0) return null;
  const isPt = locale === "pt";

  return (
    <section className="my-16 border-t border-slate-200 pt-12 dark:border-slate-800">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            {isPt ? "Continue Aprendendo" : "Keep Learning"}
          </span>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {isPt ? "Artigos Relacionados" : "Related Articles"}
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          {isPt
            ? "Mais táticas e estratégias para aprimorar sua máquina de aquisição de clientes."
            : "More tactical insights to elevate your outbound customer acquisition engine."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};
