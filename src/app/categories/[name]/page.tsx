import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getBundledDatabase,
  type Ingredient,
} from 'haircare-ingredients-analyzer';
import { Metadata } from 'next';
import { slugToId, idToSlug } from '@/utils/slugs';
import { Info } from 'lucide-react';
import {
  generateCategoryMetadata,
  getCategoryStructuredData,
} from '@/utils/category-metadata';
import { Notes } from '@/components/references/Notes';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  const categoryId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  const dbCategoryId = Object.keys(database.categories).find(
    (id) => id.toLowerCase() === categoryId,
  );

  if (!dbCategoryId) {
    notFound();
  }

  const category = database.categories[dbCategoryId];
  return generateCategoryMetadata(
    dbCategoryId,
    category.name,
    category.description,
  );
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
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

  // Find all ingredients in this category
  const ingredients = Object.values(database.ingredients).filter(
    (ing: Ingredient) => ing.categories?.includes(dbCategoryId),
  );

  // Debug logging
  console.log('Category ID:', dbCategoryId);
  console.log('Number of ingredients:', ingredients.length);
  console.log('First few ingredients:', ingredients.slice(0, 3));

  // Try to get MDX content
  let Content;
  try {
    Content = (await import(`@/content/categories/${dbCategoryId}.mdx`))
      .default;
  } catch (e) {
    // MDX content not found - that's okay, we'll use basic info
    Content = null;
  }

  const structuredData = getCategoryStructuredData(
    dbCategoryId,
    category.name,
    category.description,
  );

  return (
    <div className="bg-base-100 p-0 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-4">
          <Link href="/categories" className="btn btn-ghost btn-sm">
            ← Back to Categories
          </Link>
        </div>

        <div className="space-y-6">
          {/* Category Information */}
          <div className="bg-base-100 text-base-content">
            {Content ? (
              <div className="prose prose-base mt-4 max-w-none">
                <Content />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
                {category.description && (
                  <p className="text-base-content/70 mb-6">
                    {category.description}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <div className="bg-base-100 text-base-content">
              <h2 className="text-2xl font-bold mb-4">
                Ingredients in this Category
              </h2>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
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
                                className="link font-medium"
                              >
                                {ingredient.name}
                                {(ingredient.references?.length ?? 0) > 0 && (
                                  <Info className="w-4 h-4 inline-block ml-1 text-info" />
                                )}
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
          )}
          <Notes references={category.notes ?? []} />
        </div>
      </div>
    </div>
  );
}
