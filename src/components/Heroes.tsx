import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    image?: string;
  };
}

async function getLatestBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const files = await fs.readdir(blogDir);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const post = await import(`@/content/blog/${file}`);
      return {
        slug: file.replace('.mdx', ''),
        frontmatter: post.frontmatter,
      };
    }),
  );

  // Filter for posts with images and exclude welcome-back
  const eligiblePosts = posts
    .filter((post) => post.frontmatter.image && post.slug !== 'welcome-back')
    .sort(() => Math.random() - 0.5); // Randomize the array

  // Take the first 3 posts after randomization
  return eligiblePosts.slice(0, 3);
}

export default async function Heroes() {
  const latestPosts = await getLatestBlogPosts();

  return (
    <div className="mt-5">
      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <h2 className="text-5xl font-bold mb-8">What&apos;s New?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/porosity/mixed-porosity"
                className="card bg-base-100 hover:bg-base-200 transition-colors"
              >
                <figure className="relative h-48 bg-primary">
                  <Image
                    src="/emoji/1F481.svg"
                    alt="Info emoji"
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </figure>

                <div className="card-body flex flex-col justify-between">
                  <div>
                    <h3 className="card-title text-lg ">
                      A New Porosity Type Just Dropped!
                    </h3>
                    <p className="text-base-content/70 text-sm line-clamp-2 mt-2 text-left">
                      Learn about Mixed Porosity!
                    </p>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <div className="text-primary flex items-center gap-1 text-sm">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href="/blog/best-ordinary-products-for-wavy-and-curly-hair"
                className="card bg-base-100 hover:bg-base-200 transition-colors"
              >
                <figure className="relative h-48 bg-primary">
                  <Image
                    src="/images/blog/best-ordinary-products-for-wavy-and-curly-hair/hero.png"
                    alt="Info emoji"
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </figure>

                <div className="card-body flex flex-col justify-between">
                  <div>
                    <h3 className="card-title text-lg ">
                      Best The Ordinary Products for Wavy/Curly Hair
                    </h3>
                    <p className="text-base-content/70 text-sm line-clamp-2 mt-2 text-left">
                      Every hair product from The Ordinary for wavy/curly hair,
                      ranked
                    </p>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <div className="text-primary flex items-center gap-1 text-sm">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href="/labs/porosity"
                className="card bg-base-100 hover:bg-base-200 transition-colors"
              >
                <figure className="relative h-48 bg-primary">
                  <Image
                    src="/lab.svg"
                    alt="Info emoji"
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </figure>

                <div className="card-body flex flex-col justify-between">
                  <div>
                    <h3 className="card-title text-lg ">
                      Labs: Porosity Score
                    </h3>
                    <p className="text-base-content/70 text-sm line-clamp-2 mt-2 text-left">
                      Learn about our new porosity score for products!
                    </p>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <div className="text-primary flex items-center gap-1 text-sm">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl font-bold">
              Join the CurlsBot Community! 💌
            </h2>
            <p className="py-6">
              Get hair care tips, product recommendations, and ingredient alerts
              delivered to your inbox.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 justify-center items-center">
            <form
              action="https://twitter.us14.list-manage.com/subscribe/post"
              method="POST"
              className="card-body items-center justify-center"
              target="_blank"
            >
              <div>
                <div
                  className={`rounded-full border-2 border-primary animate-none`}
                  style={{ animation: 'none', transition: 'none' }}
                >
                  <div className="w-20 h-20 mask mask-circle  ">
                    <div className=" inset-0 flex items-center justify-center">
                      <Image
                        src="/normal.svg"
                        alt="CurlsBot"
                        width={100}
                        height={100}
                        priority
                        className="animate-none"
                        style={{ animation: 'none', transition: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <input type="hidden" name="u" value="dbc1f6ce69d9c1d849eaa642e" />
              <input type="hidden" name="id" value="75335f5c10" />
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="MERGE0"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className=" hero bg-base-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image src="/normal.svg" alt="CurlsBot" width={500} height={500} />

          <div>
            <h2 className="text-5xl font-bold">Take our Porosity Quiz</h2>
            <p className="py-6">
              We&apos;ll ask you a few questions about your hair to help you
              find your hair porosity and the products that are right for you.
              No email required!
            </p>
            <a href="/porosity-quiz" className="btn btn-primary">
              Take the Quiz
            </a>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <h2 className="text-5xl font-bold mb-8">Guides for Curly Hair</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card bg-base-100 hover:bg-base-300 transition-colors"
                >
                  {post.frontmatter.image && (
                    <figure className="relative h-48">
                      <Image
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </figure>
                  )}
                  <div className="card-body flex flex-col justify-between">
                    <div>
                      <h3 className="card-title text-lg ">
                        {post.frontmatter.title}
                      </h3>
                      {post.frontmatter.description && (
                        <p className="text-base-content/70 text-sm line-clamp-2 mt-2 text-left">
                          {post.frontmatter.description}
                        </p>
                      )}
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <div className="text-primary flex items-center gap-1 text-sm">
                        Read more <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/blog" className="btn btn-primary">
                View All Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
