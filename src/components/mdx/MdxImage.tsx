'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

interface MdxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  href?: string;
}

function SingleImage({
  src,
  alt,
  width,
  height,
  caption,
  href,
}: MdxImageProps) {
  // Handle both relative and absolute paths
  const imageSrc = useMemo(() => {
    if (src.startsWith('http')) {
      return src;
    }
    // For local images in blog content
    return `/images/blog/${src}`;
  }, [src]);

  const imageElement = (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 800}
      height={height || 400}
      className="rounded-lg"
      // Use fill if no dimensions provided
      {...(!width &&
        !height && {
          fill: true,
          style: { objectFit: 'cover' },
        })}
    />
  );

  const wrappedImage = href ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-90 transition-opacity"
    >
      {imageElement}
    </Link>
  ) : (
    imageElement
  );

  return (
    <figure className="flex flex-col items-center">
      <div className="flex justify-center">{wrappedImage}</div>
      {caption && (
        <figcaption className="text-base-content/70 text-sm mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface ImageRowProps {
  children: React.ReactNode;
}

function ImageRow({ children }: ImageRowProps) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  );
}

export const MdxImage = Object.assign(SingleImage, {
  Row: ImageRow,
});
