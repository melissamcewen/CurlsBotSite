import { FireIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern, CheatSheetSourceList, CheatSheetSourceItem, CheatSheetPatternGroup } from '@/components/ingredients/CheatSheetComponents';
import Link from 'next/link';

export function SulfatesCard() {
  return (
    <CheatSheetCard
      title="Sulfates & Other Strong Detergents"
      icon={<FireIcon className="w-6 h-6 text-error" />}
      warning
    >
      <CheatSheetAlert type="warning">
        The curly hair community and resources often recommend avoiding
        sulfates, because of their reputation for being drying. But it can
        depend on your <Link href="/porosity-quiz">hair type</Link> and the
        formulation.
      </CheatSheetAlert>
      <CheatSheetSourceList>
        <CheatSheetSourceItem
          type="error"
          source="Curly Girl Handbook"
          stance="Avoid"
          href="https://amzn.to/41LMTsD"
        />
      </CheatSheetSourceList>
      <div className="space-y-2">
        
        <div className="">
          <CheatSheetPatternGroup title="Look for these patterns in ingredient names:">
            <CheatSheetPattern
              pattern="*sulfate/*sulphate"
              example="Sodium Lauryl Sulfate"
            />
            <CheatSheetPattern
              pattern="*sulfonate/*sulphonate"
              example="Sodium Xylene Sulfonate"
            />
            <CheatSheetPattern
              pattern="- ammonium"
              example="Ammonium Lauryl Sulfate"
            />
            <CheatSheetPattern
              pattern="- sodium"
              example="Sodium Laureth Sulfate"
            />
            <CheatSheetPattern
              pattern="- tea"
              example="TEA-Dodecylbenzenesulfonate"
            />
            <CheatSheetPattern
              pattern="- lauryl/laureth"
              example="Sodium Lauryl Sulfate"
            />
            <CheatSheetPattern
              pattern="- coco/cocyl/cocoyl"
              example="Ammonium Cocoyl Sulfate"
            />
            <CheatSheetPattern
              pattern="- cetearyl"
              example="Sodium Cetearyl Sulfate"
            />
            <CheatSheetPattern
              pattern="- myreth"
              example="Sodium Myreth Sulfate"
            />
          </CheatSheetPatternGroup>
        </div>
      </div>
    </CheatSheetCard>
  );
}
