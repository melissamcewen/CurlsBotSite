import { InformationCircleIcon } from '@heroicons/react/24/solid';

export default function AboutLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body animate-pulse">
          <div className="flex items-center gap-2 mb-4">
            <InformationCircleIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">About CurlsBot</h1>
          </div>

          <div className="prose prose-lg space-y-6">
            {/* Main description */}
            <div className="space-y-2">
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-5/6" />
              <div className="h-4 bg-base-content/10 rounded w-4/5" />
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-base-content/10 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-base-content/10 rounded w-full" />
                    <div className="h-4 bg-base-content/10 rounded w-5/6" />
                    <div className="h-4 bg-base-content/10 rounded w-4/5" />
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
