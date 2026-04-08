import React, { memo } from 'react';
import { isToday } from '../../utils/dateUtils';
import { getHolidayForDate } from '../../data/holidays';
import './DayCell.css';

const DayCell = memo(function DayCell({
  date,
  isRangeStart,
  isRangeEnd,
  inRange,
  inPreviewRange,
  isPreviewEnd,
  hasNote,
  theme,
  onClick,
  onMouseDown,
  onMouseOver,
  onMouseUp,
}) {
  const today = isToday(date.day, date.month, date.year);
  const holiday = getHolidayForDate(date.month, date.day);
  const isWeekend = (() => {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  })();

  const classNames = [
    'day-cell',
    !date.isCurrentMonth && 'other-month',
    today && 'today',
    isRangeStart && 'range-start',
    isRangeEnd && 'range-end',
    inRange && 'in-range',
    inPreviewRange && 'in-preview-range',
    isPreviewEnd && 'preview-end',
    isWeekend && date.isCurrentMonth && 'weekend',
    holiday && date.isCurrentMonth && 'has-holiday',
    hasNote && 'has-note',
  ]
    .filter(Boolean)
    .join(' ');

  const holidayTypeColor = {
    national: '#FF6B35',
    festival: '#7C3AED',
    international: '#0EA5E9',
  };

  return (
    <div
      className={classNames}
      onClick={() => onClick(date)}
      onMouseDown={() => onMouseDown(date)}
      onMouseOver={() => onMouseOver(date)}
      onMouseUp={() => onMouseUp(date)}
      role="button"
      tabIndex={date.isCurrentMonth ? 0 : -1}
      aria-label={`${date.day} ${date.month} ${date.year}${holiday ? ` - ${holiday.name}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(date);
        }
      }}
      style={{
        '--range-color': theme.primaryColor,
        '--range-bg': `${theme.primaryColor}15`,
        '--range-bg-strong': `${theme.primaryColor}25`,
      }}
    >
      {/* Range background connector */}
      {(inRange || inPreviewRange) && (
        <span className="range-connector" />
      )}

      {/* Range endpoint background pill */}
      {(isRangeStart || isRangeEnd) && (
        <span
          className="range-endpoint-bg"
          style={{ backgroundColor: theme.primaryColor }}
        />
      )}

      <span className="day-number">{date.day}</span>

      {today && (
        <span className="today-ring" style={{ borderColor: theme.primaryColor }}>
          <span className="today-dot" style={{ backgroundColor: theme.primaryColor }} />
        </span>
      )}

      {holiday && date.isCurrentMonth && (
        <div className="holiday-indicator" title={holiday.name}>
          <span
            className="holiday-dot"
            style={{ backgroundColor: holidayTypeColor[holiday.type] || theme.primaryColor }}
          />
          <div className="holiday-tooltip">
            <span className="tooltip-name">{holiday.name}</span>
            <span
              className="tooltip-type"
              style={{ color: holidayTypeColor[holiday.type] }}
            >
              {holiday.type}
            </span>
          </div>
        </div>
      )}

      {hasNote && date.isCurrentMonth && (
        <span className="note-indicator">
          <svg width="8" height="8" viewBox="0 0 24 24" fill={theme.primaryColor} opacity="0.7">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </span>
      )}
    </div>
  );
});

export default DayCell;
