/**
 * Why all this ceremony?
 *
 * Figma demanded peek-through cards + drag/swipe only (no arrows).
 *
 * overflow: visible lets next card sneak in—but kills native scroll, so we hijack pointer events.
 * pointer capture + a tiny DRAG_THRESHOLD means taps still click links, swipes slide the track.
 * clamp translate via a ref (currentTrans) so we don’t flood React with state updates mid-drag.
 * compute scrollProgress & segments to drive a little progress bar so users know where they are.
 * Learned: sometimes CSS alone won’t cut it—combining refs, state, and pointer API yields buttery drags.
 *
 * If you aware a solution less cumbersome than this, or at least more readable, please contact me on benjaminpeto@gmail.com.
 * I would love to know there is still hope when creating carousels from scratch 🤣
 */

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function useCarousel(items: React.ReactNode[]) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // drag state
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0); // mouse starts here
  const currentTrans = useRef(0);
  const [translate, setTranslate] = useState(0); // drives re-render

  // distinguish click vs drag
  const hasDraggedRef = useRef(false);
  const DRAG_THRESHOLD = 5; // pixels of "i meant to drag" sensitivity

  // progress‐bar
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSegments, setVisibleSegments] = useState(0);

  // reset when items change
  useEffect(() => {
    currentTrans.current = 0;
    setTranslate(0);
    updateProgress(0);
  }, [items]);

  function updateProgress(curr: number) {
    const wrap = wrapperRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const scrollable = track.scrollWidth - wrap.clientWidth;
    const prog = scrollable > 0 ? -curr / scrollable : 0;
    setScrollProgress(prog);

    // setVisibleSegments(Math.ceil(track.scrollWidth / wrap.clientWidth));
    const segments =
      wrap.clientWidth > 0
        ? Math.ceil(track.scrollWidth / wrap.clientWidth)
        : 0;
    setVisibleSegments(segments);
  }

  // start drag
  function onPointerDown(e: React.PointerEvent) {
    const w = wrapperRef.current;
    if (!w) return;
    // w.setPointerCapture(e.pointerId);
    if (typeof w.setPointerCapture === 'function') {
      w.setPointerCapture(e.pointerId);
    }
    setIsDragging(true);
    startXRef.current = e.clientX;
    hasDraggedRef.current = false;
  }

  // during drag
  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > DRAG_THRESHOLD) hasDraggedRef.current = true;

    let next = currentTrans.current + delta;
    const w = wrapperRef.current,
      t = trackRef.current;
    if (w && t) {
      const max = 0;
      const min = w.clientWidth - t.scrollWidth;
      next = Math.min(max, Math.max(min, next));
    }

    setTranslate(next);
    updateProgress(next);
  }

  // end drag (or click)
  function onPointerUpCapture(e: React.PointerEvent) {
    const w = wrapperRef.current;
    // if (w) w.releasePointerCapture(e.pointerId);
    if (w && typeof w.releasePointerCapture === 'function') {
      w.releasePointerCapture(e.pointerId);
    }

    // if it was a “click” (no real drag), manually navigate
    if (!hasDraggedRef.current) {
      const el =
        typeof document.elementFromPoint === 'function'
          ? (document.elementFromPoint(
              e.clientX,
              e.clientY,
            ) as HTMLElement | null)
          : null;
      const link = el?.closest('a') as HTMLAnchorElement | null;
      if (link) {
        const href = link.getAttribute('href');
        if (href) router.push(href);
      }
    }

    setIsDragging(false);
    currentTrans.current = translate;
  }

  const totalSegments = Math.max(visibleSegments, 4);
  const activeSegment = Math.floor(scrollProgress * (totalSegments - 1));

  return {
    wrapperRef,
    trackRef,
    isDragging,
    translate,
    onPointerDown,
    onPointerMove,
    onPointerUpCapture,
    totalSegments,
    activeSegment,
  };
}
