import Link from 'next/link';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';

interface Category {
  id: string;
  name: string;
  description?: string;
  group?: string;
}

export default function GroupsPage() {
  const database = getBundledDatabase();

  // Get all unique groups and their categories
  const groupsMap = Object.entries(database.categories).reduce<Record<string, Category[]>>(
    (acc, [id, category]) => {
      if (category.group) {
        if (!acc[category.group]) {
          acc[category.group] = [];
        }
        acc[category.group].push({ ...category, id });
      }
      return acc;
    },
    {}
  );

  // Sort groups alphabetically
  const sortedGroups = Object.keys(groupsMap).sort();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-base-content">Groups</h1>

      <div className="space-y-8">
        {sortedGroups.map(groupName => (
          <div key={groupName} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-2xl">{groupName}</h2>
                <Link
                  href={`/groups/${encodeURIComponent(groupName)}`}
                  className="btn btn-primary btn-sm"
                >
                  View Group Details
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupsMap[groupName]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(category => (
                        <tr key={category.id}>
                          <td className="font-medium">{category.name}</td>
                          <td className="max-w-md">
                            {category.description ? (
                              <p className="truncate">{category.description}</p>
                            ) : (
                              <span className="text-base-content/50">No description available</span>
                            )}
                          </td>
                          <td>
                            <Link
                              href={`/categories/${encodeURIComponent(category.id)}`}
                              className="btn btn-primary btn-sm"
                            >
                              View Category
                            </Link>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
