import Link from 'next/link';
import { Product } from 'haircare-ingredients-analyzer';
import {
  Tag,
  FlaskConical,
  CheckCircle,
  ShoppingCart,
  Sparkles,
  Award,
  Info,
} from 'lucide-react';
import { getCountryFromHostname } from '@/lib/countryDetection';
import {
  POROSITY_EXEMPT_CATEGORIES,
  POROSITY_THRESHOLDS,
} from '@/lib/porosity';
import type { ProductCategory } from '@/lib/routineBuilder';
import { getCustomDescription, type BestProductPage } from '@/lib/bestProducts';

interface ProductListicleProps {
  products: Product[];
  category: ProductCategory | 'all';
  title: string;
  description: string;
  selectedCountry?: string;
  showRanking?: boolean;
  howWePicked?: string;
  page: BestProductPage;
}

export function ProductListicle({
  products,
  category,
  title,
  description,
  selectedCountry,
  showRanking = true,
  howWePicked,
  page,
}: ProductListicleProps) {
  const userCountry = selectedCountry || getCountryFromHostname();
  const shouldShowPorosityScores =
    !POROSITY_EXEMPT_CATEGORIES.includes(category);

  // Group products by category if showing all categories
  const isAllCategories = category === 'all';
  const groupedProducts = isAllCategories
    ? products.reduce((acc, product) => {
        const productCategory = product.product_categories?.length
          ? product.product_categories[0]
          : 'Other';
        if (!acc[productCategory]) {
          acc[productCategory] = [];
        }
        acc[productCategory].push(product);
        return acc;
      }, {} as Record<string, Product[]>)
    : { [category]: products };

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedProducts).sort();

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-base-content/70 mb-8">{description}</p>

        {howWePicked && (
          <div className="card bg-base-100 mb-8">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
                  <Info className="w-6 h-6 text-info" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">How We Picked</h2>
                  <p className="text-base-content/70">{howWePicked}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAllCategories && (
          <nav className="card bg-base-100 mb-8">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {sortedCategories.map((cat) => (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    className="btn btn-outline btn-sm"
                  >
                    {cat.replace(/_/g, ' ')}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>

      <div className="space-y-16">
        {sortedCategories.map((cat) => (
          <section key={cat} id={cat} className="scroll-mt-24">
            {isAllCategories && (
              <h2 className="text-2xl font-bold mb-8 capitalize">
                {cat.replace(/_/g, ' ')}
              </h2>
            )}
            <div className="space-y-12">
              {groupedProducts[cat].map((product, index) => (
                <section key={product.id} className="card bg-base-100">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      {showRanking && (
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">
                            #{index + 1}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-1">
                          {product.name}
                        </h2>
                        <p className="text-base-content/70 mb-4 font-medium">
                          {product.brand}
                        </p>
                        <p className="text-base-content/70 mb-4">
                          {product.description}
                          {getCustomDescription(page, product.id) && (
                            <>
                              <br />
                              <br />
                              {getCustomDescription(page, product.id)}
                            </>
                          )}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.status === 'ok' && (
                            <div className="badge badge-primary gap-1 whitespace-nowrap text-xs">
                              <CheckCircle className="w-3 h-3" />
                              CGM Approved
                            </div>
                          )}
                          {product.extensions?.frizzbot &&
                            product.extensions.frizzbot.score <= -50 && (
                              <div className="badge badge-secondary whitespace-nowrap text-xs">
                                Humidity Resistant
                              </div>
                            )}
                          {shouldShowPorosityScores &&
                            product.extensions?.porosity &&
                            product.extensions.porosity.low >=
                              POROSITY_THRESHOLDS.LIGHTWEIGHT && (
                              <div className="badge badge-accent whitespace-nowrap text-xs">
                                Lightweight
                              </div>
                            )}
                          {shouldShowPorosityScores &&
                            product.extensions?.porosity &&
                            product.extensions.porosity.high >=
                              POROSITY_THRESHOLDS.HIGH_POROSITY && (
                              <div className="badge badge-primary bg-primary/80 whitespace-nowrap text-xs">
                                High Porosity
                              </div>
                            )}
                          {shouldShowPorosityScores &&
                            product.extensions?.porosity &&
                            product.extensions.porosity.low >=
                              POROSITY_THRESHOLDS.LOW_POROSITY && (
                              <div className="badge badge-secondary bg-secondary/80 whitespace-nowrap text-xs">
                                Low Porosity
                              </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {product.ingredients_raw && (
                            <Link
                              href={`/cgm-analyzer?ingredients=${encodeURIComponent(
                                product.ingredients_raw,
                              )}`}
                              className="btn btn-secondary gap-2"
                            >
                              <FlaskConical className="w-4 h-4" />
                              Analyze Ingredients
                            </Link>
                          )}
                          {product.buy_links
                            ?.filter(
                              (link) =>
                                link.countries?.includes(userCountry) ||
                                (userCountry === 'US' &&
                                  (!link.countries ||
                                    link.countries.length === 0)),
                            )
                            .map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline gap-2"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Buy on {link.retailer || 'Amazon'}
                              </a>
                            ))}
                          {product.tags?.includes('samples') && (
                            <a
                              href="https://curlsmonthly.com/?ref=curlsbot"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-secondary gap-2"
                            >
                              <Sparkles className="w-4 h-4" />
                              Try a sample
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
