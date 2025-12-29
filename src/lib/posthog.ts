import posthog from 'posthog-js';

let isInitialized = false;

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

  if (!posthogKey) {
    console.warn('PostHog key not configured. Analytics will be disabled.');
    return;
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: true,
    capture_pageleave: true,
    persistence: 'localStorage',
  });

  isInitialized = true;
}

export function trackCopyEvent(
  resourceId: string,
  resourceType: 'command' | 'agent',
  resourceName: string,
  wasPersonalized: boolean
) {
  if (typeof window === 'undefined' || !isInitialized) return;

  posthog.capture('copy_resource', {
    resource_id: resourceId,
    resource_type: resourceType,
    resource_name: resourceName,
    was_personalized: wasPersonalized,
  });
}

export function trackToggleClarifyingQuestions(
  resourceId: string,
  resourceType: 'command' | 'agent',
  toggleState: boolean
) {
  if (typeof window === 'undefined' || !isInitialized) return;

  posthog.capture('toggle_clarifying_questions', {
    resource_id: resourceId,
    resource_type: resourceType,
    toggle_state: toggleState,
  });
}

export function trackSearch(
  query: string,
  tab: 'commands' | 'agents',
  resultsCount: number
) {
  if (typeof window === 'undefined' || !isInitialized) return;

  posthog.capture('search_performed', {
    query,
    tab,
    results_count: resultsCount,
  });
}

export function trackFilterApplied(category: string, tab: 'commands' | 'agents') {
  if (typeof window === 'undefined' || !isInitialized) return;

  posthog.capture('filter_applied', {
    category,
    tab,
  });
}

export function trackCheatsheetView(
  cheatsheetId: string,
  cheatsheetTitle: string,
  taskCategory: string
) {
  if (typeof window === 'undefined' || !isInitialized) return;

  posthog.capture('view_cheatsheet', {
    cheatsheet_id: cheatsheetId,
    cheatsheet_title: cheatsheetTitle,
    task_category: taskCategory,
  });
}

export function getSessionId(): string | null {
  if (typeof window === 'undefined' || !isInitialized) return null;
  return posthog.get_distinct_id() || null;
}

export { posthog };
