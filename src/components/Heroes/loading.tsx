export default function HeroesLoading() {
  return (
    <div className="animate-pulse">
      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <div className="h-8 bg-base-200 rounded w-48 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card bg-base-100">
                  <div className="h-48 bg-base-200 rounded-t-xl" />
                  <div className="card-body">
                    <div className="h-6 bg-base-200 rounded w-3/4" />
                    <div className="h-4 bg-base-200 rounded w-1/2 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
