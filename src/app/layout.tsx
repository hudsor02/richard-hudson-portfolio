import Navigation from '@/components/navigation/Navigation';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next/types';
import '@/styles/globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Richard Hudson Portfolio',
  description: 'Portfolio website for Richard Hudson',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
