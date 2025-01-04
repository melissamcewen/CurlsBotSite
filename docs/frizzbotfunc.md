import type { AnalysisResult, FrizzbotAnalysis } from '../types';



export function frizzbot(analysis: AnalysisResult): FrizzbotAnalysis {
  const definitions = {
    emollients: {
      groups: ['silicones', 'oils'],
      categories: ['emollient_alcohols'],
    },
    film_forming_humectants: {
      groups: [],
      categories: ['film_forming_humectants', 'proteins'],
    },
    simple_humectants: {
      groups: [],
      categories: ['simple_humectants'],
    },
  };

  // Initialize arrays to store ingredients of each type
  const simple_humectants: string[] = [];
  const film_forming_humectants: string[] = [];
  const emollients: string[] = [];

  // Analyze each ingredient
  analysis.ingredients.forEach((ingredient) => {
    if (ingredient.ingredient) {
      // Check for emollients
      if (
        ingredient.ingredient.categories.some((cat) =>
          definitions.emollients.categories.includes(cat),
        ) ||
        (ingredient.ingredient.group &&
          definitions.emollients.groups.includes(ingredient.ingredient.group))
      ) {
        emollients.push(ingredient.ingredient.name);
      }

      // Check for film forming humectants
      if (
        ingredient.ingredient.categories.some((cat) =>
          definitions.film_forming_humectants.categories.includes(cat),
        )
      ) {
        film_forming_humectants.push(ingredient.ingredient.name);
      }

      // Check for simple humectants
      if (
        ingredient.ingredient.categories.some((cat) =>
          definitions.simple_humectants.categories.includes(cat),
        )
      ) {
        simple_humectants.push(ingredient.ingredient.name);
      }
    }
  });

  // Calculate numbers
  const simple_humectants_number = simple_humectants.length;
  const film_forming_humectants_number = film_forming_humectants.length;
  const emollients_number = emollients.length;

  // Calculate score
  // Simple humectants increase frizz (+2 each)
  // Film forming humectants help a bit (-1 each)
  // Emollients help the most (-2 each)
  const score =
    simple_humectants_number * 1 +
    film_forming_humectants_number * -1 +
    emollients_number * -1;

  return {
    simple_humectants_number,
    film_forming_humectants_number,
    emollients_number,
    simple_humectants,
    film_forming_humectants,
    emollients,
    score,
  };
}
