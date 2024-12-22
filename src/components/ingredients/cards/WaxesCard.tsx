import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';

export function WaxesCard() {
  return (
    <CheatSheetCard
      title="Waxes & Coating Ingredients"
      icon={<WrenchScrewdriverIcon className="w-6 h-6 text-amber-500" />}
      warning
    >
      <CheatSheetAlert type="warning">
        These can build up on hair and require sulfates to remove completely.
      </CheatSheetAlert>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Look for these words anywhere in the ingredient name:</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>cera (Latin for wax, e.g., Cera Alba)</CheatSheetPattern>
            <CheatSheetPattern>cire (French for wax, e.g., Cire d&apos;abeille)</CheatSheetPattern>
            <CheatSheetPattern>isohexad* (e.g., Isohexadecane)</CheatSheetPattern>
            <CheatSheetPattern>lanolin</CheatSheetPattern>
            <CheatSheetPattern>mineral oil</CheatSheetPattern>
            <CheatSheetPattern>paraffin</CheatSheetPattern>
            <CheatSheetPattern>petrolatum</CheatSheetPattern>
            <CheatSheetPattern>shellac</CheatSheetPattern>
            <CheatSheetPattern>wax (e.g., Beeswax)</CheatSheetPattern>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Water Soluble Waxes (OK to Use)</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>emulsifying wax</CheatSheetPattern>
            <CheatSheetPattern>emulsifying wax nf</CheatSheetPattern>
            <CheatSheetPattern>peg-8 beeswax</CheatSheetPattern>
            <CheatSheetPattern>peg-75 lanolin</CheatSheetPattern>
          </ul>
        </div>
      </div>
    </CheatSheetCard>
  );
}
