import { notFound } from 'next/navigation';
import { slugToId } from '@/utils/slugs';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function GroupPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const groupId = slugToId(decodedName.toLowerCase());

  // Try to get MDX content
  let Content;
  try {
    Content = (await import(`@/content/groups/${groupId}.mdx`)).default;
  } catch (e) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="prose prose-base mt-4 max-w-none">
        <Content />
      </div>
    </div>
  );
}
