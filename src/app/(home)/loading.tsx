import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';

export default function HomeLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Mini Hero Loading State */}
      <section className="flex flex-col items-center bg-base-200 rounded-xl p-8 mb-12 animate-pulse">
        <div className="w-full max-w-lg h-64 bg-base-content/10 rounded-lg mb-4" />
        <div className="h-8 bg-base-content/10 rounded w-80 mb-2" />
        <div className="space-y-2 mb-4 max-w-xl">
          <div className="h-4 bg-base-content/10 rounded w-full" />
          <div className="h-4 bg-base-content/10 rounded w-4/5" />
          <div className="h-4 bg-base-content/10 rounded w-3/4" />
        </div>
        <div className="h-4 bg-base-content/10 rounded w-48" />
      </section>

      {/* Cards/Sections Loading State */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Learn About Your Hair Card */}
        <div className="card bg-base-100 rounded-box shadow-none h-full animate-pulse">
          <div className="card-body flex flex-col text-left">
            <div className="w-8 h-8 bg-base-content/10 rounded mb-2" />
            <div className="h-6 bg-base-content/10 rounded w-48 mb-2" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-4/5" />
              <div className="h-4 bg-base-content/10 rounded w-3/4" />
            </div>
            <div className="card-actions justify-end w-full mt-auto">
              <div className="btn btn-secondary w-full h-10 bg-base-content/10" />
            </div>
          </div>
        </div>

        {/* Porosity Card */}
        <div className="card bg-base-100 rounded-box shadow-none h-full animate-pulse">
          <div className="card-body flex flex-col text-left">
            <div className="w-8 h-8 bg-base-content/10 rounded mb-2" />
            <div className="h-6 bg-base-content/10 rounded w-24 mb-2" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-4/5" />
              <div className="h-4 bg-base-content/10 rounded w-3/4" />
            </div>
            <div className="card-actions flex flex-col gap-2 w-full mt-auto">
              <div className="btn btn-primary w-full h-10 bg-base-content/10" />
              <div className="btn btn-outline w-full h-10 bg-base-content/10" />
            </div>
          </div>
        </div>

        {/* Ingredients Analyzer Card */}
        <div className="card bg-base-100 rounded-box shadow-none h-full animate-pulse">
          <div className="card-body flex flex-col text-left">
            <div className="w-8 h-8 bg-base-content/10 rounded mb-2" />
            <div className="h-6 bg-base-content/10 rounded w-48 mb-2" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-full" />
              <div className="h-4 bg-base-content/10 rounded w-4/5" />
              <div className="h-4 bg-base-content/10 rounded w-3/4" />
            </div>
            <div className="card-actions flex flex-col gap-2 w-full mt-auto">
              <div className="btn btn-accent w-full h-10 bg-base-content/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section Loading State */}
      <section className="animate-pulse">
        <div className="h-8 bg-base-content/10 rounded w-32 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 rounded-box shadow-none">
              <div className="card-body">
                <div className="w-full h-48 bg-base-content/10 rounded-lg mb-4" />
                <div className="space-y-2">
                  <div className="h-5 bg-base-content/10 rounded w-full" />
                  <div className="h-4 bg-base-content/10 rounded w-3/4" />
                  <div className="h-4 bg-base-content/10 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
