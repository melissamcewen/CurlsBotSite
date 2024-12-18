export type IngredientStatus = 'ok' | 'warning' | 'caution';

export interface IngredientInfo {
  id: string;
  name: string;
  description?: string;
  categories?: string[];
  synonyms?: string[];
}

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
