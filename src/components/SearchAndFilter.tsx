"use client";

import React from "react";
import { useState } from "react";
import { CATEGORIES } from "../lib/categories";
import { BlogPost, Locale } from "../lib/blog";
import { PostCard } from "./PostCard";

interface SearchAndFilterProps {
  locale: Locale;
  categoryCounts?: Record<string, number>;
  posts: BlogPost[];
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  locale,
  categoryCounts = {},
  posts
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const isPt = locale === "pt";
  const allCount = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  const filteredPosts = posts.filter((post) => {
    const category = CATEGORIES.find((item) => item.id === selectedCategory);
    const matchesCategory = selectedCategory === "all" || post.category === category?.name[locale];
    const query = searchQuery.trim().toLocaleLowerCase(locale === "pt" ? "pt-BR" : "en");
    const matchesSearch = !query || `${post.title} ${post.excerpt} ${post.category}`.toLocaleLowerCase(locale === "pt" ? "pt-BR" : "en").includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
      {/* Search Input Bar (No Emojis, Clean SVG) */}
      <div className="relative w-full md:w-96">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          aria-label={isPt ? "Buscar artigos" : "Search articles"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            isPt
              ? "Buscar por tópico ou palavra-chave..."
              : "Search by topic or keyword..."
          }
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-violet-600 focus:bg-white focus:outline-none transition"
        />

        {searchQuery && (
          <button
            type="button"
            aria-label={isPt ? "Limpar busca" : "Clear search"}
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Minimal Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setSelectedCategory("all")}
          aria-pressed={selectedCategory === "all"}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            selectedCategory === "all"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span>{isPt ? "Todos os Artigos" : "All Articles"}</span>
          <span className="ml-1 text-[10px] text-slate-400">({allCount})</span>
        </button>

        {CATEGORIES.map((cat) => {
          const isSelected =
            selectedCategory.toLowerCase() === cat.id.toLowerCase() ||
            selectedCategory.toLowerCase() === cat.slug.toLowerCase();

          const count = categoryCounts[cat.name[locale]] || categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={isSelected}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                isSelected
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{cat.name[locale]}</span>
              <span className="ml-1 text-[10px] text-slate-400">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
    <p className="text-sm text-slate-500" aria-live="polite">
      {isPt ? `${filteredPosts.length} artigos encontrados` : `${filteredPosts.length} articles found`}
    </p>
    {filteredPosts.length ? (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
    ) : (
      <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
        {isPt ? "Nenhum artigo encontrado. Tente outra busca ou categoria." : "No articles found. Try another search or category."}
      </p>
    )}
    </div>
  );
};
