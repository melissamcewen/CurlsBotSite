'use client';

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
  ShoppingBag,
} from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';
import {
  POROSITY_EXEMPT_CATEGORIES,
  POROSITY_THRESHOLDS,
} from '@/lib/porosity';
import type { ProductCategory } from '@/lib/routineBuilder';
import { getCustomDescription, type BestProductPage } from '@/lib/bestProducts';
import { filterProducts } from '@/lib/productFiltering';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

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
  const { country } = useLocalization();
  const userCountry = selectedCountry || country;
  const shouldShowPorosityScores =
    !POROSITY_EXEMPT_CATEGORIES.includes(category);

  // Re-filter products based on current country (handles country changes)
  const filteredProducts = filterProducts(products, {
    category: category === 'all' ? undefined : category,
    country: userCountry,
    requireFeatured: false,
    analysisFilters: {
      cgmApproved: page.filters.cgmApproved || false,
      frizzResistant: page.filters.frizzResistant || false,
      lightweight: page.filters.lightweight || false,
      highPorosity: page.filters.highPorosity || false,
      lowPorosity: page.filters.lowPorosity || false,
      sebdermSafe: page.filters.sebdermSafe || false,
    },
  }).filter((product) => {
    // Apply tag filters if specified
    if (page.filters.tags) {
      return page.filters.tags.every((tag) => product.tags?.includes(tag));
    }
    return true;
  });

  // Group products by category if showing all categories
  const isAllCategories = category === 'all';
  const groupedProducts = isAllCategories
    ? filteredProducts.reduce((acc, product) => {
        const productCategory = product.product_categories?.length
          ? product.product_categories[0]
          : 'Other';
        if (!acc[productCategory]) {
          acc[productCategory] = [];
        }
        acc[productCategory].push(product);
        return acc;
      }, {} as Record<string, Product[]>)
    : { [category]: filteredProducts };

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
                <div className="shrink-0 w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
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

        {page.buttons && page.buttons.length > 0 && (
          <div className="card bg-base-100 mb-8">
            <div className="card-body">
              <div className="flex flex-wrap gap-3">
                {page.buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.url}
                    className="btn btn-primary"
                  >
                    {button.text}
                  </Link>
                ))}
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
                        <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                              <Link href="/curly-girl-method" className="link">
                                CGM Approved
                              </Link>
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
                              href={`/analyzer?ingredients=${encodeURIComponent(
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
                                  trackProductInteraction(
                                    product,
                                    'buy',
                                    link.retailer,
                                  )
                                }
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
                              ref={(el) => {
                                if (el) {
                                  addProductTrackingAttributes(
                                    el,
                                    product,
                                    'sample',
                                    'Curls Monthly',
                                  );
                                }
                              }}
                              onClick={() =>
                                trackProductInteraction(
                                  product,
                                  'sample',
                                  'Curls Monthly',
                                )
                              }
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

      {/* Affiliate Disclosure */}
      <div className="card bg-base-200 mt-8">
        <div className="card-body text-center">
          <p className="flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4 shrink-0" />
            All products featured on CurlsBot are independently and thoughtfully
            selected by us. However, when you buy something through our retail
            links, we may earn an affiliate commission. This helps us keep
            CurlsBot running. We thank you for your support!
          </p>
        </div>
      </div>
    </article>
  );
}
