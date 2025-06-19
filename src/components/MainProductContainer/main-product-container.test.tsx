import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ProductEntity } from '@/types/api';

import { MainProductContainer } from './main-product-container';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

const addToCartMock = vi.fn();
vi.mock('@/context/cart-context', () => ({
  useCart: () => ({
    addToCart: addToCartMock,
    cart: [],
  }),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: any) => <img {...props} />,
}));

vi.mock('@/components', async () => {
  const actual =
    await vi.importActual<typeof import('@/components')>('@/components');
  return {
    ...actual,
    Button: ({ text, variant, onClick }: any) => (
      <button data-variant={variant} onClick={onClick}>
        {text}
      </button>
    ),
  };
});

describe('MainProductContainer', () => {
  let product: ProductEntity;

  beforeEach(() => {
    vi.clearAllMocks();
    product = {
      id: 'prod-1',
      name: 'Phone X',
      basePrice: 500,
      colorOptions: [
        { name: 'Black', hexCode: '#000000', imageUrl: 'url-black' },
        { name: 'White', hexCode: '#FFFFFF', imageUrl: 'url-white' },
      ],
      storageOptions: [
        { capacity: '64GB', price: 0 },
        { capacity: '128GB', price: 100 },
      ],
    } as any;
  });

  it('renders one image per color and only the first is visible', () => {
    render(<MainProductContainer product={product} />);
    const images = screen.getAllByAltText(/Phone X - /);
    expect(images).toHaveLength(product.colorOptions.length);
    expect(images[0]).toHaveClass('visible');
    expect(images[1]).toHaveClass('hidden');
  });

  it('shows product name and base price initially', () => {
    render(<MainProductContainer product={product} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(`From ${product.basePrice} EUR`),
    ).toBeInTheDocument();
  });

  it('storage must be chosen before enabling Add button; selecting storage updates UI', () => {
    render(<MainProductContainer product={product} />);

    const addBtn = screen.getByRole('button', { name: 'Añadir' });
    expect(addBtn).toHaveAttribute('data-variant', 'disabled');

    const storageBtn = screen.getByText('128GB');
    expect(storageBtn).not.toHaveClass('selected');

    fireEvent.click(storageBtn);

    expect(screen.getByText('From 100 EUR')).toBeInTheDocument();
    expect(storageBtn).toHaveClass('selected');
    expect(addBtn).toHaveAttribute('data-variant', 'primary');
  });

  it('allows picking a color, updates visible image & shows color name', () => {
    render(<MainProductContainer product={product} />);
    const colorSwatches = screen
      .getAllByRole('button')
      .filter(btn => (btn as HTMLElement).style.backgroundColor);

    fireEvent.click(colorSwatches[1]);

    const images = screen.getAllByAltText(/Phone X - /);
    expect(images[1]).toHaveClass('visible');
    expect(images[0]).toHaveClass('hidden');
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('once storage & color selected, clicking Añadir calls addToCart and navigates', () => {
    render(<MainProductContainer product={product} />);

    fireEvent.click(screen.getByText('128GB'));
    fireEvent.click(screen.getByRole('button', { name: 'Añadir' }));

    expect(addToCartMock).toHaveBeenCalledWith({
      id: 'prod-1',
      name: product.name,
      selectedStorage: '128GB',
      selectedColor: 'Black',
      price: 100,
      imageUrl: 'url-black',
    });
    expect(pushMock).toHaveBeenCalledWith('/cart', { scroll: false });
  });
});
