'use client';

import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { Navigation } from '@/components/navigation/Navigation';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { ScrollProgress } from '@/components/ui/Scroll-Progress';
import { Footer } from '@/components/navigation/Footer';
import SEO from '@/components/seo/SEO';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}
    >
      <SEO
        title="Richard Hudson | Revenue Operations Professional"
        description="Explore Richard Hudson's portfolio showcasing expertise in revenue operations, process automation, and partner management."
        canonical="https://richardwhudsonjr.com"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://richardwhudsonjr.com',
          site_name: 'Richard Hudson Portfolio',
        }}
      />
      <body className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-blue-100">
        <div className="relative flex flex-col min-h-screen">
          <ScrollProgress />
          <BackgroundGradient />
          <Navigation />
          <main className="flex-1 flex items-center justify-center">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 text-center">
              {children}
            </div>
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" richColors expand={true} />
        <Analytics mode="production" debug={false} />
      </body>
    </html>
  );
}
