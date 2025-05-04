'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import { Globe } from 'lucide-react';
import { CountryCode } from '@/lib/countryDetection';
import { useRef, useEffect, useState } from 'react';

export default function CountrySwitcher() {
  const { country, setCountry, countryName } = useLocalization();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCountrySelect = (selectedCountry: CountryCode) => {
    setCountry(selectedCountry);
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <details className="dropdown dropdown-end" ref={detailsRef}>
      <summary className="btn btn-ghost gap-2 list-none">
        <Globe className="h-5 w-5" />
        <span className="hidden md:inline" suppressHydrationWarning>
          {mounted ? countryName : 'United States'}
        </span>
      </summary>
      <ul className="menu dropdown-content z-[1] p-2 shadow bg-accent rounded-box w-52 mt-4">
        <li>
          <button
            className={country === 'US' ? 'active' : ''}
            onClick={() => handleCountrySelect('US')}
          >
            United States
          </button>
        </li>
        <li>
          <button
            className={country === 'UK' ? 'active' : ''}
            onClick={() => handleCountrySelect('UK')}
          >
            United Kingdom
          </button>
        </li>
        <li>
          <button
            className={country === 'EU' ? 'active' : ''}
            onClick={() => handleCountrySelect('EU')}
          >
            European Union
          </button>
        </li>
        <li>
          <button
            className={country === 'AU' ? 'active' : ''}
            onClick={() => handleCountrySelect('AU')}
          >
            Australia
          </button>
        </li>
      </ul>
    </details>
  );
}
