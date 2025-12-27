import Link from 'next/link';
import Image from 'next/image';
import {
  ExternalLink,
  BookOpen,
  Mail,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { TikTokEmailSignup } from '@/components/EmailSignupVariants';

export default function TikTokPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-[520px] px-4 py-8">
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-3 mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring-2 ring-base-300">
              <img src="/headshot.jpg" alt="Melissa McEwen" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-base-content">
            @curlsbot
          </h1>
          <p className="text-base text-base-content/70">
            Your curly hair science guide
          </p>
        </header>

        {/* Lead Magnet / Email Signup */}
        <section className="card bg-base-100 border border-base-300 rounded-2xl shadow-lg mb-6">
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/images/porosity/book.png"
                alt="Lightweight Products Guide"
                width={50}
                height={50}
                className="rounded"
              />
              <h2 className="text-lg font-semibold">
                Find light products for fine, wavy, or low-porosity hair
              </h2>
            </div>
            <p className="text-sm text-base-content/70 mb-3">
              Get the free ebook that shows how to spot lightweight formulas{' '}
              <span className="underline">anywhere.</span>
            </p>
            {/* Your existing component renders the input + button */}
            <TikTokEmailSignup />
          </div>
        </section>
        {/* Porosity post /blog/hair-porosity-explained */}
        <Link
          href="/blog/hair-porosity-explained"
          className="group block rounded-2xl border border-base-300 bg-base-100 p-4 hover:bg-base-200/50 transition mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-base-200 grid place-items-center shrink-0">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-medium">
                Hair Porosity Explained
              </div>
              <div className="text-sm text-base-content/60 truncate">
                Why internet porosity advice doesn&apos;t work and what actually
                matters for hair care.
              </div>
            </div>
            <ChevronRight className="ml-auto w-4 h-4 text-base-content/50 group-hover:translate-x-0.5 transition" />
          </div>
        </Link>

        {/* Hair Type Quiz */}
        <Link
          href="/hair-types/quiz"
          target="_blank"
          className="group block rounded-2xl border border-base-300 bg-base-100 p-4 hover:bg-base-200/50 transition mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-base-200 grid place-items-center shrink-0">
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-medium">Learn your hair type</div>
              <div className="text-sm text-base-content/60 truncate">
                Take our hair type quiz to find out in just 2 minutes! (Or read
                about the [CurlsBot Curl Typing
                System](/blog/curlsbot-curl-typing))
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-base-content/50 group-hover:translate-x-0.5 transition shrink-0" />
          </div>
        </Link>
        {/* Skeptics Guide To Bond Repair */}
        <Link
          href="/blog/skeptics-guide-to-bond-repair"
          className="group block rounded-2xl border border-base-300 bg-base-100 p-4 hover:bg-base-200/50 transition mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-base-200 grid place-items-center shrink-0">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-medium">
                Skeptics Guide To Bond Repair
              </div>
              <div className="text-sm text-base-content/60 truncate">
                A comprehensive guide to bond repair products for curly/wavy
                hair, including what they are, when to use them, and which ones
                are worth it.
              </div>
            </div>
            <ChevronRight className="ml-auto w-4 h-4 text-base-content/50 group-hover:translate-x-0.5 transition" />
          </div>
        </Link>
        {/* Protein Bad for low porosity hair */}
        <Link
          href="/blog/is-protein-bad-for-low-porosity-hair"
          className="group block rounded-2xl border border-base-300 bg-base-100 p-4 hover:bg-base-200/50 transition mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-base-200 grid place-items-center shrink-0">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-medium">
                Is Protein Bad for Low Porosity Hair?
              </div>
              <div className="text-sm text-base-content/60 truncate">
                Busting the myth that protein is bad for low porosity hair with
                the power of science.
              </div>
            </div>
            <ChevronRight className="ml-auto w-4 h-4 text-base-content/50 group-hover:translate-x-0.5 transition" />
          </div>
        </Link>

        {/* Links */}
        <nav className="space-y-3">
          {/* Curls Monthly */}
          <Link
            href="https://curlsmonthly.com/?ref=curlsbot"
            target="_blank"
            className="group block rounded-2xl border border-base-300 bg-base-100 p-3.5 hover:bg-base-200/50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-base-200 grid place-items-center shrink-0">
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-medium">
                  Get $5 off Curls Monthly
                </div>
                <div className="text-sm text-base-content/60 truncate">
                  Try sample sizes of the products I use!
                </div>
              </div>
              <ChevronRight className="ml-auto w-4 h-4 text-base-content/50 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Abbey Yung Method */}
          <Link
            href="/blog/the-abbey-yung-method"
            className="group block rounded-2xl border border-base-300 bg-base-100 p-3.5 hover:bg-base-200/50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-base-200 grid place-items-center shrink-0">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-medium">
                  The Abbey Yung Method: A Step-by-Step Guide and Review
                </div>
                <div className="text-sm text-base-content/60 truncate">
                  Full Abbey Yung Method guide with step-by-step instructions,
                  product lists, routine examples, and a curly/wavy hair review.
                </div>
              </div>
              <ChevronRight className="ml-auto w-4 h-4 text-base-content/50 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>
          {/* All Blog Posts */}
          <Link
            href="/blog"
            className="group block rounded-2xl border border-base-300 bg-base-100 p-3.5 hover:bg-base-200/50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-base-200 grid place-items-center shrink-0">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-medium">All Blog Posts</div>
                <div className="text-sm text-base-content/60 truncate">
                  Read the Curls Bot blog!
                </div>
              </div>
              <ChevronRight className="ml-auto w-4 h-4 text-base-content/50 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>
        </nav>

        {/* Disclaimer */}
        <p className="text-center text-xs text-base-content/50 mt-8">
          Links may earn commission
        </p>
      </div>
    </div>
  );
}
