'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Sparkles, ShoppingCart } from 'lucide-react';
import type { FeaturedProduct as FeaturedProductType } from '@/app/hair-types/quiz/featuredProducts';

interface FeaturedProductProps {
  product: FeaturedProductType;
}

export function FeaturedProduct({ product }: FeaturedProductProps) {
  return (
    <div className="card card-side bg-base-100 shadow-sm md:flex-row flex-col">
      <figure className="relative w-full md:w-48 h-48 md:h-auto bg-base-200/20 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 192px"
          className="object-contain p-4"
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-col md:flex-row md:items-start gap-2 mb-2">
          <h2 className="card-title flex-1">{product.title}</h2>
          <div className="badge badge-primary gap-1 flex-shrink-0 md:self-start">
            <CheckCircle className="w-3 h-3" />
            <Link href="/curly-girl-method" className="link text-xs">
              CGM
            </Link>
          </div>
        </div>
        <p
          className="text-sm text-base-content/80 mb-4"
          dangerouslySetInnerHTML={{
            __html: product.description.replace(
              /\*\*(.*?)\*\*/g,
              '<strong>$1</strong>',
            ),
          }}
        />
        <div className="card-actions justify-end gap-2 flex-row">
          <a
            href={product.primaryLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary gap-2 flex-1 md:flex-none"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Buy at </span>
            {product.primaryLink.text}
          </a>
          <a
            href={product.curlsMonthlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary gap-2 flex-1 md:flex-none"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Sample at </span>
            Curls Monthly
          </a>
        </div>
      </div>
    </div>
  );
}
