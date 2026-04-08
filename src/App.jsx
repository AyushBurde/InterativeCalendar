import React, { useMemo, useCallback, useState, useRef } from 'react';
import useCalendar from './hooks/useCalendar';
import useDateRange from './hooks/useDateRange';
import useNotes from './hooks/useNotes';
import useSwipe from './hooks/useSwipe';
import { getSeasonForMonth } from './data/themes';
import SpiralBinding from './components/Calendar/SpiralBinding';
import HeroImage from './components/Calendar/HeroImage';
import CalendarHeader from './components/Calendar/CalendarHeader';
import CalendarGrid from './components/Calendar/CalendarGrid';
import NotesPanel from './components/Notes/NotesPanel';
import YearOverview from './components/Calendar/YearOverview';
import './App.css';

export default function App() {
  const [showYearOverview, setShowYearOverview] = useState(false);
  const calendarPanelRef = useRef(null);

  const {
    currentMonth,
    currentYear,
    calendarGrid,
    flipDirection,
    goToNextMonth,
    goToPrevMonth,
    goToMonth,
  } = useCalendar();

  const {
    startDate,
    endDate,
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
  } = useDateRange();

  const {
    addNote,
    addRangeNote,
    deleteNote,
    hasNotesForDate,
    getMemo,
    setMemo,
    getAllNotesForMonth,
  } = useNotes();

  const theme = useMemo(
    () => getSeasonForMonth(currentMonth),
    [currentMonth]
  );

  // Swipe gestures for mobile month navigation
  useSwipe(calendarPanelRef, {
    onSwipeLeft: goToNextMonth,
    onSwipeRight: goToPrevMonth,
  });

  const goToToday = useCallback(() => {
    const now = new Date();
    goToMonth(now.getMonth() + 1, now.getFullYear());
  }, [goToMonth]);

  const handleYearClick = useCallback(() => {
    setShowYearOverview(true);
  }, []);

  const handleSelectMonth = useCallback((m) => {
    goToMonth(m, currentYear);
    setShowYearOverview(false);
  }, [goToMonth, currentYear]);

  return (
    <div
      className="app-wrapper light"
      style={{ '--cal-primary': theme.primaryColor, '--cal-accent': theme.accentColor }}
    >
      {/* Background ambient glow */}
      <div
        className="ambient-bg"
        style={{
          background: `
            radial-gradient(ellipse at 30% 0%, ${theme.accentColor}35 0%, transparent 60%),
            radial-gradient(ellipse at 70% 100%, ${theme.primaryColor}15 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating particles */}
      <div className="particles" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--delay': `${i * 2}s`,
              '--x': `${15 + i * 14}%`,
              '--size': `${3 + (i % 3) * 2}px`,
              backgroundColor: theme.primaryColor,
            }}
          />
        ))}
      </div>

      <main className="calendar-app" id="calendar-app">
        {/* Top toolbar */}
        <div className="top-toolbar">
          <button className="today-btn" onClick={goToToday} id="btn-go-today">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Today
          </button>
          <div className="toolbar-hint">
            <span>Swipe or use ← → to navigate</span>
          </div>
        </div>

        <div className="calendar-body">
          {/* Left: Calendar Panel */}
          <div className="calendar-panel" ref={calendarPanelRef}>
            <SpiralBinding />
            <div className="calendar-paper">
              <HeroImage
                month={currentMonth}
                year={currentYear}
                theme={theme}
                flipDirection={flipDirection}
              />
              <CalendarHeader
                month={currentMonth}
                year={currentYear}
                onPrev={goToPrevMonth}
                onNext={goToNextMonth}
                theme={theme}
                startDate={startDate}
                endDate={endDate}
                onClearSelection={clearSelection}
                rangeDayCount={getRangeDayCount()}
                onYearClick={handleYearClick}
              />
              <CalendarGrid
                grid={calendarGrid}
                theme={theme}
                onDateClick={handleDateClick}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                onHover={handleHover}
                isStart={isStart}
                isEnd={isEnd}
                isInRange={isInRange}
                isInPreviewRange={isInPreviewRange}
                isPreviewEnd={isPreviewEnd}
                hasNotesForDate={hasNotesForDate}
              />
              {/* Page curl effect */}
              <div className="page-curl" />
            </div>
          </div>

          {/* Right: Notes Panel */}
          <div className="notes-side-panel">
            <NotesPanel
              month={currentMonth}
              year={currentYear}
              theme={theme}
              startDate={startDate}
              endDate={endDate}
              addNote={addNote}
              addRangeNote={addRangeNote}
              deleteNote={deleteNote}
              getMemo={getMemo}
              setMemo={setMemo}
              getAllNotesForMonth={getAllNotesForMonth}
            />
          </div>
        </div>
      </main>

      {/* Footer credit */}
      <footer className="app-footer">
        <span>Interactive Wall Calendar • Built with React + Vite</span>
      </footer>

      {/* Year Overview Modal */}
      {showYearOverview && (
        <YearOverview
          year={currentYear}
          currentMonth={currentMonth}
          onSelectMonth={handleSelectMonth}
          onClose={() => setShowYearOverview(false)}
        />
      )}
    </div>
  );
}
