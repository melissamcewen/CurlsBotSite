import { Shield } from 'lucide-react';
import { createPageMetadata } from '@/config/metadata';

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'Learn about how we protect your privacy and handle your data at CurlsBot.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>

            <h2>Overview</h2>
            <p>
              CurlsBot is committed to protecting your privacy. This policy
              explains how we handle your data when you use our ingredient
              analysis tools and website features.
            </p>

            <h2>Information We Collect</h2>
            <h3>Ingredient Lists</h3>
            <p>
              When you use our ingredient analyzer, we process the ingredient
              lists you provide. This processing happens entirely in your
              browser - we don&apos;t store or transmit your ingredient lists to
              any server.
            </p>

            <h3>Analytics</h3>
            <p>
              We use Google Analytics to understand how visitors use our site.
              This includes:
            </p>
            <ul>
              <li>Pages visited</li>
              <li>Time spent on site</li>
              <li>Browser and device information</li>
              <li>Approximate geographic location (country/region level)</li>
            </ul>
            <p>
              Google Analytics is a web analytics service offered by Google that
              tracks and reports website traffic. Google may use the collected
              data to contextualize and personalize the ads of its own
              advertising network. For more information on the privacy practices
              of Google, please visit the Google Privacy Policy:{' '}
              <a
                href="https://policies.google.com/privacy"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
            </p>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To improve our website and services</li>
              <li>To analyze site usage patterns</li>
            </ul>

            <h2>Affiliate Links</h2>
            <p>
              Our product recommendations include affiliate links (primarily
              Amazon Associates). When you click these links, we may earn a
              commission from qualifying purchases. This doesn&apos;t affect the
              price you pay.
            </p>

            <h2>Advertising</h2>
            <p>
              This Site is affiliated with CMI Marketing, Inc., d/b/a Raptive
              (&quot;Raptive&quot;) for the purposes of placing advertising on
              the Site, and Raptive will collect and use certain data for
              advertising purposes. To learn more about Raptive&apos;s data
              usage, click here:{' '}
              <a
                href="https://www.raptive.com/publisher-advertising-privacy-policy"
                className="link link-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.raptive.com/publisher-advertising-privacy-policy
              </a>
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of analytics tracking</li>
              <li>Request information about our data practices</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li>Google Analytics for site analytics</li>
              <li>Amazon Associates for product recommendations</li>
              <li>Vercel for website hosting</li>
            </ul>

            <h2>Data Security</h2>
            <p>We prioritize the security of your data by:</p>
            <ul>
              <li>Processing ingredient analysis locally in your browser</li>
              <li>Using secure HTTPS connections</li>
              <li>Regularly updating our security practices</li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data
              practices, please{' '}
              <a href="/contact" className="link link-primary">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
