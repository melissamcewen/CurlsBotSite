import { ChatBubbleRobot, ChatBubble } from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';

export default function QuizLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <ChatBubbleRobot
        imageUrl="/normal.svg"
        status="ok"
      >
        <ChatBubble status="ok">
          <div className="h-16 bg-base-content/10 rounded" />
        </ChatBubble>
      </ChatBubbleRobot>

      <div className="max-w-2xl ml-auto">
        <ChatBubbleUser
          message={
            <div className="w-full space-y-4">
              <div className="h-6 bg-base-content/10 rounded w-48" />
              <div className="h-48 bg-base-content/10 rounded w-full" />
              <div className="h-10 bg-base-content/10 rounded w-full" />
            </div>
          }
          secondary
        />
      </div>
    </div>
  );
}
