// hero.tsx
'use client';
import { FC } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  metrics: Array<{ metric: string; label: string }>;
  ctaPrimary: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
  scrollIndicator?: {
    onClick: () => void;
    label: string;
    icon: LucideIcon;
  };
}

const Hero: FC<HeroProps> = ({
  name,
  title,
  description,
  metrics,
  ctaPrimary,
  ctaSecondary,
  scrollIndicator,
}) => {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 to-white/90" />
      </div>

      <div className="relative z-10 max-w-5xl">
        <h1 className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
          {name}
        </h1>
        <p className="mt-4 text-xl font-semibold text-blue-600">{title}</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
          {description}
        </p>

        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Button size="lg" variant="primary" className="w-full sm:w-auto">
            <Link
              href={ctaPrimary.href}
              className="flex w-full items-center justify-center gap-2"
            >
              {ctaPrimary.icon && <ctaPrimary.icon className="h-5 w-5" />}
              {ctaPrimary.label}
            </Link>
          </Button>

          {ctaSecondary && (
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Link
                href={ctaSecondary.href}
                className="flex w-full items-center justify-center"
              >
                {ctaSecondary.label}
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-8 max-w-3xl mx-auto sm:grid-cols-4">
        {metrics.map(({ metric, label }) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-bold text-blue-700">{metric}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>

      {scrollIndicator && (
        <button
          onClick={scrollIndicator.onClick}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 transition-colors hover:text-gray-700"
          aria-label={scrollIndicator.label}
        >
          <scrollIndicator.icon className="h-8 w-8 animate-bounce" />
        </button>
      )}
    </section>
  );
};

export default Hero;
