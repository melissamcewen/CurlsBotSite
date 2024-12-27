import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import {
  BookOpenIcon,
  BeakerIcon,
  ScissorsIcon,
} from '@heroicons/react/24/solid';
import { getIngredientContent } from '@/utils/markdown';
import { IngredientDetailsCard } from '@/components/ingredients/IngredientDetailsCard';
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
  const ingredientId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  // Find the ingredient ID case-insensitively
  const dbIngredientId = Object.keys(database.ingredients).find(
    (id) => id.toLowerCase() === ingredientId.toLowerCase(),
  );

  if (!dbIngredientId) {
    notFound();
  }

  const ingredient = database.ingredients[dbIngredientId];
  // Use the slug version of the ID for the markdown file
  const markdownContent = await getIngredientContent(idToSlug(dbIngredientId));

  // Only index if there's markdown content or references
  const shouldIndex =
    markdownContent !== null ||
    (ingredient.references && ingredient.references.length > 0);

  // Create JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ChemicalSubstance',
    name: ingredient.name,
    description:
      markdownContent?.frontmatter?.description ||
      ingredient.description ||
      `Information about ${ingredient.name} in hair care products`,
    ...(ingredient.synonyms &&
      ingredient.synonyms.length > 0 && {
        alternateName: ingredient.synonyms,
      }),
    url: `https://curlsbot.com/ingredients/${params.name}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://curlsbot.com/ingredients/${params.name}`,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'CurlsBot',
      url: 'https://curlsbot.com',
    },
    ...(ingredient.categories?.length > 0 && {
      category: ingredient.categories.map((categoryId) => {
        const category = database.categories[categoryId];
        return category.name;
      }),
    }),
    ...(ingredient.references &&
      ingredient.references.length > 0 && {
        citation: ingredient.references.map((ref) => ({
          '@type': 'CreativeWork',
          name: ref.title || 'Reference',
          url: ref.url,
          ...(ref.type && {
            // Map reference types to schema.org types
            additionalType:
              ref.type === 'science'
                ? 'ScholarlyArticle'
                : ref.type === 'author'
                ? 'Article'
                : 'WebPage',
          }),
        })),
      }),
  };

  return {
    title: markdownContent?.frontmatter?.title || ingredient.name,
    description:
      markdownContent?.frontmatter?.description ||
      ingredient.description ||
      `Information about ${ingredient.name} in hair care products`,
    robots: shouldIndex ? undefined : 'noindex',
    other: {
      'application/ld+json': JSON.stringify(jsonLd),
    },
  };
}

interface Ingredient {
  id: string;
  name: string;
  categories: string[];
  synonyms?: string[];
  description?: string;
  references?: Array<{
    url: string;
    status?: string;
    title?: string;
    type?: string;
  }>;
}

export default async function IngredientPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name);
  console.log('URL param:', decodedName);

  const ingredientId = slugToId(decodedName.toLowerCase());
  console.log('Ingredient ID:', ingredientId);

  const database = getBundledDatabase();
  console.log('Database ingredients:', Object.keys(database.ingredients));

  // Find the ingredient ID case-insensitively
  const dbIngredientId = Object.keys(database.ingredients).find(
    (id) => id.toLowerCase() === ingredientId.toLowerCase(),
  );

  if (!dbIngredientId) {
    notFound();
  }

  console.log('Database Ingredient ID:', dbIngredientId);

  const ingredient = database.ingredients[dbIngredientId];

  // Get category and group info if available
  const primaryCategory = ingredient.categories[0];
  const categoryInfo = primaryCategory
    ? database.categories[primaryCategory]
    : null;
  const groupInfo = categoryInfo?.group
    ? database.groups[categoryInfo.group]
    : null;

  // Try to get markdown content
  const markdownContent = await getIngredientContent(idToSlug(dbIngredientId));
  console.log('Markdown Content:', markdownContent);

  // Build breadcrumbs
  const breadcrumbs = [{ href: '/ingredients', label: 'Ingredients' }];

  if (groupInfo && categoryInfo) {
    breadcrumbs.unshift({
      href: `/categories/${idToSlug(primaryCategory)}`,
      label: categoryInfo.name,
    });
    breadcrumbs.unshift({
      href: `/groups/${idToSlug(categoryInfo.group)}`,
      label: groupInfo.name,
    });
    breadcrumbs.unshift({ href: '/groups', label: 'Groups' });
  } else if (categoryInfo) {
    breadcrumbs.unshift({
      href: `/categories/${idToSlug(primaryCategory)}`,
      label: categoryInfo.name,
    });
    breadcrumbs.unshift({ href: '/categories', label: 'Categories' });
  }

  breadcrumbs.push({
    href: `/ingredients/${params.name}`,
    label: ingredient.name,
  });

  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-6">
        {/* Main content area */}
        <div className="lg:flex lg:gap-6">
          {/* Basic Info Card */}
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <div className="sticky top-4">
              <IngredientDetailsCard
                name={ingredient.name}
                description={ingredient.description}
                categories={ingredient.categories}
                synonyms={ingredient.synonyms}
                categoryNames={database.categories}
              />
            </div>
          </div>

          {/* Markdown and References Content */}
          <div className="lg:w-2/3">
            <div className="text-base-content">
              <div>
                {/* Markdown Content */}
                {markdownContent && (
                  <div>
                    <div
                      className="prose prose-base max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: markdownContent.content,
                      }}
                    />
                  </div>
                )}

                {/* References */}
                {ingredient.references && (
                  <ReferencesList references={ingredient.references} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
