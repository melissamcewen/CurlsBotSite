'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Shuffle,
  Sparkles,
  Layers,
  ExternalLink,
  Info,
  HelpCircle,
} from 'lucide-react';
import type { Product } from 'haircare-ingredients-analyzer';
import Link from 'next/link';
import { useLocalization } from '@/contexts/LocalizationContext';
import type { CountryCode } from '@/lib/countryDetection';
import {
  type PorosityType,
  type HairTypeProductTag,
  hairTypeToProductTag,
  getRandomProductForLightStep,
  LIGHT_ROUTINE_STEP_KEYS,
  LIGHT_STEP_CONFIG,
  type LightRoutineStepKey,
} from '@/lib/routineBuilder';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

/** Hair type options for the filter dropdown (CurlsBot / pattern types) */
const HAIR_TYPE_OPTIONS: { value: string; label: string; tag: HairTypeProductTag }[] = [
  { value: 'swavy', label: 'Swavy', tag: 'wavy' },
  { value: 'wavy', label: 'Wavy', tag: 'wavy' },
  { value: 'loose-curls', label: 'Loose Curls', tag: 'wavy' },
  { value: 'tight-curls', label: 'Tight Curls', tag: 'curly' },
  { value: 'coily', label: 'Coily', tag: 'coily' },
  { value: 'tight-coils', label: 'Tightly Coiled', tag: 'coily' },
];

export interface RoutineWidgetProps {
  /** Pre-set porosity from quiz result; when true, porosity filter is hidden */
  presetPorosity?: boolean;
  /** Pre-set hair type from quiz result; when true, hair type filter is hidden */
  presetHairType?: boolean;
  /** Initial porosity (e.g. from quiz or URL) */
  initialPorosity?: PorosityType;
  /** Initial hair type slug or CurlsBot type (e.g. from quiz or URL) */
  initialHairType?: string;
  /** Optional short description shown under the title */
  productTypeDescription?: string;
}

function getInitialPorosity(initial?: PorosityType): PorosityType {
  return initial ?? 'normal_porosity';
}

function getInitialHairTypeValue(initial?: string): string {
  if (!initial) return 'tight-curls';
  const tag = hairTypeToProductTag(initial);
  const option = HAIR_TYPE_OPTIONS.find((o) => o.tag === tag);
  return option?.value ?? 'tight-curls';
}

export function RoutineWidget({
  presetPorosity = false,
  presetHairType = false,
  initialPorosity,
  initialHairType,
  productTypeDescription,
}: RoutineWidgetProps) {
  const { country, countryName, setCountry } = useLocalization();
  const [porosity, setPorosity] = useState<PorosityType>(() =>
    getInitialPorosity(initialPorosity),
  );
  const [hairTypeValue, setHairTypeValue] = useState<string>(() =>
    getInitialHairTypeValue(initialHairType),
  );
  const [cgmApproved, setCgmApproved] = useState(true);
  const [products, setProducts] = useState<Partial<Record<LightRoutineStepKey, Product | null>>>({});
  const [isLoading, setIsLoading] = useState(true);

  const hairTypeTag = hairTypeToProductTag(hairTypeValue) ?? undefined;

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    const filters = {
      porosity,
      country,
      cgmApproved,
      hairTypeTag: hairTypeTag ?? null,
    };
    const next: Partial<Record<LightRoutineStepKey, Product | null>> = {};
    for (const key of LIGHT_ROUTINE_STEP_KEYS) {
      next[key] = getRandomProductForLightStep(key, filters);
    }
    setProducts(next);
    setIsLoading(false);
  }, [porosity, country, cgmApproved, hairTypeTag]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleRandomize = () => {
    loadProducts();
  };

  const allEmpty = LIGHT_ROUTINE_STEP_KEYS.every((k) => !products[k]);

  return (
    <div className="card bg-base-100 rounded-xl border border-base-300">
      <div className="card-body">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <h3 className="text-base font-bold">Routine Generator</h3>
        </div>

        {productTypeDescription && (
          <p className="text-xs text-base-content/80">{productTypeDescription}</p>
        )}

        {/* Single row: CGM toggle, Porosity, Hair type, Country, Randomize icon */}
        <div className="flex flex-wrap items-center gap-3">
        <label className="label cursor-pointer gap-2 py-0 min-h-0">
          <span className="label-text text-xs">CGM</span>
          <Link
            href="/curly-girl-method"
            target="_blank"
            className="link link-primary p-0 min-h-0"
            title="Learn about the Curly Girl Method"
          >
            <Info className="w-4 h-4" aria-label="About CGM" />
          </Link>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-xs"
            checked={cgmApproved}
            onChange={(e) => setCgmApproved(e.target.checked)}
          />
        </label>

        {!presetPorosity && (
          <label className="label gap-2 py-0 min-h-0 flex-row">
            <span className="label-text text-xs">Porosity</span>
            <Link
              href="/porosity/quiz"
              className="link link-primary p-0 min-h-0"
              title="Take the porosity quiz"
            >
              <HelpCircle className="w-4 h-4" aria-label="Porosity quiz" />
            </Link>
            <select
              className="select select-bordered select-xs w-auto min-w-0 max-w-[7rem]"
              value={porosity}
              onChange={(e) => setPorosity(e.target.value as PorosityType)}
            >
              <option value="low_porosity">Low</option>
              <option value="normal_porosity">Normal</option>
              <option value="high_porosity">High</option>
              <option value="mixed_porosity">Mixed</option>
            </select>
          </label>
        )}

        {!presetHairType && (
          <label className="label gap-2 py-0 min-h-0 flex-row">
            <span className="label-text text-xs">Hair</span>
            <Link
              href="/hair-types/quiz"
              className="link link-primary p-0 min-h-0"
              title="Take the hair type quiz"
            >
              <HelpCircle className="w-4 h-4" aria-label="Hair type quiz" />
            </Link>
            <select
              className="select select-bordered select-xs w-auto min-w-0 max-w-[6rem]"
              value={hairTypeValue}
              onChange={(e) => setHairTypeValue(e.target.value)}
            >
              {HAIR_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="label gap-2 py-0 min-h-0 flex-row">
          <span className="label-text text-xs">Country</span>
          <select
            className="select select-bordered select-xs w-auto min-w-0 max-w-[5rem]"
            value={country}
            onChange={(e) => setCountry(e.target.value as CountryCode)}
          >
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="AU">AU</option>
            <option value="EU">EU</option>
          </select>
        </label>

        <button
          type="button"
          className="btn btn-secondary btn-xs btn-square shrink-0 ml-auto"
          onClick={handleRandomize}
          title="Randomize"
          aria-label="Randomize products"
        >
          <Shuffle className="w-4 h-4" />
        </button>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
          data-testid="routine-product-grid"
        >
        {isLoading ? (
          <div className="col-span-3 flex items-center justify-center gap-2 py-4">
            <span className="loading loading-spinner loading-sm text-primary" aria-hidden />
            <span className="text-xs">Loading…</span>
          </div>
        ) : allEmpty ? (
          <div className="col-span-3 py-3 text-center">
            <p className="text-xs text-base-content/80">
              No products in {countryName}. Try different filters.
            </p>
            <button
              type="button"
              className="btn btn-ghost btn-xs mt-2"
              onClick={handleRandomize}
            >
              <Shuffle className="w-3 h-3 inline mr-1" />
              Try again
            </button>
          </div>
        ) : (
          LIGHT_ROUTINE_STEP_KEYS.map((key) => {
            const product = products[key];
            if (!product) return null;
            const config = LIGHT_STEP_CONFIG[key];
            const buyLink =
              product.buy_links?.find(
                (link) =>
                  link.countries?.includes(country) ||
                  (country === 'US' &&
                    (!link.countries || link.countries.length === 0)),
              ) ?? product.buy_links?.[0];
            return (
              <div
                key={key}
                className="card bg-base-100 rounded-box  border-primary/30 border-2 min-w-0 shadow-none"
              >
                <div className="card-body   ">
                  <p className="text-xs font-semibold text-base-content/80 leading-tight">
                    {config.label}
                  </p>
                  {buyLink ? (
                    <a
                      href={buyLink.url}
                      target="_blank"
                      className="link link-primary text-xs inline-flex items-center gap-0.5 leading-tight mt-0.5"
                      ref={(el) => {
                        if (el) {
                          addProductTrackingAttributes(
                            el,
                            product,
                            'buy',
                            buyLink?.retailer,
                          );
                        }
                      }}
                      onClick={() => {
                        trackProductInteraction(
                          product,
                          'buy',
                          buyLink?.retailer,
                        );
                      }}
                    >
                      {product.brand} {product.name}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-xs leading-tight mt-0.5 block text-base-content">
                      {product.brand} {product.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
        </div>

        <div className="card-actions justify-end flex-wrap gap-2 mt-2">
          <Link
            href="/routine-builder"
            className="btn btn-primary btn-sm gap-1.5"
          >
            <Layers className="w-4 h-4 shrink-0" />
            Build full routine
          </Link>
          <a
            href="https://curlsmonthly.com/?ref=curlsbot"
            className="btn btn-secondary btn-sm gap-1.5"
            target="_blank"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            Try samples @ Curls Monthly
          </a>
        </div>
      </div>
    </div>
  );
}
