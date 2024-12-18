interface ProductRecommendationProps {
  category: string;
  brand: string;
  name: string;
  buyUrl: string;
}

export function ProductRecommendation({ category, brand, name, buyUrl }: ProductRecommendationProps) {
  return (
    <div className="bg-base-100 border-l-4 border-primary p-4 shadow-lg hover:shadow-xl transition-shadow rounded-r-lg relative">
      <div className="absolute inset-0 bg-primary/5 rounded-r-lg pointer-events-none" aria-hidden="true" />
      <div className="flex justify-between items-start relative">
        <div>
          <p className="text-sm text-primary font-bold uppercase tracking-wide mb-1">{category.replace('_', ' ')}</p>
          <p className="font-bold text-lg">{brand}</p>
          <p className="text-base-content/70">{name}</p>
        </div>
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}
