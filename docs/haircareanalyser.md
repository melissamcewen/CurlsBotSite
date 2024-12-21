# haircare-ingredients-analyzer docs

## Types
/**
 * Represents why an ingredient or analysis received a particular status
 */
export interface StatusReason {
  /** The setting that caused this status (e.g. "sulfate_free") */
  setting: string;
  /** Name of the setting */
  name: string;
  /** Human readable explanation (e.g. "Contains sulfates") */
  reason: string;
}

/**
 * Result for a single ingredient
 */
export interface IngredientResult {
  /** Original ingredient name from input */
  name: string;
  /** Normalized name for matching */
  normalized: string;
  /** Whether this ingredient passes the system's requirements */
  status: 'ok' | 'caution' | 'warning';
  /** Why this ingredient got its status */
  reasons: StatusReason[];
  /** The matched ingredient from the database, if any */
  ingredient?: {
    id: string;
    name: string;
    description?: string;
    categories: string[];
    group?: string;
  };
}

/**
 * Result for analyzing an ingredient list
 */
export interface AnalysisResult {
  /** Original input text */
  input: string;
  /** Overall status of the analysis */
  status: 'ok' | 'caution' | 'warning' | 'error';
  /** Why this analysis got its status */
  reasons: StatusReason[];
  /** Results for each ingredient */
  ingredients: IngredientResult[];
}

/**
 * Represents configuration options for the analyzer
 */
export interface AnalyzerConfig {
  /** Ingredient database used for analysis */
  database: IngredientDatabase;
  /** Optional system used to analyze the input */
  system?: System;
  /** Optional settings for the system */
  settings?: Settings;
}

/**
 * Represents a category for ingredients
 */
export interface Category {
  /** Display name of the category */
  name: string;
  /** Description of the category and its effects */
  description: string;
  /** Unique identifier in snake_case */
  id: string;
  /** The group this category belongs to */
  group: string;
  /** inclusions that would partition the group */
  inclusions?: string[];
  /** exclusion that would prevent the thing from being partitioned into this category */
  exclusions?: string[];
  /** default ingredient for the category */
  defaultIngredient?: string;
  /** Optional source references for the category */
  references?: Reference[];
}

/**
 * Represents a group of related categories
 */
export interface Group {
  /** Name of the category group */
  name: string;
  /** Description of the category group */
  description?: string;
  /** Unique identifier for the category group */
  id: string;
  /** inclusions that would partition the group */
  inclusions?: string[];
  /** exclusions that would prevent the group from being partitioned */
  exclusions?: string[];
  /** default ingredient for the group */
  defaultIngredient?: string;
}

/**
 * Represents a collection of category groups
 */
export type Groups = Record<string, Group>;

/**
 * Represents a reference link with optional metadata
 */
export interface Reference {
  /** The URL of the reference */
  url: string;
  /** Optional title of the reference */
  title?: string;
  /** Optional description of what this reference proves/shows */
  description?: string;
}

/**
 * Represents an ingredient and its associated metadata
 */
export interface Ingredient {
  id: string;
  /** Name of the ingredient */
  name: string;
  /** Optional description of the ingredient */
  description?: string;
  /** Categories to which the ingredient belongs */
  categories: string[];
  /** Optional source references for the ingredient */
  references?: Reference[];
  /** Optional synonyms for the ingredient */
  synonyms?: string[];
}

/** represents a collection of ingredients   */
export type Ingredients = Record<string, Ingredient>;

/**
 * Represents a product in the database
 */
export interface Product {
  /** Name of the product */
  name: string;
  /** Unique identifier for the product */
  id: string;
  /** Brand name */
  brand: string;
  /** URL where the product can be purchased */
  buy_url: string;
  /** Systems this product is excluded from */
  systems_excluded?: string[];
  /** Categories the product belongs to */
  product_categories: string[];
  /** Tags the product belongs to */
  tags?: string[];
  /** Cost rating of the product */
  cost_rating?: string;
  /** Raw ingredients list from the product */
  ingredients_raw?: string;
  /** Description of the product */
  description?:  string;
}

/**
 * Represents a collection of products
 */
export type Products = Record<string, Product>;

/**
 * Represents the database of ingredients and categories
 */
export interface IngredientDatabase {
  /** List of all ingredients */
  ingredients: Ingredients;
  /** List of all groups */
  groups: Groups;
  /** Map of all categories by ID */
  categories: Categories;
}

/**
 * Represents the database of products
 */
export interface ProductDatabase {
  /** Map of all products by ID */
  products: Products;
}

/**
 * Represents a collection of categories
 */
export type Categories = Record<string, Category>;

/**
 * represents a system used to analyze the input
 */
export interface System {
  id: string;
  name: string;
  description?: string;
  settings: string[];
}

/**
 * Represents setting for a system
 */
export interface Setting {
  id: string;
  name: string;
  description: string;
  /** Categories to check (for simple category-based settings) */
  categories?: string[];
  /** Groups to check (for group-based settings with allowed categories) */
  groups?: string[];
  /** Categories that get allowedStatus within groups */
  allowedCategories?: string[];
  /** Specific ingredients to check */
  ingredients?: string[];
  /** Status for matching ingredients (or non-allowed categories in groups) */
  defaultStatus: 'ok' | 'caution' | 'warning';
  /** Status for ingredients in allowedCategories (when using groups) */
  allowedStatus?: 'ok' | 'caution' | 'warning';
}

/**
 * Represents a collection of settings
 */
export type Settings = Record<string, Setting>;

/**
 * Result from ingredient matching, still used in the database utils
 */
export interface IngredientMatch {
  uuid: string;
  input: string;
  normalized: string;
  ingredient?: Ingredient;
}

/**
 * Result from normalizing an ingredient list
 */
export interface NormalizedIngredientList {
  isValid: boolean;
  ingredients: string[];
}
