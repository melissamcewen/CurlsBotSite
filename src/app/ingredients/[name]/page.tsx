import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { getIngredientContent } from '@/utils/markdown';

interface PageProps {
  params: {
    name: string;
  };
}

interface Ingredient {
  id: string;
  name: string;
  categories: string[];
  synonyms: string[];
  references?: string[];
  description?: string;
}

export default async function IngredientPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name).toLowerCase();
  const database = getBundledDatabase();

  // Find the ingredient in our data
  const ingredient = Object.values(database.ingredients).find(
    (ing: Ingredient) => ing.id.toLowerCase() === decodedName ||
           ing.name.toLowerCase() === decodedName ||
           ing.synonyms.some(syn => syn.toLowerCase() === decodedName)
  );

  if (!ingredient) {
    notFound();
  }

  // Get category information
  const categories = ingredient.categories.map(categoryId => {
    const category = database.categories[categoryId];
    return {
      id: categoryId,
      name: category?.name || categoryId,
      description: category?.description,
      group: category?.group
    };
  });

  // Try to get markdown content
  const markdownContent = await getIngredientContent(ingredient.id);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-4">
        <Link href="/ingredients" className="btn btn-ghost btn-sm">
          ← Back to Search
        </Link>
      </div>

      <div className="space-y-6">
        {/* Markdown Content Card (if available) */}
        {markdownContent && (
          <div className="card bg-base-100 shadow-xl text-base-content">
            <div className="card-body">
              <h1 className="card-title text-3xl">
                {markdownContent.frontmatter.title || ingredient.name}
              </h1>
              {markdownContent.frontmatter.description && (
                <p className="text-base-content/70">
                  {markdownContent.frontmatter.description}
                </p>
              )}
              <div
                className="prose prose-base mt-4 max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownContent.content }}
              />
            </div>
          </div>
        )}

        {/* Database Content Card */}
        <div className="card bg-base-100 text-base-content shadow-xl border border-base-300">
          <div className="card-body">
            {!markdownContent && (
              <h1 className="card-title text-3xl mb-6">{ingredient.name}</h1>
            )}

            {/* Basic Information Table */}
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <tbody>
                  {/* ID */}
                  <tr>
                    <th className="w-1/4">ID</th>
                    <td>{ingredient.id}</td>
                  </tr>

                  {/* Name */}
                  <tr>
                    <th>Name</th>
                    <td>{ingredient.name}</td>
                  </tr>

                  {/* Categories */}
                  <tr>
                    <th>Categories</th>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className="badge badge-primary"
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>

                  {/* Synonyms */}
                  {ingredient.synonyms.length > 0 && (
                    <tr>
                      <th>Also Known As</th>
                      <td>
                        <ul className="list-disc list-inside">
                          {ingredient.synonyms.map((synonym) => (
                            <li key={synonym} className="text-sm">
                              {synonym}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Category Details Table */}
            {categories.some(category => category.description) && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Category Details</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) =>
                        category.description ? (
                          <tr key={category.id}>
                            <td className="font-medium w-1/4">{category.name}</td>
                            <td>{category.description}</td>
                          </tr>
                        ) : null
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* References Table */}
            {ingredient.references && ingredient.references.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Learn More</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredient.references.map((ref) => (
                        <tr key={ref}>
                          <td className="w-1/4">
                            {new URL(ref).hostname.replace('www.', '')}
                          </td>
                          <td>
                            <a
                              href={ref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link link-primary"
                            >
                              View Source
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
