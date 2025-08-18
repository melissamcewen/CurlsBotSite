import Image from 'next/image';

export function AuthorBio() {
  return (
    <div className="card card-side  card-border bg-base-100  not-prose mt-10">
      <figure className="w-1/2 md:w-1/3 max-w-[220px] min-w-[120px]">
        <Image
          src="/headshot.jpg"
          alt="Melissa"
          width={220}
          height={220}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">About the Author</h2>
        <p className="text-sm">
          Melissa McEwen is the creator of CurlsBot. She is a software developer
          with training in science writing and chemistry. Her writing has
          appeared in publications such as NPR and Quartz.
        </p>
      </div>
    </div>
  );
}
