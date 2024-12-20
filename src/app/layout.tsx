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
        <div className="min-h-screen bg-base-300 overflow-x-hidden">
          <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
          <Navbar />
          <div className="pt-0 md:py-8 px-0 md:px-8">
            <main className="max-w-[90rem] mx-auto bg-base-100 text-base-content rounded-none md:rounded-lg">
              <div className="p-4 md:p-8">{children}</div>
            </main>
          </div>

          <footer className="footer bg-base-200 text-base-content p-10">
            <aside>
              <h2 className="text-xl font-bold">CurlsBot</h2>
              <p className="text-sm opacity-80">
                Your hair care ingredient analyzer since 2016
              </p>
              <div className="mt-4 grid grid-flow-col gap-4">
                <a
                  href="https://twitter.com/curlsbot"
                  className="hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="https://github.com/melissamcewen/CurlsBotSite"
                  className="hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </aside>
            <div className="bg-base-100 rounded-box p-6 space-y-4 max-w-sm">
              <h2 className="text-lg font-bold text-base-content">
                Join the CurlsBot Community! 💌
              </h2>
              <p className="text-sm text-base-content/80">
                Get hair care tips, product recommendations, and ingredient
                alerts delivered to your inbox.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered flex-1"
                />
                <button className="btn btn-primary">Subscribe</button>
              </form>
            </div>
            <nav>
  
              <Link href="/about" className="link link-hover">
                About
              </Link>
              <Link href="/privacy" className="link link-hover">
                Privacy
              </Link>
              <Link href="/terms" className="link link-hover">
                Terms
              </Link>
            </nav>
          </footer>

          {/* Copyright and Disclaimer */}
          <div className="bg-base-300 py-6 px-4">
            <div className="max-w-[90rem] mx-auto space-y-4">
              <div className="text-sm text-base-content/60 text-center">
                © {new Date().getFullYear()} CurlsBot. All rights reserved.
              </div>
              <p className="text-xs text-base-content/60 text-center max-w-3xl mx-auto">
                Disclaimer: We&apos;re here to have fun and learn about haircare
                ingredients! 🧪 While our tool can provide some basic insights,
                it&apos;s not a substitute for professional advice. Always
                consult with a hair care expert for personalized
                recommendations, especially if you have specific hair concerns
                or allergies. This web site is not endorsed by, directly
                affiliated with, maintained, authorized, or sponsored by The
                Curly Girl Method by Lorraine Massey™️. Some links on Curlsbot
                are Affiliate links. Shopping through these links supports the
                further development of Curlsbot.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
