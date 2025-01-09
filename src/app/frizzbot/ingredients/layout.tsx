import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FrizzBot Ingredients Analysis',
  description:
    'Analyze your hair products to understand their potential for causing or preventing frizz. Check ingredients and get personalized recommendations.',
  openGraph: {
    title: 'FrizzBot Ingredients Analysis',
    description:
      'Analyze your hair products to understand their potential for causing or preventing frizz.',
  },
};

export default function FrizzBotIngredientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
