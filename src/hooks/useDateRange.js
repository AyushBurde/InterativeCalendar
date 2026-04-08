/**
 * @module useDateRange
 * 
 * Manages date range selection with two interaction modes:
 * 
 * 1. **Two-click flow**: Click once to set start, click again to set end.
 * 2. **Drag flow**: Hold mousedown and drag across cells to select a range.
 * 
 * The two modes are cleanly separated — drag only activates when the mouse
 * actually moves to a different cell. A `didDrag` flag prevents the click
 * handler from double-processing after a drag completes.
 */
import { useState, useCallback, useRef } from 'react';
import { isSameDate, isDateBefore, isDateBetween } from '../utils/dateUtils';

export default function useDateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const selectionStep = useRef('idle'); // 'idle' | 'start-selected'

  // Drag tracking — only activates when mouse moves to a DIFFERENT cell
  const dragOrigin = useRef(null);
  const didDrag = useRef(false);

  // ── Click (two-click flow) ──────────────────────────────────────

  const handleDateClick = useCallback((date) => {
    if (!date.isCurrentMonth) return;

    // Skip click if a drag just happened
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }

    if (selectionStep.current === 'idle') {
      setStartDate(date);
      setEndDate(null);
      selectionStep.current = 'start-selected';
    } else if (selectionStep.current === 'start-selected') {
      if (isSameDate(startDate, date)) {
        // Same date → deselect
        setStartDate(null);
        setEndDate(null);
        selectionStep.current = 'idle';
        return;
      }
      // Ensure start < end
      if (isDateBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      selectionStep.current = 'idle';
    }
  }, [startDate]);

  // ── Drag (hold + move) ─────────────────────────────────────────

  const handleDragStart = useCallback((date) => {
    if (!date.isCurrentMonth) return;
    dragOrigin.current = date;
    didDrag.current = false;
  }, []);

  const handleDragMove = useCallback((date) => {
    if (!dragOrigin.current || !date.isCurrentMonth) return;

    // Only activate drag when mouse moves to a different cell
    if (!isSameDate(dragOrigin.current, date)) {
      if (!didDrag.current) {
        didDrag.current = true;
        setStartDate(dragOrigin.current);
        setEndDate(null);
        selectionStep.current = 'idle';
      }
      setHoveredDate(date);
    }
  }, []);

  const handleDragEnd = useCallback((date) => {
    if (!dragOrigin.current) return;

    if (didDrag.current && date && date.isCurrentMonth) {
      const origin = dragOrigin.current;
      if (!isSameDate(origin, date)) {
        if (isDateBefore(date, origin)) {
          setStartDate(date);
          setEndDate(origin);
        } else {
          setStartDate(origin);
          setEndDate(date);
        }
      }
      setHoveredDate(null);
      selectionStep.current = 'idle';
    }

    dragOrigin.current = null;
  }, []);

  // ── Query helpers ──────────────────────────────────────────────

  const isStart = useCallback((date) => isSameDate(date, startDate), [startDate]);
  const isEnd = useCallback((date) => isSameDate(date, endDate), [endDate]);

  const isInRange = useCallback((date) => {
    if (!startDate || !endDate) return false;
    return isDateBetween(date, startDate, endDate);
  }, [startDate, endDate]);

  const isInPreviewRange = useCallback((date) => {
    if (!startDate || endDate || !hoveredDate) return false;
    if (selectionStep.current !== 'start-selected' && !didDrag.current) return false;
    return isDateBetween(date, startDate, hoveredDate) ||
      isDateBetween(date, hoveredDate, startDate);
  }, [startDate, endDate, hoveredDate]);

  const isPreviewEnd = useCallback((date) => {
    if (!startDate || endDate || !hoveredDate) return false;
    if (selectionStep.current !== 'start-selected' && !didDrag.current) return false;
    return isSameDate(date, hoveredDate);
  }, [startDate, endDate, hoveredDate]);

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoveredDate(null);
    selectionStep.current = 'idle';
    dragOrigin.current = null;
    didDrag.current = false;
  }, []);

  const handleHover = useCallback((date) => {
    setHoveredDate(date);
  }, []);

  /** Returns the number of days in the selected range (inclusive). */
  const getRangeDayCount = useCallback(() => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate.year, startDate.month - 1, startDate.day);
    const e = new Date(endDate.year, endDate.month - 1, endDate.day);
    return Math.round(Math.abs(e - s) / (1000 * 60 * 60 * 24)) + 1;
  }, [startDate, endDate]);

  return {
    startDate,
    endDate,
    hoveredDate,
    handleDateClick,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleHover,
    isStart,
    isEnd,
    isInRange,
    isInPreviewRange,
    isPreviewEnd,
    clearSelection,
    getRangeDayCount,
  };
}
