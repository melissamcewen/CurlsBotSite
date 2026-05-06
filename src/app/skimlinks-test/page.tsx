import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skimlinks Test | CurlsBot',
  description: 'Internal test page for validating Skimlinks link rewriting.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': 0,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  },
};

export default function SkimlinksTestPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Skimlinks test page</h1>
      <p className="mt-3 text-base-content">
        Use the test link below to verify Skimlinks is loading and processing
        outbound links.
      </p>

      <div className="mt-6 rounded-box border border-base-300 bg-base-100 p-6">
        <a href="http://test.skimlinks.com">Skimlinks Test</a>
      </div>
    </main>
  );
}
