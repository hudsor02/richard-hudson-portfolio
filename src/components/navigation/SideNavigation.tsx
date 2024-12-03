'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SideNavigationProps {
  isCollapsed: boolean;
  toggleSidebarAction: () => void;
}

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Resume', path: '/resume' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
  { name: 'Consulting/Services', path: '/consulting-services' },
];

export default function SideNavigation({
  isCollapsed,
  toggleSidebarAction,
}: SideNavigationProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-neutral-100 dark:bg-neutral-800 z-40 shadow-lg
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebarAction}
        className={`absolute -right-4 top-4 h-8 w-8 rounded-full
          bg-neutral-200 dark:bg-neutral-700
          hover:bg-neutral-300 dark:hover:bg-neutral-600
          transition-all duration-200
          shadow-md flex items-center justify-center
          transform hover:scale-105 active:scale-95`}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        )}
      </button>

      {/* Navigation Links */}
      <nav className="flex h-full flex-col space-y-4 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative rounded-lg px-4 py-2
                transition-all duration-200
                hover:bg-primary hover:text-white
                ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-neutral-800 dark:text-neutral-200'
                }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-200
                    ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
                >
                  {item.name}
                </span>
              </div>

              {isActive && (
                <div className="absolute inset-0 -z-10 rounded-lg bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
