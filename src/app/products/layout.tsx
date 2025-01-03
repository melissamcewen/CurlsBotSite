import { createPageMetadata } from '@/config/metadata';

export const metadata = createPageMetadata({
  title: 'Product Database',
  description: 'Browse our curated collection of curly and wavy hair products.',
  path: '/products',
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
