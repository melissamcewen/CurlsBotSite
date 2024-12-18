import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { getCategoryContent } from '@/utils/markdown';
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
  const categoryId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  const dbCategoryId = Object.keys(database.categories).find(
    id => id.toLowerCase() === categoryId
  );

  if (!dbCategoryId) {
    notFound();
  }

  const category = database.categories[dbCategoryId];
  const markdownContent = await getCategoryContent(dbCategoryId);

  return {
    title: markdownContent?.frontmatter?.title || category.name,
    description: markdownContent?.frontmatter?.description || category.description || `Hair care ingredients in the ${category.name} category`,
    robots: markdownContent ? undefined : 'noindex',
  };
}

interface Category {
  id: string;
  name: string;
  description?: string;
  group?: string;
}

interface Ingredient {
  id: string;
  name: string;
  categories: string[];
  synonyms: string[];
  description?: string;
}

export default async function CategoryPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name);
  const categoryId = slugToId(decodedName.toLowerCase());
  const database = getBundledDatabase();

  // Find the category
  const dbCategoryId = Object.keys(database.categories).find(
    id => id.toLowerCase() === categoryId
  );

  if (!dbCategoryId) {
    notFound();
  }

  const category = database.categories[dbCategoryId];

  // Find all ingredients in this category
  const ingredients = Object.values(database.ingredients).filter(
    (ing: Ingredient) => ing.categories.includes(dbCategoryId)
  );

  // Try to get markdown content
  const markdownContent = await getCategoryContent(dbCategoryId);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-4">
        <Link href="/categories" className="btn btn-ghost btn-sm">
          ← Back to Categories
        </Link>
      </div>

      <div className="space-y-6">
        {/* Category Information */}
        <div className="card bg-base-100 shadow-xl text-base-content">
          <div className="card-body">
            <h1 className="card-title text-3xl">
              {markdownContent?.frontmatter?.title || category.name}
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
                {category.description && (
                  <p className="text-base-content/70 mt-2">{category.description}</p>
                )}
              </>
            )}
            {category.group && (
              <div className="badge badge-secondary mt-2">
                <Link href={`/groups/${idToSlug(category.group)}`}>
                  Group: {category.group}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients Table */}
        <div className="card bg-base-100 shadow-xl text-base-content">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Ingredients in this Category</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                      <td className="font-medium">{ingredient.name}</td>
                      <td className="max-w-md">
                        {ingredient.description ? (
                          <p className="truncate">{ingredient.description}</p>
                        ) : (
                          <span className="text-base-content/50">No description available</span>
                        )}
                      </td>
                      <td>
                        <Link
                          href={`/ingredients/${idToSlug(ingredient.id)}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
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
  );
}
