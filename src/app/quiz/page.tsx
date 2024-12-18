import Quiz from './Quiz';

export default function QuizPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Hair Porosity Quiz</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Take this quiz to determine your hair porosity level. Hair porosity refers to your hair's ability to absorb and retain moisture. Understanding your hair porosity can help you choose the right products and treatments for your hair.
      </p>
      <Quiz />
    </div>
  );
}
