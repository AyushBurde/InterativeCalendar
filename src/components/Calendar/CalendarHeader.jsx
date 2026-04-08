import React from 'react';
import { getMonthName } from '../../utils/dateUtils';
import './CalendarHeader.css';

export default function CalendarHeader({
  month,
  year,
  onPrev,
  onNext,
  theme,
  startDate,
  endDate,
  onClearSelection,
  rangeDayCount,
  onYearClick,
}) {
  return (
    <div className="calendar-header" id="calendar-header">
      <div className="header-nav">
        <button
          className="nav-btn"
          onClick={onPrev}
          aria-label="Previous month"
          id="btn-prev-month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="header-title">
          <h2 className="header-month-name">{getMonthName(month)}</h2>
          <button className="header-year" onClick={onYearClick} title="Click to see year overview">{year}</button>
        </div>

        <button
          className="nav-btn"
          onClick={onNext}
          aria-label="Next month"
          id="btn-next-month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {(startDate || endDate) && (
        <div className="header-selection-info" style={{ backgroundColor: `${theme.primaryColor}12` }}>
          <div className="selection-details">
            <span className="selection-label" style={{ color: theme.primaryColor }}>
              {startDate && !endDate && (
                <>
                  <span className="selection-icon">📍</span>
                  {`${getMonthName(startDate.month)} ${startDate.day}`}
                </>
              )}
              {startDate && endDate && (
                <>
                  <span className="selection-icon">📅</span>
                  {`${getMonthName(startDate.month)} ${startDate.day} → ${getMonthName(endDate.month)} ${endDate.day}`}
                </>
              )}
            </span>
            {rangeDayCount > 0 && (
              <span className="range-badge" style={{ backgroundColor: theme.primaryColor }}>
                {rangeDayCount} day{rangeDayCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            className="clear-btn"
            onClick={onClearSelection}
            style={{ color: theme.primaryColor }}
            id="btn-clear-selection"
            aria-label="Clear date selection"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
