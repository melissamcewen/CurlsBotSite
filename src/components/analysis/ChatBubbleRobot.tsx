import Image from 'next/image';

interface ChatBubbleRobotProps {
  message: string | React.ReactNode;
  imageUrl?: string;
  altText?: string;
  error?: boolean;
  warning?: boolean;
  success?: boolean;
}

export default function ChatBubbleRobot({
  message,
  imageUrl = '/normal.svg',
  altText = 'CurlBot',
  error,
  warning,
  success,
}: ChatBubbleRobotProps) {
  let bubbleClass = 'chat-bubble bg-primary text-primary-content';
  let borderClass = 'border-primary';

  if (error) {
    bubbleClass = 'chat-bubble bg-error text-error-content';
    borderClass = 'border-error';
  } else if (warning) {
    bubbleClass = 'chat-bubble bg-warning text-warning-content';
    borderClass = 'border-warning';
  } else if (success) {
    bubbleClass = 'chat-bubble bg-success text-success-content';
    borderClass = 'border-success';
  }

  return (
    <div className="chat chat-start">
      <div className={`chat-image avatar rounded-full border-2 ${borderClass}`}>
        <div className="w-10 mask mask-circle">
          <Image src={imageUrl} alt={altText} width={40} height={40} />
        </div>
      </div>
      <div className={bubbleClass}>{message}</div>
    </div>
  );
}
