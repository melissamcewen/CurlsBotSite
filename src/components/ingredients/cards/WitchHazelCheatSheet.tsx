import { CheatSheet } from '../CheatSheet';

const WitchHazelCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Witch Hazel"
      titleURL="/categories/astringents"
      description="One of the most controversial ingredients the community. Most witch hazel contains alcohol. As an astringent, it can be drying to the scalp for some people."
      sources={[
        {
          source: 'Curlsbot',
          status: 'caution',
          link: '/',
          description: 'Caution',
        },
        {
          source: 'Tightly Curly',
          link: 'https://amzn.to/3ZQq707',
          status: 'caution',
          description: 'Ok in products you rinse out',
        },
      ]}
      identificationSections={[
        {
          title: 'Witch Hazel',
          ingredients: ['Witch Hazel', 'Witch Hazel Extract'],
        },
        {
          title: 'Hamamelis virginiana (scientific name for witch hazel)',
          ingredients: ['Hamamelis Virginiana', 'Hamamelis Virginiana Extract'],
        },
      ]}
    />
  );
};

export default WitchHazelCheatSheet;
