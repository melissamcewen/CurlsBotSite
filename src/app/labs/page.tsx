'use client';

import Link from 'next/link';
import {
  Cloud,
  FlaskConical,
  ListChecks,
  Camera,
  ArrowRight,
  Droplets,
} from 'lucide-react';


export default function Labs() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex items-center gap-4 mb-8 md:mt-5">
        <FlaskConical className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold">CurlsBot Labs</h1>
      </div>

      <p className="mb-8 text-lg">
        Welcome to CurlsBot Labs! Here you&apos;ll find our experimental
        features and tools to help you on your curly hair journey.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* FrizzBot Weather Card */}
        <Link
          href="/frizzbot"
          className="card bg-base-100 hover:bg-base-300 transition-colors"
        >
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="h-8 w-8 text-primary" />
              <h2 className="card-title">FrizzBot Forecast</h2>
            </div>
            <p>
              Get personalized frizz forecast based on your local weather
              conditions.
            </p>
            <div className="card-actions justify-end mt-4">
              <div className="badge badge-primary">Weather</div>
              <div className="badge badge-secondary">Frizz Control</div>
            </div>
          </div>
        </Link>

        {/* Ingredient Analysis Card */}
        <Link
          href="/frizzbot/ingredients"
          className="card bg-base-100 hover:bg-base-300 transition-colors"
        >
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8 text-primary" />
              <h2 className="card-title">FrizzBot Ingredients Analysis</h2>
            </div>
            <p>
              Analyze your hair products to understand their potential for
              causing or preventing frizz.
            </p>
            <div className="card-actions justify-end mt-4">
              <div className="badge badge-primary">Ingredients</div>
              <div className="badge badge-secondary">Product Check</div>
            </div>
          </div>
        </Link>

        {/* Photo Analysis Card */}
        <Link
          href="/labs/photo"
          className="card bg-base-100 hover:bg-base-300 transition-colors"
        >
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="h-8 w-8 text-primary" />
              <div className="flex items-center gap-2">
                <h2 className="card-title">Photo Analysis</h2>
              </div>
            </div>
            <p>
              Take a photo of your product&apos;s ingredients list and let
              CurlsBot analyze it automatically.
            </p>
            <div className="card-actions justify-end mt-4">
              <div className="badge badge-primary">AI</div>
              <div className="badge badge-secondary">OCR</div>
            </div>
          </div>
        </Link>


        {/* Malassezia Ingredients Checker for SebDerm Card */}
        <a
          href="/labs/sebderm"
          target="_blank"
          rel="noopener noreferrer"
          className="card bg-base-100 hover:bg-base-300 transition-colors"
        >
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="h-8 w-8 text-primary" />
              <div className="flex items-center gap-2">
                <h2 className="card-title">
                  Malassezia Ingredients Checker for SebDerm
                </h2>
                <div className="badge badge-accent">New!</div>
              </div>
            </div>
            <p>
              Check if your haircare products contain ingredients that feed
              Malassezia or promote its growth.
            </p>
            <div className="card-actions justify-end mt-4">
              <div className="badge badge-primary">Haircare</div>
              <div className="badge badge-secondary">Scalp Care</div>
            </div>
          </div>
        </a>

        {/* Porosity score Card */}
        <Link
          href="/labs/porosity"
          className="card bg-base-100 hover:bg-base-300 transition-colors"
        >
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8 text-primary" />
              <h2 className="card-title">Porosity Score</h2>
            </div>
            <p>
              Find out if a product is suitable for your hair porosity based on
              its ingredients.
            </p>
            <div className="card-actions justify-end mt-4">
              <div className="badge badge-primary">Porosity</div>
              <div className="badge badge-secondary">Hair Care</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
