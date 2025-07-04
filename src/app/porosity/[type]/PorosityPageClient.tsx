'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CountryCode,
  PorosityType,
  getRoutineSteps,
  ProductCategory,
} from '@/lib/routineBuilder';
import { useLocalization } from '@/contexts/LocalizationContext';
import { ProductCard } from '@/components/ui/product/ProductCard';
import {
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  Info,
  HelpCircle,
} from 'lucide-react';
import Avatar from '@/components/avatar';
import Link from 'next/link';
import PorosityEmailSignup from '@/components/PorosityEmailSignup';

interface PorosityInfo {
  title: string;
  description: string;
  characteristics: string[];
  tips: string[];
}

interface Props {
  porosityType: string;
  porosityInfo: PorosityInfo;
}

export function PorosityPageClient({ porosityType, porosityInfo }: Props) {
  const router = useRouter();
  const { country, setCountry } = useLocalization();

  // Convert URL type to PorosityType
  const getPorosityType = (type: string): PorosityType => {
    switch (type) {
      case 'high-porosity':
        return 'high_porosity';
      case 'low-porosity':
        return 'low_porosity';
      case 'mixed-porosity':
        return 'mixed_porosity';
      case 'normal-porosity':
        return 'normal_porosity';
      default:
        return 'normal_porosity';
    }
  };

  const handlePorosityChange = (newPorosity: PorosityType) => {
    // Convert PorosityType to URL format
    const urlType = newPorosity.replace('_', '-');
    router.push(`/porosity/${urlType}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-lg flex items-center gap-2 mb-4">
        <Avatar imageUrl="/normal.svg" altText="Curlsbot" />
        <span className="text-primary">CurlsBot</span> thinks you have:{' '}
      </div>
      <h1 className="text-3xl font-bold mb-4">{porosityInfo.title}</h1>
      <p className="text-lg mb-8">{porosityInfo.description}</p>

      <PorosityEmailSignup porosityType={porosityType} />

      <Link href="/porosity" className="btn btn-primary gap-2  mb-4">
        <ArrowLeft className="w-5 h-5" />
        Retake Porosity Quiz
      </Link>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Characteristics</h2>
          <ul className="list-disc list-inside space-y-2">
            {porosityInfo.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Care Tips</h2>
          <ul className="list-disc list-inside space-y-2">
            {porosityInfo.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card bg-base-100 mt-8">
        <div className="card-body">
          <h2 className="card-title">Build Your Routine</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Porosity</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={getPorosityType(porosityType)}
                onChange={(e) =>
                  handlePorosityChange(e.target.value as PorosityType)
                }
              >
                <option value="normal_porosity">Normal Porosity</option>
                <option value="high_porosity">High Porosity</option>
                <option value="low_porosity">Low Porosity</option>
                <option value="mixed_porosity">Mixed Porosity</option>
              </select>
            </div>

            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
              >
                <option value="US">United States</option>
                <option value="AU">Australia</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="text-base-content/70 text-sm mt-4 flex items-center gap-2">
        <ShoppingBag className="w-4 h-4 shrink-0" />
        Product links are affiliate links that help support the site
      </p>

      <RoutineSteps
        porosity={getPorosityType(porosityType)}
        country={country}
      />
    </div>
  );
}

interface RoutineStepsProps {
  porosity: PorosityType;
  country: CountryCode;
}

function RoutineSteps({ porosity, country }: RoutineStepsProps) {
  const [productOffsets, setProductOffsets] = useState<Record<string, number>>(
    {},
  );

  // Set analysis filters based on porosity type
  const analysisFilters = {
    cgmApproved: false,
    frizzResistant: false,
    lightweight: false,
    highPorosity: porosity === 'high_porosity' || porosity === 'mixed_porosity',
    lowPorosity: porosity === 'low_porosity' || porosity === 'mixed_porosity',
  };

  const steps = getRoutineSteps(
    porosity,
    country,
    undefined,
    productOffsets,
    analysisFilters,
  );

  const handleSeeMore = (category: string, totalProducts: number) => {
    setProductOffsets((prev) => ({
      ...prev,
      [category]: ((prev[category] || 0) + 3) % totalProducts,
    }));
  };

  return (
    <div className="space-y-8 mt-8">
      {steps.map((step) => (
        <div key={step.id} className="card bg-base-200">
          <div className="card-body">
            <h3 className="text-2xl font-semibold">{step.title}</h3>
            <div className="">
              <p>{step.description}</p>
            </div>
            <div className="alert alert-info bg-info/30 flex items-start">
              <Info className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="font-bold">
                For {porosity.replace('_', ' ').replace('porosity', '').trim()}{' '}
                porosity hair, we recommend: {step.recommendation}
              </p>
            </div>

            <div className="space-y-8">
              {step.categories.map((category) => (
                <div key={category.category} className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium capitalize">
                      {category.category.replace(/_/g, ' ')}
                    </h4>
                    <p className="text-base-content/70 mt-1">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.products.length > 0 ? (
                      category.products.map((product) => (
                        <ProductCard
                          key={`${product.brand}-${product.name}`}
                          product={{
                            title: product.name,
                            description: product.brand,
                            product: product,
                          }}
                          category={category.category}
                          selectedCountry={country}
                        />
                      ))
                    ) : (
                      <div className="col-span-3 card bg-base-100 p-6 text-center">
                        <p className="text-base-content/70">
                          We don&apos;t have any items in this category yet,
                          please{' '}
                          <Link href="/contact" className="link link-primary">
                            contact us
                          </Link>{' '}
                          if you have suggestions
                        </p>
                      </div>
                    )}
                  </div>

                  {category.totalProducts > 3 &&
                    category.products.length > 0 && (
                      <button
                        onClick={() =>
                          handleSeeMore(
                            category.category,
                            category.totalProducts,
                          )
                        }
                        className="btn btn-primary gap-2 w-full"
                      >
                        <Sparkles className="w-5 h-5" />
                        See Different Products
                      </button>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
