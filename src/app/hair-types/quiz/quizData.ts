import { type1Questions } from './quizData1';
import { type2Questions } from './quizData2';
import { type3Questions } from './quizData3';
import { type4Questions } from './quizData4';
import { Question, QuizResult } from './types';
import { hairTypeParameters } from './parameters';

export * from './types';
export * from './parameters';

export const quizQuestions: Question[] = [
  ...type1Questions,
  ...type2Questions,
  ...type3Questions,
  ...type4Questions,
];

export function getQuizResult(hairType: string): QuizResult {
  const parameters = hairTypeParameters[hairType];
  if (!parameters) {
    throw new Error(`Invalid hair type: ${hairType}`);
  }
  return {
    type: hairType,
    parameters,
  };
}

// This maps the final scores to the result pages
export const resultMapping: { [key: string]: string } = {
  '1a': '/hair-types/type-1a',
  '1b': '/hair-types/type-1b',
  '1c': '/hair-types/type-1c',
  '2a': '/hair-types/type-2a',
  '2b': '/hair-types/type-2b',
  '2c': '/hair-types/type-2c',
  '3a': '/hair-types/type-3a',
  '3b': '/hair-types/type-3b',
  '3c': '/hair-types/type-3c',
  '4a': '/hair-types/type-4a',
  '4b': '/hair-types/type-4b',
  '4c': '/hair-types/type-4c',
};
