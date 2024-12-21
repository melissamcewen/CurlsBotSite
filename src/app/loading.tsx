export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body animate-pulse">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <div className="h-8 bg-base-content/10 rounded w-48" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="h-4 bg-base-content/10 rounded w-full" />
            <div className="h-4 bg-base-content/10 rounded w-5/6" />
            <div className="h-4 bg-base-content/10 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
