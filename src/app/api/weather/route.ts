import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.weather.gov';

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
        )}&format=json&limit=1&countrycodes=us`,
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
              'Location not found. Please try entering your city and state (e.g. "Chicago, IL")',
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
    // First, get the grid coordinates for the location
    const pointsResponse = await fetch(
      `${BASE_URL}/points/${finalLat},${finalLon}`,
      {
        headers: {
          'User-Agent': '(curlsbot.com, melissa@melissa.dev)',
          Accept: 'application/geo+json',
        },
      },
    );

    if (!pointsResponse.ok) {
      throw new Error('Failed to get grid points');
    }

    const pointsData = await pointsResponse.json();
    const { gridId, gridX, gridY } = pointsData.properties;

    // Then, get the current conditions using the grid coordinates
    const stationsResponse = await fetch(
      `${BASE_URL}/gridpoints/${gridId}/${gridX},${gridY}/stations`,
      {
        headers: {
          'User-Agent': '(curlsbot.com, melissa@melissa.dev)',
          Accept: 'application/geo+json',
        },
      },
    );

    if (!stationsResponse.ok) {
      throw new Error('Failed to get stations');
    }

    const stationsData = await stationsResponse.json();
    const nearestStation =
      stationsData.features[0].properties.stationIdentifier;

    // Get the latest observations from the nearest station
    const observationsResponse = await fetch(
      `${BASE_URL}/stations/${nearestStation}/observations/latest`,
      {
        headers: {
          'User-Agent': '(curlsbot.com, melissa@melissa.dev)',
          Accept: 'application/geo+json',
        },
      },
    );

    if (!observationsResponse.ok) {
      throw new Error('Failed to get weather observations');
    }

    const observationsData = await observationsResponse.json();
    const properties = observationsData.properties;

    // Extract the data we need
    const temp = properties.temperature.value;
    const dewPoint = properties.dewpoint.value;
    const humidity = properties.relativeHumidity.value;

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
