import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CurlsBot',
  description: 'Your intelligent assistant for analyzing hair care ingredients',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'cupcake';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <meta name="apple-mobile-web-app-title" content="cupcake" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-screen bg-base-300 overflow-x-hidden flex flex-col">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <Navbar />
          <div className="flex-1 pt-0 md:py-8 px-0 md:px-8">
            <main className="max-w-[90rem] mx-auto bg-base-100 text-base-content rounded-none md:rounded-lg">
              <div className="p-4 md:p-8">{children}</div>
            </main>
          </div>
          <footer className="bg-base-200 border-t border-base-300">
            <div className="max-w-[90rem] mx-auto px-4 py-8 md:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-base-content/80">
                  © {new Date().getFullYear()} CurlsBot. All rights reserved.
                </div>
                <div className="flex gap-4 text-sm">
                  <Link href="/about" className="link link-hover">About</Link>
                  <Link href="/privacy" className="link link-hover">Privacy</Link>
                  <Link href="/terms" className="link link-hover">Terms</Link>
                  <a href="https://github.com/melissamcewen/CurlsBotSite" className="link link-hover" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
