import type { AnalysisResult, IngredientResult } from 'haircare-ingredients-analyzer';

export type ProteinMatchKind = 'protein' | 'amino_acid';

export interface ProteinMatch {
  id: string;
  name: string;
  inputName: string;
  position: number;
  kind: ProteinMatchKind;
  categories: string[];
  description?: string;
}

export interface ProteinAnalysis {
  matches: ProteinMatch[];
  hasProteins: boolean;
  hasAminoAcids: boolean;
}

function getMatchKind(categories: string[]): ProteinMatchKind | null {
  if (categories.includes('proteins')) return 'protein';
  if (categories.includes('amino_acids')) return 'amino_acid';
  return null;
}

function toMatch(
  ingredient: IngredientResult,
  position: number,
): ProteinMatch | null {
  const categories = ingredient.ingredient?.categories;
  if (!categories?.length || !ingredient.ingredient) return null;

  const kind = getMatchKind(categories);
  if (!kind) return null;

  return {
    id: ingredient.ingredient.id,
    name: ingredient.ingredient.name,
    inputName: ingredient.name,
    position,
    kind,
    categories,
    description: ingredient.ingredient.description,
  };
}

/** Neutral protein / amino-acid detection from an analyzer result. */
export function proteinAnalysis(analysis: AnalysisResult): ProteinAnalysis {
  const matches: ProteinMatch[] = [];

  analysis.ingredients.forEach((ingredient, index) => {
    const match = toMatch(ingredient, index + 1);
    if (match) matches.push(match);
  });

  return {
    matches,
    hasProteins: matches.some((m) => m.kind === 'protein'),
    hasAminoAcids: matches.some((m) => m.kind === 'amino_acid'),
  };
}
