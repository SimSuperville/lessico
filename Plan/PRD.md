# Lessico - Product Requirements Document

## Document Information
- **Product Name**: Lessico
- **Version**: 1.0 (MVP)
- **Last Updated**: December 29, 2025
- **Author**: Product Planning Session

---

## Executive Summary

Lessico is a curated resource library designed to help beginners and early-intermediate Claude Code users quickly find, understand, and use slash commands, sub-agents, and workflow patterns. The product differentiates through thoughtful curation, exceptional UX, and a unique "clarifying questions toggle" feature that helps users personalize commands for their specific context.

---

## Problem Statement

### The User Problem

New Claude Code users face significant information overload when trying to learn the tool. They encounter:

1. **Scattered documentation** - Official docs, community resources, and tips are spread across multiple sources
2. **Developer-oriented resources** - Existing solutions like awesomeclaude.ai are built for experienced developers, making them intimidating for beginners
3. **Generic examples** - Available command examples don't adapt to user's specific use case
4. **No clear learning path** - Users don't know which commands/features to learn first or how they fit together

### The Business Opportunity

Users attending Claude Code webinars need a follow-up resource that:
- Reinforces what they learned
- Provides immediately actionable, copy-ready content
- Reduces time-to-productivity with Claude Code
- Creates ongoing engagement beyond the webinar

### Current Alternatives

| Solution | Strengths | Weaknesses |
|----------|-----------|------------|
| Official Anthropic docs | Comprehensive, authoritative | Dense, not beginner-focused |
| awesomeclaude.ai | Polished UI, good content | Developer-oriented, hard to navigate for beginners |
| Community Discord/forums | Real-time help | Information overload, not curated |
| Blog posts/tutorials | In-depth explanations | Scattered, varying quality |

---

## Target Users

### Primary: Webinar Attendees (Beginners)

**Profile**:
- Attended a Claude Code introductory webinar
- May or may not have technical background
- Excited but overwhelmed by possibilities
- Want quick wins to build confidence

**Jobs to Be Done**:
- "Help me remember what I learned in the webinar"
- "Give me something I can try right now"
- "Show me the most important commands to learn first"

**Pain Points**:
- Don't know where to start
- Intimidated by technical documentation
- Forget commands/syntax between sessions
- Unsure how to adapt generic examples to their needs

### Secondary: Early-Intermediate Users

**Profile**:
- Using Claude Code for a few weeks/months
- Comfortable with basics but want to level up
- Looking for efficiency improvements

**Jobs to Be Done**:
- "What am I missing that could make me faster?"
- "How do other people use this more effectively?"
- "Give me the quick reference I can come back to"

---

## Goals and Success Metrics

### User Goals
1. Find relevant commands/agents quickly (< 30 seconds)
2. Copy ready-to-use content with minimal friction
3. Understand how to adapt commands to their context
4. Build confidence and competence with Claude Code

### Business Goals
1. Establish Lessico as the go-to resource for Claude Code beginners
2. Create recurring engagement (users return regularly)
3. Generate word-of-mouth referrals from satisfied users
4. Build foundation for future premium features

### Success Metrics (MVP)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Copies per session** (Primary) | > 2.0 average | PostHog event tracking |
| **Weekly active users** | 50+ within first month | PostHog unique users |
| **Return visitor rate** | > 30% return within 7 days | PostHog cohort analysis |
| **Clarifying questions usage** | > 25% of copies use toggle | PostHog event tracking |
| **Session duration** | 2-5 minutes (not too short, not too long) | PostHog session tracking |

---

## Proposed Solution

### Product Overview

Lessico is a web application with three main content sections:

1. **Slash Commands** - Curated list of 10 essential Claude Code commands with usage examples and clarifying questions
2. **Sub-Agents** - Curated list of 10 sub-agent prompts/patterns with clarifying questions
3. **Cheat Sheets** - 5 tactical, task-based reference guides

### Key Features

#### 1. Tab-Based Navigation
Three distinct tabs for Commands, Agents, and Cheat Sheets. Clear separation helps beginners understand the different types of resources.

#### 2. Search and Filtering
- **Text search**: Type to filter by name/description across all items in current tab
- **Category filters**: Click to narrow by category (e.g., "Code Writing", "Debugging", "File Management")
- Both work together for maximum findability

#### 3. Clarifying Questions Toggle (Key Differentiator)

**How it works**:
1. User views a command/agent card
2. Default view shows the generic, ready-to-copy version
3. User toggles "Personalize this command"
4. Clarifying questions appear based on pre-authored metadata
5. User answers questions (optional text inputs)
6. Preview updates in real-time showing the personalized version
7. User copies the customized command

**Example**:
```
Command: /init

Generic version:
/init

With clarifying questions:
- What type of project? [React app]
- Primary language? [TypeScript]
- Any specific frameworks? [Next.js, Tailwind]

Personalized version:
/init
This is a React app built with Next.js and TypeScript.
We use Tailwind for styling. Please analyze the project
structure before making changes.
```

**Fallback**: If a command doesn't have custom clarifying questions metadata, show a generic set of questions (project type, language, any context to add).

#### 4. Copy-to-Clipboard
- One-click copy button on every command/agent
- Visual feedback (button changes to "Copied!" briefly)
- Tracks copy events for analytics

#### 5. Cheat Sheets Section
- Separate tab with different layout (reading-focused vs. card-based)
- Task-based organization:
  - **Getting Set Up** - Initial configuration, settings, first steps
  - **Writing Code** - Code generation, editing, refactoring patterns
  - **Debugging & Fixing** - Error resolution, testing workflows
  - **Working with Files** - File management, search, navigation
  - **Advanced Workflows** - Multi-step processes, agent orchestration
- Concise, actionable, scannable format

#### 6. Conditional Upvotes (Future-Ready)
- Upvote UI is hidden entirely until meaningful vote counts exist
- Database schema supports upvotes for future implementation
- Avoids discouraging "0 upvotes" display

---

## User Stories and Acceptance Criteria

### Epic 1: Content Browsing

#### Story 1.1: View All Commands
**As a** user
**I want to** see a list of all available slash commands
**So that** I can browse what's available

**Acceptance Criteria**:
- [ ] Commands tab displays all 10 commands as cards
- [ ] Each card shows: command name, subtitle (1-line summary), description (truncated to 2 lines), category tag
- [ ] Cards are visually scannable (not text-heavy)
- [ ] Loading state shown while fetching from Supabase

#### Story 1.2: View All Agents
**As a** user
**I want to** see a list of all available sub-agents
**So that** I can browse what's available

**Acceptance Criteria**:
- [ ] Agents tab displays all 10 agents as cards
- [ ] Each card shows: agent name, subtitle (1-line summary), description (truncated to 2 lines), category tag
- [ ] Format consistent with commands tab
- [ ] Loading state shown while fetching

#### Story 1.3: View Command/Agent Detail
**As a** user
**I want to** see full details of a command or agent
**So that** I can understand how to use it

**Acceptance Criteria**:
- [ ] Clicking a card expands to show full details (modal or inline expansion)
- [ ] Detail view shows: name, full description, usage example, copy button
- [ ] Clarifying questions toggle is visible
- [ ] Can close/collapse detail view easily

### Epic 2: Search and Filter

#### Story 2.1: Text Search
**As a** user
**I want to** search by typing keywords
**So that** I can quickly find specific commands/agents

**Acceptance Criteria**:
- [ ] Search input field at top of Commands and Agents tabs
- [ ] Search filters in real-time as user types (debounced)
- [ ] Searches across name, subtitle, and description fields
- [ ] Shows "No results" message when nothing matches
- [ ] Clear button to reset search

#### Story 2.2: Category Filtering
**As a** user
**I want to** filter by category
**So that** I can narrow down to relevant items

**Acceptance Criteria**:
- [ ] Category filter buttons/pills shown below search
- [ ] Categories derived from content (e.g., "Code Writing", "Debugging", "File Ops")
- [ ] Clicking a category shows only items in that category
- [ ] Can select multiple categories (OR logic)
- [ ] "All" option to clear filters
- [ ] Filter works in combination with text search

### Epic 3: Clarifying Questions Toggle

#### Story 3.1: Toggle Clarifying Questions
**As a** user
**I want to** toggle on clarifying questions for a command
**So that** I can personalize it for my use case

**Acceptance Criteria**:
- [ ] Toggle switch labeled "Personalize this command" in detail view
- [ ] Default state is OFF (showing generic version)
- [ ] When toggled ON, clarifying questions appear
- [ ] Questions are loaded from command metadata in Supabase
- [ ] Fallback to generic questions if no metadata exists

#### Story 3.2: Answer Clarifying Questions
**As a** user
**I want to** answer the clarifying questions
**So that** the command is customized for me

**Acceptance Criteria**:
- [ ] Each question has a text input field
- [ ] Inputs are optional (can leave blank)
- [ ] Answers persist during session (not cleared if toggle is turned off/on)
- [ ] Input fields have helpful placeholder text

#### Story 3.3: Preview Personalized Command
**As a** user
**I want to** see a preview of the personalized command
**So that** I know what I'll be copying

**Acceptance Criteria**:
- [ ] Preview area shows the command with answers interpolated
- [ ] Preview updates in real-time as user types answers
- [ ] Clear visual distinction between "before" (generic) and "after" (personalized)
- [ ] Empty answers are gracefully handled (not shown as blank spaces)

### Epic 4: Copy Functionality

#### Story 4.1: Copy Command/Agent
**As a** user
**I want to** copy a command or agent prompt with one click
**So that** I can use it immediately in Claude Code

**Acceptance Criteria**:
- [ ] Copy button clearly visible on each card and detail view
- [ ] Clicking copies content to clipboard
- [ ] Visual feedback: button shows "Copied!" for 2 seconds
- [ ] Copies personalized version if clarifying questions are answered
- [ ] Works on mobile (touch)

#### Story 4.2: Track Copy Events
**As a** product owner
**I want to** track when users copy content
**So that** I can measure engagement and identify popular resources

**Acceptance Criteria**:
- [ ] PostHog event fired on every copy
- [ ] Event includes: resource_id, resource_type, was_personalized (boolean)
- [ ] Events are stored in Supabase `copies` table for backup

### Epic 5: Cheat Sheets

#### Story 5.1: Browse Cheat Sheets
**As a** user
**I want to** browse cheat sheets by task category
**So that** I can find guidance for what I'm trying to do

**Acceptance Criteria**:
- [ ] Cheat Sheets tab shows 5 task-based categories
- [ ] Categories: Getting Set Up, Writing Code, Debugging & Fixing, Working with Files, Advanced Workflows
- [ ] Each category shows title and brief description
- [ ] Click to expand and view full cheat sheet content

#### Story 5.2: Read Cheat Sheet Content
**As a** user
**I want to** read a cheat sheet in a comfortable format
**So that** I can learn and reference the information

**Acceptance Criteria**:
- [ ] Cheat sheet content rendered as formatted markdown
- [ ] Layout optimized for reading (wider, less card-like)
- [ ] Code snippets are syntax-highlighted
- [ ] Code snippets have individual copy buttons
- [ ] Content is concise and scannable (not walls of text)

### Epic 6: Analytics

#### Story 6.1: Track User Sessions
**As a** product owner
**I want to** track user sessions and engagement
**So that** I can understand usage patterns

**Acceptance Criteria**:
- [ ] PostHog SDK initialized on app load
- [ ] Session start event tracked
- [ ] Page/tab views tracked
- [ ] All events include session ID for grouping

#### Story 6.2: View Analytics Dashboard
**As a** product owner
**I want to** view analytics in PostHog
**So that** I can measure success metrics

**Acceptance Criteria**:
- [ ] PostHog dashboard configured with key metrics
- [ ] Copies per session calculation available
- [ ] Popular resources report available
- [ ] Clarifying questions usage rate visible

---

## Technical Architecture

### Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14+ (App Router) | SSR/SSG, great DX, Vercel-native |
| **Styling** | Tailwind CSS | Rapid UI development, consistent design |
| **Database** | Supabase (PostgreSQL) | Easy content updates, free tier, real-time ready |
| **Hosting** | Vercel | Zero-config Next.js deployment, generous free tier |
| **Analytics** | PostHog | Product analytics, free tier (1M events/mo) |

### Database Schema

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

-- Copy events table (backup for PostHog)
CREATE TABLE copy_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL,
  resource_type VARCHAR(20) NOT NULL,
  was_personalized BOOLEAN DEFAULT FALSE,
  session_id VARCHAR(100),
  copied_at TIMESTAMP DEFAULT NOW()
);

-- Future: Upvotes table (not used in MVP)
CREATE TABLE upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL,
  resource_type VARCHAR(20) NOT NULL,
  fingerprint VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(resource_id, resource_type, fingerprint)
);
```

### Clarifying Questions JSON Structure

```json
{
  "clarifying_questions": [
    {
      "key": "project_type",
      "question": "What type of project is this?",
      "placeholder": "e.g., React app, Python CLI, Node.js API"
    },
    {
      "key": "language",
      "question": "What's the primary language?",
      "placeholder": "e.g., TypeScript, Python, Go"
    },
    {
      "key": "context",
      "question": "Any specific context to include?",
      "placeholder": "e.g., We use Tailwind for styling"
    }
  ]
}
```

### Component Architecture

```
src/
├── app/
│   ├── layout.tsx           # Root layout with PostHog provider
│   ├── page.tsx             # Home page (redirects to /commands)
│   ├── commands/
│   │   └── page.tsx         # Commands tab
│   ├── agents/
│   │   └── page.tsx         # Agents tab
│   └── cheatsheets/
│       └── page.tsx         # Cheat sheets tab
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Logo, navigation tabs
│   │   └── TabNav.tsx       # Commands | Agents | Cheat Sheets
│   ├── search/
│   │   ├── SearchBar.tsx    # Text search input
│   │   └── CategoryFilter.tsx # Category pills
│   ├── cards/
│   │   ├── CommandCard.tsx  # Command list item
│   │   ├── AgentCard.tsx    # Agent list item
│   │   └── CardDetail.tsx   # Expanded detail view
│   ├── clarifying/
│   │   ├── ClarifyingToggle.tsx    # Toggle switch
│   │   ├── QuestionInput.tsx       # Individual question
│   │   └── PersonalizedPreview.tsx # Before/after preview
│   ├── cheatsheets/
│   │   ├── CheatsheetList.tsx      # Category navigation
│   │   └── CheatsheetContent.tsx   # Markdown renderer
│   └── common/
│       ├── CopyButton.tsx   # Copy to clipboard
│       └── LoadingState.tsx # Loading skeleton
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── posthog.ts           # PostHog client
│   └── utils.ts             # Helper functions
├── hooks/
│   ├── useCommands.ts       # Fetch commands
│   ├── useAgents.ts         # Fetch agents
│   ├── useCheatsheets.ts    # Fetch cheatsheets
│   └── useSearch.ts         # Search/filter logic
└── types/
    └── index.ts             # TypeScript interfaces
```

---

## Design Considerations

### UX Principles

1. **Scannable over comprehensive** - Users should find what they need in seconds
2. **Copy-first design** - The copy action should be the most prominent affordance
3. **Progressive disclosure** - Show summary first, details on demand
4. **Forgiving search** - Fuzzy matching, suggestions, never dead-ends

### Visual Design Direction

- **Clean and minimal** - Reduce visual noise
- **Generous whitespace** - Don't overwhelm
- **Clear hierarchy** - Name > Subtitle > Description > Action
- **Subtle category colors** - Help with scanning without being garish
- **Dark mode** - Support from launch (Tailwind makes this easy)

### Mobile Considerations

- Tab navigation converts to bottom bar or hamburger
- Cards stack vertically
- Copy button remains easily tappable
- Clarifying questions work well on mobile keyboards

---

## Edge Cases and Error Handling

| Scenario | Expected Behavior |
|----------|-------------------|
| No search results | Show friendly "No commands match your search. Try different keywords or clear filters." |
| Supabase connection fails | Show cached content if available; error message with retry button if not |
| Clipboard API not supported | Fallback to select-all behavior with instructions |
| Command missing clarifying questions | Show generic fallback questions |
| Empty clarifying question answer | Omit that line from personalized output (don't show blank) |
| Very long personalized command | Show scrollable preview, maintain formatting |
| User toggles off clarifying questions | Preserve their answers in session state |

---

## Out of Scope for MVP

| Feature | Rationale | Revisit When |
|---------|-----------|--------------|
| User accounts/authentication | Adds complexity, not needed for core value prop | Phase 2: When implementing saved preferences |
| Upvotes/ratings display | Showing zeros is discouraging; need traction first | When 100+ weekly active users |
| User-submitted content | Need to establish quality bar first | When community requests it |
| AI-generated clarifying questions | Pre-authored questions maintain quality and control | Likely never - manual curation is the differentiator |
| Saved/favorited commands | Requires authentication | Phase 2 with user accounts |
| Command history | Requires authentication | Phase 2 with user accounts |
| Comments/discussion | Not core to the resource library value prop | Phase 3 or never |
| API access | Not needed for target users | If developer segment grows |
| Localization | English-only audience for now | If international demand appears |

---

## Open Questions

1. **Content curation**: Who will select the initial 10 commands and 10 agents? What criteria?
2. **Clarifying questions authoring**: Will all 20 items have custom questions, or will some use fallbacks?
3. **Cheat sheet content**: Who will write the 5 cheat sheets? What's the target length?
4. **Launch timing**: Is there a specific webinar date this needs to be ready for?
5. **Domain**: What domain will Lessico live on?

---

## Dependencies

1. **Supabase account** - Need to create project and configure tables
2. **Vercel account** - For deployment
3. **PostHog account** - For analytics (can defer until near-launch)
4. **Content** - 10 commands, 10 agents, 5 cheat sheets with metadata
5. **Domain** - Purchase and configure DNS

---

## Launch Checklist

- [ ] All 20 commands/agents loaded into Supabase with clarifying questions
- [ ] All 5 cheat sheets written and loaded
- [ ] PostHog configured with key events and dashboard
- [ ] Mobile responsive tested
- [ ] Error handling tested (offline, slow connection)
- [ ] Copy functionality tested across browsers
- [ ] Performance acceptable (< 2s initial load)
- [ ] Domain configured
- [ ] Analytics verified working in production

---

## Appendix: Sample Content Structure

### Example Command Entry

```json
{
  "name": "/init",
  "subtitle": "Set up project context",
  "description": "Initialize Claude Code's understanding of your project. Run this first in any new codebase to help Claude understand the project structure, tech stack, and conventions.",
  "usage_example": "/init",
  "category": "Getting Started",
  "clarifying_questions": [
    {
      "key": "project_type",
      "question": "What type of project is this?",
      "placeholder": "e.g., React web app, Python API, CLI tool"
    },
    {
      "key": "tech_stack",
      "question": "What's your main tech stack?",
      "placeholder": "e.g., Next.js, TypeScript, Tailwind"
    },
    {
      "key": "conventions",
      "question": "Any specific conventions or patterns to follow?",
      "placeholder": "e.g., We use feature-based folder structure"
    }
  ]
}
```

### Example Cheat Sheet Categories

1. **Getting Set Up** - Installation, configuration, first project setup
2. **Writing Code** - Code generation patterns, editing, refactoring
3. **Debugging & Fixing** - Error diagnosis, test failures, bug hunting
4. **Working with Files** - Search, navigation, file management
5. **Advanced Workflows** - Multi-agent patterns, complex tasks, automation
