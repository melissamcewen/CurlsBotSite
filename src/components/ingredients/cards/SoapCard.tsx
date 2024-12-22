import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern, CheatSheetPatternGroup } from '@/components/ingredients/CheatSheetComponents';
import Link from 'next/link';

export function SoapCard() {
  return (
    <CheatSheetCard
      title="Soap"
      icon={<ExclamationTriangleIcon className="w-6 h-6 text-error" />}
      status="warning"
    >
      <CheatSheetAlert type="warning">
        Can be as drying as sulfates and cause build-up. See our{' '}
        <Link href="/blog/is-soap-good-for-curls">soap article</Link> for more information.
      </CheatSheetAlert>

      <div className="space-y-2">
      
        <div className="">
          <CheatSheetPatternGroup title="Look for these terms to identify soap:">
            <CheatSheetPattern pattern="potassium hydroxide" />
            <CheatSheetPattern
              pattern="saponifi*"
              example="Saponified Cocos Nucifera Oil"
            />
            <CheatSheetPattern pattern="soap" />
            <CheatSheetPattern pattern="sodium carboxylate" />
            <CheatSheetPattern pattern="sodium palm" />
          </CheatSheetPatternGroup>
        </div>
      </div>
    </CheatSheetCard>
  );
}
