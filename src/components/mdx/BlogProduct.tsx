import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, CheckCircle } from 'lucide-react';

interface BlogProductProps {
  name: string;
  subtitle?: string;
  description?: string;
  image: string;
  ingredients: string;
  sulfateFree?: boolean;
  siliconeFree?: boolean;
  cgmApproved?: boolean;
  buyLink?: string;
  amazonLink?: string;
  buyText?: string;
}

export function BlogProduct({
  name,
  subtitle,
  description,
  image,
  ingredients,
  sulfateFree,
  siliconeFree,
  cgmApproved,
  buyLink,
  amazonLink,
  buyText = 'Buy Now',
}: BlogProductProps) {
  return (
    <div className="rounded-xl bg-base-100 p-6 space-y-4">
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{name}</h2>
        {subtitle && <p className="text-xl text-base-content/80">{subtitle}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {cgmApproved && (
          <div className="badge badge-outline badge-info gap-1 whitespace-nowrap">
            <CheckCircle className="w-4 h-4" />
            CGM Approved
          </div>
        )}
        {sulfateFree && (
          <span className="badge badge-lg badge-info">Sulfate Free</span>
        )}
        {siliconeFree && (
          <span className="badge badge-lg badge-info">Silicone Free</span>
        )}
      </div>

      {description && <p className="text-base-content/80">{description}</p>}

      {(buyLink || amazonLink) && (
        <div className="flex gap-2">
          {buyLink && (
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-secondary flex items-center justify-center gap-2 ${
                amazonLink ? 'w-1/2' : 'w-full'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {buyText}
            </a>
          )}
          {amazonLink && (
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-secondary flex items-center justify-center gap-2 ${
                buyLink ? 'w-1/2' : 'w-full'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              Buy on Amazon
            </a>
          )}
        </div>
      )}

      <Link
        href={`/?ingredients=${encodeURIComponent(ingredients)}`}
        className="btn btn-primary w-full flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        Analyze with Curlsbot
      </Link>
    </div>
  );
}
