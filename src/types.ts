export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
  };
}

export interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export interface Settings {
  language: 'es' | 'en' | 'de';
  locations: SavedLocation[];
}

export type Language = 'es' | 'en' | 'de';