import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { CartProvider } from '@/context/cart-context';

import { Basket } from './basket';

// Mock next/image to render a plain <img> so we can assert on its props
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Basket', () => {
  it('renders the basket SVG with correct attributes', () => {
    render(
      <CartProvider>
        <Basket />
      </CartProvider>,
    );
    const img = screen.getByAltText('basket svg') as HTMLImageElement;
    expect(img).toBeInTheDocument();

    expect(img.src).toContain('/basket.svg');
    expect(img).toHaveAttribute('width', '12.24');
    expect(img).toHaveAttribute('height', '16');
  });

  it('displays the initial count of 0', () => {
    render(
      <CartProvider>
        <Basket />
      </CartProvider>,
    );
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('wraps everything in a flex container that is clickable', () => {
    render(
      <CartProvider>
        <Basket />
      </CartProvider>,
    );
    const container = screen.getByText('0').parentElement!;
    expect(container).toHaveStyle({
      display: 'flex',
      cursor: 'pointer',
      gap: '6px',
      'align-items': 'center',
      padding: '4px 0px',
    });
  });
});
