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
  const groups = Object.entries(database.groups);

  // Prepare structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hair Care Groups',
    description:
      'Browse hair care ingredients by groups, such as surfactants, oils, proteins, and more.',
    numberOfItems: groups.length,
    itemListElement: groups.map(([id, group], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: group.name,
        description: group.description,
        url: `https://curlsbot.com/groups/${idToSlug(id)}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Groups</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([groupId, group]) => (
            <div key={groupId} className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title">
                  <Link
                    href={`/groups/${idToSlug(groupId)}`}
                    className="hover:text-primary"
                  >
                    {group.name}
                  </Link>
                </h2>
                {group.description && (
                  <p className="text-base-content/70">{group.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
