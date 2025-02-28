import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export function SiteFixBanner() {
  return (
    <Link href="/old-site">
      <div className="alert bg-warning text-warning-content mb-4 cursor-pointer">
        <AlertTriangle className="w-5 h-5" />
        <span>Having issues with the new site? Visit our site fix page.</span>
      </div>
    </Link>
  );
}
