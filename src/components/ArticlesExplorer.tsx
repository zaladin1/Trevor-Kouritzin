import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import type { Article } from '../data/siteData';
import { trackAgentEvent } from '../lib/tracking';

interface ArticlesExplorerProps {
  articles: Article[];
}

const CATEGORIES = [
  'All',
  'Endocrinology',
  'Supplements',
  'Protein & Tissue',
  'Pharmacology & Dosing',
  'Research Methods',
] as const;

export default function ArticlesExplorer({ articles }: ArticlesExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
      const q = query.trim().toLowerCase();
      if (!q) return matchesCat;
      return (
        matchesCat &&
        (a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.keyTakeaway.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q))
      );
    });
  }, [articles, selectedCategory, query]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    trackAgentEvent({
      event: 'article_filter',
      entityType: 'article-archive',
      label: cat,
    });
  };

  return (
    <div className="space-y-8" data-agent-entity="articles-explorer">
      {/* Search + Category Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#0B0C0E]/15">
        <div
          role="tablist"
          aria-label="Filter articles by research topic"
          className="flex flex-wrap items-center gap-1 bg-[#F5F4F0] p-1"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  active
                    ? 'bg-[#0B0C0E] text-white'
                    : 'text-[#52565E] hover:text-[#0B0C0E]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <Search
            className="w-4 h-4 text-[#52565E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search studies, supplements..."
            aria-label="Search research articles"
            className="w-full h-11 pl-9 pr-4 bg-white border border-[#0B0C0E]/25 text-sm text-[#0B0C0E] placeholder:text-[#52565E]/70 focus:border-[#0B0C0E] focus:outline-none"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#52565E] font-mono tabular-nums">
        <span>
          {filtered.length} OF {articles.length} RESEARCH BREAKDOWNS
        </span>
        {(selectedCategory !== 'All' || query.trim() !== '') && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setQuery('');
            }}
            className="font-sans text-[#163A5F] font-semibold hover:underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="border border-[#E2E0DA] p-12 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-[#52565E] mx-auto" aria-hidden="true" />
          <p className="font-serif text-2xl text-[#0B0C0E]">No matching articles found</p>
          <p className="text-sm text-[#52565E]">
            Try clearing your search term or switching research categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col border-b border-[#E2E0DA] pb-8"
              data-agent-entity="article-card"
              data-agent-id={article.slug}
            >
              <a
                href={`/articles/${article.slug}`}
                className="block aspect-[16/10] bg-[#F5F4F0] overflow-hidden border border-[#E2E0DA] mb-5"
                onClick={() =>
                  trackAgentEvent({
                    event: 'article_read',
                    entityType: 'article',
                    entityId: article.slug,
                    label: article.title,
                  })
                }
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </a>

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#52565E] tabular-nums">
                    <span className="font-semibold tracking-wide text-[#163A5F]">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={article.date}>
                      {new Date(`${article.date}T12:00:00`).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTimeMinutes} min read</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B0C0E] leading-tight">
                    <a
                      href={`/articles/${article.slug}`}
                      className="hover:text-[#163A5F] transition-colors"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="text-sm leading-relaxed text-[#52565E] line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#52565E] tabular-nums">
                    {article.references.length}{' '}
                    {article.references.length === 1 ? 'citation' : 'citations'}
                  </span>
                  <a
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#0B0C0E] hover:text-[#163A5F] transition-colors whitespace-nowrap"
                  >
                    Read Breakdown
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
