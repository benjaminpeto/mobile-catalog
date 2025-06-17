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
vi.mock('@/context', () => ({
  useCart: () => ({
    addToCart: addToCartMock,
    cart: [],
  }),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: any) => <img data-testid="product-image" {...props} />,
}));

vi.mock('@/components', async () => {
  const actual =
    await vi.importActual<typeof import('@/components')>('@/components');
  return {
    ...actual,
    Button: ({ text, variant, onClick }: any) => (
      <button data-testid="add-button" data-variant={variant} onClick={onClick}>
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
    const images = screen.getAllByTestId('product-image');
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

  it('allows selecting storage, updates price, toggles selected class and button variant', () => {
    render(<MainProductContainer product={product} />);
    const btn128 = screen.getByText('128GB');
    expect(btn128).not.toHaveClass('selected');

    fireEvent.click(btn128);

    expect(screen.getByText('From 100 EUR')).toBeInTheDocument();
    expect(btn128).toHaveClass('selected');

    const addBtn = screen.getByTestId('add-button');
    expect(addBtn).toHaveAttribute('data-variant', 'primary');
  });

  it('allows picking a color, updates visible image & shows color name', () => {
    render(<MainProductContainer product={product} />);
    const swatches = screen
      .getAllByRole('button')
      .filter(btn => (btn as HTMLElement).style.backgroundColor);
    fireEvent.click(swatches[1]);

    const images = screen.getAllByTestId('product-image');
    expect(images[1]).toHaveClass('visible');
    expect(images[0]).toHaveClass('hidden');
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('when storage & color selected, clicking Añadir calls addToCart, updates localStorage and navigates', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    render(<MainProductContainer product={product} />);

    fireEvent.click(screen.getByText('128GB'));

    const addBtn = screen.getByTestId('add-button');
    fireEvent.click(addBtn);

    expect(addToCartMock).toHaveBeenCalledWith({
      name: product.name,
      selectedStorage: '128GB',
      selectedColor: 'Black',
      price: 100,
      imageUrl: 'url-black',
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          name: product.name,
          selectedStorage: '128GB',
          selectedColor: 'Black',
          price: 100,
          imageUrl: 'url-black',
        },
      ]),
    );

    expect(pushMock).toHaveBeenCalledWith('/cart');
  });
});
