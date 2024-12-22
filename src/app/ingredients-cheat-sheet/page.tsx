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
export const metadata: Metadata = {
  title: 'Haircare Ingredients Cheat Sheet',
  description: 'Quick guide to identify common haircare ingredient types by name',
};

export default function IngredientsCheatSheetPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Haircare Ingredients Cheat Sheet</h1>
          <p className="text-base-content/70 ">
            Quick guide to identify ingredient types by name patterns. See our <Link href="/ingredients" className="link-primary">Ingredients Database</Link> for more information.
          </p>
        </div>

        <div className="grid gap-6">
          <SiliconesCheatSheet />
          <WaxesCheatSheet />
          <PetroCheatSheet />
          <SulfatesCheatSheet />
          <OtherDetergentsCheatSheet />
          <SoapCheatSheet />
          <ParabensCheatSheet />
          <WitchHazelCheatSheet />
        </div>
      </div>
    </div>
  );
}
