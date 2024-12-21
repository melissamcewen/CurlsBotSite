import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = getBundledProducts();
  const allProducts = Object.values(products.products);

  // Get current hour in UTC for stable rotation
  const hourOfYear = Math.floor(Date.now() / (1000 * 60 * 60));

  // Use the hour to select a product
  const index = hourOfYear % allProducts.length;
  const recommendedProduct = allProducts[index];

  if (!recommendedProduct) {
    return new NextResponse(JSON.stringify({ error: 'No products available' }), {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify({
    name: recommendedProduct.name,
    brand: recommendedProduct.brand,
    buyUrl: recommendedProduct.buy_url,
  }), {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
    },
  });
}
