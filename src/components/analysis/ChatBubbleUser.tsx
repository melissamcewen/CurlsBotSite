interface ChatBubbleUserProps {
  message: string | React.ReactNode;
  secondary?: boolean;
  accent?: boolean;
  fullWidth?: boolean;
}

export default function ChatBubbleUser({
  message,
  secondary,
  accent,
  fullWidth = false,
}: ChatBubbleUserProps) {
  const borderClass = secondary ? 'border-secondary' : accent ? 'border-accent' : 'border-primary';
  const widthClass = fullWidth ? 'w-full max-w-none' : '';

  return (
    <div className="chat chat-end">
      <div className={`chat-bubble bg-base-300 text-base-content border-t-2 ${borderClass} ${widthClass}`}>
        {message}
      </div>
    </div>
  );
}
