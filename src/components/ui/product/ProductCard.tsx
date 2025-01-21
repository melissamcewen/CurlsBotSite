import Link from 'next/link';
import { Product } from 'haircare-ingredients-analyzer';
import { Tag, FlaskConical, CheckCircle, ShoppingCart } from 'lucide-react';
import { getCountryFromHostname } from '@/lib/countryDetection';

interface ProductCardProps {
  product: {
    title: string;
    description: string;
    product: Product;
  };
  category: string;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function ProductCard({
  product,
  category,
  onSelect,
  isSelected,
}: ProductCardProps) {
  const userCountry = getCountryFromHostname();

  return (
    <div className="card bg-base-100 shadow-none">
      <div className="card-body p-6">
        <div className="flex-1">
          <div className="flex justify-between items-start gap-2">
            <h5 className="cb-header mb-0">{product.title}</h5>
          </div>

          {product.product.status === 'ok' && (
            <div className="mt-2">
              <span className="cb-badge badge-info gap-1">
                <CheckCircle className="w-4 h-4" />
                CGM Approved
              </span>
            </div>
          )}

          <div className="mt-2 flex items-center gap-2 cb-text-ghost">
            <Tag className="w-4 h-4" />
            Brand: {product.description}
          </div>

          {product.product.description && (
            <p className="mt-4 text-base-content/90 text-xs">
              {product.product.description}
            </p>
          )}
        </div>

        <div className="card-actions mt-2 flex-col gap-2">
          {product.product.ingredients_raw && (
            <Link
              href={`/?ingredients=${encodeURIComponent(
                product.product.ingredients_raw,
              )}`}
              className="cb-button w-full gap-2"
            >
              <FlaskConical className="w-4 h-4" />
              Analyze Ingredients
            </Link>
          )}
          <div className="flex flex-col gap-2 w-full">
            {onSelect && (
              <button
                className={`btn flex-1 ${
                  isSelected ? 'btn-primary' : 'btn-outline'
                }`}
                onClick={onSelect}
              >
                {isSelected ? 'Selected' : 'Select'}
              </button>
            )}
            {product.product.buy_links
              ?.filter(link => (link.country || 'US') === userCountry)
              .map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex items-center gap-2 flex-nowrap min-w-48"
              >
                <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                <span className="flex-nowrap">
                  Buy on {link.retailer || (link.country === 'US' ? 'Amazon' : `Amazon ${link.country}`)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
