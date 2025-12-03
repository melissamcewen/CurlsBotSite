import { createPageMetadata } from '@/config/metadata';

export const metadata = createPageMetadata({
  title: 'Hair Types - Pattern-Based Classification System',
  description:
    'Discover your hair pattern using our new classification system based on natural behavior and pattern recognition, not just appearance.',
  path: '/hair-types',
});

export default function HairTypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

