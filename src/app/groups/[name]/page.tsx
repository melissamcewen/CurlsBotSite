import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { getGroupContent } from '@/utils/markdown';
import { Metadata } from 'next';

interface PageProps {
  params: {
    name: string;
  };
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedName = decodeURIComponent(params.name);
  const database = getBundledDatabase();

  // Convert hyphenated URL to space-separated group name
  const groupNameFormatted = decodedName.replace(/-/g, ' ');

  // Find all categories in this group
  const categories = Object.entries(database.categories)
    .filter(([_, category]) =>
      category.group?.toLowerCase() === groupNameFormatted.toLowerCase()
    )
    .map(([id, category]) => ({
      ...category,
      id
    }));

  if (categories.length === 0) {
    notFound();
  }

  const groupName = categories[0].group;
  const markdownContent = await getGroupContent(decodedName);

  return {
    title: markdownContent?.frontmatter?.title || groupName,
    description: markdownContent?.frontmatter?.description || `Hair care ingredient categories in the ${groupName} group`,
    robots: markdownContent ? undefined : 'noindex',
  };
}

interface Category {
  id: string;
  name: string;
  description?: string;
  group?: string;
}

export default async function GroupPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name);
  const database = getBundledDatabase();

  // Convert hyphenated URL to space-separated group name
  const groupNameFormatted = decodedName.replace(/-/g, ' ');

  // Find all categories in this group
  const categories = Object.entries(database.categories)
    .filter(([_, category]) =>
      category.group?.toLowerCase() === groupNameFormatted.toLowerCase()
    )
    .map(([id, category]) => ({
      ...category,
      id
    }));

  if (categories.length === 0) {
    notFound();
  }

  // Get the group name from the first category (they all have the same group)
  const groupName = categories[0].group;

  // Try to get markdown content
  const markdownContent = await getGroupContent(decodedName);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-4">
        <Link href="/categories" className="btn btn-ghost btn-sm">
          ← Back to Categories
        </Link>
      </div>

      <div className="space-y-6">
        {/* Group Information */}
        <div className="card bg-base-100 shadow-xl text-base-content">
          <div className="card-body">
            <h1 className="card-title text-3xl">
              {markdownContent?.frontmatter?.title || groupName}
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
              <p className="text-base-content/70 mt-2">
                A collection of categories related to {groupName?.toLowerCase()}.
              </p>
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
                    <th>Category</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(category => (
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
                            href={`/categories/${encodeURIComponent(category.id)}`}
                            className="btn btn-primary btn-sm"
                          >
                            View Category
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
