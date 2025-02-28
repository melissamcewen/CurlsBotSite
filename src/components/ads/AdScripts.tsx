'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function AdScripts() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Delay setting isClient to allow initial page render to complete
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 2000); // 2 second delay

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

      {/* Load AdThrive with low priority */}
      <Script
        id="adthrive-ads"
        strategy="lazyOnload"
        data-no-optimize="1"
        data-cfasync="false"
        async
      >
        {`
          (function() {
            // Create a promise to load the script
            function loadAdThrive() {
              return new Promise((resolve, reject) => {
                try {
                  const w = window;
                  const d = document;

                  w.adthrive = w.adthrive || {};
                  w.adthrive.cmd = w.adthrive.cmd || [];
                  w.adthrive.plugin = 'adthrive-ads-manual';
                  w.adthrive.host = 'ads.adthrive.com';

                  const s = d.createElement('script');
                  s.async = true;
                  s.referrerpolicy = 'no-referrer-when-downgrade';
                  s.src = 'https://' + w.adthrive.host + '/sites/67aceaec554bb80802312182/ads.min.js?referrer=' +
                          w.encodeURIComponent(w.location.href) + '&cb=' + ${hourTimestamp};

                  s.onload = resolve;
                  s.onerror = reject;

                  // Only load if the user has scrolled or after 5 seconds
                  let hasScrolled = false;
                  const scrollHandler = () => {
                    if (!hasScrolled) {
                      hasScrolled = true;
                      window.removeEventListener('scroll', scrollHandler);
                      const n = d.getElementsByTagName('script')[0];
                      n.parentNode.insertBefore(s, n);
                    }
                  };

                  window.addEventListener('scroll', scrollHandler, { passive: true });

                  // Fallback if no scroll after 5 seconds
                  setTimeout(() => {
                    if (!hasScrolled) {
                      scrollHandler();
                    }
                  }, 5000);

                } catch (e) {
                  console.debug('AdThrive failed to load:', e);
                  reject(e);
                }
              });
            }

            // Load script when browser is idle
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                loadAdThrive();
              }, { timeout: 5000 });
            } else {
              setTimeout(loadAdThrive, 2000);
            }
          })();
        `}
      </Script>
    </>
  );
}
