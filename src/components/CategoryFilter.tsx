'use client';

import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: readonly string[];
  selectedCategories: string[];
  onToggle: (category: string) => void;
  onClear: () => void;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onToggle,
  onClear,
}: CategoryFilterProps) {
  const hasSelection = selectedCategories.length > 0;

  return (
    <div className="flex flex-wrap gap-2">
      {/* All Button */}
      <button
        onClick={onClear}
        className={cn(
          'vintage-badge transition-colors',
          !hasSelection
            ? 'bg-[var(--burgundy)] text-[var(--cream-card)] border-[var(--burgundy-dark)]'
            : 'bg-[var(--cream-card)] text-[var(--burgundy-dark)] border-[var(--burgundy-border)] hover:bg-[var(--burgundy-pale)]'
        )}
      >
        All
      </button>

      {/* Category Pills */}
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);

        return (
          <button
            key={category}
            onClick={() => onToggle(category)}
            className={cn(
              'vintage-badge transition-colors',
              isSelected
                ? 'bg-[var(--burgundy)] text-[var(--cream-card)] border-[var(--burgundy-dark)]'
                : 'bg-[var(--cream-card)] text-[var(--burgundy-dark)] border-[var(--burgundy-border)] hover:bg-[var(--burgundy-pale)]'
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
