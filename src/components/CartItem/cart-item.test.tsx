import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CartItem } from './cart-item';

const mockCart = [
  {
    id: '1',
    name: 'Item One',
    imageUrl: 'http://example.com/img1.png',
    selectedStorage: '64GB',
    selectedColor: 'Black',
    price: '299',
  },
  {
    id: '2',
    name: 'Item Two',
    imageUrl: 'http://example.com/img2.png',
    selectedStorage: '128GB',
    selectedColor: 'White',
    price: '399',
  },
];

const removeFromCart = vi.fn();

vi.mock('@/context/cart-context', () => ({
  useCart: () => ({
    cart: mockCart,
    removeFromCart,
  }),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: any) =>
    React.createElement('img', { src, alt, width, height }),
}));

describe('CartItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all cart items with correct info and images', () => {
    render(<CartItem />);

    mockCart.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${item.selectedStorage} | ${item.selectedColor}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`${item.price} EUR`)).toBeInTheDocument();

      const img = screen.getByAltText(item.name) as HTMLImageElement;
      expect(img).toHaveAttribute('src', item.imageUrl);
      expect(img).toHaveAttribute('width', '262');
      expect(img).toHaveAttribute('height', '324');
    });
  });

  it('calls removeFromCart with correct args when RemoveButton is clicked', () => {
    render(<CartItem />);

    const removeButtons = screen.getAllByRole('button');
    expect(removeButtons).toHaveLength(mockCart.length);

    fireEvent.click(removeButtons[0]);

    expect(removeFromCart).toHaveBeenCalledWith(
      mockCart[0].id,
      mockCart[0].selectedStorage,
      mockCart[0].selectedColor,
    );
  });
});
