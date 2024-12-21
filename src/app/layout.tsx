import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ThemeScript } from '@/components/ThemeScript';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CurlsBot | Hair Care Ingredient Analysis',
    template: '%s | CurlsBot'
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://curlsbot.com'),
  description: 'Your intelligent assistant for analyzing hair care ingredients and understanding hair porosity. Get personalized hair care advice and ingredient analysis.',
  keywords: ['hair care', 'ingredient analysis', 'curly hair', 'porosity', 'hair products', 'CurlsBot'],
  authors: [{ name: 'CurlsBot' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CurlsBot',
    title: 'CurlsBot - Hair Care Ingredient Analysis',
    description: 'Your intelligent assistant for analyzing hair care ingredients and understanding hair porosity',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'CurlsBot Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurlsBot - Hair Care Ingredient Analysis',
    description: 'Your intelligent assistant for analyzing hair care ingredients',
    images: ['/icon.png']
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png'
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: 'google-site-verification-code', // You'll need to replace this with your actual verification code
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="cupcake" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 text-base-content`}
        suppressHydrationWarning
      >
        <ThemeScript />
        <GoogleAnalytics />
        <div className="min-h-screen overflow-x-hidden">
          <div className="absolute inset-0 pointer-events-none" />
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
