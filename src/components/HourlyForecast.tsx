import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WeatherData } from '../types';
import { translations } from '../i18n/translations';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  weather: WeatherData;
  theme: any;
  language: 'es' | 'en' | 'de';
}

export const HourlyForecast: React.FC<Props> = ({ weather, theme, language }) => {
  const t = translations[language];

  if (!weather.hourly) return null;

  // Memoize chart data and options to prevent unnecessary re-renders
  const { data, options } = useMemo(() => {
    const chartData = {
      labels: weather.hourly.time.slice(0, 24).map(time => 
        new Date(time).toLocaleTimeString(language, { hour: '2-digit' })
      ),
      datasets: [
        {
          label: t.temperature,
          data: weather.hourly.temperature_2m.slice(0, 24),
          borderColor: theme.textColor === 'text-white' ? '#fff' : '#1a1a1a',
          backgroundColor: theme.textColor === 'text-white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          tension: 0.4,
          yAxisID: 'y-temperature'
        },
        {
          label: t.precipitation,
          data: weather.hourly.precipitation_probability.slice(0, 24),
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.1)',
          tension: 0.4,
          yAxisID: 'y-precipitation'
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: theme.textColor === 'text-white' ? '#fff' : '#1a1a1a',
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          mode: 'index' as const,
          intersect: false,
        }
      },
      scales: {
        'y-temperature': {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          title: {
            display: true,
            text: '°C',
            color: theme.textColor === 'text-white' ? '#fff' : '#1a1a1a'
          },
          ticks: {
            color: theme.textColor === 'text-white' ? '#fff' : '#1a1a1a'
          },
          grid: {
            color: theme.textColor === 'text-white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }
        },
        'y-precipitation': {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          title: {
            display: true,
            text: '%',
            color: '#60a5fa'
          },
          ticks: {
            color: '#60a5fa'
          },
          grid: {
            display: false
          }
        },
        x: {
          ticks: {
            color: theme.textColor === 'text-white' ? '#fff' : '#1a1a1a'
          },
          grid: {
            color: theme.textColor === 'text-white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }
        }
      }
    };

    return { data: chartData, options: chartOptions };
  }, [weather.hourly, theme.textColor, language, t.temperature, t.precipitation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`mt-8 p-6 ${theme.cardBg} backdrop-blur-lg rounded-3xl shadow-xl`}
    >
      <h2 className={`text-xl font-bold mb-4 ${theme.textColor}`}>
        {t.hourlyForecast}
      </h2>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};