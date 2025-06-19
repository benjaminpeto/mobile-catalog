import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import type { ProductEntity } from '@/types/api';

import { useProductConfigurator } from './use-product-configurator';

function TestComponent({ product }: { product: ProductEntity }) {
  const {
    selectedColor,
    selectedStorage,
    price,
    canAdd,
    setSelectedColor,
    setSelectedStorage,
  } = useProductConfigurator(product);

  return (
    <div>
      <p>Color: {selectedColor.name}</p>
      <p>Storage: {selectedStorage?.capacity ?? 'none'}</p>
      <p>Price: {price}</p>
      <p>Add enabled: {canAdd ? 'true' : 'false'}</p>

      <button onClick={() => setSelectedColor(product.colorOptions[1])}>
        Select color {product.colorOptions[1].name}
      </button>

      <button onClick={() => setSelectedStorage(product.storageOptions[0])}>
        Select storage {product.storageOptions[0].capacity}
      </button>

      <button onClick={() => setSelectedStorage(product.storageOptions[1])}>
        Select storage {product.storageOptions[1].capacity}
      </button>

      <button onClick={() => setSelectedStorage(null)}>Clear storage</button>
    </div>
  );
}

describe('useProductConfigurator hook', () => {
  const product = {
    id: 'p1',
    name: 'Test Phone',
    basePrice: 100,
    colorOptions: [
      { name: 'Red', hexCode: '#f00', imageUrl: 'url-red' },
      { name: 'Blue', hexCode: '#00f', imageUrl: 'url-blue' },
    ],
    storageOptions: [
      { capacity: '64GB', price: 0 },
      { capacity: '128GB', price: 50 },
    ],
  } as ProductEntity;

  it('initializes with first color, no storage, base price, cannot add', () => {
    render(<TestComponent product={product} />);

    expect(screen.getByText('Color: Red')).toBeInTheDocument();
    expect(screen.getByText('Storage: none')).toBeInTheDocument();
    expect(screen.getByText('Price: 100')).toBeInTheDocument();
    expect(screen.getByText('Add enabled: false')).toBeInTheDocument();
  });

  it('updates selected storage, price, and canAdd when storage chosen', () => {
    render(<TestComponent product={product} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Select storage 128GB' }),
    );
    expect(screen.getByText('Storage: 128GB')).toBeInTheDocument();
    expect(screen.getByText('Price: 50')).toBeInTheDocument();
    expect(screen.getByText('Add enabled: true')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Select storage 64GB' }),
    );
    expect(screen.getByText('Storage: 64GB')).toBeInTheDocument();
    expect(screen.getByText('Price: 0')).toBeInTheDocument();
    expect(screen.getByText('Add enabled: true')).toBeInTheDocument();
  });

  it('clearing storage falls back to basePrice and disables add', () => {
    render(<TestComponent product={product} />);

    // choose a storage first
    fireEvent.click(
      screen.getByRole('button', { name: 'Select storage 128GB' }),
    );
    expect(screen.getByText('Add enabled: true')).toBeInTheDocument();

    // clear storage
    fireEvent.click(screen.getByRole('button', { name: 'Clear storage' }));
    expect(screen.getByText('Storage: none')).toBeInTheDocument();
    expect(screen.getByText('Price: 100')).toBeInTheDocument();
    expect(screen.getByText('Add enabled: false')).toBeInTheDocument();
  });

  it('updates selected color when color chosen and persists across storage changes', () => {
    render(<TestComponent product={product} />);

    fireEvent.click(screen.getByRole('button', { name: 'Select color Blue' }));
    expect(screen.getByText('Color: Blue')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Select storage 64GB' }),
    );
    expect(screen.getByText('Color: Blue')).toBeInTheDocument();
  });
});
