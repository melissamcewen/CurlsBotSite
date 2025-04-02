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

      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-5xl font-bold">Sponsor Us</h1>
            <ul className="list-disc list-inside py-6">
              <li>Get featured on our homepage and in our newsletter</li>
            </ul>

            <Link
              href="mailto:info@curlsbot.com"
              className="btn btn-primary mt-5"
            >
              Email Us For Info
            </Link>
          </div>
          <Image
            src="/bottles.svg"
            alt="CurlsBot"
            width={500}
            height={500}
            className="p-10"
          />
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
              As a web developer and MarTech (marketing technology) professional, I can help your brand with
            </p>
            <ul className="list-disc list-inside">
              <li>
                SEO (search engine optimization)
              </li>
              <li>
                Software development including custom quizzes and ingredient checkers
              </li>
              <li>
                Reddit and other social media marketing
              </li>
              <li>
                Website performance optimization
              </li>

              <li>
                Content marketing
              </li>
              <li>
                Content management
              </li>



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
