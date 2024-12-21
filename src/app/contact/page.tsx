import { EnvelopeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

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
              <a href="mailto:mgmcewen@gmail.com" className="link link-primary">
                mgmcewen@gmail.com
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
              <li>
                <a
                  href="https://twitter.com/curlsbot"
                  className="link link-primary"
                >
                  Twitter
                </a>{' '}
                - Get the latest updates
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
