'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, CheckCircle, Sparkles } from 'lucide-react';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

interface BlogProductProps {
  name: string;
  subtitle?: string;
  description?: string;
  image: string;
  ingredients: string;
  sulfateFree?: boolean;
  siliconeFree?: boolean;
  cgmApproved?: boolean;
  buyLink?: string;
  amazonLink?: string;
  buyText?: string;
  sample?: boolean;
}

export function BlogProduct({
  name,
  subtitle,
  description,
  image,
  ingredients,
  sulfateFree,
  siliconeFree,
  cgmApproved,
  buyLink,
  amazonLink,
  buyText = 'Buy Now',
  sample,
}: BlogProductProps) {
  return (
    <div className="card md:card-side cb-border not-prose mb-4  bg-neutral-50">
      <figure className="relative w-full md:w-[40%] h-[200px] md:h-[350px] mx-auto bg-base-200/20">
        {amazonLink ? (
          <a
            href={amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain md:object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none hover:opacity-90 transition-opacity"
            />
          </a>
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-contain md:object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        )}
      </figure>
      <div className="card-body flex flex-col md:w-[60%] p-3 md:p-4">
        <div className="space-y-1 md:space-y-2">
          <div className="card-title text-lg md:text-xl">{name}</div>
          {subtitle && (
            <p className="text-sm md:text-lg text-base-content/80">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
          {cgmApproved && (
            <div className="badge badge-outline badge-info gap-1 whitespace-nowrap text-xs">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
              <Link href="/curly-girl-method" className="link">
                CGM Approved
              </Link>
            </div>
          )}
          {sulfateFree && (
            <span className="badge badge-info text-xs">Sulfate Free</span>
          )}
          {siliconeFree && (
            <span className="badge badge-info text-xs">Silicone Free</span>
          )}
        </div>

        {description && (
          <p className="text-sm md:text-base text-base-content/80">
            {description}
          </p>
        )}

        <div className="card-actions flex-col gap-1 md:gap-2 mt-auto w-full max-w-md mx-auto">
          {(buyLink || amazonLink || sample) && (
            <div className="flex flex-col gap-1 md:gap-2 w-full">
              {buyLink && (
                <a
                  href={buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-xs md:btn-sm flex items-center justify-center gap-1 md:gap-2 w-full"
                  ref={(el) => {
                    if (el) {
                      // Create a mock product object for tracking
                      const mockProduct = {
                        id: name.toLowerCase().replace(/\s+/g, '-'),
                        name,
                        brand: subtitle || '',
                        product_categories: [],
                        buy_links: [{ url: buyLink, retailer: undefined }],
                      };
                      addProductTrackingAttributes(
                        el,
                        mockProduct,
                        'buy',
                        undefined,
                      );
                    }
                  }}
                  onClick={() => {
                    // Create a mock product object for tracking
                    const mockProduct = {
                      id: name.toLowerCase().replace(/\s+/g, '-'),
                      name,
                      brand: subtitle || '',
                      product_categories: [],
                      buy_links: [{ url: buyLink, retailer: undefined }],
                    };
                    trackProductInteraction(mockProduct, 'buy', undefined);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                  {buyText}
                </a>
              )}
              {amazonLink && (
                <a
                  href={amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-xs md:btn-sm flex items-center justify-center gap-1 md:gap-2 w-full"
                  ref={(el) => {
                    if (el) {
                      // Create a mock product object for tracking
                      const mockProduct = {
                        id: name.toLowerCase().replace(/\s+/g, '-'),
                        name,
                        brand: subtitle || '',
                        product_categories: [],
                        buy_links: [{ url: amazonLink, retailer: 'Amazon' }],
                      };
                      addProductTrackingAttributes(
                        el,
                        mockProduct,
                        'buy',
                        'Amazon',
                      );
                    }
                  }}
                  onClick={() => {
                    // Create a mock product object for tracking
                    const mockProduct = {
                      id: name.toLowerCase().replace(/\s+/g, '-'),
                      name,
                      brand: subtitle || '',
                      product_categories: [],
                      buy_links: [{ url: amazonLink, retailer: 'Amazon' }],
                    };
                    trackProductInteraction(mockProduct, 'buy', 'Amazon');
                  }}
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                  Buy on Amazon
                </a>
              )}
              {sample && (
                <a
                  href="https://curlsmonthly.com/?ref=curlsbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent btn-xs md:btn-sm flex items-center justify-center gap-1 md:gap-2 w-full"
                  ref={(el) => {
                    if (el) {
                      // Create a mock product object for tracking
                      const mockProduct = {
                        id: name.toLowerCase().replace(/\s+/g, '-'),
                        name,
                        brand: subtitle || '',
                        product_categories: [],
                        buy_links: [
                          {
                            url: 'https://curlsmonthly.com/?ref=curlsbot',
                            retailer: 'Curls Monthly',
                          },
                        ],
                      };
                      addProductTrackingAttributes(
                        el,
                        mockProduct,
                        'sample',
                        'Curls Monthly',
                      );
                    }
                  }}
                  onClick={() => {
                    // Create a mock product object for tracking
                    const mockProduct = {
                      id: name.toLowerCase().replace(/\s+/g, '-'),
                      name,
                      brand: subtitle || '',
                      product_categories: [],
                      buy_links: [
                        {
                          url: 'https://curlsmonthly.com/?ref=curlsbot',
                          retailer: 'Curls Monthly',
                        },
                      ],
                    };
                    trackProductInteraction(
                      mockProduct,
                      'sample',
                      'Curls Monthly',
                    );
                  }}
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  Try a sample
                </a>
              )}
            </div>
          )}

          {ingredients && ingredients.length > 0 && (
            <Link
              href={`/analyzer?ingredients=${encodeURIComponent(ingredients)}`}
              className="btn btn-primary btn-xs md:btn-sm w-full flex items-center justify-center gap-1 md:gap-2"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
              Analyze with Curlsbot
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
