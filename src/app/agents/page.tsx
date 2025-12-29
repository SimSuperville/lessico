'use client';

import { useState, useMemo, useCallback } from 'react';
import { useAgents } from '@/hooks/useAgents';
import { useAgentSearch } from '@/hooks/useSearch';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ResourceCard } from '@/components/ResourceCard';
import { ResourceDetailModal } from '@/components/ResourceDetailModal';
import { CardListSkeleton } from '@/components/LoadingSkeleton';
import { Agent } from '@/types';
import { trackCopyEvent, trackSearch, trackFilterApplied, trackToggleClarifyingQuestions } from '@/lib/posthog';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getSessionId } from '@/lib/posthog';

export default function AgentsPage() {
  const { agents, isLoading, error } = useAgents();
  const {
    query,
    setQuery,
    selectedCategories,
    toggleCategory,
    clearFilters,
    filteredItems,
  } = useAgentSearch(agents);

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique categories from agents
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(agents.map(a => a.category))];
    return uniqueCategories.sort();
  }, [agents]);

  // Handle search changes with tracking
  const handleSearchChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.trim()) {
      trackSearch(newQuery, 'agents', filteredItems.length);
    }
  }, [setQuery, filteredItems.length]);

  // Handle category toggle with tracking
  const handleCategoryToggle = useCallback((category: string) => {
    toggleCategory(category);
    trackFilterApplied(category, 'agents');
  }, [toggleCategory]);

  // Handle card click
  const handleCardClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  // Handle copy from card
  const handleCardCopy = useCallback(async (agent: Agent) => {
    trackCopyEvent(agent.id, 'agent', agent.name, false);

    // Log to Supabase as backup
    if (isSupabaseConfigured()) {
      await supabase.from('copy_events').insert({
        resource_id: agent.id,
        resource_type: 'agent',
        was_personalized: false,
        session_id: getSessionId(),
      });
    }
  }, []);

  // Handle copy from modal (may be personalized)
  const handleModalCopy = useCallback(async (wasPersonalized: boolean) => {
    if (!selectedAgent) return;

    trackCopyEvent(selectedAgent.id, 'agent', selectedAgent.name, wasPersonalized);

    if (wasPersonalized) {
      trackToggleClarifyingQuestions(selectedAgent.id, 'agent', true);
    }

    // Log to Supabase as backup
    if (isSupabaseConfigured()) {
      await supabase.from('copy_events').insert({
        resource_id: selectedAgent.id,
        resource_type: 'agent',
        was_personalized: wasPersonalized,
        session_id: getSessionId(),
      });
    }
  }, [selectedAgent]);

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sub-Agents
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Specialized prompts to enhance your Claude Code workflows
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <SearchBar
          placeholder="Search agents..."
          value={query}
          onChange={handleSearchChange}
        />
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onToggle={handleCategoryToggle}
          onClear={clearFilters}
        />
      </div>

      {/* Loading State */}
      {isLoading && <CardListSkeleton count={6} />}

      {/* Error State */}
      {error && !isLoading && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-center">
          <p className="text-red-800 dark:text-red-300">
            Failed to load agents. Using cached data.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredItems.length === 0 && (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No agents found
          </h3>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Try different keywords or clear the filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Agent Grid */}
      {!isLoading && filteredItems.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((agent) => (
            <ResourceCard
              key={agent.id}
              resource={agent}
              onClick={() => handleCardClick(agent)}
              onCopy={() => handleCardCopy(agent)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <ResourceDetailModal
        resource={selectedAgent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCopy={handleModalCopy}
      />
    </div>
  );
}
