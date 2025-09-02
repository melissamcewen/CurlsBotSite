import { CurlyTechniquesForm } from '@/components/CurlyTechniquesForm';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/config/metadata';
export const metadata = createPageMetadata({
  title: 'Hair Care Ingredients Cheat Sheet',
  description:
    'The CurlsBot Mini Guide to Light Products',
  path: '/light-products-mini-guide',
  image: '/images/light-products-mini-guide.png'
});
export default function CurlyTechniquesDictionaryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            The CurlsBot Mini Guide to Light Products
          </h1>
          <p className="text-lg text-base-content/80 text-left">
            Does your hair feel weighed down? Look greasy? Are your curls or
            waves limp and mushy? You might need light products! Our guide will tell you how to find them anywhere, as well as how to use them effectively! It&apos;s formatted for easy reading on mobile phones so you can take it with you to the store.
          </p>
        </div>

        <div className="w-full mb-8">
          <Image
            src="/images/light-products-mini-guide.png"
            alt="The CurlsBot Mini Guide to Light Products Preview"
            width={1200}
            height={600}
            className="mx-auto h-auto rounded-box"
            priority
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What&apos;s Inside:</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>2 useful cheatsheets for shopping at any store</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>10+ common light products to try</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>2 sample light routines</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>dozens of tips and tricks for using light products!</span>
              </li>
            </ul>
          </div>

          <div className="bg-base-100 rounded-box p-6">
            <CurlyTechniquesForm />
            <div className="text-center text-sm">
              If don&apos;t want to subscribe, you can download the guide{' '}
              <a
                href="/downloads/curls-bot-mini-guide-light-products.pdf"
                target="_blank"
                className="link link-secondary link-hover"
              >
                here
              </a>
              .
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/normal.svg"
                alt="CurlsBot"
                width={400}
                height={400}
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold">
                Created by the team (ok the one women) behind CurlsBot.com
              </h2>
              <p className="text-base-content/80">
                You may know CurlsBot from my{' '}
                <Link href="/analyzer" className="link link-primary link-hover">
                  hair ingredient analyzer
                </Link>{' '}
                and{' '}
                <Link
                  href="/porosity-quiz"
                  className="link link-secondary link-hover"
                >
                  porosity quiz
                </Link>
                , helping people understand and find great products since 2017.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
