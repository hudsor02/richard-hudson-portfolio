import { Analytics } from '@/components/Analytics';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/navigation/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import '@/styles/globals.css';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://richardwhudsonjr.com'),
  title: {
    default: 'Richard Hudson | Revenue Operations Professional',
    template: '%s | Richard Hudson',
  },
  description:
    'Revenue Operations Professional specializing in data-driven solutions and strategic optimizations.',
  keywords: [
    'Revenue Operations',
    'Business Analysis',
    'Partner Management',
    'Process Optimization',
    'Data Analytics',
    'Strategic Planning',
  ],
  authors: [{ name: 'Richard Hudson' }],
  creator: 'Richard Hudson',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://richardwhudsonjr.com',
    title: 'Richard Hudson | Revenue Operations Professional',
    description:
      'Revenue Operations Professional specializing in data-driven solutions.',
    siteName: 'Richard Hudson Portfolio',
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

export default function RootLayout({
  children,
 }: {
  children: React.ReactNode;
 }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('antialiased font-sans', inter.variable)}
    >
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              className: 'font-medium',
            }}
          />
          <ScrollToTop />
          <Analytics />
          {process.env.NODE_ENV === 'development' && <TailwindIndicator />}
        </ThemeProvider>
      </body>
    </html>
  );
 }