

export default function Loading() {
  return (
    <div className="container mx-auto p-4 animate-pulse max-w-4xl">
      {/* Back button */}
      <div className="mb-4">
        <div className="w-32 h-8 bg-base-content/10 rounded" />
      </div>

      <div className="space-y-6">
        {/* Title area */}
        <div className="h-8 bg-base-content/10 rounded w-3/4 max-w-xl" />

        {/* Main content area */}
        <div className="lg:flex lg:gap-6">
          {/* Left sidebar */}
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <div className="bg-base-100 rounded-box p-6 space-y-4">
              <div className="h-6 bg-base-content/10 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-base-content/10 rounded w-full" />
                <div className="h-4 bg-base-content/10 rounded w-5/6" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-5/6" />
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-4/5" />
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
