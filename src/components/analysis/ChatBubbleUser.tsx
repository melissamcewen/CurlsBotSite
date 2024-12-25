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
  const borderClass = secondary ? 'border-secondary' : accent ? 'border-accent' : 'border-primary';

  return (
    <div className="chat chat-end w-full ">
      <div
        className={`chat-bubble bg-base-300 text-base-content border-t-2 lg:max-w-3xl lg:min-w-xl w-full flex flex-col items-center justify-center ${borderClass}`}
      >
        {children}
      </div>
    </div>
  );
}
