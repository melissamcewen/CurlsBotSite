'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  CheckCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

interface ProductLink {
  url: string;
  text: string;
  retailer?: string;
  icon?: 'shopping-cart' | 'external-link' | 'search';
}

interface BlogProductCardEnhancedProps {
  name: string;
  subtitle?: string;
  description?: string;
  image: string;
  ingredients: string;
  sulfateFree?: boolean;
  siliconeFree?: boolean;
  cgmApproved?: boolean;
  // Legacy props for backward compatibility
  buyLink?: string;
  amazonLink?: string;
  buyText?: string;
  sample?: boolean;
  // New enhanced props
  links?: ProductLink[];
}

export function BlogProductCardEnhanced({
  name,
  subtitle,
  description,
  image,
  ingredients,
  sulfateFree,
  siliconeFree,
  cgmApproved,
  // Legacy props
  buyLink,
  amazonLink,
  buyText = 'Buy Now',
  sample,
  // New enhanced props
  links = [],
}: BlogProductCardEnhancedProps) {
  // Combine legacy links with new links for backward compatibility
  const allLinks: ProductLink[] = [
    // Add legacy buyLink if provided
    ...(buyLink
      ? [{ url: buyLink, text: buyText, icon: 'shopping-cart' as const }]
      : []),
    // Add legacy amazonLink if provided
    ...(amazonLink
      ? [
          {
            url: amazonLink,
            text: 'Buy on Amazon',
            icon: 'shopping-cart' as const,
          },
        ]
      : []),
    // Add new links
    ...links,
  ];

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'shopping-cart':
        return <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />;
      case 'search':
        return <Search className="w-3 h-3 md:w-4 md:h-4" />;
      case 'external-link':
        return <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />;
      default:
        return <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />;
    }
  };

  const handleLinkClick = (link: ProductLink) => {
    // Create a mock product object for tracking
    const mockProduct = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      brand: subtitle || '',
      product_categories: [],
      buy_links: [{ url: link.url, retailer: link.retailer }],
    };
    trackProductInteraction(mockProduct, 'buy', link.retailer);
  };

  const addTrackingAttributes = (el: HTMLAnchorElement, link: ProductLink) => {
    if (el) {
      // Create a mock product object for tracking
      const mockProduct = {
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        brand: subtitle || '',
        product_categories: [],
        buy_links: [{ url: link.url, retailer: link.retailer }],
      };
      addProductTrackingAttributes(el, mockProduct, 'buy', link.retailer);
    }
  };

  return (
    <div className="card bg-neutral-50 cb-border h-full flex flex-col md:flex-col rounded-box not-prose">
      {/* Mobile: side layout, Desktop: top layout */}
      <div className="flex md:flex-col h-full">
        <figure className="relative w-[120px] md:w-full h-[120px] md:h-[200px] bg-base-200/20 flex-shrink-0 overflow-hidden rounded-l-box md:rounded-t-box md:rounded-l-none">
          {allLinks.length > 0 ? (
            <a
              href={allLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 120px, 33vw"
                className="object-contain hover:opacity-90 transition-opacity"
              />
            </a>
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 120px, 33vw"
              className="object-contain"
            />
          )}
        </figure>

        <div className="card-body flex flex-col p-2 md:p-4 flex-grow min-w-0">
          <div className="space-y-1 md:space-y-2 mb-2 md:mb-3">
            <h3 className="card-title text-sm md:text-lg leading-tight">
              {name}
            </h3>
            {subtitle && (
              <p className="text-xs md:text-sm text-base-content/80">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
            {cgmApproved && (
              <div className="badge badge-outline badge-info gap-1 text-xs">
                <CheckCircle className="w-3 h-3" />
                <Link href="/curly-girl-method" className="link">
                  CGM
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
            <p className="text-xs md:text-sm text-base-content/80 mb-2 md:mb-4">
              {description}
            </p>
          )}

          <div className="card-actions flex-col gap-1 md:gap-2 mt-auto">
            {(allLinks.length > 0 || sample) && (
              <div className="flex flex-col gap-1 md:gap-2 w-full">
                {allLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-xs md:btn-sm flex items-center justify-center gap-1 md:gap-2 w-full"
                    ref={(el) => {
                      if (el) {
                        addTrackingAttributes(el, link);
                      }
                    }}
                    onClick={() => handleLinkClick(link)}
                  >
                    {getIcon(link.icon)}
                    <span className="text-xs md:text-sm">{link.text}</span>
                  </a>
                ))}
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
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm">Try sample</span>
                  </a>
                )}
              </div>
            )}

            {ingredients && ingredients.length > 0 && (
              <Link
                href={`/analyzer?ingredients=${encodeURIComponent(
                  ingredients,
                )}`}
                className="btn btn-primary btn-xs md:btn-sm w-full flex items-center justify-center gap-1 md:gap-2"
              >
                <Search className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">Analyze</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
