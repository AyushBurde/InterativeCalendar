// Holiday data for Indian + International holidays
// Format: { month, day, name, type }
// type: 'national' | 'festival' | 'international'

const holidays = [
  // January
  { month: 1, day: 1, name: "New Year's Day", type: 'international' },
  { month: 1, day: 14, name: 'Makar Sankranti', type: 'festival' },
  { month: 1, day: 26, name: 'Republic Day', type: 'national' },

  // February
  { month: 2, day: 14, name: "Valentine's Day", type: 'international' },

  // March
  { month: 3, day: 8, name: "International Women's Day", type: 'international' },
  { month: 3, day: 17, name: 'Holi', type: 'festival' },

  // April
  { month: 4, day: 1, name: "April Fool's Day", type: 'international' },
  { month: 4, day: 14, name: 'Ambedkar Jayanti', type: 'national' },
  { month: 4, day: 21, name: 'Ram Navami', type: 'festival' },

  // May
  { month: 5, day: 1, name: 'Labour Day', type: 'international' },
  { month: 5, day: 11, name: "Mother's Day", type: 'international' },

  // June
  { month: 6, day: 15, name: "Father's Day", type: 'international' },
  { month: 6, day: 21, name: 'International Yoga Day', type: 'international' },

  // July
  { month: 7, day: 17, name: 'Eid ul-Adha', type: 'festival' },

  // August
  { month: 8, day: 15, name: 'Independence Day', type: 'national' },
  { month: 8, day: 19, name: 'Janmashtami', type: 'festival' },
  { month: 8, day: 26, name: 'Raksha Bandhan', type: 'festival' },

  // September
  { month: 9, day: 5, name: "Teachers' Day", type: 'national' },
  { month: 9, day: 17, name: 'Milad-un-Nabi', type: 'festival' },

  // October
  { month: 10, day: 2, name: 'Gandhi Jayanti', type: 'national' },
  { month: 10, day: 12, name: 'Dussehra', type: 'festival' },
  { month: 10, day: 31, name: 'Halloween', type: 'international' },

  // November
  { month: 11, day: 1, name: 'Diwali', type: 'festival' },
  { month: 11, day: 14, name: "Children's Day", type: 'national' },
  { month: 11, day: 15, name: 'Guru Nanak Jayanti', type: 'festival' },

  // December
  { month: 12, day: 25, name: 'Christmas', type: 'international' },
  { month: 12, day: 31, name: "New Year's Eve", type: 'international' },
];

export function getHolidaysForMonth(month) {
  return holidays.filter((h) => h.month === month);
}

export function getHolidayForDate(month, day) {
  return holidays.find((h) => h.month === month && h.day === day) || null;
}

export function isHoliday(month, day) {
  return holidays.some((h) => h.month === month && h.day === day);
}

export default holidays;
