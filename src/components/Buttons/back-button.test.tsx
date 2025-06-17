import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BackButton } from './back-button';

const backMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: backMock }),
}));

describe('BackButton component', () => {
  beforeEach(() => {
    backMock.mockReset();
  });

  it('renders a flex wrapper with correct padding and height', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /Back/i });
    const wrapper = button.closest('div')!;
    expect(wrapper).toHaveStyle({
      display: 'flex',
      padding: '0px 100px',
      height: '44px',
    });
  });

  it('renders the button with the correct base styles', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /Back/i });
    expect(button).toHaveStyle({
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      'font-size': '12px',
      'text-transform': 'uppercase',
      'font-weight': '300',
      'font-family': 'var(--font-helvetica)',
    });
  });

  it('renders an SVG with the expected attributes and styles', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /Back/i });
    const svg = button.querySelector('svg')!;

    expect(svg).toHaveAttribute('width', '10');
    expect(svg).toHaveAttribute('height', '17');
    expect(svg).toHaveAttribute('viewBox', '0 0 6 10');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svg).toHaveStyle({
      'padding-right': '4px',
      'margin-bottom': '-4px',
    });
  });

  it('invokes router.back() when clicked', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /Back/i });
    fireEvent.click(button);
    expect(backMock).toHaveBeenCalled();
  });
});
