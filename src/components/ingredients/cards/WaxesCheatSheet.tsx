import { CheatSheet } from '../CheatSheet';

const WaxesCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Waxes"
      titleURL="/groups/waxes"
      description="These can build up on hair and may require sulfates to remove completely."
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
          description: 'Caution',
        },
      ]}
      identificationSections={[
        {
          title:
            "Ingredient names with a 'cera' (INCL name for beeswax) prefix",
          ingredients: ['Cera Alba'],
          status: 'warning',
        },
        {
          title: "Ingredient names with a 'cire' (French for wax) prefix",
          ingredients: ["Cire d'abeille"],
          status: 'warning',
        },
        {
          title: "Ingredient names containing 'wax'",
          ingredients: ['Beeswax', 'Candelilla Wax'],
          status: 'warning',
        },
        {
          title: 'Petroleum Jelly and its synonyms, behaves like a wax',
          ingredients: [
            'Petroleum Jelly',
            'Petrolatum',
            'Paraffin Jelly',
            'Mineral Jelly',
          ],
          status: 'warning',
        },
      ]}
      exceptionsSections={[
        {
          title: 'Water soluble waxes which have a peg or ppg prefix',
          ingredients: ['PEG-8 Beeswax'],
        },
        {
          title: "Emulsifying waxes, which aren't really waxes",
          ingredients: ['Emulsifying Wax'],
        },
      ]}
    />
  );
};

export default WaxesCheatSheet;
