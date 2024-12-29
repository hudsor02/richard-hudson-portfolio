'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

// Define the gtag function type
type GTagFunction = (
  command: 'config' | 'event' | 'js',
  targetId: string,
  config?: Record<string, unknown>
) => void;

// Extend the window interface
declare global {
  interface Window {
    gtag: GTagFunction;
    dataLayer: unknown[];
  }
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
          page_path: url,
        });
      }
    };

    if (pathname) {
      handleRouteChange(pathname + searchParams?.toString());
    }
  }, [pathname, searchParams]);

  // Only include analytics in production
  if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_GA_ID) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `,
        }}
      />
    </>
  );
}
