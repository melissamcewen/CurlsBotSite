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

export const metadata: Metadata = {
  title: 'Hair Care Groups',
  description:
    'Browse hair care ingredients by groups, such as surfactants, oils, proteins, and more.',
};

export default function GroupsPage() {
  const database = getBundledDatabase();

  // Get all unique groups and their categories
  const groupsMap = Object.entries(database.categories).reduce<
    Record<string, Category[]>
  >((acc, [id, category]) => {
    if (category.group) {
      if (!acc[category.group]) {
        acc[category.group] = [];
      }
      acc[category.group].push({ ...category, id });
    }
    return acc;
  }, {});

  // Sort groups alphabetically
  const sortedGroups = Object.keys(groupsMap).sort();

  // Prepare structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hair Care Groups',
    description:
      'Browse hair care ingredients by groups, such as surfactants, oils, proteins, and more.',
    numberOfItems: sortedGroups.length,
    itemListElement: sortedGroups.map((groupId, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: database.groups[groupId]?.name || groupId,
        description: database.groups[groupId]?.description,
        url: `https://curlsbot.com/groups/${idToSlug(groupId)}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-base-content">Groups</h1>

        <div className="space-y-8">
          {sortedGroups.map((groupName) => (
            <div key={groupName} className="card bg-base-100">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title text-2xl">
                    {database.groups[groupName]?.name}
                  </h2>
                  <Link
                    href={`/groups/${idToSlug(groupName)}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Group Details
                  </Link>
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
                      {groupsMap[groupName]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((category) => (
                          <tr key={category.id}>
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
                                href={`/categories/${idToSlug(category.id)}`}
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
    </>
  );
}
