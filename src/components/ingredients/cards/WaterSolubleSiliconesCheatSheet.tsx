import { CheatSheet } from '../CheatSheet';

const WaterSolubleSiliconesCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Water Soluble Silicones"
      description="These silicones are water soluble so they should be fine for haircare routines that don't contain strong detergents. But some sources recommend avoiding all silicones."
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
          description: 'OK',
        },
      ]}
      identificationSections={[
        {
          title: "Silicones with a 'peg' prefix",
          ingredients: ['PEG-12 Dimethicone'],
        },
        {
          title: "Silicones with a 'ppg' (or sometimes 'pg')prefix",
          ingredients: ['PEG/PPG-18/18 Dimethicone'],
        },
      ]}
    />
  );
};

export default WaterSolubleSiliconesCheatSheet;
