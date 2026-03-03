'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function AdScripts() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Reduced delay to allow initial page render to complete
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 500); // Reduced from 2000ms to 500ms

    return () => clearTimeout(timer);
  }, []);

  // Only render ad scripts on client-side to avoid hydration mismatches
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Load Skimlinks (affiliate) with low priority */}
      <Script
        type="text/javascript"
        src="https://s.skimresources.com/js/276362X1762442.skimlinks.js"
        strategy="lazyOnload"
        async
      />
    </>
  );
}
