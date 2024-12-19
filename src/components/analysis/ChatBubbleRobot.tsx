import Image from 'next/image';

interface Props {
  message: React.ReactNode;
  imageUrl: string;
  state?: 'caution' | 'warning' | 'ok';
  bubbleClass?: string;
}

export default function ChatBubbleRobot({ message, imageUrl, state = 'ok', bubbleClass }: Props) {
  // If a custom bubbleClass is provided, use it instead of the state-based styling
  if (bubbleClass) {
    return (
      <div className="chat chat-start">
        <div className="chat-image avatar rounded-full border-2 border-primary">
          <div className="w-10 mask mask-circle">
            <Image src={imageUrl} alt="Robot" width={40} height={40} />
          </div>
        </div>
        <div className={bubbleClass}>{message}</div>
      </div>
    );
  }

  // Otherwise use state-based styling
  let chatBubbleClass = 'chat-bubble bg-success text-success-content';
  let borderClass = 'border-success';

  if (state === 'caution') {
    chatBubbleClass = 'chat-bubble bg-warning text-warning-content';
    borderClass = 'border-warning';
  } else if (state === 'warning') {
    chatBubbleClass = 'chat-bubble bg-error text-error-content';
    borderClass = 'border-error';
  }

  return (
    <div className="chat chat-start">
      <div className={`chat-image avatar rounded-full border-2 ${borderClass}`}>
        <div className="w-10 mask mask-circle">
          <Image src={imageUrl} alt="Robot" width={40} height={40} />
        </div>
      </div>
      <div className={chatBubbleClass}>{message}</div>
    </div>
  );
}

