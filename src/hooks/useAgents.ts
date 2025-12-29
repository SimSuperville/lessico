'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Agent } from '@/types';

// Mock data for development when Supabase is not configured
const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Code Reviewer',
    subtitle: 'Find bugs and improve code quality',
    description: 'A thorough code reviewer that checks for bugs, security issues, and best practices.',
    prompt_template: 'Review this code for bugs, security issues, and adherence to best practices. Be thorough but constructive. Explain why each issue matters and suggest specific fixes.',
    category: 'Code Quality',
    clarifying_questions: [
      { key: 'focus_areas', question: 'Any specific areas to focus on?', placeholder: 'e.g., security, performance, readability' },
      { key: 'standards', question: 'What coding standards should it follow?', placeholder: 'e.g., PEP8, Airbnb style guide' }
    ],
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Documentation Writer',
    subtitle: 'Create clear documentation',
    description: 'Creates clear, comprehensive documentation for code and APIs.',
    prompt_template: 'Write clear documentation for this code. Include purpose, usage examples, parameters, return values, and any important notes. Target audience is developers who will use or maintain this code.',
    category: 'Documentation',
    clarifying_questions: [
      { key: 'doc_type', question: 'What type of documentation?', placeholder: 'e.g., API docs, README, inline comments' },
      { key: 'audience', question: 'Who is the target audience?', placeholder: 'e.g., junior devs, API consumers, maintainers' }
    ],
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Test Writer',
    subtitle: 'Generate comprehensive tests',
    description: 'Generates comprehensive test cases for your code.',
    prompt_template: 'Write comprehensive tests for this code. Include unit tests, edge cases, and integration tests where appropriate. Use the testing framework specified or infer from the codebase.',
    category: 'Testing',
    clarifying_questions: [
      { key: 'framework', question: 'What testing framework?', placeholder: 'e.g., Jest, pytest, Go testing' },
      { key: 'coverage_focus', question: 'What should tests focus on?', placeholder: 'e.g., edge cases, happy path, error handling' }
    ],
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

interface UseAgentsResult {
  agents: Agent[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useAgents(): UseAgentsResult {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAgents = async () => {
    setIsLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Use mock data when Supabase is not configured
      setAgents(MOCK_AGENTS);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from('agents')
        .select('*')
        .order('display_order', { ascending: true });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setAgents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch agents'));
      // Fallback to mock data on error
      setAgents(MOCK_AGENTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return { agents, isLoading, error, refetch: fetchAgents };
}
