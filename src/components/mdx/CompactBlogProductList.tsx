import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

interface CompactBlogProductProps {
  name: string;
  subtitle?: string;
  description: string;
  image: string;
  ingredients: string;
  buyLink?: string;
  amazonLink?: string;
  buyText?: string;
}

interface CompactBlogProductListProps {
  title?: string;
  products: CompactBlogProductProps[];
}

function CompactBlogProductItem({
  name,
  subtitle,
  description,
  image,
  ingredients,
  buyLink,
  amazonLink,
  buyText = 'Buy Now',
}: CompactBlogProductProps) {
  const primaryLink = buyLink || amazonLink;

  return (
    <li className="list-row">
      <div>
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="size-10 rounded-box object-cover"
        />
      </div>
      <div>
        <div className="font-medium">{name}</div>
        {subtitle && (
          <div className="text-xs uppercase font-semibold opacity-60">
            {subtitle}
          </div>
        )}
      </div>
      <p className="list-col-wrap text-xs opacity-80">{description}</p>
      {ingredients && ingredients.length > 0 && (
        <Link
          href={`/analyzer?ingredients=${encodeURIComponent(ingredients)}`}
          className="btn btn-square btn-ghost"
          title="Analyze with Curlsbot"
        >
          <Search className="size-[1.2em]" />
        </Link>
      )}
      {primaryLink && (
        <a
          href={primaryLink}
          target="_blank"
          className="btn btn-square btn-ghost"
          title={amazonLink ? 'Buy on Amazon' : buyText}
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
                    url: primaryLink,
                    retailer: amazonLink ? 'Amazon' : undefined,
                  },
                ],
              };
              addProductTrackingAttributes(
                el,
                mockProduct,
                'buy',
                amazonLink ? 'Amazon' : undefined,
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
                  url: primaryLink,
                  retailer: amazonLink ? 'Amazon' : undefined,
                },
              ],
            };
            trackProductInteraction(
              mockProduct,
              'buy',
              amazonLink ? 'Amazon' : undefined,
            );
          }}
        >
          <ShoppingCart className="size-[1.2em]" />
        </a>
      )}
    </li>
  );
}

export function CompactBlogProductList({
  title = 'Products',
  products,
}: CompactBlogProductListProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <ul className="list bg-base-100 rounded-box shadow-md not-prose mb-6">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase">
        {title}
      </li>
      {products.map((product, index) => (
        <CompactBlogProductItem key={index} {...product} />
      ))}
    </ul>
  );
}

// Export individual item component for flexibility
export { CompactBlogProductItem };
