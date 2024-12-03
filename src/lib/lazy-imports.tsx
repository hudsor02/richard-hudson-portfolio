// src/lib/lazy-imports.tsx
'use client';

import dynamic from 'next/dynamic';
import { ComponentType, ReactNode } from 'react';

interface LazyLoadOptions {
  loading?: ReactNode;
  ssr?: boolean;
}

type ComponentWithProps<P = unknown> = ComponentType<P>;

export function createLazyComponent<P>(
  importFn: () => Promise<{ default: ComponentWithProps<P> }>,
  options: LazyLoadOptions = {}
) {
  const { loading, ssr = false } = options;

  return dynamic(importFn, {
    loading: loading ? () => <>{loading}</> : undefined,
    ssr,
  });
}
