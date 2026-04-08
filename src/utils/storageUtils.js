/**
 * @module storageUtils
 * 
 * Thin wrappers around localStorage for persistent notes and memos.
 * All operations are wrapped in try/catch to handle quota errors gracefully.
 */

const NOTES_KEY = 'wallcalendar_notes';
const MEMO_KEY = 'wallcalendar_memos';

/** Loads notes from localStorage. Returns an empty object on failure. */
export function loadNotes() {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/** Persists notes to localStorage. */
export function saveNotes(notes) {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.warn('Failed to save notes:', e);
  }
}

/** Loads monthly memos from localStorage. Returns an empty object on failure. */
export function loadMemos() {
  try {
    const data = localStorage.getItem(MEMO_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/** Persists memos to localStorage. */
export function saveMemos(memos) {
  try {
    localStorage.setItem(MEMO_KEY, JSON.stringify(memos));
  } catch (e) {
    console.warn('Failed to save memos:', e);
  }
}
