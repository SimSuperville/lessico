'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from './CopyButton';

interface CheatsheetContentProps {
  markdown: string;
}

// Custom vintage theme for syntax highlighting
const vintageCodeTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#7A2B2B',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: '#7A2B2B',
  },
};

export function CheatsheetContent({ markdown }: CheatsheetContentProps) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            const isInline = !match && !codeString.includes('\n');

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-[var(--burgundy-pale)] text-sm font-mono text-[var(--burgundy-dark)]"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="relative group not-prose my-4">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <CopyButton text={codeString} size="sm" />
                </div>
                <SyntaxHighlighter
                  style={vintageCodeTheme}
                  language={match ? match[1] : 'text'}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    background: 'var(--burgundy-dark)',
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          },

          table({ children }) {
            return (
              <div className="overflow-x-auto not-prose my-4">
                <table className="min-w-full divide-y divide-[var(--cream-border)]">
                  {children}
                </table>
              </div>
            );
          },

          thead({ children }) {
            return (
              <thead className="bg-[var(--burgundy-pale)]">{children}</thead>
            );
          },

          th({ children }) {
            return (
              <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--burgundy-dark)] uppercase tracking-wider">
                {children}
              </th>
            );
          },

          td({ children }) {
            return (
              <td className="px-4 py-3 text-sm text-[var(--burgundy-dark)] whitespace-nowrap">
                {children}
              </td>
            );
          },

          tr({ children }) {
            return (
              <tr className="border-b border-[var(--cream-border)]">
                {children}
              </tr>
            );
          },

          h1({ children }) {
            return (
              <h1 className="text-2xl font-bold text-[var(--burgundy-dark)] mb-4">
                {children}
              </h1>
            );
          },

          h2({ children }) {
            return (
              <h2 className="text-xl font-semibold text-[var(--burgundy-dark)] mt-6 mb-3">
                {children}
              </h2>
            );
          },

          h3({ children }) {
            return (
              <h3 className="text-lg font-medium text-[var(--burgundy-dark)] mt-4 mb-2">
                {children}
              </h3>
            );
          },

          p({ children }) {
            return (
              <p className="text-[var(--burgundy-dark)] leading-relaxed mb-4">
                {children}
              </p>
            );
          },

          ul({ children }) {
            return (
              <ul className="list-disc list-inside space-y-1 mb-4 text-[var(--burgundy-dark)]">
                {children}
              </ul>
            );
          },

          ol({ children }) {
            return (
              <ol className="list-decimal list-inside space-y-1 mb-4 text-[var(--burgundy-dark)]">
                {children}
              </ol>
            );
          },

          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-[var(--burgundy)] hover:text-[var(--burgundy-dark)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },

          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-[var(--burgundy)] pl-4 italic text-[var(--burgundy-light)] my-4">
                {children}
              </blockquote>
            );
          },

          strong({ children }) {
            return (
              <strong className="font-semibold text-[var(--burgundy-dark)]">
                {children}
              </strong>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
