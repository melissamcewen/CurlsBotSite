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
    <div className="card md:card-side cb-border not-prose mb-4">
      <figure className="relative w-full md:w-[350px] h-[350px] mx-auto bg-base-200/20">
        <Image
          src={image}
          alt={name}
          fill
          className="md:object-cover object-contain"
        />
      </figure>
      <div className="card-body flex flex-col">
        <div className="space-y-2">
          <div className="card-title">{name}</div>
          {subtitle && (
            <p className="text-xl text-base-content/80">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {cgmApproved && (
            <div className="badge badge-outline badge-info gap-1 whitespace-nowrap">
              <CheckCircle className="w-4 h-4" />
              CGM Approved
            </div>
          )}
          {sulfateFree && (
            <span className="badge badge-info">Sulfate Free</span>
          )}
          {siliconeFree && (
            <span className="badge badge-info">Silicone Free</span>
          )}
        </div>

        {description && <p className="text-base-content/80">{description}</p>}

        <div className="card-actions flex-col gap-2 mt-auto">
          {(buyLink || amazonLink) && (
            <div className="flex gap-2 w-full">
              {buyLink && (
                <a
                  href={buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-secondary btn-sm flex items-center justify-center gap-2 ${
                    amazonLink ? 'w-1/2' : 'w-full'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy at {buyText}
                </a>
              )}
              {amazonLink && (
                <a
                  href={amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-secondary btn-sm flex items-center justify-center gap-2 ${
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
            className="btn btn-primary btn-sm w-full flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Analyze with Curlsbot
          </Link>
        </div>
      </div>
    </div>
  );
}
