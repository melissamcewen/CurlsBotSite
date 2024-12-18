import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { getIngredientContent } from '@/utils/markdown';
import { Metadata } from 'next';
import { Card, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';

interface PageProps {
  params: {
    name: string;
  };
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedName = decodeURIComponent(params.name).toLowerCase();
  const database = getBundledDatabase();

  const ingredient = Object.values(database.ingredients).find(
    (ing: any) => ing.id.toLowerCase() === decodedName ||
           ing.name.toLowerCase() === decodedName ||
           ing.synonyms.some((syn: string) => syn.toLowerCase() === decodedName)
  );

  if (!ingredient) {
    notFound();
  }

  // Check for markdown content
  const markdownContent = await getIngredientContent(ingredient.id);

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
          <Card>
            <CardTitle>
              {markdownContent.frontmatter.title || ingredient.name}
            </CardTitle>
            {markdownContent.frontmatter.description && (
              <CardDescription>
                {markdownContent.frontmatter.description}
              </CardDescription>
            )}
            <CardContent className="prose prose-base mt-4 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: markdownContent.content }} />
            </CardContent>
          </Card>
        )}

        {/* Database Content Card */}
        <Card className="border border-base-300">
          <CardContent>
            {!markdownContent && (
              <CardTitle className="mb-6">{ingredient.name}</CardTitle>
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
                <CardTitle className="mb-4">Category Details</CardTitle>
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
                <CardTitle className="mb-4">Learn More</CardTitle>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
