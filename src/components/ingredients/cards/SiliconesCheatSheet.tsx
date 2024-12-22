import { CheatSheet } from '../CheatSheet';
import { StarIcon } from '@heroicons/react/24/solid';

const SiliconesCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Silicones"
      description="These are generally avoided in the curly hair community due to potential build-up. They may require stronger detergents to remove."
      sources={[
        {
          source: 'Curlsbot',
          status: 'warning',
          link: '/',
          description:
            'Avoid water insoluble silicones, caution for othersilicones',
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
        },
        {
          title: "Silicones with a 'ppg' (or sometimes 'pg')prefix",
          ingredients: ['PEG/PPG-18/18 Dimethicone'],
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
