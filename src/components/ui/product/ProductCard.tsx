import Link from 'next/link';
import { Product } from 'haircare-ingredients-analyzer';
import {
  Tag,
  FlaskConical,
  CheckCircle,
  ShoppingCart,
  Droplets,
} from 'lucide-react';
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
  const porosityScores = product.product.extensions?.porosity;

  // Categories that should not show porosity scores
  const POROSITY_SCORE_EXEMPT_CATEGORIES = [
    'deep_conditioners',
    'pre_poo',
    'clarifying_shampoos',
  ];

  const shouldShowPorosityScores = () => {
    return (
      porosityScores && !POROSITY_SCORE_EXEMPT_CATEGORIES.includes(category)
    );
  };

  const getScoreStatus = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score <= 60) return 'text-error';
    return 'text-info';
  };

  const getScoreTooltip = (score: number, type: 'high' | 'low') => {
    if (score >= 85) return `Great for ${type} porosity hair`;
    if (score <= 60) return `Not ideal for ${type} porosity hair`;
    return `Moderate match for ${type} porosity hair`;
  };

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

          {shouldShowPorosityScores() && porosityScores && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-col gap-2">
                <div
                  className="indicator flex items-center gap-2 tooltip tooltip-right"
                  data-tip={getScoreTooltip(porosityScores.high, 'high')}
                >
                  <Link
                    href="/labs/porosity"
                    className="indicator-item badge badge-accent badge-xs"
                  >
                    Labs
                  </Link>
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm">High Porosity Score: </span>
                  <span
                    className={`font-bold ${getScoreStatus(
                      porosityScores.high,
                    )}`}
                  >
                    {porosityScores.high}
                  </span>
                </div>
                <div
                  className="indicator flex items-center gap-2 tooltip tooltip-right"
                  data-tip={getScoreTooltip(porosityScores.low, 'low')}
                >
                  <Link
                    href="/labs/porosity"
                    className="indicator-item badge badge-accent badge-xs"
                  >
                    Labs
                  </Link>
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm">Low Porosity Score: </span>
                  <span
                    className={`font-bold ${getScoreStatus(
                      porosityScores.low,
                    )}`}
                  >
                    {porosityScores.low}
                  </span>
                </div>
              </div>
            </div>
          )}

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
              ?.filter((link) => (link.country || 'US') === userCountry)
              .map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn  btn-outline flex items-center gap-2 flex-nowrap min-w-48"
                >
                  <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-nowrap">
                    Buy on{' '}
                    {link.retailer ||
                      (link.country === 'US'
                        ? 'Amazon'
                        : `Amazon ${link.country}`)}
                  </span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
