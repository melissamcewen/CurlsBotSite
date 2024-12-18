import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';

interface PageProps {
  params: {
    name: string;
  };
}

export default async function IngredientPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name).toLowerCase();
  const database = getBundledDatabase();

  // Find the ingredient in our data
  const ingredient = Object.values(database.ingredients).find(
    (ing) =>
      ing.id.toLowerCase() === decodedName ||
      ing.name.toLowerCase() === decodedName ||
      ing.synonyms.some((syn) => syn.toLowerCase() === decodedName),
  );

  if (!ingredient) {
    notFound();
  }

  // Get category information
  const categories = ingredient.categories.map((categoryId) => {
    const category = database.categories[categoryId];
    return {
      id: categoryId,
      name: category?.name || categoryId,
      description: category?.description,
      group: category?.group,
    };
  });

  return (
    <div className="container mx-auto p-4 max-w-4xl text-base-content">
      <div className="mb-4">
        <Link href="/" className="btn  btn-primary btn-sm">
          ← Back to Analysis
        </Link>
      </div>

      <div className="space-y-6">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h1 className="card-title text-3xl">{ingredient.name}</h1>

            {/* Categories */}
            <div className="mt-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="badge badge-primary mr-2 mb-2"
                >
                  {category.name}
                </div>
              ))}
            </div>

            {/* Category Descriptions */}
            {categories.map(
              (category) =>
                category.description && (
                  <div key={category.id} className="mt-2">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm opacity-70">{category.description}</p>
                  </div>
                ),
            )}

            {/* Alternative Names */}
            {ingredient.synonyms.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Also Known As</h2>
                <ul className="list-disc list-inside space-y-1">
                  {ingredient.synonyms.map((synonym) => (
                    <li key={synonym} className="text-sm opacity-70">
                      {synonym}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* References */}
            {ingredient.references && ingredient.references.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Learn More</h2>
                <ul className="space-y-2">
                  {ingredient.references.map((ref) => (
                    <li key={ref}>
                      <a
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary text-sm"
                      >
                        {new URL(ref).hostname.replace('www.', '')}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
