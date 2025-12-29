'use client';

import { useState } from 'react';
import { Cheatsheet, CHEATSHEET_CATEGORIES } from '@/types';
import { CheatsheetContent } from './CheatsheetContent';
import { cn } from '@/lib/utils';
import { trackCheatsheetView } from '@/lib/posthog';

interface CheatsheetListProps {
  cheatsheets: Cheatsheet[];
}

export function CheatsheetList({ cheatsheets }: CheatsheetListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (cheatsheet: Cheatsheet) => {
    if (expandedId === cheatsheet.id) {
      setExpandedId(null);
    } else {
      setExpandedId(cheatsheet.id);
      // Track view when expanding
      trackCheatsheetView(
        cheatsheet.id,
        cheatsheet.title,
        cheatsheet.task_category
      );
    }
  };

  return (
    <div className="space-y-4">
      {cheatsheets.map((cheatsheet) => {
        const isExpanded = expandedId === cheatsheet.id;
        const categoryLabel = CHEATSHEET_CATEGORIES[cheatsheet.task_category];

        return (
          <div
            key={cheatsheet.id}
            className="vintage-card rounded-lg overflow-hidden"
          >
            {/* Header - Always visible */}
            <button
              onClick={() => handleToggle(cheatsheet)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--cream-hover)] transition-colors"
            >
              <div className="flex-1 min-w-0">
                {/* Category Tag */}
                <span className="vintage-badge text-[var(--burgundy)] mb-2 inline-block">
                  {categoryLabel}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[var(--burgundy-dark)]">
                  {cheatsheet.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--burgundy-light)] mt-1">
                  {cheatsheet.description}
                </p>
              </div>

              {/* Expand/Collapse Icon */}
              <div className="ml-4 flex-shrink-0">
                <svg
                  className={cn(
                    'h-6 w-6 text-[var(--burgundy-light)] transition-transform duration-200',
                    isExpanded && 'rotate-180'
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Content - Expandable */}
            {isExpanded && (
              <div className="border-t-2 border-[var(--cream-border)]">
                <div className="p-5 sm:p-6">
                  <CheatsheetContent markdown={cheatsheet.content_markdown} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
