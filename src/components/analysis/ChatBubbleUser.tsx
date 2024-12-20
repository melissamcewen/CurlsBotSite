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
  const borderClass = secondary ? 'border-secondary' : accent ? 'border-accent' : 'border-primary';

  return (
    <div className="chat chat-end">
      <div
        className={`chat-bubble bg-base-300 text-base-content border-t-2 w-full ${borderClass}`}
      >
        {message}
      </div>
    </div>
  );
}
