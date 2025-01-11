/\*\*

- Represents why an ingredient or analysis received a particular status
  _/
  export interface StatusReason {
  /\*\* The setting that caused this status (e.g. "sulfate_free") _/
  setting: string;
  /** Name of the setting \*/
  name: string;
  /** Human readable explanation (e.g. "Contains sulfates") _/
  reason: string;
  /\*\* Type of reason caution, warning, or ok _/
  type: 'caution' | 'warning' | 'ok';
  }

/\*\*

- Result for a single ingredient
  _/
  export interface IngredientResult {
  /\*\* Original ingredient name from input _/
  name: string;
  /** Normalized name for matching \*/
  normalized: string;
  /** Whether this ingredient passes the system's requirements _/
  status: 'ok' | 'caution' | 'warning';
  /\*\* Why this ingredient got its status _/
  reasons: StatusReason[];
  /\*_ The matched ingredient from the database, if any _/
  ingredient?: {
  id: string;
  name: string;
  description?: string;
  categories: string[];
  group?: string;
  };
  }

/\*\*

- Result for analyzing an ingredient list
  _/
  export interface AnalysisResult {
  /\*\* Original input text _/
  input: string;
  /** Overall status of the analysis \*/
  status: 'ok' | 'caution' | 'warning' | 'error';
  /** Why this analysis got its status _/
  reasons: StatusReason[];
  /\*\* Results for each ingredient _/
  ingredients: IngredientResult[];
  }

/\*\*

- Represents configuration options for the analyzer
  _/
  export interface AnalyzerConfig {
  /\*\* Ingredient database used for analysis _/
  database: IngredientDatabase;
  /** Optional system used to analyze the input \*/
  system?: System;
  /** Optional settings for the system \*/
  settings?: Settings;
  }

/\*\*

- Represents a category for ingredients
  _/
  export interface Category {
  /\*\* Display name of the category _/
  name: string;
  /** Description of the category and its effects \*/
  description: string;
  /** Unique identifier in snake_case _/
  id: string;
  /\*\* The group this category belongs to _/
  group: string;
  /** inclusions that would partition the group \*/
  inclusions?: string[];
  /** exclusion that would prevent the thing from being partitioned into this category _/
  exclusions?: string[];
  /\*\* default ingredient for the category _/
  defaultIngredient?: string;
  /\*_ Optional source references for the category _/
  references?: ReferenceUsage[];
  }

/\*\*

- Represents a specific usage of a reference, with optional notes and status
  _/
  export interface ReferenceUsage {
  /\*\* The ID of the reference _/
  id: string;
  /** Optional notes about this specific usage of the reference \*/
  notes?: string;
  /** Optional status for this specific usage \*/
  status?: 'ok' | 'caution' | 'warning' | 'good';
  }

/\*\*

- Represents a group of related categories
  _/
  export interface Group {
  /\*\* Name of the category group _/
  name: string;
  /** Description of the category group \*/
  description?: string;
  /** Unique identifier for the category group _/
  id: string;
  /\*\* inclusions that would partition the group _/
  inclusions?: string[];
  /** exclusions that would prevent the group from being partitioned \*/
  exclusions?: string[];
  /** default ingredient for the group _/
  defaultIngredient?: string;
  /\*\* Optional source reference usages for the category _/
  references?: ReferenceUsage[];
  }

/\*\*

- Represents a collection of category groups
  \*/
  export type Groups = Record<string, Group>;

/\*\*

- Represents a reference link with optional metadata
  _/
  export interface Reference {
  /\*\* The ID of the reference _/
  id: string;
  /** The URL of the reference \*/
  url: string;
  /** Optional title of the reference _/
  title?: string;
  /\*\* Optional description of what this reference proves/shows _/
  description?: string;
  /** Optional date of the reference \*/
  date?: string;
  /** Optional author of the reference _/
  author?: string;
  /\*\* Optional source of the reference _/
  source?: string;
  /** Type of reference \*/
  type?: 'science' | 'hairpro' | 'author' | 'other' | 'industry';
  /** status of the reference \*/
  status?: 'ok' | 'caution' | 'warning' | 'good';
  }

/\*\*

- Represents a collection of references
  \*/
  export type References = Record<string, Reference>;

/\*\*

- Represents an ingredient and its associated metadata
  _/
  export interface Ingredient {
  id: string;
  /\*\* Name of the ingredient _/
  name: string;
  /** Optional description of the ingredient \*/
  description?: string;
  /** Categories to which the ingredient belongs _/
  categories: string[];
  /\*\* Optional source reference usages for the ingredient _/
  references?: ReferenceUsage[];
  /** Optional synonyms for the ingredient \*/
  synonyms?: string[];
  /** CB status _/
  status: 'ok' | 'caution' | 'warning';
  /\*\* group _/
  group?: string;
  }

/\*_ represents a collection of ingredients _/
export type Ingredients = Record<string, Ingredient>;

/\*\*

- Represents a product in the database
  _/
  export interface Product {
  /\*\* Name of the product _/
  name: string;
  /** Unique identifier for the product \*/
  id: string;
  /** Brand name _/
  brand: string;
  /\*\* URL where the product can be purchased _/
  buy_url: string;
  /** Systems this product is excluded from \*/
  systems_excluded?: string[];
  /** Categories the product belongs to _/
  product_categories: string[];
  /\*\* Tags the product belongs to _/
  tags?: string[];
  /** Cost of the product in USD \*/
  cost?: number;
  /** Cost rating from 1-5 based on cost _/
  cost_rating?: string;
  /\*\* Raw ingredients list from the product _/
  ingredients_raw?: string;
  /** Description of the product \*/
  description?: string;
  /** ASIN of the product _/
  asin?: string;
  /\*\* Country _/
  country?: string;
  /** Analysis status for the product \*/
  status?: 'ok' | 'caution' | 'warning' | 'error';
  /** Analysis _/
  analysis?: AnalysisResult;
  /\*\* Frizzbot analysis _/
  frizzbot?: FrizzbotAnalysis;
  }

/\*\*

- Represents a collection of products
  \*/
  export type Products = Record<string, Product>;

/\*\*

- Represents the database of ingredients and categories
  _/
  export interface IngredientDatabase {
  /\*\* List of all ingredients _/
  ingredients: Ingredients;
  /** List of all groups \*/
  groups: Groups;
  /** Map of all categories by ID \*/
  categories: Categories;
  }

/\*\*

- Represents the database of products
  _/
  export interface ProductDatabase {
  /\*\* Map of all products by ID _/
  products: Products;
  }

/\*\*

- Represents a collection of categories
  \*/
  export type Categories = Record<string, Category>;

/\*\*

- represents a system used to analyze the input
  \*/
  export interface System {
  id: string;
  name: string;
  description?: string;
  settings: string[];
  }

/\*\*

- Represents setting for a system
  _/
  export interface Setting {
  id: string;
  name: string;
  description: string;
  /\*\* Categories to check (for simple category-based settings) _/
  categories?: string[];
  /** Groups to check (for group-based settings with allowed categories) \*/
  groups?: string[];
  /** Categories that get allowedStatus within groups _/
  allowedCategories?: string[];
  /\*\* Specific ingredients to check _/
  ingredients?: string[];
  /** Status for matching ingredients (or non-allowed categories in groups) \*/
  defaultStatus: 'ok' | 'caution' | 'warning';
  /** Status for ingredients in allowedCategories (when using groups) _/
  allowedStatus?: 'ok' | 'caution' | 'warning';
  /\*\* URL for guide _/
  guide?: string;
  }

/\*\*

- Represents a collection of settings
  \*/
  export type Settings = Record<string, Setting>;

/\*\*

- Result from ingredient matching, still used in the database utils
  \*/
  export interface IngredientMatch {
  uuid: string;
  input: string;
  normalized: string;
  ingredient?: Ingredient;
  }

/\*\*

- Result from normalizing an ingredient list
  \*/
  export interface NormalizedIngredientList {
  isValid: boolean;
  ingredients: string[];
  }

/\*\*

- Represents the analysis result for the Frizzbot system
  \*/
  export type FrizzbotAnalysis = {
  simple_humectants_number: number;
  film_forming_humectants_number: number;
  emollients_number: number;
  simple_humectants: string[];
  film_forming_humectants: string[];
  emollients: string[];
  score: number;
  };
