/**
 * Represents a reference usage with optional notes
 */
export interface ReferenceUsage {
  id: string;
  notes?: string;
}

/**
 * Represents a collection of references
 */
export type References = Record<string, Reference>;

/**
 * Represents a reference link with optional metadata
 */
export interface Reference {
  /** The ID of the reference */
  id: string;
  /** The URL of the reference */
  url: string;
  /** Optional title of the reference */
  title?: string;
  /** Optional description of what this reference proves/shows */
  description?: string;
  /** Optional date of the reference */
  date?: string;
  /** Optional author of the reference */
  author?: string;
  /** Optional source of the reference */
  source?: string;
  /** Type of reference */
  type?: 'science' | 'hairpro' | 'author' | 'other' | 'industry';
  /** status of the reference */
  status?: 'ok' | 'caution' | 'warning' | 'good';
}

export const defaultReferences: References = {
  '1': {
    id: '1',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4387693/',
    type: 'science',
    title: 'Hair Cosmetics: An Overview',
    author: 'Dias M.',
    date: '2015',
    source: 'International Journal of Trichology',
  },
  '2': {
    id: '2',
    url: 'https://thebeautybrains.com/2014/04/why-is-there-isopropyl-alcohol-in-my-conditioner/',
    type: 'science',
    title: 'Why is there isopropyl alcohol in my conditioner?',
    author: 'Romanowski P.',
    date: '2014',
    source: 'The Beauty Brains',
  },
  '3': {
    id: '3',
    url: 'https://labmuffin.com/how-bad-is-alcohol-in-skincare-really/',
    type: 'science',
    title: 'How Bad is Alcohol in Skincare Really?',
    author: 'Wong M.',
    date: '2023',
    source: 'Lab Muffin',
  },
  '4': {
    id: '4',
    url: 'https://science-yhairblog.blogspot.com/2013/05/alcohol-in-hair-sprays.html',
    type: 'science',
    title: 'Science-y Hair Blog: Alcohol in Hair Sprays',
    source: 'Science-y Hair Blog',
    date: '2013',
  },
  '5': {
    id: '5',
    url: 'http://www.tightlycurly.com/ingredients/',
    type: 'author',
    title: 'Tightly Curly Ingredients',
    source: 'Tightly Curly',
    date: '2010',
  },
  '6': {
    id: '6',
    url: 'https://amzn.to/41QrGxJ',
    title: 'Curly Girl: The Handbook',
    date: '2011',
    type: 'hairpro',
    author: 'Massey L.',
  },
  '7': {
    id: '7',
    url: 'https://thebeautybrains.com/2006/05/the-perils-of-parabens/',
    title: 'The Perils of Parabens',
    type: 'science',
    author: 'Romanowski P.',
    date: '2006',
    source: 'The Beauty Brains',
  },
  '8': {
    id: '8',
    url: 'https://incidecoder.com/ingredients/parabens',
    title: 'Parabens',
    type: 'science',
    date: '2024',
    source: 'INCIDecoder',
  },
  '9': {
    id: '9',
    url: 'https://labmuffin.com/should-you-be-avoiding-parabens-the-science/',
    title: 'Should You Be Avoiding Parabens? The Science',
    type: 'science',
    author: 'Wong M.',
    date: '2017',
    source: 'Lab Muffin Beauty Science',
  },
  '10': {
    id: '10',
    url: 'https://labmuffin.com/the-science-of-hair-products-shampoo-and-conditioner-with-video/',
    title: 'The Science of Hair Products: Shampoo and Conditioner',
    type: 'science',
    author: 'Wong M.',
    date: '2022',
    source: 'Lab Muffin Beauty Science',
  },
  '11': {
    id: '11',
    url: 'https://thebeautybrains.com/2008/07/should-my-shower-stay-sulfate-free/',
    title: 'The Beauty Brains: Should my shower stay sulfate-free?',
    type: 'science',
    author: 'Romanowski P.',
    date: '2008',
    source: 'The Beauty Brains',
  },
  '12': {
    id: '12',
    url: 'https://science-yhairblog.blogspot.com/2011/08/shampoos-harsh-mild-and-otherwise.html',
    type: 'science',
    title: 'Science-y Hair Blog: Shampoos: Harsh, Mild, and Otherwise',
    author: 'Wendy M.S.',
    date: '2011',
    source: 'Science-y Hair Blog',
  },
  '13': {
    id: '13',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/macp.202200420',
    type: 'science',
    title:
      'Shampoo Science: A Review of the Physiochemical Processes behind the Function of a Shampoo',
    author: 'Thompson, C.J.',
    date: '2022',
    source: 'Macromolecular Chemistry and Physics',
  },
  '14': {
    id: '14',
    title: 'Silicone Polymers in Skin Care',
    url: 'https://link.springer.com/article/10.1557/mrs2007.167',
    type: 'science',
    author: 'Anthony J. O’Lenick Jr. & Kevin A. O’Lenick',
    date: '2011',
    source: 'MRS Bulletin',
  },
  '15': {
    id: '15',
    url: 'https://science-yhairblog.blogspot.com/2014/04/silicone-ingredient-solubility-list.html',
    title: 'Science-y Hair Blog',
    description:
      'varies, discusses the different water solubilities of different silicones',
    type: 'science',
    author: 'Wendy M.S.',
    date: '2014',
    source: 'Science-y Hair Blog',
  },
  '16': {
    id: '16',
    url: 'https://labmuffin.com/silicone-mythbusting-with-video/',
    title: ' Silicone Mythbusting',
    type: 'science',
    author: 'Wong M.',
    date: '2019',
    source: 'Lab Muffin Beauty Science',
  },
  '17': {
    id: '17',
    url: 'https://thebeautybrains.com/2007/01/are-silicones-bad-for-your-hair/',
    title: 'The Beauty Brains',
    type: 'science',
    author: 'Romanowski P.',
    date: '2007',
    source: 'The Beauty Brains',
  },
  '18': {
    id: '18',
    url: 'https://science-yhairblog.blogspot.com/2014/04/silicone-ingredient-solubility-list.html',
    title: 'Science-y Hair Blog',
    description:
      'varies, discusses the different water solubilities of different silicones',
    type: 'science',
    author: 'Wendy M.S.',
    date: '2014',
    source: 'Science-y Hair Blog',
  },
  '19': {
    id: '19',
    url: 'https://link.springer.com/article/10.1134/S1560090423600201',
    type: 'science',
    title: 'Silicones in Cosmetics',
    author: 'Ivanova, E.V. et al.',
    source: 'Polymer Science, Series B',
    date: '2024',
  },
  '20': {
    id: '20',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4171909/',
    type: 'science',
    title:
      'Evaluation of pH of Bathing Soaps and Shampoos for Skin and Hair Care',
    author: 'Tarun, J. et al.',
    source: 'Indian Journal of Dermatology',
    date: '2014',
  },
  '21': {
    id: '21',
    url: 'https://www.usgs.gov/faqs/why-does-it-take-so-long-rinse-soap-my-hands-what-are-hard-water-and-soft-water',
    type: 'science',
    source: 'United States Geological Survey',
    date: '2022',
    title:
      'Why does it take so long to rinse soap off my hands? What are hard water and soft water?',
    author: 'United States Geological Survey',
  },
  '22': {
    id: '22',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8954092/',
    type: 'science',
    title: 'Skin Cleansing without or with Compromise: Soaps and Syndets',
    author: 'Mijaljica, D. et al.',
    source: 'Molecules',
    date: '2022',
  },
  '23': {
    id: '23',
    url: 'https://labmuffin.com/amodimethicone-my-new-favourite-hair-ingredient/',
    title: 'Lab Muffin: Amodimethicone - My New Favourite Hair Ingredient',
    type: 'science',
    author: 'Wong M.',
    date: '2019',
    source: 'Lab Muffin Beauty Science',
  },
  '24': {
    id: '24',
    url: 'https://www.researchgate.net/publication/383884298_The_Effectiveness_of_Aloe_Vera_in_Multiple_Moist_Spray_Products_as_a_Hair_Tonic_to_Reduce_Students_Scalp_Irritation',
    title:
      'The Effectiveness of Aloe Vera in Multiple Moist Spray Products as a Hair Tonic to Reduce Students Scalp Irritation',
    description:
      "cites a study that hasn't be translated into into English that linked pomade to fungal growth",
    type: 'science',
    author: 'Setiawan, Mochammad',
    source: 'Jurnal Kesehatan Komunitas Indonesia',
    date: '2024',
  },
  '25': {
    id: '25',
    url: 'https://science-yhairblog.blogspot.com/2013/06/oils-which-ones-soak-in-vs-coat-hair.html',
    title: 'Oils – Which Ones Soak In vs. Coat the Hair?',
    type: 'science',
    author: 'Wendy M.S.',
    date: '2013',
    source: 'Science-y Hair Blog',
  },
  '26': {
    id: '26',
    url: 'https://link.springer.com/article/10.1186/s40691-023-00332-0',
    title:
      'Determination of penetration and protection of fatty acids in bleached hair according to the fatty acid chain length and the application to understanding the protective effects of MCT oil and coconut oil',
    type: 'science',
    author: 'Kim, Suhwan, and Cheunsoon Ahn.',
    date: '2023',
    source: 'Fashion & Textiles',
  },
  '27': {
    id: '27',
    url: 'https://www.mdpi.com/2079-9284/11/2/64',
    title:
      'Impact of Hair Damage on the Penetration Profile of Coconut, Avocado, and Argan Oils into Caucasian Hair Fibers',
    type: 'science',
    author: 'Lourenço, C. et al.',
    date: '2024',
    source: 'Cosmetics',
  },
  '28': {
    id: '28',
    url: 'https://science-yhairblog.blogspot.com/2015/02/glycerin-and-humidity.html',
    title: 'Glycerin and Humidity',
    description:
      "Humectants grab water out of air, but if air doesn't have enough water (dry weather), it can become brittle and create friction, which can mean frizz. Theoretically this could dehydrate hair. Oils can slow water loss. Notes that glycerin can be paired with emollients and film-formers to slow water loss. Caveats that none of this is well studied.",
    type: 'science',
    author: 'Wendy M.S.',
    date: '2015',
    source: 'Science-y Hair Blog',
  },
  '29': {
    id: '29',
    url: 'https://science-yhairblog.blogspot.com/2014/07/film-forming-humectants-what-they-are.html',
    title: 'Film Forming Humectants - What They Are and Why You Need Them',
    type: 'science',
    author: 'Wendy M.S.',
    date: '2014',
    source: 'Science-y Hair Blog',
  },
  '30': {
    id: '30',
    url: 'https://www.taylorfrancis.com/books/mono/10.1201/b16716/handbook-cosmetic-science-technology-andr%C3%A9-barel-marc-paye-howard-maibach',
    title: 'Handbook of Cosmetic Science and Technology',
    date: '2014',
    author: 'Barel A. et al.',
    type: 'science',
  },
  '31': {
    id: '31',
    url: 'https://labmuffin.com/skincare-chemistry-which-ingredients-are-humectants/',
    title: 'Skincare Chemistry: How to pick out humectants',
    type: 'science',
    author: 'Wong M.',
    date: '2019',
    source: 'Lab Muffin Beauty Science',
  },
  '32': {
    id: '32',
    url: 'https://thebeautybrains.com/2014/01/whats-the-best-moisturizer/',
    title: "The Beauty Brains: What's the best moisturizer?",
    type: 'science',
    author: 'Schueller R.',
    date: '2014',
    source: 'The Beauty Brains',
  },
  '33': {
    id: '33',
    url: 'https://incidecoder.com/ingredients/benzyl-alcohol',
    title: 'Benzyl Alcohol',
    type: 'science',
    source: 'INCIDecoder',
  },
  '34': {
    id: '34',
    url: 'https://incidecoder.com/ingredients/cinnamyl-alcohol',
    title: 'Cinnamyl Alcohol',
    type: 'science',
    source: 'INCIDecoder',
  },
  '35': {
    id: '35',
    url: 'https://incidecoder.com/ingredients/phenethyl-alcohol',
    title: 'Phenethyl Alcohol',
    type: 'science',
    source: 'INCIDecoder',
  },
  '36': {
    id: '36',
    url: 'https://incidecoder.com/ingredients/alcohol-denat',
    title: 'Alcohol Denat',
    description:
      'Says it can be drying if its in the first few ingredients of a product',
    type: 'science',
    source: 'INCIDecoder',
  },
  '37': {
    id: '37',
    url: 'https://incidecoder.com/ingredients/emulsifying-wax',
    title: 'Emulsifying Wax',
    type: 'science',
    source: 'INCIDecoder',
    description:
      "This isn't an INCI ingredient, they think it's a mix of Cetearyl Alcohol (and) Polysorbate 60",
  },
  '38': {
    id: '38',
    url: 'https://www.paulaschoice.com/ingredient-dictionary/ingredient-sodium-laureth-sulfate.html',
    title: 'Sodium Laureth Sulfate',
    type: 'author',
    author: 'Stordahl, D.',
    date: '2021',
    source: "Paula's Choice Ingredient Dictionary",
  },
  '39': {
    id: '39',
    url: 'https://incidecoder.com/ingredients/sodium-laureth-sulfate',
    title: 'Sodium Laureth Sulfate',
    type: 'science',
    source: 'INCIDecoder',
  },
  '41': {
    id: '41',
    url: 'https://incidecoder.com/ingredients/sodium-lauryl-sulfate',
    title: 'Sodium Lauryl Sulfate',
    type: 'science',
    source: 'INCIDecoder',
  },
  '42': {
    id: '42',
    url: 'https://www.paulaschoice.com/ingredient-dictionary/ingredient-sodium-lauryl-sulfate.html',
    title: 'Sodium Lauryl Sulfate',
    type: 'author',
    author: 'Paula’s Choice Research & Education Team',
    date: '2023',
    source: "Paula's Choice Ingredient Dictionary",
  },
  '43': {
    id: '43',
    url: 'https://www.epa.gov/saferchoice/safer-ingredients',
    title: 'EPA Safer Choice',
    type: 'science',
    source: 'EPA',
    date: '2025',
  },
  '44': {
    id: '44',
    url: 'https://thebeautybrains.com/2007/06/sulfates-in-shampoos-what-are-they/',
    title: 'Sulfates in Shampoos: What Are They?',
    type: 'science',
    author: 'The Beauty Brains',
    date: '2007',
    source: 'The Beauty Brains',
  },
  '45': {
    id: '45',
    url: 'https://incidecoder.com/ingredients/behentrimonium-chloride',
    title: 'Behentrimonium Chloride',
    type: 'science',
    source: 'INCIDecoder',
  },
  '46': {
    id: '46',
    url: 'https://incidecoder.com/ingredients/cetrimonium-chloride',
    title: 'Cetrimonium Chloride',
    type: 'science',
    source: 'INCIDecoder',
  },
  '47': {
    id: '47',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38922913/',
    title: 'Penetration of oils into hair',
    description:
      'Found that camellia oil can penetrate the hair shaft  at a low-moderate level compared to high penetration oils like coconut. It also found that safflower oil was just as good as coconut oil at preventing damage.',
    type: 'science',
    author: 'Marsh, J.M. et al.',
    date: '2024',
    source: 'International Journal of Cosmetic Science',
  },
  '48': {
    id: '48',
    url: 'https://link.springer.com/article/10.1186/s40691-021-00282-5',
    title:
      'Effect of rinse-off hair conditioner containing argan oil or camellia oil on the recovery of hair damaged by bleaching',
    description:
      'Study found argan oil was effective at protecting bleached hair from damage, moreso than camellia oil',
    type: 'science',
    date: '2022',
    source: 'Fashion & Textiles',
    author: 'Si Hyun Lee & Cheunsoon Ahn',
  },
  '49': {
    id: '49',
    url: 'https://www.cir-safety.org/sites/default/files/TAR_Lanolin_032024.pdf',
    title:
      'Amended Safety Assessment of Lanolin-Derived Ingredients as Used in Cosmetics',
    description:
      'Based on this analysis, lanolin seems to have a low percentage of fats that could penetrate the hair shaft',
    type: 'science',
    author: 'CIR',
    date: '2024',
    source: 'Cosmetic Ingredient Review',
  },
  '50': {
    id: '50',
    url: 'https://pubmed.ncbi.nlm.nih.gov/6229554/',
    title:
      'Comedogenicity of current therapeutic products, cosmetics, and ingredients in the rabbit ear',
    type: 'science',
    author: 'Fulton, J.E. et al.',
    date: '1984',
    source: 'J Am Acad Dermatol',
  },
  '51': {
    id: '51',
    url: 'https://incidecoder.com/ingredients/citric-acid',
    title: 'Citric Acid',
    type: 'science',
    source: 'INCIDecoder',
  },
  '52': {
    id: '52',
    url: 'https://incidecoder.com/ingredients/sodium-hyaluronate',
    title: 'Sodium Hyaluronate',
    description:
      "Says it's a huge polymer with a very large water holding capacity",
    type: 'science',
    source: 'INCIDecoder',
  },
  '53': {
    id: '53',
    url: 'https://incidecoder.com/ingredients/pca',
    title: 'PCA',
    type: 'science',
    source: 'INCIDecoder',
  },
  '54': {
    id: '54',
    url: 'http://www.tightlycurly.com/ingredients/magnesium_sulfate',
    title: 'Magnesium Sulfate',
    type: 'author',
    author: 'Tightly Curly',
    date: '2010',
  },
  '55': {
    id: '55',
    url: 'https://www.curlynikki.com/magnesium-sulfate-curly-friend-or-foe.html',
    title: 'Magnesium Sulfate- Curly Friend or Foe?',
    type: 'author',
    author: 'McKay, Tonya',
    date: '2021',
    source: 'Curly Nikki',
  },
  '56': {
    id: '56',
    url: 'https://ijdvl.com/scanning-electron-microscopy-study-of-hair-shaft-changes-related-to-hardness-of-water/',
    title:
      'Scanning electron microscopy study of hair shaft changes related to hardness of water',
    type: 'science',
    author: 'Alahmmed, L.M. et al.',
    date: '2017',
    source: 'Indian Journal of Dermatology, Venereology & Leprology',
  },
  '57': {
    id: '57',
    url: 'https://www.wholesalesuppliesplus.com/handmade101/learn-to-make-articles/a-chemists-perspective-on-luxglide-n5-and-n350.aspx',
    title: "A Chemist's Perspective on LuxGlide N5 & N350",
    type: 'industry',
    author: 'Wholesale Supplies Plus',
    date: '2018',
    source: 'Wholesale Supplies Plus',
  },
  '58': {
    id: '58',
    url: 'https://incidecoder.com/ingredients/diheptyl-succinate',
    title: 'Diheptyl Succinate',
    type: 'science',
    source: 'INCIDecoder',
  },
  '59': {
    id: '59',
    url: 'https://www.happi.com/unique-styling-products-via-maltodextrinvp/',
    title: 'Unique Styling Products Via Maltodextrin/VP',
    type: 'industry',
    date: '2012',
    source: 'Happi',
    author: 'Evers, A. et al.',
  },
  '60': {
    id: '60',
    url: 'https://incidecoder.com/ingredients/vp-va-copolymer',
    title: 'VP/​VA Copolymer',
    type: 'science',
    source: 'INCIDecoder',
  },
  '61': {
    id: '61',
    url: 'https://incidecoder.com/ingredients/dimethicone',
    title: 'Dimethicone',
    type: 'science',
    source: 'INCIDecoder',
  },
  '62': {
    id: '62',
    url: 'https://science-yhairblog.blogspot.com/2012/04/seasons-are-changing-dewpoint-visual-aid.html',
    title: 'Seasons are Changing - Dewpoint Visual Aid',
    source: 'Science-y Hair Blog',
    type: 'science',
    date: '2012',
    author: 'Wendy M.S.',
  },
  '63': {
    id: '63',
    url: 'https://amzn.to/4hd4Tko',
    title: 'Humectants in Personal Care Formulation',
    type: 'science',
    date: '1999',
    author: 'Gesslein, B.W.',
    source: 'Conditioning Agents for Hair and Skin',
  },
  '64': {
    id: '64',
    url: 'https://amzn.to/4hd4Tko',
    title: 'Proteins for Conditioning Hair and Skin',
    type: 'science',
    date: '1999',
    author: 'Neudahl, G.',
    source: 'Conditioning Agents for Hair and Skin',
  },
  '65': {
    id: '65',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4158629/',
    title: 'The Shampoo pH can Affect the Hair: Myth or Reality?',
    type: 'science',
    author:
      'Gavazzoni Dias, Maria Fernanda Reis, Andréia Munck de Almeida, Patricia Makino Rezende Cecato, Andre Ricardo Adriano, and Janine Pichler',
    date: '2014',
    source: 'International Journal of Trichology',
  },
};
