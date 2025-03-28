import Quiz from './Quiz';

export const metadata = {
  title: 'Hair Type Quiz - Find Your Hair Type',
  description: 'Take our quiz to discover your hair type. Learn whether you have straight, wavy, curly, or coily hair and get personalized hair care recommendations.',
};

export default function QuizPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Hair Type Quiz</h1>
      <Quiz />
    </main>
  );
}
