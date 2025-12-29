import { ClarifyingQuestion } from '@/types';

/**
 * Copy text to clipboard with fallback for older browsers
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Build a personalized command/prompt from answers to clarifying questions
 */
export function buildPersonalizedCommand(
  baseCommand: string,
  questions: ClarifyingQuestion[],
  answers: Record<string, string>
): string {
  let result = baseCommand;
  const contextParts: string[] = [];

  for (const q of questions) {
    const answer = answers[q.key]?.trim();
    if (answer) {
      switch (q.key) {
        case 'project_type':
          contextParts.push(`This is a ${answer}.`);
          break;
        case 'tech_stack':
          contextParts.push(`We use ${answer}.`);
          break;
        case 'language':
          contextParts.push(`Primary language is ${answer}.`);
          break;
        case 'conventions':
        case 'context':
        case 'additional_context':
          contextParts.push(answer);
          break;
        default:
          contextParts.push(answer);
      }
    }
  }

  if (contextParts.length > 0) {
    result += '\n' + contextParts.join(' ');
  }

  return result;
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate a simple class name merger (like clsx but simpler)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format category for display (handles underscores and capitalization)
 */
export function formatCategory(category: string): string {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
