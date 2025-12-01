import NewQuiz from './NewQuiz';

export const metadata = {
  title: 'Hair Type Quiz - Find Your Pattern',
  description:
    'Take our pattern-based quiz to discover your hair type based on natural behavior and pattern recognition.',
};

export default function QuizPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="p-2 md:p-8">
        <NewQuiz />
      </div>
    </main>
  );
}
