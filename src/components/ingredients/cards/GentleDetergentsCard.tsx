import { SparklesIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';
import Link from 'next/link';

export function GentleDetergentsCard() {
  return (
    <CheatSheetCard
      title="Gentle Detergents"
      icon={<SparklesIcon className="w-6 h-6 text-success" />}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">These gentle <Link href="/groups/detergents">detergents</Link> are generally considered mild:</span>
        </div>
        <div className="">
          <ul className="space-y-2">
            <CheatSheetPattern pattern="*glucoside/*polyglucose" example="Decyl Glucoside" />
            <CheatSheetPattern pattern="*betaine/*sultaine" example="Cocamidopropyl Betaine" />
            <CheatSheetPattern pattern="*amphoacetate/*amphodiacetate" example="Disodium Cocoamphodiacetate" />
            <CheatSheetPattern pattern="*succinate" example="Disodium Laureth Succinate" />
            <CheatSheetPattern pattern="- cocoyl/lauroyl" example="Sodium Cocoyl Isethionate" />
            <CheatSheetPattern pattern="- coco/lauryl" example="Sodium Lauroamphoacetate" />
            <CheatSheetPattern pattern="- disodium/sodium" example="Disodium Laureth Succinate" />
          </ul>
        </div>
      </div>
    </CheatSheetCard>
  );
}
