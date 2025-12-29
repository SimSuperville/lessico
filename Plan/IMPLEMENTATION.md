# Lessico - Implementation Prompt for Claude Code

Use this prompt with Claude Code (or similar AI coding assistants) to build the Lessico MVP.

---

## Project Overview

Build a web application called "Lessico" - a curated resource library for Claude Code beginners. The app has three main sections: Slash Commands, Sub-Agents, and Cheat Sheets.

**Key Differentiator**: A "clarifying questions toggle" that helps users personalize generic commands for their specific context before copying.

---

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Analytics**: PostHog
- **Deployment**: Vercel

---

## Setup Instructions

1. Create a new Next.js project with TypeScript and Tailwind:
   ```bash
   npx create-next-app@latest lessico --typescript --tailwind --app --src-dir
   ```

2. Install dependencies:
   ```bash
   npm install @supabase/supabase-js posthog-js
   ```

3. Set up Supabase project at supabase.com and create the database schema (provided below)

4. Configure environment variables (see Environment Variables section)

5. Implement the component structure as specified

---

## Database Schema

Create these tables in Supabase SQL Editor:

```sql
-- Commands table
CREATE TABLE commands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  subtitle VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  usage_example TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  clarifying_questions JSONB,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Agents table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  subtitle VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  prompt_template TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  clarifying_questions JSONB,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cheat sheets table
CREATE TABLE cheatsheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  task_category VARCHAR(50) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Copy events table (analytics backup)
CREATE TABLE copy_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL,
  resource_type VARCHAR(20) NOT NULL,
  was_personalized BOOLEAN DEFAULT FALSE,
  session_id VARCHAR(100),
  copied_at TIMESTAMP DEFAULT NOW()
);

-- Future: Upvotes table (schema only, not used in MVP UI)
CREATE TABLE upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL,
  resource_type VARCHAR(20) NOT NULL,
  fingerprint VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(resource_id, resource_type, fingerprint)
);

-- Enable Row Level Security (public read access)
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE cheatsheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE copy_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON commands FOR SELECT USING (true);
CREATE POLICY "Public read access" ON agents FOR SELECT USING (true);
CREATE POLICY "Public read access" ON cheatsheets FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON copy_events FOR INSERT WITH CHECK (true);
```

---

## Core Features to Implement

### 1. Tab-Based Navigation

- Three tabs: **Commands** | **Agents** | **Cheat Sheets**
- Use Next.js App Router with routes: `/commands`, `/agents`, `/cheatsheets`
- Default route (`/`) redirects to `/commands`
- Active tab should be visually distinct (bold, underline, or background color)
- Responsive: works as horizontal tabs on desktop, consider bottom nav on mobile

### 2. Commands/Agents List View

- Fetch data from Supabase on page load using server components or client-side with SWR/React Query
- Display as cards in a responsive grid (1 column mobile, 2-3 columns desktop)
- Each card shows:
  - Command/agent name (prominent)
  - Subtitle (1 line summary)
  - Description (Truncated to 2 lines)
  - Category tag (pill/badge style)
  - Copy button
- Clicking a card opens detail view (modal recommended for simplicity)
- Show loading skeleton while fetching

### 3. Search and Filtering

**Search Bar**:
- Full-width input at top of Commands and Agents tabs
- Placeholder: "Search commands..." or "Search agents..."
- Real-time filtering as user types (debounce 300ms)
- Search across name, subtitle, and description fields (case-insensitive)
- Clear button (X) to reset search
- Show "No results found" with helpful message when empty

**Category Filters**:
- Horizontal row of filter pills below search
- Include "All" option (selected by default)
- Categories for Commands: "Getting Started", "Code Writing", "Debugging", "File Management", "Session Management"
- Categories for Agents: "Code Quality", "Documentation", "Testing", "Refactoring", "Learning"
- Multiple selection allowed (OR logic between categories)
- Search and filters work together (AND logic: must match search AND be in selected categories)

### 4. Clarifying Questions Toggle (KEY FEATURE)

This is the main differentiator - implement carefully.

**UI Components**:
- Toggle switch in the command/agent detail modal
- Label: "Personalize this command" (or "Personalize this prompt" for agents)
- Default state: OFF (showing generic usage_example or prompt_template)

**When Toggle is ON**:
1. Display clarifying questions from the JSONB field
2. Each question shows: question text + text input with placeholder
3. Below questions, show a "Preview" section with the personalized output
4. Preview updates in real-time as user types answers

**Personalization Logic**:

```typescript
interface ClarifyingQuestion {
  key: string;
  question: string;
  placeholder: string;
}

function buildPersonalizedCommand(
  baseCommand: string,
  questions: ClarifyingQuestion[],
  answers: Record<string, string>
): string {
  // Start with the base command
  let result = baseCommand;

  // Collect non-empty answers
  const contextParts: string[] = [];

  for (const q of questions) {
    const answer = answers[q.key]?.trim();
    if (answer) {
      // Format based on question key
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
          contextParts.push(`${answer}`);
      }
    }
  }

  // Append context if any answers provided
  if (contextParts.length > 0) {
    result += '\n' + contextParts.join(' ');
  }

  return result;
}
```

**Fallback Questions** (use when command has no custom clarifying_questions):

```typescript
const FALLBACK_QUESTIONS: ClarifyingQuestion[] = [
  {
    key: "project_type",
    question: "What type of project are you working on?",
    placeholder: "e.g., React app, Python script, Node.js API"
  },
  {
    key: "additional_context",
    question: "Any additional context to include?",
    placeholder: "e.g., We use TypeScript strict mode, Follow PEP8"
  }
];
```

**State Management**:
- Answers should persist during the session (use React state or context)
- If user toggles OFF then ON again, their previous answers should still be there
- Each command/agent has its own answer state (switching between commands doesn't share answers)

### 5. Copy to Clipboard

**Implementation**:
```typescript
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
}
```

**UI Behavior**:
- Copy button clearly visible on cards and in detail modal
- Button text: "Copy" with clipboard icon
- On click: copy content, change button to "Copied!" with checkmark for 2 seconds
- If clarifying questions are answered, copy the personalized version
- Track copy event (see Analytics section)

### 6. Cheat Sheets Section

**Different Layout** (not cards):
- List view with expandable sections
- Each section shows: title, brief description, expand/collapse arrow
- Clicking expands to show full markdown content

**Task-Based Categories**:
1. **Getting Set Up** - Installation, configuration, first project setup
2. **Writing Code** - Code generation patterns, editing, refactoring
3. **Debugging & Fixing** - Error diagnosis, test failures, bug hunting
4. **Working with Files** - Search, navigation, file management
5. **Advanced Workflows** - Multi-agent patterns, complex tasks, automation

**Markdown Rendering**:
- Use a markdown renderer (react-markdown or similar)
- Syntax highlighting for code blocks (use highlight.js or prism)
- Each code block has its own copy button
- Content should be concise and scannable

### 7. PostHog Analytics Integration

**Setup in Root Layout**:
```typescript
// src/lib/posthog.ts
import posthog from 'posthog-js';

export function initPostHog() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
    });
  }
}

export { posthog };
```

**Events to Track**:

```typescript
// Copy event
posthog.capture('copy_resource', {
  resource_id: command.id,
  resource_type: 'command', // or 'agent'
  resource_name: command.name,
  was_personalized: hasAnsweredQuestions,
});

// Toggle clarifying questions
posthog.capture('toggle_clarifying_questions', {
  resource_id: command.id,
  resource_type: 'command',
  toggle_state: isEnabled, // true or false
});

// Search performed
posthog.capture('search_performed', {
  query: searchQuery,
  tab: 'commands', // or 'agents'
  results_count: filteredResults.length,
});

// Filter applied
posthog.capture('filter_applied', {
  category: selectedCategory,
  tab: 'commands',
});

// Cheat sheet viewed
posthog.capture('view_cheatsheet', {
  cheatsheet_id: cheatsheet.id,
  cheatsheet_title: cheatsheet.title,
  task_category: cheatsheet.task_category,
});
```

**Also log to Supabase** (backup):
```typescript
await supabase.from('copy_events').insert({
  resource_id: command.id,
  resource_type: 'command',
  was_personalized: hasAnsweredQuestions,
  session_id: posthog.get_distinct_id(),
});
```

---

## Component Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, PostHog provider, fonts
│   ├── page.tsx                # Redirect to /commands
│   ├── commands/
│   │   └── page.tsx            # Commands tab page
│   ├── agents/
│   │   └── page.tsx            # Agents tab page
│   └── cheatsheets/
│       └── page.tsx            # Cheat sheets tab page
├── components/
│   ├── Header.tsx              # Logo + tab navigation
│   ├── SearchBar.tsx           # Search input with debounce
│   ├── CategoryFilter.tsx      # Filter pills row
│   ├── ResourceCard.tsx        # Card component for commands/agents
│   ├── ResourceDetailModal.tsx # Modal with full details + clarifying questions
│   ├── ClarifyingToggle.tsx    # Toggle switch + questions + preview
│   ├── CopyButton.tsx          # Copy button with feedback
│   ├── CheatsheetList.tsx      # Expandable cheat sheet sections
│   ├── CheatsheetContent.tsx   # Markdown renderer with code copy
│   └── LoadingSkeleton.tsx     # Loading state placeholder
├── lib/
│   ├── supabase.ts             # Supabase client configuration
│   ├── posthog.ts              # PostHog client configuration
│   └── utils.ts                # Helper functions (copy, debounce, etc.)
├── hooks/
│   ├── useCommands.ts          # Fetch and cache commands
│   ├── useAgents.ts            # Fetch and cache agents
│   ├── useCheatsheets.ts       # Fetch and cache cheatsheets
│   └── useSearch.ts            # Search and filter logic
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## TypeScript Types

```typescript
// src/types/index.ts

export interface Command {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  usage_example: string;
  category: string;
  clarifying_questions: ClarifyingQuestion[] | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  prompt_template: string;
  category: string;
  clarifying_questions: ClarifyingQuestion[] | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ClarifyingQuestion {
  key: string;
  question: string;
  placeholder: string;
}

export interface Cheatsheet {
  id: string;
  title: string;
  description: string;
  content_markdown: string;
  task_category: 'getting_set_up' | 'writing_code' | 'debugging' | 'files' | 'advanced';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CopyEvent {
  id: string;
  resource_id: string;
  resource_type: 'command' | 'agent';
  was_personalized: boolean;
  session_id: string | null;
  copied_at: string;
}

export type ResourceType = 'command' | 'agent';
```

---

## Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# PostHog (can add later, before launch)
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## Design Guidelines

**Colors** (Tailwind defaults, dark mode support):
- Background: `bg-white dark:bg-gray-900`
- Cards: `bg-gray-50 dark:bg-gray-800`
- Primary action (copy button): `bg-blue-600 hover:bg-blue-700`
- Category tags: Use subtle colors like `bg-blue-100 text-blue-800`

**Typography**:
- Use Next.js font optimization with Inter or system fonts
- Command names: `font-mono` for code-like appearance
- Generous line height for readability

**Spacing**:
- Cards: `p-4` or `p-6`
- Grid gap: `gap-4` or `gap-6`
- Sections: `py-8` or `py-12`

**Interactive States**:
- Hover on cards: subtle lift with `hover:shadow-md transition-shadow`
- Focus states: clear outlines for accessibility
- Disabled states: reduced opacity

**Mobile-First**:
- Start with mobile layout, enhance for desktop
- Copy buttons easily tappable (min 44x44px touch target)
- Modal scrolls on mobile if content is long

---

## Acceptance Criteria Checklist

Before considering the MVP complete, verify:

### Navigation
- [ ] Three tabs (Commands, Agents, Cheat Sheets) are visible and functional
- [ ] Active tab is visually distinct
- [ ] URLs reflect current tab (/commands, /agents, /cheatsheets)
- [ ] Default route redirects to /commands

### Commands/Agents
- [ ] All items load from Supabase and display as cards
- [ ] Each card shows name, subtitle, description (truncated), category, copy button
- [ ] Clicking a card opens detail modal
- [ ] Loading skeleton shown while fetching

### Search & Filter
- [ ] Search bar filters items in real-time as user types
- [ ] Category pills filter items when clicked
- [ ] "All" category shows all items
- [ ] Search and filters work together
- [ ] "No results" message shown when appropriate

### Clarifying Questions Toggle
- [ ] Toggle is visible in detail modal
- [ ] Default state is OFF
- [ ] When ON, questions appear from database or fallback
- [ ] Answers update preview in real-time
- [ ] Empty answers don't appear in preview
- [ ] Answers persist when toggling off/on

### Copy
- [ ] Copy button works on cards and in modal
- [ ] "Copied!" feedback appears for 2 seconds
- [ ] Personalized version is copied when questions answered
- [ ] Copy events tracked to PostHog and Supabase

### Cheat Sheets
- [ ] Five task-based categories shown
- [ ] Clicking category expands to show content
- [ ] Markdown renders correctly with syntax highlighting
- [ ] Code blocks have individual copy buttons

### Analytics
- [ ] PostHog initialized on page load
- [ ] Copy events tracked
- [ ] Toggle events tracked
- [ ] Search events tracked

### General
- [ ] Responsive design works on mobile
- [ ] Dark mode works (if implemented)
- [ ] No console errors
- [ ] Performance is acceptable (< 2s initial load)

---

## What NOT to Build (Out of Scope)

- User accounts / authentication
- Upvotes UI (backend schema exists for future)
- User-submitted content
- Comments or discussion
- AI-generated clarifying questions
- Saved favorites
- History
- API access
- Localization

---

## Deployment

1. Push code to GitHub
2. Connect Vercel to GitHub repo
3. Add environment variables in Vercel dashboard
4. Deploy

That's it - Vercel handles the rest for Next.js projects.

---

## Questions During Implementation

If you encounter decisions not covered here:
- Choose the simpler option
- Prioritize user experience over technical elegance
- When in doubt, refer to the PRD.md for product intent
- Ask the user if it's a significant decision

Good luck building Lessico!
