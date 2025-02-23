import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';

export default function HomeLoading() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Loading State */}
      <div className="relative flex">
        <div className="w-full md:w-80">
          <div className="flex flex-col gap-4 sm:flex-row md:flex-col p-2">
            <div className="card card-compact border-primary border-2 bg-base-100">
              <div className="card-body">
                <div className="card-title flex gap-2">
                  <div className="w-6 h-6 bg-base-content/10 rounded" />
                  <div className="h-6 bg-base-content/10 rounded w-40" />
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="w-5 h-5 bg-base-content/10 rounded flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <div className="h-4 bg-base-content/10 rounded w-full" />
                      <div className="h-4 bg-base-content/10 rounded w-4/5" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 h-5 bg-base-content/10 rounded flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <div className="h-4 bg-base-content/10 rounded w-full" />
                      <div className="h-4 bg-base-content/10 rounded w-4/5" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 h-5 bg-base-content/10 rounded flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <div className="h-4 bg-base-content/10 rounded w-full" />
                      <div className="h-4 bg-base-content/10 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-circle btn-sm absolute top-2 right-2 md:relative md:right-auto md:top-4 md:-ml-3 z-20 bg-base-100">
          <span className="block md:hidden">
            <div className="w-4 h-4 bg-base-content/10 rounded" />
          </span>
          <span className="hidden md:block">
            <div className="w-4 h-4 bg-base-content/10 rounded" />
          </span>
        </button>
      </div>

      {/* Main Content Loading State */}
      <div className="flex-1 p-0 md:p-8">
        <div className="space-y-6 animate-pulse max-w-4xl mx-auto">
          <div className="chat chat-start lg:max-w-3xl lg:min-w-s">
            <div className="chat-image self-start avatar rounded-full border-2 border-info">
              <div className="w-10 h-10 mask mask-circle relative overflow-hidden bg-base-content/10" />
            </div>
            <div className="chat-bubble bg-base-100 border-t-2 border-info p-6 w-full text-base-content">
              <div className="space-y-4">
                <div className="h-4 bg-base-content/10 rounded w-full" />
                <div className="h-4 bg-base-content/10 rounded w-4/5" />
              </div>
              <div className="chat-footer text-xs opacity-50 mt-4">
                <div className="h-3 bg-base-content/10 rounded w-24" />
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl ml-auto">
            <div className="chat chat-end w-full">
              <div className="chat-bubble bg-base-100 border-t-2 border-secondary p-6 w-full text-base-content">
                <div className="space-y-4">
                  <div className="h-6 bg-base-content/10 rounded w-48" />
                  <div className="h-6 bg-base-content/10 rounded w-full" />
                  <div className="space-y-2 mt-4">
                    <div className="h-12 bg-base-content/10 rounded w-full" />
                    <div className="h-12 bg-base-content/10 rounded w-full" />
                    <div className="h-12 bg-base-content/10 rounded w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
