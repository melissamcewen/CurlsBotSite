'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import type { FeaturedProductSet } from '@/app/hair-types/quiz/featuredProductSets';

interface FeaturedProductSetProps {
  productSet: FeaturedProductSet;
}

export function FeaturedProductSet({ productSet }: FeaturedProductSetProps) {
  return (
    <div className="card card-side bg-base-100 rounded-xl border border-base-300 md:flex-row flex-col">
      <figure className="relative w-full md:w-48 h-48 md:h-auto bg-base-200/20 flex-shrink-0">
        <Image
          src={productSet.image}
          alt={productSet.title}
          fill
          sizes="(max-width: 768px) 100vw, 192px"
          className="object-contain p-4 rounded-box"
        />
      </figure>
      <div className="card-body">
        <h3 className="font-semibold text-sm tracking-wide uppercase opacity-70 ">
          Starter Set
        </h3>
        <h2 className="card-title">{productSet.title}</h2>
        <p className="text-sm text-base-content/80 mb-4">
          {productSet.description}
        </p>
        <div className="card-actions justify-end gap-2 flex-row">
          <a
            href={productSet.primaryLink.url}
            target="_blank"
            className="btn btn-primary gap-2 flex-1 md:flex-none"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy at {productSet.primaryLink.text}
          </a>
          {productSet.secondaryLink && (
            <a
              href={productSet.secondaryLink.url}
              target="_blank"
              className="btn btn-secondary gap-2 flex-1 md:flex-none"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy at {productSet.secondaryLink.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

