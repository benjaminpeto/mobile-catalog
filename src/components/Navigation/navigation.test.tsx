import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Navigation } from './navigation';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Navigation', () => {
  it('renders a nav container with correct layout styles', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveStyle({
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      padding: '24px 100px',
      'max-height': '80px',
    });
  });

  it('renders the logo with correct attributes', () => {
    render(<Navigation />);
    const logo = screen.getByAltText('MBST Logo') as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain('/mbst.svg');
    expect(logo).toHaveAttribute('width', '74');
    expect(logo).toHaveAttribute('height', '24');
    expect(logo).toHaveStyle({ cursor: 'pointer' });
  });

  it('includes the Basket component', () => {
    render(<Navigation />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
