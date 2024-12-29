import { CheatSheet } from '../CheatSheet';

const SoapCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Soap"
      titleURL="/categories/soaps"
      description="Can be as drying as sulfates and cause build-up especially if you have hard water."
      sources={[
        {
          source: 'Curlsbot',
          status: 'warning',
          link: '/categories/soaps',
          description: 'Avoid',
        },

        {
          source: 'Tightly Curly',
          link: 'https://amzn.to/3ZQq707',
          status: 'warning',
          description: 'Avoid',
        },
      ]}
      identificationSections={[
        {
          title: 'contains "saponified" which is the process of making soap',
          ingredients: ['Saponified Cocos Nucifera Oil'],
        },
        {
          title: 'soap',
          ingredients: ['Soap'],
        },
        {
          title:
            "Sodium carboxylate (this isn't soap but often a clue alongside other ingredients that a product is a soap)",
          ingredients: ['Sodium Carboxylate'],
        },
        {
          title:
            'Contains "Sodium palm" (these ingredients aren\'t soap but often a clue alongside other ingredients that a product is a soap)',
          ingredients: ['Sodium Palm Kernelate'],
        },
        {
          title:
            "potassium hydroxide (this isn't soap but often a clue alongside other ingredients that a product is a soap)",
          ingredients: ['Potassium Hydroxide'],
        },
      ]}
    />
  );
};

export default SoapCheatSheet;
