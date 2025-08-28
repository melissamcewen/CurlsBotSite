import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  GoogleTagManagerHead,
  GoogleTagManagerBody,
} from '@/components/GoogleTagManager';
import { AdScripts } from '@/components/ads/AdScripts';
import { LocalizationProvider } from '@/contexts/LocalizationContext';
import { MailerLiteUniversal } from '@/components/MailerLite';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.curlsbot.com'),
  title: {
    template: '%s | CurlsBot',
    default: 'CurlsBot - Curly Hair Product Analyzer',
  },
  description:
    'CurlsBot helps you analyze hair care ingredients and build a routine for your curly hair.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'CurlsBot - Curly Hair Product Analyzer',
    description:
      'Analyze hair care products for curly and wavy hair. Check ingredients for sulfates, silicones, and other ingredients.',
    url: 'https://www.curlsbot.com',
    siteName: 'CurlsBot',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'CurlsBot - Curly Hair Product Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurlsBot - Curly Hair Product Analyzer',
    description:
      'Analyze hair care products for curly and wavy hair. Check ingredients for sulfates, silicones, and other ingredients.',
    images: ['/images/og-default.png'],
  },
  other: {
    'p:domain_verify': '17cf67dd2f8d9805f4d901483e683a2a',
  },
};

// Move theme script to a raw string for earlier execution
const themeScript = `
  (function() {
    function isLocalStorageAvailable() {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    }

    try {
      var defaultTheme = 'cupcake';
      var theme = defaultTheme;

      if (isLocalStorageAvailable()) {
        theme = localStorage.getItem('theme') || defaultTheme;
      }

      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'cupcake');
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="apple-mobile-web-app-title" content="CurlsBot" />
        <meta
          name="impact-site-verification"
          content="1ade1083-f729-416f-9c92-6d0b179d94e3"
        />
        <meta property="og:logo" content="/logo.svg" />
        {/* Preload all images */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <link
          rel="preload"
          href="/normal.svg"
          as="image"
          type="image/svg+xml"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              function isUserInEurope() {
                if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined' || typeof window.__tcfapi !== 'undefined') {
                  return true;
                }
                return Intl.DateTimeFormat().resolvedOptions().timeZone.includes('Europe');
              }
              if (isUserInEurope()) {
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  dataLayer.push(arguments);
                }
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'analytics_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'wait_for_update': 15000
                });
                dataLayer.push({
                  'event': 'default_consent'
                });
              }
            `,
          }}
        />
        <GoogleTagManagerHead />

        {/* Early AdThrive identity/tracking script for Newsletter Link ID */}
        <Script
          id="adthrive-identity"
          strategy="afterInteractive"
          data-no-optimize="1"
          data-cfasync="false"
        >
          {`
            (function() {
              try {
                const w = window;
                w.adthrive = w.adthrive || {};
                w.adthrive.cmd = w.adthrive.cmd || [];
                w.adthrive.plugin = 'adthrive-ads-manual';
                w.adthrive.host = 'ads.adthrive.com';

                // Set up identity tracking early for Newsletter Link ID
                w.adthrive.identity = w.adthrive.identity || {};

                // Initialize command queue for early tracking
                w.adthrive.cmd.push(function() {
                  // Early identity setup - this ensures Newsletter Link ID works
                  console.debug('AdThrive identity initialized');
                });
              } catch (e) {
                console.debug('AdThrive identity setup failed:', e);
              }
            })();
          `}
        </Script>

        <AdScripts />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 text-base-content`}
        suppressHydrationWarning
      >
        <LocalizationProvider>
          <GoogleTagManagerBody />
          <div className="min-h-screen overflow-x-hidden">
            <div className="absolute inset-0 pointer-events-none" />
            <Navbar />
            <main className="bg-base-200 pt-5">{children}</main>
            <Footer />
          </div>
        </LocalizationProvider>

        {/* MailerLite */}
        <MailerLiteUniversal />
      </body>
    </html>
  );
}
