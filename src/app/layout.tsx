import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { DraftBanner } from '@/components/layout/DraftBanner';
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
  title: {
    default: 'CurlsBot | Hair Care Ingredient Analysis',
    template: '%s | CurlsBot',
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://curlsbot.com',
  ),
  description:
    'Unlock healthier hair with CurlsBot. Our AI assistant analyzes ingredients & porosity to give you personalized hair care advice, product recommendations, and ingredient breakdowns tailored just for curly and wavy hair.',
  keywords: [
    'hair care',
    'ingredient analysis',
    'curly hair',
    'porosity',
    'hair products',
    'CurlsBot',
  ],
  authors: [{ name: 'CurlsBot' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CurlsBot',
    title: 'CurlsBot - Hair Care Ingredient Analysis',
    description:
      'Your intelligent assistant for analyzing hair care ingredients and understanding hair porosity',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'CurlsBot - Hair Care Ingredient Analysis',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurlsBot - Hair Care Ingredient Analysis',
    description:
      'Your intelligent assistant for analyzing hair care ingredients',
    images: ['/images/og-default.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // You'll need to replace this with your actual verification code
  },
  category: 'technology',
};

// Move theme script to a raw string for earlier execution
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme') || 'cupcake';
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
    <html lang="en" suppressHydrationWarning data-theme="cupcake">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="apple-mobile-web-app-title" content="cupcake" />
        {/* Preload all images */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/normal.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/surprised.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/exclaim.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/normal.png" as="image" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 text-base-content`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <div className="min-h-screen overflow-x-hidden">
          <div className="absolute inset-0 pointer-events-none" />
          <DraftBanner />
          <Navbar />

            <main>
              <div className="p-4 md:p-8">{children}</div>
            </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
