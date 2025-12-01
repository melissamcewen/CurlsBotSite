import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewQuizResult from '../../quiz/NewQuizResult';
import {
  isValidPatternType,
  HairPatternType,
} from '../../quiz/newTypes';

interface Props {
  params: Promise<{
    type: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const type = params.type;

  // Handle straight type
  if (type === 'straight') {
    return {
      title: 'Straight Hair - Hair Type Guide',
      description:
        'Learn about straight hair and find the right hair care approach for your hair type.',
    };
  }

  // Validate pattern type
  if (!isValidPatternType(type)) {
    return {
      title: 'Hair Type Not Found',
      description: 'The requested hair type could not be found.',
    };
  }

  // Import here to avoid circular dependency
  const { getPatternType } = await import('../../quiz/newTypes');
  const patternData = getPatternType(type as HairPatternType);

  return {
    title: `${patternData.displayName} - Hair Pattern Guide`,
    description: patternData.description,
  };
}

export default async function NewHairTypeResultPage(props: Props) {
  const params = await props.params;
  const type = params.type;

  // Handle straight type
  if (type === 'straight') {
    return (
      <main className="container mx-auto px-4 py-8">
        <NewQuizResult patternType="straight" />
      </main>
    );
  }

  // Validate pattern type
  if (!isValidPatternType(type)) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <NewQuizResult patternType={type as HairPatternType} />
    </main>
  );
}

