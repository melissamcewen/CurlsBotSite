'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

const countryNames: Record<CountryCode, string> = {
  US: 'United States',
  UK: 'United Kingdom',
  AU: 'Australia',
};

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<CountryCode>(() => {
    // Try to get from localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('country') as CountryCode;
      if (saved && Object.keys(countryNames).includes(saved)) {
        return saved;
      }
    }
    return getCountryFromHostname();
  });

  useEffect(() => {
    localStorage.setItem('country', country);
  }, [country]);

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
