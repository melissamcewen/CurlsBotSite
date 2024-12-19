import Image from 'next/image';

interface ChatBubbleRobotProps {
  message: string;
  imageUrl: string;
  altText?: string;
  bubbleClass?: string;
}

export default function ChatBubbleRobot({
  message,
  imageUrl,
  altText = 'CurlBot',
  bubbleClass = 'chat-bubble'
}: ChatBubbleRobotProps) {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded">
          <Image src={imageUrl} alt={altText} width={40} height={40} />
        </div>
      </div>
      <div className={bubbleClass}>
        {message}
      </div>
    </div>
  );
}
