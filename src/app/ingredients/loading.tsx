export default function IngredientsLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ingredients Database</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody className="animate-pulse">
            {[...Array(10)].map((_, i) => (
              <tr key={i}>
                <td>
                  <div className="space-y-2">
                    <div className="h-4 bg-base-content/10 rounded w-48" />
                    <div className="h-3 bg-base-content/10 rounded w-64" />
                  </div>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-base-content/10" />
                        <div className="h-4 bg-base-content/10 rounded w-24" />
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
