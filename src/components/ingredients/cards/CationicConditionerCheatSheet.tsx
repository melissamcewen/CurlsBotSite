import { CheatSheet } from '../CheatSheet';

const CationicConditionerCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Cationic Conditioners"
      titleURL="/categories/conditioning-agents"
      description="These are helpful ingredients for curly hair, especially for high porosity hair. Being cationic (positively charged), they can bond to damaged hair, protecting and smoothing it. They can build up, even the non-silicone ones."
      sources={[
        {
          source: 'Curlsbot',
          status: 'good',
          link: '/',
        },
        {
          source: 'Tightly Curly',
          link: 'https://amzn.to/3ZQq707',
          status: 'good',
        },
      ]}
      identificationSections={[
        {
          title: 'Ends with "-onium chloride/bromide"',
          ingredients: [
            'Behentrimonium Chloride',
            'Cetrimonium Chloride',
            'Cetrimonium Bromide',
          ],
          status: 'good',
        },
        {
          title: 'Quaternium + number',
          ingredients: ['Quaternium-80', 'Quaternium-18'],
          status: 'good',
        },
        {
          title: 'Polyquaternium + number',
          ingredients: ['Polyquaternium-10', 'Polyquaternium-7'],
          status: 'good',
        },
        {
          title: 'Some silicones (for people not avoiding silicones)',
          ingredients: ['Amodimethicone'],
          status: 'good',
        },
        {
          title: 'Others',
          ingredients: ['Behentrimonium Methosulfate', 'Stearamidopropyl Dimethylamine', 'Guar Hydroxypropyltrimonium Chloride'],
          status: 'good',
        },
      ]}
    />
  );
};

export default CationicConditionerCheatSheet;
