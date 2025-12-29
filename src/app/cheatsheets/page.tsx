'use client';

import { useCheatsheets } from '@/hooks/useCheatsheets';
import { CheatsheetList } from '@/components/CheatsheetList';
import { CheatsheetSkeleton } from '@/components/LoadingSkeleton';

export default function CheatsheetsPage() {
  const { cheatsheets, isLoading, error } = useCheatsheets();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cheat Sheets
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Task-based guides to help you get things done with Claude Code
        </p>
      </div>

      {/* Loading State */}
      {isLoading && <CheatsheetSkeleton />}

      {/* Error State */}
      {error && !isLoading && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-center">
          <p className="text-red-800 dark:text-red-300">
            Failed to load cheat sheets. Using cached data.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && cheatsheets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No cheat sheets available
          </h3>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Check back later for new content
          </p>
        </div>
      )}

      {/* Cheat Sheet List */}
      {!isLoading && cheatsheets.length > 0 && (
        <CheatsheetList cheatsheets={cheatsheets} />
      )}
    </div>
  );
}
