import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Carousel } from './carousel';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

// polyfill elementFromPoint for JSDOM so click tests can spy on it
if (typeof document.elementFromPoint !== 'function') {
  document.elementFromPoint = () => null;
}

describe('Carousel component', () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it('renders items, starts at translateX(0px), and shows 4 segments', () => {
    const items = [<span key="a">Item A</span>, <span key="b">Item B</span>];
    render(<Carousel items={items} />);

    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();

    // find the track by role/list
    const track = screen.getByRole('list', { name: 'carousel track' });
    // its first child is the listitem wrapper around the spans
    const firstListItem = track.querySelector('[role="listitem"]')!;
    // within that the <span> “Item A” lives
    expect(firstListItem).toContainElement(screen.getByText('Item A'));
    // and the track has the expected inline transform style
    expect(track).toHaveStyle({ transform: 'translateX(0px)' });

    // progress segments all have aria-label “Segment X of 4”
    const progressGroup = screen.getByRole('group', {
      name: 'carousel progress',
    });
    const segments = screen.getAllByLabelText(/Segment \d+ of 4/);
    expect(segments).toHaveLength(4);
  });

  it('tapping a link (no drag) calls router.push', () => {
    const items = [
      // eslint-disable-next-line @next/next/no-html-link-for-pages
      <a key="link" href="/target">
        CLICK
      </a>,
    ];
    render(<Carousel items={items} />);

    const link = screen.getByText('CLICK') as HTMLAnchorElement;
    // stub elementFromPoint to return the link
    vi.spyOn(document, 'elementFromPoint').mockImplementation(() => link);

    // pointer events on the wrapper
    const wrapper = screen.getByRole('region', { name: 'carousel wrapper' });
    fireEvent.pointerDown(wrapper, { clientX: 10, pointerId: 1 });
    fireEvent.pointerUp(wrapper, { clientX: 10, pointerId: 1 });

    expect(pushMock).toHaveBeenCalledWith('/target');
  });
});
