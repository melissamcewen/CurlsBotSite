import { Metadata } from 'next';
import { getQuizResult } from '../quizData';
import QuizResult from '../QuizResult';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    type: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  try {
    const result = getQuizResult(params.type);
    return {
      title: `Hair Type ${result.type.toUpperCase()} - Guide and Best Routine`,
      description: `Learn about your ${result.type.toUpperCase()} hair type in both Andre Walker's original system and the Common hair typing system. Get detailed insights about your hair's characteristics and a custom routine.`,
    };
  } catch (e) {
    return {
      title: 'Hair Type Not Found',
      description: 'The requested hair type could not be found.',
    };
  }
}

export default async function HairTypePage(props: Props) {
  const params = await props.params;
  try {
    const result = getQuizResult(params.type);
    return (
      <main className="container mx-auto px-4 py-8">
        <QuizResult result={result} showFeedback={true} />
      </main>
    );
  } catch (e) {
    notFound();
  }
}
