interface ChatBubbleUserProps {
  message: string | React.ReactNode;
  secondary?: boolean;
  accent?: boolean;
  fullWidth?: boolean;
  standardWidth?: boolean;
}

export default function ChatBubbleUser({
  message,
  secondary,
  accent,
  fullWidth = false,
  standardWidth = false,
}: ChatBubbleUserProps) {
  const borderClass = secondary ? 'border-secondary' : accent ? 'border-accent' : 'border-primary';
  const widthClass = fullWidth ? 'w-full max-w-none' : standardWidth ? 'w-full max-w-2xl' : '';

  return (
    <div className="chat chat-end">
      <div className={`chat-bubble bg-base-300 text-base-content border-t-2 ${borderClass} ${widthClass}`}>
        {message}
      </div>
    </div>
  );
}
