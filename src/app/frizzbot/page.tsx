'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  FlaskConical,
  Thermometer,
  Droplets,
  Cloud,
} from 'lucide-react';
import type { WeatherData, WeatherAnalysis } from '@/lib/weather';
import { analyzeDewPoint } from '@/lib/weather';
import Link from 'next/link';
import Avatar from '@/components/avatar';

type TemperatureUnit = 'celsius' | 'fahrenheit';

export default function FrizzBot() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [analysis, setAnalysis] = useState<WeatherAnalysis | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [location, setLocation] = useState('');
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>('celsius');
  const [manualInputs, setManualInputs] = useState({
    temp: '',
    humidity: '',
    dewPoint: '',
  });

  // Load temperature unit preference from localStorage
  useEffect(() => {
    const savedUnit = localStorage.getItem('frizzbot-temperature-unit');
    if (savedUnit === 'celsius' || savedUnit === 'fahrenheit') {
      setTemperatureUnit(savedUnit);
    }
  }, []);

  // Save temperature unit preference to localStorage
  const handleUnitToggle = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
    localStorage.setItem('frizzbot-temperature-unit', unit);
  };

  // Update analysis when temperature unit changes
  useEffect(() => {
    if (weatherData) {
      setAnalysis(analyzeDewPoint(weatherData.dewPoint, temperatureUnit));
    }
  }, [temperatureUnit, weatherData]);

  // Convert temperature based on selected unit (API returns Celsius)
  const convertTemp = (celsius: number): number => {
    return temperatureUnit === 'fahrenheit' ? (celsius * 9) / 5 + 32 : celsius;
  };

  // Convert from user input to Celsius for storage
  const convertToCelsius = (value: number): number => {
    return temperatureUnit === 'fahrenheit' ? ((value - 32) * 5) / 9 : value;
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);
    setShowManualInput(false);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
          );
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch weather data');
          }

          setWeatherData(data);
          setAnalysis(analyzeDewPoint(data.dewPoint, temperatureUnit));
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      },
    );
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(location)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      if (!data.temp || !data.humidity || !data.dewPoint) {
        throw new Error('Invalid weather data received');
      }

      setWeatherData(data);
      setAnalysis(analyzeDewPoint(data.dewPoint, temperatureUnit));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const temp = parseFloat(manualInputs.temp);
    const humidity = parseFloat(manualInputs.humidity);
    const dewPoint = parseFloat(manualInputs.dewPoint);

    if (isNaN(temp) || isNaN(humidity) || isNaN(dewPoint)) {
      setError('Please enter valid numbers for all fields');
      return;
    }

    if (humidity < 0 || humidity > 100) {
      setError('Humidity must be between 0 and 100%');
      return;
    }

    setError(null);
    // Convert user input to Celsius for storage (API returns Celsius)
    const tempC = convertToCelsius(temp);
    const dewPointC = convertToCelsius(dewPoint);
    setWeatherData({ temp: tempC, humidity, dewPoint: dewPointC });
    setAnalysis(analyzeDewPoint(dewPointC, temperatureUnit));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-base-200">
      <h1 className="text-4xl font-bold text-center mb-4">FrizzBot Forecast</h1>

      <div role="alert " className="alert bg-primary/20 text-info-content mb-6">
        <FlaskConical className="h-6 w-6" />
        <span>
          This is an experimental{' '}
          <Link href="/labs" className="link">
            Labs feature
          </Link>
          . Please{' '}
          <Link href="/contact" className="link">
            contact us
          </Link>{' '}
          if you have any feedback!
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={getLocation}
            disabled={loading}
            className="btn btn-primary w-full md:w-auto"
          >
            <MapPin className="h-5 w-5 mr-2" />
            {loading ? 'Getting Location...' : 'Get My Location'}
          </button>

          <form
            onSubmit={handleLocationSubmit}
            className="join w-full md:w-auto"
          >
            <input
              type="text"
              placeholder="Enter city, country (e.g. London, UK or Chicago, IL)"
              className="input input-bordered join-item w-full md:w-80"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary join-item"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </form>

          <button
            onClick={() => {
              setShowManualInput(!showManualInput);
              setError(null);
            }}
            className="btn btn-secondary w-full md:w-auto"
          >
            <FlaskConical className="h-5 w-5 mr-2" />
            {showManualInput ? 'Hide Manual Input' : 'Enter Values Manually'}
          </button>
        </div>

        <div className="flex items-center gap-2 justify-center md:justify-start">
          <span className="text-sm">Temperature:</span>
          <div className="join">
            <button
              type="button"
              onClick={() => handleUnitToggle('celsius')}
              className={`btn btn-sm join-item ${
                temperatureUnit === 'celsius' ? 'btn-active' : ''
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => handleUnitToggle('fahrenheit')}
              className={`btn btn-sm join-item ${
                temperatureUnit === 'fahrenheit' ? 'btn-active' : ''
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {showManualInput && (
        <form
          onSubmit={handleManualSubmit}
          className="card bg-base-200 p-6 mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Temperature ({temperatureUnit === 'celsius' ? '°C' : '°F'})
                </span>
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={temperatureUnit === 'celsius' ? '24' : '75'}
                className="input input-bordered"
                value={manualInputs.temp}
                onChange={(e) =>
                  setManualInputs({ ...manualInputs, temp: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Humidity (%)</span>
              </label>
              <input
                type="number"
                step="1"
                min="0"
                max="100"
                placeholder="50"
                className="input input-bordered"
                value={manualInputs.humidity}
                onChange={(e) =>
                  setManualInputs({
                    ...manualInputs,
                    humidity: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Dew Point ({temperatureUnit === 'celsius' ? '°C' : '°F'})
                </span>
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={temperatureUnit === 'celsius' ? '18' : '65'}
                className="input input-bordered"
                value={manualInputs.dewPoint}
                onChange={(e) =>
                  setManualInputs({
                    ...manualInputs,
                    dewPoint: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary">
              Analyze Weather
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="alert alert-error mt-4">
          <p>{error}</p>
        </div>
      )}

      {weatherData && analysis && (
        <div className="space-y-6">
          <div className="card bg-base-100 p-6">
            <div className="flex justify-between mb-2 items-start">
              <div>
                <h2 className="text-xl font-bold  mb-1">Frizzy</h2>
                <h3 className="text-lg">Today&apos;s Hair Forecast</h3>
              </div>
              <Avatar
                imageUrl={
                  analysis.status === 'warning' || analysis.status === 'caution'
                    ? '/frizz.svg'
                    : '/normal.svg'
                }
                borderClass={
                  analysis.status === 'warning' || analysis.status === 'caution'
                    ? 'border-warning'
                    : 'border-primary'
                }
                altText="Weather Status Icon"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="cb-card-liter text-center bg-primary/10">
                <Thermometer className="w-4 h-4  mx-auto text-primary" />
                <div className="text-xs text-primary">Temp</div>
                <div className="text-lg font-bold">
                  {Math.round(convertTemp(weatherData.temp))}
                  {temperatureUnit === 'celsius' ? '°C' : '°F'}
                </div>
              </div>

              <div className="cb-card-liter text-center bg-primary/10">
                <Droplets className="w-4 h-4 text-primary mx-auto" />
                <div className="text-primary text-xs">Humidity</div>
                <div className="text-lg font-bold">
                  {Math.round(weatherData.humidity)}%
                </div>
              </div>

              <div className="cb-card-liter text-center bg-primary/10">
                <Cloud className="w-4 h-4 text-primary mx-auto" />
                <div className="text-primary text-xs">Dew Point</div>
                <div className="text-lg font-bold">
                  {Math.round(convertTemp(weatherData.dewPoint))}
                  {temperatureUnit === 'celsius' ? '°C' : '°F'}
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 p-6">
            <h3 className="text-2xl font-bold  mb-4">What to Expect</h3>
            <p className="text-sm">{analysis.explanation}</p>
            <div className="card-actions justify-end mt-4">
              <Link href="/groups/humectants" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>

          <div className="card bg-base-100 p-6">
            <h3 className="text-2xl font-bold mb-4">Today&apos;s Hair Tips</h3>
            <ul className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div>✓</div>
                  {rec}
                </li>
              ))}
            </ul>
            <div className="card-actions justify-end mt-4">
              <Link href="/frizzbot/ingredients" className="btn btn-primary">
                Check your products
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
