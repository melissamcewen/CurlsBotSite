import { createPageMetadata } from '@/config/metadata';
import Link from 'next/link';
import SiliconesCheatSheet from '@/components/ingredients/cards/SiliconesCheatSheet';
import WaxesCheatSheet from '@/components/ingredients/cards/WaxesCheatSheet';
import SulfatesCheatSheet from '@/components/ingredients/cards/SulfatesCheatSheet';
import OtherDetergentsCheatSheet from '@/components/ingredients/cards/OtherDetergentsCheatSheet';
import SoapCheatSheet from '@/components/ingredients/cards/SoapCheatSheet';
import AlcoholCheatSheet from '@/components/ingredients/cards/AlcoholCheatSheet';
import CationicConditionerCheatSheet from '@/components/ingredients/cards/CationicConditionerCheatSheet';
export const metadata = createPageMetadata({
  title: 'Hair Care Ingredients Cheat Sheet',
  description:
    'Quick reference guide for common hair care ingredients. Learn what ingredients to look for and avoid in your hair products.',
  path: '/ingredients-cheat-sheet',
});

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
          <SulfatesCheatSheet />
          <OtherDetergentsCheatSheet />
          <AlcoholCheatSheet />
          <SoapCheatSheet />
          <CationicConditionerCheatSheet />
        </div>
      </div>
    </div>
  );
}
