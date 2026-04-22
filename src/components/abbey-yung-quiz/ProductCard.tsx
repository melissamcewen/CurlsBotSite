'use client';

import Image from 'next/image';
import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';

function normalizeBuyUrl(url: string): string {
  try {
    return new URL(url.trim()).href;
  } catch {
    return url.trim();
  }
}

/** Prefer `links` when set; add Amazon if `amazon` is not already listed by URL. */
function getBuyButtons(product: AbbeyYungProduct): { url: string; text: string }[] {
  const fromLinks =
    product.links?.map((l) => ({ url: l.url, text: l.text })) ?? [];
  const seen = new Set(fromLinks.map((l) => normalizeBuyUrl(l.url)));
  const amazon = product.amazon?.trim();
  if (amazon && !seen.has(normalizeBuyUrl(amazon))) {
    return [...fromLinks, { url: amazon, text: 'Buy on Amazon' }];
  }
  if (fromLinks.length > 0) return fromLinks;
  if (amazon) return [{ url: amazon, text: 'Buy on Amazon' }];
  return [];
}

export function ProductCard({
  product,
  stepLabel,
}: {
  product: AbbeyYungProduct;
  stepLabel?: string;
}) {
  const buyButtons = getBuyButtons(product);
  const loneAmazonButton =
    buyButtons.length === 1 && buyButtons[0].text === 'Buy on Amazon';

  return (
    <div className="rounded-2xl bg-base-100 p-4">
      {stepLabel ? (
        <p className="text-sm font-medium text-secondary">{stepLabel}</p>
      ) : null}
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start">
        {product.img ? (
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-base-300">
            <Image
              src={product.img}
              alt={product.product}
              width={112}
              height={112}
              className="object-contain"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-base-content">{product.product}</p>
            {product.drugstore ? (
              <span className="badge badge-secondary badge-sm">Drugstore</span>
            ) : null}
          </div>
          {product.comments ? (
            <p className="mt-2 text-sm text-base-content">{product.comments}</p>
          ) : null}
          {product.bestFor ? (
            <p className="mt-1 text-xs text-base-content">
              Best for: {product.bestFor}
            </p>
          ) : null}
          {product.frequency ? (
            <p className="mt-1 text-xs text-base-content">
              How often: {product.frequency}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {buyButtons.map((link) => (
              <a
                key={`${link.url}-${link.text}`}
                href={link.url}
                target="_blank"
                className={
                  loneAmazonButton
                    ? 'btn btn-primary btn-sm rounded-xl'
                    : 'btn btn-secondary btn-sm rounded-xl'
                }
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
