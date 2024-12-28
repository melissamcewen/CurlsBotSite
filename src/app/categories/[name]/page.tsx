import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { getCategoryContent } from '@/utils/markdown';
import { ReferencesList } from '@/components/references/ReferencesList';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Metadata } from 'next';
import { slugToId, idToSlug } from '@/utils/slugs';

interface PageProps {
  params: {
    name: string;
  };
}

// Generate metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const decodedName = decodeURIComponent(params.name);
  const categoryId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  const dbCategoryId = Object.keys(database.categories).find(
    (id) => id.toLowerCase() === categoryId,
  );

  if (!dbCategoryId) {
    notFound();
  }

  const category = database.categories[dbCategoryId];
  const markdownContent = await getCategoryContent(dbCategoryId);

  const title = markdownContent?.frontmatter?.title || category.name;
  const description =
    markdownContent?.frontmatter?.description ||
    category.description ||
    `Hair care ingredients in the ${category.name} category`;

  const url = `https://curlsbot.com/categories/${params.name}`;

  return {
    title: title + ' for curly/wavy hair',
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: `${category.name} - Hair Care Ingredients Category`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-default.png'],
    },
    robots: markdownContent
      ? {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        }
      : {
          index: false,
          follow: true,
        },
  };
}

interface Category {
  id: string;
  name: string;
  description?: string;
  group?: string;
  references?: Array<{
    url: string;
    status?: string;
    title?: string;
    type?: string;
  }>;
}

interface Ingredient {
  id: string;
  name: string;
  categories: string[];
  synonyms?: string[];
  description?: string;
}

export default async function CategoryPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name);
  const categoryId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  // Find the category
  const dbCategoryId = Object.keys(database.categories).find(
    (id) => id.toLowerCase() === categoryId,
  );

  if (!dbCategoryId) {
    notFound();
  }

  const category = database.categories[dbCategoryId];

  // Get group info if it exists
  const groupInfo = category.group ? database.groups[category.group] : null;

  // Find all ingredients in this category
  const ingredients = Object.values(database.ingredients).filter(
    (ingredient: Ingredient) => ingredient.categories.includes(dbCategoryId),
  );

  // Try to get markdown content
  const markdownContent = await getCategoryContent(dbCategoryId);

  // Build breadcrumbs
  const breadcrumbs = [{ href: '/categories', label: 'Categories' }];

  if (groupInfo) {
    breadcrumbs.unshift({
      href: `/groups/${idToSlug(category.group)}`,
      label: groupInfo.name,
    });
    breadcrumbs.unshift({ href: '/groups', label: 'Groups' });
  }

  breadcrumbs.push({
    href: `/categories/${params.name}`,
    label: category.name,
  });

  // Prepare structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: markdownContent?.frontmatter?.title || category.name,
    description:
      markdownContent?.frontmatter?.description ||
      category.description ||
      `Hair care ingredients in the ${category.name} category`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: item.label,
          '@id': `https://curlsbot.com${item.href}`,
        },
      })),
    },
    mainEntity: {
      '@type': 'ItemList',
      name: `Ingredients in ${category.name}`,
      numberOfItems: ingredients.length,
      itemListElement: ingredients.map((ingredient, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: ingredient.name,
          description: ingredient.description,
          url: `https://curlsbot.com/ingredients/${idToSlug(ingredient.id)}`,
        },
      })),
    },
    ...(category.references && {
      citation: category.references.map((ref) => ({
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
        <Breadcrumbs items={breadcrumbs} />

        <div className="space-y-6">
          {/* Category Information */}
          <div className="card bg-base-100  text-base-content">
            <div className="card-body">
              {markdownContent ? (
                <div
                  className="prose prose-base mt-4 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: markdownContent.content,
                  }}
                />
              ) : (
                <>
                  <h1 className="card-title text-3xl">{category.name}</h1>
                  {category.description && (
                    <p className="text-base-content/70 mt-2">
                      {category.description}
                    </p>
                  )}
                </>
              )}
              {category.group && (
                <div className="badge badge-secondary mt-2">
                  <Link href={`/groups/${idToSlug(category.group)}`}>
                    Group: {groupInfo?.name}
                  </Link>
                </div>
              )}

              {/* References */}
              {category.references && (
                <ReferencesList references={category.references} />
              )}
            </div>
          </div>

          {/* Ingredients Table */}
          <div className="card bg-base-100  text-base-content">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Ingredients in this Category
              </h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((ingredient) => (
                        <tr key={ingredient.id}>
                          <td>
                            <div className="space-y-1">
                              <Link
                                href={`/ingredients/${idToSlug(ingredient.id)}`}
                                className="link-primary hover:text-primary font-medium"
                              >
                                {ingredient.name}
                              </Link>
                              {ingredient.description && (
                                <p className="text-xs text-base-content/70">
                                  {ingredient.description}
                                </p>
                              )}
                            </div>
                          </td>
                          <td>
                            {ingredient.status ? (
                              <span
                                className={`badge ${
                                  ingredient.status === 'warning'
                                    ? 'badge-error'
                                    : ingredient.status === 'caution'
                                    ? 'badge-warning'
                                    : 'badge-info'
                                }`}
                              >
                                {ingredient.status}
                              </span>
                            ) : (
                              <span className="badge badge-ghost">unknown</span>
                            )}
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
    </>
  );
}
