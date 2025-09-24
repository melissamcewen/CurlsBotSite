import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

interface ProductStepCardProps {
  stepNumber: number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  buttonText?: string;
  buttonLink?: string;
  children: React.ReactNode;
}

export function ProductStepCard({
  stepNumber,
  title,
  imageSrc,
  imageAlt,
  buttonText = 'Buy on Amazon',
  buttonLink,
  children,
}: ProductStepCardProps) {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h3 className="card-title text-xl mb-4">
          {stepNumber}. {title}
        </h3>
        <div className="flex gap-4 flex-col lg:flex-row">
          <figure className="flex-shrink-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={120}
              height={120}
              className="rounded-lg"
            />
          </figure>
          <div className="mb-4">{children}</div>
        </div>
        <div className="card-actions justify-end">
          {buttonLink ? (
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              ref={(el) => {
                if (el) {
                  // Create a mock product object for tracking
                  const mockProduct = {
                    id: title.toLowerCase().replace(/\s+/g, '-'),
                    name: title,
                    brand: '',
                    product_categories: [],
                    buy_links: [{ url: buttonLink, retailer: undefined }],
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
                  id: title.toLowerCase().replace(/\s+/g, '-'),
                  name: title,
                  brand: '',
                  product_categories: [],
                  buy_links: [{ url: buttonLink, retailer: undefined }],
                };
                trackProductInteraction(mockProduct, 'buy', undefined);
              }}
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              {buttonText}
            </a>
          ) : (
            <button className="btn btn-primary btn-sm">
              <ShoppingBag className="w-4 h-4 mr-1" />
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
