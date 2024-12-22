import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern, CheatSheetPatternGroup, CheatSheetSourceItem } from '@/components/ingredients/CheatSheetComponents';

export function WaxesCard() {
  return (
    <CheatSheetCard
      title="Waxes & Coating Ingredients"
      icon={<WrenchScrewdriverIcon className="w-6 h-6 text-amber-500" />}
      status="warning"
    >
      <CheatSheetAlert type="warning">
        These can build up on hair and require sulfates to remove completely.
      </CheatSheetAlert>
      <CheatSheetSourceItem
        type="error"
        source="Curly Girl Handbook"
        stance="Avoid waxes and petroleum"
        href="https://amzn.to/41LMTsD"
      />
      <div className="space-y-2">
        <div className="">
          <CheatSheetPatternGroup title="Look for these words anywhere in the ingredient name:">
            <CheatSheetPattern pattern="cera" example="Cera Alba" />
            <CheatSheetPattern pattern="cire" example="Cire d'abeille" />
            <CheatSheetPattern pattern="isohexad*" example="Isohexadecane" />

            <CheatSheetPattern pattern="wax" example="Beeswax" />
          </CheatSheetPatternGroup>
          <CheatSheetPatternGroup title="Look for these specific ingredients:">

            <CheatSheetPattern pattern="lanolin" />
            <CheatSheetPattern pattern="mineral oil" />
            <CheatSheetPattern pattern="paraffin" />
            <CheatSheetPattern pattern="petrolatum" />
            <CheatSheetPattern pattern="shellac" />

          </CheatSheetPatternGroup>
        </div>
      </div>

      <div className="space-y-2">

        <CheatSheetPatternGroup title="Water Soluble Waxes (generally OK for most people)">
          <CheatSheetPattern pattern="emulsifying wax" />
          <CheatSheetPattern pattern="peg-* beeswax" example="PEG-8 Beeswax" />
          <CheatSheetPattern pattern="peg-* lanolin" example="PEG-75 Lanolin" />
        </CheatSheetPatternGroup>
      </div>
    </CheatSheetCard>
  );
}
