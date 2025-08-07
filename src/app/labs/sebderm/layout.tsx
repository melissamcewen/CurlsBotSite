import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Malassezia Haircare Ingredients Checker - Sebderm Safe Products',
  description:
    'Check if your haircare products contain ingredients that feed Malassezia yeast and can cause seborrheic dermatitis. Analyze ingredients for sebderm-safe products.',
  openGraph: {
    title: 'Malassezia Haircare Ingredients Checker - Sebderm Safe Products',
    description:
      'Check if your haircare products contain ingredients that feed Malassezia yeast and can cause seborrheic dermatitis. Analyze ingredients for sebderm-safe products.',
  },
  keywords: [
    'malassezia',
    'haircare ingredients checker',
    'sebderm safe products',
    'seborrheic dermatitis',
    'malassezia yeast',
    'haircare analysis',
    'ingredients analyzer',
    'sebderm triggers',
    'haircare ingredients',
    'malassezia feed ingredients',
  ],
};

export default function SebdermLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
