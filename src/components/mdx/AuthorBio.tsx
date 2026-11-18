import Image from 'next/image';
import type { ReactNode } from 'react';

type AuthorBioProps = {
  name?: string;
  imageSrc?: string;
  children?: ReactNode;
};

export function AuthorBio({
  name = 'Melissa McEwen',
  imageSrc = '/headshot.jpg',
  children = (
    <p>
      Melissa McEwen is the creator of CurlsBot. She is a software developer
      with training in science writing and a B.S. in Agriculture. Her writing
      has appeared in publications such as NPR and Quartz.
    </p>
  ),
}: AuthorBioProps) {
  return (
    <div className="card card-side  card-border bg-base-100  not-prose mt-10">
      <figure className="w-1/2 md:w-1/3 max-w-[220px] min-w-[120px]">
        <Image
          src={imageSrc}
          alt={name}
          width={220}
          height={220}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">About the Author</h2>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
