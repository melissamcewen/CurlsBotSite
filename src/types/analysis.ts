export type IngredientStatus = 'ok' | 'warning' | 'caution';

export interface AnalyzedIngredient {
  name: string;
  matched: boolean;
  status: IngredientStatus;
  reason?: string;
  info?: string;
}

export interface AnalysisResult {
  overallStatus: IngredientStatus;
  ingredients: AnalyzedIngredient[];
}
