'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

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
      <div className="grid md:grid-cols-2 gap-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Your Hair is Low Porosity</h1>
          <p className="text-lg">
            This means your hair is healthy and undamaged
          </p>
          <button className="btn btn-disabled">Guide (coming soon)</button>
        </div>

        {/* Technical Details Section */}
        <div className="card card-side bg-base-100">
          <figure>
            <Image
              src="/images/porosity/cuticle.png"
              alt="Low Porosity Cuticle"
              width={200}
              height={120}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl">The Technical Details</h2>
            <p className="text-base">
              On a technical level low porosity means your cuticles are smooth
              and tightly packed, with a fatty outer layer that repels water.
            </p>
          </div>
        </div>
      </div>

      {/* Low Porosity 101 Section */}
      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Low Porosity 101</h2>
          <p className="mb-6">
            Our full guide coming soon will offer a more extensive exploration
            of low porosity hair and how to make a routine but here are some
            basics
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cleansing */}
            <div className="card card-side bg-base-200">
              <figure className="relative w-full mx-auto bg-base-200/20">
                <Image
                  src="/images/porosity/odele.png"
                  alt="Odele Clarifying Shampoo"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className=" object-cover "
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl">1. Cleansing</h3>
                <p>
                  The fatty outer layer of low porosity hair can attract buildup
                  of oils from your scalp and products. I like to use a
                  clarifying shampoo like Odele Clarifying at least once a week.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Buy on Amazon
                  </button>
                </div>
              </div>
            </div>

            {/* Conditioning */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">2. Conditioning</h3>
                <div className="flex gap-4 flex-col lg:flex-row">
                  <figure className="flex-shrink-0">
                    <Image
                      src="/images/porosity/bigenergy.png"
                      alt="Big Energy Shampoo & Conditioner"
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </figure>
                  <p className="mb-4">
                    Low porosity hair generally needs less conditioning, so opt
                    for a lightweight conditioner like Curl Keeper Big Energy.
                    The shampoo is also great for days you&apos;re not
                    clarifying.
                  </p>
                </div>
                <div className="card-actions justify-end ">
                  <button className="btn btn-primary btn-sm">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Buy on Amazon
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Section for Guide */}
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  Grab our free guide to lightweight products
                </h2>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <figure className="flex-shrink-0">
                    <Image
                      src="/images/porosity/book.png"
                      alt="Lightweight Products Guide"
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </figure>
                  <div className="card-actions justify-end">
                    <p className="mb-4">
                      It&apos;s perfect for finding light products in the
                      drugstore.
                      <br />
                      Get it free when you subscribe to our (really useful)
                      newsletter
                    </p>
                    <form
                      onSubmit={handleEmailSubmit}
                      className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
                    >
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered flex-1 w-full"
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
            </div>

            {/* Leave-in */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">3. Leave in</h3>
                <div className="flex gap-4">
                  <figure className="flex-shrink-0">
                    <Image
                      src="/images/porosity/eva.png"
                      alt="Eva 10-in-1 Leave-in"
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </figure>
                  <div className="card-actions justify-end">
                    <p className="mb-4">
                      You might not need leave-in but if you do its for{' '}
                      <strong>protection</strong>, so your hair <strong>stays</strong> low
                      porosity. You may need this more if you have finer hair,
                      aging hair, or other textures prone to breakage. A light
                      multi-purpose spray leave in like Eva 10-in-1 is perfect
                      for this!
                    </p>
                    <button className="btn btn-primary btn-sm">
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Buy on Amazon
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylers */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">4. Stylers</h3>
                <div className="flex gap-4">
                  <figure className="flex-shrink-0">
                    <Image
                      src="/images/porosity/xmondo.png"
                      alt="XMondo Wavetech"
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </figure>
                  <div className="card-actions justify-end">
                    <p className="mb-4">
                      Also optional, opt for lighter options like mousses, gels,
                      and custards. One we love is XMondo Wavetech! If your hair
                      needs an oil we recommend using serums emulsions labeled
                      &quot;lightweight&quot; like Verb Ghost Oil.
                    </p>
                    <button className="btn btn-primary btn-sm">
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Buy on Amazon
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Conditioning */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">
                  5. Deep Conditioning
                </h3>
                <div className="flex gap-4">
                  <figure className="flex-shrink-0">
                    <Image
                      src="/images/porosity/mask.png"
                      alt="Deep Conditioning Mask"
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </figure>
                  <div className="card-actions justify-end">
                    <p className="mb-4">
                      It&apos;s a myth that low porosity hair is always smooth
                      and soft. It can be coarse and even feel &quot;dry&quot;
                      due to other factors like hair texture or age. Deep
                      conditioning will soften hair nicely, but you&apos;ll want
                      to use heat to help it penetrate.
                    </p>
                    <button className="btn btn-primary btn-sm">
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Buy on Amazon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curls Monthly CTA */}
      <div className="flex justify-center">
        <div className="card bg-gradient-to-br from-pink-200 to-white rounded-2xl p-8 md:p-12 max-w-2xl w-full">
          <div className="card-body text-center p-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Get these (and more) with Curls Monthly
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-lg mx-auto mb-6">
              Curls Monthly is a subscription that takes the guesswork out of
              finding what works for your hair.
            </p>
            <div className="flex justify-center">
              <button className="bg-teal-600 hover:bg-teal-700 hover:shadow-md text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200">
                Subscribe to Curls Monthly
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <div className="card bg-base-200">
        <div className="card-body text-center">
          <p className="flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4 shrink-0" />
            Product links are affiliate links we earn a small commission if you
            buy through them
          </p>
        </div>
      </div>
    </div>
  );
}
