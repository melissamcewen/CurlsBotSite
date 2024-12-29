import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { idToSlug } from '@/utils/slugs';
import { Metadata } from 'next';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

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
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();
    // Special cases first
    if (aLower === 'uncategorized' || bLower === 'uncategorized') {
      if (aLower === 'uncategorized') return 1;
      if (bLower === 'uncategorized') return -1;
    }
    if (aLower === 'others' || bLower === 'others') {
      if (aLower === 'others') return 1;
      if (bLower === 'others') return -1;
    }
    // Normal alphabetical sorting for everything else
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
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">
          Curly/Wavy Hair Ingredients Guides
        </h1>

        <div className="space-y-12">
          {sortedGroups.map((groupId) => {
            const group = database.groups[groupId];
            const categories = categoriesByGroup[groupId];

            return (
              <div key={groupId} className="space-y-4">
                <div className="flex items-center justify-between border-l-4 border-primary pl-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {groupId === 'Uncategorized'
                        ? 'Uncategorized'
                        : group?.name || groupId}
                    </h2>
                    {group?.description && (
                      <p className="text-base-content/70 mt-1">
                        {group.description}
                      </p>
                    )}
                  </div>
                  {groupId !== 'Uncategorized' && (
                    <Link
                      href={`/groups/${idToSlug(groupId)}`}
                      className="btn btn-primary"
                    >
                      Read the{' '}
                      {groupId === 'Uncategorized'
                        ? 'Uncategorized'
                        : group?.name || groupId}{' '}
                      Guide <ArrowRightIcon className="w-5 h-5 ml-4" />
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories
                    .sort((a, b) =>
                      a.category.name
                        .toLowerCase()
                        .localeCompare(b.category.name.toLowerCase()),
                    )
                    .map(({ id, category }) => (
                      <div key={id} className="card bg-base-200">
                        <div className="card-body">
                          <h3 className="card-title">{category.name}</h3>
                          <p className="text-base-content/70 flex-grow">
                            {category.description || 'No description available'}
                          </p>
                          <div className="card-actions justify-end mt-4">
                            <Link
                              href={`/categories/${idToSlug(id)}`}
                              className="btn btn-primary btn-sm"
                            >
                              Read guide{' '}
                              <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
