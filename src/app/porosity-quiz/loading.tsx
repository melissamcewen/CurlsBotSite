import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';

export default function HomeLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
        <ChatBubble status="ok">
          <div className="space-y-2">
            <div className="h-4 bg-base-content/10 rounded w-1/4" />
            <div className="h-4 bg-base-content/10 rounded w-full" />
            <div className="h-4 bg-base-content/10 rounded w-4/5" />
          </div>
        </ChatBubble>
      </ChatBubbleRobot>

      <div className="max-w-2xl ml-auto">
        <ChatBubbleUser
          message={
            <div className="space-y-4">
              <div className="h-32 bg-base-content/10 rounded w-full" />
              <div className="flex justify-end">
                <div className="h-10 bg-base-content/10 rounded w-32" />
              </div>
            </div>
          }
          secondary
        />
      </div>
    </div>
  );
}
