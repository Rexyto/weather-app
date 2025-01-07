import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios, { AxiosError } from 'axios';
import { Settings as SettingsIcon, Cloud, AlertCircle } from 'lucide-react';
import { WeatherData, Settings as SettingsType } from './types';
import { getSeason, getSeasonTheme } from './utils/seasons';
import { translations } from './i18n/translations';
import { WeatherCard } from './components/WeatherCard';
import { HourlyForecast } from './components/HourlyForecast';
import { SettingsPanel } from './components/Settings';
import { SearchBar } from './components/SearchBar';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [settings, setSettings] = useState<SettingsType>(() => {
    const saved = localStorage.getItem('weather-settings');
    return saved ? JSON.parse(saved) : {
      language: 'es',
      locations: []
    };
  });
  const [showSettings, setShowSettings] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError('');

      const [geoResponse, weatherResponse] = await Promise.all([
        axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`, {
          timeout: 10000
        }),
        axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation_probability`,
          {
            timeout: 10000
          }
        )
      ]);

      const weatherCode = weatherResponse.data.current.weather_code;
      const weatherDescription = getWeatherDescription(weatherCode);
      
      setWeather({
        main: {
          temp: weatherResponse.data.current.temperature_2m,
          humidity: weatherResponse.data.current.relative_humidity_2m,
          feels_like: weatherResponse.data.current.apparent_temperature
        },
        weather: [{
          main: weatherDescription,
          description: weatherDescription,
          icon: ''
        }],
        name: geoResponse.data.address.city || geoResponse.data.address.town || geoResponse.data.address.village || 'Unknown',
        sys: {
          country: geoResponse.data.address.country_code?.toUpperCase() || ''
        },
        wind: {
          speed: weatherResponse.data.current.wind_speed_10m
        },
        hourly: {
          time: weatherResponse.data.hourly.time,
          temperature_2m: weatherResponse.data.hourly.temperature_2m,
          precipitation_probability: weatherResponse.data.hourly.precipitation_probability
        }
      });
      
      setRetryCount(0);
    } catch (err) {
      if (retryCount < MAX_RETRIES) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchWeather(lat, lon), 2000 * (retryCount + 1));
      } else {
        setError(translations[settings.language].error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      const options = {
        timeout: 10000,
        maximumAge: 0,
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          setError(translations[settings.language].enableLocation);
          setLoading(false);
        },
        options
      );
    } else {
      setError(translations[settings.language].locationNotSupported);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weather-settings', JSON.stringify(settings));
  }, [settings]);

  const handleLocationSelect = (lat: number, lon: number) => {
    setLocation({ lat, lon });
    fetchWeather(lat, lon);
  };

  const handleSettingsChange = (newSettings: SettingsType) => {
    setSettings(newSettings);
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchWeather(location.lat, location.lon);
  };

  const getWeatherDescription = (code: number): string => {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Unknown';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Cloud className="w-16 h-16 text-white" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-white mb-4" />
        <div className="text-white text-xl text-center mb-4">{error}</div>
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-white text-red-500 rounded-lg shadow-lg hover:bg-red-50 transition-colors"
        >
          {translations[settings.language].retry}
        </button>
      </div>
    );
  }

  if (!weather) return null;

  const season = getSeason(location.lat, new Date().getMonth() + 1);
  const theme = getSeasonTheme(season);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`${theme.textColor} hover:opacity-75 transition-opacity`}
          >
            <SettingsIcon />
          </button>
        </div>

        <SearchBar
          onLocationSelect={handleLocationSelect}
          theme={theme}
          language={settings.language}
        />

        <WeatherCard
          weather={weather}
          theme={theme}
          language={settings.language}
        />

        <HourlyForecast
          weather={weather}
          theme={theme}
          language={settings.language}
        />

        <AnimatePresence>
          {showSettings && (
            <SettingsPanel
              settings={settings}
              onSettingsChange={handleSettingsChange}
              theme={theme}
              onClose={() => setShowSettings(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;