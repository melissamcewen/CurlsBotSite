import { CurlyTechniquesForm } from '@/components/CurlyTechniquesForm';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/config/metadata';
export const metadata = createPageMetadata({
  title: 'The Curly Techniques Dictionary',
  description:
    'Master your curly routine with 60+ techniques, tips, and videos—organized by curl type and goals.',
  path: '/curly-techniques-dictionary',
  image: '/images/dictionary4.png'
});

export default function CurlyTechniquesDictionaryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            The Curly Techniques Dictionary
          </h1>
          <p className="text-lg text-base-content/80">
            Master your curly routine with 60+ techniques, tips, and
            videos—organized by curl type and goals.
          </p>
        </div>

        <div className="w-full mb-8">
          <Image
            src="/images/dictionary4.png"
            alt="Curly Techniques Dictionary Preview"
            width={1200}
            height={600}
            className="mx-auto h-auto rounded-box"
            priority
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What&apos;s Inside:</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>60+ techniques</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Links to video tutorials</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Filter by curl type</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Sorted by must-know techniques</span>
              </li>
            </ul>
          </div>

          <div className="bg-base-100 rounded-box p-6">
            <a
              href="https://docs.google.com/spreadsheets/d/11l-IPULdqqwMYAFv7FVLKsOFDwzdlvIyqXKwbu5XLHE/edit?usp=sharing"
              target="_blank"
              className="btn btn-primary w-full"
            >
              Get The Curly Techniques Dictionary
            </a>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/normal.svg"
                alt="CurlsBot"
                width={400}
                height={400}
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold">
                Created by the team (ok the one women) behind CurlsBot.com
              </h2>
              <p className="text-base-content/80">
                You may know CurlsBot from my{' '}
                <Link href="/analyzer" className="link link-primary link-hover">
                  hair ingredient analyzer
                </Link>{' '}
                and{' '}
                <Link
                  href="/porosity-quiz"
                  className="link link-secondary link-hover"
                >
                  porosity quiz
                </Link>
                , helping people understand and find great products since 2017.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-base-100 rounded-box p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Preview Inside the Guide
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Technique</th>
                  <th>Difficulty</th>
                  <th>What it does</th>
                  <th>Tools & Products</th>
                  <th>Tags</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">Brush Styling</div>
                        <div className="text-sm opacity-50">For anyone</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-sm text-nowrap">
                      Must-know
                    </span>
                    <br />
                    <span className="badge badge-error badge-sm">Advanced</span>
                  </td>
                  <td>Defines clumps and defines (or undefines) your part</td>
                  <td>
                    <div className="space-y-1">
                      <div className="text-sm">Denman or Bounce Curl Brush</div>
                      <span className="badge badge-ghost badge-sm">
                        Any styling products
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      <span className="badge badge-outline badge-sm">
                        Volume
                      </span>
                      <span className="badge badge-outline badge-sm">
                        Definition
                      </span>
                      <span className="badge badge-outline badge-sm">Wavy</span>
                      <span className="badge badge-outline badge-sm">
                        Curly
                      </span>
                      <span className="badge badge-outline badge-sm">
                        Coily
                      </span>
                      <span className="badge badge-outline badge-sm">
                        Kinky
                      </span>
                    </div>
                  </td>
                  <th>
                    <a
                      href="https://www.youtube.com/watch?v=79t4iKNnXO8"
                      className="btn btn-primary btn-xs"
                    >
                      Video
                    </a>
                  </th>
                </tr>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">Squish to Condish</div>
                        <div className="text-sm opacity-50">For anyone</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-sm text-nowrap">
                      Must-know
                    </span>
                    <br />
                    <span className="badge badge-success badge-sm">Easy</span>
                  </td>
                  <td>Distributes and saturates hair with conditioner</td>
                  <td>
                    <div className="space-y-1">
                      <div className="text-sm">No tools needed</div>
                      <span className="badge badge-ghost badge-sm">
                        Any conditioner
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      <span className="badge badge-outline badge-sm">Wavy</span>
                      <span className="badge badge-outline badge-sm">
                        Curly
                      </span>
                      <span className="badge badge-outline badge-sm">
                        Coily
                      </span>
                      <span className="badge badge-outline badge-sm">
                        Kinky
                      </span>
                      <span className="badge badge-outline badge-sm">
                        Hydration
                      </span>
                    </div>
                  </td>
                  <th>
                    <a
                      href="https://www.youtube.com/watch?v=Jwtnn4H77bk"
                      className="btn btn-primary btn-xs"
                    >
                      Video
                    </a>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4 text-sm text-base-content/60">
            The spreadsheet is sortable and filterable, you can even make your
            own copy and customize it to your needs.
          </div>
        </div>
      </div>
    </div>
  );
}
