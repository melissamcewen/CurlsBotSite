import { BeakerIcon } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';

export function SiliconesCard() {
  return (
    <CheatSheetCard
      title="Silicones"
      icon={<BeakerIcon className="w-6 h-6 text-pink-500" />}
      warning
    >
      <CheatSheetAlert type="warning">
        These can build up on hair and require sulfates to remove completely.
      </CheatSheetAlert>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Look for names containing these patterns:</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>botanisil</CheatSheetPattern>
            <CheatSheetPattern>*cone (e.g., Dimethicone)</CheatSheetPattern>
            <CheatSheetPattern>dimethicone/dimethicon</CheatSheetPattern>
            <CheatSheetPattern>microsil</CheatSheetPattern>
            <CheatSheetPattern>sil* (e.g., Siloxane)</CheatSheetPattern>
            <CheatSheetPattern>siloxysilicate</CheatSheetPattern>
            <CheatSheetPattern>silsesquioxane</CheatSheetPattern>
            <CheatSheetPattern>silylate</CheatSheetPattern>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <span className="cb-grouping-header">Water Soluble Silicones (May Be OK)</span>
        </div>
        <div className="pl-7">
          <ul className="space-y-2">
            <CheatSheetPattern>Starts with PEG- (e.g., PEG-12 Dimethicone)</CheatSheetPattern>
            <CheatSheetPattern>Starts with PPG- (e.g., PPG-9 Dimethicone)</CheatSheetPattern>
            <CheatSheetPattern>Starts with PG- (e.g., PG-12 Dimethicone)</CheatSheetPattern>
          </ul>
        </div>
      </div>
    </CheatSheetCard>
  );
}
