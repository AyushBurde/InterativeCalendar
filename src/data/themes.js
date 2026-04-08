// Seasonal themes for the wall calendar
// 4 seasons (Indian calendar), each with a hero image and color palette

const themes = {
  winter: {
    months: [12, 1, 2], // Dec, Jan, Feb
    heroImage: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&h=500&fit=crop&q=80',
    primaryColor: '#3B82F6',
    accentColor: '#BFDBFE',
    waveColor: '#2563EB',
    gradientStart: '#EFF6FF',
    gradientEnd: '#1E40AF',
    textOnImage: '#FFFFFF',
    seasonLabel: 'Winter',
    bgTint: 'rgba(59, 130, 246, 0.03)',
  },
  summer: {
    months: [3, 4, 5, 6], // Mar, Apr, May, Jun
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&q=80',
    primaryColor: '#F59E0B',
    accentColor: '#FDE68A',
    waveColor: '#D97706',
    gradientStart: '#FFFBEB',
    gradientEnd: '#92400E',
    textOnImage: '#FFFFFF',
    seasonLabel: 'Summer',
    bgTint: 'rgba(245, 158, 11, 0.03)',
  },
  monsoon: {
    months: [7, 8, 9], // Jul, Aug, Sep
    heroImage: 'https://images.unsplash.com/photo-1438449805896-28a666819a20?w=800&h=500&fit=crop&q=80',
    primaryColor: '#0EA5E9',
    accentColor: '#BAE6FD',
    waveColor: '#0284C7',
    gradientStart: '#F0F9FF',
    gradientEnd: '#075985',
    textOnImage: '#FFFFFF',
    seasonLabel: 'Monsoon',
    bgTint: 'rgba(14, 165, 233, 0.03)',
  },
  autumn: {
    months: [10, 11], // Oct, Nov
    heroImage: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=500&fit=crop&q=80',
    primaryColor: '#EF4444',
    accentColor: '#FECACA',
    waveColor: '#DC2626',
    gradientStart: '#FEF2F2',
    gradientEnd: '#991B1B',
    textOnImage: '#FFFFFF',
    seasonLabel: 'Autumn',
    bgTint: 'rgba(239, 68, 68, 0.03)',
  },
};

export function getSeasonForMonth(month) {
  for (const [season, config] of Object.entries(themes)) {
    if (config.months.includes(month)) {
      return { season, ...config };
    }
  }
  return { season: 'winter', ...themes.winter };
}

export default themes;
