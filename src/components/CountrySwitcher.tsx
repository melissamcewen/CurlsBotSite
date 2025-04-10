import { useLocalization } from '@/contexts/LocalizationContext';
import { Globe } from 'lucide-react';
import { CountryCode } from '@/lib/countryDetection';

export default function CountrySwitcher() {
  const { country, setCountry, countryName } = useLocalization();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost gap-2">
        <Globe className="h-5 w-5" />
        <span className="hidden md:inline">{countryName}</span>
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-accent rounded-box w-52 mt-4"
      >
        <li>
          <button
            className={country === 'US' ? 'active' : ''}
            onClick={() => setCountry('US')}
          >
            United States
          </button>
        </li>
        <li>
          <button
            className={country === 'UK' ? 'active' : ''}
            onClick={() => setCountry('UK')}
          >
            United Kingdom
          </button>
        </li>
        <li>
          <button
            className={country === 'AU' ? 'active' : ''}
            onClick={() => setCountry('AU')}
          >
            Australia
          </button>
        </li>
      </ul>
    </div>
  );
}
