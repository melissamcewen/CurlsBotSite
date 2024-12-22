import { BeakerIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern, CheatSheetPatternGroup, CheatSheetSourceItem } from '@/components/ingredients/CheatSheetComponents';

export function SiliconesCard() {
  return (
    <CheatSheetCard
      title="Silicones"
      icon={<BeakerIcon className="w-6 h-6 text-pink-500" />}
      status="warning"
    >
      <CheatSheetAlert type="warning">
        These are generally avoided in the curly hair community due to potential
        build-up. They may require strong detergents to remove.
      </CheatSheetAlert>
      <CheatSheetSourceItem
        type="error"
        source="Curly Girl Handbook"
        stance="Avoid (even if they're water-soluble)"
        href="https://amzn.to/41LMTsD"
      />
      <div className="space-y-2">
        <div className="">
          <CheatSheetPatternGroup title="Look for names containing these patterns:">
            <CheatSheetPattern
              pattern="ending with 'cone'"
              example="Amodimethicone"
            />
            <CheatSheetPattern
              pattern="dimethicone/dimethicon"
              example="Dimethicone"
            />

            <CheatSheetPattern
              pattern="starting with 'sil'"
              example="Siloxane, Siloxysilicate, Silsesquioxane, Silylate"
            />
          </CheatSheetPatternGroup>

          <CheatSheetPatternGroup title="Look for these specific ingredients:">
            <CheatSheetPattern pattern="botanisil" example="Botanisil" />
            <CheatSheetPattern pattern="microsil" example="Microsil" />
          </CheatSheetPatternGroup>
        </div>
      </div>

      <div className="space-y-2">
        <CheatSheetPatternGroup title="Common names for water-soluble silicones:">
          <div className="pb-5">
            <CheatSheetAlert type="info">
              These silicones are water-soluble and may suit curly routines
              without strong detergents, but many in the curly community avoid
              all silicones.{' '}
            </CheatSheetAlert>
          </div>
          <CheatSheetPattern pattern="PEG-" example="PEG-12 Dimethicone" />
          <CheatSheetPattern pattern="PPG-" example="PPG-9 Dimethicone" />
          <CheatSheetPattern pattern="PG-" example="PG-12 Dimethicone" />
        </CheatSheetPatternGroup>
      </div>
    </CheatSheetCard>
  );
}
