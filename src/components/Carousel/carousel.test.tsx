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

    const track = screen.getByTestId('carousel-track');
    expect(track).toHaveStyle({ transform: 'translateX(0px)' });

    const segments = screen.getAllByTestId('progress-segment');
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
    vi.spyOn(document, 'elementFromPoint').mockImplementation(() => link);

    const wrapper = screen.getByTestId('carousel-wrapper');
    fireEvent.pointerDown(wrapper, { clientX: 10, pointerId: 1 });
    fireEvent.pointerUp(wrapper, { clientX: 10, pointerId: 1 });

    expect(pushMock).toHaveBeenCalledWith('/target');
  });
});
