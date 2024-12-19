'use client';

import { AnalysisResult } from '../../types/analysis';
import { Card, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { StatusIndicator } from './status/StatusIndicator';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';

interface Props {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: Props) {
  if (!result) return null;

  // Get a random product recommendation
  const products = getBundledProducts();
  const allProducts = Object.values(products.products);
  const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
  const productRecommendation = randomProduct ? {
    category: randomProduct.product_categories[0] as ProductCategory,
    name: randomProduct.name,
    brand: randomProduct.brand,
    buyUrl: randomProduct.buy_url
  } : null;

  const { color, description } = getStatusConfig(result.overallStatus);

  return (
    <div className="space-y-6">
      {/* Overall Assessment */}
      <Card className={`bg-${color}/10 border-${color}`}>
        <CardContent>
          <CardTitle>Overall Assessment</CardTitle>
          <StatusIndicator status={result.overallStatus} />
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>

      {/* Ingredients List */}
      <IngredientsList ingredients={result.ingredients} />

      {/* Product Recommendation */}
      {productRecommendation && (
        <Card>
          <CardContent>
            <CardTitle className="mb-4">Try This Product</CardTitle>
            <div className="bg-base-100 rounded-lg">
              <ProductRecommendation
                category={productRecommendation.category}
                brand={productRecommendation.brand}
                name={productRecommendation.name}
                buyUrl={productRecommendation.buyUrl}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
