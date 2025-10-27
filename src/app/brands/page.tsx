import { Info } from 'lucide-react';
import Link from 'next/link';
import { createPageMetadata } from '@/config/metadata';
import Image from 'next/image';
export const metadata = createPageMetadata({
  title: 'CurlsBot for Brands',
  description:
    'Learn about CurlsBot and how to get your brand listed through our trusted partners.',
  path: '/brands',
});

export default function About() {
  return (
    <div className="">
      <div className=" hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image src="/normal.svg" alt="CurlsBot" width={500} height={500} />

          <div>
            <h2 className="text-5xl font-bold">CurlsBot for Brands</h2>
            <p className="py-6">
              While I don&apos;t work with brands individually, CurlsBot
              continues to help hair care brands reach our engaged community
              through our trusted partners.
            </p>
            <div className="alert bg-base-200 mb-6">
              <Info className="w-6 h-6" />
              <div>
                <h3 className="font-bold">Want to get your brand listed?</h3>
                <p>
                  Work with one of our trusted partners like{' '}
                  <a
                    href="https://curlsmonthly.com/"
                    className="link link-primary"
                  >
                    Curls Monthly
                  </a>{' '}
                  to get your products featured on CurlsBot!
                </p>
                <p className="mt-2 text-sm">
                  <strong>Note:</strong> If you&apos;re already on Curls Monthly but
                  not listed on CurlsBot, it&apos;s likely because I was unable to
                  join your affiliate program or your products aren&apos;t available
                  on common retailers like Amazon, Ulta, or Sephora.
                </p>
              </div>
            </div>
            <ul className="list-disc list-inside">
              <li>
                Full ingredient audit to ensure all your products are analyzed
                correctly by CurlsBot
              </li>
              <li>
                Addition to our database of products used for recommendations
                across the site
              </li>
              <li>
                Access to our engaged community of 37,000+ monthly visitors
              </li>
            </ul>
            <Link
              href="https://curlsmonthly.com/"
              className="btn btn-primary mt-5"
            >
              Visit Curls Monthly
            </Link>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-5xl font-bold mb-8">Why CurlsBot?</h2>

            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Monthly Visitors</div>
                <div className="stat-value">37,000+</div>
                <div className="stat-desc">Engaged CurlFriends</div>
              </div>

              <div className="stat">
                <div className="stat-title">Porosity Quiz</div>
                <div className="stat-value">#1</div>
                <div className="stat-desc">on Google</div>
              </div>
              <div className="stat">
                <div className="stat-title">Curly Ingredients Checker</div>
                <div className="stat-value">#1</div>
                <div className="stat-desc">on Google</div>
              </div>
              <div className="stat">
                <div className="stat-title">Mailing list</div>
                <div className="stat-value">400+</div>
                <div className="stat-desc">subscribers</div>
              </div>
              <div className="stat">
                <div className="stat-title">Top Markets</div>
                <div className="stat-value">EU & NA</div>
                <div className="stat-desc">79% of Traffic</div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto mt-8">
              <p className="text-lg">
                Connect with our engaged community of hair care enthusiasts who
                trust CurlsBot to make informed product decisions. Our users are
                actively searching for their next favorite hair care products!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-5xl font-bold mb-8">Partner with Us</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg mb-8">
                While I no longer offer direct brand partnerships, CurlsBot
                continues to help hair care brands through our trusted partners.
                These partners can help you get your products featured and reach
                our engaged community.
              </p>

              <div className="card bg-base-100 max-w-2xl mx-auto">
                <div className="card-body text-center">
                  <h3 className="card-title text-2xl mb-4">
                    Work with Curls Monthly
                  </h3>
                  <p className="mb-6">
                    Our primary partner, Curls Monthly, can help you get your
                    brand listed on CurlsBot and reach our community of hair
                    care enthusiasts.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-center">
                      <Info className="w-5 h-5 mr-2" />
                      <span>Product listing and ingredient analysis</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Info className="w-5 h-5 mr-2" />
                      <span>Access to our engaged community</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Info className="w-5 h-5 mr-2" />
                      <span>Professional brand representation</span>
                    </div>
                  </div>
                  <Link
                    href="https://curlsmonthly.com/"
                    className="btn btn-primary btn-lg"
                  >
                    Visit Curls Monthly
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            src="/headshot.jpg"
            alt="Melissa"
            width={500}
            height={666.5}
            className="max-w-md rounded-lg shadow-2xl"
          />

          <div>
            <h2 className="text-5xl font-bold">About CurlsBot</h2>
            <p className="py-6">
              CurlsBot is a comprehensive hair care ingredient analyzer and
              product recommendation platform. While I no longer work with
              brands directly, the platform continues to serve our community
              through trusted partnerships.
            </p>
            <div className="alert alert-warning mb-6">
              <Info className="w-6 h-6" />
              <div>
                <h3 className="font-bold">For Brand Partnerships</h3>
                <p>
                  Please work with our trusted partners like{' '}
                  <a
                    href="https://curlsmonthly.com/"
                    className="link link-primary"
                  >
                    Curls Monthly
                  </a>{' '}
                  to get your products featured on CurlsBot.
                </p>
              </div>
            </div>
            <ul className="list-disc list-inside">
              <li>Advanced ingredient analysis and safety checking</li>
              <li>Hair type and porosity assessment tools</li>
              <li>Personalized product recommendations</li>
              <li>Educational content about hair care ingredients</li>
              <li>Community-driven product reviews and insights</li>
            </ul>
            <a
              href="https://www.linkedin.com/in/mcewenmelissa/"
              className="btn btn-primary mt-5"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
