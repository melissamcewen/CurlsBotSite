'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getCountryFromHostname, CountryCode } from '@/lib/countryDetection';

interface LocalizationContextType {
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
  countryName: string;
}

const LocalizationContext = createContext<LocalizationContextType>({
  country: 'US',
  setCountry: () => {},
  countryName: 'United States',
});

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      'useLocalization must be used within a LocalizationProvider',
    );
  }
  return context;
};

const countryNames: Record<CountryCode, string> = {
  US: 'United States',
  UK: 'United Kingdom',
  AU: 'Australia',
  EU: 'European Union',
};

export function LocalizationProvider({ children }: { children: ReactNode }) {
  // Initialize with a default value for server-side rendering
  // This prevents hydration errors by using same initial value on both server and client
  const [isClient, setIsClient] = useState(false);
  const [country, setCountry] = useState<CountryCode>('US');

  // Only run this effect on the client after initial render
  useEffect(() => {
    setIsClient(true);
    // Now we're safely on the client side, we can check localStorage
    const savedCountry = localStorage.getItem('country') as CountryCode;
    if (savedCountry && Object.keys(countryNames).includes(savedCountry)) {
      setCountry(savedCountry);
    } else {
      // If no saved country, detect it
      const detectedCountry = getCountryFromHostname(window.location.hostname);
      setCountry(detectedCountry);
    }
  }, []);

  // Save to localStorage when country changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('country', country);
    }
  }, [country, isClient]);

  const value = {
    country,
    setCountry,
    countryName: countryNames[country],
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}
