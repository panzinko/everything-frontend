import { useCallback, useEffect, useState } from 'react';
import { Configuration, CurrentWeather, DefaultApi } from '../../lib/openweather-api-client';
import { useConfig } from '../context/ConfigContext';
export function WeatherWidget() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const config = useConfig();

  const fetchWeather = useCallback(async () => {
    if (!config.openWeatherApiKey) {
      setError('API key not configured');
      setLoading(false);
      return;
    }

    try {
      const position = await getCurrentPosition();

      const apiClient = new DefaultApi(
        new Configuration({
          apiKey: config.openWeatherApiKey,
        }),
      );

      const data = await apiClient.onecallGet({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        appid: config.openWeatherApiKey,
        units: 'metric',
      });

      setWeather(data.current || null);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Failed to load weather data');
      setLoading(false);
    }
  }, [config.openWeatherApiKey]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (loading) return <div className="animate-pulse">Loading weather...</div>;
  if (error) return null; // Hide widget on error
  if (!weather) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
        alt={weather.weather?.[0]?.description || 'weather icon'}
        className="w-8 h-8"
      />
      <div>
        <div className="font-medium">{Math.round(weather.temp || 0)}°C</div>
        <div className="text-xs text-gray-500 capitalize">{weather.weather?.[0]?.description}</div>
      </div>
    </div>
  );
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
