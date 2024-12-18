import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { getIngredientContent } from '@/utils/markdown';
import { Metadata } from 'next';
import { slugToId, idToSlug } from '@/utils/slugs';

interface PageProps {
  params: {
    name: string;
  };
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedName = decodeURIComponent(params.name);
  const ingredientId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  const dbIngredientId = Object.keys(database.ingredients).find(
    id => id.toLowerCase() === ingredientId
  );

  if (!dbIngredientId) {
    notFound();
  }

  const ingredient = database.ingredients[dbIngredientId];
  const markdownContent = await getIngredientContent(dbIngredientId);

  return {
    title: markdownContent?.frontmatter?.title || ingredient.name,
    description: markdownContent?.frontmatter?.description || ingredient.description || `Information about ${ingredient.name} in hair care products`,
    robots: markdownContent ? undefined : 'noindex',
  };
}

interface Ingredient {
  id: string;
  name: string;
  categories: string[];
  synonyms: string[];
  description?: string;
}

export default async function IngredientPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name);
  const ingredientId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  // Find the ingredient
  const dbIngredientId = Object.keys(database.ingredients).find(
    id => id.toLowerCase() === ingredientId
  );

  if (!dbIngredientId) {
    notFound();
  }

  const ingredient = database.ingredients[dbIngredientId];

  // Try to get markdown content
  const markdownContent = await getIngredientContent(dbIngredientId);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-4">
        <Link href="/ingredients" className="btn btn-ghost btn-sm">
          ← Back to Ingredients
        </Link>
      </div>

      <div className="space-y-6">
        {/* Ingredient Information */}
        <div className="card bg-base-100 shadow-xl text-base-content">
          <div className="card-body">
            <h1 className="card-title text-3xl">
              {markdownContent?.frontmatter?.title || ingredient.name}
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
              <>
                {ingredient.description && (
                  <p className="text-base-content/70 mt-2">{ingredient.description}</p>
                )}
              </>
            )}

            {/* Categories */}
            {ingredient.categories.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {ingredient.categories.map(categoryId => {
                    const category = database.categories[categoryId];
                    return (
                      <Link
                        key={categoryId}
                        href={`/categories/${idToSlug(categoryId)}`}
                        className="badge badge-primary"
                      >
                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Synonyms */}
            {ingredient.synonyms.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Also Known As</h2>
                <div className="flex flex-wrap gap-2">
                  {ingredient.synonyms.map(synonym => (
                    <span key={synonym} className="badge badge-ghost">
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
