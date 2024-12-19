interface ProductRecommendationProps {
  category: string;
  brand: string;
  name: string;
  buyUrl: string;
}

export function ProductRecommendation({ category, brand, name, buyUrl }: ProductRecommendationProps) {
  return (
    <div className="card bg-base-200/60 rounded-lg border border-base-200 transition-colors border-l-4 border-l-secondary">
      <div className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <p className="text-sm text-primary font-bold uppercase tracking-wide">
              {category.replace(/_/g, ' ')}
            </p>
            <p className="font-bold text-lg text-base-content">{brand}</p>
            <p className="text-base-content/70">{name}</p>
          </div>
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm shrink-0"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
