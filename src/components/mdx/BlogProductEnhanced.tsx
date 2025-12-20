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

interface BlogProductEnhancedProps {
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

export function BlogProductEnhanced({
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
}: BlogProductEnhancedProps) {
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
        return <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />;
      case 'search':
        return <Search className="w-4 h-4 md:w-5 md:h-5" />;
      case 'external-link':
        return <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 md:w-5 md:h-5" />;
      default:
        return <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />;
    }
  };

  const handleLinkClick = (link: ProductLink) => {
    // Create a mock product object for tracking
    const mockProduct = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      brand: '', // Don't use subtitle as brand to avoid concatenation issues
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
        brand: '', // Don't use subtitle as brand to avoid concatenation issues
        product_categories: [],
        buy_links: [{ url: link.url, retailer: link.retailer }],
      };
      addProductTrackingAttributes(el, mockProduct, 'buy', link.retailer);
    }
  };

  return (
    <div className="card md:card-side cb-border not-prose mb-4 bg-neutral-50">
      <figure className="relative w-full md:w-[40%] h-[200px] md:h-[350px] mx-auto bg-base-200/20">
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
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg md:text-xl font-semibold text-base-content">
            {name}
          </h3>
          <div className="flex gap-1 ml-2">
            {sulfateFree && (
              <div className="badge badge-info badge-sm">Sulfate Free</div>
            )}
            {siliconeFree && (
              <div className="badge badge-info badge-sm">Silicone Free</div>
            )}
            {cgmApproved && (
              <div className="badge badge-success badge-sm">CGM Approved</div>
            )}
          </div>
        </div>

        {subtitle && (
          <p className="text-sm text-base-content/70 mb-2">{subtitle}</p>
        )}

        <div className="text-xs text-base-content/60 mb-3">{ingredients}</div>

        {description && (
          <p className="text-sm text-base-content/80 mb-3">{description}</p>
        )}

        <div className="card-actions flex-col gap-1 md:gap-2 mt-auto w-full max-w-md mx-auto">
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
                  {link.text}
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
                        brand: '', // Don't use subtitle as brand to avoid concatenation issues
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
                      brand: '', // Don't use subtitle as brand to avoid concatenation issues
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
                  Try sample
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
