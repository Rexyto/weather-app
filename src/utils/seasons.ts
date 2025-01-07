export const getSeason = (lat: number, month: number): string => {
  const isNorthern = lat > 0;
  
  if (month >= 3 && month <= 5) return isNorthern ? 'spring' : 'autumn';
  if (month >= 6 && month <= 8) return isNorthern ? 'summer' : 'winter';
  if (month >= 9 && month <= 11) return isNorthern ? 'autumn' : 'spring';
  return isNorthern ? 'winter' : 'summer';
};

export const getSeasonTheme = (season: string) => {
  const themes = {
    spring: {
      bgGradient: 'from-pink-200 via-rose-200 to-pink-300',
      textColor: 'text-gray-800',
      cardBg: 'bg-white/70',
      icon: '🌸'
    },
    summer: {
      bgGradient: 'from-sky-400 via-blue-300 to-sky-300',
      textColor: 'text-gray-800',
      cardBg: 'bg-white/60',
      icon: '☀️'
    },
    autumn: {
      bgGradient: 'from-amber-200 via-orange-200 to-yellow-200',
      textColor: 'text-gray-800',
      cardBg: 'bg-white/70',
      icon: '🍂'
    },
    winter: {
      bgGradient: 'from-blue-900 via-slate-800 to-blue-800',
      textColor: 'text-white',
      cardBg: 'bg-white/20',
      icon: '❄️'
    }
  };
  
  return themes[season as keyof typeof themes];
};