import React from 'react';
import { Scale } from 'lucide-react';
import { createPageMetadata } from '@/config/metadata';

export const metadata = createPageMetadata({
  title: 'Terms of Service',
  description:
    "Read our terms of service to understand how to use CurlsBot's hair care analysis tools and website features.",
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Terms of Service</h1>
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

            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using CurlsBot, you agree to be bound by these
              Terms of Service. If you disagree with any part of these terms,
              you may not access the service.
            </p>

            <h2>Use of Service</h2>
            <p>
              CurlsBot provides ingredient analysis tools and educational
              content about hair care. Our services are provided &quot;as
              is&quot; and &quot;as available&quot; without warranties of any
              kind.
            </p>

            <h2>Disclaimer</h2>
            <p>
              The information provided by CurlsBot is for general informational
              purposes only. We are not licensed professionals, and our
              ingredient analysis should not be considered professional advice.
              Always consult with a qualified professional for specific hair
              care recommendations.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The content, features, and functionality of CurlsBot are owned by
              CurlsBot and are protected by international copyright, trademark,
              and other intellectual property laws.
            </p>

            <h2>User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Scrape or collect data without permission</li>
              <li>Impersonate others or provide false information</li>
            </ul>

            <h2>Third-Party Links</h2>
            <p>
              Our service may contain links to third-party websites or services
              that are not owned or controlled by CurlsBot. We have no control
              over and assume no responsibility for the content, privacy
              policies, or practices of any third-party websites or services.
            </p>

            <h2>Affiliate Links</h2>
            <p>
              We participate in affiliate programs, including Amazon Associates.
              When you click on affiliate links and make purchases, we may earn
              a commission. This does not affect the price you pay for products.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall CurlsBot be liable for any indirect, incidental,
              special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these terms at any time.
              If a revision is material, we will try to provide at least 30
              days&apos; notice prior to any new terms taking effect.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of the United States, without regard to its conflict of
              law provisions.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please{' '}
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
