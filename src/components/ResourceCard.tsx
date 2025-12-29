'use client';

import { Command, Agent, isCommand } from '@/types';
import { truncateText, cn } from '@/lib/utils';
import { CopyButton } from './CopyButton';

interface ResourceCardProps {
  resource: Command | Agent;
  onClick: () => void;
  onCopy: () => void;
}

// Category color mapping - Vintage burgundy/cream palette
const categoryColors: Record<string, string> = {
  'Getting Started': 'text-[#6B8E23] border-[#6B8E23]',  // Olive green
  'Code Writing': 'text-[#4682B4] border-[#4682B4]',      // Steel blue
  'Debugging': 'text-[#C14B3A] border-[#C14B3A]',         // Rust red
  'File Management': 'text-[#D4A017] border-[#D4A017]',   // Golden
  'Session Management': 'text-[#8B6F8B] border-[#8B6F8B]', // Mauve
  'Code Quality': 'text-[#5D6D7E] border-[#5D6D7E]',      // Slate
  'Documentation': 'text-[#4A7C7E] border-[#4A7C7E]',     // Teal
  'Testing': 'text-[#C87533] border-[#C87533]',           // Bronze
  'Refactoring': 'text-[#9B5F7F] border-[#9B5F7F]',       // Plum
  'Learning': 'text-[#5F8575] border-[#5F8575]',          // Sage
};

export function ResourceCard({ resource, onClick, onCopy }: ResourceCardProps) {
  const contentToCopy = isCommand(resource)
    ? resource.usage_example
    : resource.prompt_template;

  const categoryColorClass = categoryColors[resource.category] ||
    'text-[var(--burgundy)] border-[var(--burgundy)]';

  return (
    <div className="vintage-card group relative rounded-lg p-6 cursor-pointer">
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--burgundy-border)] rounded-tl-lg" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--burgundy-border)] rounded-tr-lg" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--burgundy-border)] rounded-bl-lg" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--burgundy-border)] rounded-br-lg" aria-hidden="true" />

      {/* Category Badge - Vintage Stamp Style */}
      <span
        className={cn(
          'vintage-badge inline-block mb-4',
          categoryColorClass
        )}
      >
        {resource.category}
      </span>

      {/* Clickable Content Area */}
      <button
        onClick={onClick}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--burgundy)] focus-visible:ring-offset-2 rounded"
      >
        {/* Command/Agent Name - Playfair Display */}
        <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--burgundy-dark)] mb-2 group-hover:text-[var(--burgundy)] transition-colors">
          {resource.name}
        </h3>

        {/* Subtitle - Crimson Pro */}
        <p className="text-base font-[family-name:var(--font-accent)] text-[var(--burgundy)] font-medium mb-3 italic">
          {resource.subtitle}
        </p>

        {/* Description - Lora */}
        <p className="text-sm font-[family-name:var(--font-body)] text-[var(--burgundy-dark)] opacity-75 line-clamp-2 leading-relaxed">
          {truncateText(resource.description, 150)}
        </p>
      </button>

      {/* Bottom Section */}
      <div className="mt-5 pt-4 border-t border-[var(--cream-border)] flex items-center justify-between">
        <CopyButton
          text={contentToCopy}
          onCopy={onCopy}
          size="sm"
        />

        {/* Personalization indicator */}
        {resource.clarifying_questions && resource.clarifying_questions.length > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-[var(--burgundy-light)] font-[family-name:var(--font-accent)] font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Personalizable
          </span>
        )}
      </div>
    </div>
  );
}
