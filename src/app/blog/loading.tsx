import { BookOpenIcon } from '@heroicons/react/24/solid';

export default function BlogLoading() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body animate-pulse">
          <div className="flex items-center gap-2 mb-6">
            <BookOpenIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Blog</h1>
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <article key={i} className="card bg-base-200">
                <div className="card-body min-h-[150px]">
                  <div className="space-y-4">
                    <div className="h-8 bg-base-content/10 rounded w-3/4" />
                    <div className="min-h-[48px] space-y-2">
                      <div className="h-4 bg-base-content/10 rounded w-full" />
                      <div className="h-4 bg-base-content/10 rounded w-2/3" />
                    </div>
                    <div className="h-4 bg-base-content/10 rounded w-32" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
