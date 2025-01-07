import Image from 'next/image';

interface AvatarProps {
  imageUrl: string;
  altText?: string;
  borderClass?: string;
}

export default function Avatar({
  imageUrl,
  altText = 'Avatar',
  borderClass = 'border-primary',
}: AvatarProps) {
  return (
    <div
      className={`chat-image self-start avatar rounded-full border-2 ${borderClass} animate-none`}
      style={{ animation: 'none', transition: 'none' }}
    >
      <div className="w-10 h-10 mask mask-circle relative overflow-hidden">
        {/* Permanent background layer */}
        <div className="absolute inset-0 bg-white" />
        {/* Image container with blend mode */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={altText}
            width={40}
            height={40}
            priority
            className="animate-none"
            style={{ animation: 'none', transition: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
