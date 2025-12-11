import NewQuiz from './NewQuiz';
import { createPageMetadata } from '@/config/metadata';

export const metadata = createPageMetadata({
  title: 'Hair Type Quiz - Find Your Pattern',
  description:
    'Take our pattern-based quiz to discover your hair type based on natural behavior and pattern recognition. Learn about shrinkage, elongation, and find personalized care recommendations.',
  path: '/hair-types/quiz',
  image: '/images/hair-types/open-graph.png',
});

export default function QuizPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="p-2 md:p-8">
        <NewQuiz />
      </div>
    </main>
  );
}
