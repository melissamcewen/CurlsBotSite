'use client';

import { AnalysisResult } from '../../types/analysis';
import Link from 'next/link';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';

interface Props {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: Props) {
  if (!result) return null;

  // Get a random product recommendation from all products
  const products = getBundledProducts();
  const allProducts = Object.values(products.products);
  const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
  const productRecommendation = randomProduct ? {
    category: randomProduct.product_categories[0] as ProductCategory,
    name: randomProduct.name,
    brand: randomProduct.brand,
    buyUrl: randomProduct.buy_url
  } : null;

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'ok':
        return 'bg-success text-success-content';
      case 'warning':
        return 'bg-error text-error-content';
      case 'caution':
        return 'bg-warning text-warning-content';
      default:
        return 'bg-base-200 text-base-content';
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'ok':
        return "We haven't found any ingredients that might be of concern, so we think this product might be OK for your hair.";
      case 'warning':
        return "We've found some ingredients that might be problematic. You may want to research these ingredients further or consider alternatives.";
      case 'caution':
        return "Some ingredients in this product require caution. They may work for some people but could be problematic depending on your hair type and needs.";
      default:
        return "We couldn't determine the status of this product.";
    }
  };

  const getIngredientClasses = (status: string) => {
    switch (status) {
      case 'ok':
        return 'border-success';
      case 'warning':
        return 'border-error';
      case 'caution':
        return 'border-warning';
      default:
        return 'border-base-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Assessment */}
      <Card className={getStatusClasses(result.overallStatus)}>
        <CardContent>
          <CardTitle>Overall Assessment</CardTitle>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-current" />
            <span className="capitalize font-medium">{result.overallStatus}</span>
          </div>
          <p className="mt-2">{getStatusDescription(result.overallStatus)}</p>
        </CardContent>
      </Card>

      {/* Ingredient Status */}
      {result.ingredients && result.ingredients.length > 0 && (
        <Card>
          <CardContent>
            <CardTitle className="mb-4">Ingredients</CardTitle>
            <div className="space-y-4">
              {result.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className={`bg-base-200 rounded-lg shadow-md border-l-4 ${getIngredientClasses(ingredient.status)}`}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-base-content">{ingredient.name}</span>
                      {ingredient.matched ? (
                        <>
                          <span className="text-base-content">→</span>
                          <Link
                            href={`/ingredients/${encodeURIComponent(ingredient.ingredient?.id || '')}`}
                            className="font-medium text-primary hover:text-primary-focus transition-colors"
                          >
                            {ingredient.ingredient?.name}
                          </Link>
                        </>
                      ) : (
                        <span className="badge badge-sm badge-warning">Not Found</span>
                      )}
                    </div>
                    {(ingredient.reason || ingredient.info) && (
                      <div className="mt-2 space-y-1">
                        {ingredient.reason && (
                          <p className="text-sm text-base-content/70">{ingredient.reason}</p>
                        )}
                        {ingredient.info && (
                          <p className="text-sm text-info">{ingredient.info}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Recommendation */}
      {productRecommendation && (
        <Card>
          <CardContent>
            <CardTitle className="mb-4">Try This Product</CardTitle>
            <ProductRecommendation
              category={productRecommendation.category}
              brand={productRecommendation.brand}
              name={productRecommendation.name}
              buyUrl={productRecommendation.buyUrl}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
