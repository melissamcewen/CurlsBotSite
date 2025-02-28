import { useState, useEffect } from 'react';

export function useAdBlockDetector() {
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const detectAdBlock = async () => {
      try {
        // Try to fetch a known ad serving domain
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbygoogle';
        document.body.appendChild(testAd);

        // Check if the test ad element was hidden or removed
        const isBlocked = testAd.offsetHeight === 0 ||
                         testAd.offsetParent === null ||
                         window.getComputedStyle(testAd).display === 'none';

        document.body.removeChild(testAd);
        setIsAdBlockEnabled(isBlocked);
      } catch (error) {
        // If there's an error, assume ad blocker is enabled
        setIsAdBlockEnabled(true);
      }
    };

    detectAdBlock();
  }, []);

  return isAdBlockEnabled;
}
