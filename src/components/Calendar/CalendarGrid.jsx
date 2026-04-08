import React, { useCallback } from 'react';
import { getDayNames } from '../../utils/dateUtils';
import DayCell from './DayCell';
import './CalendarGrid.css';

export default function CalendarGrid({
  grid,
  theme,
  onDateClick,
  onDragStart,
  onDragMove,
  onDragEnd,
  onHover,
  isStart,
  isEnd,
  isInRange,
  isInPreviewRange,
  isPreviewEnd,
  hasNotesForDate,
}) {
  const dayNames = getDayNames();

  // Mouse drag handlers on the grid container
  const handleMouseDown = useCallback((date) => {
    onDragStart(date);
  }, [onDragStart]);

  const handleMouseOver = useCallback((date) => {
    onDragMove(date);
    onHover(date);
  }, [onDragMove, onHover]);

  const handleMouseUp = useCallback((date) => {
    onDragEnd(date);
  }, [onDragEnd]);

  // Prevent text selection during drag
  const handleSelectStart = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className="calendar-grid-container"
      id="calendar-grid"
      onSelectCapture={handleSelectStart}
    >
      <div className="day-names-row">
        {dayNames.map((name, i) => (
          <div
            key={name}
            className={`day-name ${i >= 5 ? 'weekend-name' : ''}`}
          >
            {name}
          </div>
        ))}
      </div>

      <div
        className="days-grid"
        onMouseUp={() => onDragEnd(null)}
        onMouseLeave={() => onDragEnd(null)}
      >
        {grid.map((date, i) => (
          <DayCell
            key={`${date.year}-${date.month}-${date.day}-${i}`}
            date={date}
            isRangeStart={isStart(date)}
            isRangeEnd={isEnd(date)}
            inRange={isInRange(date)}
            inPreviewRange={isInPreviewRange(date)}
            isPreviewEnd={isPreviewEnd ? isPreviewEnd(date) : false}
            hasNote={hasNotesForDate(date)}
            theme={theme}
            onClick={onDateClick}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            onMouseUp={handleMouseUp}
          />
        ))}
      </div>
    </div>
  );
}
