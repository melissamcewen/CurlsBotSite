'use client';

import { useEffect, useState } from 'react';

export function MultiPlexAd() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading ad:', err);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-8535588433972499"
      data-ad-slot="8998048882"
    />
  );
}
