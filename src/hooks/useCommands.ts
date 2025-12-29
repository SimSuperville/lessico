'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Command } from '@/types';

// Mock data for development when Supabase is not configured
const MOCK_COMMANDS: Command[] = [
  {
    id: '1',
    name: '/init',
    subtitle: 'Set up project context',
    description: "Initialize Claude Code's understanding of your project. Run this first in any new codebase to help Claude understand the project structure, tech stack, and conventions.",
    usage_example: '/init',
    category: 'Getting Started',
    clarifying_questions: [
      { key: 'project_type', question: 'What type of project is this?', placeholder: 'e.g., React app, Python API, CLI tool' },
      { key: 'tech_stack', question: "What's your main tech stack?", placeholder: 'e.g., Next.js, TypeScript, Tailwind' },
      { key: 'conventions', question: 'Any specific conventions to follow?', placeholder: 'e.g., We use feature-based folder structure' }
    ],
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: '/compact',
    subtitle: 'Compress conversation history',
    description: 'Compress conversation history when context is getting long. Useful for extended coding sessions.',
    usage_example: '/compact',
    category: 'Session Management',
    clarifying_questions: null,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: '/clear',
    subtitle: 'Start fresh conversation',
    description: 'Clear the conversation and start fresh. Use when switching to a completely different task.',
    usage_example: '/clear',
    category: 'Session Management',
    clarifying_questions: null,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: '/help',
    subtitle: 'Get help with commands',
    description: 'Get help on available commands and how to use Claude Code effectively.',
    usage_example: '/help',
    category: 'Getting Started',
    clarifying_questions: null,
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: '/review',
    subtitle: 'Review recent changes',
    description: 'Ask Claude to review your recent changes for bugs, issues, or improvements.',
    usage_example: '/review',
    category: 'Code Quality',
    clarifying_questions: [
      { key: 'focus_areas', question: 'Any specific areas to focus on?', placeholder: 'e.g., security, performance, error handling' }
    ],
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

interface UseCommandsResult {
  commands: Command[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCommands(): UseCommandsResult {
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCommands = async () => {
    setIsLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Use mock data when Supabase is not configured
      setCommands(MOCK_COMMANDS);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from('commands')
        .select('*')
        .order('display_order', { ascending: true });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setCommands(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch commands'));
      // Fallback to mock data on error
      setCommands(MOCK_COMMANDS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommands();
  }, []);

  return { commands, isLoading, error, refetch: fetchCommands };
}
