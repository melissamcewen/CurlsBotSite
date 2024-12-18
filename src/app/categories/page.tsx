import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { getGroupContent } from '@/utils/markdown';

interface Category {
  id: string;
  name: string;
  description?: string;
  group?: string;
}

export default async function CategoriesPage() {
  const database = getBundledDatabase();

  // Group categories by their group property
  const groupedCategories = Object.entries(database.categories).reduce<Record<string, Category[]>>(
    (acc, [id, category]) => {
      const group = category.group || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push({ ...category, id });
      return acc;
    },
    {}
  );

  // Sort groups alphabetically, but ensure 'Other' is last
  const sortedGroups = Object.keys(groupedCategories).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return a.localeCompare(b);
  });

  // Get markdown content for each group
  const groupsContent = await Promise.all(
    sortedGroups.map(async (group) => ({
      name: group,
      urlName: group.toLowerCase().replace(/\s+/g, '-'),
      markdown: await getGroupContent(group.toLowerCase().replace(/\s+/g, '-'))
    }))
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-base-content">Categories</h1>

      <div className="space-y-8">
        {groupsContent.map(({ name: group, urlName, markdown }) => (
          <div key={group} className="card bg-base-100 shadow-xl text-base-content">
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link
                    href={`/groups/${encodeURIComponent(urlName)}`}
                    className="hover:text-primary transition-colors"
                  >
                    <h2 className="card-title text-2xl">
                      {markdown?.frontmatter?.title || group}
                    </h2>
                  </Link>
                  {markdown?.frontmatter?.description && (
                    <p className="text-base-content/70 mt-2">
                      {markdown.frontmatter.description}
                    </p>
                  )}
                </div>
                <Link
                  href={`/groups/${encodeURIComponent(urlName)}`}
                  className="btn btn-primary btn-sm"
                >
                  View Group Details
                </Link>
              </div>

              {markdown && (
                <div
                  className="prose prose-base mb-6 max-w-none"
                  dangerouslySetInnerHTML={{ __html: markdown.content }}
                />
              )}

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
                    {groupedCategories[group]
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
        ))}
      </div>
    </div>
  );
}
