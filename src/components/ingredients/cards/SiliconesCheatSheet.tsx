import { CheatSheet } from '../CheatSheet';
import { StarIcon } from '@heroicons/react/24/solid';

const SiliconesCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Water Insoluble Silicones"
      description="These are generally avoided in the curly hair community due to potential build-up. They may require stronger detergents to remove."

      sources={[
        {
          source: 'Curlsbot',
          status: 'warning',
          link: '/',
          description: 'Avoid',
        },
        {
          source: 'Curly Girl Handbook',
          link: 'https://amzn.to/405OSqw',
          status: 'warning',
          description: 'Avoid',
        },
      ]}
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
