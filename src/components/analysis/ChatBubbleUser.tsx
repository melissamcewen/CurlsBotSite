interface ChatBubbleUserProps {
  message: string | React.ReactNode;
  secondary?: boolean;
  accent?: boolean;
}

export default function ChatBubbleUser({
  message,
  secondary,
  accent,
}: ChatBubbleUserProps) {
  let bubbleClass = 'chat-bubble bg-primary text-primary-content';

  if (secondary) {
    bubbleClass = 'chat-bubble bg-secondary text-secondary-content';
  } else if (accent) {
    bubbleClass = 'chat-bubble bg-accent text-accent-content';
  }

  return (
    <div className="chat chat-end">
      <div className={bubbleClass}>{message}</div>
    </div>
  );
}
