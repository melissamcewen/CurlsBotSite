import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { idToSlug } from '@/utils/slugs';
import { Metadata } from 'next';

interface Category {
  id: string;
  name: string;
  description?: string;
  group?: string;
}

interface CategoryWithId {
  id: string;
  category: Category;
}

export const metadata: Metadata = {
  title: 'Hair Care Categories',
  description:
    'Browse hair care ingredients by category, including sulfates, silicones, proteins, and more.',
};

export default function CategoriesPage() {
  const database = getBundledDatabase();

  // Get all categories and group them
  const categoriesByGroup = Object.entries(database.categories).reduce<{
    [key: string]: CategoryWithId[];
  }>((acc, [id, category]) => {
    const group = category.group || 'Uncategorized';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push({ id, category });
    return acc;
  }, {});

  // Sort groups
  const sortedGroups = Object.keys(categoriesByGroup).sort((a, b) => {
    if (a === 'Uncategorized') return 1;
    if (b === 'Uncategorized') return -1;
    return a.localeCompare(b);
  });

  // Prepare structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hair Care Categories',
    description:
      'Browse hair care ingredients by category, including sulfates, silicones, proteins, and more.',
    numberOfItems: Object.values(database.categories).length,
    itemListElement: Object.entries(database.categories).map(
      ([id, category], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.name,
          description: category.description,
          url: `https://curlsbot.com/categories/${idToSlug(id)}`,
        },
      }),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>

        <div className="space-y-8">
          {sortedGroups.map((groupId) => {
            const group = database.groups[groupId];
            const categories = categoriesByGroup[groupId];

            return (
              <div key={groupId} className="card bg-base-100">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title text-2xl">
                      {groupId === 'Uncategorized'
                        ? 'Uncategorized'
                        : group?.name || groupId}
                    </h2>
                    {groupId !== 'Uncategorized' && (
                      <Link
                        href={`/groups/${idToSlug(groupId)}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Group Details
                      </Link>
                    )}
                  </div>

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
                          .sort((a, b) =>
                            a.category.name.localeCompare(b.category.name),
                          )
                          .map(({ id, category }) => (
                            <tr key={id}>
                              <td className="font-medium">{category.name}</td>
                              <td className="max-w-md">
                                {category.description ? (
                                  <p className="truncate">
                                    {category.description}
                                  </p>
                                ) : (
                                  <span className="text-base-content/50">
                                    No description available
                                  </span>
                                )}
                              </td>
                              <td>
                                <Link
                                  href={`/categories/${idToSlug(id)}`}
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
            );
          })}
        </div>
      </div>
    </>
  );
}
