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

  '66': {
    id: '66',
    url: 'https://www.swiftcraftymonkey.blog/shampoo-why-we-use-what-we-use-in-a-shampoo/',
    title: 'Shampoo: Why we use what we use in a shampoo',
    type: 'science',
    author: 'Susan Barclay Nichols',
    date: '2015',
    source: 'Swift Craftymonkey',
  },
  '67': {
    id: '67',
    url: 'https://www.routledge.com/Handbook-of-Cosmetic-Science-and-Technology/Dreher-Jungman-Sakamoto-Maibach/p/book/9780367469979',
    title: 'Principles and Mechanisms of Skin Irritation',
    type: 'science',
    author: 'An E. Goossens',
    date: '2022',
    source: 'Handbook of Cosmetic Science and Technology',
  },
  '68': {
    id: '68',
    url: 'https://cdn.mdedge.com/files/s3fs-public/Document/January-2018/CT101001022.PDF',
    title:
      'No Sulfates, No Parabens, and the “No-Poo” Method: A New Patient Perspective on Common Shampoo Ingredients',
    type: 'science',
    author: 'Cline, Abigail, et al.',
    date: '2018',
    source: 'Cutis',
  },
  '69': {
    id: '69',
    url: 'https://incidecoder.com/ingredients/ammonium-lauryl-sulfate',
    title: 'Ammonium Lauryl Sulfate',
    type: 'science',
    source: 'INCIDecoder',
  },
  /* Koch, Sandra L., Arslan Zaidi, Tomás González, Mark D. Shriver, and Nina G. Jablonski. “The Trotter Collection: A Review of Mildred Trotter ’s Hair Research and an Update for Studies of Human Variation.” American Journal of Biological Anthropology 184, no. 3 (July 2024): e24930. https://doi.org/10.1002/ajpa.24930.*/
  '70': {
    id: '70',
    url: 'https://doi.org/10.1002/ajpa.24930',
    title:
      'The Trotter Collection: A Review of Mildred Trotter ’s Hair Research and an Update for Studies of Human Variation',
    type: 'science',
    author:
      'Koch, Sandra L., Arslan Zaidi, Tomás González, Mark D. Shriver, and Nina G. Jablonski.',
    date: '2024',
    source: 'American Journal of Biological Anthropology',
  },
  /*
  Robbins, Clarence R. Chemical and Physical Behavior of Human Hair. Berlin, Heidelberg: Springer, 2012. https://doi.org/10.1007/978-3-642-25611-0.
  */
  '71': {
    id: '71',
    url: 'https://doi.org/10.1007/978-3-642-25611-0',
    title: 'Chemical and Physical Behavior of Human Hair',
    type: 'science',
    author: 'Robbins, Clarence R.',
    date: '2012',
    source: 'Springer',
  },
  /*Cloete, Elsabe, Nonhlanhla P. Khumalo, and Malebogo N. Ngoepe. “The What, Why and How of Curly Hair: A Review.” Proceedings of the Royal Society A: Mathematical, Physical and Engineering Sciences 475, no. 2231 (November 20, 2019): 20190516. https://doi.org/10.1098/rspa.2019.0516.*/
  '72': {
    id: '72',
    url: 'https://doi.org/10.1098/rspa.2019.0516',
    title: 'The What, Why and How of Curly Hair: A Review',
    type: 'science',
    author: 'Cloete, Elsabe, Nonhlanhla P. Khumalo, and Malebogo N. Ngoepe.',
    date: '2019',
    source:
      'Proceedings of the Royal Society A: Mathematical, Physical and Engineering Sciences',
  },
  /* Lasisi, Tina. “THE GENETIC ARCHITECTURE AND EVOLUTIONARY FUNCTION OF HUMAN SCALP HAIR MORPHOLOGY,” n.d.
  “The Genetic Architecture and Evolutionary Function of Human Scalp Hair Morphology - Blacklight.” Accessed March 6, 2025. https://etda.libraries.psu.edu/catalog/18747tpl5158.
  */
  '73': {
    id: '73',
    url: 'https://etda.libraries.psu.edu/catalog/18747tpl5158',
    title:
      'The Genetic Architecture and Evolutionary Function of Human Scalp Hair Morphology',
    type: 'science',
    author: 'Lasisi, Tina.',
    date: '2021',
    source:
      ' The Pennsylvania State University ProQuest Dissertations & Theses,',
  },
  /*Irizarry, Yasmiyn. The Irizarry Hair Texture Scale, 2025. https://doi.org/10.31235/osf.io/u4zkh_v2.
   */
  '74': {
    id: '74',
    url: 'https://doi.org/10.31235/osf.io/u4zkh_v2',
    title: 'The Irizarry Hair Texture Scale',
    type: 'science',
  },
  /* “The Hair Chart - 99% Invisible.” Accessed March 6, 2025. https://99percentinvisible.org/episode/the-hair-chart/.
   */
  '75': {
    id: '75',
    url: 'https://99percentinvisible.org/episode/the-hair-chart/',
    title: 'The Hair Chart',
    type: 'other',
    author: 'Leila Day and Hana Baba',
    date: '2025',
    source: '99% Invisible',
  },
  /* Mettrie, Roland, Didier Saint-Léger, Geneviève Loussouarn, Annelise Garcel, Crystal Porter, and Andre Langaney. “Shape Variability and Classification of Human Hair: A Worldwide Approach.” Human Biology 79 (July 1, 2007): 265–81. https://doi.org/10.1353/hub.2007.0045.*/
  '76': {
    id: '76',
    url: 'https://doi.org/10.1353/hub.2007.0045',
    title:
      'Shape Variability and Classification of Human Hair: A Worldwide Approach',
    type: 'science',
    author:
      'Mettrie, Roland, Didier Saint-Léger, Geneviève Loussouarn, Annelise Garcel, Crystal Porter, and Andre Langaney.',
    date: '2007',
    source: 'Human Biology',
  },
  /*
  Loussouarn, Geneviève, Anne-Lise Garcel, Isabelle Lozano, Catherine Collaudin, Crystal Porter, Ségolène Panhard, Didier Saint-Léger, and Roland De La Mettrie. “Worldwide Diversity of Hair Curliness: A New Method of Assessment.” International Journal of Dermatology 46, no. s1 (2007): 2–6. https://doi.org/10.1111/j.1365-4632.2007.03453.x.
 */
  '77': {
    id: '77',
    url: 'https://doi.org/10.1111/j.1365-4632.2007.03453.x',
    title: 'Worldwide Diversity of Hair Curliness: A New Method of Assessment',
    type: 'science',
    author:
      'Loussouarn, Geneviève, Anne-Lise Garcel, Isabelle Lozano, Catherine Collaudin, Crystal Porter, Ségolène Panhard, Didier Saint-Léger, and Roland De La Mettrie.',
    date: '2007',
    source: 'International Journal of Dermatology',
  },
  /* Gaines, Michelle K., Imani Y. Page, Nolan A. Miller, Benjamin R. Greenvall, Joshua J. Medina, Duncan J. Irschick, Adeline Southard, Alexander E. Ribbe, Gregory M. Grason, and Alfred J. Crosby. “Reimagining Hair Science: A New Approach to Classify Curly Hair Phenotypes via New Quantitative Geometric and Structural Mechanical Parameters.” Accounts of Chemical Research, May 22, 2023. https://doi.org/10.1021/acs.accounts.2c00740.
   */
  '78': {
    id: '78',
    url: 'https://doi.org/10.1021/acs.accounts.2c00740',
    title:
      'Reimagining Hair Science: A New Approach to Classify Curly Hair Phenotypes via New Quantitative Geometric and Structural Mechanical Parameters',
    type: 'science',
    author:
      'Gaines, Michelle K., Imani Y. Page, Nolan A. Miller, Benjamin R. Greenvall, Joshua J. Medina, Duncan J. Irschick, Adeline Southard, Alexander E. Ribbe, Gregory M. Grason, and Alfred J. Crosby.',
    date: '2023',
    source: 'Accounts of Chemical Research',
  },
  /*
  Lasisi, Tina, Arslan A. Zaidi, Timothy H. Webster, Nicholas B. Stephens, Kendall Routch, Nina G. Jablonski, and Mark D. Shriver. “High-Throughput Phenotyping Methods for Quantifying Hair Fiber Morphology.” Scientific Reports 11, no. 1 (June 1, 2021): 11535. https://doi.org/10.1038/s41598-021-90409-x.

  */
  '79': {
    id: '79',
    url: 'https://doi.org/10.1038/s41598-021-90409-x',
    title:
      'High-Throughput Phenotyping Methods for Quantifying Hair Fiber Morphology',
    type: 'science',
    author:
      'Lasisi, Tina, Arslan A. Zaidi, Timothy H. Webster, Nicholas B. Stephens, Kendall Routch, Nina G. Jablonski, and Mark D. Shriver.',
    date: '2021',
    source: 'Scientific Reports',
  },
  /*
  Oladele, Deborah B., Ewa Markiewicz, and Olusola C. Idowu. “The Genomic Variation in Textured Hair: Implications in Developing a Holistic Hair Care Routine.” Cosmetics 11, no. 6 (December 2024): 183. https://doi.org/10.3390/cosmetics11060183.
  */
  '80': {
    id: '80',
    url: 'https://doi.org/10.3390/cosmetics11060183',
    title:
      'The Genomic Variation in Textured Hair: Implications in Developing a Holistic Hair Care Routine',
    type: 'science',
    author: 'Oladele, Deborah B., Ewa Markiewicz, and Olusola C. Idowu.',
    date: '2024',
    source: 'Cosmetics',
  },
  /*
  Berkowitz, Rachel. “The Mechanics of Curly Hair.” Physics 16 (April 20, 2023): 65. https://physics.aps.org/articles/v16/65

  */
  '81': {
    id: '81',
    url: 'https://physics.aps.org/articles/v16/65',
    title: 'The Mechanics of Curly Hair',
    type: 'science',
    author: 'Berkowitz, Rachel.',
    date: '2023',
    source: 'Physics',
  },
  /*
  American Chemical Society. “New Ways to Measure Curls and Kinks Could Make It Easier to Care for Natural Hair.” Accessed March 6, 2025. https://www.acs.org/pressroom/newsreleases/2023/march/new-ways-to-measure-curls-and-kinks-could-make-it-easier-to-care-for-natural-hair.html.

  */
  '82': {
    id: '82',
    url: 'https://www.acs.org/pressroom/newsreleases/2023/march/new-ways-to-measure-curls-and-kinks-could-make-it-easier-to-care-for-natural-hair.html',
    title:
      'New Ways to Measure Curls and Kinks Could Make It Easier to Care for Natural Hair',
    type: 'science',
    author: 'American Chemical Society.',
    date: '2023',
    source: 'American Chemical Society',
  },
  /* Gavazzoni Dias, Maria Fernanda Reis. “Hair Cosmetics: An Overview.” International Journal of Trichology 7, no. 1 (2015): 2–15. https://doi.org/10.4103/0974-7753.153450. */
  '83': {
    id: '83',
    url: 'https://doi.org/10.4103/0974-7753.153450',
    title: 'Hair Cosmetics: An Overview',
    type: 'science',
    author: 'Gavazzoni Dias, Maria Fernanda Reis.',
    date: '2015',
    source: 'International Journal of Trichology',
  },
  /* Chemical & Engineering News. “Reclassifying Curls, Coils, and Kinks.” Accessed March 6, 2025. https://cen.acs.org/acs-news/acs-meeting-news/Reclassifying-curls-coils-kinks/101/web/2023/03. Gina Vitale
   */
  '84': {
    id: '84',
    url: 'https://cen.acs.org/acs-news/acs-meeting-news/Reclassifying-curls-coils-kinks/101/web/2023/03',
    title: 'Reclassifying Curls, Coils, and Kinks',
    type: 'science',
    author: 'Gina Vitale',
    date: '2023',
    source: 'Chemical & Engineering News',
  },
  /*
  Mayo, Tiffany, Jewell Dinkins, and Boni Elewski. “Hair Oils May Worsen Seborrheic Dermatitis in Black Patients.” Skin Appendage Disorders 9, no. 2 (March 7, 2023): 151–52. https://doi.org/10.1159/000527778.

   */
  '85': {
    id: '85',
    url: 'https://doi.org/10.1159/000527778',
    title: 'Hair Oils May Worsen Seborrheic Dermatitis in Black Patients',
    type: 'science',
    author: 'Mayo, Tiffany, Jewell Dinkins, and Boni Elewski.',
    date: '2023',
    source: 'Skin Appendage Disorders',
  },
  /*
  Dobler, Dorota, Thomas Schmidts, Sören Wildenhain, Ilona Seewald, Michael Merzhäuser, and Frank Runkel. “Impact of Selected Cosmetic Ingredients on Common Microorganisms of Healthy Human Skin.” Cosmetics 6, no. 3 (September 2019): 45. https://doi.org/10.3390/cosmetics6030045.

  */
  '86': {
    id: '86',
    url: 'https://doi.org/10.3390/cosmetics6030045',
    title:
      'Impact of Selected Cosmetic Ingredients on Common Microorganisms of Healthy Human Skin',
    type: 'science',
    author:
      'Dobler, Dorota, Thomas Schmidts, Sören Wildenhain, Ilona Seewald, Michael Merzhäuser, and Frank Runkel.',
    date: '2019',
    source: 'Cosmetics',
  },

  /*
  Berg, Claire van den, Nonhlanhla P. Khumalo, and Malebogo N. Ngoepe. “Quantifying Whole Human Hair Scalp Fibres of Varying Curl: A Micro-Computed Tomographic Study.” Journal of Microscopy 297, no. 2 (2025): 227–51. https://doi.org/10.1111/jmi.13365.

  */
  '87': {
    id: '87',
    url: 'https://doi.org/10.1111/jmi.13365',
    title:
      'Quantifying Whole Human Hair Scalp Fibres of Varying Curl: A Micro-Computed Tomographic Study',
    type: 'science',
  },
  /*
  Loussouarn, Geneviève, Isabelle Lozano, Ségolène Panhard, Catherine Collaudin, Charles El Rawadi, and Gilles Genain. “Diversity in Human Hair Growth, Diameter, Colour and Shape. An in Vivo Study on Young Adults from 24 Different Ethnic Groups Observed in the Five Continents.” European Journal of Dermatology 26, no. 2 (March 1, 2016): 144–54. https://doi.org/10.1684/ejd.2015.2726.
*/
  '88': {
    id: '88',
    url: 'https://doi.org/10.1684/ejd.2015.2726',
    title: 'Diversity in Human Hair Growth, Diameter, Colour and Shape',
    type: 'science',
    author:
      'Loussouarn, Geneviève, Isabelle Lozano, Ségolène Panhard, Catherine Collaudin, Charles El Rawadi, and Gilles Genain.',
    date: '2016',
    source: 'European Journal of Dermatology',
  },
  /*
  Nagase, Shinobu. “Hair Structures Affecting Hair Appearance.” Cosmetics 6, no. 3 (September 2019): 43. https://doi.org/10.3390/cosmetics6030043.

  */
  '89': {
    id: '89',
    url: 'https://doi.org/10.3390/cosmetics6030043',
    title: 'Hair Structures Affecting Hair Appearance',
    type: 'science',
    author: 'Nagase, Shinobu.',
    date: '2019',
    source: 'Cosmetics',
  },
  /*
  McMullen, Roger L., Donna Laura, Guojin Zhang, and Bert Kroon. “Investigation of the Interactions of Cationic Guar with Human Hair by Electrokinetic Analysis.” International Journal of Cosmetic Science 43, no. 4 (2021): 375–90. https://doi.org/10.1111/ics.12704.
*/
  '90': {
    id: '90',
    url: 'https://doi.org/10.1111/ics.12704',
    title:
      'Investigation of the Interactions of Cationic Guar with Human Hair by Electrokinetic Analysis',
    type: 'science',
    author: 'McMullen, Roger L., Donna Laura, Guojin Zhang, and Bert Kroon.',
    date: '2021',
    source: 'International Journal of Cosmetic Science',
  },
  /*
  Medland, Sarah E., Dale R. Nyholt, Jodie N. Painter, Brian P. McEvoy, Allan F. McRae, Gu Zhu, Scott D. Gordon, et al. “Common Variants in the Trichohyalin Gene Are Associated with Straight Hair in Europeans.” The American Journal of Human Genetics 85, no. 5 (November 13, 2009): 750–55. https://doi.org/10.1016/j.ajhg.2009.10.009.

*/
  '91': {
    id: '91',
    url: 'https://doi.org/10.1016/j.ajhg.2009.10.009',
    title:
      'Common Variants in the Trichohyalin Gene Are Associated with Straight Hair in Europeans',
    type: 'science',
    author:
      'Medland, Sarah E., Dale R. Nyholt, Jodie N. Painter, Brian P. McEvoy, Allan F. McRae, Gu Zhu, Scott D. Gordon, et al.',
    date: '2009',
  },

  /*
  Walker, Andre. Andre Talks Hair. First Edition. New York, NY: Simon & Schuster, 1997.
*/
  '92': {
    id: '92',
    url: 'https://www.amazon.com/Andre-Talks-Hair-Walker/dp/0684824566',
    title: 'Andre Talks Hair',
    type: 'author',
    author: 'Walker, Andre.',
    date: '1997',
    source: 'Simon & Schuster',
  },

  /*
Bouabbache S, Galliano A, Littaye P, Leportier M, Pouradier F, Gillot E, Panhard S, Loussouarn G. What is a Caucasian 'fine' hair? Comparing instrumental measurements, self-perceptions and assessments from hair experts. Int J Cosmet Sci. 2016 Dec;38(6):581-588. doi: 10.1111/ics.12323. Epub 2016 Apr 26. PMID: 27021923.

*/
  '93': {
    id: '93',
    url: 'https://doi.org/10.1111/ics.12323',
    title: 'What is a Caucasian "fine" hair?',
    type: 'science',
    author:
      'Bouabbache S, Galliano A, Littaye P, Leportier M, Pouradier F, Gillot E, Panhard S, Loussouarn G.',
    date: '2016',
    source: 'International Journal of Cosmetic Science',
  },

  /*
  1. Zhang, D., Baghdadli, N. & Greaves, A. J. Reinforcing chemically treated human hair with citric acid. Int J Cosmet Sci (2025) doi:10.1111/ics.13039.
*/
  '94': {
    id: '94',
    url: 'https://doi.org/10.1111/ics.13039',
    title: 'Reinforcing chemically treated human hair with citric acid',
    type: 'science',
    author: 'Zhang, D., Baghdadli, N. & Greaves, A. J.',
    date: '2025',
    source: 'International Journal of Cosmetic Science',
  },

  /* 1. Marsh, J. M. et al. Multimodal Evidence of Mesostructured Calcium Fatty Acid Deposits in Human Hair and Their Role on Hair Properties. ACS Appl. Bio Mater. 1, 1174–1183 (2018).
   */
  '95': {
    id: '95',
    url: 'https://pubs.acs.org/doi/10.1021/acsabm.8b00386',
    title:
      'Multimodal Evidence of Mesostructured Calcium Fatty Acid Deposits in Human Hair and Their Role on Hair Properties',
    type: 'science',
    author: 'Marsh, J. M. et al.',
    date: '2018',
    source: 'ACS Applied Bio Materials',
  },

  /*
  1. Zviak, C. The Science of Hair Care. (M. Dekker, New York, 1986).
*/
  '96': {
    id: '96',
    url: 'https://www.taylorfrancis.com/books/edit/10.3109/9780203027226/science-hair-care-charles-zviak',
    title: 'The Science of Hair Care',
    type: 'science',
    author: 'Zviak, C.',
    date: '1986',
    source: 'M. Dekker',
  },
  /* 1. Danby, S. G. et al. The Effect of Water Hardness on Surfactant Deposition after Washing and Subsequent Skin Irritation in Atopic Dermatitis Patients and Healthy Control Subjects. J Invest Dermatol 138, 68–77 (2018).
   */
  '97': {
    id: '97',
    url: 'https://www.sciencedirect.com/science/article/pii/S0022202X1732938X',
    title:
      'The Effect of Water Hardness on Surfactant Deposition after Washing and Subsequent Skin Irritation in Atopic Dermatitis Patients and Healthy Control Subjects',
    type: 'science',
    author: 'Danby, S. G. et al.',
    date: '2018',
    source: 'J Invest Dermatol',
  },

  /* https://science-yhairblog.blogspot.com/2016/03/hard-water-and-your-hair.html */
  '98': {
    id: '98',
    url: 'https://science-yhairblog.blogspot.com/2016/03/hard-water-and-your-hair.html',
    title: 'Hard Water and Your Hair',
    type: 'science',
    author: 'Wendy M.S.',
    date: '2016',
    source: 'Science-Y Hair Blog',
  },

  /* Cosmetics and Toiletries. “Your Hair on Acid: The Influence of Carboxylic Acids.” Sep 28th, 2018 https://www.cosmeticsandtoiletries.com/article/your-hair-on-acid-the-influence-of-carboxylic-acids. Trefor Evans, Ph.D., TRI-Princeton, Princeton, New Jersey

  */
  '99': {
    id: '99',
    url: 'https://www.cosmeticsandtoiletries.com/article/your-hair-on-acid-the-influence-of-carboxylic-acids',
    title: 'Your Hair on Acid: The Influence of Carboxylic Acids',
    type: 'science',
    author: 'Trefor Evans, Ph.D., TRI-Princeton, Princeton, New Jersey',
    date: '2018',
    source: 'Cosmetics and Toiletries',
  },
  /* 1. Srinivasan, G., Srinivas, C. R., Mathew, A. C. & Duraiswami, D. Effects of Hard Water on Hair. International Journal of Trichology 5, 137 (2013).
   */
  '100': {
    id: '100',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24574692/',
    title: 'Effects of Hard Water on Hair',
    type: 'science',
    author: 'Srinivasan, G., Srinivas, C. R., Mathew, A. C. & Duraiswami, D.',
    date: '2013',
    source: 'International Journal of Trichology',
  },

  /*
  1. Luqman, M. W. et al. To Evaluate and Compare Changes in Baseline Strength of Hairs after Treating them with Deionized Water and Hard Water and its Role in Hair Breakage. International Journal of Trichology 10, 113 (2018).

  */
  '101': {
    id: '101',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6028999/',
    title:
      'To Evaluate and Compare Changes in Baseline Strength of Hairs after Treating them with Deionized Water and Hard Water and its Role in Hair Breakage',
    type: 'science',
    author: 'Luqman, M. W. et al.',
    date: '2018',
    source: 'International Journal of Trichology',
  },
  /*
  1. Srinivasan, G. & Chakravarthy Rangachari, S. Scanning electron microscopy of hair treated in hard water. Int J Dermatol 55, e344-346 (2016).

  */
  '102': {
    id: '102',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26711619/',
    title: 'Scanning electron microscopy of hair treated in hard water',
    type: 'science',
    author: 'Srinivasan, G. & Chakravarthy Rangachari, S.',
    date: '2016',
    source: 'International Journal of Dermatology',
  },

  /*
  1. Wikramanayake, T. C., Borda, L. J., Miteva, M. & Paus, R. Seborrheic dermatitis—Looking beyond Malassezia. Experimental Dermatology 28, 991–1001 (2019).
  */
  '103': {
    id: '103',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31310695/',
    title: 'Seborrheic dermatitis—Looking beyond Malassezia',
    type: 'science',
    author: 'Wikramanayake, T. C., Borda, L. J., Miteva, M. & Paus, R.',
    date: '2019',
    source: 'Experimental Dermatology',
  },

  /*
  1. DeAngelis, Y. M. et al. Three Etiologic Facets of Dandruff and Seborrheic Dermatitis: Malassezia Fungi, Sebaceous Lipids, and Individual Sensitivity. Journal of Investigative Dermatology Symposium Proceedings 10, 295–297 (2005).
*/
  '104': {
    id: '104',
    url: 'https://www.sciencedirect.com/science/article/pii/S0022202X15526146',
    title:
      'Three Etiologic Facets of Dandruff and Seborrheic Dermatitis: Malassezia Fungi, Sebaceous Lipids, and Individual Sensitivity',
    type: 'science',
    author: 'DeAngelis, Y. M. et al.',
    date: '2005',
    source: 'Journal of Investigative Dermatology Symposium Proceedings',
  },
  /*
  1. Suchonwanit, P., Triyangkulsri, K., Ploydaeng, M. & Leerunyakul, K. Assessing Biophysical and Physiological Profiles of Scalp Seborrheic Dermatitis in the Thai Population. BioMed Research International 2019, 5128376 (2019).
*/
  '105': {
    id: '105',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31360714/',
    title:
      'Assessing Biophysical and Physiological Profiles of Scalp Seborrheic Dermatitis in the Thai Population',
    type: 'science',
    author:
      'Suchonwanit, P., Triyangkulsri, K., Ploydaeng, M. & Leerunyakul, K.',
    date: '2019',
    source: 'BioMed Research International',
  },
  /*
  1. Fajuyigbe, D. et al. Weekly hair washing: The recommended solution for women with afro-textured hair to alleviate dandruff and scalp discomfort. The Journal of Dermatology 51, 518–525 (2024).

  */
  '106': {
    id: '106',
    url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/1346-8138.17102',
    title:
      'Weekly hair washing: The recommended solution for women with afro-textured hair to alleviate dandruff and scalp discomfort',
    type: 'science',
    author: 'Fajuyigbe, D. et al.',
    date: '2024',
    source: 'The Journal of Dermatology',
  },
  /* 1. Syed, A. N. Curly Hair: Structure, Properties, and Care. (Dr. Ali N. Syed, 2022).
   */
  '107': {
    id: '107',
    url: 'https://www.google.com/books/edition/Curly_Hair/Nd5CzwEACAAJ?hl=en',
    title: 'Curly Hair: Structure, Properties, and Care',
    type: 'science',
    author: 'Syed, A. N.',
    date: '2022',
    source: 'Dr. Ali N. Syed',
  },
  /*
  1. 1. Mayo, T., Dinkins, J. & Elewski, B. Hair Oils May Worsen Seborrheic Dermatitis in Black Patients. Skin Appendage Disorders 9, 151–152 (2023).

  */
  '108': {
    id: '108',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10015641/',
    title: 'Hair Oils May Worsen Seborrheic Dermatitis in Black Patients',
    type: 'science',
    author: 'Mayo, T., Dinkins, J. & Elewski, B.',
  },

  /* 1. Taylor, S. C. et al. Hair and scalp disorders in adult and pediatric patients with skin of color. Cutis 100, 31–35 (2017).

  */
  '109': {
    id: '109',
    url: 'https://doi.org/10.1021/acsabm.8b00014',
    title:
      'Hair and scalp disorders in adult and pediatric patients with skin of color',
    type: 'science',
    author: 'Taylor, S. C. et al.',
    date: '2017',
    source: 'Cutis',
  },
  /* 1. Siegfried, E. & Glenn, E. Use of Olive Oil for the Treatment of Seborrheic Dermatitis in Children. Archives of Pediatrics & Adolescent Medicine 166, 967 (2012).

  */
  '110': {
    id: '110',
    url: 'https://jamanetwork.com/journals/jamapediatrics/fullarticle/1308503',
    title:
      'Use of Olive Oil for the Treatment of Seborrheic Dermatitis in Children',
    type: 'science',
    author: 'Siegfried, E. & Glenn, E.',
    date: '2012',
    source: 'Archives of Pediatrics & Adolescent Medicine',
  },

  /* 1. Saxena, R. et al. Longitudinal study of the scalp microbiome suggests coconut oil to enrich healthy scalp commensals. Sci Rep 11, 7220 (2021).

  */
  '111': {
    id: '111',
    url: 'https://www.nature.com/articles/s41598-021-86454-1',
    title:
      'Longitudinal study of the scalp microbiome suggests coconut oil to enrich healthy scalp commensals',
    type: 'science',
    author: 'Saxena, R. et al.',
    date: '2021',
    source: 'Sci Rep',
  },
  /* 1. Papavassilis, C., Mach, K. K. & Mayser, P. A. Medium-chain triglycerides inhibit growth of Malassezia: implications for prevention of systemic infection. Crit Care Med 27, 1781–1786 (1999).

  */
  '112': {
    id: '112',
    url: 'https://pubmed.ncbi.nlm.nih.gov/10507598/',
    title:
      'Medium-chain triglycerides inhibit growth of Malassezia: implications for prevention of systemic infection',
    type: 'science',
    author: 'Papavassilis, C., Mach, K. K. & Mayser, P. A.',
    date: '1999',
    source: 'Crit Care Med',
  },
  /* 1. Robinson, C., Shah, R., Ogbonna, C. & McMichael, A. J. Treatment of Seborrheic Dermatitis in Black Patients. Cutis 115, 15–17 (2025).

  */
  '113': {
    id: '113',
    url: 'https://doi.org/10.1021/acsabm.8b00014',
    title: 'Treatment of Seborrheic Dermatitis in Black Patients',
    type: 'science',
    author: 'Robinson, C., Shah, R., Ogbonna, C. & McMichael, A. J.',
    date: '2025',
    source: 'Cutis',
  },
  /* 1. Polaskey, M. T. et al. When Patient Diversity Informs Formulation: Reimagining Treatment for Seborrheic Dermatitis. Dermatol Ther (Heidelb) 14, 1071–1077 (2024).

  */
  '114': {
    id: '114',
    url: 'https://doi.org/10.1021/acsabm.8b00014',
    title:
      'When Patient Diversity Informs Formulation: Reimagining Treatment for Seborrheic Dermatitis',
    type: 'science',
    author: 'Polaskey, M. T. et al.',
    date: '2024',
    source: 'Dermatol Ther (Heidelb)',
  },
  /* Surfactants: Cleansing descriptions and increasing mildness – rinsability, films, and hard water
  https://www.swiftcraftymonkey.blog/surfactants-cleansing-descriptions-and-increasing-mildness-rinsability-films-and-hard-water/
  */
  '115': {
    id: '115',
    url: 'https://www.swiftcraftymonkey.blog/surfactants-cleansing-descriptions-and-increasing-mildness-rinsability-films-and-hard-water/',
    title:
      'Surfactants: Cleansing descriptions and increasing mildness – rinsability, films, and hard water',
    type: 'science',
    author: 'Swiftcraftymonkey',
    date: '2024',
    source: 'Swiftcraftymonkey',
  },

  /* https://www.swiftcraftymonkey.blog/alltheingredients-keratin-hydrolysate-silox-hair-care-active 2019 */
  '116': {
    id: '116',
    url: 'https://www.swiftcraftymonkey.blog/alltheingredients-keratin-hydrolysate-silox-hair-care-active/',
    title: 'All the Ingredients: Keratin Hydrolysate, Silox, Hair Care Active',
    date: '2019',
    type: 'science',
    author: 'Swiftcraftymonkey',
  },

  /*
  https://incidecoder.com/ingredients/tremella-fuciformis-polysaccharide

  */
  '117': {
    id: '117',
    url: 'https://incidecoder.com/ingredients/tremella-fuciformis-polysaccharide',
    title: 'Tremella Fuciformis Polysaccharide',
    type: 'science',
    author: 'Incidecoder',
    date: '2024',
    source: 'Incidecoder',
  },

  /* https://podcasts.apple.com/ro/podcast/episode-392-protein-overload-witch-hazel-and-razor-burns/id733300242?i=1000702093637 */
  '118': {
    id: '118',
    url: 'https://podcasts.apple.com/ro/podcast/episode-392-protein-overload-witch-hazel-and-razor-burns/id733300242?i=1000702093637',
    title: 'Episode 392: Protein Overload, Witch Hazel, and Razor Burns',
    type: 'science',
    author: 'Valerie George and Perry Romanowski',
    date: '2025',
    source: 'The Beauty Brains',
  },

  /* https://science-yhairblog.blogspot.com/2013/09/more-about-protein.html */
  '119': {
    id: '119',
    url: 'https://science-yhairblog.blogspot.com/2013/09/more-about-protein.html',
    title: 'More About Protein',
    type: 'science',
    author: 'Wendy M.S.',
    date: '2013',
    source: 'Science-Y Hair Blog',
  },

  /* Chapter Teglia, Alessandro, and Gianfranco Secchi. "Proteins in cosmetics."  in Principles of polymer science and technology in cosmetics and personal care edited by E. Desmond Goddard · 1999 */
  '120': {
    id: '120',
    url: 'https://www.google.com/books/edition/Principles_of_Polymer_Science_and_Techno/56R-6Wyyo6IC?hl=en&gbpv=0',
    title: 'Proteins in cosmetics',
    type: 'science',
    author: 'Teglia, Alessandro, and Gianfranco Secchi.',
    date: '1999',
    source:
      'Principles of polymer science and technology in cosmetics and personal care',
  },

  /* https://www.swiftcraftymonkey.blog/the-big-post-on-hydrolyzed-proteins-and-amino-acids/ */
  '121': {
    id: '121',
    url: 'https://www.swiftcraftymonkey.blog/the-big-post-on-hydrolyzed-proteins-and-amino-acids/',
    title: 'The Big Post on Hydrolyzed Proteins and Amino Acids',
    type: 'science',
    author: 'Swiftcraftymonkey',
    date: '2024',
    source: 'Swiftcraftymonkey',
  },

  /* Adsorption Properties of Hair chapter by Evans, in  Evans, Trefor, and R. Randall Wickett, eds. Practical modern hair science. Alluredbooks, 2012.*/
  '122': {
    id: '122',
    url: 'https://library.triprinceton.org/1t0nsnb/',
    title: 'Adsorption Properties of Hair',
    type: 'science',
    author: 'Evans, Trefor',
    date: '2012',
    source: 'Practical Modern Hair Science',
  },
  /* https://www.swiftcraftymonkey.blog/alltheingredients-hydrolyzed-rice-protein/ 2023 */
  '123': {
    id: '123',
    url: 'https://www.swiftcraftymonkey.blog/alltheingredients-hydrolyzed-rice-protein/',
    title: 'All the Ingredients: Hydrolyzed Rice Protein',
    type: 'science',
    author: 'Swiftcraftymonkey',
    date: '2023',
    source: 'Swiftcraftymonkey',
  },

  /* https://www.youtube.com/watch?v=KUQJSxc1p8g  Why are scientific studies so bad? A deep dive into rosemary oil
Lab Muffin Beauty Science
 7 months ago  */
  '124': {
    id: '124',
    url: 'https://www.youtube.com/watch?v=KUQJSxc1p8g',
    title: 'Why are scientific studies so bad? A deep dive into rosemary oil',
    type: 'science',
    author: 'Lab Muffin Beauty Science',
    date: '2024',
    source: 'YouTube',
  },

  /* Scalp and Hair Hygiene: Shampoos 92 Bernard Beauquey in Bouillon, Claude. "The science of hair care." The Science of Hair Care, 2nd (2005).*/
  '125': {
    id: '125',
    url: 'https://www.canadiancosmeticcluster.com/uploads/3/7/9/8/37984461/epdf.pub_the-science-of-hair-care.pdf',
    title: 'Scalp and Hair Hygiene: Shampoos',
    type: 'science',
    author: 'Bouillon, Claude.',
    date: '2005',
    source: 'The Science of Hair Care',
  },

  /* Trefor Evans https://www.youtube.com/watch?v=nEJygXgtG-0 Hair Structure 101, Trefor Evans Ph.D. from TRI Princeton at the Hair Science E-Summit 2024 */
  '126': {
    id: '126',
    url: 'https://www.youtube.com/watch?v=nEJygXgtG-0',
    title: 'Hair Structure 101',
    type: 'science',
    author: 'Trefor, Evans',
    date: '2024',
    source: 'TRI Princeton at the Hair Science E-Summit 2024',
  },
  /* 1. Marsh JM, Davis MG, Lucas RL, et al. Preserving fibre health: reducing oxidative stress throughout the life of the hair fibre. International Journal of Cosmetic Science. 2015;37(S2):16-24. doi:10.1111/ics.12285
   */
  '127': {
    id: '127',
    url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/ics.12285',
    title:
      'Preserving fibre health: reducing oxidative stress throughout the life of the hair fibre',
    type: 'science',
    author: 'Marsh JM, Davis MG, Lucas RL, et al.',
    date: '2015',
    source: 'International Journal of Cosmetic Science',
  },
  /* 1. Marsh JM, Davis MG, Flagler MJ, et al. Advanced hair damage model from ultra-violet radiation in the presence of copper. Int J Cosmet Sci. 2015;37(5):532-541. doi:10.1111/ics.12231
   */
  '128': {
    id: '128',
    url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/ics.12231',
    title:
      'Advanced hair damage model from ultra-violet radiation in the presence of copper',
    type: 'science',
    author: 'Marsh JM, Davis MG, Flagler MJ, et al.',
    date: '2015',
    source: 'Int J Cosmet Sci',
  },
  /* 1. Wilde PF, Stewart PS. A study of the fatty acid metabolism of the yeast Pityrosporum ovale. Biochem J. 1968;108(2):225-231. doi:10.1042/bj1080225
   */
  '129': {
    id: '129',
    url: 'https://onlinelibrary.wiley.com/doi/full/10.1042/bj1080225',
    title:
      'A study of the fatty acid metabolism of the yeast Pityrosporum ovale',
    type: 'science',
    author: 'Wilde PF, Stewart PS.',
    date: '1968',
    source: 'Biochem J',
  },
  /* 1. Mayser P, Führer D, Schmidt R, Gründer K. Hydrolysis of fatty acid esters by Malassezia furfur: different utilization depending on alcohol moiety. Acta Derm Venereol. 1995;75(2):105-109. doi:10.2340/0001555575105109
   */
  '130': {
    id: '130',
    url: 'https://onlinelibrary.wiley.com/doi/full/10.2340/0001555575105109',
    title:
      'Hydrolysis of fatty acid esters by Malassezia furfur: different utilization depending on alcohol moiety',
    type: 'science',
    author: 'Mayser P, Führer D, Schmidt R, Gründer K.',
    date: '1995',
    source: 'Acta Derm Venereol',
  },
  /* 1. Mayser P, Imkampe A, Winkeler M, Papavassilis C. Growth requirements and nitrogen metabolism of Malassezia furfur. Arch Dermatol Res. 1998;290(5):277-282. doi:10.1007/s004030050304
   */
  '131': {
    id: '131',
    url: 'https://link.springer.com/article/10.1007/s004030050304',
    title: 'Growth requirements and nitrogen metabolism of Malassezia furfur',
    type: 'science',
    author: 'Mayser P, Imkampe A, Winkeler M, Papavassilis C.',
    date: '1998',
    source: 'Arch Dermatol Res',
  },

  /* 1. Akaza N, Akamatsu H, Takeoka S, et al. Malassezia globosa tends to grow actively in summer conditions more than other cutaneous Malassezia species. J Dermatol. 2012;39(7):613-616. doi:10.1111/j.1346-8138.2011.01477.x
   */
  '132': {
    id: '132',
    url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/j.1346-8138.2011.01477.x',
    title:
      'Malassezia globosa tends to grow actively in summer conditions more than other cutaneous Malassezia species',
    type: 'science',
    author: 'Akaza N, Akamatsu H, Takeoka S, et al.',
    date: '2012',
    source: 'J Dermatol',
  },
  /*
Valerie George and perry romanowski Episode 397 - Heat protectants, protein and sunburns | The Beauty Brains. Patreon. June 1, 2025. Accessed August 15, 2025. https://www.patreon.com/posts/episode-397-heat-130308558
*/
  '133': {
    id: '133',
    url: 'https://www.patreon.com/posts/episode-397-heat-130308558',
    title: 'Episode 397: Heat protectants, protein and sunburns',
    type: 'science',
    author: 'Valerie George and Perry Romanowski',
    date: '2025',
    source: 'The Beauty Brains',
  },
  /*
1. Byrd A, Tharps L. Hair Story: Untangling the Roots of Black Hair in America. Macmillan; 2002.
*/
  '134': {
    id: '134',
    url: 'https://www.google.com/books/edition/Hair_Story/UStkDwAAQBAJ?hl=en&gbpv=0',
    title: 'Hair Story: Untangling the Roots of Black Hair in America',
    type: 'science',
    author: 'Byrd A, Tharps L.',
    date: '2002',
    source: 'Macmillan',
  },

  /*
Kahre, Joerg. "Ethnic Differences in Haircare Products." Handbook of Cosmetic Science and Technology. CRC Press, 2001. 621-634.
*/
  '135': {
    id: '135',
    url: 'https://www.google.com/books/edition/Handbook_of_Cosmetic_Science_and_Technol/qAPLBQAAQBAJ',
    title: 'Ethnic Differences in Haircare Products',
    type: 'science',
    author: 'Kahre, Joerg.',
    date: '2001',
    source: 'Handbook of Cosmetic Science and Technology',
  },
  /*
1. Draelos ZD. Hair Care: An Illustrated Dermatologic Handbook. CRC Press; 2004.
*/
  '136': {
    id: '136',
    url: 'https://www.google.com/books/edition/Hair_Care/zfCcw3qon7cC',
    title: 'Hair Care: An Illustrated Dermatologic Handbook',
    type: 'science',
    author: 'Draelos ZD.',
    date: '2004',
    source: 'CRC Press',
  },

  /*
  1. Mkentane K, Wyk JCV, Sishi N, et al. Geometric classification of scalp hair for valid drug testing, 6 more reliable than 8 hair curl groups. PLOS ONE. 2017;12(6):e0172834. doi:10.1371/journal.pone.0172834
*/

'137': {
    id: '137',
    url: 'https://doi.org/10.1371/journal.pone.0172834',
    title: 'Geometric classification of scalp hair for valid drug testing, 6 more reliable than 8 hair curl groups',
    type: 'science',
    author: 'Mkentane K, Wyk JCV, Sishi N, et al.',
    date: '2017',
    source: 'PLOS ONE',
  },

  /* Martins E, Castro P, Ribeiro AB, et al. Bleached Hair as Standard Template to Insight the Performance of Commercial Hair Repair Products. Cosmetics. 2024;11(5):150. doi:10.3390/cosmetics11050150
*/
'138': {
    id: '138',
    url: 'https://doi.org/10.3390/cosmetics11050150',
    title: 'Bleached Hair as Standard Template to Insight the Performance of Commercial Hair Repair Products',
    type: 'science',
    author: 'Martins E, Castro P, Ribeiro AB, et al.',
    date: '2024',
    source: 'Cosmetics',
  },
  /* Di Foggia M, Boga C, Micheletti G, Nocentini B, Taddei P. Structural investigation on damaged hair keratin treated with α,β-unsaturated Michael acceptors used as repairing agents. International Journal of Biological Macromolecules. 2021;167:620-632. doi:10.1016/j.ijbiomac.2020.11.194 */
  '139': {
    id: '139',
    url: 'https://doi.org/10.1016/j.ijbiomac.2020.11.194',
    title: 'Structural investigation on damaged hair keratin treated with α,β-unsaturated Michael acceptors used as repairing agents',
    type: 'science',
    author: 'Di Foggia M, Boga C, Micheletti G, Nocentini B, Taddei P.',
    date: '2021',
    source: 'International Journal of Biological Macromolecules',
  },
  /*Kim JH, Kim SY, Choi J, Lee HJ. Visible Light-Mediated Environmentally Friendly and Universally Applicable Green Chemistry for Hair Cross-Linking. ACS Sustainable Chem Eng. 2023;11(27):10029-10040. doi:10.1021/acssuschemeng.3c01797*/
  '140': {
    id: '140',
    url: 'https://doi.org/10.1021/acssuschemeng.3c01797',
    title: 'Visible Light-Mediated Environmentally Friendly and Universally Applicable Green Chemistry for Hair Cross-Linking',
    type: 'science',
    author: 'Kim JH, Kim SY, Choi J, Lee HJ.',
    date: '2023',
    source: 'ACS Sustainable Chem Eng',
  },
  /*Marsh JM, Cron S, Chen T, et al. Strengthening benefits of panthenol for hair: Mechanistic evidence from advanced spectroscopic techniques. International Journal of Cosmetic Science. n/a(n/a). doi:10.1111/ics.70024*/
  '141': {
    id: '141',
    url: 'https://doi.org/10.1111/ics.70024',
    title: 'Strengthening benefits of panthenol for hair: Mechanistic evidence from advanced spectroscopic techniques',
    type: 'science',
    author: 'Marsh JM, Cron S, Chen T, et al.',
    date: 'n/a',
    source: 'International Journal of Cosmetic Science',
  },
  /* Zhang D, Baghdadli N, Greaves AJ. Reinforcing chemically treated human hair with citric acid. Int J Cosmet Sci. Published online January 6, 2025. doi:10.1111/ics.13039*/
  '142': {
    id: '142',
    url: 'https://doi.org/10.1111/ics.13039',
    title: 'Reinforcing chemically treated human hair with citric acid',
    type: 'science',
    author: 'Zhang D, Baghdadli N, Greaves AJ.',
    date: '2025',
    source: 'Int J Cosmet Sci',
  },
  /* 1. Malinauskyte E, Shrestha R, Cornwell PA, Gourion-Arsiquaud S, Hindley M. Penetration of different molecular weight hydrolysed keratins into hair fibres and their effects on the physical properties of textured hair. International Journal of Cosmetic Science. 2021;43(1):26-37. doi:10.1111/ics.12663 */
  '143': {
    id: '143',
    url: 'https://doi.org/10.1111/ics.12663',
    title: 'Penetration of different molecular weight hydrolysed keratins into hair fibres and their effects on the physical properties of textured hair',
    type: 'science',
    author: 'Malinauskyte E, Shrestha R, Cornwell PA, Gourion-Arsiquaud S, Hindley M.',
    date: '2021',
    source: 'International Journal of Cosmetic Science',
  },
  /* Chambers LI, Yufit DS, Musa OM, Steed JW. Understanding the Interaction of Gluconamides and Gluconates with Amino Acids in Hair Care. Cryst Growth Des. 2022;22(10):6190-6200. doi:10.1021/acs.cgd.2c00753*/
  '144': {
    id: '144',
    url: 'https://doi.org/10.1021/acs.cgd.2c00753',
    title: 'Understanding the Interaction of Gluconamides and Gluconates with Amino Acids in Hair Care',
    type: 'science',
    author: 'Chambers LI, Yufit DS, Musa OM, Steed JW.',
    date: '2022',
    source: 'Cryst Growth Des',
  },
  /* 1. Cornwell P, Ph.D., Princeton TRI, et al. How Bond Builders ‘Repair’ Hair. Cosmetics & Toiletries. February 27, 2023. Accessed November 17, 2025. https://www.cosmeticsandtoiletries.com/formulas-products/hair-care/article/22737591/how-bond-builders-repair-hair
*/
'145': {
    id: '145',
    url: 'https://www.cosmeticsandtoiletries.com/formulas-products/hair-care/article/22737591/how-bond-builders-repair-hair',
    title: 'How Bond Builders ‘Repair’ Hair',
    type: 'science',
    author: 'Cornwell P, Ph.D., Princeton TRI, et al.',
    date: '2023',
    source: 'Cosmetics & Toiletries',
  },
  /*  Sureka P, Agrawal T, Majumder S, Ritambhara K. A Method to Measure Oil Penetration into Hair and Correlation to Tensile Strength. Int J Trichology. 2022;14(4):128-134. doi:10.4103/ijt.ijt_122_20  */
  '146': {
    id: '146',
    url: 'https://doi.org/10.4103/ijt.ijt_122_20',
    title: 'A Method to Measure Oil Penetration into Hair and Correlation to Tensile Strength',
    type: 'science',
    author: 'Sureka P, Agrawal T, Majumder S, Ritambhara K.',
    date: '2022',
    source: 'Int J Trichology',
  },
  /* 1. Gamez M, Foltis L, Everaert E, et al. Dual Defense: Protecting and Repairing Hair Holistically, Inside and Out. Cosmetics & Toiletries. June 1, 2020. Accessed November 17, 2025. https://www.cosmeticsandtoiletries.com/testing/efficacy/article/21835676/ashland-specialty-ingredients-dual-defense-protecting-and-repairing-hair-holistically-inside-and-out
*/
'147': {
    id: '147',
    url: 'https://www.cosmeticsandtoiletries.com/testing/efficacy/article/21835676/ashland-specialty-ingredients-dual-defense-protecting-and-repairing-hair-holistically-inside-and-out',
    title: 'Dual Defense: Protecting and Repairing Hair Holistically, Inside and Out',
    type: 'science',
    author: 'Gamez M, Foltis L, Everaert E, et al.',
    date: '2020',
    source: 'Cosmetics & Toiletries',
  },

};

