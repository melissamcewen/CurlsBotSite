import { HairParameters } from './parameters';

export interface Answer {
  content: string;
  nextSection?: string;
  points?: {
    [key: string]: number;
  };
  result?: string; // Hair type code (e.g., '1a', '2b', etc.)
}

export interface Question {
  question: string;
  answers: Answer[];
  section: string;
}

// Define all possible sections
export type QuizSection =
  | '1vs234'
  | '1vs2'
  | '1bvs1ac'
  | '1avs1c'
  | '23vs34'
  | '2avs3'
  | '2avs2bc'
  | '2cvs2b'
  | '3a3cvs3c4'
  | '3a3bvs3c'
  | '3avs3b'
  | '3cvs4'
  | '4avs4bvs4c';

export interface QuizResult {
  type: string;
  parameters: HairParameters;
}
