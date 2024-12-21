import { BookOpenIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <BookOpenIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Resources</h1>
          </div>

          <div className="prose prose-lg">
            <p>
              All these resources may vary in what they consider curly hair, so we encourage you to do your own research and find what&apos;s best for your hair. If you&apos;d like to recommend a resource to add here, please <Link href="/contact" className="link link-primary">contact me</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-6">English Language Communities</h2>
            <ul className="list-disc pl-6">
              <li><a href="https://www.reddit.com/r/curlyhair/" className="link link-primary" target="_blank" rel="noopener noreferrer">r/curlyhair</a> - Reddit&apos;s curly hair community</li>
              <li><a href="https://www.naturallycurly.com/forums" className="link link-primary" target="_blank" rel="noopener noreferrer">NaturallyCurly Forums</a> - Active discussion forums</li>
              <li><a href="https://www.facebook.com/profile.php?id=1646575018747057" className="link link-primary" target="_blank" rel="noopener noreferrer">Curly Hair (& Boy) Method</a> - Facebook community</li>
              <li><a href="https://www.facebook.com/profile.php?id=281152828644498" className="link link-primary" target="_blank" rel="noopener noreferrer">Wavy Hair Community</a> - Facebook group</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">International Communities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">European Communities</h3>
                <ul className="list-disc pl-6">
                  <li><a href="https://www.reddit.com/r/CurlyHairUK/" className="link link-primary" target="_blank" rel="noopener noreferrer">r/CurlyHairUK</a> - UK-specific curly hair community</li>
                  <li><a href="https://www.facebook.com/groups/111184826386370" className="link link-primary" target="_blank" rel="noopener noreferrer">Curly Hair Method España</a> - Spanish community</li>
                  <li><a href="https://www.facebook.com/groups/881972528612103" className="link link-primary" target="_blank" rel="noopener noreferrer">Danish Curly Hair Group</a> - Danish community</li>
                  <li><a href="https://www.facebook.com/groups/898709023594130" className="link link-primary" target="_blank" rel="noopener noreferrer">Curly Hairs Polska</a> - Polish community</li>
                  <li><a href="https://www.facebook.com/groups/2025802884102635" className="link link-primary" target="_blank" rel="noopener noreferrer">Caracóis Saudáveis</a> - Portuguese community</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Middle Eastern & Asian Communities</h3>
                <ul className="list-disc pl-6">
                  <li><a href="https://www.facebook.com/groups/621900137980455" className="link link-primary" target="_blank" rel="noopener noreferrer">Curly Hairs Egypt</a> - Egyptian community</li>
                  <li><a href="https://www.facebook.com/groups/172168320017454" className="link link-primary" target="_blank" rel="noopener noreferrer">Curly Hairs Talk - Lebanon</a> - Lebanese community</li>
                  <li><a href="https://www.facebook.com/groups/520287928111407" className="link link-primary" target="_blank" rel="noopener noreferrer">Indian Curl Pride</a> - Indian community</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-6">Educational Resources</h2>
            <ul className="list-disc pl-6">
              <li><a href="https://www.naturallycurly.com/hair-types" className="link link-primary" target="_blank" rel="noopener noreferrer">Hair Type Guide</a> - Understanding hair types and patterns</li>
              <li><a href="https://www.sciencedirect.com/science/article/abs/pii/S0142961217304775" className="link link-primary" target="_blank" rel="noopener noreferrer">Scientific Research</a> - Academic paper on hair care ingredients</li>
            </ul>

            <div className="flex items-start gap-2 text-info text-sm mt-6 p-4 bg-info/10 rounded-xl">
              <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="m-0">External links open in a new tab for your convenience. CurlsBot is not affiliated with these resources and cannot guarantee their content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
