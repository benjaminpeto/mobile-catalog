import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import Button from '@/components/Button';
import type { ProductEntity } from '@/types/api';

import MainProductContainer from './main-product-container';

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: any) => <img data-testid="product-image" {...props} />,
}));
vi.mock('@/components/Button');

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

  it('renders one <img> per color and shows only the first as visible', () => {
    render(<MainProductContainer product={product} />);

    const images = screen.getAllByTestId('product-image');
    expect(images).toHaveLength(product.colorOptions.length);

    expect(images[0]).toHaveClass('visible');
    expect(images[1]).toHaveClass('hidden');
  });

  it('shows product name and base price when no storage is selected', () => {
    render(<MainProductContainer product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(`From ${product.basePrice} EUR`),
    ).toBeInTheDocument();
  });

  it('lets you select a storage option, updates price & selected class, and enables the add button', () => {
    (Button as Mock).mockImplementation(({ text, variant, onClick }: any) => (
      <button data-testid="add-button" onClick={onClick} data-variant={variant}>
        {text}
      </button>
    ));
    render(<MainProductContainer product={product} />);

    const btn128 = screen.getByText('128GB');
    expect(btn128).not.toHaveClass('selected');

    fireEvent.click(btn128);

    expect(screen.getByText('From 100 EUR')).toBeInTheDocument();

    const addBtn = screen.getByTestId('add-button');
    expect(addBtn).toHaveAttribute('data-variant', 'primary');
    expect(btn128).toHaveClass('selected');
  });

  it('lets you pick a color, updates visible image & shows selected color name', () => {
    const { container } = render(<MainProductContainer product={product} />);

    const swatches = Array.from(
      container.querySelectorAll('button[style]'),
    ).filter(b => (b as HTMLElement).style.backgroundColor);
    expect(swatches).toHaveLength(2);

    fireEvent.click(swatches[1]);

    const images = screen.getAllByTestId('product-image');
    expect(images[1]).toHaveClass('visible');
    expect(images[0]).toHaveClass('hidden');
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('calls console.log when the enabled add button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<MainProductContainer product={product} />);

    fireEvent.click(screen.getByText('64GB'));
    const addBtn = screen.getByTestId('add-button');

    fireEvent.click(addBtn);
    expect(consoleSpy).toHaveBeenCalledWith('Buy Now clicked');
  });
});
