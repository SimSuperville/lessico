// Core entity types for Lessico

export interface ClarifyingQuestion {
  key: string;
  question: string;
  placeholder: string;
}

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

export interface Cheatsheet {
  id: string;
  title: string;
  description: string;
  content_markdown: string;
  task_category: TaskCategory;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type TaskCategory =
  | 'getting_set_up'
  | 'writing_code'
  | 'debugging'
  | 'files'
  | 'advanced';

export interface CopyEvent {
  id: string;
  resource_id: string;
  resource_type: ResourceType;
  was_personalized: boolean;
  session_id: string | null;
  copied_at: string;
}

export type ResourceType = 'command' | 'agent';

// Union type for resources that can be displayed as cards
export type Resource = Command | Agent;

// Type guard to check if a resource is a Command
export function isCommand(resource: Resource): resource is Command {
  return 'usage_example' in resource;
}

// Type guard to check if a resource is an Agent
export function isAgent(resource: Resource): resource is Agent {
  return 'prompt_template' in resource;
}

// Fallback clarifying questions when none are defined
export const FALLBACK_QUESTIONS: ClarifyingQuestion[] = [
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

// Category definitions
export const COMMAND_CATEGORIES = [
  'Getting Started',
  'Code Writing',
  'Debugging',
  'File Management',
  'Session Management',
  'Code Quality'
] as const;

export const AGENT_CATEGORIES = [
  'Code Quality',
  'Documentation',
  'Testing',
  'Refactoring',
  'Learning'
] as const;

export const CHEATSHEET_CATEGORIES: Record<TaskCategory, string> = {
  getting_set_up: 'Getting Set Up',
  writing_code: 'Writing Code',
  debugging: 'Debugging & Fixing',
  files: 'Working with Files',
  advanced: 'Advanced Workflows'
};
