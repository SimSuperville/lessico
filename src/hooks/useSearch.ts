'use client';

import { useState, useMemo, useCallback } from 'react';
import { Command, Agent } from '@/types';

interface UseSearchResult<T> {
  query: string;
  setQuery: (query: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearFilters: () => void;
  filteredItems: T[];
}

function searchItems<T extends { name: string; subtitle: string; description: string; category: string }>(
  items: T[],
  query: string,
  selectedCategories: string[]
): T[] {
  let filtered = items;

  // Filter by search query
  if (query.trim()) {
    const lowerQuery = query.toLowerCase().trim();
    filtered = filtered.filter(
      item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.subtitle.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Filter by categories (OR logic - item matches if in any selected category)
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(item =>
      selectedCategories.includes(item.category)
    );
  }

  return filtered;
}

export function useCommandSearch(commands: Command[]): UseSearchResult<Command> {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery('');
    setSelectedCategories([]);
  }, []);

  const filteredItems = useMemo(
    () => searchItems(commands, query, selectedCategories),
    [commands, query, selectedCategories]
  );

  return {
    query,
    setQuery,
    selectedCategories,
    toggleCategory,
    clearFilters,
    filteredItems
  };
}

export function useAgentSearch(agents: Agent[]): UseSearchResult<Agent> {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery('');
    setSelectedCategories([]);
  }, []);

  const filteredItems = useMemo(
    () => searchItems(agents, query, selectedCategories),
    [agents, query, selectedCategories]
  );

  return {
    query,
    setQuery,
    selectedCategories,
    toggleCategory,
    clearFilters,
    filteredItems
  };
}
