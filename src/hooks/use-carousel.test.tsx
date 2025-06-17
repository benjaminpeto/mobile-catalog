/* eslint-disable @next/next/no-html-link-for-pages */
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCarousel } from './use-carousel';

// JSDOM doesn’t implement elementFromPoint by default,
// polyfill it so vitest can spy on it
if (
  typeof document !== 'undefined' &&
  typeof document.elementFromPoint !== 'function'
) {
  document.elementFromPoint = () => null;
}

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

function TestCarousel({ items }: { items: React.ReactNode[] }) {
  const {
    wrapperRef,
    trackRef,
    translate,
    onPointerDown,
    onPointerMove,
    onPointerUpCapture,
    totalSegments,
    activeSegment,
  } = useCarousel(items);

  return (
    <>
      <div
        data-testid="wrapper"
        ref={wrapperRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUpCapture={onPointerUpCapture}
      >
        <div
          data-testid="track"
          ref={trackRef}
          style={{ transform: `translateX(${translate}px)` }}
        >
          {items}
        </div>
      </div>
      <div data-testid="totalSegments">{totalSegments}</div>
      <div data-testid="activeSegment">{activeSegment}</div>
    </>
  );
}

describe('useCarousel hook', () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it('starts with translate 0, isDragging false, and at least 4 segments, active 0', () => {
    render(<TestCarousel items={[]} />);
    // no width defaults, but totalSegments is clamped to >=4
    expect(screen.getByTestId('totalSegments')).toHaveTextContent('4');
    expect(screen.getByTestId('activeSegment')).toHaveTextContent('0');
    // track has transform: translateX(0px)
    expect(screen.getByTestId('track')).toHaveStyle({
      transform: 'translateX(0px)',
    });
  });

  it('clicks a link (no drag) and calls router.push', () => {
    render(
      <TestCarousel
        items={[
          <a key="c" href="/clicked">
            CLICK ME
          </a>,
        ]}
      />,
    );
    const wrapper = screen.getByTestId('wrapper');
    const link = screen.getByText('CLICK ME') as HTMLAnchorElement;

    // make elementFromPoint return our link
    vi.spyOn(document, 'elementFromPoint').mockImplementation(() => link);

    // pointerDown + pointerUp at same spot -> hasDraggedRef = false
    fireEvent.pointerDown(wrapper, { clientX: 10, pointerId: 1 });
    fireEvent.pointerUp(wrapper, { clientX: 10, pointerId: 1 });

    expect(pushMock).toHaveBeenCalledWith('/clicked');
  });

  it('resets translate & progress when items change', () => {
    const { rerender } = render(
      <TestCarousel items={[<span key="A">A</span>, <span key="B">B</span>]} />,
    );
    const wrapper = screen.getByTestId('wrapper');
    const track = screen.getByTestId('track');

    // fake dimensions again
    Object.defineProperty(wrapper, 'clientWidth', { value: 100 });
    Object.defineProperty(track, 'scrollWidth', { value: 300 });

    // do a little swipe
    fireEvent.pointerDown(wrapper, { clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(wrapper, { clientX: 50 });
    fireEvent.pointerUp(wrapper, { clientX: 50, pointerId: 1 });

    expect(track).not.toHaveStyle({ transform: 'translateX(0px)' });

    // now swap items -> effect should reset translate and progress
    rerender(
      <TestCarousel items={[<span key="X">X</span>, <span key="Y">Y</span>]} />,
    );

    expect(track).toHaveStyle({ transform: 'translateX(0px)' });
    expect(screen.getByTestId('activeSegment')).toHaveTextContent('0');
  });
});
