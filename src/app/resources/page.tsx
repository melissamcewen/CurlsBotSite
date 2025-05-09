import { BookOpen, Info } from 'lucide-react';
import Link from 'next/link';
import { createPageMetadata } from '@/config/metadata';

export const metadata = createPageMetadata({
  title: 'Hair Care Resources',
  description:
    'Find helpful resources for understanding hair care ingredients and maintaining healthy hair.',
  path: '/resources',
});

export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Resources</h1>
          </div>

          <div className="prose prose-lg">
            <h2 className="text-2xl font-bold mt-6">
              Ingredients Analysis Resources
            </h2>
            <ul className="list-disc pl-6">
              <li>
                <a href="https://www.isitcg.com/">Is it CG?</a> - Curly Girl
                focused ingredient checker
              </li>
              <li>
                <a href="https://curlscan.com/">CurlScan</a> - Curly Girl
                product database
              </li>
              <li>
                <a href="https://incidecoder.com/">InciDecoder</a> - Ingredient
                info
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">Courses</h2>
            <ul className="list-disc pl-6">
              <li>
                <a href="https://www.gracelynmariahair.com/style-your-curly-hair-course">
                  Curl Botanist Course:
                </a>{' '}
                Achieving a curly hair style you love to wear shouldn&apos;t be
                hard. Learn to how prep, style and dry your curls in a way that
                works for your curly hair needs. Get instant, anytime access to
                professional wavy and curly hair educational videos and
                downloads.
              </li>
              <li>
                <a href="https://www.curlyhairartistry.com/the-map-method-online-course">
                  Cultivate Your Curls
                </a>
              </li>
            </ul>
            <h2 className="text-2xl font-bold mt-6">Communities</h2>
            <p>
              All these resources may vary in what they consider curly hair, so
              we encourage you to do your own research and find what&apos;s best
              for your hair. If you&apos;d like to recommend a resource to add
              here, please{' '}
              <Link href="/contact" className="link link-primary">
                contact me
              </Link>
              .
            </p>

            <h3 className="text-xl font-bold mt-6">
              English Language Communities
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <a
                  href="https://www.reddit.com/r/curlyhair/"
                  className="link link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  r/curlyhair
                </a>{' '}
                - Reddit&apos;s curly hair community
              </li>
              <li>
                <a
                  href="https://www.reddit.com/r/curlyhaircare"
                  className="link link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  r/curlyhaircare
                </a>{' '}
                - A smaller community for those who want to learn more about
                curly/wavy hair care
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=281152828644498"
                  className="link link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wavy Hair Community
                </a>{' '}
                - Facebook group
              </li>
            </ul>

            <h3 className="text-xl font-bold mt-6">
              International Communities
            </h3>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">European Communities</h3>
                <ul className="list-disc pl-6">
                  <li>
                    <a
                      href="https://www.reddit.com/r/CurlyHairUK/"
                      className="link link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      r/CurlyHairUK
                    </a>{' '}
                    - UK-specific curly hair community
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/groups/111184826386370"
                      className="link link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Curly Hair Method España
                    </a>{' '}
                    - Spanish community
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/groups/881972528612103"
                      className="link link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Danish Curly Hair Group
                    </a>{' '}
                    - Danish community
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/groups/898709023594130"
                      className="link link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Curly Hairs Polska
                    </a>{' '}
                    - Polish community
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/groups/2025802884102635"
                      className="link link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Caracóis Saudáveis
                    </a>{' '}
                    - Portuguese community
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Middle Eastern & Asian Communities
                </h3>
                <ul className="list-disc pl-6">
                  <li>
                    <a
                      href="https://www.facebook.com/groups/621900137980455"
                      className="link link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Curly Hairs Egypt
                    </a>{' '}
                    - Egyptian community
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/groups/172168320017454"
                      className="link link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Curly Hairs Talk - Lebanon
                    </a>{' '}
                    - Lebanese community
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/groups/520287928111407"
                      className="link link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Indian Curl Pride
                    </a>{' '}
                    - Indian community
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-2 text-info text-sm mt-6 p-4 bg-info/10 rounded-xl">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="m-0">
                External links open in a new tab for your convenience. CurlsBot
                is not affiliated with these resources and cannot guarantee
                their content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
