'use client';

import { useState } from 'react';
import { CopyButton } from './CopyButton';

interface ClarifyingToggleProps {
  baseContent: string;
  resourceType: 'command' | 'agent';
  onCopy: (wasPersonalized: boolean) => void;
}

export function ClarifyingToggle({
  baseContent,
  resourceType,
  onCopy,
}: ClarifyingToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  // Build the content with clarifying question request
  const clarifyingText = `\n\nPlease ask me clarifying questions about this to best configure this ${resourceType}.`;
  const finalContent = isEnabled ? baseContent + clarifyingText : baseContent;

  return (
    <div className="space-y-4">
      {/* Toggle Switch */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[var(--cream-border)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--burgundy-pale)] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[var(--cream-card)] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[var(--cream-card)] after:border-[var(--cream-border)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--burgundy)]" />
          </div>
          <span className="text-sm font-medium text-[var(--burgundy-dark)]">
            Ask clarifying questions
          </span>
        </label>
      </div>

      {/* Preview Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[var(--burgundy)] uppercase tracking-wide">
            {isEnabled ? 'Preview' : 'Ready to Copy'}
          </h4>
          <CopyButton
            text={finalContent}
            onCopy={() => onCopy(isEnabled)}
            variant="primary"
          />
        </div>

        <div className="relative">
          <pre className="overflow-x-auto rounded-lg bg-[var(--burgundy-dark)] p-4 text-sm text-[var(--cream-card)]">
            <code className="whitespace-pre-wrap break-words">
              {finalContent}
            </code>
          </pre>

          {/* Visual indicator when clarifying questions enabled */}
          {isEnabled && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[var(--burgundy-pale)] text-[var(--burgundy-dark)]">
                + Clarifying
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
