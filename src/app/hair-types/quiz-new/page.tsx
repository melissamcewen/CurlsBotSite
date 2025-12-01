import NewQuiz from '../quiz/NewQuiz';

export const metadata = {
  title: 'Hair Type Quiz (New) - Find Your Pattern',
  description:
    'Take our new pattern-based quiz to discover your hair type based on natural behavior and pattern recognition.',
};

export default function NewQuizPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="p-2 md:p-8">
        <NewQuiz />
      </div>
    </main>
  );
}

