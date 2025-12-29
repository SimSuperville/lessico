'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Cheatsheet } from '@/types';

// Mock data for development when Supabase is not configured
const MOCK_CHEATSHEETS: Cheatsheet[] = [
  {
    id: '1',
    title: 'Getting Started with Claude Code',
    description: 'Essential first steps for new Claude Code users.',
    content_markdown: `# Getting Started with Claude Code

## First Steps

1. **Install Claude Code** - Follow the installation guide for your platform
2. **Navigate to your project** - \`cd\` into your project directory
3. **Run /init** - Let Claude understand your codebase

## Essential Commands

| Command | What it does |
|---------|-------------|
| \`/init\` | Initialise project understanding |
| \`/help\` | Get help on commands |
| \`/compact\` | Compress conversation history |
| \`/clear\` | Start a fresh conversation |

## Tips for Beginners

- **Be specific** - The more context you give, the better the results
- **Start small** - Begin with simple tasks and build up
- **Review output** - Always review generated code before using it
- **Iterate** - If the first result isn't perfect, refine your request

## Example First Session

\`\`\`bash
> cd my-project
> claude

You: /init
Claude: [Analyzes project...]

You: Can you explain the main files in this project?
Claude: [Provides overview...]

You: Add a new function to utils.js that formats dates
Claude: [Writes code...]
\`\`\`

Remember: Claude Code works best when you treat it as a pair programming partner, not just a code generator.`,
    task_category: 'getting_set_up',
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Writing Code Effectively',
    description: 'Best practices for code generation and editing with Claude Code.',
    content_markdown: `# Writing Code Effectively

## Code Generation Tips

### Be Specific About Requirements
Instead of: "Add a button"
Say: "Add a blue primary button with text 'Submit' that calls handleSubmit on click"

### Provide Context
- What framework/library are you using?
- What's the coding style of the project?
- Are there existing patterns to follow?

## Common Patterns

### Adding a New Function

\`\`\`
Add a function called formatCurrency that:
- Takes a number as input
- Returns a string formatted as USD
- Handles edge cases like negative numbers and null
\`\`\`

### Refactoring Code

\`\`\`
Refactor this function to:
- Use async/await instead of callbacks
- Add error handling
- Improve variable names for clarity
\`\`\`

## Tips for Better Results

1. **Reference existing code** - "Follow the pattern in userService.ts"
2. **Specify file locations** - "Add this to src/utils/formatting.ts"
3. **Include type information** - "This should accept a User type and return a string"`,
    task_category: 'writing_code',
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Debugging & Fixing Issues',
    description: 'How to use Claude Code to diagnose and fix bugs.',
    content_markdown: `# Debugging & Fixing Issues

## When You Have an Error

### Share the Full Error
Copy and paste the complete error message, including:
- Error type/name
- Error message
- Stack trace
- Relevant context

### Example Prompt

\`\`\`
I'm getting this error when running npm start:

TypeError: Cannot read property 'map' of undefined
    at UserList (src/components/UserList.tsx:15:23)
    at renderWithHooks (react-dom.development.js:14985:18)

Here's the UserList component:
[paste code]
\`\`\`

## Systematic Debugging

1. **Describe the expected behaviour**
2. **Describe the actual behaviour**
3. **Share relevant code**
4. **Share any error messages**

## Common Debugging Commands

| Ask Claude... | When... |
|---------------|---------|
| "Why is this returning undefined?" | You have unexpected values |
| "Find the bug in this function" | Something isn't working |
| "Add logging to debug this" | You need to trace execution |
| "What's causing this error?" | You have an error message |`,
    task_category: 'debugging',
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Working with Files',
    description: 'Navigate, search, and manage files effectively.',
    content_markdown: `# Working with Files

## Finding Files

### Search by Name
"Find all files named 'config' in the project"

### Search by Content
"Find files that contain 'API_KEY'"

### Search by Type
"Show me all TypeScript files in src/components"

## File Operations

### Reading Files
- "Show me the contents of package.json"
- "What's in the .env.example file?"

### Creating Files
- "Create a new component called UserProfile"
- "Add a new test file for the auth service"

### Moving/Renaming
- "Rename UserList.tsx to UserListComponent.tsx"
- "Move all test files to a __tests__ folder"

## Project Navigation

\`\`\`
Helpful prompts:
- "What's the folder structure of this project?"
- "Where are the API routes defined?"
- "Show me where authentication is handled"
\`\`\``,
    task_category: 'files',
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Advanced Workflows',
    description: 'Multi-step processes and complex task patterns.',
    content_markdown: `# Advanced Workflows

## Multi-Step Tasks

### Example: Adding a New Feature

\`\`\`
I want to add user profile editing. This should include:
1. A new API endpoint for updating profiles
2. A form component for editing
3. Validation for the inputs
4. Tests for the new functionality

Let's start with the API endpoint.
\`\`\`

### Break It Down
For complex tasks, work step-by-step:
1. Plan the approach
2. Implement one piece at a time
3. Test each piece
4. Integrate

## Working with Multiple Files

\`\`\`
Update the user model and all places that use it:
- Add an 'avatar' field to the User type
- Update the database schema
- Modify the API endpoints
- Update the frontend components
\`\`\`

## Code Reviews

\`\`\`
/review

Focus on:
- Security vulnerabilities
- Performance issues
- Code quality
- Test coverage
\`\`\`

## Best Practices

- **Commit frequently** - Save progress as you go
- **Test as you build** - Don't wait until the end
- **Use /compact** - Keep context manageable
- **Be iterative** - Refine as you learn more`,
    task_category: 'advanced',
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

interface UseCheatsheetsResult {
  cheatsheets: Cheatsheet[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCheatsheets(): UseCheatsheetsResult {
  const [cheatsheets, setCheatsheets] = useState<Cheatsheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCheatsheets = async () => {
    setIsLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Use mock data when Supabase is not configured
      setCheatsheets(MOCK_CHEATSHEETS);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from('cheatsheets')
        .select('*')
        .order('display_order', { ascending: true });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setCheatsheets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cheatsheets'));
      // Fallback to mock data on error
      setCheatsheets(MOCK_CHEATSHEETS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCheatsheets();
  }, []);

  return { cheatsheets, isLoading, error, refetch: fetchCheatsheets };
}
