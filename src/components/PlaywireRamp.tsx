'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PLAYWIRE_PUB_ID, PLAYWIRE_WEBSITE_ID } from '@/config/playwire';

declare global {
  interface Window {
    ramp: {
      que: Array<() => void>;
      passiveMode?: boolean;
      spaNewPage: (pathname: string) => void;
    };
  }
}

export function PlaywireRamp() {
  const [rampLoaded, setRampLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!PLAYWIRE_PUB_ID || !PLAYWIRE_WEBSITE_ID) {
      console.debug('Missing Playwire Publisher Id and Website Id');
      return;
    }

    if (rampLoaded) {
      return;
    }

    window.ramp = window.ramp || { que: [] };
    window.ramp.que = window.ramp.que || [];
    window.ramp.passiveMode = true;

    const configScript = document.createElement('script');
    configScript.src = `https://cdn.intergient.com/${PLAYWIRE_PUB_ID}/${PLAYWIRE_WEBSITE_ID}/ramp.js`;
    document.body.appendChild(configScript);
    configScript.onload = () => {
      setRampLoaded(true);
    };
  }, [rampLoaded]);

  useEffect(() => {
    if (!rampLoaded) {
      return;
    }

    window.ramp.que.push(() => {
      window.ramp.spaNewPage(pathname);
    });
  }, [rampLoaded, pathname]);

  return null;
}
