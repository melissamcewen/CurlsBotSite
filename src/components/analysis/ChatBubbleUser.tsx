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
  let bubbleClass =
    'chat-bubble border-primary text-primary-content bg-base-300 text-base-content';

  if (secondary) {
    bubbleClass = 'chat-bubble border-secondary';
  } else if (accent) {
    bubbleClass = 'chat-bubble border-accent';
  }

  return (
    <div className="chat chat-end">
      <div className={bubbleClass}>{message}</div>
    </div>
  );
}
