import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getBundledDatabase,
  type Category,
  type Group,
} from 'haircare-ingredients-analyzer';
import { getGroupContent } from '@/utils/markdown';
import { ReferencesList } from '@/components/references/ReferencesList';
import { Metadata } from 'next';
import { slugToId, idToSlug } from '@/utils/slugs';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

// Generate metadata
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
  const markdownContent = await getGroupContent(dbGroupId);

  // Find all categories in this group
  const categories = Object.values(database.categories).filter(
    (cat: Category) => cat.group === dbGroupId,
  );

  // Prepare structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: markdownContent?.frontmatter?.title || group.name,
    description:
      markdownContent?.frontmatter?.description ||
      group.description ||
      `Hair care ingredients in the ${group.name} group`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Categories in ${group.name}`,
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.name,
          description: category.description,
          url: `/categories/${idToSlug(category.id)}`,
        },
      })),
    },
    ...(group.references && {
      citation: group.references.map((ref) => ({
        '@type': 'CreativeWork',
        name: ref.title || 'Reference',
        url: ref.url,
      })),
    }),
  };

  return {
    title:
      markdownContent?.frontmatter?.title ||
      group.name + ' for curly/wavy hair | CurlsBot',
    description:
      markdownContent?.frontmatter?.description ||
      group.description ||
      `A guide to ${
        group.name
      } for curly/wavy hair. Learn about different types of ${group.name.toLowerCase()} and their effects on curly and wavy hair.`,
    robots: {
      ...(markdownContent
        ? {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          }
        : {
            index: false,
            follow: false,
          }),
    },
    alternates: {
      canonical: `/groups/${resolvedParams.name}`,
    },
    openGraph: {
      title:
        markdownContent?.frontmatter?.title ||
        group.name + ' for curly/wavy hair | CurlsBot',
      description:
        markdownContent?.frontmatter?.description ||
        group.description ||
        `A guide to ${
          group.name
        } for curly/wavy hair. Learn about different types of ${group.name.toLowerCase()} and their effects on curly and wavy hair.`,
      url: `/groups/${resolvedParams.name}`,
      type: 'article',
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: `${group.name} - Hair Care Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title:
        markdownContent?.frontmatter?.title ||
        group.name + ' for curly/wavy hair | CurlsBot',
      description:
        markdownContent?.frontmatter?.description ||
        group.description ||
        `A guide to ${
          group.name
        } for curly/wavy hair. Learn about different types of ${group.name.toLowerCase()} and their effects on curly and wavy hair.`,
      images: ['/images/og-default.png'],
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
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

  // Try to get markdown content
  const markdownContent = await getGroupContent(dbGroupId);

  // Prepare structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: markdownContent?.frontmatter?.title || group.name,
    description:
      markdownContent?.frontmatter?.description ||
      group.description ||
      `Hair care ingredients in the ${group.name} group`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Categories in ${group.name}`,
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.name,
          description: category.description,
          url: `/categories/${idToSlug(category.id)}`,
        },
      })),
    },
    ...(group.references && {
      citation: group.references.map((ref) => ({
        '@type': 'CreativeWork',
        name: ref.title || 'Reference',
        url: ref.url,
      })),
    }),
  };

  return (
    <>
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
          <div className=" bg-base-100  text-base-content">
            <div className="">
              {markdownContent ? (
                <div
                  className="prose prose-base mt-4 max-w-none"
                  dangerouslySetInnerHTML={{ __html: markdownContent.content }}
                />
              ) : (
                <>
                  <h1 className="card-title text-3xl">{group.name}</h1>
                  {group.description && (
                    <p className="text-base-content/70 mt-2">
                      {group.description}
                    </p>
                  )}
                </>
              )}

              {/* References */}
              {group.references && (
                <ReferencesList references={group.references} />
              )}
            </div>
          </div>

          {/* Categories Table */}
          <div className=" bg-base-100 text-base-content">
            <div className="">
              <h2 className="card-title text-2xl mb-4">
                Categories in this Group
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${idToSlug(category.id)}`}
                    className="card bg-base-200 hover:bg-base-300 transition-colors duration-200"
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
                          <ArrowRightIcon className="w-4 h-4" />
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
    </>
  );
}
