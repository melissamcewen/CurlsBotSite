'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, ShoppingBag, ExternalLink } from 'lucide-react';
import PorosityEmailSignup from '@/components/PorosityEmailSignup';

export function LowPorosityPageClient() {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      {/* Back to Quiz Button */}
      <Link href="/porosity-quiz" className="btn btn-primary gap-2 mb-8">
        <ArrowLeft className="w-5 h-5" />
        Retake Porosity Quiz
      </Link>
      <div className="md:grid md:grid-cols-3 gap-12">
        {/* Comparison Section */}
        <div className="md:col-span-2">
          <h1 className="text-xl font-bold text-center mb-2">
            Your Porosity: Low Porosity
          </h1>

          <ul className="list bg-base-100 rounded-box max-w-4xl mx-auto ">
            <li className="list-row bg-primary/10 border-l-4 border-primary p-8 min-h-[120px]">
              <div className="w-24 h-24 bg-primary/20 rounded-box flex items-center justify-center">
                <span className="text-primary text-sm text-center font-semibold">
                  Low Porosity Cuticle
                </span>
              </div>
              <div className="flex-1">
                <div className="font-bold text-xl flex items-center gap-3 mb-2">
                  <span className="badge badge-primary badge-lg">
                    Your Hair
                  </span>
                  Low Porosity
                </div>
                <div className="text-lg opacity-70">
                  Low porosity hair is healthy hair with a smooth, tightly
                  packed cuticle + a water-repellent oily F-layer that make it
                  harder for water and products to get in. That&apos;s why{' '}
                  <strong>light</strong> products work best — heavy oils and
                  butters tend to just sit on top and can make hair look greasy
                  and stringy. Heat can help products like deep conditioners
                  penetrate the hair.
                </div>
              </div>
            </li>

            <li className="list-row">
              <div className="w-16 h-16 bg-base-200 rounded-box flex items-center justify-center">
                <span className="text-base-content/50 text-xs text-center">
                  High Porosity Cuticle
                </span>
              </div>
              <div>
                <div className="font-semibold">
                  <Link
                    href="/porosity/high-porosity"
                    className="link link-primary"
                  >
                    High Porosity
                  </Link>
                </div>
                <div className="text-sm opacity-70">
                  The cuticles of high porosity hair are broken and the oily
                  f-layer is stripped off.
                </div>
              </div>
            </li>

            <li className="list-row">
              <div className="w-16 h-16 bg-base-200 rounded-box flex items-center justify-center">
                <span className="text-base-content/50 text-xs text-center">
                  Mixed Porosity Hair
                </span>
              </div>
              <div>
                <div className="font-semibold">
                  <Link
                    href="/porosity/mixed-porosity"
                    className="link link-primary"
                  >
                    Mixed Porosity
                  </Link>
                </div>
                <div className="text-sm opacity-70">
                  This is hair with low porosity roots and high porosity ends
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="card bg-base-100">
          <figure className="">
            <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center">
              <span className="text-base-content/50">Book Image</span>
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              Get Your Light Products Guide
            </h2>
            <p className="mb-4">
              We made a guide for finding and using light products! It&apos;s
              perfect for low porosity hair. Get it delivered to your inbox:
            </p>
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* banner to promote Curls Monthly */}{' '}
      <div role="alert" className="alert alert-vertical sm:alert-horizontal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">Curls Monthly</h3>
          <div className="text-xs">Get all of these products on Curls Monthly</div>
        </div>
        <button className="btn btn-sm">Get Curls Monthly</button>
      </div>
      <div className="md:grid md:grid-cols-2 gap-12">
        <ul className="list bg-base-100 rounded-box ">
          <li className="p-4 pb-2 text-xl tracking-wide">
            A Basic Low Porosity Routine
          </li>

          <li className="list-row">
            <div>
              {/* image placeholder */}
              <div className="w-24 h-24 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">ProductImage</span>
              </div>
            </div>
            <div>
              <div>Odele Clarifying Shampoo</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                A clarifying shampoo at least once a week
              </div>
              <p className="list-col-wrap text-xs">
                This shampoo helps clean buildup from products and hard water.
              </p>
            </div>
            {/*buy on amazon button */}
            <button className="btn btn-sm btn-primary">
              <ShoppingBag className="w-4 h-4 mr-1" />
              Amazon
            </button>
          </li>
          <li className="list-row">
            <div>
              {/* image placeholder */}
              <div className="w-24 h-24 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">ProductImage</span>
              </div>
            </div>
            <div>
              <div>Big Energy Shampoo & Conditioner</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                A light conditioner + a cleansing shampoo
              </div>
              <p className="list-col-wrap text-xs">
                This duo provides cleansing and lightweight conditioning.
              </p>
            </div>
            {/*buy on amazon button */}
            <button className="btn btn-sm btn-primary">
              <ShoppingBag className="w-4 h-4 mr-1" />
              Amazon
            </button>
          </li>
          <li className="list-row">
            <div>
              {/* image placeholder */}
              <div className="w-24 h-24 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">ProductImage</span>
              </div>
            </div>
            <div>
              <div>XMondo Mousse</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                Provides definition without weight
              </div>
              <p className="list-col-wrap text-xs">
                This mousse helps pump up your volume without weight
              </p>
            </div>
            {/*buy on amazon button */}
            <button className="btn btn-sm btn-primary">
              <ShoppingBag className="w-4 h-4 mr-1" />
              Amazon
            </button>
          </li>
          <li className="list-row">
            <div>
              {/* image placeholder */}
              <div className="w-24 h-24 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">ProductImage</span>
              </div>
            </div>
            <div>
              <div>Eva Mane Magic</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                A lightweight spray conditioner
              </div>
              <p className="list-col-wrap text-xs">
                This spray conditioner is perfect for lightweight protection, as
                well as refreshing
              </p>
            </div>
            {/*buy on amazon button */}
            <button className="btn btn-sm btn-primary">
              <ShoppingBag className="w-4 h-4 mr-1" />
              Amazon
            </button>
          </li>
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            You can get all of these products on Curls Monthly
          </li>
        </ul>
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">
            For coarse and dry-feeling low porosity hair
          </h2>
          <div className="flex flex-col gap-6">
            <div className="card md:card-side bg-base-100 ">
              <figure className="px-6 pt-6">
                <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center">
                  <span className="text-base-content/50">
                    Mask + Heat Cap Image
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">Rahua Mask</h3>
                <p className="mb-4">
                  <strong>A deep conditioner</strong> helps soften hair but will
                  work best with heat
                </p>
                <div className="flex gap-2">
                  <button className="btn btn-primary">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Buy Mask
                  </button>
                  <button className="btn btn-outline">
                    Try on Curls Monthly
                  </button>
                </div>
              </div>
            </div>

            <div className="card md:card-side bg-base-100 ">
              <figure className="px-6 pt-6">
                <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center">
                  <span className="text-base-content/50">
                    Cream Product Image
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">Curl Wow Flo-etry</h3>
                <p className="mb-4">
                  Most creams are too heavy for low porosity hair, but Curl Wow
                  Flo-etry is a cream formulated not to weigh low porosity hair
                  down.
                </p>
                <div className="flex gap-2">
                  <button className="btn btn-primary">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Buy on Amazon
                  </button>
                  <button className="btn btn-outline">
                    Try on Curls Monthly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* For More Hold Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8">For More Hold</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100">
            <figure className="px-6 pt-6">
              <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">Gel Image</span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">
                For Wavy Hair and Loose Curls
              </h3>
              <p className="text-sm mb-4">
                CurlKeeper Liquid Styler is a perfect gel for wavy hair and
                loose curls that you don't want to weigh down
              </p>
              <button className="btn btn-primary btn-sm">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Now
              </button>
            </div>
          </div>

          <div className="card bg-base-100">
            <figure className="px-6 pt-6">
              <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">Regular Gel Image</span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">For Curly Hair</h3>
              <p className="text-sm mb-4">
                A regular gel like XYZ provides hold and prevents frizz
              </p>
              <button className="btn btn-primary btn-sm">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Now
              </button>
            </div>
          </div>

          <div className="card bg-base-100">
            <figure className="px-6 pt-6">
              <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">Custard Image</span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">For Very Curly/Coil/Kinky</h3>
              <p className="text-sm mb-4">
                A thick gel like a custard can elongate tighter patterns
              </p>
              <button className="btn btn-primary btn-sm">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Now
              </button>
            </div>
          </div>

          <div className="card bg-base-100">
            <figure className="px-6 pt-6">
              <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">Serum Image</span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">For Finishing</h3>
              <p className="text-sm mb-4">
                Use just a little of a light oil/serum to scrunch out the crunch
                from gel when your hair is dry
              </p>
              <button className="btn btn-primary btn-sm">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Note */}
      <div className="text-center text-base-content/70 text-sm">
        <p className="flex items-center justify-center gap-2">
          <ShoppingBag className="w-4 h-4 shrink-0" />
          Product links are affiliate links that help support the site
        </p>
      </div>
    </div>
  );
}
