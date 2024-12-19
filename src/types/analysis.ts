import type { Ingredient } from 'haircare-ingredients-analyzer';

export type IngredientStatus = 'ok' | 'warning' | 'caution';

export type IngredientInfo = Pick<Ingredient, 'id' | 'name' | 'description' | 'categories' | 'synonyms'>;

export interface AnalyzedIngredient {
  name: string;
  matched: boolean;
  status: IngredientStatus;
  reason?: string;
  info?: string;
  ingredient?: IngredientInfo;
}

export interface AnalysisResult {
  overallStatus: IngredientStatus;
  ingredients: AnalyzedIngredient[];
}
