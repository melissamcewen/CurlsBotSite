import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export function DraftBanner() {
  return (
    <div className="bg-warning text-warning-content">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
          <span>
            This is a draft version of CurlsBot. Please{' '}
            <Link href="/contact" className="underline font-bold">
              contact us
            </Link>{' '}
            if you spot any issues.
          </span>
        </div>
      </div>
    </div>
  )
}
