'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import clsx from 'clsx';

// Define the navigation items as an array of objects containing href and label
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Richard' },
  { href: '/resume', label: 'Resume' },
  { href: '/consulting-services', label: 'Consulting Services' },
  { href: '/contact', label: 'Contact Richard' },
] as const;

export function Navigation() {
  const pathname = usePathname();

  // Function to determine if a navigation item is active based on the current path
  const isActive = (path: string) => {
    const cleanedPath = pathname.replace(/\/?(\?.*)?$/, ''); // Remove trailing slash and query params
    const cleanedTargetPath = path.replace(/\/?$/, ''); // Remove trailing slash
    return cleanedPath === cleanedTargetPath;
  };

  return (
    <nav
      className={styles.navContainer}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className={styles.container}>
        {/* Wrapper container for centering content */}
        <div className={styles.navContent}>
          {/* Logo/Name */}
          <Link className={styles.logo} href="/" aria-label="Navigate to Home">
            Richard Hudson
          </Link>
          {/* Navigation Links */}
          <div className={styles.navLinksWrapper}>
            <div className={styles.navLinksContainer}>
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    styles.navLink,
                    isActive(href)
                      ? styles.activeNavLink
                      : styles.inactiveNavLink // Fixed the typo here
                  )}
                  aria-current={isActive(href) ? 'page' : undefined} // Accessibility improvement
                >
                  {label}
                  {isActive(href) && (
                    <span className={styles.activeTabIndicator} />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
