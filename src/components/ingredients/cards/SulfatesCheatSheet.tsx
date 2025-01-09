import { CheatSheet } from '../CheatSheet';

const SulfatesCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Sulfates"
      titleURL="/categories/sulfates"
      description=" The curly hair community and resources often recommend avoiding
        sulfates, because of their reputation for being drying. But it can
        depend on your hair type and the
        formulation."
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
          status: 'warning',
          description: 'Avoid',
        },
      ]}
      identificationSections={[
        {
          title: "Contains 'sulfate' or 'sulphate' in the name, usually at the end as a separate word",
          ingredients: [
            'Sodium Lauryl Sulfate',
            'Tea Lauryl Sulfate',
            'Sodium Coco Sulfate',
            'Ammonium Lauryl Sulfate',
            'Sodium Laureth Sulfate',
            'Ammonium Cocoyl Sulfate',
            'Sodium Cetearyl Sulfate',
            'Sodium Myreth Sulfate',
          ],
        },
      ]}
      exceptionsSections={[
        {
          title:
            'Behentrimonium methosulfate, which is not a sulfate, it\'s a conditioning ingredient',
          ingredients: ['Behentrimonium Methosulfate'],
        }
      ]}
    />
  );
};

export default SulfatesCheatSheet;
