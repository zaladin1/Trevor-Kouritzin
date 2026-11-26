import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import type { Publication } from '../data/siteData';
import { trackAgentEvent } from '../lib/tracking';

interface PublicationsListProps {
  publications: Publication[];
}

export default function PublicationsList({ publications }: PublicationsListProps) {
  const [filter, setFilter] = useState<'All' | 'Journal Article' | 'Conference Publication'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visible = publications.filter((p) => filter === 'All' || p.type === filter);

  const handleCopyCitation = async (pub: Publication) => {
    try {
      await navigator.clipboard.writeText(pub.fullCitation);
      setCopiedId(pub.id);
      trackAgentEvent({
        event: 'citation_copy',
        entityType: 'publication',
        entityId: pub.id,
        label: pub.title,
      });
      setTimeout(() => setCopiedId((prev) => (prev === pub.id ? null : prev)), 2000);
    } catch {
      setCopiedId(pub.id);
    }
  };

  return (
    <div className="space-y-8" data-agent-entity="publications-list">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#0B0C0E]/15">
        <div
          role="tablist"
          aria-label="Filter publications by type"
          className="inline-flex items-center gap-1 p-1 bg-[#F5F4F0]"
        >
          {(['All', 'Journal Article', 'Conference Publication'] as const).map((tab) => {
            const active = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap min-h-[36px] ${
                  active ? 'bg-[#0B0C0E] text-white' : 'text-[#52565E] hover:text-[#0B0C0E]'
                }`}
              >
                {tab === 'All' ? 'All Works' : `${tab}s`}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-[#52565E] tabular-nums">
          {visible.length} PEER-REVIEWED RECORD{visible.length === 1 ? '' : 'S'}
        </span>
      </div>

      <div className="divide-y divide-[#0B0C0E]/15 border-y border-[#0B0C0E]/15">
        {visible.map((pub) => {
          const isCopied = copiedId === pub.id;
          return (
            <article
              key={pub.id}
              className="py-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6"
              data-agent-entity="scholarly-article"
              data-agent-id={pub.id}
            >
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#52565E] tabular-nums">
                  <span className="font-mono font-semibold text-[#163A5F]">{pub.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#0B0C0E] tracking-wide">{pub.type}</span>
                  <span aria-hidden="true">·</span>
                  <span>{pub.focusArea}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B0C0E] leading-snug">
                  {pub.title}
                </h2>

                <p className="text-sm text-[#52565E]">{pub.authors}</p>

                <p className="text-sm font-medium text-[#0B0C0E]">
                  {pub.journalOrVenue}{' '}
                  <span className="font-mono text-xs text-[#52565E] font-normal ml-1 tabular-nums">
                    {pub.citationDetails}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyCitation(pub)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B0C0E] bg-[#F5F4F0] border border-[#0B0C0E]/20 hover:border-[#0B0C0E] transition-colors whitespace-nowrap min-h-[40px]"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#163A5F]" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      Copy Citation
                    </>
                  )}
                </button>

                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#52565E] hover:text-[#0B0C0E] transition-colors whitespace-nowrap min-h-[40px]"
                  >
                    Archive
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
