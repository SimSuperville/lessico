'use client';

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border-2 border-[var(--cream-border)] bg-[var(--cream-card)] p-5">
      {/* Category tag */}
      <div className="mb-3 h-5 w-24 rounded bg-[var(--cream-border)]" />

      {/* Title */}
      <div className="mb-2 h-6 w-32 rounded bg-[var(--cream-border)]" />

      {/* Subtitle */}
      <div className="mb-3 h-4 w-48 rounded bg-[var(--cream-border)]" />

      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-[var(--cream-border)]" />
        <div className="h-4 w-3/4 rounded bg-[var(--cream-border)]" />
      </div>

      {/* Copy button */}
      <div className="mt-4 h-8 w-20 rounded bg-[var(--burgundy-pale)]" />
    </div>
  );
}

export function CardListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CheatsheetSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border-2 border-[var(--cream-border)] bg-[var(--cream-card)] p-5"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-48 rounded bg-[var(--cream-border)]" />
              <div className="h-4 w-64 rounded bg-[var(--cream-border)]" />
            </div>
            <div className="h-6 w-6 rounded bg-[var(--burgundy-pale)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
