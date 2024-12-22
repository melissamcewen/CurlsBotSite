import { BeakerIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern, CheatSheetPatternGroup } from '@/components/ingredients/CheatSheetComponents';

export function WitchHazelCard() {
  return (
    <CheatSheetCard
      title="Witch Hazel"
      icon={<BeakerIcon className="w-6 h-6 text-warning" />}
      warning
    >
      <CheatSheetAlert type="warning">
        Most types contain alcohol. Even alcohol-free versions may be drying.
      </CheatSheetAlert>

      <CheatSheetAlert type="info">
        Contact the manufacturer to verify if it contains alcohol. Many people find witch hazel drying, even without alcohol. Use with caution if you have hair prone to dryness.
      </CheatSheetAlert>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Look for these names:</span>
        </div>
        <div className="pl-7">
          <CheatSheetPatternGroup title="Common names for witch hazel:">
            <CheatSheetPattern pattern="Hamamelis Virginiana" example="Hamamelis Virginiana Lead Extract" />
            <CheatSheetPattern pattern="Witch Hazel" />
          </CheatSheetPatternGroup>
        </div>
      </div>
    </CheatSheetCard>
  );
}
