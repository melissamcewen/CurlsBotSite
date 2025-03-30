import { CheatSheet } from '../CheatSheet';
import { Star } from 'lucide-react';

const SiliconesCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Silicones"
      titleURL="/groups/silicones"
      description="These are generally avoided in the curly hair community due to potential build-up. They may require stronger detergents to remove, but if you're using a regular shampoo, they should be fine."
      sources={[
        {
          source: 'Curlsbot',
          status: 'warning',
          link: '/',
          description:
            'Warns about water insoluble silicones, caution for other silicones',
        },
        {
          source: 'Curly Girl Handbook',
          link: 'https://amzn.to/405OSqw',
          status: 'warning',
          description: 'Avoid all silicones',
        },
        {
          source: 'Tightly Curly',
          link: 'https://amzn.to/3ZQq707',
          status: 'ok',
          description: 'Allow all silicones',
        },
      ]}
      exceptionsSections={[
        {
          title: "Silicones with a 'peg' prefix",
          ingredients: ['PEG-12 Dimethicone'],
          status: 'good',
        },
        {
          title: "Silicones with a 'ppg' (or sometimes 'pg')prefix",
          ingredients: ['PEG/PPG-18/18 Dimethicone'],
          status: 'good',
        },
      ]}
      exceptionsDescription="These silicones are water soluble or evaporative so they should be fine for haircare routines that don't contain strong detergents. But some sources recommend avoiding all silicones"
      identificationSections={[
        {
          title: "Names ending with 'cone'",
          ingredients: ['Amodimethicone', 'Dimethicone'],
        },
        {
          title: "Names starting with 'dimethi",
          ingredients: ['dimethicon'],
        },
        {
          title: "Names starting with 'sil'",
          ingredients: [
            'Siloxane',
            'Siloxysilicate',
            'Silsesquioxane',
            'Silylate',
          ],
        },
        {
          title: 'Specific ingredients',
          ingredients: ['Botanisil', 'Microsil'],
        },
      ]}
    />
  );
};

export default SiliconesCheatSheet;
