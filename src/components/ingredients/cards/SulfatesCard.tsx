import { FireIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';

export function SulfatesCard() {
  return (
    <CheatSheetCard
      title="Sulfates & Harsh Cleansers"
      icon={<FireIcon className="w-6 h-6 text-error" />}
      warning
    >
      <CheatSheetAlert type="warning">
        These can be drying to hair. The strength varies, but it&apos;s simplest to avoid them.
      </CheatSheetAlert>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Look for these patterns in cleansing ingredients:</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>*sulfate/*sulphate (e.g., Sodium Lauryl Sulfate)</CheatSheetPattern>
            <CheatSheetPattern>*sulfonate/*sulphonate (e.g., Sodium Xylene Sulfonate)</CheatSheetPattern>
            <CheatSheetPattern>Common prefixes:</CheatSheetPattern>
            <CheatSheetPattern>- ammonium (e.g., Ammonium Lauryl Sulfate)</CheatSheetPattern>
            <CheatSheetPattern>- sodium (e.g., Sodium Laureth Sulfate)</CheatSheetPattern>
            <CheatSheetPattern>- tea (triethanolamine, e.g., TEA-Dodecylbenzenesulfonate)</CheatSheetPattern>
            <CheatSheetPattern>Common types:</CheatSheetPattern>
            <CheatSheetPattern>- lauryl/laureth (e.g., Sodium Lauryl Sulfate)</CheatSheetPattern>
            <CheatSheetPattern>- coco/cocyl/cocoyl (e.g., Ammonium Cocoyl Sulfate)</CheatSheetPattern>
            <CheatSheetPattern>- cetearyl (e.g., Sodium Cetearyl Sulfate)</CheatSheetPattern>
            <CheatSheetPattern>- myreth (e.g., Sodium Myreth Sulfate)</CheatSheetPattern>
          </ul>
        </div>
      </div>
    </CheatSheetCard>
  );
}
