import { BeakerIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';

export function ParabensCard() {
  return (
    <CheatSheetCard
      title="Parabens"
      icon={<BeakerIcon className="w-6 h-6 text-info" />}
      warning
    >
      <CheatSheetAlert type="warning">
        <p>
          Lorraine Massey cautions against these in the{' '}
          <em>Curly Hair Handbook</em>, citing potential safety concerns.{' '}
          <a href="/blog/parabens" className="link link-warning">Learn more about parabens</a>.
        </p>
      </CheatSheetAlert>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Common preservatives in hair products:</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>butylparaben</CheatSheetPattern>
            <CheatSheetPattern>ethylparaben</CheatSheetPattern>
            <CheatSheetPattern>isobutylparaben</CheatSheetPattern>
            <CheatSheetPattern>methylparaben</CheatSheetPattern>
            <CheatSheetPattern>propylparaben</CheatSheetPattern>
          </ul>
        </div>
      </div>
    </CheatSheetCard>
  );
}
