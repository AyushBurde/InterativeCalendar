import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getMonthName, formatDateRange } from '../../utils/dateUtils';
import { getHolidaysForMonth } from '../../data/holidays';
import './NotesPanel.css';

export default function NotesPanel({
  month,
  year,
  theme,
  startDate,
  endDate,
  addNote,
  addRangeNote,
  deleteNote,
  getMemo,
  setMemo,
  getAllNotesForMonth,
}) {
  const [noteText, setNoteText] = useState('');
  const [memoText, setMemoText] = useState('');
  const textareaRef = useRef(null);
  const monthNotes = getAllNotesForMonth(month, year);
  const currentMemo = getMemo(month, year);
  const [isMemoEditing, setIsMemoEditing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const holidays = getHolidaysForMonth(month);

  useEffect(() => {
    setMemoText(currentMemo);
  }, [currentMemo, month, year]);

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    if (startDate && endDate) {
      addRangeNote(startDate, endDate, noteText);
    } else if (startDate) {
      addNote(startDate, noteText);
    }
    setNoteText('');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 800);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const handleMemoBlur = () => {
    setMemo(month, year, memoText);
    setIsMemoEditing(false);
  };

  const formatNoteKey = (key) => {
    if (key.includes('_to_')) {
      const [start, end] = key.split('_to_');
      const [, sm, sd] = start.split('-');
      const [, em, ed] = end.split('-');
      return `${getMonthName(parseInt(sm))} ${parseInt(sd)} → ${getMonthName(parseInt(em))} ${parseInt(ed)}`;
    }
    const [, m, d] = key.split('-');
    return `${getMonthName(parseInt(m))} ${parseInt(d)}`;
  };

  // Export notes as text file
  const exportNotes = useCallback(() => {
    const monthName = getMonthName(month);
    let content = `📅  ${monthName} ${year} — Calendar Notes\n${'═'.repeat(40)}\n\n`;

    if (currentMemo) {
      content += `📝 Month Memo:\n${currentMemo}\n\n`;
    }

    if (monthNotes.length > 0) {
      content += `📌 Notes:\n${'─'.repeat(30)}\n`;
      monthNotes.forEach(({ key, notes: noteList }) => {
        content += `\n▸ ${formatNoteKey(key)}:\n`;
        noteList.forEach((n) => {
          content += `  • ${n.text}\n`;
        });
      });
    }

    if (holidays.length > 0) {
      content += `\n🎉 Holidays:\n${'─'.repeat(30)}\n`;
      holidays.forEach((h) => {
        content += `  ${h.day} ${monthName} — ${h.name} (${h.type})\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-notes-${monthName.toLowerCase()}-${year}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [month, year, currentMemo, monthNotes, holidays]);

  const totalNotes = monthNotes.reduce((sum, g) => sum + g.notes.length, 0);

  const holidayTypeColor = {
    national: '#FF6B35',
    festival: '#7C3AED',
    international: '#0EA5E9',
  };

  return (
    <div className="notes-panel" id="notes-panel">
      {/* Header */}
      <div className="notes-header">
        <h3 className="notes-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Notes
          {totalNotes > 0 && (
            <span className="notes-count" style={{ backgroundColor: theme.primaryColor }}>
              {totalNotes}
            </span>
          )}
        </h3>
        <div className="notes-header-actions">
          {(totalNotes > 0 || currentMemo) && (
            <button
              className="export-btn"
              onClick={exportNotes}
              title="Export notes as text file"
              aria-label="Export notes"
              style={{ color: theme.primaryColor }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          )}
          <span className="notes-month-label" style={{ color: theme.primaryColor }}>
            {getMonthName(month)} {year}
          </span>
        </div>
      </div>

      {/* Month Memo Section */}
      <div className="memo-section">
        <label className="memo-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Month Memo
        </label>
        <div className={`memo-area ${isMemoEditing ? 'editing' : ''}`}>
          <textarea
            className="memo-textarea"
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
            onFocus={() => setIsMemoEditing(true)}
            onBlur={handleMemoBlur}
            placeholder="Write notes for this month..."
            rows={3}
            id="month-memo-textarea"
          />
          <div className="memo-lines" aria-hidden="true">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="memo-line" />
            ))}
          </div>
        </div>
      </div>

      {/* Add Note for Selected Date/Range */}
      {startDate && (
        <div className="add-note-section" style={{ borderColor: `${theme.primaryColor}30` }}>
          <div className="add-note-header">
            <span className="add-note-label" style={{ color: theme.primaryColor }}>
              {endDate
                ? `📝 Note for ${formatDateRange(startDate, endDate)}`
                : `📝 Note for ${getMonthName(startDate.month)} ${startDate.day}`
              }
            </span>
          </div>
          <div className="add-note-input-row">
            <div className="input-wrapper">
              <textarea
                ref={textareaRef}
                className="note-input"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your note and press Enter..."
                rows={2}
                id="note-input-textarea"
                style={{ borderColor: `${theme.primaryColor}30` }}
              />
              {showConfetti && (
                <div className="input-confetti" aria-hidden="true">
                  {['✨', '🎉', '⭐', '💫'].map((emoji, i) => (
                    <span key={i} className="confetti-piece" style={{ '--i': i }}>
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              className="add-note-btn"
              onClick={handleAddNote}
              disabled={!noteText.trim()}
              style={{ backgroundColor: theme.primaryColor }}
              id="btn-add-note"
              aria-label="Add note"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Existing Notes List */}
      <div className="notes-list">
        {monthNotes.length === 0 && !startDate && (
          <div className="empty-notes">
            <div className="empty-illustration">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                <rect x="12" y="8" width="40" height="48" rx="4" stroke={theme.primaryColor} strokeWidth="2" opacity="0.3" />
                <line x1="20" y1="20" x2="44" y2="20" stroke={theme.primaryColor} strokeWidth="2" opacity="0.2" />
                <line x1="20" y1="28" x2="40" y2="28" stroke={theme.primaryColor} strokeWidth="2" opacity="0.15" />
                <line x1="20" y1="36" x2="36" y2="36" stroke={theme.primaryColor} strokeWidth="2" opacity="0.1" />
                <circle cx="48" cy="48" r="12" fill={theme.primaryColor} opacity="0.1" />
                <line x1="44" y1="48" x2="52" y2="48" stroke={theme.primaryColor} strokeWidth="2" opacity="0.4" />
                <line x1="48" y1="44" x2="48" y2="52" stroke={theme.primaryColor} strokeWidth="2" opacity="0.4" />
              </svg>
            </div>
            <p className="empty-title">No notes yet</p>
            <p className="empty-hint">Select a date to start adding notes</p>
          </div>
        )}

        {monthNotes.map(({ key, notes: noteList }) => (
          <div key={key} className="note-group">
            <div className="note-date-label" style={{ color: theme.primaryColor }}>
              <span className="note-date-dot" style={{ backgroundColor: theme.primaryColor }} />
              {formatNoteKey(key)}
            </div>
            {noteList.map((note, noteIdx) => (
              <div
                key={note.id}
                className="note-card"
                style={{
                  borderLeftColor: theme.primaryColor,
                  animationDelay: `${noteIdx * 0.05}s`,
                }}
              >
                <p className="note-text">{note.text}</p>
                <button
                  className="delete-note-btn"
                  onClick={() => deleteNote(key, note.id)}
                  title="Delete note"
                  aria-label="Delete note"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Holiday Legend */}
      {holidays.length > 0 && (
        <div className="holiday-legend">
          <div className="legend-title">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Holidays this month
          </div>
          {holidays.map((h) => (
            <div key={`${h.month}-${h.day}`} className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: holidayTypeColor[h.type] || theme.primaryColor }}
              />
              <span className="legend-day">{h.day}</span>
              <span className="legend-name">{h.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
