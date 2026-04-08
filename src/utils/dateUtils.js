/**
 * @module dateUtils
 * 
 * Pure utility functions for date calculations.
 * No external dependencies — all date math is hand-written.
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Returns the full month name (1-indexed). */
export function getMonthName(month) {
  return MONTH_NAMES[month - 1];
}

/** Returns the abbreviated day names starting from Monday. */
export function getDayNames() {
  return DAY_NAMES;
}

/** Returns the number of days in a given month/year. */
export function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

/**
 * Returns the first day of the month as a 0-indexed ISO weekday.
 * 0 = Monday, 6 = Sunday
 */
export function getFirstDayOfMonth(month, year) {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

/** Checks if a given day/month/year matches today's date. */
export function isToday(day, month, year) {
  const today = new Date();
  return (
    today.getDate() === day &&
    today.getMonth() + 1 === month &&
    today.getFullYear() === year
  );
}

/** Compares two date objects { day, month, year } for equality. */
export function isSameDate(d1, d2) {
  if (!d1 || !d2) return false;
  return d1.day === d2.day && d1.month === d2.month && d1.year === d2.year;
}

/** Returns true if d1 is chronologically before d2. */
export function isDateBefore(d1, d2) {
  if (!d1 || !d2) return false;
  const date1 = new Date(d1.year, d1.month - 1, d1.day);
  const date2 = new Date(d2.year, d2.month - 1, d2.day);
  return date1 < date2;
}

/** Returns true if d1 is chronologically after d2. */
export function isDateAfter(d1, d2) {
  if (!d1 || !d2) return false;
  const date1 = new Date(d1.year, d1.month - 1, d1.day);
  const date2 = new Date(d2.year, d2.month - 1, d2.day);
  return date1 > date2;
}

/** Returns true if `date` falls strictly between `start` and `end` (exclusive). */
export function isDateBetween(date, start, end) {
  if (!date || !start || !end) return false;
  const d = new Date(date.year, date.month - 1, date.day);
  let s = new Date(start.year, start.month - 1, start.day);
  let e = new Date(end.year, end.month - 1, end.day);
  if (s > e) [s, e] = [e, s];
  return d > s && d < e;
}

/** Converts a date object to a 'YYYY-MM-DD' string for use as a storage key. */
export function dateToString(date) {
  if (!date) return '';
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
}

/** Formats a date range into a human-readable string (e.g., "April 5 - 12"). */
export function formatDateRange(start, end) {
  if (!start) return '';
  const startStr = `${getMonthName(start.month)} ${start.day}`;
  if (!end) return startStr;
  const endStr = start.month === end.month
    ? `${end.day}`
    : `${getMonthName(end.month)} ${end.day}`;
  return `${startStr} - ${endStr}`;
}

/**
 * Builds a 42-cell grid (6 rows × 7 columns) for a given month.
 * Includes trailing days from the previous month and leading days from the next month.
 * Each cell is an object: { day, month, year, isCurrentMonth }
 */
export function buildCalendarGrid(month, year) {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  // Previous month info
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);

  // Next month info
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const cells = [];

  // Fill previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
    });
  }

  // Fill current month's days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      month: month,
      year: year,
      isCurrentMonth: true,
    });
  }

  // Fill next month's leading days to complete the 42-cell grid
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({
      day: d,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
    });
  }

  return cells;
}
