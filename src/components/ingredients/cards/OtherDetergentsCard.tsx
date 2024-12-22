import { BeakerIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern, CheatSheetPatternGroup } from '@/components/ingredients/CheatSheetComponents';
import Link from 'next/link';

export function OtherDetergentsCard() {
  return (
    <CheatSheetCard
      title="Other Detergents"
      icon={<BeakerIcon className="w-6 h-6 text-warning" />}
      status="caution"
    >
      <CheatSheetAlert type="info">
        These are NOT sulfates or sulfonates, but they also aren&apos;t considered gentle. Whether they work for your hair depends on your <Link href="/porosity-quiz">hair type</Link> and the formulation.
      </CheatSheetAlert>

      <CheatSheetPatternGroup title="Common patterns in other detergents:">
        <CheatSheetPattern
          pattern="*sulfosuccinate"
          example="Disodium Laureth Sulfosuccinate"
        />
        <CheatSheetPattern
          pattern="*glutamate"
          example="Sodium Cocoyl Glutamate"
        />
        <CheatSheetPattern
          pattern="olefin sulfonate"
          example="Sodium C14-16 Olefin Sulfonate"
        />
        <CheatSheetPattern
          pattern="*sarcosinate/*sarcosine"
          example="Sodium Lauroyl Sarcosinate"
        />
        <CheatSheetPattern
          pattern="*isethionate/*isothionate"
          example="Sodium Lauroyl Methyl Isethionate"
        />
      </CheatSheetPatternGroup>

      <CheatSheetPatternGroup title="Common prefixes:">
        <CheatSheetPattern
          pattern="sodium c[number] olefin"
          example="Sodium C14-16 Olefin Sulfonate"
        />
        <CheatSheetPattern
          pattern="sodium lauroyl/lauryl"
          example="Sodium Lauroyl Sarcosinate"
        />
      </CheatSheetPatternGroup>
    </CheatSheetCard>
  );
}
