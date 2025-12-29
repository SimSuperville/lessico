'use client';

import { useEffect } from 'react';
import { Command, Agent, isCommand } from '@/types';
import { ClarifyingToggle } from './ClarifyingToggle';

interface ResourceDetailModalProps {
  resource: Command | Agent | null;
  isOpen: boolean;
  onClose: () => void;
  onCopy: (wasPersonalized: boolean) => void;
}

export function ResourceDetailModal({
  resource,
  isOpen,
  onClose,
  onCopy,
}: ResourceDetailModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  const resourceType = isCommand(resource) ? 'command' : 'agent';
  const baseContent = isCommand(resource)
    ? resource.usage_example
    : resource.prompt_template;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[var(--burgundy-dark)]/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-[var(--cream-card)] shadow-xl vintage-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative top stripe */}
          <div className="striped-awning rounded-t-lg" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-4 p-2 text-[var(--burgundy-light)] hover:text-[var(--burgundy)] transition-colors z-10"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              {/* Category */}
              <span className="vintage-badge text-[var(--burgundy)] mb-3 inline-block">
                {resource.category}
              </span>

              {/* Name */}
              <h2 className="text-2xl font-bold text-[var(--burgundy-dark)] mb-2">
                {resource.name}
              </h2>

              {/* Subtitle */}
              <p className="text-lg text-[var(--burgundy-light)]">
                {resource.subtitle}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--burgundy)] mb-2 uppercase tracking-wide">
                Description
              </h3>
              <p className="text-[var(--burgundy-dark)] leading-relaxed">
                {resource.description}
              </p>
            </div>

            {/* Ornamental Divider */}
            <div className="ornamental-divider" />

            {/* Clarifying Questions Toggle */}
            <ClarifyingToggle
              baseContent={baseContent}
              resourceType={resourceType}
              onCopy={onCopy}
            />
          </div>
        </div>
      </div>
    </>
  );
}
