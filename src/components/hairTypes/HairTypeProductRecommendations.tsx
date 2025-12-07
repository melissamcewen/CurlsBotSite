'use client';

import Image from 'next/image';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product } from 'haircare-ingredients-analyzer';
import { useLocalization } from '@/contexts/LocalizationContext';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';
import { ShoppingCart, FlaskConical, CheckCircle, Sparkles, Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

interface HairTypeProductRecommendationsProps {
  productIds: string[];
}

export function HairTypeProductRecommendations({
  productIds,
}: HairTypeProductRecommendationsProps) {
  const { country } = useLocalization();
  const products = useMemo(() => getBundledProducts().products, []);

  // Get products by ID, filtering out any that don't exist
  const recommendedProducts = useMemo(() => {
    return productIds
      .map((id) => products[id])
      .filter((product): product is Product => product !== undefined);
  }, [productIds, products]);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Curls Monthly CTA */}
      <div className="card bg-base-200 rounded-box">
        <div className="card-body p-4">
          <a
            href="https://curlsmonthly.com/?ref=curlsbot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Sample all these products at Curls Monthly
          </a>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {recommendedProducts.map((product) => {
        const productName = product.brand
          ? `${product.brand} ${product.name}`
          : product.name;
        const imagePath = `/images/products/${product.id}.png`;
        const buyLinks = product.buy_links?.filter(
          (link) =>
            link.countries?.includes(country) ||
            (country === 'US' &&
              (!link.countries || link.countries.length === 0)),
        ) || [];

        return (
          <div
            key={product.id}
            className="card bg-base-100 shadow-sm h-full flex flex-col"
          >
            <figure className="relative w-full h-32 bg-base-200/20 flex-shrink-0">
              {buyLinks.length > 0 ? (
                <a
                  href={buyLinks[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  ref={(el) => {
                    if (el) {
                      addProductTrackingAttributes(
                        el,
                        product,
                        'buy',
                        buyLinks[0].retailer,
                      );
                    }
                  }}
                  onClick={() =>
                    trackProductInteraction(
                      product,
                      'buy',
                      buyLinks[0].retailer,
                    )
                  }
                >
                  <Image
                    src={imagePath}
                    alt={productName}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-contain p-3 hover:opacity-90 transition-opacity"
                  />
                </a>
              ) : (
                <Image
                  src={imagePath}
                  alt={productName}
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-contain p-3"
                />
              )}
            </figure>
            <div className="card-body p-3 flex-1 flex flex-col">
              <h2 className="card-title text-sm leading-tight mb-1">
                {product.name}
              </h2>
              {product.brand && (
                <p className="text-xs text-base-content/70 mb-1">
                  {product.brand}
                </p>
              )}
              <div className="flex flex-wrap gap-1 mb-2">
                {product.status === 'ok' && (
                  <div className="badge badge-primary badge-sm gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <Link href="/curly-girl-method" className="link text-xs">
                      CGM
                    </Link>
                  </div>
                )}
              </div>
              {product.description && (
                <p className="text-xs text-base-content/80 line-clamp-2 mb-2">
                  {product.description}
                </p>
              )}
              <div className="card-actions flex-col gap-1 mt-auto">
                {product.ingredients_raw && (
                  <Link
                    href={`/analyzer?ingredients=${encodeURIComponent(
                      product.ingredients_raw,
                    )}`}
                    className="btn btn-primary btn-xs w-full gap-1"
                  >
                    <Search className="w-3 h-3" />
                    Analyze
                  </Link>
                )}
                {buyLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-xs w-full gap-1"
                    ref={(el) => {
                      if (el) {
                        addProductTrackingAttributes(
                          el,
                          product,
                          'buy',
                          link.retailer,
                        );
                      }
                    }}
                    onClick={() =>
                      trackProductInteraction(product, 'buy', link.retailer)
                    }
                  >
                    <ShoppingCart className="w-3 h-3" />
                    {link.retailer || 'Amazon'}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

