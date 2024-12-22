import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';

export function SoapCard() {
  return (
    <CheatSheetCard
      title="Soap"
      icon={<ExclamationTriangleIcon className="w-6 h-6 text-error" />}
      warning
    >
      <CheatSheetAlert type="warning">
        Can be as drying as sulfates. Contact manufacturer if unsure.
      </CheatSheetAlert>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Look for these terms to identify soap:</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>potassium hydroxide</CheatSheetPattern>
            <CheatSheetPattern>saponifi* (e.g., saponified, saponification)</CheatSheetPattern>
            <CheatSheetPattern>soap</CheatSheetPattern>
            <CheatSheetPattern>sodium carboxylate</CheatSheetPattern>
            <CheatSheetPattern>sodium palm</CheatSheetPattern>
          </ul>
        </div>
      </div>
    </CheatSheetCard>
  );
}
