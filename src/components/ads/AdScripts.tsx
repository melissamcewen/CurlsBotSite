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

  // Use a stable cache-busting parameter based on the current hour
  const hourTimestamp =
    Math.floor(Date.now() / (1000 * 60 * 60)) * (1000 * 60 * 60);

  return (
    <>
      {/* Load Skimlinks with low priority */}
      <Script
        type="text/javascript"
        src="https://s.skimresources.com/js/276362X1762442.skimlinks.js"
        strategy="lazyOnload"
        async
      />

      {/* Load AdThrive display ads - identity script is loaded early in head */}
      <Script
        id="adthrive-display-ads"
        strategy="afterInteractive"
        data-no-optimize="1"
        data-cfasync="false"
        async
      >
        {`
          (function() {
            // AdThrive identity/tracking is already loaded in head
            // This script handles display ad loading
            function loadAdThriveDisplayAds() {
              try {
                const w = window;
                const d = document;

                // Ensure AdThrive object exists (should be set by early script)
                w.adthrive = w.adthrive || {};
                w.adthrive.cmd = w.adthrive.cmd || [];

                // If the main AdThrive script hasn't loaded yet, load it
                if (!w.adthrive.loaded) {
                  const s = d.createElement('script');
                  s.async = true;
                  s.referrerpolicy = 'no-referrer-when-downgrade';
                  s.src = 'https://ads.adthrive.com/sites/67aceaec554bb80802312182/ads.min.js?referrer=' +
                          w.encodeURIComponent(w.location.href) + '&cb=' + ${hourTimestamp};

                  const firstScript = d.getElementsByTagName('script')[0];
                  firstScript.parentNode.insertBefore(s, firstScript);
                }
              } catch (e) {
                console.debug('AdThrive display ads failed to load:', e);
              }
            }

            // Load display ads with minimal delay
            setTimeout(loadAdThriveDisplayAds, 1000);
          })();
        `}
      </Script>
    </>
  );
}
