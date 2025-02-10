'use client';

import { useEffect } from 'react';
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export function InFeedAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading ad:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key="-fb+5w+4e-db+86"
      data-ad-client="ca-pub-8535588433972499"
      data-ad-slot="7767931536"
    />
  );
}
