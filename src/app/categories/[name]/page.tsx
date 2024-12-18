import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';

interface PageProps {
  params: {
    name: string;
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

export default function CategoryPage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name).toLowerCase();
  const database = getBundledDatabase();

  // Find the category
  const categoryId = Object.keys(database.categories).find(
    id => id.toLowerCase() === decodedName
  );

  if (!categoryId) {
    notFound();
  }

  const category = database.categories[categoryId];

  // Find all ingredients in this category
  const ingredients = Object.values(database.ingredients).filter(
    (ing: Ingredient) => ing.categories.includes(categoryId)
  );

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
            <h1 className="card-title text-3xl">{category.name}</h1>
            {category.description && (
              <p className="text-base-content/70 mt-2">{category.description}</p>
            )}
            {category.group && (
              <div className="badge badge-secondary mt-2">Group: {category.group}</div>
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
                          href={`/ingredients/${encodeURIComponent(ingredient.id)}`}
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
