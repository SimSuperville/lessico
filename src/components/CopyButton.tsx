'use client';

import { useState } from 'react';
import { copyToClipboard, cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
  size?: 'sm' | 'md';
  variant?: 'default' | 'primary';
  className?: string;
}

export function CopyButton({
  text,
  onCopy,
  size = 'md',
  variant = 'default',
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);

    if (success) {
      setCopied(true);
      onCopy?.();

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'vintage-button inline-flex items-center justify-center gap-1.5 transition-all',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        !copied && 'bg-[var(--burgundy)] text-[var(--cream-card)] border-[var(--burgundy-dark)] hover:bg-[var(--burgundy-dark)]',
        copied && 'bg-[#6B8E23] text-[var(--cream-card)] border-[#5A7A1C] hover:bg-[#5A7A1C]',
        className
      )}
    >
      {copied ? (
        <>
          <svg
            className={cn('flex-shrink-0', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-[family-name:var(--font-accent)] font-semibold tracking-wide">Copied!</span>
        </>
      ) : (
        <>
          <svg
            className={cn('flex-shrink-0', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
          </svg>
          <span className="font-[family-name:var(--font-accent)] font-semibold tracking-wide">Copy</span>
        </>
      )}
    </button>
  );
}
