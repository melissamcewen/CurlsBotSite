import { CheatSheet } from '../CheatSheet';

const OtherDetergentsCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Other Detergents"
      titleURL="/groups/surfactants"
      description="These aren't sulfates, but they are confusing! Curlsbot will be revisiting their classification in the future."
      sources={[
        {
          source: 'Curlsbot',
          status: 'caution',
          link: '/',
          description: 'Varies',
        },
        {
          source: 'Tightly Curly',
          link: 'https://amzn.to/3ZQq707',
          status: 'caution',
          description: 'Varies',
        },
      ]}
      identificationSections={[
        {
          title: 'Contains "sulfosuccinate"',
          ingredients: ['Disodium Laureth Sulfosuccinate'],
        },
        {
          title: 'Contains "glutamate"',
          ingredients: ['Sodium Cocoyl Glutamate'],
        },
        {
          title: 'Contains "sulfonate"',
          ingredients: ['Sodium C14-16 Olefin Sulfonate'],
        },
        {
          title: 'Contains "sarcosinate"',
          ingredients: ['Sodium Lauroyl Sarcosinate'],
        },
        {
          title: 'Contains "isethionate"',
          ingredients: ['Sodium Lauroyl Methyl Isethionate'],
        },
      ]}
      exceptionsSections={[
        {
          title: 'hydroxysultaine',
          ingredients: ['Cocamidopropyl hydroxysultaine'],
        },
        {
          title: 'amphoacetate',
          ingredients: ['Sodium cocoamphoacetate', 'Sodium Lauroamphoacetate'],
        },
        {
          title: 'betaine',
          ingredients: [
            'Babassuamidopropyl betaine',
            'Cocamidopropyl betaine',
            'Coco betaine',
            'Coconut betaine',
          ],
        },
        {
          title: 'glucoside (not amphoteric, but still considered mild)',
          ingredients: [
            'Decyl Glucoside',
            'Cocamidopropyl Glucoside',
            'Caprylyl Glucoside',
            'Sodium Cocoyl Glucoside',
            'Caprylyl/Capryl Glucoside',
            'Lauryl Glucoside',
          ],
        },
      ]}
      exceptionsDescription="Most of these detergents are amphoteric, and are considered mild by most sources. They may still be avoided if you're following 'no-poo' or cowashing routine."
    />
  );
};

export default OtherDetergentsCheatSheet;
