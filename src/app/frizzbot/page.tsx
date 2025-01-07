'use client';

import { useState } from 'react';
import { MapPin, FlaskConical } from 'lucide-react';
import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import type { WeatherData, WeatherAnalysis } from '@/lib/weather';
import { analyzeDewPoint } from '@/lib/weather';
import Link from 'next/link';
import Image from 'next/image';
import Avatar from '@/components/avatar';

export default function FrizzBot() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [analysis, setAnalysis] = useState<WeatherAnalysis | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [location, setLocation] = useState('');
  const [manualInputs, setManualInputs] = useState({
    temp: '',
    humidity: '',
    dewPoint: '',
  });

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
          setAnalysis(analyzeDewPoint(data.dewPoint));
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
      setAnalysis(analyzeDewPoint(data.dewPoint));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Weather fetch error:', err);
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
    setWeatherData({ temp, humidity, dewPoint });
    setAnalysis(analyzeDewPoint(dewPoint));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Avatar imageUrl="/frizz.svg" altText="FrizzBot Logo" />
        <h1 className="text-4xl font-bold">FrizzBot Weather Forecast</h1>
      </div>

      <div role="alert" className="alert mb-6">
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

      <div className="mb-12">
        <p className="mb-4">
          Get personalized hair care recommendations based on your local weather
          conditions. FrizzBot analyzes three key weather factors:
        </p>

        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <strong>Temperature</strong> affects how quickly your hair dries and
            how it retains moisture
          </li>
          <li>
            <strong>Humidity</strong> determines how much moisture is in the air
            that can affect your hair
          </li>
          <li>
            <strong>Dew Point</strong> is the most important factor - it tells
            us how likely moisture is to move between your hair and the air,
            which can cause or prevent frizz
          </li>
        </ul>

        <p className="mb-4">
          Want to learn more about managing frizz? Check out our{' '}
          <Link href="/frizzbot/ingredients" className="link">
            FrizzBot ingredients analyzer
          </Link>{' '}
          and{' '}
          <Link href="/groups/humectants" className="link">
            Humectants guide
          </Link>
          .
        </p>

        <div className=" flex-row gap-4 mb-4 md:flex space-y-4 md:space-y-0">
          <button
            onClick={getLocation}
            disabled={loading}
            className="btn btn-primary w-full md:w-auto"
          >
            <MapPin className="h-5 w-5 mr-2" />
            {loading ? 'Getting Location...' : 'Get My Location (US only)'}
          </button>

          <form
            onSubmit={handleLocationSubmit}
            className="join w-full md:w-auto"
          >
            <input
              type="text"
              placeholder="Enter city, state (e.g. Chicago, IL), US only"
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

        {showManualInput && (
          <form
            onSubmit={handleManualSubmit}
            className="card bg-base-200 p-6 mb-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Temperature (°C)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="20"
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
                  <span className="label-text">Dew Point (°C)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="15"
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
            <div className="stats stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Temperature</div>
                <div className="stat-value">
                  {Math.round((weatherData.temp * 9) / 5 + 32)}°F
                </div>
                <div className="stat-desc">
                  {Math.round(weatherData.temp)}°C
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Humidity</div>
                <div className="stat-value">
                  {Math.round(weatherData.humidity)}%
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Dew Point</div>
                <div className="stat-value">
                  {Math.round((weatherData.dewPoint * 9) / 5 + 32)}°F
                </div>
                <div className="stat-desc">
                  {Math.round(weatherData.dewPoint)}°C
                </div>
              </div>
            </div>

            <ChatBubbleRobot status={analysis.status}>
              <ChatBubble status={analysis.status}>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">{analysis.forecast}</h3>
                  <p className="text-base-content/80">{analysis.explanation}</p>
                  <div className="divider my-2"></div>
                  <div>
                    <h4 className="font-bold mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ChatBubble>
            </ChatBubbleRobot>

            <div className="card bg-base-200 p-6">
              <p>
                Want to check if your products are good for these weather
                conditions?{' '}
                <Link
                  href="/frizzbot/ingredients"
                  className="link link-primary"
                >
                  Analyze your product ingredients
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
