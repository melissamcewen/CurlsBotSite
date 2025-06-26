import { Info } from 'lucide-react';
import Link from 'next/link';
import { createPageMetadata } from '@/config/metadata';
import Image from 'next/image';
export const metadata = createPageMetadata({
  title: 'CurlsBot for Brands',
  description:
    'CurlsBot can help you get more customers by educating them about hair care ingredients.',
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
              Are you a hair care brand? We&apos;d love to add your products to
              CurlsBot!
            </p>
            <ul className="list-disc list-inside">
              <li>
                Full ingredient audit to make sure all your products are
                analyzed correctly by CurlsBot
              </li>
              <li>
                Addition to our database of products that is used for
                recommendations across the site
              </li>
            </ul>
            <Link
              href="mailto:info@curlsbot.com"
              className="btn btn-primary mt-5"
            >
              Email Us
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
            <h2 className="text-5xl font-bold mb-8">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
              {/* Affiliate Program */}
              <div className="card bg-base-100">
                <div className="card-body">
                  <h3 className="card-title">Affiliate Partners</h3>
                  <div className="text-3xl font-bold my-4">Free</div>
                  <div className="space-y-2">
                    <p>For brands with active affiliate programs</p>
                    <ul className="text-left space-y-2">
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" /> Basic
                        ingredient audit
                      </li>
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" /> Database
                        inclusion
                      </li>
                    </ul>
                  </div>
                  <div className="card-actions mt-auto justify-end">
                    <Link
                      href="mailto:info@curlsbot.com"
                      className="btn btn-primary mt-4"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Basic Tier */}
              <div className="card bg-base-100">
                <div className="card-body">
                  <h3 className="card-title">Basic</h3>
                  <div className="text-3xl font-bold my-4">$99/month</div>
                  <div className="space-y-2">
                    <ul className="text-left space-y-2">

                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" /> Everything in Affiliate Partners
                      </li>
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" />
                        Custom product descriptions
                      </li>
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" />
                        Monthly analytics report
                      </li>
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" /> Monthly
                        brand newsletter with trends and insights
                      </li>

                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" />
                        Twice yearly feature on our newsletter and homepage
                      </li>
                    </ul>
                  </div>
                  <div className="card-actions mt-auto justify-end">
                    <Link
                      href="mailto:info@curlsbot.com"
                      className="btn btn-primary mt-4"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              {/* Premium Tier */}
              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h3 className="card-title">Premium</h3>
                  <div className="text-3xl font-bold my-4">$5000/year</div>
                  <div className="space-y-2">
                    <ul className="text-left space-y-2">
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" />{' '}
                        Everything in Basic
                      </li>
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" /> Featured
                        placement on homepage
                      </li>
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" />
                        Monthly feature on our newsletter and social media
                      </li>
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" /> Priority
                        support
                      </li>
                      <li className="flex items-center">
                        <Info className="w-4 h-4 mr-2 shrink-0" /> Advanced
                        analytics
                      </li>
                    </ul>
                  </div>
                  <div className="card-actions mt-auto justify-end">
                    <Link
                      href="mailto:info@curlsbot.com"
                      className="btn btn-secondary"
                    >
                      Get Started
                    </Link>
                  </div>
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
            <h2 className="text-5xl font-bold">Other Services</h2>
            <p className="py-6">
              As a web developer and MarTech (marketing technology)
              professional, I can help your brand with
            </p>
            <ul className="list-disc list-inside">
              <li>SEO (search engine optimization)</li>
              <li>
                Software development including access to our API, custom APIs,
                custom quizzes and ingredient checkers
              </li>
              <li>Reddit and other social media marketing</li>
              <li>Website performance optimization</li>

              <li>Content marketing</li>
              <li>Content management</li>
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
