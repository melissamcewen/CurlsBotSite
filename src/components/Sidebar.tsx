'use client';

import {
  FileText,
  FlaskConical,
  Sparkles,
  ShoppingBag,
  Mail,
  Newspaper,
  BookOpen,
  Mailbox,
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const ingredients =
    'flaxseed extract, agave nectar extract, pectin, aloe vera juice, marshmallow root extract, vitamin e, xanthan gum, optiphen plus, sweet orange essential oil';

  return (
    <div className="flex flex-col gap-4 sm:flex-row md:flex-col p-2">
      <div className="card card-compact border-primary border-2 bg-base-100">
        <div className="card-body ">
          <h2 className="card-title flex">
            <Sparkles className="w-6 h-6" />
            Welcome to CurlsBot
          </h2>
          <div className="space-y-2">
            <div className="flex gap-2">
              <FileText className="w-5 h-5 flex-shrink-0 mt-1" />
              <p>
                CurlsBot is a tool to help you understand the ingredients in
                your curly/wavy hair care products.
              </p>
            </div>
            <div className="flex gap-2">
              <FlaskConical className="w-5 h-5 flex-shrink-0 mt-1" />
              <p>
                For example{' '}
                <a
                  href={`/?ingredients=${encodeURIComponent(ingredients)}`}
                  className="link"
                >
                  click here to see an analysis
                </a>{' '}
                of one of our favorite products,{' '}
                <a
                  href="https://ecoslay.com/collections/stylers/products/orange-marmalade"
                  className="link"
                  target="_blank"
                  rel="noopener"
                >
                  Ecoslay Orange Marmalade
                </a>
                .
              </p>
            </div>

            <div className="flex gap-2">
              <ShoppingBag className="w-5 h-5 flex-shrink-0 mt-1" />
              <p className="opacity-75">
                P.S. that and other product links are affiliate links, so we get
                a small commission if you buy it, which helps us keep the site
                running.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
