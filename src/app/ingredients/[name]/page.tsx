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

  return {
    title: markdownContent?.frontmatter?.title || ingredient.name,
    description:
      markdownContent?.frontmatter?.description ||
      ingredient.description ||
      `Information about ${ingredient.name} in hair care products`,
    robots: shouldIndex ? undefined : 'noindex',
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

  // Try to get markdown content - use the slug version of the ID for the file name
  const markdownContent = await getIngredientContent(idToSlug(dbIngredientId));
  console.log('Markdown Content:', markdownContent);

  const getTypeIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'author':
        return <BookOpenIcon className="w-4 h-4 inline-block mr-2" />;
      case 'science':
        return <BeakerIcon className="w-4 h-4 inline-block mr-2" />;
      case 'hairpro':
        return <ScissorsIcon className="w-4 h-4 inline-block mr-2" />;
      default:
        return null;
    }
  };

  // Status priority order for sorting
  const getStatusPriority = (status?: string) => {
    switch (status) {
      case 'good':
        return 1;
      case 'ok':
        return 2;
      case 'caution':
        return 3;
      case 'warning':
        return 4;
      default:
        return 5;
    }
  };

  // Sort references by status
  const sortedReferences =
    ingredient.references?.sort((a, b) => {
      return getStatusPriority(a.status) - getStatusPriority(b.status);
    }) || [];

  // Create an IngredientResult object for the IngredientItem component
  const ingredientResult = {
    name: ingredient.name,
    normalized: ingredient.name.toLowerCase(),
    status: 'ok' as const,
    reasons: [],
    ingredient: {
      id: dbIngredientId,
      name: ingredient.name,
      description: ingredient.description,
      categories: ingredient.categories,
    },
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="mb-4">
        <Link href="/ingredients" className="btn btn-ghost btn-sm">
          ← Back to Ingredients
        </Link>
      </div>

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
            <div className=" text-base-content">
              <div className="">
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
                {sortedReferences.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">References</h2>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th>Source</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedReferences.map((ref, index) => (
                            <tr key={index}>
                              <td>
                                <div className="flex items-center">
                                  {getTypeIcon(ref.type)}
                                  <a
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link link-primary"
                                  >
                                    {ref.title || 'Reference'}
                                  </a>
                                </div>
                              </td>
                              <td>
                                <span
                                  className={`cb-badge ${
                                    ref.status === 'good'
                                      ? 'badge-success'
                                      : ref.status === 'warning'
                                      ? 'badge-error'
                                      : ref.status === 'caution'
                                      ? 'badge-warning'
                                      : ref.status === 'ok'
                                      ? 'badge-info'
                                      : 'badge-ghost'
                                  }`}
                                >
                                  {ref.status || 'unknown'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-base-content/70">
                      <div className="flex items-center">
                        <BookOpenIcon className="w-4 h-4 mr-2" />
                        <span>Popular Author</span>
                      </div>
                      <div className="flex items-center">
                        <BeakerIcon className="w-4 h-4 mr-2" />
                        <span>Cosmetic Chemist</span>
                      </div>
                      <div className="flex items-center">
                        <ScissorsIcon className="w-4 h-4 mr-2" />
                        <span>Hair Professional</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
