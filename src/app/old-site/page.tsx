import { RefreshCw } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CurlsBot Site Update - Clear Cache",
  description: "If you're still seeing the old CurlsBot site, clear your cache to see the new version. Instructions for fixing issues with the CurlsBot website update.",
  keywords: "curlsbot broken, curlsbot not working, curlsbot old site, curlsbot cache, curlsbot update"
};

export default function OldSitePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-100 p-8 rounded-3xl">
        <h1 className="text-3xl font-bold mb-6">Still Seeing the Old CurlsBot?</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            We&apos;ve recently updated CurlsBot with exciting new features! However, some users might still be seeing the old version due to cached data in their browsers.
          </p>

          <div className="alert alert-info rounded-3xl mb-6">
            <RefreshCw className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Quick Fix</h3>
              <div>Click the button below to clear your cached data and see the new site.</div>
            </div>
          </div>

          <Link
            href="/api/clear-cache"
            className="btn btn-primary rounded-full gap-2 mb-8"
          >
            <RefreshCw className="w-5 h-5" />
            Clear Cache & Refresh
          </Link>

          <h2 className="text-2xl font-bold mt-8 mb-4">Still Having Issues?</h2>
          <p>If you&apos;re still experiencing problems after clicking the button above, try these steps:</p>
          <ul>
            <li>Refresh your browser page</li>
            <li>Clear your browser&apos;s cache manually</li>
            <li>Try opening the site in a private/incognito window</li>
            <li>Try a different web browser</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
