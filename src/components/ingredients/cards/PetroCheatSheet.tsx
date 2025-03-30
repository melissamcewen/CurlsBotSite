import { CheatSheet } from '../CheatSheet';

const PetroCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Petroleum Derived Ingredients"
      titleURL="/categories/petroleum-oils"
      description="These are petroleum based ingredients that are often avoided for their build up potential as well as their petro-based origin."
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
 
      ]}
    />
  );
};

export default PetroCheatSheet;
