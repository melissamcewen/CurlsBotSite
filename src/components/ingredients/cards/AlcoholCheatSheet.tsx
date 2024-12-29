import { CheatSheet } from '../CheatSheet';

const AlcoholCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Alcohols"
      description="The alcohols that the curly hair community typically recommends avoiding are short-chain alcohols. These have a reputation for being drying, but are likely fine in small amounts or in products that evaporate quickly."
      sources={[
        {
          source: 'Curlsbot',
          status: 'caution',
          link: '/',
          description: 'Caution (Depends on the product)',
        },
        {
          source: 'Curly Girl Handbook',
          link: 'https://amzn.to/405OSqw',
          status: 'warning',
          description: 'Avoid short chain, emollient alcohols ok',
        },
        {
          source: 'Tightly Curly',
          link: 'https://amzn.to/3ZQq707',
          status: 'warning',
          description: 'Avoid except for emolllient/preservative alcohols',
        },
      ]}
      identificationSections={[
        {
          title: 'contains "alcohol" in the name',
          ingredients: [
            'Ethyl Alcohol',
            'Grain Alcohol',
            'Isopropyl Alcohol',
            'Propyl Alcohol',
            'Alcohol Denat',
            'SD Alcohol',
          ],
        },
        {
          title: 'Isopropyl alcohol synonyms',
          ingredients: ['Isopropanol', '2-propanol'],
        },
      ]}
      exceptionsDescription="These alcohols are known as fatty or emollient alcohols and are good for the hair as they have a moisturizing effect."
      exceptionsSections={[
        {
          title: 'Isocetyl Alcohol',
          ingredients: ['Isocetyl Alcohol', 'Isohexadecanol'],
        },
        {
          title: 'Cetyl Alcohol',
          ingredients: [
            'Cetyl Alcohol',
            'Palmityl Alcohol',
            'Hexadecyl Alcohol',
            'Palmitoryl Alcohol',
            'C16 Alcohol',
          ],
        },
        {
          title: 'Lauryl Alcohol',
          ingredients: ['Lauryl Alcohol', 'Dodecyl alcohol'],
        },
        {
          title: 'Oleyl Alcohol',
          ingredients: ['Oleyl Alcohol', 'Oleic Alcohol'],
        },
        {
          title: 'Stearyl Alcohol',
          ingredients: [
            'Stearyl Alcohol',
            'Stearoyl Alcohol',
            'Steareth Alcohol',
          ],
        },
        {
          title: 'Others',
          ingredients: [
            'Isostearyl Alcohol',
            'Lanolin alcohol',
            'Myristyl Alcohol',
            'Undecyl Alcohol',
            'Brassica Alcohol',
            'C12-15 Alcohols',
            'C12-16 Alcohols',
            'Coconut Alcohol',
            'Decyl Alcohol',
            'Hydrogenated Rapeseed Alcohol',
            'Jojoba Alcohol',
            'Tridecyl Alcohol',
          ],
        }
      ]}
    />
  );
};

export default AlcoholCheatSheet;
