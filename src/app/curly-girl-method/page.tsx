import { Book, FlaskConical, ListChecks, Search } from 'lucide-react';
import Image from 'next/image';

export default function CGMHub() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-left mb-12">
        <h1 className="text-4xl font-bold mb-2">The Curly Girl Method Hub</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Intro to CGM */}
        <div className="card bg-base-100 rounded-box shadow-none h-full">
          <div className="card-body h-full flex flex-col text-left">
            <div className="w-full h-32 mb-4 rounded overflow-hidden flex items-center justify-center bg-base-200">
              <Image
                src="/images/cgm-hub/book.png"
                alt="CGM Book Cover"
                width={600}
                height={160}
                className="w-full h-32 object-cover rounded"
                priority
              />
            </div>
            <h2 className="card-title flex items-center gap-2 w-full">
              <Book className="w-5 h-5" /> The Curly Girl Method (CGM)
            </h2>
            <p className="mb-4 text-base-content/80">
              The Curly Girl Method was created by Lorraine Massey and
              popularized with her book, The Curly Girl Handbook
              <br />
              <br />
              CGM is about embracing your natural curl pattern and using
              products and techniques that are compatible with it.
            </p>
            <div className="card-actions justify-end w-full mt-auto">
              <a
                href="/guides/curly-girl-method"
                className="btn btn-primary w-full"
              >
                Read Full CGM Guide
              </a>
            </div>
          </div>
        </div>
        {/* Ingredient Rules */}
        <div className="card bg-base-100 rounded-box shadow-none h-full">
          <div className="card-body h-full flex flex-col text-left">
            <div className="w-full h-32 mb-4 rounded overflow-hidden flex items-center justify-center bg-base-200">
              <Image
                src="/images/cgm-hub/rules.png"
                alt="CGM Rules"
                width={600}
                height={160}
                className="w-full h-32 object-cover rounded"
                priority
              />
            </div>
            <h2 className="card-title flex items-center gap-2 w-full">
              <FlaskConical className="w-5 h-5" /> Ingredient Rules
            </h2>
            <p className="text-base-content/80 flex-grow-0">
              On a basic level, on CGM there are certain ingredients you want to
              avoid:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 text-base-content/80">
              <li>No sulfates (in shampoos)</li>
              <li>No silicones</li>
              <li>No waxes</li>
              <li>Avoid drying alcohols</li>
            </ul>
            <div className="card-actions justify-end w-full mt-auto">
              <a
                href="/ingredients-cheat-sheet"
                className="btn btn-secondary w-full"
              >
                View Ingredient Cheatsheet
              </a>
            </div>
          </div>
        </div>
        {/* Analyzer */}
        <div className="card bg-base-100 rounded-box shadow-none h-full">
          <div className="card-body h-full flex flex-col text-left">
            <div className="w-full h-32 mb-4 rounded overflow-hidden flex items-center justify-center bg-base-200">
              <Image
                src="/images/cgm-hub/analyzer.png"
                alt="CGM Rules"
                width={600}
                height={160}
                className="w-full h-32 object-cover rounded"
                priority
              />
            </div>
            <h2 className="card-title flex items-center gap-2 w-full">
              <Search className="w-5 h-5" /> CGM Ingredients Analyzer
            </h2>
            <p className="mb-4 text-base-content/80">
              Paste in an ingredient list and instantly check if the product is
              CGM-friendly.
              <br />
              <br />
              Our smart analyzer scans ingredients in seconds and highlights any
              CGM no-nos, making product selection easier than ever.
            </p>
            <div className="card-actions justify-end w-full mt-auto">
              <a href="/cgm-analyzer" className="btn btn-accent w-full">
                Try the Analyzer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
