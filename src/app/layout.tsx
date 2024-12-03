import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Navigation from '@/components/navigation/Navigation';
import { Footer } from '@/components/navigation/Footer';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { ToastProvider as Toaster } from '@/components/notifications/ToastProvider';
import '../styles/globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Richard Hudson - Revenue Operations Consultant',
    template: '%s | Richard Hudson',
  },
  description:
    'Revenue Operations Professional specializing in data-driven solutions and strategic optimizations that drive growth.',
  keywords: [
    'Revenue Operations',
    'Business Consulting',
    'Data Analytics',
    'Process Optimization',
    'Strategic Planning',
    'Dallas Fort Worth',
    'Texas',
    'RevOps',
  ],
  authors: [{ name: 'Richard Hudson' }],
  creator: 'Richard Hudson',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://richardwhudsonjr.com',
    title: 'Richard Hudson - Revenue Operations Consultant',
    description:
      'Revenue Operations Professional specializing in data-driven solutions and strategic optimizations that drive growth.',
    siteName: 'Richard Hudson Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Richard Hudson - Revenue Operations Consultant',
    description:
      'Revenue Operations Professional specializing in data-driven solutions and strategic optimizations that drive growth.',
    creator: '@richardwhudsonjr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-screen bg-white font-sans antialiased dark:bg-neutral-900">
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <ScrollProgress />
          <BackgroundGradient />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>

        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
