import { Metadata } from 'next';
import SiliconesCheatSheet from '@/components/ingredients/cards/SiliconesCheatSheet';


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
          <p className="text-base-content/70">
            Quick guide to identify ingredient types by name patterns
          </p>
        </div>

        <div className="grid gap-6">
          <SiliconesCheatSheet />

        </div>
      </div>
    </div>
  );
}
