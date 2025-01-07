interface ChatBubbleUserProps {
  children: React.ReactNode;
  secondary?: boolean;
  accent?: boolean;
}

export default function ChatBubbleUser({
  children,
  secondary,
  accent,
}: ChatBubbleUserProps) {
  const borderClass = secondary
    ? 'border-secondary'
    : accent
    ? 'border-accent'
    : 'border-primary';

  return (
    <div className="chat chat-end">
      <div
        className={`chat-bubble bg-base-100 text-base-content border-t-2 w-full ${borderClass}`}
      >
        {children}
      </div>
    </div>
  );
}
