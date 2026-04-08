/**
 * @module useNotes
 * 
 * Manages CRUD operations for calendar notes and monthly memos.
 * All data is persisted to localStorage via storageUtils.
 * 
 * Notes are keyed by date string (e.g., "2026-04-10") or
 * range string (e.g., "2026-04-10_to_2026-04-15").
 */
import { useState, useCallback, useEffect } from 'react';
import { loadNotes, saveNotes, loadMemos, saveMemos } from '../utils/storageUtils';
import { dateToString } from '../utils/dateUtils';

export default function useNotes() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [memos, setMemos] = useState(() => loadMemos());

  // Sync to localStorage whenever notes/memos change
  useEffect(() => { saveNotes(notes); }, [notes]);
  useEffect(() => { saveMemos(memos); }, [memos]);

  /** Adds a note for a single date. */
  const addNote = useCallback((date, text) => {
    if (!text.trim()) return;
    const key = dateToString(date);
    setNotes((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), {
        id: Date.now(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
      }],
    }));
  }, []);

  /** Adds a note spanning a date range. */
  const addRangeNote = useCallback((startDate, endDate, text) => {
    if (!text.trim()) return;
    const rangeKey = `${dateToString(startDate)}_to_${dateToString(endDate)}`;
    setNotes((prev) => ({
      ...prev,
      [rangeKey]: [...(prev[rangeKey] || []), {
        id: Date.now(),
        text: text.trim(),
        isRange: true,
        startDate: dateToString(startDate),
        endDate: dateToString(endDate),
        createdAt: new Date().toISOString(),
      }],
    }));
  }, []);

  /** Deletes a single note by its key and ID. */
  const deleteNote = useCallback((key, noteId) => {
    setNotes((prev) => {
      const updated = (prev[key] || []).filter((n) => n.id !== noteId);
      const next = { ...prev };
      if (updated.length === 0) {
        delete next[key];
      } else {
        next[key] = updated;
      }
      return next;
    });
  }, []);

  /** Returns all notes for a specific date. */
  const getNotesForDate = useCallback((date) => {
    return notes[dateToString(date)] || [];
  }, [notes]);

  /** Returns true if a date has any notes attached. */
  const hasNotesForDate = useCallback((date) => {
    return (notes[dateToString(date)] || []).length > 0;
  }, [notes]);

  /** Returns the memo text for a given month/year. */
  const getMemo = useCallback((month, year) => {
    const key = `${year}-${String(month).padStart(2, '0')}`;
    return memos[key] || '';
  }, [memos]);

  /** Saves a memo for a given month/year. */
  const setMemo = useCallback((month, year, text) => {
    const key = `${year}-${String(month).padStart(2, '0')}`;
    setMemos((prev) => ({ ...prev, [key]: text }));
  }, []);

  /** Returns all note groups for a given month, sorted by date key. */
  const getAllNotesForMonth = useCallback((month, year) => {
    const monthPrefix = `${year}-${String(month).padStart(2, '0')}`;
    const result = [];
    for (const [key, noteList] of Object.entries(notes)) {
      const isDirectMatch = key.startsWith(monthPrefix);
      const isRangeMatch = noteList[0]?.isRange && noteList[0]?.startDate?.startsWith(monthPrefix);
      if (isDirectMatch || isRangeMatch) {
        result.push({ key, notes: noteList });
      }
    }
    return result;
  }, [notes]);

  return {
    notes,
    addNote,
    addRangeNote,
    deleteNote,
    getNotesForDate,
    hasNotesForDate,
    getMemo,
    setMemo,
    getAllNotesForMonth,
  };
}
