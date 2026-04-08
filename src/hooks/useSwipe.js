/**
 * @module useSwipe
 * 
 * Detects horizontal swipe gestures via both touch (mobile) and
 * mouse drag (desktop). Mouse drag is restricted to the hero image
 * area to avoid conflicting with date cell clicks.
 * 
 * @param {React.RefObject} ref - Element to attach listeners to
 * @param {Object} options
 * @param {Function} options.onSwipeLeft - Called on left swipe (→ next)
 * @param {Function} options.onSwipeRight - Called on right swipe (→ prev)
 * @param {number} [options.threshold=60] - Min px distance to trigger swipe
 */
import { useEffect, useRef } from 'react';

export default function useSwipe(ref, { onSwipeLeft, onSwipeRight, threshold = 60 }) {
  const startX = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ── Touch events (mobile) ────────────────────────────────────
    const handleTouchStart = (e) => {
      startX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (startX.current === null) return;
      const endX = e.changedTouches[0].clientX;
      const distance = startX.current - endX;
      if (Math.abs(distance) >= threshold) {
        if (distance > 0 && onSwipeLeft) onSwipeLeft();
        else if (distance < 0 && onSwipeRight) onSwipeRight();
      }
      startX.current = null;
    };

    // ── Mouse events (desktop) ───────────────────────────────────
    const handleMouseDown = (e) => {
      // Only track on hero image / spiral binding to avoid date cell conflicts
      const isHeroArea = e.target.closest('.hero-image-container') ||
                         e.target.closest('.spiral-binding');
      if (!isHeroArea) return;
      isDragging.current = true;
      startX.current = e.clientX;
      e.preventDefault();
    };

    const handleMouseUp = (e) => {
      if (!isDragging.current || startX.current === null) {
        isDragging.current = false;
        return;
      }
      isDragging.current = false;
      const distance = startX.current - e.clientX;
      if (Math.abs(distance) >= threshold) {
        if (distance > 0 && onSwipeLeft) onSwipeLeft();
        else if (distance < 0 && onSwipeRight) onSwipeRight();
      }
      startX.current = null;
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      startX.current = null;
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, onSwipeLeft, onSwipeRight, threshold]);
}
