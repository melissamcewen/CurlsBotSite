'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Add type for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Type for route change event
interface RouteChangeEvent extends Event {
  url?: string;
}

// Preconnect to Google domains to improve performance
const Preconnects = () => (
  <>
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <link rel="preconnect" href="https://www.google-analytics.com" />
  </>
);

// Initialize GA with minimal code
const initGA = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-8FLLQZ5VZP', {
    page_path: window.location.pathname,
    transport_type: 'beacon'
  });
`;

export function GoogleAnalytics() {
  useEffect(() => {
    // Only initialize GA after the page has loaded
    const handleRouteChange = (event: RouteChangeEvent) => {
      if (window.gtag && event.url) {
        window.gtag('config', 'G-8FLLQZ5VZP', {
          page_path: event.url,
          transport_type: 'beacon',
        });
      }
    };

    // Add route change handler
    document.addEventListener('routeChangeComplete', handleRouteChange);
    return () => {
      document.removeEventListener('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Preconnects />
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-8FLLQZ5VZP"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {initGA}
      </Script>
    </>
  );
}
