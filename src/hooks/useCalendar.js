/**
 * @module useCalendar
 * 
 * Manages calendar navigation state: current month/year, grid generation,
 * page-flip animation direction, and keyboard shortcuts (← →).
 */
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { buildCalendarGrid } from '../utils/dateUtils';

export default function useCalendar() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev'
  const isAnimating = useRef(false);

  /** The 42-cell grid for the current month, recomputed only on month/year change. */
  const calendarGrid = useMemo(
    () => buildCalendarGrid(currentMonth, currentYear),
    [currentMonth, currentYear]
  );

  /** Navigates to the next month with a page-flip animation. */
  const goToNextMonth = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setFlipDirection('next');
    setTimeout(() => {
      setCurrentMonth((prev) => {
        if (prev === 12) {
          setCurrentYear((y) => y + 1);
          return 1;
        }
        return prev + 1;
      });
      setFlipDirection(null);
      isAnimating.current = false;
    }, 600);
  }, []);

  /** Navigates to the previous month with a page-flip animation. */
  const goToPrevMonth = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setFlipDirection('prev');
    setTimeout(() => {
      setCurrentMonth((prev) => {
        if (prev === 1) {
          setCurrentYear((y) => y - 1);
          return 12;
        }
        return prev - 1;
      });
      setFlipDirection(null);
      isAnimating.current = false;
    }, 600);
  }, []);

  /** Jumps directly to a specific month/year (no animation). */
  const goToMonth = useCallback((month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  }, []);

  // Keyboard: ← → arrow keys change months (skipped when typing in inputs)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevMonth();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextMonth();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextMonth, goToPrevMonth]);

  return {
    currentMonth,
    currentYear,
    calendarGrid,
    flipDirection,
    goToNextMonth,
    goToPrevMonth,
    goToMonth,
  };
}
