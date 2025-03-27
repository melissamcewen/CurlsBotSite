export interface Answer {
  content: string;
  nextSection?: string;
  points?: {
    [key: string]: number;
  };
  result?: string; // Direct result without points calculation
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
  | '1cvs1ab'
  | '1avs1b'
  | '23vs34'
  | '2avs2c'
  | '3a3cvs3c4'
  | '3a3bvs3c'
  | '3avs3b'
  | '3cvs4'
  | '4avs4c'
  | '4avs4b';
