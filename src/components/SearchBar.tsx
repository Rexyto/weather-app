import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import axios from 'axios';
import { translations } from '../i18n/translations';

interface Props {
  onLocationSelect: (lat: number, lon: number) => void;
  theme: any;
  language: 'es' | 'en' | 'de';
}

export const SearchBar: React.FC<Props> = ({ onLocationSelect, theme, language }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const t = translations[language];

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${encodeURIComponent(query)}`
      );
      setResults(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={t.searchPlaceholder}
          className={`w-full px-4 py-2 ${theme.cardBg} backdrop-blur-lg rounded-lg ${theme.textColor} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Search className={theme.textColor} />
        </button>
      </div>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 ${theme.cardBg} backdrop-blur-lg rounded-lg overflow-hidden`}
        >
          {results.map((result) => (
            <button
              key={result.place_id}
              onClick={() => {
                onLocationSelect(
                  parseFloat(result.lat),
                  parseFloat(result.lon)
                );
                setResults([]);
                setQuery('');
              }}
              className={`w-full text-left px-4 py-2 hover:bg-black/10 ${theme.textColor}`}
            >
              {result.display_name}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};