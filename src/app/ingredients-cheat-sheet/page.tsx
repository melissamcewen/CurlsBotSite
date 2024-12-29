import { Metadata } from 'next';
import Link from 'next/link';
import SiliconesCheatSheet from '@/components/ingredients/cards/SiliconesCheatSheet';
import WaxesCheatSheet from '@/components/ingredients/cards/WaxesCheatSheet';
import PetroCheatSheet from '@/components/ingredients/cards/PetroCheatSheet';
import SulfatesCheatSheet from '@/components/ingredients/cards/SulfatesCheatSheet';
import OtherDetergentsCheatSheet from '@/components/ingredients/cards/OtherDetergentsCheatSheet';
import SoapCheatSheet from '@/components/ingredients/cards/SoapCheatSheet';
import ParabensCheatSheet from '@/components/ingredients/cards/ParabensCheatSheet';
import WitchHazelCheatSheet from '@/components/ingredients/cards/WitchHazelCheatSheet';
import AlcoholCheatSheet from '@/components/ingredients/cards/AlcoholCheatSheet';

export const metadata: Metadata = {
  title: 'Hair Care Ingredients Cheat Sheet | Quick Reference Guide',
  description:
    'Quick reference guide to identify common hair care ingredients by name patterns. Learn about silicones, sulfates, alcohols, and more in hair products.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.curlsbot.com/ingredients-cheat-sheet',
  },
  openGraph: {
    title: 'Hair Care Ingredients Cheat Sheet | Quick Reference Guide',
    description:
      'Quick reference guide to identify common hair care ingredients by name patterns. Learn about silicones, sulfates, alcohols, and more in hair products.',
    url: 'https://www.curlsbot.com/ingredients-cheat-sheet',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Hair Care Ingredients Cheat Sheet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hair Care Ingredients Cheat Sheet | Quick Reference Guide',
    description:
      'Quick reference guide to identify common hair care ingredients by name patterns. Learn about silicones, sulfates, alcohols, and more in hair products.',
    images: ['/images/og-default.png'],
  },
};

export default function IngredientsCheatSheetPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Haircare Ingredients Cheat Sheet
          </h1>
          <p className="text-base-content/70 ">
            Quick guide to identify ingredient types by name patterns. See our{' '}
            <Link href="/ingredients" className="link-primary">
              Ingredients Database
            </Link>{' '}
            for more information.
          </p>
        </div>

        <div className="grid gap-6">
          <SiliconesCheatSheet />
          <WaxesCheatSheet />
          <PetroCheatSheet />
          <SulfatesCheatSheet />
          <OtherDetergentsCheatSheet />
          <AlcoholCheatSheet />
          <SoapCheatSheet />
          <ParabensCheatSheet />
          <WitchHazelCheatSheet />
        </div>
      </div>
    </div>
  );
}
