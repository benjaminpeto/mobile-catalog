/* eslint-disable @next/next/no-html-link-for-pages */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
        ref={wrapperRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUpCapture={onPointerUpCapture}
      >
        <div ref={trackRef} style={{ transform: `translateX(${translate}px)` }}>
          {items}
        </div>
      </div>
      <div>{totalSegments}</div>
      <div>{activeSegment}</div>
    </>
  );
}

describe('useCarousel hook', () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it('starts with translate 0, isDragging false, and at least 4 segments, active 0', () => {
    const { container } = render(<TestCarousel items={[]} />);
    const [wrapperDiv, totalDiv, activeDiv] = Array.from(
      container.children,
    ) as HTMLElement[];

    // wrapper contains a single child: trackDiv
    const trackDiv = wrapperDiv.firstElementChild as HTMLElement;

    // totalSegments is clamped to >= 4
    expect(totalDiv).toHaveTextContent('4');
    // activeSegment starts at 0
    expect(activeDiv).toHaveTextContent('0');
    // track starts at translateX(0px)
    expect(trackDiv).toHaveStyle({ transform: 'translateX(0px)' });
  });

  it('clicks a link (no drag) and calls router.push', () => {
    const { container } = render(
      <TestCarousel
        items={[
          <a key="c" href="/clicked">
            CLICK ME
          </a>,
        ]}
      />,
    );
    const [wrapperDiv] = Array.from(container.children) as HTMLElement[];
    const link = screen.getByText('CLICK ME') as HTMLAnchorElement;

    // make elementFromPoint return the link
    vi.spyOn(document, 'elementFromPoint').mockImplementation(() => link);

    // pointerDown + pointerUp at same spot -> treated as click
    fireEvent.pointerDown(wrapperDiv, { clientX: 10, pointerId: 1 });
    fireEvent.pointerUp(wrapperDiv, { clientX: 10, pointerId: 1 });

    expect(pushMock).toHaveBeenCalledWith('/clicked');
  });

  it('resets translate & progress when items change', async () => {
    const { container, rerender } = render(
      <TestCarousel items={[<span key="A">A</span>, <span key="B">B</span>]} />,
    );
    const [wrapperDiv] = Array.from(container.children) as HTMLElement[];
    const trackDiv = wrapperDiv.firstElementChild as HTMLElement;

    // fake dimensions so drag is possible
    Object.defineProperty(wrapperDiv, 'clientWidth', { value: 100 });
    Object.defineProperty(trackDiv, 'scrollWidth', { value: 300 });

    // do a little swipe (drag)
    fireEvent.pointerDown(wrapperDiv, { clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(wrapperDiv, { clientX: 50 });
    fireEvent.pointerUp(wrapperDiv, { clientX: 50, pointerId: 1 });

    // track should have moved away from zero
    expect(trackDiv).not.toHaveStyle({ transform: 'translateX(0px)' });

    // now swap items -> effect should reset translate and progress
    rerender(
      <TestCarousel items={[<span key="X">X</span>, <span key="Y">Y</span>]} />,
    );

    // wait for useEffect to apply reset
    await waitFor(() => {
      // children have not changed, so re-query by index
      const [, totalDiv, activeDiv] = Array.from(
        container.children,
      ) as HTMLElement[];

      // track reset
      expect(trackDiv).toHaveStyle({ transform: 'translateX(0px)' });
      // active segment reset
      expect(activeDiv).toHaveTextContent('0');
    });
  });
});
