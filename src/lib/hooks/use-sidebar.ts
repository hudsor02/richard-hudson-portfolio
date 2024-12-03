// src/hooks/use-sidebar.ts
import { useState, useEffect } from 'react';

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Check if there's a stored preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebarCollapsed');
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return {
    isCollapsed,
    toggleSidebar,
  };
}
