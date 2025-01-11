import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getBundledDatabase,
  type Category,
} from 'haircare-ingredients-analyzer';
import { Metadata } from 'next';
import { slugToId, idToSlug } from '@/utils/slugs';
import { ArrowRight } from 'lucide-react';
import {
  generateGroupMetadata,
  getGroupStructuredData,
} from '@/utils/group-metadata';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const groupId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  const dbGroupId = Object.keys(database.groups).find(
    (id) => id.toLowerCase() === groupId,
  );

  if (!dbGroupId) {
    notFound();
  }

  const group = database.groups[dbGroupId];
  return generateGroupMetadata(dbGroupId, group.name, group.description);
}

export default async function GroupPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const groupId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  // Find the group
  const dbGroupId = Object.keys(database.groups).find(
    (id) => id.toLowerCase() === groupId,
  );

  if (!dbGroupId) {
    notFound();
  }

  const group = database.groups[dbGroupId];

  // Find all categories in this group
  const categories = Object.values(database.categories).filter(
    (cat: Category) => cat.group === dbGroupId,
  );

  // Try to get MDX content
  let Content;
  try {
    Content = (await import(`@/content/groups/${dbGroupId}.mdx`)).default;
  } catch (e) {
    // MDX content not found - that's okay, we'll use basic info
    Content = null;
  }

  const structuredData = getGroupStructuredData(
    dbGroupId,
    group.name,
    group.description,
  );

  return (
    <div className="bg-base-100 p-0 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-4">
          <Link href="/categories" className="btn btn-ghost btn-sm">
            ← Back to Groups
          </Link>
        </div>

        <div className="space-y-6">
          {/* Group Information */}
          <div className="bg-base-100 text-base-content">
            {Content ? (
              <div className="prose prose-base mt-4 max-w-none">
                <Content />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">{group.name}</h1>
                {group.description && (
                  <p className="text-base-content/70 mb-6">
                    {group.description}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Categories Table */}
          <div className="text-base-content">
            <div className="">
              <h2 className="card-title text-2xl mb-4">
                Categories in this Group
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${idToSlug(category.id)}`}
                    className="card bg-base-100 hover:bg-base-300 transition-colors duration-200 cb-border border-primary"
                  >
                    <div className="card-body">
                      <h3 className="card-title text-lg">{category.name}</h3>
                      {category.description && (
                        <p className="text-base-content/70 text-sm">
                          {category.description}
                        </p>
                      )}
                      <div className="card-actions justify-end mt-2">
                        <div className="btn btn-primary btn-sm gap-1">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
