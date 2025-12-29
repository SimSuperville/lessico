'use client';

import { useState } from 'react';
import { ClarifyingQuestion, FALLBACK_QUESTIONS } from '@/types';
import { buildPersonalizedCommand } from '@/lib/utils';
import { CopyButton } from './CopyButton';

interface ClarifyingToggleProps {
  baseContent: string;
  questions: ClarifyingQuestion[] | null;
  resourceType: 'command' | 'agent';
  onCopy: (wasPersonalized: boolean) => void;
}

export function ClarifyingToggle({
  baseContent,
  questions,
  resourceType,
  onCopy,
}: ClarifyingToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Use provided questions or fallback
  const activeQuestions = questions && questions.length > 0 ? questions : FALLBACK_QUESTIONS;

  // Build the personalized content
  const personalizedContent = isEnabled
    ? buildPersonalizedCommand(baseContent, activeQuestions, answers)
    : baseContent;

  // Check if any answers have been provided
  const hasAnswers = Object.values(answers).some(a => a.trim().length > 0);

  // Handle answer changes
  const handleAnswerChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

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
            Personalize this {resourceType}
          </span>
        </label>
      </div>

      {/* Questions Section */}
      {isEnabled && (
        <div className="space-y-4 p-4 bg-[var(--cream-bg)] rounded-lg border-2 border-[var(--cream-border)]">
          <h4 className="text-sm font-semibold text-[var(--burgundy)] uppercase tracking-wide">
            Answer these questions to customize:
          </h4>

          {activeQuestions.map((q) => (
            <div key={q.key} className="space-y-1.5">
              <label
                htmlFor={q.key}
                className="block text-sm text-[var(--burgundy-dark)]"
              >
                {q.question}
              </label>
              <input
                type="text"
                id={q.key}
                value={answers[q.key] || ''}
                onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                placeholder={q.placeholder}
                className="vintage-input block w-full text-sm"
              />
            </div>
          ))}
        </div>
      )}

      {/* Preview Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[var(--burgundy)] uppercase tracking-wide">
            {isEnabled && hasAnswers ? 'Personalized Preview' : 'Ready to Copy'}
          </h4>
          <CopyButton
            text={personalizedContent}
            onCopy={() => onCopy(isEnabled && hasAnswers)}
            variant="primary"
          />
        </div>

        <div className="relative">
          <pre className="overflow-x-auto rounded-lg bg-[var(--burgundy-dark)] p-4 text-sm text-[var(--cream-card)]">
            <code className="whitespace-pre-wrap break-words">
              {personalizedContent}
            </code>
          </pre>

          {/* Visual indicator for personalized vs generic */}
          {isEnabled && hasAnswers && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[var(--burgundy-pale)] text-[var(--burgundy-dark)]">
                Personalized
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
