interface ProductRecommendationProps {
  category: string;
  brand: string;
  name: string;
  buyLinks: Array<{
    url: string;
    country?: string;
    retailer?: string;
    description?: string;
  }>;
}

export function ProductRecommendation({
  category,
  brand,
  name,
  buyLinks,
}: ProductRecommendationProps) {
  // Get the first available buy link
  const buyUrl = buyLinks?.[0]?.url;

  return (
    <div className="card bg-base-100 rounded-lg border cb-border border-secondary h-[140px]">
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-start gap-4 h-full">
          <div className="space-y-1">
            <p className="text-sm text-primary font-bold uppercase tracking-wide">
              {category.replace(/_/g, ' ')}
            </p>
            <p className="font-bold text-lg text-base-content line-clamp-1">
              {brand}
            </p>
            <p className="text-base-content/70 line-clamp-2">{name}</p>
          </div>
          {buyUrl && (
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm shrink-0"
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
