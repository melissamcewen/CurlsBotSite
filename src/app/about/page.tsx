import { Info } from 'lucide-react';
import Link from 'next/link';
import { createPageMetadata } from '@/config/metadata';
import Image from 'next/image';
export const metadata = createPageMetadata({
  title: 'About CurlsBot',
  description:
    'Learn about CurlsBot, our mission, and how we help people understand hair care ingredients.',
  path: '/about',
});

export default function About() {
  return (
    <div className="">
      <div className=" hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image src="/normal.svg" alt="CurlsBot" width={500} height={500} />

          <div>
            <h2 className="text-5xl font-bold">
              CurlsBot is the #1 Hair Ingredients Checker
            </h2>
            <p className="py-6">
              Powdered by our science-backed database to educate people about
              how their hair products work and help them find the best products
              for their hair.
            </p>
            <Link href="/faq" className="btn btn-primary">
              View FAQ
            </Link>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="">
            <h2 className="text-5xl font-bold">
              Over 30,000 CurlFriends a Month
            </h2>
            <div className="mt-8 stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Europe</div>
                <div className="stat-value">47%</div>
              </div>
              <div className="stat">
                <div className="stat-title">North America</div>
                <div className="stat-value">32%</div>
              </div>
              <div className="stat">
                <div className="stat-title">Asia</div>
                <div className="stat-value">11%</div>
              </div>
              <div className="stat">
                <div className="stat-title">Oceania</div>
                <div className="stat-value">6%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <Image src="/surprised.svg" alt="CurlsBot" width={500} height={500} />
          <div>
            <h1 className="text-5xl font-bold">Porosity Quiz</h1>
            <p className="py-6">
              Our porosity quiz is the #1 way to find your hair porosity and
              products that work best for it
            </p>
            <a href="/porosity-quiz" className="btn btn-primary">
              Take the Quiz
            </a>
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
            <h2 className="text-5xl font-bold">
              Made with ❤️ by a Curly Girl
            </h2>
            <p className="py-6">
              I&apos;m Melissa McEwen, I have{' '}
              <Link href="/porosity-quiz" className="link link-primary">
                low porosity
              </Link>{' '}
              hair that&apos;s pretty curly when short and more wavy when long.
              I have a background in science (specifically agricultural/food
              science) and over 15 years experience in software. I&apos;ve been inerested in the science of hair and skin
              care since I read my mother&apos;s Paula Begoun books in the 90s.
              I established an LLC for my sites in 2024, MGM Internet and AI
              Holdings LLC, headquartered in Florida.
            </p>
            <a
              href="https://www.linkedin.com/in/mcewenmelissa/"
              className="btn btn-primary"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
