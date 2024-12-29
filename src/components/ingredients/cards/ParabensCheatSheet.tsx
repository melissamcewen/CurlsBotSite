import { CheatSheet } from '../CheatSheet';

const ParabensCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Parabens"
      titleURL="/categories/parabens"
      description="These are common preservatives in hair products. Most cosmetic chemists consider them safe, but many curly hair resources recommend avoiding them because of a study that linked them to cancer."
      sources={[
        {
          source: 'Curlsbot',
          status: 'caution',
          link: '/',
          description: 'Caution',
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
          status: 'ok',
          description: 'Ok',
        },
      ]}
      identificationSections={[
        {
          title: 'contains "paraben" in the name',
          ingredients: ['Butylparaben', 'Ethylparaben', 'Isobutylparaben', 'Methylparaben', 'Propylparaben'],
        },


      ]}
    />
  );
};

export default ParabensCheatSheet;
