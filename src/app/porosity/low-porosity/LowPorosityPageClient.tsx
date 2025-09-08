'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, ShoppingBag } from 'lucide-react';

export function LowPorosityPageClient() {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Back to Quiz Button */}
      <Link href="/porosity-quiz" className="btn btn-primary gap-2 mb-8">
        <ArrowLeft className="w-5 h-5" />
        Retake Porosity Quiz
      </Link>

      {/* Hero Section */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-2">
              <h1 className="text-4xl font-bold mb-6">
                Your Hair is Low Porosity
              </h1>
              <div className="prose prose-lg max-w-none">

                <p className="text-lg leading-relaxed mb-6">
                  Low porosity hair is healthy hair with a smooth, tightly
                  packed cuticle + a water-repellent oily F-layer that make it
                  harder for water and products to get in. That&apos;s why{' '}
                  <strong>light</strong> products work best. Heavy oils and
                  butters can make low porosity hair look greasy
                  and stringy. Heat can help products like deep conditioners
                  penetrate the hair.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="card bg-base-100">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">
                    Get Your Light Products Guide
                  </h2>
                  <p className="mb-4">
                    We made a guide for finding and using light products!
                    It&apos;s perfect for low porosity hair. Get it delivered to
                    your inbox:
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
          </div>
        </div>
      </div>


      {/* Curls Monthly Banner */}
      <div className="card bg-base-100">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="card-title">Curls Monthly</h3>
              <p>Get all of these products on Curls Monthly</p>
            </div>
            <button className="btn btn-secondary">Get Curls Monthly</button>
          </div>
        </div>
      </div>

      {/* Basic Routine Section */}
      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-8">
            A Basic Low Porosity Routine
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-base-200">
              <div className="card-body">
                <div className="flex gap-4">
                  <figure>
                    <div className="w-24 h-24 bg-base-300 rounded-lg flex items-center justify-center">
                      <span className="text-base-content/50 text-xs">
                        Product Image
                      </span>
                    </div>
                  </figure>
                  <div className="flex-1">
                    <h3 className="card-title text-lg">
                      Odele Clarifying Shampoo
                    </h3>
                    <p className="text-sm font-semibold opacity-60 mb-2">
                      A clarifying shampoo at least once a week
                    </p>
                    <p className="text-sm mb-4">
                      This shampoo helps clean buildup from products and hard
                      water.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="btn btn-primary btn-sm">
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Amazon
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Try on Curls Monthly
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <div className="flex gap-4">
                  <figure>
                    <div className="w-24 h-24 bg-base-300 rounded-lg flex items-center justify-center">
                      <span className="text-base-content/50 text-xs">
                        Product Image
                      </span>
                    </div>
                  </figure>
                  <div className="flex-1">
                    <h3 className="card-title text-lg">
                      Big Energy Shampoo & Conditioner
                    </h3>
                    <p className="text-sm font-semibold opacity-60 mb-2">
                      A light conditioner + a cleansing shampoo
                    </p>
                    <p className="text-sm mb-4">
                      A light conditioner for detangling + a cleansing shampoo
                      for when you&apos;re not clarifying
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="btn btn-primary btn-sm">
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Amazon
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Try on Curls Monthly
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <div className="flex gap-4">
                  <figure>
                    <div className="w-24 h-24 bg-base-300 rounded-lg flex items-center justify-center">
                      <span className="text-base-content/50 text-xs">
                        Product Image
                      </span>
                    </div>
                  </figure>
                  <div className="flex-1">
                    <h3 className="card-title text-lg">XMondo Mousse</h3>
                    <p className="text-sm font-semibold opacity-60 mb-2">
                      Easy to use with flexible hold
                    </p>
                    <p className="text-sm mb-4">
                      This mousse helps pump up your volume without weight.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="btn btn-primary btn-sm">
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Amazon
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Try on Curls Monthly
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <div className="flex gap-4">
                  <figure>
                    <div className="w-24 h-24 bg-base-300 rounded-lg flex items-center justify-center">
                      <span className="text-base-content/50 text-xs">
                        Product Image
                      </span>
                    </div>
                  </figure>
                  <div className="flex-1">
                    <h3 className="card-title text-lg">Eva Mane Magic</h3>
                    <p className="text-sm font-semibold opacity-60 mb-2">
                      A lightweight spray conditioner
                    </p>
                    <p className="text-sm mb-4">
                      Provides UV/heat/frcition protection + useful for
                      refreshing/detangling
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="btn btn-primary btn-sm">
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Amazon
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Try on Curls Monthly
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Cases Section */}
      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-8">
            For coarse and dry-feeling low porosity hair
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-base-200">
              <figure className="px-6 pt-6">
                <div className="w-full h-48 bg-base-300 rounded-lg flex items-center justify-center">
                  <span className="text-base-content/50">
                    Mask + Heat Cap Image
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">Rahua Mask</h3>
                <p className="mb-4">
                  <strong>A deep conditioner</strong> helps soften hair but will
                  work best with heat, try it with a{' '}
                  <a
                    href="https://www.amazon.com/dp/B000J3J2AK"
                    target="_blank"
                  >
                    heat cap
                  </a>
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Buy Mask
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Try on Curls Monthly
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <figure className="px-6 pt-6">
                <div className="w-full h-48 bg-base-300 rounded-lg flex items-center justify-center">
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
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Amazon
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Try on Curls Monthly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For More Hold Section */}
      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-8">For More Hold</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-200">
              <figure className="px-6 pt-6">
                <div className="w-full h-32 bg-base-300 rounded-lg flex items-center justify-center">
                  <span className="text-base-content/50">Gel Image</span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg">
                  For Wavy Hair and Loose Curls
                </h3>
                <p className="text-sm mb-4">
                  CurlKeeper Liquid Styler is a perfect gel for wavy hair and
                  loose curls that you don&apos;t want to weigh down
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Amazon
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Try on Curls Monthly
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <figure className="px-6 pt-6">
                <div className="w-full h-32 bg-base-300 rounded-lg flex items-center justify-center">
                  <span className="text-base-content/50">
                    Regular Gel Image
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg">For Curly Hair</h3>
                <p className="text-sm mb-4">
                  A regular gel like XYZ provides hold and prevents frizz
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Amazon
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Try on Curls Monthly
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <figure className="px-6 pt-6">
                <div className="w-full h-32 bg-base-300 rounded-lg flex items-center justify-center">
                  <span className="text-base-content/50">Custard Image</span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg">
                  For Very Curly/Coil/Kinky
                </h3>
                <p className="text-sm mb-4">
                  A thick gel like a custard can elongate tighter patterns
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Amazon
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Try on Curls Monthly
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-200">
              <figure className="px-6 pt-6">
                <div className="w-full h-32 bg-base-300 rounded-lg flex items-center justify-center">
                  <span className="text-base-content/50">Serum Image</span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg">For Finishing</h3>
                <p className="text-sm mb-4">
                  Use just a little of a light oil/serum to scrunch out the
                  crunch from gel when your hair is dry
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Amazon
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Try on Curls Monthly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="card bg-base-200">
        <div className="card-body text-center">
          <p className="flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4 shrink-0" />
            Product links are affiliate links that help support the site
          </p>
        </div>
      </div>
    </div>
  );
}
