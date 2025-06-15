import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, CheckCircle, Sparkles } from 'lucide-react';

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
  sample?: boolean;
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
  sample,
}: BlogProductProps) {
  return (
    <div className="card md:card-side cb-border not-prose mb-4">
      <figure className="relative w-full md:w-[40%] h-[350px] mx-auto bg-base-200/20">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-contain md:object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
      </figure>
      <div className="card-body flex flex-col md:w-[60%] p-4">
        <div className="space-y-2">
          <div className="card-title text-xl">{name}</div>
          {subtitle && (
            <p className="text-lg text-base-content/80">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
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

        <div className="card-actions flex-col gap-2 mt-auto w-full max-w-md mx-auto">
          {(buyLink || amazonLink || sample) && (
            <div className="flex flex-col gap-2 w-full">
              {buyLink && (
                <a
                  href={buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm flex items-center justify-center gap-2 w-full"
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
                  className="btn btn-secondary btn-sm flex items-center justify-center gap-2 w-full"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy on Amazon
                </a>
              )}
              {sample && (
                <a
                  href="https://curlsmonthly.com/?ref=curlsbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent btn-sm flex items-center justify-center gap-2 w-full"
                >
                  <Sparkles className="w-5 h-5" />
                  Try a sample
                </a>
              )}
            </div>
          )}

          {ingredients && ingredients.length > 0 && (
            <Link
              href={`/cgm-analyzer?ingredients=${encodeURIComponent(
                ingredients,
              )}`}
              className="btn btn-primary btn-sm w-full flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Analyze with Curlsbot
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
