import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import Script from 'next/script';

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
    'Analyze hair care products for curly and wavy hair. Check ingredients for sulfates, silicones, and other ingredients.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.curlsbot.com',
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
};

// Move theme script to a raw string for earlier execution
const themeScript = `
  (function() {
    try {
      var defaultTheme = 'cupcake';
      var theme = localStorage.getItem('theme') || defaultTheme;
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
        <link
          rel="preload"
          href="/surprised.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/exclaim.svg"
          as="image"
          type="image/svg+xml"
        />
        <link rel="preload" href="/normal.png" as="image" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 text-base-content`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <Script
          src="https://s.skimresources.com/js/276362X1762442.skimlinks.js"
          strategy="afterInteractive"
        />
        <div className="min-h-screen overflow-x-hidden">
          <div className="absolute inset-0 pointer-events-none" />
          <Navbar />

          <main className="">
            <div className="p-4 md:p-8">{children}</div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
