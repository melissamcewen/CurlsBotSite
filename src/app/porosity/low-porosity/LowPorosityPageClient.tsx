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
    <div className="container mx-auto py-8 px-4">
      {/* Back to Quiz Button */}
      <Link href="/porosity-quiz" className="btn btn-primary gap-2 mb-8">
        <ArrowLeft className="w-5 h-5" />
        Retake Porosity Quiz
      </Link>

      {/* Hero Section */}
      <div className="hero min-h-[400px] bg-base-200 rounded-2xl mb-12">
        <div className="hero-content flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-6">
              Your Hair is Low Porosity
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Low porosity hair has a smooth cuticle and an oily F-layer that
                blocks water and products from entering. That&apos;s why{' '}
                <strong>light</strong> products work best — heavy oils and
                butters tend to just sit on top and can make hair look greasy
                and stringy. Heat can help products like deep conditioners
                penetrate the hair.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="card card-side bg-base-100 shadow-xl">
              <figure className="">
                <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center">
                  <span className="text-base-content/50">
                    High Porosity Cuticle Image
                  </span>
                </div>
              </figure>
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

      {/* Comparison Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Compare Porosity Types
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* low porosity */}
          <div className="card bg-base-100 shadow-xl flex flex-row md:flex-col gap-4">
            <figure className="px-6 pt-6">
              <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">
                  Low Porosity Cuticle Image
                </span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title">Your Hair: Low Porosity</h3>
              <p>
                Low porosity hair has a smooth cuticle and an oily F-layer that
                blocks water and products from entering.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-6 pt-6">
              <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">
                  High Porosity Cuticle Image
                </span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title">
                <Link
                  href="/porosity/high-porosity"
                  className="link link-primary"
                >
                  High Porosity
                </Link>
              </h3>
              <p>
                The cuticles of high porosity hair are broken and the oily
                f-layer is stripped off.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure className="px-6 pt-6">
              <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center">
                <span className="text-base-content/50">
                  Mixed Porosity Hair Image
                </span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title">
                <Link
                  href="/porosity/mixed-porosity"
                  className="link link-primary"
                >
                  Mixed Porosity
                </Link>
              </h3>
              <p>This is hair with low porosity roots and high porosity ends</p>
            </div>
          </div>
        </div>
      </div>

      {/* Example Routine Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Example Routine</h2>
        <div className="space-y-6 md:grid md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                    <span className="text-base-content/50">
                      Odele Clarifying Shampoo
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-base-content/50 text-sm">
                    Clarifying Shampoo
                  </span>
                  <h3 className="text-xl font-semibold mb-2">
                    Odele Clarifying Shampoo
                  </h3>
                  <p className="mb-4">
                    A <strong>clarifying shampoo</strong> at least once a week
                  </p>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <button className="btn btn-primary btn-sm">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Buy on Amazon
                    </button>
                    <button className="btn btn-outline btn-sm">
                      Try on Curls Monthly
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                    <span className="text-base-content/50">
                      Curl Keeper Big Energy
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    Curl Keeper Big Energy Shampoo & Conditioner
                  </h3>
                  <p className="mb-4">
                    A <strong>lightweight conditioner</strong> + a{' '}
                    <strong>cleansing shampoo</strong> for when you're not
                    clarifying
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

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                    <span className="text-base-content/50">XMondo Mousse</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">XMondo Mousse</h3>
                  <p className="mb-4">
                    A <strong>lightweight</strong> mousse that provides hold
                    without weight
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

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                    <span className="text-base-content/50">Eva Mane Magic</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Eva Mane Magic</h3>
                  <p className="mb-4">
                    A <strong>spray leave in</strong> is perfect for lightweight
                    protection, as well as refreshing
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
      </div>
      {/* Second Email Signup */}
      <div className="mb-12">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title text-2xl justify-center mb-4">
              Get More Tips Delivered
            </h2>
            <p className="mb-6">
              Stay updated with the latest low porosity hair care tips and
              product recommendations.
            </p>
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-secondary">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Special Cases Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8">
          Special Cases: When Your Hair Needs More
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
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

          <div className="card bg-base-100 shadow-xl">
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

      {/* For More Hold Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8">For More Hold</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-xl">
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

          <div className="card bg-base-100 shadow-xl">
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

          <div className="card bg-base-100 shadow-xl">
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

          <div className="card bg-base-100 shadow-xl">
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
