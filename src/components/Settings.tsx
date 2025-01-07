import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { Settings as SettingsType, Language, SavedLocation } from '../types';
import { translations } from '../i18n/translations';

interface Props {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
  theme: any;
  onClose: () => void;
}

export const SettingsPanel: React.FC<Props> = ({ settings, onSettingsChange, theme, onClose }) => {
  const t = translations[settings.language];

  const handleLanguageChange = (language: Language) => {
    onSettingsChange({ ...settings, language });
  };

  const handleLocationRemove = (location: SavedLocation) => {
    onSettingsChange({
      ...settings,
      locations: settings.locations.filter(loc => loc.id !== location.id)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className={`fixed right-0 top-0 h-full w-80 ${theme.cardBg} backdrop-blur-lg shadow-2xl p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${theme.textColor}`}>
          <SettingsIcon className="inline-block mr-2" />
          {t.settings}
        </h2>
        <button
          onClick={onClose}
          className={`${theme.textColor} hover:opacity-75`}
        >
          <X />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className={`font-semibold mb-2 ${theme.textColor}`}>{t.language}</h3>
          <div className="space-y-2">
            {(['es', 'en', 'de'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  settings.language === lang
                    ? 'bg-blue-500 text-white'
                    : `${theme.cardBg} ${theme.textColor}`
                }`}
              >
                {t[lang === 'es' ? 'spanish' : lang === 'en' ? 'english' : 'german']}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`font-semibold mb-2 ${theme.textColor}`}>
            {t.savedLocations}
          </h3>
          <div className="space-y-2">
            {settings.locations.map(location => (
              <div
                key={location.id}
                className={`flex justify-between items-center p-4 rounded-lg ${theme.cardBg}`}
              >
                <span className={theme.textColor}>{location.name}</span>
                <button
                  onClick={() => handleLocationRemove(location)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};