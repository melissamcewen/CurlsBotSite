'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { ProductStepCard } from '@/components/ProductStepCard';
import LightProductsEmailSignup from '@/components/LightProductsEmailSignup';

export function LowPorosityPageClient() {
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
            Our full guide coming soon will offer more detailed information, but
            here are some basics.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cleansing */}
            <ProductStepCard
              stepNumber={1}
              title="Cleansing"
              imageSrc="/images/porosity/odele.png"
              imageAlt="Odele Clarifying Shampoo"
              buttonLink="https://amzn.to/47vQbTX"
            >
              <p>
                The fatty outer layer of low porosity hair can attract buildup
                of oils from your scalp and products. I like to use a clarifying
                shampoo like Odele Clarifying at least once a week.
              </p>
            </ProductStepCard>

            {/* Conditioning */}
            <ProductStepCard
              stepNumber={2}
              title="Conditioning"
              imageSrc="/images/porosity/bigenergy.png"
              imageAlt="Big Energy Shampoo & Conditioner"
              buttonLink="https://amzn.to/4nnNxUQ"
            >
              <p>
                Low porosity hair generally needs less conditioning, so opt for
                a lightweight conditioner like Curl Keeper Big Energy. The
                shampoo is also great for days you&apos;re not clarifying.
              </p>
            </ProductStepCard>

            {/* CTA Section for Guide */}
            <LightProductsEmailSignup />

            {/* Leave-in */}
            <ProductStepCard
              stepNumber={3}
              title="Leave in"
              imageSrc="/images/porosity/eva.png"
              imageAlt="Eva 10-in-1 Leave-in"
              buttonLink="https://amzn.to/4mVlwEi"
            >
              <p>
                You might not need leave-in but if you do its for{' '}
                <strong>protection</strong>, so your hair <strong>stays</strong>{' '}
                low porosity. You may need this more if you have finer hair,
                aging hair, or other textures prone to breakage. A light
                multi-purpose spray leave in like Eva 10-in-1 is perfect for
                this!
              </p>
            </ProductStepCard>

            {/* Stylers */}
            <ProductStepCard
              stepNumber={4}
              title="Stylers"
              imageSrc="/images/porosity/xmondo.png"
              imageAlt="XMondo Wavetech"
              buttonLink="https://amzn.to/3V9PxUU"
            >
              <p>
                Also optional, opt for lighter options like mousses, gels, and
                custards. One we love is XMondo Wavetech! If your hair needs an
                oil we recommend using serums emulsions labeled
                &quot;lightweight&quot; like Verb Ghost Oil. If tangly/coarse
                hair, I love Curl Wow Flo-etry, which is the lighest cream
                I&apos;ve ever tested.
              </p>
            </ProductStepCard>

            {/* Deep Conditioning */}
            <ProductStepCard
              stepNumber={5}
              title="Deep Conditioning"
              imageSrc="/images/porosity/mask.png"
              imageAlt="Deep Conditioning Mask"
              buttonLink="https://amzn.to/3Vc2a1D"
            >
              <p>
                It&apos;s a myth that low porosity hair is always smooth and
                soft. It can be coarse and even feel &quot;dry&quot; due to
                other factors like hair texture or age. Deep conditioning will
                soften hair nicely, but you&apos;ll want to use heat to help it
                penetrate.
              </p>
            </ProductStepCard>
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
              <a
                href="https://curlsmonthly.com/?ref=curlsbot"
                className="bg-teal-600 hover:bg-teal-700 hover:shadow-md text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Subscribe to Curls Monthly
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <div className="card bg-base-200">
        <div className="card-body text-center">
          <p className="flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4 shrink-0" />
            All products featured on CurlsBot are independently and thoughtfully
            selected by us. However, when you buy something through our retail
            links, we may earn an affiliate commission. This helps us keep
            CurlsBot running. We thank you for your support!
          </p>
        </div>
      </div>
    </div>
  );
}
