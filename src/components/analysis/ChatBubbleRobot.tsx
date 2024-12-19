import Image from 'next/image';

interface Props {
  message: React.ReactNode;
  imageUrl: string;
  bubbleClass?: string;
}

export default function ChatBubbleRobot({ message, imageUrl, bubbleClass = 'chat-bubble bg-primary text-primary-content' }: Props) {
  // Extract color class from bubbleClass (e.g., 'bg-error' from 'chat-bubble bg-error text-error-content')
  const colorClass = bubbleClass.split(' ').find(cls => cls.startsWith('bg-'))?.replace('bg-', '') || 'primary';

  return (
    <div className="chat chat-start">
      <div className={`chat-image avatar rounded-full border-2 border-${colorClass}`}>
        <div className="w-10 mask mask-circle">
          <Image src={imageUrl} alt="CurlBot" width={40} height={40} />
        </div>
      </div>
      <div className={bubbleClass}>
        {message}
      </div>
    </div>
  );
}
