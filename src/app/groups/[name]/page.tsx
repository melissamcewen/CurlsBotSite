import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { getGroupContent } from '@/utils/markdown';
import { Metadata } from 'next';
import { slugToId, idToSlug } from '@/utils/slugs';

interface PageProps {
  params: {
    name: string;
  };
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedName = decodeURIComponent(params.name);
  const groupId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  const dbGroupId = Object.keys(database.groups).find(
    id => id.toLowerCase() === groupId
  );

  if (!dbGroupId) {
    notFound();
  }

  const group = database.groups[dbGroupId];
  const markdownContent = await getGroupContent(dbGroupId);

  return {
    title: markdownContent?.frontmatter?.title || group.name,
    description: markdownContent?.frontmatter?.description || group.description || `Hair care ingredients in the ${group.name} group`,
    robots: markdownContent ? undefined : 'noindex',
  };
}

interface Group {
  id: string;
  name: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  group?: string;
}

export default async function GroupPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name);
  const groupId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  // Find the group
  const dbGroupId = Object.keys(database.groups).find(
    id => id.toLowerCase() === groupId
  );

  if (!dbGroupId) {
    notFound();
  }

  const group = database.groups[dbGroupId];

  // Find all categories in this group
  const categories = Object.values(database.categories).filter(
    (cat: Category) => cat.group === dbGroupId
  );

  // Try to get markdown content
  const markdownContent = await getGroupContent(dbGroupId);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-4">
        <Link href="/groups" className="btn btn-ghost btn-sm">
          ← Back to Groups
        </Link>
      </div>

      <div className="space-y-6">
        {/* Group Information */}
        <div className="card bg-base-100 shadow-xl text-base-content">
          <div className="card-body">
            <h1 className="card-title text-3xl">
              {markdownContent?.frontmatter?.title || group.name}
            </h1>
            {markdownContent ? (
              <>
                {markdownContent.frontmatter.description && (
                  <p className="text-base-content/70 mt-2">
                    {markdownContent.frontmatter.description}
                  </p>
                )}
                <div
                  className="prose prose-base mt-4 max-w-none"
                  dangerouslySetInnerHTML={{ __html: markdownContent.content }}
                />
              </>
            ) : (
              <>
                {group.description && (
                  <p className="text-base-content/70 mt-2">{group.description}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Categories Table */}
        <div className="card bg-base-100 shadow-xl text-base-content">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Categories in this Group</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="font-medium">{category.name}</td>
                      <td className="max-w-md">
                        {category.description ? (
                          <p className="truncate">{category.description}</p>
                        ) : (
                          <span className="text-base-content/50">No description available</span>
                        )}
                      </td>
                      <td>
                        <Link
                          href={`/categories/${idToSlug(category.id)}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
