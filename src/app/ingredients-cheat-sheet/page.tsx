import { Metadata } from 'next';
import { BeakerIcon, WrenchScrewdriverIcon, FireIcon, SparklesIcon, ExclamationTriangleIcon, BeakerIcon as BeakerIcon2 } from '@heroicons/react/24/solid';
import { CheatSheetCard, CheatSheetAlert, CheatSheetPattern } from '@/components/ingredients/CheatSheetComponents';

export const metadata: Metadata = {
  title: 'Haircare Ingredients Cheat Sheet',
  description: 'Quick guide to identify common haircare ingredient types by name',
};

export default function IngredientsCheatSheetPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Haircare Ingredients Cheat Sheet</h1>
          <p className="text-base-content/70">
            Quick guide to identify ingredient types by name patterns
          </p>
        </div>

        <div className="grid gap-6">
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

          <CheatSheetCard
            title="Sulfates & Harsh Cleansers"
            icon={<FireIcon className="w-6 h-6 text-error" />}
            warning
          >
            <CheatSheetAlert type="warning">
              These can be drying to hair. The strength varies, but it&apos;s simplest to avoid them.
            </CheatSheetAlert>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base-content/70">
                <span className="cb-grouping-header">Look for these patterns in cleansing ingredients:</span>
              </div>
              <div className="pl-7">
                <ul className="space-y-2">
                  <CheatSheetPattern>*sulfate/*sulphate (e.g., Sodium Lauryl Sulfate)</CheatSheetPattern>
                  <CheatSheetPattern>*sulfonate/*sulphonate (e.g., Sodium Xylene Sulfonate)</CheatSheetPattern>
                  <CheatSheetPattern>Common prefixes:</CheatSheetPattern>
                  <CheatSheetPattern>- ammonium (e.g., Ammonium Lauryl Sulfate)</CheatSheetPattern>
                  <CheatSheetPattern>- sodium (e.g., Sodium Laureth Sulfate)</CheatSheetPattern>
                  <CheatSheetPattern>- tea (triethanolamine, e.g., TEA-Dodecylbenzenesulfonate)</CheatSheetPattern>
                  <CheatSheetPattern>Common types:</CheatSheetPattern>
                  <CheatSheetPattern>- lauryl/laureth (e.g., Sodium Lauryl Sulfate)</CheatSheetPattern>
                  <CheatSheetPattern>- coco/cocyl/cocoyl (e.g., Ammonium Cocoyl Sulfate)</CheatSheetPattern>
                  <CheatSheetPattern>- cetearyl (e.g., Sodium Cetearyl Sulfate)</CheatSheetPattern>
                  <CheatSheetPattern>- myreth (e.g., Sodium Myreth Sulfate)</CheatSheetPattern>
                </ul>
              </div>
            </div>
          </CheatSheetCard>

          <CheatSheetCard
            title="Other Detergents"
            icon={<BeakerIcon2 className="w-6 h-6 text-warning" />}
          >
            <CheatSheetAlert type="info">
              These are NOT sulfates, but some find them drying. Research to determine if they work for your hair.
            </CheatSheetAlert>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base-content/70">
                <span className="cb-grouping-header">Common patterns in other detergents:</span>
              </div>
              <div className="pl-7">
                <ul className="space-y-2">
                  <CheatSheetPattern>*sulfosuccinate (e.g., Disodium Laureth Sulfosuccinate)</CheatSheetPattern>
                  <CheatSheetPattern>*glutamate (e.g., Sodium Cocoyl Glutamate)</CheatSheetPattern>
                  <CheatSheetPattern>olefin sulfonate (e.g., Sodium C14-16 Olefin Sulfonate)</CheatSheetPattern>
                  <CheatSheetPattern>*sarcosinate/*sarcosine (e.g., Sodium Lauroyl Sarcosinate)</CheatSheetPattern>
                  <CheatSheetPattern>*isethionate/*isothionate (e.g., Sodium Lauroyl Methyl Isethionate)</CheatSheetPattern>
                  <CheatSheetPattern>Common patterns:</CheatSheetPattern>
                  <CheatSheetPattern>- sodium c[number] olefin (e.g., Sodium C14-16 Olefin Sulfonate)</CheatSheetPattern>
                  <CheatSheetPattern>- sodium lauroyl/lauryl (e.g., Sodium Lauroyl Sarcosinate)</CheatSheetPattern>
                </ul>
              </div>
            </div>
          </CheatSheetCard>

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

          <CheatSheetCard
            title="Witch Hazel"
            icon={<BeakerIcon2 className="w-6 h-6 text-warning" />}
            warning
          >
            <CheatSheetAlert type="warning">
              Most types contain alcohol. Even alcohol-free versions may be drying.
            </CheatSheetAlert>

            <CheatSheetAlert type="info">
              Contact the manufacturer to verify if it contains alcohol. Many people find witch hazel drying, even without alcohol. Use with caution if you have hair prone to dryness.
            </CheatSheetAlert>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base-content/70">
                <span className="cb-grouping-header">Look for these names:</span>
              </div>
              <div className="pl-7">
                <ul className="space-y-2">
                  <CheatSheetPattern>Hamamelis Virginiana Extract</CheatSheetPattern>
                  <CheatSheetPattern>Hamamelis Virginiana Leaf Extract</CheatSheetPattern>
                  <CheatSheetPattern>Witch Hazel</CheatSheetPattern>
                </ul>
              </div>
            </div>
          </CheatSheetCard>

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
        </div>
      </div>
    </div>
  );
}
