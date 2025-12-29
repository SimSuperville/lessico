'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { name: 'Commands', href: '/commands' },
  { name: 'Agents', href: '/agents' },
  { name: 'Cheat Sheets', href: '/cheatsheets' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <>
      {/* Striped Awning */}
      <div className="striped-awning-large w-full" aria-hidden="true" />

      <header className="sticky top-0 z-50 w-full border-b-2 border-[var(--cream-border)] bg-[var(--cream-card)]/95 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/commands" className="flex flex-col group">
              <span className="text-3xl sm:text-4xl font-bold text-[var(--burgundy-dark)] font-[family-name:var(--font-display)] tracking-tight group-hover:text-[var(--burgundy)] transition-colors">
                LESSICO
              </span>
              <span className="hidden sm:block text-xs text-[var(--burgundy-light)] font-[family-name:var(--font-accent)] tracking-widest uppercase mt-0.5">
                Est. 2024
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center gap-2">
              {tabs.map((tab) => {
                const isActive = pathname === tab.href ||
                  (tab.href === '/commands' && pathname === '/');

                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                      'px-5 py-2.5 text-sm font-[family-name:var(--font-accent)] font-semibold tracking-wide transition-all rounded border-2',
                      isActive
                        ? 'bg-[var(--burgundy)] text-[var(--cream-card)] border-[var(--burgundy-dark)] shadow-md'
                        : 'bg-transparent text-[var(--burgundy-dark)] border-[var(--cream-border)] hover:border-[var(--burgundy-border)] hover:bg-[var(--cream-hover)]'
                    )}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex sm:hidden border-t-2 border-[var(--cream-border)] -mx-4 px-4">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href ||
                (tab.href === '/commands' && pathname === '/');

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'flex-1 py-3 text-center text-sm font-[family-name:var(--font-accent)] font-semibold border-b-3 transition-all',
                    isActive
                      ? 'border-[var(--burgundy)] text-[var(--burgundy-dark)] bg-[var(--cream-hover)]'
                      : 'border-transparent text-[var(--burgundy-light)] hover:text-[var(--burgundy-dark)] hover:border-[var(--burgundy-light)]'
                  )}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Decorative Border Under Header */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--burgundy-border)] to-transparent opacity-30" aria-hidden="true" />
    </>
  );
}
