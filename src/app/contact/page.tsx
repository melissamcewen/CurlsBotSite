import { EnvelopeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact CurlsBot | Get Help with Hair Care Analysis',
  description:
    'Get in touch with CurlsBot for help with hair care ingredient analysis, join our social media communities, or contribute to our open source project.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | CurlsBot',
    description:
      'Get in touch with the CurlsBot team. We would love to hear from you!',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Contact CurlsBot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact CurlsBot | Get Help with Hair Care Analysis',
    description:
      'Get in touch with CurlsBot for help with hair care ingredient analysis, join our social media communities, or contribute to our open source project.',
    images: ['/images/og-default.png'],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-6">
            <EnvelopeIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Contact Us</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Have questions about your hair care journey? Want to report an
              ingredient analysis issue? We&apos;re here to help! Here are the
              best ways to reach us:
            </p>

            <h2>Email</h2>
            <p>
              You can reach me directly at:{' '}
              <a href="mailto:info@curlsbot.com" className="link link-primary">
                info@curlsbot.com
              </a>
            </p>

            <h2>Social Media</h2>
            <p>Follow us and join the conversation:</p>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/groups/1804576666517325"
                  className="link link-primary"
                >
                  Facebook
                </a>{' '}
                - Join our community discussions
              </li>
              <li>
                <a
                  href="https://www.instagram.com/curlsbot"
                  className="link link-primary"
                >
                  Instagram
                </a>{' '}
                - See hair care tips and product reviews
              </li>
              <li>
                <a
                  href="https://www.reddit.com/r/curlsbot/"
                  className="link link-primary"
                >
                  Reddit
                </a>{' '}
                - Participate in detailed hair care discussions
              </li>
              <li>
                <a
                  href="https://discord.gg/3AkQqkADv9"
                  className="link link-primary"
                >
                  Discord
                </a>{' '}
                - Chat with other curly hair enthusiasts
              </li>
            </ul>

            <h2>Open Source</h2>
            <p>
              CurlsBot is open source! If you&apos;re a developer and want to
              contribute:
            </p>
            <ul>
              <li>
                <a
                  href="https://github.com/melissamcewen/CurlsBotAPI"
                  className="link link-primary"
                >
                  Visit our GitHub repository
                </a>
              </li>
            </ul>

            <h2>Business Inquiries</h2>
            <p>
              For business-related questions, sponsorship opportunities, or
              other inquiries, please reach out through any of our social media
              channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
