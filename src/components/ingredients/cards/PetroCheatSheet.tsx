import { CheatSheet } from '../CheatSheet';

const PetroCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Petroleum Derived Ingredients"
      description="These are other ingredients build up on hair and may require sulfates to remove completely."
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
        {
          source: 'Tightly Curly',
          link: 'https://amzn.to/3ZQq707',
          status: 'caution',
          description:
            'Caution for Petroleum jelly, Petroleum Oil is listed as OK',
        },
      ]}
      identificationSections={[
        {
          title: 'Petroleum/Mineral Oil and its synonyms',
          ingredients: ['Petroleum', 'Mineral Oil', 'Paraffinum Liquidum'],
        },
        {
          title: 'Petroleum Jelly and its synonyms',
          ingredients: [
            'Petroleum Jelly',
            'Petrolatum',
            'Paraffin Jelly',
            'Mineral Jelly',
          ],
        }
      ]}
    />
  );
};

export default PetroCheatSheet;
