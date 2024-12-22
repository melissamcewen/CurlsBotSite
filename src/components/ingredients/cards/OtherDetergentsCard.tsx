import { BeakerIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';

export function OtherDetergentsCard() {
  return (
    <CheatSheetCard
      title="Other Detergents"
      icon={<BeakerIcon className="w-6 h-6 text-warning" />}
    >
      <CheatSheetAlert type="info">
        These are NOT sulfates, but some find them drying. Research to determine if they work for your hair.
      </CheatSheetAlert>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Common patterns in other detergents:</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>*sulfosuccinate (e.g., Disodium Laureth Sulfosuccinate)</CheatSheetPattern>
            <CheatSheetPattern>*glutamate (e.g., Sodium Cocoyl Glutamate)</CheatSheetPattern>
            <CheatSheetPattern>olefin sulfonate (e.g., Sodium C14-16 Olefin Sulfonate)</CheatSheetPattern>
            <CheatSheetPattern>*sarcosinate/*sarcosine (e.g., Sodium Lauroyl Sarcosinate)</CheatSheetPattern>
            <CheatSheetPattern>*isethionate/*isothionate (e.g., Sodium Lauroyl Methyl Isethionate)</CheatSheetPattern>
            <CheatSheetPattern>Common patterns:</CheatSheetPattern>
            <CheatSheetPattern>- sodium c[number] olefin (e.g., Sodium C14-16 Olefin Sulfonate)</CheatSheetPattern>
            <CheatSheetPattern>- sodium lauroyl/lauryl (e.g., Sodium Lauroyl Sarcosinate)</CheatSheetPattern>
          </ul>
        </div>
      </div>
    </CheatSheetCard>
  );
}
