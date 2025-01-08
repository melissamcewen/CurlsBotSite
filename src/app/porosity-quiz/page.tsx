import Quiz from './Quiz';
import { createPageMetadata } from '@/config/metadata';

export const metadata = createPageMetadata({
  title: 'Hair Porosity Quiz',
  description:
    'Take our hair porosity quiz to find out if you have low, normal, or high porosity hair. Get personalized hair care recommendations based on your results.',
  path: '/porosity-quiz',
});

export default function QuizPage() {
  return (
    <div className=" p-2 md:p-8">
      <Quiz />
    </div>
  );
}
