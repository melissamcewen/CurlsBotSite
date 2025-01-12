/**
 * Represents a reference usage with optional notes
 */
export interface ReferenceUsage {
  /** The ID of the reference */
  id: string;
  /** Optional notes about this specific usage */
  notes?: string;
}

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

/**
 * Represents a collection of references
 */
export type References = Record<string, Reference>;
