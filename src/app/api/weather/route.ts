import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const location = searchParams.get('location');

  // If location is provided, convert it to lat/lon
  let finalLat = lat;
  let finalLon = lon;

  if (location && !lat && !lon) {
    try {
      // Use OpenStreetMap's Nominatim API to convert location to lat/lon
      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location,
        )}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': '(curlsbot.com, melissa@melissa.dev)',
          },
        },
      );
      const geocodeData = await geocodeResponse.json();

      if (!geocodeResponse.ok || !geocodeData?.[0]) {
        return new NextResponse(
          JSON.stringify({
            error:
              'Location not found. Please try entering your city and country (e.g. "London, UK" or "Chicago, IL")',
          }),
          { status: 400 },
        );
      }

      finalLat = geocodeData[0].lat;
      finalLon = geocodeData[0].lon;
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: 'Failed to lookup location' }),
        { status: 500 },
      );
    }
  }

  if (!finalLat || !finalLon) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing location information' }),
      { status: 400 },
    );
  }

  try {
    // Use Open-Meteo API for international weather data (free, no API key required)
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${finalLat}&longitude=${finalLon}&current=temperature_2m,relative_humidity_2m,dew_point_2m&temperature_unit=celsius`,
      {
        headers: {
          'User-Agent': '(curlsbot.com, melissa@melissa.dev)',
        },
      },
    );

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();

    if (!weatherData.current) {
      throw new Error('Invalid weather data received');
    }

    // Extract the data we need (all values are in Celsius)
    const temp = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const dewPoint = weatherData.current.dew_point_2m;

    return new NextResponse(
      JSON.stringify({
        temp,
        humidity,
        dewPoint,
      }),
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=300',
        },
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch weather data' }),
      { status: 500 },
    );
  }
}
