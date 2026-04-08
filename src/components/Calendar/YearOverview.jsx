import React from 'react';
import { getMonthName, getDaysInMonth, getFirstDayOfMonth } from '../../utils/dateUtils';
import { getSeasonForMonth } from '../../data/themes';
import './YearOverview.css';

export default function YearOverview({ year, currentMonth, onSelectMonth, onClose }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const today = new Date();

  return (
    <div className="year-overlay" onClick={onClose}>
      <div className="year-overview" onClick={(e) => e.stopPropagation()}>
        <div className="year-overview-header">
          <h2 className="year-overview-title">{year}</h2>
          <button className="year-close-btn" onClick={onClose} aria-label="Close year overview">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="year-grid">
          {months.map((m) => {
            const theme = getSeasonForMonth(m);
            const isActive = m === currentMonth;
            const isTodayMonth = m === today.getMonth() + 1 && year === today.getFullYear();
            const daysInMonth = getDaysInMonth(m, year);
            const firstDay = getFirstDayOfMonth(m, year);

            return (
              <button
                key={m}
                className={`mini-month ${isActive ? 'active' : ''} ${isTodayMonth ? 'has-today' : ''}`}
                onClick={() => onSelectMonth(m)}
                style={{ '--mini-primary': theme.primaryColor }}
              >
                <span className="mini-month-name">{getMonthName(m).substring(0, 3)}</span>
                <div className="mini-grid">
                  {/* Day headers */}
                  {['M','T','W','T','F','S','S'].map((d, i) => (
                    <span key={i} className={`mini-day-header ${i >= 5 ? 'mini-weekend' : ''}`}>{d}</span>
                  ))}
                  {/* Empty cells before first day */}
                  {Array.from({ length: firstDay }, (_, i) => (
                    <span key={`e${i}`} className="mini-day empty" />
                  ))}
                  {/* Day numbers */}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const isT = day === today.getDate() && m === today.getMonth() + 1 && year === today.getFullYear();
                    const dow = new Date(year, m - 1, day).getDay();
                    const isWknd = dow === 0 || dow === 6;
                    return (
                      <span
                        key={day}
                        className={`mini-day ${isT ? 'mini-today' : ''} ${isWknd ? 'mini-weekend' : ''}`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
