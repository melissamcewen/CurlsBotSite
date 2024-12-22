import { SparklesIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';

export function GentleDetergentsCard() {
  return (
    <CheatSheetCard
      title="Gentle Detergents"
      icon={<SparklesIcon className="w-6 h-6 text-success" />}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Generally considered gentler cleansing agents:</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>*glucoside/*polyglucose (e.g., Decyl Glucoside)</CheatSheetPattern>
            <CheatSheetPattern>*betaine/*sultaine (e.g., Cocamidopropyl Betaine)</CheatSheetPattern>
            <CheatSheetPattern>*amphoacetate/*amphodiacetate (e.g., Disodium Cocoamphodiacetate)</CheatSheetPattern>
            <CheatSheetPattern>*succinate (e.g., Disodium Laureth Succinate)</CheatSheetPattern>
            <CheatSheetPattern>Common patterns:</CheatSheetPattern>
            <CheatSheetPattern>- cocoyl/lauroyl (e.g., Sodium Cocoyl Isethionate)</CheatSheetPattern>
            <CheatSheetPattern>- coco/lauryl (e.g., Sodium Lauroamphoacetate)</CheatSheetPattern>
            <CheatSheetPattern>- disodium/sodium (e.g., Disodium Laureth Succinate)</CheatSheetPattern>
          </ul>
        </div>
      </div>
    </CheatSheetCard>
  );
}
