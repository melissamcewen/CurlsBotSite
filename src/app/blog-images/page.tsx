import { Droplets, Icon } from 'lucide-react';
import { bottleDispenser } from '@lucide/lab';
import Image from 'next/image';

export const metadata = {
  title: 'Blog Image Mockups',
  description: 'Create and preview blog image mockups',
};

export default function BlogImages() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Blog Image Mockups</h1>
      <div className="grid gap-8">
        {/* First card - Shampoo Brushing */}
        <div className="bg-base-100">
          <div className="p-0">
            {/* Container with 1200x630 aspect ratio */}
            <div
              className="relative w-full"
              style={{ aspectRatio: '1200/630' }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 grid grid-cols-6 gap-8 p-8 opacity-10">
                {Array.from({ length: 24 }).map((_, i) => (
                  <Droplets key={i} className="w-full h-full text-primary" />
                ))}
              </div>
              {/* Main illustration */}
              <div className="absolute inset-0 flex items-center justify-center gap-12">
                <Icon
                  iconNode={bottleDispenser}
                  className="w-48 h-48 text-primary"
                />
                <div className="w-24 h-24 flex items-center justify-center text-6xl">
                  +
                </div>
                <div className="text-8xl font-bold text-secondary">Brush?</div>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Title Card */}
        <div className="bg-base-100 aspect-video flex items-center justify-center p-8">
          <h2 className="text-4xl font-bold text-center">
            How to Care for Type 4C Hair
          </h2>
        </div>

        {/* Split Design */}
        <div className="aspect-video grid grid-cols-2">
          <div className="bg-primary flex items-center justify-center p-8">
            <h2 className="text-4xl font-bold text-center text-primary-content">
              Protein
            </h2>
          </div>
          <div className="bg-secondary flex items-center justify-center p-8">
            <h2 className="text-4xl font-bold text-center text-secondary-content">
              Moisture
            </h2>
          </div>
        </div>

        {/* Centered Icon Design */}
        <div className="bg-accent aspect-video flex flex-col items-center justify-center gap-4 p-8">
          <div className="w-32 h-32 bg-accent-content/20 rounded-full flex items-center justify-center">
            <span className="text-6xl">💧</span>
          </div>
          <h2 className="text-4xl font-bold text-center text-accent-content">
            Understanding Humectants
          </h2>
        </div>

        {/* List Style */}
        <div className="bg-info aspect-video flex flex-col items-center justify-center gap-4 p-8">
          <h2 className="text-3xl font-bold text-center text-info-content mb-4">
            Top 5 Ingredients to Avoid
          </h2>
          <ul className="text-xl text-info-content space-y-2">
            <li>❌ Ingredient</li>
            <li>❌ Ingredient</li>
            <li>❌ Ingredient</li>
            <li>❌ Ingredient</li>
            <li>❌ Ingredient</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
