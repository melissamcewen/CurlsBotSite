import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const hairType = params.type;
  const title = `Type ${hairType.toUpperCase()} Hair - Characteristics and Care Guide`;
  const description = `Learn about Type ${hairType.toUpperCase()} hair characteristics, care tips, styling techniques, and product recommendations. Find out how to best care for your Type ${hairType.toUpperCase()} hair.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function HairTypePage(props: PageProps) {
  const params = await props.params;
  const hairType = params.type;

  // Try to get MDX content
  let Content;
  try {
    Content = (await import(`@/content/hair-types/${hairType}.mdx`)).default;
  } catch (e) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Type ${hairType.toUpperCase()} Hair Guide`,
    description: `Comprehensive guide for Type ${hairType.toUpperCase()} hair care and styling`,
    articleSection: 'Hair Care',
  };

  return (
    <div className="bg-base-100 p-0 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-4">
          <Link href="/hair-types" className="btn btn-ghost btn-sm">
            ← Back to Hair Types
          </Link>
        </div>

        <div className="prose prose-base mt-4 max-w-none">
          <Content />
        </div>
      </div>
    </div>
  );
}
