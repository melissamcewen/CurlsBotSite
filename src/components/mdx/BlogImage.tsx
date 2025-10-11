import Image from 'next/image';
import Link from 'next/link';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  href?: string;
  float?: 'left' | 'right';
}

interface DualImageProps {
  image1: {
    src: string;
    alt: string;
    href?: string;
  };
  image2: {
    src: string;
    alt: string;
    href?: string;
  };
  caption?: string;
}

function ImageWrapper({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} className="hover:opacity-90 transition-opacity">
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}

export function BlogImage({ src, alt, caption, href, float }: BlogImageProps) {
  const floatStyles =
    float === 'left'
      ? 'md:float-left md:mr-4'
      : float === 'right'
      ? 'md:float-right md:ml-4'
      : '';
  const containerClass = float
    ? `${floatStyles} mb-4 w-full md:w-[400px]`
    : 'my-8 w-full';

  return (
    <figure className={`${containerClass} m-0`}>
      <div className="bg-base-200 rounded-lg overflow-hidden not-prose ">
        <ImageWrapper href={href}>
          <div>
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={630}
              className="w-full h-auto m-0 p-0 max-h-[450px] object-contain"
            />
            {caption && (
              <div className="p-4">
                <p className="text-sm text-base-content/70 text-center">
                  {caption}
                </p>
              </div>
            )}
          </div>
        </ImageWrapper>
      </div>
    </figure>
  );
}

export function FlowchartImage({ src, alt, caption, href }: BlogImageProps) {
  return (
    <figure className="my-8 w-full m-0">
      <div className="bg-base-200 rounded-lg overflow-hidden not-prose">
        <ImageWrapper href={href}>
          <div>
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1200}
              className="w-full h-auto m-0 p-0 object-contain"
            />
            {caption && (
              <div className="p-4">
                <p className="text-sm text-base-content/70 text-center">
                  {caption}
                </p>
              </div>
            )}
          </div>
        </ImageWrapper>
      </div>
    </figure>
  );
}

export function DualImage({ image1, image2, caption }: DualImageProps) {
  return (
    <figure className="my-8">
      <div className="bg-base-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 gap-2 p-2">
          <ImageWrapper href={image1.href}>
            <Image
              src={image1.src}
              alt={image1.alt}
              width={600}
              height={315}
              className="w-full h-auto rounded"
            />
          </ImageWrapper>
          <ImageWrapper href={image2.href}>
            <Image
              src={image2.src}
              alt={image2.alt}
              width={600}
              height={315}
              className="w-full h-auto rounded"
            />
          </ImageWrapper>
        </div>
        {caption && (
          <div className="p-4">
            <p className="text-sm text-base-content/70 text-center">
              {caption}
            </p>
          </div>
        )}
      </div>
    </figure>
  );
}
