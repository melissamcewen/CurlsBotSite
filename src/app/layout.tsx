import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-screen bg-base-300">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <header className="navbar bg-accent/90 text-accent-content shadow-lg backdrop-blur-sm sticky top-0 z-50">
            <div className="navbar-start">
              <Link href="/" className="btn btn-ghost normal-case text-xl">
                CurlsBot
              </Link>
            </div>
            <div className="navbar-center">
              <Link href="/ingredients" className="btn btn-ghost normal-case">
                Ingredients
              </Link>
              <Link href="/categories" className="btn btn-ghost normal-case">
                Categories
              </Link>
            </div>
            <div className="navbar-end">
              <ThemeToggle />
            </div>
          </header>
          <main className="container mx-auto px-4 py-8 relative">
            <div className="prose prose-lg mx-auto mb-8">
              <h1 className="text-4xl font-bold text-center text-primary">
                CurlsBot
              </h1>
              <p className="text-center text-base-content/80">
                Your intelligent assistant for analyzing hair care ingredients
              </p>
            </div>
            <div className="relative">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
