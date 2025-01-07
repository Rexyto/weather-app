import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import { WeatherData } from '../types';
import { translations } from '../i18n/translations';

interface Props {
  weather: WeatherData;
  theme: any;
  language: 'es' | 'en' | 'de';
}

export const WeatherCard: React.FC<Props> = ({ weather, theme, language }) => {
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-md mx-auto ${theme.cardBg} backdrop-blur-lg rounded-3xl p-8 shadow-2xl`}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl mb-4"
        >
          {theme.icon}
        </motion.div>
        <h1 className={`text-3xl font-bold mb-2 ${theme.textColor}`}>
          {weather.name}{weather.sys.country ? `, ${weather.sys.country}` : ''}
        </h1>
        <p className={`text-lg mb-6 ${theme.textColor}`}>
          {weather.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${theme.cardBg} p-4 rounded-xl backdrop-blur-lg`}
        >
          <div className="flex items-center gap-2">
            <Thermometer className={theme.textColor} />
            <span className={`text-2xl font-bold ${theme.textColor}`}>
              {Math.round(weather.main.temp)}°C
            </span>
          </div>
          <p className={`text-sm mt-1 ${theme.textColor}`}>{t.temperature}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${theme.cardBg} p-4 rounded-xl backdrop-blur-lg`}
        >
          <div className="flex items-center gap-2">
            <Droplets className={theme.textColor} />
            <span className={`text-2xl font-bold ${theme.textColor}`}>
              {weather.main.humidity}%
            </span>
          </div>
          <p className={`text-sm mt-1 ${theme.textColor}`}>{t.humidity}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${theme.cardBg} p-4 rounded-xl backdrop-blur-lg`}
        >
          <div className="flex items-center gap-2">
            <Wind className={theme.textColor} />
            <span className={`text-2xl font-bold ${theme.textColor}`}>
              {Math.round(weather.wind.speed)} m/s
            </span>
          </div>
          <p className={`text-sm mt-1 ${theme.textColor}`}>{t.windSpeed}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${theme.cardBg} p-4 rounded-xl backdrop-blur-lg`}
        >
          <div className="flex items-center gap-2">
            <Thermometer className={theme.textColor} />
            <span className={`text-2xl font-bold ${theme.textColor}`}>
              {Math.round(weather.main.feels_like)}°C
            </span>
          </div>
          <p className={`text-sm mt-1 ${theme.textColor}`}>{t.feelsLike}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};