import { BeakerIcon } from '@heroicons/react/24/solid';
import {
  CheatSheetCard,
  CheatSheetAlert,
  CheatSheetPattern,
  CheatSheetPatternGroup,
} from '@/components/ingredients/CheatSheetComponents';

export function ParabensCard() {
  return (
    <CheatSheetCard
      title="Parabens"
      icon={<BeakerIcon className="w-6 h-6 text-info" />}
      warning
    >
      <CheatSheetAlert type="warning">
        <p>
          These are controversial preservatives. Lorraine Massey cautions
          against them in the{' '}
          <a
            href="https://amzn.to/41LMTsD"
          >
            Curly Girl: The Handbook{' '}
          </a> due to potential safety concerns, but most <a href="https://thebeautybrains.com/2006/05/">cosmetic chemists</a>
          consider them safe.
        </p>
      </CheatSheetAlert>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">
            Common preservatives in hair products:
          </span>
        </div>
        <div className="">
          <CheatSheetPatternGroup title="Common preservatives in hair products:">
            <CheatSheetPattern pattern="butylparaben" />
            <CheatSheetPattern pattern="ethylparaben"  />
            <CheatSheetPattern pattern="isobutylparaben"  />
            <CheatSheetPattern pattern="methylparaben" />
            <CheatSheetPattern pattern="propylparaben" />
          </CheatSheetPatternGroup>
        </div>
      </div>
    </CheatSheetCard>
  );
}
