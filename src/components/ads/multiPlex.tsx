'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const AdComponent = () => {
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
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-8535588433972499"
      data-ad-slot="8998048882"
    />
  );
};

export const MultiPlexAd = dynamic(() => Promise.resolve(AdComponent), {
  ssr: false,
});
