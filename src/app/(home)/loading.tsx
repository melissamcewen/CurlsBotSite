import { ChatBubbleRobot, ChatBubble } from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';

export default function HomeLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="chat chat-start w-full">
        <div className="chat-image avatar">
          <div className="w-10 h-10 rounded-full bg-base-content/10" />
        </div>
        <div className="chat-bubble bg-base-300 border-t-2 border-info p-6 w-full lg:max-w-3xl">
          <div className="space-y-4">
            <div className="h-4 bg-base-content/10 rounded w-full" />
            <div className="h-4 bg-base-content/10 rounded w-5/6" />
            <div className="h-4 bg-base-content/10 rounded w-4/5" />
            <div className="h-4 bg-base-content/10 rounded w-3/4" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl ml-auto">
        <div className="chat chat-end w-full">
          <div className="chat-bubble bg-base-300 border-t-2 border-secondary p-6 w-full">
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
  );
}
